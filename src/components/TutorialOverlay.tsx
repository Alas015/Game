import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export type TutorialGame =
  | 'last-kingdom'
  | 'signal-lost'
  | 'hollow-woods'
  | 'code-of-shadows'
  | 'spy-ring'
  | 'trivia-throne';

type TutorialStep = {
  title: string;
  body: string;
};

type TutorialCopy = {
  title: string;
  intro: string;
  steps: TutorialStep[];
  skip: string;
  back: string;
  next: string;
  start: string;
  stepLabel: string;
};

const COPY: Record<TutorialGame, Record<'en' | 'az' | 'tr', TutorialCopy>> = {
  'last-kingdom': {
    en: {
      title: 'Your first investigation',
      intro: 'Learn the royal archive before you begin. Nothing on the map can be opened while this guide is here.',
      steps: [
        { title: 'Explore the kingdom', body: 'Choose a location on the map to investigate it. Visit places more than once as new evidence comes to light.' },
        { title: 'Question and examine', body: 'Speak with characters and inspect objects. Collect clues, then review them on the evidence board.' },
        { title: 'Connect the truth', body: 'Use the journal and evidence board to connect clues. When you are ready, make an accusation.' },
      ],
      skip: 'Skip tutorial',
      back: 'Back',
      next: 'Next',
      start: 'Begin investigation',
      stepLabel: 'Step',
    },
    az: {
      title: 'İlk araşdırmanız',
      intro: 'Başlamazdan əvvəl kral arxivini öyrənin. Bu bələdçi açıq olduğu müddətdə xəritədə heç nə açıla bilməz.',
      steps: [
        { title: 'Krallığı araşdırın', body: 'Araşdırmaq üçün xəritədə bir məkan seçin. Yeni sübutlar üzə çıxdıqca yerlərə yenidən qayıdın.' },
        { title: 'Sual verin və yoxlayın', body: 'Personajlarla danışın, əşyaları yoxlayın və ipuclarını sübut lövhəsində nəzərdən keçirin.' },
        { title: 'Həqiqəti birləşdirin', body: 'İpuclarını birləşdirmək üçün gündəlikdən və sübut lövhəsindən istifadə edin. Hazır olanda ittiham irəli sürün.' },
      ],
      skip: 'Bələdçini keç',
      back: 'Geri',
      next: 'Növbəti',
      start: 'Araşdırmaya başlayın',
      stepLabel: 'Addım',
    },
    tr: {
      title: 'İlk soruşturmanız',
      intro: 'Başlamadan önce kraliyet arşivini öğrenin. Bu rehber açıkken haritadaki hiçbir şey açılamaz.',
      steps: [
        { title: 'Krallığı keşfedin', body: 'İncelemek için haritadan bir konum seçin. Yeni kanıtlar ortaya çıktıkça yerlere tekrar dönün.' },
        { title: 'Sorgulayın ve inceleyin', body: 'Karakterlerle konuşun, nesneleri inceleyin ve ipuçlarını kanıt panosunda gözden geçirin.' },
        { title: 'Gerçeği birleştirin', body: 'İpuçlarını bağlamak için günlüğü ve kanıt panosunu kullanın. Hazır olduğunuzda suçlama yapın.' },
      ],
      skip: 'Rehberi geç',
      back: 'Geri',
      next: 'İleri',
      start: 'Soruşturmayı başlat',
      stepLabel: 'Adım',
    },
  },
  'signal-lost': {
    en: { title: 'Mission orientation', intro: 'The station is silent. This briefing explains how to investigate without triggering any systems.', steps: [
      { title: 'Board each room', body: 'Select a room on the station map. Search its objects and collect anything that could explain the disappearance.' },
      { title: 'Read the logs', body: 'Access crew logs, compare their accounts, and keep your findings in the journal.' },
      { title: 'File your report', body: 'Connect evidence on the board, then submit an incident report when your theory is ready.' },
    ], skip: 'Skip briefing', back: 'Back', next: 'Next', start: 'Board station', stepLabel: 'Step' },
    az: { title: 'Missiya təlimatı', intro: 'Stansiya susur. Bu brifinq heç bir sistemi işə salmadan necə araşdırma aparacağınızı izah edir.', steps: [
      { title: 'Otaqları araşdırın', body: 'Stansiya xəritəsində otaq seçin. Əşyaları axtarın və yoxa çıxmanı izah edə biləcək hər şeyi toplayın.' },
      { title: 'Jurnalları oxuyun', body: 'Ekipaj jurnallarına baxın, ifadələri müqayisə edin və nəticələrinizi gündəlikdə saxlayın.' },
      { title: 'Hesabat verin', body: 'Sübut lövhəsində əlaqələr qurun, sonra nəzəriyyəniz hazır olanda insident hesabatı göndərin.' },
    ], skip: 'Brifinqi keç', back: 'Geri', next: 'Növbəti', start: 'Stansiyaya daxil olun', stepLabel: 'Addım' },
    tr: { title: 'Görev oryantasyonu', intro: 'İstasyon sessiz. Bu brifing, sistemleri tetiklemeden nasıl araştırma yapacağınızı açıklar.', steps: [
      { title: 'Her odaya bakın', body: 'İstasyon haritasından bir oda seçin. Nesneleri arayın ve kaybolmayı açıklayabilecek her şeyi toplayın.' },
      { title: 'Kayıtları okuyun', body: 'Mürettebat kayıtlarına erişin, ifadeleri karşılaştırın ve bulgularınızı günlüğe kaydedin.' },
      { title: 'Raporunuzu gönderin', body: 'Kanıt panosunda bağlantılar kurun, teoriniz hazır olduğunda olay raporu gönderin.' },
    ], skip: 'Brifingi geç', back: 'Geri', next: 'İleri', start: 'İstasyona bin', stepLabel: 'Adım' },
  },
  'hollow-woods': {
    en: { title: 'A guide through the hollow', intro: 'The woods remember every step. Learn how to search safely before entering the fog.', steps: [
      { title: 'Follow the map', body: 'Choose a clearing to visit. Search the scene carefully and inspect anything that seems out of place.' },
      { title: 'Listen to testimony', body: 'Talk to villagers and compare what they say with the clues you find.' },
      { title: 'Make your finding', body: 'Link the evidence in your journal and submit a finding when the story becomes clear.' },
    ], skip: 'Skip guide', back: 'Back', next: 'Next', start: 'Enter the hollow', stepLabel: 'Step' },
    az: { title: 'Çuxur üçün bələdçi', intro: 'Meşə hər addımı xatırlayır. Dumanın içinə girməzdən əvvəl təhlükəsiz axtarışı öyrənin.', steps: [
      { title: 'Xəritəni izləyin', body: 'Ziyarət etmək üçün talanı seçin. Səhnəni diqqətlə axtarın və yersiz görünən hər şeyi yoxlayın.' },
      { title: 'Şəhadətlərə qulaq asın', body: 'Kəndlilərlə danışın və dediklərini tapdığınız ipucları ilə müqayisə edin.' },
      { title: 'Nəticə çıxarın', body: 'Sübutları gündəlikdə birləşdirin və hekayə aydınlaşanda nəticənizi göndərin.' },
    ], skip: 'Bələdçini keç', back: 'Geri', next: 'Növbəti', start: 'Çuxura daxil olun', stepLabel: 'Addım' },
    tr: { title: 'Çukur rehberi', intro: 'Orman her adımı hatırlar. Sise girmeden önce güvenli aramayı öğrenin.', steps: [
      { title: 'Haritayı izleyin', body: 'Ziyaret etmek için bir açıklık seçin. Sahneyi dikkatle arayın ve tuhaf görünen her şeyi inceleyin.' },
      { title: 'Tanıklıkları dinleyin', body: 'Köylülerle konuşun ve söylediklerini bulduğunuz ipuçlarıyla karşılaştırın.' },
      { title: 'Sonucunuzu çıkarın', body: 'Kanıtları günlüğünüzde bağlayın ve hikâye netleştiğinde sonucunuzu gönderin.' },
    ], skip: 'Rehberi geç', back: 'Geri', next: 'İleri', start: 'Çukura gir', stepLabel: 'Adım' },
  },
  'code-of-shadows': {
    en: { title: 'Heist protocol', intro: 'Decode the network, watch the shadows, and plan before you act.', steps: [
      { title: 'Read the signals', body: 'Inspect intercepted messages and highlight patterns in the code.' },
      { title: 'Build the network', body: 'Connect people, places, and clues to expose the route through the heist.' },
      { title: 'Make your move', body: 'Choose your accusation only after the evidence supports your theory.' },
    ], skip: 'Skip protocol', back: 'Back', next: 'Next', start: 'Enter the network', stepLabel: 'Step' },
    az: { title: 'Soyğun protokolu', intro: 'Şəbəkəni deşifrə edin, kölgələri izləyin və hərəkətdən əvvəl plan qurun.', steps: [
      { title: 'Siqnalları oxuyun', body: 'Tutulmuş mesajları yoxlayın və koddakı nümunələri işarələyin.' },
      { title: 'Şəbəkəni qurun', body: 'Soyğunun marşrutunu üzə çıxarmaq üçün insanları, yerləri və ipuclarını birləşdirin.' },
      { title: 'Addımınızı atın', body: 'Nəzəriyyənizi sübutlar dəstəkləyəndən sonra ittihamınızı seçin.' },
    ], skip: 'Protokolu keç', back: 'Geri', next: 'Növbəti', start: 'Şəbəkəyə daxil olun', stepLabel: 'Addım' },
    tr: { title: 'Soygun protokolü', intro: 'Ağı deşifre edin, gölgeleri izleyin ve harekete geçmeden önce plan yapın.', steps: [
      { title: 'Sinyalleri okuyun', body: 'Yakalanan mesajları inceleyin ve koddaki kalıpları işaretleyin.' },
      { title: 'Ağı kurun', body: 'Soygunun rotasını ortaya çıkarmak için kişileri, yerleri ve ipuçlarını bağlayın.' },
      { title: 'Hamlenizi yapın', body: 'Suçlamanızı ancak kanıtlar teorinizi destekledikten sonra seçin.' },
    ], skip: 'Protokolü geç', back: 'Geri', next: 'İleri', start: 'Ağa gir', stepLabel: 'Adım' },
  },
  'spy-ring': {
    en: { title: 'Tradecraft briefing', intro: 'Every detail matters. Learn the dossier before the drop.', steps: [
      { title: 'Decode communiqués', body: 'Read intercepted messages and identify the signals that link the ring.' },
      { title: 'Track suspects', body: 'Build a network from the dossier and compare each suspect’s movements.' },
      { title: 'Expose the double agent', body: 'Use the strongest links to identify the traitor before the ring dissolves.' },
    ], skip: 'Skip briefing', back: 'Back', next: 'Next', start: 'Open dossier', stepLabel: 'Step' },
    az: { title: 'Casus təlimatı', intro: 'Hər detal vacibdir. Görüşdən əvvəl dosyeni öyrənin.', steps: [
      { title: 'Kommunikeləri deşifrə edin', body: 'Tutulmuş mesajları oxuyun və şəbəkəni birləşdirən siqnalları tapın.' },
      { title: 'Şübhəliləri izləyin', body: 'Dosyedən şəbəkə qurun və hər şübhəlinin hərəkətlərini müqayisə edin.' },
      { title: 'İkili agenti üzə çıxarın', body: 'Şəbəkə dağılmamışdan əvvəl xaini müəyyən etmək üçün ən güclü əlaqələrdən istifadə edin.' },
    ], skip: 'Brifinqi keç', back: 'Geri', next: 'Növbəti', start: 'Dosyeni açın', stepLabel: 'Addım' },
    tr: { title: 'Casusluk brifingi', intro: 'Her ayrıntı önemlidir. Buluşmadan önce dosyayı öğrenin.', steps: [
      { title: 'Bildirimleri çözün', body: 'Yakalanan mesajları okuyun ve ağı birbirine bağlayan işaretleri bulun.' },
      { title: 'Şüphelileri izleyin', body: 'Dosyadan bir ağ kurun ve her şüphelinin hareketlerini karşılaştırın.' },
      { title: 'Çifte ajanı ortaya çıkarın', body: 'Ağ dağılmadan önce haini belirlemek için en güçlü bağlantıları kullanın.' },
    ], skip: 'Brifingi geç', back: 'Geri', next: 'İleri', start: 'Dosyayı aç', stepLabel: 'Adım' },
  },
  'trivia-throne': {
    en: { title: 'Claim the crown', intro: 'A quick orientation for the arena. No answers are scored until you dismiss this guide.', steps: [
      { title: 'Choose an arena', body: 'Select a knowledge category and read the question carefully before answering.' },
      { title: 'Play for points', body: 'Correct answers build your score. Use your turn wisely and watch the standings.' },
      { title: 'Rule the throne', body: 'Keep earning points across the arenas to finish ahead of every rival.' },
    ], skip: 'Skip orientation', back: 'Back', next: 'Next', start: 'Enter arena', stepLabel: 'Step' },
    az: { title: 'Tacınızı qazanın', intro: 'Arena üçün qısa təlimat. Bu bələdçini bağlamadan heç bir cavab hesablanmır.', steps: [
      { title: 'Arena seçin', body: 'Bilik kateqoriyası seçin və cavab verməzdən əvvəl sualı diqqətlə oxuyun.' },
      { title: 'Xal qazanın', body: 'Düzgün cavablar xalınızı artırır. Növbənizdən ağıllı istifadə edin və sıralamaya baxın.' },
      { title: 'Taxta hökm edin', body: 'Bütün rəqibləri qabaqlamaq üçün arenalarda xal toplamağa davam edin.' },
    ], skip: 'Təlimatı keç', back: 'Geri', next: 'Növbəti', start: 'Arenaya daxil olun', stepLabel: 'Addım' },
    tr: { title: 'Tacın sahibi olun', intro: 'Arena için kısa bir oryantasyon. Bu rehberi kapatana kadar hiçbir cevap puanlanmaz.', steps: [
      { title: 'Arena seçin', body: 'Bir bilgi kategorisi seçin ve cevaplamadan önce soruyu dikkatle okuyun.' },
      { title: 'Puan için oynayın', body: 'Doğru cevaplar puanınızı yükseltir. Sıranızı akıllıca kullanın ve sıralamayı izleyin.' },
      { title: 'Tahta hükmedin', body: 'Tüm rakiplerinizin önünde bitirmek için arenalarda puan toplamaya devam edin.' },
    ], skip: 'Oryantasyonu geç', back: 'Geri', next: 'İleri', start: 'Arenaya gir', stepLabel: 'Adım' },
  },
};

