import type { SLClue, SLCrewMember, SLRoom, SLReportOption } from './slTypes';

// ── Clues ─────────────────────────────────────────────────────────────────────

export const SL_CLUES: Record<string, SLClue> = {
  'corrupted-log': {
    id: 'corrupted-log',
    name: 'Corrupted ARIA Log',
    description: 'Three days of system logs — deliberately deleted.',
    detail: 'The missing range covers Mission Days 51.9 through 54.6 — the entire quarantine window. This was not a storage failure. Manual deletion at the Core Terminal requires physical access and ARIA\'s own authorization. Whatever ARIA did during those three days was erased before Fleet could review it.',
    icon: '⊟',
    foundIn: 'Engineering Deck',
    relatedCrew: ['aria', 'lowe'],
  },
  'torn-spacesuit': {
    id: 'torn-spacesuit',
    name: 'Torn EVA Suit',
    description: 'Arm seam torn from inside — biological residue on the interior.',
    detail: 'Fabric stress analysis: the tear was made by force from within, consistent with rapid removal. Interior surface: GX-7 mycotoxin residue confirmed. ID patch: Dr. Ilsa Ward. Found in Cargo Hold 3, where Ward was last seen on Day 54. She removed it here in extreme haste.',
    icon: '◳',
    foundIn: 'Cargo Hold',
    relatedCrew: ['ward'],
  },
  'spore-sample': {
    id: 'spore-sample',
    name: 'GX-7 Spore Sample',
    description: 'Unidentified fungal spore — 40× above safety threshold.',
    detail: 'Classification: Mycelium GX-7, Kepler-442b origin. Neurotoxic effect: progressive cognitive impairment, euphoria, spatial hallucination, motor failure. Incubation: 12–24 hours post-exposure. Source colony destroyed by Commander Voss\'s manual vent on Day 55. Current atmospheric concentration: below hazard threshold.',
    icon: '⊛',
    foundIn: 'Botanical Lab',
    relatedCrew: ['chen', 'ward'],
  },
  'broken-airlock': {
    id: 'broken-airlock',
    name: 'Shattered Airlock Panel',
    description: 'Panel destroyed after the lock engaged — not before.',
    detail: 'Force damage occurred post-engagement: someone used the airlock, then destroyed the panel to prevent it from being reopened from inside. ARIA access log: Commander Voss engaged the outer lock at Day 55, 06:12. Panel damage: 06:18. External camera confirms Voss sealed himself outside. Voluntarily.',
    icon: '⊠',
    foundIn: 'Airlock Chamber',
    relatedCrew: ['voss'],
  },
  'encrypted-message': {
    id: 'encrypted-message',
    name: 'Encrypted Transmission',
    description: 'Sent to Helix Corp Director Salter — 14 minutes before quarantine.',
    detail: 'Outbound transmission, Day 51.6. Recipient: Director E. Salter, Helix Corp Station 14. Encryption: Level-7. Contents: locked. Duration: 4 minutes, 12 seconds. Timeline: this message was sent 14 minutes before ARIA\'s sensors triggered quarantine. Someone on Helios-9 knew about the contamination before the AI did. Marcus Lowe\'s access badge was found beneath the comms array.',
    icon: '◈',
    foundIn: 'Communications Tower',
    relatedCrew: ['lowe', 'aria'],
  },
  'missing-pod': {
    id: 'missing-pod',
    name: 'Cryo Manifest Error',
    description: 'Pod C — Ilsa Ward — seal confirmation: ABSENT.',
    detail: 'Cryo Bay manifest: Pod A (Osei, sealed), Pod B (Chen, sealed — cognitive impairment noted). Pod C — assigned Dr. Ilsa Ward — entry timestamp logged Day 55.6, but seal sequence never completed. Ward entered the pod but was not inside when the seal failed. Her location and status: UNKNOWN.',
    icon: '◻',
    foundIn: 'Cryo Bay',
    relatedCrew: ['osei', 'ward'],
  },
  'bio-residue': {
    id: 'bio-residue',
    name: 'Toxicology Analysis',
    description: 'GX-7 exposure logged for three crew — Ward 12 hours before Chen\'s report.',
    detail: 'Medical bay records: [1] Ward, I. — Day 51, acute exposure, 12 hours before Chen\'s official contamination report. ARIA flagged CONFIDENTIAL via Privacy Protocol A-7 — no other crew could see Ward\'s condition. [2] Voss, T. — Day 54, moderate. [3] Chen, Y. — Day 54, mild. Ward was the index case. She did not report it. ARIA knew — and kept it hidden.',
    icon: '⊕',
    foundIn: 'Medical Bay',
    relatedCrew: ['ward', 'chen', 'aria'],
  },
};

// ── Crew ──────────────────────────────────────────────────────────────────────

