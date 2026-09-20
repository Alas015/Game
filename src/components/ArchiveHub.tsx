import { useState, useRef, useMemo, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface ArchiveHubProps {
  onPlayLastKingdom: () => void;
  onPlaySignalLost: () => void;
  onPlayHollowWoods: () => void;
}

// ── Star field data ──────────────────────────────────────────────────────────

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  layer: number; // 0=near, 1=mid, 2=far
}

function useStars(count: number): Star[] {
  return useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    };
    const rand = rng(42);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.8 + 0.3,
      delay: rand() * 8,
      duration: rand() * 4 + 3,
      layer: Math.floor(rand() * 3),
    }));
  }, [count]);
}

// ── Portal configuration ─────────────────────────────────────────────────────

interface Portal {
  id: string;
  title: string;
  tagline: string;
  description: string;
  label: string;
  players: string;
  accent: string;
  glow: string;
  bg: string;
  borderColor: string;
  titleFont: string;
  status: 'available' | 'coming-soon';
  href: string;
  icon: string;
  genre: string;
  number: string;
}

const PORTALS: Portal[] = [
  {
    id: 'last-kingdom',
    title: 'THE LAST KINGDOM',
    tagline: 'A king has vanished. Six suspects. Countless lies.',
    description: 'A fully interactive mystery investigation set in a medieval realm. Interrogate suspects, gather evidence across eight locations, and name the guilty before the truth is buried with the crown.',
    label: 'Solo Investigation',
    players: '1 Player',
    accent: '#c9a84c',
    glow: 'rgba(201, 168, 76, 0.22)',
    bg: '#0c0900',
    borderColor: 'rgba(201, 168, 76, 0.35)',
    titleFont: "'Cinzel Decorative', serif",
    status: 'available',
    href: '#',
    icon: '⚔',
    genre: 'Mystery · Medieval',
    number: 'I',
  },
  {
    id: 'signal-lost',
    title: 'SIGNAL LOST',
    tagline: 'Contact severed. Crew missing. System critical.',
    description: 'A cold, tense survival thriller aboard an abandoned deep-space research station. Decrypt crew logs, restore failing systems, and escape before the station\'s dormant AI finishes its final protocol.',
    label: 'Solo Survival',
    players: '1 Player',
    accent: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.2)',
    bg: '#020c16',
    borderColor: 'rgba(0, 212, 255, 0.25)',
    titleFont: "'Space Mono', monospace",
    status: 'available',
    href: '/games/signal-lost',
    icon: '⬡',
    genre: 'Sci-Fi · Thriller',
    number: 'II',
  },
  {
    id: 'hollow-woods',
    title: 'THE HOLLOW WOODS',
    tagline: 'Something old lives in the dark between the trees.',
    description: 'A slow-burn horror investigation set in a dying forest village where people vanish without trace. Search the woods, decode the folklore, and survive what you find in the hollow.',
    label: 'Solo Horror',
    players: '1 Player',
    accent: '#5aad7e',
    glow: 'rgba(90, 173, 126, 0.18)',
    bg: '#03090a',
    borderColor: 'rgba(90, 173, 126, 0.22)',
    titleFont: "'IM Fell English', serif",
    status: 'available',
    href: '/games/hollow-woods',
    icon: '✦',
    genre: 'Horror · Folk',
    number: 'III',
  },
  {
    id: 'code-of-shadows',
    title: 'CODE OF SHADOWS',
    tagline: 'Every system has a back door. Find it. Use it. Vanish.',
    description: 'A neon-noir cyberpunk heist. Navigate encrypted networks, bypass corporate security, and extract the data before the trace closes in. One wrong move and the shadows swallow you whole.',
    label: 'Solo Heist',
    players: '1 Player',
    accent: '#ff006e',
    glow: 'rgba(255, 0, 110, 0.2)',
    bg: '#08000e',
    borderColor: 'rgba(255, 0, 110, 0.25)',
    titleFont: "'Space Mono', monospace",
    status: 'coming-soon',
    href: '/games/code-of-shadows',
    icon: '◈',
    genre: 'Cyberpunk · Heist',
    number: 'IV',
  },
  {
    id: 'spy-ring',
    title: 'THE SPY RING',
    tagline: 'Trust no one. The mole is closer than you think.',
    description: 'An espionage dossier puzzle set during the Cold War. Decode intercepted communiqués, build your suspect network, and expose the double agent before the drop is made and the ring dissolves.',
    label: 'Solo Espionage',
    players: '1 Player',
    accent: '#d4af5a',
    glow: 'rgba(212, 175, 90, 0.18)',
    bg: '#020814',
    borderColor: 'rgba(212, 175, 90, 0.28)',
    titleFont: "'Cinzel', serif",
    status: 'coming-soon',
    href: '/games/spy-ring',
    icon: '◉',
    genre: 'Espionage · Puzzle',
    number: 'V',
  },
  {
    id: 'trivia-throne',
    title: 'TRIVIA THRONE',
    tagline: 'Only the wisest ruler survives the final round.',
    description: 'A lavish, competitive trivia experience for 3–5 players. Battle across six knowledge arenas — history, science, culture, and beyond — to claim the crown before your rivals do.',
    label: 'Multiplayer',
    players: '3–5 Players',
    accent: '#b06fff',
    glow: 'rgba(176, 111, 255, 0.22)',
    bg: '#09021a',
    borderColor: 'rgba(176, 111, 255, 0.3)',
    titleFont: "'Cinzel Decorative', serif",
    status: 'coming-soon',
    href: '/games/trivia-throne',
    icon: '♛',
    genre: 'Trivia · Party',
    number: 'VI',
  },
];

