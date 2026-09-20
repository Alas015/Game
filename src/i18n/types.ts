export type Language = 'en' | 'az' | 'tr';

export interface UIStrings {
  // Title
  title: string;
  titleSub1: string;
  titleSub2: string;
  annoDomini: string;
  tagline1: string;
  tagline2: string;
  flavorIntro: string;
  flavorRole: string;
  royalMystery: string;
  beginBtn: string;
  // Nav
  returnToMap: string;
  journalBtn: string;
  evidenceBtn: string;
  makeAccusationNav: string;
  returnBtn: string;
  backBtn: string;
  // Map
  kingdomName: string;
  mapHint: string;
  locationsVisited: string;
  cluesLabel: string;
  moreCluesNeeded: string;
  evidenceAwaits: string;
  previouslyVisited: string;
  // Location
  examineSection: string;
  personsSection: string;
  gatheredHere: string;
  evidencePossible: string;
  evidenceFound: string;
  previouslyFound: string;
  collectAndClose: string;
  closeBtn: string;
  // Dialogue
  interrogationLabel: string;
  suspiciousLabel: string;
  responseLabel: string;
  revealsEvidence: string;
  // Evidence board
  connectedEvidence: string;
  noEvidence: string;
  investigateFirst: string;
  hideDetails: string;
  examineClosely: string;
  linkedBadge: string;
  defaultHint: string;
  connectionHint: string;
  // Journal
  investigatorJournal: string;
  suspectsTab: string;
  locationsTab: string;
  cluesTab: string;
  notesTab: string;
  personsIdentified: string;
  noPersonsYet: string;
  linkedEvidenceLabel: string;
  investigatedLocations: string;
  noLocationsYet: string;
  evidenceRemain: string;
  gatheredEvidence: string;
  noCluesYet: string;
  foundAt: string;
  investigatorNotes: string;
  unansweredLabel: string;
  observationsLabel: string;
  continueInvest: string;
  q1: string; q2: string; q3: string; q4: string;
  obs1: string; obs2: string; obs3: string; obs4: string; obs5: string; obs6: string;
  // Accusation
  makeYourAccusation: string;
  accusationDrama: string;
  guiltyParty: string;
  motiveStep: string;
  methodStep: string;
  accusedBadge: string;
  yourAccusationLabel: string;
  iAccuseTemplate: string;
  reconsiderBtn: string;
  sealAccusation: string;
  declareGuilt: string;
  areYouCertain: string;
  // Result
  justicePrevealed: string;
  justiceDenied: string;
  deductionCorrect: string;
  accusationMistaken: string;
  yourAccusationResult: string;
  theTruth: string;
  fullAccount: string;
  finalAssessment: string;
  masterInvestigator: string;
  keenEye: string;
  remainsInShadow: string;
  evidenceCollectedScore: string;
  playAgain: string;
  notEnoughEvidence: string;
  evidenceButFailed: string;
}

export interface LocationT {
  name: string;
  description: string;
  ambiance: string;
}

export interface CharacterT {
  name: string;
  title: string;
  description: string;
  suspicious: string;
}

export interface ClueT {
  name: string;
  description: string;
  detail: string;
}

export interface InspectItemT {
  name: string;
  description: string;
  text: string;
}

export interface DialogueNodeT {
  text: string;
  options: Record<string, string>;
}

export interface MotiveT { label: string; description: string; }
export interface MethodT { label: string; description: string; }

export interface GameTranslations {
  ui: UIStrings;
  locations: Record<string, LocationT>;
  characters: Record<string, CharacterT>;
  clues: Record<string, ClueT>;
  dialogue: Record<string, Record<string, DialogueNodeT>>;
  inspectItems: Record<string, InspectItemT>;
  motives: Record<string, MotiveT>;
  methods: Record<string, MethodT>;
  fullStory: string;
}
