import { useState } from 'react';
import type { SLGameState } from './slTypes';
import { SL_CLUES } from './slData';

interface SLEvidenceBoardProps {
  gameState: SLGameState;
  onBack: () => void;
  onConnect: (a: string, b: string) => void;
  onSelectClue: (clueId: string | null) => void;
  onReport: () => void;
}

const CREW_LABELS: Record<string, string> = {
  aria: 'ARIA',
  chen: 'Dr. Chen',
  voss: 'Cdr. Voss',
  lowe: 'Lowe',
  osei: 'Lt. Osei',
  ward: 'Dr. Ward',
  'helix-corp': 'Helix Corp',
};

export default function SLEvidenceBoard({ gameState, onBack, onConnect, onSelectClue, onReport }: SLEvidenceBoardProps) {
  const [selected, setSelected] = useState<string | null>(gameState.selectedClueForConnect);
  const [flash, setFlash] = useState<string | null>(null);

  const clues = gameState.collectedClueIds.map(id => SL_CLUES[id]).filter(Boolean);
  const canReport = gameState.collectedClueIds.length >= 5;

  function handleClueClick(clueId: string) {
    if (!selected) {
      setSelected(clueId);
      onSelectClue(clueId);
    } else if (selected === clueId) {
      setSelected(null);
      onSelectClue(null);
    } else {
      const alreadyConnected = gameState.connections.some(
        ([a, b]) => (a === selected && b === clueId) || (a === clueId && b === selected)
      );
      if (!alreadyConnected) {
        onConnect(selected, clueId);
        setFlash(`${selected}↔${clueId}`);
        setTimeout(() => setFlash(null), 1500);
      }
      setSelected(null);
      onSelectClue(null);
    }
  }

  const selectedClue = selected ? SL_CLUES[selected] : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03070e',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Space Mono, monospace',
    }}>
      {/* Scanline */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none', zIndex: 100,
      }} />

      {/* Nav */}
      <div style={{
        padding: '0.6rem 1.2rem',
        background: 'rgba(3,8,18,0.98)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.1em',
              background: 'transparent',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'rgba(0,212,255,0.5)',
              padding: '0.35em 0.8em',
              cursor: 'pointer',
            }}
          >
            ← MAP
          </button>
          <div>
            <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em' }}>
              HELIOS-9 · INVESTIGATION
            </div>
            <div style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: '0.9rem',
              color: '#00d4ff',
              letterSpacing: '0.06em',
            }}>
              EVIDENCE BOARD
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.15em' }}>
            {clues.length}/7 ITEMS · {gameState.connections.length} LINKS
          </div>
          {canReport && (
            <button
              onClick={onReport}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                background: 'rgba(255,59,59,0.08)',
                border: '1px solid rgba(255,59,59,0.5)',
                color: '#ff3b3b',
                padding: '0.45em 1.2em',
                cursor: 'pointer',
                animation: 'blink 3s ease-in-out infinite',
              }}
            >
              FILE REPORT
            </button>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Evidence cards */}
        <div style={{ flex: 1, padding: '1.2rem 1.5rem', overflowY: 'auto' }}>

          {/* Instruction */}
          <div style={{
            fontSize: '0.5rem',
            color: 'rgba(138,184,208,0.3)',
            letterSpacing: '0.15em',
            marginBottom: '1rem',
            fontStyle: 'italic',
          }}>
            {selected
              ? `▸ ITEM SELECTED: ${selectedClue?.name.toUpperCase()} — click another item to link`
              : '▸ Click an evidence item to select · Click a second to create a link'
            }
          </div>

          {clues.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'rgba(138,184,208,0.2)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>◫</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                NO EVIDENCE COLLECTED
              </div>
              <div style={{ fontSize: '0.52rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                Investigate station sectors to find evidence
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.8rem',
            }}>
              {clues.map(clue => {
                const isSelected = selected === clue.id;
                const isFlashing = flash && (flash.includes(clue.id));
                const linkCount = gameState.connections.filter(([a, b]) => a === clue.id || b === clue.id).length;

                return (
                  <div
                    key={clue.id}
                    onClick={() => handleClueClick(clue.id)}
                    style={{
                      background: isSelected ? 'rgba(0,40,80,0.9)' : 'rgba(3,10,22,0.9)',
                      border: isSelected
                        ? '1px solid #00d4ff'
                        : isFlashing
                        ? '1px solid rgba(0,212,255,0.6)'
                        : '1px solid rgba(0,212,255,0.15)',
                      padding: '0.9rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.35)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,15,35,0.9)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.15)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(3,10,22,0.9)';
                      }
                    }}
                  >
                    {/* Corner brackets */}
                    <div style={{ position: 'absolute', top: 2, left: 2, width: 8, height: 8,
                      borderTop: '1px solid rgba(0,212,255,0.4)', borderLeft: '1px solid rgba(0,212,255,0.4)' }} />
                    <div style={{ position: 'absolute', bottom: 2, right: 2, width: 8, height: 8,
                      borderBottom: '1px solid rgba(0,212,255,0.4)', borderRight: '1px solid rgba(0,212,255,0.4)' }} />

                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: -1, right: 12,
                        background: '#00d4ff',
                        padding: '0.1em 0.4em',
                        fontSize: '0.4rem',
                        color: '#020c16',
                        letterSpacing: '0.1em',
                        fontWeight: 700,
                      }}>
                        SELECTED
                      </div>
                    )}

                    {/* Icon + name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', color: isSelected ? '#00d4ff' : 'rgba(0,180,220,0.6)' }}>
                        {clue.icon}
                      </span>
                      <div style={{
                        fontSize: '0.6rem',
                        color: isSelected ? '#00d4ff' : 'rgba(138,184,208,0.7)',
                        letterSpacing: '0.04em',
                        fontWeight: 700,
                      }}>
                        {clue.name}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.57rem',
                      lineHeight: 1.65,
                      color: 'rgba(138,184,208,0.5)',
                      marginBottom: '0.6rem',
                    }}>
                      {clue.description}
                    </p>

                    {/* Detail (expanded) */}
                    <p style={{
                      fontSize: '0.55rem',
                      lineHeight: 1.7,
                      color: 'rgba(138,184,208,0.35)',
                      borderTop: '1px solid rgba(0,212,255,0.06)',
                      paddingTop: '0.5rem',
                      marginBottom: '0.5rem',
                    }}>
                      {clue.detail}
                    </p>

                    {/* Footer */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.1em' }}>
                        Found: {clue.foundIn}
                      </div>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {clue.relatedCrew.map(crewId => (
                          <span key={crewId} style={{
                            fontSize: '0.4rem',
                            color: 'rgba(0,180,220,0.4)',
                            border: '1px solid rgba(0,180,220,0.15)',
                            padding: '0.1em 0.4em',
                            letterSpacing: '0.08em',
                          }}>
                            {CREW_LABELS[crewId] ?? crewId}
                          </span>
                        ))}
                      </div>
                    </div>

                    {linkCount > 0 && (
                      <div style={{
                        marginTop: '0.4rem',
                        fontSize: '0.42rem',
                        color: 'rgba(0,212,255,0.4)',
                        letterSpacing: '0.1em',
                      }}>
                        ◈ {linkCount} link{linkCount > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right sidebar: connections */}
        <div style={{
          width: 240,
          background: 'rgba(3,8,18,0.98)',
          borderLeft: '1px solid rgba(0,212,255,0.08)',
          padding: '1rem 0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
        }}>
          <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em' }}>
            EVIDENCE LINKS
          </div>

          {gameState.connections.length === 0 ? (
            <p style={{ fontSize: '0.55rem', color: 'rgba(138,184,208,0.2)', fontStyle: 'italic', lineHeight: 1.6 }}>
              Select two evidence items to link them. Connections help establish causality.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
              {gameState.connections.map(([a, b], i) => {
                const ca = SL_CLUES[a];
                const cb = SL_CLUES[b];
                if (!ca || !cb) return null;
                return (
                  <div key={i} style={{
                    padding: '0.5rem 0.6rem',
                    background: 'rgba(0,212,255,0.03)',
                    border: '1px solid rgba(0,212,255,0.1)',
                  }}>
                    <div style={{
                      fontSize: '0.48rem',
                      color: 'rgba(138,184,208,0.5)',
                      lineHeight: 1.5,
                    }}>
                      <span style={{ color: 'rgba(0,180,220,0.6)' }}>{ca.icon} {ca.name}</span>
                      <span style={{ color: 'rgba(0,212,255,0.2)', margin: '0 0.3rem' }}>↔</span>
                      <span style={{ color: 'rgba(0,180,220,0.6)' }}>{cb.icon} {cb.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary */}
          <div style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(0,212,255,0.08)',
            paddingTop: '0.8rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.35)' }}>Evidence</span>
              <span style={{ fontSize: '0.48rem', color: '#00d4ff' }}>{clues.length}/7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.35)' }}>Links</span>
              <span style={{ fontSize: '0.48rem', color: '#00d4ff' }}>{gameState.connections.length}</span>
            </div>

            {canReport ? (
              <button
                onClick={onReport}
                style={{
                  width: '100%',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.52rem',
                  letterSpacing: '0.15em',
                  background: 'rgba(255,59,59,0.08)',
                  border: '1px solid rgba(255,59,59,0.5)',
                  color: '#ff3b3b',
                  padding: '0.65em 1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                FILE REPORT →
              </button>
            ) : (
              <p style={{
                fontSize: '0.5rem',
                color: 'rgba(138,184,208,0.25)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                textAlign: 'center',
              }}>
                Collect {5 - clues.length} more evidence item{5 - clues.length !== 1 ? 's' : ''} to file a report
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
