/**
 * React Bits — hand-implemented component library
 * SplitText, BlurText, ShinyButton, SpotlightCard,
 * MagnetButton, GradientText, ScrollReveal, CountUp,
 * FloatingOrbs, TextRevealByWord
 */
import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Shared IntersectionObserver helper ──────────────────────────────────────
function useIntersect(threshold = 0.05, once = true) {
  const ref = useRef(null)
  const [hit, setHit] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fb = setTimeout(() => setHit(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHit(true); clearTimeout(fb); if (once) obs.disconnect() }
    }, { threshold, rootMargin: '0px 0px 0px 0px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return [ref, hit]
}

// ─── SplitText ────────────────────────────────────────────────────────────────
// Animates each character in with a stagger
export function SplitText({
  text,
  className = '',
  style = {},
  charDelay = 28,   // ms between chars
  initialDelay = 0, // ms before first char
  tag: Tag = 'span',
}) {
  const [ref, hit] = useIntersect(0.05)
  const chars = Array.from(text)

  return (
    <Tag ref={ref} className={className} style={{ display: 'block', ...style }}>
      {chars.map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
            opacity: hit ? 1 : 0,
            transform: hit ? 'translateY(0px)' : 'translateY(12px)',
            transition: `opacity .45s ease ${initialDelay + i * charDelay}ms,
                         transform .45s ease ${initialDelay + i * charDelay}ms`,
          }}
        >{ch}</span>
      ))}
    </Tag>
  )
}

// ─── BlurText ─────────────────────────────────────────────────────────────────
// Each word blurs in sequentially
export function BlurText({
  text,
  className = '',
  style = {},
  wordDelay = 80,
  tag: Tag = 'span',
}) {
  const [ref, hit] = useIntersect(0.05)
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} style={{ display: 'block', ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.28em' }}>
          <span style={{
            display: 'inline-block',
            opacity: hit ? 1 : 0,
            filter: hit ? 'blur(0px)' : 'blur(6px)',
            transform: hit ? 'translateY(0px)' : 'translateY(6px)',
            transition: `opacity .55s ease ${i * wordDelay}ms,
                         filter .55s ease ${i * wordDelay}ms,
                         transform .55s ease ${i * wordDelay}ms`,
          }}>{w}</span>
        </span>
      ))}
    </Tag>
  )
}

// ─── GradientText ─────────────────────────────────────────────────────────────
// Animated moving gradient on text
export function GradientText({ text, colors, className = '', style = {}, speed = 6 }) {
  const gradient = colors
    ? `linear-gradient(135deg, ${colors.join(', ')})`
    : 'linear-gradient(135deg, #a8c84a, #c8a84a, #a8c84a, #d0e870)'
  return (
    <span className={className} style={{
      backgroundImage: gradient,
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      animation: `gt-shift ${speed}s linear infinite`,
      display: 'inline-block',
      ...style,
    }}>
      {text}
      <style>{`
        @keyframes gt-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  )
}

// ─── ShinyButton ──────────────────────────────────────────────────────────────
// Sweeping shine on hover
export function ShinyButton({ children, onClick, className = '', style = {}, amber = false }) {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }, [])

  const c = amber ? '200,168,74' : '168,200,74'
  const dark = amber ? 'rgba(200,168,74,.07)' : 'rgba(168,200,74,.07)'
  const bdr  = amber ? 'rgba(200,168,74,.35)' : 'rgba(168,200,74,.35)'
  const col  = amber ? 'rgba(200,168,74,.95)' : 'rgba(168,200,74,.95)'

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.22em',
        textTransform: 'uppercase', color: col,
        background: dark, border: `1px solid ${bdr}`,
        padding: '14px 36px', cursor: 'none',
        transition: 'border-color .3s, box-shadow .3s',
        boxShadow: hover ? `0 0 28px rgba(${c},.18)` : 'none',
        borderColor: hover ? `rgba(${c},.55)` : bdr,
        ...style,
      }}
    >
      {/* Spotlight */}
      <span style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hover
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(${c},.22) 0%, transparent 60%)`
          : 'none',
        transition: 'background .15s',
      }}/>
      {/* Sweep shine */}
      <span style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hover
          ? `linear-gradient(${105 + pos.x * 0.3}deg, transparent 30%, rgba(${c},.18) 50%, transparent 70%)`
          : 'transparent',
        transform: hover ? 'translateX(0)' : 'translateX(-100%)',
        transition: hover ? 'transform .4s ease' : 'none',
      }}/>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  )
}

