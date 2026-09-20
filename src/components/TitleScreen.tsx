import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface TitleScreenProps {
  onBegin: () => void;
}

export default function TitleScreen({ onBegin }: TitleScreenProps) {
  const [phase, setPhase] = useState(0);
  const { T } = useLanguage();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    const t4 = setTimeout(() => setPhase(4), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a1208 0%, #080604 60%, #050302 100%)' }}
    >
      {/* Language switcher top-right */}
      <div className="absolute top-4 right-4 z-30">
        <LanguageSwitcher />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(180,100,20,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.15) 60px),
                          repeating-linear-gradient(90deg, transparent, transparent 89px, rgba(201,168,76,0.08) 90px)`,
      }}/>

      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #8a6c28, #c9a84c, #8a6c28, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #8a6c28, #c9a84c, #8a6c28, transparent)' }}
      />

      {[
        { style: { top: 16, left: 16 } },
        { style: { top: 16, right: 16 } },
        { style: { bottom: 16, left: 16 } },
        { style: { bottom: 16, right: 16 } },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ ...c.style, color: '#5a4010', fontSize: 40, lineHeight: 1 }}
        >
          ✦
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl mx-auto">

        {phase >= 1 && (
          <div
            className="mb-6 text-5xl flicker"
            style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0s forwards', color: '#5a4010' }}
          >
            🦅
          </div>
        )}

        {phase >= 1 && (
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.35em',
              color: '#8a6c28',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              opacity: 0,
              animation: 'fadeIn 0.8s ease 0.1s forwards',
            }}
          >
            {T.ui.annoDomini}
          </div>
        )}

        {phase >= 2 && (
          <div style={{ opacity: 0, animation: 'slideUp 0.9s ease 0s forwards' }}>
            <h1
              className="gold-shimmer"
              style={{
                fontFamily: 'Cinzel Decorative, serif',
                fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
              }}
            >
              {T.ui.titleSub1}
            </h1>
            <h1
              className="gold-shimmer"
              style={{
                fontFamily: 'Cinzel Decorative, serif',
                fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '0.05em',
              }}
            >
              {T.ui.titleSub2}
            </h1>
          </div>
        )}

        {phase >= 2 && (
          <div
            className="flex items-center gap-4 mb-8"
            style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.2s forwards', width: '100%', maxWidth: 480 }}
          >
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #8a6c28)' }} />
            <div style={{ color: '#8a6c28', fontSize: '1.2rem' }}>⚜</div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8a6c28, transparent)' }} />
          </div>
        )}

        {phase >= 3 && (
          <div style={{ opacity: 0, animation: 'fadeIn 0.9s ease 0s forwards' }}>
            <p
              style={{
                fontFamily: 'IM Fell English, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: '#c9906a',
                letterSpacing: '0.04em',
                marginBottom: '0.5rem',
              }}
            >
              {T.ui.tagline1}
            </p>
            <p
              style={{
                fontFamily: 'IM Fell English, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: '#c9906a',
                letterSpacing: '0.04em',
                marginBottom: '2.5rem',
              }}
            >
              {T.ui.tagline2}
            </p>
          </div>
        )}

        {phase >= 3 && (
          <div
            style={{
              opacity: 0,
              animation: 'fadeIn 0.8s ease 0.3s forwards',
              fontFamily: 'Lora, serif',
              fontSize: '0.9rem',
              color: '#7a5c38',
              lineHeight: 1.8,
              maxWidth: 420,
              marginBottom: '3rem',
              padding: '1.2rem 1.8rem',
              border: '1px solid #3a2c10',
              background: 'rgba(10,8,4,0.6)',
            }}
          >
            {T.ui.flavorIntro}
            <br/><br/>
            <span style={{ color: '#a07840', fontStyle: 'italic' }}>
              {T.ui.flavorRole}
            </span>
          </div>
        )}

        {phase >= 4 && (
          <div style={{ opacity: 0, animation: 'slideUp 0.7s ease 0s forwards' }}>
            <button
              className="medieval-btn pulse-gold"
              onClick={onBegin}
              style={{ fontSize: '1rem', padding: '0.9em 3em', letterSpacing: '0.2em' }}
            >
              {T.ui.beginBtn}
            </button>

            <div
              style={{
                marginTop: '1.5rem',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#4a3818',
                textTransform: 'uppercase',
              }}
            >
              {T.ui.royalMystery}
            </div>
          </div>
        )}
      </div>

      <div className="vignette" />
    </div>
  );
}
