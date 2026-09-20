import type { HWGameState, HWJournalTab } from './hwTypes';
import { HW_PEOPLE, HW_CLEARINGS, HW_CLUES } from './hwData';

interface HWJournalProps {
  gameState: HWGameState;
  onBack: () => void;
  onTabChange: (tab: HWJournalTab) => void;
}

const TABS: { id: HWJournalTab; label: string }[] = [
  { id: 'people', label: 'PEOPLE' },
  { id: 'places', label: 'PLACES' },
  { id: 'evidence', label: 'EVIDENCE' },
  { id: 'timeline', label: 'TIMELINE' },
];

interface TimelineEvent {
  day: string;
  text: string;
  requiresClue?: string;
  requiresClearing?: string;
  alwaysShow?: boolean;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    day: 'TWO CENTURIES AGO',
    text: 'By the story every child in Ashwick Hollow is taught, the first Thorne struck a bargain with the wood: timber and safety from fire, for one soul given freely each autumn.',
    alwaysShow: true,
  },
  {
    day: 'OVER TWO CENTURIES',
    text: 'Forty-seven names are added to the Due Stone. Every single one belonged to someone who, that same year, had fallen into debt, threatened to leave, or asked too many questions.',
    requiresClue: 'due-stone-rubbing',
  },
  {
    day: 'EACH AUTUMN, FOR ELEVEN YEARS',
    text: "The mill quietly pays a generous 'settlement' to the family of that year's chosen, recorded nowhere but Hollis Briggs's private ledger.",
    requiresClue: 'ledger-page',
  },
  {
    day: 'THREE WEEKS AGO',
    text: "Mara finds a page of the mill's private accounts blown against the schoolhouse fence, and cannot explain it away.",
    requiresClue: 'mara-diary',
  },
  {
    day: 'TWO WEEKS AGO',
    text: "Mara asks her grandfather directly where the Due names come from. He gives her the old story and will not meet her eyes.",
    requiresClearing: 'thorne-manor',
  },
  {
    day: 'SEVEN DAYS AGO',
    text: "Hollis Briggs tells Josiah Thorne, not asks him, that this year's name is already decided. No one in the Council room will say it aloud.",
    requiresClue: 'ledger-page',
  },
  {
    day: 'NINE DAYS AGO',
    text: 'Mara tells her aunt Elsie everything. Elsie tells her to leave Ashwick Hollow that night. Mara wants to go to the constable first.',
    requiresClue: 'mara-diary',
  },
  {
    day: 'THE NIGHT SHE VANISHED',
    text: 'A boot print is left in the mud outside the Sunken Chapel, facing away from it — toward the mill, not into the wood.',
    requiresClue: 'boot-print',
  },
  {
    day: 'THE MORNING AFTER',
    text: "A wristwatch and a ribbon appear in the offering box at the Hollow Root, staged to look like gifts freely given.",
    requiresClue: 'offering-box',
  },
  {
    day: 'TWO DAYS AGO',
    text: 'Josiah Thorne asks Constable Rennick if any Due disappearance was ever properly investigated. Rennick gives him the same answer he gives everyone: there is nothing to find.',
    requiresClearing: 'constable-post',
  },
  {
    day: 'TWO DAYS AGO',
    text: 'Josiah writes to the county assizes, asking them to come to Ashwick Hollow. The letter is never sent. He vanishes before he can walk it to the road himself.',
    requiresClue: 'thorne-letter',
  },
  {
    day: 'TODAY',
    text: "You arrive in Ashwick Hollow, summoned by a letter Elsie was afraid to sign her own name to.",
    alwaysShow: true,
  },
];

