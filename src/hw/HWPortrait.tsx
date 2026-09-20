import type { ReactElement } from 'react';

interface HWPortraitProps {
  personId: string;
  size?: number;
}

// A shared "seen through fog" vignette every silhouette sits inside.
function Vignette({ s, cx, cy, glow }: { s: number; cx: number; cy: number; glow: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`hw-bg-${glow}`} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#0d1210" />
          <stop offset="70%" stopColor="#050807" />
          <stop offset="100%" stopColor="#020403" />
        </radialGradient>
        <radialGradient id={`hw-fog-${glow}`} cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.16" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={cx - 2} fill={`url(#hw-bg-${glow})`} stroke="rgba(90,173,126,0.28)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={cx - 2} fill={`url(#hw-fog-${glow})`} />
      {/* corner marks, faint */}
      <path d={`M 4,4 L 12,4 M 4,4 L 4,12`} fill="none" stroke="rgba(90,173,126,0.22)" strokeWidth="1" />
      <path d={`M ${s - 4},${s - 4} L ${s - 12},${s - 4} M ${s - 4},${s - 4} L ${s - 4},${s - 12}`} fill="none" stroke="rgba(90,173,126,0.22)" strokeWidth="1" />
    </>
  );
}

export default function HWPortrait({ personId, size = 120 }: HWPortraitProps) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  const portraits: Record<string, ReactElement> = {
    thorne: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#5aad7e" />
        {/* stooped elder silhouette */}
        <path
          d={`M ${cx - 26} ${s} Q ${cx - 30} ${cy + 20} ${cx - 14} ${cy + 6} Q ${cx - 6} ${cy - 2} ${cx + 2} ${cy - 6}
              Q ${cx + 14} ${cy - 14} ${cx + 10} ${cy - 26} Q ${cx + 4} ${cy - 34} ${cx - 6} ${cy - 32}
              Q ${cx - 16} ${cy - 30} ${cx - 16} ${cy - 20} Q ${cx - 16} ${cy - 10} ${cx - 10} ${cy - 4}
              Q ${cx - 20} ${cy + 4} ${cx - 24} ${cy + 16} Q ${cx - 28} ${cy + 30} ${cx - 30} ${s} Z`}
          fill="#0a1410" opacity="0.92"
        />
        {/* wide-brim hat */}
        <ellipse cx={cx - 2} cy={cy - 34} rx="20" ry="5" fill="#080f0c" />
        <path d={`M ${cx - 12} ${cy - 34} Q ${cx - 2} ${cy - 46} ${cx + 8} ${cy - 34} Z`} fill="#080f0c" />
        {/* cane */}
        <line x1={cx - 30} y1={cy - 2} x2={cx - 34} y2={s} stroke="#0a1410" strokeWidth="3" strokeLinecap="round" />
        <path d={`M ${cx - 34} ${cy - 4} Q ${cx - 38} ${cy - 8} ${cx - 34} ${cy - 10}`} fill="none" stroke="#0a1410" strokeWidth="3" strokeLinecap="round" />
        {/* faint lantern glow near hand */}
        <circle cx={cx + 8} cy={cy + 10} r="4" fill="#5aad7e" opacity="0.3" />
      </svg>
    ),

    elsie: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#5aad7e" />
        {/* woman with shawl */}
        <path
          d={`M ${cx - 24} ${s} Q ${cx - 28} ${cy + 14} ${cx - 20} ${cy + 2} Q ${cx - 14} ${cy - 10} ${cx - 14} ${cy - 20}
              Q ${cx - 14} ${cy - 32} ${cx - 2} ${cy - 32} Q ${cx + 10} ${cy - 32} ${cx + 10} ${cy - 20}
              Q ${cx + 10} ${cy - 10} ${cx + 16} ${cy - 2} Q ${cx + 26} ${cy + 12} ${cx + 24} ${s} Z`}
          fill="#0c1712" opacity="0.92"
        />
        {/* shawl drape */}
        <path d={`M ${cx - 22} ${cy - 6} Q ${cx} ${cy + 6} ${cx + 22} ${cy - 6} L ${cx + 20} ${cy + 4} Q ${cx} ${cy + 14} ${cx - 20} ${cy + 4} Z`}
          fill="#0a1410" opacity="0.85" />
        {/* hair pulled back */}
        <path d={`M ${cx - 14} ${cy - 22} Q ${cx - 16} ${cy - 34} ${cx - 2} ${cy - 36} Q ${cx + 12} ${cy - 34} ${cx + 10} ${cy - 22}`}
          fill="none" stroke="#08120e" strokeWidth="3" />
      </svg>
    ),

    rennick: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#5aad7e" />
        {/* constable silhouette, square shoulders */}
        <path
          d={`M ${cx - 28} ${s} Q ${cx - 30} ${cy + 10} ${cx - 20} ${cy + 2} L ${cx - 16} ${cy - 18}
              Q ${cx - 16} ${cy - 30} ${cx - 2} ${cy - 30} Q ${cx + 14} ${cy - 30} ${cx + 14} ${cy - 18}
              L ${cx + 18} ${cy + 2} Q ${cx + 28} ${cy + 10} ${cx + 26} ${s} Z`}
          fill="#0a1611" opacity="0.92"
        />
        {/* peaked cap */}
        <path d={`M ${cx - 15} ${cy - 30} Q ${cx - 2} ${cy - 40} ${cx + 13} ${cy - 30} L ${cx + 13} ${cy - 24} L ${cx - 15} ${cy - 24} Z`}
          fill="#08120d" />
        <rect x={cx - 18} y={cy - 25} width="34" height="3" fill="#08120d" />
        {/* badge glint */}
        <circle cx={cx} cy={cy - 4} r="2.2" fill="#5aad7e" opacity="0.35" />
      </svg>
    ),

    briggs: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#5aad7e" />
        {/* broad-shouldered figure, stiff collar */}
        <path
          d={`M ${cx - 32} ${s} Q ${cx - 34} ${cy + 8} ${cx - 22} ${cy - 2} L ${cx - 18} ${cy - 20}
              Q ${cx - 18} ${cy - 32} ${cx - 2} ${cy - 32} Q ${cx + 16} ${cy - 32} ${cx + 16} ${cy - 20}
              L ${cx + 20} ${cy - 2} Q ${cx + 34} ${cy + 8} ${cx + 32} ${s} Z`}
          fill="#0b1712" opacity="0.92"
        />
        {/* stiff collar / cravat */}
        <path d={`M ${cx - 8} ${cy - 6} L ${cx} ${cy + 8} L ${cx + 8} ${cy - 6} Z`} fill="#08120d" />
        {/* watch chain */}
        <path d={`M ${cx - 14} ${cy + 4} Q ${cx} ${cy + 14} ${cx + 14} ${cy + 4}`} fill="none" stroke="#5aad7e" strokeWidth="1" opacity="0.35" strokeDasharray="2,2" />
      </svg>
    ),

    weaver: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#5aad7e" />
        {/* hunched figure, hooded shawl */}
        <path
          d={`M ${cx - 22} ${s} Q ${cx - 30} ${cy + 12} ${cx - 18} ${cy} Q ${cx - 6} ${cy - 10} ${cx - 8} ${cy - 22}
              Q ${cx - 10} ${cy - 34} ${cx + 4} ${cy - 32} Q ${cx + 16} ${cy - 30} ${cx + 14} ${cy - 18}
              Q ${cx + 12} ${cy - 6} ${cx + 20} ${cy + 4} Q ${cx + 28} ${cy + 16} ${cx + 22} ${s} Z`}
          fill="#0a1712" opacity="0.92"
        />
        {/* deep hood, only faint eyes glinting */}
        <path d={`M ${cx - 12} ${cy - 20} Q ${cx - 4} ${cy - 36} ${cx + 10} ${cy - 24} Q ${cx + 6} ${cy - 12} ${cx - 4} ${cy - 10} Q ${cx - 12} ${cy - 12} ${cx - 12} ${cy - 20} Z`}
          fill="#040a06" />
        <circle cx={cx - 3} cy={cy - 16} r="1.2" fill="#5aad7e" opacity="0.55" />
        <circle cx={cx + 3} cy={cy - 16} r="1.2" fill="#5aad7e" opacity="0.55" />
      </svg>
    ),

    // Mara — the missing girl. Rendered fainter than the others; an absence, not a presence.
    mara: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Vignette s={s} cx={cx} cy={cy} glow="#8fd6ab" />
        <path
          d={`M ${cx - 20} ${s} Q ${cx - 24} ${cy + 10} ${cx - 14} ${cy - 2} Q ${cx - 12} ${cy - 14} ${cx - 12} ${cy - 22}
              Q ${cx - 12} ${cy - 32} ${cx} ${cy - 32} Q ${cx + 12} ${cy - 32} ${cx + 12} ${cy - 22}
              Q ${cx + 12} ${cy - 14} ${cx + 14} ${cy - 2} Q ${cx + 24} ${cy + 10} ${cx + 20} ${s} Z`}
          fill="#0a1712" opacity="0.4"
        />
        {/* loose hair */}
        <path d={`M ${cx - 12} ${cy - 20} Q ${cx - 18} ${cy - 4} ${cx - 14} ${cy + 10}`} fill="none" stroke="#0a1712" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
        <path d={`M ${cx + 12} ${cy - 20} Q ${cx + 18} ${cy - 4} ${cx + 14} ${cy + 10}`} fill="none" stroke="#0a1712" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
        {/* a small book held close, the diary */}
        <rect x={cx - 6} y={cy + 2} width="12" height="9" rx="1" fill="#8fd6ab" opacity="0.22" />
        <text x={cx} y={s - 6} textAnchor="middle" fill="rgba(143,214,171,0.4)" style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.4rem', letterSpacing: '0.1em' }}>
          MISSING
        </text>
      </svg>
    ),
  };

  return portraits[personId] ?? (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={cx - 2} fill="#050807" stroke="rgba(90,173,126,0.3)" strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fill="rgba(90,173,126,0.4)" style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.65rem' }}>?</text>
    </svg>
  );
}