const ACCENTS: Record<TutorialGame, { color: string; background: string }> = {
  'last-kingdom': { color: '#c9a84c', background: '#120d05' },
  'signal-lost': { color: '#00d4ff', background: '#03101c' },
  'hollow-woods': { color: '#5aad7e', background: '#07130d' },
  'code-of-shadows': { color: '#ff006e', background: '#14000e' },
  'spy-ring': { color: '#d4af5a', background: '#0b0e1a' },
  'trivia-throne': { color: '#b06fff', background: '#10071d' },
};

interface TutorialOverlayProps {
  game: TutorialGame;
  onDismiss: () => void;
}

export default function TutorialOverlay({ game, onDismiss }: TutorialOverlayProps) {
  const { lang } = useLanguage();
  const copy = COPY[game][lang];
  const accent = ACCENTS[game];
  const [step, setStep] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  const isLastStep = step === copy.steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.78)' }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description"
        className="relative w-full max-w-xl overflow-hidden border shadow-2xl"
        style={{ background: accent.background, borderColor: `${accent.color}66`, color: '#f4efe6' }}
      >
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4" style={{ borderColor: `${accent.color}33` }}>
          <div>
            <div className="mb-1 text-[0.62rem] uppercase tracking-[0.25em]" style={{ color: `${accent.color}b3` }}>
              {copy.stepLabel} {step + 1} / {copy.steps.length}
            </div>
            <h2 id="tutorial-title" className="text-xl font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>
              {copy.title}
            </h2>
          </div>
          <LanguageSwitcher />
        </div>

        <div className="px-5 py-6 sm:px-8">
          <p id="tutorial-description" className="mb-6 text-sm leading-7 opacity-75">{copy.intro}</p>
          <div className="mb-6 flex gap-2" aria-label={`${copy.stepLabel} ${step + 1} of ${copy.steps.length}`}>
            {copy.steps.map((item, index) => (
              <span key={item.title} className="h-1.5 flex-1 rounded-full" style={{ background: index <= step ? accent.color : `${accent.color}2e` }} />
            ))}
          </div>
          <div className="min-h-36 border-l-2 pl-5" style={{ borderColor: accent.color }}>
            <h3 className="mb-2 text-lg font-semibold">{copy.steps[step].title}</h3>
            <p className="text-sm leading-7 opacity-80">{copy.steps[step].body}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4 sm:px-8" style={{ borderColor: `${accent.color}33` }}>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onDismiss}
            className="rounded px-2 py-2 text-xs underline-offset-4 opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: accent.color }}
          >
            {copy.skip}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(current => Math.max(0, current - 1))}
              disabled={step === 0}
              className="border px-4 py-2 text-sm transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderColor: `${accent.color}66`, color: accent.color, outlineColor: accent.color }}
            >
              {copy.back}
            </button>
            <button
              type="button"
              onClick={() => isLastStep ? onDismiss() : setStep(current => current + 1)}
              className="border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: accent.color, borderColor: accent.color, color: '#080706', outlineColor: accent.color }}
            >
              {isLastStep ? copy.start : copy.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
