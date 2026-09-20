interface CharacterPortraitProps {
  portraitType: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const W = 160;
const H = 210;

function PortraitFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="parchment-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply"/>
        </filter>
      </defs>
      {/* Outer stone bg */}
      <rect width={W} height={H} fill="#0f0d09"/>
      {/* Double border */}
      <rect x="3" y="3" width={W-6} height={H-6} fill="none" stroke="#5a4010" strokeWidth="2"/>
      <rect x="6" y="6" width={W-12} height={H-12} fill="none" stroke="#8a6c28" strokeWidth="1"/>
      {/* Inner background */}
      <rect x="7" y="7" width={W-14} height={H-14} fill="#1a1208"/>
      {/* Corner ornaments */}
      {[{x:4,y:4},{x:W-14,y:4},{x:4,y:H-16},{x:W-14,y:H-16}].map((p,i) => (
        <text key={i} x={p.x} y={p.y+10} fill="#8a6c28" fontSize="10">✦</text>
      ))}
      {children}
    </svg>
  );
}

function QueenPortrait() {
  return (
    <PortraitFrame>
      {/* Dress */}
      <path d="M20 210 L35 165 Q80 150 125 165 L140 210Z" fill="#3d0a5a"/>
      <path d="M55 170 Q80 158 105 170" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
      {/* Neck */}
      <rect x="71" y="138" width="18" height="30" rx="3" fill="#c9906a"/>
      {/* Head */}
      <ellipse cx="80" cy="112" rx="34" ry="40" fill="#c9906a"/>
      {/* Dark hair */}
      <path d="M46 100 Q50 62 80 60 Q110 62 114 100" fill="#1a0808"/>
      <path d="M46 100 Q38 128 48 152" fill="#1a0808"/>
      <path d="M114 100 Q122 128 112 152" fill="#1a0808"/>
      {/* Crown base */}
      <rect x="56" y="82" width="48" height="7" rx="2" fill="#c9a84c"/>
      {/* Crown points */}
      <polygon points="60,82 64,64 68,82" fill="#c9a84c"/>
      <polygon points="74,82 80,60 86,82" fill="#c9a84c"/>
      <polygon points="92,82 96,64 100,82" fill="#c9a84c"/>
      {/* Crown jewels */}
      <circle cx="80" cy="65" r="4" fill="#cc2244"/>
      <circle cx="64" cy="71" r="3" fill="#4488ff"/>
      <circle cx="96" cy="71" r="3" fill="#4488ff"/>
      {/* Eyes */}
      <ellipse cx="66" cy="110" rx="6" ry="5" fill="#1a0808"/>
      <ellipse cx="94" cy="110" rx="6" ry="5" fill="#1a0808"/>
      <circle cx="64" cy="108" r="2" fill="#ffffff55"/>
      <circle cx="92" cy="108" r="2" fill="#ffffff55"/>
      {/* Brows */}
      <path d="M58 101 Q66 97 74 101" fill="none" stroke="#1a0808" strokeWidth="1.5"/>
      <path d="M86 101 Q94 97 102 101" fill="none" stroke="#1a0808" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M78 120 Q80 126 82 120" fill="none" stroke="#a07050" strokeWidth="1"/>
      {/* Mouth */}
      <path d="M72 135 Q80 142 88 135" fill="none" stroke="#9a3a4a" strokeWidth="2"/>
      {/* Collar jewel */}
      <circle cx="80" cy="160" r="4" fill="#c9a84c"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">QUEEN ELARA</text>
    </PortraitFrame>
  );
}

