/**
 * Stop The Scam — threat intelligence proxy.
 *
 * Exists for one reason: the site is a static build on GitHub Pages, so any key it
 * held would ship inside dist/assets/index-*.js and be readable by every visitor.
 * The keys live here as Worker secrets instead, and the browser only ever sees the
 * normalised verdict.
 *
 * It also solves a second problem: AbuseIPDB, urlscan and abuse.ch send no CORS
 * headers, so a browser cannot call them at all, key or no key.
 *
 * Deliberately not a general-purpose proxy — it calls a fixed list of provider
 * endpoints with a validated target, so it cannot be turned into an SSRF gadget.
 */

export interface Env {
  ABUSEIPDB_KEY?: string;
  IPINFO_KEY?: string;
  VIRUSTOTAL_KEY?: string;
  URLSCAN_KEY?: string;
  ABUSECH_KEY?: string;
  /** Optional: Workers Rate Limiting binding. Absent is fine — see rateLimited(). */
  RATE_LIMITER?: { limit(o: { key: string }): Promise<{ success: boolean }> };
}

const ALLOWED_ORIGINS = [
  'https://stop-the-scam.xyz',
  'https://www.stop-the-scam.xyz',
  'http://localhost:5173',
  'http://localhost:3000',
];

const PROVIDER_TIMEOUT_MS = 6000;
const CACHE_SECONDS = 3600;

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const DOMAIN_RE = /^(?=.{1,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;

function validDomain(input: string): string | null {
  const d = input.trim().toLowerCase().replace(/\.$/, '');
  return DOMAIN_RE.test(d) ? d : null;
}

/**
 * Accepts only public, routable addresses. Private and reserved ranges are
 * rejected so this cannot be used to probe internal infrastructure.
 */
function validPublicIp(input: string): string | null {
  const ip = input.trim();

  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
  if (v4) {
    const o = v4.slice(1).map(Number);
    if (o.some(n => n > 255)) return null;
    const [a, b] = o;
    if (a === 0 || a === 10 || a === 127) return null;
    if (a === 169 && b === 254) return null;                 // link-local
    if (a === 172 && b >= 16 && b <= 31) return null;         // private
    if (a === 192 && b === 168) return null;                  // private
    if (a === 100 && b >= 64 && b <= 127) return null;         // CGNAT
    if (a >= 224) return null;                                 // multicast / reserved
    return ip;
  }

  if (/^[0-9a-f:]+$/i.test(ip) && ip.includes(':')) {
    const lower = ip.toLowerCase();
    if (lower === '::1' || lower === '::') return null;
    if (/^f[cd]/.test(lower)) return null;                     // unique local
    if (/^fe[89ab]/.test(lower)) return null;                  // link-local
    return ip;
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Provider calls                                                      */
/* ------------------------------------------------------------------ */

type Source = Record<string, unknown> & { ok: boolean; error?: string };

/** One provider failing must never sink the whole response. */
async function safe(name: string, fn: () => Promise<Source>): Promise<[string, Source]> {
  try {
    return [name, await fn()];
  } catch (e) {
    const msg = e instanceof Error && e.name === 'TimeoutError' ? 'timeout' : 'unavailable';
    return [name, { ok: false, error: msg }];
  }
}

const req = (url: string, init: RequestInit = {}) =>
  fetch(url, { ...init, signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS) });

async function virusTotal(kind: 'domains' | 'ip_addresses', target: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };
  const r = await req(`https://www.virustotal.com/api/v3/${kind}/${encodeURIComponent(target)}`, {
    headers: { 'x-apikey': key },
  });
  if (r.status === 404) return { ok: true, known: false };
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const j = await r.json() as any;
  const a = j?.data?.attributes ?? {};
  const stats = a.last_analysis_stats ?? {};
  return {
    ok: true,
    known: true,
    malicious: stats.malicious ?? 0,
    suspicious: stats.suspicious ?? 0,
    harmless: stats.harmless ?? 0,
    undetected: stats.undetected ?? 0,
    reputation: a.reputation ?? 0,
    // Domain registration date, when the provider knows it.
    createdAt: a.creation_date ?? null,
  };
}

async function abuseIpdb(ip: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };
  const r = await req(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`,
    { headers: { Key: key, Accept: 'application/json' } }
  );
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const d = (await r.json() as any)?.data ?? {};
  return {
    ok: true,
    score: d.abuseConfidenceScore ?? 0,
    reports: d.totalReports ?? 0,
    distinctReporters: d.numDistinctUsers ?? 0,
    country: d.countryCode ?? null,
    isp: d.isp ?? null,
    usageType: d.usageType ?? null,
    domain: d.domain ?? null,
    isTor: !!d.isTor,
    isWhitelisted: !!d.isWhitelisted,
    lastReportedAt: d.lastReportedAt ?? null,
  };
}

async function ipInfo(ip: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };
  const r = await req(`https://api.ipinfo.io/lite/${encodeURIComponent(ip)}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const d = await r.json() as any;
  return {
    ok: true,
    country: d.country ?? null,
    countryCode: d.country_code ?? null,
    asn: d.asn ?? null,
    asName: d.as_name ?? null,
    asDomain: d.as_domain ?? null,
  };
}

/** abuse.ch URLhaus: is this host currently serving malware? */
async function urlhaus(host: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };
  const r = await req('https://urlhaus-api.abuse.ch/v1/host/', {
    method: 'POST',
    headers: { 'Auth-Key': key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `host=${encodeURIComponent(host)}`,
  });
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const d = await r.json() as any;
  if (d.query_status === 'no_results') return { ok: true, listed: false };
  if (d.query_status !== 'ok') return { ok: false, error: d.query_status ?? 'unknown' };
  return {
    ok: true,
    listed: true,
    urlCount: Number(d.url_count ?? 0),
    reference: d.urlhaus_reference ?? null,
    blacklists: d.blacklists ?? null,
  };
}

/**
 * abuse.ch ThreatFox: is this indicator tied to a known malware family?
 *
 * ThreatFox's search_ioc does substring matching, which is dangerously loose for
 * our purpose: searching "google.com" returns "meet.google.com-join.us" (an
 * entirely different domain that merely contains the string) and malicious URLs
 * hosted on Google subdomains. Reporting those as hits would tell a visitor that
 * google.com is malware.
 *
 * So we re-check every candidate and keep only exact identity matches: the IOC is
 * this precise host, not a lookalike and not a neighbour under the same parent.
 */
function iocHost(ioc: string): string | null {
  const raw = ioc.trim();
  if (!raw) return null;
  try {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) return new URL(raw).hostname.toLowerCase();
  } catch {
    return null;
  }
  return raw.toLowerCase().replace(/:\d+$/, '');   // bare domain or ip:port
}

async function threatFox(target: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };
  const r = await req('https://threatfox-api.abuse.ch/api/v1/', {
    method: 'POST',
    headers: { 'Auth-Key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'search_ioc', search_term: target }),
  });
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const d = await r.json() as any;
  if (d.query_status !== 'ok' || !Array.isArray(d.data)) return { ok: true, listed: false };

  const needle = target.toLowerCase();
  const exact = d.data.filter((row: any) => iocHost(String(row?.ioc ?? '')) === needle);
  if (exact.length === 0) {
    // Matches existed, but none of them were actually this host.
    return { ok: true, listed: false, looseMatches: d.data.length };
  }

  const first = exact[0];
  return {
    ok: true,
    listed: true,
    matches: exact.length,
    malware: first.malware_printable ?? null,
    threatType: first.threat_type ?? null,
    confidence: first.confidence_level ?? null,
    firstSeen: first.first_seen ?? null,
  };
}

/**
 * urlscan search only — it reads scans that already exist and submits nothing,
 * so a visitor's query never becomes a public record.
 */
async function urlscan(domain: string, key?: string): Promise<Source> {
  if (!key) return { ok: false, error: 'not_configured' };

  // The field matters: a bare `domain:` search matches the term anywhere in the
  // scan, so `domain:google.com` returns scans of unrelated sites that merely
  // loaded a Google resource. `page.domain` is the domain actually visited.
  const r = await req(
    `https://urlscan.io/api/v1/search/?q=page.domain%3A%22${encodeURIComponent(domain)}%22&size=20`,
    { headers: { 'API-Key': key } }
  );
  if (!r.ok) return { ok: false, error: `http_${r.status}` };
  const d = await r.json() as any;

  // Keep only this domain and its subdomains, so a change in urlscan's matching
  // can never make us report a neighbour's scan as this domain's.
  const results = (d.results ?? []).filter((x: any) => {
    const pd = String(x?.page?.domain ?? '').toLowerCase();
    return pd === domain || pd.endsWith(`.${domain}`);
  });
  if (results.length === 0) return { ok: true, scanned: false };

  // Prefer a scan of the apex itself over one of a subdomain.
  const exact = results.find((x: any) => {
    const pd = String(x?.page?.domain ?? '').toLowerCase();
    return pd === domain || pd === `www.${domain}`;
  });
  const first = exact ?? results[0];

  return {
    ok: true,
    scanned: true,
    total: d.total ?? results.length,
    scannedDomain: first.page?.domain ?? null,
    lastScan: first.task?.time ?? null,
    // A domain registered days ago is among the strongest scam signals there is.
    apexDomainAgeDays: first.page?.apexDomainAgeDays ?? null,
    serverCountry: first.page?.country ?? null,
    resultUrl: first.result ?? null,
    screenshot: first.screenshot ?? null,
  };
}

/* ------------------------------------------------------------------ */
/* HTTP surface checks (browsers cannot do these cross-origin)         */
/* ------------------------------------------------------------------ */

async function webSurface(domain: string): Promise<Source> {
  let res: Response;
  try {
    res = await req(`https://${domain}/`, { method: 'GET', redirect: 'follow' });
  } catch {
    return { ok: true, https: false, reachable: false };
  }

  const h = res.headers;
  const csp = h.get('content-security-policy');
  const hsts = h.get('strict-transport-security');
  const maxAge = hsts ? Number(/max-age=(\d+)/i.exec(hsts)?.[1] ?? 0) : 0;
  const xfo = h.get('x-frame-options');

  // Does the insecure address hand the visitor over to the secure one? Checked
  // without following, so we see the redirect itself rather than its target.
  let httpsRedirect = false;
  try {
    const plain = await req(`http://${domain}/`, { method: 'GET', redirect: 'manual' });
    const location = plain.headers.get('location') ?? '';
    httpsRedirect =
      (plain.status >= 300 && plain.status < 400 && /^https:\/\//i.test(location)) ||
      // Some hosts upgrade transparently and answer 200 already on HTTPS.
      (plain.status === 200 && plain.url.startsWith('https://'));
  } catch {
    // Unreachable over plain HTTP counts as no redirect.
  }

  // A security.txt only counts if it is actually one — a soft 404 returning the
  // site's HTML homepage is the common false positive here.
  let securityTxt = false;
  try {
    const st = await req(`https://${domain}/.well-known/security.txt`, { method: 'GET' });
    if (st.ok && (st.headers.get('content-type') ?? '').toLowerCase().includes('text/plain')) {
      const body = (await st.text()).slice(0, 4000);
      securityTxt = /^\s*contact\s*:/im.test(body);
    }
  } catch {
    // Absent is the answer.
  }

  return {
    ok: true,
    reachable: true,
    // Strictly the final URL: a site that redirects HTTPS down to HTTP has not
    // served us securely, and `status > 0` would have called every reply a pass.
    https: res.url.startsWith('https://'),
    status: res.status,
    httpsRedirect,
    hsts: !!hsts,
    hstsMaxAge: maxAge,
    csp: !!csp,
    clickjacking: !!xfo || /frame-ancestors/i.test(csp ?? ''),
    nosniff: (h.get('x-content-type-options') ?? '').toLowerCase() === 'nosniff',
    referrerPolicy: !!h.get('referrer-policy'),
    permissionsPolicy: !!h.get('permissions-policy'),
    securityTxt,
  };
}

/* ------------------------------------------------------------------ */
/* Request handling                                                    */
/* ------------------------------------------------------------------ */

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body: unknown, origin: string | null, status = 200, cacheable = false): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheable ? `public, max-age=${CACHE_SECONDS}` : 'no-store',
      ...corsHeaders(origin),
    },
  });
}

