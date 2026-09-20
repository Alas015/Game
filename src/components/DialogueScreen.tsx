import { useState } from 'react';
import type { GameState } from '../types';
import { CHARACTERS, CLUES } from '../data/gameData';
import CharacterPortrait from './CharacterPortrait';
import { useLanguage } from '../i18n/LanguageContext';

interface DialogueScreenProps {
  gameState: GameState;
  onReturn: () => void;
  onCollectClue: (clueId: string) => void;
  onAdvanceDialogue: (characterId: string, nodeId: string) => void;
}

export default function DialogueScreen({
  gameState,
  onReturn,
  onCollectClue,
  onAdvanceDialogue,
}: DialogueScreenProps) {
  const [lastRevealedClue, setLastRevealedClue] = useState<string | null>(null);
  const [showClueNotif, setShowClueNotif] = useState(false);
  const { T } = useLanguage();

  const character = gameState.characterId ? CHARACTERS[gameState.characterId] : null;
  if (!character) return null;

  const charT = T.characters[character.id];
  const currentNodeId = gameState.dialogueNodes[character.id] || 'start';
  const currentNode = character.dialogue.find(n => n.id === currentNodeId);
  if (!currentNode) return null;

  const dialogueNodeT = T.dialogue[character.id]?.[currentNodeId];

  function handleOption(optionId: string) {
    if (!character) return;
    const option = currentNode?.options.find(o => o.id === optionId);
    if (!option) return;

    if (option.revealsClueId && !gameState.collectedClueIds.includes(option.revealsClueId)) {
      onCollectClue(option.revealsClueId);
      setLastRevealedClue(option.revealsClueId);
      setShowClueNotif(true);
      setTimeout(() => setShowClueNotif(false), 3000);
    }

    if (option.nextNodeId) {
      onAdvanceDialogue(character.id, option.nextNodeId);
    } else {
      onReturn();
    }
  }

  const revealedClue = lastRevealedClue ? CLUES[lastRevealedClue] : null;

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #1a1008 0%, #080604 70%)' }}
    >
      {/* Clue notification toast */}
      {showClueNotif && revealedClue && (
        <div
          className="fixed top-4 right-4 z-50 screen-transition"
          style={{
            background: '#0f0c06',
            border: '1px solid #8a6c28',
            padding: '0.8rem 1.2rem',
            maxWidth: 280,
          }}
        >
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#c9a84c',
            letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
            {T.ui.cluesLabel}
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.2rem' }}>{revealedClue.icon}</span>
            <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem', color: '#a08848' }}>
              {T.clues[revealedClue.id]?.name ?? revealedClue.name}
            </span>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: '#0a0806', borderBottom: '1px solid #1a1208' }}
      >
        <button className="medieval-btn-sm" onClick={onReturn}>
          {T.ui.returnBtn}
        </button>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', color: '#5a4010',
          letterSpacing: '0.15em' }}>
          {T.ui.interrogationLabel}
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* Dialogue Area */}
      <div className="flex-1 flex overflow-hidden">

        {/* Character Portrait Panel */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-10 pb-6 px-6"
          style={{
            width: 240,
            borderRight: '1px solid #1a1208',
            background: 'linear-gradient(180deg, #0c0a06 0%, #080604 100%)',
          }}
        >
          <div className="mb-4" style={{ position: 'relative' }}>
            <CharacterPortrait portraitType={character.portraitType} size="lg" />
            <div style={{
              position: 'absolute',
              inset: -8,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(180,100,20,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#c9a84c',
              letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
              {charT?.name ?? character.name}
            </div>
            <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
              fontSize: '0.78rem', color: '#5a4828', marginBottom: '1rem' }}>
              {charT?.title ?? character.title}
            </div>
          </div>

          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              fontSize: '0.75rem',
              color: '#4a3a20',
              lineHeight: 1.6,
              textAlign: 'center',
              padding: '0.8rem',
              borderTop: '1px solid #1a1208',
              borderBottom: '1px solid #1a1208',
            }}
          >
            {charT?.description ?? character.description}
          </div>

          <div
            className="mt-4"
            style={{
              padding: '0.7rem',
              background: 'rgba(80,15,15,0.2)',
              border: '1px solid #3a1010',
            }}
          >
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', color: '#8b2020',
              letterSpacing: '0.12em', marginBottom: '0.3rem' }}>
              {T.ui.suspiciousLabel}
            </div>
            <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '0.72rem',
              color: '#6a3028', lineHeight: 1.5 }}>
              {charT?.suspicious ?? character.suspicious}
            </div>
          </div>
        </div>

        {/* Dialogue Panel */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">

          {/* Character Speech */}
          <div
            className="flex-1 flex items-center px-12 py-8"
            style={{
              background: 'radial-gradient(ellipse at 40% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)',
            }}
          >
            <div className="w-full max-w-2xl">
              <div
                style={{
                  position: 'relative',
                  background: 'rgba(20,14,6,0.6)',
                  border: '1px solid #3a2c10',
                  padding: '1.8rem 2rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 32,
                    background: '#1a1208',
                    padding: '0 8px',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.6rem',
                    color: '#8a6c28',
                    letterSpacing: '0.15em',
                  }}
                >
                  {(charT?.name ?? character.name).toUpperCase()}
                </div>
                <p
                  style={{
                    fontFamily: 'IM Fell English, serif',
                    fontSize: '1.05rem',
                    color: '#d4c098',
                    lineHeight: 1.85,
                    fontStyle: 'italic',
                  }}
                >
                  "{dialogueNodeT?.text ?? currentNode.text}"
                </p>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #2a1c08, transparent)' }} />

          {/* Response Options */}
          <div
            className="p-6"
            style={{ background: 'linear-gradient(0deg, #0a0806 0%, rgba(10,8,6,0.5) 100%)' }}
          >
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#4a3810',
              letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
              {T.ui.responseLabel}
            </div>
            <div className="flex flex-col gap-2 max-w-2xl">
              {currentNode.options.map((opt) => {
                const optText = dialogueNodeT?.options[opt.id] ?? opt.text;
                return (
                  <button
                    key={opt.id}
                    className="dialogue-option"
                    onClick={() => handleOption(opt.id)}
                  >
                    <span style={{ color: '#5a4010', marginRight: '0.5rem' }}>▶</span>
                    {optText}
                    {opt.revealsClueId && !gameState.collectedClueIds.includes(opt.revealsClueId) && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#6a4010' }}>
                        {T.ui.revealsEvidence}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}
