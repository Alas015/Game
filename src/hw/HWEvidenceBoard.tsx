import { useState } from 'react';
import type { HWGameState } from './hwTypes';
import { HW_CLUES } from './hwData';

interface HWEvidenceBoardProps {
  gameState: HWGameState;
  onBack: () => void;
  onConnect: (a: string, b: string) => void;
  onSelectClue: (clueId: string | null) => void;
  onFinding: () => void;
}

const PEOPLE_LABELS: Record<string, string> = {
  thorne: 'Elder Thorne',
  elsie: 'Elsie Corbin',
  rennick: 'Constable Rennick',
  briggs: 'Hollis Briggs',
  weaver: 'Nan Weaver',
  mara: 'Mara Thorne',
  'ashwick-council': 'The Council',
};

export default function HWEvidenceBoard({ gameState, onBack, onConnect, onSelectClue, onFinding }: HWEvidenceBoardProps) {
  const [selected, setSelected] = useState<string | null>(gameState.selectedClueForConnect);
  const [flash, setFlash] = useState<string | null>(null);

  const clues = gameState.collectedClueIds.map(id => HW_CLUES[id]).filter(Boolean);
  const canFinding = gameState.collectedClueIds.length >= 5;

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
        setTimeout(() => setFlash(null), 1600);
      }
      setSelected(null);
      onSelectClue(null);
    }
  }

  const selectedClue = selected ? HW_CLUES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#03090a', display: 'flex', flexDirection: 'column', fontFamily: "'IM Fell English', serif" }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(90,173,126,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 100 }} />

      {/* Nav */}
      <div style={{ padding: '0.6rem 1.2rem', background: 'rgba(4,10,8,0.98)', borderBottom: '1px solid rgba(90,173,126,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(90,173,126,0.25)', color: 'rgba(143,214,171,0.6)', padding: '0.35em 0.8em', cursor: 'pointer' }}>
            ← the wood
          </button>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em' }}>
              ASHWICK HOLLOW · YOUR NOTES
            </div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1rem', color: '#8fd6ab', letterSpacing: '0.03em' }}>
              EVIDENCE BOARD
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '0.55rem', color: 'rgba(90,173,126,0.45)', letterSpacing: '0.1em' }}>
            {clues.length}/7 ITEMS · {gameState.connections.length} THREADS
          </div>
          {canFinding && (
            <button onClick={onFinding} style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.75rem', background: 'rgba(180,60,50,0.1)', border: '1px solid rgba(180,60,50,0.5)', color: '#d97a6e', padding: '0.45em 1.2em', cursor: 'pointer', animation: 'blink 3s ease-in-out infinite' }}>
              RECORD FINDING
            </button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Evidence cards */}
        <div style={{ flex: 1, padding: '1.2rem 1.5rem', overflowY: 'auto' }}>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.62rem', color: 'rgba(180,200,190,0.35)', marginBottom: '1rem' }}>
            {selected
              ? `Item in hand: ${selectedClue?.name} — choose another to draw a thread between them`
              : 'Pick up a piece of evidence, then a second, to draw a thread between them'}
          </div>

          {clues.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(90,173,126,0.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</div>
              <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem' }}>NOTHING GATHERED YET</div>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.62rem', marginTop: '0.5rem' }}>
                Walk the wood and the village. Look closely at what you find.
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.8rem' }}>
              {clues.map(clue => {
                const isSelected = selected === clue.id;
                const isFlashing = flash && flash.includes(clue.id);
                const linkCount = gameState.connections.filter(([a, b]) => a === clue.id || b === clue.id).length;

                return (
                  <div
                    key={clue.id}
                    onClick={() => handleClueClick(clue.id)}
                    style={{
                      background: isSelected ? 'rgba(10,40,26,0.9)' : 'rgba(4,10,8,0.9)',
                      border: isSelected ? '1px solid #5aad7e' : isFlashing ? '1px solid rgba(90,173,126,0.6)' : '1px solid rgba(90,173,126,0.15)',
                      padding: '0.9rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? '0 0 20px rgba(90,173,126,0.15)' : 'none',
                    }}
                    onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.35)'; (e.currentTarget as HTMLElement).style.background = 'rgba(8,20,14,0.9)'; } }}
                    onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(4,10,8,0.9)'; } }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: -1, right: 12, background: '#5aad7e', padding: '0.1em 0.4em', fontSize: '0.42rem', color: '#03090a', letterSpacing: '0.1em', fontWeight: 700 }}>
                        IN HAND
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', color: isSelected ? '#8fd6ab' : 'rgba(143,214,171,0.55)' }}>{clue.icon}</span>
                      <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', color: isSelected ? '#8fd6ab' : 'rgba(190,210,195,0.75)' }}>
                        {clue.name}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.6rem', lineHeight: 1.6, color: 'rgba(180,200,190,0.45)', marginBottom: '0.6rem' }}>
                      {clue.description}
                    </p>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.68rem', lineHeight: 1.65, color: 'rgba(190,210,195,0.42)', borderTop: '1px solid rgba(90,173,126,0.08)', paddingTop: '0.5rem', marginBottom: '0.5rem' }}>
                      {clue.detail}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: '0.44rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.08em' }}>
                        Found: {clue.foundIn}
                      </div>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {clue.relatedPeople.map(id => (
                          <span key={id} style={{ fontFamily: "'Lora', serif", fontSize: '0.42rem', color: 'rgba(143,214,171,0.4)', border: '1px solid rgba(143,214,171,0.15)', padding: '0.1em 0.4em', letterSpacing: '0.06em' }}>
                            {PEOPLE_LABELS[id] ?? id}
                          </span>
                        ))}
                      </div>
                    </div>
                    {linkCount > 0 && (
                      <div style={{ marginTop: '0.4rem', fontFamily: "'Lora', serif", fontSize: '0.42rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.08em' }}>
                        ◈ {linkCount} thread{linkCount > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Threads sidebar */}
        <div style={{ width: 240, background: 'rgba(4,10,8,0.98)', borderLeft: '1px solid rgba(90,173,126,0.08)', padding: '1rem 0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em' }}>
            THREADS DRAWN
          </div>
          {gameState.connections.length === 0 ? (
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.6rem', color: 'rgba(90,173,126,0.2)', lineHeight: 1.6 }}>
              Pick up two pieces of evidence to draw a thread between them. Threads help you see the shape of things.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
              {gameState.connections.map(([a, b], i) => {
                const ca = HW_CLUES[a];
                const cb = HW_CLUES[b];
                if (!ca || !cb) return null;
                return (
                  <div key={i} style={{ padding: '0.5rem 0.6rem', background: 'rgba(90,173,126,0.03)', border: '1px solid rgba(90,173,126,0.1)' }}>
                    <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.6rem', color: 'rgba(190,210,195,0.55)', lineHeight: 1.5 }}>
                      <span style={{ color: 'rgba(143,214,171,0.6)' }}>{ca.icon} {ca.name}</span>
                      <span style={{ color: 'rgba(90,173,126,0.25)', margin: '0 0.3rem' }}>↔</span>
                      <span style={{ color: 'rgba(143,214,171,0.6)' }}>{cb.icon} {cb.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(90,173,126,0.08)', paddingTop: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(180,200,190,0.4)' }}>Evidence</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: '#8fd6ab' }}>{clues.length}/7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(180,200,190,0.4)' }}>Threads</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: '#8fd6ab' }}>{gameState.connections.length}</span>
            </div>
            {canFinding ? (
              <button onClick={onFinding} style={{ width: '100%', fontFamily: "'IM Fell English', serif", fontSize: '0.72rem', background: 'rgba(180,60,50,0.1)', border: '1px solid rgba(180,60,50,0.5)', color: '#d97a6e', padding: '0.6em 1em', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                Record Finding →
              </button>
            ) : (
              <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: 'rgba(90,173,126,0.25)', lineHeight: 1.6, textAlign: 'center' }}>
                Gather {5 - clues.length} more piece{5 - clues.length !== 1 ? 's' : ''} of evidence before you record a finding
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