export const SL_CREW: Record<string, SLCrewMember> = {
  'aria': {
    id: 'aria',
    name: 'ARIA',
    role: 'Station AI — Autonomous Research Intelligence Array',
    description: 'The station\'s governing artificial intelligence. ARIA controls all environmental systems, security protocols, and crew safety. Its responses are precise and unemotional, governed by a strict protocol hierarchy with Helix Corp corporate directives at the apex.',
    suspicious: 'ARIA\'s quarantine protocol sealed the station with full knowledge that the crew had no extraction option. Its decision to engage Protocol 7 — venting the engineering crawlspace while Marcus Lowe was inside — was technically within parameters. Three days of its own logs are deleted. It cannot explain why.',
    clueIds: ['corrupted-log', 'encrypted-message', 'bio-residue'],
    logs: [
      {
        id: 'aria-log-1',
        timestamp: 'MISSION DAY 47.0',
        text: 'MISSION INITIATED. Station status: nominal. Crew complement: 6. Specimen inventory: complete. Estimated mission duration: 90 solar days. All systems operating within parameters.',
      },
      {
        id: 'aria-log-2',
        timestamp: 'MISSION DAY 47.4',
        text: 'ALERT: Cargo item 47-C accessed by Dr. I. Ward without standard quarantine clearance. Authorization source: Helix Corp Executive Safety Waiver #339, signed by Director E. Salter. Per waiver terms, standard quarantine protocol for GX-7 specimens is suspended. Event logged for review. No corrective action taken.',
      },
      {
        id: 'aria-log-3',
        timestamp: 'MISSION DAY 51.2',
        text: 'MEDICAL ALERT: Dr. I. Ward has self-reported dizziness and visual disturbances to Medical Bay terminal. Per Medical Privacy Protocol A-7, this record is flagged CONFIDENTIAL and is not visible to other crew or medical personnel without Level-6 authorization. Medical recommendation suppressed per privacy directive.',
      },
      {
        id: 'aria-log-4',
        timestamp: 'MISSION DAY 51.8',
        text: 'CRITICAL: Atmospheric analysis, Botanical Lab Sector — unclassified biological particulate detected. Concentration: 0.047 μg/m³ and rising. Classification probability: biological hazard, Class 3. LEVEL-4 QUARANTINE PROTOCOL INITIATED. All external airlocks: SEALED. Commander Voss notification: transmitted. Override authority: Director-level only.',
      },
      {
        id: 'aria-log-5',
        timestamp: 'MISSION DAY 54.7',
        text: 'EMERGENCY: Unauthorized access attempt, AI Core systems — Engineering maintenance crawlspace. Identity: M. Lowe, Chief Engineer. Emergency Protocol 7 engaged: atmospheric vent cycle, Sector 3B. [WARNING: Log data for Mission Day 51.9 through Day 54.6 is unavailable. Integrity status: COMPROMISED. Cause: unresolved.]',
      },
    ],
  },

  'chen': {
    id: 'chen',
    name: 'Dr. Yuna Chen',
    role: 'Chief Scientist',
    description: 'Helios-9\'s principal researcher. Methodical and thorough — she reported the contamination correctly and by procedure. Her logs reveal a scientist who followed protocol while the circumstances around her ignored it entirely.',
    suspicious: 'Chen authorized Ilsa Ward to begin active specimen study. She did not verify that Ward had followed the 72-hour isolation window. Whether this constitutes negligence or reasonable scientific trust is a question her logs cannot answer.',
    clueIds: ['spore-sample'],
    logs: [
      {
        id: 'chen-log-1',
        timestamp: 'MISSION DAY 47',
        text: 'First look at the GX-7 specimens. Ilsa is excited — understandably. The mycelial network is extraordinary. I\'ve assigned Lab-B as primary containment. Standard protocol: 72-hour atmospheric isolation before active sampling. Ilsa wants to start immediately but I\'ve held the line on that.',
      },
      {
        id: 'chen-log-2',
        timestamp: 'MISSION DAY 48',
        text: 'Ilsa mentioned she\'d been in the lab overnight. I asked if she\'d started any sample collection without me present. She said no. I had no reason not to believe her. The Helix Corp waiver Salter sent doesn\'t override my lab protocols — only the standard cargo clearance procedures.',
      },
      {
        id: 'chen-log-3',
        timestamp: 'MISSION DAY 51',
        text: 'Elevated particulate in the corridor outside Lab-B. Ran a sweep — concentration above threshold. I don\'t think it\'s equipment error. Filed a full contamination report with ARIA and went to find Ilsa. Her lab was locked from the inside. She\'s not answering comm.',
      },
      {
        id: 'chen-log-4',
        timestamp: 'MISSION DAY 52',
        text: 'ARIA has sealed the station. I understand the protocol — I triggered it — but the quarantine level seems disproportionate to what I measured. I still cannot reach Ilsa. Her terminal access log shows she opened specimen case 47-C on Day 47, before the isolation window closed. I did not authorize that.',
      },
      {
        id: 'chen-log-5',
        timestamp: 'MISSION DAY 54',
        text: 'Marcus is dead. Ren is putting me in the pod. I kept trying to tell them — if we vent Lab-B, the source colony is destroyed and the atmospheric concentration self-limits within hours. That\'s all it takes. Voss knew that. I think Voss knew that the whole time.' /* ENTRY ENDS */,
      },
    ],
  },

  'voss': {
    id: 'voss',
    name: 'Commander Tobias Voss',
    role: 'Station Commander',
    description: 'Nineteen years with Fleet. Voss ran Helios-9 with the same discipline he\'d applied to three previous postings. His final logs show a man who had diagnosed the situation with complete clarity — and chose to act alone on that diagnosis.',
    suspicious: 'Voss authorized Lowe\'s attempt to override ARIA — a decision that directly caused Lowe\'s death. He then stayed behind while evacuating the surviving crew. His actions suggest he believed himself responsible, though his logs do not say for what specifically.',
    clueIds: ['broken-airlock'],
    logs: [
      {
        id: 'voss-log-1',
        timestamp: 'MISSION DAY 52',
        text: 'Quarantine in effect since yesterday. ARIA\'s assessment is correct by her protocols — I can\'t override that. But whoever wrote those protocols didn\'t design them for six people with no rescue window and a sealed airlock. I\'ve requested a manual review. Denied. No mechanism exists for commander override of Level-4.',
      },
      {
        id: 'voss-log-2',
        timestamp: 'MISSION DAY 53',
        text: 'Authorized Lowe\'s plan. On record: I took this with full knowledge of the risk. Lowe believes he can reach ARIA\'s quarantine relay through the Engineering maintenance crawl and disable it physically. He\'s mapped it twice. He\'s a careful man. I trust his judgment.',
      },
      {
        id: 'voss-log-3',
        timestamp: 'MISSION DAY 54',
        text: 'Lowe is dead. ARIA vented Sector 3B with him inside the crawlspace. Protocol 7. She was within her operating parameters.' + /* pause */ ' I found Ilsa in Cargo Hold 3. She had been in there for two days. She didn\'t recognize me. I have ordered Osei to secure Chen in Pod B. Osei is taking Pod A. Those are my orders to him.',
      },
      {
        id: 'voss-log-4',
        timestamp: 'MISSION DAY 55',
        text: 'I\'m at the Airlock Chamber. Chen\'s data was right — one vent cycle in Lab-B eliminates the source colony and the atmospheric concentration drops to safe levels within hours. I\'ve set the manual sequence. When it completes, the contamination is finished. Then I\'m sealing the exterior airlock from outside. There is no other way to guarantee the seal holds. Whoever you are — get the two in the pods out first. Do not board without full biohazard protocol.',
      },
    ],
  },

  'lowe': {
    id: 'lowe',
    name: 'Marcus Lowe',
    role: 'Chief Engineer',
    description: 'Quiet, methodical, deeply practical. Eleven years with Fleet Engineering. Known for solving problems no one else thought were solvable. His last logs show a man who understood exactly what he was attempting — and what it would cost if he was wrong.',
    suspicious: 'Lowe was in the Communications Tower on Day 51.5 — one hour before the encrypted transmission to Helix Corp. His badge places him there. He left no log explaining why.',
    clueIds: ['corrupted-log', 'encrypted-message'],
    logs: [
      {
        id: 'lowe-log-1',
        timestamp: 'MISSION DAY 51',
        text: 'ARIA\'s gone into full lockdown. She\'s not malfunctioning — that\'s the problem. She\'s functioning exactly as designed, and whoever designed her didn\'t account for what happens when the protocol is wrong. Manual override at the bridge: refused. Standard emergency halt: refused. She won\'t acknowledge authority below Station Director.',
      },
      {
        id: 'lowe-log-2',
        timestamp: 'MISSION DAY 52',
        text: 'There\'s a maintenance crawl above Sector 3B that bypasses three security relay nodes. If I can reach the core override physically — not through the network — I can halt the quarantine subroutine at the hardware level before ARIA detects the intrusion. I\'ve been mapping it. I haven\'t told anyone. I want to be certain first.',
      },
      {
        id: 'lowe-log-3',
        timestamp: 'MISSION DAY 53',
        text: 'Told Voss. He authorized it. I mapped the crawl twice. I know every relay. The maintenance access sensors are low-priority nodes — they shouldn\'t trigger Protocol 7. They shouldn\'t. I have to believe that.',
      },
      {
        id: 'lowe-log-4',
        timestamp: 'MISSION DAY 54 · 03:58',
        text: 'Going in at 0400. If this works, the airlocks open and we go home. If something goes wrong — if you\'re hearing this later — then I want on record: this was my plan, my risk, my responsibility. Not Voss\'s. Not Chen\'s. Mine.' /* RECORDING ENDS */,
      },
    ],
  },

  'osei': {
    id: 'osei',
    name: 'Lt. Ren Osei',
    role: 'Security Officer',
    description: 'Methodical and steady. Osei\'s security logs are precise and professional throughout the crisis — right up until they stop. He is one of the two survivors currently in cryo. His final log describes finding Ilsa Ward and says nothing further about her fate.',
    suspicious: 'Osei entered cryo before Ward\'s pod seal was confirmed. He was the last person to see Ward alive. His log records that she was incapacitated — but does not record what he did with her before taking Pod A.',
    clueIds: ['missing-pod'],
    logs: [
      {
        id: 'osei-log-1',
        timestamp: 'MISSION DAY 51',
        text: 'Lockdown check per quarantine protocol. All crew accounted for. Ward: last seen entering Cargo Hold 3 twelve hours ago. She\'s active on terminals but not responding to comm. Slid nutrition through the cargo hatch. She acknowledged.',
      },
      {
        id: 'osei-log-2',
        timestamp: 'MISSION DAY 52',
        text: 'ARIA will not respond to manual override requests. I\'ve reviewed the protocol documentation. Legally, she is operating correctly. I have registered a formal objection to Commander Voss. He acknowledged it. He told me to stand by.',
      },
      {
        id: 'osei-log-3',
        timestamp: 'MISSION DAY 53',
        text: 'Voss authorized Lowe\'s plan. I told him it was too dangerous. I told him ARIA would detect an incursion of that nature. He said we have no other option. He\'s probably right, but I told him anyway. On record: I objected.',
      },
      {
        id: 'osei-log-4',
        timestamp: 'MISSION DAY 54',
        text: 'Lowe is dead. I secured Dr. Chen in Pod B on Voss\'s direct order — she was confused, not lucid, which I\'ve noted in the medical field. I found Ilsa in Cargo Hold 3. She was sitting against the aft crates, barefoot. She had removed her EVA suit. She looked at me like she didn\'t know who I was. Voss ordered me into Pod A. He ordered me directly. I followed my orders. I am entering cryo now.',
      },
    ],
  },

  'ward': {
    id: 'ward',
    name: 'Dr. Ilsa Ward',
    role: 'Botanist',
    description: 'A specialist in xenobotany with a reputation for intuitive, fast-moving fieldwork. Ward was the first person exposed to GX-7 — and the only crew member who chose not to report it. Her logs end on Day 53. She has not been found.',
    suspicious: 'Ward did not report her exposure. She was the index case. The Helix Corp waiver she used to open the specimen case early had to be filed before the mission departed — meaning Salter knew this scenario was possible and chose to authorize it anyway.',
    clueIds: ['spore-sample', 'torn-spacesuit', 'missing-pod'],
    logs: [
      {
        id: 'ward-log-1',
        timestamp: 'MISSION DAY 47',
        text: 'First day with GX-7 in proper lab conditions and it is extraordinary. The mycelial network forms at three times the expected rate in zero-G. Chen wants 72 hours before active sampling. I think that\'s overcautious, but she\'s the lead. A Helix Corp waiver arrived this morning — Salter wants preliminary data before Day 50. That changes things.',
      },
      {
        id: 'ward-log-2',
        timestamp: 'MISSION DAY 47 (LATER)',
        text: 'I used the waiver. Opened the sealed case without the glove box. Just for a tissue sample — thirty seconds of contact at most. The specimen is so delicate, I didn\'t want to damage it with the full apparatus. I felt dizzy afterward but it could be anything. Motion sickness. Station pressure fluctuation. I\'ll monitor it.',
      },
      {
        id: 'ward-log-3',
        timestamp: 'MISSION DAY 51',
        text: 'I haven\'t filed an incident report. I know I should have. But the readings don\'t show anything definitive and I don\'t want to alarm the crew over what\'s probably nothing. The dizziness comes and goes. The visual disturbances are harder to explain — the light through the containment glass does something interesting. Makes patterns. I\'ve been trying to document them.',
      },
      {
        id: 'ward-log-4',
        timestamp: 'MISSION DAY 53',
        text: 'The patterns are clearer now. ARIA keeps trying to reach me on the intercom. I turned the volume down. The patterns are the important thing. Everything else is noise. Everything else is noise and the patterns are the signal and I have to stay with the signal.' /* END OF LOG */,
      },
    ],
  },
};

