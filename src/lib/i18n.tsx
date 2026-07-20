/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'fr' | 'en';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isEnglish: boolean;
};

const STORAGE_KEY = 'portfolio-language';
const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'fr';

  return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;

    const metadata = locale === 'en'
      ? {
          title: 'Bastien Lopez — Full-Stack AI & Automation Developer',
          description: 'Full-stack developer specialising in business applications, AI and n8n automation. Available for remote/full-remote roles and freelance projects.',
          locale: 'en_US',
        }
      : {
          title: 'Bastien Lopez — Développeur Full-Stack IA & Automatisation',
          description: 'Développeur Full-Stack spécialisé en applications métier, IA et automatisation n8n. Disponible pour CDI remote/full remote et missions freelance.',
          locale: 'fr_FR',
        };

    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', metadata.locale);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, isEnglish: locale === 'en' }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
