import React from 'react';
import { Lang } from '../types';
import { CONTENT } from '../constants';
import { PageHeader, Section, Container, SectionHeading, Btn, LiveDot, Icon, tr } from './ui';

interface Props {
  lang: Lang;
  onBack: () => void;
  onNavigate: (page: 'protection' | 'scam-lab' | 'scam-types') => void;
}

/** Reference page: the behavioural and technical markers that expose a scam. */
const WarningSigns: React.FC<Props> = ({ lang, onBack, onNavigate }) => {
  const strings = CONTENT[lang];
  const items = strings.warningSigns.items;
  const campaign = strings.warningSigns.campaignLink;

  return (
    <div className="bg-white">
      <PageHeader
        accent="orange"
        eyebrow={tr(lang, 'Психологически модели', 'Psychological patterns', 'Psychologische Muster')}
        title={strings.warningSigns.title}
        lead={tr(
          lang,
          'Измамниците се повтарят. Тези признаци се появяват почти във всяка схема — един разпознат сигнал е достатъчен, за да спрете навреме.',
          'Fraudsters repeat themselves. These markers appear in almost every scheme — recognising a single one is enough to stop in time.',
          'Betrüger wiederholen sich. Diese Merkmale tauchen in fast jedem Schema auf — ein erkanntes Signal genügt, um rechtzeitig zu stoppen.'
        )}
        onBack={onBack}
        backLabel={tr(lang, 'Начало', 'Home', 'Startseite')}
        meta={
          <LiveDot accent="orange">
            {items.length} {tr(lang, 'признака', 'warning signs', 'Warnsignale')}
          </LiveDot>
        }
      />

      {/* The rule that covers all of them */}
      <Section tone="white" size="sm">
        <Container width="narrow">
          <div className="flex flex-col sm:flex-row items-start gap-6 rounded-xl border border-orange-200 bg-orange-50/60 p-7 md:p-8">
            <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              {Icon.alert('w-6 h-6')}
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                {tr(
                  lang,
                  'Един признак е достатъчен, за да спрете.',
                  'One warning sign is enough to stop.',
                  'Ein Warnsignal genügt, um zu stoppen.'
                )}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-700">
                {tr(
                  lang,
                  'Не чакайте да съвпаднат няколко. Легитимна финансова институция никога няма да ви притисне за незабавно решение, да поиска плащане в криптовалута или да ви посъветва да не се консултирате с близките си.',
                  'Do not wait for several to line up. A legitimate financial institution will never pressure you for an immediate decision, request payment in cryptocurrency, or advise you against consulting the people close to you.',
                  'Warten Sie nicht, bis mehrere zusammenkommen. Ein seriöses Finanzinstitut wird Sie nie zu einer sofortigen Entscheidung drängen, Zahlung in Kryptowährung verlangen oder Ihnen raten, Ihre Angehörigen nicht zu konsultieren.'
                )}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" size="sm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {items.map((item, i) => (
              <article
                key={i}
                className="group relative bg-white p-7 md:p-8 transition-colors duration-200 hover:bg-orange-50/50"
              >
                <span
                  className="absolute top-5 right-6 mono text-[11px] font-semibold text-slate-300 tabular-nums group-hover:text-orange-400 transition-colors"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="block h-[3px] w-7 rounded-full bg-orange-500 mb-5" aria-hidden="true" />
                <h2 className="text-[17px] font-bold text-slate-900 leading-snug mb-3 pr-8">{item.title}</h2>
                <p className="text-[14px] leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Regulator campaign */}
      {campaign && (
        <Section tone="white" size="sm">
          <Container width="narrow">
            <div className="flex flex-col md:flex-row md:items-center gap-6 rounded-xl border border-blue-200 bg-blue-50/60 p-7 md:p-8">
              <div className="flex-1">
                <span className="block mono text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-700 mb-2">
                  {tr(lang, 'Официална кампания', 'Official campaign', 'Offizielle Kampagne')}
                </span>
                <p className="text-[15px] font-medium text-slate-800 leading-relaxed">{campaign.text}</p>
              </div>
              <Btn as="a" href={campaign.url} target="_blank" rel="noreferrer" accent="blue" size="md" className="flex-shrink-0">
                {campaign.linkText}
                {Icon.external()}
              </Btn>
            </div>
          </Container>
        </Section>
      )}

      {/* Next step */}
      <Section tone="tint" size="sm">
        <Container>
          <SectionHeading
            accent="emerald"
            align="center"
            eyebrow={tr(lang, 'Следваща стъпка', 'Next step', 'Nächster Schritt')}
            title={tr(
              lang,
              'Знаете какво да търсите. Сега се защитете.',
              'You know what to look for. Now protect yourself.',
              'Sie wissen, worauf Sie achten müssen. Jetzt schützen Sie sich.'
            )}
            lead={tr(
              lang,
              'Тринадесет конкретни мерки, които намаляват риска ви още днес — или изпробвайте наученото върху реалистични сценарии.',
              'Thirteen concrete measures that reduce your risk today — or test what you have learned against realistic scenarios.',
              'Dreizehn konkrete Maßnahmen, die Ihr Risiko schon heute senken — oder testen Sie Ihr Wissen an realistischen Szenarien.'
            )}
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Btn accent="emerald" size="lg" onClick={() => onNavigate('protection')}>
              {tr(lang, 'Как да се предпазите', 'How to Protect Yourself', 'So schützen Sie sich')}
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => onNavigate('scam-lab')}>
              {tr(lang, 'Отвори Лабораторията', 'Open the Lab', 'Labor öffnen')}
            </Btn>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default WarningSigns;
