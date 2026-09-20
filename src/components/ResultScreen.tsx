import { useState, useEffect } from 'react';
import type { Accusation } from '../types';
import { CHARACTERS, MOTIVES, METHODS, CORRECT_ANSWER } from '../data/gameData';
import CharacterPortrait from './CharacterPortrait';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface ResultScreenProps {
  accusation: Accusation;
  onPlayAgain: () => void;
  collectedClueIds: string[];
}

export default function ResultScreen({ accusation, onPlayAgain, collectedClueIds }: ResultScreenProps) {
  const [phase, setPhase] = useState(0);
  const { T } = useLanguage();

  const isCorrectSuspect = accusation.suspectId === CORRECT_ANSWER.suspectId;
  const isCorrectMotive = accusation.motiveId === CORRECT_ANSWER.motiveId;
  const isCorrectMethod = accusation.methodId === CORRECT_ANSWER.methodId;
  const isFullyCorrect = isCorrectSuspect && isCorrectMotive && isCorrectMethod;

  const correctChar = CHARACTERS[CORRECT_ANSWER.suspectId];
  const accusedChar = CHARACTERS[accusation.suspectId];
  const motive = MOTIVES.find(m => m.id === accusation.motiveId);
  const method = METHODS.find(m => m.id === accusation.methodId);
  const correctMotive = MOTIVES.find(m => m.id === CORRECT_ANSWER.motiveId);
  const correctMethod = METHODS.find(m => m.id === CORRECT_ANSWER.methodId);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col screen-transition overflow-y-auto"
      style={{
        background: isFullyCorrect
          ? 'radial-gradient(ellipse at 50% 20%, #1a1408 0%, #080604 90%)'
          : 'radial-gradient(ellipse at 50% 20%, #1a0808 0%, #060402 90%)',
      }}
    >
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-30">
        <LanguageSwitcher />
      </div>

      {/* Dramatic verdict banner */}
      {phase >= 1 && (
        <div
          className="screen-transition text-center py-8"
          style={{
            background: isFullyCorrect
              ? 'linear-gradient(180deg, rgba(30,22,8,0.9) 0%, rgba(20,14,6,0.7) 100%)'
              : 'linear-gradient(180deg, rgba(40,8,8,0.9) 0%, rgba(20,4,4,0.7) 100%)',
            borderBottom: `1px solid ${isFullyCorrect ? '#8a6c28' : '#5a1010'}`,
            padding: '3rem 2rem',
          }}
        >
          <div
            style={{
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              color: isFullyCorrect ? '#c9a84c' : '#8b2020',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            {isFullyCorrect ? T.ui.justicePrevealed : T.ui.justiceDenied}
          </div>
          <div
            style={{
              fontFamily: 'IM Fell English, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: isFullyCorrect ? '#a08848' : '#8b4040',
              marginTop: '0.5rem',
            }}
          >
            {isFullyCorrect ? T.ui.deductionCorrect : T.ui.accusationMistaken}
          </div>
        </div>
      )}

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">

          {/* Accusation Review */}
          {phase >= 2 && (
            <div
              className="screen-transition"
              style={{
                background: 'rgba(20,14,6,0.6)',
                border: `1px solid ${isFullyCorrect ? '#5a4010' : '#3a1010'}`,
                padding: '1.5rem 2rem',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                color: '#5a4010', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                {T.ui.yourAccusationResult}
              </div>
              <div className="flex flex-wrap gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <CharacterPortrait portraitType={accusedChar?.portraitType || 'knight'} size="md" />
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem',
                    color: isCorrectSuspect ? '#c9a84c' : '#8b2020' }}>
                    {T.characters[accusation.suspectId]?.name ?? accusedChar?.name}
                    <span style={{ marginLeft: '0.5rem' }}>{isCorrectSuspect ? '✓' : '✗'}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                      letterSpacing: '0.1em' }}>{T.ui.motiveStep}: </span>
                    <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem',
                      color: isCorrectMotive ? '#c9a84c' : '#8b2020' }}>
                      {T.motives[accusation.motiveId]?.label ?? motive?.label} {isCorrectMotive ? '✓' : '✗'}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                      letterSpacing: '0.1em' }}>{T.ui.methodStep}: </span>
                    <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem',
                      color: isCorrectMethod ? '#c9a84c' : '#8b2020' }}>
                      {T.methods[accusation.methodId]?.label ?? method?.label} {isCorrectMethod ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Correct Answer (if wrong) */}
          {phase >= 2 && !isFullyCorrect && (
            <div
              className="screen-transition"
              style={{
                background: 'rgba(20,14,6,0.6)',
                border: '1px solid #8a6c28',
                padding: '1.5rem 2rem',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#8a6c28',
                letterSpacing: '0.15em', marginBottom: '1rem' }}>
                {T.ui.theTruth}
              </div>
              <div className="flex flex-wrap gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <CharacterPortrait portraitType={correctChar?.portraitType || 'commander'} size="md" />
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#c9a84c' }}>
                    {T.characters[CORRECT_ANSWER.suspectId]?.name ?? correctChar?.name}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                      letterSpacing: '0.1em' }}>{T.ui.motiveStep}: </span>
                    <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem', color: '#a08848' }}>
                      {T.motives[CORRECT_ANSWER.motiveId]?.label ?? correctMotive?.label}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                      letterSpacing: '0.1em' }}>{T.ui.methodStep}: </span>
                    <span style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem', color: '#a08848' }}>
                      {T.methods[CORRECT_ANSWER.methodId]?.label ?? correctMethod?.label}
                    </span>
                  </div>
                  <div style={{ marginTop: '0.8rem', fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                    color: '#5a4010', letterSpacing: '0.08em' }}>
                    {collectedClueIds.length < 7 ? T.ui.notEnoughEvidence : T.ui.evidenceButFailed}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Story Reveal */}
          {phase >= 3 && (
            <div
              className="screen-transition"
              style={{
                background: 'rgba(15,10,4,0.8)',
                border: '1px solid #3a2c10',
                padding: '2rem',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#8a6c28',
                letterSpacing: '0.2em', marginBottom: '1.5rem', textAlign: 'center' }}>
                ⚜ &nbsp; {T.ui.fullAccount} &nbsp; ⚜
              </div>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: '#8a7850',
                  lineHeight: 2,
                  whiteSpace: 'pre-line',
                }}
              >
                {T.fullStory}
              </div>
            </div>
          )}

          {/* Score */}
          {phase >= 3 && (
            <div
              className="screen-transition text-center"
              style={{
                background: 'rgba(15,10,4,0.7)',
                border: '1px solid #2a1c08',
                padding: '1.5rem',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#5a4010',
                letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
                {T.ui.finalAssessment}
              </div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem',
                color: isFullyCorrect ? '#c9a84c' : '#8b2020', marginBottom: '0.5rem' }}>
                {isFullyCorrect
                  ? T.ui.masterInvestigator
                  : isCorrectSuspect
                  ? T.ui.keenEye
                  : T.ui.remainsInShadow}
              </div>
              <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                fontSize: '0.85rem', color: '#5a4828', marginBottom: '1.5rem' }}>
                {T.ui.evidenceCollectedScore}: {collectedClueIds.length} / 9 ·{' '}
                {isCorrectSuspect ? '1' : '0'}/1 ·{' '}
                {isCorrectMotive ? '1' : '0'}/1 ·{' '}
                {isCorrectMethod ? '1' : '0'}/1
              </div>

              <button
                className="medieval-btn"
                onClick={onPlayAgain}
                style={{ fontSize: '0.85rem' }}
              >
                {T.ui.playAgain}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}
