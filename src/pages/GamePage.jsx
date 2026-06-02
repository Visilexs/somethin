import { useState, useEffect, useRef, useCallback } from 'react'
import { TypewriterText } from '../components/StoryAnim'
import { KopeckySymbol } from '../components/Icons'

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const WATER_TARGET   = 8   // jugs needed
const CORRECT_SALT_MIN = 38
const CORRECT_SALT_MAX = 46
const AYUB_WATCH_MS  = 3200
const AYUB_AWAY_MS   = 4500

const AYUB_EXCUSES = [
  "One moment — I must arrange a carrier pigeon to Nitra.",
  "Forgive me, I have to pay for my pigeon subscription.",
  "The store requires my immediate presence. Jamma business.",
  "My carrier pigeon has arrived. This cannot wait.",
  "I must send an urgent message about grain quality.",
  "The pigeon needs feeding. I shall return. Do not touch anything.",
  "A brief errand. My correspondence is extensive.",
  "I have received a pigeon. It concerns something important about me.",
]

const KOPECKY_STEAL = [
  "Correct. He is not watching.",
  "Efficient.",
  "He suspects nothing. As expected.",
  "The water is mine. It was always mine.",
  "He has gone to pay for pigeons. I have taken the water. These facts are related.",
]

const KOPECKY_CAUGHT = [
  "He looked back too soon. I knew this was possible. I planned for it.",
  "A temporary setback within a broader field of success.",
  "He has seen me. I will wait. I have patience. The Chud has patience.",
  "This is a local error. The field remains large.",
]

const SALT_COMMENTARY = (salt) => {
  if (salt < 20) return { msg: "This is essentially unseasoned water in bread form. Start again.", ok: false }
  if (salt < CORRECT_SALT_MIN) return { msg: "Under-salted. The bread lacks conviction. Like Enrico.", ok: false }
  if (salt <= CORRECT_SALT_MAX) return { msg: "Correct. This is the correct amount of salt. I knew you would get there.", ok: true }
  if (salt < 65) return { msg: "Over-salted. The bread is ruined. This is exactly what I warn about.", ok: false }
  return { msg: "This is salt with bread in it, not bread with salt. You have created a different thing.", ok: false }
}

// ── AYUB SVG (inline, simplified for game context) ─────────────────────────
function AyubSprite({ looking, size = 60 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" fill="none" style={{ transition: 'transform .4s ease', transform: looking ? 'scaleX(1)' : 'scaleX(-1)' }}>
      {/* Crown */}
      <path d="M16 24 L21 16 L26 22 L30 12 L34 22 L39 16 L44 24Z" stroke="#c8a84a" strokeWidth="1.2" fill="rgba(200,168,74,.12)" strokeLinejoin="round"/>
      <circle cx="30" cy="12" r="2" fill="#c8a84a" opacity=".8"/>
      {/* Head */}
      <ellipse cx="30" cy="33" rx="9" ry="10" stroke="#c8a84a" strokeWidth="1.2" fill="rgba(200,168,74,.08)"/>
      {/* Smug face */}
      <path d="M25 33 Q27 31 29 33" stroke="#c8a84a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M31 33 Q33 31 35 33" stroke="#c8a84a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M26 39 Q30 43 34 39" stroke="#c8a84a" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <path d="M18 50 Q20 43 22 42 Q30 46 38 42 Q40 43 42 50 L40 72 L20 72Z" stroke="#c8a84a" strokeWidth="1.2" fill="rgba(200,168,74,.06)"/>
      {/* Water jugs he's guarding */}
      <ellipse cx="50" cy="66" rx="5" ry="7" stroke="rgba(100,180,220,.6)" strokeWidth="1" fill="rgba(80,140,180,.12)"/>
      <ellipse cx="50" cy="60" rx="4" ry="2" stroke="rgba(100,180,220,.5)" strokeWidth=".8"/>
      <line x1="50" y1="58" x2="50" y2="55" stroke="rgba(100,180,220,.5)" strokeWidth=".8"/>
    </svg>
  )
}

