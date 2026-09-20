import { useState } from 'react';
import type { GameState, GameScreen, JournalTab, Accusation } from './types';
import ArchiveHub from './components/ArchiveHub';
import SignalLostGame from './sl/SignalLostGame';
import HollowWoodsGame from './hw/HollowWoodsGame';
import TitleScreen from './components/TitleScreen';
import KingdomMap from './components/KingdomMap';
import LocationScreen from './components/LocationScreen';
import DialogueScreen from './components/DialogueScreen';
import EvidenceBoard from './components/EvidenceBoard';
import Journal from './components/Journal';
import AccusationScreen from './components/AccusationScreen';
import ResultScreen from './components/ResultScreen';
import { CodeOfShadows, SpyRing, TriviaThrone } from './games/NewGames';
import TutorialOverlay, { type TutorialGame } from './components/TutorialOverlay';

const INITIAL_STATE: GameState = {
  screen: 'archive',
  locationId: null,
  characterId: null,
  inspectItemId: null,
  collectedClueIds: [],
  visitedLocationIds: [],
  dialogueNodes: {},
  connections: [],
  accusation: null,
  journalTab: 'suspects',
  inspectedItemIds: [],
  selectedClueForConnect: null,
};

export default function App() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [previousScreen, setPreviousScreen] = useState<GameScreen>('map');
  const [showSignalLost, setShowSignalLost] = useState(false);
  const [showHollowWoods, setShowHollowWoods] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showSpy, setShowSpy] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [tutorialGame, setTutorialGame] = useState<TutorialGame | null>(null);

  function navigate(screen: GameScreen, extra?: Partial<GameState>) {
    setPreviousScreen(state.screen);
    setState(s => ({ ...s, screen, ...extra }));
  }

  function handleEnterArchive() {
    navigate('title');
  }

  function handleBegin() {
    navigate('map');
    setTutorialGame('last-kingdom');
  }

  function handleLocationClick(locationId: string) {
    setState(s => ({
      ...s,
      screen: 'location',
      locationId,
      visitedLocationIds: s.visitedLocationIds.includes(locationId)
        ? s.visitedLocationIds
        : [...s.visitedLocationIds, locationId],
    }));
  }

  function handleCharacterClick(characterId: string) {
    setState(s => ({
      ...s,
      screen: 'dialogue',
      characterId,
      dialogueNodes: {
        ...s.dialogueNodes,
        [characterId]: s.dialogueNodes[characterId] || 'start',
      },
    }));
  }

  function handleAdvanceDialogue(characterId: string, nodeId: string) {
    setState(s => ({
      ...s,
      dialogueNodes: { ...s.dialogueNodes, [characterId]: nodeId },
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

  function handleReturnFromDialogue() {
    setState(s => ({ ...s, screen: 'location' }));
  }

  function handleReturnToMap() {
    setState(s => ({ ...s, screen: 'map', locationId: null, characterId: null }));
  }

  function handleEvidenceBoard() {
    setState(s => ({ ...s, screen: 'evidence' }));
  }

  function handleJournal() {
    setState(s => ({ ...s, screen: 'journal' }));
  }

  function handleJournalTab(tab: JournalTab) {
    setState(s => ({ ...s, journalTab: tab }));
  }

  function handleConnectClues(a: string, b: string) {
    setState(s => ({
      ...s,
      connections: [...s.connections, [a, b]],
    }));
  }

  function handleMakeAccusation() {
    setState(s => ({ ...s, screen: 'accusation' }));
  }

  function handleSubmitAccusation(accusation: Accusation) {
    setState(s => ({ ...s, accusation, screen: 'result' }));
  }

  function handleReturnFromEvidence() {
    navigate('map');
  }

  function handlePlayAgain() {
    setState(INITIAL_STATE);
  }

  function handlePlaySignalLost() {
    setShowSignalLost(true);
    setTutorialGame('signal-lost');
  }

  function handleExitSignalLost() {
    setShowSignalLost(false);
    setTutorialGame(null);
    setState(s => ({ ...s, screen: 'archive' }));
  }

  function handlePlayHollowWoods() {
    setShowHollowWoods(true);
    setTutorialGame('hollow-woods');
  }

  function handleExitHollowWoods() {
    setShowHollowWoods(false);
    setTutorialGame(null);
    setState(s => ({ ...s, screen: 'archive' }));
  }
  function exitNewGame(setter: (value: boolean) => void) {
    setter(false);
    setTutorialGame(null);
    setState(s => ({ ...s, screen: 'archive' }));
  }

  function handlePlayCode() {
    setShowCode(true);
    setTutorialGame('code-of-shadows');
  }

  function handlePlaySpy() {
    setShowSpy(true);
    setTutorialGame('spy-ring');
  }

  function handlePlayTrivia() {
    setShowTrivia(true);
    setTutorialGame('trivia-throne');
  }

  function handleJournalReturn() {
    // Return to previous meaningful screen
    if (previousScreen === 'location' && state.locationId) {
      setState(s => ({ ...s, screen: 'location' }));
    } else {
      setState(s => ({ ...s, screen: 'map' }));
    }
  }

  const { screen } = state;

  if (showSignalLost) {
    return <SignalLostGame onExit={handleExitSignalLost} />;
  }

  if (showHollowWoods) {
    return (
      <>
        <HollowWoodsGame onExit={handleExitHollowWoods} />
        {tutorialGame === 'hollow-woods' && <TutorialOverlay game="hollow-woods" onDismiss={() => setTutorialGame(null)} />}
      </>
    );
  }
  if (showCode) return (
    <>
      <CodeOfShadows onExit={() => exitNewGame(setShowCode)} />
      {tutorialGame === 'code-of-shadows' && <TutorialOverlay game="code-of-shadows" onDismiss={() => setTutorialGame(null)} />}
    </>
  );
  if (showSpy) return (
    <>
      <SpyRing onExit={() => exitNewGame(setShowSpy)} />
      {tutorialGame === 'spy-ring' && <TutorialOverlay game="spy-ring" onDismiss={() => setTutorialGame(null)} />}
    </>
  );
  if (showTrivia) return (
    <>
      <TriviaThrone onExit={() => exitNewGame(setShowTrivia)} />
      {tutorialGame === 'trivia-throne' && <TutorialOverlay game="trivia-throne" onDismiss={() => setTutorialGame(null)} />}
    </>
  );

  return (
    <>
      {screen === 'archive' && (
        <ArchiveHub
          onPlayLastKingdom={handleEnterArchive}
          onPlaySignalLost={handlePlaySignalLost}
          onPlayHollowWoods={handlePlayHollowWoods}
          onPlayCode={handlePlayCode}
          onPlaySpy={handlePlaySpy}
          onPlayTrivia={handlePlayTrivia}
        />
      )}

      {screen === 'title' && (
        <TitleScreen onBegin={handleBegin} />
      )}

      {screen === 'map' && (
        <KingdomMap
          gameState={state}
          onLocationClick={handleLocationClick}
          onEvidenceBoard={handleEvidenceBoard}
          onJournal={handleJournal}
        />
      )}

      {screen === 'location' && state.locationId && (
        <LocationScreen
          gameState={state}
          onReturnToMap={handleReturnToMap}
          onCharacterClick={handleCharacterClick}
          onCollectClue={handleCollectClue}
          onEvidenceBoard={handleEvidenceBoard}
          onJournal={handleJournal}
        />
      )}

      {screen === 'dialogue' && state.characterId && (
        <DialogueScreen
          gameState={state}
          onReturn={handleReturnFromDialogue}
          onCollectClue={handleCollectClue}
          onAdvanceDialogue={handleAdvanceDialogue}
        />
      )}

      {screen === 'evidence' && (
        <EvidenceBoard
          gameState={state}
          onReturnToMap={handleReturnFromEvidence}
          onMakeAccusation={handleMakeAccusation}
          onConnectClues={handleConnectClues}
          onJournal={handleJournal}
        />
      )}

      {screen === 'journal' && (
        <Journal
          gameState={state}
          onReturnToMap={handleJournalReturn}
          onTabChange={handleJournalTab}
        />
      )}

      {screen === 'accusation' && (
        <AccusationScreen
          onSubmit={handleSubmitAccusation}
          onReturn={() => setState(s => ({ ...s, screen: 'evidence' }))}
          collectedClueIds={state.collectedClueIds}
        />
      )}

      {screen === 'result' && state.accusation && (
        <ResultScreen
          accusation={state.accusation}
          onPlayAgain={handlePlayAgain}
          collectedClueIds={state.collectedClueIds}
        />
      )}
      {tutorialGame === 'last-kingdom' && (
        <TutorialOverlay game="last-kingdom" onDismiss={() => setTutorialGame(null)} />
      )}
    </>
  );
}
