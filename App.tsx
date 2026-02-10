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

  const strings = CONTENT[lang];

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

  const scrollToSection = (id: string) => {
    if (currentPage !== 'main') {
      setCurrentPage('main');
      // Wait for re-render then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-blue-600/50">
      <Background />

      {/* Institutional Header */}
      <header className="sticky top-0 z-50 glass border-b border-blue-900/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => { setCurrentPage('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight uppercase">{strings.header.title}</h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar py-2">
            <button onClick={() => scrollToSection('blacklist')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-red-600 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Черна листа' : 'Blacklist'}</button>
            <button onClick={() => scrollToSection('warning-signs')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Признаци' : 'Signs'}</button>
            <button onClick={() => scrollToSection('attention')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Мерки' : 'Markers'}</button>
            <button onClick={() => scrollToSection('protection')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Предпазване' : 'Protection'}</button>
            <button onClick={() => scrollToSection('registers')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Регистри' : 'Registers'}</button>
            <button onClick={() => scrollToSection('phishing')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Фишинг' : 'Phishing'}</button>
            <button onClick={() => { setCurrentPage('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-400 transition-colors whitespace-nowrap border border-emerald-600/30 rounded bg-emerald-950/20 hover:bg-emerald-950/40">{lang === 'bg' ? 'Тест' : 'Quiz'}</button>
            <button onClick={() => scrollToSection('victim')} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors whitespace-nowrap">{lang === 'bg' ? 'Ако сте жертва' : 'Victim Help'}</button>

            <div className="flex bg-slate-200/50 p-0.5 rounded ml-4 flex-shrink-0">
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
            </div>
          </nav>

          {/* Mobile Menu Button - visible only on mobile */}
          <div className="flex md:hidden items-center gap-3">
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
            </div>

            {/* Dropdown toggle button with arrow */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider transition-all hover:bg-blue-800"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span>{lang === 'bg' ? 'Меню' : 'Menu'}</span>
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
              onClick={() => { scrollToSection('blacklist'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Черна листа' : 'Blacklist'}
            </button>
            <button
              onClick={() => { scrollToSection('warning-signs'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Признаци' : 'Signs'}
            </button>
            <button
              onClick={() => { scrollToSection('attention'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Мерки' : 'Markers'}
            </button>
            <button
              onClick={() => { scrollToSection('protection'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Предпазване' : 'Protection'}
            </button>
            <button
              onClick={() => { scrollToSection('registers'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Регистри' : 'Registers'}
            </button>
            <button
              onClick={() => { scrollToSection('phishing'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 hover:bg-cyan-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Фишинг' : 'Phishing'}
            </button>
            <button
              onClick={() => { setCurrentPage('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-400 hover:bg-emerald-50 transition-colors text-left border-b border-slate-200/50"
            >
              {lang === 'bg' ? 'Тест за киберсигурност' : 'Security Quiz'}
            </button>
            <button
              onClick={() => { scrollToSection('victim'); setMobileMenuOpen(false); }}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left"
            >
              {lang === 'bg' ? 'Ако сте жертва' : 'Victim Help'}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {currentPage === 'quiz' ? (
          <Quiz lang={lang} onBack={() => { setCurrentPage('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        ) : (
        <>
        {/* Section A: Institutional Guidance (Hero) */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-blue-600/30 rounded-full hidden sm:block"></div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 rounded-full text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    {lang === 'bg' ? 'БОРБА С КИБЕРПРЕСТЪПНОСТТА' : 'FIGHTING CYBERCRIME'}
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
                        {lang === 'bg' ? 'СЪВЕТИ ЗА КИБЕРСИГУРНОСТ' : 'CYBERSECURITY ADVICE'}
                    </span>
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                </div>
                <div className="h-px w-24 bg-blue-500/20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section B: Blacklist - Centered Design */}
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
                  {lang === 'bg' ? 'ВНИМАНИЕ:' : 'NOTICE:'}
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
                          {lang === 'bg' ? 'ЧЕРЕН СПИСЪК' : 'BLACKLISTED'}
                        </span>
                      </div>
                    ))}
                    {filteredDomains.length === 0 && (
                      <div className="col-span-full py-20 text-center">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                          {lang === 'bg' ? 'Няма намерени записи' : 'No records matching query'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex justify-between">
                  <span>{lang === 'bg' ? 'Източник: cybercrime.bg' : 'Source: cybercrime.bg'}</span>
                  <span>{filteredDomains.length} {lang === 'bg' ? 'Намерени' : 'Entries Filtered'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section id="warning-signs" className="py-24 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">Psychological Patterns</span>
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

        {/* Phishing Detector */}
        <section id="phishing" className="py-24 bg-slate-950/80 backdrop-blur-sm border-y border-slate-900 selection:bg-cyan-500 selection:text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="mb-12 text-center flex flex-col items-center">
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">
                {lang === 'bg' ? 'Автоматично засичане' : 'Automatic Detection'}
              </span>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                {strings.phishing.title}
              </h2>
              <div className="p-6 rounded-lg bg-cyan-950/30 border border-cyan-600/50 text-cyan-100 text-sm leading-relaxed shadow-[0_0_20px_rgba(6,182,212,0.2)] max-w-4xl mx-auto">
                <strong className="block text-cyan-400 uppercase tracking-wider text-xs mb-2">
                  {lang === 'bg' ? 'ИНФОРМАЦИЯ:' : 'INFO:'}
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
                        {lang === 'bg' ? 'Зареждане...' : 'Loading...'}
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
        </>
        )}
      </main>

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
            </div>
            
            <div className="flex flex-col justify-end text-right md:text-left">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-4">Official Platform</h4>
              <p className="text-sm font-medium leading-relaxed max-w-md text-slate-400">
                {lang === 'bg' ? 'Сайт за обществена осведоменост и превенция на финансови злоупотреби.' : 'Public awareness platform for the prevention of financial abuse.'}
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              © 2026 {lang === 'bg' ? 'Спри Измамата' : 'Stop The Scam'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;