function KopeckySprite({ stealing, size = 56 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 56 78" fill="none"
      style={{ transition: 'transform .35s ease', transform: stealing ? 'translateX(20px)' : 'translateX(0)' }}>
      {/* Halo/symbol above */}
      <g opacity=".6">
        <line x1="28" y1="4" x2="28" y2="12" stroke="#a8c84a" strokeWidth="1.2"/>
        <line x1="22" y1="7" x2="34" y2="7" stroke="#a8c84a" strokeWidth="1"/>
        <line x1="24" y1="10" x2="32" y2="10" stroke="#a8c84a" strokeWidth=".8"/>
      </g>
      {/* Head — wise, stern */}
      <ellipse cx="28" cy="24" rx="9" ry="10" stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,.06)"/>
      {/* Expression — authoritative */}
      <line x1="22" y1="23" x2="26" y2="23" stroke="#a8c84a" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="30" y1="23" x2="34" y2="23" stroke="#a8c84a" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="24" y1="29" x2="32" y2="29" stroke="#a8c84a" strokeWidth=".9" strokeLinecap="round"/>
      {/* Cloak/robe */}
      <path d="M14 40 Q16 34 19 33 Q28 37 37 33 Q40 34 42 40 L44 72 L12 72Z"
        stroke="#a8c84a" strokeWidth="1.3" fill="rgba(168,200,74,.05)"/>
      {/* Satchel */}
      <rect x="36" y="44" width="9" height="10" rx="1.5" stroke="#a8c84a" strokeWidth=".9" fill="rgba(168,200,74,.08)"/>
      {/* Outstretched arm when stealing */}
      {stealing && <path d="M42 42 L54 46" stroke="#a8c84a" strokeWidth="1.4" strokeLinecap="round"/>}
      {!stealing && <path d="M40 44 L46 50" stroke="#a8c84a" strokeWidth="1.1" strokeLinecap="round"/>}
    </svg>
  )
}

// ── WATER JUG ───────────────────────────────────────────────────────────────
function WaterJug({ filled }) {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
      <ellipse cx="14" cy="30" rx="10" ry="5" stroke={filled ? 'rgba(100,180,220,.8)' : 'rgba(168,200,74,.3)'} strokeWidth="1" fill={filled ? 'rgba(80,140,180,.25)' : 'rgba(168,200,74,.05)'}/>
      <path d="M4 30 L4 12 Q4 8 14 8 Q24 8 24 12 L24 30" stroke={filled ? 'rgba(100,180,220,.7)' : 'rgba(168,200,74,.25)'} strokeWidth="1" fill={filled ? 'rgba(80,140,180,.15)' : 'transparent'}/>
      <ellipse cx="14" cy="8" rx="10" ry="4" stroke={filled ? 'rgba(100,180,220,.7)' : 'rgba(168,200,74,.25)'} strokeWidth="1"/>
      <line x1="14" y1="4" x2="14" y2="8" stroke={filled ? 'rgba(100,180,220,.7)' : 'rgba(168,200,74,.25)'} strokeWidth="1"/>
    </svg>
  )
}