// ── Star Field ───────────────────────────────────────────────────────────────

function StarField({ stars }: { stars: Star[] }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.layer === 0
              ? `rgba(${220 + Math.floor(star.x * 0.3)}, ${210 + Math.floor(star.y * 0.2)}, 255, 0.9)`
              : star.layer === 1
              ? 'rgba(200, 220, 255, 0.7)'
              : 'rgba(180, 200, 240, 0.5)',
            animation: `${star.layer === 2 ? 'twinkleSlow' : 'twinkle'} ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Nebula Background ────────────────────────────────────────────────────────

function NebulaBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep field */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #05080f 0%, #03050a 60%, #020308 100%)',
      }} />
      {/* Purple nebula — top left */}
      <div style={{
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: '-5%',
        left: '-5%',
        background: 'radial-gradient(ellipse at center, rgba(60,20,100,0.18) 0%, transparent 70%)',
        animation: 'nebulaDrift 22s ease-in-out infinite',
      }} />
      {/* Blue nebula — top right */}
      <div style={{
        position: 'absolute',
        width: '60%',
        height: '60%',
        top: '-10%',
        right: '-10%',
        background: 'radial-gradient(ellipse at center, rgba(15,45,90,0.2) 0%, transparent 70%)',
        animation: 'nebulaDrift 18s ease-in-out 3s infinite',
      }} />
      {/* Gold nebula — center */}
      <div style={{
        position: 'absolute',
        width: '40%',
        height: '30%',
        top: '20%',
        left: '30%',
        background: 'radial-gradient(ellipse at center, rgba(100,70,20,0.08) 0%, transparent 70%)',
        animation: 'nebulaDrift 28s ease-in-out 6s infinite',
      }} />
      {/* Cyan nebula — bottom left */}
      <div style={{
        position: 'absolute',
        width: '40%',
        height: '50%',
        bottom: '-10%',
        left: '10%',
        background: 'radial-gradient(ellipse at center, rgba(0,60,80,0.12) 0%, transparent 70%)',
        animation: 'nebulaDrift 25s ease-in-out 10s infinite',
      }} />
    </div>
  );
}

// ── Portal Card ──────────────────────────────────────────────────────────────

function PortalCard({
  portal,
  onPlay,
}: {
  portal: Portal;
  onPlay?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const isAvailable = portal.status === 'available';

  // Per-portal inner texture / decoration elements
  const InnerDecoration = () => {
    if (portal.id === 'last-kingdom') {
      return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(201,168,76,0.025) 18px, rgba(201,168,76,0.025) 19px),
              repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(201,168,76,0.02) 18px, rgba(201,168,76,0.02) 19px)
            `,
          }} />
          {/* Corner ornaments */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              top: pos.startsWith('t') ? 10 : 'auto',
              bottom: pos.startsWith('b') ? 10 : 'auto',
              left: pos.endsWith('l') ? 10 : 'auto',
              right: pos.endsWith('r') ? 10 : 'auto',
              color: 'rgba(201,168,76,0.25)',
              fontSize: 10,
              fontFamily: 'Cinzel, serif',
            }}>✦</div>
          ))}
        </div>
      );
    }
    if (portal.id === 'signal-lost') {
      return (
        <div className="absolute inset-0 pointer-events-none scanline-overlay" style={{ zIndex: 0 }}>
          {/* HUD bracket corners */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              top: pos.startsWith('t') ? 8 : 'auto',
              bottom: pos.startsWith('b') ? 8 : 'auto',
              left: pos.endsWith('l') ? 8 : 'auto',
              right: pos.endsWith('r') ? 8 : 'auto',
              width: 16,
              height: 16,
              borderTop: pos.startsWith('t') ? '1px solid rgba(0,212,255,0.5)' : 'none',
              borderBottom: pos.startsWith('b') ? '1px solid rgba(0,212,255,0.5)' : 'none',
              borderLeft: pos.endsWith('l') ? '1px solid rgba(0,212,255,0.5)' : 'none',
              borderRight: pos.endsWith('r') ? '1px solid rgba(0,212,255,0.5)' : 'none',
            }} />
          ))}
          {/* Scan line moving */}
          {hovered && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
              animation: 'scanLine 2.5s linear infinite',
            }} />
          )}
        </div>
      );
    }
    if (portal.id === 'hollow-woods') {
      return (
        <div className="absolute inset-0 pointer-events-none noise-overlay" style={{ zIndex: 0 }}>
          {/* Tree silhouettes at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            opacity: 0.12,
            background: `
              radial-gradient(ellipse 8px 30px at 15% 100%, rgba(90,173,126,1) 0%, transparent 100%),
              radial-gradient(ellipse 6px 22px at 25% 100%, rgba(90,173,126,1) 0%, transparent 100%),
              radial-gradient(ellipse 10px 38px at 40% 100%, rgba(90,173,126,1) 0%, transparent 100%),
              radial-gradient(ellipse 7px 28px at 55% 100%, rgba(90,173,126,1) 0%, transparent 100%),
              radial-gradient(ellipse 9px 34px at 70% 100%, rgba(90,173,126,1) 0%, transparent 100%),
              radial-gradient(ellipse 6px 20px at 85% 100%, rgba(90,173,126,1) 0%, transparent 100%)
            `,
          }} />
          {/* Fog layer */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            background: 'linear-gradient(0deg, rgba(90,173,126,0.04) 0%, transparent 100%)',
          }} />
        </div>
      );
    }
    if (portal.id === 'code-of-shadows') {
      return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,0,110,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }} />
          {/* Glitch accent lines */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,0,110,0.15), transparent)',
          }} />
          <div style={{
            position: 'absolute',
            top: '65%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.12), transparent)',
          }} />
        </div>
      );
    }
    if (portal.id === 'spy-ring') {
      return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Ruled document lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(212,175,90,0.04) 22px, rgba(212,175,90,0.04) 23px)',
          }} />
          {/* Stamp remnant */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%) rotate(-15deg)',
            border: '2px solid rgba(212,175,90,0.08)',
            borderRadius: '50%',
            width: 70,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.38rem',
              letterSpacing: '0.3em',
              color: 'rgba(212,175,90,0.12)',
              textAlign: 'center',
            }}>CLASSIFIED</span>
          </div>
        </div>
      );
    }
    if (portal.id === 'trivia-throne') {
      return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Sparkle particles */}
          {[
            { x: '15%', y: '20%', size: 4, delay: 0 },
            { x: '80%', y: '15%', size: 3, delay: 0.8 },
            { x: '90%', y: '70%', size: 5, delay: 1.6 },
            { x: '10%', y: '80%', size: 3, delay: 2.4 },
            { x: '50%', y: '10%', size: 4, delay: 3.2 },
            { x: '70%', y: '85%', size: 3, delay: 0.4 },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: 'rgba(176,111,255,0.6)',
              borderRadius: '50%',
              animation: `particleFloat 3s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
          {/* Radial burst background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(176,111,255,0.06) 0%, transparent 70%)',
          }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="portal-card"
      style={{
        background: portal.bg,
        border: `1px solid ${hovered ? portal.accent + '60' : portal.borderColor}`,
        '--portal-glow': portal.glow,
        boxShadow: hovered
          ? `0 0 40px ${portal.glow}, 0 0 80px ${portal.glow.replace('0.2', '0.08')}, inset 0 0 30px ${portal.glow.replace('0.2', '0.04')}`
          : `0 4px 24px rgba(0,0,0,0.4)`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 320,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isAvailable && onPlay ? onPlay : undefined}
    >
      <InnerDecoration />

      {/* Card content — above decorations */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, padding: '1.5rem 1.6rem' }}>

        {/* Top row: number + genre + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.6rem',
            color: portal.accent,
            opacity: 0.7,
            letterSpacing: '0.15em',
          }}>
            {portal.number}
          </div>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.52rem',
            color: portal.accent,
            opacity: 0.5,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            {portal.genre}
          </div>
          {portal.status === 'coming-soon' && (
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.5rem',
              color: portal.accent,
              opacity: 0.4,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: `1px solid ${portal.accent}40`,
              padding: '0.15em 0.5em',
            }}>
              SOON
            </div>
          )}
          {portal.status === 'available' && (
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.5rem',
              color: portal.accent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: `1px solid ${portal.accent}60`,
              padding: '0.15em 0.5em',
              animation: 'blink 3s ease-in-out infinite',
            }}>
              LIVE
            </div>
          )}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '1.8rem',
          color: portal.accent,
          marginBottom: '0.8rem',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease, text-shadow 0.3s ease',
          textShadow: hovered ? `0 0 20px ${portal.accent}` : 'none',
        }}>
          {portal.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: portal.titleFont,
          fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
          color: portal.accent,
          letterSpacing: '0.06em',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
          textShadow: hovered ? `0 0 30px ${portal.accent}60` : 'none',
          transition: 'text-shadow 0.3s ease',
        }}>
          {portal.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: "'IM Fell English', serif",
          fontStyle: 'italic',
          fontSize: '0.82rem',
          color: portal.accent,
          opacity: 0.7,
          lineHeight: 1.55,
          marginBottom: '0.8rem',
        }}>
          {portal.tagline}
        </p>

        {/* Reveal on hover: longer description */}
        <div style={{
          overflow: 'hidden',
          maxHeight: hovered ? '120px' : '0px',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease',
          marginBottom: hovered ? '0.8rem' : 0,
        }}>
          <p style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: '0.76rem',
            color: portal.accent,
            opacity: 0.55,
            lineHeight: 1.65,
            paddingTop: '0.2rem',
          }}>
            {portal.description}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${portal.accent}40, transparent)`,
          marginBottom: '0.9rem',
          marginTop: 'auto',
        }} />

        {/* Bottom: label + players + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.52rem',
              color: portal.accent,
              opacity: 0.6,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.15rem',
            }}>
              {portal.label}
            </div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.48rem',
              color: portal.accent,
              opacity: 0.35,
              letterSpacing: '0.1em',
            }}>
              {portal.players}
            </div>
          </div>

          {isAvailable ? (
            <button
              onClick={(e) => { e.stopPropagation(); onPlay?.(); }}
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: `1px solid ${portal.accent}`,
                color: portal.accent,
                padding: '0.45em 1.2em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: hovered ? `0 0 16px ${portal.glow}` : 'none',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.background = `${portal.accent}18`;
                (e.target as HTMLElement).style.boxShadow = `0 0 20px ${portal.glow}`;
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.boxShadow = hovered ? `0 0 16px ${portal.glow}` : 'none';
              }}
            >
              ENTER
            </button>
          ) : (
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.5rem',
              color: portal.accent,
              opacity: 0.3,
              letterSpacing: '0.15em',
            }}>
              IN PROGRESS
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  const { T } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Coordinate label */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.6rem',
        color: 'rgba(201,168,76,0.35)',
        letterSpacing: '0.25em',
        marginBottom: '3rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease 0.2s',
      }}>
        ✦ &nbsp; COSM-ARC-7 &nbsp; · &nbsp; SECTOR: UNCHARTED &nbsp; · &nbsp; ACCESS: OPEN &nbsp; ✦
      </div>

      {/* Main title */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.1s ease 0.5s, transform 1.1s ease 0.5s',
      }}>
        <div style={{
          fontFamily: 'Cinzel Decorative, serif',
          fontSize: 'clamp(0.7rem, 2vw, 1rem)',
          letterSpacing: '0.6em',
          color: 'rgba(201,168,76,0.45)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          THE
        </div>
        <h1 style={{
          fontFamily: 'Cinzel Decorative, serif',
          fontSize: 'clamp(2.8rem, 9vw, 7rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '0.04em',
          marginBottom: '0.5rem',
          background: 'linear-gradient(180deg, #f0d890 0%, #c9a84c 40%, #8a6820 80%, #c9a84c 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.3))',
        }}>
          ARCHIVE
        </h1>
        <div style={{
          fontFamily: 'Cinzel Decorative, serif',
          fontSize: 'clamp(0.7rem, 2vw, 1rem)',
          letterSpacing: '0.6em',
          color: 'rgba(201,168,76,0.45)',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          OF
        </div>
        <h1 style={{
          fontFamily: 'Cinzel Decorative, serif',
          fontSize: 'clamp(2.8rem, 9vw, 7rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '0.04em',
          marginBottom: '2.5rem',
          background: 'linear-gradient(180deg, #f0d890 0%, #c9a84c 40%, #8a6820 80%, #c9a84c 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.3))',
        }}>
          WORLDS
        </h1>
      </div>

      {/* Divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: 480,
        marginBottom: '2rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.9s ease 1s',
      }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3))' }} />
        <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.8rem' }}>⚜</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }} />
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'IM Fell English, serif',
        fontStyle: 'italic',
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        color: 'rgba(201,168,76,0.55)',
        letterSpacing: '0.04em',
        marginBottom: '3.5rem',
        maxWidth: 480,
        lineHeight: 1.7,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.9s ease 1.2s, transform 0.9s ease 1.2s',
      }}>
        Six worlds. Six mysteries. Choose your gateway.
      </p>

      {/* CTA */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.9s ease 1.6s, transform 0.9s ease 1.6s',
      }}>
        <button
          className="archive-btn"
          onClick={onEnter}
          style={{ fontSize: '0.78rem' }}
        >
          ENTER THE ARCHIVE
        </button>
      </div>

      {/* Language switcher */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.5s',
      }}>
        <LanguageSwitcher />
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.5rem',
        letterSpacing: '0.25em',
        color: 'rgba(201,168,76,0.25)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span>SCROLL TO EXPLORE</span>
        <div style={{
          width: 1,
          height: 32,
          background: 'linear-gradient(180deg, rgba(201,168,76,0.3), transparent)',
          animation: 'cosmicPulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}

// ── Portal Grid ──────────────────────────────────────────────────────────────

function PortalGrid({
  onPlayLastKingdom,
  onPlaySignalLost,
  onPlayHollowWoods,
}: {
  onPlayLastKingdom: () => void;
  onPlaySignalLost: () => void;
  onPlayHollowWoods: () => void;
}) {
  return (
    <section
      id="portals"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.35)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Active Portals — 6 of 6 Registered
        </div>
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
          maxWidth: 480,
          margin: '0 auto',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
      }}>
        {PORTALS.map(portal => (
          <PortalCard
            key={portal.id}
            portal={portal}
            onPlay={
              portal.id === 'last-kingdom' ? onPlayLastKingdom :
              portal.id === 'signal-lost' ? onPlaySignalLost :
              portal.id === 'hollow-woods' ? onPlayHollowWoods :
              undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

// ── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section style={{
      position: 'relative',
      zIndex: 2,
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
      maxWidth: 900,
      margin: '0 auto',
      textAlign: 'center',
    }}>
      {/* Divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15))' }} />
        <div style={{ color: 'rgba(201,168,76,0.3)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.3em' }}>
          ABOUT THIS ARCHIVE
        </div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.15), transparent)' }} />
      </div>

      <p style={{
        fontFamily: 'IM Fell English, serif',
        fontStyle: 'italic',
        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
        color: 'rgba(201,168,76,0.45)',
        lineHeight: 1.9,
        marginBottom: '1rem',
      }}>
        The Archive of Worlds is a curated collection of browser-based mystery and investigation games,
        each built as a fully immersive solo or group experience.
      </p>
      <p style={{
        fontFamily: 'Lora, serif',
        fontStyle: 'italic',
        fontSize: '0.85rem',
        color: 'rgba(201,168,76,0.28)',
        lineHeight: 1.8,
      }}>
        No downloads. No accounts. Each world opens instantly in your browser — with a story waiting to be unravelled.
      </p>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      padding: '2rem clamp(1.5rem, 4vw, 4rem)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
    }}>
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.55rem',
        color: 'rgba(201,168,76,0.2)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        COSM-ARC-7 &nbsp;·&nbsp; Archive of Worlds
      </div>

      <a
        href="/"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: 'rgba(201,168,76,0.35)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          transition: 'color 0.2s ease',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          paddingBottom: '0.1em',
        }}
        onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(201,168,76,0.65)'}
        onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(201,168,76,0.35)'}
      >
        ← Return to Main Site
      </a>

      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.5rem',
        color: 'rgba(201,168,76,0.15)',
        letterSpacing: '0.1em',
      }}>
        © 2024 · All worlds handcrafted
      </div>
    </footer>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function ArchiveHub({ onPlayLastKingdom, onPlaySignalLost, onPlayHollowWoods }: ArchiveHubProps) {
  const portalsRef = useRef<HTMLDivElement>(null);
  const stars = useStars(220);

  function handleEnter() {
    portalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03050a',
      color: '#c9a84c',
      overflowX: 'hidden',
      scrollbarWidth: 'none',
    }}>
      <style>{`
        ::-webkit-scrollbar { display: none; }
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Layered cosmic background */}
      <NebulaBackground />
      <StarField stars={stars} />

      {/* Content */}
      <HeroSection onEnter={handleEnter} />

      <div ref={portalsRef}>
        <PortalGrid
          onPlayLastKingdom={onPlayLastKingdom}
          onPlaySignalLost={onPlaySignalLost}
          onPlayHollowWoods={onPlayHollowWoods}
        />
      </div>

      <AboutSection />
      <Footer />
    </div>
  );
}
