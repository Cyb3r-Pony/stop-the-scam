import React from 'react';
import { Lang } from '../types';
import { PageHeader, Section, Container, SectionHeading, LiveDot, Icon, ACCENTS, Accent, tr } from './ui';

interface Props {
  lang: Lang;
  onBack: () => void;
}

type Badge = 'free' | 'account' | 'publicResult';

interface Tool {
  name: string;
  host: string;
  url: string;
  badges: Badge[];
  desc: (t: T) => string;
}

interface ToolGroup {
  accent: Accent;
  icon: React.ReactNode;
  title: (t: T) => string;
  lead: (t: T) => string;
  tools: Tool[];
}

type T = (bg: string, en: string, de: string) => string;

/**
 * Directory of external verification tools.
 *
 * Grouped by the question a worried person is actually asking ("is this link safe?",
 * "who owns this IP?") rather than by vendor, and every entry states plainly whether
 * the query becomes public — that matters for people checking a message they were sent.
 */
const GROUPS: ToolGroup[] = [
  {
    accent: 'red',
    icon: Icon.search('w-5 h-5'),
    title: t => t('Проверка на линк, файл или IP адрес', 'Check a link, file, or IP address', 'Link, Datei oder IP-Adresse prüfen'),
    lead: t => t(
      'Получили сте съмнителен линк, прикачен файл или искате да разберете кой стои зад един IP адрес.',
      'You received a suspicious link or attachment, or want to know who is behind an IP address.',
      'Sie haben einen verdächtigen Link oder Anhang erhalten oder möchten wissen, wer hinter einer IP-Adresse steckt.'
    ),
    tools: [
      {
        name: 'urlscan.io',
        host: 'urlscan.io',
        url: 'https://urlscan.io/',
        badges: ['free', 'publicResult'],
        desc: t => t(
          'Отваря сайта вместо вас в изолирана среда и показва снимка на екрана, какво зарежда и към кого се свързва. Виждате фалшивата страница, без да я посещавате.',
          'Opens the site for you in an isolated environment and shows a screenshot, what it loads, and who it connects to. You see the fake page without visiting it.',
          'Öffnet die Seite für Sie in einer isolierten Umgebung und zeigt einen Screenshot, was sie lädt und mit wem sie sich verbindet. Sie sehen die gefälschte Seite, ohne sie zu besuchen.'
        ),
      },
      {
        name: 'Google Safe Browsing',
        host: 'transparencyreport.google.com',
        url: 'https://transparencyreport.google.com/safe-browsing/search',
        badges: ['free'],
        desc: t => t(
          'Показва дали Google е маркирал даден сайт като опасен. Това е същата база, която предупреждава в Chrome и Android.',
          'Shows whether Google has flagged a site as dangerous. This is the same database that warns you in Chrome and Android.',
          'Zeigt, ob Google eine Website als gefährlich markiert hat. Dies ist dieselbe Datenbank, die in Chrome und Android warnt.'
        ),
      },
      {
        name: 'AbuseIPDB',
        host: 'abuseipdb.com',
        url: 'https://www.abuseipdb.com/',
        badges: ['free', 'account'],
        desc: t => t(
          'База от сигнали за злоупотреба, подавани от администратори по целия свят. Дава оценка на доверие от 0 до 100 и показва за какво е бил докладван адресът.',
          'A database of abuse reports submitted by administrators worldwide. Gives a confidence score from 0 to 100 and shows what the address was reported for.',
          'Eine Datenbank mit Missbrauchsmeldungen von Administratoren weltweit. Gibt einen Vertrauenswert von 0 bis 100 und zeigt, wofür die Adresse gemeldet wurde.'
        ),
      },
      {
        name: 'IPQualityScore',
        host: 'ipqualityscore.com',
        url: 'https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test',
        badges: ['free', 'account'],
        desc: t => t(
          'Оценка за измамен риск на IP адрес. Разпознава VPN, прокси и Tor — често използвани от измамници, за да скрият истинското си местоположение.',
          'A fraud-risk score for an IP address. Detects VPNs, proxies, and Tor — often used by fraudsters to hide their real location.',
          'Eine Betrugsrisiko-Bewertung für eine IP-Adresse. Erkennt VPN, Proxy und Tor — oft von Betrügern genutzt, um ihren echten Standort zu verbergen.'
        ),
      },
      {
        name: 'ipinfo.io',
        host: 'ipinfo.io',
        url: 'https://ipinfo.io/',
        badges: ['free'],
        desc: t => t(
          'Показва държава, град, оператор и мрежа на един IP адрес. Полезно, когато „българската банка" ви пише от сървър в друга държава.',
          'Shows the country, city, operator, and network of an IP address. Useful when the "Bulgarian bank" writes to you from a server in another country.',
          'Zeigt Land, Stadt, Betreiber und Netzwerk einer IP-Adresse. Nützlich, wenn die „bulgarische Bank" Ihnen von einem Server in einem anderen Land schreibt.'
        ),
      },
    ],
  },
  {
    accent: 'orange',
    icon: Icon.alert('w-5 h-5'),
    title: t => t('Зловреден софтуер и активни заплахи', 'Malware and active threats', 'Schadsoftware und aktive Bedrohungen'),
    lead: t => t(
      'Антивирусни системи и публичните бази на abuse.ch, която проследява активни кампании в реално време.',
      'Antivirus engines and the public databases of abuse.ch, which tracks active campaigns in real time.',
      'Antiviren-Systeme und die öffentlichen Datenbanken von abuse.ch, das aktive Kampagnen in Echtzeit verfolgt.'
    ),
    tools: [
      {
        name: 'VirusTotal',
        host: 'virustotal.com',
        url: 'https://www.virustotal.com/gui/home/url',
        badges: ['free', 'publicResult'],
        desc: t => t(
          'Проверява линк, файл, домейн или IP адрес срещу над 70 антивирусни системи наведнъж. Най-използваният инструмент за бърза първа проверка.',
          'Checks a link, file, domain, or IP against more than 70 antivirus engines at once. The most widely used tool for a quick first check.',
          'Prüft einen Link, eine Datei, eine Domain oder IP gegen über 70 Antiviren-Systeme gleichzeitig. Das meistgenutzte Werkzeug für eine schnelle Erstprüfung.'
        ),
      },
      {
        name: 'URLhaus',
        host: 'urlhaus.abuse.ch',
        url: 'https://urlhaus.abuse.ch/browse/',
        badges: ['free'],
        desc: t => t(
          'Списък на адреси, които в момента разпространяват зловреден софтуер. Ако линкът е тук, той е потвърдено опасен.',
          'A list of addresses currently distributing malware. If the link is here, it is confirmed dangerous.',
          'Eine Liste von Adressen, die derzeit Schadsoftware verbreiten. Steht der Link hier, ist er bestätigt gefährlich.'
        ),
      },
      {
        name: 'ThreatFox',
        host: 'threatfox.abuse.ch',
        url: 'https://threatfox.abuse.ch/browse/',
        badges: ['free'],
        desc: t => t(
          'База от индикатори за компрометиране — IP адреси и домейни, свързани с конкретни семейства зловреден софтуер.',
          'A database of indicators of compromise — IP addresses and domains linked to specific malware families.',
          'Eine Datenbank von Kompromittierungsindikatoren — IP-Adressen und Domains, die mit bestimmten Schadsoftware-Familien verbunden sind.'
        ),
      },
      {
        name: 'MalwareBazaar',
        host: 'bazaar.abuse.ch',
        url: 'https://bazaar.abuse.ch/browse/',
        badges: ['free'],
        desc: t => t(
          'Търсене на зловреден файл по неговия хеш. Полезно, ако сте изтеглили подозрителен файл и искате да проверите какъв е, без да го отваряте.',
          'Search for a malicious file by its hash. Useful if you downloaded a suspicious file and want to check what it is without opening it.',
          'Suche nach einer schädlichen Datei anhand ihres Hashes. Nützlich, wenn Sie eine verdächtige Datei heruntergeladen haben und prüfen möchten, was sie ist, ohne sie zu öffnen.'
        ),
      },
    ],
  },
  {
    accent: 'violet',
    icon: Icon.users('w-5 h-5'),
    title: t => t('Изтекли лични данни', 'Leaked personal data', 'Geleakte persönliche Daten'),
    lead: t => t(
      'Ако ваши данни са изтекли при пробив, измамниците вече ги имат. Проверката отнема секунди.',
      'If your data leaked in a breach, fraudsters already have it. Checking takes seconds.',
      'Wenn Ihre Daten bei einem Leck offengelegt wurden, haben Betrüger sie bereits. Die Prüfung dauert Sekunden.'
    ),
    tools: [
      {
        name: 'Have I Been Pwned',
        host: 'haveibeenpwned.com',
        url: 'https://haveibeenpwned.com/',
        badges: ['free'],
        desc: t => t(
          'Показва в кои изтичания на данни се е появявал вашият имейл адрес. Ако се появява, сменете паролата навсякъде, където сте я използвали повторно.',
          'Shows which data breaches your email address has appeared in. If it appears, change that password everywhere you reused it.',
          'Zeigt, in welchen Datenlecks Ihre E-Mail-Adresse aufgetaucht ist. Falls ja, ändern Sie das Passwort überall dort, wo Sie es wiederverwendet haben.'
        ),
      },
    ],
  },
];

