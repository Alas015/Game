import { useState } from 'react';
import type { Accusation } from '../types';
import { CHARACTERS, MOTIVES, METHODS } from '../data/gameData';
import CharacterPortrait from './CharacterPortrait';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface AccusationScreenProps {
  onSubmit: (accusation: Accusation) => void;
  onReturn: () => void;
  collectedClueIds: string[];
}

export default function AccusationScreen({ onSubmit, onReturn, collectedClueIds: _collectedClueIds }: AccusationScreenProps) {
  const [suspectId, setSuspectId] = useState<string | null>(null);
  const [motiveId, setMotiveId] = useState<string | null>(null);
  const [methodId, setMethodId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const { T } = useLanguage();

  const canSubmit = suspectId && motiveId && methodId;
  const suspects = Object.values(CHARACTERS);

  function handleSubmit() {
    if (!canSubmit) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    onSubmit({ suspectId: suspectId!, motiveId: motiveId!, methodId: methodId! });
  }

  const accusationText = canSubmit
    ? T.ui.iAccuseTemplate
        .replace('{name}', T.characters[suspectId!]?.name ?? CHARACTERS[suspectId!]?.name ?? '')
        .replace('{motive}', T.motives[motiveId!]?.label ?? MOTIVES.find(m => m.id === motiveId)?.label ?? '')
        .replace('{method}', T.methods[methodId!]?.label ?? METHODS.find(m => m.id === methodId)?.label ?? '')
    : '';

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1a0808 0%, #060402 90%)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: '#0a0604', borderBottom: '1px solid #2a1010' }}
      >
        <button className="medieval-btn-sm" onClick={onReturn}>{T.ui.backBtn}</button>
        <div
          style={{
            fontFamily: 'Cinzel Decorative, serif',
            fontSize: '1rem',
            color: '#cc4444',
            letterSpacing: '0.1em',
          }}
        >
          {T.ui.makeYourAccusation}
        </div>
        <LanguageSwitcher />
      </div>

      {/* Atmospheric Header */}
      <div
        className="text-center py-6 px-6"
        style={{ borderBottom: '1px solid #2a1010', background: 'rgba(60,10,10,0.2)' }}
      >
        <p
          style={{
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#9a5040',
            lineHeight: 1.7,
          }}
        >
          {T.ui.accusationDrama}
        </p>
      </div>

      {/* Selection Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Step 1: Choose Suspect */}
          <div>
            <div className="ornament-divider mb-4">
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: suspectId ? '#8a6c28' : '#8b2020',
                  textTransform: 'uppercase',
                }}
              >
                {T.ui.guiltyParty}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {suspects.map(char => {
                const isSelected = suspectId === char.id;
                const charT = T.characters[char.id];
                return (
                  <button
                    key={char.id}
                    onClick={() => setSuspectId(char.id)}
                    className="flex flex-col items-center gap-2"
                    style={{
                      background: 'none',
                      border: `2px solid ${isSelected ? '#cc4444' : '#2a1c08'}`,
                      padding: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 20px rgba(180,30,30,0.3)' : 'none',
                      minWidth: 110,
                    }}
                  >
                    <CharacterPortrait portraitType={char.portraitType} size="sm" />
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.65rem',
                      color: isSelected ? '#cc4444' : '#6a5030',
                      letterSpacing: '0.05em',
                      textAlign: 'center',
                    }}>
                      {charT?.name ?? char.name}
                    </div>
                    <div style={{
                      fontFamily: 'IM Fell English, serif',
                      fontStyle: 'italic',
                      fontSize: '0.6rem',
                      color: isSelected ? '#8b2020' : '#3a2c10',
                      textAlign: 'center',
                    }}>
                      {charT?.title ?? char.title}
                    </div>
                    {isSelected && (
                      <div style={{ fontSize: '0.7rem', color: '#cc4444' }}>
                        {T.ui.accusedBadge}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Motive */}
          <div>
            <div className="ornament-divider mb-4">
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: motiveId ? '#8a6c28' : '#8b2020',
                  textTransform: 'uppercase',
                }}
              >
                {T.ui.motiveStep}
              </span>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {MOTIVES.map(m => {
                const isSelected = motiveId === m.id;
                const motT = T.motives[m.id];
                return (
                  <button
                    key={m.id}
                    onClick={() => setMotiveId(m.id)}
                    style={{
                      background: isSelected ? 'rgba(80,10,10,0.5)' : 'rgba(20,12,6,0.6)',
                      border: `1px solid ${isSelected ? '#cc4444' : '#2a1c08'}`,
                      padding: '0.8rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      boxShadow: isSelected ? '0 0 12px rgba(180,30,30,0.2)' : 'none',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.75rem',
                      color: isSelected ? '#cc4444' : '#c9a84c',
                      marginBottom: '0.3rem',
                    }}>
                      {isSelected && '◆ '}{motT?.label ?? m.label}
                    </div>
                    <div style={{
                      fontFamily: 'IM Fell English, serif',
                      fontStyle: 'italic',
                      fontSize: '0.73rem',
                      color: isSelected ? '#9a4040' : '#5a4010',
                      lineHeight: 1.5,
                    }}>
                      {motT?.description ?? m.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Choose Method */}
          <div>
            <div className="ornament-divider mb-4">
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: methodId ? '#8a6c28' : '#8b2020',
                  textTransform: 'uppercase',
                }}
              >
                {T.ui.methodStep}
              </span>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {METHODS.map(m => {
                const isSelected = methodId === m.id;
                const metT = T.methods[m.id];
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethodId(m.id)}
                    style={{
                      background: isSelected ? 'rgba(80,10,10,0.5)' : 'rgba(20,12,6,0.6)',
                      border: `1px solid ${isSelected ? '#cc4444' : '#2a1c08'}`,
                      padding: '0.8rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      boxShadow: isSelected ? '0 0 12px rgba(180,30,30,0.2)' : 'none',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.75rem',
                      color: isSelected ? '#cc4444' : '#c9a84c',
                      marginBottom: '0.3rem',
                    }}>
                      {isSelected && '◆ '}{metT?.label ?? m.label}
                    </div>
                    <div style={{
                      fontFamily: 'IM Fell English, serif',
                      fontStyle: 'italic',
                      fontSize: '0.73rem',
                      color: isSelected ? '#9a4040' : '#5a4010',
                      lineHeight: 1.5,
                    }}>
                      {metT?.description ?? m.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary & Submit */}
          {canSubmit && (
            <div
              className="screen-transition"
              style={{
                background: 'rgba(40,8,8,0.6)',
                border: '1px solid #5a1010',
                padding: '1.5rem 2rem',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', color: '#8b2020',
                letterSpacing: '0.15em', marginBottom: '1rem', textAlign: 'center' }}>
                {T.ui.yourAccusationLabel}
              </div>
              <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                fontSize: '1rem', color: '#c4906a', lineHeight: 1.8, textAlign: 'center',
                marginBottom: '1.5rem' }}>
                "{accusationText}"
              </p>

              {confirming && (
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#8b2020',
                  textAlign: 'center', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  {T.ui.areYouCertain}
                </p>
              )}

              <div className="flex gap-3 justify-center">
                {confirming && (
                  <button
                    className="medieval-btn"
                    onClick={() => setConfirming(false)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {T.ui.reconsiderBtn}
                  </button>
                )}
                <button
                  className="medieval-btn"
                  onClick={handleSubmit}
                  style={{
                    fontSize: '0.85rem',
                    borderColor: '#8b1a1a',
                    color: '#cc4444',
                  }}
                >
                  {confirming ? T.ui.sealAccusation : T.ui.declareGuilt}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}
