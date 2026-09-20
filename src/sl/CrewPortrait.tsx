import type { ReactElement } from 'react';

interface CrewPortraitProps {
  crewId: string;
  size?: number;
}

export default function CrewPortrait({ crewId, size = 120 }: CrewPortraitProps) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  const portraits: Record<string, ReactElement> = {
    aria: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="aria-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#001428" />
            <stop offset="100%" stopColor="#000814" />
          </radialGradient>
          <filter id="aria-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Hexagonal frame */}
        <polygon
          points={`${cx},4 ${cx + 45},${cy - 22} ${cx + 45},${cy + 22} ${cx},${s - 4} ${cx - 45},${cy + 22} ${cx - 45},${cy - 22}`}
          fill="url(#aria-bg)"
          stroke="#00d4ff"
          strokeWidth="1.5"
          opacity="0.9"
        />
        {/* Inner hex */}
        <polygon
          points={`${cx},12 ${cx + 37},${cy - 18} ${cx + 37},${cy + 18} ${cx},${s - 12} ${cx - 37},${cy + 18} ${cx - 37},${cy - 18}`}
          fill="none"
          stroke="rgba(0,212,255,0.2)"
          strokeWidth="1"
        />
        {/* Circuit lines */}
        <line x1={cx} y1="12" x2={cx} y2={cy - 20} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <line x1={cx} y1={cy + 20} x2={cx} y2={s - 12} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <line x1={cx - 37} y1={cy - 18} x2={cx - 18} y2={cy - 10} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <line x1={cx + 37} y1={cy - 18} x2={cx + 18} y2={cy - 10} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <line x1={cx - 37} y1={cy + 18} x2={cx - 18} y2={cy + 10} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <line x1={cx + 37} y1={cy + 18} x2={cx + 18} y2={cy + 10} stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        {/* Core rings */}
        <circle cx={cx} cy={cy} r="22" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="14" fill="rgba(0,30,60,0.8)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
        {/* Central eye */}
        <circle cx={cx} cy={cy} r="6" fill="#00d4ff" opacity="0.9" filter="url(#aria-glow)" />
        <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
        {/* Scan ring */}
        <circle cx={cx} cy={cy} r="28" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
        {/* Corner nodes */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const nx = cx + Math.cos(rad) * 35;
          const ny = cy + Math.sin(rad) * 35;
          return <circle key={i} cx={nx} cy={ny} r="2" fill="#00d4ff" opacity="0.6" />;
        })}
      </svg>
    ),

    chen: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="chen-bg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0a1a28" />
            <stop offset="100%" stopColor="#030c18" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={cx - 2} fill="url(#chen-bg)" stroke="rgba(0,180,220,0.4)" strokeWidth="1.5" />
        {/* Neck */}
        <rect x={cx - 10} y={cy + 26} width="20" height="18" rx="3" fill="#1a3040" />
        {/* Shoulders / collar */}
        <path d={`M ${cx - 34} ${s} Q ${cx - 22} ${cy + 36} ${cx} ${cy + 34} Q ${cx + 22} ${cy + 36} ${cx + 34} ${s}`}
          fill="#0f2030" stroke="rgba(0,180,220,0.3)" strokeWidth="1" />
        {/* Head shape */}
        <ellipse cx={cx} cy={cy - 4} rx="28" ry="30" fill="#1a3040" />
        {/* Hair — short, practical */}
        <path d={`M ${cx - 28} ${cy - 14} Q ${cx - 24} ${cy - 38} ${cx} ${cy - 40} Q ${cx + 24} ${cy - 38} ${cx + 28} ${cy - 14}`}
          fill="#0a1520" stroke="none" />
        <path d={`M ${cx - 28} ${cy - 14} Q ${cx - 30} ${cy - 8} ${cx - 27} ${cy - 2}`}
          fill="none" stroke="#0a1520" strokeWidth="4" strokeLinecap="round" />
        {/* Face features */}
        {/* Eyes with glasses */}
        <ellipse cx={cx - 10} cy={cy - 6} rx="6" ry="4.5" fill="#0a1825" stroke="rgba(0,180,220,0.5)" strokeWidth="1" />
        <ellipse cx={cx + 10} cy={cy - 6} rx="6" ry="4.5" fill="#0a1825" stroke="rgba(0,180,220,0.5)" strokeWidth="1" />
        <circle cx={cx - 10} cy={cy - 6} r="2.5" fill="#3080b0" />
        <circle cx={cx + 10} cy={cy - 6} r="2.5" fill="#3080b0" />
        <circle cx={cx - 9} cy={cy - 7} r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle cx={cx + 11} cy={cy - 7} r="0.8" fill="rgba(255,255,255,0.5)" />
        <line x1={cx - 4} y1={cy - 6} x2={cx + 4} y2={cy - 6} stroke="rgba(0,180,220,0.4)" strokeWidth="0.8" />
        {/* Nose */}
        <path d={`M ${cx} ${cy - 2} L ${cx - 2} ${cy + 4} L ${cx + 2} ${cy + 4}`}
          fill="none" stroke="rgba(100,160,200,0.4)" strokeWidth="1" strokeLinejoin="round" />
        {/* Mouth */}
        <path d={`M ${cx - 7} ${cy + 10} Q ${cx} ${cy + 14} ${cx + 7} ${cy + 10}`}
          fill="none" stroke="rgba(100,160,200,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        {/* HUD bracket */}
        <path d={`M 4,4 L 14,4 M 4,4 L 4,14`} fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
        <path d={`M ${s - 4},4 L ${s - 14},4 M ${s - 4},4 L ${s - 4},14`} fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
        <path d={`M 4,${s - 4} L 14,${s - 4} M 4,${s - 4} L 4,${s - 14}`} fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
        <path d={`M ${s - 4},${s - 4} L ${s - 14},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 14}`} fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
      </svg>
    ),

    voss: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="voss-bg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0d1a22" />
            <stop offset="100%" stopColor="#040c14" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={cx - 2} fill="url(#voss-bg)" stroke="rgba(0,160,200,0.35)" strokeWidth="1.5" />
        {/* Collar — military */}
        <path d={`M ${cx - 36} ${s} Q ${cx - 20} ${cy + 32} ${cx - 6} ${cy + 30} L ${cx + 6} ${cy + 30} Q ${cx + 20} ${cy + 32} ${cx + 36} ${s}`}
          fill="#081520" stroke="rgba(0,160,200,0.25)" strokeWidth="1" />
        {/* Neck */}
        <rect x={cx - 11} y={cy + 22} width="22" height="16" rx="2" fill="#142030" />
        {/* Head — broader, older */}
        <ellipse cx={cx} cy={cy - 6} rx="30" ry="28" fill="#142030" />
        {/* Short grey hair */}
        <path d={`M ${cx - 30} ${cy - 14} Q ${cx - 26} ${cy - 40} ${cx} ${cy - 42} Q ${cx + 26} ${cy - 40} ${cx + 30} ${cy - 14}`}
          fill="#1a2a38" />
        {/* Salt-and-pepper texture */}
        {[[-20, -32], [0, -36], [18, -32], [-10, -30], [10, -30]].map(([ox, oy], i) => (
          <rect key={i} x={cx + ox - 1} y={cy + oy - 1} width="2" height="1.5"
            fill="rgba(200,220,230,0.2)" rx="1" />
        ))}
        {/* Brow — strong */}
        <path d={`M ${cx - 16} ${cy - 14} L ${cx - 8} ${cy - 16}`} fill="none" stroke="#0a1a28" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${cx + 16} ${cy - 14} L ${cx + 8} ${cy - 16}`} fill="none" stroke="#0a1a28" strokeWidth="2.5" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx={cx - 10} cy={cy - 8} rx="5" ry="3.5" fill="#0a1020" stroke="rgba(0,160,200,0.4)" strokeWidth="0.8" />
        <ellipse cx={cx + 10} cy={cy - 8} rx="5" ry="3.5" fill="#0a1020" stroke="rgba(0,160,200,0.4)" strokeWidth="0.8" />
        <circle cx={cx - 10} cy={cy - 8} r="2" fill="#204060" />
        <circle cx={cx + 10} cy={cy - 8} r="2" fill="#204060" />
        {/* Nose — stronger */}
        <path d={`M ${cx} ${cy - 4} L ${cx - 3} ${cy + 3} Q ${cx} ${cy + 5} ${cx + 3} ${cy + 3}`}
          fill="none" stroke="rgba(80,130,170,0.4)" strokeWidth="1.2" />
        {/* Mouth — set line */}
        <path d={`M ${cx - 8} ${cy + 10} Q ${cx} ${cy + 12} ${cx + 8} ${cy + 10}`}
          fill="none" stroke="rgba(80,130,170,0.45)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Jaw — wider */}
        <path d={`M ${cx - 28} ${cy - 2} Q ${cx - 30} ${cy + 14} ${cx - 18} ${cy + 22} Q ${cx} ${cy + 26} ${cx + 18} ${cy + 22} Q ${cx + 30} ${cy + 14} ${cx + 28} ${cy - 2}`}
          fill="none" stroke="rgba(80,130,170,0.15)" strokeWidth="1" />
        {/* HUD brackets */}
        <path d={`M 4,4 L 14,4 M 4,4 L 4,14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},4 L ${s - 14},4 M ${s - 4},4 L ${s - 4},14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M 4,${s - 4} L 14,${s - 4} M 4,${s - 4} L 4,${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},${s - 4} L ${s - 14},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
      </svg>
    ),

    lowe: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="lowe-bg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0c1820" />
            <stop offset="100%" stopColor="#04101a" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={cx - 2} fill="url(#lowe-bg)" stroke="rgba(0,170,210,0.35)" strokeWidth="1.5" />
        {/* Collar — work jumpsuit */}
        <path d={`M ${cx - 36} ${s} Q ${cx - 22} ${cy + 36} ${cx} ${cy + 34} Q ${cx + 22} ${cy + 36} ${cx + 36} ${s}`}
          fill="#0c1e2c" />
        {/* Neck */}
        <rect x={cx - 10} y={cy + 24} width="20" height="14" rx="2" fill="#142030" />
        {/* Head */}
        <ellipse cx={cx} cy={cy - 4} rx="27" ry="29" fill="#142030" />
        {/* Hair — slightly disheveled */}
        <path d={`M ${cx - 27} ${cy - 14} Q ${cx - 20} ${cy - 40} ${cx + 4} ${cy - 41} Q ${cx + 24} ${cy - 38} ${cx + 27} ${cy - 12}`}
          fill="#0c1a26" />
        {/* Stray hair */}
        <path d={`M ${cx - 20} ${cy - 38} Q ${cx - 28} ${cy - 36} ${cx - 32} ${cy - 28}`}
          fill="none" stroke="#0c1a26" strokeWidth="3" strokeLinecap="round" />
        {/* Stubble dots */}
        {[[-8, 16], [-4, 18], [0, 19], [4, 18], [8, 16], [-10, 14], [10, 14], [-6, 20], [6, 20]].map(([ox, oy], i) => (
          <circle key={i} cx={cx + ox} cy={cy + oy} r="0.9" fill="rgba(80,120,150,0.4)" />
        ))}
        {/* Eyes — focused, practical */}
        <ellipse cx={cx - 10} cy={cy - 8} rx="5" ry="3.8" fill="#0a1820" stroke="rgba(0,180,220,0.45)" strokeWidth="0.8" />
        <ellipse cx={cx + 10} cy={cy - 8} rx="5" ry="3.8" fill="#0a1820" stroke="rgba(0,180,220,0.45)" strokeWidth="0.8" />
        <circle cx={cx - 10} cy={cy - 8} r="2.2" fill="#1a4060" />
        <circle cx={cx + 10} cy={cy - 8} r="2.2" fill="#1a4060" />
        <circle cx={cx - 9} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.4)" />
        <circle cx={cx + 11} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.4)" />
        {/* Nose */}
        <path d={`M ${cx - 1} ${cy - 3} L ${cx - 3} ${cy + 3} L ${cx + 3} ${cy + 3}`}
          fill="none" stroke="rgba(80,130,170,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Mouth — straight, neutral */}
        <path d={`M ${cx - 7} ${cy + 11} L ${cx + 7} ${cy + 11}`}
          fill="none" stroke="rgba(80,130,170,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        {/* HUD brackets */}
        <path d={`M 4,4 L 14,4 M 4,4 L 4,14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},4 L ${s - 14},4 M ${s - 4},4 L ${s - 4},14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M 4,${s - 4} L 14,${s - 4} M 4,${s - 4} L 4,${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},${s - 4} L ${s - 14},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
      </svg>
    ),

    osei: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="osei-bg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0d1e2a" />
            <stop offset="100%" stopColor="#050d16" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={cx - 2} fill="url(#osei-bg)" stroke="rgba(0,200,240,0.35)" strokeWidth="1.5" />
        {/* Security collar */}
        <path d={`M ${cx - 36} ${s} Q ${cx - 20} ${cy + 34} ${cx} ${cy + 32} Q ${cx + 20} ${cy + 34} ${cx + 36} ${s}`}
          fill="#0a1e2e" />
        <rect x={cx - 12} y={cy + 24} width="24" height="14" rx="2" fill="#142030" />
        {/* Head — strong, close-cropped */}
        <ellipse cx={cx} cy={cy - 6} rx="28" ry="30" fill="#142a3a" />
        {/* Close-cropped hair — barely visible */}
        <ellipse cx={cx} cy={cy - 28} rx="28" ry="10" fill="#0c1e2c" />
        {/* Jaw — strong, wider */}
        <path d={`M ${cx - 28} ${cy - 2} Q ${cx - 30} ${cy + 14} ${cx - 20} ${cy + 24} Q ${cx} ${cy + 28} ${cx + 20} ${cy + 24} Q ${cx + 30} ${cy + 14} ${cx + 28} ${cy - 2}`}
          fill="#142a3a" stroke="none" />
        {/* Eyes — alert, direct */}
        <path d={`M ${cx - 16} ${cy - 8} Q ${cx - 10} ${cy - 14} ${cx - 4} ${cy - 8}`}
          fill="none" stroke="#0c1e2c" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${cx + 4} ${cy - 8} Q ${cx + 10} ${cy - 14} ${cx + 16} ${cy - 8}`}
          fill="none" stroke="#0c1e2c" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx={cx - 10} cy={cy - 8} rx="5.5" ry="4" fill="#0a1820" stroke="rgba(0,200,240,0.5)" strokeWidth="0.8" />
        <ellipse cx={cx + 10} cy={cy - 8} rx="5.5" ry="4" fill="#0a1820" stroke="rgba(0,200,240,0.5)" strokeWidth="0.8" />
        <circle cx={cx - 10} cy={cy - 8} r="2.5" fill="#1a5070" />
        <circle cx={cx + 10} cy={cy - 8} r="2.5" fill="#1a5070" />
        <circle cx={cx - 9} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.5)" />
        <circle cx={cx + 11} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.5)" />
        {/* Nose — broader */}
        <path d={`M ${cx} ${cy - 3} L ${cx - 4} ${cy + 4} Q ${cx} ${cy + 6} ${cx + 4} ${cy + 4}`}
          fill="none" stroke="rgba(80,140,180,0.4)" strokeWidth="1.3" />
        {/* Mouth — determined */}
        <path d={`M ${cx - 8} ${cy + 12} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 12}`}
          fill="none" stroke="rgba(80,140,180,0.45)" strokeWidth="1.3" strokeLinecap="round" />
        {/* HUD brackets */}
        <path d={`M 4,4 L 14,4 M 4,4 L 4,14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},4 L ${s - 14},4 M ${s - 4},4 L ${s - 4},14`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M 4,${s - 4} L 14,${s - 4} M 4,${s - 4} L 4,${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <path d={`M ${s - 4},${s - 4} L ${s - 14},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 14}`} fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
      </svg>
    ),

    ward: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <radialGradient id="ward-bg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0a1620" />
            <stop offset="100%" stopColor="#040c16" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={cx - 2} fill="url(#ward-bg)" stroke="rgba(0,160,200,0.3)" strokeWidth="1.5" />
        {/* Lab coat collar */}
        <path d={`M ${cx - 36} ${s} Q ${cx - 22} ${cy + 36} ${cx} ${cy + 34} Q ${cx + 22} ${cy + 36} ${cx + 36} ${s}`}
          fill="#0c1e2e" />
        {/* Neck */}
        <rect x={cx - 10} y={cy + 24} width="20" height="14" rx="2" fill="#12202e" />
        {/* Head */}
        <ellipse cx={cx} cy={cy - 4} rx="26" ry="30" fill="#122030" />
        {/* Hair — longer, slightly unkempt */}
        <path d={`M ${cx - 26} ${cy - 12} Q ${cx - 28} ${cy - 42} ${cx - 4} ${cy - 46} Q ${cx + 20} ${cy - 44} ${cx + 26} ${cy - 12}`}
          fill="#0c1828" />
        {/* Loose strands */}
        <path d={`M ${cx - 26} ${cy - 12} Q ${cx - 34} ${cy} ${cx - 30} ${cy + 16}`}
          fill="none" stroke="#0c1828" strokeWidth="4" strokeLinecap="round" />
        <path d={`M ${cx - 24} ${cy - 8} Q ${cx - 36} ${cy + 4} ${cx - 34} ${cy + 18}`}
          fill="none" stroke="#0c1828" strokeWidth="3" strokeLinecap="round" />
        {/* Eyes — slightly hollow, haunted */}
        <ellipse cx={cx - 10} cy={cy - 8} rx="5.5" ry="4.5" fill="#080e18" stroke="rgba(0,160,200,0.35)" strokeWidth="0.8" />
        <ellipse cx={cx + 10} cy={cy - 8} rx="5.5" ry="4.5" fill="#080e18" stroke="rgba(0,160,200,0.35)" strokeWidth="0.8" />
        <circle cx={cx - 10} cy={cy - 8} r="2.8" fill="#1a3848" />
        <circle cx={cx + 10} cy={cy - 8} r="2.8" fill="#1a3848" />
        <circle cx={cx - 9} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.35)" />
        <circle cx={cx + 11} cy={cy - 9} r="0.7" fill="rgba(255,255,255,0.35)" />
        {/* Dark shadows under eyes */}
        <ellipse cx={cx - 10} cy={cy - 4} rx="5" ry="2" fill="rgba(0,0,0,0.3)" />
        <ellipse cx={cx + 10} cy={cy - 4} rx="5" ry="2" fill="rgba(0,0,0,0.3)" />
        {/* Nose */}
        <path d={`M ${cx} ${cy - 2} L ${cx - 2} ${cy + 4} L ${cx + 2} ${cy + 4}`}
          fill="none" stroke="rgba(80,120,160,0.35)" strokeWidth="1" strokeLinejoin="round" />
        {/* Mouth — slightly parted, unsettled */}
        <path d={`M ${cx - 6} ${cy + 11} Q ${cx} ${cy + 13} ${cx + 6} ${cy + 11}`}
          fill="none" stroke="rgba(80,120,160,0.4)" strokeWidth="1.1" strokeLinecap="round" />
        {/* HUD brackets */}
        <path d={`M 4,4 L 14,4 M 4,4 L 4,14`} fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <path d={`M ${s - 4},4 L ${s - 14},4 M ${s - 4},4 L ${s - 4},14`} fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <path d={`M 4,${s - 4} L 14,${s - 4} M 4,${s - 4} L 4,${s - 14}`} fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
        <path d={`M ${s - 4},${s - 4} L ${s - 14},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 14}`} fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
      </svg>
    ),
  };

  return portraits[crewId] ?? (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={cx - 2} fill="#060e18" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5" />
      <text x={cx} y={cy + 6} textAnchor="middle" fill="rgba(0,212,255,0.4)"
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem' }}>UNKNOWN</text>
    </svg>
  );
}