function CommanderPortrait() {
  return (
    <PortraitFrame>
      {/* Armor/cloak */}
      <path d="M15 210 L30 158 L50 148 Q80 140 110 148 L130 158 L145 210Z" fill="#1e2840"/>
      {/* Pauldrons */}
      <ellipse cx="42" cy="155" rx="22" ry="12" fill="#3a4060" transform="rotate(-15,42,155)"/>
      <ellipse cx="118" cy="155" rx="22" ry="12" fill="#3a4060" transform="rotate(15,118,155)"/>
      {/* Chest armor */}
      <path d="M52 148 Q80 138 108 148 L108 175 Q80 180 52 175Z" fill="#2a3050"/>
      <path d="M80 145 L80 178" stroke="#8a8898" strokeWidth="1.5" opacity="0.5"/>
      {/* Neck */}
      <rect x="68" y="130" width="24" height="22" fill="#b07050"/>
      {/* Head */}
      <ellipse cx="80" cy="100" rx="36" ry="42" fill="#b07050"/>
      {/* Short hair */}
      <path d="M44 88 Q48 56 80 54 Q112 56 116 88 Q110 65 80 62 Q50 65 44 88Z" fill="#2a1a10"/>
      {/* Eyes - stern */}
      <ellipse cx="66" cy="95" rx="6" ry="4.5" fill="#1a0e08"/>
      <ellipse cx="94" cy="95" rx="6" ry="4.5" fill="#1a0e08"/>
      <circle cx="65" cy="93" r="1.5" fill="#ffffff44"/>
      <circle cx="93" cy="93" r="1.5" fill="#ffffff44"/>
      {/* Heavy brows */}
      <path d="M57 85 Q66 80 75 85" fill="none" stroke="#2a1a10" strokeWidth="3"/>
      <path d="M85 85 Q94 80 103 85" fill="none" stroke="#2a1a10" strokeWidth="3"/>
      {/* Nose */}
      <path d="M77 105 Q80 112 83 105" fill="none" stroke="#8a5535" strokeWidth="1.5"/>
      {/* Stern mouth */}
      <path d="M69 122 L91 122" fill="none" stroke="#7a4030" strokeWidth="2"/>
      {/* Scar on jaw */}
      <path d="M93 115 L100 128" stroke="#7a3828" strokeWidth="1.5" opacity="0.7"/>
      {/* Armor details */}
      <path d="M52 148 L108 148" stroke="#4a5070" strokeWidth="1"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#8a98b8" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">LORD CEDRIC</text>
    </PortraitFrame>
  );
}

function PriestPortrait() {
  return (
    <PortraitFrame>
      {/* Dark robes */}
      <path d="M15 210 L25 150 Q80 130 135 150 L145 210Z" fill="#1a1825"/>
      {/* Hood */}
      <path d="M40 120 Q44 72 80 68 Q116 72 120 120 Q110 90 80 85 Q50 90 40 120Z" fill="#252230"/>
      <path d="M40 120 Q32 145 38 175" fill="#252230"/>
      <path d="M120 120 Q128 145 122 175" fill="#252230"/>
      {/* Pale face in shadow */}
      <ellipse cx="80" cy="112" rx="30" ry="36" fill="#c0a888"/>
      {/* Deep-set eyes */}
      <ellipse cx="68" cy="106" rx="7" ry="5" fill="#0a0808"/>
      <ellipse cx="92" cy="106" rx="7" ry="5" fill="#0a0808"/>
      <ellipse cx="68" cy="106" rx="4" ry="3" fill="#1a1015"/>
      <ellipse cx="92" cy="106" rx="4" ry="3" fill="#1a1015"/>
      <circle cx="66" cy="104" r="1.5" fill="#ffffff33"/>
      <circle cx="90" cy="104" r="1.5" fill="#ffffff33"/>
      {/* Gaunt brows */}
      <path d="M59 97 Q68 93 77 97" fill="none" stroke="#2a1a10" strokeWidth="1.5"/>
      <path d="M83 97 Q92 93 101 97" fill="none" stroke="#2a1a10" strokeWidth="1.5"/>
      {/* Nose - thin */}
      <path d="M78 115 Q80 121 82 115" fill="none" stroke="#9a7a58" strokeWidth="1"/>
      {/* Thin lips */}
      <path d="M71 130 L89 130" fill="none" stroke="#7a5a48" strokeWidth="1.5"/>
      {/* Cross pendant */}
      <line x1="80" y1="152" x2="80" y2="170" stroke="#c0c0d0" strokeWidth="2"/>
      <line x1="73" y1="159" x2="87" y2="159" stroke="#c0c0d0" strokeWidth="2"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#b0b0c8" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">FATHER TOMAS</text>
    </PortraitFrame>
  );
}

