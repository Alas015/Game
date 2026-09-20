import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language, GameTranslations } from './types';
import { en } from './en';
import { az } from './az';
import { tr } from './tr';

const TRANSLATIONS: Record<Language, GameTranslations> = { en, az, tr };

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  T: GameTranslations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  T: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang, T: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
