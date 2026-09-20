export type HWScreen =
  | 'hw-title'
  | 'hw-map'
  | 'hw-clearing'
  | 'hw-testimony'
  | 'hw-evidence'
  | 'hw-journal'
  | 'hw-finding'
  | 'hw-result';

export type HWJournalTab = 'people' | 'places' | 'evidence' | 'timeline';

export type ClearingStatus = 'quiet' | 'uneasy' | 'dreadful' | 'sealed';

export interface HWClue {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
  foundIn: string;
  relatedPeople: string[];
}

export interface HWTestimonyEntry {
  id: string;
  timestamp: string;
  text: string;
}

export interface HWPerson {
  id: string;
  name: string;
  role: string;
  description: string;
  suspicious: string;
  clueIds: string[];
  logs: HWTestimonyEntry[];
}

export interface HWInspectItem {
  id: string;
  name: string;
  description: string;
  text: string;
  revealsClueId?: string;
}

export interface HWClearing {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: ClearingStatus;
  atmosphere: string;
  inspectItems: HWInspectItem[];
  accessiblePeopleIds: string[];
  mapPosition: { x: number; y: number; w: number; h: number };
}

export interface HWFindingOption {
  id: string;
  label: string;
}

export interface HWFinding {
  eventId: string;
  causeId: string;
  responsibleId: string;
}

export interface HWGameState {
  screen: HWScreen;
  clearingId: string | null;
  personId: string | null;
  collectedClueIds: string[];
  visitedClearingIds: string[];
  reviewedPersonIds: string[];
  connections: [string, string][];
  finding: HWFinding | null;
  journalTab: HWJournalTab;
  selectedClueForConnect: string | null;
  inspectedItemIds: string[];
}
