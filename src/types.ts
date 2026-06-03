export type LanguageCode = 'RU' | 'UA' | 'EN' | 'HI' | 'UR' | 'AR';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StepItem {
  step: string;
  title: string;
  desc: string;
}

export interface TranslationData {
  dir: 'ltr' | 'rtl';
  langName: string;
  header: {
    logo: string;
    tagline: string;
    contactBtn: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaBtn: string;
    ctaSubtext: string;
    metrics: {
      housing: string;
      housingLabel: string;
      finances: string;
      financesLabel: string;
      success: string;
      successLabel: string;
    };
  };
  package: {
    sectionTitle: string;
    sectionSubtitle: string;
    badge: string;
    title: string;
    price: string;
    priceSub: string;
    featuresTitle: string;
    features: string[];
    howItWorksTitle: string;
    howItWorks: StepItem[];
    ctaBtn: string;
    ctaSub: string;
  };
  trust: {
    guaranteeTitle: string;
    guaranteeDesc: string;
    securePayment: string;
    verifiedLabel: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  footer: {
    logo: string;
    desc: string;
    contactUs: string;
    telegramUsername: string;
    rights: string;
    warning: string;
  };
}
