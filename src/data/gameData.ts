import type { Character, Clue, Location, Motive, Method } from '../types';

export const CLUES: Record<string, Clue> = {
  'blood-glove': {
    id: 'blood-glove',
    name: 'Blood-Stained Glove',
    description: 'A silk glove bearing the royal crest, stained dark.',
    detail: 'The glove belongs to someone of high station — the embroidery is exceptionally fine. The bloodstains are no older than three nights. The glove is too small for a man\'s hand. It was found near the treasury entrance.',
    icon: '🧤',
    foundAt: 'blackthorn-castle',
    relatedCharacters: ['queen-elara'],
  },
  'torn-letter': {
    id: 'torn-letter',
    name: 'Torn Letter',
    description: 'Half a letter in cipher: "...when the deed is done, the throne shall be ours."',
    detail: 'The visible portion reads: "...when the deed is done, the throne shall be ours. Burn this upon reading. — C." The handwriting is deliberate, educated. The ink is military-grade. Signed only with the initial C.',
    icon: '📜',
    foundAt: 'ravens-hollow',
    relatedCharacters: ['lord-cedric', 'queen-elara'],
  },
  'broken-seal': {
    id: 'broken-seal',
    name: 'Broken Royal Seal',
    description: 'The king\'s personal wax seal, cracked in two on the King\'s Road.',
    detail: 'This seal would only leave the king\'s person in the most desperate of circumstances. Found on the King\'s Road, suggesting the king was intercepted there. The break is clean — deliberate, not accidental.',
    icon: '🔮',
    foundAt: 'kings-road',
    relatedCharacters: ['lord-cedric'],
  },
  'missing-sword': {
    id: 'missing-sword',
    name: 'Empty Sword Scabbard',
    description: 'The king\'s ceremonial scabbard, empty — Dawnbringer is gone.',
    detail: 'King Aldric\'s ceremonial sword "Dawnbringer" has vanished. The blacksmith noticed the scabbard empty two nights before the disappearance and reported it to Lord Cedric — who told him to say nothing.',
    icon: '⚔️',
    foundAt: 'blackthorn-castle',
    relatedCharacters: ['garrett-blacksmith', 'lord-cedric'],
  },
  'strange-footprint': {
    id: 'strange-footprint',
    name: 'Strange Footprint',
    description: 'An armored boot print with a distinctive repaired heel, leading toward a hidden wall.',
    detail: 'The print matches a resoled left boot — Sir Rowan had his repaired a fortnight ago at the village cobbler. The tracks emerge from the castle\'s east wing and lead toward a section of forest wall that doesn\'t appear on standard plans.',
    icon: '👁️',
    foundAt: 'ironwood-forest',
    relatedCharacters: ['sir-rowan'],
  },
  'passage-map': {
    id: 'passage-map',
    name: 'Secret Passage Map',
    description: 'A parchment map of tunnels beneath the castle, stolen from the monastery scriptorium.',
    detail: 'This map details a network of secret passages unknown even to the royal guard. One passage leads from the wine cellar directly to the forest edge. The monastery lock was forced — someone stole this map and used it.',
    icon: '🗺️',
    foundAt: 'old-monastery',
    relatedCharacters: ['father-tomas', 'lord-cedric'],
  },
  'black-feather': {
    id: 'black-feather',
    name: 'Monastery Raven Feather',
    description: 'An unusually large black feather tagged with the monastery\'s seal.',
    detail: 'This feather belongs to the correspondence ravens kept in the monastery\'s aviary — bred for carrying secret messages. Father Tomas admitted releasing them on the night the king vanished. He sent a warning. Too late.',
    icon: '🪶',
    foundAt: 'ravens-hollow',
    relatedCharacters: ['father-tomas'],
  },
  'poison-vial': {
    id: 'poison-vial',
    name: 'Physician\'s Poison Vial',
    description: 'A glass vial bearing Mira\'s mark, empty, with residue of Nightshade Ore extract.',
    detail: 'Nightshade Ore extract — a rare mineral from the Forgotten Mine. Causes complete paralysis before death and leaves no common trace in wine. Mira admitted under questioning she prepared it under coercion. Lord Cedric threatened her family.',
    icon: '⚗️',
    foundAt: 'forgotten-mine',
    relatedCharacters: ['mira', 'lord-cedric'],
  },
  'midnight-log': {
    id: 'midnight-log',
    name: 'Midnight Entry Log',
    description: 'A guard\'s log: Lord Cedric\'s seal used to access the treasury at the third hour.',
    detail: 'The log records an unauthorized entry at the third hour using Lord Cedric\'s personal seal. The treasury connects to the royal wine cellar through a concealed door. Someone poisoned the king\'s wine that night.',
    icon: '📋',
    foundAt: 'blackthorn-castle',
    relatedCharacters: ['lord-cedric'],
  },
};