/** Directory of trusted third-party verification services. */
const ExternalTools: React.FC<Props> = ({ lang, onBack }) => {
  const t: T = (bg, en, de) => tr(lang, bg, en, de);
  const toolCount = GROUPS.reduce((n, g) => n + g.tools.length, 0);

  const badgeLabel: Record<Badge, { text: string; cls: string }> = {
    free: {
      text: t('Безплатно', 'Free', 'Kostenlos'),
      cls: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
    account: {
      text: t('Изисква регистрация', 'Account needed', 'Konto nötig'),
      cls: 'border-slate-200 bg-slate-50 text-slate-600',
    },
    publicResult: {
      text: t('Резултатът е публичен', 'Result is public', 'Ergebnis ist öffentlich'),
      cls: 'border-amber-200 bg-amber-50 text-amber-700',
    },
  };

  return (
    <div className="bg-white">
      <PageHeader
        accent="cyan"
        eyebrow={t('Външни инструменти', 'External tools', 'Externe Werkzeuge')}
        title={t(
          'Проверете сами, преди да се доверите',
          'Check for yourself before you trust',
          'Prüfen Sie selbst, bevor Sie vertrauen'
        )}
        lead={t(
          'Безплатни и утвърдени услуги, с които всеки може да провери подозрителен линк, файл, IP адрес или домейн. Подредени според въпроса, който си задавате.',
          'Free, established services anyone can use to check a suspicious link, file, IP address, or domain. Organised by the question you are asking.',
          'Kostenlose, etablierte Dienste, mit denen jeder einen verdächtigen Link, eine Datei, IP-Adresse oder Domain prüfen kann. Geordnet nach der Frage, die Sie stellen.'
        )}
        onBack={onBack}
        backLabel={t('Начало', 'Home', 'Startseite')}
        meta={
          <LiveDot accent="cyan">
            {toolCount} {t('проверени инструмента', 'verified tools', 'geprüfte Werkzeuge')}
          </LiveDot>
        }
      />

      {/* Two cautions that genuinely change how these tools should be used */}
      <Section tone="white" size="sm">
        <Container width="narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                {Icon.alert('w-5 h-5')}
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900 mb-1.5">
                  {t('Чист резултат не значи безопасно', 'A clean result does not mean safe', 'Ein sauberes Ergebnis bedeutet nicht sicher')}
                </h2>
                <p className="text-[13px] leading-relaxed text-slate-700">
                  {t(
                    'Нов измамен сайт може да е чист в първите дни, защото още никой не го е докладвал. Липсата на сигнали не е доказателство за легитимност.',
                    'A new fraudulent site can look clean in its first days because nobody has reported it yet. An absence of warnings is not proof of legitimacy.',
                    'Eine neue Betrugsseite kann in den ersten Tagen sauber wirken, weil sie noch niemand gemeldet hat. Fehlende Warnungen sind kein Beweis für Seriosität.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50/60 p-6">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center">
                {Icon.shield('w-5 h-5')}
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900 mb-1.5">
                  {t('Не качвайте лични документи', 'Do not upload personal documents', 'Laden Sie keine persönlichen Dokumente hoch')}
                </h2>
                <p className="text-[13px] leading-relaxed text-slate-700">
                  {t(
                    'Файловете и адресите, които подавате към публичните скенери, стават достъпни за други изследователи. Никога не качвайте договори, лични карти или документи с ваши данни.',
                    'Files and addresses you submit to public scanners become visible to other researchers. Never upload contracts, ID documents, or anything containing your personal data.',
                    'Dateien und Adressen, die Sie an öffentliche Scanner senden, werden für andere Forscher sichtbar. Laden Sie niemals Verträge, Ausweisdokumente oder Dateien mit Ihren persönlichen Daten hoch.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tool groups */}
      {GROUPS.map((group, gi) => {
        const a = ACCENTS[group.accent];
        return (
          <Section key={gi} tone={gi % 2 === 0 ? 'white' : 'tint'} size="sm">
            <Container>
              <SectionHeading
                accent={group.accent}
                eyebrow={
                  <span className="inline-flex items-center gap-2">
                    {group.icon}
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                }
                title={group.title(t)}
                lead={group.lead(t)}
              />

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.tools.map((tool, ti) => (
                  <a
                    key={ti}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 ${a.hoverBorder} hover:shadow-[0_2px_16px_-4px_rgba(15,23,42,0.12)]`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className={`text-[16px] font-bold text-slate-900 leading-snug group-hover:${a.text} transition-colors`}>
                        {tool.name}
                      </h3>
                      <span className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-0.5">
                        {Icon.external('w-4 h-4')}
                      </span>
                    </div>

                    <span className="mono text-[11px] text-slate-400 mb-4">{tool.host}</span>

                    <p className="text-[13px] leading-relaxed text-slate-600 mb-5">{tool.desc(t)}</p>

                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {tool.badges.map(b => (
                        <span
                          key={b}
                          className={`inline-flex items-center px-2 py-0.5 rounded-md border mono text-[10px] font-medium ${badgeLabel[b].cls}`}
                        >
                          {badgeLabel[b].text}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Where to report, once you have confirmed something */}
      <Section tone="tint" size="sm">
        <Container width="narrow">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="display text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
              {t(
                'Потвърдихте измама? Докладвайте я.',
                'Confirmed a scam? Report it.',
                'Betrug bestätigt? Melden Sie ihn.'
              )}
            </h2>
            <p className="text-[14px] leading-relaxed text-slate-600 mb-7 max-w-xl mx-auto">
              {t(
                'Един доклад помага инструментите по-горе да предупредят следващия човек. Сигналите до ГДБОП водят и до сваляне на домейна.',
                'One report helps the tools above warn the next person. Reports to the Bulgarian cybercrime directorate can also get the domain taken down.',
                'Eine Meldung hilft den obigen Werkzeugen, die nächste Person zu warnen. Meldungen an die bulgarische Cybercrime-Direktion können auch zur Abschaltung der Domain führen.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://cybercrime.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg font-bold tracking-wide transition-all duration-200 px-5 py-3 text-[13px] bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md"
              >
                {Icon.external('w-4 h-4')}
                {t('Подай сигнал в ГДБОП', 'Report to cybercrime.bg', 'Bei cybercrime.bg melden')}
              </a>
              <a
                href="https://safebrowsing.google.com/safebrowsing/report_phish/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg font-bold tracking-wide transition-all duration-200 px-5 py-3 text-[13px] border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
              >
                {Icon.external('w-4 h-4')}
                {t('Докладвай фишинг на Google', 'Report phishing to Google', 'Phishing an Google melden')}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ExternalTools;
