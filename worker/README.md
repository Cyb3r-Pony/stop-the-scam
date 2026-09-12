# sts-api — threat intelligence proxy

A small Cloudflare Worker that sits between the website and the threat-intelligence
providers. Deployed separately from the site; nothing in here is bundled into the
static build.

## Why this exists

The website is a static build on GitHub Pages. **Any key the frontend held would be
published**: Vite inlines build-time values into `dist/assets/index-*.js`, which is
served to every visitor and readable with F12. GitHub Actions secrets do not change
this — they keep a value out of the *source repo*, not out of the *shipped bundle*.

So the keys live here, as Worker secrets, and the browser only ever receives the
normalised verdict.

There is a second, independent reason: **AbuseIPDB, urlscan.io and abuse.ch send no
CORS headers**, so a browser cannot call them at all — key or no key. Verified by
direct test, along with the fact that reading another origin's response headers
(needed for the HSTS/CSP/security.txt checks) is likewise forbidden to browser
JavaScript.

## Deploy

Put your keys in `.dev.vars` in this directory, one per line (this file is
gitignored and never leaves your machine):

```
ABUSEIPDB_KEY=...
IPINFO_KEY=...
VIRUSTOTAL_KEY=...
URLSCAN_KEY=...
ABUSECH_KEY=...
```

Then run:

```bash
./setup.sh
```

That installs dependencies, logs you into Cloudflare (a browser window opens once),
deploys the Worker, uploads each key as an encrypted secret, writes the Worker's URL
into the site's `.env`, and verifies every provider answers. The only step it cannot
do for you is the browser login.

A missing key is not an error — that provider reports `not_configured` and the rest
still work, so you can start with a subset.

### If you would rather use an API token than a browser login

You do not need one for normal setup — `./setup.sh` opens a browser login, which is
simpler and needs no token management. A token is only worth creating if you want to
deploy from CI, or from a machine with no browser.

At **dash.cloudflare.com → My Profile → API Tokens → Create Token**, either:

**Use the template** — pick *"Edit Cloudflare Workers"*, set Account Resources to your
account, and create it. This is the quickest route.

**Or build a minimal custom token**, which grants strictly less. Choose *Create Custom
Token* and add exactly two permissions:

| Type | Resource | Level |
|---|---|---|
| Account | Workers Scripts | Edit |
| Account | Account Settings | Read |

`Workers Scripts: Edit` covers both deploying the code and managing its secrets.
`Account Settings: Read` lets wrangler find which account to deploy into. Nothing else
is needed: this Worker uses no KV, no D1, no queues, and no custom domain, so the
Workers KV and Zone permissions the template includes are unnecessary here.

Then:

```bash
CLOUDFLARE_API_TOKEN=<your-token> ./setup.sh
```

Treat that token like a password — it can deploy code to your account. Do not put it
in the repository; pass it on the command line as above, or store it in your shell
profile.

### After rotating your keys

Update `.dev.vars`, then:

```bash
./setup.sh --keys-only
```

New secrets take effect on the next request; no redeploy is needed.

### Useful commands

```bash
npx wrangler tail
```

Live log of requests hitting the Worker.

```bash
npx wrangler secret list
```

Shows which secrets are set — names only, never values.

```bash
npx wrangler delete
```

Takes the Worker offline. The site keeps working: the domain scorecard falls back to
its DNS-only half and the provider links still work.

## Local development

Create `.dev.vars` in this directory (already in `.gitignore`, never committed):

```
ABUSEIPDB_KEY=...
IPINFO_KEY=...
VIRUSTOTAL_KEY=...
URLSCAN_KEY=...
ABUSECH_KEY=...
```

```bash
npx wrangler dev
```

## API

| Route | Purpose |
|---|---|
| `GET /v1/health` | Liveness check |
| `GET /v1/ip/:address` | AbuseIPDB, ipinfo, VirusTotal, ThreatFox, URLhaus |
| `GET /v1/domain/:name` | VirusTotal, urlscan, URLhaus, ThreatFox, HTTP surface |

Every response has the same shape. Each provider reports independently, so one being
slow or down degrades that entry rather than the whole response:

```json
{
  "target": "example.com",
  "type": "domain",
  "checkedAt": "2026-09-12T10:00:00.000Z",
  "sources": {
    "virustotal": { "ok": true, "malicious": 0, "harmless": 70 },
    "urlscan":    { "ok": true, "scanned": true, "apexDomainAgeDays": 11041 },
    "urlhaus":    { "ok": true, "listed": false },
    "web":        { "ok": true, "https": true, "hsts": true, "csp": true }
  }
}
```

## Safeguards

- **Not a general-purpose proxy.** It calls a fixed list of provider endpoints with a
  validated target, so it cannot be repurposed as an SSRF gadget.
- **Private and reserved IP ranges are rejected** (RFC1918, loopback, link-local,
  CGNAT, multicast, IPv6 ULA) so it cannot probe internal infrastructure.
- **CORS is pinned** to the site's own origins.
- **Responses are cached for an hour**, so repeated lookups of the same target cost
  no provider quota.
- **Per-IP rate limiting**, 20 requests/minute, via the rate-limit binding in
  `wrangler.toml`. Remove that block to disable; the worker still runs without it.

## Cost

Cloudflare's free tier covers 100,000 requests/day. The binding constraint is the
providers' own quotas — VirusTotal's free tier is the tightest at 500 lookups/day,
which the one-hour cache stretches a long way.
