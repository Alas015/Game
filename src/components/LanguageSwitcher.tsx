import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'az', label: 'AZ' },
  { code: 'tr', label: 'TR' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex gap-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2 py-0.5 text-xs font-cinzel border transition-colors ${
            lang === code
              ? 'border-amber-400 text-amber-300 bg-amber-900/40'
              : 'border-amber-800/50 text-amber-600 hover:text-amber-400 hover:border-amber-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