function KnightPortrait() {
  return (
    <PortraitFrame>
      {/* Armor body */}
      <path d="M18 210 L28 155 L50 142 Q80 133 110 142 L132 155 L142 210Z" fill="#2a3a40"/>
      {/* Chainmail coif */}
      <ellipse cx="80" cy="82" rx="42" ry="38" fill="#3a4848"/>
      {/* Helmet rim */}
      <path d="M40 82 Q80 65 120 82" fill="none" stroke="#5a7080" strokeWidth="3"/>
      {/* Steel pauldrons */}
      <ellipse cx="40" cy="148" rx="26" ry="14" fill="#3a5060" transform="rotate(-12,40,148)"/>
      <ellipse cx="120" cy="148" rx="26" ry="14" fill="#3a5060" transform="rotate(12,120,148)"/>
      {/* Face within coif */}
      <ellipse cx="80" cy="104" rx="26" ry="30" fill="#b88860"/>
      {/* Honest eyes */}
      <ellipse cx="68" cy="98" rx="5.5" ry="4.5" fill="#1a2a30"/>
      <ellipse cx="92" cy="98" rx="5.5" ry="4.5" fill="#1a2a30"/>
      <ellipse cx="68" cy="98" rx="3" ry="2.5" fill="#2a4a60"/>
      <ellipse cx="92" cy="98" rx="3" ry="2.5" fill="#2a4a60"/>
      <circle cx="67" cy="96" r="1.5" fill="#ffffff55"/>
      <circle cx="91" cy="96" r="1.5" fill="#ffffff55"/>
      {/* Brows */}
      <path d="M60 88 Q68 84 76 88" fill="none" stroke="#3a2810" strokeWidth="2"/>
      <path d="M84 88 Q92 84 100 88" fill="none" stroke="#3a2810" strokeWidth="2"/>
      {/* Nose */}
      <path d="M77 108 Q80 114 83 108" fill="none" stroke="#8a6040" strokeWidth="1"/>
      {/* Strong jaw, slight beard */}
      <path d="M60 120 Q80 130 100 120 Q100 128 80 132 Q60 128 60 120Z" fill="#6a3818" opacity="0.4"/>
      <path d="M64 122 Q80 134 96 122" fill="none" stroke="#5a3015" strokeWidth="1.5"/>
      {/* Shield emblem on chest */}
      <polygon points="80,155 68,162 68,175 80,180 92,175 92,162" fill="#2a3848" stroke="#5a7080" strokeWidth="1"/>
      <path d="M74,163 L86,163 M80,163 L80,176" stroke="#8ab0c8" strokeWidth="1"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#8ab8c8" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">SIR ROWAN</text>
    </PortraitFrame>
  );
}

function PhysicianPortrait() {
  return (
    <PortraitFrame>
      {/* Robes */}
      <path d="M20 210 L32 158 Q80 138 128 158 L140 210Z" fill="#2a3028"/>
      {/* Apron */}
      <path d="M55 155 Q80 142 105 155 L110 210 L50 210Z" fill="#d8cba8" opacity="0.7"/>
      {/* Wimple/headwrap */}
      <ellipse cx="80" cy="78" rx="38" ry="34" fill="#d8cba8"/>
      <path d="M42 78 Q42 115 50 145 Q80 148 110 145 Q118 115 118 78" fill="#d8cba8"/>
      {/* Face */}
      <ellipse cx="80" cy="100" rx="28" ry="34" fill="#c8a078"/>
      {/* Warm eyes */}
      <ellipse cx="68" cy="94" rx="5.5" ry="4" fill="#1a1008"/>
      <ellipse cx="92" cy="94" rx="5.5" ry="4" fill="#1a1008"/>
      <ellipse cx="68" cy="94" rx="3" ry="2" fill="#3a2808"/>
      <ellipse cx="92" cy="94" rx="3" ry="2" fill="#3a2808"/>
      <circle cx="67" cy="92" r="1.5" fill="#ffffff55"/>
      <circle cx="91" cy="92" r="1.5" fill="#ffffff55"/>
      {/* Brows */}
      <path d="M60 84 Q68 80 76 84" fill="none" stroke="#3a2010" strokeWidth="1.5"/>
      <path d="M84 84 Q92 80 100 84" fill="none" stroke="#3a2010" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M77 105 Q80 110 83 105" fill="none" stroke="#9a6840" strokeWidth="1"/>
      {/* Kind mouth */}
      <path d="M70 120 Q80 128 90 120" fill="none" stroke="#8a4838" strokeWidth="1.5"/>
      {/* Herb bundle at collar */}
      <path d="M58 158 Q65 148 60 142" fill="none" stroke="#6a8850" strokeWidth="2"/>
      <circle cx="61" cy="141" r="3" fill="#4a6830"/>
      <circle cx="57" cy="144" r="2" fill="#5a7840"/>
      <circle cx="65" cy="143" r="2" fill="#4a6830"/>
      {/* Vial at belt */}
      <rect x="88" y="165" width="6" height="14" rx="3" fill="#5a9870" opacity="0.8"/>
      <rect x="87" y="163" width="8" height="4" rx="1" fill="#4a7858"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#80c090" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">MIRA</text>
    </PortraitFrame>
  );
}