// ── PHASE 1: WATER THEFT ────────────────────────────────────────────────────
function WaterPhase({ onComplete }) {
  const [ayubLooking, setAyubLooking] = useState(true)
  const [waterCount,  setWaterCount]  = useState(0)
  const [stealing,    setStealing]    = useState(false)
  const [message,     setMessage]     = useState("Ayub is distracted by his own reflection. Wait for him to look away.")
  const [msgType,     setMsgType]     = useState('neutral')  // neutral | success | fail
  const [excuse,      setExcuse]      = useState('')
  const [caught,      setCaught]      = useState(false)
  const timerRef = useRef()
  const waterRef = useRef(0)

  const showMsg = (msg, type = 'neutral') => {
    setMessage(msg)
    setMsgType(type)
  }

  const cycleAyub = useCallback(() => {
    clearTimeout(timerRef.current)
    // Look away
    setAyubLooking(false)
    const ex = AYUB_EXCUSES[Math.floor(Math.random() * AYUB_EXCUSES.length)]
    setExcuse(ex)
    showMsg(`Ayub: "${ex}"`, 'neutral')

    timerRef.current = setTimeout(() => {
      setExcuse('')
      setAyubLooking(true)
      showMsg("Ayub has returned. He suspects nothing, which he considers a testament to your transparency.", 'neutral')
      timerRef.current = setTimeout(cycleAyub, AYUB_WATCH_MS + Math.random() * 1500)
    }, AYUB_AWAY_MS + Math.random() * 2000)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(cycleAyub, AYUB_WATCH_MS)
    return () => clearTimeout(timerRef.current)
  }, [cycleAyub])

  const attemptSteal = () => {
    if (stealing) return
    if (ayubLooking) {
      setCaught(true)
      const msg = KOPECKY_CAUGHT[Math.floor(Math.random() * KOPECKY_CAUGHT.length)]
      showMsg(msg, 'fail')
      setTimeout(() => setCaught(false), 1200)
      return
    }
    setStealing(true)
    setTimeout(() => {
      setStealing(false)
      const next = waterRef.current + 1
      waterRef.current = next
      setWaterCount(next)
      const msg = KOPECKY_STEAL[Math.floor(Math.random() * KOPECKY_STEAL.length)]
      showMsg(msg, 'success')
      if (next >= WATER_TARGET) {
        clearTimeout(timerRef.current)
        setTimeout(() => onComplete(), 800)
      }
    }, 400)
  }

  return (
    <div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,.5)', marginBottom:20, textAlign:'center' }}>
        Phase I — The Acquisition
      </div>

      {/* Scene */}
      <div style={{ position:'relative', height:180, background:'rgba(168,200,74,0.03)', border:'1px solid rgba(168,200,74,0.12)', borderRadius:2, marginBottom:20, overflow:'hidden' }}>
        {/* Ground line */}
        <div style={{ position:'absolute', bottom:24, left:0, right:0, height:1, background:'rgba(168,200,74,0.15)' }}/>

        {/* Kopecky (left) */}
        <div style={{ position:'absolute', bottom:24, left:40, cursor:'none' }}>
          <KopeckySprite stealing={stealing} size={52}/>
        </div>

        {/* Ayub (right) */}
        <div style={{ position:'absolute', bottom:24, right:60 }}>
          <AyubSprite looking={ayubLooking} size={52}/>
        </div>

        {/* Water jugs display */}
        <div style={{ position:'absolute', bottom:24, right:20, display:'flex', flexDirection:'column', gap:2 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, color:'rgba(100,180,220,.5)', letterSpacing:'.12em', textAlign:'center' }}>WATER</div>
          <div style={{ display:'flex', gap:3 }}>
            {[0,1,2].map(i => <WaterJug key={i} filled={false}/>)}
          </div>
        </div>

        {/* Ayub looking indicator */}
        <div style={{ position:'absolute', top:16, right:70, transition:'all .4s' }}>
          <div style={{
            fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.14em',
            color: ayubLooking ? 'rgba(220,80,60,.8)' : 'rgba(168,200,74,.7)',
            background: ayubLooking ? 'rgba(220,80,60,.08)' : 'rgba(168,200,74,.08)',
            border: `1px solid ${ayubLooking ? 'rgba(220,80,60,.25)' : 'rgba(168,200,74,.25)'}`,
            padding:'4px 10px',
          }}>
            {ayubLooking ? '● WATCHING' : '○ DISTRACTED'}
          </div>
        </div>

        {/* Excuse bubble */}
        {excuse && (
          <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', background:'rgba(6,8,5,.9)', border:'1px solid rgba(200,168,74,.3)', padding:'6px 14px', maxWidth:240, textAlign:'center' }}>
            <div style={{ fontFamily:"'EB Garamond',serif", fontSize:12, fontStyle:'italic', color:'rgba(213,206,171,.7)', lineHeight:1.5 }}>{excuse}</div>
          </div>
        )}

        {/* Caught flash */}
        {caught && (
          <div style={{ position:'absolute', inset:0, background:'rgba(220,60,40,.06)', border:'1px solid rgba(220,60,40,.2)', display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
            <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:18, color:'rgba(220,80,60,.9)' }}>CAUGHT</div>
          </div>
        )}
      </div>

      {/* Water progress */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(100,180,220,.6)' }}>Water Acquired</span>
          <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:14, color:'rgba(100,180,220,.8)' }}>{waterCount}/{WATER_TARGET}</span>
        </div>
        <div style={{ height:6, background:'rgba(168,200,74,.08)', border:'1px solid rgba(100,180,220,.2)', borderRadius:1 }}>
          <div style={{ height:'100%', background:'linear-gradient(90deg,rgba(80,140,200,.5),rgba(120,180,240,.7))', width:`${(waterCount/WATER_TARGET)*100}%`, transition:'width .4s ease', borderRadius:1 }}/>
        </div>
        <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
          {Array.from({length:WATER_TARGET}).map((_,i) => <WaterJug key={i} filled={i < waterCount}/>)}
        </div>
      </div>

      {/* Message */}
      <div style={{ fontFamily:"'EB Garamond',serif", fontSize:15, fontStyle:'italic', lineHeight:1.7, minHeight:46,
        color: msgType==='success' ? 'rgba(168,200,74,.85)' : msgType==='fail' ? 'rgba(220,120,80,.85)' : 'rgba(213,206,171,.6)',
        borderLeft:`2px solid ${msgType==='success'?'rgba(168,200,74,.4)':msgType==='fail'?'rgba(220,80,60,.3)':'rgba(168,200,74,.15)'}`,
        paddingLeft:14, marginBottom:20, transition:'color .3s, border-color .3s',
      }}>{message}</div>

      {/* Action button */}
      <button
        onClick={attemptSteal}
        style={{
          width:'100%', padding:'16px', fontFamily:"'Cinzel',serif", fontSize:11,
          letterSpacing:'.22em', textTransform:'uppercase',
          background: ayubLooking ? 'rgba(220,80,60,.06)' : 'rgba(168,200,74,.08)',
          border: `1px solid ${ayubLooking ? 'rgba(220,80,60,.25)' : 'rgba(168,200,74,.3)'}`,
          color: ayubLooking ? 'rgba(220,100,80,.7)' : 'rgba(168,200,74,.9)',
          cursor:'none', transition:'all .3s',
        }}
      >
        {ayubLooking ? '⚠ Ayub Is Watching — Wait' : '↗ Acquire Water (Spacebar)'}
      </button>

      <div style={{ marginTop:10, fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(168,200,74,.28)', textAlign:'center' }}>
        Also works with Spacebar · Acquire {WATER_TARGET} jugs to proceed to bread
      </div>
    </div>
  )
}

