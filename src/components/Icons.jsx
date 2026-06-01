// Custom SVG portraits for each disciple — hand-drawn aesthetic, engraving style

export function KopeckySymbol({ size = 64, glow = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={glow ? { filter: 'drop-shadow(0 0 14px rgba(168,200,74,0.55))' } : {}}>
      {/* Vertical bar */}
      <rect x="30" y="6" width="4" height="52" rx="1" fill="#a8c84a" opacity="0.9"/>
      {/* Top crossbar */}
      <rect x="18" y="16" width="28" height="3.5" rx="1" fill="#a8c84a" opacity="0.9"/>
      {/* Middle crossbar */}
      <rect x="22" y="28" width="20" height="3" rx="1" fill="#a8c84a" opacity="0.75"/>
      {/* Corner ornaments */}
      <circle cx="18" cy="17.5" r="2.5" fill="#a8c84a" opacity="0.6"/>
      <circle cx="46" cy="17.5" r="2.5" fill="#a8c84a" opacity="0.6"/>
      <circle cx="32" cy="6" r="2.5" fill="#a8c84a" opacity="0.6"/>
      <circle cx="32" cy="58" r="2.5" fill="#a8c84a" opacity="0.6"/>
      {/* Inner glow dots */}
      <circle cx="32" cy="17.5" r="1.5" fill="#c8f060" opacity="0.8"/>
    </svg>
  )
}

// Ayub — a crowned figure gazing at his own reflection
export function AyubIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crown */}
      <path d="M22 28 L28 18 L34 26 L40 14 L46 26 L52 18 L58 28 Z" stroke="#a8c84a" strokeWidth="1.5" fill="rgba(168,200,74,0.08)" strokeLinejoin="round"/>
      <circle cx="28" cy="18" r="2" fill="#a8c84a" opacity="0.7"/>
      <circle cx="40" cy="14" r="2.5" fill="#a8c84a" opacity="0.9"/>
      <circle cx="52" cy="18" r="2" fill="#a8c84a" opacity="0.7"/>
      {/* Head */}
      <ellipse cx="40" cy="38" rx="11" ry="13" stroke="#a8c84a" strokeWidth="1.4" fill="rgba(168,200,74,0.04)"/>
      {/* Smug expression */}
      <path d="M33 37 Q35 35 37 37" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M43 37 Q45 35 47 37" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M35 44 Q40 48 45 44" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Mirror being held up */}
      <rect x="54" y="28" width="14" height="18" rx="2" stroke="#a8c84a" strokeWidth="1.2" fill="rgba(168,200,74,0.06)"/>
      <line x1="61" y1="46" x2="61" y2="52" stroke="#a8c84a" strokeWidth="1.2"/>
      {/* Reflection lines in mirror */}
      <line x1="57" y1="32" x2="65" y2="32" stroke="#a8c84a" strokeWidth="0.7" opacity="0.4"/>
      <line x1="57" y1="35" x2="65" y2="35" stroke="#a8c84a" strokeWidth="0.7" opacity="0.4"/>
      <line x1="57" y1="38" x2="65" y2="38" stroke="#a8c84a" strokeWidth="0.7" opacity="0.4"/>
      {/* Robe/shoulders */}
      <path d="M22 60 Q24 50 29 48 Q40 52 51 48 Q56 50 58 60" stroke="#a8c84a" strokeWidth="1.4" fill="rgba(168,200,74,0.05)" strokeLinejoin="round"/>
      {/* Chain/medallion */}
      <path d="M33 52 Q40 56 47 52" stroke="#a8c84a" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2"/>
      <circle cx="40" cy="56" r="2.5" stroke="#a8c84a" strokeWidth="0.8" fill="rgba(168,200,74,0.15)"/>
      <text x="40" y="57" textAnchor="middle" fontSize="3" fill="#a8c84a" opacity="0.8">J</text>
      {/* Decorative border */}
      <rect x="4" y="4" width="72" height="72" rx="3" stroke="rgba(168,200,74,0.18)" strokeWidth="0.8" strokeDasharray="4 3"/>
    </svg>
  )
}

