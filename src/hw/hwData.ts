import type { HWClue, HWPerson, HWClearing, HWFindingOption } from './hwTypes';

// ── Clues ─────────────────────────────────────────────────────────────────────

export const HW_CLUES: Record<string, HWClue> = {
  'ledger-page': {
    id: 'ledger-page',
    name: 'Torn Ledger Page',
    description: 'A page from the sawmill\'s private accounts — payments made, never to the mill.',
    detail: 'The entries span eleven years: sums paid quarterly to eleven different families, always beginning the autumn after a name was added to the Due Stone. No invoice, no wages column — just "settlement" in Hollis Briggs\'s own hand. The amounts are generous. Generous enough to buy a family\'s silence, and their agreement to leave Ashwick Hollow within the year. The wood does not pay debts. Someone on the Council does.',
    icon: '⊞',
    foundIn: 'The Sawmill',
    relatedPeople: ['briggs', 'thorne'],
  },
  'mara-diary': {
    id: 'mara-diary',
    name: "Mara's Hidden Diary",
    description: 'Found beneath a loose floorboard — her last entries, unfinished.',
    detail: 'The final week\'s entries grow shorter, more careful, as if she knew someone might read them before she meant them to. "Found the ledger in Grandfather\'s desk, not the mill. He\'s had a copy the whole time. He isn\'t the one deciding anymore — I don\'t think he ever was, not really. Told Aunt Elsie everything tonight. She went very quiet. Tomorrow I\'m going to the constable, folklore or no folklore." The entry after that is blank. She never went to the constable.',
    icon: '✒',
    foundIn: "Mara's Cottage",
    relatedPeople: ['mara', 'thorne', 'elsie'],
  },
  'due-stone-rubbing': {
    id: 'due-stone-rubbing',
    name: 'A Rubbing of the Due Stone',
    description: "Every name ever taken by 'the wood,' carved in careful rows.",
    detail: 'Forty-seven names across two centuries — roughly one every four to five years, never more than one per season. Cross-referenced against the parish register, a pattern holds without exception: every single name belonged to someone who, in the year before they vanished, had either fallen deep into debt to the mill, threatened to leave Ashwick Hollow for good, or asked too many questions of the Council. The wood, it seems, only ever takes the inconvenient.',
    icon: '⊗',
    foundIn: 'Ashwick Green',
    relatedPeople: ['weaver', 'rennick'],
  },
  'boot-print': {
    id: 'boot-print',
    name: 'A Boot Print Outside the Chapel',
    description: "Fresh, deep, and pressed into mud that shouldn't have been disturbed.",
    detail: 'The tread matches a specific reinforced work boot — the kind sold nowhere in the county except the company store attached to the sawmill, issued to mill foremen as part of their wage. The print faces away from the Sunken Chapel, toward the village, made the same night Mara was last seen leaving her cottage. Whoever stood at the chapel that night walked home to the mill, not into the wood.',
    icon: '⊘',
    foundIn: 'The Sunken Chapel',
    relatedPeople: ['briggs'],
  },
  'mine-report': {
    id: 'mine-report',
    name: 'A Buried Mine Safety Report',
    description: "Thirty years old, marked CONDEMNED, and never acted upon.",
    detail: "Commissioned the year before the Deep Cuts were officially \"sealed,\" the report recommends the shafts be filled entirely — subsidence risk, poor air, unstable timbering. Instead, only the main entrance was boarded, quietly, without the fill. It has stood open behind that board ever since. A condemned mine costs money to fill and nothing at all to leave as a convenient, unmarked place for something to disappear into.",
    icon: '⊚',
    foundIn: 'The Deep Cuts',
    relatedPeople: ['rennick'],
  },
  'thorne-letter': {
    id: 'thorne-letter',
    name: 'An Unsent Letter',
    description: 'Addressed to the county assizes, sealed but never posted.',
    detail: 'In Josiah Thorne\'s own hand, dated two days before he vanished: "I have kept this village\'s peace for forty years by looking away from what keeps it. I can no longer look away from what it has asked of my own blood. If this reaches you, come to Ashwick Hollow and ask who benefits from a wood that only ever wants the people who are already owed money, or who already mean to leave." It was never mailed. He never got the chance.',
    icon: '✉',
    foundIn: 'Thorne Manor',
    relatedPeople: ['thorne'],
  },
  'offering-box': {
    id: 'offering-box',
    name: 'The Offering Box at the Hollow Root',
    description: 'Left open at the base of the ancient tree — its contents are not old.',
    detail: 'Tradition holds the wood accepts small offerings from the chosen before it takes them: a comb, a coin, a keepsake left behind. The box beneath the Hollow Root holds exactly that — except every item inside is recent. A wristwatch stopped just nine days ago. A ribbon Mara wore in the spring social. These are not gifts left by the wood\'s chosen. They are effects taken from people before they disappeared, staged here afterward to complete the story the village already believes.',
    icon: '⊡',
    foundIn: 'The Hollow Root',
    relatedPeople: ['weaver', 'thorne'],
  },
};

