"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useLocale, Locale } from '@/hooks/useLocale';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ 
  children,
  locale: initialLocale
}: { 
  children: ReactNode;
  locale?: Locale 
}) {
  const localeState = useLocale(initialLocale);

  return (
    <LocaleContext.Provider value={localeState}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
} 