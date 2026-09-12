import React, { useState } from 'react';
import { Lang } from '../types';
import { PageHeader, Section, Container, Btn, LiveDot, Icon, tr } from './ui';
import {
  runDomainReport, DomainReport, LookupError, CheckId, CheckResult, CheckStatus,
  buildWebGroups, withGroups, WebSurface, GroupId,
} from './domainChecks';
import ThreatPanel from './ThreatPanel';
import {
  fetchThreatReport, isThreatApiConfigured, looksLikeIp, ThreatReport, TargetKind,
} from './threatApi';

interface Props {
  lang: Lang;
  onBack: () => void;
  onNavigate: (page: 'tools') => void;
}

type T = (bg: string, en: string, de: string) => string;

const CHECK_META: Record<CheckId, { label: (t: T) => string; why: (t: T) => string }> = {
  dmarc: {
    label: () => 'DMARC',
    why: t => t(
      'Спира измамниците да изпращат имейли, които изглеждат като от този домейн.',
      'Stops fraudsters from sending email that appears to come from this domain.',
      'Verhindert, dass Betrüger E-Mails senden, die von dieser Domain zu stammen scheinen.'
    ),
  },
  spf: {
    label: () => 'SPF',
    why: t => t(
      'Определя кои сървъри имат право да изпращат поща от името на домейна.',
      'Declares which servers are allowed to send mail on the domain\'s behalf.',
      'Legt fest, welche Server im Namen der Domain E-Mails senden dürfen.'
    ),
  },
  mtaSts: {
    label: () => 'MTA-STS',
    why: t => t(
      'Изисква пощата към домейна да пътува криптирана и пречи на подслушване.',
      'Requires mail to the domain to travel encrypted, preventing interception.',
      'Verlangt, dass E-Mails an die Domain verschlüsselt übertragen werden.'
    ),
  },
  tlsRpt: {
    label: () => 'TLS-RPT',
    why: t => t(
      'Уведомява собственика, когато криптирането на пощата се проваля.',
      'Notifies the owner when mail encryption fails.',
      'Benachrichtigt den Eigentümer, wenn die E-Mail-Verschlüsselung fehlschlägt.'
    ),
  },
  dnssec: {
    label: () => 'DNSSEC',
    why: t => t(
      'Подписва DNS отговорите, за да не може някой да ви пренасочи към фалшив сайт.',
      'Signs DNS answers so nobody can redirect you to a fake site.',
      'Signiert DNS-Antworten, damit niemand Sie auf eine gefälschte Seite umleiten kann.'
    ),
  },
  caa: {
    label: () => 'CAA',
    why: t => t(
      'Ограничава кой може да издава SSL сертификати за този домейн.',
      'Restricts which authorities may issue SSL certificates for this domain.',
      'Beschränkt, wer SSL-Zertifikate für diese Domain ausstellen darf.'
    ),
  },
  ipv6: {
    label: () => 'IPv6',
    why: t => t(
      'Показва, че инфраструктурата се поддържа съвременно.',
      'Indicates the infrastructure is kept modern.',
      'Zeigt, dass die Infrastruktur modern gehalten wird.'
    ),
  },
  https: {
    label: () => 'HTTPS',
    why: t => t(
      'Криптира връзката, за да не може някой да чете или подменя данните по пътя.',
      'Encrypts the connection so nobody can read or alter data in transit.',
      'Verschlüsselt die Verbindung, damit niemand Daten unterwegs lesen oder ändern kann.'
    ),
  },
  httpsRedirect: {
    label: t => t('HTTP → HTTPS', 'HTTP → HTTPS', 'HTTP → HTTPS'),
    why: t => t(
      'Пренасочва незащитените заявки към защитената версия на сайта.',
      'Redirects insecure requests to the secure version of the site.',
      'Leitet unsichere Anfragen auf die sichere Version der Seite um.'
    ),
  },
  hsts: {
    label: () => 'HSTS',
    why: t => t(
      'Инструктира браузъра занапред да използва само защитена връзка към този сайт.',
      'Tells the browser to use only a secure connection to this site from now on.',
      'Weist den Browser an, künftig nur noch eine sichere Verbindung zu nutzen.'
    ),
  },
  csp: {
    label: () => 'Content Security Policy',
    why: t => t(
      'Ограничава какво съдържание може да се зарежда — основна защита срещу вградени скриптове.',
      'Restricts what content may load — a core defence against injected scripts.',
      'Beschränkt, welche Inhalte geladen werden dürfen — Kernschutz gegen eingeschleuste Skripte.'
    ),
  },
  clickjacking: {
    label: t => t('Защита от clickjacking', 'Clickjacking protection', 'Clickjacking-Schutz'),
    why: t => t(
      'Пречи страницата да бъде вградена в чужд сайт, който да краде кликовете ви.',
      'Prevents the page being embedded in another site that steals your clicks.',
      'Verhindert, dass die Seite in eine fremde Website eingebettet wird, die Ihre Klicks stiehlt.'
    ),
  },
  nosniff: {
    label: t => t('MIME защита', 'MIME protection', 'MIME-Schutz'),
    why: t => t(
      'Спира браузъра да гадае типа на файл — техника, използвана за заобикаляне на защити.',
      'Stops the browser guessing a file\'s type — a technique used to bypass defences.',
      'Hindert den Browser daran, den Dateityp zu erraten — eine Technik zur Umgehung von Schutzmaßnahmen.'
    ),
  },
  referrerPolicy: {
    label: () => 'Referrer Policy',
    why: t => t(
      'Ограничава каква информация за адреса ви изтича към други сайтове.',
      'Limits what address information leaks to other sites.',
      'Begrenzt, welche Adressinformationen an andere Seiten gelangen.'
    ),
  },
  permissionsPolicy: {
    label: () => 'Permissions Policy',
    why: t => t(
      'Определя кои устройства — камера, микрофон, местоположение — сайтът може да поиска.',
      'Declares which devices — camera, microphone, location — the site may request.',
      'Legt fest, welche Geräte — Kamera, Mikrofon, Standort — die Seite anfordern darf.'
    ),
  },
  securityTxt: {
    label: () => 'security.txt',
    why: t => t(
      'Публичен адрес за връзка, на който изследователите могат да докладват уязвимости.',
      'A public contact address where researchers can report vulnerabilities.',
      'Eine öffentliche Kontaktadresse, an die Forscher Schwachstellen melden können.'
    ),
  },
};