// ─── SpotlightCard ────────────────────────────────────────────────────────────
// Card with a mouse-tracking light source
export function SpotlightCard({ children, className = '', style = {}, onClick, amber = false }) {
  const ref  = useRef(null)
  const [pos, setPos] = useState({ x: '50%', y: '50%' })
  const [inside, setInside] = useState(false)
  const c = amber ? '200,168,74' : '168,200,74'

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: `${((e.clientX - r.left) / r.width) * 100}%`, y: `${((e.clientY - r.top) / r.height) * 100}%` })
  }

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: `rgba(${c},.04)`,
        border: `1px solid rgba(${c},${inside ? '.35' : '.14'})`,
        borderTop: `2px solid rgba(${c},${inside ? '.65' : '.38'})`,
        transition: 'border-color .3s, border-top-color .3s, box-shadow .3s',
        boxShadow: inside ? `0 20px 60px rgba(0,0,0,.5), 0 0 30px rgba(${c},.08)` : 'none',
        cursor: onClick ? 'none' : 'default',
        ...style,
      }}
    >
      {/* Spotlight overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: inside
          ? `radial-gradient(circle at ${pos.x} ${pos.y}, rgba(${c},.1) 0%, transparent 55%)`
          : 'none',
        transition: 'background .12s',
      }}/>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

// ─── MagnetButton ─────────────────────────────────────────────────────────────
// Button slightly follows cursor when nearby
export function MagnetButton({ children, onClick, className = '', style = {}, strength = 0.35 }) {
  const ref  = useRef(null)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const cx = r.left + r.width / 2
    const cy = r.top  + r.height / 2
    setTx((e.clientX - cx) * strength)
    setTy((e.clientY - cy) * strength)
  }

  const onLeave = () => { setTx(0); setTy(0) }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transform: `translate(${tx}px, ${ty}px)`,
        transition: tx === 0 ? 'transform .4s cubic-bezier(.22,1,.36,1)' : 'transform .1s linear',
        cursor: 'none',
        ...style,
      }}
    >{children}</button>
  )
}

// ─── ScrollReveal ─────────────────────────────────────────────────────────────
// Wraps children and stagger-reveals them when scrolled into view
export function ScrollReveal({ children, stagger = 80, y = 20, blur = false, className = '' }) {
  const [ref, hit] = useIntersect(0.05)
  const items = Array.isArray(children) ? children : [children]
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div key={i} style={{
          opacity: hit ? 1 : 0,
          transform: hit ? 'translateY(0px)' : `translateY(${y}px)`,
          filter: blur ? (hit ? 'blur(0px)' : 'blur(4px)') : 'none',
          transition: `opacity .6s ease ${i * stagger}ms,
                       transform .6s ease ${i * stagger}ms
                       ${blur ? `, filter .6s ease ${i * stagger}ms` : ''}`,
        }}>{child}</div>
      ))}
    </div>
  )
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
export function CountUp({ end, decimals = 1, suffix = '', duration = 2000 }) {
  const [ref, hit] = useIntersect(0.1)
  const [val, setVal] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (!hit || ran.current) return
    ran.current = true
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - t, 3)
      setVal((e * end).toFixed(decimals))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [hit])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── TextRevealByWord ─────────────────────────────────────────────────────────
// Paragraph where each word reveals as page scrolls (like Apple-style)
export function TextRevealByWord({ text, className = '', style = {} }) {
  const [ref, hit] = useIntersect(0.02)
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} style={{ ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: 'inline-block', marginRight: '0.3em',
          opacity: hit ? 1 : 0.12,
          transition: `opacity .5s ease ${i * 45}ms`,
        }}>{w}</span>
      ))}
    </p>
  )
}

// ─── NumberTicker ─────────────────────────────────────────────────────────────
// Large animated percentage display
export function NumberTicker({ value, decimals = 1, label, note }) {
  const [ref, hit] = useIntersect(0.1)
  const [disp, setDisp] = useState('0.0')
  const ran = useRef(false)
  useEffect(() => {
    if (!hit || ran.current) return
    ran.current = true
    const target = parseFloat(value)
    const start  = performance.now()
    const dur    = 2200
    const tick   = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - t, 4)
      setDisp((e * target).toFixed(decimals))
      if (t < 1) requestAnimationFrame(tick)
      else setDisp(String(value))
    }
    requestAnimationFrame(tick)
  }, [hit])
  return (
    <div ref={ref} className="stat-block">
      <div className="stat-num">{disp}<span className="stat-pct">%</span></div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-note">{note}</div>
    </div>
  )
}
