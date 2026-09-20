export interface Clue {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
  foundAt: string;
  relatedCharacters: string[];
}

export interface DialogueOption {
  id: string;
  text: string;
  nextNodeId: string | null;
  revealsClueId?: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  options: DialogueOption[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  suspicious: string;
  portraitType: string;
  locationId: string;
  clueIds: string[];
  dialogue: DialogueNode[];
}

export interface InspectItem {
  id: string;
  name: string;
  description: string;
  text: string;
  revealsClueId?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  ambiance: string;
  clueIds: string[];
  characterIds: string[];
  inspectItems: InspectItem[];
  mapPosition: { x: number; y: number };
}

export interface Motive {
  id: string;
  label: string;
  description: string;
}

export interface Method {
  id: string;
  label: string;
  description: string;
}

export interface Accusation {
  suspectId: string;
  motiveId: string;
  methodId: string;
}

export type GameScreen =
  | 'archive'
  | 'title'
  | 'map'
  | 'location'
  | 'inspect'
  | 'dialogue'
  | 'evidence'
  | 'journal'
  | 'accusation'
  | 'result';

export type JournalTab = 'suspects' | 'locations' | 'clues' | 'notes';

export interface GameState {
  screen: GameScreen;
  locationId: string | null;
  characterId: string | null;
  inspectItemId: string | null;
  collectedClueIds: string[];
  visitedLocationIds: string[];
  dialogueNodes: Record<string, string>;
  connections: Array<[string, string]>;
  accusation: Accusation | null;
  journalTab: JournalTab;
  inspectedItemIds: string[];
  selectedClueForConnect: string | null;
}
