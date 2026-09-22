import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import type { TutorialGame } from './TutorialOverlay';

type MiniGameProps = {
  game: TutorialGame;
  onExit: () => void;
};

const COPY = {
  en: {
    'code-of-shadows': { title: 'CODE OF SHADOWS', intro: 'Break the corporate firewall before the trace closes.', action: 'Decrypt signal', progress: 'Network access', success: 'Access granted. The next node is waiting.' },
    'spy-ring': { title: 'THE SPY RING', intro: 'Decode the drop and identify the double agent.', action: 'Decode communiqué', progress: 'Dossier confidence', success: 'The cipher breaks. You have a name.' },
    'trivia-throne': { title: 'TRIVIA THRONE', intro: 'Answer the arena question and claim the first crown point.', action: 'Answer question', progress: 'Crown points', success: 'Correct. The throne recognizes your knowledge.' },
  },
  az: {
    'code-of-shadows': { title: 'KÖLGƏLƏR KODU', intro: 'İz bağlanmazdan əvvəl korporativ təhlükəsizliyi keçin.', action: 'Siqnalı deşifrə et', progress: 'Şəbəkəyə giriş', success: 'Giriş təsdiqləndi. Növbəti düyün gözləyir.' },
    'spy-ring': { title: 'CASUS ŞƏBƏKƏSİ', intro: 'Mesajı deşifrə edin və ikili agenti tapın.', action: 'Kommunikeni deşifrə et', progress: 'Dosye əminliyi', success: 'Şifrə açıldı. İndi adı bilirsiniz.' },
    'trivia-throne': { title: 'TRİVİA TAHTI', intro: 'Arena sualını cavablandırın və ilk tac xalını qazanın.', action: 'Suala cavab ver', progress: 'Tac xalları', success: 'Doğrudur. Taxt biliyinizi tanıyır.' },
  },
  tr: {
    'code-of-shadows': { title: 'GÖLGE KODU', intro: 'İz kapanmadan şirket güvenlik duvarını aşın.', action: 'Sinyali çöz', progress: 'Ağ erişimi', success: 'Erişim verildi. Sonraki düğüm sizi bekliyor.' },
    'spy-ring': { title: 'CASUS HALKASI', intro: 'Mesajı çözün ve çifte ajanı bulun.', action: 'Bildirimleri çöz', progress: 'Dosya güveni', success: 'Şifre kırıldı. Artık bir adınız var.' },
    'trivia-throne': { title: 'TRİVİA TAHTI', intro: 'Arena sorusunu yanıtlayın ve ilk taht puanını kazanın.', action: 'Soruyu yanıtla', progress: 'Taht puanları', success: 'Doğru. Taht bilginizi tanıyor.' },
  },
} as const;

export default function ArchiveMiniGame({ game, onExit }: MiniGameProps) {
  const { lang } = useLanguage();
  const copy = COPY[lang][game as keyof typeof COPY[typeof lang]];
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <main className="min-h-screen bg-[#06040b] px-6 py-10 text-[#f4efe6]">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col justify-center border border-white/15 bg-black/25 p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">Archive // {game}</span>
          <LanguageSwitcher />
        </div>
        <h1 className="mb-4 text-4xl font-semibold tracking-[0.08em]">{copy.title}</h1>
        <p className="mb-10 max-w-xl text-lg leading-8 text-white/70">{copy.intro}</p>
        {!started ? (
          <button type="button" onClick={() => setStarted(true)} className="w-fit border border-fuchsia-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300 hover:bg-fuchsia-400/15">
            {copy.action}
          </button>
        ) : (
          <>
            <div className="mb-3 flex justify-between text-xs uppercase tracking-[0.2em] text-white/50">
              <span>{copy.progress}</span><span>{progress}/3</span>
            </div>
            <div className="mb-8 h-2 bg-white/10"><div className="h-full bg-fuchsia-400 transition-all" style={{ width: `${(progress / 3) * 100}%` }} /></div>
            {progress < 3 ? (
              <button type="button" onClick={() => setProgress(value => value + 1)} className="w-fit border border-fuchsia-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300 hover:bg-fuchsia-400/15">
                {copy.action}
              </button>
            ) : <p className="border-l-2 border-fuchsia-400 pl-4 text-fuchsia-200">{copy.success}</p>}
          </>
        )}
        <button type="button" onClick={onExit} className="mt-10 w-fit text-sm text-white/45 underline underline-offset-4 hover:text-white">
          ← {lang === 'az' ? 'Arxivə qayıt' : lang === 'tr' ? 'Arşive dön' : 'Return to archive'}
        </button>
      </div>
    </main>
  );
}
