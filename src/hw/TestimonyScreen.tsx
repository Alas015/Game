import { useState, useRef, useEffect } from 'react';
import type { HWGameState } from './hwTypes';
import { HW_PEOPLE } from './hwData';
import HWPortrait from './HWPortrait';

interface TestimonyScreenProps {
  gameState: HWGameState;
  onBack: () => void;
}

export default function TestimonyScreen({ gameState, onBack }: TestimonyScreenProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string>(gameState.personId ?? '');
  const [revealedEntries, setRevealedEntries] = useState<number>(1);
  const [isReading, setIsReading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const person = HW_PEOPLE[selectedPersonId];
  const entries = person?.logs ?? [];

  useEffect(() => {
    setRevealedEntries(1);
    setIsReading(false);
  }, [selectedPersonId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [revealedEntries]);

  function handleRevealNext() {
    if (revealedEntries < entries.length) {
      setIsReading(true);
      setTimeout(() => {
        setRevealedEntries(r => r + 1);
        setIsReading(false);
      }, 650);
    }
  }

  const peopleList = Object.values(HW_PEOPLE);
  const isDiary = person?.id === 'mara';

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
        borderBottom: '1px solid rgba(90,173,126,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(90,173,126,0.25)', color: 'rgba(143,214,171,0.6)', padding: '0.35em 0.8em', cursor: 'pointer' }}>
            ← back
          </button>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em' }}>
              ASHWICK HOLLOW · WHAT PEOPLE WILL SAY
            </div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.95rem', color: '#8fd6ab', letterSpacing: '0.03em' }}>
              TESTIMONIES &amp; DIARIES
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(217,122,110,0.5)', letterSpacing: '0.1em' }}>
          gathered in confidence — mind what you repeat
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* People list */}
        <div style={{ width: 220, background: 'rgba(4,10,8,0.98)', borderRight: '1px solid rgba(90,173,126,0.08)', padding: '1rem 0.8rem', overflowY: 'auto' }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
            WHO YOU'VE MET
          </div>
          {peopleList.map(p => {
            const isSelected = selectedPersonId === p.id;
            const wasReviewed = gameState.reviewedPersonIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersonId(p.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 0.7rem',
                  marginBottom: '0.3rem',
                  background: isSelected ? 'rgba(10,30,20,0.8)' : 'transparent',
                  border: isSelected ? '1px solid rgba(90,173,126,0.35)' : '1px solid rgba(90,173,126,0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(8,18,12,0.5)'; } }}
                onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(90,173,126,0.08)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
              >
                <div style={{ flexShrink: 0, opacity: isSelected ? 1 : 0.55, transition: 'opacity 0.2s' }}>
                  <HWPortrait personId={p.id} size={36} />
                </div>
                <div>
                  <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.68rem', color: isSelected ? '#8fd6ab' : 'rgba(190,210,195,0.55)', lineHeight: 1.2 }}>
                    {p.name.split(' ').pop()}
                  </div>
                  <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(180,200,190,0.3)', lineHeight: 1.2 }}>
                    {p.role.split('—')[0].trim()}
                  </div>
                  {wasReviewed && (
                    <div style={{ fontFamily: "'Lora', serif", fontSize: '0.42rem', color: 'rgba(90,173,126,0.35)', marginTop: '0.15rem' }}>✓ heard</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Testimony panel */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {person && (
            <>
              <div style={{ width: 220, padding: '1.2rem 1rem', background: 'rgba(2,6,4,0.8)', borderRight: '1px solid rgba(90,173,126,0.06)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <HWPortrait personId={selectedPersonId} size={100} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em', marginBottom: '0.3rem' }}>
                    {isDiary ? 'THE MISSING' : 'ACCOUNT OF'}
                  </div>
                  <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', color: '#8fd6ab', marginBottom: '0.2rem' }}>
                    {person.name}
                  </div>
                  <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: 'rgba(180,200,190,0.45)', marginBottom: '0.8rem', lineHeight: 1.4 }}>
                    {person.role}
                  </div>
                  <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(90,173,126,0.2), transparent)', marginBottom: '0.7rem' }} />
                  <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.68rem', lineHeight: 1.7, color: 'rgba(190,210,195,0.55)' }}>
                    {person.description}
                  </p>
                </div>
                <div style={{ marginTop: 'auto', padding: '0.6rem', background: 'rgba(180,60,50,0.05)', border: '1px solid rgba(180,60,50,0.15)' }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(217,122,110,0.55)', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>
                    A NOTE TO YOURSELF
                  </div>
                  <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.65rem', color: 'rgba(190,210,195,0.5)', lineHeight: 1.6 }}>
                    {person.suspicious}
                  </p>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '0.7rem 1.2rem', background: 'rgba(2,6,4,0.5)', borderBottom: '1px solid rgba(90,173,126,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em' }}>
                    {isDiary ? '▸ DIARY ENTRIES' : `▸ WHAT ${person.name.split(' ').pop()?.toUpperCase()} TOLD YOU`}
                  </div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '0.45rem', color: 'rgba(180,200,190,0.3)' }}>
                    {revealedEntries}/{entries.length} entries
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
                  {entries.slice(0, revealedEntries).map((entry, idx) => (
                    <div key={entry.id} style={{ marginBottom: '1.2rem', animation: idx === revealedEntries - 1 ? 'fadeIn 0.6s ease' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                        <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: '#8fd6ab', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                          {entry.timestamp}
                        </div>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(90,173,126,0.2), transparent)' }} />
                      </div>
                      <div style={{
                        padding: '0.8rem 1rem',
                        background: isDiary ? 'rgba(10,24,16,0.7)' : 'rgba(6,16,10,0.7)',
                        border: isDiary ? '1px solid rgba(143,214,171,0.15)' : '1px solid rgba(90,150,120,0.12)',
                        borderLeft: isDiary ? '2px solid rgba(143,214,171,0.4)' : '2px solid rgba(90,150,120,0.3)',
                      }}>
                        <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: isDiary ? 'italic' : 'normal', fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(200,220,205,0.8)' }}>
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isReading && (
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(6,16,10,0.5)', border: '1px solid rgba(90,173,126,0.1)', marginBottom: '1rem' }}>
                      <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.68rem', color: 'rgba(90,173,126,0.4)' }}>
                        ▌ {isDiary ? 'turning the page…' : 'they hesitate before going on…'}
                      </span>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                <div style={{ padding: '0.8rem 1.5rem', borderTop: '1px solid rgba(90,173,126,0.06)', background: 'rgba(4,10,8,0.98)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: 'rgba(180,200,190,0.3)' }}>
                    {revealedEntries < entries.length ? `${entries.length - revealedEntries} more to hear` : 'nothing more they will say'}
                  </div>
                  {revealedEntries < entries.length ? (
                    <button
                      onClick={handleRevealNext}
                      disabled={isReading}
                      style={{
                        fontFamily: "'IM Fell English', serif",
                        fontSize: '0.75rem',
                        background: 'rgba(90,173,126,0.06)',
                        border: '1px solid rgba(90,173,126,0.35)',
                        color: '#8fd6ab',
                        padding: '0.5em 1.2em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: isReading ? 0.4 : 1,
                      }}
                    >
                      Press further
                    </button>
                  ) : (
                    <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.55rem', color: 'rgba(90,173,126,0.4)' }}>
                      ✓ account complete
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
