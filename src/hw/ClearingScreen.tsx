import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { HWGameState } from './hwTypes';
import { HW_CLEARINGS, HW_PEOPLE } from './hwData';

interface ClearingScreenProps {
  gameState: HWGameState;
  onBack: () => void;
  onCollectClue: (clueId: string) => void;
  onInspectItem: (itemId: string) => void;
  onTalk: (personId: string) => void;
  onEvidence: () => void;
  onJournal: () => void;
}

const STATUS_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  quiet:    { text: '#8fd6ab', border: 'rgba(90,173,126,0.3)',  bg: 'rgba(90,173,126,0.05)' },
  uneasy:   { text: '#c9a03c', border: 'rgba(201,160,60,0.35)', bg: 'rgba(201,160,60,0.05)' },
  dreadful: { text: '#d97a6e', border: 'rgba(180,60,50,0.4)',   bg: 'rgba(180,60,50,0.05)' },
  sealed:   { text: '#8a9a8a', border: 'rgba(90,100,90,0.3)',   bg: 'rgba(40,50,40,0.4)' },
};

export default function ClearingScreen({ gameState, onBack, onCollectClue, onInspectItem, onTalk, onEvidence, onJournal }: ClearingScreenProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [newClue, setNewClue] = useState<string | null>(null);

  const clearing = gameState.clearingId ? HW_CLEARINGS[gameState.clearingId] : null;
  if (!clearing) return null;

  const sc = STATUS_COLORS[clearing.status];
  const activeItem = clearing.inspectItems.find(i => i.id === activeItemId);

  function handleInspect(itemId: string) {
    const item = clearing!.inspectItems.find(i => i.id === itemId);
    if (!item) return;
    setActiveItemId(itemId);
    onInspectItem(itemId);
    if (item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)) {
      onCollectClue(item.revealsClueId);
      setNewClue(item.revealsClueId);
      setTimeout(() => setNewClue(null), 3200);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03090a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'IM Fell English', serif",
      position: 'relative',
    }}>
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(90,173,126,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 100,
      }} />

      {/* Nav */}
      <div style={{
        padding: '0.6rem 1.2rem',
        background: 'rgba(4,10,8,0.98)',
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
              fontFamily: "'IM Fell English', serif",
              fontSize: '0.7rem',
              background: 'transparent',
              border: '1px solid rgba(90,173,126,0.25)',
              color: 'rgba(143,214,171,0.6)',
              padding: '0.35em 0.8em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ← the wood
          </button>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em' }}>
              ASHWICK HOLLOW
            </div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.95rem', color: sc.text, letterSpacing: '0.03em' }}>
              {clearing.name}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.25em 0.6em', border: `1px solid ${sc.border}`, background: sc.bg }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc.text, animation: clearing.status === 'dreadful' ? 'blink 1.4s ease-in-out infinite' : 'none' }} />
            <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: sc.text, letterSpacing: '0.1em' }}>
              {clearing.status}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onJournal} style={navBtnStyle}>JOURNAL</button>
          <button onClick={onEvidence} style={navBtnStyle}>EVIDENCE</button>
        </div>
      </div>

      {/* Clue notification */}
      {newClue && (
        <div style={{
          position: 'fixed', top: '5rem', right: '1.5rem', zIndex: 200,
          background: 'rgba(4,10,8,0.98)', border: '1px solid rgba(90,173,126,0.5)',
          padding: '0.8rem 1.2rem', boxShadow: '0 0 30px rgba(90,173,126,0.18)',
          animation: 'fadeIn 0.4s ease',
        }}>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(90,173,126,0.6)', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>
            ● something is not as it should be
          </div>
          <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.75rem', color: '#8fd6ab' }}>
            {newClue.replace(/-/g, ' ')}
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(90,173,126,0.08)', background: 'rgba(6,14,10,0.5)' }}>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(190,210,195,0.55)', maxWidth: 680 }}>
              {clearing.atmosphere}
            </p>
          </div>

          <div style={{ flex: 1, padding: '1.2rem 1.5rem', overflowY: 'auto' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
              ▸ THINGS WORTH A CLOSER LOOK
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.7rem' }}>
              {clearing.inspectItems.map(item => {
                const isActive = activeItemId === item.id;
                const wasInspected = gameState.inspectedItemIds.includes(item.id);
                const revealsNew = item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleInspect(item.id)}
                    style={{
                      background: isActive ? 'rgba(10,30,20,0.9)' : 'rgba(4,12,8,0.8)',
                      border: isActive ? '1px solid #5aad7e' : revealsNew ? '1px solid rgba(217,122,110,0.4)' : '1px solid rgba(90,173,126,0.15)',
                      padding: '0.8rem 1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isActive ? '0 0 20px rgba(90,173,126,0.1)' : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.35)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(8,20,14,0.9)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = revealsNew ? 'rgba(217,122,110,0.4)' : 'rgba(90,173,126,0.15)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(4,12,8,0.8)';
                      }
                    }}
                  >
                    {revealsNew && (
                      <div style={{ position: 'absolute', top: 6, right: 8, width: 6, height: 6, borderRadius: '50%', background: '#d97a6e', animation: 'blink 1.5s ease-in-out infinite' }} />
                    )}
                    {wasInspected && !revealsNew && (
                      <div style={{ position: 'absolute', top: 6, right: 8, fontSize: '0.55rem', color: 'rgba(90,173,126,0.4)' }}>✓</div>
                    )}
                    <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.75rem', color: isActive ? '#8fd6ab' : 'rgba(190,210,195,0.7)', marginBottom: '0.3rem' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.62rem', color: 'rgba(180,200,190,0.4)', lineHeight: 1.5 }}>
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {clearing.accessiblePeopleIds.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(90,173,126,0.2), transparent)', marginBottom: '0.8rem' }} />
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
                  ▸ SOMEONE IS HERE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {clearing.accessiblePeopleIds.map(personId => {
                    const person = HW_PEOPLE[personId];
                    if (!person) return null;
                    const reviewed = gameState.reviewedPersonIds.includes(personId);
                    return (
                      <button
                        key={personId}
                        onClick={() => onTalk(personId)}
                        style={{
                          fontFamily: "'IM Fell English', serif",
                          fontSize: '0.75rem',
                          background: reviewed ? 'rgba(8,20,14,0.6)' : 'rgba(90,173,126,0.06)',
                          border: reviewed ? '1px solid rgba(90,173,126,0.15)' : '1px solid rgba(90,173,126,0.3)',
                          color: reviewed ? 'rgba(143,214,171,0.5)' : 'rgba(143,214,171,0.8)',
                          padding: '0.5em 1em',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {reviewed && <span style={{ fontSize: '0.5rem' }}>✓</span>}
                        <span>{person.id === 'mara' ? "Read Mara's diary" : `Speak with ${person.name}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Item detail */}
        <div style={{ width: 320, background: 'rgba(4,10,8,0.98)', borderLeft: '1px solid rgba(90,173,126,0.08)', display: 'flex', flexDirection: 'column', padding: '1.2rem' }}>
          {activeItem ? (
            <>
              <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                ▸ A CLOSER LOOK
              </div>
              <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', color: '#8fd6ab', marginBottom: '0.3rem' }}>
                {activeItem.name}
              </div>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.62rem', color: 'rgba(180,200,190,0.45)', marginBottom: '1rem' }}>
                {activeItem.description}
              </div>
              <div style={{ flex: 1, background: 'rgba(6,14,10,0.6)', border: '1px solid rgba(90,173,126,0.1)', padding: '0.8rem', position: 'relative', overflowY: 'auto' }}>
                <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', lineHeight: 1.85, color: 'rgba(200,220,205,0.8)' }}>
                  {activeItem.text}
                </p>
                {activeItem.revealsClueId && gameState.collectedClueIds.includes(activeItem.revealsClueId) && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.7rem', borderTop: '1px solid rgba(90,173,126,0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8fd6ab' }} />
                    <span style={{ fontFamily: "'Lora', serif", fontSize: '0.55rem', color: '#8fd6ab', letterSpacing: '0.1em' }}>
                      ENTERED INTO EVIDENCE
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem', color: 'rgba(90,173,126,0.3)' }}>✦</div>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.65rem', color: 'rgba(90,173,126,0.5)', textAlign: 'center' }}>
                choose something<br />to look at closer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const navBtnStyle: CSSProperties = {
  fontFamily: "'IM Fell English', serif",
  fontSize: '0.65rem',
  background: 'transparent',
  border: '1px solid rgba(90,173,126,0.25)',
  color: 'rgba(143,214,171,0.6)',
  padding: '0.35em 0.7em',
  cursor: 'pointer',
  transition: 'all 0.2s',
};
