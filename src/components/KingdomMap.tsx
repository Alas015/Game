import { useState } from 'react';
import type { GameState } from '../types';
import { LOCATIONS } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface KingdomMapProps {
  gameState: GameState;
  onLocationClick: (locationId: string) => void;
  onEvidenceBoard: () => void;
  onJournal: () => void;
}

const LOCATION_ICONS: Record<string, string> = {
  'blackthorn-castle': '🏰',
  'ravens-hollow': '🌲',
  'old-monastery': '⛪',
  'ironwood-forest': '🌳',
  'kings-road': '🛤️',
  'forgotten-mine': '⛏️',
  'river-alden': '🌊',
  'northern-village': '🏘️',
};

export default function KingdomMap({ gameState, onLocationClick, onEvidenceBoard, onJournal }: KingdomMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const { T } = useLanguage();

  const collectedCount = gameState.collectedClueIds.length;
  const hoveredLoc = hoveredLocation ? LOCATIONS[hoveredLocation] : null;

  return (
    <div
      className="min-h-screen flex flex-col screen-transition"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1c1408 0%, #080604 80%)' }}
    >
      {/* Top Navigation Bar */}
      <div
        className="flex items-center justify-between px-6 py-3 relative z-20"
        style={{
          background: 'linear-gradient(180deg, #1a1208 0%, #0f0a06 100%)',
          borderBottom: '1px solid #3a2c10',
        }}
      >
        <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '1.1rem', color: '#c9a84c' }}>
          {T.ui.title}
        </div>
        <div className="flex gap-3 items-center">
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', color: '#5a4010', letterSpacing: '0.1em' }}>
            {T.ui.cluesLabel}: <span style={{ color: collectedCount >= 5 ? '#c9a84c' : '#7a5828' }}>{collectedCount}/9</span>
          </span>
          <button className="medieval-btn-sm" onClick={onJournal}>{T.ui.journalBtn}</button>
          <button className="medieval-btn-sm" onClick={onEvidenceBoard}>
            {T.ui.evidenceBtn} {collectedCount > 0 && <span style={{ color: '#c9a84c' }}>({collectedCount})</span>}
          </button>
          {collectedCount >= 5 && (
            <button
              className="medieval-btn-sm"
              onClick={onEvidenceBoard}
              style={{ borderColor: '#8b1a1a', color: '#cc4444' }}
            >
              {T.ui.makeAccusationNav}
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #c9a870 0%, #b89255 30%, #c4a058 70%, #a88040 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(ellipse at 20% 15%, rgba(80,40,0,0.5) 0%, transparent 40%),
                            radial-gradient(ellipse at 85% 80%, rgba(60,30,0,0.4) 0%, transparent 35%),
                            radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(40,20,0,0.3) 100%)`,
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: 'inset 0 0 80px rgba(30,15,0,0.7)',
        }}/>

        <svg
          viewBox="0 0 900 600"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full absolute inset-0"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          {/* Mountain range - north border */}
          {[{x:820,y:80},{x:845,y:65},{x:860,y:85},{x:870,y:70},{x:885,y:90}].map((m,i)=>(
            <polygon key={i} points={`${m.x-15},${m.y+20} ${m.x},${m.y-5} ${m.x+15},${m.y+20}`}
              fill="#6a5a40" opacity="0.7"/>
          ))}
          {[{x:10,y:90},{x:25,y:75},{x:40,y:95},{x:55,y:80}].map((m,i)=>(
            <polygon key={i} points={`${m.x-12},${m.y+18} ${m.x},${m.y-8} ${m.x+12},${m.y+18}`}
              fill="#6a5a40" opacity="0.7"/>
          ))}

          {/* River Alden */}
          <path
            d="M 580 180 Q 560 240 540 300 Q 520 360 500 410 Q 480 460 460 510 Q 440 555 420 590"
            fill="none" stroke="#4a7090" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>
          <path
            d="M 580 180 Q 560 240 540 300 Q 520 360 500 410 Q 480 460 460 510 Q 440 555 420 590"
            fill="none" stroke="#6a9ab8" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
          <text x="530" y="355" fill="#2a4860" fontSize="10" transform="rotate(-70,530,355)" opacity="0.8"
            style={{ fontFamily: 'Lora, serif', fontStyle: 'italic' }}>River Alden</text>

          {/* King's Road */}
          <path
            d="M 450 165 Q 430 250 410 330 Q 390 400 370 470"
            fill="none" stroke="#7a6040" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="12,6" opacity="0.6"/>
          <path
            d="M 210 160 Q 300 200 380 220 Q 440 235 460 265"
            fill="none" stroke="#7a6040" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="8,5" opacity="0.5"/>

          {/* Forest region */}
          <ellipse cx="140" cy="400" rx="110" ry="90" fill="#2a5020" opacity="0.25"/>
          {[{x:80,y:340},{x:110,y:360},{x:75,y:385},{x:130,y:375},{x:95,y:410},{x:155,y:360},{x:175,y:390},{x:145,y:420},{x:110,y:430},{x:170,y:430}].map((t,i)=>(
            <g key={i} opacity="0.7">
              <polygon points={`${t.x},${t.y-18} ${t.x-10},${t.y} ${t.x+10},${t.y}`} fill="#1a4018"/>
              <polygon points={`${t.x},${t.y-25} ${t.x-8},${t.y-10} ${t.x+8},${t.y-10}`} fill="#244f20"/>
              <rect x={t.x-2} y={t.y} width="4" height="8" fill="#5a3818"/>
            </g>
          ))}

          {/* Raven's Hollow */}
          {[{x:675,y:110},{x:700,y:130},{x:720,y:108},{x:740,y:125},{x:760,y:112}].map((t,i)=>(
            <g key={i} opacity="0.75">
              <path d={`M ${t.x} ${t.y+20} Q ${t.x-6} ${t.y} ${t.x-4} ${t.y-20}`}
                fill="none" stroke="#1a1208" strokeWidth="2.5"/>
              <path d={`M ${t.x} ${t.y+20} Q ${t.x+6} ${t.y+5} ${t.x+5} ${t.y-15}`}
                fill="none" stroke="#1a1208" strokeWidth="2"/>
              <circle cx={t.x} cy={t.y-22} r="10" fill="#1a1a0a" opacity="0.8"/>
            </g>
          ))}

          {/* Location Markers */}
          {Object.values(LOCATIONS).map((loc) => {
            const cx = (loc.mapPosition.x / 100) * 900;
            const cy = (loc.mapPosition.y / 100) * 600;
            const isHovered = hoveredLocation === loc.id;
            const isVisited = gameState.visitedLocationIds.includes(loc.id);
            const hasClues = loc.clueIds.some(c => !gameState.collectedClueIds.includes(c));
            const icon = LOCATION_ICONS[loc.id] || '📍';
            const locT = T.locations[loc.id];
            const displayName = locT ? locT.name : loc.name;

            return (
              <g
                key={loc.id}
                className="location-node"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => onLocationClick(loc.id)}
              >
                {isHovered && (
                  <circle cx={cx} cy={cy} r="28" fill="rgba(201,168,76,0.15)"
                    stroke="#c9a84c" strokeWidth="1.5" opacity="0.8"/>
                )}
                {hasClues && !isHovered && (
                  <circle cx={cx} cy={cy} r="22" fill="none"
                    stroke="#8a6c28" strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
                )}
                <circle
                  cx={cx} cy={cy} r="16"
                  className="node-circle"
                  fill={isVisited ? '#2a1e0c' : '#1a1408'}
                  stroke={isHovered ? '#c9a84c' : isVisited ? '#8a6c28' : '#5a4010'}
                  strokeWidth="2"
                />
                {isVisited && (
                  <circle cx={cx} cy={cy} r="8" fill="#3a2810" stroke="#8a6c28" strokeWidth="1"/>
                )}
                <text x={cx} y={cy+5} textAnchor="middle" fontSize="13"
                  style={{ userSelect: 'none' }}>
                  {icon}
                </text>
                {hasClues && (
                  <circle cx={cx+14} cy={cy-14} r="5" fill="#8b1a1a" stroke="#cc2222" strokeWidth="1"/>
                )}
                <rect
                  x={cx - 54} y={cy + 22}
                  width="108" height="18" rx="2"
                  fill="rgba(10,8,4,0.85)"
                  stroke={isHovered ? '#8a6c28' : '#3a2c10'}
                  strokeWidth="1"
                />
                <text
                  x={cx} y={cy + 34}
                  textAnchor="middle"
                  fill={isHovered ? '#c9a84c' : isVisited ? '#8a6c28' : '#6a5030'}
                  fontSize="8.5"
                  style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em', userSelect: 'none' }}
                >
                  {displayName.toUpperCase().slice(0, 14)}
                </text>
              </g>
            );
          })}

          <rect x="8" y="8" width="884" height="584" fill="none"
            stroke="#6a4e20" strokeWidth="2" opacity="0.6"/>
          <rect x="14" y="14" width="872" height="572" fill="none"
            stroke="#4a3810" strokeWidth="1" strokeDasharray="20,8" opacity="0.4"/>

          {/* Compass rose */}
          <g transform="translate(845, 530)">
            <circle cx="0" cy="0" r="20" fill="rgba(10,8,4,0.7)" stroke="#5a4010" strokeWidth="1"/>
            <text x="0" y="-12" textAnchor="middle" fill="#8a6c28" fontSize="9">N</text>
            <text x="0" y="16" textAnchor="middle" fill="#5a4010" fontSize="7">S</text>
            <text x="-13" y="4" textAnchor="middle" fill="#5a4010" fontSize="7">W</text>
            <text x="13" y="4" textAnchor="middle" fill="#5a4010" fontSize="7">E</text>
            <path d="M0,-8 L2,-2 L0,8 L-2,-2Z" fill="#8a6c28"/>
            <path d="M0,8 L2,2 L0,-8 L-2,2Z" fill="#3a2c10"/>
          </g>

          <text x="450" y="38" textAnchor="middle" fill="#4a3410" fontSize="18"
            style={{ fontFamily: 'Cinzel Decorative, serif', opacity: 0.6 }}>
            {T.ui.kingdomName}
          </text>
          <line x1="200" y1="44" x2="350" y2="44" stroke="#4a3010" strokeWidth="1" opacity="0.4"/>
          <line x1="550" y1="44" x2="700" y2="44" stroke="#4a3010" strokeWidth="1" opacity="0.4"/>
        </svg>

        {/* Hover info panel */}
        {hoveredLoc && (() => {
          const locT = T.locations[hoveredLoc.id];
          return (
            <div
              className="absolute bottom-6 left-1/2 pointer-events-none"
              style={{
                transform: 'translateX(-50%)',
                background: 'rgba(10,8,4,0.95)',
                border: '1px solid #5a4010',
                outline: '1px solid rgba(90,64,16,0.3)',
                outlineOffset: '3px',
                padding: '0.8rem 1.5rem',
                maxWidth: 440,
                minWidth: 280,
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', color: '#c9a84c', fontSize: '0.8rem',
                letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                {(locT?.name ?? hoveredLoc.name).toUpperCase()}
              </div>
              <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
                color: '#a08850', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {locT?.description ?? hoveredLoc.description}
              </div>
              {hoveredLoc.clueIds.some(c => !gameState.collectedClueIds.includes(c)) && (
                <div style={{ color: '#8b1a1a', fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                  letterSpacing: '0.1em', marginTop: '0.5rem' }}>
                  {T.ui.evidenceAwaits}
                </div>
              )}
              {gameState.visitedLocationIds.includes(hoveredLoc.id) && (
                <div style={{ color: '#5a4010', fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                  letterSpacing: '0.1em', marginTop: '0.5rem' }}>
                  {T.ui.previouslyVisited}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Bottom status bar */}
      <div
        className="px-6 py-2 flex items-center justify-between"
        style={{ background: '#0a0806', borderTop: '1px solid #2a1c08' }}
      >
        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic',
          fontSize: '0.8rem', color: '#5a4010' }}>
          {T.ui.mapHint}
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
          color: '#4a3010', letterSpacing: '0.1em' }}>
          {gameState.visitedLocationIds.length} / 8 {T.ui.locationsVisited}
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}
