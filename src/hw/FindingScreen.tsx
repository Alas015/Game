import { useState } from 'react';
import type { HWFinding } from './hwTypes';
import { HW_EVENTS, HW_CAUSES, HW_RESPONSIBLE } from './hwData';

interface FindingScreenProps {
  onSubmit: (finding: HWFinding) => void;
  onBack: () => void;
  collectedClueIds: string[];
}

export default function FindingScreen({ onSubmit, onBack, collectedClueIds }: FindingScreenProps) {
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
    <div style={{ minHeight: '100vh', background: '#03090a', display: 'flex', flexDirection: 'column', fontFamily: "'IM Fell English', serif", position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(180,60,50,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 100 }} />

      {/* Nav */}
      <div style={{ padding: '0.6rem 1.2rem', background: 'rgba(4,10,8,0.98)', borderBottom: '1px solid rgba(180,60,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(90,173,126,0.25)', color: 'rgba(143,214,171,0.6)', padding: '0.35em 0.8em', cursor: 'pointer' }}>
            ← back
          </button>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(217,122,110,0.5)', letterSpacing: '0.2em' }}>
              BEFORE YOU LEAVE ASHWICK HOLLOW
            </div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1rem', color: '#d97a6e', letterSpacing: '0.03em' }}>
              RECORD YOUR FINDING
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(180,200,190,0.35)' }}>
          {collectedClueIds.length}/7 pieces of evidence weighed
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', maxWidth: 820, width: '100%', margin: '0 auto' }}>

        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.2rem', background: 'rgba(180,60,50,0.04)', border: '1px solid rgba(180,60,50,0.15)' }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(217,122,110,0.55)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
            WHAT YOU CHOOSE TO BELIEVE
          </div>
          <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(190,210,195,0.6)' }}>
            No one in Ashwick Hollow will ask these questions for you. Before you leave, decide what you believe really
            happened to Mara and Josiah Thorne — and who, or what, is truly owed the blame. What you record here is
            what you will carry out of these woods, for better or worse.
          </p>
        </div>

        <FindingSection
          number="I"
          title="WHAT HAPPENED TO THEM?"
          description="Decide what you believe truly became of Mara and her grandfather."
          options={HW_EVENTS}
          selected={eventId}
          onSelect={setEventId}
        />
        <FindingSection
          number="II"
          title="WHAT IS THE ROOT OF IT?"
          description="Decide what underlying force has driven the Due, year after year, for two centuries."
          options={HW_CAUSES}
          selected={causeId}
          onSelect={setCauseId}
        />
        <FindingSection
          number="III"
          title="WHO — OR WHAT — IS RESPONSIBLE?"
          description="Decide who bears the weight of what you have found in Ashwick Hollow."
          options={HW_RESPONSIBLE}
          selected={responsibleId}
          onSelect={setResponsibleId}
        />

        {canSubmit && (
          <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: 'rgba(90,173,126,0.04)', border: '1px solid rgba(90,173,126,0.15)' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
              WHAT YOU WILL RECORD
            </div>
            {[
              { label: 'What happened', value: HW_EVENTS.find(e => e.id === eventId)?.label ?? '' },
              { label: 'Root cause', value: HW_CAUSES.find(c => c.id === causeId)?.label ?? '' },
              { label: 'Responsible', value: HW_RESPONSIBLE.find(r => r.id === responsibleId)?.label ?? '' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.45)', letterSpacing: '0.08em', flexShrink: 0, width: 110 }}>
                  {label}:
                </div>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', color: 'rgba(190,210,195,0.65)', lineHeight: 1.55 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'flex-end' }}>
          {confirming && (
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.65rem', color: 'rgba(217,122,110,0.6)' }}>
              You will not be able to change this once it's written. Are you certain?
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              background: canSubmit ? (confirming ? 'rgba(180,60,50,0.16)' : 'rgba(180,60,50,0.08)') : 'rgba(40,45,40,0.5)',
              border: canSubmit ? (confirming ? '1px solid #d97a6e' : '1px solid rgba(180,60,50,0.5)') : '1px solid rgba(60,70,60,0.4)',
              color: canSubmit ? '#d97a6e' : 'rgba(90,100,90,0.5)',
              padding: '0.7em 2.2em',
              cursor: canSubmit ? 'pointer' : 'default',
              transition: 'all 0.25s ease',
              boxShadow: canSubmit && confirming ? '0 0 20px rgba(180,60,50,0.2)' : 'none',
            }}
          >
            {confirming ? 'Yes — record it' : 'Record my finding'}
          </button>
          {confirming && (
            <button
              onClick={() => setConfirming(false)}
              style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(180,200,190,0.2)', color: 'rgba(180,200,190,0.45)', padding: '0.7em 1.4em', cursor: 'pointer' }}
            >
              Wait, let me think
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FindingSection({
  number, title, description, options, selected, onSelect,
}: {
  number: string;
  title: string;
  description: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ marginBottom: '1.5rem', background: 'rgba(4,10,8,0.8)', border: '1px solid rgba(90,173,126,0.1)', padding: '1.2rem 1.3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
        <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1.3rem', color: 'rgba(90,173,126,0.18)', lineHeight: 1 }}>
          {number}
        </div>
        <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', color: '#8fd6ab', letterSpacing: '0.02em' }}>
          {title}
        </div>
      </div>
      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.65rem', color: 'rgba(180,200,190,0.4)', lineHeight: 1.6, marginBottom: '1rem' }}>
        {description}
      </p>
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
                background: isSelected ? 'rgba(10,40,26,0.9)' : 'transparent',
                border: isSelected ? '1px solid rgba(90,173,126,0.4)' : '1px solid rgba(90,173,126,0.06)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontFamily: "'IM Fell English', serif",
              }}
              onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.background = 'rgba(8,20,14,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.2)'; } }}
              onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.06)'; } }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: isSelected ? '2px solid #8fd6ab' : '1px solid rgba(90,173,126,0.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isSelected && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#8fd6ab' }} />}
              </div>
              <span style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.75rem', color: isSelected ? 'rgba(200,220,205,0.85)' : 'rgba(190,210,195,0.45)', lineHeight: 1.5 }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
