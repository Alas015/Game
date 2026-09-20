import { useState } from 'react';
import type { SLReport } from './slTypes';
import { SL_EVENTS, SL_CAUSES, SL_RESPONSIBLE } from './slData';

interface ReportScreenProps {
  onSubmit: (report: SLReport) => void;
  onBack: () => void;
  collectedClueIds: string[];
}

export default function ReportScreen({ onSubmit, onBack, collectedClueIds }: ReportScreenProps) {
  const [eventId, setEventId] = useState<string>('');
  const [causeId, setCauseId] = useState<string>('');
  const [responsibleId, setResponsibleId] = useState<string>('');
  const [confirming, setConfirming] = useState(false);

  const canSubmit = eventId && causeId && responsibleId;

  function handleSubmit() {
    if (!canSubmit) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    onSubmit({ eventId, causeId, responsibleId });
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

      {/* Nav */}
      <div style={{
        padding: '0.6rem 1.2rem',
        background: 'rgba(3,8,18,0.98)',
        borderBottom: '1px solid rgba(255,59,59,0.2)',
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
            ← BACK
          </button>
          <div>
            <div style={{ fontSize: '0.45rem', color: 'rgba(255,59,59,0.4)', letterSpacing: '0.25em' }}>
              FLEET INCIDENT REPORT · FILE #HX-9-0061
            </div>
            <div style={{
              fontFamily: 'Orbitron, Space Mono, monospace',
              fontSize: '0.9rem',
              color: '#ff3b3b',
              letterSpacing: '0.06em',
            }}>
              FILE YOUR REPORT
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.48rem', color: 'rgba(138,184,208,0.3)', letterSpacing: '0.1em' }}>
          {collectedClueIds.length}/7 evidence items reviewed
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', maxWidth: 820, width: '100%', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem 1.2rem',
          background: 'rgba(255,59,59,0.04)',
          border: '1px solid rgba(255,59,59,0.15)',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 2, left: 2, width: 10, height: 10,
            borderTop: '1px solid rgba(255,59,59,0.4)', borderLeft: '1px solid rgba(255,59,59,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10,
            borderBottom: '1px solid rgba(255,59,59,0.4)', borderRight: '1px solid rgba(255,59,59,0.4)' }} />

          <div style={{ fontSize: '0.5rem', color: 'rgba(255,59,59,0.5)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
            INVESTIGATOR DIRECTIVE
          </div>
          <p style={{ fontSize: '0.65rem', lineHeight: 1.75, color: 'rgba(138,184,208,0.55)' }}>
            Based on your investigation of Helios-9, file a complete incident report for Fleet Command.
            Your report will determine the official cause of the incident and identify the responsible party.
            Review your evidence carefully. This report will be permanent.
          </p>
        </div>

        {/* Section 1: What happened */}
        <ReportSection
          number="01"
          title="WHAT HAPPENED TO THE CREW?"
          description="Identify the nature of the incident that resulted in crew incapacitation and station silence."
          options={SL_EVENTS}
          selected={eventId}
          onSelect={setEventId}
        />

        {/* Section 2: Root cause */}
        <ReportSection
          number="02"
          title="WHAT WAS THE ROOT CAUSE?"
          description="Identify the underlying cause that allowed the incident to escalate to this outcome."
          options={SL_CAUSES}
          selected={causeId}
          onSelect={setCauseId}
        />

        {/* Section 3: Responsible party */}
        <ReportSection
          number="03"
          title="WHO BEARS PRIMARY RESPONSIBILITY?"
          description="Identify the party whose decision or action was the primary driver of this outcome."
          options={SL_RESPONSIBLE}
          selected={responsibleId}
          onSelect={setResponsibleId}
        />

        {/* Summary */}
        {canSubmit && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem 1.2rem',
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.15)',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 2, left: 2, width: 8, height: 8,
              borderTop: '1px solid rgba(0,212,255,0.4)', borderLeft: '1px solid rgba(0,212,255,0.4)' }} />

            <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
              REPORT SUMMARY
            </div>
            {[
              { label: 'Incident type', value: SL_EVENTS.find(e => e.id === eventId)?.label ?? '' },
              { label: 'Root cause', value: SL_CAUSES.find(c => c.id === causeId)?.label ?? '' },
              { label: 'Responsible party', value: SL_RESPONSIBLE.find(r => r.id === responsibleId)?.label ?? '' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                marginBottom: '0.5rem',
              }}>
                <div style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em', flexShrink: 0, width: 120 }}>
                  {label}:
                </div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(138,184,208,0.6)', lineHeight: 1.5 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div style={{
          marginTop: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          {confirming && (
            <div style={{
              fontSize: '0.55rem',
              color: 'rgba(255,59,59,0.6)',
              fontStyle: 'italic',
              letterSpacing: '0.05em',
            }}>
              This action is permanent. Confirm?
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: canSubmit ? (confirming ? 'rgba(255,59,59,0.15)' : 'rgba(255,59,59,0.08)') : 'rgba(40,50,60,0.5)',
              border: canSubmit ? (confirming ? '1px solid #ff3b3b' : '1px solid rgba(255,59,59,0.5)') : '1px solid rgba(40,50,60,0.4)',
              color: canSubmit ? '#ff3b3b' : 'rgba(80,100,120,0.5)',
              padding: '0.75em 2.5em',
              cursor: canSubmit ? 'pointer' : 'default',
              transition: 'all 0.25s ease',
              boxShadow: canSubmit && confirming ? '0 0 20px rgba(255,59,59,0.2)' : 'none',
            }}
          >
            {confirming ? '▸ CONFIRM AND SUBMIT' : '▸ SUBMIT REPORT'}
          </button>
          {confirming && (
            <button
              onClick={() => setConfirming(false)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                background: 'transparent',
                border: '1px solid rgba(138,184,208,0.2)',
                color: 'rgba(138,184,208,0.4)',
                padding: '0.75em 1.5em',
                cursor: 'pointer',
              }}
            >
              CANCEL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section Component ──────────────────────────────────────────────────────────

function ReportSection({
  number,
  title,
  description,
  options,
  selected,
  onSelect,
}: {
  number: string;
  title: string;
  description: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{
      marginBottom: '1.5rem',
      background: 'rgba(3,10,22,0.8)',
      border: '1px solid rgba(0,212,255,0.1)',
      padding: '1.2rem 1.3rem',
      position: 'relative',
    }}>
      {/* Corner */}
      <div style={{ position: 'absolute', top: 2, left: 2, width: 10, height: 10,
        borderTop: '1px solid rgba(0,212,255,0.3)', borderLeft: '1px solid rgba(0,212,255,0.3)' }} />

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
        <div style={{
          fontFamily: 'Orbitron, Space Mono, monospace',
          fontSize: '1.1rem',
          color: 'rgba(0,212,255,0.15)',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          {number}
        </div>
        <div style={{ fontSize: '0.6rem', color: '#00d4ff', letterSpacing: '0.1em' }}>
          {title}
        </div>
      </div>
      <p style={{ fontSize: '0.57rem', color: 'rgba(138,184,208,0.4)', lineHeight: 1.65, marginBottom: '1rem' }}>
        {description}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {options.map(opt => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.65em 0.9em',
                background: isSelected ? 'rgba(0,30,60,0.9)' : 'transparent',
                border: isSelected ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(0,212,255,0.06)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontFamily: 'Space Mono, monospace',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,15,35,0.6)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.2)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.06)';
                }
              }}
            >
              {/* Radio indicator */}
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: isSelected ? '2px solid #00d4ff' : '1px solid rgba(0,212,255,0.25)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                {isSelected && (
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#00d4ff' }} />
                )}
              </div>
              <span style={{
                fontSize: '0.58rem',
                color: isSelected ? 'rgba(138,184,208,0.8)' : 'rgba(138,184,208,0.4)',
                lineHeight: 1.5,
                transition: 'color 0.2s ease',
              }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