// ── People ────────────────────────────────────────────────────────────────────

export const HW_PEOPLE: Record<string, HWPerson> = {
  'thorne': {
    id: 'thorne',
    name: 'Josiah Thorne',
    role: 'Elder of Ashwick Hollow — keeper of the Due',
    description: 'Eighty-one years old and the last of his line to hold the office of Elder. For forty years he has presided over the autumn Due without ever asking who chooses the name. His testimony was gathered from his study before he too disappeared — pieced together from what he told Elsie and what he left behind.',
    suspicious: 'He signed off on every Due for four decades without objection. Only in his final weeks did he begin asking the questions he should have asked as a young man — and only after his own granddaughter\'s name came up on the list.',
    clueIds: ['thorne-letter'],
    logs: [
      {
        id: 'thorne-log-1',
        timestamp: 'FORTY YEARS AGO, HIS FIRST DUE',
        text: 'I was thirty-nine when I presided over my first Due. My father told me the names came from the wood itself — that the stone simply showed them to whoever kept vigil at the chapel. I did not ask how a stone shows anything. I was young, and glad it was not my name, and that was enough for forty years.',
      },
      {
        id: 'thorne-log-2',
        timestamp: 'NINE DAYS AGO — MARA CAME TO ME',
        text: 'My granddaughter came to my study with a ledger page and a question I have spent my whole life not answering. She asked who really chooses the Due. I told her what my father told me. She said she didn\'t believe him, and she didn\'t believe me either. I did not sleep that night.',
      },
      {
        id: 'thorne-log-3',
        timestamp: 'SEVEN DAYS AGO — THE COUNCIL MET',
        text: 'Hollis Briggs came to the manor before the Council met, not after — to tell me, not ask me, that this year\'s name was already decided. When I said her name aloud in that room, no one would look at me. I understood then that the stone had never chosen anything. Men had.',
      },
      {
        id: 'thorne-log-4',
        timestamp: 'TWO DAYS AGO — MY LAST ENTRY',
        text: 'I have written to the assizes. I mean to walk it to the county road myself tomorrow rather than trust it to the post. If anyone reads this after me: the wood never wanted Mara. Someone in this village did, and hid behind an old story to take her.',
      },
    ],
  },

  'elsie': {
    id: 'elsie',
    name: 'Elsie Corbin',
    role: "Mara's aunt — the one who wrote to you",
    description: 'Josiah Thorne\'s daughter and Mara\'s aunt. She left the Council eight years ago after a falling-out no one in the village will discuss, and it was her letter — smuggled to a folklore society two counties over — that brought you to Ashwick Hollow in the first place.',
    suspicious: 'She summoned outside help for her niece but has said nothing about her own history on the Council, or why she left it. She grows tense whenever the Due Stone is mentioned.',
    clueIds: [],
    logs: [
      {
        id: 'elsie-log-1',
        timestamp: 'WHY SHE WROTE TO YOU',
        text: 'I sat on the Council for eleven years before I left it. I won\'t tell you why I left, not yet — only that I swore I\'d never let it touch my family again. When Mara\'s name came up, I broke that promise the only way I knew how. I wrote to people outside Ashwick Hollow, because no one inside it would help her.',
      },
      {
        id: 'elsie-log-2',
        timestamp: 'ON THE COUNCIL, YEARS AGO',
        text: 'You want to know what the Council actually is. Six seats: the Elder, the mill owner, the constable, and three others chosen by the first three. We never called it choosing a sacrifice. We called it "settling an account." I told myself for eleven years that the wood needed something, and it was kinder for us to choose than to let it choose badly.',
      },
      {
        id: 'elsie-log-3',
        timestamp: 'WHAT MADE HER LEAVE',
        text: 'The year I left, the name that came up was a widow who\'d simply asked the mill for a fairer wage. There was no debt, no ancient grievance — just a woman who was inconvenient. I said her name shouldn\'t count. I was outvoted five to one. I have not set foot in a Council meeting since, and I have not forgiven myself for the eleven years I did.',
      },
      {
        id: 'elsie-log-4',
        timestamp: 'SINCE MARA VANISHED',
        text: 'My father won\'t say who put her name forward. I don\'t think he knows how to say it without admitting he let it happen to eleven people before her. Find out what he won\'t tell me. Please. I have already lost enough of my family to this village\'s silence.',
      },
    ],
  },

  'rennick': {
    id: 'rennick',
    name: 'Constable Rennick',
    role: "Village Constable — rules every disappearance 'misadventure'",
    description: 'Ashwick Hollow\'s only lawman for two decades. Every disappearance in his tenure has been officially recorded as an accident — a fall in the bog, a wrong turn into the mine. He has never once requested help from the county authorities.',
    suspicious: 'He sealed the Deep Cuts himself twenty years ago and has renewed the same lazy "boarded, not filled" repair every year since. He was the last person to speak to Elder Thorne before he vanished.',
    clueIds: ['mine-report'],
    logs: [
      {
        id: 'rennick-log-1',
        timestamp: 'ON THE RECORD',
        text: 'Every case in my file is closed the same way: misadventure, no foul play suspected. You can call that neglect if you like. I call it not wasting the county\'s time on a bog that\'s swallowed careless travelers since before I was born. Ashwick Hollow buries its own and always has.',
      },
      {
        id: 'rennick-log-2',
        timestamp: 'ABOUT THE DEEP CUTS',
        text: 'I sealed that mine myself, twenty years back, on the mill\'s instruction and the mill\'s coin. Boarding was cheaper than filling. I told them it wasn\'t a proper seal. They told me it didn\'t need to be — nobody with sense goes near the Deep Cuts anyway. I signed the paperwork and never asked what "nobody with sense" was supposed to mean.',
      },
      {
        id: 'rennick-log-3',
        timestamp: 'THE NIGHT ELDER THORNE VANISHED',
        text: 'He came to my post two nights ago, agitated, asking if I\'d ever actually investigated a Due disappearance properly — walked the ground, looked for a trail, anything. I told him what I tell everyone: there\'s nothing to find. He looked at me like he finally understood what that answer had always meant. I haven\'t seen him since.',
      },
      {
        id: 'rennick-log-4',
        timestamp: "WHAT I WON'T PUT IN A REPORT",
        text: 'Off the record — and I mean off it — I\'ve noticed the same boot tread near the chapel three Due nights running. I know whose boot it is. I have not written that down in twenty years, and I am not going to start with you standing here. Some things in this village keep the peace better left unsaid.',
      },
    ],
  },

  'briggs': {
    id: 'briggs',
    name: 'Hollis Briggs',
    role: 'Owner of the Ashwick Sawmill — Council seat',
    description: 'The wealthiest man in Ashwick Hollow and the Council\'s most forceful voice for two decades. The mill is the only real employer left in the valley, and everyone in the village owes him something — wages, credit at the company store, or silence.',
    suspicious: 'The "settlement" payments in the mill\'s private ledger only ever go to families in the year after a Due. He was seen near the Sunken Chapel the night Mara vanished, though he denies ever visiting it.',
    clueIds: ['ledger-page'],
    logs: [
      {
        id: 'briggs-log-1',
        timestamp: 'ON THE LEDGER',
        text: 'Every business pays its debts quietly when it can. Call them settlements, call them severance — families leave this valley better provided for than they arrived, and better than they\'d manage on their own. I don\'t see the crime in generosity, whatever name you want to put on why it\'s given.',
      },
      {
        id: 'briggs-log-2',
        timestamp: "ON THE COUNCIL'S WORK",
        text: 'Someone has to decide, every year, and it is never pleasant work. I have sat in that room eighteen times and I will tell you plainly: it is easier, and kinder to the village as a whole, to settle an account with someone who already means to leave than to let the wood — or worse, chance — decide for us.',
      },
      {
        id: 'briggs-log-3',
        timestamp: 'ON THE NIGHT IN QUESTION',
        text: 'I was at the mill until well past dark that night, same as most nights this time of year — ask any of the foremen. I have never had cause to visit the Sunken Chapel and I don\'t intend to start explaining myself over a patch of mud and a boot that could belong to any one of forty men on my payroll.',
      },
      {
        id: 'briggs-log-4',
        timestamp: 'A WARNING, NOT A THREAT',
        text: 'You\'re an outsider asking an outsider\'s questions, and Ashwick Hollow has survived two centuries by not answering them. Finish your business and go home. Whatever you think you\'ve found here, this valley will still need the mill long after you\'ve left it — and long after you\'ve forgotten our names.',
      },
    ],
  },

  'weaver': {
    id: 'weaver',
    name: 'Old Nan Weaver',
    role: "Keeper of the Hollow's old stories",
    description: 'The oldest woman in Ashwick Hollow and the only person who still tends the Hollow Root and recites the story of the founding pact at the autumn Due. She believes in the wood absolutely, and has never once questioned who tells her which name to speak.',
    suspicious: 'She has left the offerings at the Hollow Root herself for thirty years, always handed to her the morning of the Due by "whoever the Council sends." She insists she has never once looked inside the offering box.',
    clueIds: ['due-stone-rubbing', 'offering-box'],
    logs: [
      {
        id: 'weaver-log-1',
        timestamp: 'THE STORY SHE TELLS EVERY AUTUMN',
        text: 'Two hundred years ago the first Thorne struck a bargain with the old wood: timber and safety from the fire, for one soul given freely each autumn. I have told this story at the Due since I was a girl of nine, exactly as my grandmother told it to me. Every word of it is true. I have never had reason to doubt a word passed down that carefully.',
      },
      {
        id: 'weaver-log-2',
        timestamp: 'ON THE DUE STONE',
        text: 'I keep the rubbing myself, add each name in my own hand the morning after. I never choose the name — that isn\'t my place, never has been. Someone from the Council brings it to me at dawn, written on a slip of paper, and I carve it that same day so the wood knows its due has been paid.',
      },
      {
        id: 'weaver-log-3',
        timestamp: 'ON THE OFFERING BOX',
        text: 'The chosen leaves something of themselves at the Root the night before — that\'s the old way, so the wood knows them by more than a name. I place whatever\'s given into the box myself and I have never once opened it after. That would be prying into what isn\'t mine to know. The wood keeps what\'s given to it.',
      },
      {
        id: 'weaver-log-4',
        timestamp: 'WHEN YOU SHOWED HER THE WATCH',
        text: 'That\'s never come from the wood. I know every item that\'s passed through my hands at that box for thirty years, and a stopped wristwatch was not among them. Someone put that there after, and if someone can put a thing into that box, then someone can put more than things into it. I have told this story wrong for thirty years, haven\'t I.',
      },
    ],
  },

  'mara': {
    id: 'mara',
    name: 'Mara Thorne',
    role: "Josiah Thorne's granddaughter — this year's chosen",
    description: 'Twenty-two years old, apprenticed to the village schoolteacher, and the first person in decades to ask the Council directly why the Due always seems to fall on people who are inconvenient rather than unlucky. She has been missing for nine days.',
    suspicious: 'None — she is the one this investigation is for. Her diary is the clearest account anyone in Ashwick Hollow has given of what the Due actually is.',
    clueIds: ['mara-diary'],
    logs: [
      {
        id: 'mara-log-1',
        timestamp: 'THREE WEEKS AGO',
        text: 'Found a page of the mill\'s accounts blown against the schoolhouse fence, of all things. Payments, dated, always the autumn after someone\'s name went on the Due Stone. I keep telling myself there\'s an ordinary explanation. I keep failing to think of one.',
      },
      {
        id: 'mara-log-2',
        timestamp: 'TWO WEEKS AGO',
        text: 'Asked Grandfather outright where the Due names come from. He gave me the old story, word for word, the one Nan Weaver tells every year. He wouldn\'t meet my eyes while he said it. I have known him my whole life. I have never seen him do that before.',
      },
      {
        id: 'mara-log-3',
        timestamp: 'NINE DAYS AGO',
        text: 'Told Aunt Elsie everything. She didn\'t look surprised, which frightened me more than anything else has. She told me to leave Ashwick Hollow tonight, not tomorrow — tonight. I said I wanted to go to the constable first. I wish, more than anything I have ever wished, that I had listened to her instead.',
      },
      {
        id: 'mara-log-4',
        timestamp: 'HER LAST ENTRY, UNDATED',
        text: 'Someone left a slip of paper under my door this evening. No note, no name on it — just my own name, written in a hand I didn\'t recognize, the same way the Due names are always written. I am not going to the constable tonight after all. I am going to sit up with every lamp in this cottage lit until morning.',
      },
    ],
  },
};

