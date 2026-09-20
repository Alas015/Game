import type { GameState, JournalTab } from '../types';
import { CHARACTERS, LOCATIONS, CLUES } from '../data/gameData';
import CharacterPortrait from './CharacterPortrait';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface JournalProps {
  gameState: GameState;
  onReturnToMap: () => void;
  onTabChange: (tab: JournalTab) => void;
}

export default function Journal({ gameState, onReturnToMap, onTabChange }: JournalProps) {
  const tab = gameState.journalTab;
  const { T } = useLanguage();

  const knownCharacters = Object.values(CHARACTERS).filter(c =>
    gameState.visitedLocationIds.includes(c.locationId) ||
    Object.keys(gameState.dialogueNodes).includes(c.id)
  );

  const visitedLocations = gameState.visitedLocationIds.map(id => LOCATIONS[id]).filter(Boolean);
  const collectedClues = gameState.collectedClueIds.map(id => CLUES[id]).filter(Boolean);

  const TAB_LABELS: Record<JournalTab, string> = {
    suspects: T.ui.suspectsTab,
    locations: T.ui.locationsTab,
    clues: T.ui.cluesTab,
    notes: T.ui.notesTab,
  };

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: '#080604' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: '#0a0806', borderBottom: '1px solid #2a1c08' }}
      >
        <button className="medieval-btn-sm" onClick={onReturnToMap}>{T.ui.returnBtn}</button>
        <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '1rem', color: '#c9a84c',
          letterSpacing: '0.1em' }}>
          {T.ui.investigatorJournal}
        </div>
        <LanguageSwitcher />
      </div>

      {/* Tabs */}
      <div
        className="flex px-6 gap-0"
        style={{ background: '#0c0a06', borderBottom: '1px solid #2a1c08' }}
      >
        {(['suspects','locations','clues','notes'] as JournalTab[]).map(t => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? 'active' : ''}`}
            onClick={() => onTabChange(t)}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

        {/* SUSPECTS TAB */}
        {tab === 'suspects' && (
          <div className="p-6 max-w-4xl mx-auto">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
              letterSpacing: '0.2em', marginBottom: '1.5rem', textAlign: 'center' }}>
              {T.ui.personsIdentified.replace('{n}', String(knownCharacters.length))}
            </div>

            {knownCharacters.length === 0 ? (
              <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                color: '#3a2c10', textAlign: 'center', fontSize: '1rem' }}>
                {T.ui.noPersonsYet}
              </div>
            ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {knownCharacters.map(char => {
                  const charT = T.characters[char.id];
                  const charClues = char.clueIds.filter(id => gameState.collectedClueIds.includes(id))
                    .map(id => CLUES[id]).filter(Boolean);
                  const hasDialogue = Object.keys(gameState.dialogueNodes).includes(char.id);

                  return (
                    <div
                      key={char.id}
                      style={{
                        background: 'rgba(20,14,6,0.6)',
                        border: '1px solid #2a1c08',
                        padding: '1rem',
                        display: 'flex',
                        gap: '0.8rem',
                      }}
                    >
                      <CharacterPortrait portraitType={char.portraitType} size="sm" />
                      <div className="flex-1">
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.82rem', color: '#c9a84c',
                          marginBottom: '0.1rem' }}>
                          {charT?.name ?? char.name}
                        </div>
                        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                          fontSize: '0.72rem', color: '#5a4828', marginBottom: '0.5rem' }}>
                          {charT?.title ?? char.title}
                        </div>
                        <div style={{ fontFamily: 'Lora, serif', fontSize: '0.75rem',
                          color: '#6a5030', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                          {charT?.description ?? char.description}
                        </div>
                        {hasDialogue && (
                          <div
                            style={{
                              fontFamily: 'Lora, serif',
                              fontStyle: 'italic',
                              fontSize: '0.7rem',
                              color: '#6a3028',
                              lineHeight: 1.5,
                              borderLeft: '2px solid #3a1010',
                              paddingLeft: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                          >
                            ⚠ {charT?.suspicious ?? char.suspicious}
                          </div>
                        )}
                        {charClues.length > 0 && (
                          <div>
                            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', color: '#5a4010',
                              letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                              {T.ui.linkedEvidenceLabel}
                            </div>
                            {charClues.map(c => (
                              <div key={c.id} className="flex items-center gap-1 mb-1">
                                <span style={{ fontSize: '0.7rem' }}>{c.icon}</span>
                                <span style={{ fontFamily: 'IM Fell English, serif',
                                  fontSize: '0.7rem', color: '#7a5828' }}>
                                  {T.clues[c.id]?.name ?? c.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* LOCATIONS TAB */}
        {tab === 'locations' && (
          <div className="p-6 max-w-3xl mx-auto">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
              letterSpacing: '0.2em', marginBottom: '1.5rem', textAlign: 'center' }}>
              {T.ui.investigatedLocations.replace('{n}', String(visitedLocations.length))}
            </div>

            {visitedLocations.length === 0 ? (
              <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                color: '#3a2c10', textAlign: 'center', fontSize: '1rem' }}>
                {T.ui.noLocationsYet}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {visitedLocations.map(loc => {
                  const locT = T.locations[loc.id];
                  const locClues = loc.clueIds.filter(id => gameState.collectedClueIds.includes(id))
                    .map(id => CLUES[id]).filter(Boolean);
                  const pendingClues = loc.clueIds.filter(id => !gameState.collectedClueIds.includes(id));

                  return (
                    <div
                      key={loc.id}
                      style={{
                        background: 'rgba(20,14,6,0.6)',
                        border: '1px solid #2a1c08',
                        padding: '1.2rem 1.5rem',
                      }}
                    >
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#c9a84c',
                        marginBottom: '0.3rem' }}>
                        {locT?.name ?? loc.name}
                      </div>
                      <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '0.8rem',
                        color: '#6a5030', lineHeight: 1.6, marginBottom: '0.7rem' }}>
                        {locT?.ambiance ?? loc.ambiance}
                      </div>
                      {locClues.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {locClues.map(c => (
                            <span
                              key={c.id}
                              style={{
                                fontFamily: 'IM Fell English, serif',
                                fontSize: '0.72rem',
                                color: '#8a6840',
                                background: 'rgba(40,28,8,0.7)',
                                border: '1px solid #3a2c10',
                                padding: '0.2rem 0.5rem',
                              }}
                            >
                              {c.icon} {T.clues[c.id]?.name ?? c.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {pendingClues.length > 0 && (
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem',
                          color: '#5a3010', letterSpacing: '0.1em' }}>
                          {pendingClues.length} {T.ui.evidenceRemain}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CLUES TAB */}
        {tab === 'clues' && (
          <div className="p-6 max-w-3xl mx-auto">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
              letterSpacing: '0.2em', marginBottom: '1.5rem', textAlign: 'center' }}>
              {T.ui.gatheredEvidence.replace('{n}', String(collectedClues.length))}
            </div>

            {collectedClues.length === 0 ? (
              <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                color: '#3a2c10', textAlign: 'center', fontSize: '1rem' }}>
                {T.ui.noCluesYet}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {collectedClues.map(clue => {
                  const clueT = T.clues[clue.id];
                  return (
                    <div
                      key={clue.id}
                      style={{
                        background: 'rgba(20,14,6,0.6)',
                        border: '1px solid #2a1c08',
                        padding: '1rem 1.2rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ fontSize: '2rem', flexShrink: 0 }}>{clue.icon}</div>
                      <div>
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#c9a84c',
                          marginBottom: '0.3rem' }}>
                          {clueT?.name ?? clue.name}
                        </div>
                        <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '0.8rem',
                          color: '#7a6040', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                          {clueT?.detail ?? clue.detail}
                        </div>
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', color: '#4a3810',
                          letterSpacing: '0.1em' }}>
                          {T.ui.foundAt} {clue.foundAt.replace(/-/g, ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* NOTES TAB */}
        {tab === 'notes' && (
          <div className="p-6 max-w-3xl mx-auto">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
              letterSpacing: '0.2em', marginBottom: '1.5rem', textAlign: 'center' }}>
              {T.ui.investigatorNotes}
            </div>

            <div
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: '#6a5830',
                lineHeight: 2,
                background: 'rgba(20,14,6,0.5)',
                border: '1px solid #2a1c08',
                padding: '2rem',
              }}
            >
              <p style={{ marginBottom: '1.2rem', color: '#8a7040' }}>
                <strong style={{ fontStyle: 'normal', fontFamily: 'Cinzel, serif',
                  fontSize: '0.75rem', color: '#c9a84c' }}>
                  {T.ui.unansweredLabel}
                </strong>
              </p>
              <p>{T.ui.q1}</p>
              <p>{T.ui.q2}</p>
              <p>{T.ui.q3}</p>
              <p>{T.ui.q4}</p>
              <p style={{ marginTop: '1.2rem', marginBottom: '1.2rem', color: '#8a7040' }}>
                <strong style={{ fontStyle: 'normal', fontFamily: 'Cinzel, serif',
                  fontSize: '0.75rem', color: '#c9a84c' }}>
                  {T.ui.observationsLabel}
                </strong>
              </p>
              {gameState.collectedClueIds.includes('midnight-log') && <p>{T.ui.obs1}</p>}
              {gameState.collectedClueIds.includes('poison-vial') && <p>{T.ui.obs2}</p>}
              {gameState.collectedClueIds.includes('passage-map') && <p>{T.ui.obs3}</p>}
              {gameState.collectedClueIds.includes('torn-letter') && <p>{T.ui.obs4}</p>}
              {gameState.collectedClueIds.includes('blood-glove') && <p>{T.ui.obs5}</p>}
              {Object.keys(gameState.dialogueNodes).includes('mira') && <p>{T.ui.obs6}</p>}
              {gameState.collectedClueIds.length < 3 && (
                <p style={{ color: '#4a3810' }}>{T.ui.continueInvest}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="vignette" />
    </div>
  );
}
