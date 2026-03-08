import React, { useState, useMemo, useEffect } from 'react';
import { SCAM_DOMAINS, CONTENT } from './constants';
import { Lang, PhishingDomain } from './types';
import Background from './components/Background';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('bg');
  const [search, setSearch] = useState('');
  const [phishingSearch, setPhishingSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phishingDomains, setPhishingDomains] = useState<PhishingDomain[]>([]);
  const [phishingLoading, setPhishingLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'main' | 'quiz'>('main');
  const [shareOpen, setShareOpen] = useState(false);

  const strings = CONTENT[lang];

  // Helper for inline 3-way translations
  const t = (bg: string, en: string, de: string) => lang === 'bg' ? bg : lang === 'en' ? en : de;

  // Fetch phishing domains from GitHub
  useEffect(() => {
    const fetchPhishingDomains = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Cyb3r-Pony/bg-phishing-detector/main/feed/phishing_feed.json');
        const data = await response.json();
        const domains: PhishingDomain[] = data.map((item: { domain: string; detected_at: string }) => ({
          domain: item.domain.replace(/^-/, ''),
          detectedAt: item.detected_at
        }));
        // Sort by detection date (newest first)
        domains.sort((a, b) => {
          const dateA = new Date(a.detectedAt.replace(/\+00:00Z$/, 'Z')).getTime();
          const dateB = new Date(b.detectedAt.replace(/\+00:00Z$/, 'Z')).getTime();
          return dateB - dateA;
        });
        setPhishingDomains(domains);
      } catch (error) {
        console.error('Failed to fetch phishing domains:', error);
      } finally {
        setPhishingLoading(false);
      }
    };
    fetchPhishingDomains();
  }, []);

  const filteredDomains = useMemo(() => {
    return SCAM_DOMAINS.filter(d => d.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const filteredPhishingDomains = useMemo(() => {
    return phishingDomains.filter(d => d.domain.toLowerCase().includes(phishingSearch.toLowerCase()));
  }, [phishingSearch, phishingDomains]);

  // Format date from ISO to DD.MM.YYYY
  const formatDate = (isoDate: string): string => {
    try {
      // Fix malformed date string: "+00:00Z" should be just "Z" or "+00:00"
      const fixedDate = isoDate.replace(/\+00:00Z$/, 'Z');
      const date = new Date(fixedDate);
      if (isNaN(date.getTime())) {
        return isoDate;
      }
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return isoDate;
    }
  };

  const doScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const needsMenuClose = mobileMenuOpen;
    if (needsMenuClose) setMobileMenuOpen(false);

    if (currentPage !== 'main') {
      setCurrentPage('main');
      // Wait for re-render (and menu collapse) then scroll
      setTimeout(() => doScroll(id), needsMenuClose ? 350 : 100);
      return;
    }

    if (needsMenuClose) {
      // Wait for menu collapse animation (300ms) before calculating scroll position
      setTimeout(() => doScroll(id), 350);
    } else {
      doScroll(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-blue-600/50">
      <Background />

      {/* Institutional Header */}
      <header className="sticky top-0 z-50 glass border-b border-blue-900/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-4 cursor-pointer min-w-0"
            onClick={() => { setCurrentPage('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded shadow-sm flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-sm tracking-tight text-slate-900 leading-tight uppercase whitespace-nowrap">{strings.header.title}</h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 overflow-x-auto no-scrollbar py-2">
            <button onClick={() => scrollToSection('scam-types')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-amber-500 transition-colors whitespace-nowrap">{t('Измами', 'Scams', 'Betrug')}</button>
            <button onClick={() => scrollToSection('warning-signs')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{t('Признаци', 'Signs', 'Warnzeichen')}</button>
            <button onClick={() => scrollToSection('attention')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{t('Мерки', 'Markers', 'Merkmale')}</button>
            <button onClick={() => scrollToSection('protection')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{t('Предпазване', 'Protection', 'Schutz')}</button>
            <button onClick={() => scrollToSection('registers')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{t('Регистри', 'Registers', 'Register')}</button>
            <button onClick={() => scrollToSection('blacklist')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600 hover:text-red-600 transition-colors whitespace-nowrap">{t('Черна листа', 'Blacklist', 'Schwarze Liste')}</button>
            <button onClick={() => scrollToSection('phishing')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-500 transition-colors whitespace-nowrap">{t('Фишинг', 'Phishing', 'Phishing')}</button>
            <button onClick={() => { setCurrentPage('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="px-2 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-400 transition-colors whitespace-nowrap border border-emerald-600/30 rounded bg-emerald-950/20 hover:bg-emerald-950/40">{t('Тест', 'Quiz', 'Quiz')}</button>
            <button onClick={() => scrollToSection('victim')} className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors whitespace-nowrap">{t('Ако сте жертва', 'Victim Help', 'Opferhilfe')}</button>
          </nav>

          {/* Desktop Language Toggle - always visible, outside scrollable nav */}
          <div className="hidden md:flex bg-slate-200/50 p-0.5 rounded ml-2 flex-shrink-0">
            <button
              onClick={() => setLang('bg')}
              className={`px-3 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'bg' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              BG
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('de')}
              className={`px-3 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'de' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              DE
            </button>
          </div>

          {/* Mobile Menu Button - visible only on mobile */}
          <div className="flex md:hidden items-center gap-2 flex-shrink-0">
            {/* Language toggle for mobile */}
            <div className="flex bg-slate-200/50 p-0.5 rounded flex-shrink-0">
              <button
                onClick={() => setLang('bg')}
                className={`px-2 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'bg' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                BG
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('de')}
                className={`px-2 py-1 rounded text-[10px] font-black tracking-tighter transition-all ${lang === 'de' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                DE
              </button>
            </div>

            {/* Dropdown toggle button with arrow */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider transition-all hover:bg-blue-800"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span>{t('Меню', 'Menu', 'Menü')}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="flex flex-col border-t border-blue-900/20 bg-white/80 backdrop-blur-md">
            <button
              onClick={() => scrollToSection('scam-types')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-amber-500 hover:bg-amber-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Видове измами', 'Types of Scams', 'Betrugsarten')}
            </button>
            <button
              onClick={() => scrollToSection('warning-signs')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Признаци', 'Signs', 'Warnzeichen')}
            </button>
            <button
              onClick={() => scrollToSection('attention')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Мерки', 'Markers', 'Merkmale')}
            </button>
            <button
              onClick={() => scrollToSection('protection')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Предпазване', 'Protection', 'Schutz')}
            </button>
            <button
              onClick={() => scrollToSection('registers')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Регистри', 'Registers', 'Register')}
            </button>
            <button
              onClick={() => scrollToSection('blacklist')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Черна листа', 'Blacklist', 'Schwarze Liste')}
            </button>
            <button
              onClick={() => scrollToSection('phishing')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Фишинг', 'Phishing', 'Phishing')}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setCurrentPage('quiz'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 350); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-400 hover:bg-emerald-50 transition-colors text-left border-b border-slate-200/50"
            >
              {t('Тест за киберсигурност', 'Security Quiz', 'Sicherheitsquiz')}
            </button>
            <button
              onClick={() => scrollToSection('victim')}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left"
            >
              {t('Ако сте жертва', 'Victim Help', 'Opferhilfe')}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {currentPage === 'quiz' ? (
          <Quiz lang={lang} onBack={() => { setCurrentPage('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        ) : (
        <div key={lang}>
        {/* Section A: Institutional Guidance (Hero) */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-blue-600/30 rounded-full hidden sm:block"></div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 rounded-full text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    {t('БОРБА С КИБЕРПРЕСТЪПНОСТТА', 'FIGHTING CYBERCRIME', 'KAMPF GEGEN CYBERKRIMINALITÄT')}
                  </div>
                  <div className="w-12 h-0.5 bg-blue-600/30 rounded-full hidden sm:block"></div>
              </div>

              <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl drop-shadow-2xl">
                {strings.hero.title}
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed font-medium">
                {strings.hero.description}
              </p>
              
              <div className="flex items-center gap-6 pt-6">
                <div className="h-px w-24 bg-blue-500/20"></div>
                <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                        {t('СЪВЕТИ ЗА КИБЕРСИГУРНОСТ', 'CYBERSECURITY ADVICE', 'CYBERSICHERHEITSHINWEISE')}
                    </span>
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                </div>
                <div className="h-px w-24 bg-blue-500/20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section id="statistics" className="py-24 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {t('Статистика', 'Statistics', 'Statistiken')}
              </span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">{strings.statistics.title}</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">{strings.statistics.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {strings.statistics.items.map((item, i) => (
                <div key={i} className="p-8 rounded-lg border border-red-900/30 bg-red-950/20 hover:bg-red-950/40 hover:border-red-600/50 transition-all text-center group">
                  <div className="text-4xl md:text-5xl font-black text-red-500 mb-3 group-hover:scale-105 transition-transform">{item.value}</div>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scam Lifecycle Flowchart */}
        <section id="scam-lifecycle" className="py-24 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16 text-center">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {t('Анатомия на измамата', 'Anatomy of a Scam', 'Anatomie eines Betrugs')}
              </span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">{strings.scamLifecycle.title}</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">{strings.scamLifecycle.subtitle}</p>
            </div>

            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-red-900 hidden sm:block"></div>

              <div className="space-y-6">
                {strings.scamLifecycle.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start group relative">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-black text-sm md:text-lg flex-shrink-0 border-2 z-10 transition-all ${i < 6 ? 'bg-orange-950/80 border-orange-500/50 text-orange-400 group-hover:border-orange-400 group-hover:bg-orange-900/50' : 'bg-red-950/80 border-red-500/50 text-red-400 group-hover:border-red-400 group-hover:bg-red-900/50'}`}>
                      {i + 1}
                    </div>
                    <div className={`flex-1 p-6 rounded-lg border transition-all ${i < 6 ? 'border-orange-900/30 bg-orange-950/10 hover:bg-orange-950/30 hover:border-orange-500/30' : 'border-red-900/30 bg-red-950/10 hover:bg-red-950/30 hover:border-red-500/30'}`}>
                      <h4 className={`font-bold text-lg mb-2 ${i < 6 ? 'text-orange-400' : 'text-red-400'}`}>{step.label}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stop - Challenge - Protect */}
        <section className="py-24 bg-slate-900/60 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">{strings.stopChallengeProtect.title}</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">{strings.stopChallengeProtect.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {strings.stopChallengeProtect.items.map((item, i) => (
                <div key={i} className={`p-6 md:p-8 rounded-lg border text-center transition-all hover:scale-[1.02] flex flex-col ${i === 0 ? 'border-red-600/50 bg-red-950/20 hover:bg-red-950/40' : i === 1 ? 'border-amber-600/50 bg-amber-950/20 hover:bg-amber-950/40' : 'border-emerald-600/50 bg-emerald-950/20 hover:bg-emerald-950/40'}`}>
                  <div className={`text-4xl md:text-2xl lg:text-3xl font-black mb-4 ${i === 0 ? 'text-red-500' : i === 1 ? 'text-amber-500' : 'text-emerald-500'}`}>{item.keyword}</div>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">{strings.stopChallengeProtect.source}</p>
          </div>
        </section>

        {/* Common Scam Types */}
        <section id="scam-types" className="py-24 bg-slate-900/60 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {t('Видове измами', 'Types of Fraud', 'Betrugsarten')}
              </span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">{strings.scamTypes.title}</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">{strings.scamTypes.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strings.scamTypes.items.map((item, i) => (
                <div key={i} className="relative p-8 rounded-lg border border-slate-700/50 bg-slate-950/50 hover:bg-slate-950/80 hover:border-amber-500/30 transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded bg-amber-600/20 text-amber-500 flex items-center justify-center font-black text-sm flex-shrink-0 border border-amber-600/30 group-hover:bg-amber-600/30 transition-colors">
                      {i + 1}
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors pt-1.5">{item.title}</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm mb-4">{item.desc}</p>
                  <div className="p-3 rounded bg-amber-950/20 border border-amber-900/30">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block mb-1">
                      {t('Пример:', 'Example:', 'Beispiel:')}
                    </span>
                    <p className="text-amber-200/70 text-xs leading-relaxed italic">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section id="warning-signs" className="py-24 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">{t('Психологически модели', 'Psychological Patterns', 'Psychologische Muster')}</span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">{strings.warningSigns.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strings.warningSigns.items.map((item, i) => (
                <div key={i} className="relative p-8 rounded border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-2xl hover:border-blue-500/30 transition-all group">
                  <div className="absolute top-0 right-0 p-4 text-white/5 font-black text-4xl select-none group-hover:text-blue-500/10 transition-colors">{i+1}</div>
                  <h4 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {strings.warningSigns.campaignLink && (
              <div className="mt-12 p-6 rounded-lg bg-blue-950/30 border border-blue-500/30 text-center">
                <p className="text-blue-200 font-medium mb-4">{strings.warningSigns.campaignLink.text}</p>
                <a
                  href={strings.warningSigns.campaignLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-sm rounded transition-all hover:gap-3"
                >
                  {strings.warningSigns.campaignLink.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Technical Red Flags */}
        <section id="attention" className="py-24 bg-slate-900/60 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-16 text-center text-white tracking-tight">{strings.technical.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-slate-950/50 p-10 rounded-lg border border-slate-800">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {strings.technical.broker.title}
                </h3>
                <ul className="space-y-6">
                  {strings.technical.broker.items.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="w-1.5 h-6 bg-red-600 flex-shrink-0 mt-0.5 group-hover:h-8 transition-all"></div>
                      <p className="text-slate-300 font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-950/50 p-10 rounded-lg border border-slate-800">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  {strings.technical.platform.title}
                </h3>
                <ul className="space-y-6">
                  {strings.technical.platform.items.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="w-1.5 h-6 bg-red-600 flex-shrink-0 mt-0.5 group-hover:h-8 transition-all"></div>
                      <p className="text-slate-300 font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Roadmap */}
        <section id="protection" className="py-24 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-white text-center mb-20 tracking-tight">{strings.protection.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strings.protection.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-start p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 rounded bg-blue-600 text-white flex items-center justify-center text-lg font-black mb-6 shadow-lg shadow-blue-900/20">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg leading-tight group-hover:text-blue-400 transition-colors">{step.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Download Flyer */}
            <div className="mt-16 text-center">
              <a
                href="/flyer-bg.pdf"
                download="Спри-Измамата-Флаер.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 text-sm uppercase tracking-wider"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('Изтегли флаер (PDF)', 'Download Flyer (PDF)', 'Flyer herunterladen (PDF)')}
              </a>
              <p className="text-slate-500 text-xs mt-3">{t('Разпечатайте и споделете с близки', 'Print and share with others', 'Drucken und mit anderen teilen')}</p>
            </div>
          </div>
        </section>

        {/* Official Registers */}
        <section id="registers" className="py-24 bg-slate-50/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-white text-center mb-16 tracking-tight">{strings.registers.title}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {strings.registers.sections.slice(0, 2).map((section, i) => (
                <div key={i} className="space-y-6">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 border-b border-white/10 pb-2">{section.region}</h3>
                  <div className="grid gap-4">
                    {section.items.map((item, j) => (
                      <div key={j} className="p-6 rounded bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all group">
                        <h4 className="font-bold text-white mb-1 text-sm group-hover:text-blue-400 transition-colors">{item.name}</h4>
                        <p className="text-[12px] text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
                        <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:gap-3 transition-all">
                          {item.linkText}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {strings.registers.sections.slice(2, 3).map((section, i) => (
                <div key={i} className="space-y-6">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 border-b border-white/10 pb-2">{section.region}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, j) => (
                      <div key={j} className="p-6 rounded bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all group">
                        <h4 className="font-bold text-white mb-1 text-sm group-hover:text-blue-400 transition-colors">{item.name}</h4>
                        <p className="text-[12px] text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
                        <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:gap-3 transition-all">
                          {item.linkText}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blacklist */}
        <section id="blacklist" className="py-24 bg-slate-950/80 backdrop-blur-sm border-y border-slate-900 selection:bg-red-500 selection:text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="mb-12 text-center flex flex-col items-center">
              <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {strings.alert.title}
              </span>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                {strings.domains.title}
              </h2>
              <div className="p-6 rounded-lg bg-red-950/30 border border-red-600/50 text-red-100 text-sm leading-relaxed shadow-[0_0_20px_rgba(185,28,28,0.2)] max-w-4xl mx-auto">
                <strong className="block text-red-400 uppercase tracking-wider text-xs mb-2">
                  {t('ВНИМАНИЕ:', 'NOTICE:', 'ACHTUNG:')}
                </strong>
                {strings.alert.description}
              </div>
            </div>

            <div className="space-y-6 w-full flex flex-col items-center">
              <div className="relative w-full max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder={strings.domains.placeholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 text-white p-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all text-md mono"
                />
                <svg className="w-5 h-5 text-slate-600 absolute left-4 top-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="bg-slate-900/40 rounded-lg border border-slate-800 overflow-hidden backdrop-blur-md w-full">
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDomains.map((domain, i) => (
                      <div key={i} className="mono text-[12px] bg-slate-900/80 border border-slate-800 p-3 rounded text-red-400 flex flex-col group/item hover:border-red-600 transition-all hover:bg-slate-800">
                        <span className="tracking-tight truncate" title={domain}>{domain}</span>
                        <span className="text-[8px] uppercase font-bold text-slate-600 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {t('ЧЕРЕН СПИСЪК', 'BLACKLISTED', 'GESPERRT')}
                        </span>
                      </div>
                    ))}
                    {filteredDomains.length === 0 && (
                      <div className="col-span-full py-20 text-center">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                          {t('Няма намерени записи', 'No records matching query', 'Keine passenden Einträge gefunden')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex justify-between">
                  <span>{t('Източник: cybercrime.bg', 'Source: cybercrime.bg', 'Quelle: cybercrime.bg')}</span>
                  <span>{filteredDomains.length} {t('Намерени', 'Entries Filtered', 'Einträge gefiltert')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phishing Detector */}
        <section id="phishing" className="py-24 bg-slate-950/80 backdrop-blur-sm border-y border-slate-900 selection:bg-cyan-500 selection:text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="mb-12 text-center flex flex-col items-center">
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {t('Автоматично засичане', 'Automatic Detection', 'Automatische Erkennung')}
              </span>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                {strings.phishing.title}
              </h2>
              <div className="p-6 rounded-lg bg-cyan-950/30 border border-cyan-600/50 text-cyan-100 text-sm leading-relaxed shadow-[0_0_20px_rgba(6,182,212,0.2)] max-w-4xl mx-auto">
                <strong className="block text-cyan-400 uppercase tracking-wider text-xs mb-2">
                  {t('ИНФОРМАЦИЯ:', 'INFO:', 'INFORMATION:')}
                </strong>
                {strings.phishing.description}
              </div>
            </div>

            <div className="space-y-6 w-full flex flex-col items-center">
              <div className="relative w-full max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder={strings.phishing.placeholder}
                  value={phishingSearch}
                  onChange={(e) => setPhishingSearch(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 text-white p-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all text-md mono"
                />
                <svg className="w-5 h-5 text-slate-600 absolute left-4 top-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="bg-slate-900/40 rounded-lg border border-slate-800 overflow-hidden backdrop-blur-md w-full">
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6">
                  {phishingLoading ? (
                    <div className="py-20 text-center">
                      <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        {t('Зареждане...', 'Loading...', 'Laden...')}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredPhishingDomains.map((item, i) => (
                        <div key={i} className="mono text-[12px] bg-slate-900/80 border border-slate-800 p-3 rounded text-cyan-400 flex flex-col group/item hover:border-cyan-600 transition-all hover:bg-slate-800">
                          <span className="tracking-tight truncate" title={item.domain}>{item.domain}</span>
                          <span className="text-[9px] text-slate-500 mt-1">
                            {strings.phishing.detectionDate} {formatDate(item.detectedAt)}
                          </span>
                        </div>
                      ))}
                      {filteredPhishingDomains.length === 0 && !phishingLoading && (
                        <div className="col-span-full py-20 text-center">
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            {strings.phishing.noResults}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex justify-between">
                  <span>{strings.phishing.source}</span>
                  <span>{filteredPhishingDomains.length} {strings.phishing.entries}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section id="victim" className="py-24 bg-red-950/40 backdrop-blur-md relative overflow-hidden border-y border-red-900/50">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">{strings.victim.title}</h2>
             <div className="grid grid-cols-1 gap-4 text-left">
                {strings.victim.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-6 p-6 rounded border border-red-900/30 bg-black/40 backdrop-blur-sm hover:bg-black/60 hover:border-red-600 transition-all shadow-xl">
                    <div className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center font-black flex-shrink-0 text-sm shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                      {i + 1}
                    </div>
                    <span className="text-lg font-bold tracking-tight text-red-50">{step}</span>
                  </div>
                ))}
             </div>
             <p className="mt-12 text-red-400 font-medium italic opacity-90 tracking-wide uppercase text-xs">
               {strings.victim.emergencyNote}
             </p>
           </div>
        </section>
        </div>
        )}
      </main>

      {/* Floating Social Share Button with Toggle */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {shareOpen && (
          <div className="flex flex-col gap-2 mb-1">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fstop-the-scam.com"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Сподели във Facebook', 'Share on Facebook', 'Auf Facebook teilen')}
              className="w-11 h-11 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="viber://forward?text=https%3A%2F%2Fstop-the-scam.com"
              title={t('Сподели във Viber', 'Share on Viber', 'Auf Viber teilen')}
              className="w-11 h-11 rounded-full bg-[#7360f2] hover:bg-[#6550e0] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.518 6.764.375 9.947c-.144 3.183-.332 9.152 5.56 10.85l.007.003-.004 2.483s-.04.998.621 1.203c.795.248 1.263-.51 2.024-1.327.418-.45.994-1.108 1.43-1.613 3.937.331 6.962-.425 7.306-.538.794-.263 5.283-.833 6.014-6.798.753-6.14-.354-10.018-2.325-11.776C19.211.457 15.452-.04 11.398.002zm.432 2.09c3.481-.035 6.664.315 8.4 1.83 1.592 1.398 2.586 4.665 1.928 9.998-.586 4.783-3.922 5.19-4.584 5.41-.282.092-2.866.74-6.156.536 0 0-2.437 2.94-3.2 3.705-.12.12-.26.167-.353.144-.13-.032-.166-.186-.164-.412l.025-4.022c-4.863-1.397-4.576-6.344-4.46-8.904.118-2.56.704-4.726 2.1-6.108C6.646 2.995 8.814 2.264 11.83 2.092zM11.59 5.39c-.24 0-.24.373 0 .377a6.39 6.39 0 014.488 1.66 5.39 5.39 0 011.572 3.83c.004.244.377.24.373 0a5.755 5.755 0 00-1.69-4.098 6.772 6.772 0 00-4.743-1.77zm.245 1.828c-.236-.016-.247.35-.01.37a4.42 4.42 0 012.611 1.19c.618.656.917 1.403.94 2.312.007.24.38.236.373 0-.025-1.032-.366-1.893-1.065-2.635a4.78 4.78 0 00-2.849-1.237zm-2.26.614c-.322-.035-.612.078-.834.31l-.379.44c-.222.257-.49.213-.49.213-2.32-.584-3.693-3.264-3.693-3.264s-.162-.265.1-.564l.39-.417c.37-.388.363-.9.085-1.453l-.607-1.12-.607-1.1c-.256-.37-.604-.6-.94-.518 0 0-.72.17-1.408.916a3.078 3.078 0 00-.567 1.2c-.273 1.38.293 3.098 1.637 5.022 1.1 1.694 3.406 4.473 7.159 5.698.894.213 1.6.09 2.106-.17.507-.26.79-.652.79-.652l.305-.412c.326-.43.143-.89-.304-1.105l-1.782-.84c-.285-.135-.595-.058-.78.182l-.376.451c-.197.236-.576.198-.576.198z"/></svg>
            </a>
            <a
              href="https://wa.me/?text=https%3A%2F%2Fstop-the-scam.com"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Сподели в WhatsApp', 'Share on WhatsApp', 'Auf WhatsApp teilen')}
              className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a
              href="https://t.me/share/url?url=https%3A%2F%2Fstop-the-scam.com"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Сподели в Telegram', 'Share on Telegram', 'Auf Telegram teilen')}
              className="w-11 h-11 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        )}
        <button
          onClick={() => setShareOpen(!shareOpen)}
          title={t('Сподели', 'Share', 'Teilen')}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        >
          {shareOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          )}
        </button>
      </div>

      {/* Institutional Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md text-slate-500 py-16 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-900/30 rounded flex items-center justify-center border border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-tighter">{strings.header.title}</h3>
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-slate-400">{strings.footer.disclaimer}</p>
              <div className="mt-4 flex flex-col gap-1">
                {strings.footer.officialLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    {link.name} &rarr; {link.url.replace('https://', '')}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-end text-right md:text-left">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-4">Official Platform</h4>
              <p className="text-sm font-medium leading-relaxed max-w-md text-slate-400">
                {t('Сайт за обществена осведоменост и превенция на финансови злоупотреби.', 'Public awareness platform for the prevention of financial abuse.', 'Plattform zur Aufklärung und Prävention von Finanzbetrug.')}
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              © 2026 {t('Спри Измамата', 'Stop The Scam', 'Stopp den Betrug')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;