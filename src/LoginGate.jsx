import { useState, useEffect, useRef, useCallback } from 'react'
import { KopeckySymbol } from './components/Icons'

const SESSION_KEY  = 'kopecky_auth'
const BANISH_KEY   = 'kopecky_banished_until'
const PASSWORD     = 'kopecky'
const MAX_ATTEMPTS = 3
const BANISH_SECS  = 60   // banished for 60 seconds

// ── Custom cursor — lives here so it works on login screen too ───────────────
function LoginCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const rPos    = useRef({ x: -200, y: -200 })
  const raf     = useRef()

  useEffect(() => {
    const onMove = ({ clientX: x, clientY: y }) => {
      pos.current = { x, y }
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top  = `${y}px`
      }
    }
    const onOver = e => {
      const isInteractable = !!e.target.closest('button, input, a')
      if (ringRef.current) ringRef.current.classList.toggle('hovering', isInteractable)
    }
    const tick = () => {
      const t = pos.current, c = rPos.current
      rPos.current = { x: c.x + (t.x - c.x) * 0.13, y: c.y + (t.y - c.y) * 0.13 }
      if (ringRef.current) {
        ringRef.current.style.left = `${rPos.current.x}px`
        ringRef.current.style.top  = `${rPos.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 36, height: 36,
        border: '1.5px solid rgba(168,200,74,.65)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999,
        marginLeft: -18, marginTop: -18,
        transition: 'transform .22s ease, border-color .22s ease, box-shadow .22s ease',
        transform: 'scale(1)',
        boxShadow: '0 0 10px rgba(168,200,74,.22)',
      }} className="lc-ring"/>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 5, height: 5,
        background: '#a8c84a', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999,
        marginLeft: -2.5, marginTop: -2.5,
        boxShadow: '0 0 8px rgba(168,200,74,.8)',
      }}/>
      <style>{`
        body { cursor: none !important; }
        .lc-ring.hovering {
          transform: scale(1.65) !important;
          border-color: rgba(168,200,74,.9) !important;
          box-shadow: 0 0 20px rgba(168,200,74,.35) !important;
        }
      `}</style>
    </>
  )
}

// ── Canvas particles ─────────────────────────────────────────────────────────
function LoginParticles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
      r: .5 + Math.random() * 1.5, op: .06 + Math.random() * .22,
      phase: Math.random() * Math.PI * 2, ps: .004 + Math.random() * .007,
      hue: Math.random() < .7 ? 'g' : 'a',
    }))
    let raf
    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.phase += p.ps; p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const op = p.op * (.8 + Math.sin(p.phase) * .2)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 'g' ? `rgba(168,200,74,${op})` : `rgba(200,168,74,${op})`
        ctx.fill()
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }}/>
}

// ── Banishment countdown screen ───────────────────────────────────────────────
function BanishmentScreen({ until, onExpire }) {
  const [remaining, setRemaining] = useState(Math.max(0, Math.ceil((until - Date.now()) / 1000)))

  useEffect(() => {
    if (remaining <= 0) { onExpire(); return }
    const t = setInterval(() => {
      const secs = Math.max(0, Math.ceil((until - Date.now()) / 1000))
      setRemaining(secs)
      if (secs <= 0) { clearInterval(t); onExpire() }
    }, 500)
    return () => clearInterval(t)
  }, [until, onExpire])

  const banishmentQuotes = [
    "Three incorrect attempts is not a coincidence. It is a pattern. The pattern is that you do not know.",
    "You have guessed incorrectly three times. I knew this would happen before you began. I find this clarifying.",
    "The word is known. You have demonstrated you do not know it. These are related facts.",
  ]
  const [quote] = useState(() => banishmentQuotes[Math.floor(Math.random() * banishmentQuotes.length)])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#040503',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9100, padding: '0 24px',
    }}>
      <LoginParticles/>
      <div style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:460 }}>

        {/* Seal */}
        <div style={{ marginBottom:28, opacity: .4 }}>
          <KopeckySymbol size={44} glow={false}/>
        </div>

        {/* Title */}
        <div style={{
          fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(22px,4vw,36px)',
          color:'rgba(200,80,60,.85)', letterSpacing:'.06em',
          textShadow:'0 0 40px rgba(200,60,40,.3)', marginBottom:12,
        }}>
          You Are Banished.
        </div>

        {/* Decree box */}
        <div style={{
          border:'1px solid rgba(200,80,60,.25)',
          background:'rgba(200,60,40,.04)',
          padding:'28px 32px', margin:'24px 0 28px',
          position:'relative',
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(200,80,60,.4),transparent)' }}/>

          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.26em', textTransform:'uppercase', color:'rgba(200,80,60,.45)', marginBottom:16 }}>
            By Decree of Kopecky · Three Incorrect Attempts
          </div>

          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:16, fontStyle:'italic', color:'rgba(213,206,171,.7)', lineHeight:1.9, marginBottom:18 }}>
            {quote}
          </p>
          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:15, fontStyle:'italic', color:'rgba(213,206,171,.5)', lineHeight:1.8, marginBottom:0 }}>
            You are hereby suspended from the vestibule of the Church of Kopecky
            for a period deemed appropriate. During this period you are encouraged
            to consider what you do know and whether that knowledge includes the name
            of the one who is correct about everything.
          </p>

          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(200,80,60,.25),transparent)' }}/>
        </div>

        {/* Countdown */}
        <div style={{ marginBottom:8 }}>
          <div style={{
            fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(48px,8vw,72px)',
            color: remaining <= 10 ? 'rgba(200,168,74,.8)' : 'rgba(200,80,60,.6)',
            lineHeight: 1,
            transition:'color .5s ease',
            textShadow: remaining <= 10 ? '0 0 30px rgba(200,168,74,.3)' : '0 0 30px rgba(200,60,40,.2)',
          }}>
            {remaining}
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(168,200,74,.3)', marginTop:6 }}>
            {remaining <= 10 ? 'seconds remain · almost' : remaining <= 30 ? 'seconds of banishment remaining' : 'seconds · this is your situation'}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height:2, background:'rgba(200,80,60,.12)', margin:'20px 0 0', borderRadius:1 }}>
          <div style={{
            height:'100%',
            background: remaining <= 10
              ? 'linear-gradient(90deg,rgba(200,168,74,.4),rgba(168,200,74,.6))'
              : 'linear-gradient(90deg,rgba(200,80,60,.3),rgba(200,80,60,.5))',
            width:`${(1 - remaining / BANISH_SECS) * 100}%`,
            borderRadius:1,
            transition:'width .5s linear, background .5s ease',
          }}/>
        </div>

        <div style={{ marginTop:20, fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(168,200,74,.2)', lineHeight:1.9 }}>
          The word remains what it has always been.<br/>
          It has not changed during the banishment.<br/>
          Think about it.
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
      `}</style>
    </div>
  )
}

