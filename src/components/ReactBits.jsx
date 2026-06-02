import { useState, useEffect, useRef, useCallback } from 'react'

// ════════════════════════════════════════════════════════════════════════════
// ReactBits-style components — ported to source (MIT, reactbits.dev pattern)
// ════════════════════════════════════════════════════════════════════════════

// Shared in-view hook with reliable firing
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fb = setTimeout(() => setInView(true), 600)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); clearTimeout(fb); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [threshold])
  return [ref, inView]
}

// ── SplitText — animates each character in, staggered ───────────────────────
export function SplitText({ text, className = '', style = {}, delay = 0, stagger = 26, tag: Tag = 'span' }) {
  const [ref, inView] = useReveal(0.2)
  const chars = Array.from(text)
  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block', ...style }} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) rotateX(0)' : 'translateY(0.5em) rotateX(-40deg)',
            transition: `opacity .5s ease, transform .5s cubic-bezier(.2,.7,.3,1)`,
            transitionDelay: `${delay + i * stagger}ms`,
            transformOrigin: '50% 100%',
          }}
        >{ch === ' ' ? '\u00A0' : ch}</span>
      ))}
    </Tag>
  )
}

// ── BlurText — words blur+fade in ───────────────────────────────────────────
export function BlurText({ text, className = '', style = {}, delay = 0, stagger = 70, tag: Tag = 'p' }) {
  const [ref, inView] = useReveal(0.12)
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            filter: inView ? 'blur(0px)' : 'blur(8px)',
            transform: inView ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity .6s ease, filter .6s ease, transform .6s ease',
            transitionDelay: `${delay + i * stagger}ms`,
            marginRight: '0.28em',
          }}
        >{w}</span>
      ))}
    </Tag>
  )
}

// ── ShinyText — sweeping shine across text ──────────────────────────────────
export function ShinyText({ text, className = '', speed = 4, style = {} }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(120deg, rgba(168,200,74,.55) 30%, rgba(220,240,160,1) 50%, rgba(168,200,74,.55) 70%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `shiny ${speed}s linear infinite`,
        ...style,
      }}
    >
      {text}
      <style>{`@keyframes shiny { to { background-position: -200% center; } }`}</style>
    </span>
  )
}

// ── GradientText — animated gradient fill ───────────────────────────────────
export function GradientText({ children, className = '', style = {}, speed = 6 }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(90deg, #a8c84a, #c8a84a, #d8e890, #a8c84a)',
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `grad-flow ${speed}s linear infinite`,
        ...style,
      }}
    >
      {children}
      <style>{`@keyframes grad-flow { to { background-position: 300% center; } }`}</style>
    </span>
  )
}

// ── AnimatedContent — slide/fade in on scroll ───────────────────────────────
export function AnimatedContent({ children, distance = 40, direction = 'vertical', delay = 0, duration = 0.7, className = '', style = {} }) {
  const [ref, inView] = useReveal(0.1)
  const axis = direction === 'horizontal' ? 'translateX' : 'translateY'
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? `${axis}(0)` : `${axis}(${distance}px)`,
        transition: `opacity ${duration}s ease, transform ${duration}s cubic-bezier(.2,.7,.3,1)`,
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >{children}</div>
  )
}

// ── Magnet — element follows cursor when near ───────────────────────────────
export function Magnet({ children, strength = 0.4, className = '', style = {} }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }, [strength])

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform .5s cubic-bezier(.2,.7,.3,1)' : 'transform .1s ease-out',
        ...style,
      }}
    >{children}</div>
  )
}

// ── SpotlightCard — cursor-tracking spotlight ───────────────────────────────
export function SpotlightCard({ children, className = '', style = {}, spotlightColor = 'rgba(168,200,74,0.12)', onClick }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true })
  }

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setSpot(s => ({ ...s, on: true }))}
      onMouseLeave={() => setSpot(s => ({ ...s, on: false }))}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, ${spotlightColor} 0%, transparent 55%)`,
        opacity: spot.on ? 1 : 0,
        transition: 'opacity .35s ease',
        zIndex: 0,
      }}/>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

// ── CountUp — number counts up when in view ─────────────────────────────────
export function CountUp({ to, from = 0, duration = 1.8, decimals = 0, suffix = '', className = '', style = {} }) {
  const [ref, inView] = useReveal(0.3)
  const [val, setVal] = useState(from)
  const raf = useRef()

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(from + (to - from) * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, to, from, duration])

  return <span ref={ref} className={className} style={style}>{val.toFixed(decimals)}{suffix}</span>
}

// ── ShinyButton — magnetic + shine + spotlight button ───────────────────────
export function ShinyButton({ children, onClick, variant = 'g', style = {}, className = '' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })
  const col = variant === 'a' ? '200,168,74' : '168,200,74'

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true })
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setSpot(s => ({ ...s, on: true }))}
      onMouseLeave={() => setSpot(s => ({ ...s, on: false }))}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase',
        color: `rgba(${col},.92)`,
        background: `rgba(${col},.07)`,
        border: `1px solid rgba(${col},.3)`,
        padding: '14px 32px', cursor: 'none',
        transition: 'border-color .3s, box-shadow .3s',
        boxShadow: spot.on ? `0 0 24px rgba(${col},.14)` : 'none',
        borderColor: spot.on ? `rgba(${col},.55)` : `rgba(${col},.3)`,
        ...style,
      }}
    >
      <span style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(${col},.18) 0%, transparent 50%)`,
        opacity: spot.on ? 1 : 0, transition: 'opacity .3s',
      }}/>
      {/* Shine sweep */}
      <span style={{
        position: 'absolute', top: 0, left: '-60%', width: '50%', height: '100%',
        background: `linear-gradient(120deg, transparent, rgba(${col},.18), transparent)`,
        transform: 'skewX(-20deg)',
        animation: spot.on ? 'btn-shine 0.9s ease' : 'none',
        pointerEvents: 'none',
      }}/>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <style>{`@keyframes btn-shine { from { left: -60%; } to { left: 120%; } }`}</style>
    </button>
  )
}

// ── ScrollReveal — staggered children reveal ────────────────────────────────
export function ScrollReveal({ children, className = '', style = {}, stagger = 80 }) {
  const [ref, inView] = useReveal(0.08)
  const arr = Array.isArray(children) ? children : [children]
  return (
    <div ref={ref} className={className} style={style}>
      {arr.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity .7s ease, transform .7s cubic-bezier(.2,.7,.3,1)`,
            transitionDelay: `${i * stagger}ms`,
          }}
        >{child}</div>
      ))}
    </div>
  )
}

// ── MagnetButton — nav-style magnetic button ────────────────────────────────
export function MagnetButton({ children, onClick, active = false, className = '', style = {}, strength = 0.35 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength })
  }
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform .5s cubic-bezier(.2,.7,.3,1)' : 'transform .12s ease-out',
        ...style,
      }}
    >{children}</button>
  )
}

// ── NumberTicker — alias of CountUp for compatibility ───────────────────────
export function NumberTicker({ value, ...props }) {
  return <CountUp to={value} {...props} />
}