// ── PHASE 2: BREAD & SALT ───────────────────────────────────────────────────
function BreadPhase({ onComplete, onFail }) {
  const [salt,       setSalt]       = useState(50)
  const [submitted,  setSubmitted]  = useState(false)
  const [result,     setResult]     = useState(null)
  const [kneading,   setKneading]   = useState(false)

  const handleSubmit = () => {
    setKneading(true)
    setTimeout(() => {
      setKneading(false)
      const r = SALT_COMMENTARY(salt)
      setResult(r)
      setSubmitted(true)
      if (r.ok) setTimeout(() => onComplete(), 2200)
      else setTimeout(() => onFail(), 2800)
    }, 1200)
  }

  const saltLabel = () => {
    if (salt < 20) return 'Absurdly Under-Salted'
    if (salt < CORRECT_SALT_MIN) return 'Under-Salted'
    if (salt <= CORRECT_SALT_MAX) return 'Correct'
    if (salt < 65) return 'Over-Salted'
    return 'Criminal'
  }

  const saltColor = () => {
    if (salt >= CORRECT_SALT_MIN && salt <= CORRECT_SALT_MAX) return 'rgba(168,200,74,.85)'
    if (salt > 55 || salt < 25) return 'rgba(220,80,60,.85)'
    return 'rgba(200,168,74,.75)'
  }

  return (
    <div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,.5)', marginBottom:20, textAlign:'center' }}>
        Phase II — The Bread
      </div>

      {/* Bread scene */}
      <div style={{ position:'relative', height:140, background:'rgba(168,200,74,.03)', border:'1px solid rgba(168,200,74,.1)', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 40px' }}>
        {/* Kopecky at the table */}
        <div style={{ transition:'transform .3s', transform: kneading ? 'translateY(-4px)' : 'translateY(0)' }}>
          <KopeckySprite stealing={false} size={48}/>
        </div>

        {/* Bread loaf */}
        <div style={{ textAlign:'center' }}>
          <svg width="90" height="56" viewBox="0 0 90 56" fill="none">
            <ellipse cx="45" cy="40" rx="42" ry="14" fill="rgba(180,130,60,.15)" stroke="rgba(180,130,60,.4)" strokeWidth="1"/>
            <ellipse cx="45" cy="32" rx="38" ry="18"
              fill={`rgba(${kneading?'200,160,80':'170,120,50'},.15)`}
              stroke={`rgba(${kneading?'220,180,80':'180,130,50'},.5)`}
              strokeWidth="1.2"
              style={{transition:'all .3s'}}/>
            {/* Score lines */}
            <path d="M25 30 Q45 24 65 30" stroke="rgba(180,130,60,.35)" strokeWidth=".8" fill="none"/>
            <path d="M30 36 Q45 30 60 36" stroke="rgba(180,130,60,.25)" strokeWidth=".6" fill="none"/>
            {/* Salt crystals overlay */}
            {Array.from({length:Math.min(Math.floor(salt/6),15)}).map((_,i)=>(
              <circle key={i} cx={25+i*3+Math.sin(i)*4} cy={28+Math.cos(i*2)*6}
                r=".8" fill="rgba(255,255,255,.35)"/>
            ))}
          </svg>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(180,130,60,.5)', marginTop:4 }}>
            The Bread
          </div>
        </div>

        {/* Salt shaker */}
        <div style={{ textAlign:'center' }}>
          <svg width="30" height="48" viewBox="0 0 30 48" fill="none">
            <ellipse cx="15" cy="40" rx="10" ry="7" stroke="rgba(255,255,255,.3)" strokeWidth="1" fill="rgba(255,255,255,.06)"/>
            <rect x="5" y="14" width="20" height="26" rx="3" stroke="rgba(255,255,255,.3)" strokeWidth="1" fill="rgba(255,255,255,.05)"/>
            <ellipse cx="15" cy="14" rx="10" ry="4" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
            <circle cx="12" cy="10" r="1" fill="rgba(255,255,255,.4)"/>
            <circle cx="15" cy="9" r="1" fill="rgba(255,255,255,.4)"/>
            <circle cx="18" cy="10" r="1" fill="rgba(255,255,255,.4)"/>
          </svg>
          <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:12, color:'rgba(255,255,255,.5)', marginTop:2 }}>{salt}</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.3)' }}>grains</div>
        </div>
      </div>

      {/* Salt slider */}
      {!submitted && (
        <>
          <div style={{ marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(168,200,74,.5)' }}>Salt Quantity</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.1em', color:saltColor(), transition:'color .3s' }}>
              {saltLabel()}
            </span>
          </div>
          <div style={{ position:'relative', marginBottom:6 }}>
            <input
              type="range" min="0" max="100" value={salt}
              onChange={e => setSalt(Number(e.target.value))}
              style={{ width:'100%', accentColor:'#a8c84a', cursor:'none' }}
            />
            {/* Target zone hint — just a subtle marker */}
            <div style={{ position:'absolute', bottom:-8, left:`${CORRECT_SALT_MIN}%`, width:`${CORRECT_SALT_MAX-CORRECT_SALT_MIN}%`, height:3, background:'rgba(168,200,74,.2)', borderRadius:1 }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, color:'rgba(168,200,74,.3)' }}>None</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, color:'rgba(168,200,74,.3)', letterSpacing:'.1em' }}>KOPECKY APPROVED ZONE</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, color:'rgba(168,200,74,.3)' }}>Maximum</span>
          </div>

          <div style={{ fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', color:'rgba(213,206,171,.5)', lineHeight:1.7, marginBottom:20, paddingLeft:14, borderLeft:'2px solid rgba(168,200,74,.15)' }}>
            "The correct amount of salt is known. It is not a matter of preference. It is a matter of being correct or incorrect. Adjust accordingly."
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, color:'rgba(168,200,74,.35)', letterSpacing:'.1em', marginTop:6, fontStyle:'normal' }}>
              — Kopecky · On the matter of bread · All occasions
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={kneading}
            style={{ width:'100%', padding:'16px', fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', background:'rgba(168,200,74,.08)', border:'1px solid rgba(168,200,74,.3)', color:'rgba(168,200,74,.9)', cursor:'none', opacity:kneading?0.5:1 }}
          >
            {kneading ? 'Baking...' : 'Present Bread to Kopecky'}
          </button>
        </>
      )}

      {/* Result */}
      {submitted && result && (
        <div style={{ textAlign:'center', padding:'24px 0' }}>
          <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:24, color:result.ok ? 'var(--g)' : 'rgba(220,80,60,.8)', marginBottom:16 }}>
            {result.ok ? 'Acceptable.' : 'Incorrect.'}
          </div>
          <div style={{ fontFamily:"'EB Garamond',serif", fontSize:17, fontStyle:'italic', color:'rgba(213,206,171,.75)', lineHeight:1.8, maxWidth:380, margin:'0 auto', borderLeft:`2px solid ${result.ok?'rgba(168,200,74,.4)':'rgba(220,80,60,.3)'}`, paddingLeft:16 }}>
            {result.msg}
          </div>
          {!result.ok && (
            <div style={{ marginTop:16, fontFamily:"'Cinzel',serif", fontSize:9, color:'rgba(168,200,74,.4)', letterSpacing:'.16em' }}>
              Returning to salt calibration...
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── WIN SCREEN ───────────────────────────────────────────────────────────────
function WinScreen({ onRestart }) {
  return (
    <div style={{ textAlign:'center', padding:'32px 0' }}>
      <div style={{ marginBottom:20, filter:'drop-shadow(0 0 30px rgba(168,200,74,.5))', animation:'sym-pulse 3s ease-in-out infinite' }}>
        <KopeckySymbol size={56} glow/>
      </div>
      <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:28, color:'var(--g)', marginBottom:8, textShadow:'0 0 40px rgba(168,200,74,.3)' }}>
        Bread Approved.
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,.45)', marginBottom:28 }}>
        Kopecky has assessed the bread. The bread is correct.
      </div>
      <div style={{ background:'rgba(168,200,74,.04)', border:'1px solid rgba(168,200,74,.18)', padding:'24px 28px', marginBottom:28, maxWidth:380, margin:'0 auto 28px' }}>
        <p style={{ fontFamily:"'EB Garamond',serif", fontSize:16, fontStyle:'italic', color:'rgba(168,200,74,.8)', lineHeight:1.85, marginBottom:12 }}>
          "The bread is correct. The salt is correct. The water was Ayub's and is now mine and has become bread, which is a better use of it than anything Ayub would have done. You have done this correctly. I have noted it."
        </p>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.16em', color:'rgba(168,200,74,.4)', textTransform:'uppercase' }}>
          — Kopecky · Post-Assessment Commentary
        </div>
      </div>
      <button onClick={onRestart} className="back-btn">
        Play Again — He Will Approve Again
      </button>
    </div>
  )
}