/** Absent binding means no limiting — the cache still absorbs most repeat load. */
async function rateLimited(request: Request, env: Env): Promise<boolean> {
  if (!env.RATE_LIMITER) return false;
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  try {
    const { success } = await env.RATE_LIMITER.limit({ key: ip });
    return !success;
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin');
    try {
      return await handle(request, env, ctx, origin);
    } catch {
      // An uncaught throw would return Cloudflare's own error page, which carries
      // no CORS headers — the browser would then report an opaque network failure
      // instead of letting the page fall back gracefully.
      return json({ error: 'internal_error' }, origin, 500);
    }
  },
};

async function handle(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  origin: string | null,
): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'GET') {
      return json({ error: 'method_not_allowed' }, origin, 405);
    }
    if (url.pathname === '/' || url.pathname === '/v1/health') {
      return json({ ok: true, service: 'stop-the-scam threat proxy' }, origin);
    }

    const match = /^\/v1\/(ip|domain)\/(.+)$/.exec(url.pathname);
    if (!match) return json({ error: 'not_found' }, origin, 404);

    const [, kind, rawTarget] = match;

    // decodeURIComponent throws URIError on a malformed escape such as "%E0%A4%A",
    // which surfaced as a Worker exception (Cloudflare error 1101) rather than a
    // clean rejection.
    let target: string;
    try {
      target = decodeURIComponent(rawTarget);
    } catch {
      return json({ error: 'invalid_target' }, origin, 400);
    }
    if (target.length > 260) return json({ error: 'invalid_target' }, origin, 400);

    const validated = kind === 'ip' ? validPublicIp(target) : validDomain(target);
    if (!validated) {
      return json({ error: kind === 'ip' ? 'invalid_or_private_ip' : 'invalid_domain' }, origin, 400);
    }

    if (await rateLimited(request, env)) {
      return json({ error: 'rate_limited' }, origin, 429);
    }

    // Serve from the edge cache when we have already asked the providers about
    // this target. The cache lives here rather than in the visitor's browser on
    // purpose: it protects the provider quotas, which is what it is for, without
    // leaving a stale verdict pinned in someone's browser for an hour after a
    // domain has been flagged.
    const cacheKey = new Request(`https://cache.invalid/v1/${kind}/${validated}`, { method: 'GET' });
    const cache = caches.default;
    const hit = await cache.match(cacheKey);
    if (hit) {
      const body = await hit.json();
      return json({ ...(body as object), cached: true }, origin);
    }

    const entries = kind === 'ip'
      ? await Promise.all([
          safe('abuseipdb', () => abuseIpdb(validated, env.ABUSEIPDB_KEY)),
          safe('ipinfo', () => ipInfo(validated, env.IPINFO_KEY)),
          safe('virustotal', () => virusTotal('ip_addresses', validated, env.VIRUSTOTAL_KEY)),
          safe('threatfox', () => threatFox(validated, env.ABUSECH_KEY)),
          safe('urlhaus', () => urlhaus(validated, env.ABUSECH_KEY)),
        ])
      : await Promise.all([
          safe('virustotal', () => virusTotal('domains', validated, env.VIRUSTOTAL_KEY)),
          safe('urlscan', () => urlscan(validated, env.URLSCAN_KEY)),
          safe('urlhaus', () => urlhaus(validated, env.ABUSECH_KEY)),
          safe('threatfox', () => threatFox(validated, env.ABUSECH_KEY)),
          safe('web', () => webSurface(validated)),
        ]);

    const payload = {
      target: validated,
      type: kind,
      checkedAt: new Date().toISOString(),
      sources: Object.fromEntries(entries),
    };

    // The stored copy carries cache headers so the Cache API will retain it;
    // the copy the visitor receives does not, so their browser always re-asks.
    ctx.waitUntil(cache.put(cacheKey, json(payload, origin, 200, true)));
    return json(payload, origin);
}
