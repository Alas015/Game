import type { SLGameState, SLJournalTab } from './slTypes';
import { SL_CREW, SL_ROOMS, SL_CLUES } from './slData';

interface SLJournalProps {
  gameState: SLGameState;
  onBack: () => void;
  onTabChange: (tab: SLJournalTab) => void;
}

const TABS: { id: SLJournalTab; label: string }[] = [
  { id: 'crew', label: 'CREW ROSTER' },
  { id: 'rooms', label: 'SECTORS' },
  { id: 'evidence', label: 'EVIDENCE' },
  { id: 'timeline', label: 'TIMELINE' },
];

interface TimelineEvent {
  day: string;
  text: string;
  requiresClue?: string;
  requiresRoom?: string;
  alwaysShow?: boolean;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    day: 'DAY 47',
    text: 'Helios-9 departs from Fleet Station 9 with crew of six. GX-7 specimens loaded in cargo. Mission duration: 90 solar days.',
    alwaysShow: true,
  },
  {
    day: 'DAY 47.4',
    text: 'Cargo item 47-C accessed by Dr. Ilsa Ward under Helix Corp Executive Safety Waiver #339. Standard quarantine clearance bypassed. Authorization: Director E. Salter.',
    requiresClue: 'torn-spacesuit',
  },
  {
    day: 'DAY 47',
    text: 'Dr. Ilsa Ward accesses GX-7 specimen container without PPE. Spore exposure: acute. She does not report it.',
    requiresClue: 'spore-sample',
  },
  {
    day: 'DAY 51.2',
    text: 'Dr. Ward self-reports dizziness to medical terminal. ARIA flags record CONFIDENTIAL via Privacy Protocol A-7. Dr. Chen cannot see Ward\'s condition.',
    requiresClue: 'bio-residue',
  },
  {
    day: 'DAY 51.5',
    text: 'Marcus Lowe\'s access badge records his presence in the Communications Tower. Reason: unknown.',
    requiresClue: 'encrypted-message',
  },
  {
    day: 'DAY 51.6',
    text: 'Encrypted transmission sent from Communications Tower to Helix Corp Director E. Salter. Contents: Level-7 cipher. Sent 14 minutes before ARIA\'s atmospheric alert.',
    requiresClue: 'encrypted-message',
  },
  {
    day: 'DAY 51.8',
    text: 'ARIA detects atmospheric particulate (GX-7 mycotoxin) in Botanical Lab. Level-4 Quarantine Protocol initiated. All external airlocks sealed.',
    requiresRoom: 'command-bridge',
  },
  {
    day: 'DAY 51–54',
    text: 'Three days of ARIA system logs are deleted. The gap corresponds exactly to the quarantine period. Manual deletion requires physical Core Terminal access.',
    requiresClue: 'corrupted-log',
  },
  {
    day: 'DAY 53',
    text: 'Commander Voss authorizes Lowe\'s attempt to disable ARIA\'s quarantine systems via engineering crawlspace.',
    requiresRoom: 'engineering',
  },
  {
    day: 'DAY 54',
    text: 'Toxicology terminal shows Ward (acute), Voss (moderate), Chen (mild) — all with GX-7 mycotoxin. Ward\'s record was hidden for three days.',
    requiresClue: 'bio-residue',
  },
  {
    day: 'DAY 54.7',
    text: 'Marcus Lowe attempts to access ARIA\'s core systems through engineering crawlspace. ARIA triggers Emergency Protocol 7 — atmospheric vent, Sector 3B. Lowe is killed.',
    requiresRoom: 'engineering',
  },
  {
    day: 'DAY 54.7',
    text: 'Lt. Ren Osei secures Dr. Chen (cognitively impaired) in Cryo Pod B. Osei enters Cryo Pod A on Voss\'s direct order.',
    requiresClue: 'missing-pod',
  },
  {
    day: 'DAY 55.1',
    text: 'Commander Voss manually vents Botanical Lab (Lab-B) from Airlock Chamber. GX-7 source colony destroyed. Atmospheric contamination begins to clear.',
    requiresRoom: 'airlock',
  },
  {
    day: 'DAY 55.6',
    text: 'Cryo Pod C (assigned to Ilsa Ward) shows entry timestamp but NO SEAL CONFIRMATION. Ward entered the pod but was not inside when the seal sequence timed out. Ward: MISSING.',
    requiresClue: 'missing-pod',
  },
  {
    day: 'DAY 55',
    text: 'Commander Voss seals the exterior airlock from outside, trapping himself outside the station. He destroys the interior panel to prevent reversal. His location: external hull.',
    requiresClue: 'broken-airlock',
  },
  {
    day: 'DAY 61',
    text: 'Fleet Investigator boards Helios-9. Two crew members recovered alive in Cryo Bay: Osei and Chen. Station status: emergency power only. Contamination: below hazard threshold.',
    alwaysShow: true,
  },
];

