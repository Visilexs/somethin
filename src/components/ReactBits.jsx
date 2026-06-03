import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
} from 'motion/react'

// ════════════════════════════════════════════════════════════════════════════
// Motion-powered component library (motion.dev / motion@12)
// Replaces the previous hand-rolled IntersectionObserver + rAF system.
// ════════════════════════════════════════════════════════════════════════════

const EASE = [0.22, 1, 0.36, 1]

// ── SplitText — per-character spring reveal, staggered ──────────────────────
export function SplitText({ text = '', className = '', style = {}, delay = 0, stagger = 0.026, tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const chars = Array.from(String(text ?? ''))
  const MotionTag = motion[tag] || motion.span

  return (
    <MotionTag ref={ref} className={className} style={{ display: 'inline-block', ...style }} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal', transformOrigin: '50% 100%' }}
          initial={{ opacity: 0, y: '0.5em', rotateX: -45 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ delay: delay + i * stagger, type: 'spring', stiffness: 320, damping: 24 }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </MotionTag>
  )
}

// ── BlurText — word-by-word blur+fade reveal ────────────────────────────────
export function BlurText({ text = '', className = '', style = {}, delay = 0, stagger = 0.07, tag = 'p' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const words = String(text ?? '').split(' ')
  const MotionTag = motion[tag] || motion.p

  return (
    <MotionTag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ delay: delay + i * stagger, duration: 0.6, ease: EASE }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  )
}

// ── ShinyText — sweeping shine across text (CSS keyframe) ───────────────────
export function ShinyText({ text, className = '', speed = 4, style = {} }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(120deg, rgba(168,200,74,.55) 30%, rgba(220,240,160,1) 50%, rgba(168,200,74,.55) 70%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text', backgroundClip: 'text',
        WebkitTextFillColor: 'transparent', color: '#a8c84a',
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
export function GradientText({ children, text, colors, className = '', style = {}, speed = 6 }) {
  const content = text ?? children
  const stops = Array.isArray(colors) && colors.length >= 2 ? colors : ['#a8c84a', '#c8a84a', '#d8e890', '#a8c84a']
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        backgroundImage: `linear-gradient(90deg, ${stops.join(', ')})`,
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text', backgroundClip: 'text',
        WebkitTextFillColor: 'transparent', color: '#a8c84a',
        animation: `grad-flow ${speed}s linear infinite`,
        ...style,
      }}
    >
      {content}
      <style>{`@keyframes grad-flow { to { background-position: 300% center; } }`}</style>
    </span>
  )
}

// ── AnimatedContent — slide/fade in on scroll (whileInView) ─────────────────
export function AnimatedContent({ children, distance = 40, direction = 'vertical', delay = 0, duration = 0.7, className = '', style = {} }) {
  const offset = direction === 'horizontal' ? { x: distance } : { y: distance }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// ── Magnet — spring-physics cursor follow ───────────────────────────────────
export function Magnet({ children, strength = 0.3, max = 14, className = '', style = {} }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    x.set(Math.max(-max, Math.min(max, dx)))
    y.set(Math.max(-max, Math.min(max, dy)))
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: 'inline-block', x: sx, y: sy, ...style }}
    >
      {children}
    </motion.div>
  )
}

// ── SpotlightCard — real cursor-tracked spotlight + 3D tilt via motion values ─
export function SpotlightCard({ children, className = '', style = {}, spotlightColor = 'rgba(168,200,74,0.14)', onClick }) {
  const ref = useRef(null)
  const mx = useMotionValue(50)   // spotlight % position
  const my = useMotionValue(50)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 100); my.set(py * 100)
    ry.set((px - 0.5) * 10)        // rotateY follows horizontal
    rx.set(-(py - 0.5) * 10)       // rotateX follows vertical
  }
  const onLeave = () => { setHovered(false); rx.set(0); ry.set(0) }

  const bg = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, ${spotlightColor} 0%, transparent 55%)`

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ position: 'relative', overflow: 'hidden', rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: bg, zIndex: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  )
}

// ── CountUp — animated number, fires when scrolled into view ────────────────
export function CountUp({ to, end, value, from = 0, duration = 1.8, decimals = 0, suffix = '', prefix = '', className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const target = Number(to ?? end ?? value ?? 0)
  const safeTarget = Number.isFinite(target) ? target : 0
  const safeFrom = Number.isFinite(Number(from)) ? Number(from) : 0
  const [display, setDisplay] = useState(safeFrom.toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    const controls = animate(safeFrom, safeTarget, {
      duration, ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, safeTarget, safeFrom, duration, decimals])

  return <span ref={ref} className={className} style={style}>{prefix}{display}{suffix}</span>
}

// ── ShinyButton — spotlight + shine sweep, spring tap ───────────────────────
export function ShinyButton({ children, onClick, variant = 'g', amber = false, style = {}, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const [hovered, setHovered] = useState(false)
  const col = (amber || variant === 'a') ? '200,168,74' : '168,200,74'

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }
  const spot = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(${col},.18) 0%, transparent 50%)`

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase',
        color: `rgba(${col},.92)`, background: `rgba(${col},.07)`,
        border: `1px solid rgba(${col},.3)`, padding: '14px 32px', cursor: 'none',
        ...style,
      }}
      animate={{
        borderColor: hovered ? `rgba(${col},.55)` : `rgba(${col},.3)`,
        boxShadow: hovered ? `0 0 24px rgba(${col},.16)` : `0 0 0px rgba(${col},0)`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: spot }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Shine sweep on hover */}
      <motion.span
        style={{
          position: 'absolute', top: 0, width: '45%', height: '100%',
          background: `linear-gradient(120deg, transparent, rgba(${col},.22), transparent)`,
          transform: 'skewX(-20deg)', pointerEvents: 'none',
        }}
        initial={{ left: '-60%' }}
        animate={hovered ? { left: '130%' } : { left: '-60%' }}
        transition={{ duration: hovered ? 0.9 : 0, ease: 'easeOut' }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  )
}

// ── ScrollReveal — staggered children via Motion variants ───────────────────
export function ScrollReveal({ children, className = '', style = {}, stagger = 0.08 }) {
  const arr = Array.isArray(children) ? children : [children]
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {arr.map((child, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ── MagnetButton — nav button with spring magnet pull ───────────────────────
export function MagnetButton({ children, onClick, active = false, className = '', style = {}, strength = 0.25, max = 10 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 })

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    x.set(Math.max(-max, Math.min(max, dx)))
    y.set(Math.max(-max, Math.min(max, dy)))
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ x: sx, y: sy, ...style }}
    >
      {children}
    </motion.button>
  )
}

// ── NumberTicker — CountUp; full stat block when label/note present ─────────
export function NumberTicker({ value, to, end, label, note, decimals, suffix = '%', ...props }) {
  const raw = value ?? to ?? end ?? 0
  const num = Number(raw)
  const dec = decimals ?? (String(raw).includes('.') ? 1 : 0)

  if (!label && !note) return <CountUp to={num} decimals={dec} suffix={suffix} {...props} />

  return (
    <div className="stat-block">
      <div className="stat-num"><CountUp to={num} decimals={dec} /><span className="stat-pct">{suffix}</span></div>
      {label && <div className="stat-lbl">{label}</div>}
      {note && <div className="stat-note">{note}</div>}
    </div>
  )
}
