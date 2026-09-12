/**
 * Client for the threat-intelligence worker (see worker/).
 *
 * The worker holds the provider API keys, because a static site cannot: anything
 * the frontend knows, every visitor knows. This module therefore carries no
 * credentials — only the worker's public URL.
 *
 * If the worker is not deployed, nothing here throws. The caller falls back to
 * deep links into the same providers' own websites, which stay useful without
 * any key at all.
 */

const API_BASE = (import.meta.env?.VITE_API_BASE ?? '').replace(/\/$/, '');

export const isThreatApiConfigured = (): boolean => API_BASE.length > 0;

export type TargetKind = 'ip' | 'domain';

export interface ProviderResult {
  ok: boolean;
  error?: string;
  [key: string]: unknown;
}

export interface ThreatReport {
  target: string;
  type: TargetKind;
  checkedAt: string;
  cached?: boolean;
  sources: Record<string, ProviderResult>;
}

const TIMEOUT_MS = 12000;

/** Returns null whenever the service is unavailable — never throws at the caller. */
export async function fetchThreatReport(kind: TargetKind, target: string): Promise<ThreatReport | null> {
  if (!isThreatApiConfigured()) return null;
  try {
    const res = await fetch(`${API_BASE}/v1/${kind}/${encodeURIComponent(target)}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      // Never read a verdict out of the browser's HTTP cache. The worker keeps an
      // edge cache to protect provider quotas; a second copy in the visitor's
      // browser would only pin a stale verdict after a domain has been flagged.
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body && typeof body === 'object' && 'sources' in body ? (body as ThreatReport) : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Interpretation                                                      */
/* ------------------------------------------------------------------ */

export type Verdict = 'clean' | 'caution' | 'danger' | 'unknown';

/**
 * Collapses several providers into one verdict.
 *
 * Biased towards caution, because the cost of the two mistakes is not symmetric
 * for someone being defrauded right now — but not naively so. A handful of the
 * ~90 engines VirusTotal aggregates carry known false positives: google.com
 * itself comes back with 2 detections. Treating any non-zero count as "dangerous"
 * would flag major banks and destroy the tool's credibility, so a small number of
 * detections is caution, and confidence comes from corroboration between
 * independent sources.
 */
export function summarise(report: ThreatReport): { verdict: Verdict; reasons: string[] } {
  const s = report.sources;
  const reasons: string[] = [];
  let verdict: Verdict = 'unknown';

  const bump = (v: Verdict) => {
    const rank: Record<Verdict, number> = { unknown: 0, clean: 1, caution: 2, danger: 3 };
    if (rank[v] > rank[verdict]) verdict = v;
  };

  // Curated, exact-match listings — high confidence on their own.
  const urlhausSrc = s.urlhaus;
  const tf = s.threatfox;
  const curatedHit =
    (urlhausSrc?.ok && urlhausSrc.listed === true) ||
    (tf?.ok && tf.listed === true);

  if (urlhausSrc?.ok) {
    if (urlhausSrc.listed) { bump('danger'); reasons.push('urlhaus.listed'); }
    else bump('clean');
  }
  if (tf?.ok) {
    if (tf.listed) { bump('danger'); reasons.push('threatfox.listed'); }
    else bump('clean');
  }

  const vt = s.virustotal;
  if (vt?.ok && vt.known !== false) {
    const mal = Number(vt.malicious ?? 0);
    const sus = Number(vt.suspicious ?? 0);
    const reputation = Number(vt.reputation ?? 0);
    const total = mal + sus + Number(vt.harmless ?? 0) + Number(vt.undetected ?? 0);
    reasons.push(`virustotal.ratio:${mal}/${total || '?'}`);

    if (mal >= 4 || (mal >= 1 && curatedHit)) {
      // Either many engines agree, or an independent curated source corroborates.
      bump('danger');
    } else if (mal >= 3 || (mal >= 1 && reputation < 0)) {
      bump('caution');
    } else if (mal >= 1 || sus >= 2) {
      // A couple of detections on a long-established, well-regarded domain is
      // far more likely to be engine noise than a real finding.
      if (reputation >= 50) bump('clean');
      else bump('caution');
    } else {
      bump('clean');
    }
  }

  const abuse = s.abuseipdb;
  if (abuse?.ok) {
    const score = Number(abuse.score ?? 0);
    if (score >= 50) { bump('danger'); reasons.push(`abuseipdb.score:${score}`); }
    else if (score >= 10) { bump('caution'); reasons.push(`abuseipdb.score:${score}`); }
    else bump('clean');
    if (abuse.isTor) reasons.push('abuseipdb.tor');
  }

  // A domain registered in the last month is one of the strongest scam signals.
  const scan = s.urlscan;
  if (scan?.ok && scan.scanned) {
    const age = Number(scan.apexDomainAgeDays ?? NaN);
    if (Number.isFinite(age)) {
      if (age <= 30) { bump('caution'); reasons.push(`urlscan.newDomain:${age}`); }
      else if (age <= 180) reasons.push(`urlscan.youngDomain:${age}`);
    }
  }

  return { verdict, reasons };
}

/* ------------------------------------------------------------------ */
/* Fallback deep links — useful with no worker and no key              */
/* ------------------------------------------------------------------ */

export interface DeepLink { name: string; url: string }

export function deepLinks(kind: TargetKind, target: string): DeepLink[] {
  const e = encodeURIComponent(target);
  return kind === 'ip'
    ? [
        { name: 'AbuseIPDB', url: `https://www.abuseipdb.com/check/${e}` },
        { name: 'VirusTotal', url: `https://www.virustotal.com/gui/ip-address/${e}` },
        { name: 'ipinfo.io', url: `https://ipinfo.io/${e}` },
        { name: 'ThreatFox', url: `https://threatfox.abuse.ch/browse.php?search=ioc%3A${e}` },
      ]
    : [
        { name: 'VirusTotal', url: `https://www.virustotal.com/gui/domain/${e}` },
        { name: 'urlscan.io', url: `https://urlscan.io/domain/${e}` },
        { name: 'URLhaus', url: `https://urlhaus.abuse.ch/browse.php?search=${e}` },
        { name: 'ThreatFox', url: `https://threatfox.abuse.ch/browse.php?search=ioc%3A${e}` },
      ];
}

/** Shared with the DNS checker so both agree on what counts as an IP. */
export function looksLikeIp(value: string): boolean {
  const v = value.trim();
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(v) || (/^[0-9a-f:]+$/i.test(v) && v.includes(':'));
}