// ── MAIN GAME COMPONENT ──────────────────────────────────────────────────────
const clamp = (min, max) => `clamp(${min}px, 3vw, ${max}px)`

export default function GamePage({ setPage }) {
  const [phase,    setPhase]    = useState('intro')  // intro | water | bread | win
  const [attempts, setAttempts] = useState(0)

  // Spacebar support for water phase
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && phase === 'water') {
        e.preventDefault()
        document.getElementById('steal-btn')?.click()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase])

  return (
    <>
      <div className="page-hero" style={{ borderBottomColor:'rgba(200,168,74,.2)' }}>
        <div className="page-hero-label">By Holy Request of Kopecky · Year Eleven of the Walking</div>
        <div className="page-hero-title"><TypewriterText text="Waring Frames" speed={20}/></div>
        <div className="page-hero-sub">
          A Game of Acquisition · Sanctioned by the Church · Requested by Kopecky Personally ·
          He Finds the Entire Premise Amusing
        </div>
      </div>

      <div className="main-wrap" style={{ paddingTop:48, maxWidth:620 }}>

        {/* Lore header */}
        <div style={{ background:'rgba(200,168,74,.04)', border:'1px solid rgba(200,168,74,.18)', padding:'20px 24px', marginBottom:36, textAlign:'center' }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(200,168,74,.4)', marginBottom:10 }}>
            Church Notice · From the Council of Devín
          </div>
          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', color:'rgba(213,206,171,.65)', lineHeight:1.8 }}>
            Kopecky, upon reviewing the Church's digital scripture, expressed specific interest in
            the inclusion of an interactive game. He stated the premise should involve "taking something
            from Ayub, because Ayub has enough things." He approved the final design. He said it was
            <em style={{color:'rgba(200,168,74,.75)'}}> "adequate, which is better than Ayub deserves."</em>
          </p>
        </div>

        {/* Game container */}
        <div style={{ background:'rgba(6,8,5,.6)', border:'1px solid rgba(168,200,74,.18)', padding:'28px 24px', marginBottom:32 }}>

          {phase === 'intro' && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:clamp(18,26), color:'var(--g)', marginBottom:12 }}>
                The Mission of Kopecky
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:24, textAlign:'left' }}>
                {[
                  { n:'I', title:'The Acquisition', body:'Ayub guards his water but is frequently distracted by carrier pigeon correspondence. Steal water while he is away. Do not get caught.' },
                  { n:'II', title:'The Bread', body:'Once sufficient water is acquired, Kopecky will make bread. The bread must be salted correctly. He is very clear about what correctly means.' },
                ].map(s => (
                  <div key={s.n} style={{ background:'rgba(168,200,74,.04)', border:'1px solid rgba(168,200,74,.12)', padding:'16px 14px' }}>
                    <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:20, color:'rgba(168,200,74,.18)', marginBottom:6 }}>{s.n}</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:'var(--g)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>{s.title}</div>
                    <div style={{ fontSize:13, color:'var(--txd)', lineHeight:1.7 }}>{s.body}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', color:'rgba(213,206,171,.55)', lineHeight:1.7, marginBottom:24, borderLeft:'2px solid rgba(168,200,74,.2)', paddingLeft:14, textAlign:'left' }}>
                "Ayub's water would be better used for bread. I have always said this. The water allocation is incorrect. This game corrects it."
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, color:'rgba(168,200,74,.35)', letterSpacing:'.12em', marginTop:6, fontStyle:'normal' }}>
                  — Kopecky · On the occasion of requesting this game · Year Eleven
                </div>
              </div>
              <button className="cta-btn" onClick={() => setPhase('water')} style={{ width:'100%', padding:18 }}>
                ✦ &nbsp; Begin — Take the Water &nbsp; ✦
              </button>
            </div>
          )}

          {phase === 'water' && (
            <div id="water-phase">
              <WaterPhase onComplete={() => setPhase('bread')} />
              <button id="steal-btn" style={{ display:'none' }} onClick={() => document.getElementById('water-phase')?.querySelector('button:last-of-type')?.click()}/>
            </div>
          )}

          {phase === 'bread' && (
            <BreadPhase
              onComplete={() => setPhase('win')}
              onFail={() => { setAttempts(a => a+1); setPhase('bread') }}
            />
          )}

          {phase === 'win' && (
            <WinScreen onRestart={() => { setPhase('intro'); setAttempts(0) }} />
          )}
        </div>

        {attempts > 0 && phase !== 'win' && (
          <div style={{ textAlign:'center', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(168,200,74,.28)', marginBottom:24 }}>
            Salt Attempts: {attempts} — {attempts < 3 ? 'Kopecky is waiting' : attempts < 6 ? 'Kopecky has sighed once' : 'Kopecky has sighed twice and looked at the ceiling'}
          </div>
        )}

        <div style={{ textAlign:'center', paddingBottom:60 }}>
          <button className="back-btn" onClick={() => setPage('home')}>← Return to Scripture</button>
        </div>
      </div>

      <footer>© Cirkev Kopeckého · Waring Frames · Sanctioned by Kopecky · Ayub Is Unaware This Game Exists · The Church Prefers It That Way</footer>
    </>
  )
}
