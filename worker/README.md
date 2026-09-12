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

From this directory, once:

```bash
npm install
```

```bash
npx wrangler login
```

Then set each key. `wrangler` prompts for the value and stores it encrypted — the
value never touches a file in the repo:

```bash
npx wrangler secret put ABUSEIPDB_KEY
```

```bash
npx wrangler secret put IPINFO_KEY
```

```bash
npx wrangler secret put VIRUSTOTAL_KEY
```

```bash
npx wrangler secret put URLSCAN_KEY
```

```bash
npx wrangler secret put ABUSECH_KEY
```

Deploy:

```bash
npx wrangler deploy
```

Wrangler prints the live URL, of the form `https://sts-api.<your-subdomain>.workers.dev`.
Put that in the site's `.env` as `VITE_API_BASE` and redeploy the site.

A missing key is not an error — that provider simply reports `not_configured` and the
rest still work. You can deploy with a subset and add the others later.

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
