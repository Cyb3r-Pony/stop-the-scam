import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SCAM_DOMAINS, CONTENT } from './constants';
import { Lang, PhishingDomain } from './types';
import Background from './components/Background';
import Quiz from './components/Quiz';
import SocialEngineering from './components/SocialEngineering';
import ScamLab from './components/ScamLab';
import ScamTypes from './components/ScamTypes';
import WarningSigns from './components/WarningSigns';
import Protection from './components/Protection';
import ExternalTools from './components/ExternalTools';
import DomainChecker from './components/DomainChecker';
import { Section, Container, SectionHeading, Eyebrow, Btn, ArrowLink, LiveDot, PanelHeader, Icon, ACCENTS } from './components/ui';

type Page =
  | 'main'
  | 'quiz'
  | 'social-engineering'
  | 'scam-lab'
  | 'scam-types'
  | 'warning-signs'
  | 'protection'
  | 'tools'
  | 'checker';

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('bg');
  const [search, setSearch] = useState('');
  const [phishingSearch, setPhishingSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [phishingDomains, setPhishingDomains] = useState<PhishingDomain[]>([]);
  const [phishingLoading, setPhishingLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [shareOpen, setShareOpen] = useState(false);
  const [blacklistVisible, setBlacklistVisible] = useState(48);
  const [phishingVisible, setPhishingVisible] = useState(48);

  const navRef = useRef<HTMLDivElement>(null);
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

  // Close the desktop dropdowns on outside click or Escape
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMenu(null); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const filteredDomains = useMemo(() => {
    return SCAM_DOMAINS.filter(d => d.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const filteredPhishingDomains = useMemo(() => {
    return phishingDomains.filter(d => d.domain.toLowerCase().includes(phishingSearch.toLowerCase()));
  }, [phishingSearch, phishingDomains]);

  // Format date from ISO to DD.MM.YYYY
  const formatDate = (isoDate: string): string => {
    try {
      const fixedDate = isoDate.replace(/\+00:00Z$/, 'Z');
      const date = new Date(fixedDate);
      if (isNaN(date.getTime())) return isoDate;
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return isoDate;
    }
  };

  const latestDetection = phishingDomains.length > 0 ? formatDate(phishingDomains[0].detectedAt) : '—';

  const doScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const needsMenuClose = mobileMenuOpen;
    setOpenMenu(null);
    if (needsMenuClose) setMobileMenuOpen(false);

    if (currentPage !== 'main') {
      setCurrentPage('main');
      setTimeout(() => doScroll(id), needsMenuClose ? 350 : 100);
      return;
    }
    if (needsMenuClose) {
      setTimeout(() => doScroll(id), 350);
    } else {
      doScroll(id);
    }
  };

  const goTo = (page: Page) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => goTo('main');

  /* ---------------------------------------------------------------- */
  /* Navigation model                                                  */
  /* ---------------------------------------------------------------- */

  type NavItem = { label: string; desc: string; page?: Page; anchor?: string };
  type NavGroup = { id: string; label: string; items: NavItem[] };

  const navGroups: NavGroup[] = [
    {
      id: 'learn',
      label: t('Научи', 'Learn', 'Lernen'),
      items: [
        {
          label: t('Видове измами', 'Types of Fraud', 'Betrugsarten'),
          desc: t('12 категории с реални примери', '12 categories with real examples', '12 Kategorien mit realen Beispielen'),
          page: 'scam-types',
        },
        {
          label: t('Признаци на измама', 'Warning Signs', 'Warnsignale'),
          desc: t('16 сигнала, които издават схемата', '16 signals that expose the scheme', '16 Signale, die das Schema verraten'),
          page: 'warning-signs',
        },
        {
          label: t('Как да се предпазите', 'How to Protect Yourself', 'So schützen Sie sich'),
          desc: t('13 практични мерки и флаер за печат', '13 practical measures and a printable flyer', '13 praktische Maßnahmen und ein Flyer'),
          page: 'protection',
        },
      ],
    },
    {
      id: 'practice',
      label: t('Практика', 'Practice', 'Praxis'),
      items: [
        {
          label: t('Тест за киберсигурност', 'Security Quiz', 'Sicherheitsquiz'),
          desc: t('Оценка на риска и персонален план', 'Risk assessment and a personal plan', 'Risikobewertung und persönlicher Plan'),
          page: 'quiz',
        },
        {
          label: t('Социално инженерство', 'Social Engineering', 'Social Engineering'),
          desc: t('Как манипулацията работи стъпка по стъпка', 'How manipulation works, step by step', 'Wie Manipulation Schritt für Schritt funktioniert'),
          page: 'social-engineering',
        },
        {
          label: t('Лаборатория за измами', 'Scam Detection Lab', 'Betrugserkennungs-Labor'),
          desc: t('Класифицирайте реалистични сценарии', 'Classify realistic scenarios', 'Klassifizieren Sie realistische Szenarien'),
          page: 'scam-lab',
        },
      ],
    },
    {
      id: 'data',
      label: t('Данни', 'Data', 'Daten'),
      items: [
        {
          label: t('Черна листа на домейни', 'Domain Blacklist', 'Domain-Schwarzliste'),
          desc: t(`${SCAM_DOMAINS.length} домейна от ГДБОП-МВР`, `${SCAM_DOMAINS.length} domains from GDCOC-MoI`, `${SCAM_DOMAINS.length} Domains von GDBOP-MoI`),
          anchor: 'blacklist',
        },
        {
          label: t('Фишинг детектор', 'Phishing Detector', 'Phishing-Detektor'),
          desc: t('Автоматично засичане в реално време', 'Automated real-time detection', 'Automatische Echtzeit-Erkennung'),
          anchor: 'phishing',
        },
        {
          label: t('Официални регистри', 'Official Registers', 'Offizielle Register'),
          desc: t('Проверете лиценз преди да инвестирате', 'Verify a licence before you invest', 'Lizenz prüfen, bevor Sie investieren'),
          anchor: 'registers',
        },
      ],
    },
    {
      id: 'resources',
      label: t('Ресурси', 'Resources', 'Ressourcen'),
      items: [
        {
          label: t('Външни инструменти', 'External Tools', 'Externe Werkzeuge'),
          desc: t('Проверка на линк, файл или IP', 'Check a link, file, or IP', 'Link, Datei oder IP prüfen'),
          page: 'tools',
        },
        {
          label: t('Проверка на домейн или IP', 'Domain & IP Check', 'Domain- & IP-Prüfung'),
          desc: t('Оценка и репутация, директно тук', 'Hygiene score and reputation, here', 'Bewertung und Reputation, direkt hier'),
          page: 'checker',
        },
      ],
    },
  ];

  const handleNavItem = (item: NavItem) => {
    if (item.page) goTo(item.page);
    else if (item.anchor) scrollToSection(item.anchor);
  };

  const isGroupActive = (group: NavGroup) =>
    group.items.some(i => i.page && i.page === currentPage);

  /* ---------------------------------------------------------------- */
  /* Homepage pillar previews                                          */
  /* ---------------------------------------------------------------- */

  const pillars = [
    {
      accent: 'amber' as const,
      page: 'scam-types' as Page,
      icon: Icon.clipboard('w-5 h-5'),
      eyebrow: t('Справочник', 'Reference', 'Referenz'),
      title: strings.scamTypes.title,
      count: strings.scamTypes.items.length,
      countLabel: t('категории измами', 'fraud categories', 'Betrugskategorien'),
      samples: strings.scamTypes.items.slice(0, 4).map(i => i.title),
      cta: t('Виж всички категории', 'View all categories', 'Alle Kategorien ansehen'),
    },
    {
      accent: 'orange' as const,
      page: 'warning-signs' as Page,
      icon: Icon.alert('w-5 h-5'),
      eyebrow: t('Разпознаване', 'Recognition', 'Erkennung'),
      title: strings.warningSigns.title,
      count: strings.warningSigns.items.length,
      countLabel: t('признака за разпознаване', 'signs to recognise', 'zu erkennende Merkmale'),
      samples: strings.warningSigns.items.slice(0, 4).map(i => i.title),
      cta: t('Виж всички признаци', 'View all warning signs', 'Alle Warnsignale ansehen'),
    },
    {
      accent: 'emerald' as const,
      page: 'protection' as Page,
      icon: Icon.shield('w-5 h-5'),
      eyebrow: t('Защита', 'Defence', 'Schutz'),
      title: strings.protection.title,
      count: strings.protection.steps.length,
      countLabel: t('конкретни мерки', 'concrete measures', 'konkrete Maßnahmen'),
      samples: strings.protection.steps.slice(0, 4).map(i => i.title),
      cta: t('Виж всички мерки', 'View all measures', 'Alle Maßnahmen ansehen'),
    },
  ];

  const training = [
    {
      accent: 'emerald' as const,
      page: 'quiz' as Page,
      icon: Icon.shield('w-6 h-6'),
      title: t('Тест за киберсигурност', 'Security Quiz', 'Sicherheitsquiz'),
      desc: t(
        'Десет въпроса според профила ви — физическо лице, IT администратор или ръководител. Получавате оценка на риска и персонален план за действие.',
        'Ten questions matched to your profile — individual, IT administrator, or executive. You receive a risk rating and a personal action plan.',
        'Zehn Fragen passend zu Ihrem Profil — Privatperson, IT-Administrator oder Führungskraft. Sie erhalten eine Risikobewertung und einen persönlichen Aktionsplan.'
      ),
      meta: t('3 профила · 10 въпроса', '3 profiles · 10 questions', '3 Profile · 10 Fragen'),
    },
    {
      accent: 'violet' as const,
      page: 'social-engineering' as Page,
      icon: Icon.users('w-6 h-6'),
      title: t('Социално инженерство', 'Social Engineering', 'Social Engineering'),
      desc: t(
        'Разбор на манипулационните техники, които стоят зад всяка измама — авторитет, спешност, доверие и изолация.',
        'A breakdown of the manipulation techniques behind every scam — authority, urgency, trust, and isolation.',
        'Eine Analyse der Manipulationstechniken hinter jedem Betrug — Autorität, Dringlichkeit, Vertrauen und Isolation.'
      ),
      meta: t('Задълбочен разбор', 'In-depth breakdown', 'Ausführliche Analyse'),
    },
    {
      accent: 'blue' as const,
      page: 'scam-lab' as Page,
      icon: Icon.beaker('w-6 h-6'),
      title: t('Лаборатория за измами', 'Scam Detection Lab', 'Betrugserkennungs-Labor'),
      desc: t(
        'Реалистични имейли, SMS-и и фалшиви страници. Класифицирайте всеки като безопасен, съмнителен или зловреден и вижте разбора.',
        'Realistic emails, SMS messages, and fake pages. Classify each as safe, suspicious, or malicious, then see the breakdown.',
        'Realistische E-Mails, SMS und gefälschte Seiten. Klassifizieren Sie jede als sicher, verdächtig oder bösartig und sehen Sie die Analyse.'
      ),
      meta: t('Интерактивен симулатор', 'Interactive simulator', 'Interaktiver Simulator'),
    },
  ];

  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">

      {/* ============================= HEADER ============================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3 flex-shrink-0 group"
            onClick={goHome}
          >
            <span className="w-9 h-9 bg-blue-600 flex items-center justify-center rounded-lg flex-shrink-0 group-hover:bg-blue-700 transition-colors">
              <span className="text-white">{Icon.shield('w-5 h-5')}</span>
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-extrabold text-[15px] tracking-tight text-slate-900 whitespace-nowrap">
                {strings.header.title}
              </span>
              <span className="mono text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 whitespace-nowrap mt-0.5 hidden sm:block">
                {t('Защита от финансови измами', 'Financial fraud protection', 'Schutz vor Finanzbetrug')}
              </span>
            </span>
          </button>

          {/* Desktop navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label={t('Основна навигация', 'Main navigation', 'Hauptnavigation')}>
            {navGroups.map(group => (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === group.id ? null : group.id)}
                  aria-expanded={openMenu === group.id}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold rounded-lg transition-colors ${
                    openMenu === group.id || isGroupActive(group)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {group.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === group.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openMenu === group.id && (
                  <div className="absolute left-0 top-full mt-2 w-max min-w-[300px] max-w-[420px] rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.25)] overflow-hidden anim-fade-up">
                    {group.items.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleNavItem(item)}
                        className={`w-full text-left px-5 py-4 transition-colors hover:bg-slate-50 ${
                          i !== group.items.length - 1 ? 'border-b border-slate-100' : ''
                        } ${item.page && item.page === currentPage ? 'bg-blue-50/60' : ''}`}
                      >
                        <span className="block text-[14px] font-semibold text-slate-900 mb-0.5">{item.label}</span>
                        <span className="block text-[12px] text-slate-500 leading-snug whitespace-nowrap">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language */}
            <div className="flex bg-slate-100 border border-slate-200 p-0.5 rounded-lg">
              {(['bg', 'en', 'de'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2.5 py-1 rounded-md mono text-[11px] font-semibold tracking-wider transition-all ${
                    lang === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Emergency — always one click away */}
            <button
              type="button"
              onClick={() => scrollToSection('victim')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold tracking-wide transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 anim-live-dot" aria-hidden="true" />
              {t('Спешна помощ', 'Emergency', 'Notfall')}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? t('Затвори менюто', 'Close menu', 'Menü schließen') : t('Отвори менюто', 'Open menu', 'Menü öffnen')}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 7h16M4 12h16M4 17h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
          <nav className="border-t border-slate-200 bg-white pb-4">
            {navGroups.map(group => (
              <div key={group.id}>
                <div className="px-6 pt-5 pb-2">
                  <span className="mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {group.label}
                  </span>
                </div>
                {group.items.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNavItem(item)}
                    className="w-full text-left px-6 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="block text-[14px] font-semibold text-slate-900">{item.label}</span>
                    <span className="block text-[12px] text-slate-500 leading-snug mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            ))}
            <div className="px-6 pt-5">
              <button
                type="button"
                onClick={() => scrollToSection('victim')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white text-[13px] font-bold"
              >
                {t('Вече сте жертва? Действайте веднага', 'Already a victim? Act now', 'Bereits Opfer? Jetzt handeln')}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ============================= MAIN ============================= */}
      <main className="flex-1">
        {currentPage === 'quiz' ? (
          <Quiz lang={lang} onBack={goHome} />
        ) : currentPage === 'social-engineering' ? (
          <SocialEngineering lang={lang} onBack={goHome} />
        ) : currentPage === 'scam-lab' ? (
          <ScamLab lang={lang} onBack={goHome} />
        ) : currentPage === 'scam-types' ? (
          <ScamTypes lang={lang} onBack={goHome} onNavigate={goTo} />
        ) : currentPage === 'warning-signs' ? (
          <WarningSigns lang={lang} onBack={goHome} onNavigate={goTo} />
        ) : currentPage === 'protection' ? (
          <Protection lang={lang} onBack={goHome} onNavigate={goTo} />
        ) : currentPage === 'tools' ? (
          <ExternalTools lang={lang} onBack={goHome} />
        ) : currentPage === 'checker' ? (
          <DomainChecker lang={lang} onBack={goHome} onNavigate={goTo} />
        ) : (
        <div key={lang}>

          {/* ---------------------------- HERO ---------------------------- */}
          <section className="relative overflow-hidden bg-white">
            <div className="absolute inset-0 texture-grid mask-fade-b pointer-events-none" aria-hidden="true" />
            <Container width="wide" className="relative pt-16 pb-20 md:pt-24 md:pb-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Statement */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 anim-live-dot" aria-hidden="true" />
                    <span className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      {t('Обществена платформа за киберосведоменост', 'Public cyber awareness platform', 'Öffentliche Plattform für Cyber-Aufklärung')}
                    </span>
                  </div>

                  <h1 className="display mt-8 text-4xl sm:text-5xl lg:text-[3.75rem] lg:leading-[1.04] font-extrabold text-slate-900">
                    {strings.hero.title}
                  </h1>

                  <p className="mt-7 text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl">
                    {strings.hero.description}
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
                    <Btn accent="blue" size="lg" onClick={() => goTo('scam-types')}>
                      {Icon.book()}
                      {t('Научете основите', 'Learn the Basics', 'Grundlagen lernen')}
                    </Btn>
                    <Btn variant="outline" size="lg" onClick={() => scrollToSection('blacklist')}>
                      {Icon.search()}
                      {t('Проверете домейн', 'Check a Domain', 'Domain prüfen')}
                    </Btn>
                  </div>

                  {/* Credentials, not decoration */}
                  <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-x-8 gap-y-3">
                    {[
                      t('Данни от ГДБОП-МВР', 'Data from GDCOC-MoI', 'Daten von GDBOP-MoI'),
                      t('Безплатно и без реклами', 'Free and ad-free', 'Kostenlos und werbefrei'),
                      t('BG · EN · DE', 'BG · EN · DE', 'BG · EN · DE'),
                    ].map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500">
                        <span className="text-emerald-600">{Icon.shield('w-4 h-4')}</span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live threat snapshot — introduces the operational surface */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden dark-zone">
                    <div className="absolute inset-0 texture-grid-dark opacity-60 pointer-events-none" aria-hidden="true" />
                    <div className="relative">
                      <PanelHeader
                        accent="cyan"
                        label={t('Наблюдение на заплахи', 'Threat monitoring', 'Bedrohungsüberwachung')}
                        meta={t('НА ЖИВО', 'LIVE', 'LIVE')}
                      />
                      <div className="p-6 space-y-5">
                        {[
                          {
                            value: SCAM_DOMAINS.length.toLocaleString('bg-BG'),
                            label: t('домейна в черния списък', 'blacklisted domains', 'Domains auf der Schwarzliste'),
                            accent: 'red' as const,
                          },
                          {
                            value: phishingLoading ? '···' : phishingDomains.length.toLocaleString('bg-BG'),
                            label: t('засечени фишинг домейна', 'phishing domains detected', 'erkannte Phishing-Domains'),
                            accent: 'cyan' as const,
                          },
                          {
                            value: strings.scamTypes.items.length + strings.warningSigns.items.length + strings.protection.steps.length,
                            label: t('материала за обучение', 'training materials', 'Schulungsmaterialien'),
                            accent: 'emerald' as const,
                          },
                        ].map((row, i) => (
                          <div key={i} className="flex items-baseline justify-between gap-4 pb-5 border-b border-slate-800 last:border-0 last:pb-0">
                            <span className={`mono text-3xl font-semibold tabular-nums ${ACCENTS[row.accent].dText}`}>
                              {row.value}
                            </span>
                            <span className="text-[12px] text-slate-400 text-right leading-snug max-w-[55%]">
                              {row.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3">
                        <span className="mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
                          {t('Последно засичане', 'Last detection', 'Letzte Erkennung')}
                        </span>
                        <span className="mono text-[11px] text-slate-300 tabular-nums">{latestDetection}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* -------------------- STOP · THINK · CHECK -------------------- */}
          <Section tone="tint" size="md">
            <Container>
              <SectionHeading
                accent="blue"
                align="center"
                eyebrow={t('Основното правило', 'The core rule', 'Die Grundregel')}
                title={strings.stopChallengeProtect.title}
                lead={strings.stopChallengeProtect.subtitle}
              />

              <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                {strings.stopChallengeProtect.items.map((item, i) => {
                  const accent = (['red', 'amber', 'emerald'] as const)[i] ?? 'blue';
                  const a = ACCENTS[accent];
                  return (
                    <div
                      key={i}
                      className={`relative rounded-xl border ${a.border} bg-white p-8 md:p-9 overflow-hidden`}
                    >
                      <span className={`absolute top-0 left-0 right-0 h-1 ${a.rule}`} aria-hidden="true" />
                      <span className={`mono text-[11px] font-semibold tabular-nums ${a.text}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`display mt-4 text-3xl font-extrabold ${a.text}`}>{item.keyword}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-10 text-center mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
                {strings.stopChallengeProtect.source}
              </p>
            </Container>
          </Section>

          {/* ------------------------- STATISTICS ------------------------- */}
          <Section id="statistics" tone="white" size="md">
            <Container>
              <SectionHeading
                accent="red"
                eyebrow={t('Статистика', 'Statistics', 'Statistiken')}
                title={strings.statistics.title}
                lead={strings.statistics.subtitle}
              />

              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {strings.statistics.items.map((item, i) => (
                  <div key={i} className="border-t-2 border-red-600 pt-6">
                    <div className="display text-4xl md:text-[2.75rem] font-extrabold text-red-600 tabular-nums leading-none">
                      {item.value}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* ------------------------- LIFECYCLE -------------------------- */}
          <Section id="scam-lifecycle" tone="tint" size="md">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <SectionHeading
                      accent="orange"
                      eyebrow={t('Анатомия на измамата', 'Anatomy of a scam', 'Anatomie eines Betrugs')}
                      title={strings.scamLifecycle.title}
                      lead={strings.scamLifecycle.subtitle}
                    />
                    <div className="mt-8">
                      <ArrowLink accent="orange" onClick={() => goTo('scam-lab')}>
                        {t('Изпробвайте се в Лабораторията', 'Test yourself in the Lab', 'Testen Sie sich im Labor')}
                      </ArrowLink>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <ol className="relative">
                    {/* Rail: alarm shading into danger */}
                    <span
                      className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-400 via-orange-500 to-red-600"
                      aria-hidden="true"
                    />
                    {strings.scamLifecycle.steps.map((step, i) => {
                      const late = i >= 5;
                      return (
                        <li key={i} className="relative pl-12 pb-9 last:pb-0">
                          <span
                            className={`absolute left-0 top-0.5 w-[31px] h-[31px] rounded-full flex items-center justify-center mono text-[11px] font-semibold tabular-nums border-2 bg-slate-50 ${
                              late ? 'border-red-600 text-red-600' : 'border-orange-400 text-orange-600'
                            }`}
                          >
                            {i + 1}
                          </span>
                          <h3 className={`text-[17px] font-bold leading-snug ${late ? 'text-red-700' : 'text-slate-900'}`}>
                            {step.label}
                          </h3>
                          <p className="mt-2 text-[14px] leading-relaxed text-slate-600 max-w-xl">{step.desc}</p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </Container>
          </Section>

          {/* --------------------------- PILLARS -------------------------- */}
          <Section id="learn" tone="white" size="md">
            <Container>
              <SectionHeading
                accent="blue"
                eyebrow={t('Материали', 'Library', 'Materialien')}
                title={t('Всичко, което трябва да знаете', 'Everything you need to know', 'Alles, was Sie wissen müssen')}
                lead={t(
                  'Разделено на три части, за да го четете на части — а не наведнъж.',
                  'Split into three parts, so you can read it in pieces rather than all at once.',
                  'In drei Teile gegliedert, damit Sie es Stück für Stück lesen können.'
                )}
              />

              <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((p, i) => {
                  const a = ACCENTS[p.accent];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(p.page)}
                      className={`group flex flex-col text-left rounded-xl border border-slate-200 bg-white p-8 transition-all duration-200 ${a.hoverBorder} hover:shadow-[0_2px_20px_-6px_rgba(15,23,42,0.16)]`}
                    >
                      <span className={`w-11 h-11 rounded-lg ${a.bgSoft} ${a.text} flex items-center justify-center mb-6`}>
                        {p.icon}
                      </span>

                      <span className={`mono text-[10px] font-semibold uppercase tracking-[0.18em] ${a.text} mb-3`}>
                        {p.eyebrow}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">{p.title}</h3>
                      <p className="mono text-[12px] text-slate-500 mb-6">
                        {p.count} {p.countLabel}
                      </p>

                      <ul className="space-y-2.5 mb-8">
                        {p.samples.map((s, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-snug">
                            <span className={`mt-[7px] w-1 h-1 rounded-full ${a.rule} flex-shrink-0`} aria-hidden="true" />
                            <span className="line-clamp-1">{s}</span>
                          </li>
                        ))}
                      </ul>

                      <span className={`mt-auto inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] ${a.text}`}>
                        {p.cta}
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* -------------------------- TRAINING -------------------------- */}
          <Section id="practice" tone="tint" size="md">
            <Container>
              <SectionHeading
                accent="emerald"
                eyebrow={t('Практика', 'Practice', 'Praxis')}
                title={t('Знанието помага само ако го упражнявате', 'Knowledge only helps if you practise it', 'Wissen hilft nur, wenn Sie es üben')}
                lead={t(
                  'Три безплатни интерактивни модула, които превръщат прочетеното в рефлекс.',
                  'Three free interactive modules that turn what you have read into reflex.',
                  'Drei kostenlose interaktive Module, die Gelesenes zum Reflex machen.'
                )}
              />

              <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                {training.map((mod, i) => {
                  const a = ACCENTS[mod.accent];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(mod.page)}
                      className={`group relative flex flex-col text-left rounded-xl border border-slate-200 bg-white p-8 overflow-hidden transition-all duration-200 ${a.hoverBorder} hover:shadow-[0_2px_20px_-6px_rgba(15,23,42,0.16)]`}
                    >
                      <span className={`absolute top-0 left-0 right-0 h-1 ${a.rule}`} aria-hidden="true" />
                      <span className={`w-12 h-12 rounded-lg ${a.solid} text-white flex items-center justify-center mb-6`}>
                        {mod.icon}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug mb-3">{mod.title}</h3>
                      <p className="text-[14px] leading-relaxed text-slate-600 mb-6">{mod.desc}</p>
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="mono text-[11px] text-slate-500">{mod.meta}</span>
                        <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] ${a.text}`}>
                          {t('Започни', 'Start', 'Starten')}
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* -------------------------- REGISTERS ------------------------- */}
          <Section id="registers" tone="white" size="md">
            <Container>
              <SectionHeading
                accent="blue"
                eyebrow={t('Проверка на лиценз', 'Licence verification', 'Lizenzprüfung')}
                title={strings.registers.title}
                lead={t(
                  'Преди да преведете каквато и да е сума, проверете дружеството в официален регистър. Отнема две минути.',
                  'Before you transfer any amount, check the firm in an official register. It takes two minutes.',
                  'Bevor Sie einen Betrag überweisen, prüfen Sie das Unternehmen in einem offiziellen Register. Das dauert zwei Minuten.'
                )}
              />

              <div className="mt-14 space-y-12">
                {strings.registers.sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="flex items-center gap-3 mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 pb-3 mb-6 border-b border-slate-200">
                      {section.region}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.items.map((item, j) => (
                        <a
                          key={j}
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-blue-400 hover:shadow-[0_2px_16px_-4px_rgba(15,23,42,0.12)]"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5">
                              {Icon.external('w-4 h-4')}
                            </span>
                          </div>
                          <p className="text-[13px] leading-relaxed text-slate-500">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* ==================== DARK OPERATIONAL ZONE ==================== */}
          <div className="relative dark-zone bg-slate-950 overflow-hidden">
            <Background />

            {/* Zone intro */}
            <Container width="wide" className="relative pt-20 md:pt-28 pb-12">
              <SectionHeading
                dark
                accent="cyan"
                eyebrow={t('Оперативни данни', 'Operational data', 'Betriebsdaten')}
                title={t('Живи данни за заплахите', 'Live threat data', 'Live-Bedrohungsdaten')}
                lead={t(
                  'Два независими източника: официалният черен списък на ГДБОП-МВР и нашият автоматичен скенер за фишинг домейни, насочени към български потребители.',
                  'Two independent sources: the official GDCOC-MoI blacklist, and our automated scanner for phishing domains targeting Bulgarian users.',
                  'Zwei unabhängige Quellen: die offizielle GDBOP-MoI-Schwarzliste und unser automatischer Scanner für Phishing-Domains, die auf bulgarische Nutzer abzielen.'
                )}
                aside={
                  <div className="flex flex-col gap-2">
                    <LiveDot dark accent="red">
                      {SCAM_DOMAINS.length.toLocaleString('bg-BG')} {t('в черния списък', 'blacklisted', 'auf der Schwarzliste')}
                    </LiveDot>
                    <LiveDot dark accent="cyan">
                      {phishingLoading ? '···' : phishingDomains.length.toLocaleString('bg-BG')} {t('фишинг домейна', 'phishing domains', 'Phishing-Domains')}
                    </LiveDot>
                  </div>
                }
              />
            </Container>

            {/* Blacklist */}
            <section id="blacklist" className="relative py-10 md:py-14 scroll-mt-24">
              <Container width="wide">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
                  <PanelHeader
                    accent="red"
                    label={strings.domains.title}
                    meta={t('Източник: cybercrime.bg', 'Source: cybercrime.bg', 'Quelle: cybercrime.bg')}
                  />

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                      <p className="flex-1 text-[14px] leading-relaxed text-slate-400">
                        <strong className="text-red-400 font-semibold">
                          {t('Внимание: ', 'Notice: ', 'Achtung: ')}
                        </strong>
                        {strings.alert.description}
                      </p>
                      <div className="relative w-full lg:w-80 flex-shrink-0">
                        <label htmlFor="blacklist-search" className="sr-only">{strings.domains.placeholder}</label>
                        <input
                          id="blacklist-search"
                          type="text"
                          placeholder={strings.domains.placeholder}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="mono w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 py-3 pl-11 pr-4 rounded-lg text-[13px] focus:outline-none focus:border-red-600 transition-colors"
                        />
                        <span className="absolute left-4 top-3.5 text-slate-600">{Icon.search('w-4 h-4')}</span>
                      </div>
                    </div>

                    <div className="max-h-[520px] overflow-y-auto custom-scrollbar -mr-2 pr-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {filteredDomains.slice(0, search ? filteredDomains.length : blacklistVisible).map((domain, i) => (
                          <div
                            key={i}
                            className="mono text-[12px] bg-slate-950/80 border border-slate-800 px-3.5 py-2.5 rounded-md text-red-400 hover:border-red-800 hover:bg-slate-900 transition-colors truncate"
                            title={domain}
                          >
                            {domain}
                          </div>
                        ))}
                      </div>

                      {filteredDomains.length === 0 && (
                        <div className="py-20 text-center">
                          <p className="mono text-[12px] uppercase tracking-[0.15em] text-slate-600">
                            {t('Няма намерени записи', 'No records matching query', 'Keine passenden Einträge gefunden')}
                          </p>
                        </div>
                      )}

                      {!search && blacklistVisible < filteredDomains.length && (
                        <div className="text-center pt-6">
                          <button
                            type="button"
                            onClick={() => setBlacklistVisible(prev => prev + 96)}
                            className="mono px-5 py-2.5 text-[12px] font-medium text-red-400 border border-red-900/60 rounded-lg hover:bg-red-950/40 hover:border-red-700 transition-colors"
                          >
                            {t('Покажи още', 'Show more', 'Mehr anzeigen')} · {filteredDomains.length - blacklistVisible}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 md:px-8 py-3.5 border-t border-slate-800 bg-slate-950/60 flex justify-between items-center gap-4">
                    <span className="mono text-[11px] text-slate-500">
                      {t('Официален черен списък', 'Official blacklist', 'Offizielle Schwarzliste')}
                    </span>
                    <span className="mono text-[11px] text-slate-400 tabular-nums">
                      {filteredDomains.length.toLocaleString('bg-BG')} {t('записа', 'entries', 'Einträge')}
                    </span>
                  </div>
                </div>
              </Container>
            </section>

            {/* Phishing detector */}
            <section id="phishing" className="relative py-10 md:py-14 pb-24 md:pb-32 scroll-mt-24">
              <Container width="wide">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
                  <PanelHeader
                    accent="cyan"
                    label={strings.phishing.title}
                    meta={strings.phishing.source}
                  />

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                      <p className="flex-1 text-[14px] leading-relaxed text-slate-400">
                        <strong className="text-cyan-400 font-semibold">
                          {t('Автоматично засичане: ', 'Automatic detection: ', 'Automatische Erkennung: ')}
                        </strong>
                        {strings.phishing.description}
                      </p>
                      <div className="relative w-full lg:w-80 flex-shrink-0">
                        <label htmlFor="phishing-search" className="sr-only">{strings.phishing.placeholder}</label>
                        <input
                          id="phishing-search"
                          type="text"
                          placeholder={strings.phishing.placeholder}
                          value={phishingSearch}
                          onChange={(e) => setPhishingSearch(e.target.value)}
                          className="mono w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 py-3 pl-11 pr-4 rounded-lg text-[13px] focus:outline-none focus:border-cyan-600 transition-colors"
                        />
                        <span className="absolute left-4 top-3.5 text-slate-600">{Icon.search('w-4 h-4')}</span>
                      </div>
                    </div>

                    <div className="max-h-[520px] overflow-y-auto custom-scrollbar -mr-2 pr-2">
                      {phishingLoading ? (
                        <div className="py-20 text-center">
                          <div className="inline-block w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                          <p className="mono text-[12px] uppercase tracking-[0.15em] text-slate-600">
                            {t('Зареждане на фийда...', 'Loading feed...', 'Feed wird geladen...')}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {filteredPhishingDomains.slice(0, phishingSearch ? filteredPhishingDomains.length : phishingVisible).map((item, i) => (
                              <div
                                key={i}
                                className="bg-slate-950/80 border border-slate-800 px-3.5 py-2.5 rounded-md hover:border-cyan-800 hover:bg-slate-900 transition-colors"
                              >
                                <div className="mono text-[12px] text-cyan-400 truncate" title={item.domain}>{item.domain}</div>
                                <div className="mono text-[10px] text-slate-600 mt-1 tabular-nums">
                                  {strings.phishing.detectionDate} {formatDate(item.detectedAt)}
                                </div>
                              </div>
                            ))}
                          </div>

                          {filteredPhishingDomains.length === 0 && (
                            <div className="py-20 text-center">
                              <p className="mono text-[12px] uppercase tracking-[0.15em] text-slate-600">
                                {strings.phishing.noResults}
                              </p>
                            </div>
                          )}

                          {!phishingSearch && phishingVisible < filteredPhishingDomains.length && (
                            <div className="text-center pt-6">
                              <button
                                type="button"
                                onClick={() => setPhishingVisible(prev => prev + 96)}
                                className="mono px-5 py-2.5 text-[12px] font-medium text-cyan-400 border border-cyan-900/60 rounded-lg hover:bg-cyan-950/40 hover:border-cyan-700 transition-colors"
                              >
                                {t('Покажи още', 'Show more', 'Mehr anzeigen')} · {filteredPhishingDomains.length - phishingVisible}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="px-6 md:px-8 py-3.5 border-t border-slate-800 bg-slate-950/60 flex justify-between items-center gap-4">
                    <span className="mono text-[11px] text-slate-500">
                      {t('Автоматичен скенер', 'Automated scanner', 'Automatischer Scanner')}
                    </span>
                    <span className="mono text-[11px] text-slate-400 tabular-nums">
                      {filteredPhishingDomains.length.toLocaleString('bg-BG')} {strings.phishing.entries}
                    </span>
                  </div>
                </div>
              </Container>
            </section>
          </div>

          {/* ------------------- EMERGENCY RESPONSE ---------------------- */}
          <section id="victim" className="relative dark-zone bg-red-950 scroll-mt-24 overflow-hidden">
            <div className="absolute inset-0 texture-grid-dark opacity-40 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" aria-hidden="true" />
            <Container className="relative py-20 md:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-red-500/40 bg-red-900/40 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 anim-live-dot" aria-hidden="true" />
                      <span className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
                        {t('Спешен протокол', 'Emergency protocol', 'Notfallprotokoll')}
                      </span>
                    </div>
                    <h2 className="display text-3xl md:text-[2.75rem] md:leading-[1.1] font-extrabold text-white">
                      {strings.victim.title}
                    </h2>
                    <p className="mt-6 text-[15px] leading-relaxed text-red-200/80">
                      {strings.victim.emergencyNote}
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                      <a
                        href="tel:112"
                        className="inline-flex items-center gap-3 px-5 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors"
                      >
                        {Icon.phone('w-5 h-5')}
                        {t('Спешен телефон 112', 'Emergency line 112', 'Notruf 112')}
                      </a>
                      <a
                        href="https://cybercrime.bg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-5 py-3.5 rounded-lg border border-red-500/40 text-red-100 hover:bg-red-900/50 font-bold text-sm transition-colors"
                      >
                        {Icon.external('w-4 h-4')}
                        {t('Подай сигнал: cybercrime.bg', 'Report: cybercrime.bg', 'Melden: cybercrime.bg')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <ol className="space-y-3">
                    {strings.victim.steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-5 rounded-xl border border-red-800/60 bg-red-950/60 backdrop-blur-sm p-6 transition-colors hover:border-red-600 hover:bg-red-900/40"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center mono text-[12px] font-semibold tabular-nums">
                          {i + 1}
                        </span>
                        <span className="text-[16px] font-medium leading-relaxed text-red-50 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Container>
          </section>
        </div>
        )}
      </main>

      {/* ---------------------- FLOATING SHARE ----------------------- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {shareOpen && (
          <div className="flex flex-col gap-2 mb-1 anim-fade-up">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fstop-the-scam.xyz"
              target="_blank" rel="noopener noreferrer"
              title={t('Сподели във Facebook', 'Share on Facebook', 'Auf Facebook teilen')}
              className="w-11 h-11 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="viber://forward?text=https%3A%2F%2Fstop-the-scam.xyz"
              title={t('Сподели във Viber', 'Share on Viber', 'Auf Viber teilen')}
              className="w-11 h-11 rounded-full bg-[#7360f2] hover:bg-[#6550e0] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.518 6.764.375 9.947c-.144 3.183-.332 9.152 5.56 10.85l.007.003-.004 2.483s-.04.998.621 1.203c.795.248 1.263-.51 2.024-1.327.418-.45.994-1.108 1.43-1.613 3.937.331 6.962-.425 7.306-.538.794-.263 5.283-.833 6.014-6.798.753-6.14-.354-10.018-2.325-11.776C19.211.457 15.452-.04 11.398.002zm.432 2.09c3.481-.035 6.664.315 8.4 1.83 1.592 1.398 2.586 4.665 1.928 9.998-.586 4.783-3.922 5.19-4.584 5.41-.282.092-2.866.74-6.156.536 0 0-2.437 2.94-3.2 3.705-.12.12-.26.167-.353.144-.13-.032-.166-.186-.164-.412l.025-4.022c-4.863-1.397-4.576-6.344-4.46-8.904.118-2.56.704-4.726 2.1-6.108C6.646 2.995 8.814 2.264 11.83 2.092zM11.59 5.39c-.24 0-.24.373 0 .377a6.39 6.39 0 014.488 1.66 5.39 5.39 0 011.572 3.83c.004.244.377.24.373 0a5.755 5.755 0 00-1.69-4.098 6.772 6.772 0 00-4.743-1.77zm.245 1.828c-.236-.016-.247.35-.01.37a4.42 4.42 0 012.611 1.19c.618.656.917 1.403.94 2.312.007.24.38.236.373 0-.025-1.032-.366-1.893-1.065-2.635a4.78 4.78 0 00-2.849-1.237zm-2.26.614c-.322-.035-.612.078-.834.31l-.379.44c-.222.257-.49.213-.49.213-2.32-.584-3.693-3.264-3.693-3.264s-.162-.265.1-.564l.39-.417c.37-.388.363-.9.085-1.453l-.607-1.12-.607-1.1c-.256-.37-.604-.6-.94-.518 0 0-.72.17-1.408.916a3.078 3.078 0 00-.567 1.2c-.273 1.38.293 3.098 1.637 5.022 1.1 1.694 3.406 4.473 7.159 5.698.894.213 1.6.09 2.106-.17.507-.26.79-.652.79-.652l.305-.412c.326-.43.143-.89-.304-1.105l-1.782-.84c-.285-.135-.595-.058-.78.182l-.376.451c-.197.236-.576.198-.576.198z"/></svg>
            </a>
            <a
              href="https://wa.me/?text=https%3A%2F%2Fstop-the-scam.xyz"
              target="_blank" rel="noopener noreferrer"
              title={t('Сподели в WhatsApp', 'Share on WhatsApp', 'Auf WhatsApp teilen')}
              className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a
              href="https://t.me/share/url?url=https%3A%2F%2Fstop-the-scam.xyz"
              target="_blank" rel="noopener noreferrer"
              title={t('Сподели в Telegram', 'Share on Telegram', 'Auf Telegram teilen')}
              className="w-11 h-11 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShareOpen(!shareOpen)}
          title={t('Сподели', 'Share', 'Teilen')}
          aria-expanded={shareOpen}
          className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105"
        >
          {shareOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          )}
        </button>
      </div>

      {/* ============================= FOOTER ============================= */}
      <footer className="dark-zone bg-slate-950 border-t border-slate-800">
        <Container width="wide" className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">

            {/* Identity */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">{Icon.shield('w-5 h-5')}</span>
                </span>
                <span className="text-white font-extrabold text-[15px] tracking-tight">{strings.header.title}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-400 max-w-sm mb-6">
                {strings.footer.disclaimer}
              </p>
              <LiveDot dark accent="emerald">
                {t('Безплатно · Без реклами · Без проследяване на потребители', 'Free · Ad-free · No user tracking', 'Kostenlos · Werbefrei · Kein Nutzer-Tracking')}
              </LiveDot>
            </div>

            {/* Link columns */}
            {navGroups.map(group => (
              <div key={group.id} className="lg:col-span-2">
                <h3 className="mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
                  {group.label}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => handleNavItem(item)}
                        className="text-[13px] text-slate-400 hover:text-white transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Official sources */}
            <div className="lg:col-span-1 md:col-span-2 lg:min-w-[180px]">
              <h3 className="mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5 whitespace-nowrap">
                {t('Източници', 'Sources', 'Quellen')}
              </h3>
              <ul className="space-y-3">
                {strings.footer.officialLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-[12px] text-blue-400 hover:text-blue-300 transition-colors break-all"
                    >
                      {link.url.replace('https://', '')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="mono text-[11px] text-slate-500">
              © {new Date().getFullYear()} {t('Спри Измамата', 'Stop The Scam', 'Stopp den Betrug')}
            </span>
            <span className="mono text-[11px] text-slate-600 text-center sm:text-right">
              {t(
                'Платформа за обществена осведоменост. Не предоставя инвестиционни съвети.',
                'Public awareness platform. Does not provide investment advice.',
                'Plattform zur öffentlichen Aufklärung. Bietet keine Anlageberatung.'
              )}
            </span>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;