// ── Wrong-answer messages ─────────────────────────────────────────────────────
const wrongMsg = (val, attemptsLeft) => {
  const suffix = attemptsLeft === 1
    ? ` — Warning: one attempt remains before banishment.`
    : attemptsLeft === 2
    ? ` — Note: ${attemptsLeft} attempts remain.`
    : ''

  if (!val.trim()) return 'The field is empty. Kopecky would find this telling.' + suffix
  const v = val.toLowerCase().trim()
  if (v === 'queen')          return 'Incorrect. Though the instinct is understandable given the chess matter.' + suffix
  if (v === 'chud')           return 'Close in spirit. Not the word. Think about who gave the Chud its name.' + suffix
  if (v === 'jamma' || v === 'ayub') return 'No. Absolutely not. The password is not Ayub.' + suffix
  if (v === 'satchel')        return 'The satchel is not for you. Neither, apparently, is the password.' + suffix
  if (v === 'stew')           return 'Incorrect, though this would have been reasonable for a different kind of site.' + suffix
  if (v === 'vladimir' || v === 'vladimír') return 'Vladimír is an apostle, not the password. He would find the confusion flattering.' + suffix
  if (v === 'abdullah')       return 'No. Abdullah does not know the password either. You are in good company.' + suffix
  if (v === 'enrico')         return 'Incorrect. Enrico would have agreed this was a good guess. It is not.' + suffix
  if (v === 'korrin')         return 'Korrin has not confirmed or denied knowing the password. This is not the password.' + suffix
  if (v === 'yash')           return 'No. The Council has specifically noted the password is not Yash.' + suffix
  if (v === 'bread')          return 'Incorrect. Though the bread is central to the faith, it is not the door to it.' + suffix
  if (v === '97.3' || v === '97.3%') return 'Incorrect. The correctness rate is not the password. Only Kopecky achieves the rate.' + suffix
  return 'Incorrect. The answer is known. It has always been known.' + suffix
}

