import { useState } from 'react';
import type { GameState } from '../types';
import { CLUES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface EvidenceBoardProps {
  gameState: GameState;
  onReturnToMap: () => void;
  onMakeAccusation: () => void;
  onConnectClues: (a: string, b: string) => void;
  onJournal: () => void;
}

export default function EvidenceBoard({
  gameState,
  onReturnToMap,
  onMakeAccusation,
  onConnectClues,
  onJournal,
}: EvidenceBoardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedClue, setExpandedClue] = useState<string | null>(null);
  const { T } = useLanguage();

  const collected = gameState.collectedClueIds.map(id => CLUES[id]).filter(Boolean);
  const canAccuse = gameState.collectedClueIds.length >= 5;

  function handleClueClick(clueId: string) {
    if (expandedClue === clueId) {
      setExpandedClue(null);
      return;
    }
    if (selected === null) {
      setSelected(clueId);
    } else if (selected === clueId) {
      setSelected(null);
    } else {
      const exists = gameState.connections.some(
        ([a, b]) => (a === selected && b === clueId) || (a === clueId && b === selected)
      );
      if (!exists) {
        onConnectClues(selected, clueId);
      }
      setSelected(null);
    }
  }

  function isConnected(id: string) {
    return gameState.connections.some(([a, b]) => a === id || b === id);
  }

  function getConnectionPartner(id: string): string | null {
    const conn = gameState.connections.find(([a, b]) => a === id || b === id);
    if (!conn) return null;
    return conn[0] === id ? conn[1] : conn[0];
  }

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1a1208 0%, #060402 90%)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: '#0a0806', borderBottom: '1px solid #2a1c08' }}
      >
        <div className="flex gap-3 items-center">
          <button className="medieval-btn-sm" onClick={onReturnToMap}>{T.ui.returnToMap}</button>
          <button className="medieval-btn-sm" onClick={onJournal}>{T.ui.journalBtn}</button>
          <LanguageSwitcher />
        </div>
        <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '1rem', color: '#c9a84c',
          letterSpacing: '0.1em' }}>
          {T.ui.evidenceBtn}
        </div>
        {canAccuse ? (
          <button
            className="medieval-btn"
            onClick={onMakeAccusation}
            style={{ fontSize: '0.78rem', borderColor: '#8b1a1a', color: '#cc4444',
              animation: 'pulseGold 2.5s ease-in-out infinite' }}
          >
            {T.ui.makeAccusationNav}
          </button>
        ) : (
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#3a2c10',
            letterSpacing: '0.1em' }}>
            {5 - gameState.collectedClueIds.length} {T.ui.moreCluesNeeded}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div
        className="px-6 py-2 flex items-center justify-between"
        style={{ background: '#080604', borderBottom: '1px solid #1a1208' }}
      >
        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
          fontSize: '0.78rem', color: '#4a3810' }}>
          {selected
            ? `"${T.clues[selected]?.name ?? CLUES[selected]?.name}" ${T.ui.connectionHint}`
            : T.ui.defaultHint}
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
          letterSpacing: '0.1em' }}>
          {collected.length} / 9 {T.ui.cluesLabel}
          {gameState.connections.length > 0 && ` · ${gameState.connections.length}`}
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 p-6 overflow-y-auto">
        {collected.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔍</div>
            <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
              fontSize: '1.1rem', color: '#3a2c10', textAlign: 'center' }}>
              {T.ui.noEvidence}
              <br />
              <span style={{ fontSize: '0.85rem', color: '#2a1c08' }}>
                {T.ui.investigateFirst}
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Connection lines display */}
            {gameState.connections.length > 0 && (
              <div
                className="mb-4 p-3"
                style={{ background: 'rgba(20,14,6,0.5)', border: '1px solid #2a1c08' }}
              >
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#5a4010',
                  letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  {T.ui.connectedEvidence}
                </div>
                <div className="flex flex-wrap gap-2">
                  {gameState.connections.map(([a, b], i) => {
                    const clueA = CLUES[a];
                    const clueB = CLUES[b];
                    const nameA = T.clues[a]?.name ?? clueA?.name ?? '';
                    const nameB = T.clues[b]?.name ?? clueB?.name ?? '';
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1"
                        style={{
                          background: 'rgba(40,24,8,0.7)',
                          border: '1px solid #3a2c10',
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.75rem',
                          fontFamily: 'IM Fell English, serif',
                          color: '#8a6840',
                        }}
                      >
                        <span>{clueA?.icon}</span>
                        <span style={{ color: '#4a3810', fontFamily: 'Cinzel, serif', fontSize: '0.6rem' }}> — </span>
                        <span>{clueB?.icon}</span>
                        <span style={{ marginLeft: '0.3rem', color: '#6a5030', fontSize: '0.72rem' }}>
                          {nameA} ↔ {nameB}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clue Cards Grid */}
            <div className="grid gap-4" style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            }}>
              {collected.map(clue => {
                const isSelected = selected === clue.id;
                const connected = isConnected(clue.id);
                const partner = getConnectionPartner(clue.id);
                const partnerClue = partner ? CLUES[partner] : null;
                const isExpanded = expandedClue === clue.id;
                const clueT = T.clues[clue.id];
                const partnerName = partner ? (T.clues[partner]?.name ?? partnerClue?.name ?? '') : '';

                return (
                  <div
                    key={clue.id}
                    className={`clue-card ${isSelected ? 'selected' : ''}`}
                    style={{
                      padding: '1rem',
                      position: 'relative',
                      outline: connected ? '1px solid rgba(201,168,76,0.2)' : 'none',
                      outlineOffset: 3,
                    }}
                    onClick={() => handleClueClick(clue.id)}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: 6, right: 6,
                        width: 8, height: 8,
                        borderRadius: '50%',
                        background: '#c9a84c',
                      }} />
                    )}

                    {connected && (
                      <div style={{
                        position: 'absolute',
                        top: 6, left: 6,
                        fontFamily: 'Cinzel, serif',
                        fontSize: '0.5rem',
                        color: '#8a6c28',
                        letterSpacing: '0.1em',
                      }}>
                        {T.ui.linkedBadge}
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-2" style={{ marginTop: connected ? '0.8rem' : 0 }}>
                      <div style={{
                        fontSize: '1.8rem',
                        filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.3))',
                      }}>
                        {clue.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#c9a84c',
                          letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                          {clueT?.name ?? clue.name}
                        </div>
                        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                          fontSize: '0.75rem', color: '#6a5030', lineHeight: 1.5 }}>
                          {clueT?.description ?? clue.description}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedClue(isExpanded ? null : clue.id); }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: 'Cinzel, serif', fontSize: '0.58rem',
                        color: '#5a4010', letterSpacing: '0.1em',
                        padding: '0.2rem 0',
                        textAlign: 'left',
                      }}
                    >
                      {isExpanded ? T.ui.hideDetails : T.ui.examineClosely}
                    </button>

                    {isExpanded && (
                      <div
                        className="mt-2 screen-transition"
                        style={{
                          fontFamily: 'Lora, serif',
                          fontStyle: 'italic',
                          fontSize: '0.78rem',
                          color: '#8a7050',
                          lineHeight: 1.7,
                          borderTop: '1px solid #2a1c08',
                          paddingTop: '0.6rem',
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        {clueT?.detail ?? clue.detail}
                        {partnerClue && (
                          <div style={{ marginTop: '0.5rem', color: '#8a6c28', fontSize: '0.7rem',
                            fontFamily: 'Cinzel, serif', fontStyle: 'normal', letterSpacing: '0.05em' }}>
                            ↔ {partnerClue.icon} {partnerName}
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{
                      position: 'absolute', bottom: 6, right: 6,
                      fontFamily: 'Cinzel, serif', fontSize: '0.5rem',
                      color: '#3a2c10', letterSpacing: '0.05em',
                    }}>
                      {clue.foundAt.replace(/-/g, ' ').toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {canAccuse && (
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: 'rgba(60,10,10,0.3)', borderTop: '1px solid #5a1010' }}
        >
          <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
            fontSize: '0.9rem', color: '#8b2020' }}>
            {T.ui.makeYourAccusation}
          </div>
          <button
            className="medieval-btn"
            onClick={onMakeAccusation}
            style={{ borderColor: '#8b1a1a', color: '#cc4444', fontSize: '0.85rem' }}
          >
            {T.ui.makeYourAccusation.toUpperCase()}
          </button>
        </div>
      )}

      <div className="vignette" />
    </div>
  );
}
