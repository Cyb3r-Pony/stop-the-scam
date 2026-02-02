
export type Lang = 'bg' | 'en';

export interface ContentStrings {
  header: {
    title: string;
    subtitle: string;
    ctaList: string;
    ctaRegisters: string;
  };
  hero: {
    title: string;
    description: string;
  };
  alert: {
    title: string;
    description: string;
  };
  warningSigns: {
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  schemes: {
    title: string;
    items: Array<{ title: string; desc: string; type: 'crypto' | 'stock' | 'recovery' }>;
  };
  technical: {
    title: string;
    broker: { title: string; items: string[] };
    platform: { title: string; items: string[] };
  };
  protection: {
    title: string;
    steps: Array<{ title: string; desc: string; highlight?: string }>;
  };
  registers: {
    title: string;
    sections: Array<{
      region: string;
      items: Array<{ name: string; desc: string; link: string; linkText: string }>;
    }>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  domains: {
    title: string;
    notice: string;
    placeholder: string;
    showing: string;
    of: string;
  };
  victim: {
    title: string;
    steps: string[];
    emergencyNote: string;
  };
  footer: {
    legal: string;
    disclaimer: string;
  };
}