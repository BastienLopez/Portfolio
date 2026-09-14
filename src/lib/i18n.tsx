/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'fr' | 'en';
export type PageId = 'home' | 'freelance' | 'legal' | 'notFound';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isEnglish: boolean;
};

const STORAGE_KEY = 'portfolio-language';
const LanguageContext = createContext<LanguageContextValue | null>(null);

const readStoredLocale = (): Locale => {
  if (typeof window === 'undefined') return 'fr';

  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr';
  } catch {
    return 'fr';
  }
};

const persistLocale = (locale: Locale) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
};

const getInitialLocale = (): Locale => {
  return readStoredLocale();
};

export const SITE_ORIGIN = 'https://bastienlopez.fr';

export type PageMetadata = {
  title: string;
  description: string;
  path: string;
  robots: string;
};

const PAGE_METADATA: Record<PageId, Record<Locale, PageMetadata>> = {
  home: {
    fr: {
      title: 'Bastien Lopez — Développeur Full-Stack IA & Automatisation',
      description: 'Sites internet, applications métier, APIs internes et automatisations IA/n8n par Bastien Lopez. Disponible pour CDI remote ou missions freelance.',
      path: '/',
      robots: 'index, follow',
    },
    en: {
      title: 'Bastien Lopez — Full-Stack AI & Automation Developer',
      description: 'Websites, business applications, internal APIs and AI/n8n automations by Bastien Lopez. Available for remote roles and freelance projects.',
      path: '/',
      robots: 'index, follow',
    },
  },
  freelance: {
    fr: {
      title: 'Freelance — Développement web, IA et automatisation | Bastien Lopez',
      description: 'Sites internet, applications métier, APIs internes, workflows IA et automatisations n8n pour des missions freelance ciblées.',
      path: '/freelance',
      robots: 'index, follow',
    },
    en: {
      title: 'Freelance — Web development, AI and automation | Bastien Lopez',
      description: 'Websites, business applications, internal APIs, AI workflows and n8n automation for focused freelance engagements.',
      path: '/freelance',
      robots: 'index, follow',
    },
  },
  legal: {
    fr: {
      title: 'Mentions légales — Bastien Lopez',
      description: 'Informations légales, hébergement et mesure d’audience du portfolio de Bastien Lopez.',
      path: '/mentions-legales',
      robots: 'index, follow',
    },
    en: {
      title: 'Legal notice — Bastien Lopez',
      description: 'Legal, hosting and audience measurement information for Bastien Lopez’s portfolio.',
      path: '/mentions-legales',
      robots: 'index, follow',
    },
  },
  notFound: {
    fr: {
      title: 'Page introuvable — Bastien Lopez',
      description: 'La page demandée n’existe pas dans le portfolio de Bastien Lopez.',
      path: '/',
      robots: 'noindex, follow',
    },
    en: {
      title: 'Page not found — Bastien Lopez',
      description: 'The requested page does not exist in Bastien Lopez’s portfolio.',
      path: '/',
      robots: 'noindex, follow',
    },
  },
};

const setMetaContent = (selector: string, content: string) => {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

const setLinkHref = (selector: string, href: string) => {
  document.head.querySelector<HTMLLinkElement>(selector)?.setAttribute('href', href);
};

const toCanonicalUrl = (path: string) => SITE_ORIGIN + (path === '/' ? '/' : path);

const applyPageMetadata = (metadata: PageMetadata, locale: Locale) => {
  const canonicalUrl = toCanonicalUrl(metadata.path);

  document.documentElement.lang = locale;
  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[name="robots"]', metadata.robots);
  setMetaContent('meta[property="og:title"]', metadata.title);
  setMetaContent('meta[property="og:description"]', metadata.description);
  setMetaContent('meta[property="og:locale"]', locale === 'en' ? 'en_US' : 'fr_FR');
  setMetaContent('meta[property="og:locale:alternate"]', locale === 'en' ? 'fr_FR' : 'en_US');
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[name="twitter:title"]', metadata.title);
  setMetaContent('meta[name="twitter:description"]', metadata.description);
  setMetaContent('meta[name="twitter:url"]', canonicalUrl);
  setLinkHref('link[rel="canonical"]', canonicalUrl);
  setLinkHref('link[rel="alternate"][hreflang="fr-FR"]', toCanonicalUrl(metadata.path));
  setLinkHref('link[rel="alternate"][hreflang="en-US"]', toCanonicalUrl(metadata.path));
  setLinkHref('link[rel="alternate"][hreflang="x-default"]', toCanonicalUrl(metadata.path));
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    persistLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, isEnglish: locale === 'en' }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function usePageMetadata(page: PageId) {
  const { locale } = useLanguage();

  useEffect(() => {
    applyPageMetadata(PAGE_METADATA[page][locale], locale);
  }, [locale, page]);
}

/** Apply metadata for a route whose title and description come from page data. */
export function useRouteMetadata(metadataByLocale: Record<Locale, PageMetadata>) {
  const { locale } = useLanguage();

  useEffect(() => {
    applyPageMetadata(metadataByLocale[locale], locale);
  }, [locale, metadataByLocale]);
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
