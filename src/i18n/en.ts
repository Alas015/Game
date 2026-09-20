import type { GameTranslations } from './types';

export const en: GameTranslations = {
  ui: {
    title: 'THE LAST KINGDOM',
    titleSub1: 'THE LAST',
    titleSub2: 'KINGDOM',
    annoDomini: '✦   Anno Domini MCCCXII   ✦',
    tagline1: '"The King is missing.',
    tagline2: 'The kingdom is lying."',
    flavorIntro: 'Three nights past, King Aldric II vanished from Blackthorn Castle. No struggle. No ransom. No body found. Six suspects. Countless lies.',
    flavorRole: 'You are the Royal Investigator. Find the truth before it is buried with the crown.',
    royalMystery: '✦   A Royal Mystery   ✦',
    beginBtn: 'BEGIN INVESTIGATION',
    returnToMap: '← Kingdom Map',
    journalBtn: 'Journal',
    evidenceBtn: 'Evidence',
    makeAccusationNav: 'Make Accusation →',
    returnBtn: '← Return',
    backBtn: '← Back',
    kingdomName: 'Kingdom of Aldenmere',
    mapHint: '"Click any location to investigate. The truth lies scattered across the realm."',
    locationsVisited: 'LOCATIONS VISITED',
    cluesLabel: 'CLUES',
    moreCluesNeeded: 'MORE CLUES NEEDED',
    evidenceAwaits: '◆ EVIDENCE AWAITS',
    previouslyVisited: '✓ PREVIOUSLY VISITED',
    examineSection: 'Examine',
    personsSection: 'Persons of Interest',
    gatheredHere: 'GATHERED HERE',
    evidencePossible: '◆ EVIDENCE POSSIBLE',
    evidenceFound: 'EVIDENCE FOUND',
    previouslyFound: 'PREVIOUSLY FOUND',
    collectAndClose: 'Collect Evidence & Close',
    closeBtn: 'Close',
    interrogationLabel: 'INTERROGATION',
    suspiciousLabel: 'SUSPICIOUS BEHAVIOUR',
    responseLabel: 'YOUR RESPONSE',
    revealsEvidence: '[reveals evidence]',
    connectedEvidence: 'CONNECTED EVIDENCE',
    noEvidence: 'No evidence collected yet.',
    investigateFirst: 'Investigate locations and speak to suspects.',
    hideDetails: '▲ HIDE DETAILS',
    examineClosely: '▼ EXAMINE CLOSELY',
    linkedBadge: 'LINKED',
    defaultHint: 'Click a clue to read it. Click two clues to connect them as related evidence.',
    connectionHint: 'selected — click another clue to draw a connection.',
    investigatorJournal: "Investigator's Journal",
    suspectsTab: 'Suspects',
    locationsTab: 'Locations',
    cluesTab: 'Clues',
    notesTab: 'Notes',
    personsIdentified: 'PERSONS OF INTEREST · {n} IDENTIFIED',
    noPersonsYet: 'Visit locations to discover persons of interest.',
    linkedEvidenceLabel: 'LINKED EVIDENCE',
    investigatedLocations: 'INVESTIGATED LOCATIONS · {n} / 8',
    noLocationsYet: 'No locations visited yet.',
    evidenceRemain: 'PIECE(S) OF EVIDENCE REMAIN',
    gatheredEvidence: 'GATHERED EVIDENCE · {n} / 9',
    noCluesYet: 'No evidence collected yet.',
    foundAt: 'FOUND:',
    investigatorNotes: "INVESTIGATOR'S NOTES",
    unansweredLabel: 'UNANSWERED QUESTIONS:',
    observationsLabel: 'OBSERVATIONS:',
    continueInvest: 'Continue investigating to fill this journal with observations.',
    q1: '◆   Who signed the torn letter with the initial "C"?',
    q2: '◆   How did the perpetrator access the king\'s wine?',
    q3: '◆   What secret do the passages beneath the castle conceal?',
    q4: '◆   Where is King Aldric now?',
    obs1: '◆   Lord Cedric\'s seal was used to access the treasury at midnight.',
    obs2: '◆   Nightshade Ore extract dissolves in wine and causes paralysis.',
    obs3: '◆   Secret passages connect the wine cellar to the forest edge.',
    obs4: '◆   Someone signed a letter "C" promising the throne would be "ours."',
    obs5: '◆   A silk glove, too small for a man — found near the treasury entrance.',
    obs6: '◆   Mira confessed she was coerced into preparing a poison under threat.',
    makeYourAccusation: 'Make Your Accusation',
    accusationDrama: 'You have investigated the realm. You have spoken to the suspects. You have gathered the evidence.',
    guiltyParty: 'I. The Guilty Party',
    motiveStep: 'II. The Motive',
    methodStep: 'III. The Method',
    accusedBadge: 'ACCUSED ◆',
    yourAccusationLabel: 'YOUR ACCUSATION',
    iAccuseTemplate: 'I accuse {name} of conspiring to remove the king. Their motive: {motive}. Their method: {method}.',
    reconsiderBtn: 'Reconsider',
    sealAccusation: '⚔ SEAL THE ACCUSATION',
    declareGuilt: 'DECLARE GUILT',
    areYouCertain: "Are you certain? A false accusation dishonors the crown.",
    justicePrevealed: '✦ Justice Has Prevailed ✦',
    justiceDenied: '✦ Justice Has Been Denied ✦',
    deductionCorrect: "Your deduction was correct. The king's fate is revealed.",
    accusationMistaken: 'Your accusation was mistaken. The true culprit remains free.',
    yourAccusationResult: 'YOUR ACCUSATION',
    theTruth: 'THE TRUTH',
    fullAccount: 'THE FULL ACCOUNT',
    finalAssessment: 'FINAL ASSESSMENT',
    masterInvestigator: 'Master Investigator',
    keenEye: 'Keen Eye, Flawed Conclusion',
    remainsInShadow: 'The Kingdom Remains in Shadow',
    evidenceCollectedScore: 'Evidence Collected',
    playAgain: 'Begin a New Investigation',
    notEnoughEvidence: 'You did not gather enough evidence to see the full picture.',
    evidenceButFailed: 'The evidence was there. The truth eluded you nonetheless.',
  },

  locations: {
    'blackthorn-castle': {
      name: 'Blackthorn Castle',
      description: 'The seat of royal power. Its ancient stones have witnessed centuries of rule. Tonight they hide darker secrets.',
      ambiance: 'Torches flicker in the corridors. Guards stand rigid at every door. The air smells of beeswax and unease. The throne sits empty.',
    },
    'ravens-hollow': {
      name: "Raven's Hollow",
      description: 'A dense hollow where ravens roost and superstition runs deep. The locals avoid it at night.',
      ambiance: 'The trees grow twisted and close together. Ravens watch from every branch. A cold wind carries the smell of pine and something else — ink, and burnt parchment.',
    },
    'old-monastery': {
      name: 'The Old Monastery',
      description: 'Built three centuries before the castle, it predates the kingdom itself. Father Tomas tends its ancient halls.',
      ambiance: 'Candles burn in every alcove. Illuminated manuscripts cover long tables. The air carries vellum, incense, and something like fear.',
    },
    'ironwood-forest': {
      name: 'Ironwood Forest',
      description: 'An ancient forest where the trees grow so dense their canopy blocks all light. Outlaws have hidden here for centuries.',
      ambiance: 'Darkness under the canopy even in daylight. Twigs snap underfoot. Something watches from the shadows between the iron-grey trunks.',
    },
    'kings-road': {
      name: "King's Road",
      description: 'The main artery through the kingdom. Usually busy with soldiers and merchants — now strangely empty.',
      ambiance: 'Hoofprints in the mud, then none. As if a horse and rider simply vanished. The silence here is not natural.',
    },
    'forgotten-mine': {
      name: 'The Forgotten Mine',
      description: 'An abandoned iron mine, supposedly played out. Yet recent activity suggests otherwise.',
      ambiance: 'Fresh cart tracks cut through old dust. The smell of torches is recent. Deep in the shafts, something glimmers — not iron.',
    },
    'river-alden': {
      name: 'River Alden',
      description: 'The great river that divides the kingdom. Its banks hold many whispered secrets.',
      ambiance: 'The water runs dark in the moonlight. An old ferryman knows every crossing — and every face that has used them.',
    },
    'northern-village': {
      name: 'The Northern Village',
      description: "A small but proud settlement at the kingdom's northern edge. The blacksmith's forge is its heart.",
      ambiance: 'The clang of the hammer carries through morning mist. Villagers speak in hushed tones. Fear lives here — new and unfamiliar.',
    },
  },

  characters: {
    'queen-elara': {
      name: 'Queen Elara',
      title: 'Queen of the Realm',
      description: "The king's wife of twelve years. Beautiful and composed. Her grief appears measured — almost rehearsed.",
      suspicious: "Observed whispering with Lord Cedric at the witching hour, two nights before the disappearance. Her chambers showed signs of recent burning — letters destroyed.",
    },
    'lord-cedric': {
      name: 'Lord Cedric',
      title: 'Commander of the Royal Army',
      description: "A decorated war veteran, the king's right hand. Respected by troops, feared by nobles. Some say the real power behind the throne.",
      suspicious: "Ordered the castle sealed before the disappearance was announced. Found burning documents in his war room. His seal used to access restricted areas at midnight.",
    },
    'father-tomas': {
      name: 'Father Tomas',
      title: 'Prior of the Old Monastery',
      description: 'A priest of twenty years standing, known for scholarly writing and quiet piety. Something has deeply unsettled him.',
      suspicious: 'Absent from the monastery on the night of the disappearance. Refuses to explain his whereabouts. All his ravens were released that night.',
    },
    'sir-rowan': {
      name: 'Sir Rowan',
      title: 'Knight Champion of the Realm',
      description: "The king's most trusted knight and oldest friend. He appears devastated — but guilt and grief look alike from a distance.",
      suspicious: 'Absent from his post at the crucial hour. His distinctive boot prints lead toward a hidden wall section. Has been asking about the king\'s route as if he already knew it.',
    },
    'mira': {
      name: 'Mira',
      title: 'Royal Physician',
      description: 'A brilliant healer trained in the medical arts of three kingdoms. She has access to every remedy — and poison. She has been visibly distressed for weeks.',
      suspicious: 'Requisitioned an unusual mineral compound from the Forgotten Mine six weeks ago. No patient records support this. Refuses to explain the discrepancy.',
    },
    'garrett-blacksmith': {
      name: 'Garrett',
      title: 'Royal Blacksmith',
      description: 'A mountain of a man with hands like hammers and eyes that miss nothing. Gruff but fundamentally honest — or so it was thought.',
      suspicious: "Forged a custom blade on secret commission three days before the disappearance. Refuses to name the buyer. Was seen near the Forgotten Mine days before Mira's requisition.",
    },
  },

  clues: {
    'blood-glove': {
      name: 'Blood-Stained Glove',
      description: 'A silk glove bearing the royal crest, stained dark.',
      detail: "The glove belongs to someone of high station — the embroidery is exceptionally fine. The bloodstains are no older than three nights. The glove is too small for a man's hand. It was found near the treasury entrance.",
    },
    'torn-letter': {
      name: 'Torn Letter',
      description: '"...when the deed is done, the throne shall be ours."',
      detail: 'The visible portion reads: "...when the deed is done, the throne shall be ours. Burn this upon reading. — C." The handwriting is deliberate, educated. The ink is military-grade. Signed only with the initial C.',
    },
    'broken-seal': {
      name: 'Broken Royal Seal',
      description: "The king's personal wax seal, cracked in two on the King's Road.",
      detail: "This seal would only leave the king's person in the most desperate of circumstances. Found on the King's Road, suggesting the king was intercepted there. The break is clean — deliberate, not accidental.",
    },
    'missing-sword': {
      name: 'Empty Sword Scabbard',
      description: "The king's ceremonial scabbard, empty — Dawnbringer is gone.",
      detail: 'King Aldric\'s ceremonial sword "Dawnbringer" has vanished. The blacksmith noticed the scabbard empty two nights before the disappearance and reported it to Lord Cedric — who told him to say nothing.',
    },
    'strange-footprint': {
      name: 'Strange Footprint',
      description: 'An armored boot print with a distinctive repaired heel, leading toward a hidden wall.',
      detail: "The print matches a resoled left boot — Sir Rowan had his repaired a fortnight ago. The tracks emerge from the castle's east wing and lead toward a section of forest wall that doesn't appear on standard plans.",
    },
    'passage-map': {
      name: 'Secret Passage Map',
      description: 'A parchment map of tunnels beneath the castle, stolen from the monastery scriptorium.',
      detail: "This map details a network of secret passages unknown even to the royal guard. One passage leads from the wine cellar directly to the forest edge. The monastery lock was forced — someone stole this map and used it.",
    },
    'black-feather': {
      name: 'Monastery Raven Feather',
      description: "An unusually large black feather tagged with the monastery's seal.",
      detail: "This feather belongs to the correspondence ravens kept in the monastery's aviary — bred for carrying secret messages. Father Tomas admitted releasing them on the night the king vanished. He sent a warning. Too late.",
    },
    'poison-vial': {
      name: "Physician's Poison Vial",
      description: "A glass vial bearing Mira's mark, empty, with residue of Nightshade Ore extract.",
      detail: "Nightshade Ore extract — a rare mineral from the Forgotten Mine. Causes complete paralysis before death and leaves no common trace in wine. Mira admitted under questioning she prepared it under coercion. Lord Cedric threatened her family.",
    },
    'midnight-log': {
      name: 'Midnight Entry Log',
      description: "A guard's log: Lord Cedric's seal used to access the treasury at the third hour.",
      detail: "The log records an unauthorized entry at the third hour using Lord Cedric's personal seal. The treasury connects to the royal wine cellar through a concealed door. Someone poisoned the king's wine that night.",
    },
  },

  dialogue: {
    'queen-elara': {
      'start': {
        text: "Investigator. I pray you find my husband swiftly. Every moment without word tears at my heart.",
        options: {
          'ask-last-seen': 'When did you last see the king?',
          'ask-cedric': 'You were seen speaking with Lord Cedric that night.',
          'ask-glove': 'I found a silk glove near the treasury. Do you recognize it?',
        },
      },
      'last-seen': {
        text: "At dinner. He seemed troubled — barely touched his wine. Then he excused himself to the treasury, said he had urgent matters. That was the last I saw of him.",
        options: {
          'ask-troubled': 'What was troubling him?',
          'return': 'I have no further questions for now.',
        },
      },
      'troubled': {
        text: "He had grown suspicious of certain members of court. He would not name them, but said someone close to him had been selling state secrets. He intended to confront them.",
        options: {
          'ask-who': 'Did he say who?',
          'return': 'I see. Thank you.',
        },
      },
      'who': {
        text: "No. He said only that the betrayer wore a mask of loyalty. I begged him to take Sir Rowan. He refused. He said he needed to handle it alone. I should have insisted.",
        options: { 'return': 'Thank you, Your Grace.' },
      },
      'cedric-question': {
        text: "Lord Cedric came to inform me the gates would be sealed for security. A brief conversation. Nothing more.",
        options: {
          'press': 'Guards say the conversation lasted over an hour.',
          'believe': 'Of course, Your Grace.',
        },
      },
      'pressed': {
        text: "You dare accuse me? I am the queen. Lord Cedric is an old family friend — nothing more. Leave my sight before I have you removed from court.",
        options: { 'leave': 'Forgive me, Your Grace.' },
      },
      'glove-reveal': {
        text: "I... no. I have never seen that glove. Where did you find it?",
        options: {
          'reveal-location': 'Near the treasury entrance.',
          'stay-quiet': 'I cannot say.',
        },
      },
      'glove-response': {
        text: "That is... I may have gone there. To look for the king. Yes, that is where I went. But I found nothing.",
        options: { 'return': 'Of course.' },
      },
    },
    'lord-cedric': {
      'start': {
        text: "Investigator. I trust this will be brief. I have a kingdom to maintain while the king is... indisposed.",
        options: {
          'ask-seal': 'Why were the gates sealed before the disappearance was announced?',
          'ask-midnight': 'Your seal was used to access the treasury at midnight.',
          'ask-relationship': 'Tell me about your relationship with the king.',
        },
      },
      'gate-sealed': {
        text: "I received intelligence of an assassination threat that evening. Standard precaution. I acted in the kingdom's best interest.",
        options: {
          'press-gates': 'What intelligence? From whom?',
          'accept': 'I see.',
        },
      },
      'intelligence': {
        text: "A confidential informant. Their identity is protected for obvious reasons. I will not compromise state security for this investigation.",
        options: { 'return': 'Very well.' },
      },
      'midnight': {
        text: "You are mistaken. My seal was not used. Or if it was, someone obtained a forgery. I suggest you investigate that avenue.",
        options: {
          'press-seal': "The log is written in the guard's own hand. There is no forgery.",
          'drop': 'I shall look into it further.',
        },
      },
      'seal-pressed': {
        text: "Guards make errors. They are overworked. Now if you have no further questions, I have a search party to coordinate.",
        options: { 'return': 'That will be all.' },
      },
      'relationship': {
        text: "The king and I had disagreements, as any commander does with his liege. But I am loyal to the crown. I have bled for this kingdom. To suggest otherwise is an insult.",
        options: {
          'ask-disagreements': 'What disagreements?',
          'return': 'Understood.',
        },
      },
      'disagreements': {
        text: "The king was soft. He wished to negotiate with border lords who deserved only iron. He was weakening the realm. But that gave me no cause to harm him. A weak king is still MY king.",
        options: { 'return': 'Thank you for your candor.' },
      },
    },
    'father-tomas': {
      'start': {
        text: "God's peace be upon you, investigator. A dark hour has fallen on the realm. I pray for the king daily.",
        options: {
          'ask-whereabouts': 'Where were you on the night the king disappeared?',
          'ask-ravens': 'Why were all your ravens released that night?',
          'ask-map': 'Tell me about the secret passages beneath the castle.',
        },
      },
      'whereabouts': {
        text: "I was... attending to a private matter of the spirit. A vigil. I spent the night in prayer.",
        options: {
          'press-vigil': 'Alone? No witnesses?',
          'accept': 'A holy man\'s alibi, then.',
        },
      },
      'alone': {
        text: "God was my witness. If that is not sufficient for you, I cannot offer more.",
        options: { 'return': 'We shall speak again, Father.' },
      },
      'ravens': {
        text: "The birds grew agitated. Animals sense what we cannot. I released them to calm them. It is not the first time.",
        options: {
          'press-ravens': 'Or perhaps you sent messages that night.',
          'accept': 'I see.',
        },
      },
      'ravens-pressed': {
        text: "I... God forgive me. Yes. I sent a warning to the king. I had learned of a plot against his life. I was trying to save him.",
        options: { 'ask-plot': 'What plot? Who told you?' },
      },
      'plot': {
        text: "A man came to confess his sins. I cannot break the seal of confession. But the king was betrayed by one who swore him loyalty. And the mine holds a secret darker than iron.",
        options: {
          'ask-mine': 'What secret does the mine hold?',
          'return': 'Thank you, Father.',
        },
      },
      'mine-secret': {
        text: "Nightshade Ore. They have been extracting it — not for forging. For poison. The king was to disappear quietly, without mark or wound. God have mercy on his soul.",
        options: { 'return': 'You have been most helpful, Father.' },
      },
      'passages': {
        text: "The monastery predates the castle. We have records — maps — of underground routes. I kept them locked. But three days ago I discovered the lock had been forced.",
        options: { 'ask-who': 'Someone stole the maps?' },
      },
      'who-stole': {
        text: "Yes. Whoever took them knew exactly where to look. The maps show a passage from the wine cellar to the forest. It would allow someone to move through the castle unseen.",
        options: { 'return': 'This changes everything.' },
      },
    },
    'sir-rowan': {
      'start': {
        text: "I should have been with him. I should never have left his side. Whatever happened... I carry that guilt.",
        options: {
          'ask-post': 'Where were you when the king disappeared?',
          'ask-footprints': 'Were you near the Ironwood Forest that night?',
          'ask-known': 'Did the king speak of any threats to his life?',
        },
      },
      'post': {
        text: "Lord Cedric pulled me from my post. Said there was a disturbance at the northern gate requiring my personal attention. By the time I returned — the king was gone.",
        options: {
          'press-cedric': 'Lord Cedric ordered you away from the king?',
          'accept': 'I see.',
        },
      },
      'cedric-blame': {
        text: "I didn't question it then. Cedric outranks me. But in hindsight — yes. He removed me deliberately. I am certain of it now.",
        options: {
          'ask-why': 'Why would Cedric need you gone?',
          'return': 'Thank you, Sir Rowan.',
        },
      },
      'why-cedric': {
        text: "Because I am the only one the king truly trusted. If I had been present, whatever Cedric planned would have failed. He needed me gone.",
        options: { 'return': 'I understand.' },
      },
      'footprints': {
        text: "...How did you know? I went into the forest after returning from the north gate. I heard movement. But there was nothing. Only darkness.",
        options: {
          'press-forest': 'Your boot prints led to a hidden section of wall.',
          'return': 'And you found nothing?',
        },
      },
      'wall': {
        text: "There is a passage there. Ancient. The king showed it to me years ago — said it was a secret between us alone. If someone else knew of it, the king trusted very few with that knowledge.",
        options: { 'return': 'That is very useful.' },
      },
      'threats': {
        text: "Yes. He told me someone at court was plotting against him. He wouldn't say who — said the evidence wasn't yet conclusive. He didn't want to accuse someone falsely.",
        options: {
          'ask-last-words': 'What were his last words to you?',
          'return': 'I see.',
        },
      },
      'last-words': {
        text: '"Tonight I settle the matter once and for all." That is what he told me. He was so certain. And then I was sent away, and I never saw him again.',
        options: { 'return': 'Thank you. This will help.' },
      },
    },
    'mira': {
      'start': {
        text: "I told the guards everything already. I do not know what more I can add.",
        options: {
          'ask-mineral': 'What was the mineral compound you requisitioned for?',
          'ask-king': 'Was the king in good health before the disappearance?',
          'ask-vial': "I found a vial bearing your physician's mark.",
        },
      },
      'mineral': {
        text: "For a treatment. A patient with joint pain. The compound has analgesic properties when prepared correctly.",
        options: {
          'press-records': 'Your records show no such patient.',
          'accept': 'I see.',
        },
      },
      'records': {
        text: "I... keep some records private. Patient confidentiality is sacred to my practice.",
        options: {
          'press-more': 'A physician hiding records. That is quite damning.',
          'return': 'I will return to this.',
        },
      },
      'breaking': {
        text: "Please... I had no choice. He threatened my family. I was told it would be used as a sleeping draft only. I swear I did not know it would— I thought he would only sleep—",
        options: { 'ask-who': 'Who threatened you? Give me a name.' },
      },
      'confess': {
        text: "Lord Cedric. He came weeks ago. Said my nephew would suffer if I refused. He wanted the compound prepared as a concentrate. Nightshade Ore dissolves in wine. In sufficient quantity... it paralyses. Completely. Within the hour.",
        options: { 'return': 'Thank you for your courage, Mira.' },
      },
      'health': {
        text: "The king was in excellent health. Whatever ailed him on that last night was not natural.",
        options: { 'return': 'Noted.' },
      },
      'vial': {
        text: "Where did you— that vial contains Nightshade Ore concentrate. If you found it... then it was used.",
        options: { 'ask-effects': 'What would it do to someone?' },
      },
      'effects': {
        text: "Complete paralysis within an hour. The victim would appear to faint. Then... nothing. No marks. No trace in the blood unless you know exactly what to look for. It is a physician's poison.",
        options: { 'return': 'I have what I need.' },
      },
    },
    'garrett-blacksmith': {
      'start': {
        text: "I am a craftsman, investigator. I forge what I am paid to forge. I know nothing of politics.",
        options: {
          'ask-blade': 'Tell me about the secret commission.',
          'ask-sword': "When did you first notice the king's sword was missing?",
          'ask-mine': 'What were you doing near the Forgotten Mine?',
        },
      },
      'blade': {
        text: "I forge hundreds of blades yearly. Be more specific.",
        options: {
          'press-blade': 'The one forged at night. With no apprentice present.',
          'return': 'I see.',
        },
      },
      'blade-pressed': {
        text: "A man commissioned it. No name. Paid gold — twice the going rate. Said it was a private gift. I don't ask questions when the coin is right.",
        options: {
          'ask-description': 'Describe him.',
          'return': 'And you have no suspicions who it was?',
        },
      },
      'description': {
        text: "Military bearing. Fine clothes beneath a traveling cloak. A scar on his left hand — old sword cut. That is all I can tell you.",
        options: { 'return': 'That is helpful.' },
      },
      'sword': {
        text: "I maintain Dawnbringer monthly. But two nights before the king vanished, the scabbard was already empty. I reported it to Lord Cedric. He told me to say nothing and that he would handle it himself.",
        options: { 'return': 'Cedric knew and said nothing. Thank you.' },
      },
      'mine': {
        text: "Looking for ore samples. When I arrived, there were men loading crates — men I did not recognize. Not miners. They drove me off when they caught me looking.",
        options: {
          'ask-crates': 'What was in the crates?',
          'return': 'Interesting.',
        },
      },
      'crates': {
        text: "One crate had a crack. I smelled it — bitter, like crushed stone and rot. I have never smelled its like before. The men had military bearing. Cedric's men, I'd wager.",
        options: { 'return': 'Thank you, Garrett.' },
      },
    },
  },

  inspectItems: {
    'throne-room': {
      name: 'The Throne Room',
      description: 'The great hall where the king held court.',
      text: "The throne sits empty, draped in shadow. On the floor near the dais, you notice scuff marks — as if something heavy was dragged. Near the fireplace, you find an empty ceremonial scabbard.",
    },
    'treasury-door': {
      name: 'Treasury Entrance',
      description: 'The iron-reinforced door to the royal treasury.',
      text: "The door shows no signs of forced entry — opened with the proper seal. Near the threshold, half-hidden beneath a stone lip, lies a silk glove. It is stained dark with what appears to be blood.",
    },
    'guard-post': {
      name: 'The Guard Post Ledger',
      description: "The guard's station near the treasury.",
      text: "A meticulous ledger records all entries. At the third hour on the night of disappearance, Lord Cedric's seal was used to bypass standard security. The entry is clearly written in the guard's careful hand.",
    },
    'ravens-nest': {
      name: 'Beneath the Old Oak',
      description: 'The base of an enormous gnarled oak.',
      text: 'Among the roots of the ancient oak, you find the remnants of a fire — still warm. Someone burned documents here recently. From the ash, a single fragment survives: half of a letter, the ink still legible. "...when the deed is done, the throne shall be ours."',
    },
    'raven-perch': {
      name: 'The Stone Perch',
      description: 'A carved stone where the ravens gather.',
      text: "An unusually large black feather lies on the stone. These birds are monastery-bred — trained for correspondence. A tag around the shaft's base bears the monastery seal and a dispatch date: three nights ago.",
    },
    'scriptorium': {
      name: 'The Scriptorium',
      description: "The monastery's writing room, lined with ancient manuscripts.",
      text: "One cabinet has been recently violated — its lock is forced. Inside, an empty frame where a large map once hung. Near the floor, a corner of parchment remains: the edge of a map showing passages beneath the castle.",
    },
    'aviary': {
      name: 'The Raven Aviary',
      description: 'An empty birdcage tower.',
      text: "The aviary cages stand open and empty. Father Tomas released all his correspondence ravens on the night of the king's disappearance. Among the scattered feathers, you find one tagged with the monastery's seal.",
    },
    'forest-path': {
      name: 'The Hidden Forest Path',
      description: 'A barely visible trail heading east toward the castle.',
      text: "Following the path east, you find armored boot prints in the soft earth. The left heel shows a repair patch — an irregular welt. The tracks emerge from the direction of the castle's east wall and lead toward a section that does not appear on standard plans.",
    },
    'forest-camp': {
      name: 'The Abandoned Camp',
      description: 'Signs of recent habitation.',
      text: "A fire circle, recently used. Bones of a meal. Military-grade rope, standard issue. Someone spent several hours here watching the castle's east entrance. They were very patient.",
    },
    'road-crossroads': {
      name: "The Crossroads",
      description: "Where King's Road meets the forest path.",
      text: "The ground at the crossroads is disturbed. A struggle occurred here — or a meeting. Pressed into the mud near the road marker, you find a broken royal wax seal: the king's personal emblem, cracked cleanly in two.",
    },
    'mine-shaft': {
      name: 'The Deep Shaft',
      description: "The mine's deepest section, recently excavated.",
      text: "New pick marks in the stone. They are not mining iron — the ore they seek glimmers with a dark purple sheen. On the floor near the shaft wall, a small glass vial has rolled into a crack. It bears the physician's mark. The residue within has the bitter smell of Nightshade Ore extract.",
    },
    'ferryman-crossing': {
      name: "The Ferryman's Post",
      description: 'An old crossing point, marked by weathered planks.',
      text: "The ferryman's log records an unusual crossing three nights ago at the second hour. A man in heavy riding gear — military bearing, traveling cloak — crossed alone. Paid in gold. His cloak bore a military insignia on the lining.",
    },
    'village-well': {
      name: 'The Village Well',
      description: 'Where villagers gather and exchange news.',
      text: 'An elder woman pulls you aside: "Soldiers came. Not our soldiers — Cedric\'s men. They searched every home. Looking for something they would not name. That was the very night the king went missing."',
    },
  },

  motives: {
    'seize-throne': { label: 'Seize the Throne', description: 'Remove the king and claim power — with or without the queen.' },
    'revenge': { label: 'Personal Revenge', description: 'A long-held grudge, finally acted upon in secret.' },
    'protect-secret': { label: 'Protect a Secret', description: 'The king discovered something that had to be buried with him.' },
    'ransom': { label: 'Hold for Ransom', description: 'The king is kept alive as political leverage.' },
    'foreign-power': { label: 'Foreign Conspiracy', description: "An outside enemy paid for the king's removal." },
  },

  methods: {
    'poison': { label: 'Poison', description: 'A silent death by Nightshade Ore extract dissolved in the royal wine.' },
    'blade': { label: 'Assassination by Blade', description: 'A knife in the dark — swift, decisive, traceable.' },
    'abduction': { label: 'Abduction', description: 'The king was taken alive through the secret passages.' },
    'exile': { label: 'Forced Exile', description: 'The king was threatened and blackmailed into fleeing.' },
    'accident': { label: 'Staged Accident', description: 'An "accident" arranged to look like misfortune.' },
  },

  fullStory: `Lord Cedric, Commander of the Royal Army, conspired with Queen Elara to seize the throne.
Their arrangement was simple: the queen would inherit power, and Cedric would rule beside her.

Weeks before the night in question, Cedric coerced Mira — the royal physician — into preparing a concentrate
of Nightshade Ore extract, threatening her nephew's life. Using his stolen copy of the monastery's passage maps,
Cedric accessed the royal wine cellar through the treasury, using his own seal to bypass security at midnight.

He poisoned the king's wine for that evening's dinner.

King Aldric collapsed in the treasury while confronting what he believed to be evidence of treason.
Sir Rowan had been deliberately removed from his post. The king's body was carried through the secret passage
to the forest edge, where it was hidden in the Ironwood.

Father Tomas, who learned of the plot through confession, sent a warning by raven — too late.
The broken seal on King's Road was left when Cedric's men moved the king's horse to confuse the trail.

Garrett the Blacksmith had seen Cedric's men at the mine and unknowingly forged the blade Cedric used
to threaten Mira.

The kingdom did not simply lose its king. It was taken from him — by the hand he trusted most.`,
};