// Abdullah — confident figure pointing at a bear that is not impressed
export function AbdullahIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bear silhouette (large, looming) */}
      <path d="M48 50 Q52 42 56 38 Q62 32 62 26 Q62 18 55 18 Q52 18 50 22 Q48 18 44 17 Q36 16 36 26 Q36 32 40 38 Q44 44 46 50 Z"
        stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.06)"/>
      {/* Bear ears */}
      <circle cx="50" cy="19" r="3.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.04)"/>
      <circle cx="58" cy="19" r="3" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.04)"/>
      {/* Bear eyes — unimpressed */}
      <line x1="47" y1="26" x2="50" y2="26" stroke="#a8c84a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="26" x2="58" y2="26" stroke="#a8c84a" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Bear mouth — flat line */}
      <line x1="51" y1="31" x2="55" y2="31" stroke="#a8c84a" strokeWidth="1" strokeLinecap="round"/>
      {/* Bear body/legs */}
      <path d="M36 50 Q38 62 44 66 L52 66 Q58 62 60 50" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.05)"/>
      {/* Abdullah figure — small, pointing upward confidently */}
      <ellipse cx="18" cy="28" rx="6" ry="7" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.04)"/>
      {/* Abdullah eyes — very confident */}
      <circle cx="15.5" cy="27" r="1" fill="#a8c84a" opacity="0.7"/>
      <circle cx="20.5" cy="27" r="1" fill="#a8c84a" opacity="0.7"/>
      <path d="M14 31 Q18 34 22 31" stroke="#a8c84a" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <path d="M12 35 Q10 48 12 60 L24 60 Q26 48 24 35 Z" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.04)"/>
      {/* Pointing arm extended toward bear */}
      <path d="M24 40 L44 30" stroke="#a8c84a" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M42 27 L46 30 L42 33" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Speech bubble */}
      <path d="M8 18 Q6 10 14 10 Q22 10 22 18 Q22 22 18 23 L14 26 L13 23 Q8 22 8 18 Z"
        stroke="#a8c84a" strokeWidth="0.9" fill="rgba(168,200,74,0.05)"/>
      <text x="15" y="18" textAnchor="middle" fontSize="4.5" fill="#a8c84a" opacity="0.7">...</text>
      {/* Decorative border */}
      <rect x="4" y="4" width="72" height="72" rx="3" stroke="rgba(168,200,74,0.18)" strokeWidth="0.8" strokeDasharray="4 3"/>
    </svg>
  )
}

// Enrico — enthusiastic figure shaking hands with two people simultaneously, ignoring a third
export function EnricoIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Enrico figure */}
      <ellipse cx="40" cy="24" rx="7" ry="8" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.04)"/>
      {/* Big smile */}
      <path d="M35 25 Q40 31 45 25" stroke="#a8c84a" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Big eyes — enthusiastic */}
      <circle cx="37" cy="22" r="1.8" fill="#a8c84a" opacity="0.6"/>
      <circle cx="43" cy="22" r="1.8" fill="#a8c84a" opacity="0.6"/>
      <circle cx="37.6" cy="21.4" r="0.7" fill="#060805"/>
      <circle cx="43.6" cy="21.4" r="0.7" fill="#060805"/>
      {/* Body */}
      <path d="M33 32 Q30 44 32 58 L48 58 Q50 44 47 32 Z" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.04)"/>
      {/* Left arm shaking hands enthusiastically */}
      <path d="M33 38 L16 38" stroke="#a8c84a" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M16 35 L12 38 L16 41" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Right arm also shaking hands */}
      <path d="M47 38 L64 38" stroke="#a8c84a" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M64 35 L68 38 L64 41" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Left person label — YASH */}
      <ellipse cx="10" cy="22" rx="6" ry="6" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.03)" strokeDasharray="2 2"/>
      <text x="10" y="24" textAnchor="middle" fontSize="4" fill="#a8c84a" opacity="0.7">Y</text>
      {/* Right person label — AYUB */}
      <ellipse cx="70" cy="22" rx="6" ry="6" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.03)" strokeDasharray="2 2"/>
      <text x="70" y="24" textAnchor="middle" fontSize="3.5" fill="#a8c84a" opacity="0.7">A</text>
      {/* Kopecky above — being pointedly ignored */}
      <ellipse cx="40" cy="8" rx="5" ry="5" stroke="rgba(168,200,74,0.35)" strokeWidth="1" fill="rgba(168,200,74,0.02)" strokeDasharray="2 2"/>
      <text x="40" y="10" textAnchor="middle" fontSize="3.5" fill="rgba(168,200,74,0.4)">K</text>
      {/* X mark through connection to Kopecky */}
      <line x1="37" y1="13" x2="43" y2="18" stroke="rgba(168,200,74,0.3)" strokeWidth="0.8" strokeDasharray="1 2"/>
      {/* YES! labels */}
      <text x="22" y="34" textAnchor="middle" fontSize="5" fill="#a8c84a" opacity="0.6">✓</text>
      <text x="58" y="34" textAnchor="middle" fontSize="5" fill="#a8c84a" opacity="0.6">✓</text>
      {/* Decorative border */}
      <rect x="4" y="4" width="72" height="72" rx="3" stroke="rgba(168,200,74,0.18)" strokeWidth="0.8" strokeDasharray="4 3"/>
    </svg>
  )
}

