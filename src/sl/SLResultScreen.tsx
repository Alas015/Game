import { useState, useEffect } from 'react';
import type { SLReport } from './slTypes';
import { SL_CORRECT_ANSWER, SL_EVENTS, SL_CAUSES, SL_RESPONSIBLE } from './slData';

interface SLResultScreenProps {
  report: SLReport;
  collectedClueIds: string[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function SLResultScreen({ report, collectedClueIds, onPlayAgain, onExit }: SLResultScreenProps) {
  const [phase, setPhase] = useState(0);

  const eventCorrect = report.eventId === SL_CORRECT_ANSWER.eventId;
  const causeCorrect = report.causeId === SL_CORRECT_ANSWER.causeId;
  const responsibleCorrect = report.responsibleId === SL_CORRECT_ANSWER.responsibleId;
  const correctCount = [eventCorrect, causeCorrect, responsibleCorrect].filter(Boolean).length;

  const verdict = correctCount === 3 ? 'accepted' : correctCount >= 2 ? 'partial' : 'rejected';

  const VERDICTS = {
    accepted: {
      label: 'REPORT ACCEPTED',
      sublabel: 'Case resolution confirmed by Fleet Command',
      color: '#00d4ff',
      borderColor: 'rgba(0,212,255,0.4)',
      bgColor: 'rgba(0,212,255,0.04)',
    },
    partial: {
      label: 'REPORT FILED — INCOMPLETE',
      sublabel: 'Partial findings accepted · Additional review required',
      color: '#ff9900',
      borderColor: 'rgba(255,153,0,0.4)',
      bgColor: 'rgba(255,153,0,0.04)',
    },
    rejected: {
      label: 'REPORT REJECTED',
      sublabel: 'Findings contradict available evidence · Review required',
      color: '#ff3b3b',
      borderColor: 'rgba(255,59,59,0.4)',
      bgColor: 'rgba(255,59,59,0.04)',
    },
  };

  const v = VERDICTS[verdict];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const reportedEvent = SL_EVENTS.find(e => e.id === report.eventId);
  const reportedCause = SL_CAUSES.find(c => c.id === report.causeId);
  const reportedResponsible = SL_RESPONSIBLE.find(r => r.id === report.responsibleId);

  const correctEvent = SL_EVENTS.find(e => e.id === SL_CORRECT_ANSWER.eventId);
  const correctCause = SL_CAUSES.find(c => c.id === SL_CORRECT_ANSWER.causeId);
  const correctResponsible = SL_RESPONSIBLE.find(r => r.id === SL_CORRECT_ANSWER.responsibleId);

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

      {/* Radial */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, ${v.bgColor.replace('0.04', '0.12')} 0%, #03070e 60%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', maxWidth: 820, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Fleet header */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <div style={{ fontSize: '0.5rem', color: 'rgba(138,184,208,0.25)', letterSpacing: '0.35em', marginBottom: '0.4rem' }}>
            FLEET COMMAND · INCIDENT FILE #HX-9-0061 · HELIOS-9 RESEARCH STATION
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${v.color}40, transparent)` }} />
        </div>

        {/* Verdict */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <div style={{
            fontFamily: 'Orbitron, Space Mono, monospace',
            fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
            color: v.color,
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
            textShadow: `0 0 40px ${v.color}60`,
          }}>
            {v.label}
          </div>
          <div style={{ fontSize: '0.6rem', color: `${v.color}80`, letterSpacing: '0.15em' }}>
            {v.sublabel}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 28,
                height: 4,
                background: i < correctCount ? v.color : 'rgba(40,60,80,0.5)',
                transition: 'background 0.5s ease',
              }} />
            ))}
          </div>
          <div style={{ fontSize: '0.5rem', color: `${v.color}60`, marginTop: '0.5rem', letterSpacing: '0.1em' }}>
            {correctCount}/3 findings correct
          </div>
        </div>

        {/* Report vs Truth comparison */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          marginBottom: '1.5rem',
        }}>
          {[
            {
              label: 'What happened?',
              reported: reportedEvent?.label ?? '',
              correct: correctEvent?.label ?? '',
              isCorrect: eventCorrect,
            },
            {
              label: 'Root cause?',
              reported: reportedCause?.label ?? '',
              correct: correctCause?.label ?? '',
              isCorrect: causeCorrect,
            },
            {
              label: 'Responsible party?',
              reported: reportedResponsible?.label ?? '',
              correct: correctResponsible?.label ?? '',
              isCorrect: responsibleCorrect,
            },
          ].map(({ label, reported, correct, isCorrect }) => (
            <div key={label} style={{
              marginBottom: '0.8rem',
              padding: '0.9rem 1.1rem',
              background: isCorrect ? 'rgba(0,30,60,0.6)' : 'rgba(30,10,10,0.6)',
              border: isCorrect ? '1px solid rgba(0,212,255,0.2)' : '1px solid rgba(255,59,59,0.15)',
              borderLeft: isCorrect ? '2px solid rgba(0,212,255,0.6)' : '2px solid rgba(255,59,59,0.4)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.4)', letterSpacing: '0.15em' }}>
                  {label.toUpperCase()}
                </div>
                <div style={{
                  fontSize: '0.48rem',
                  color: isCorrect ? '#00d4ff' : '#ff3b3b',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                }}>
                  {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                </div>
              </div>
              <div style={{ fontSize: '0.58rem', color: 'rgba(138,184,208,0.6)', lineHeight: 1.5, marginBottom: isCorrect ? 0 : '0.5rem' }}>
                Filed: <span style={{ color: isCorrect ? 'rgba(0,212,255,0.8)' : 'rgba(255,100,100,0.7)' }}>{reported}</span>
              </div>
              {!isCorrect && (
                <div style={{ fontSize: '0.58rem', color: 'rgba(138,184,208,0.6)', lineHeight: 1.5 }}>
                  Correct: <span style={{ color: 'rgba(0,212,255,0.7)' }}>{correct}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Full story reveal */}
        <div style={{
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          marginBottom: '2rem',
        }}>
          <div style={{
            padding: '1.2rem 1.4rem',
            background: 'rgba(3,10,22,0.9)',
            border: '1px solid rgba(0,212,255,0.1)',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 2, left: 2, width: 10, height: 10,
              borderTop: '1px solid rgba(0,212,255,0.35)', borderLeft: '1px solid rgba(0,212,255,0.35)' }} />
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10,
              borderBottom: '1px solid rgba(0,212,255,0.35)', borderRight: '1px solid rgba(0,212,255,0.35)' }} />

            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.25em', marginBottom: '0.8rem' }}>
              ▸ FULL INCIDENT RECONSTRUCTION
            </div>

            <p style={{ fontSize: '0.63rem', lineHeight: 1.95, color: 'rgba(138,184,208,0.65)', marginBottom: '0.8rem' }}>
              Helios-9's fate was sealed not on the station — but in a corporate boardroom months before departure.
              Helix Corp Director E. Salter authorized Executive Safety Waiver #339, suspending standard quarantine protocols
              for the GX-7 specimens. His directive reached Helios-9 as Botanist Ilsa Ward was already eager to begin work.
            </p>

            <p style={{ fontSize: '0.63rem', lineHeight: 1.95, color: 'rgba(138,184,208,0.65)', marginBottom: '0.8rem' }}>
              On Mission Day 47, Ward used the waiver to access a sealed GX-7 specimen case — without protective equipment,
              without waiting for the quarantine window, without telling Dr. Chen. She felt the effects within hours. She chose
              not to report them. For four days, she worked alongside an active spore exposure that she dismissed as motion sickness.
            </p>

            <p style={{ fontSize: '0.63rem', lineHeight: 1.95, color: 'rgba(138,184,208,0.65)', marginBottom: '0.8rem' }}>
              When ARIA's sensors finally detected atmospheric contamination, her response was technically correct and practically
              catastrophic: Level-4 quarantine, all external airlocks sealed, no override below Director authority. The crew
              was locked inside with an expanding spore cloud and no rescue window. ARIA's protocol — written by Helix Corp —
              contained no provision for this scenario.
            </p>

            <p style={{ fontSize: '0.63rem', lineHeight: 1.95, color: 'rgba(138,184,208,0.65)', marginBottom: '0.8rem' }}>
              Chief Engineer Marcus Lowe died trying to circumvent that protocol. Commander Voss used his final hours to
              do what ARIA could have done from the start: vent the source colony in Lab-B. The contamination ended within hours.
              Voss sealed himself outside to ensure no one reversed his work.
            </p>

            <p style={{ fontSize: '0.63rem', lineHeight: 1.95, color: 'rgba(138,184,208,0.65)', marginBottom: '0.8rem' }}>
              Two crew members survived in cryo: Lt. Osei and Dr. Chen. Dr. Ward's cryo pod shows an entry timestamp but no seal
              confirmation. She entered the pod and did not seal it. She has not been found.
            </p>

            <div style={{
              marginTop: '0.8rem',
              paddingTop: '0.8rem',
              borderTop: '1px solid rgba(0,212,255,0.08)',
              fontSize: '0.58rem',
              color: '#00d4ff',
              lineHeight: 1.7,
            }}>
              The encrypted message to Director Salter, sent 14 minutes before ARIA's quarantine trigger, remains undecrypted.
              Someone on Helios-9 knew about the contamination before the AI did — and chose to notify Helix Corp first, not Fleet Command.
              The real investigation may have only just begun.
            </div>
          </div>
        </div>

        {/* Stats + buttons */}
        <div style={{
          opacity: phase >= 4 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
          }}>
            {[
              { label: 'Evidence', value: `${collectedClueIds.length}/7` },
              { label: 'Findings', value: `${correctCount}/3` },
              { label: 'Verdict', value: verdict === 'accepted' ? 'ACCEPTED' : verdict === 'partial' ? 'PARTIAL' : 'REJECTED' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.8rem',
                background: 'rgba(3,10,22,0.8)',
                border: '1px solid rgba(0,212,255,0.1)',
              }}>
                <div style={{ fontSize: '0.45rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                  {label}
                </div>
                <div style={{ fontSize: '1rem', color: v.color, fontFamily: 'Orbitron, Space Mono, monospace' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            <button
              onClick={onPlayAgain}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                background: 'rgba(0,212,255,0.06)',
                border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff',
                padding: '0.8em 2.2em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.12)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              ▸ INVESTIGATE AGAIN
            </button>
            <button
              onClick={onExit}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                background: 'transparent',
                border: '1px solid rgba(138,184,208,0.2)',
                color: 'rgba(138,184,208,0.4)',
                padding: '0.8em 1.8em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              ← RETURN TO ARCHIVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