const FINDINGS: Record<string, (t: T) => string> = {
  'dmarc.reject': t => t('Строга политика p=reject за 100% от съобщенията.', 'Strict p=reject policy covering 100% of messages.', 'Strenge p=reject-Richtlinie für 100% der Nachrichten.'),
  'dmarc.rejectPartial': t => t('Политика p=reject, но само за част от съобщенията.', 'A p=reject policy, but applied to only some messages.', 'p=reject-Richtlinie, aber nur für einen Teil der Nachrichten.'),
  'dmarc.quarantine': t => t('Подозрителните съобщения отиват в спам, вместо да се отхвърлят.', 'Suspicious messages go to spam instead of being rejected.', 'Verdächtige Nachrichten landen im Spam statt abgelehnt zu werden.'),
  'dmarc.none': t => t('Само наблюдение — фалшивите съобщения не се спират.', 'Monitoring only — forged messages are not blocked.', 'Nur Überwachung — gefälschte Nachrichten werden nicht blockiert.'),
  'dmarc.missing': t => t('Липсва DMARC запис. Всеки може да фалшифицира поща от този домейн.', 'No DMARC record. Anyone can forge mail from this domain.', 'Kein DMARC-Eintrag. Jeder kann E-Mails dieser Domain fälschen.'),

  'spf.hardFail': t => t('Строг край -all: непозволените податели се отказват.', 'Strict -all ending: unauthorised senders are rejected.', 'Strenges -all: nicht autorisierte Absender werden abgelehnt.'),
  'spf.softFail': t => t('Мек край ~all: непозволените податели само се маркират.', 'Soft ~all ending: unauthorised senders are only flagged.', 'Weiches ~all: nicht autorisierte Absender werden nur markiert.'),
  'spf.neutral': t => t('Неутрален край ?all — не дава никаква защита.', 'Neutral ?all ending — provides no protection.', 'Neutrales ?all — bietet keinen Schutz.'),
  'spf.passAll': t => t('Край +all разрешава на всеки да изпраща поща. Това е опасно.', 'A +all ending lets anyone send mail. This is dangerous.', 'Ein +all erlaubt jedem den Mailversand. Das ist gefährlich.'),
  'spf.noAll': t => t('Записът не завършва с правило all.', 'The record does not end with an all rule.', 'Der Eintrag endet nicht mit einer all-Regel.'),
  'spf.missing': t => t('Липсва SPF запис.', 'No SPF record.', 'Kein SPF-Eintrag.'),

  'mtaSts.present': t => t('Публикуван е MTA-STS сигнал.', 'An MTA-STS signal is published.', 'Ein MTA-STS-Signal ist veröffentlicht.'),
  'mtaSts.missing': t => t('Липсва MTA-STS сигнал.', 'No MTA-STS signal.', 'Kein MTA-STS-Signal.'),
  'tlsRpt.present': t => t('Публикуван е TLS-RPT запис.', 'A TLS-RPT record is published.', 'Ein TLS-RPT-Eintrag ist veröffentlicht.'),
  'tlsRpt.missing': t => t('Липсва TLS-RPT запис.', 'No TLS-RPT record.', 'Kein TLS-RPT-Eintrag.'),

  'dnssec.validated': t => t('Валидиращият DNS резолвер потвърждава подписа.', 'A validating DNS resolver confirms the signature.', 'Ein validierender DNS-Resolver bestätigt die Signatur.'),
  'dnssec.unvalidated': t => t('Има подпис, но резолверът не го потвърди.', 'A signature exists, but the resolver did not confirm it.', 'Eine Signatur existiert, aber der Resolver hat sie nicht bestätigt.'),
  'dnssec.missing': t => t('Домейнът не е подписан с DNSSEC.', 'The domain is not signed with DNSSEC.', 'Die Domain ist nicht mit DNSSEC signiert.'),

  'caa.present': t => t('Издаването на сертификати е ограничено.', 'Certificate issuance is restricted.', 'Die Zertifikatsausstellung ist eingeschränkt.'),
  'caa.missing': t => t('Липсва CAA ограничение.', 'No CAA restriction.', 'Keine CAA-Beschränkung.'),
  'ipv6.present': t => t('Публикуван е модерен IPv6 адрес.', 'A modern IPv6 address is published.', 'Eine moderne IPv6-Adresse ist veröffentlicht.'),
  'ipv6.missing': t => t('Няма IPv6 адрес.', 'No IPv6 address.', 'Keine IPv6-Adresse.'),

  'https.present': t => t('Сайтът отговаря успешно през защитена връзка.', 'The site responds successfully over a secure connection.', 'Die Seite antwortet erfolgreich über eine sichere Verbindung.'),
  'https.missing': t => t('Сайтът не отговаря през защитена връзка.', 'The site does not respond over a secure connection.', 'Die Seite antwortet nicht über eine sichere Verbindung.'),
  'httpsRedirect.present': t => t('Незащитената заявка се пренасочва към HTTPS.', 'Insecure requests are redirected to HTTPS.', 'Unsichere Anfragen werden zu HTTPS umgeleitet.'),
  'httpsRedirect.missing': t => t('Незащитената заявка не се пренасочва.', 'Insecure requests are not redirected.', 'Unsichere Anfragen werden nicht umgeleitet.'),
  'hsts.present': t => t('Браузърът получава инструкция да използва само HTTPS.', 'The browser is instructed to use HTTPS only.', 'Der Browser wird angewiesen, nur HTTPS zu verwenden.'),
  'hsts.shortMaxAge': t => t('Инструкцията важи за прекалено кратък период.', 'The instruction lasts too short a period.', 'Die Anweisung gilt für einen zu kurzen Zeitraum.'),
  'hsts.missing': t => t('Липсва HSTS инструкция.', 'No HSTS instruction.', 'Keine HSTS-Anweisung.'),
  'csp.present': t => t('Публикувана е политика за разрешеното съдържание.', 'A content policy is published.', 'Eine Inhaltsrichtlinie ist veröffentlicht.'),
  'csp.missing': t => t('Липсва Content Security Policy.', 'No Content Security Policy.', 'Keine Content Security Policy.'),
  'clickjacking.present': t => t('Ограничено е вграждането на страницата в чужд frame.', 'Embedding the page in a foreign frame is restricted.', 'Das Einbetten der Seite in einen fremden Frame ist eingeschränkt.'),
  'clickjacking.missing': t => t('Страницата може да бъде вградена в чужд сайт.', 'The page can be embedded in another site.', 'Die Seite kann in eine fremde Website eingebettet werden.'),
  'nosniff.present': t => t('Браузърът няма да гадае типа на съдържанието.', 'The browser will not guess the content type.', 'Der Browser wird den Inhaltstyp nicht erraten.'),
  'nosniff.missing': t => t('Липсва nosniff.', 'No nosniff.', 'Kein nosniff.'),
  'referrerPolicy.present': t => t('Ограничено е изтичането на адресен контекст.', 'Leakage of address context is limited.', 'Das Durchsickern von Adresskontext ist begrenzt.'),
  'referrerPolicy.missing': t => t('Липсва Referrer Policy.', 'No Referrer Policy.', 'Keine Referrer Policy.'),
  'permissionsPolicy.present': t => t('Достъпът до устройства е ограничен изрично.', 'Device access is explicitly restricted.', 'Gerätezugriff ist ausdrücklich eingeschränkt.'),
  'permissionsPolicy.missing': t => t('Липсва Permissions-Policy.', 'No Permissions-Policy.', 'Keine Permissions-Policy.'),
  'securityTxt.present': t => t('Открит е валиден /.well-known/security.txt.', 'A valid /.well-known/security.txt was found.', 'Eine gültige /.well-known/security.txt wurde gefunden.'),
  'securityTxt.missing': t => t('Не е открит валиден /.well-known/security.txt.', 'No valid /.well-known/security.txt found.', 'Keine gültige /.well-known/security.txt gefunden.'),
  'https.unreachable': t => t('Сайтът е недостъпен, затова уеб проверките не могат да се извършат.', 'The site is unreachable, so the web checks cannot run.', 'Die Seite ist nicht erreichbar, daher können die Web-Prüfungen nicht laufen.'),
};