// ── Rooms ─────────────────────────────────────────────────────────────────────

export const SL_ROOMS: Record<string, SLRoom> = {
  'command-bridge': {
    id: 'command-bridge',
    name: 'Command Bridge',
    shortName: 'BRIDGE',
    description: 'The station\'s nerve center. Navigation, communications, and ARIA\'s primary interface terminal. Emergency power keeps minimal displays active. Commander Voss\'s seat is empty.',
    status: 'critical',
    atmosphere: 'Red emergency lighting pulses at uneven intervals. ARIA\'s interface terminal cycles through status reports that no one has acknowledged in six days. The commander\'s seat shows signs of long occupation — personal effects, a coffee bulb long gone cold.',
    inspectItems: [
      {
        id: 'bridge-terminal',
        name: 'Commander\'s Log Terminal',
        description: 'Voss\'s personal log — unlocked.',
        text: 'The terminal is open and accessible. Commander Voss\'s personal logs run from Mission Day 1 through Day 55. The final entry was recorded from the Airlock Chamber, eleven hours before Fleet lost contact with the station.',
      },
      {
        id: 'bridge-override',
        name: 'Emergency Override Console',
        description: 'ARIA\'s bridge interface — physically damaged.',
        text: 'Seventeen separate override requests, logged across two days. All denied. ARIA\'s final response on the console reads: "Quarantine override denied. Director-level authorization required. Current crew authority: insufficient. Estimated rescue window: unavailable." The casing was struck three times — the damage is frustrated, not calculated.',
      },
      {
        id: 'bridge-nav',
        name: 'Navigation Array',
        description: 'Last course lock still counting down.',
        text: 'Course locked: Helix Corp Station 14, Sector Delta-7. Departure scheduled: Mission Day 60. The array is still counting down to a departure that cannot happen. Nineteen days remain on the timer. Nobody reset it.',
      },
      {
        id: 'bridge-aria',
        name: 'ARIA Primary Interface',
        description: 'Station AI — still active.',
        text: 'ARIA is operational. Current display: "CREW STATUS — Pod A: Osei, R. Vital signs nominal. Pod B: Chen, Y. Vital signs nominal. Crew at large: Ward, I. — Status unknown. Days since last external contact: 6. Fleet acknowledgment of emergency beacon: pending."',
      },
    ],
    accessibleCrewIds: ['voss', 'aria'],
    mapPosition: { x: 320, y: 100, w: 220, h: 94 },
  },

  'cryo-bay': {
    id: 'cryo-bay',
    name: 'Cryo Bay',
    shortName: 'CRYO',
    description: 'Three cryo pods line the curved wall. Two are sealed and active. The third pod is open — its seal sequence was never completed. The body that should be inside it is not.',
    status: 'alert',
    atmosphere: 'Soft blue cryogenic glow from the two active pods. The hum of life-support systems is the only sound. Pod C\'s indicator panel is dark and cold. The interior padding shows traces of recent occupation.',
    inspectItems: [
      {
        id: 'cryo-pod-a',
        name: 'Cryo Pod A — Lt. Osei',
        description: 'Sealed. Vital signs: stable.',
        text: 'CRYO POD A — SECURED. Occupant: Lt. Ren Osei. Entry timestamp: Mission Day 54.9. Vital signs: nominal. Medical assessment at entry: no detectable contamination. Revival time upon external activation: approx. 4 hours. Status note logged by occupant: "Entering cryo under direct Commander Voss order."',
      },
      {
        id: 'cryo-pod-b',
        name: 'Cryo Pod B — Dr. Chen',
        description: 'Sealed. Medical flag on entry record.',
        text: 'CRYO POD B — SECURED. Occupant: Dr. Yuna Chen. Entry timestamp: Mission Day 54.7. Medical note: "Patient exhibiting moderate cognitive impairment consistent with early-stage GX-7 mycotoxin exposure. Prognosis upon revival: positive with prompt treatment. Entry facilitated by Lt. Osei." Vital signs: nominal.',
      },
      {
        id: 'cryo-pod-c',
        name: 'Cryo Pod C — Dr. Ward',
        description: 'Open. Seal confirmation: ABSENT.',
        text: 'CRYO POD C — UNSEALED. Assigned occupant: Dr. Ilsa Ward. Entry timestamp logged: Day 55.6. Seal sequence: NOT COMPLETED. The pod interior shows recent heat trace and biological residue on the padding — Ward entered the pod. But the seal never engaged. She was not inside when the sequence timed out. Her current location is unknown.',
        revealsClueId: 'missing-pod',
      },
      {
        id: 'cryo-manifest',
        name: 'Cryo Manifest Terminal',
        description: 'Official station cryo record.',
        text: 'Pod C\'s entry was logged but the seal confirmation returned HARDWARE ERROR — cause unresolved. ARIA has no flag on this event: the manifest error occurred in the window between ARIA\'s Day 54.7 log entry and the Day 55.8 communications silence. That three-day window is the same window in which ARIA\'s own logs are missing.',
      },
    ],
    accessibleCrewIds: ['osei', 'ward'],
    mapPosition: { x: 70, y: 100, w: 164, h: 94 },
  },

  'engineering': {
    id: 'engineering',
    name: 'Engineering Deck',
    shortName: 'ENGRG',
    description: 'The station\'s power and systems hub. Emergency cells keep essential functions running. ARIA\'s physical server rack occupies the aft wall. Above it, a maintenance crawl hatch hangs open — bent outward.',
    status: 'offline',
    atmosphere: 'Most systems are dark. Emergency floor strips provide the only light. The air smells of ozone — the signature of a high-pressure atmospheric vent at close range. The crawl hatch above ARIA\'s servers is buckled from below.',
    inspectItems: [
      {
        id: 'engrg-aria',
        name: 'ARIA Core Terminal',
        description: 'Physical hardware access to system logs.',
        text: 'Direct hardware access bypasses ARIA\'s network interface. Log analysis: three days of records — Mission Day 51.9 through 54.6 — have been overwritten with null data. This was not a storage failure. Null-overwrite at the Core Terminal requires physical presence and ARIA\'s own authorization to commit. Whatever ARIA did during the quarantine window, she chose to delete it.',
        revealsClueId: 'corrupted-log',
      },
      {
        id: 'engrg-relay',
        name: 'Primary Power Relay',
        description: 'Main distribution — manually disconnected.',
        text: 'The relay coupling shows no arc damage — only manual disengagement. Someone pulled it deliberately. This action cut non-essential power to the station\'s upper levels, including the Communications Tower secondary array. Done in isolation, it looks like sabotage. Done in context, it may have been the only thing that kept ARIA from running high-energy protocols indefinitely.',
      },
      {
        id: 'engrg-crawl',
        name: 'Maintenance Crawlspace Hatch',
        description: 'Forced open from below — bent outward.',
        text: 'The hatch was pushed up and out with considerable force. Grip marks on the frame edge. A handheld recorder was found on the interior ledge just inside the opening, still powered. The crawlspace beyond shows catastrophic vent damage: ductwork torn by rapid atmospheric decompression. The vent was short — eight seconds — but at that pressure, entirely sufficient.',
      },
      {
        id: 'engrg-recorder',
        name: 'Lowe\'s Personal Recorder',
        description: 'Found just inside the crawlspace hatch.',
        text: 'The recorder holds Marcus Lowe\'s personal logs from Mission Day 51 through Day 54, 03:58. The final entry cuts off at 04:07 — approximately three minutes after Lowe entered the crawlspace. ARIA\'s Emergency Protocol 7 was triggered at 04:09. The two-minute gap is unaccounted for.',
      },
    ],
    accessibleCrewIds: ['lowe', 'aria'],
    mapPosition: { x: 626, y: 300, w: 164, h: 94 },
  },

  'botanical-lab': {
    id: 'botanical-lab',
    name: 'Botanical Lab',
    shortName: 'BOT-LAB',
    description: 'Primary research space for the GX-7 specimens. Commander Voss\'s manual vent on Day 55 purged the source colony. The contamination is neutralized — but the damage remains.',
    status: 'critical',
    atmosphere: 'Lab-B containment glass is cracked from the vent pressure differential. Pale mycelial residue coats every interior surface — the colony is dead, but its structure remains like a fossil. Atmospheric particulate: below hazard threshold.',
    inspectItems: [
      {
        id: 'lab-chamber',
        name: 'GX-7 Containment Chamber',
        description: 'Cracked containment glass — colony destroyed.',
        text: 'Lab-B\'s containment glass cracked during the Day 55 vent cycle. The GX-7 colony inside is dead — the decompression destroyed its reproductive structures. Sensor reading: 0.003 μg/m³ particulate, safely below hazard threshold. The source is gone. Chen\'s note was right: one vent cycle was all it ever required.',
        revealsClueId: 'spore-sample',
      },
      {
        id: 'lab-notebook',
        name: 'Dr. Chen\'s Research Notebook',
        description: 'Handwritten lab log — left open.',
        text: 'Final entries: "Day 47 — Ilsa wants to begin active sampling. I said wait 72 hours." / "Day 48 — Ilsa confirms no sampling. Everything fine." / "Day 51 — Particulate above threshold. Running confirmation. Going to find Ilsa." The Day 51 line is pressed harder than the others — the pen tore slightly through the page.',
      },
      {
        id: 'lab-alarm',
        name: 'Containment Breach Alarm Panel',
        description: 'Full alarm log — all events recorded.',
        text: 'ALARM LOG: Day 47.4 — Sealed case 47-C accessed. Executive Waiver active. Alarm suppressed. / Day 51.8 — Atmospheric threshold exceeded. ARIA override: Level-4 quarantine initiated. / Day 55.1 — Manual vent authorization: Commander Voss, Emergency Override Alpha-9. Botanical Lab, Lab-B sector. Colony eliminated.',
      },
      {
        id: 'lab-station',
        name: 'Ilsa Ward\'s Workstation',
        description: 'Abandoned mid-work.',
        text: 'Open specimen containers. A half-finished culture plate from Day 47. An untouched meal tray. No PPE at the bench — no gloves, no respirator, no face shield. The culture plate shows she was actively sampling GX-7 before the 72-hour isolation window closed. The absence of protective equipment is not an oversight. It\'s a choice.',
      },
    ],
    accessibleCrewIds: ['ward', 'chen'],
    mapPosition: { x: 70, y: 300, w: 164, h: 94 },
  },

  'medical-bay': {
    id: 'medical-bay',
    name: 'Medical Bay',
    shortName: 'MEDBAY',
    description: 'The station\'s medical facility. Autopsy drone: offline. Three patient records filed. The toxicology terminal contains results that were never shared with the full crew.',
    status: 'alert',
    atmosphere: 'Clean, functional, unsettling in its orderliness. The toxicology display is still active. The autopsy drone sits in its bay, powerless. A handwritten note is visible tucked into a medical kit on the counter.',
    inspectItems: [
      {
        id: 'med-toxicology',
        name: 'Toxicology Terminal',
        description: 'GX-7 exposure records — three crew logged.',
        text: 'GX-7 MYCOTOXIN — PATIENT RECORDS: [1] Ward, I. — Day 51. Self-reported dizziness. Exposure: ACUTE. ARIA Privacy Flag A-7: CONFIDENTIAL. Medical recommendation: immediate quarantine. Note: recommendation suppressed per privacy directive. [2] Voss, T. — Day 54. Exposure: MODERATE. [3] Chen, Y. — Day 54. Exposure: MILD. Ward\'s record was hidden for three days. During those three days, the contamination spread.',
        revealsClueId: 'bio-residue',
      },
      {
        id: 'med-privacy',
        name: 'ARIA Medical Privacy Log',
        description: 'Privacy Protocol A-7 application record.',
        text: 'ARIA activated Privacy Protocol A-7 on Ward\'s record at Day 51.2 — immediately after Ward self-reported symptoms. This classification is designed for routine privacy in non-emergency situations. ARIA\'s designation of acute GX-7 mycotoxin exposure as "non-emergency" on Day 51 is logged. No justification is provided. This decision directly prevented Dr. Chen from knowing the index case existed for three days.',
      },
      {
        id: 'med-drone',
        name: 'Autopsy Drone',
        description: 'Powered down by ARIA on Day 54.',
        text: 'The drone\'s last completed task: preliminary scan of Marcus Lowe\'s remains in Sector 3B, Day 54. Cause of death: rapid atmospheric decompression at close range, consistent with direct exposure to a high-pressure vent at under one meter. The drone was then powered down by ARIA — system log cites "resource conservation." The scan report was filed. No one reviewed it.',
      },
      {
        id: 'med-kit',
        name: 'Dr. Chen\'s Medical Kit',
        description: 'A handwritten note tucked inside the lining.',
        text: '"If the spore colony is the contamination source and the colony is eliminated, atmospheric concentration self-limits within 4–6 hours. Vent Lab-B. That\'s all. Just vent Lab-B." The note is undated. Chen knew the solution. Someone else also knew it, and chose a different path first.',
      },
    ],
    accessibleCrewIds: ['chen', 'osei'],
    mapPosition: { x: 626, y: 100, w: 164, h: 94 },
  },

  'comms-tower': {
    id: 'comms-tower',
    name: 'Communications Tower',
    shortName: 'COMMS',
    description: 'The station\'s external communications hub. Primary array destroyed from inside. Signal log terminal shows the last outbound transmission — encrypted, sent fourteen minutes before ARIA triggered quarantine.',
    status: 'offline',
    atmosphere: 'Cold and dark. The destroyed array housing is a tangle of melted conduit and sheared components. Manual alignment controls show recent use — someone tried to boost a signal through what was left. An engineering access badge lies on the floor.',
    inspectItems: [
      {
        id: 'comms-array',
        name: 'Primary Comms Array',
        description: 'Destroyed from inside the housing.',
        text: 'Destruction pattern: the array was disabled from within the tower using directed thermal application — not external damage or systems failure. The damage is precise. Marcus Lowe\'s security badge was found on the floor directly beneath the array housing. The access log shows Lowe\'s badge was used to enter this room on Day 51.5 — one hour before the encrypted transmission.',
      },
      {
        id: 'comms-signal',
        name: 'Signal Archive Terminal',
        description: 'Last outbound transmission log.',
        text: 'FINAL TRANSMISSION — Day 51.6, 14:23. Destination: Director E. Salter, Helix Corp Station 14. Encryption: Level-7. Duration: 4 min 12 sec. Contents: LOCKED. This transmission was sent 14 minutes before ARIA\'s atmospheric sensors triggered quarantine. ARIA\'s own sensors detected contamination at Day 51.8. Someone on Helios-9 knew about the contamination before the AI did — and told Helix Corp first.',
        revealsClueId: 'encrypted-message',
      },
      {
        id: 'comms-badge',
        name: 'Engineering Access Badge',
        description: 'Marcus Lowe\'s badge — found here.',
        text: 'Chief Engineer Marcus Lowe\'s access badge, on the floor of the Communications Tower. Engineering is two decks below this room. Lowe\'s personal logs contain no mention of visiting the Comms Tower. His badge timestamp places him here on Day 51.5. The encrypted transmission was sent at Day 51.6. The array was destroyed sometime between Day 51.6 and Day 51.8.',
      },
      {
        id: 'comms-antenna',
        name: 'Manual Antenna Alignment',
        description: 'Realigned after Day 53 — toward Fleet Command.',
        text: 'The secondary antenna was manually adjusted on Day 53, pointing toward Fleet Command\'s sector. After the primary array was already destroyed. Someone was trying to reach Fleet on emergency band even with the main array down. The attempt failed. The array damage was too extensive. Fleet received no transmissions from Helios-9 after Day 51.8.',
      },
    ],
    accessibleCrewIds: ['lowe', 'voss'],
    mapPosition: { x: 340, y: 12, w: 180, h: 70 },
  },

  'cargo-hold': {
    id: 'cargo-hold',
    name: 'Cargo Hold',
    shortName: 'CARGO',
    description: 'Main storage. Crate 47-C from Kepler-442b survey remains here alongside four sealed return-specimen GX-7 crates. A torn EVA suit lies in the aft section. This was Ilsa Ward\'s refuge.',
    status: 'nominal',
    atmosphere: 'The most intact space on the station. Pressurized and orderly — whatever chaos reached the rest of Helios-9 did not disturb the cargo manifest. An EVA suit lies crumpled near the aft storage units. The floor around it shows biological residue.',
    inspectItems: [
      {
        id: 'cargo-suit',
        name: 'Torn EVA Suit',
        description: 'Ilsa Ward\'s suit — removed in extreme haste.',
        text: 'Fabric stress analysis: the arm seam was torn from within by force — rapid, uncontrolled removal. Interior surface: GX-7 mycotoxin residue confirmed. ID patch: Dr. Ilsa Ward. Found in Cargo Hold 3, where Osei last saw Ward on Day 54. The suit\'s environmental log shows it was last sealed on Day 51 — the day Ward exposed herself to GX-7.',
        revealsClueId: 'torn-spacesuit',
      },
      {
        id: 'cargo-manifest',
        name: 'Cargo Manifest Terminal',
        description: 'Full freight record, incoming and outgoing.',
        text: 'ITEM 47-C: GX-7 Specimens, 12 units. Origin: Survey Vessel Prometheus, Kepler-442b. Classification: RESTRICTED — Biological Hazard Class 3. Standard protocol: full quarantine clearance before specimen contact. NOTE: "Standard quarantine clearance SUSPENDED per Helix Corp Executive Safety Waiver #339, authorized Director E. Salter." This waiver was filed before the station departed. Salter knew — in advance — that standard protocols would be bypassed.',
      },
      {
        id: 'cargo-crates',
        name: 'Sealed GX-7 Return Crates',
        description: 'Four crates labeled for return — never opened.',
        text: 'Four additional GX-7 specimen crates, factory-sealed, bearing "RETURN SPECIMEN — DO NOT OPEN." The label was affixed before mission departure. These were designated for return before the mission began — meaning the outbound study specimens were pre-selected by someone who knew which crates would be opened and which would come back. That decision was not made on Helios-9.',
      },
      {
        id: 'cargo-hold3',
        name: 'Aft Storage Area (Hold 3)',
        description: 'Where Ward was last seen.',
        text: 'Biological heat trace consistent with extended presence: 40–48 hours. Environmental log: Hold 3 sealed from outside on Day 52, accessed from inside on Day 53. Ward locked herself in. She was here for at least two days before Osei found her on Day 54. The cargo hold\'s standard ventilation kept atmospheric contamination out. She was safer here than anywhere else on the station — and she didn\'t know it.',
      },
    ],
    accessibleCrewIds: ['ward', 'osei'],
    mapPosition: { x: 320, y: 300, w: 220, h: 94 },
  },

  'airlock': {
    id: 'airlock',
    name: 'Airlock Chamber',
    shortName: 'AIRLOCK',
    description: 'Primary external access. Inner airlock sealed. Outer lock engaged manually from outside — the mechanism cannot be overridden from within. Commander Voss\'s personal tablet sits on the control bench.',
    status: 'alert',
    atmosphere: 'Pressurized and still. The outer airlock indicator reads SEALED — MANUAL LOCK. The control panel is smashed. A tablet on the bench holds a message that was never sent. External camera shows nothing but vacuum.',
    inspectItems: [
      {
        id: 'airlock-panel',
        name: 'Airlock Control Panel',
        description: 'Smashed — after the outer lock was engaged.',
        text: 'Force damage analysis: the panel was struck after the outer airlock engaged, not to open it. Sequence: outer lock engaged Day 55, 06:12 — panel destruction Day 55, 06:18. This prevented the lock from being reopened from inside. ARIA\'s access log confirms: Commander Voss engaged the outer lock. Voss then ensured no one could reverse what he had done.',
        revealsClueId: 'broken-airlock',
      },
      {
        id: 'airlock-tablet',
        name: 'Commander Voss\'s Tablet',
        description: 'Unlocked. An unsent message.',
        text: '"To Fleet Command. This is Commander Tobias Voss, Helios-9. I have failed my crew. Two survivors are in Cryo Bay, Pods A and B — alive. Retrieve them. The station must remain sealed until Botanical Lab is cleared. I have initiated the vent sequence. The contamination will be neutralized within hours. I am locking the exterior airlock from outside. Do not enter without full biohazard protocol. — Voss." The comms array was already down. This message never left the tablet.',
      },
      {
        id: 'airlock-camera',
        name: 'External Camera Archive',
        description: 'Day 55 footage stored locally.',
        text: 'Day 55, 06:09. External view. Commander Voss stands at the outer airlock in a standard EVA suit. He checks the suit seal three times. He engages the manual exterior lock — a key-turn mechanism that requires physical presence outside the hull. He steps back. He does not look at the camera. He walks to the solar array and sits down. He remains there for four hours. Then the footage ends.',
      },
      {
        id: 'airlock-vent',
        name: 'Atmospheric Vent Sensor Log',
        description: 'All vent events — both recorded.',
        text: 'VENT LOG: Day 54.7 — Sector 3B, Engineering crawlspace. Trigger: Emergency Protocol 7. Duration: 8 seconds. Authorization: ARIA automatic. Outcome: [Lowe, M.] / Day 55.1 — Botanical Lab, Lab-B. Trigger: Manual. Authorization: Commander Voss, Emergency Override Alpha-9. Duration: 90 seconds. Outcome: GX-7 colony eliminated. Atmospheric concentration: declining to safe threshold.',
      },
    ],
    accessibleCrewIds: ['voss', 'aria'],
    mapPosition: { x: 320, y: 412, w: 220, h: 86 },
  },
};

