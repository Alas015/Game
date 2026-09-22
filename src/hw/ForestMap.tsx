import { useState } from 'react';
import type { HWGameState } from './hwTypes';
import { HW_CLEARINGS, HW_CLUES } from './hwData';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

interface ForestMapProps {
  gameState: HWGameState;
  onClearingClick: (clearingId: string) => void;
  onEvidence: () => void;
  onJournal: () => void;
  onFinding: () => void;
  onExit: () => void;
}

const STATUS_COLORS: Record<string, { border: string; glow: string; dot: string; label: string }> = {
  quiet:    { border: 'rgba(90,173,126,0.4)',  glow: 'rgba(90,173,126,0.10)',  dot: '#5aad7e',  label: 'QUIET' },
  uneasy:   { border: 'rgba(201,160,60,0.5)',  glow: 'rgba(201,160,60,0.10)',  dot: '#c9a03c',  label: 'UNEASY' },
  dreadful: { border: 'rgba(180,60,50,0.55)',  glow: 'rgba(180,60,50,0.10)',   dot: '#b43c32',  label: 'DREADFUL' },
  sealed:   { border: 'rgba(90,100,90,0.35)',  glow: 'rgba(60,70,60,0.06)',    dot: '#5a6a5a',  label: 'SEALED' },
};

// Trail connections between clearings, by center point.
const TRAILS: [string, string][] = [
  ['village-green', 'thorne-manor'],
  ['village-green', 'constable-post'],
  ['village-green', 'mara-cottage'],
  ['village-green', 'sawmill'],
  ['mara-cottage', 'sunken-chapel'],
  ['sawmill', 'deep-cuts'],
  ['thorne-manor', 'sunken-chapel'],
  ['constable-post', 'deep-cuts'],
  ['sunken-chapel', 'hollow-root'],
  ['deep-cuts', 'hollow-root'],
];

function center(id: string) {
  const c = HW_CLEARINGS[id].mapPosition;
  return { x: c.x + c.w / 2, y: c.y + c.h / 2 };
}

