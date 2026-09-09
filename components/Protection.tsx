import React from 'react';
import { Lang } from '../types';
import { CONTENT } from '../constants';
import { PageHeader, Section, Container, SectionHeading, Btn, LiveDot, Icon, tr } from './ui';

interface Props {
  lang: Lang;
  onBack: () => void;
  onNavigate: (page: 'quiz' | 'warning-signs') => void;
}

const FLYER_SHA256 = '811eda3232b2f6b4c730b56ba4e05d46557162c0f9531a7de1e3838cd3e287de';

/** Reference page: the defensive measures, plus the printable awareness flyer. */
const Protection: React.FC<Props> = ({ lang, onBack, onNavigate }) => {
  const strings = CONTENT[lang];
  const steps = strings.protection.steps;

  return (
    <div className="bg-white">
      <PageHeader
        accent="emerald"
        eyebrow={tr(lang, 'Защитни мерки', 'Defensive measures', 'Schutzmaßnahmen')}
        title={strings.protection.title}
        lead={tr(
          lang,
          'Няма нужда да сте технически експерт. Тези мерки отнемат минути и премахват по-голямата част от риска, на който сте изложени всеки ден.',
          'You do not need to be a technical expert. These measures take minutes and remove most of the risk you are exposed to every day.',
          'Sie müssen kein technischer Experte sein. Diese Maßnahmen dauern Minuten und beseitigen den Großteil des Risikos, dem Sie täglich ausgesetzt sind.'
        )}
        onBack={onBack}
        backLabel={tr(lang, 'Начало', 'Home', 'Startseite')}
        meta={
          <LiveDot accent="emerald">
            {steps.length} {tr(lang, 'мерки за защита', 'protective measures', 'Schutzmaßnahmen')}
          </LiveDot>
        }
      />

      <Section tone="white" size="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:border-emerald-400 hover:shadow-[0_2px_16px_-4px_rgba(15,23,42,0.12)]"
              >
                <span className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mono text-[12px] font-semibold mb-5 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-[17px] font-bold text-slate-900 leading-snug mb-3">{step.title}</h2>
                <p className="text-[14px] leading-relaxed text-slate-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Printable flyer */}
      <Section tone="tint" size="md">
        <Container width="narrow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <SectionHeading
                accent="red"
                eyebrow={tr(lang, 'За разпечатване', 'Printable', 'Zum Ausdrucken')}
                title={tr(lang, 'Информационна листовка', 'Awareness Flyer', 'Informationsflyer')}
                lead={tr(
                  lang,
                  'Едностраничен PDF на български: топ 5 признака на измама, рамката „Спри. Помисли. Провери.", спешни стъпки при измама и полезни контакти. Разпечатайте го за близки, колеги или съседи, които не използват интернет активно.',
                  'A one-page PDF in Bulgarian: the top 5 scam warning signs, the "Stop. Think. Check." framework, emergency steps, and useful contacts. Print it for family, colleagues, or neighbours who are not active online.',
                  'Ein einseitiges PDF auf Bulgarisch: die 5 wichtigsten Warnsignale, der „Stopp. Denk nach. Prüf es."-Rahmen, Notfallschritte und nützliche Kontakte. Drucken Sie es für Angehörige, Kollegen oder Nachbarn aus.'
                )}
              />
              <div className="mt-8">
                <Btn as="a" href="/flyer-bg.pdf" download="Спри-Измамата-Флаер.pdf" accent="red" size="lg">
                  {Icon.download()}
                  {tr(lang, 'Изтегли флаер (PDF)', 'Download Flyer (PDF)', 'Flyer herunterladen (PDF)')}
                </Btn>
              </div>
            </div>

            {/* Integrity verification — a platform that tells you how to verify it */}
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-600">{Icon.shield('w-4 h-4')}</span>
                <span className="mono text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
                  {tr(lang, 'Проверка на файла', 'File verification', 'Dateiüberprüfung')}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-600 mb-4">
                {tr(
                  lang,
                  'Сравнете SHA-256 хеша на изтегления файл, за да се уверите, че не е бил модифициран.',
                  'Compare the SHA-256 hash of the downloaded file to confirm it has not been tampered with.',
                  'Vergleichen Sie den SHA-256-Hash der heruntergeladenen Datei, um sicherzustellen, dass sie nicht verändert wurde.'
                )}
              </p>
              <div className="rounded-lg bg-slate-900 p-4 mb-4">
                <span className="block mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                  SHA-256
                </span>
                <code className="mono text-[11px] leading-relaxed text-emerald-400 break-all select-all">
                  {FLYER_SHA256}
                </code>
              </div>
              <a
                href={`https://www.virustotal.com/gui/file/${FLYER_SHA256}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {tr(lang, 'Провери във VirusTotal', 'Check on VirusTotal', 'Auf VirusTotal prüfen')}
                {Icon.external('w-3.5 h-3.5')}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next step */}
      <Section tone="white" size="sm">
        <Container>
          <SectionHeading
            accent="blue"
            align="center"
            eyebrow={tr(lang, 'Следваща стъпка', 'Next step', 'Nächster Schritt')}
            title={tr(
              lang,
              'Проверете колко добре сте защитени',
              'Check how well protected you are',
              'Prüfen Sie, wie gut Sie geschützt sind'
            )}
            lead={tr(
              lang,
              'Десет въпроса, съобразени с профила ви, и персонализиран план с конкретни действия според резултата.',
              'Ten questions tailored to your profile, and a personalised action plan based on your score.',
              'Zehn auf Ihr Profil zugeschnittene Fragen und ein personalisierter Aktionsplan auf Basis Ihres Ergebnisses.'
            )}
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Btn accent="blue" size="lg" onClick={() => onNavigate('quiz')}>
              {tr(lang, 'Направи теста', 'Take the Quiz', 'Quiz starten')}
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => onNavigate('warning-signs')}>
              {tr(lang, 'Признаци на измама', 'Warning Signs', 'Warnsignale')}
            </Btn>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Protection;
