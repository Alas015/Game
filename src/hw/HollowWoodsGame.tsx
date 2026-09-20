import { useState } from 'react';
import type { HWGameState, HWScreen, HWJournalTab, HWFinding } from './hwTypes';
import HWTitleScreen from './HWTitleScreen';
import ForestMap from './ForestMap';
import ClearingScreen from './ClearingScreen';
import TestimonyScreen from './TestimonyScreen';
import HWEvidenceBoard from './HWEvidenceBoard';
import HWJournal from './HWJournal';
import FindingScreen from './FindingScreen';
import HWResultScreen from './HWResultScreen';

interface HollowWoodsGameProps {
  onExit: () => void;
}

const INITIAL_HW_STATE: HWGameState = {
  screen: 'hw-title',
  clearingId: null,
  personId: null,
  collectedClueIds: [],
  visitedClearingIds: [],
  reviewedPersonIds: [],
  connections: [],
  finding: null,
  journalTab: 'people',
  selectedClueForConnect: null,
  inspectedItemIds: [],
};

export default function HollowWoodsGame({ onExit }: HollowWoodsGameProps) {
  const [state, setState] = useState<HWGameState>(INITIAL_HW_STATE);

  function navigate(screen: HWScreen, extra?: Partial<HWGameState>) {
    setState(s => ({ ...s, screen, ...extra }));
  }

  function handleBegin() {
    navigate('hw-map');
  }

  function handleClearingClick(clearingId: string) {
    setState(s => ({
      ...s,
      screen: 'hw-clearing',
      clearingId,
      visitedClearingIds: s.visitedClearingIds.includes(clearingId)
        ? s.visitedClearingIds
        : [...s.visitedClearingIds, clearingId],
    }));
  }

  function handleCollectClue(clueId: string) {
    setState(s => ({
      ...s,
      collectedClueIds: s.collectedClueIds.includes(clueId)
        ? s.collectedClueIds
        : [...s.collectedClueIds, clueId],
    }));
  }

  function handleInspectItem(itemId: string) {
    setState(s => ({
      ...s,
      inspectedItemIds: s.inspectedItemIds.includes(itemId)
        ? s.inspectedItemIds
        : [...s.inspectedItemIds, itemId],
    }));
  }

  function handleTalk(personId: string) {
    setState(s => ({
      ...s,
      screen: 'hw-testimony',
      personId,
      reviewedPersonIds: s.reviewedPersonIds.includes(personId)
        ? s.reviewedPersonIds
        : [...s.reviewedPersonIds, personId],
    }));
  }

  function handleBackFromTestimony() {
    if (state.clearingId) {
      navigate('hw-clearing');
    } else {
      navigate('hw-map');
    }
  }

  function handleConnect(a: string, b: string) {
    setState(s => ({ ...s, connections: [...s.connections, [a, b] as [string, string]] }));
  }

  function handleSelectClue(clueId: string | null) {
    setState(s => ({ ...s, selectedClueForConnect: clueId }));
  }

  function handleJournalTab(tab: HWJournalTab) {
    setState(s => ({ ...s, journalTab: tab }));
  }

  function handleSubmitFinding(finding: HWFinding) {
    setState(s => ({ ...s, finding, screen: 'hw-result' }));
  }

  function handlePlayAgain() {
    setState(INITIAL_HW_STATE);
  }

  const { screen } = state;

  return (
    <>
      {screen === 'hw-title' && (
        <HWTitleScreen onBegin={handleBegin} onExit={onExit} />
      )}

      {screen === 'hw-map' && (
        <ForestMap
          gameState={state}
          onClearingClick={handleClearingClick}
          onEvidence={() => navigate('hw-evidence')}
          onJournal={() => navigate('hw-journal')}
          onFinding={() => navigate('hw-finding')}
          onExit={() => navigate('hw-title')}
        />
      )}

      {screen === 'hw-clearing' && state.clearingId && (
        <ClearingScreen
          gameState={state}
          onBack={() => navigate('hw-map')}
          onCollectClue={handleCollectClue}
          onInspectItem={handleInspectItem}
          onTalk={handleTalk}
          onEvidence={() => navigate('hw-evidence')}
          onJournal={() => navigate('hw-journal')}
        />
      )}

      {screen === 'hw-testimony' && (
        <TestimonyScreen gameState={state} onBack={handleBackFromTestimony} />
      )}

      {screen === 'hw-evidence' && (
        <HWEvidenceBoard
          gameState={state}
          onBack={() => navigate('hw-map')}
          onConnect={handleConnect}
          onSelectClue={handleSelectClue}
          onFinding={() => navigate('hw-finding')}
        />
      )}

      {screen === 'hw-journal' && (
        <HWJournal gameState={state} onBack={() => navigate('hw-map')} onTabChange={handleJournalTab} />
      )}

      {screen === 'hw-finding' && (
        <FindingScreen
          onSubmit={handleSubmitFinding}
          onBack={() => navigate('hw-map')}
          collectedClueIds={state.collectedClueIds}
        />
      )}

      {screen === 'hw-result' && state.finding && (
        <HWResultScreen
          finding={state.finding}
          collectedClueIds={state.collectedClueIds}
          onPlayAgain={handlePlayAgain}
          onExit={onExit}
        />
      )}
    </>
  );
}