// Korrin — figure sitting in a tree, hat collection below, watching everything
export function KorrinIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tree trunk */}
      <path d="M36 75 L36 42 Q36 38 40 36 Q44 38 44 42 L44 75" stroke="#a8c84a" strokeWidth="1.5" fill="rgba(168,200,74,0.05)"/>
      {/* Tree branches */}
      <path d="M40 50 Q28 46 22 38 Q30 34 38 42" stroke="#a8c84a" strokeWidth="1.2" fill="none"/>
      <path d="M40 44 Q52 40 58 32 Q50 28 42 36" stroke="#a8c84a" strokeWidth="1.2" fill="none"/>
      <path d="M40 36 Q32 28 34 18 Q40 22 42 34" stroke="#a8c84a" strokeWidth="1.2" fill="none"/>
      {/* Foliage blobs */}
      {[[24,32,8],[56,26,7],[34,16,9],[50,38,6]].map(([cx,cy,r],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r*0.7} stroke="#a8c84a" strokeWidth="0.8" fill="rgba(168,200,74,0.05)" opacity="0.7"/>
      ))}
      {/* Korrin sitting on branch — legs dangling */}
      <ellipse cx="52" cy="42" rx="5" ry="5.5" stroke="#a8c84a" strokeWidth="1.2" fill="rgba(168,200,74,0.04)"/>
      {/* Watching eyes */}
      <circle cx="50" cy="41" r="1.2" fill="#a8c84a" opacity="0.8"/>
      <circle cx="54" cy="41" r="1.2" fill="#a8c84a" opacity="0.8"/>
      <circle cx="50.4" cy="40.6" r="0.5" fill="#060805"/>
      <circle cx="54.4" cy="40.6" r="0.5" fill="#060805"/>
      {/* Flat expression */}
      <line x1="49" y1="44" x2="55" y2="44" stroke="#a8c84a" strokeWidth="0.8" strokeLinecap="round"/>
      {/* Legs dangling */}
      <path d="M48 47 Q46 54 44 58" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M56 47 Q58 54 60 58" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Hat on head */}
      <path d="M47 37 L57 37 L55 32 Q52 30 48 32 Z" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.08)"/>
      <line x1="46" y1="37" x2="58" y2="37" stroke="#a8c84a" strokeWidth="1.2"/>
      {/* Hat collection on ground */}
      {[[18,72,10],[30,71,8],[10,71,7],[22,70,6]].map(([cx,cy,w],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={w/2} ry={2} stroke="#a8c84a" strokeWidth="0.9" fill="rgba(168,200,74,0.06)" opacity="0.6"/>
      ))}
      <text x="20" y="68" textAnchor="middle" fontSize="4" fill="#a8c84a" opacity="0.4">?</text>
      {/* Decorative border */}
      <rect x="4" y="4" width="72" height="72" rx="3" stroke="rgba(168,200,74,0.18)" strokeWidth="0.8" strokeDasharray="4 3"/>
    </svg>
  )
}

// Yash — mysterious figure, goat shadow behind him, deliberately vague
export function YashIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large goat shadow behind */}
      <path d="M44 68 Q44 56 50 48 Q58 40 60 32 Q60 22 54 20 Q50 20 48 24 Q46 20 42 19 Q34 18 34 30 Q34 40 40 48 Q46 56 44 68 Z"
        fill="rgba(168,200,74,0.07)" stroke="rgba(168,200,74,0.25)" strokeWidth="1"/>
      {/* Goat horns */}
      <path d="M38 20 Q34 12 30 14" stroke="rgba(168,200,74,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M48 20 Q52 12 56 14" stroke="rgba(168,200,74,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Goat eyes */}
      <path d="M38 28 Q40 26 42 28" stroke="rgba(168,200,74,0.35)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M50 28 Q52 26 54 28" stroke="rgba(168,200,74,0.35)" strokeWidth="1" strokeLinecap="round"/>
      {/* Main figure — Yash in front, shadowy */}
      <ellipse cx="24" cy="28" rx="8" ry="9" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,0.05)"/>
      {/* Eyes in shadow — just glints */}
      <circle cx="21" cy="27" r="1.5" fill="#a8c84a" opacity="0.5"/>
      <circle cx="27" cy="27" r="1.5" fill="#a8c84a" opacity="0.5"/>
      <circle cx="21.5" cy="26.5" r="0.6" fill="#060805"/>
      <circle cx="27.5" cy="26.5" r="0.6" fill="#060805"/>
      {/* Ambiguous expression */}
      <path d="M20 32 Q24 34 28 32" stroke="#a8c84a" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Yash body — slightly obscured */}
      <path d="M16 37 Q14 52 16 66 L32 66 Q34 52 32 37 Z"
        stroke="#a8c84a" strokeWidth="1.2" fill="rgba(168,200,74,0.04)" strokeDasharray="3 1.5"/>
      {/* "Something" being done — deliberately unclear */}
      <path d="M32 48 Q42 44 48 50" stroke="#a8c84a" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5"/>
      {/* Question marks */}
      <text x="60" y="58" fontSize="8" fill="#a8c84a" opacity="0.25">?</text>
      <text x="8" y="16" fontSize="6" fill="#a8c84a" opacity="0.2">?</text>
      {/* Banned sign (small) */}
      <circle cx="68" cy="14" r="6" stroke="rgba(168,200,74,0.3)" strokeWidth="0.9" fill="none"/>
      <line x1="63.5" y1="9.5" x2="72.5" y2="18.5" stroke="rgba(168,200,74,0.3)" strokeWidth="0.9"/>
      <text x="68" y="12" textAnchor="middle" fontSize="3.5" fill="rgba(168,200,74,0.3)">inn</text>
      {/* Decorative border */}
      <rect x="4" y="4" width="72" height="72" rx="3" stroke="rgba(168,200,74,0.18)" strokeWidth="0.8" strokeDasharray="4 3"/>
    </svg>
  )
}
