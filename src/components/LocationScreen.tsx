import { useState } from 'react';
import type { GameState, InspectItem } from '../types';
import { LOCATIONS, CHARACTERS, CLUES } from '../data/gameData';
import CharacterPortrait from './CharacterPortrait';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface LocationScreenProps {
  gameState: GameState;
  onReturnToMap: () => void;
  onCharacterClick: (characterId: string) => void;
  onCollectClue: (clueId: string) => void;
  onEvidenceBoard: () => void;
  onJournal: () => void;
}

export default function LocationScreen({
  gameState,
  onReturnToMap,
  onCharacterClick,
  onCollectClue,
  onEvidenceBoard,
  onJournal,
}: LocationScreenProps) {
  const [inspecting, setInspecting] = useState<InspectItem | null>(null);
  const [justCollected, setJustCollected] = useState<string | null>(null);
  const { T } = useLanguage();

  const location = gameState.locationId ? LOCATIONS[gameState.locationId] : null;
  if (!location) return null;

  const locT = T.locations[location.id];
  const characters = location.characterIds.map(id => CHARACTERS[id]).filter(Boolean);

  function handleInspect(item: InspectItem) {
    setInspecting(item);
    if (item.revealsClueId && !gameState.collectedClueIds.includes(item.revealsClueId)) {
      setJustCollected(item.revealsClueId);
    }
  }

  function handleCloseInspect() {
    if (inspecting?.revealsClueId && justCollected === inspecting.revealsClueId) {
      onCollectClue(inspecting.revealsClueId);
    }
    setJustCollected(null);
    setInspecting(null);
  }

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1c1408 0%, #080604 80%)' }}
    >
      {/* Navigation Bar */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: '#0f0a06', borderBottom: '1px solid #2a1c08' }}
      >
        <button className="medieval-btn-sm" onClick={onReturnToMap}>
          {T.ui.returnToMap}
        </button>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#8a6c28', letterSpacing: '0.15em' }}>
          {(locT?.name ?? location.name).toUpperCase()}
        </div>
        <div className="flex gap-3 items-center">
          <button className="medieval-btn-sm" onClick={onJournal}>{T.ui.journalBtn}</button>
          <button className="medieval-btn-sm" onClick={onEvidenceBoard}>
            {T.ui.evidenceBtn} ({gameState.collectedClueIds.length})
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-0 overflow-hidden">

        {/* Left Panel: Location Info */}
        <div
          className="w-72 flex-shrink-0 flex flex-col overflow-y-auto"
          style={{ borderRight: '1px solid #2a1c08', background: '#0c0906' }}
        >
          <div className="p-5" style={{ borderBottom: '1px solid #2a1c08' }}>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.1rem',
                color: '#c9a84c',
                letterSpacing: '0.1em',
                marginBottom: '0.8rem',
                textTransform: 'uppercase',
              }}
            >
              {locT?.name ?? location.name}
            </h2>
            <p
              style={{
                fontFamily: 'IM Fell English, serif',
                fontSize: '0.9rem',
                color: '#a08848',
                lineHeight: 1.7,
                marginBottom: '0.8rem',
              }}
            >
              {locT?.description ?? location.description}
            </p>
            <div
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                fontSize: '0.82rem',
                color: '#6a5030',
                lineHeight: 1.6,
                padding: '0.7rem',
                borderLeft: '2px solid #3a2c10',
                background: 'rgba(201,168,76,0.04)',
              }}
            >
              {locT?.ambiance ?? location.ambiance}
            </div>
          </div>

          {/* Collected Clues Preview */}
          {location.clueIds.filter(id => gameState.collectedClueIds.includes(id)).length > 0 && (
            <div className="p-4" style={{ borderBottom: '1px solid #1a1208' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                {T.ui.gatheredHere}
              </div>
              {location.clueIds
                .filter(id => gameState.collectedClueIds.includes(id))
                .map(id => CLUES[id])
                .filter(Boolean)
                .map(clue => {
                  const clueT = T.clues[clue.id];
                  return (
                    <div key={clue.id} className="flex items-center gap-2 mb-1.5">
                      <span style={{ fontSize: '0.85rem' }}>{clue.icon}</span>
                      <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.8rem', color: '#8a7048' }}>
                        {clueT?.name ?? clue.name}
                      </span>
                      <span style={{ color: '#4a7828', fontSize: '0.7rem' }}>✓</span>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>

        {/* Center/Right: Actions */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6">

          {/* Inspect Items */}
          <div className="mb-8">
            <div className="ornament-divider mb-4">
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em',
                color: '#5a4010', textTransform: 'uppercase' }}>
                {T.ui.examineSection}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3" style={{ maxWidth: 600 }}>
              {location.inspectItems.map((item) => {
                const alreadyCollected = item.revealsClueId && gameState.collectedClueIds.includes(item.revealsClueId);
                const hasClue = !!item.revealsClueId;
                const itemT = T.inspectItems[item.id];

                return (
                  <button
                    key={item.id}
                    className="clue-card text-left p-4 flex items-start gap-3"
                    onClick={() => handleInspect(item)}
                    style={{ opacity: alreadyCollected ? 0.65 : 1 }}
                  >
                    <div
                      style={{
                        width: 32, height: 32, flexShrink: 0,
                        border: `1px solid ${hasClue ? '#5a4010' : '#2a2010'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem',
                        background: alreadyCollected ? '#1a1408' : '#0f0c06',
                      }}
                    >
                      {alreadyCollected ? '✓' : '🔍'}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.8rem', color: '#c9a84c',
                        letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                        {itemT?.name ?? item.name}
                      </div>
                      <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                        fontSize: '0.82rem', color: '#6a5030' }}>
                        {itemT?.description ?? item.description}
                      </div>
                      {hasClue && !alreadyCollected && (
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#8b2020',
                          letterSpacing: '0.1em', marginTop: '0.3rem' }}>
                          {T.ui.evidencePossible}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Characters */}
          {characters.length > 0 && (
            <div>
              <div className="ornament-divider mb-4">
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em',
                  color: '#5a4010', textTransform: 'uppercase' }}>
                  {T.ui.personsSection}
                </span>
              </div>

              <div className="flex flex-wrap gap-5">
                {characters.map(char => {
                  const charT = T.characters[char.id];
                  return (
                    <button
                      key={char.id}
                      className="flex flex-col items-center gap-2 group"
                      onClick={() => onCharacterClick(char.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          border: '1px solid #3a2c10',
                          transition: 'border-color 0.2s',
                          boxShadow: '0 0 0 0 rgba(201,168,76,0)',
                        }}
                        className="group-hover:[border-color:#8a6c28] group-hover:[box-shadow:0_0_12px_rgba(201,168,76,0.2)]"
                      >
                        <CharacterPortrait portraitType={char.portraitType} size="md" />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.72rem', color: '#c9a84c',
                          letterSpacing: '0.05em' }}>
                          {charT?.name ?? char.name}
                        </div>
                        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                          fontSize: '0.7rem', color: '#5a4828' }}>
                          {charT?.title ?? char.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inspect Modal */}
      {inspecting && (() => {
        const itemT = T.inspectItems[inspecting.id];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(4,2,1,0.88)' }}
            onClick={handleCloseInspect}
          >
            <div
              className="relative max-w-lg w-full mx-6 screen-transition"
              style={{
                background: 'linear-gradient(160deg, #1a1408 0%, #0f0c06 100%)',
                border: '1px solid #8a6c28',
                outline: '1px solid rgba(201,168,76,0.15)',
                outlineOffset: '4px',
                padding: '2rem',
              }}
              onClick={e => e.stopPropagation()}
            >
              {['tl','tr','bl','br'].map(c => (
                <div key={c} style={{
                  position: 'absolute',
                  top: c.startsWith('t') ? 6 : 'auto',
                  bottom: c.startsWith('b') ? 6 : 'auto',
                  left: c.endsWith('l') ? 6 : 'auto',
                  right: c.endsWith('r') ? 6 : 'auto',
                  color: '#5a4010',
                  fontSize: 10,
                }}>✦</div>
              ))}

              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#c9a84c',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {itemT?.name ?? inspecting.name}
              </h3>

              <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.95rem', color: '#c4a870',
                lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {itemT?.text ?? inspecting.text}
              </p>

              {inspecting.revealsClueId && (
                <div
                  style={{
                    background: 'rgba(40,24,8,0.8)',
                    border: '1px solid #5a4010',
                    padding: '0.8rem 1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#8a6c28',
                    letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                    {gameState.collectedClueIds.includes(inspecting.revealsClueId) ? T.ui.previouslyFound : T.ui.evidenceFound}
                  </div>
                  {(() => {
                    const clue = CLUES[inspecting.revealsClueId];
                    const clueT = clue ? T.clues[clue.id] : null;
                    return clue ? (
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: '1.5rem' }}>{clue.icon}</span>
                        <div>
                          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#c9a84c' }}>
                            {clueT?.name ?? clue.name}
                          </div>
                          <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                            fontSize: '0.8rem', color: '#8a6840' }}>
                            {clueT?.description ?? clue.description}
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <button className="medieval-btn w-full" onClick={handleCloseInspect}
                style={{ fontSize: '0.8rem' }}>
                {inspecting.revealsClueId && !gameState.collectedClueIds.includes(inspecting.revealsClueId)
                  ? T.ui.collectAndClose
                  : T.ui.closeBtn}
              </button>
            </div>
          </div>
        );
      })()}

      <div className="vignette" />
    </div>
  );
}
