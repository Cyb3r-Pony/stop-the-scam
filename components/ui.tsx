import React from 'react';
import { Lang } from '../types';

/**
 * Shared design-system primitives.
 *
 * The platform runs on two surface families:
 *   • light  — institutional guidance (education, protection, registers)
 *   • dark   — operational zones (live threat data, emergency response)
 *
 * Colour carries meaning and is never decorative:
 *   red danger · orange alarm · amber exposure · emerald defence
 *   blue knowledge · cyan live signal
 */

export type Accent = 'red' | 'orange' | 'amber' | 'emerald' | 'blue' | 'cyan' | 'violet';

interface AccentTokens {
  text: string;
  textSoft: string;
  bgSoft: string;
  border: string;
  borderStrong: string;
  solid: string;
  solidHover: string;
  rule: string;
  hoverBorder: string;
  ring: string;
  /* dark-surface variants */
  dText: string;
  dBgSoft: string;
  dBorder: string;
}

export const ACCENTS: Record<Accent, AccentTokens> = {
  red: {
    text: 'text-red-600', textSoft: 'text-red-700', bgSoft: 'bg-red-50', border: 'border-red-200',
    borderStrong: 'border-red-500', solid: 'bg-red-600', solidHover: 'hover:bg-red-700',
    rule: 'bg-red-600', hoverBorder: 'hover:border-red-400', ring: 'focus:ring-red-500/40',
    dText: 'text-red-400', dBgSoft: 'bg-red-950/40', dBorder: 'border-red-900/60',
  },
  orange: {
    text: 'text-orange-600', textSoft: 'text-orange-700', bgSoft: 'bg-orange-50', border: 'border-orange-200',
    borderStrong: 'border-orange-500', solid: 'bg-orange-600', solidHover: 'hover:bg-orange-700',
    rule: 'bg-orange-500', hoverBorder: 'hover:border-orange-400', ring: 'focus:ring-orange-500/40',
    dText: 'text-orange-400', dBgSoft: 'bg-orange-950/40', dBorder: 'border-orange-900/60',
  },
  amber: {
    text: 'text-amber-600', textSoft: 'text-amber-700', bgSoft: 'bg-amber-50', border: 'border-amber-200',
    borderStrong: 'border-amber-500', solid: 'bg-amber-500', solidHover: 'hover:bg-amber-600',
    rule: 'bg-amber-500', hoverBorder: 'hover:border-amber-400', ring: 'focus:ring-amber-500/40',
    dText: 'text-amber-400', dBgSoft: 'bg-amber-950/40', dBorder: 'border-amber-900/60',
  },
  emerald: {
    text: 'text-emerald-600', textSoft: 'text-emerald-700', bgSoft: 'bg-emerald-50', border: 'border-emerald-200',
    borderStrong: 'border-emerald-500', solid: 'bg-emerald-600', solidHover: 'hover:bg-emerald-700',
    rule: 'bg-emerald-500', hoverBorder: 'hover:border-emerald-400', ring: 'focus:ring-emerald-500/40',
    dText: 'text-emerald-400', dBgSoft: 'bg-emerald-950/40', dBorder: 'border-emerald-900/60',
  },
  blue: {
    text: 'text-blue-600', textSoft: 'text-blue-700', bgSoft: 'bg-blue-50', border: 'border-blue-200',
    borderStrong: 'border-blue-500', solid: 'bg-blue-600', solidHover: 'hover:bg-blue-700',
    rule: 'bg-blue-600', hoverBorder: 'hover:border-blue-400', ring: 'focus:ring-blue-500/40',
    dText: 'text-blue-400', dBgSoft: 'bg-blue-950/40', dBorder: 'border-blue-900/60',
  },
  cyan: {
    text: 'text-cyan-600', textSoft: 'text-cyan-700', bgSoft: 'bg-cyan-50', border: 'border-cyan-200',
    borderStrong: 'border-cyan-500', solid: 'bg-cyan-600', solidHover: 'hover:bg-cyan-700',
    rule: 'bg-cyan-500', hoverBorder: 'hover:border-cyan-400', ring: 'focus:ring-cyan-500/40',
    dText: 'text-cyan-400', dBgSoft: 'bg-cyan-950/40', dBorder: 'border-cyan-900/60',
  },
  violet: {
    text: 'text-violet-600', textSoft: 'text-violet-700', bgSoft: 'bg-violet-50', border: 'border-violet-200',
    borderStrong: 'border-violet-500', solid: 'bg-violet-600', solidHover: 'hover:bg-violet-700',
    rule: 'bg-violet-500', hoverBorder: 'hover:border-violet-400', ring: 'focus:ring-violet-500/40',
    dText: 'text-violet-400', dBgSoft: 'bg-violet-950/40', dBorder: 'border-violet-900/60',
  },
};

