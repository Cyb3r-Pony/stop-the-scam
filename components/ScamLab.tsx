import React, { useState, useRef, useEffect } from 'react';
import { Lang } from '../types';
import { scenarios, LabScenario, Classification } from './scamLabScenarios';
import { PageHeader, Section, Container, Btn, LiveDot } from './ui';

interface ScamLabProps {
  lang: Lang;
  onBack: () => void;
}

const t = (lang: Lang, bg: string, en: string, de: string) =>
  lang === 'bg' ? bg : lang === 'en' ? en : de;

const pickRandom = (count: number): LabScenario[] => {
  const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

type LabState = 'intro' | 'active' | 'results';

const ScamLab: React.FC<ScamLabProps> = ({ lang, onBack }) => {
  const topRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LabState>('intro');
  const [sessionScenarios, setSessionScenarios] = useState<LabScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Classification | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(Classification | null)[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const startSession = () => {
    const picked = pickRandom(5);
    setSessionScenarios(picked);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setAnswers([]);
    setState('active');
    scrollTop();
  };

  const handleClassify = (answer: Classification) => {
    if (revealed) return;
    setSelectedAnswer(answer);
    setRevealed(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    if (currentIndex + 1 >= sessionScenarios.length) {
      setState('results');
      scrollTop();
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setRevealed(false);
      scrollTop();
    }
  };

  const scenario = sessionScenarios[currentIndex];
  const scenarioLang = scenario?.[lang];
  const correct = scenarioLang?.correctAnswer;
  const isCorrect = selectedAnswer === correct;
  const score = answers.filter((a, i) => a === sessionScenarios[i]?.[lang]?.correctAnswer).length;

  const classificationLabel = (c: Classification) => {
    const labels: Record<Classification, string> = {
      safe: t(lang, 'Безопасно', 'Safe', 'Sicher'),
      suspicious: t(lang, 'Подозрително', 'Suspicious', 'Verdaechtig'),
      malicious: t(lang, 'Зловредно', 'Malicious', 'Schaedlich'),
    };
    return labels[c];
  };

  // Verdict colours: emerald safe · amber suspicious · red malicious
  const classificationTone = (c: Classification) => ({
    safe: {
      text: 'text-emerald-700',
      chip: 'border-emerald-200 bg-emerald-50',
      button: 'border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500',
    },
    suspicious: {
      text: 'text-amber-700',
      chip: 'border-amber-200 bg-amber-50',
      button: 'border-amber-300 bg-white text-amber-700 hover:bg-amber-50 hover:border-amber-500',
    },
    malicious: {
      text: 'text-red-700',
      chip: 'border-red-200 bg-red-50',
      button: 'border-red-300 bg-white text-red-700 hover:bg-red-50 hover:border-red-500',
    },
  }[c]);

  const classificationIcon = (c: Classification) => {
    if (c === 'safe') return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    );
    if (c === 'suspicious') return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    );
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
    );
  };

  const difficultyLabel = (d: string) => ({
    beginner: t(lang, 'Начинаещ', 'Beginner', 'Anfaenger'),
    intermediate: t(lang, 'Среден', 'Intermediate', 'Mittelstufe'),
    advanced: t(lang, 'Напреднал', 'Advanced', 'Fortgeschritten'),
  }[d] || d);

  const difficultyColor = (d: string) => ({
    beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    advanced: 'bg-red-50 text-red-700 border-red-200',
  }[d] || 'bg-slate-50 text-slate-500 border-slate-200');

  const categoryLabel = (s: LabScenario) =>
    lang === 'bg' ? s.categoryBg : lang === 'de' ? s.categoryDe : s.category;

  // ===== RENDERERS FOR DIFFERENT SCENARIO TYPES =====

  const renderEmailContent = (content: typeof scenarioLang.content) => (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Email header */}
      <div className="px-5 py-3 border-b border-slate-800 space-y-1.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold w-14">{t(lang, 'От:', 'From:', 'Von:')}</span>
          <span className="text-orange-400 font-mono text-[11px]">{content.sender}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold w-14">{t(lang, 'Тема:', 'Subject:', 'Betreff:')}</span>
          <span className="text-white font-semibold">{content.subject}</span>
        </div>
      </div>
      {/* Email body */}
      <div className="px-5 py-4">
        <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{content.body}</pre>
      </div>
    </div>
  );

  const renderSmsContent = (content: typeof scenarioLang.content) => (
    <div className="max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        {/* SMS header */}
        <div className="px-4 py-2.5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <span className="text-slate-300 font-mono text-xs">{content.phoneNumber}</span>
        </div>
        {/* SMS bubble */}
        <div className="p-4">
          <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
            <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{content.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginPageContent = (content: typeof scenarioLang.content) => (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Browser bar */}
      <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
        </div>
        <div className="flex-1 bg-slate-800/80 rounded px-3 py-1 text-[11px] font-mono text-orange-400 truncate">
          {content.domain}
        </div>
      </div>
      {/* Page description */}
      <div className="px-5 py-4 space-y-3">
        <p className="text-slate-300 text-sm leading-relaxed">{content.description}</p>
        {content.details && content.details.length > 0 && (
          <ul className="space-y-2 mt-3">
            {content.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderInvestmentContent = (content: typeof scenarioLang.content) => (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Platform header */}
      <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xs">CF</div>
          <div>
            <div className="text-white font-bold text-sm">{content.platform}</div>
            <div className="text-[10px] text-orange-400 font-mono">{content.domain}</div>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 space-y-3">
        <p className="text-slate-300 text-sm leading-relaxed">{content.description}</p>
        {content.details && content.details.length > 0 && (
          <div className="grid gap-2 mt-3">
            {content.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-2 text-sm bg-slate-800/40 rounded-lg px-3 py-2">
                <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <span className="text-slate-300">{detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMessageContent = (content: typeof scenarioLang.content) => (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        {/* Messenger header */}
        <div className="px-4 py-2.5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-[10px]">
            {content.app?.[0] || 'M'}
          </div>
          <div>
            <div className="text-white text-sm font-semibold">{content.senderName}</div>
            <div className="text-[10px] text-slate-400">{content.app}</div>
          </div>
        </div>
        {/* Message bubble */}
        <div className="p-4">
          <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
            <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{content.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScenarioContent = () => {
    if (!scenarioLang) return null;
    const content = scenarioLang.content;
    switch (scenario.type) {
      case 'email':
      case 'notification':
        return renderEmailContent(content);
      case 'sms':
        return renderSmsContent(content);
      case 'login_page':
        return renderLoginPageContent(content);
      case 'investment':
        return renderInvestmentContent(content);
      case 'message':
        return renderMessageContent(content);
      default:
        return renderEmailContent(content);
    }
  };

  // ===== INTRO SCREEN =====
  if (state === 'intro') {
    return (
      <div ref={topRef} className="bg-white scroll-mt-[72px]">
        <PageHeader
          accent="blue"
          eyebrow={t(lang, 'Интерактивна лаборатория', 'Interactive lab', 'Interaktives Labor')}
          title={t(lang, 'Лаборатория за разпознаване на измами', 'Scam Detection Lab', 'Betrugserkennungs-Labor')}
          lead={t(
            lang,
            'Тренировъчна среда с реалистични сценарии. Анализирайте фишинг имейли, SMS измами, фалшиви платформи и още — класифицирайте ги като безопасни, подозрителни или зловредни.',
            'A training environment with realistic scenarios. Analyze phishing emails, SMS scams, fake platforms and more — classify them as safe, suspicious, or malicious.',
            'Eine Trainingsumgebung mit realistischen Szenarien. Analysieren Sie Phishing-E-Mails, SMS-Betrug, gefaelschte Plattformen und mehr — klassifizieren Sie sie als sicher, verdaechtig oder schaedlich.'
          )}
          onBack={onBack}
          backLabel={t(lang, 'Начало', 'Home', 'Startseite')}
          meta={<LiveDot accent="blue">{t(lang, '5 сценария на сесия · всеки път различни', '5 scenarios per session · different every time', '5 Szenarien pro Sitzung · jedes Mal anders')}</LiveDot>}
        />

        <Section tone="white" size="md">
          <Container width="narrow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: t(lang, '5 сценария', '5 Scenarios', '5 Szenarien'),
                  desc: t(lang, 'Случайно избрани от 10+ сценария', 'Randomly selected from 10+ scenarios', 'Zufaellig ausgewaehlt aus 10+ Szenarien'),
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  ),
                },
                {
                  title: t(lang, 'Реалистични примери', 'Realistic Examples', 'Realistische Beispiele'),
                  desc: t(lang, 'Имейли, SMS, фалшиви сайтове', 'Emails, SMS, fake websites', 'E-Mails, SMS, gefaelschte Webseiten'),
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ),
                },
                {
                  title: t(lang, 'Детайлен анализ', 'Detailed Analysis', 'Detaillierte Analyse'),
                  desc: t(lang, 'Разбор на всеки сценарий', 'Breakdown of every scenario', 'Aufschluesselung jedes Szenarios'),
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  ),
                },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                  <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
                    {f.icon}
                  </span>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* How to classify — set expectations before the session starts */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-7 mb-10">
              <h3 className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-5">
                {t(lang, 'Скала за класификация', 'Classification scale', 'Klassifizierungsskala')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([
                  { c: 'safe' as Classification, d: t(lang, 'Легитимно съобщение — можете да действате нормално.', 'A legitimate message — you can act normally.', 'Eine legitime Nachricht — Sie können normal handeln.') },
                  { c: 'suspicious' as Classification, d: t(lang, 'Има признаци, но не е сигурно — проверете, преди да реагирате.', 'There are signals, but it is not certain — verify before reacting.', 'Es gibt Anzeichen, aber es ist nicht sicher — prüfen Sie, bevor Sie reagieren.') },
                  { c: 'malicious' as Classification, d: t(lang, 'Ясна атака — не кликвайте, не отговаряйте, изтрийте.', 'A clear attack — do not click, do not reply, delete.', 'Ein klarer Angriff — nicht klicken, nicht antworten, löschen.') },
                ]).map(({ c, d }) => (
                  <div key={c} className={`rounded-lg border p-4 ${classificationTone(c).chip}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={classificationTone(c).text}>{classificationIcon(c)}</span>
                      <span className={`text-[13px] font-bold ${classificationTone(c).text}`}>{classificationLabel(c)}</span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-600">{d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Btn accent="blue" size="lg" onClick={startSession}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t(lang, 'Стартирай лабораторията', 'Start the Lab', 'Labor starten')}
              </Btn>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // ===== RESULTS SCREEN =====
  if (state === 'results') {
    const finalScore = answers.filter((a, i) => a === sessionScenarios[i]?.[lang]?.correctAnswer).length;
    const total = sessionScenarios.length;
    const pct = Math.round((finalScore / total) * 100);

    const tier = pct >= 80
      ? { label: t(lang, 'Експерт', 'Expert', 'Experte'), text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' }
      : pct >= 50
      ? { label: t(lang, 'Среден', 'Intermediate', 'Mittelstufe'), text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' }
      : { label: t(lang, 'Начинаещ', 'Beginner', 'Anfaenger'), text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500' };

    return (
      <div ref={topRef} className="bg-white scroll-mt-[72px]">
        <Section tone="white" size="sm">
          <Container width="prose">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500 hover:text-slate-900 transition-colors mb-12"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t(lang, 'Начало', 'Home', 'Startseite')}
            </button>

            {/* Score */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 md:p-10 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${tier.bg} border ${tier.border} mono text-[10px] font-semibold uppercase tracking-[0.15em] ${tier.text} mb-5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${tier.bar}`} aria-hidden="true" />
                    {tier.label}
                  </span>
                  <div className="display text-6xl font-extrabold text-slate-900 tabular-nums leading-none">
                    {finalScore}<span className="text-slate-300">/{total}</span>
                  </div>
                  <p className="mt-3 text-[14px] text-slate-500">
                    {t(lang, 'правилни отговора', 'correct answers', 'richtige Antworten')}
                  </p>
                </div>
                <div className="mono text-[13px] text-slate-500 tabular-nums">{pct}%</div>
              </div>

              <div className="mt-8 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ease-out ${tier.bar}`} style={{ width: `${pct}%` }} />
              </div>

              <p className="mt-7 pt-6 border-t border-slate-100 text-[14px] leading-relaxed text-slate-600">
                {pct >= 80
                  ? t(lang, 'Отлично! Имате силна способност за разпознаване на измами.', 'Excellent! You have strong scam detection skills.', 'Ausgezeichnet! Sie haben starke Betrugserkennungsfaehigkeiten.')
                  : pct >= 50
                  ? t(lang, 'Добра работа, но има какво да научите. Опитайте отново!', 'Good work, but there\'s room to improve. Try again!', 'Gute Arbeit, aber es gibt Raum fuer Verbesserungen. Versuchen Sie es erneut!')
                  : t(lang, 'Трябва да подобрите уменията си. Преминете лабораторията отново!', 'You need to improve your skills. Take the lab again!', 'Sie muessen Ihre Faehigkeiten verbessern. Machen Sie das Labor erneut!')}
              </p>
            </div>

            {/* Per-scenario review */}
            <div className="mb-8">
              <h2 className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-4">
                {t(lang, 'Преглед на отговорите', 'Answer review', 'Antwortenuebersicht')}
              </h2>
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                {sessionScenarios.map((s, i) => {
                  const sLang = s[lang];
                  const userAnswer = answers[i];
                  const correctAns = sLang.correctAnswer;
                  const wasCorrect = userAnswer === correctAns;
                  return (
                    <div key={s.id} className={`flex items-center gap-4 p-4 ${wasCorrect ? 'bg-emerald-50/50' : 'bg-red-50/50'}`}>
                      <span className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${wasCorrect ? 'bg-emerald-600' : 'bg-red-600'}`}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {wasCorrect
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />}
                        </svg>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[14px] font-semibold text-slate-900 truncate">{sLang.title}</span>
                        <span className="block mono text-[11px] text-slate-500 mt-0.5">{categoryLabel(s)}</span>
                      </span>
                      <span className="flex items-center gap-2 flex-shrink-0">
                        {userAnswer && (
                          <span className={`text-[12px] font-bold ${classificationTone(userAnswer).text}`}>
                            {classificationLabel(userAnswer)}
                          </span>
                        )}
                        {!wasCorrect && (
                          <>
                            <span className="text-slate-300 text-[12px]">→</span>
                            <span className={`text-[12px] font-bold ${classificationTone(correctAns).text}`}>
                              {classificationLabel(correctAns)}
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Btn accent="blue" size="lg" onClick={startSession} className="flex-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                {t(lang, 'Опитай отново', 'Try Again', 'Erneut versuchen')}
              </Btn>
              <Btn variant="outline" size="lg" onClick={onBack} className="flex-1">
                {t(lang, 'Към началото', 'Back to Home', 'Zur Startseite')}
              </Btn>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // ===== ACTIVE SESSION =====
  return (
    <div ref={topRef} className="bg-white scroll-mt-[72px]">
      <Section tone="white" size="sm">
        <Container width="prose">

          {/* Session bar */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500 hover:text-slate-900 transition-colors"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">{t(lang, 'Изход', 'Exit', 'Beenden')}</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="mono text-[11px] text-slate-500 tabular-nums">
                {currentIndex + 1} / {sessionScenarios.length}
              </span>
              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + (revealed ? 1 : 0)) / sessionScenarios.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scenario header */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-md border mono text-[10px] font-semibold uppercase tracking-[0.12em] ${difficultyColor(scenario.difficulty)}`}>
              {difficultyLabel(scenario.difficulty)}
            </span>
            <span className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {categoryLabel(scenario)}
            </span>
          </div>

          <h2 className="display text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{scenarioLang.title}</h2>
          <p className="mono text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-6">
            {t(lang, 'Изследван образец', 'Specimen under review', 'Untersuchtes Exemplar')}
          </p>

          {/* Specimen — deliberately rendered on a dark surface, as captured evidence */}
          <div className="mb-8 rounded-2xl bg-slate-950 border border-slate-800 p-4 md:p-6">
            {renderScenarioContent()}
          </div>

          {/* Classification */}
          {!revealed && (
            <div>
              <p className="text-center text-[13px] font-semibold text-slate-600 mb-4">
                {t(lang, 'Как класифицирате този сценарий?', 'How do you classify this scenario?', 'Wie klassifizieren Sie dieses Szenario?')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['safe', 'suspicious', 'malicious'] as Classification[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleClassify(c)}
                    className={`flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl border font-bold text-[14px] transition-all duration-200 ${classificationTone(c).button}`}
                  >
                    {classificationIcon(c)}
                    {classificationLabel(c)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Analysis */}
          {revealed && (
            <div className="space-y-5 anim-fade-up">
              {/* Verdict */}
              <div className={`rounded-xl border p-5 flex items-start gap-4 ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-600' : 'bg-red-600'}`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isCorrect
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />}
                  </svg>
                </span>
                <div>
                  <p className={`font-bold text-[17px] ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                    {isCorrect
                      ? t(lang, 'Правилно!', 'Correct!', 'Richtig!')
                      : t(lang, 'Грешно!', 'Incorrect!', 'Falsch!')}
                  </p>
                  <p className="text-[14px] text-slate-700 mt-1">
                    {t(lang, 'Правилният отговор е:', 'The correct answer is:', 'Die richtige Antwort ist:')}{' '}
                    <span className={`font-bold ${classificationTone(correct!).text}`}>{classificationLabel(correct!)}</span>
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">
                  {t(lang, 'Резюме на анализа', 'Analysis summary', 'Analysezusammenfassung')}
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-700">{scenarioLang.explanation.summary}</p>
              </div>

              {/* Indicators */}
              <div className={`rounded-xl border p-6 ${correct === 'safe' ? 'border-emerald-200 bg-emerald-50/50' : 'border-orange-200 bg-orange-50/50'}`}>
                <h3 className={`mono text-[10px] font-semibold uppercase tracking-[0.18em] mb-5 ${correct === 'safe' ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {correct === 'safe'
                    ? t(lang, 'Индикатори за легитимност', 'Indicators of legitimacy', 'Indikatoren fuer Legitimitaet')
                    : t(lang, 'Червени флагове', 'Red flags', 'Warnsignale')}
                </h3>
                <ol className="space-y-4">
                  {scenarioLang.explanation.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mono text-[11px] font-semibold text-white tabular-nums ${correct === 'safe' ? 'bg-emerald-600' : 'bg-orange-500'}`}>
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[14px] font-bold text-slate-900">{flag.title}</span>
                        <span className="block text-[13px] leading-relaxed text-slate-600 mt-1">{flag.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Defensive advice */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-6">
                <h3 className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-3">
                  {t(lang, 'Съвет за защита', 'Defensive advice', 'Schutzratschlag')}
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-700">{scenarioLang.explanation.defensiveAdvice}</p>
              </div>

              <Btn accent="blue" size="lg" onClick={handleNext} className="w-full">
                {currentIndex + 1 >= sessionScenarios.length
                  ? t(lang, 'Виж резултатите', 'See Results', 'Ergebnisse anzeigen')
                  : t(lang, 'Следващ сценарий', 'Next Scenario', 'Naechstes Szenario')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Btn>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default ScamLab;
