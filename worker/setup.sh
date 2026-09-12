#!/usr/bin/env bash
#
# One-command setup for the threat-intelligence worker.
#
#   ./setup.sh              full setup: log in, deploy, upload keys, wire up the site
#   ./setup.sh --keys-only  re-upload the keys only (use this after rotating them)
#
# Key values are read from .dev.vars, which is gitignored. They are piped straight
# into `wrangler secret put`, which stores them encrypted on Cloudflare. This
# script never prints a key, never writes one anywhere else, and never puts one
# into the website build.

set -euo pipefail
set +x                      # never trace — tracing would print key values

cd "$(dirname "${BASH_SOURCE[0]}")"
SITE_ROOT="$(cd .. && pwd)"

SECRET_NAMES=(ABUSEIPDB_KEY IPINFO_KEY VIRUSTOTAL_KEY URLSCAN_KEY ABUSECH_KEY)
VARS_FILE=".dev.vars"
KEYS_ONLY=false
[ "${1:-}" = "--keys-only" ] && KEYS_ONLY=true

bold()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok()    { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn()  { printf '  \033[33m!\033[0m %s\n' "$*"; }
fail()  { printf '  \033[31m✗\033[0m %s\n' "$*"; }

wr() { npx --yes wrangler "$@"; }

# Reads one value out of .dev.vars without echoing it.
read_key() {
  grep -E "^$1=" "$VARS_FILE" 2>/dev/null | head -1 | sed "s/^$1=//" | tr -d '\r\n'
}

upload_keys() {
  bold "Uploading API keys as encrypted Cloudflare secrets"
  if [ ! -f "$VARS_FILE" ]; then
    fail "$VARS_FILE not found."
    echo "     Create it with one KEY=value per line, then run: ./setup.sh --keys-only"
    exit 1
  fi
  local uploaded=0
  for name in "${SECRET_NAMES[@]}"; do
    local value
    value="$(read_key "$name")"
    if [ -z "$value" ]; then
      warn "$name — not in $VARS_FILE, skipped (that provider will report 'not configured')"
      continue
    fi
    # stdin carries the value, so it is never visible in the process list.
    # stderr is kept so a failure can say why, but stdout is dropped because
    # wrangler echoes a confirmation that includes the Worker name.
    local err
    err="$(mktemp)"
    if printf '%s' "$value" | wr secret put "$name" 2>"$err" >/dev/null; then
      ok "$name stored on Cloudflare (${#value} characters)"
      uploaded=$((uploaded + 1))
    else
      fail "$name — upload failed"
      grep -viE 'wrangler [0-9]|update available|^-+$|^\s*$' "$err" | tail -3 | sed 's/^/       /'
    fi
    rm -f "$err"
    value=""
  done
  unset value
  echo "  $uploaded of ${#SECRET_NAMES[@]} keys uploaded."
}

# ---------------------------------------------------------------- keys only
if $KEYS_ONLY; then
  upload_keys
  bold "Done. New keys take effect on the next request — no redeploy needed."
  exit 0
fi

# ---------------------------------------------------------------- 1. deps
# An existing node_modules is not enough: it may predate a version bump in
# package.json, which is how this ended up running wrangler 3 against a v4 pin.
bold "Step 1/5 — Dependencies"
WANT_MAJOR="$(sed -n 's/.*"wrangler": *"[^0-9]*\([0-9]*\).*/\1/p' package.json)"
HAVE_VER="$(node -p "require('./node_modules/wrangler/package.json').version" 2>/dev/null || echo "")"
HAVE_MAJOR="${HAVE_VER%%.*}"
if [ -z "$HAVE_VER" ] || [ "$HAVE_MAJOR" != "$WANT_MAJOR" ]; then
  echo "  Installing wrangler $WANT_MAJOR.x${HAVE_VER:+ (replacing $HAVE_VER)}..."
  npm install --silent
  ok "wrangler $(node -p "require('./node_modules/wrangler/package.json').version") installed"
else
  ok "wrangler $HAVE_VER already installed"
fi

# ---------------------------------------------------------------- 2. login
bold "Step 2/5 — Cloudflare account"
# `wrangler whoami` exits 0 whether or not you are signed in, so the exit code
# says nothing — the answer is in the output.
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  ok "using CLOUDFLARE_API_TOKEN from the environment"
elif wr whoami 2>&1 | grep -qi "not authenticated"; then
  echo "  A browser window will open — approve access to your Cloudflare account."
  echo "  (A free account is enough. Sign up at dash.cloudflare.com if you have none.)"
  echo
  if ! wr login; then
    fail "Login did not complete."
    echo
    echo "  If you cannot use a browser here, create an API token instead:"
    echo "    dash.cloudflare.com → My Profile → API Tokens → Create Token"
    echo "    → use the \"Edit Cloudflare Workers\" template → Continue → Create"
    echo "  Then re-run with:"
    echo "    CLOUDFLARE_API_TOKEN=<your-token> ./setup.sh"
    exit 1
  fi
  ok "logged in"
else
  ok "already logged in"
fi

# ---------------------------------------------------------------- 3. deploy
# Deploy before uploading secrets so the Worker exists to attach them to.
#
# Deliberately NOT piped: wrangler inspects whether stdout is a terminal, and a
# pipe makes it declare the session non-interactive and refuse to open a browser
# login. `script` keeps a pty attached while still capturing the output, so we
# can read the deployed URL back out of it.
bold "Step 3/5 — Deploying the Worker"
DEPLOY_LOG="$(mktemp)"
trap 'rm -f "$DEPLOY_LOG"' EXIT

if command -v script >/dev/null 2>&1; then
  if [ "$(uname -s)" = "Darwin" ]; then
    script -q "$DEPLOY_LOG" npx --yes wrangler deploy || true
  else
    script -q -c "npx --yes wrangler deploy" "$DEPLOY_LOG" || true
  fi
else
  wr deploy || true
fi

WORKER_URL="$(grep -oaE 'https://[a-zA-Z0-9.-]+\.workers\.dev' "$DEPLOY_LOG" 2>/dev/null | head -1 || true)"

# Fall back to asking, rather than silently leaving the site unwired.
if [ -z "$WORKER_URL" ]; then
  echo
  read -r -p "  Paste the Worker URL shown above (or press Enter to skip): " WORKER_URL || true
  WORKER_URL="$(printf '%s' "${WORKER_URL:-}" | tr -d '[:space:]')"
fi

if [ -z "$WORKER_URL" ]; then
  warn "Could not read the Worker URL from the deploy output."
  warn "Find it at dash.cloudflare.com → Workers & Pages → sts-api, then set"
  warn "VITE_API_BASE in $SITE_ROOT/.env by hand."
else
  ok "deployed at $WORKER_URL"
fi

# ---------------------------------------------------------------- 4. secrets
upload_keys

# ---------------------------------------------------------------- 5. wire up
bold "Step 4/5 — Pointing the website at the Worker"
if [ -n "$WORKER_URL" ]; then
  cat > "$SITE_ROOT/.env" <<EOF
# Public configuration. Vite inlines these into the shipped bundle, so this file
# must never contain an API key — anything here is visible to every visitor.
# The provider keys live as Cloudflare Worker secrets instead (worker/README.md).
#
# Safe to commit.
VITE_API_BASE=$WORKER_URL
EOF
  ok "wrote $SITE_ROOT/.env"
  echo "     Commit it so the GitHub Pages build picks it up:"
  echo "       git add .env && git commit -m 'chore: point site at threat proxy' && git push"
else
  warn "skipped — no Worker URL"
fi

# ---------------------------------------------------------------- 6. verify
bold "Step 5/5 — Verifying"
if [ -n "$WORKER_URL" ]; then
  if curl -fsS -m 15 "$WORKER_URL/v1/health" >/dev/null 2>&1; then
    ok "the Worker is answering"
  else
    warn "no answer yet — a first deploy can take a minute to go live"
  fi

  echo "  Checking that each provider responds..."
  curl -fsS -m 30 "$WORKER_URL/v1/domain/example.com" 2>/dev/null | node -e '
    let raw = "";
    process.stdin.on("data", c => raw += c);
    process.stdin.on("end", () => {
      try {
        const s = JSON.parse(raw).sources || {};
        for (const [name, v] of Object.entries(s)) {
          const state = v.ok ? "ok" : (v.error === "not_configured" ? "no key set" : v.error);
          console.log(`     ${v.ok ? "✓" : "✗"} ${name.padEnd(12)} ${state}`);
        }
      } catch { console.log("     (could not read the response)"); }
    });
  ' || warn "verification request failed — try again in a minute"
fi

bold "Setup complete."
cat <<EOF

  Your keys are stored encrypted on Cloudflare. They are not in this repository,
  not in the website bundle, and never sent to a visitor's browser.

  After you rotate the keys: update $VARS_FILE, then run
      ./setup.sh --keys-only

  To see what the Worker is doing:  npx wrangler tail
  To take it offline:               npx wrangler delete

EOF
