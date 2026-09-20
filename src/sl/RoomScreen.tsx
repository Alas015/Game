import { useState } from 'react';
import type { SLGameState } from './slTypes';
import { SL_ROOMS, SL_CREW } from './slData';

interface RoomScreenProps {
  gameState: SLGameState;
  onBack: () => void;
  onCollectClue: (clueId: string) => void;
  onInspectItem: (itemId: string) => void;
  onAccessLog: (crewId: string) => void;
  onEvidence: () => void;
  onJournal: () => void;
}

const STATUS_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  nominal:  { text: '#00d4ff',  border: 'rgba(0,212,255,0.3)',   bg: 'rgba(0,212,255,0.05)'  },
  alert:    { text: '#ff9900',  border: 'rgba(255,153,0,0.35)',   bg: 'rgba(255,153,0,0.05)'  },
  critical: { text: '#ff3b3b',  border: 'rgba(255,59,59,0.4)',    bg: 'rgba(255,59,59,0.05)'  },
  offline:  { text: '#4a6070', border: 'rgba(74,96,112,0.3)',    bg: 'rgba(30,50,70,0.4)'    },
};

export default function RoomScreen({ gameState, onBack, onCollectClue, onInspectItem, onAccessLog, onEvidence, onJournal }: RoomScreenProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [newClue, setNewClue] = useState<string | null>(null);

  const room = gameState.roomId ? SL_ROOMS[gameState.roomId] : null;
  if (!room) return null;

  const sc = STATUS_COLORS[room.status];
  const activeItem = room.inspectItems.find(i => i.id === activeItemId);

  function handleInspect(itemId: string) {
    const item = room!.inspectItems.find(i => i.id === itemId);
    if (!item) return;
    setActiveItemId(itemId);
    onInspectItem(itemId);
    if (item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)) {
      onCollectClue(item.revealsClueId);
      setNewClue(item.revealsClueId);
      setTimeout(() => setNewClue(null), 3000);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03070e',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Space Mono, monospace',
      position: 'relative',
    }}>
      {/* Scanline */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none', zIndex: 100,
      }} />

      {/* Nav bar */}
      <div style={{
        padding: '0.6rem 1.2rem',
        background: 'rgba(3,8,18,0.98)',
        borderBottom: `1px solid ${sc.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
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
              transition: 'all 0.2s',
            }}
          >
            ← STATION MAP
          </button>
          <div>
            <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em' }}>
              HELIOS-9 · SECTOR
            </div>
            <div style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: '0.85rem',
              color: sc.text,
              letterSpacing: '0.06em',
            }}>
              {room.name.toUpperCase()}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25em 0.6em',
            border: `1px solid ${sc.border}`,
            background: sc.bg,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%', background: sc.text,
              animation: room.status === 'critical' ? 'blink 1s ease-in-out infinite' : 'none',
            }} />
            <span style={{ fontSize: '0.45rem', color: sc.text, letterSpacing: '0.15em' }}>
              {room.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onJournal}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.12em',
              background: 'transparent',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'rgba(0,212,255,0.5)',
              padding: '0.35em 0.7em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            LOGS
          </button>
          <button
            onClick={onEvidence}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.12em',
              background: 'transparent',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'rgba(0,212,255,0.5)',
              padding: '0.35em 0.7em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            EVIDENCE
          </button>
        </div>
      </div>

      {/* Clue notification */}
      {newClue && (
        <div style={{
          position: 'fixed',
          top: '5rem',
          right: '1.5rem',
          zIndex: 200,
          background: 'rgba(3,8,18,0.98)',
          border: '1px solid rgba(0,212,255,0.5)',
          padding: '0.8rem 1.2rem',
          boxShadow: '0 0 30px rgba(0,212,255,0.2)',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.6)', letterSpacing: '0.2em', marginBottom: '0.2rem' }}>
            ● EVIDENCE COLLECTED
          </div>
          <div style={{ fontSize: '0.62rem', color: '#00d4ff' }}>
            {newClue.replace(/-/g, ' ').toUpperCase()}
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: atmosphere + inspect items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Room atmosphere */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(0,212,255,0.06)',
            background: 'rgba(0,10,22,0.5)',
          }}>
            <p style={{
              fontSize: '0.7rem',
              lineHeight: 1.8,
              color: 'rgba(138,184,208,0.55)',
              fontStyle: 'italic',
              maxWidth: 680,
            }}>
              {room.atmosphere}
            </p>
          </div>

          {/* Inspect items grid */}
          <div style={{ flex: 1, padding: '1.2rem 1.5rem', overflowY: 'auto' }}>
            <div style={{
              fontSize: '0.48rem',
              color: 'rgba(0,212,255,0.3)',
              letterSpacing: '0.25em',
              marginBottom: '0.8rem',
            }}>
              ▸ ITEMS TO INVESTIGATE
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '0.7rem',
            }}>
              {room.inspectItems.map(item => {
                const isActive = activeItemId === item.id;
                const wasInspected = gameState.inspectedItemIds.includes(item.id);
                const revealsNew = item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleInspect(item.id)}
                    style={{
                      background: isActive ? 'rgba(0,30,60,0.9)' : 'rgba(3,10,22,0.8)',
                      border: isActive
                        ? '1px solid rgba(0,212,255,0.6)'
                        : revealsNew
                        ? '1px solid rgba(255,59,59,0.4)'
                        : '1px solid rgba(0,212,255,0.15)',
                      padding: '0.8rem 1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isActive ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.35)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,20,40,0.9)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = revealsNew ? 'rgba(255,59,59,0.4)' : 'rgba(0,212,255,0.15)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(3,10,22,0.8)';
                      }
                    }}
                  >
                    {/* Corner brackets */}
                    <div style={{ position: 'absolute', top: 2, left: 2, width: 6, height: 6,
                      borderTop: '1px solid rgba(0,212,255,0.3)', borderLeft: '1px solid rgba(0,212,255,0.3)' }} />
                    <div style={{ position: 'absolute', bottom: 2, right: 2, width: 6, height: 6,
                      borderBottom: '1px solid rgba(0,212,255,0.3)', borderRight: '1px solid rgba(0,212,255,0.3)' }} />

                    {revealsNew && (
                      <div style={{ position: 'absolute', top: 6, right: 8,
                        width: 6, height: 6, borderRadius: '50%', background: '#ff3b3b',
                        animation: 'blink 1.5s ease-in-out infinite' }} />
                    )}
                    {wasInspected && !revealsNew && (
                      <div style={{ position: 'absolute', top: 6, right: 8,
                        fontSize: '0.45rem', color: 'rgba(0,212,255,0.35)' }}>✓</div>
                    )}

                    <div style={{
                      fontSize: '0.6rem',
                      color: isActive ? '#00d4ff' : 'rgba(138,184,208,0.7)',
                      letterSpacing: '0.05em',
                      marginBottom: '0.3rem',
                      fontWeight: 700,
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontSize: '0.55rem',
                      color: 'rgba(138,184,208,0.4)',
                      lineHeight: 1.5,
                    }}>
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Crew log access */}
            {room.accessibleCrewIds.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
                  marginBottom: '0.8rem',
                }} />
                <div style={{
                  fontSize: '0.48rem',
                  color: 'rgba(0,212,255,0.3)',
                  letterSpacing: '0.25em',
                  marginBottom: '0.6rem',
                }}>
                  ▸ CREW LOG TERMINALS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {room.accessibleCrewIds.map(crewId => {
                    const crew = SL_CREW[crewId];
                    if (!crew) return null;
                    const reviewed = gameState.reviewedCrewIds.includes(crewId);

                    return (
                      <button
                        key={crewId}
                        onClick={() => onAccessLog(crewId)}
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.52rem',
                          letterSpacing: '0.1em',
                          background: reviewed ? 'rgba(0,20,40,0.6)' : 'rgba(0,212,255,0.05)',
                          border: reviewed ? '1px solid rgba(0,212,255,0.15)' : '1px solid rgba(0,212,255,0.3)',
                          color: reviewed ? 'rgba(0,180,220,0.5)' : 'rgba(0,212,255,0.7)',
                          padding: '0.5em 1em',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {reviewed && <span style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)' }}>✓</span>}
                        <span>
                          {crewId === 'aria' ? 'ARIA · SYSTEM LOGS' : `${crew.name.toUpperCase()} · PERSONAL LOGS`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: item detail panel */}
        <div style={{
          width: 320,
          background: 'rgba(3,8,18,0.98)',
          borderLeft: '1px solid rgba(0,212,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.2rem',
        }}>
          {activeItem ? (
            <>
              <div style={{
                fontSize: '0.48rem',
                color: 'rgba(0,212,255,0.35)',
                letterSpacing: '0.25em',
                marginBottom: '0.5rem',
              }}>
                ▸ INVESTIGATION REPORT
              </div>
              <div style={{
                fontFamily: 'Orbitron, Space Mono, monospace',
                fontSize: '0.7rem',
                color: '#00d4ff',
                marginBottom: '0.3rem',
                letterSpacing: '0.05em',
              }}>
                {activeItem.name.toUpperCase()}
              </div>
              <div style={{
                fontSize: '0.55rem',
                color: 'rgba(138,184,208,0.4)',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}>
                {activeItem.description}
              </div>
              <div style={{
                flex: 1,
                background: 'rgba(0,10,22,0.6)',
                border: '1px solid rgba(0,212,255,0.1)',
                padding: '0.8rem',
                position: 'relative',
                overflowY: 'auto',
              }}>
                {/* Corner */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8,
                  borderTop: '1px solid rgba(0,212,255,0.3)', borderLeft: '1px solid rgba(0,212,255,0.3)' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8,
                  borderBottom: '1px solid rgba(0,212,255,0.3)', borderRight: '1px solid rgba(0,212,255,0.3)' }} />

                <p style={{
                  fontSize: '0.65rem',
                  lineHeight: 1.85,
                  color: 'rgba(138,184,208,0.75)',
                }}>
                  {activeItem.text}
                </p>

                {activeItem.revealsClueId && gameState.collectedClueIds.includes(activeItem.revealsClueId) && (
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '0.7rem',
                    borderTop: '1px solid rgba(0,212,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff' }} />
                    <span style={{ fontSize: '0.5rem', color: '#00d4ff', letterSpacing: '0.15em' }}>
                      EVIDENCE FILED
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.3,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem', color: 'rgba(0,212,255,0.3)' }}>◫</div>
              <div style={{ fontSize: '0.52rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.2em', textAlign: 'center' }}>
                SELECT AN ITEM<br />TO INVESTIGATE
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