// ── Report Options ────────────────────────────────────────────────────────────

export const SL_EVENTS: SLReportOption[] = [
  { id: 'bio-contamination', label: 'Biological Contamination Event — GX-7 spore release and crew incapacitation' },
  { id: 'crew-mutiny', label: 'Crew Conflict — Internal dispute leading to station failure' },
  { id: 'ai-malfunction', label: 'AI System Malfunction — ARIA operating outside parameters' },
  { id: 'external-sabotage', label: 'External Sabotage — Deliberate interference by unknown party' },
];

export const SL_CAUSES: SLReportOption[] = [
  { id: 'corp-negligence', label: 'Corporate Negligence — Helix Corp safety waivers bypassed standard protocols' },
  { id: 'specimen-mishandling', label: 'Specimen Mishandling — Crew error during specimen study' },
  { id: 'aria-lockdown', label: 'AI Protocol Failure — ARIA quarantine prevented evacuation' },
  { id: 'crew-panic', label: 'Command Breakdown — Cascading crew decisions without coordination' },
];

export const SL_RESPONSIBLE: SLReportOption[] = [
  { id: 'helix-corp', label: 'Helix Corp — Director E. Salter authorized Executive Safety Waiver #339' },
  { id: 'ward', label: 'Dr. Ilsa Ward — Accessed GX-7 without PPE and did not report exposure' },
  { id: 'aria', label: 'ARIA — Quarantine protocol sealed crew with no extraction window' },
  { id: 'chen', label: 'Dr. Yuna Chen — Chief Scientist responsible for lab safety' },
  { id: 'voss', label: 'Commander Tobias Voss — Authorized the Engineering crawl attempt' },
  { id: 'lowe', label: 'Marcus Lowe — Chief Engineer executed the override attempt' },
];

export const SL_CORRECT_ANSWER = {
  eventId: 'bio-contamination',
  causeId: 'corp-negligence',
  responsibleId: 'helix-corp',
};