export const CHARACTERS: Record<string, Character> = {
  'queen-elara': {
    id: 'queen-elara',
    name: 'Queen Elara',
    title: 'Queen of the Realm',
    description: 'The king\'s wife of twelve years. Beautiful and composed. Her grief appears measured — almost rehearsed.',
    suspicious: 'Observed whispering with Lord Cedric at the witching hour, two nights before the disappearance. Her chambers showed signs of recent burning — letters destroyed.',
    portraitType: 'queen',
    locationId: 'blackthorn-castle',
    clueIds: ['blood-glove', 'torn-letter'],
    dialogue: [
      {
        id: 'start',
        text: 'Investigator. I pray you find my husband swiftly. Every moment without word tears at my heart.',
        options: [
          { id: 'ask-last-seen', text: 'When did you last see the king?', nextNodeId: 'last-seen' },
          { id: 'ask-cedric', text: 'You were seen speaking with Lord Cedric that night.', nextNodeId: 'cedric-question' },
          { id: 'ask-glove', text: 'I found a silk glove near the treasury. Do you recognize it?', nextNodeId: 'glove-reveal', revealsClueId: 'blood-glove' },
        ],
      },
      {
        id: 'last-seen',
        text: 'At dinner. He seemed troubled — barely touched his wine. Then he excused himself to the treasury, said he had urgent matters. That was the last I saw of him.',
        options: [
          { id: 'ask-troubled', text: 'What was troubling him?', nextNodeId: 'troubled' },
          { id: 'return', text: 'I have no further questions for now.', nextNodeId: null },
        ],
      },
      {
        id: 'troubled',
        text: 'He had grown suspicious of certain members of court. He would not name them, but said someone close to him had been selling state secrets. He intended to confront them.',
        options: [
          { id: 'ask-who', text: 'Did he say who?', nextNodeId: 'who' },
          { id: 'return', text: 'I see. Thank you.', nextNodeId: null },
        ],
      },
      {
        id: 'who',
        text: 'No. He said only that the betrayer wore a mask of loyalty. I begged him to take Sir Rowan. He refused. He said he needed to handle it alone. I should have insisted.',
        options: [
          { id: 'return', text: 'Thank you, Your Grace.', nextNodeId: null },
        ],
      },
      {
        id: 'cedric-question',
        text: 'Lord Cedric came to inform me the gates would be sealed for security. A brief conversation. Nothing more.',
        options: [
          { id: 'press', text: 'Guards say the conversation lasted over an hour.', nextNodeId: 'pressed' },
          { id: 'believe', text: 'Of course, Your Grace.', nextNodeId: null },
        ],
      },
      {
        id: 'pressed',
        text: 'You dare accuse me? I am the queen. Lord Cedric is an old family friend — nothing more. Leave my sight before I have you removed from court.',
        options: [
          { id: 'leave', text: 'Forgive me, Your Grace.', nextNodeId: null },
        ],
      },
      {
        id: 'glove-reveal',
        text: 'I... no. I have never seen that glove. Where did you find it?',
        options: [
          { id: 'reveal-location', text: 'Near the treasury entrance.', nextNodeId: 'glove-response' },
          { id: 'stay-quiet', text: 'I cannot say.', nextNodeId: null },
        ],
      },
      {
        id: 'glove-response',
        text: 'That is... I may have gone there. To look for the king. Yes, that is where I went. But I found nothing.',
        options: [
          { id: 'return', text: 'Of course.', nextNodeId: null },
        ],
      },
    ],
  },

  'lord-cedric': {
    id: 'lord-cedric',
    name: 'Lord Cedric',
    title: 'Commander of the Royal Army',
    description: 'A decorated war veteran, the king\'s right hand. Respected by troops, feared by nobles. Some say the real power behind the throne.',
    suspicious: 'Ordered the castle sealed before the disappearance was announced. Found burning documents in his war room. His seal used to access restricted areas at midnight.',
    portraitType: 'commander',
    locationId: 'blackthorn-castle',
    clueIds: ['torn-letter', 'broken-seal', 'midnight-log', 'passage-map'],
    dialogue: [
      {
        id: 'start',
        text: 'Investigator. I trust this will be brief. I have a kingdom to maintain while the king is... indisposed.',
        options: [
          { id: 'ask-seal', text: 'Why were the gates sealed before the disappearance was announced?', nextNodeId: 'gate-sealed' },
          { id: 'ask-midnight', text: 'Your seal was used to access the treasury at midnight.', nextNodeId: 'midnight', revealsClueId: 'midnight-log' },
          { id: 'ask-relationship', text: 'Tell me about your relationship with the king.', nextNodeId: 'relationship' },
        ],
      },
      {
        id: 'gate-sealed',
        text: 'I received intelligence of an assassination threat that evening. Standard precaution. I acted in the kingdom\'s best interest.',
        options: [
          { id: 'press-gates', text: 'What intelligence? From whom?', nextNodeId: 'intelligence' },
          { id: 'accept', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'intelligence',
        text: 'A confidential informant. Their identity is protected for obvious reasons. I will not compromise state security for this investigation.',
        options: [
          { id: 'return', text: 'Very well.', nextNodeId: null },
        ],
      },
      {
        id: 'midnight',
        text: 'You are mistaken. My seal was not used. Or if it was, someone obtained a forgery. I suggest you investigate that avenue.',
        options: [
          { id: 'press-seal', text: 'The log is written in the guard\'s own hand. There is no forgery.', nextNodeId: 'seal-pressed' },
          { id: 'drop', text: 'I shall look into it further.', nextNodeId: null },
        ],
      },
      {
        id: 'seal-pressed',
        text: 'Guards make errors. They are overworked. Now if you have no further questions, I have a search party to coordinate.',
        options: [
          { id: 'return', text: 'That will be all.', nextNodeId: null },
        ],
      },
      {
        id: 'relationship',
        text: 'The king and I had disagreements, as any commander does with his liege. But I am loyal to the crown. I have bled for this kingdom. To suggest otherwise is an insult.',
        options: [
          { id: 'ask-disagreements', text: 'What disagreements?', nextNodeId: 'disagreements' },
          { id: 'return', text: 'Understood.', nextNodeId: null },
        ],
      },
      {
        id: 'disagreements',
        text: 'The king was soft. He wished to negotiate with border lords who deserved only iron. He was weakening the realm. But that gave me no cause to harm him. A weak king is still MY king.',
        options: [
          { id: 'return', text: 'Thank you for your candor.', nextNodeId: null },
        ],
      },
    ],
  },

  'father-tomas': {
    id: 'father-tomas',
    name: 'Father Tomas',
    title: 'Prior of the Old Monastery',
    description: 'A priest of twenty years standing, known for scholarly writing and quiet piety. Something has deeply unsettled him.',
    suspicious: 'Absent from the monastery on the night of the disappearance. Refuses to explain his whereabouts. All his ravens were released that night.',
    portraitType: 'priest',
    locationId: 'old-monastery',
    clueIds: ['black-feather', 'passage-map'],
    dialogue: [
      {
        id: 'start',
        text: 'God\'s peace be upon you, investigator. A dark hour has fallen on the realm. I pray for the king daily.',
        options: [
          { id: 'ask-whereabouts', text: 'Where were you on the night the king disappeared?', nextNodeId: 'whereabouts' },
          { id: 'ask-ravens', text: 'Why were all your ravens released that night?', nextNodeId: 'ravens' },
          { id: 'ask-map', text: 'Tell me about the secret passages beneath the castle.', nextNodeId: 'passages' },
        ],
      },
      {
        id: 'whereabouts',
        text: 'I was... attending to a private matter of the spirit. A vigil. I spent the night in prayer.',
        options: [
          { id: 'press-vigil', text: 'Alone? No witnesses?', nextNodeId: 'alone' },
          { id: 'accept', text: 'A holy man\'s alibi, then.', nextNodeId: null },
        ],
      },
      {
        id: 'alone',
        text: 'God was my witness. If that is not sufficient for you, I cannot offer more.',
        options: [
          { id: 'return', text: 'We shall speak again, Father.', nextNodeId: null },
        ],
      },
      {
        id: 'ravens',
        text: 'The birds grew agitated. Animals sense what we cannot. I released them to calm them. It is not the first time.',
        options: [
          { id: 'press-ravens', text: 'Or perhaps you sent messages that night.', nextNodeId: 'ravens-pressed', revealsClueId: 'black-feather' },
          { id: 'accept', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'ravens-pressed',
        text: 'I... God forgive me. Yes. I sent a warning to the king. I had learned of a plot against his life. I was trying to save him.',
        options: [
          { id: 'ask-plot', text: 'What plot? Who told you?', nextNodeId: 'plot' },
        ],
      },
      {
        id: 'plot',
        text: 'A man came to confess his sins. I cannot break the seal of confession. But the king was betrayed by one who swore him loyalty. And the mine holds a secret darker than iron.',
        options: [
          { id: 'ask-mine', text: 'What secret does the mine hold?', nextNodeId: 'mine-secret', revealsClueId: 'passage-map' },
          { id: 'return', text: 'Thank you, Father.', nextNodeId: null },
        ],
      },
      {
        id: 'mine-secret',
        text: 'Nightshade Ore. They have been extracting it — not for forging. For poison. The king was to disappear quietly, without mark or wound. God have mercy on his soul.',
        options: [
          { id: 'return', text: 'You have been most helpful, Father.', nextNodeId: null },
        ],
      },
      {
        id: 'passages',
        text: 'The monastery predates the castle. We have records — maps — of underground routes. I kept them locked. But three days ago I discovered the lock had been forced.',
        options: [
          { id: 'ask-who', text: 'Someone stole the maps?', nextNodeId: 'who-stole' },
        ],
      },
      {
        id: 'who-stole',
        text: 'Yes. Whoever took them knew exactly where to look. The maps show a passage from the wine cellar to the forest. It would allow someone to move through the castle unseen.',
        options: [
          { id: 'return', text: 'This changes everything.', nextNodeId: null },
        ],
      },
    ],
  },

  'sir-rowan': {
    id: 'sir-rowan',
    name: 'Sir Rowan',
    title: 'Knight Champion of the Realm',
    description: 'The king\'s most trusted knight and oldest friend. He appears devastated — but guilt and grief look alike from a distance.',
    suspicious: 'Absent from his post at the crucial hour. His distinctive boot prints lead toward a hidden wall section. Has been asking about the king\'s route as if he already knew it.',
    portraitType: 'knight',
    locationId: 'blackthorn-castle',
    clueIds: ['strange-footprint'],
    dialogue: [
      {
        id: 'start',
        text: 'I should have been with him. I should never have left his side. Whatever happened... I carry that guilt.',
        options: [
          { id: 'ask-post', text: 'Where were you when the king disappeared?', nextNodeId: 'post' },
          { id: 'ask-footprints', text: 'Were you near the Ironwood Forest that night?', nextNodeId: 'footprints' },
          { id: 'ask-known', text: 'Did the king speak of any threats to his life?', nextNodeId: 'threats' },
        ],
      },
      {
        id: 'post',
        text: 'Lord Cedric pulled me from my post. Said there was a disturbance at the northern gate requiring my personal attention. By the time I returned — the king was gone.',
        options: [
          { id: 'press-cedric', text: 'Lord Cedric ordered you away from the king?', nextNodeId: 'cedric-blame' },
          { id: 'accept', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'cedric-blame',
        text: 'I didn\'t question it then. Cedric outranks me. But in hindsight — yes. He removed me deliberately. I am certain of it now.',
        options: [
          { id: 'ask-why', text: 'Why would Cedric need you gone?', nextNodeId: 'why-cedric' },
          { id: 'return', text: 'Thank you, Sir Rowan.', nextNodeId: null },
        ],
      },
      {
        id: 'why-cedric',
        text: 'Because I am the only one the king truly trusted. If I had been present, whatever Cedric planned would have failed. He needed me gone.',
        options: [
          { id: 'return', text: 'I understand.', nextNodeId: null },
        ],
      },
      {
        id: 'footprints',
        text: '...How did you know? I went into the forest after returning from the north gate. I heard movement. But there was nothing. Only darkness.',
        options: [
          { id: 'press-forest', text: 'Your boot prints led to a hidden section of wall.', nextNodeId: 'wall', revealsClueId: 'strange-footprint' },
          { id: 'return', text: 'And you found nothing?', nextNodeId: null },
        ],
      },
      {
        id: 'wall',
        text: 'There is a passage there. Ancient. The king showed it to me years ago — said it was a secret between us alone. If someone else knew of it, the king trusted very few with that knowledge.',
        options: [
          { id: 'return', text: 'That is very useful.', nextNodeId: null },
        ],
      },
      {
        id: 'threats',
        text: 'Yes. He told me someone at court was plotting against him. He wouldn\'t say who — said the evidence wasn\'t yet conclusive. He didn\'t want to accuse someone falsely.',
        options: [
          { id: 'ask-last-words', text: 'What were his last words to you?', nextNodeId: 'last-words' },
          { id: 'return', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'last-words',
        text: '"Tonight I settle the matter once and for all." That is what he told me. He was so certain. And then I was sent away, and I never saw him again.',
        options: [
          { id: 'return', text: 'Thank you. This will help.', nextNodeId: null },
        ],
      },
    ],
  },

  'mira': {
    id: 'mira',
    name: 'Mira',
    title: 'Royal Physician',
    description: 'A brilliant healer trained in the medical arts of three kingdoms. She has access to every remedy — and poison. She has been visibly distressed for weeks.',
    suspicious: 'Requisitioned an unusual mineral compound from the Forgotten Mine six weeks ago. No patient records support this. Refuses to explain the discrepancy.',
    portraitType: 'physician',
    locationId: 'blackthorn-castle',
    clueIds: ['poison-vial'],
    dialogue: [
      {
        id: 'start',
        text: 'I told the guards everything already. I do not know what more I can add.',
        options: [
          { id: 'ask-mineral', text: 'What was the mineral compound you requisitioned for?', nextNodeId: 'mineral' },
          { id: 'ask-king', text: 'Was the king in good health before the disappearance?', nextNodeId: 'health' },
          { id: 'ask-vial', text: 'I found a vial bearing your physician\'s mark.', nextNodeId: 'vial', revealsClueId: 'poison-vial' },
        ],
      },
      {
        id: 'mineral',
        text: 'For a treatment. A patient with joint pain. The compound has analgesic properties when prepared correctly.',
        options: [
          { id: 'press-records', text: 'Your records show no such patient.', nextNodeId: 'records' },
          { id: 'accept', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'records',
        text: 'I... keep some records private. Patient confidentiality is sacred to my practice.',
        options: [
          { id: 'press-more', text: 'A physician hiding records. That is quite damning.', nextNodeId: 'breaking' },
          { id: 'return', text: 'I will return to this.', nextNodeId: null },
        ],
      },
      {
        id: 'breaking',
        text: 'Please... I had no choice. He threatened my family. I was told it would be used as a sleeping draft only. I swear I did not know it would— I thought he would only sleep—',
        options: [
          { id: 'ask-who', text: 'Who threatened you? Give me a name.', nextNodeId: 'confess' },
        ],
      },
      {
        id: 'confess',
        text: 'Lord Cedric. He came weeks ago. Said my nephew would suffer if I refused. He wanted the compound prepared as a concentrate. Nightshade Ore dissolves in wine. In sufficient quantity... it paralyses. Completely. Within the hour.',
        options: [
          { id: 'return', text: 'Thank you for your courage, Mira.', nextNodeId: null },
        ],
      },
      {
        id: 'health',
        text: 'The king was in excellent health. Whatever ailed him on that last night was not natural.',
        options: [
          { id: 'return', text: 'Noted.', nextNodeId: null },
        ],
      },
      {
        id: 'vial',
        text: 'Where did you— that vial contains Nightshade Ore concentrate. If you found it... then it was used.',
        options: [
          { id: 'ask-effects', text: 'What would it do to someone?', nextNodeId: 'effects' },
        ],
      },
      {
        id: 'effects',
        text: 'Complete paralysis within an hour. The victim would appear to faint. Then... nothing. No marks. No trace in the blood unless you know exactly what to look for. It is a physician\'s poison.',
        options: [
          { id: 'return', text: 'I have what I need.', nextNodeId: null },
        ],
      },
    ],
  },

  'garrett-blacksmith': {
    id: 'garrett-blacksmith',
    name: 'Garrett',
    title: 'Royal Blacksmith',
    description: 'A mountain of a man with hands like hammers and eyes that miss nothing. Gruff but fundamentally honest — or so it was thought.',
    suspicious: 'Forged a custom blade on secret commission three days before the disappearance. Refuses to name the buyer. Was seen near the Forgotten Mine days before Mira\'s requisition.',
    portraitType: 'blacksmith',
    locationId: 'northern-village',
    clueIds: ['missing-sword'],
    dialogue: [
      {
        id: 'start',
        text: 'I am a craftsman, investigator. I forge what I am paid to forge. I know nothing of politics.',
        options: [
          { id: 'ask-blade', text: 'Tell me about the secret commission.', nextNodeId: 'blade' },
          { id: 'ask-sword', text: 'When did you first notice the king\'s sword was missing?', nextNodeId: 'sword', revealsClueId: 'missing-sword' },
          { id: 'ask-mine', text: 'What were you doing near the Forgotten Mine?', nextNodeId: 'mine' },
        ],
      },
      {
        id: 'blade',
        text: 'I forge hundreds of blades yearly. Be more specific.',
        options: [
          { id: 'press-blade', text: 'The one forged at night. With no apprentice present.', nextNodeId: 'blade-pressed' },
          { id: 'return', text: 'I see.', nextNodeId: null },
        ],
      },
      {
        id: 'blade-pressed',
        text: 'A man commissioned it. No name. Paid gold — twice the going rate. Said it was a private gift. I don\'t ask questions when the coin is right.',
        options: [
          { id: 'ask-description', text: 'Describe him.', nextNodeId: 'description' },
          { id: 'return', text: 'And you have no suspicions who it was?', nextNodeId: null },
        ],
      },
      {
        id: 'description',
        text: 'Military bearing. Fine clothes beneath a traveling cloak. A scar on his left hand — old sword cut. That is all I can tell you.',
        options: [
          { id: 'return', text: 'That is helpful.', nextNodeId: null },
        ],
      },
      {
        id: 'sword',
        text: 'I maintain Dawnbringer monthly. But two nights before the king vanished, the scabbard was already empty. I reported it to Lord Cedric. He told me to say nothing and that he would handle it himself.',
        options: [
          { id: 'return', text: 'Cedric knew and said nothing. Thank you.', nextNodeId: null },
        ],
      },
      {
        id: 'mine',
        text: 'Looking for ore samples. When I arrived, there were men loading crates — men I did not recognize. Not miners. They drove me off when they caught me looking.',
        options: [
          { id: 'ask-crates', text: 'What was in the crates?', nextNodeId: 'crates' },
          { id: 'return', text: 'Interesting.', nextNodeId: null },
        ],
      },
      {
        id: 'crates',
        text: 'One crate had a crack. I smelled it — bitter, like crushed stone and rot. I have never smelled its like before. The men had military bearing. Cedric\'s men, I\'d wager.',
        options: [
          { id: 'return', text: 'Thank you, Garrett.', nextNodeId: null },
        ],
      },
    ],
  },
};

export const LOCATIONS: Record<string, Location> = {
  'blackthorn-castle': {
    id: 'blackthorn-castle',
    name: 'Blackthorn Castle',
    description: 'The seat of royal power. Its ancient stones have witnessed centuries of rule. Tonight they hide darker secrets.',
    ambiance: 'Torches flicker in the corridors. Guards stand rigid at every door. The air smells of beeswax and unease. The throne sits empty.',
    clueIds: ['blood-glove', 'missing-sword', 'midnight-log'],
    characterIds: ['queen-elara', 'lord-cedric', 'sir-rowan', 'mira'],
    mapPosition: { x: 52, y: 22 },
    inspectItems: [
      {
        id: 'throne-room',
        name: 'The Throne Room',
        description: 'The great hall where the king held court.',
        text: 'The throne sits empty, draped in shadow. On the floor near the dais, you notice scuff marks — as if something heavy was dragged. Near the fireplace, you find an empty ceremonial scabbard.',
        revealsClueId: 'missing-sword',
      },
      {
        id: 'treasury-door',
        name: 'Treasury Entrance',
        description: 'The iron-reinforced door to the royal treasury.',
        text: 'The door shows no signs of forced entry — opened with the proper seal. Near the threshold, half-hidden beneath a stone lip, lies a silk glove. It is stained dark with what appears to be blood.',
        revealsClueId: 'blood-glove',
      },
      {
        id: 'guard-post',
        name: 'The Guard Post Ledger',
        description: 'The guard\'s station near the treasury.',
        text: 'A meticulous ledger records all entries. At the third hour on the night of disappearance, Lord Cedric\'s seal was used to bypass standard security. The entry is clearly written in the guard\'s careful hand.',
        revealsClueId: 'midnight-log',
      },
    ],
  },
  'ravens-hollow': {
    id: 'ravens-hollow',
    name: "Raven's Hollow",
    description: 'A dense hollow where ravens roost and superstition runs deep. The locals avoid it at night.',
    ambiance: 'The trees grow twisted and close together. Ravens watch from every branch. A cold wind carries the smell of pine and something else — ink, and burnt parchment.',
    clueIds: ['torn-letter', 'black-feather'],
    characterIds: [],
    mapPosition: { x: 78, y: 28 },
    inspectItems: [
      {
        id: 'ravens-nest',
        name: 'Beneath the Old Oak',
        description: 'The base of an enormous gnarled oak.',
        text: 'Among the roots of the ancient oak, you find the remnants of a fire — still warm. Someone burned documents here recently. From the ash, a single fragment survives: half of a letter, the ink still legible. "...when the deed is done, the throne shall be ours."',
        revealsClueId: 'torn-letter',
      },
      {
        id: 'raven-perch',
        name: 'The Stone Perch',
        description: 'A carved stone where the ravens gather.',
        text: 'An unusually large black feather lies on the stone. These birds are monastery-bred — trained for correspondence. A tag around the shaft\'s base bears the monastery seal and a dispatch date: three nights ago.',
        revealsClueId: 'black-feather',
      },
    ],
  },
  'old-monastery': {
    id: 'old-monastery',
    name: 'The Old Monastery',
    description: 'Built three centuries before the castle, it predates the kingdom itself. Father Tomas tends its ancient halls.',
    ambiance: 'Candles burn in every alcove. Illuminated manuscripts cover long tables. The air carries vellum, incense, and something like fear.',
    clueIds: ['passage-map'],
    characterIds: ['father-tomas'],
    mapPosition: { x: 82, y: 56 },
    inspectItems: [
      {
        id: 'scriptorium',
        name: 'The Scriptorium',
        description: 'The monastery\'s writing room, lined with ancient manuscripts.',
        text: 'One cabinet has been recently violated — its lock is forced. Inside, an empty frame where a large map once hung. Near the floor, a corner of parchment remains: the edge of a map showing passages beneath the castle.',
        revealsClueId: 'passage-map',
      },
      {
        id: 'aviary',
        name: 'The Raven Aviary',
        description: 'An empty birdcage tower.',
        text: 'The aviary cages stand open and empty. Father Tomas released all his correspondence ravens on the night of the king\'s disappearance. Among the scattered feathers, you find one tagged with the monastery\'s seal.',
      },
    ],
  },
  'ironwood-forest': {
    id: 'ironwood-forest',
    name: 'Ironwood Forest',
    description: 'An ancient forest where the trees grow so dense their canopy blocks all light. Outlaws have hidden here for centuries.',
    ambiance: 'Darkness under the canopy even in daylight. Twigs snap underfoot. Something watches from the shadows between the iron-grey trunks.',
    clueIds: ['strange-footprint'],
    characterIds: [],
    mapPosition: { x: 17, y: 50 },
    inspectItems: [
      {
        id: 'forest-path',
        name: 'The Hidden Forest Path',
        description: 'A barely visible trail heading east toward the castle.',
        text: 'Following the path east, you find armored boot prints in the soft earth. The left heel shows a repair patch — an irregular welt. The tracks emerge from the direction of the castle\'s east wall and lead to a section that does not appear on standard plans.',
        revealsClueId: 'strange-footprint',
      },
      {
        id: 'forest-camp',
        name: 'The Abandoned Camp',
        description: 'Signs of recent habitation.',
        text: 'A fire circle, recently used. Bones of a meal. Military-grade rope, standard issue. Someone spent several hours here watching the castle\'s east entrance. They were very patient.',
      },
    ],
  },
  'kings-road': {
    id: 'kings-road',
    name: "King's Road",
    description: 'The main artery through the kingdom. Usually busy with soldiers and merchants — now strangely empty.',
    ambiance: 'Hoofprints in the mud, then none. As if a horse and rider simply vanished. The silence here is not natural.',
    clueIds: ['broken-seal'],
    characterIds: [],
    mapPosition: { x: 46, y: 58 },
    inspectItems: [
      {
        id: 'road-crossroads',
        name: 'The Crossroads',
        description: 'Where King\'s Road meets the forest path.',
        text: 'The ground at the crossroads is disturbed. A struggle occurred here — or a meeting. Pressed into the mud near the road marker, you find a broken royal wax seal: the king\'s personal emblem, cracked cleanly in two.',
        revealsClueId: 'broken-seal',
      },
    ],
  },
  'forgotten-mine': {
    id: 'forgotten-mine',
    name: 'The Forgotten Mine',
    description: 'An abandoned iron mine, supposedly played out. Yet recent activity suggests otherwise.',
    ambiance: 'Fresh cart tracks cut through old dust. The smell of torches is recent. Deep in the shafts, something glimmers — not iron.',
    clueIds: ['poison-vial'],
    characterIds: [],
    mapPosition: { x: 24, y: 76 },
    inspectItems: [
      {
        id: 'mine-shaft',
        name: 'The Deep Shaft',
        description: 'The mine\'s deepest section, recently excavated.',
        text: 'New pick marks in the stone. They are not mining iron — the ore they seek glimmers with a dark purple sheen. On the floor near the shaft wall, a small glass vial has rolled into a crack. It bears the physician\'s mark. The residue within has the bitter smell of Nightshade Ore extract.',
        revealsClueId: 'poison-vial',
      },
    ],
  },
  'river-alden': {
    id: 'river-alden',
    name: 'River Alden',
    description: 'The great river that divides the kingdom. Its banks hold many whispered secrets.',
    ambiance: 'The water runs dark in the moonlight. An old ferryman knows every crossing — and every face that has used them.',
    clueIds: [],
    characterIds: [],
    mapPosition: { x: 54, y: 70 },
    inspectItems: [
      {
        id: 'ferryman-crossing',
        name: "The Ferryman's Post",
        description: 'An old crossing point, marked by weathered planks.',
        text: "The ferryman's log records an unusual crossing three nights ago at the second hour. A man in heavy riding gear — military bearing, traveling cloak — crossed alone. Paid in gold. His cloak bore a military insignia on the lining.",
      },
    ],
  },
  'northern-village': {
    id: 'northern-village',
    name: 'The Northern Village',
    description: 'A small but proud settlement at the kingdom\'s northern edge. The blacksmith\'s forge is its heart.',
    ambiance: 'The clang of the hammer carries through morning mist. Villagers speak in hushed tones. Fear lives here — new and unfamiliar.',
    clueIds: [],
    characterIds: ['garrett-blacksmith'],
    mapPosition: { x: 28, y: 17 },
    inspectItems: [
      {
        id: 'village-well',
        name: 'The Village Well',
        description: 'Where villagers gather and exchange news.',
        text: 'An elder woman pulls you aside: "Soldiers came. Not our soldiers — Cedric\'s men. They searched every home. Looking for something they would not name. That was the very night the king went missing."',
      },
    ],
  },
};

export const MOTIVES: Motive[] = [
  { id: 'seize-throne', label: 'Seize the Throne', description: 'Remove the king and claim power — with or without the queen.' },
  { id: 'revenge', label: 'Personal Revenge', description: 'A long-held grudge, finally acted upon in secret.' },
  { id: 'protect-secret', label: 'Protect a Secret', description: 'The king discovered something that had to be buried with him.' },
  { id: 'ransom', label: 'Hold for Ransom', description: 'The king is kept alive as political leverage.' },
  { id: 'foreign-power', label: 'Foreign Conspiracy', description: 'An outside enemy paid for the king\'s removal.' },
];

export const METHODS: Method[] = [
  { id: 'poison', label: 'Poison', description: 'A silent death by Nightshade Ore extract dissolved in the royal wine.' },
  { id: 'blade', label: 'Assassination by Blade', description: 'A knife in the dark — swift, decisive, traceable.' },
  { id: 'abduction', label: 'Abduction', description: 'The king was taken alive through the secret passages.' },
  { id: 'exile', label: 'Forced Exile', description: 'The king was threatened and blackmailed into fleeing.' },
  { id: 'accident', label: 'Staged Accident', description: 'An "accident" arranged to look like misfortune.' },
];

export const SUSPECTS_LIST = Object.keys(CHARACTERS);

export const CORRECT_ANSWER = {
  suspectId: 'lord-cedric',
  motiveId: 'seize-throne',
  methodId: 'poison',
};

export const FULL_STORY = `Lord Cedric, Commander of the Royal Army, conspired with Queen Elara to seize the throne.
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

The kingdom did not simply lose its king. It was taken from him — by the hand he trusted most.`;

export const LOCATION_ORDER = [
  'blackthorn-castle',
  'ravens-hollow',
  'old-monastery',
  'ironwood-forest',
  'kings-road',
  'forgotten-mine',
  'river-alden',
  'northern-village',
];