function BlacksmithPortrait() {
  return (
    <PortraitFrame>
      {/* Leather apron */}
      <path d="M18 210 L28 148 L55 138 Q80 128 105 138 L132 148 L142 210Z" fill="#2a1808"/>
      {/* Muscular shoulders */}
      <ellipse cx="36" cy="148" rx="28" ry="16" fill="#5a3020" transform="rotate(-8,36,148)"/>
      <ellipse cx="124" cy="148" rx="28" ry="16" fill="#5a3020" transform="rotate(8,124,148)"/>
      {/* Neck guard */}
      <path d="M55 138 Q80 128 105 138 L108 152 Q80 145 52 152Z" fill="#3a2010"/>
      {/* Neck */}
      <rect x="68" y="128" width="24" height="16" fill="#7a4828"/>
      {/* Strong head */}
      <ellipse cx="80" cy="98" rx="38" ry="44" fill="#7a4828"/>
      {/* Short cropped hair */}
      <path d="M42 80 Q46 50 80 48 Q114 50 118 80 Q110 60 80 58 Q50 60 42 80Z" fill="#1a1008"/>
      {/* Heavy brows */}
      <path d="M54 79 Q66 73 78 79" fill="none" stroke="#1a0e08" strokeWidth="3.5"/>
      <path d="M82 79 Q94 73 106 79" fill="none" stroke="#1a0e08" strokeWidth="3.5"/>
      {/* Intense eyes */}
      <ellipse cx="64" cy="92" rx="7" ry="5.5" fill="#1a0e08"/>
      <ellipse cx="96" cy="92" rx="7" ry="5.5" fill="#1a0e08"/>
      <ellipse cx="64" cy="92" rx="4" ry="3" fill="#3a2408"/>
      <ellipse cx="96" cy="92" rx="4" ry="3" fill="#3a2408"/>
      <circle cx="62" cy="90" r="1.5" fill="#ffffff44"/>
      <circle cx="94" cy="90" r="1.5" fill="#ffffff44"/>
      {/* Nose - broad */}
      <path d="M75 106 Q80 114 85 106" fill="none" stroke="#5a3018" strokeWidth="2"/>
      {/* Beard */}
      <path d="M48 110 Q54 140 60 148 Q80 155 100 148 Q106 140 112 110 Q96 125 80 128 Q64 125 48 110Z" fill="#1a1008"/>
      {/* Mouth visible through beard */}
      <path d="M66 120 Q80 130 94 120" fill="none" stroke="#4a2818" strokeWidth="1.5"/>
      {/* Forge burns on cheek */}
      <circle cx="52" cy="105" r="3" fill="#8a3808" opacity="0.4"/>
      <circle cx="55" cy="112" r="2" fill="#7a2808" opacity="0.3"/>
      {/* Name plate */}
      <rect x="10" y="185" width="140" height="18" rx="1" fill="#0a0806" opacity="0.9"/>
      <text x="80" y="197" textAnchor="middle" fill="#c07030" fontSize="9" fontFamily="Cinzel, serif" fontWeight="600">GARRETT</text>
    </PortraitFrame>
  );
}

const PORTRAIT_MAP: Record<string, React.FC> = {
  queen: QueenPortrait,
  commander: CommanderPortrait,
  priest: PriestPortrait,
  knight: KnightPortrait,
  physician: PhysicianPortrait,
  blacksmith: BlacksmithPortrait,
};

const SIZE_CLASSES = {
  sm: 'w-20 h-28',
  md: 'w-32 h-44',
  lg: 'w-44 h-60',
};

export default function CharacterPortrait({ portraitType, size = 'md', className = '' }: CharacterPortraitProps) {
  const Portrait = PORTRAIT_MAP[portraitType];
  if (!Portrait) return null;
  return (
    <div className={`${SIZE_CLASSES[size]} ${className} relative`}>
      <Portrait />
    </div>
  );
}