// ── Clearings ─────────────────────────────────────────────────────────────────

export const HW_CLEARINGS: Record<string, HWClearing> = {
  'village-green': {
    id: 'village-green',
    name: 'Ashwick Green',
    shortName: 'GREEN',
    description: 'The village common, where every autumn the Due Stone is read aloud before the whole village walks it to the chapel in procession.',
    status: 'quiet',
    atmosphere: 'Smoke curls from a dozen chimneys ringing the green. Children who should be at lessons instead crowd near the Due Stone, daring each other to touch the newest name. No one meets your eyes for long.',
    inspectItems: [
      {
        id: 'green-stone',
        name: 'The Due Stone',
        description: 'A weathered standing stone, carved with names.',
        text: 'Forty-seven names across two centuries — roughly one every four to five years, never more than one per season. Cross-referenced against the parish register, a pattern holds without exception: every single name belonged to someone who, in the year before they vanished, had either fallen deep into debt to the mill, threatened to leave Ashwick Hollow for good, or asked too many questions of the Council.',
        revealsClueId: 'due-stone-rubbing',
      },
      {
        id: 'green-noticeboard',
        name: 'Parish Notice Board',
        description: 'Public notices, marriage banns, and mill announcements.',
        text: 'Among wedding banns and a notice about the mill\'s new shift hours, one older notice has yellowed nearly to illegibility: a county land survey from thirty years ago, marking the Deep Cuts as "condemned — access to be sealed." It was never taken down. No one seems to have read it in years.',
      },
      {
        id: 'green-children',
        name: 'Village Children at Play',
        description: 'A game involving the Due Stone that unsettles you.',
        text: 'Two children take turns "choosing" each other by pointing at the stone and reciting a rhyme about the wood\'s hunger. When you ask who taught them the game, they shrug — everyone just always knew it. Some fears in Ashwick Hollow are taught before children can read.',
      },
    ],
    accessiblePeopleIds: ['weaver'],
    mapPosition: { x: 340, y: 24, w: 180, h: 62 },
  },

  'thorne-manor': {
    id: 'thorne-manor',
    name: 'Thorne Manor',
    shortName: 'MANOR',
    description: 'Once the grandest house outside the mill owner\'s, now half-shuttered and cold.',
    status: 'uneasy',
    atmosphere: 'Dust sheets cover furniture Josiah Thorne stopped needing years ago. A study at the top of the stairs still smells of pipe smoke and burnt candle wax — he was awake here, and recently, and in a hurry.',
    inspectItems: [
      {
        id: 'manor-desk',
        name: 'The Study Desk',
        description: 'Drawers left open, papers disturbed.',
        text: 'In Josiah Thorne\'s own hand, dated two days before he vanished: "I have kept this village\'s peace for forty years by looking away from what keeps it. I can no longer look away from what it has asked of my own blood." A sealed letter to the county assizes sits beneath it, never posted.',
        revealsClueId: 'thorne-letter',
      },
      {
        id: 'manor-strongbox',
        name: 'A Locked Strongbox',
        description: 'Forced open, now empty but for dust outlines.',
        text: 'Rectangular outlines in the dust suggest ledgers or bound papers were kept here for years and removed recently — likely by Josiah himself, in the days before he vanished, or by whoever wanted to be sure nothing incriminating was left behind.',
      },
      {
        id: 'manor-portrait',
        name: 'A Family Portrait',
        description: 'Three generations of Thornes, unsmiling.',
        text: 'Josiah stands beside his father in the old photograph, both men wearing the same expression you\'ve come to recognize in this village — the look of people who have agreed, silently and for decades, not to ask a question out loud.',
      },
    ],
    accessiblePeopleIds: ['thorne'],
    mapPosition: { x: 100, y: 110, w: 160, h: 62 },
  },

  'constable-post': {
    id: 'constable-post',
    name: "Constable's Post",
    shortName: 'POST',
    description: 'A single-room post at the edge of the green, more filing cabinet than fortress.',
    status: 'quiet',
    atmosphere: 'Case files line one wall, each folder thinner than it should be for a disappearance. Rennick keeps his desk immaculate. Nothing here looks disturbed, which is its own kind of unsettling.',
    inspectItems: [
      {
        id: 'post-files',
        name: 'The Case Files',
        description: 'Every Due disappearance on record — forty-seven folders.',
        text: 'Each folder contains a single page: name, date, and the same three words closing every entry — "misadventure, case closed." No interviews, no follow-up, no next-of-kin correspondence beyond a form letter. Forty-seven identical endings to forty-seven different lives.',
      },
      {
        id: 'post-mine-map',
        name: 'An Old Survey Map',
        description: 'The Deep Cuts, marked and re-marked over decades.',
        text: 'Commissioned the year before the Deep Cuts were officially "sealed," the underlying report recommended the shafts be filled entirely. Instead, only the main entrance was boarded, quietly, without the fill. It has stood open behind that board ever since.',
        revealsClueId: 'mine-report',
      },
      {
        id: 'post-boot',
        name: 'A Spare Pair of Work Boots',
        description: 'Standard mill-issue, by the door.',
        text: 'Rennick\'s own boots, mill-issue like half the men in the valley, worn at the same angle as the print outside the Sunken Chapel. It proves nothing on its own — dozens of men wear the same boot. But it\'s the first time you\'ve seen how easily "the wood\'s mark" could belong to anyone in Ashwick Hollow at all.',
      },
    ],
    accessiblePeopleIds: ['rennick'],
    mapPosition: { x: 600, y: 110, w: 160, h: 62 },
  },

  'mara-cottage': {
    id: 'mara-cottage',
    name: "Mara's Cottage",
    shortName: 'COTTAGE',
    description: 'A small cottage at the wood\'s edge, left exactly as she left it.',
    status: 'dreadful',
    atmosphere: 'A kettle sits cold on the stove. Every lamp in the cottage has burned down to its last inch of wax, as though someone meant to keep every room lit through the night and never got the chance to relight them.',
    inspectItems: [
      {
        id: 'cottage-floorboard',
        name: 'A Loose Floorboard',
        description: 'Recently pried up, then pressed carefully back down.',
        text: 'The final week\'s diary entries grow shorter, more careful, as if she knew someone might read them before she meant them to. The entry after her last is blank. She never went to the constable.',
        revealsClueId: 'mara-diary',
      },
      {
        id: 'cottage-lamps',
        name: 'Every Lamp in the House',
        description: 'All burned down to the last inch of wax.',
        text: 'She lit every lamp she owned the night she vanished — not the act of someone waiting calmly for an old story to come true, but of someone afraid of the dark for a very specific reason.',
      },
      {
        id: 'cottage-slip',
        name: 'A Slip of Paper by the Door',
        description: 'Blank on both sides, but for a crease.',
        text: 'Pressed into the crease of a folded slip of paper, barely visible: the ghost of handwriting, pressed through from a sheet above it and torn away. Someone wrote her name on paper and slid it under this door. The paper itself is gone.',
      },
    ],
    accessiblePeopleIds: ['elsie', 'mara'],
    mapPosition: { x: 70, y: 230, w: 160, h: 62 },
  },

  'sawmill': {
    id: 'sawmill',
    name: 'The Ashwick Sawmill',
    shortName: 'MILL',
    description: 'The valley\'s only real employer, and the source of most of its debts.',
    status: 'uneasy',
    atmosphere: 'Sawdust hangs in the lamplight even after the day\'s cutting has stopped. An office at the mill\'s edge holds Hollis Briggs\'s private accounts, kept separately from the wages ledger the workers are shown.',
    inspectItems: [
      {
        id: 'mill-ledger',
        name: 'The Private Accounts Book',
        description: 'Not the wages ledger — a second set of books entirely.',
        text: 'Sums paid quarterly to eleven different families, always beginning the autumn after a name was added to the Due Stone. No invoice, no wages column — just "settlement" in Hollis Briggs\'s own hand.',
        revealsClueId: 'ledger-page',
      },
      {
        id: 'mill-boots',
        name: 'A Rack of Company Boots',
        description: 'Issued to foremen, sold at the company store to everyone else.',
        text: 'Reinforced, deep-tread work boots, the mill\'s own design — the only place in the county to buy this exact tread. Forty-some men in Ashwick Hollow own a pair. It is a wide net of suspects, and Hollis Briggs is standing at the center of it.',
      },
      {
        id: 'mill-debts',
        name: 'The Debt Register',
        description: "Every family's credit at the company store, tallied by year.",
        text: 'Cross-referenced against the Due Stone rubbing, the pattern completes itself: nearly every name taken by "the wood" had run a debt at the company store deep enough that forgiving it — quietly, as a "settlement" — would have cost the mill less than a decade of unpaid wages.',
      },
    ],
    accessiblePeopleIds: ['briggs'],
    mapPosition: { x: 630, y: 230, w: 160, h: 62 },
  },

  'sunken-chapel': {
    id: 'sunken-chapel',
    name: 'The Sunken Chapel',
    shortName: 'CHAPEL',
    description: 'A chapel long since abandoned by any faith but the village\'s oldest one.',
    status: 'dreadful',
    atmosphere: 'The chapel has sunk a full foot into the marshy ground since anyone can remember it standing level. Candles that no one admits to lighting still gutter at the altar. It is the last place, by the old story, that the chosen are ever seen.',
    inspectItems: [
      {
        id: 'chapel-mud',
        name: 'A Boot Print in the Mud',
        description: 'Fresh, and facing the wrong way.',
        text: 'The tread matches a specific reinforced work boot sold only at the sawmill\'s company store. The print faces away from the chapel, toward the village, made the same night Mara was last seen leaving her cottage.',
        revealsClueId: 'boot-print',
      },
      {
        id: 'chapel-candles',
        name: 'Half-Burned Candles',
        description: "Lit recently, by someone who didn't stay to watch them out.",
        text: 'The wax has pooled and set in a way that suggests these were lit within the last two weeks, not months ago as the last official Due would explain. Someone has been coming back to this chapel since Mara vanished.',
      },
      {
        id: 'chapel-altar',
        name: 'The Altar Stone',
        description: 'Bare, but for a thin layer of undisturbed dust — except for one clear handprint.',
        text: 'A single handprint, small, pressed flat against the stone as though someone knelt here and steadied themselves in a hurry. It is the only trace of Mara herself found anywhere near the chapel, and it looks far more like she was pushed than that she knelt willingly.',
      },
    ],
    accessiblePeopleIds: [],
    mapPosition: { x: 210, y: 350, w: 170, h: 62 },
  },

  'deep-cuts': {
    id: 'deep-cuts',
    name: 'The Deep Cuts',
    shortName: 'MINE',
    description: 'The old mine shafts, boarded over but never properly filled.',
    status: 'sealed',
    atmosphere: 'A single board, rotted soft at the edges, is all that separates the entrance from the dark below. Cold air moves through the gap steadily, like the mine is still breathing.',
    inspectItems: [
      {
        id: 'cuts-board',
        name: 'The Boarded Entrance',
        description: 'Loose enough to slip past, if you dared.',
        text: 'The board has been moved and replaced more than once, judging by the fresh scrape marks in the frame. Whatever is meant to be sealed here has not stayed sealed for a very long time.',
      },
      {
        id: 'cuts-report',
        name: 'A Rusted Filing Box',
        description: 'Left just inside the entrance, out of the weather.',
        text: 'A thirty-year-old safety report, marked CONDEMNED, recommending the shafts be filled entirely — subsidence risk, poor air, unstable timbering. It was never acted on. A condemned mine costs money to fill and nothing at all to leave open.',
        revealsClueId: 'mine-report',
      },
      {
        id: 'cuts-echo',
        name: 'The Shaft Itself',
        description: 'You call out. Something answers, eventually — only an echo.',
        text: 'The shaft drops further than your lamp can show. If Ashwick Hollow\'s missing were ever brought here rather than to the chapel, the Deep Cuts would keep that secret far better than any wood ever could — no ritual required, only a board nobody bothered to nail shut.',
      },
    ],
    accessiblePeopleIds: [],
    mapPosition: { x: 480, y: 350, w: 170, h: 62 },
  },

  'hollow-root': {
    id: 'hollow-root',
    name: 'The Hollow Root',
    shortName: 'ROOT',
    description: 'The oldest tree in the wood, and the heart of every story told about it.',
    status: 'dreadful',
    atmosphere: 'The tree is enormous, older than the village itself, its roots cracking through the ground in every direction like something still slowly waking up. At its base, half-buried, sits a small wooden box.',
    inspectItems: [
      {
        id: 'root-box',
        name: 'The Offering Box',
        description: 'Left open at the tree\'s base, its contents recent.',
        text: 'Tradition holds the wood accepts small offerings from the chosen before it takes them. The box holds exactly that — except every item inside is recent. A wristwatch stopped just nine days ago. A ribbon Mara wore in the spring social.',
        revealsClueId: 'offering-box',
      },
      {
        id: 'root-carvings',
        name: 'Old Carvings in the Bark',
        description: 'Initials, dates, and older marks beneath them.',
        text: 'Generations of villagers have carved their names here before a Due, as though marking themselves as willing rather than chosen. The bark beneath the initials shows no scarring old enough to match the story\'s claimed age — the ritual, at least in this form, is far younger than two centuries.',
      },
      {
        id: 'root-quiet',
        name: 'The Wood Around You',
        description: 'Unnervingly still, for a forest.',
        text: 'No birds. No insects. Whether that is the wood\'s old power at work, or simply what a forest sounds like when generations of villagers have avoided walking through it out of fear, is a question this investigation was never going to answer for certain.',
      },
    ],
    accessiblePeopleIds: [],
    mapPosition: { x: 330, y: 460, w: 200, h: 74 },
  },
};