const UNREACHABLE = (t: T) => t('Сайтът е недостъпен.', 'The site is unreachable.', 'Die Seite ist nicht erreichbar.');

const STATUS_STYLE: Record<CheckStatus, { dot: string; text: string; icon: React.ReactNode }> = {
  pass: {
    dot: 'bg-emerald-500', text: 'text-emerald-600',
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  },
  partial: {
    dot: 'bg-amber-500', text: 'text-amber-600',
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>,
  },
  fail: {
    dot: 'bg-red-500', text: 'text-red-600',
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>,
  },
};

/** Circular score gauge, matching the visual language of comparable public tools. */
const ScoreRing: React.FC<{ percent: number; score: number; max: number }> = ({ percent, score, max }) => {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const filled = (percent / 100) * circumference;
  const stroke = percent >= 80 ? '#059669' : percent >= 50 ? '#f59e0b' : '#dc2626';

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          style={{ transition: 'stroke-dasharray 700ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="display text-3xl font-extrabold text-slate-900 tabular-nums leading-none">{score}</span>
        <span className="mono text-[10px] text-slate-400 mt-1">/{max}</span>
      </div>
    </div>
  );
};

/** Public domain-hygiene scorecard, computed in the visitor's own browser. */
const DomainChecker: React.FC<Props> = ({ lang, onBack, onNavigate }) => {
  const t: T = (bg, en, de) => tr(lang, bg, en, de);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<DomainReport | null>(null);
  const [error, setError] = useState<LookupError | null>(null);
  const [threat, setThreat] = useState<ThreatReport | null>(null);
  const [threatLoading, setThreatLoading] = useState(false);
  const [checked, setChecked] = useState<{ kind: TargetKind; target: string } | null>(null);
  const apiConfigured = isThreatApiConfigured();

  /**
   * Domains get the DNS scorecard plus reputation; IP addresses get reputation
   * only, since none of the DNS hygiene checks apply to a bare address.
   */
  const check = async (value?: string) => {
    const raw = (value ?? input).trim();
    if (!raw || loading) return;
    if (value) setInput(value);

    setLoading(true);
    setError(null);
    setReport(null);
    setThreat(null);
    setChecked(null);

    if (looksLikeIp(raw)) {
      setChecked({ kind: 'ip', target: raw });
      setLoading(false);
      setThreatLoading(apiConfigured);
      if (apiConfigured) {
        setThreat(await fetchThreatReport('ip', raw));
        setThreatLoading(false);
      }
      return;
    }

    const result = await runDomainReport(raw);
    if ('kind' in result) {
      setError(result);
      setLoading(false);
      return;
    }
    // Show the DNS half immediately; it needs nothing but the visitor's browser.
    setReport(result);
    setLoading(false);
    setChecked({ kind: 'domain', target: result.domain });

    if (apiConfigured) {
      setThreatLoading(true);
      const intel = await fetchThreatReport('domain', result.domain);
      setThreat(intel);
      setThreatLoading(false);

      // The web-connection and disclosure checks can only be observed
      // server-side, so they arrive with the intelligence response and are
      // folded into the same scorecard, taking it from 54 points to 100.
      const web = intel?.sources?.web as WebSurface | undefined;
      const extra = buildWebGroups(web);
      if (extra.length > 0) setReport(prev => (prev ? withGroups(prev, extra) : prev));
    }
  };

  const errorText = (e: LookupError) => ({
    invalid: t('Това не изглежда като валиден домейн. Опитайте например: banka.bg', 'That does not look like a valid domain. Try something like: example.com', 'Das sieht nicht nach einer gültigen Domain aus. Versuchen Sie z. B.: example.com'),
    'is-ip': t('Това не изглежда като валиден IP адрес.', 'That does not look like a valid IP address.', 'Das sieht nicht nach einer gültigen IP-Adresse aus.'),
    nxdomain: t('Този домейн не съществува. Проверете за печатна грешка.', 'This domain does not exist. Check for a typo.', 'Diese Domain existiert nicht. Prüfen Sie auf Tippfehler.'),
    network: t('Проверката не успя. Проверете връзката си и опитайте отново.', 'The check failed. Check your connection and try again.', 'Die Prüfung ist fehlgeschlagen. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.'),
  }[e.kind]);

  const groupTitle = (id: GroupId) => ({
    email: t('Доверие в служебната поща', 'Email trust', 'Vertrauen in die E-Mail'),
    integrity: t('Цялост на домейна', 'Domain integrity', 'Domain-Integrität'),
    web: t('Защита на уеб връзката', 'Web connection security', 'Sicherheit der Web-Verbindung'),
    disclosure: t('Отговорно докладване', 'Responsible disclosure', 'Verantwortungsvolle Offenlegung'),
  }[id]);

  const verdict = (percent: number) =>
    percent >= 80
      ? t('Ключовите базови защити са налице. Това е силен сигнал за добра киберхигиена, но не заменя одит за сигурност.', 'The key baseline protections are in place. A strong signal of good cyber hygiene, though not a substitute for a security audit.', 'Die wichtigsten Basisschutzmaßnahmen sind vorhanden. Ein starkes Signal für gute Cyber-Hygiene, ersetzt aber kein Sicherheitsaudit.')
      : percent >= 50
      ? t('Част от защитите са налице, но остават значими пропуски.', 'Some protections are in place, but meaningful gaps remain.', 'Einige Schutzmaßnahmen sind vorhanden, aber es bleiben erhebliche Lücken.')
      : t('Базовите защити до голяма степен липсват. Това не доказва измама, но е слаб резултат.', 'The baseline protections are largely missing. This does not prove fraud, but it is a weak result.', 'Die Basisschutzmaßnahmen fehlen weitgehend. Das beweist keinen Betrug, ist aber ein schwaches Ergebnis.');

  return (
    <div className="bg-white">
      <PageHeader
        accent="blue"
        eyebrow={t('Проверка на домейн или IP', 'Domain & IP check', 'Domain- & IP-Prüfung')}
        title={t('Колко сериозно се пази този домейн?', 'How well is this domain protected?', 'Wie gut ist diese Domain geschützt?')}
        lead={t(
          'Въведете домейн за пълна оценка от 100 точки на защитата му, или IP адрес за проверка на репутацията му. Слабият резултат не доказва измама — но е основание да внимавате.',
          'Enter a domain for a full 100-point assessment of its protection, or an IP address to check its reputation. A weak result does not prove fraud — but it is a reason to be careful.',
          'Geben Sie eine Domain für eine vollständige 100-Punkte-Bewertung ihres Schutzes ein, oder eine IP-Adresse zur Reputationsprüfung. Ein schwaches Ergebnis beweist keinen Betrug — ist aber ein Grund zur Vorsicht.'
        )}
        onBack={onBack}
        backLabel={t('Начало', 'Home', 'Startseite')}
        meta={
          <LiveDot accent="emerald">
            {t('Проверката тече във вашия браузър — ние не я виждаме', 'The check runs in your browser — we never see it', 'Die Prüfung läuft in Ihrem Browser — wir sehen sie nie')}
          </LiveDot>
        }
      />

      {/* Input */}
      <Section tone="white" size="sm">
        <Container width="narrow">
          <form
            onSubmit={e => { e.preventDefault(); check(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <label htmlFor="domain-input" className="sr-only">
                {t('Домейн за проверка', 'Domain to check', 'Zu prüfende Domain')}
              </label>
              <input
                id="domain-input"
                type="text"
                inputMode="url"
                autoComplete="off"
                spellCheck={false}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('домейн или IP адрес, напр. banka.bg', 'domain or IP address, e.g. example.com', 'Domain oder IP-Adresse, z. B. example.com')}
                className="mono w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 py-3.5 pl-11 pr-4 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
              />
              <span className="absolute left-4 top-4 text-slate-400">{Icon.search('w-4 h-4')}</span>
            </div>
            <Btn accent="blue" size="lg" onClick={() => check()} className="sm:w-auto">
              {loading
                ? t('Проверява се...', 'Checking...', 'Wird geprüft...')
                : t('Провери', 'Check', 'Prüfen')}
            </Btn>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mono text-[11px] text-slate-400">
              {t('Опитайте:', 'Try:', 'Versuchen Sie:')}
            </span>
            {['mvr.bg', 'stop-the-scam.xyz', '8.8.8.8'].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => check(d)}
                className="mono text-[11px] px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                {d}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 anim-fade-up">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-amber-500 text-white flex items-center justify-center">
                {Icon.alert('w-4 h-4')}
              </span>
              <p className="text-[14px] leading-relaxed text-slate-800 pt-0.5">{errorText(error)}</p>
            </div>
          )}

          {loading && (
            <div className="mt-10 flex flex-col items-center py-12">
              <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="mono text-[12px] uppercase tracking-[0.15em] text-slate-400">
                {t('Четене на DNS записи...', 'Reading DNS records...', 'DNS-Einträge werden gelesen...')}
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Results */}
      {checked && !loading && (
        <Section tone="tint" size="sm" className="anim-fade-up">
          <Container width="narrow">
            {report && (<>
            {/* Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 md:p-8 mb-5">
              <div className="flex flex-col sm:flex-row items-start gap-7">
                <ScoreRing percent={report.percent} score={report.score} max={report.max} />
                <div className="flex-1 min-w-0">
                  <h2 className="mono text-xl font-semibold text-slate-900 break-all mb-2">{report.domain}</h2>
                  <p className="text-[15px] leading-relaxed text-slate-600">{verdict(report.percent)}</p>
                  <p className="mono text-[11px] text-slate-400 mt-4">
                    {t('Проверено', 'Checked', 'Geprüft')}{' '}
                    {report.checkedAt.toLocaleString(lang === 'bg' ? 'bg-BG' : lang === 'de' ? 'de-DE' : 'en-GB')}
                  </p>
                </div>
              </div>
            </div>

            {/* Groups */}
            {report.groups.map(group => (
              <div key={group.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden mb-5">
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-[15px] font-bold text-slate-900">{groupTitle(group.id)}</h3>
                  <span className={`mono text-[13px] font-semibold tabular-nums ${
                    group.score === group.max ? 'text-emerald-600' : group.score >= group.max / 2 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {group.score}/{group.max}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {group.checks.map((c: CheckResult) => {
                    const s = STATUS_STYLE[c.status];
                    const meta = CHECK_META[c.id];
                    return (
                      <div key={c.id} className="px-6 py-5">
                        <div className="flex items-start gap-3.5">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full ${s.dot} text-white flex items-center justify-center mt-0.5`}>
                            {s.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3 mb-1">
                              <h4 className="text-[14px] font-bold text-slate-900">{meta.label(t)}</h4>
                              <span className={`mono text-[12px] tabular-nums flex-shrink-0 ${s.text}`}>
                                {c.score}/{c.max}
                              </span>
                            </div>
                            <p className="text-[13px] leading-relaxed text-slate-700">
                              {c.finding === 'unreachable'
                                ? UNREACHABLE(t)
                                : (FINDINGS[`${c.id}.${c.finding}`]?.(t) ?? c.finding)}
                            </p>
                            <p className="text-[12px] leading-relaxed text-slate-500 mt-1">{meta.why(t)}</p>
                            {c.value && (
                              <code className="mono block text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 mt-3 break-all">
                                {c.value}
                              </code>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            </>)}

            {/* Reputation, from the threat-intelligence proxy */}
            <ThreatPanel
              lang={lang}
              kind={checked.kind}
              target={checked.target}
              report={threat}
              configured={apiConfigured}
              loading={threatLoading}
            />

            {/* Shown only while the web half is unavailable */}
            {report && report.max < 100 && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-6">
              <h3 className="text-[14px] font-bold text-slate-900 mb-2">
                {t('Частичен резултат', 'Partial result', 'Teilergebnis')}
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-700 mb-5">
                {t(
                  'Показани са само DNS проверките (54 от 100 точки). Проверките на самия уебсайт — HTTPS, HSTS, защитни заглавия и security.txt — не могат да се четат от браузъра ви и изискват услугата за проверка да е активна.',
                  'Only the DNS checks are shown (54 of 100 points). The website\'s own checks — HTTPS, HSTS, security headers and security.txt — cannot be read from your browser and require the check service to be running.',
                  'Es werden nur die DNS-Prüfungen angezeigt (54 von 100 Punkten). Die Prüfungen der Website selbst — HTTPS, HSTS, Sicherheits-Header und security.txt — können nicht aus Ihrem Browser gelesen werden und erfordern den aktiven Prüfdienst.'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.virustotal.com/gui/domain/${encodeURIComponent(report.domain)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-[12px] font-bold transition-colors"
                >
                  {Icon.external('w-3.5 h-3.5')}
                  {t('Репутация във VirusTotal', 'Reputation on VirusTotal', 'Reputation auf VirusTotal')}
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('tools')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-[12px] font-bold transition-colors"
                >
                  {t('Всички инструменти', 'All tools', 'Alle Werkzeuge')}
                </button>
              </div>
            </div>
            )}
          </Container>
        </Section>
      )}

      {/* Standing caveat — shown before any check is run */}
      {!checked && !loading && (
        <Section tone="tint" size="sm">
          <Container width="narrow">
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-7">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                {Icon.shield('w-5 h-5')}
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900 mb-2">
                  {t('Как да четете резултата', 'How to read the result', 'Wie Sie das Ergebnis lesen')}
                </h2>
                <p className="text-[13px] leading-relaxed text-slate-700">
                  {t(
                    'Високият резултат означава, че собственикът поддържа домейна си отговорно — не че сайтът е честен. Измамник може да си настрои перфектни DNS записи за един час. Ниският резултат при банка или институция обаче е реален повод за съмнение: сериозните организации не оставят пощата си незащитена.',
                    'A high score means the owner maintains their domain responsibly — not that the site is honest. A fraudster can configure perfect DNS records in an hour. A low score on a bank or institution, however, is a genuine reason for doubt: serious organisations do not leave their email unprotected.',
                    'Ein hoher Wert bedeutet, dass der Eigentümer seine Domain verantwortungsvoll pflegt — nicht, dass die Seite ehrlich ist. Ein Betrüger kann perfekte DNS-Einträge in einer Stunde einrichten. Ein niedriger Wert bei einer Bank oder Institution ist jedoch ein echter Zweifelsgrund: Seriöse Organisationen lassen ihre E-Mail nicht ungeschützt.'
                  )}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
};

export default DomainChecker;
