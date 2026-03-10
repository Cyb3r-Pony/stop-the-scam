import React, { useState, useRef, useEffect } from 'react';
import { Lang } from '../types';
import { scenarios, LabScenario, Classification } from './scamLabScenarios';

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

  const classificationColor = (c: Classification, isButton?: boolean) => {
    if (isButton) {
      return {
        safe: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40',
        suspicious: 'border-amber-500/40 bg-amber-950/30 text-amber-400 hover:bg-amber-900/40',
        malicious: 'border-red-500/40 bg-red-950/30 text-red-400 hover:bg-red-900/40',
      }[c];
    }
    return {
      safe: 'text-emerald-400',
      suspicious: 'text-amber-400',
      malicious: 'text-red-400',
    }[c];
  };

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
    beginner: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-amber-900/40 text-amber-400 border-amber-500/30',
    advanced: 'bg-red-900/40 text-red-400 border-red-500/30',
  }[d] || 'bg-slate-800 text-slate-400');

  const categoryLabel = (s: LabScenario) =>
    lang === 'bg' ? s.categoryBg : lang === 'de' ? s.categoryDe : s.category;

  // ===== RENDERERS FOR DIFFERENT SCENARIO TYPES =====

  const renderEmailContent = (content: typeof scenarioLang.content) => (
    <div className="rounded-xl border border-slate-600/40 bg-slate-950/60 overflow-hidden">
      {/* Email header */}
      <div className="px-5 py-3 border-b border-slate-700/50 space-y-1.5">
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
      <div className="rounded-2xl border border-slate-600/40 bg-slate-950/60 overflow-hidden">
        {/* SMS header */}
        <div className="px-4 py-2.5 border-b border-slate-700/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <span className="text-slate-300 font-mono text-xs">{content.phoneNumber}</span>
        </div>
        {/* SMS bubble */}
        <div className="p-4">
          <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
            <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{content.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginPageContent = (content: typeof scenarioLang.content) => (
    <div className="rounded-xl border border-slate-600/40 bg-slate-950/60 overflow-hidden">
      {/* Browser bar */}
      <div className="px-4 py-2 border-b border-slate-700/50 flex items-center gap-2">
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
    <div className="rounded-xl border border-slate-600/40 bg-slate-950/60 overflow-hidden">
      {/* Platform header */}
      <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
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
      <div className="rounded-2xl border border-slate-600/40 bg-slate-950/60 overflow-hidden">
        {/* Messenger header */}
        <div className="px-4 py-2.5 border-b border-slate-700/50 flex items-center gap-3">
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
          <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3">
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
      <div ref={topRef} className="scroll-mt-[72px]">
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <button onClick={onBack} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="text-sm font-bold uppercase tracking-wider">{t(lang, 'Назад', 'Back', 'Zurueck')}</span>
            </button>

            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-900/40 backdrop-blur-md border border-orange-500/30 rounded-full text-orange-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                {t(lang, 'ИНТЕРАКТИВНА ЛАБОРАТОРИЯ', 'INTERACTIVE LAB', 'INTERAKTIVES LABOR')}
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl drop-shadow-2xl">
                {t(lang, 'Лаборатория за разпознаване на измами', 'Scam Detection Lab', 'Betrugserkennungs-Labor')}
              </h2>

              <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-medium">
                {t(
                  lang,
                  'Тренировъчна среда с реалистични сценарии. Анализирайте фишинг имейли, SMS измами, фалшиви платформи и още — класифицирайте ги като безопасни, подозрителни или зловредни.',
                  'A training environment with realistic scenarios. Analyze phishing emails, SMS scams, fake platforms and more — classify them as safe, suspicious, or malicious.',
                  'Eine Trainingsumgebung mit realistischen Szenarien. Analysieren Sie Phishing-E-Mails, SMS-Betrug, gefaelschte Plattformen und mehr — klassifizieren Sie sie als sicher, verdaechtig oder schaedlich.'
                )}
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
                <div className="rounded-xl p-5 border border-orange-500/20 bg-orange-950/20">
                  <div className="w-10 h-10 bg-orange-900/40 rounded-lg flex items-center justify-center mb-3 border border-orange-500/20">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{t(lang, '5 сценария', '5 Scenarios', '5 Szenarien')}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{t(lang, 'Случайно избрани от 10+ сценария', 'Randomly selected from 10+ scenarios', 'Zufaellig ausgewaehlt aus 10+ Szenarien')}</p>
                </div>
                <div className="rounded-xl p-5 border border-orange-500/20 bg-orange-950/20">
                  <div className="w-10 h-10 bg-orange-900/40 rounded-lg flex items-center justify-center mb-3 border border-orange-500/20">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{t(lang, 'Реалистични примери', 'Realistic Examples', 'Realistische Beispiele')}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{t(lang, 'Имейли, SMS, фалшиви сайтове', 'Emails, SMS, fake websites', 'E-Mails, SMS, gefaelschte Webseiten')}</p>
                </div>
                <div className="rounded-xl p-5 border border-orange-500/20 bg-orange-950/20">
                  <div className="w-10 h-10 bg-orange-900/40 rounded-lg flex items-center justify-center mb-3 border border-orange-500/20">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{t(lang, 'Детайлен анализ', 'Detailed Analysis', 'Detaillierte Analyse')}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{t(lang, 'Разбор на всеки сценарий', 'Breakdown of every scenario', 'Aufschluesselung jedes Szenarios')}</p>
                </div>
              </div>

              <button
                onClick={startSession}
                className="mt-6 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center gap-3 shadow-lg shadow-orange-600/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t(lang, 'Стартирай лабораторията', 'Start the Lab', 'Labor starten')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===== RESULTS SCREEN =====
  if (state === 'results') {
    const finalScore = answers.filter((a, i) => a === sessionScenarios[i]?.[lang]?.correctAnswer).length;
    const total = sessionScenarios.length;
    const pct = Math.round((finalScore / total) * 100);

    const tier = pct >= 80
      ? { label: t(lang, 'Експерт', 'Expert', 'Experte'), color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-500/30' }
      : pct >= 50
      ? { label: t(lang, 'Среден', 'Intermediate', 'Mittelstufe'), color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-500/30' }
      : { label: t(lang, 'Начинаещ', 'Beginner', 'Anfaenger'), color: 'text-red-400', bg: 'bg-red-950/40', border: 'border-red-500/30' };

    return (
      <div ref={topRef} className="scroll-mt-[72px]">
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <button onClick={onBack} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="text-sm font-bold uppercase tracking-wider">{t(lang, 'Назад', 'Back', 'Zurueck')}</span>
            </button>

            {/* Score card */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-950/10 p-8 md:p-12 text-center mb-8">
              <div className="text-6xl md:text-8xl font-black text-white mb-2">{finalScore}/{total}</div>
              <p className="text-slate-400 text-lg mb-6">{t(lang, 'правилни отговора', 'correct answers', 'richtige Antworten')}</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${tier.border} ${tier.bg}`}>
                <span className={`font-bold uppercase tracking-wider text-sm ${tier.color}`}>{tier.label}</span>
              </div>
              <p className="text-slate-400 text-sm mt-6 max-w-md mx-auto">
                {pct >= 80
                  ? t(lang, 'Отлично! Имате силна способност за разпознаване на измами.', 'Excellent! You have strong scam detection skills.', 'Ausgezeichnet! Sie haben starke Betrugserkennungsfaehigkeiten.')
                  : pct >= 50
                  ? t(lang, 'Добра работа, но има какво да научите. Опитайте отново!', 'Good work, but there\'s room to improve. Try again!', 'Gute Arbeit, aber es gibt Raum fuer Verbesserungen. Versuchen Sie es erneut!')
                  : t(lang, 'Трябва да подобрите уменията си. Преминете лабораторията отново!', 'You need to improve your skills. Take the lab again!', 'Sie muessen Ihre Faehigkeiten verbessern. Machen Sie das Labor erneut!')}
              </p>
            </div>

            {/* Per-scenario review */}
            <div className="space-y-3 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">{t(lang, 'Преглед на отговорите', 'Answer Review', 'Antwortenuebersicht')}</h3>
              {sessionScenarios.map((s, i) => {
                const sLang = s[lang];
                const userAnswer = answers[i];
                const correctAns = sLang.correctAnswer;
                const wasCorrect = userAnswer === correctAns;
                return (
                  <div key={s.id} className={`rounded-xl border p-4 flex items-center gap-4 ${wasCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-red-500/30 bg-red-950/10'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${wasCorrect ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}>
                      {wasCorrect
                        ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{sLang.title}</div>
                      <div className="text-xs text-slate-400">{categoryLabel(s)}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {userAnswer && (
                        <span className={`text-xs font-bold ${classificationColor(userAnswer)}`}>{classificationLabel(userAnswer)}</span>
                      )}
                      {!wasCorrect && (
                        <>
                          <span className="text-slate-600 text-xs">/</span>
                          <span className={`text-xs font-bold ${classificationColor(correctAns)}`}>{classificationLabel(correctAns)}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={startSession} className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                {t(lang, 'Опитай отново', 'Try Again', 'Erneut versuchen')}
              </button>
              <button onClick={onBack} className="px-6 py-3.5 border border-slate-600 hover:border-slate-500 text-slate-300 font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                {t(lang, 'Към началото', 'Back to Home', 'Zur Startseite')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===== ACTIVE SESSION =====
  return (
    <div ref={topRef} className="scroll-mt-[72px]">
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="text-xs font-bold uppercase tracking-wider">{t(lang, 'Изход', 'Exit', 'Beenden')}</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {currentIndex + 1} / {sessionScenarios.length}
              </span>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + (revealed ? 1 : 0)) / sessionScenarios.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Scenario header */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${difficultyColor(scenario.difficulty)}`}>
              {difficultyLabel(scenario.difficulty)}
            </span>
            <span className="px-2.5 py-1 rounded-full border border-slate-600/40 bg-slate-800/40 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {categoryLabel(scenario)}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6">{scenarioLang.title}</h3>

          {/* Scenario content */}
          <div className="mb-8">
            {renderScenarioContent()}
          </div>

          {/* Classification buttons */}
          {!revealed && (
            <div className="space-y-3">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider text-center mb-4">
                {t(lang, 'Как класифицирате този сценарий?', 'How do you classify this scenario?', 'Wie klassifizieren Sie dieses Szenario?')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['safe', 'suspicious', 'malicious'] as Classification[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleClassify(c)}
                    className={`flex items-center justify-center gap-2 px-5 py-4 rounded-xl border font-bold uppercase tracking-wider text-sm transition-all ${classificationColor(c, true)}`}
                  >
                    {classificationIcon(c)}
                    {classificationLabel(c)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Explanation panel */}
          {revealed && (
            <div className="space-y-6 mt-2">
              {/* Result banner */}
              <div className={`rounded-xl border p-5 flex items-start gap-4 ${isCorrect ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-red-500/30 bg-red-950/20'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}>
                  {isCorrect
                    ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  }
                </div>
                <div>
                  <p className={`font-bold text-lg ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect
                      ? t(lang, 'Правилно!', 'Correct!', 'Richtig!')
                      : t(lang, 'Грешно!', 'Incorrect!', 'Falsch!')}
                  </p>
                  <p className="text-slate-300 text-sm mt-1">
                    {t(lang, 'Правилният отговор е:', 'The correct answer is:', 'Die richtige Antwort ist:')}{' '}
                    <span className={`font-bold ${classificationColor(correct!)}`}>{classificationLabel(correct!)}</span>
                  </p>
                </div>
              </div>

              {/* Attack summary */}
              <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-5">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t(lang, 'Резюме', 'Summary', 'Zusammenfassung')}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{scenarioLang.explanation.summary}</p>
              </div>

              {/* Red flags / indicators */}
              <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-5">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {correct === 'safe'
                    ? t(lang, 'Индикатори за легитимност', 'Indicators of Legitimacy', 'Indikatoren fuer Legitimitaet')
                    : t(lang, 'Червени флагове', 'Red Flags', 'Warnsignale')}
                </h4>
                <div className="space-y-3">
                  {scenarioLang.explanation.redFlags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${correct === 'safe' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}>
                        <span className="text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{flag.title}</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{flag.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defensive advice */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-5">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  {t(lang, 'Съвет за защита', 'Defensive Advice', 'Schutzratschlag')}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{scenarioLang.explanation.defensiveAdvice}</p>
              </div>

              {/* Next button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center gap-2"
                >
                  {currentIndex + 1 >= sessionScenarios.length
                    ? t(lang, 'Виж резултатите', 'See Results', 'Ergebnisse anzeigen')
                    : t(lang, 'Следващ сценарий', 'Next Scenario', 'Naechstes Szenario')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ScamLab;