export const tr = (lang: Lang, bg: string, en: string, de: string) =>
  lang === 'bg' ? bg : lang === 'en' ? en : de;

/* ------------------------------------------------------------------ */
/* Section shells                                                      */
/* ------------------------------------------------------------------ */

interface SectionProps {
  id?: string;
  /** white = primary surface, tint = subtle separation, dark = operational zone */
  tone?: 'white' | 'tint' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const SECTION_PADDING = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-36',
};

export const Section: React.FC<SectionProps> = ({ id, tone = 'white', size = 'md', className = '', children }) => {
  const toneClass =
    tone === 'dark' ? 'dark-zone bg-slate-950 text-slate-200'
    : tone === 'tint' ? 'bg-slate-50 text-slate-900 border-y border-slate-200'
    : 'bg-white text-slate-900';

  return (
    <section id={id} className={`relative ${toneClass} ${SECTION_PADDING[size]} ${className}`}>
      {children}
    </section>
  );
};

interface ContainerProps {
  width?: 'prose' | 'narrow' | 'default' | 'wide';
  className?: string;
  children: React.ReactNode;
}

const CONTAINER_WIDTH = {
  prose: 'max-w-3xl',
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export const Container: React.FC<ContainerProps> = ({ width = 'default', className = '', children }) => (
  <div className={`${CONTAINER_WIDTH[width]} mx-auto px-6 md:px-8 ${className}`}>{children}</div>
);

/* ------------------------------------------------------------------ */
/* Headings                                                            */
/* ------------------------------------------------------------------ */

interface EyebrowProps {
  accent?: Accent;
  dark?: boolean;
  children: React.ReactNode;
}

/** Small labelled rule above a section title. Sets the semantic colour. */
export const Eyebrow: React.FC<EyebrowProps> = ({ accent = 'blue', dark = false, children }) => {
  const a = ACCENTS[accent];
  return (
    <div className="flex items-center gap-3">
      <span className={`h-[3px] w-8 rounded-full ${a.rule}`} aria-hidden="true" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? a.dText : a.text}`}>
        {children}
      </span>
    </div>
  );
};

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  accent?: Accent;
  align?: 'left' | 'center';
  dark?: boolean;
  /** Optional element rendered opposite the heading on wide screens */
  aside?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow, title, lead, accent = 'blue', align = 'left', dark = false, aside, className = '',
}) => {
  const centered = align === 'center';
  return (
    <div
      className={`${centered ? 'flex flex-col items-center text-center' : aside ? 'flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8' : ''} ${className}`}
    >
      <div className={centered ? 'flex flex-col items-center' : 'max-w-2xl'}>
        {eyebrow && (
          <div className={centered ? 'mb-6' : 'mb-5'}>
            <Eyebrow accent={accent} dark={dark}>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className={`display text-3xl md:text-[2.75rem] md:leading-[1.1] font-extrabold ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
        {lead && (
          <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'} ${centered ? 'max-w-2xl' : ''}`}>
            {lead}
          </p>
        )}
      </div>
      {aside && !centered && <div className="flex-shrink-0">{aside}</div>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Buttons & links                                                     */
/* ------------------------------------------------------------------ */

interface BtnProps {
  variant?: 'primary' | 'outline' | 'ghost' | 'dark';
  accent?: Accent;
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const BTN_SIZE = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-5 py-3 text-[13px]',
  lg: 'px-7 py-4 text-sm',
};

export const Btn: React.FC<BtnProps> = ({
  variant = 'primary', accent = 'blue', size = 'md', as = 'button',
  href, download, target, rel, onClick, className = '', children,
}) => {
  const a = ACCENTS[accent];
  const base = `inline-flex items-center justify-center gap-2.5 rounded-lg font-bold tracking-wide transition-all duration-200 ${BTN_SIZE[size]}`;
  const styles =
    variant === 'primary' ? `${a.solid} ${a.solidHover} text-white shadow-sm hover:shadow-md`
    : variant === 'outline' ? `border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50`
    : variant === 'dark' ? `bg-slate-900 hover:bg-slate-800 text-white`
    : `text-slate-700 hover:text-slate-900 hover:bg-slate-100`;

  const cls = `${base} ${styles} ${className}`;

  if (as === 'a') {
    return (
      <a href={href} download={download} target={target} rel={rel} className={cls}>
        {children}
      </a>
    );
  }
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
};

/** Understated "continue reading" link with a moving arrow. */
export const ArrowLink: React.FC<{ accent?: Accent; dark?: boolean; onClick?: () => void; href?: string; children: React.ReactNode }> = ({
  accent = 'blue', dark = false, onClick, href, children,
}) => {
  const a = ACCENTS[accent];
  const cls = `group/al inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] ${dark ? a.dText : a.text} transition-colors`;
  const inner = (
    <>
      {children}
      <svg className="w-4 h-4 transition-transform duration-200 group-hover/al:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );
  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>;
  }
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
};

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

interface CardProps {
  accent?: Accent;
  interactive?: boolean;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ accent = 'blue', interactive = false, dark = false, className = '', onClick, children }) => {
  const a = ACCENTS[accent];
  const base = dark
    ? `rounded-xl border border-slate-800 bg-slate-900/60`
    : `rounded-xl border border-slate-200 bg-white`;
  const hover = interactive
    ? dark
      ? `transition-all duration-200 hover:border-slate-700 hover:bg-slate-900`
      : `transition-all duration-200 ${a.hoverBorder} hover:shadow-[0_2px_16px_-4px_rgba(15,23,42,0.12)]`
    : '';
  const cls = `${base} ${hover} ${className}`;
  if (onClick) {
    return <button type="button" onClick={onClick} className={`${cls} text-left w-full`}>{children}</button>;
  }
  return <div className={cls}>{children}</div>;
};

/* ------------------------------------------------------------------ */
/* Technical / cyber details                                           */
/* ------------------------------------------------------------------ */

/** Live status pill — signals that data behind the platform is real and moving. */
export const LiveDot: React.FC<{ accent?: Accent; dark?: boolean; children: React.ReactNode }> = ({
  accent = 'emerald', dark = false, children,
}) => {
  const a = ACCENTS[accent];
  return (
    <span className={`inline-flex items-center gap-2 mono text-[11px] font-medium tracking-wide ${dark ? a.dText : a.textSoft}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${a.rule} anim-live-dot`} aria-hidden="true" />
      {children}
    </span>
  );
};

/** Monospace header bar for data panels — reads as an operational console. */
export const PanelHeader: React.FC<{ accent?: Accent; label: string; meta?: React.ReactNode }> = ({
  accent = 'red', label, meta,
}) => {
  const a = ACCENTS[accent];
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-slate-800 bg-slate-900/80">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className={`w-1.5 h-1.5 rounded-full ${a.rule} flex-shrink-0`} aria-hidden="true" />
        <span className={`mono text-[11px] font-semibold uppercase tracking-[0.15em] ${a.dText} truncate`}>{label}</span>
      </div>
      {meta && <span className="mono text-[11px] text-slate-500 flex-shrink-0 whitespace-nowrap">{meta}</span>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Sub-page shell                                                      */
/* ------------------------------------------------------------------ */

interface PageHeaderProps {
  accent: Accent;
  eyebrow: string;
  title: string;
  lead: string;
  meta?: React.ReactNode;
  onBack: () => void;
  backLabel: string;
}

/** Consistent masthead for every sub-page. */
export const PageHeader: React.FC<PageHeaderProps> = ({ accent, eyebrow, title, lead, meta, onBack, backLabel }) => {
  const a = ACCENTS[accent];
  return (
    <header className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="absolute inset-0 texture-grid mask-fade-b pointer-events-none" aria-hidden="true" />
      <div className={`absolute top-0 left-0 right-0 h-1 ${a.rule}`} aria-hidden="true" />
      <Container className="relative pt-10 pb-16 md:pt-12 md:pb-20">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500 hover:text-slate-900 transition-colors mb-10"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </button>

        <div className="max-w-3xl">
          <div className="mb-5"><Eyebrow accent={accent}>{eyebrow}</Eyebrow></div>
          <h1 className="display text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05]">{title}</h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">{lead}</p>
          {meta && <div className="mt-8">{meta}</div>}
        </div>
      </Container>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/* Icons used across pages                                             */
/* ------------------------------------------------------------------ */

export const Icon = {
  shield: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  alert: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  search: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  book: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  beaker: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  users: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  clipboard: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  external: (c = 'w-4 h-4') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  download: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  phone: (c = 'w-5 h-5') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};
