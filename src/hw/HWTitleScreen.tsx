import { useState, useEffect } from 'react';

interface HWTitleScreenProps {
  onBegin: () => void;
  onExit: () => void;
}

export default function HWTitleScreen({ onBegin, onExit }: HWTitleScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2700),
      setTimeout(() => setPhase(4), 3700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#03090a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'IM Fell English', serif",
      }}
    >
      <style>{`
        @keyframes hwFogDrift {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.5; }
          50% { transform: translateX(3%) translateY(-2%); opacity: 0.8; }
        }
      `}</style>

      {/* Fog layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(90,173,126,0.08) 0%, transparent 65%)',
        animation: 'hwFogDrift 14s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(0,0,0,0.5) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, transparent 30%, #03090a 90%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 760, width: '100%' }}>

        {/* Classification header */}
        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 1s ease', marginBottom: '3rem' }}>
          <div style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'rgba(90,173,126,0.4)',
            marginBottom: '0.5rem',
          }}>
            OUTSIDER'S FIELD JOURNAL · CASE: ASHWICK HOLLOW
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(90,173,126,0.2))' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(90,173,126,0.4)' }} />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(90,173,126,0.2), transparent)' }} />
          </div>
        </div>

        {/* Village designation */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          marginBottom: '0.8rem',
        }}>
          <div style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            color: 'rgba(150,120,60,0.55)',
            textTransform: 'uppercase',
          }}>
            ASHWICK HOLLOW · AT THE EDGE OF THE WOOD
          </div>
        </div>

        {/* Main title */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
          marginBottom: '0.8rem',
        }}>
          <h1
            className="flicker"
            style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: 'clamp(2.6rem, 9vw, 6rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: '#cfe8d8',
              lineHeight: 0.95,
              textShadow: '0 0 40px rgba(90,173,126,0.5), 0 0 90px rgba(90,173,126,0.15)',
            }}
          >
            THE HOLLOW
          </h1>
          <h1
            style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: 'clamp(2.6rem, 9vw, 6rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              color: '#5aad7e',
              lineHeight: 0.95,
              textShadow: '0 0 40px rgba(90,173,126,0.6), 0 0 90px rgba(90,173,126,0.2)',
            }}
          >
            WOODS
          </h1>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: 'rgba(180,200,190,0.5)',
            fontStyle: 'italic',
          }}>
            Something old lives in the dark between the trees — and something newer hides behind it.
          </p>
        </div>

        {/* Briefing panel */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
          marginBottom: '2.5rem',
        }}>
          <div style={{
            background: 'rgba(6,14,10,0.85)',
            border: '1px solid rgba(90,173,126,0.18)',
            padding: '1.5rem 2rem',
            textAlign: 'left',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12,
              borderTop: '1px solid rgba(90,173,126,0.5)', borderLeft: '1px solid rgba(90,173,126,0.5)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12,
              borderTop: '1px solid rgba(90,173,126,0.5)', borderRight: '1px solid rgba(90,173,126,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12,
              borderBottom: '1px solid rgba(90,173,126,0.5)', borderLeft: '1px solid rgba(90,173,126,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12,
              borderBottom: '1px solid rgba(90,173,126,0.5)', borderRight: '1px solid rgba(90,173,126,0.5)' }} />

            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(90,173,126,0.55)', marginBottom: '0.8rem' }}>
              ▸ WHY YOU CAME
            </div>
            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.85, color: 'rgba(210,220,210,0.7)' }}>
              Nine days ago, Mara Thorne vanished from Ashwick Hollow — the latest name added to a list of disappearances
              the village calls "the Wood's due." Her aunt wrote to you in secret, certain the old story is hiding something newer.
            </p>
            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.85, color: 'rgba(210,220,210,0.7)', marginTop: '0.75rem' }}>
              Two days ago, the village's own Elder vanished too — the first person in forty years to break the silence.
              No one in Ashwick Hollow will ask what that means. You will have to.
            </p>
            <div style={{
              marginTop: '1rem',
              paddingTop: '0.8rem',
              borderTop: '1px solid rgba(90,173,126,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.5rem',
            }}>
              {[
                { label: 'MISSING', value: '2' },
                { label: "YEARS OF 'DUE'", value: '~200' },
                { label: 'VILLAGE TRUST', value: 'LOW' },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.45)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', color: '#8fd6ab', fontWeight: 700 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button
            onClick={onBegin}
            style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'rgba(90,173,126,0.08)',
              border: '1px solid #5aad7e',
              color: '#8fd6ab',
              padding: '0.75em 2.6em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textShadow: '0 0 12px rgba(90,173,126,0.5)',
              boxShadow: '0 0 20px rgba(90,173,126,0.1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(90,173,126,0.16)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(90,173,126,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(90,173,126,0.08)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(90,173,126,0.1)';
            }}
          >
            Enter the Hollow
          </button>
          <button
            onClick={onExit}
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              background: 'transparent',
              border: '1px solid rgba(180,200,190,0.2)',
              color: 'rgba(180,200,190,0.4)',
              padding: '0.75em 1.6em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,200,190,0.4)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(180,200,190,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,200,190,0.2)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(180,200,190,0.4)';
            }}
          >
            ← Archive
          </button>
        </div>
      </div>

      {/* Bottom status bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0.7rem 2rem',
        background: 'rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(90,173,126,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3,
      }}>
        <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(90,173,126,0.25)', letterSpacing: '0.15em' }}>
          Ashwick Hollow · Population 214 · The wood does not appear on any county map
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {['CHAPEL', 'THE ROOT', 'DEEP CUTS'].map((sys, i) => (
            <div key={sys} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: i === 1 ? '#c98a3a' : '#5aad7e',
                boxShadow: i === 1 ? '0 0 6px #c98a3a' : '0 0 6px #5aad7e',
                animation: i === 1 ? 'blink 2.5s ease-in-out infinite' : 'none',
              }} />
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.45rem', color: 'rgba(180,200,190,0.3)', letterSpacing: '0.12em' }}>
                {sys}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