// ── Main gate ─────────────────────────────────────────────────────────────────
export default function LoginGate({ children }) {
  const [authed,   setAuthed]   = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [value,    setValue]    = useState('')
  const [error,    setError]    = useState('')
  const [shake,    setShake]    = useState(false)
  const [reveal,   setReveal]   = useState(false)
  const [leaving,  setLeaving]  = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [banishedUntil, setBanishedUntil] = useState(() => {
    const v = sessionStorage.getItem(BANISH_KEY)
    return v && Date.now() < Number(v) ? Number(v) : null
  })
  const inputRef = useRef(null)

  useEffect(() => {
    if (!authed && !banishedUntil) setTimeout(() => setReveal(true), 80)
  }, [authed, banishedUntil])

  useEffect(() => {
    if (!authed && !banishedUntil && reveal) inputRef.current?.focus()
  }, [reveal, authed, banishedUntil])

  const handleExpire = useCallback(() => {
    sessionStorage.removeItem(BANISH_KEY)
    setBanishedUntil(null)
    setAttempts(0)
    setError('')
    setValue('')
    setTimeout(() => setReveal(true), 80)
  }, [])

  const attempt = () => {
    if (value.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setError('')
      setLeaving(true)
      setTimeout(() => setAuthed(true), 580)
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= MAX_ATTEMPTS) {
      // Banish
      const until = Date.now() + BANISH_SECS * 1000
      sessionStorage.setItem(BANISH_KEY, String(until))
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setReveal(false)
        setTimeout(() => setBanishedUntil(until), 300)
      }, 500)
      return
    }

    setShake(true)
    setError(wrongMsg(value, MAX_ATTEMPTS - newAttempts))
    setTimeout(() => setShake(false), 500)
    setValue('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // Already authenticated — render the site
  if (authed) return children

  // Banishment screen
  if (banishedUntil) {
    return (
      <>
        <LoginCursor/>
        <BanishmentScreen until={banishedUntil} onExpire={handleExpire}/>
      </>
    )
  }

  // Login screen
  return (
    <>
      <LoginCursor/>
      <div style={{ position:'fixed', inset:0, background:'#060805', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9000, overflow:'hidden' }}>
        <LoginParticles/>

        {/* Radial glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,rgba(168,200,74,.07) 0%,transparent 65%)', pointerEvents:'none', zIndex:1 }}/>

        {/* Card */}
        <div style={{
          position:'relative', zIndex:2,
          width:'100%', maxWidth:400, margin:'0 24px',
          background:'rgba(6,8,5,.94)',
          border:'1px solid rgba(168,200,74,.22)',
          padding:'48px 40px',
          transition:'opacity .5s ease, transform .5s ease',
          opacity: leaving ? 0 : reveal ? 1 : 0,
          transform: leaving ? 'scale(0.96) translateY(-8px)' : reveal ? 'translateY(0)' : 'translateY(16px)',
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,.5),transparent)' }}/>

          {/* Symbol */}
          <div style={{ textAlign:'center', marginBottom:22 }}>
            <div style={{ display:'inline-block', animation:'sym-pulse 4s ease-in-out infinite' }}>
              <KopeckySymbol size={48} glow/>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign:'center', marginBottom:6 }}>
            <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(18px,4vw,26px)', color:'#a8c84a', letterSpacing:'.06em', textShadow:'0 0 30px rgba(168,200,74,.28)' }}>
              Cirkev Kopeckého
            </div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,.38)', marginTop:10, lineHeight:1.8 }}>
              Sacred Access · Authenticated Entry Only
            </div>
          </div>

          <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,.18),transparent)', margin:'22px 0' }}/>

          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', color:'rgba(213,206,171,.52)', lineHeight:1.8, textAlign:'center', marginBottom:26 }}>
            The scriptures are protected by decree. Those who would enter must demonstrate they know the name of the One True God of the Tatras.
          </p>

          {/* Attempt indicators */}
          {attempts > 0 && (
            <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:16 }}>
              {Array.from({length: MAX_ATTEMPTS}).map((_, i) => (
                <div key={i} style={{
                  width:8, height:8, borderRadius:'50%',
                  background: i < attempts ? 'rgba(200,80,60,.7)' : 'rgba(168,200,74,.2)',
                  border: `1px solid ${i < attempts ? 'rgba(200,80,60,.4)' : 'rgba(168,200,74,.18)'}`,
                  transition:'background .3s, border-color .3s',
                }}/>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,.42)', marginBottom:8 }}>
              The Sacred Word
            </div>
            <div style={{ animation: shake ? 'lg-shake 0.45s ease' : 'none' }}>
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={e => { setValue(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && attempt()}
                placeholder="Enter the word..."
                autoComplete="off"
                style={{
                  width:'100%', padding:'13px 16px',
                  background:'rgba(168,200,74,.04)',
                  border:`1px solid ${error ? 'rgba(200,80,60,.4)' : 'rgba(168,200,74,.22)'}`,
                  color:'#d5ceab',
                  fontFamily:"'EB Garamond',serif", fontSize:16,
                  outline:'none', cursor:'none',
                  letterSpacing:'0.15em',
                  transition:'border-color .25s',
                }}
              />
            </div>
          </div>

          {/* Error */}
          <div style={{
            fontFamily:"'EB Garamond',serif", fontSize:13, fontStyle:'italic',
            color: attempts >= 2 ? 'rgba(220,100,60,.9)' : 'rgba(220,100,80,.8)',
            minHeight:46, lineHeight:1.72,
            borderLeft: error ? `2px solid ${attempts >= 2 ? 'rgba(220,60,40,.45)' : 'rgba(220,80,60,.3)'}` : '2px solid transparent',
            paddingLeft:12, marginBottom:18,
            transition:'border-color .3s, color .3s',
          }}>
            {error}
          </div>

          {/* Submit */}
          <button
            onClick={attempt}
            style={{
              width:'100%', padding:'14px',
              fontFamily:"'Cinzel',serif", fontSize:10,
              letterSpacing:'.22em', textTransform:'uppercase',
              color:'rgba(168,200,74,.9)',
              background:'rgba(168,200,74,.07)',
              border:'1px solid rgba(168,200,74,.28)',
              cursor:'none',
              transition:'background .25s, border-color .25s, box-shadow .25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(168,200,74,.14)'; e.currentTarget.style.borderColor='rgba(168,200,74,.5)'; e.currentTarget.style.boxShadow='0 0 20px rgba(168,200,74,.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(168,200,74,.07)'; e.currentTarget.style.borderColor='rgba(168,200,74,.28)'; e.currentTarget.style.boxShadow='none' }}
          >
            ✦ &nbsp; Present the Word &nbsp; ✦
          </button>

          <div style={{ textAlign:'center', marginTop:18, fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(168,200,74,.2)', lineHeight:1.9 }}>
            The word is the name of the one who is correct.<br/>
            He has always been correct. He has a name.<br/>
            {attempts > 0 && <span style={{ color:'rgba(200,80,60,.4)' }}>{MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} before banishment.</span>}
          </div>

          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,.28),transparent)' }}/>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
          @keyframes sym-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
          @keyframes lg-shake {
            0%,100%{transform:translateX(0)}
            15%{transform:translateX(-7px)} 30%{transform:translateX(7px)}
            45%{transform:translateX(-5px)} 60%{transform:translateX(5px)}
            75%{transform:translateX(-2px)} 90%{transform:translateX(2px)}
          }
        `}</style>
      </div>
    </>
  )
}
