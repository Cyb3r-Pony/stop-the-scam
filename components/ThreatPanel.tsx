import React from 'react';
import { Lang } from '../types';
import { Icon, tr } from './ui';
import { ThreatReport, Verdict, summarise, deepLinks, TargetKind } from './threatApi';

type T = (bg: string, en: string, de: string) => string;

interface Props {
  lang: Lang;
  kind: TargetKind;
  target: string;
  report: ThreatReport | null;
  /** True when the proxy is deployed; false means we show deep links only. */
  configured: boolean;
  loading: boolean;
}

const VERDICT_STYLE: Record<Verdict, { border: string; bg: string; chip: string; text: string }> = {
  danger:  { border: 'border-red-300',     bg: 'bg-red-50',     chip: 'bg-red-600',     text: 'text-red-800' },
  caution: { border: 'border-amber-300',   bg: 'bg-amber-50',   chip: 'bg-amber-500',   text: 'text-amber-800' },
  clean:   { border: 'border-emerald-300', bg: 'bg-emerald-50', chip: 'bg-emerald-600', text: 'text-emerald-800' },
  unknown: { border: 'border-slate-300',   bg: 'bg-slate-50',   chip: 'bg-slate-500',   text: 'text-slate-700' },
};

/** Reputation findings from the threat-intelligence providers. */
const ThreatPanel: React.FC<Props> = ({ lang, kind, target, report, configured, loading }) => {
  const t: T = (bg, en, de) => tr(lang, bg, en, de);
  const links = deepLinks(kind, target);

  const verdictCopy = (v: Verdict) => ({
    danger: {
      title: t('Открити са сигнали за заплаха', 'Threat signals found', 'Bedrohungssignale gefunden'),
      body: t(
        'Независими източници свързват този адрес със зловредна дейност. Не въвеждайте данни и не изпращайте пари.',
        'Independent sources link this address to malicious activity. Do not enter any data or send money.',
        'Unabhängige Quellen verbinden diese Adresse mit schädlicher Aktivität. Geben Sie keine Daten ein und senden Sie kein Geld.'
      ),
    },
    caution: {
      title: t('Има сигнали, които изискват внимание', 'Signals that warrant caution', 'Signale, die Vorsicht erfordern'),
      body: t(
        'Част от източниците отбелязват нещо нередно. Това невинаги значи измама, но проверете допълнително, преди да се доверите.',
        'Some sources flag something unusual. This does not always mean fraud, but verify further before trusting it.',
        'Einige Quellen melden etwas Ungewöhnliches. Das bedeutet nicht immer Betrug, aber prüfen Sie weiter, bevor Sie vertrauen.'
      ),
    },
    clean: {
      title: t('Няма открити сигнали за заплаха', 'No threat signals found', 'Keine Bedrohungssignale gefunden'),
      body: t(
        'Нито един източник не докладва проблем. Внимание: нов измамен сайт изглежда точно така, докато някой не го докладва.',
        'No source reports a problem. Careful: a new fraudulent site looks exactly like this until somebody reports it.',
        'Keine Quelle meldet ein Problem. Achtung: Eine neue Betrugsseite sieht genauso aus, bis sie jemand meldet.'
      ),
    },
    unknown: {
      title: t('Няма достатъчно данни', 'Not enough data', 'Nicht genügend Daten'),
      body: t(
        'Източниците не знаят нищо за този адрес. Липсата на информация не е нито добър, нито лош знак.',
        'The sources know nothing about this address. An absence of information is neither a good nor a bad sign.',
        'Die Quellen wissen nichts über diese Adresse. Fehlende Informationen sind weder ein gutes noch ein schlechtes Zeichen.'
      ),
    },
  }[v]);

  const PROVIDER_LABEL: Record<string, string> = {
    virustotal: 'VirusTotal',
    abuseipdb: 'AbuseIPDB',
    ipinfo: 'ipinfo.io',
    urlhaus: 'URLhaus',
    threatfox: 'ThreatFox',
    urlscan: 'urlscan.io',
    web: t('Уеб сигурност', 'Web security', 'Web-Sicherheit'),
  };

  /** One line per provider, in plain language rather than raw fields. */
  const describe = (name: string, d: Record<string, unknown>): { text: string; tone: Verdict } => {
    if (!d.ok) {
      return {
        text: d.error === 'not_configured'
          ? t('Не е активиран', 'Not configured', 'Nicht konfiguriert')
          : t('Временно недостъпен', 'Temporarily unavailable', 'Vorübergehend nicht verfügbar'),
        tone: 'unknown',
      };
    }
    switch (name) {
      case 'virustotal': {
        if (d.known === false) return { text: t('Няма запис за този адрес.', 'No record for this address.', 'Kein Eintrag für diese Adresse.'), tone: 'unknown' };
        const mal = Number(d.malicious ?? 0);
        const total = mal + Number(d.suspicious ?? 0) + Number(d.harmless ?? 0) + Number(d.undetected ?? 0);
        return mal > 0
          ? { text: t(`${mal} от ${total} антивирусни системи го определят като опасен.`, `${mal} of ${total} antivirus engines flag it as malicious.`, `${mal} von ${total} Antiviren-Systemen stufen es als bösartig ein.`), tone: mal >= 4 ? 'danger' : 'caution' }
          : { text: t(`Нито една от ${total} антивирусни системи не го маркира.`, `None of ${total} antivirus engines flag it.`, `Keines von ${total} Antiviren-Systemen markiert es.`), tone: 'clean' };
      }
      case 'abuseipdb': {
        const score = Number(d.score ?? 0);
        const reports = Number(d.reports ?? 0);
        const where = [d.isp, d.country].filter(Boolean).join(', ');
        if (score >= 50) return { text: t(`Висок риск: ${score}% при ${reports} сигнала. ${where}`, `High risk: ${score}% from ${reports} reports. ${where}`, `Hohes Risiko: ${score}% aus ${reports} Meldungen. ${where}`), tone: 'danger' };
        if (score >= 10) return { text: t(`Умерен риск: ${score}% при ${reports} сигнала. ${where}`, `Moderate risk: ${score}% from ${reports} reports. ${where}`, `Mittleres Risiko: ${score}% aus ${reports} Meldungen. ${where}`), tone: 'caution' };
        return { text: t(`Няма значими сигнали за злоупотреба. ${where}`, `No significant abuse reports. ${where}`, `Keine wesentlichen Missbrauchsmeldungen. ${where}`), tone: 'clean' };
      }
      case 'ipinfo':
        return { text: [d.asName, d.country].filter(Boolean).join(' · ') || '—', tone: 'unknown' };
      case 'urlhaus':
        return d.listed
          ? { text: t(`Разпространява зловреден софтуер (${d.urlCount} адреса).`, `Distributing malware (${d.urlCount} URLs).`, `Verbreitet Schadsoftware (${d.urlCount} URLs).`), tone: 'danger' }
          : { text: t('Не е в базата за зловреден софтуер.', 'Not in the malware database.', 'Nicht in der Schadsoftware-Datenbank.'), tone: 'clean' };
      case 'threatfox':
        return d.listed
          ? { text: t(`Свързан със зловреден софтуер: ${d.malware}.`, `Linked to malware: ${d.malware}.`, `Mit Schadsoftware verbunden: ${d.malware}.`), tone: 'danger' }
          : { text: t('Няма точно съвпадение в базата с индикатори.', 'No exact match in the indicator database.', 'Keine exakte Übereinstimmung in der Indikator-Datenbank.'), tone: 'clean' };
      case 'urlscan': {
        if (!d.scanned) return { text: t('Няма предишни сканирания.', 'No previous scans.', 'Keine früheren Scans.'), tone: 'unknown' };
        const age = Number(d.apexDomainAgeDays ?? NaN);
        if (Number.isFinite(age) && age <= 30) {
          return { text: t(`Домейнът е регистриран преди ${age} дни — много нов.`, `The domain was registered ${age} days ago — very new.`, `Die Domain wurde vor ${age} Tagen registriert — sehr neu.`), tone: 'caution' };
        }
        const years = Number.isFinite(age) ? Math.floor(age / 365) : null;
        return {
          text: years !== null
            ? t(`Домейнът съществува от около ${years} г.`, `The domain has existed for about ${years} years.`, `Die Domain existiert seit etwa ${years} Jahren.`)
            : t('Има предишни сканирания.', 'Previous scans exist.', 'Frühere Scans vorhanden.'),
          tone: 'clean',
        };
      }
      case 'web': {
        if (!d.https) return { text: t('Сайтът не отговаря по защитена връзка.', 'The site does not respond over a secure connection.', 'Die Seite antwortet nicht über eine sichere Verbindung.'), tone: 'caution' };
        const have = ['hsts', 'csp', 'nosniff', 'referrerPolicy'].filter(k => d[k]).length;
        return { text: t(`Защитена връзка, ${have} от 4 защитни настройки.`, `Secure connection, ${have} of 4 hardening headers.`, `Sichere Verbindung, ${have} von 4 Schutz-Headern.`), tone: have >= 3 ? 'clean' : 'caution' };
      }
      default:
        return { text: '—', tone: 'unknown' };
    }
  };

  const toneDot: Record<Verdict, string> = {
    danger: 'bg-red-500', caution: 'bg-amber-500', clean: 'bg-emerald-500', unknown: 'bg-slate-300',
  };

  return (
    <div className="mt-5">
      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 flex items-center gap-4">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mono text-[12px] uppercase tracking-[0.15em] text-slate-400">
            {t('Проверка в базите за заплахи...', 'Querying threat databases...', 'Bedrohungsdatenbanken werden abgefragt...')}
          </p>
        </div>
      )}

      {!loading && report && (() => {
        const { verdict } = summarise(report);
        const v = VERDICT_STYLE[verdict];
        const copy = verdictCopy(verdict);
        return (
          <>
            <div className={`rounded-xl border ${v.border} ${v.bg} p-7 mb-5`}>
              <div className="flex items-start gap-4">
                <span className={`flex-shrink-0 w-10 h-10 rounded-lg ${v.chip} text-white flex items-center justify-center`}>
                  {verdict === 'clean' ? Icon.shield('w-5 h-5') : Icon.alert('w-5 h-5')}
                </span>
                <div>
                  <h3 className={`text-[17px] font-bold ${v.text} mb-1.5`}>{copy.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-700">{copy.body}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden mb-5">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-[15px] font-bold text-slate-900">
                  {t('Какво казва всеки източник', 'What each source says', 'Was jede Quelle sagt')}
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {Object.entries(report.sources).map(([name, data]) => {
                  const d = describe(name, data as Record<string, unknown>);
                  return (
                    <div key={name} className="px-6 py-4 flex items-start gap-3.5">
                      <span className={`flex-shrink-0 w-2 h-2 rounded-full ${toneDot[d.tone]} mt-2`} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">{PROVIDER_LABEL[name] ?? name}</h4>
                        <p className="text-[13px] leading-relaxed text-slate-600">{d.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {report.cached && (
                <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50">
                  <span className="mono text-[10px] text-slate-400">
                    {t('От кеша — проверено в последния час', 'From cache — checked within the last hour', 'Aus dem Cache — innerhalb der letzten Stunde geprüft')}
                  </span>
                </div>
              )}
            </div>
          </>
        );
      })()}

      {!loading && !report && configured && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-5">
          <p className="text-[14px] leading-relaxed text-slate-700">
            {t(
              'Услугата за проверка на репутация не отговори. Използвайте директните връзки по-долу.',
              'The reputation service did not respond. Use the direct links below.',
              'Der Reputationsdienst hat nicht geantwortet. Nutzen Sie die direkten Links unten.'
            )}
          </p>
        </div>
      )}

      {/* Always offered: the provider's own site works without any key */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-[14px] font-bold text-slate-900 mb-1.5">
          {t('Проверете и директно при източниците', 'Check directly at the sources too', 'Prüfen Sie auch direkt bei den Quellen')}
        </h3>
        <p className="text-[13px] leading-relaxed text-slate-600 mb-5">
          {t(
            'Никой източник не е пълен. При съмнение проверете в поне два независими.',
            'No single source is complete. When in doubt, check at least two independent ones.',
            'Keine einzelne Quelle ist vollständig. Prüfen Sie im Zweifel mindestens zwei unabhängige.'
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {links.map(l => (
            <a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700 text-[12px] font-semibold transition-colors"
            >
              {l.name}
              {Icon.external('w-3.5 h-3.5')}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatPanel;