export default function HWJournal({ gameState, onBack, onTabChange }: HWJournalProps) {
  const tab = gameState.journalTab;

  const visibleTimeline = TIMELINE_EVENTS.filter(event => {
    if (event.alwaysShow) return true;
    if (event.requiresClue && !gameState.collectedClueIds.includes(event.requiresClue)) return false;
    if (event.requiresClearing && !gameState.visitedClearingIds.includes(event.requiresClearing)) return false;
    return true;
  });

  const clues = gameState.collectedClueIds.map(id => HW_CLUES[id]).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', background: '#03090a', display: 'flex', flexDirection: 'column', fontFamily: "'IM Fell English', serif" }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(90,173,126,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 100 }} />

      {/* Nav */}
      <div style={{ padding: '0.6rem 1.2rem', background: 'rgba(4,10,8,0.98)', borderBottom: '1px solid rgba(90,173,126,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'relative', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(90,173,126,0.25)', color: 'rgba(143,214,171,0.6)', padding: '0.35em 0.8em', cursor: 'pointer' }}>
            ← the wood
          </button>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.2em' }}>
              ASHWICK HOLLOW · YOUR NOTES
            </div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1rem', color: '#8fd6ab', letterSpacing: '0.03em' }}>
              FIELD JOURNAL
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: '0.68rem',
                background: tab === t.id ? 'rgba(90,173,126,0.1)' : 'transparent',
                border: tab === t.id ? '1px solid rgba(90,173,126,0.5)' : '1px solid rgba(90,173,126,0.12)',
                color: tab === t.id ? '#8fd6ab' : 'rgba(143,214,171,0.45)',
                padding: '0.4em 0.9em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>

        {/* PEOPLE TAB */}
        {tab === 'people' && (
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              PEOPLE OF ASHWICK HOLLOW — {gameState.reviewedPersonIds.length}/6 HEARD
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.9rem' }}>
              {Object.values(HW_PEOPLE).map(person => {
                const heard = gameState.reviewedPersonIds.includes(person.id);
                return (
                  <div key={person.id} style={{ background: heard ? 'rgba(4,10,8,0.9)' : 'rgba(4,10,8,0.5)', border: heard ? '1px solid rgba(90,173,126,0.18)' : '1px solid rgba(90,173,126,0.06)', padding: '0.9rem 1rem', opacity: heard ? 1 : 0.45 }}>
                    <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.82rem', color: heard ? '#8fd6ab' : 'rgba(190,210,195,0.4)', marginBottom: '0.2rem' }}>
                      {person.name}
                      {heard && <span style={{ marginLeft: '0.5rem', fontSize: '0.5rem', color: 'rgba(90,173,126,0.4)' }}>✓</span>}
                    </div>
                    <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.58rem', color: 'rgba(180,200,190,0.4)', marginBottom: '0.5rem' }}>
                      {person.role}
                    </div>
                    {heard ? (
                      <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.68rem', lineHeight: 1.7, color: 'rgba(190,210,195,0.55)' }}>
                        {person.description}
                      </p>
                    ) : (
                      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.6rem', color: 'rgba(180,200,190,0.25)' }}>
                        You haven't spoken with them yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PLACES TAB */}
        {tab === 'places' && (
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              WHERE YOU'VE WALKED — {gameState.visitedClearingIds.length}/8
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.7rem' }}>
              {Object.values(HW_CLEARINGS).map(clearing => {
                const visited = gameState.visitedClearingIds.includes(clearing.id);
                const STATUS_DOTS: Record<string, string> = { quiet: '#5aad7e', uneasy: '#c9a03c', dreadful: '#b43c32', sealed: '#5a6a5a' };
                return (
                  <div key={clearing.id} style={{ background: visited ? 'rgba(4,10,8,0.9)' : 'rgba(4,10,8,0.5)', border: visited ? '1px solid rgba(90,173,126,0.15)' : '1px solid rgba(90,173,126,0.06)', padding: '0.8rem 1rem', opacity: visited ? 1 : 0.4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_DOTS[clearing.status] }} />
                      <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', color: visited ? '#8fd6ab' : 'rgba(190,210,195,0.35)' }}>
                        {clearing.name}
                      </div>
                      {visited && <span style={{ marginLeft: 'auto', fontSize: '0.42rem', color: 'rgba(90,173,126,0.35)' }}>✓</span>}
                    </div>
                    {visited ? (
                      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.62rem', lineHeight: 1.6, color: 'rgba(180,200,190,0.45)' }}>
                        {clearing.description}
                      </p>
                    ) : (
                      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.58rem', color: 'rgba(180,200,190,0.2)' }}>
                        Not yet walked
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
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              EVIDENCE GATHERED — {clues.length}/7
            </div>
            {clues.length === 0 ? (
              <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.65rem', color: 'rgba(90,173,126,0.25)' }}>
                Nothing gathered yet. Walk the village and the wood, and look closely.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {clues.map(clue => (
                  <div key={clue.id} style={{ background: 'rgba(4,10,8,0.8)', border: '1px solid rgba(90,173,126,0.12)', padding: '0.9rem 1rem', borderLeft: '2px solid rgba(90,173,126,0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', color: 'rgba(143,214,171,0.6)' }}>{clue.icon}</span>
                      <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', color: '#8fd6ab' }}>{clue.name}</div>
                      <div style={{ marginLeft: 'auto', fontFamily: "'Lora', serif", fontSize: '0.44rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.08em' }}>
                        {clue.foundIn}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.7rem', lineHeight: 1.7, color: 'rgba(190,210,195,0.6)', marginBottom: '0.5rem' }}>
                      {clue.detail}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {clue.relatedPeople.map(id => (
                        <span key={id} style={{ fontFamily: "'Lora', serif", fontSize: '0.42rem', color: 'rgba(143,214,171,0.45)', border: '1px solid rgba(143,214,171,0.15)', padding: '0.1em 0.5em', letterSpacing: '0.06em' }}>
                          {HW_PEOPLE[id]?.name ?? id}
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
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.35)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              THE STORY SO FAR — {visibleTimeline.length} MOMENTS PIECED TOGETHER
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.58rem', color: 'rgba(180,200,190,0.3)', marginBottom: '1.5rem' }}>
              Reconstructed from what you've found and who you've spoken with. Keep looking to fill in what's missing.
            </p>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 92, top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg, rgba(90,173,126,0.3), rgba(90,173,126,0.1))' }} />
              {visibleTimeline.map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem', position: 'relative' }}>
                  <div style={{ width: 92, flexShrink: 0, textAlign: 'right', paddingRight: '1rem' }}>
                    <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.5rem', color: event.alwaysShow ? '#8fd6ab' : 'rgba(143,214,171,0.5)', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                      {event.day}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', left: 88, top: 4, width: 8, height: 8, borderRadius: '50%', background: event.alwaysShow ? '#8fd6ab' : 'rgba(143,214,171,0.4)', border: '1px solid #03090a', zIndex: 2 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', lineHeight: 1.8, color: event.alwaysShow ? 'rgba(190,210,195,0.65)' : 'rgba(190,210,195,0.5)', paddingLeft: '0.5rem' }}>
                      {event.text}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', opacity: 0.3 }}>
                <div style={{ width: 92, flexShrink: 0 }} />
                <div style={{ position: 'absolute', left: 88, top: 4, width: 8, height: 8, borderRadius: '50%', background: 'rgba(217,122,110,0.4)', border: '1px solid #03090a' }} />
                <div style={{ flex: 1, paddingLeft: '0.5rem' }}>
                  <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.48rem', color: 'rgba(217,122,110,0.5)', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                    UNRESOLVED
                  </div>
                  <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.72rem', color: 'rgba(190,210,195,0.35)', fontStyle: 'italic' }}>
                    Where Mara and Josiah Thorne are now — still unknown
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
