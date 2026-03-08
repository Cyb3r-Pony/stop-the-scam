
export type Lang = 'bg' | 'en' | 'de';

export interface PhishingDomain {
  domain: string;
  detectedAt: string;
}

export interface ContentStrings {
  header: {
    title: string;
  };
  hero: {
    title: string;
    description: string;
  };
  statistics: {
    title: string;
    subtitle: string;
    items: Array<{ value: string; label: string }>;

  };
  scamLifecycle: {
    title: string;
    subtitle: string;
    steps: Array<{ label: string; desc: string }>;
  };
  stopChallengeProtect: {
    title: string;
    subtitle: string;
    items: Array<{ keyword: string; desc: string }>;
    source: string;
  };
  alert: {
    title: string;
    description: string;
  };
  warningSigns: {
    title: string;
    items: Array<{ title: string; desc: string }>;
    campaignLink?: {
      text: string;
      url: string;
      linkText: string;
    };
  };
  scamTypes: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string; example: string }>;
  };
  technical: {
    title: string;
    broker: { title: string; items: string[] };
    platform: { title: string; items: string[] };
  };
  protection: {
    title: string;
    steps: Array<{ title: string; desc: string }>;
  };
  registers: {
    title: string;
    sections: Array<{
      region: string;
      items: Array<{ name: string; desc: string; link: string; linkText: string }>;
    }>;
  };
  domains: {
    title: string;
    placeholder: string;
  };
  victim: {
    title: string;
    steps: string[];
    emergencyNote: string;
  };
  footer: {
    disclaimer: string;
    officialLinks: Array<{ name: string; url: string }>;
  };
  phishing: {
    title: string;
    description: string;
    placeholder: string;
    detectionDate: string;
    source: string;
    noResults: string;
    entries: string;
  };
}