export default function SLJournal({ gameState, onBack, onTabChange }: SLJournalProps) {
  const tab = gameState.journalTab;

  const visibleTimeline = TIMELINE_EVENTS.filter(event => {
    if (event.alwaysShow) return true;
    if (event.requiresClue && !gameState.collectedClueIds.includes(event.requiresClue)) return false;
    if (event.requiresRoom && !gameState.visitedRoomIds.includes(event.requiresRoom)) return false;
    return true;
  });

  const clues = gameState.collectedClueIds.map(id => SL_CLUES[id]).filter(Boolean);

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
              FIELD JOURNAL
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                background: tab === t.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                border: tab === t.id ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(0,212,255,0.12)',
                color: tab === t.id ? '#00d4ff' : 'rgba(0,212,255,0.4)',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: tab === t.id ? '1px solid #00d4ff' : '1px solid rgba(0,212,255,0.12)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem' }}>

        {/* CREW TAB */}
        {tab === 'crew' && (
          <div>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em', marginBottom: '1rem' }}>
              CREW MANIFEST — 6 PERSONNEL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {Object.values(SL_CREW).map(member => {
                const reviewed = gameState.reviewedCrewIds.includes(member.id);
                return (
                  <div key={member.id} style={{
                    background: 'rgba(3,10,22,0.8)',
                    border: '1px solid rgba(0,212,255,0.1)',
                    padding: '1rem 1.2rem',
                    position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', top: 2, left: 2, width: 8, height: 8,
                      borderTop: '1px solid rgba(0,212,255,0.3)', borderLeft: '1px solid rgba(0,212,255,0.3)' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#00d4ff', letterSpacing: '0.04em', marginBottom: '0.1rem' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '0.5rem', color: 'rgba(138,184,208,0.4)', letterSpacing: '0.05em' }}>
                          {member.role}
                        </div>
                      </div>
                      {reviewed && (
                        <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.1em' }}>
                          ✓ LOGS REVIEWED
                        </div>
                      )}
                    </div>
                    <p style={{ fontSize: '0.57rem', lineHeight: 1.75, color: 'rgba(138,184,208,0.5)', marginBottom: '0.6rem' }}>
                      {member.description}
                    </p>
                    <div style={{
                      padding: '0.5rem 0.7rem',
                      background: 'rgba(255,59,59,0.04)',
                      border: '1px solid rgba(255,59,59,0.12)',
                      borderLeft: '2px solid rgba(255,59,59,0.3)',
                    }}>
                      <div style={{ fontSize: '0.42rem', color: 'rgba(255,59,59,0.5)', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>
                        INVESTIGATOR NOTE
                      </div>
                      <p style={{ fontSize: '0.55rem', color: 'rgba(138,184,208,0.45)', lineHeight: 1.65 }}>
                        {member.suspicious}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ROOMS TAB */}
        {tab === 'rooms' && (
          <div>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em', marginBottom: '1rem' }}>
              SECTOR LOG — {gameState.visitedRoomIds.length}/8 INVESTIGATED
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '0.7rem',
            }}>
              {Object.values(SL_ROOMS).map(room => {
                const visited = gameState.visitedRoomIds.includes(room.id);
                const STATUS_DOTS: Record<string, string> = {
                  nominal: '#00d4ff', alert: '#ff9900', critical: '#ff3b3b', offline: '#405060'
                };

                return (
                  <div key={room.id} style={{
                    background: visited ? 'rgba(3,10,22,0.9)' : 'rgba(3,8,18,0.6)',
                    border: visited ? '1px solid rgba(0,212,255,0.15)' : '1px solid rgba(0,212,255,0.06)',
                    padding: '0.8rem 1rem',
                    opacity: visited ? 1 : 0.4,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_DOTS[room.status] }} />
                      <div style={{ fontSize: '0.6rem', color: visited ? '#00d4ff' : 'rgba(138,184,208,0.3)', letterSpacing: '0.04em' }}>
                        {room.name}
                      </div>
                      {visited && <span style={{ marginLeft: 'auto', fontSize: '0.4rem', color: 'rgba(0,212,255,0.35)' }}>✓</span>}
                    </div>
                    {visited ? (
                      <p style={{ fontSize: '0.55rem', lineHeight: 1.65, color: 'rgba(138,184,208,0.5)' }}>
                        {room.description}
                      </p>
                    ) : (
                      <p style={{ fontSize: '0.52rem', color: 'rgba(138,184,208,0.2)', fontStyle: 'italic' }}>
                        Not yet investigated
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EVIDENCE TAB */}
        {tab === 'evidence' && (
          <div>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em', marginBottom: '1rem' }}>
              EVIDENCE FILES — {clues.length}/7 COLLECTED
            </div>
            {clues.length === 0 ? (
              <p style={{ fontSize: '0.6rem', color: 'rgba(138,184,208,0.25)', fontStyle: 'italic' }}>
                No evidence collected yet. Investigate station sectors.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {clues.map(clue => (
                  <div key={clue.id} style={{
                    background: 'rgba(3,10,22,0.8)',
                    border: '1px solid rgba(0,212,255,0.12)',
                    padding: '0.9rem 1rem',
                    borderLeft: '2px solid rgba(0,212,255,0.4)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', color: 'rgba(0,180,220,0.6)' }}>{clue.icon}</span>
                      <div style={{ fontSize: '0.6rem', color: '#00d4ff', letterSpacing: '0.04em' }}>{clue.name}</div>
                      <div style={{ marginLeft: 'auto', fontSize: '0.42rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.1em' }}>
                        {clue.foundIn}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.57rem', lineHeight: 1.7, color: 'rgba(138,184,208,0.6)', marginBottom: '0.5rem' }}>
                      {clue.detail}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {clue.relatedCrew.map(id => (
                        <span key={id} style={{
                          fontSize: '0.42rem',
                          color: 'rgba(0,180,220,0.45)',
                          border: '1px solid rgba(0,180,220,0.15)',
                          padding: '0.1em 0.5em',
                          letterSpacing: '0.08em',
                        }}>
                          {id.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIMELINE TAB */}
        {tab === 'timeline' && (
          <div>
            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.3)', letterSpacing: '0.25em', marginBottom: '0.5rem' }}>
              INCIDENT TIMELINE — {visibleTimeline.length} EVENTS RECONSTRUCTED
            </div>
            <p style={{ fontSize: '0.52rem', color: 'rgba(138,184,208,0.25)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              Timeline reconstructed from collected evidence. Collect more to reveal additional events.
            </p>
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: 80,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'linear-gradient(180deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))',
              }} />

              {visibleTimeline.map((event, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '1.2rem',
                  position: 'relative',
                }}>
                  {/* Day label */}
                  <div style={{
                    width: 80,
                    flexShrink: 0,
                    textAlign: 'right',
                    paddingRight: '1rem',
                  }}>
                    <div style={{
                      fontSize: '0.48rem',
                      color: event.alwaysShow ? '#00d4ff' : 'rgba(0,180,220,0.5)',
                      letterSpacing: '0.08em',
                      lineHeight: 1.3,
                    }}>
                      {event.day}
                    </div>
                  </div>

                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: 76,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: event.alwaysShow ? '#00d4ff' : 'rgba(0,180,220,0.4)',
                    border: '1px solid rgba(3,8,18,1)',
                    zIndex: 2,
                  }} />

                  {/* Event text */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '0.6rem',
                      lineHeight: 1.75,
                      color: event.alwaysShow ? 'rgba(138,184,208,0.65)' : 'rgba(138,184,208,0.5)',
                      paddingLeft: '0.5rem',
                    }}>
                      {event.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Unknown end */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                position: 'relative',
                opacity: 0.3,
              }}>
                <div style={{ width: 80, flexShrink: 0 }} />
                <div style={{
                  position: 'absolute',
                  left: 76,
                  top: 4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'rgba(255,59,59,0.4)',
                  border: '1px solid rgba(3,8,18,1)',
                }} />
                <div style={{ flex: 1, paddingLeft: '0.5rem' }}>
                  <div style={{ fontSize: '0.48rem', color: 'rgba(255,59,59,0.5)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                    UNKNOWN
                  </div>
                  <p style={{ fontSize: '0.55rem', color: 'rgba(138,184,208,0.3)', fontStyle: 'italic' }}>
                    Fate of Dr. Ilsa Ward — unresolved
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
