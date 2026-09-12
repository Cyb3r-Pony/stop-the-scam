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
    if printf '%s' "$value" | wr secret put "$name" >/dev/null 2>&1; then
      ok "$name stored on Cloudflare (${#value} characters)"
      uploaded=$((uploaded + 1))
    else
      fail "$name — upload failed"
    fi
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
bold "Step 1/5 — Dependencies"
if [ -d node_modules ]; then
  ok "already installed"
else
  npm install --silent
  ok "installed"
fi

# ---------------------------------------------------------------- 2. login
bold "Step 2/5 — Cloudflare account"
if wr whoami >/dev/null 2>&1; then
  ok "already logged in"
else
  echo "  A browser window will open — approve access to your Cloudflare account."
  echo "  (A free account is enough. Sign up at dash.cloudflare.com if you have none.)"
  wr login
  ok "logged in"
fi

# ---------------------------------------------------------------- 3. deploy
# Deploy before uploading secrets so the Worker exists to attach them to.
bold "Step 3/5 — Deploying the Worker"
DEPLOY_LOG="$(mktemp)"
trap 'rm -f "$DEPLOY_LOG"' EXIT
wr deploy 2>&1 | tee "$DEPLOY_LOG"
WORKER_URL="$(grep -oE 'https://[a-zA-Z0-9.-]+\.workers\.dev' "$DEPLOY_LOG" | head -1 || true)"

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