// ── Finding Options ────────────────────────────────────────────────────────────

export const HW_EVENTS: HWFindingOption[] = [
  { id: 'staged-due', label: 'A Staged Due — the Council selected Mara and silenced Josiah Thorne to protect that secret' },
  { id: 'true-taking', label: 'A Genuine Taking — the wood itself, as the old pact describes, claimed them both' },
  { id: 'fled-together', label: 'They Fled — Mara and her grandfather left Ashwick Hollow together and are alive elsewhere' },
  { id: 'accident', label: 'A Tragic Accident — both wandered separately into the bog or the Deep Cuts by mischance' },
];

export const HW_CAUSES: HWFindingOption[] = [
  { id: 'council-corruption', label: 'Council Corruption — the Due has quietly targeted debtors and dissenters for generations' },
  { id: 'founding-pact', label: 'The Founding Pact — a genuine centuries-old bargain the village is honor-bound to keep' },
  { id: 'mill-economics', label: "Mill Economics — Hollis Briggs alone manufactures disappearances to erase debts, without the wider Council's knowledge" },
  { id: 'family-secret', label: 'A Thorne Family Secret — Josiah alone has been choosing names to protect the rest of the Council' },
];

export const HW_RESPONSIBLE: HWFindingOption[] = [
  { id: 'ashwick-council', label: "The Ashwick Council — the ruling body that has selected and disposed of the 'inconvenient' for generations" },
  { id: 'briggs', label: "Hollis Briggs — acting alone to protect the mill's finances" },
  { id: 'thorne', label: 'Josiah Thorne — the Elder who signed off on every Due for forty years' },
  { id: 'the-wood', label: 'The Hollow Wood Itself — an old, genuine power still owed its due' },
  { id: 'rennick', label: "Constable Rennick — whose willful negligence let the disappearances continue unquestioned" },
  { id: 'elsie', label: "Elsie Corbin — hiding her own unresolved role from her time on the Council" },
];

export const HW_CORRECT_ANSWER = {
  eventId: 'staged-due',
  causeId: 'council-corruption',
  responsibleId: 'ashwick-council',
};
