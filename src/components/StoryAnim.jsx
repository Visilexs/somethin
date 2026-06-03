/**
 * StoryAnim — narrative animation helpers
 * RuneParticles, DecreeBox, AnimatedTimelineItem
 * TypewriterText (kept for existing page usage)
 */
import { useState, useEffect, useRef } from 'react'

function useVis(threshold = 0.05) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setV(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold, rootMargin: '0px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return [ref, v]
}

// Typewriter — used on many page titles
export function TypewriterText({ text, style = {}, speed = 30 }) {
  const [ref, vis] = useVis(0.05)
  const [out, setOut]   = useState('')
  const [done, setDone] = useState(false)
  const timer = useRef(); const idx = useRef(0); const started = useRef(false)

  useEffect(() => {
    if (!vis || started.current) return
    started.current = true; idx.current = 0
    const tick = () => {
      if (idx.current >= text.length) { setDone(true); return }
      idx.current++
      setOut(text.slice(0, idx.current))
      const ch = text[idx.current - 1]
      const d  = (ch === '.' || ch === '!' || ch === '?') ? speed * 8
               : ch === ',' ? speed * 4 : ch === ' ' ? speed * 0.5 : speed
      timer.current = setTimeout(tick, d)
    }
    timer.current = setTimeout(tick, 300)
    return () => clearTimeout(timer.current)
  }, [vis, text, speed])

  return (
    <span ref={ref} style={{ display: 'block', ...style }}>
      {out}
      {!done && vis && (
        <span style={{
          display:'inline-block', width:1.5, height:'0.85em',
          background:'currentColor', marginLeft:2,
          verticalAlign:'text-bottom',
          animation:'tw-blink .65s step-end infinite',
        }}/>
      )}
      <style>{`@keyframes tw-blink{50%{opacity:0}}`}</style>
    </span>
  )
}

// Decree box — border sweeps in
export function DecreeBox({ children, amber = false }) {
  const [ref, vis] = useVis(0.05)
  const c = amber ? '200,168,74' : '168,200,74'
  return (
    <div ref={ref} style={{
      position:'relative', overflow:'hidden',
      border:`1px solid rgba(${c},${vis?.35:.08})`,
      background:`rgba(${c},${vis?.045:.01})`,
      padding:'32px 36px', margin:'28px 0',
      transition:'border-color 1.1s ease, background 1.1s ease',
    }}>
      <div style={{ position:'absolute', top:0, left:vis?'0%':'50%', right:vis?'0%':'50%', height:2,
        background:`linear-gradient(90deg,transparent,rgba(${c},.55),transparent)`,
        transition:'left 1.3s ease .1s, right 1.3s ease .1s' }}/>
      <div style={{ position:'absolute', bottom:0, left:vis?'0%':'50%', right:vis?'0%':'50%', height:2,
        background:`linear-gradient(90deg,transparent,rgba(${c},.35),transparent)`,
        transition:'left 1.3s ease .3s, right 1.3s ease .3s' }}/>
      {children}
    </div>
  )
}

// Timeline item — slides from left
export function AnimatedTimelineItem({ era, title, body }) {
  const [ref, vis] = useVis(0.04)
  return (
    <div ref={ref} className="timeline-item" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateX(0px)' : 'translateX(-20px)',
      transition:'opacity .7s ease, transform .7s ease',
    }}>
      <div className="timeline-dot" style={{ boxShadow: vis ? '0 0 12px rgba(168,200,74,.45)' : 'none', transition:'box-shadow .5s ease .3s' }}/>
      <div className="timeline-era">{era}</div>
      <div className="timeline-title">{title}</div>
      <div className="timeline-body" dangerouslySetInnerHTML={{ __html: body }}/>
    </div>
  )
}

// Floating rune particles
const RUNES = ['✦','✧','✠','✶','†','❖','⊕','⋆']
export function RuneParticles({ count = 6, color = 'rgba(168,200,74,' }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      rune: RUNES[i % RUNES.length],
      left: 4 + (i / count) * 88 + (Math.random() * 8 - 4),
      delay: i * 1.1 + Math.random() * 1.5,
      dur: 7 + Math.random() * 5,
      size: 10 + Math.random() * 7,
      op: 0.05 + Math.random() * 0.09,
    }))
  ).current
  return (
    <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
      {items.map((p, i) => (
        <div key={i} style={{
          position:'absolute', left:`${p.left}%`, bottom:'-10px',
          fontFamily:'serif', fontSize:p.size,
          color:`${color}${p.op})`,
          animation:`rp-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          userSelect:'none',
        }}>{p.rune}</div>
      ))}
      <style>{`
        @keyframes rp-float {
          0%  { transform:translateY(0) rotate(0deg); opacity:0; }
          15% { opacity:1; }
          85% { opacity:.6; }
          100%{ transform:translateY(-130px) rotate(12deg); opacity:0; }
        }
      `}</style>
    </div>
  )
}
