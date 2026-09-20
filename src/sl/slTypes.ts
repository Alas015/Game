export type SLScreen =
  | 'sl-title'
  | 'sl-map'
  | 'sl-room'
  | 'sl-log'
  | 'sl-evidence'
  | 'sl-journal'
  | 'sl-report'
  | 'sl-result';

export type SLJournalTab = 'crew' | 'rooms' | 'evidence' | 'timeline';

export type RoomStatus = 'nominal' | 'alert' | 'critical' | 'offline';

export interface SLClue {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
  foundIn: string;
  relatedCrew: string[];
}

export interface SLLogEntry {
  id: string;
  timestamp: string;
  text: string;
}

export interface SLCrewMember {
  id: string;
  name: string;
  role: string;
  description: string;
  suspicious: string;
  clueIds: string[];
  logs: SLLogEntry[];
}

export interface SLInspectItem {
  id: string;
  name: string;
  description: string;
  text: string;
  revealsClueId?: string;
}

export interface SLRoom {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: RoomStatus;
  atmosphere: string;
  inspectItems: SLInspectItem[];
  accessibleCrewIds: string[];
  mapPosition: { x: number; y: number; w: number; h: number };
}

export interface SLReportOption {
  id: string;
  label: string;
}

export interface SLReport {
  eventId: string;
  causeId: string;
  responsibleId: string;
}

export interface SLGameState {
  screen: SLScreen;
  roomId: string | null;
  crewId: string | null;
  collectedClueIds: string[];
  visitedRoomIds: string[];
  reviewedCrewIds: string[];
  connections: [string, string][];
  report: SLReport | null;
  journalTab: SLJournalTab;
  selectedClueForConnect: string | null;
  inspectedItemIds: string[];
}
