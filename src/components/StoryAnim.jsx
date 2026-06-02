import { useState, useEffect, useRef } from 'react'

// Shared reliable IntersectionObserver — lower threshold, generous rootMargin
function useVisible(threshold = 0.05) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Fallback for Windows GPU / disabled acceleration
    const fb = setTimeout(() => setVis(true), 600)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold, rootMargin: '0px 0px 0px 0px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return [ref, vis]
}

// ── Typewriter ────────────────────────────────────────────────────────────────
export function TypewriterText({ text, style = {}, speed = 30 }) {
  const [ref, vis] = useVisible(0.05)
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  const timerRef = useRef()
  const idxRef   = useRef(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!vis || startedRef.current) return
    startedRef.current = true
    idxRef.current = 0
    const tick = () => {
      if (idxRef.current >= text.length) { setDone(true); return }
      idxRef.current++
      setOut(text.slice(0, idxRef.current))
      const ch = text[idxRef.current - 1]
      const d = (ch === '.' || ch === '!' || ch === '?') ? speed * 8
              : ch === ',' ? speed * 4
              : ch === ' ' ? speed * 0.5
              : speed
      timerRef.current = setTimeout(tick, d)
    }
    timerRef.current = setTimeout(tick, 400)
    return () => clearTimeout(timerRef.current)
  }, [vis])

  return (
    <span ref={ref} style={{ display: 'block', ...style }}>
      {out}
      {!done && vis && (
        <span style={{
          display: 'inline-block', width: 1.5, height: '0.85em',
          background: 'currentColor', marginLeft: 2,
          verticalAlign: 'text-bottom', opacity: 0.9,
          animation: 'tw-blink .65s step-end infinite',
        }} />
      )}
      <style>{`@keyframes tw-blink{50%{opacity:0}}`}</style>
    </span>
  )
}

// ── Decree box — border sweeps in from center ─────────────────────────────────
export function DecreeBox({ children, amber = false }) {
  const [ref, vis] = useVisible(0.05)
  const c = amber ? '200,168,74' : '168,200,74'
  return (
    <div ref={ref} style={{
      position: 'relative',
      border: `1px solid rgba(${c},${vis ? '.35' : '.08'})`,
      background: `rgba(${c},${vis ? '.045' : '.01'})`,
      padding: '32px 36px',
      margin: '28px 0',
      overflow: 'hidden',
      transition: 'border-color 1.1s ease, background 1.1s ease',
    }}>
      {/* sweep lines */}
      <div style={{
        position: 'absolute', top: 0, left: vis ? '0%' : '50%', right: vis ? '0%' : '50%', height: 2,
        background: `linear-gradient(90deg,transparent,rgba(${c},.55),transparent)`,
        transition: 'left 1.3s ease .1s, right 1.3s ease .1s',
      }}/>
      <div style={{
        position: 'absolute', bottom: 0, left: vis ? '0%' : '50%', right: vis ? '0%' : '50%', height: 2,
        background: `linear-gradient(90deg,transparent,rgba(${c},.35),transparent)`,
        transition: 'left 1.3s ease .3s, right 1.3s ease .3s',
      }}/>
      {children}
    </div>
  )
}

// ── Animated timeline item — slides in from left ──────────────────────────────
export function AnimatedTimelineItem({ era, title, body }) {
  const [ref, vis] = useVisible(0.04)
  return (
    <div ref={ref} className="timeline-item" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateX(0px)' : 'translateX(-20px)',
      transition: 'opacity .7s ease-out, transform .7s ease-out',
    }}>
      <div className="timeline-dot" style={{
        boxShadow: vis ? '0 0 12px rgba(168,200,74,.45)' : 'none',
        transition: 'box-shadow .5s ease .3s',
      }}/>
      <div className="timeline-era">{era}</div>
      <div className="timeline-title">{title}</div>
      <div className="timeline-body" dangerouslySetInnerHTML={{ __html: body }}/>
    </div>
  )
}

// ── Stat count-up ─────────────────────────────────────────────────────────────
export function AnimatedStat({ value, label, note }) {
  const [ref, vis] = useVisible(0.1)
  const [disp, setDisp] = useState('0.0')
  const rafRef = useRef()
  const ran    = useRef(false)

  useEffect(() => {
    if (!vis || ran.current) return
    ran.current = true
    const target = parseFloat(value)
    const start  = performance.now()
    const dur    = 1800
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - t, 3)
      setDisp((e * target).toFixed(1))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else setDisp(String(value))
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [vis, value])

  return (
    <div ref={ref} className="stat-block" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0px)' : 'translateY(16px)',
      transition: 'opacity .7s ease, transform .7s ease',
    }}>
      <div className="stat-num">{disp}<span className="stat-pct">%</span></div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-note">{note}</div>
    </div>
  )
}

// ── Floating rune particles ────────────────────────────────────────────────────
const RUNE_LIST = ['✦','✧','✠','✶','†','❖','⊕','⋆']
export function RuneParticles({ count = 6, color = 'rgba(168,200,74,' }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      rune: RUNE_LIST[i % RUNE_LIST.length],
      left: 4 + (i / count) * 88 + (Math.random() * 8 - 4),
      delay: i * 1.1 + Math.random() * 1.5,
      dur:   7 + Math.random() * 5,
      size:  10 + Math.random() * 7,
      op:    0.05 + Math.random() * 0.09,
    }))
  ).current

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
    }}>
      {items.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.left}%`,
          bottom: '-10px',
          fontFamily: 'serif',
          fontSize: p.size,
          color: `${color}${p.op})`,
          animation: `rp-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          userSelect: 'none',
        }}>{p.rune}</div>
      ))}
      <style>{`
        @keyframes rp-float {
          0%   { transform: translateY(0)     rotate(0deg);   opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: .6; }
          100% { transform: translateY(-130px) rotate(12deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
