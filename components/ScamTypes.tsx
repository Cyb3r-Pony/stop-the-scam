import React from 'react';
import { Lang } from '../types';
import { CONTENT } from '../constants';
import { PageHeader, Section, Container, SectionHeading, Btn, LiveDot, tr } from './ui';

interface Props {
  lang: Lang;
  onBack: () => void;
  onNavigate: (page: 'warning-signs' | 'protection' | 'scam-lab') => void;
}

/** Reference page: the twelve fraud categories seen most often in Bulgaria. */
const ScamTypes: React.FC<Props> = ({ lang, onBack, onNavigate }) => {
  const strings = CONTENT[lang];
  const items = strings.scamTypes.items;

  return (
    <div className="bg-white">
      <PageHeader
        accent="amber"
        eyebrow={tr(lang, 'Справочник', 'Reference', 'Nachschlagewerk')}
        title={strings.scamTypes.title}
        lead={strings.scamTypes.subtitle}
        onBack={onBack}
        backLabel={tr(lang, 'Начало', 'Home', 'Startseite')}
        meta={
          <LiveDot accent="amber">
            {items.length} {tr(lang, 'документирани категории', 'documented categories', 'dokumentierte Kategorien')}
          </LiveDot>
        }
      />

      <Section tone="white" size="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {items.map((item, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-7 md:p-8 transition-all duration-200 hover:border-amber-400 hover:shadow-[0_2px_16px_-4px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="mono text-[11px] font-semibold text-amber-600 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h2>
                </div>

                <p className="text-[15px] leading-relaxed text-slate-600 mb-6">{item.desc}</p>

                <div className="mt-auto border-l-2 border-amber-400 bg-amber-50/70 rounded-r-lg px-5 py-4">
                  <span className="block mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-700 mb-2">
                    {tr(lang, 'Как изглежда на практика', 'What it looks like', 'So sieht es aus')}
                  </span>
                  <p className="text-[14px] leading-relaxed text-slate-700">{item.example}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Next step */}
      <Section tone="tint" size="sm">
        <Container>
          <SectionHeading
            accent="blue"
            align="center"
            eyebrow={tr(lang, 'Следваща стъпка', 'Next step', 'Nächster Schritt')}
            title={tr(
              lang,
              'Разпознавате ли ги в реална ситуация?',
              'Can you spot them in a real situation?',
              'Erkennen Sie sie in einer realen Situation?'
            )}
            lead={tr(
              lang,
              'Прегледайте психологическите признаци, които стоят зад всяка от тези измами, или ги изпробвайте върху реалистични примери в Лабораторията.',
              'Review the psychological signals behind each of these frauds, or test yourself against realistic examples in the Lab.',
              'Prüfen Sie die psychologischen Merkmale hinter jedem dieser Betrugsfälle oder testen Sie sich an realistischen Beispielen im Labor.'
            )}
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Btn accent="orange" size="lg" onClick={() => onNavigate('warning-signs')}>
              {tr(lang, 'Признаци на измама', 'Warning Signs', 'Warnsignale')}
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

export default ScamTypes;
