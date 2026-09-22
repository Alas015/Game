import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface SLTitleScreenProps {
  onBegin: () => void;
  onExit: () => void;
}

export default function SLTitleScreen({ onBegin, onExit }: SLTitleScreenProps) {
  const [phase, setPhase] = useState(0);
  const { lang } = useLanguage();
  const copy = {
    en: { station: 'RESEARCH STATION HELIOS-9', briefing: 'MISSION BRIEFING', begin: 'BOARD STATION', archive: '← ARCHIVE' },
    az: { station: 'HELİOS-9 TƏDQİQAT STANSİYASI', briefing: 'MİSSİYA BRİFİNQİ', begin: 'STANSIYAYA DAXİL OL', archive: '← ARXİV' },
    tr: { station: 'ARAŞTIRMA İSTASYONU HELIOS-9', briefing: 'GÖREV BRİFİNGİ', begin: 'İSTASYONA GİR', archive: '← ARŞİV' },
  }[lang];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#03070e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Space Mono, monospace',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,30,60,0.8) 0%, #03070e 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 760, width: '100%' }}>

        {/* Fleet classification header */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.8s ease',
            marginBottom: '3rem',
          }}
        >
          <div style={{
            fontSize: '0.55rem',
            letterSpacing: '0.35em',
            color: 'rgba(0,212,255,0.35)',
            marginBottom: '0.5rem',
          }}>
            FLEET INVESTIGATOR DIVISION · INCIDENT FILE #HX-9-0061
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center',
          }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2))' }} />
            <div style={{
              width: 6, height: 6,
              border: '1px solid rgba(0,212,255,0.4)',
              transform: 'rotate(45deg)',
            }} />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)' }} />
          </div>
        </div>

        {/* Station designation */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            marginBottom: '0.8rem',
          }}
        >
          <div style={{
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            color: 'rgba(255,59,59,0.7)',
            textTransform: 'uppercase',
          }}>
            {copy.station}
          </div>
        </div>

        {/* Main title — glitch effect */}
        <div
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            marginBottom: '0.8rem',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              color: '#ffffff',
              lineHeight: 0.9,
              textShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.2)',
              animation: 'glitchShift 8s ease-in-out infinite',
            }}
          >
            SIGNAL
          </h1>
          <h1
            style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              color: '#00d4ff',
              lineHeight: 0.9,
              textShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.3)',
            }}
          >
            LOST
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            marginBottom: '3rem',
          }}
        >
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'rgba(138,184,208,0.55)',
            fontStyle: 'italic',
          }}>
            Contact severed · Six days silent · Crew unaccounted
          </p>
        </div>

        {/* Briefing panel */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{
            background: 'rgba(5,15,30,0.9)',
            border: '1px solid rgba(0,212,255,0.15)',
            padding: '1.5rem 2rem',
            textAlign: 'left',
            position: 'relative',
          }}>
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12,
              borderTop: '1px solid rgba(0,212,255,0.5)', borderLeft: '1px solid rgba(0,212,255,0.5)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12,
              borderTop: '1px solid rgba(0,212,255,0.5)', borderRight: '1px solid rgba(0,212,255,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12,
              borderBottom: '1px solid rgba(0,212,255,0.5)', borderLeft: '1px solid rgba(0,212,255,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12,
              borderBottom: '1px solid rgba(0,212,255,0.5)', borderRight: '1px solid rgba(0,212,255,0.5)' }} />

            <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: 'rgba(0,212,255,0.5)', marginBottom: '0.8rem' }}>
              ▸ {copy.briefing}
            </div>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.85, color: 'rgba(138,184,208,0.7)' }}>
              You are a Fleet investigator. Helios-9 — a deep-space research station operated by Helix Corporation —
              went silent six days ago. No distress signal. No crew transmission. Emergency beacon only.
            </p>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.85, color: 'rgba(138,184,208,0.7)', marginTop: '0.75rem' }}>
              You are the first responder. Your orders: board the station, determine what happened to the crew of six,
              and file an incident report for Fleet Command. The station AI — ARIA — is still active.
            </p>
            <div style={{
              marginTop: '1rem',
              paddingTop: '0.8rem',
              borderTop: '1px solid rgba(0,212,255,0.08)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.5rem',
            }}>
              {[
                { label: 'CREW MISSING', value: '4 of 6' },
                { label: 'DAYS SILENT', value: '6' },
                { label: 'AI STATUS', value: 'ACTIVE' },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.2em', marginBottom: '0.25rem' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={onBegin}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              padding: '0.9em 2.8em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textShadow: '0 0 12px rgba(0,212,255,0.5)',
              boxShadow: '0 0 20px rgba(0,212,255,0.1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.15)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
            }}
          >
            ▸ {copy.begin}
          </button>
          <button
            onClick={onExit}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: 'transparent',
              border: '1px solid rgba(138,184,208,0.2)',
              color: 'rgba(138,184,208,0.4)',
              padding: '0.9em 1.8em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,184,208,0.4)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(138,184,208,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,184,208,0.2)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(138,184,208,0.4)';
            }}
          >
            {copy.archive}
          </button>
        </div>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 4 }}>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Bottom status bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0.7rem 2rem',
        background: 'rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(0,212,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3,
      }}>
        <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.25)', letterSpacing: '0.2em' }}>
          FLEET CMD · DEEP SPACE OPS · SECTOR 7
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {['LIFE SUPPORT', 'POWER', 'AIRLOCK'].map((sys, i) => (
            <div key={sys} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: 5, height: 5,
                borderRadius: '50%',
                background: i === 2 ? '#ff3b3b' : '#00d4ff',
                boxShadow: i === 2 ? '0 0 6px #ff3b3b' : '0 0 6px #00d4ff',
                animation: i === 2 ? 'blink 1.5s ease-in-out infinite' : 'none',
              }} />
              <span style={{ fontSize: '0.45rem', color: 'rgba(138,184,208,0.3)', letterSpacing: '0.15em' }}>
                {sys}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