export default function ForestMap({ gameState, onClearingClick, onEvidence, onJournal, onFinding, onExit }: ForestMapProps) {
  const [hoveredClearing, setHoveredClearing] = useState<string | null>(null);
  const { lang } = useLanguage();
  const copy = {
    en: { journal: 'JOURNAL', evidence: 'EVIDENCE', finding: 'RECORD FINDING', exit: '← LEAVE' },
    az: { journal: 'GÜNDƏLİK', evidence: 'SÜBUTLAR', finding: 'NƏTİCƏNİ QEYD ET', exit: '← ÇIXIŞ' },
    tr: { journal: 'GÜNLÜK', evidence: 'KANITLAR', finding: 'SONUCU KAYDET', exit: '← AYRIL' },
  }[lang];
  const clueCount = gameState.collectedClueIds.length;
  const canFinding = clueCount >= 5;

  const clearings = Object.values(HW_CLEARINGS);
  const hovered = hoveredClearing ? HW_CLEARINGS[hoveredClearing] : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03090a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'IM Fell English', serif",
      position: 'relative',
    }}>
      {/* Fog overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(90,173,126,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 100,
      }} />

      {/* Top nav */}
      <div style={{
        padding: '0.7rem 1.5rem',
        background: 'rgba(4,10,8,0.98)',
        borderBottom: '1px solid rgba(90,173,126,0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}>
        <div>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.25em', marginBottom: '0.1rem' }}>
            ASHWICK HOLLOW · WAYS THROUGH THE WOOD
          </div>
          <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1rem', color: '#8fd6ab', letterSpacing: '0.04em' }}>
            THE HOLLOW WOODS
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <div style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.55rem',
            color: clueCount >= 5 ? '#8fd6ab' : 'rgba(90,173,126,0.4)',
            letterSpacing: '0.12em',
            marginRight: '0.4rem',
          }}>
            EVIDENCE: {clueCount}/7
          </div>
          {[
            { label: '            {copy.journal}', onClick: onJournal },
            { label: '            {copy.evidence}', onClick: onEvidence },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                background: 'transparent',
                border: '1px solid rgba(90,173,126,0.28)',
                color: 'rgba(143,214,171,0.7)',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.6)';
                (e.currentTarget as HTMLElement).style.color = '#8fd6ab';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.28)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(143,214,171,0.7)';
              }}
            >
              {label}
            </button>
          ))}
          {canFinding && (
            <button
              onClick={onFinding}
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                background: 'rgba(180,60,50,0.1)',
                border: '1px solid rgba(180,60,50,0.5)',
                color: '#d97a6e',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: 'blink 3s ease-in-out infinite',
              }}
            >
              {copy.finding}
            </button>
          )}
          <button
            onClick={onExit}
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: '0.68rem',
              background: 'transparent',
              border: '1px solid rgba(120,130,120,0.3)',
              color: 'rgba(140,150,140,0.6)',
              padding: '0.4em 0.7em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(190,200,190,0.7)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(190,200,190,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(140,150,140,0.6)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(120,130,120,0.3)';
            }}
          >
            {copy.exit}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Map + sidebar */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* SVG forest map */}
        <div style={{ flex: 1, position: 'relative', padding: '1.5rem' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(90,173,126,0.03) 0%, transparent 70%)',
          }} />

          <svg
            viewBox="0 0 860 560"
            style={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 160px)' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="4" y="4" width="852" height="552" fill="none" stroke="rgba(90,173,126,0.08)" strokeWidth="1" />
            <text x="12" y="22" fill="rgba(90,173,126,0.22)" fontSize="8" fontFamily="'Lora', serif" fontStyle="italic" letterSpacing="3">
              a hand-drawn map, redrawn by every investigator who has come before you
            </text>

            {/* Trails */}
            {TRAILS.map(([a, b], i) => {
              const pa = center(a);
              const pb = center(b);
              return (
                <line
                  key={i}
                  x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke="rgba(90,173,126,0.14)"
                  strokeWidth="1.5"
                  strokeDasharray="1,6"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Clearings */}
            {clearings.map(clearing => {
              const { x, y, w, h } = clearing.mapPosition;
              const sc = STATUS_COLORS[clearing.status];
              const isHovered = hoveredClearing === clearing.id;
              const isVisited = gameState.visitedClearingIds.includes(clearing.id);
              const hasUnclue = clearing.inspectItems.some(
                item => item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)
              );

              return (
                <g
                  key={clearing.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredClearing(clearing.id)}
                  onMouseLeave={() => setHoveredClearing(null)}
                  onClick={() => onClearingClick(clearing.id)}
                >
                  {(isHovered || hasUnclue) && (
                    <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2 + 8} ry={h / 2 + 8}
                      fill={isHovered ? sc.glow : 'rgba(90,173,126,0.05)'} />
                  )}

                  <rect
                    x={x} y={y} width={w} height={h} rx="6"
                    fill={isVisited ? 'rgba(8,18,14,0.95)' : 'rgba(4,10,8,0.95)'}
                    stroke={sc.border}
                    strokeWidth={isHovered ? 1.6 : 1}
                  />
                  <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="4"
                    fill="none" stroke={sc.border} strokeWidth="1" opacity="0.2" />

                  <circle cx={x + w - 12} cy={y + 12} r="3.5" fill={sc.dot} opacity={clearing.status === 'sealed' ? 0.35 : 0.85} />
                  {clearing.status === 'dreadful' && (
                    <circle cx={x + w - 12} cy={y + 12} r="5.5" fill="none" stroke="#b43c32" strokeWidth="0.8" opacity="0.4" />
                  )}
                  {hasUnclue && (
                    <circle cx={x + 12} cy={y + 12} r="4" fill="#d97a6e" stroke="rgba(217,122,110,0.3)" strokeWidth="1" />
                  )}

                  <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle"
                    fill={isHovered ? '#8fd6ab' : isVisited ? 'rgba(143,214,171,0.7)' : 'rgba(120,170,140,0.5)'}
                    fontSize="10" fontFamily="'IM Fell English', serif" letterSpacing="0.5"
                    style={{ userSelect: 'none' }}>
                    {clearing.shortName}
                  </text>
                  <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle"
                    fill={sc.dot} fontSize="6.5" fontFamily="'Lora', serif" fontStyle="italic" letterSpacing="1" opacity="0.65"
                    style={{ userSelect: 'none' }}>
                    {sc.label}
                  </text>
                  {isVisited && (
                    <text x={x + w / 2} y={y + h - 6} textAnchor="middle"
                      fill="rgba(120,170,140,0.35)" fontSize="6" fontFamily="'Lora', serif" fontStyle="italic" letterSpacing="1"
                      style={{ userSelect: 'none' }}>
                      walked before
                    </text>
                  )}
                </g>
              );
            })}

            <text x="430" y="546" textAnchor="middle" fill="rgba(90,173,126,0.14)"
              fontSize="8" fontFamily="'Lora', serif" fontStyle="italic" letterSpacing="2">
              Ashwick Hollow &amp; the Hollow Wood — here be the wood's due
            </text>
          </svg>
        </div>

        {/* Sidebar */}
        <div style={{
          width: 260,
          background: 'rgba(4,10,8,0.98)',
          borderLeft: '1px solid rgba(90,173,126,0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          gap: '0.8rem',
          overflowY: 'auto',
        }}>
          {hovered ? (
            <div style={{ border: '1px solid rgba(90,173,126,0.25)', padding: '0.8rem', position: 'relative', flex: '0 0 auto' }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(90,173,126,0.5)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
                WHERE YOU STAND
              </div>
              <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', color: '#8fd6ab', marginBottom: '0.4rem' }}>
                {hovered.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_COLORS[hovered.status].dot }} />
                <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: STATUS_COLORS[hovered.status].dot, letterSpacing: '0.1em' }}>
                  {STATUS_COLORS[hovered.status].label}
                </span>
              </div>
              <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.72rem', color: 'rgba(190,210,195,0.6)', lineHeight: 1.6, marginBottom: '0.6rem' }}>
                {hovered.description}
              </p>
              {hovered.inspectItems.some(item => item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)) && (
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.55rem', color: '#d97a6e', letterSpacing: '0.1em' }}>
                  ● something here has been disturbed
                </div>
              )}
              {gameState.visitedClearingIds.includes(hovered.id) && (
                <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: 'rgba(90,173,126,0.4)', marginTop: '0.3rem' }}>
                  you have walked this ground
                </div>
              )}
            </div>
          ) : (
            <div style={{ border: '1px solid rgba(90,173,126,0.08)', padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.6rem', color: 'rgba(90,173,126,0.25)', letterSpacing: '0.1em' }}>
                choose where to walk
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid rgba(90,173,126,0.1)', paddingTop: '0.8rem' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              THE FEEL OF A PLACE
            </div>
            {Object.entries(STATUS_COLORS).map(([status, c]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot, opacity: status === 'sealed' ? 0.4 : 0.85 }} />
                <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(180,200,190,0.4)', letterSpacing: '0.08em' }}>
                  {c.label.charAt(0) + c.label.slice(1).toLowerCase()}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(90,173,126,0.1)', paddingTop: '0.8rem' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              YOUR PROGRESS
            </div>
            <div style={{ marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(180,200,190,0.4)' }}>Places walked</span>
                <span style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: '#8fd6ab' }}>{gameState.visitedClearingIds.length}/8</span>
              </div>
              <div style={{ height: 2, background: 'rgba(90,173,126,0.12)' }}>
                <div style={{ height: 2, background: '#5aad7e', width: `${(gameState.visitedClearingIds.length / 8) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(180,200,190,0.4)' }}>Evidence gathered</span>
                <span style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: clueCount >= 5 ? '#d97a6e' : '#8fd6ab' }}>{clueCount}/7</span>
              </div>
              <div style={{ height: 2, background: 'rgba(90,173,126,0.12)' }}>
                <div style={{ height: 2, background: clueCount >= 5 ? '#d97a6e' : '#5aad7e', width: `${(clueCount / 7) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>

          {clueCount > 0 && (
            <div style={{ borderTop: '1px solid rgba(90,173,126,0.1)', paddingTop: '0.8rem' }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                WHAT YOU'VE FOUND
              </div>
              {gameState.collectedClueIds.map(id => {
                const clue = HW_CLUES[id];
                if (!clue) return null;
                return (
                  <div key={id} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.35rem', padding: '0.3rem 0.4rem', background: 'rgba(90,173,126,0.04)', border: '1px solid rgba(90,173,126,0.1)' }}>
                    <span style={{ color: '#8fd6ab', fontSize: '0.6rem', flexShrink: 0 }}>{clue.icon}</span>
                    <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.55rem', color: 'rgba(180,220,195,0.75)' }}>{clue.name}</div>
                  </div>
                );
              })}
            </div>
          )}

          {canFinding && (
            <div style={{ marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid rgba(180,60,50,0.18)' }}>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: '#d97a6e', letterSpacing: '0.1em', marginBottom: '0.6rem', animation: 'blink 2.5s ease-in-out infinite' }}>
                ● you know enough to say what happened
              </div>
              <button
                onClick={onFinding}
                style={{
                  width: '100%',
                  fontFamily: "'IM Fell English', serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  background: 'rgba(180,60,50,0.1)',
                  border: '1px solid rgba(180,60,50,0.5)',
                  color: '#d97a6e',
                  padding: '0.6em 1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Record Your Finding
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '0.5rem 1.5rem',
        background: 'rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(90,173,126,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(180,200,190,0.3)' }}>
          Walk to any clearing to search it · linger over one to feel its mood
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(90,173,126,0.25)', letterSpacing: '0.1em' }}>
          {gameState.visitedClearingIds.length}/8 PLACES WALKED
        </div>
      </div>
    </div>
  );
}
