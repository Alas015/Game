import { useState, useRef, useEffect } from 'react';
import type { SLGameState } from './slTypes';
import { SL_CREW } from './slData';
import CrewPortrait from './CrewPortrait';

interface LogScreenProps {
  gameState: SLGameState;
  onBack: () => void;
}

export default function LogScreen({ gameState, onBack }: LogScreenProps) {
  const [selectedCrewId, setSelectedCrewId] = useState<string>(gameState.crewId ?? '');
  const [revealedEntries, setRevealedEntries] = useState<number>(1);
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const crew = SL_CREW[selectedCrewId];
  const logs = crew?.logs ?? [];

  useEffect(() => {
    setRevealedEntries(1);
    setIsTyping(false);
  }, [selectedCrewId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [revealedEntries]);

  function handleRevealNext() {
    if (revealedEntries < logs.length) {
      setIsTyping(true);
      setTimeout(() => {
        setRevealedEntries(r => r + 1);
        setIsTyping(false);
      }, 600);
    }
  }

  const crewList = Object.values(SL_CREW);

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
              transition: 'all 0.2s',
            }}
          >
            ← BACK
          </button>
          <div>
            <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em' }}>
              HELIOS-9 · PERSONAL LOG ARCHIVE
            </div>
            <div style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: '0.85rem',
              color: '#00d4ff',
              letterSpacing: '0.06em',
            }}>
              CREW TERMINAL
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.48rem', color: 'rgba(255,59,59,0.4)', letterSpacing: '0.15em' }}>
          ● ENCRYPTED RECORDS — INVESTIGATOR ACCESS
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Crew list sidebar */}
        <div style={{
          width: 220,
          background: 'rgba(3,8,18,0.98)',
          borderRight: '1px solid rgba(0,212,255,0.08)',
          padding: '1rem 0.8rem',
          overflowY: 'auto',
        }}>
          <div style={{
            fontSize: '0.45rem',
            color: 'rgba(0,212,255,0.3)',
            letterSpacing: '0.25em',
            marginBottom: '0.8rem',
          }}>
            SELECT CREW MEMBER
          </div>
          {crewList.map(member => {
            const isSelected = selectedCrewId === member.id;
            const wasReviewed = gameState.reviewedCrewIds.includes(member.id);

            return (
              <button
                key={member.id}
                onClick={() => setSelectedCrewId(member.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 0.7rem',
                  marginBottom: '0.3rem',
                  background: isSelected ? 'rgba(0,30,60,0.8)' : 'transparent',
                  border: isSelected ? '1px solid rgba(0,212,255,0.35)' : '1px solid rgba(0,212,255,0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.2)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,15,30,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.08)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {/* Mini portrait */}
                <div style={{ flexShrink: 0, opacity: isSelected ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                  <CrewPortrait crewId={member.id} size={36} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.52rem',
                    color: isSelected ? '#00d4ff' : 'rgba(138,184,208,0.5)',
                    letterSpacing: '0.04em',
                    marginBottom: '0.1rem',
                    lineHeight: 1.2,
                  }}>
                    {member.id === 'aria' ? 'ARIA' : member.name.split(' ').pop()?.toUpperCase()}
                  </div>
                  <div style={{
                    fontSize: '0.42rem',
                    color: 'rgba(138,184,208,0.3)',
                    letterSpacing: '0.03em',
                    lineHeight: 1.2,
                  }}>
                    {member.id === 'aria' ? 'SYSTEM AI' : member.role.split('—')[0].trim()}
                  </div>
                  {wasReviewed && (
                    <div style={{ fontSize: '0.4rem', color: 'rgba(0,212,255,0.3)', marginTop: '0.15rem' }}>✓ REVIEWED</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Log panel */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Portrait + bio */}
          {crew && (
            <>
              <div style={{
                width: 220,
                padding: '1.2rem 1rem',
                background: 'rgba(0,6,16,0.8)',
                borderRight: '1px solid rgba(0,212,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <CrewPortrait crewId={selectedCrewId} size={100} />
                </div>
                <div>
                  <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.2em', marginBottom: '0.3rem' }}>
                    CREW PROFILE
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#00d4ff', marginBottom: '0.2rem', letterSpacing: '0.03em' }}>
                    {crew.name}
                  </div>
                  <div style={{ fontSize: '0.5rem', color: 'rgba(138,184,208,0.45)', marginBottom: '0.8rem', lineHeight: 1.4 }}>
                    {crew.role}
                  </div>
                  <div style={{
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
                    marginBottom: '0.7rem',
                  }} />
                  <p style={{ fontSize: '0.57rem', lineHeight: 1.75, color: 'rgba(138,184,208,0.5)' }}>
                    {crew.description}
                  </p>
                </div>
                <div style={{
                  marginTop: 'auto',
                  padding: '0.6rem',
                  background: 'rgba(255,59,59,0.04)',
                  border: '1px solid rgba(255,59,59,0.15)',
                }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,59,59,0.5)', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                    INVESTIGATOR NOTE
                  </div>
                  <p style={{ fontSize: '0.55rem', color: 'rgba(138,184,208,0.45)', lineHeight: 1.65 }}>
                    {crew.suspicious}
                  </p>
                </div>
              </div>

              {/* Log entries */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{
                  padding: '0.7rem 1.2rem',
                  background: 'rgba(0,6,16,0.5)',
                  borderBottom: '1px solid rgba(0,212,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em' }}>
                    {crew.id === 'aria' ? '▸ SYSTEM LOGS' : `▸ ${crew.name.toUpperCase()} — PERSONAL LOG`}
                  </div>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(138,184,208,0.3)' }}>
                    {revealedEntries}/{logs.length} entries
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
                  {logs.slice(0, revealedEntries).map((entry, idx) => (
                    <div
                      key={entry.id}
                      style={{
                        marginBottom: '1.2rem',
                        animation: idx === revealedEntries - 1 ? 'fadeIn 0.5s ease' : 'none',
                      }}
                    >
                      {/* Timestamp */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '0.5rem',
                      }}>
                        <div style={{
                          fontSize: '0.5rem',
                          color: '#00d4ff',
                          letterSpacing: '0.15em',
                          whiteSpace: 'nowrap',
                        }}>
                          ▸ {entry.timestamp}
                        </div>
                        <div style={{
                          flex: 1,
                          height: 1,
                          background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
                        }} />
                      </div>

                      {/* Log text */}
                      <div style={{
                        padding: '0.8rem 1rem',
                        background: crew.id === 'aria' ? 'rgba(0,12,28,0.8)' : 'rgba(0,8,20,0.7)',
                        border: crew.id === 'aria' ? '1px solid rgba(0,212,255,0.15)' : '1px solid rgba(0,150,180,0.12)',
                        borderLeft: crew.id === 'aria' ? '2px solid rgba(0,212,255,0.4)' : '2px solid rgba(0,150,180,0.3)',
                        position: 'relative',
                      }}>
                        <p style={{
                          fontSize: '0.65rem',
                          lineHeight: 1.9,
                          color: crew.id === 'aria' ? 'rgba(0,212,255,0.75)' : 'rgba(138,184,208,0.7)',
                          fontStyle: crew.id === 'aria' ? 'normal' : 'italic',
                        }}>
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0,12,28,0.6)',
                      border: '1px solid rgba(0,212,255,0.1)',
                      marginBottom: '1rem',
                    }}>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.4)' }}>
                        ▌ loading next entry...
                      </span>
                    </div>
                  )}

                  <div ref={logEndRef} />
                </div>

                {/* Controls */}
                <div style={{
                  padding: '0.8rem 1.5rem',
                  borderTop: '1px solid rgba(0,212,255,0.06)',
                  background: 'rgba(3,8,18,0.98)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.3)', fontStyle: 'italic' }}>
                    {revealedEntries < logs.length
                      ? `${logs.length - revealedEntries} entries remaining`
                      : 'All entries reviewed'
                    }
                  </div>
                  {revealedEntries < logs.length ? (
                    <button
                      onClick={handleRevealNext}
                      disabled={isTyping}
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        background: 'rgba(0,212,255,0.06)',
                        border: '1px solid rgba(0,212,255,0.35)',
                        color: '#00d4ff',
                        padding: '0.5em 1.2em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: isTyping ? 0.4 : 1,
                      }}
                    >
                      ▸ NEXT ENTRY
                    </button>
                  ) : (
                    <div style={{
                      fontSize: '0.5rem',
                      color: 'rgba(0,212,255,0.35)',
                      letterSpacing: '0.15em',
                    }}>
                      ✓ LOG COMPLETE
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
