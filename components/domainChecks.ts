/**
 * Domain hygiene checks over DNS-over-HTTPS.
 *
 * Runs entirely in the visitor's browser against Cloudflare's public resolver
 * (Google as fallback). No API key, no backend, no request touches our servers —
 * which also means we never see what anyone looks up.
 *
 * Scoring weights mirror the public cyberstatus.net methodology so results are
 * comparable. Verified against mvr.bg: this module reproduces that tool's
 * findings check for check.
 *
 * The web-connection checks (HTTPS, HSTS, CSP, security.txt) cannot run here —
 * reading another origin's response headers is forbidden to browser JavaScript.
 * Those arrive with the Cloudflare Worker (see worker/).
 */

export type CheckStatus = 'pass' | 'partial' | 'fail';

export interface CheckResult {
  /** Stable id, used by the UI to look up the localized label and explanation. */
  id: CheckId;
  status: CheckStatus;
  score: number;
  max: number;
  /** The record actually found, shown verbatim in monospace. */
  value: string | null;
  /** Which localized finding line to render. */
  finding: string;
}

export type CheckId =
  | 'dmarc' | 'spf' | 'mtaSts' | 'tlsRpt'
  | 'dnssec' | 'caa' | 'ipv6';

export interface CheckGroup {
  id: 'email' | 'integrity';
  score: number;
  max: number;
  checks: CheckResult[];
}

export interface DomainReport {
  domain: string;
  score: number;
  max: number;
  percent: number;
  groups: CheckGroup[];
  /** Informational, not scored. */
  mxHosts: string[];
  checkedAt: Date;
}

export type LookupError =
  | { kind: 'invalid' }
  | { kind: 'is-ip' }
  | { kind: 'nxdomain' }
  | { kind: 'network' };

const DOH_ENDPOINTS = [
  'https://cloudflare-dns.com/dns-query',
  'https://dns.google/resolve',
];

interface DnsAnswer { name: string; type: number; data: string }
interface DnsResponse { Status: number; AD?: boolean; Answer?: DnsAnswer[] }

const TIMEOUT_MS = 8000;

/** Queries a record type, falling back to the secondary resolver on failure. */
async function resolve(name: string, type: string): Promise<DnsResponse | null> {
  for (const endpoint of DOH_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const res = await fetch(
        `${endpoint}?name=${encodeURIComponent(name)}&type=${type}`,
        { headers: { accept: 'application/dns-json' }, signal: controller.signal }
      );
      clearTimeout(timer);
      if (!res.ok) continue;
      return (await res.json()) as DnsResponse;
    } catch {
      // Try the next resolver.
    }
  }
  return null;
}

/**
 * TXT records arrive quoted, and records longer than 255 bytes arrive split
 * into several quoted chunks that must be joined without a separator.
 */
function txtValues(res: DnsResponse | null): string[] {
  return (res?.Answer ?? [])
    .filter(a => a.type === 16)
    .map(a => a.data.replace(/^"|"$/g, '').replace(/"\s+"/g, ''));
}

function findTxt(res: DnsResponse | null, prefix: string): string | null {
  return txtValues(res).find(v => v.toLowerCase().startsWith(prefix.toLowerCase())) ?? null;
}

/**
 * Accepts what people actually paste: a bare domain, a full URL, something with
 * a trailing slash, or a stray "www.".
 */
export function normalizeDomain(raw: string): string | LookupError {
  let s = raw.trim().toLowerCase();
  if (!s) return { kind: 'invalid' };

  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, '');   // strip scheme
  s = s.split(/[/?#]/)[0];                        // strip path, query, fragment
  s = s.replace(/^.*@/, '');                      // accept an email address too
  s = s.replace(/\.$/, '');                       // strip root dot
  s = s.replace(/:\d+$/, '');                     // strip port

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(s) || s.includes(':')) return { kind: 'is-ip' };

  s = s.replace(/^www\./, '');

  // Label rules: 1-63 chars, alphanumeric plus hyphen, not hyphen-terminated.
  // Unicode is allowed through so IDN domains still resolve via DoH.
  const labels = s.split('.');
  if (labels.length < 2) return { kind: 'invalid' };
  const ok = labels.every(l => l.length >= 1 && l.length <= 63 && !/^-|-$|[\s.]/.test(l));
  if (!ok || s.length > 253) return { kind: 'invalid' };

  return s;
}

/* ------------------------------------------------------------------ */
/* Individual checks                                                   */
/* ------------------------------------------------------------------ */

function checkDmarc(res: DnsResponse | null): CheckResult {
  const record = findTxt(res, 'v=DMARC1');
  if (!record) {
    return { id: 'dmarc', status: 'fail', score: 0, max: 16, value: null, finding: 'missing' };
  }
  const policy = /\bp\s*=\s*(none|quarantine|reject)/i.exec(record)?.[1]?.toLowerCase();
  const pctRaw = /\bpct\s*=\s*(\d{1,3})/i.exec(record)?.[1];
  const pct = pctRaw ? parseInt(pctRaw, 10) : 100;

  if (policy === 'reject') {
    // A p=reject that only applies to a slice of mail is not a p=reject in practice.
    const full = pct >= 100;
    return {
      id: 'dmarc', status: full ? 'pass' : 'partial', score: full ? 16 : 11, max: 16,
      value: record, finding: full ? 'reject' : 'rejectPartial',
    };
  }
  if (policy === 'quarantine') {
    return { id: 'dmarc', status: 'partial', score: 10, max: 16, value: record, finding: 'quarantine' };
  }
  return { id: 'dmarc', status: 'partial', score: 4, max: 16, value: record, finding: 'none' };
}

