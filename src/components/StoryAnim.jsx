import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks'

// ── Typewriter text — types out when entering viewport ────────────────────────
export function TypewriterText({ text, tag: Tag = 'span', className = '', style = {}, speed = 28 }) {
  const [ref, visible] = useInView(0.1)
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)
  const timer = useRef()

  useEffect(() => {
    if (!visible || done) return
    idx.current = 0
    setDisplayed('')

    const tick = () => {
      if (idx.current >= text.length) { setDone(true); return }
      idx.current++
      setDisplayed(text.slice(0, idx.current))
      // Vary speed slightly for natural feel; pause at punctuation
      const ch = text[idx.current - 1]
      const delay = ch === '.' || ch === ',' || ch === '—' ? speed * 6 : ch === ' ' ? speed * 0.4 : speed
      timer.current = setTimeout(tick, delay)
    }
    timer.current = setTimeout(tick, 300) // brief pause before starting
    return () => clearTimeout(timer.current)
  }, [visible])

  return (
    <Tag ref={ref} className={className} style={style}>
      {displayed}
      {!done && visible && (
        <span style={{
          display: 'inline-block', width: '1px', height: '1em',
          background: 'rgba(168,200,74,.8)', marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'tw-cursor .7s ease-in-out infinite alternate',
        }}/>
      )}
      <style>{`@keyframes tw-cursor{from{opacity:1}to{opacity:0}}`}</style>
    </Tag>
  )
}

// ── Glowing decree box — border animates on enter ─────────────────────────────
export function DecreeBox({ children, amber = false }) {
  const [ref, visible] = useInView(0.06)
  const col = amber ? '200,168,74' : '168,200,74'
  return (
    <div
      ref={ref}
      style={{
        border: `1px solid rgba(${col},${ visible ? '.35' : '.1' })`,
        background: `rgba(${col},${ visible ? '.045' : '.02' })`,
        padding: '32px 36px',
        margin: '28px 0',
        position: 'relative',
        transition: 'border-color 1.2s ease, background 1.2s ease',
      }}
    >
      {/* Animated top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,rgba(${col},${visible ? '.55' : '0'}),transparent)`,
        transition: 'all 1.4s ease .2s',
      }}/>
      {/* Animated bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,rgba(${col},${visible ? '.35' : '0'}),transparent)`,
        transition: 'all 1.4s ease .4s',
      }}/>
      {children}
    </div>
  )
}

// ── Timeline item with pulsing dot ────────────────────────────────────────────
export function AnimatedTimelineItem({ era, title, body, delay = 0 }) {
  const [ref, visible] = useInView(0.06)
  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
      }}
    >
      {/* Animated dot */}
      <div
        className="timeline-dot"
        style={{
          boxShadow: visible
            ? '0 0 0 0 rgba(168,200,74,0), 0 0 12px rgba(168,200,74,.4)'
            : 'none',
          animation: visible ? 'dot-ping 2s ease-out 1' : 'none',
          transition: 'box-shadow .4s ease',
        }}
      />
      <div className="timeline-era">{era}</div>
      <div className="timeline-title">{title}</div>
      <div className="timeline-body" dangerouslySetInnerHTML={{ __html: body }}/>
      <style>{`
        @keyframes dot-ping {
          0%   { box-shadow: 0 0 0 0 rgba(168,200,74,.7), 0 0 12px rgba(168,200,74,.4); }
          70%  { box-shadow: 0 0 0 10px rgba(168,200,74,0), 0 0 18px rgba(168,200,74,.2); }
          100% { box-shadow: 0 0 0 0 rgba(168,200,74,0), 0 0 10px rgba(168,200,74,.3); }
        }
      `}</style>
    </div>
  )
}

// ── Stat count-up ─────────────────────────────────────────────────────────────
export function AnimatedStat({ value, label, note }) {
  const [ref, visible] = useInView(0.1)
  const [displayed, setDisplayed] = useState('0.0')
  const raf = useRef()

  useEffect(() => {
    if (!visible) return
    const target = parseFloat(value)
    const start  = performance.now()
    const dur    = 1800

    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed((eased * target).toFixed(1))
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setDisplayed(String(value))
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [visible, value])

  return (
    <div ref={ref} className="stat-block">
      <div className="stat-num">
        {displayed}<span className="stat-pct">%</span>
      </div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-note">{note}</div>
    </div>
  )
}

// ── Floating rune particle overlay for decree sections ────────────────────────
export function RuneParticles({ count = 8, color = 'rgba(168,200,74,' }) {
  const RUNES = ['✦','✧','✠','⊕','✶','❖','⸸','†']
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      rune: RUNES[i % RUNES.length],
      x: 5 + Math.random() * 90,
      delay: Math.random() * 4,
      dur: 6 + Math.random() * 6,
      size: 10 + Math.random() * 8,
      op: 0.06 + Math.random() * 0.1,
    }))
  )
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-20px',
            fontFamily: 'serif',
            fontSize: p.size,
            color: `${color}${p.op})`,
            animation: `rune-float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
            userSelect: 'none',
          }}
        >{p.rune}</div>
      ))}
      <style>{`
        @keyframes rune-float {
          0%   { transform: translateY(0px) rotate(0deg); opacity: var(--op, .08); }
          50%  { transform: translateY(-60px) rotate(8deg); }
          100% { transform: translateY(-120px) rotate(-5deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
