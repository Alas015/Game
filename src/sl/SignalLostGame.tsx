import { useState } from 'react';
import type { SLGameState, SLScreen, SLJournalTab, SLReport } from './slTypes';
import SLTitleScreen from './SLTitleScreen';
import StationMap from './StationMap';
import RoomScreen from './RoomScreen';
import LogScreen from './LogScreen';
import SLEvidenceBoard from './SLEvidenceBoard';
import SLJournal from './SLJournal';
import ReportScreen from './ReportScreen';
import SLResultScreen from './SLResultScreen';
import TutorialOverlay from '../components/TutorialOverlay';

interface SignalLostGameProps {
  onExit: () => void;
}

const INITIAL_SL_STATE: SLGameState = {
  screen: 'sl-title',
  roomId: null,
  crewId: null,
  collectedClueIds: [],
  visitedRoomIds: [],
  reviewedCrewIds: [],
  connections: [],
  report: null,
  journalTab: 'crew',
  selectedClueForConnect: null,
  inspectedItemIds: [],
};

export default function SignalLostGame({ onExit }: SignalLostGameProps) {
  const [state, setState] = useState<SLGameState>(INITIAL_SL_STATE);
  const [showTutorial, setShowTutorial] = useState(false);

  function navigate(screen: SLScreen, extra?: Partial<SLGameState>) {
    setState(s => ({ ...s, screen, ...extra }));
  }

  function handleBegin() {
    navigate('sl-map');
    setShowTutorial(true);
  }

  function handleRoomClick(roomId: string) {
    setState(s => ({
      ...s,
      screen: 'sl-room',
      roomId,
      visitedRoomIds: s.visitedRoomIds.includes(roomId)
        ? s.visitedRoomIds
        : [...s.visitedRoomIds, roomId],
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

  function handleAccessLog(crewId: string) {
    setState(s => ({
      ...s,
      screen: 'sl-log',
      crewId,
      reviewedCrewIds: s.reviewedCrewIds.includes(crewId)
        ? s.reviewedCrewIds
        : [...s.reviewedCrewIds, crewId],
    }));
  }

  function handleBackFromLog() {
    // Return to room if we came from there, else map
    if (state.roomId) {
      navigate('sl-room');
    } else {
      navigate('sl-map');
    }
  }

  function handleConnect(a: string, b: string) {
    setState(s => ({
      ...s,
      connections: [...s.connections, [a, b] as [string, string]],
    }));
  }

  function handleSelectClue(clueId: string | null) {
    setState(s => ({ ...s, selectedClueForConnect: clueId }));
  }

  function handleJournalTab(tab: SLJournalTab) {
    setState(s => ({ ...s, journalTab: tab }));
  }

  function handleSubmitReport(report: SLReport) {
    setState(s => ({ ...s, report, screen: 'sl-result' }));
  }

  function handlePlayAgain() {
    setState(INITIAL_SL_STATE);
  }

  const { screen } = state;

  return (
    <>
      {screen === 'sl-title' && (
        <SLTitleScreen onBegin={handleBegin} onExit={onExit} />
      )}

      {screen === 'sl-map' && (
        <StationMap
          gameState={state}
          onRoomClick={handleRoomClick}
          onEvidence={() => navigate('sl-evidence')}
          onJournal={() => navigate('sl-journal')}
          onReport={() => navigate('sl-report')}
          onExit={() => navigate('sl-title')}
        />
      )}

      {screen === 'sl-room' && state.roomId && (
        <RoomScreen
          gameState={state}
          onBack={() => navigate('sl-map')}
          onCollectClue={handleCollectClue}
          onInspectItem={handleInspectItem}
          onAccessLog={handleAccessLog}
          onEvidence={() => navigate('sl-evidence')}
          onJournal={() => navigate('sl-journal')}
        />
      )}

      {screen === 'sl-log' && (
        <LogScreen
          gameState={state}
          onBack={handleBackFromLog}
        />
      )}

      {screen === 'sl-evidence' && (
        <SLEvidenceBoard
          gameState={state}
          onBack={() => navigate('sl-map')}
          onConnect={handleConnect}
          onSelectClue={handleSelectClue}
          onReport={() => navigate('sl-report')}
        />
      )}

      {screen === 'sl-journal' && (
        <SLJournal
          gameState={state}
          onBack={() => navigate('sl-map')}
          onTabChange={handleJournalTab}
        />
      )}

      {screen === 'sl-report' && (
        <ReportScreen
          onSubmit={handleSubmitReport}
          onBack={() => navigate('sl-map')}
          collectedClueIds={state.collectedClueIds}
        />
      )}

      {screen === 'sl-result' && state.report && (
        <SLResultScreen
          report={state.report}
          collectedClueIds={state.collectedClueIds}
          onPlayAgain={handlePlayAgain}
          onExit={onExit}
        />
      )}
      {showTutorial && <TutorialOverlay game="signal-lost" onDismiss={() => setShowTutorial(false)} />}
    </>
  );
}
