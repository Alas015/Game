import { useState } from 'react';
import type { SLGameState } from './slTypes';
import { SL_ROOMS, SL_CLUES } from './slData';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

interface StationMapProps {
  gameState: SLGameState;
  onRoomClick: (roomId: string) => void;
  onEvidence: () => void;
  onJournal: () => void;
  onReport: () => void;
  onExit: () => void;
}

const STATUS_COLORS: Record<string, { border: string; glow: string; dot: string; label: string }> = {
  nominal:  { border: 'rgba(0,212,255,0.45)',  glow: 'rgba(0,212,255,0.12)',  dot: '#00d4ff',  label: 'NOMINAL'   },
  alert:    { border: 'rgba(255,153,0,0.55)',   glow: 'rgba(255,153,0,0.12)',  dot: '#ff9900',  label: 'ALERT'     },
  critical: { border: 'rgba(255,59,59,0.6)',    glow: 'rgba(255,59,59,0.12)',  dot: '#ff3b3b',  label: 'CRITICAL'  },
  offline:  { border: 'rgba(80,100,120,0.4)',   glow: 'rgba(60,80,100,0.06)', dot: '#405060',  label: 'OFFLINE'   },
};

export default function StationMap({ gameState, onRoomClick, onEvidence, onJournal, onReport, onExit }: StationMapProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { lang } = useLanguage();
  const copy = {
    en: { logs: 'LOGS', evidence: 'EVIDENCE', report: 'FILE REPORT', exit: '← EXIT' },
    az: { logs: 'JURNALLAR', evidence: 'SÜBUTLAR', report: 'HESABAT VER', exit: '← ÇIXIŞ' },
    tr: { logs: 'KAYITLAR', evidence: 'KANITLAR', report: 'RAPOR GÖNDER', exit: '← ÇIKIŞ' },
  }[lang];
  const clueCount = gameState.collectedClueIds.length;
  const canReport = clueCount >= 5;

  const rooms = Object.values(SL_ROOMS);
  const hovered = hoveredRoom ? SL_ROOMS[hoveredRoom] : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#03070e',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Space Mono, monospace',
        position: 'relative',
      }}
    >
      {/* Scanline overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none',
        zIndex: 100,
      }} />

      {/* Top nav */}
      <div style={{
        padding: '0.7rem 1.5rem',
        background: 'rgba(3,8,18,0.98)',
        borderBottom: '1px solid rgba(0,212,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.3em', marginBottom: '0.1rem' }}>
            HELIOS-9 · STATION SCHEMATIC
          </div>
          <div style={{
            fontFamily: 'Orbitron, Space Mono, monospace',
            fontSize: '0.9rem',
            color: '#00d4ff',
            letterSpacing: '0.08em',
          }}>
            SIGNAL LOST
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <div style={{
            fontSize: '0.5rem',
            color: clueCount >= 5 ? '#00d4ff' : 'rgba(0,212,255,0.35)',
            letterSpacing: '0.15em',
            marginRight: '0.4rem',
          }}>
            EVIDENCE: {clueCount}/7
          </div>
          {[
            { label: copy.logs, onClick: onJournal },
            { label: copy.evidence, onClick: onEvidence },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.25)',
                color: 'rgba(0,212,255,0.6)',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.6)';
                (e.currentTarget as HTMLElement).style.color = '#00d4ff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.25)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(0,212,255,0.6)';
              }}
            >
              {label}
            </button>
          ))}
          {canReport && (
            <button
              onClick={onReport}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'rgba(255,59,59,0.08)',
                border: '1px solid rgba(255,59,59,0.5)',
                color: '#ff3b3b',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: 'blink 3s ease-in-out infinite',
              }}
            >
              {copy.report}
            </button>
          )}
          <button
            onClick={onExit}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.1em',
              background: 'transparent',
              border: '1px solid rgba(80,100,120,0.3)',
              color: 'rgba(80,100,120,0.6)',
              padding: '0.4em 0.7em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(138,184,208,0.6)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,184,208,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(80,100,120,0.6)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(80,100,120,0.3)';
            }}
          >
            {copy.exit}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Map + sidebar */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* SVG station map */}
        <div style={{ flex: 1, position: 'relative', padding: '1.5rem' }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }} />

          <svg
            viewBox="0 0 860 540"
            style={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 160px)' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid cross-hairs */}
            <line x1="0" y1="270" x2="860" y2="270" stroke="rgba(0,212,255,0.03)" strokeWidth="1" />
            <line x1="430" y1="0" x2="430" y2="540" stroke="rgba(0,212,255,0.03)" strokeWidth="1" />

            {/* Border frame */}
            <rect x="4" y="4" width="852" height="532" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />

            {/* Station title */}
            <text x="12" y="22" fill="rgba(0,212,255,0.2)" fontSize="8" fontFamily="Space Mono, monospace" letterSpacing="4">
              HELIOS-9 · DECK PLAN · EMERGENCY SYSTEMS ONLY
            </text>

            {/* ── Corridors ── */}
            {/* Comms → Command */}
            <rect x="415" y="82" width="30" height="18" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.2)" strokeWidth="1" />
            <line x1="430" y1="82" x2="430" y2="100" stroke="rgba(0,180,220,0.15)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Cryo → Command */}
            <rect x="234" y="130" width="86" height="34" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.15)" strokeWidth="1" />
            <line x1="234" y1="147" x2="320" y2="147" stroke="rgba(0,180,220,0.12)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Medical → Command */}
            <rect x="540" y="130" width="86" height="34" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.15)" strokeWidth="1" />
            <line x1="540" y1="147" x2="626" y2="147" stroke="rgba(0,180,220,0.12)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Command → Cargo */}
            <rect x="415" y="194" width="30" height="106" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.15)" strokeWidth="1" />
            <line x1="430" y1="194" x2="430" y2="300" stroke="rgba(0,180,220,0.12)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Botanical → Cargo */}
            <rect x="234" y="330" width="86" height="34" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.15)" strokeWidth="1" />
            <line x1="234" y1="347" x2="320" y2="347" stroke="rgba(0,180,220,0.12)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Engineering → Cargo */}
            <rect x="540" y="330" width="86" height="34" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.15)" strokeWidth="1" />
            <line x1="540" y1="347" x2="626" y2="347" stroke="rgba(0,180,220,0.12)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Cargo → Airlock */}
            <rect x="415" y="394" width="30" height="18" fill="rgba(0,20,40,0.8)" stroke="rgba(0,180,220,0.2)" strokeWidth="1" />
            <line x1="430" y1="394" x2="430" y2="412" stroke="rgba(0,180,220,0.15)" strokeWidth="1" strokeDasharray="4,4" />

            {/* ── Rooms ── */}
            {rooms.map(room => {
              const { x, y, w, h } = room.mapPosition;
              const sc = STATUS_COLORS[room.status];
              const isHovered = hoveredRoom === room.id;
              const isVisited = gameState.visitedRoomIds.includes(room.id);
              const hasUnclue = room.inspectItems.some(
                item => item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)
              );

              return (
                <g
                  key={room.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => onRoomClick(room.id)}
                >
                  {/* Glow layer */}
                  {(isHovered || hasUnclue) && (
                    <rect
                      x={x - 4} y={y - 4} width={w + 8} height={h + 8}
                      rx="3"
                      fill={isHovered ? sc.glow : 'rgba(0,212,255,0.04)'}
                      stroke="none"
                    />
                  )}

                  {/* Room body */}
                  <rect
                    x={x} y={y} width={w} height={h}
                    rx="2"
                    fill={isVisited ? 'rgba(0,18,36,0.95)' : 'rgba(3,10,22,0.95)'}
                    stroke={isHovered ? sc.border.replace('0.45', '0.8').replace('0.55', '0.9').replace('0.6', '1') : sc.border}
                    strokeWidth={isHovered ? 1.5 : 1}
                  />

                  {/* Inner frame */}
                  <rect
                    x={x + 3} y={y + 3} width={w - 6} height={h - 6}
                    rx="1"
                    fill="none"
                    stroke={sc.border.replace('0.45', '0.15').replace('0.55', '0.15').replace('0.6', '0.15').replace('0.4', '0.08')}
                    strokeWidth="1"
                  />

                  {/* Corner brackets */}
                  <path d={`M ${x + 2},${y + 8} L ${x + 2},${y + 2} L ${x + 8},${y + 2}`}
                    fill="none" stroke={sc.border} strokeWidth="1" opacity="0.6" />
                  <path d={`M ${x + w - 8},${y + 2} L ${x + w - 2},${y + 2} L ${x + w - 2},${y + 8}`}
                    fill="none" stroke={sc.border} strokeWidth="1" opacity="0.6" />
                  <path d={`M ${x + 2},${y + h - 8} L ${x + 2},${y + h - 2} L ${x + 8},${y + h - 2}`}
                    fill="none" stroke={sc.border} strokeWidth="1" opacity="0.6" />
                  <path d={`M ${x + w - 8},${y + h - 2} L ${x + w - 2},${y + h - 2} L ${x + w - 2},${y + h - 8}`}
                    fill="none" stroke={sc.border} strokeWidth="1" opacity="0.6" />

                  {/* Status dot */}
                  <circle
                    cx={x + w - 12} cy={y + 12} r="3.5"
                    fill={sc.dot}
                    opacity={room.status === 'offline' ? 0.3 : 0.8}
                  />
                  {room.status === 'critical' && (
                    <circle cx={x + w - 12} cy={y + 12} r="5"
                      fill="none" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.4" />
                  )}

                  {/* Scan line pattern inside visited rooms */}
                  {isVisited && (
                    <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8}
                      fill="url(#scanlines)" opacity="0.15" />
                  )}

                  {/* Unclue indicator */}
                  {hasUnclue && (
                    <circle cx={x + 12} cy={y + 12} r="4"
                      fill="#ff3b3b" stroke="rgba(255,59,59,0.3)" strokeWidth="1" />
                  )}

                  {/* Room short name */}
                  <text
                    x={x + w / 2} y={y + h / 2 - 6}
                    textAnchor="middle"
                    fill={isHovered ? '#00d4ff' : isVisited ? 'rgba(0,180,220,0.7)' : 'rgba(0,150,190,0.5)'}
                    fontSize="7.5"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="2"
                    style={{ userSelect: 'none', transition: 'fill 0.2s ease' }}
                  >
                    {room.shortName}
                  </text>

                  {/* Status label */}
                  <text
                    x={x + w / 2} y={y + h / 2 + 6}
                    textAnchor="middle"
                    fill={sc.dot}
                    fontSize="6"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="1"
                    opacity={0.6}
                    style={{ userSelect: 'none' }}
                  >
                    {sc.label}
                  </text>

                  {/* Visit indicator */}
                  {isVisited && (
                    <text
                      x={x + w / 2} y={y + h - 8}
                      textAnchor="middle"
                      fill="rgba(0,150,190,0.35)"
                      fontSize="6"
                      fontFamily="Space Mono, monospace"
                      letterSpacing="1"
                      style={{ userSelect: 'none' }}
                    >
                      ✓ INVESTIGATED
                    </text>
                  )}
                </g>
              );
            })}

            {/* Scanline pattern def */}
            <defs>
              <pattern id="scanlines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(0,180,220,1)" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Station center label */}
            <text x="430" y="524" textAnchor="middle" fill="rgba(0,212,255,0.12)"
              fontSize="7" fontFamily="Space Mono, monospace" letterSpacing="3">
              HELIOS-9 RESEARCH STATION · HELIX CORPORATION
            </text>
          </svg>
        </div>

        {/* Right sidebar */}
        <div style={{
          width: 260,
          background: 'rgba(3,8,18,0.98)',
          borderLeft: '1px solid rgba(0,212,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          gap: '0.8rem',
          overflowY: 'auto',
        }}>
          {/* Hover info */}
          {hovered ? (
            <div style={{
              border: '1px solid rgba(0,212,255,0.2)',
              padding: '0.8rem',
              position: 'relative',
              flex: '0 0 auto',
            }}>
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8,
                borderTop: '1px solid rgba(0,212,255,0.5)', borderLeft: '1px solid rgba(0,212,255,0.5)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8,
                borderBottom: '1px solid rgba(0,212,255,0.5)', borderRight: '1px solid rgba(0,212,255,0.5)' }} />

              <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.25em', marginBottom: '0.4rem' }}>
                SELECTED SECTOR
              </div>
              <div style={{ fontSize: '0.7rem', color: '#00d4ff', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                {hovered.name.toUpperCase()}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.6rem',
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: STATUS_COLORS[hovered.status].dot,
                }} />
                <span style={{ fontSize: '0.48rem', color: STATUS_COLORS[hovered.status].dot, letterSpacing: '0.15em' }}>
                  {STATUS_COLORS[hovered.status].label}
                </span>
              </div>
              <p style={{ fontSize: '0.62rem', color: 'rgba(138,184,208,0.55)', lineHeight: 1.65, marginBottom: '0.6rem' }}>
                {hovered.description}
              </p>
              {hovered.inspectItems.some(item => item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)) && (
                <div style={{ fontSize: '0.5rem', color: '#ff3b3b', letterSpacing: '0.15em' }}>
                  ● EVIDENCE DETECTED
                </div>
              )}
              {gameState.visitedRoomIds.includes(hovered.id) && (
                <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.15em', marginTop: '0.3rem' }}>
                  ✓ PREVIOUSLY INVESTIGATED
                </div>
              )}
            </div>
          ) : (
            <div style={{
              border: '1px solid rgba(0,212,255,0.08)',
              padding: '0.8rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.2)', letterSpacing: '0.2em' }}>
                HOVER A SECTOR
              </div>
            </div>
          )}

          {/* Legend */}
          <div style={{ borderTop: '1px solid rgba(0,212,255,0.08)', paddingTop: '0.8rem' }}>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              SECTOR STATUS
            </div>
            {Object.entries(STATUS_COLORS).map(([status, c]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot, opacity: status === 'offline' ? 0.4 : 0.8 }} />
                <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.35)', letterSpacing: '0.12em' }}>
                  {c.label}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff3b3b' }} />
              <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.35)', letterSpacing: '0.12em' }}>
                EVIDENCE PRESENT
              </span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ borderTop: '1px solid rgba(0,212,255,0.08)', paddingTop: '0.8rem' }}>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              INVESTIGATION STATUS
            </div>
            <div style={{ marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.4)' }}>Sectors cleared</span>
                <span style={{ fontSize: '0.48rem', color: '#00d4ff' }}>{gameState.visitedRoomIds.length}/8</span>
              </div>
              <div style={{ height: 2, background: 'rgba(0,212,255,0.1)', borderRadius: 1 }}>
                <div style={{
                  height: 2,
                  background: '#00d4ff',
                  width: `${(gameState.visitedRoomIds.length / 8) * 100}%`,
                  transition: 'width 0.4s ease',
                  borderRadius: 1,
                }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.4)' }}>Evidence collected</span>
                <span style={{ fontSize: '0.48rem', color: clueCount >= 5 ? '#ff3b3b' : '#00d4ff' }}>
                  {clueCount}/7
                </span>
              </div>
              <div style={{ height: 2, background: 'rgba(0,212,255,0.1)', borderRadius: 1 }}>
                <div style={{
                  height: 2,
                  background: clueCount >= 5 ? '#ff3b3b' : '#00d4ff',
                  width: `${(clueCount / 7) * 100}%`,
                  transition: 'width 0.4s ease',
                  borderRadius: 1,
                }} />
              </div>
            </div>
          </div>

          {/* Collected clues */}
          {clueCount > 0 && (
            <div style={{ borderTop: '1px solid rgba(0,212,255,0.08)', paddingTop: '0.8rem' }}>
              <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                COLLECTED EVIDENCE
              </div>
              {gameState.collectedClueIds.map(id => {
                const clue = SL_CLUES[id];
                if (!clue) return null;
                return (
                  <div key={id} style={{
                    display: 'flex',
                    gap: '0.4rem',
                    alignItems: 'flex-start',
                    marginBottom: '0.35rem',
                    padding: '0.3rem 0.4rem',
                    background: 'rgba(0,212,255,0.03)',
                    border: '1px solid rgba(0,212,255,0.08)',
                  }}>
                    <span style={{ color: '#00d4ff', fontSize: '0.55rem', flexShrink: 0 }}>{clue.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.5rem', color: 'rgba(0,180,220,0.7)', letterSpacing: '0.05em' }}>
                        {clue.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Report CTA */}
          {canReport && (
            <div style={{ marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,59,59,0.15)' }}>
              <div style={{
                fontSize: '0.48rem',
                color: '#ff3b3b',
                letterSpacing: '0.15em',
                marginBottom: '0.6rem',
                animation: 'blink 2s ease-in-out infinite',
              }}>
                ● SUFFICIENT EVIDENCE
              </div>
              <button
                onClick={onReport}
                style={{
                  width: '100%',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,59,59,0.08)',
                  border: '1px solid rgba(255,59,59,0.5)',
                  color: '#ff3b3b',
                  padding: '0.65em 1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                FILE INCIDENT REPORT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '0.5rem 1.5rem',
        background: 'rgba(0,0,0,0.6)',
        borderTop: '1px solid rgba(0,212,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '0.45rem', color: 'rgba(138,184,208,0.25)', fontStyle: 'italic' }}>
          Click any sector to investigate · Hover for status details
        </div>
        <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.2)', letterSpacing: '0.15em' }}>
          {gameState.visitedRoomIds.length}/8 SECTORS CLEARED
        </div>
      </div>
    </div>
  );
}