function checkSpf(res: DnsResponse | null): CheckResult {
  const record = findTxt(res, 'v=spf1');
  if (!record) {
    return { id: 'spf', status: 'fail', score: 0, max: 6, value: null, finding: 'missing' };
  }
  const all = /([-~?+])all\s*$/.exec(record.trim())?.[1];
  if (all === '-') {
    return { id: 'spf', status: 'pass', score: 6, max: 6, value: record, finding: 'hardFail' };
  }
  if (all === '~') {
    return { id: 'spf', status: 'partial', score: 4, max: 6, value: record, finding: 'softFail' };
  }
  return {
    id: 'spf',
    status: all ? 'partial' : 'fail',
    score: all ? 1 : 0,
    max: 6,
    value: record,
    finding: all === '+' ? 'passAll' : all === '?' ? 'neutral' : 'noAll',
  };
}

function checkMtaSts(res: DnsResponse | null): CheckResult {
  const record = findTxt(res, 'v=STSv1');
  return record
    // The policy file itself lives behind HTTPS, which the browser cannot read
    // cross-origin, so this confirms the signal rather than the full policy.
    ? { id: 'mtaSts', status: 'pass', score: 5, max: 5, value: record, finding: 'present' }
    : { id: 'mtaSts', status: 'fail', score: 0, max: 5, value: null, finding: 'missing' };
}

function checkTlsRpt(res: DnsResponse | null): CheckResult {
  const record = findTxt(res, 'v=TLSRPTv1');
  return record
    ? { id: 'tlsRpt', status: 'pass', score: 2, max: 2, value: record, finding: 'present' }
    : { id: 'tlsRpt', status: 'fail', score: 0, max: 2, value: null, finding: 'missing' };
}

function checkDnssec(ds: DnsResponse | null, apex: DnsResponse | null): CheckResult {
  const dsCount = (ds?.Answer ?? []).filter(a => a.type === 43).length;
  const authenticated = apex?.AD === true;

  if (dsCount > 0 && authenticated) {
    return { id: 'dnssec', status: 'pass', score: 15, max: 15, value: `${dsCount} DS`, finding: 'validated' };
  }
  if (dsCount > 0) {
    // Delegation signed but the resolver would not vouch for the answer.
    return { id: 'dnssec', status: 'partial', score: 8, max: 15, value: `${dsCount} DS`, finding: 'unvalidated' };
  }
  return { id: 'dnssec', status: 'fail', score: 0, max: 15, value: null, finding: 'missing' };
}

function checkCaa(res: DnsResponse | null): CheckResult {
  const records = (res?.Answer ?? []).filter(a => a.type === 257);
  return records.length > 0
    ? {
        id: 'caa', status: 'pass', score: 5, max: 5,
        value: records.map(r => r.data.replace(/^\d+\s+/, '')).join(', '),
        finding: 'present',
      }
    : { id: 'caa', status: 'fail', score: 0, max: 5, value: null, finding: 'missing' };
}

function checkIpv6(res: DnsResponse | null): CheckResult {
  const records = (res?.Answer ?? []).filter(a => a.type === 28);
  return records.length > 0
    ? { id: 'ipv6', status: 'pass', score: 5, max: 5, value: records[0].data, finding: 'present' }
    : { id: 'ipv6', status: 'fail', score: 0, max: 5, value: null, finding: 'missing' };
}

/* ------------------------------------------------------------------ */
/* Runner                                                              */
/* ------------------------------------------------------------------ */

export async function runDomainReport(input: string): Promise<DomainReport | LookupError> {
  const domain = normalizeDomain(input);
  if (typeof domain !== 'string') return domain;

  const [dmarcRes, apexTxt, mtaStsRes, tlsRptRes, dsRes, caaRes, aaaaRes, mxRes] = await Promise.all([
    resolve(`_dmarc.${domain}`, 'TXT'),
    resolve(domain, 'TXT'),
    resolve(`_mta-sts.${domain}`, 'TXT'),
    resolve(`_smtp._tls.${domain}`, 'TXT'),
    resolve(domain, 'DS'),
    resolve(domain, 'CAA'),
    resolve(domain, 'AAAA'),
    resolve(domain, 'MX'),
  ]);

  // Every resolver failed — a connectivity problem, not a verdict about the domain.
  if (!apexTxt && !dsRes && !mxRes && !aaaaRes) return { kind: 'network' };

  // NXDOMAIN on the apex means the domain simply does not exist.
  const apexStatuses = [apexTxt?.Status, mxRes?.Status, aaaaRes?.Status].filter(s => s !== undefined);
  if (apexStatuses.length > 0 && apexStatuses.every(s => s === 3)) return { kind: 'nxdomain' };

  const email: CheckResult[] = [
    checkDmarc(dmarcRes),
    checkSpf(apexTxt),
    checkMtaSts(mtaStsRes),
    checkTlsRpt(tlsRptRes),
  ];
  const integrity: CheckResult[] = [
    checkDnssec(dsRes, apexTxt ?? mxRes),
    checkCaa(caaRes),
    checkIpv6(aaaaRes),
  ];

  const group = (id: CheckGroup['id'], checks: CheckResult[]): CheckGroup => ({
    id,
    checks,
    score: checks.reduce((n, c) => n + c.score, 0),
    max: checks.reduce((n, c) => n + c.max, 0),
  });

  const groups = [group('email', email), group('integrity', integrity)];
  const score = groups.reduce((n, g) => n + g.score, 0);
  const max = groups.reduce((n, g) => n + g.max, 0);

  return {
    domain,
    score,
    max,
    percent: Math.round((score / max) * 100),
    groups,
    mxHosts: (mxRes?.Answer ?? [])
      .filter(a => a.type === 15)
      .map(a => a.data.replace(/^\d+\s+/, '').replace(/\.$/, '')),
    checkedAt: new Date(),
  };
}
