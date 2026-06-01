import { useState, useEffect, useRef } from 'react'
import { KopeckySymbol } from './components/Icons'

const KEY = 'kopecky_auth'
const PASSWORD = 'kopecky'

// Particles for login background — lightweight, no canvas
function LoginParticles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: .5 + Math.random() * 1.4, op: .06 + Math.random() * .2,
      phase: Math.random() * Math.PI * 2, ps: .004 + Math.random() * .006,
    }))

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.phase += p.ps
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const op = p.op * (.8 + Math.sin(p.phase) * .2)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168,200,74,${op})`; ctx.fill()
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:0 }}/>
}

export default function LoginGate({ children }) {
  const [authed,  setAuthed]  = useState(() => sessionStorage.getItem(KEY) === '1')
  const [value,   setValue]   = useState('')
  const [error,   setError]   = useState('')
  const [shake,   setShake]   = useState(false)
  const [reveal,  setReveal]  = useState(false)
  const [leaving, setLeaving] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!authed) setTimeout(() => setReveal(true), 80)
  }, [authed])

  useEffect(() => {
    if (!authed && reveal) inputRef.current?.focus()
  }, [reveal, authed])

  const attempt = () => {
    if (value.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem(KEY, '1')
      setError('')
      setLeaving(true)
      setTimeout(() => setAuthed(true), 600)
    } else {
      setShake(true)
      setError(
        value === ''
          ? 'The field is empty. Kopecky would find this telling.'
          : value.toLowerCase() === 'queen'
          ? 'Incorrect. Though the instinct is understandable given the chess matter.'
          : value.toLowerCase() === 'chud'
          ? 'Close in spirit. Not the word. Think about who gave the Chud its name.'
          : value.toLowerCase() === 'jamma' || value.toLowerCase() === 'ayub'
          ? 'No. Absolutely not. The password is not Ayub.'
          : value.toLowerCase() === 'satchel'
          ? 'The satchel is not for you. Neither, apparently, is the password.'
          : value.toLowerCase() === 'stew'
          ? 'Incorrect, though this would have been a reasonable guess for a different kind of site.'
          : 'Incorrect. The answer is known. It has always been known.'
      )
      setTimeout(() => setShake(false), 500)
      setValue('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  if (authed) return children

  return (
    <div style={{ position:'fixed', inset:0, background:'#060805', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9000, overflow:'hidden' }}>
      <LoginParticles/>

      {/* Radial glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(168,200,74,0.07) 0%, transparent 65%)', pointerEvents:'none', zIndex:1 }}/>

      {/* Card */}
      <div style={{
        position:'relative', zIndex:2,
        width:'100%', maxWidth:400,
        margin:'0 24px',
        background:'rgba(6,8,5,0.92)',
        border:'1px solid rgba(168,200,74,0.22)',
        padding:'48px 40px',
        transition:'opacity .5s ease, transform .5s ease',
        opacity: leaving ? 0 : reveal ? 1 : 0,
        transform: leaving ? 'scale(0.96) translateY(-8px)' : reveal ? 'translateY(0)' : 'translateY(16px)',
      }}>
        {/* Top border shimmer */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, rgba(168,200,74,0.5), transparent)' }}/>

        {/* Symbol */}
        <div style={{ textAlign:'center', marginBottom:24, animation:'sym-pulse 4s ease-in-out infinite' }}>
          <KopeckySymbol size={52} glow/>
        </div>

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:8 }}>
          <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(18px,4vw,26px)', color:'#a8c84a', letterSpacing:'.06em', textShadow:'0 0 30px rgba(168,200,74,0.3)' }}>
            Cirkev Kopeckého
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,0.4)', marginTop:10, lineHeight:1.8 }}>
            Sacred Access · Authenticated Entry Only
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(168,200,74,0.18), transparent)', margin:'24px 0' }}/>

        {/* Lore text */}
        <p style={{ fontFamily:"'EB Garamond',serif", fontSize:14, fontStyle:'italic', color:'rgba(213,206,171,0.55)', lineHeight:1.8, textAlign:'center', marginBottom:28 }}>
          The scriptures are protected by decree. Those who would enter must demonstrate they know the name of the One True God of the Tatras.
        </p>

        {/* Input */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,0.45)', marginBottom:8 }}>
            The Sacred Word
          </div>
          <div style={{
            animation: shake ? 'login-shake 0.45s ease' : 'none',
          }}>
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
                background:'rgba(168,200,74,0.04)',
                border:`1px solid ${error ? 'rgba(220,80,60,0.4)' : 'rgba(168,200,74,0.22)'}`,
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
          color:'rgba(220,100,80,0.8)',
          minHeight:40, lineHeight:1.7,
          borderLeft: error ? '2px solid rgba(220,80,60,0.3)' : '2px solid transparent',
          paddingLeft:12, marginBottom:20,
          transition:'border-color .3s',
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
            color:'rgba(168,200,74,0.9)',
            background:'rgba(168,200,74,0.07)',
            border:'1px solid rgba(168,200,74,0.28)',
            cursor:'none',
            transition:'background .25s, border-color .25s, box-shadow .25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(168,200,74,0.14)'; e.currentTarget.style.borderColor='rgba(168,200,74,0.5)'; e.currentTarget.style.boxShadow='0 0 20px rgba(168,200,74,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(168,200,74,0.07)'; e.currentTarget.style.borderColor='rgba(168,200,74,0.28)'; e.currentTarget.style.boxShadow='none' }}
        >
          ✦ &nbsp; Present the Word &nbsp; ✦
        </button>

        {/* Hint */}
        <div style={{ textAlign:'center', marginTop:20, fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(168,200,74,0.2)', lineHeight:1.9 }}>
          The word is the name of the one who is correct.<br/>
          He has always been correct. He has a name.
        </div>

        {/* Bottom border shimmer */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, rgba(168,200,74,0.3), transparent)' }}/>
      </div>

      <style>{`
        @keyframes login-shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-8px); }
          30%      { transform: translateX(8px); }
          45%      { transform: translateX(-6px); }
          60%      { transform: translateX(6px); }
          75%      { transform: translateX(-3px); }
          90%      { transform: translateX(3px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
      `}</style>
    </div>
  )
}
