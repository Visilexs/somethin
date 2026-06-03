import { useRef, useState, useEffect } from 'react'
import { SpotlightCard, NumberTicker } from './ReactBits'
import { useTilt } from '../hooks'

// ── Shared reveal hook — single source of truth for scroll reveals ──────────
function useReveal(threshold = 0.05) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fb = setTimeout(() => setVis(true), 700)   // fallback if observer never fires
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); clearTimeout(fb); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [threshold])
  return [ref, vis]
}

// ── Reveal — wraps children, fades+slides in on scroll ──────────────────────
export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, vis] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${vis ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  )
}

// ── QuoteBlock — styled pull quote with attribution ─────────────────────────
export function QuoteBlock({ text, source, amber = false }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={`qb ${amber ? 'amber' : ''} ${vis ? 'reveal visible' : 'reveal'}`}>
      <div className="qb-t">{text}</div>
      {source && <div className="qb-s">— {source}</div>}
    </div>
  )
}

// ── PillarCard — spotlight + tilt card for the six pillars ──────────────────
export function PillarCard({ n, sk, en, body }) {
  const tilt = useTilt()
  return (
    <SpotlightCard style={{ padding: '20px 16px' }} {...tilt}>
      <div className="pillar-num">{n}</div>
      <div className="pillar-sk">{sk}</div>
      <div className="pillar-en">{en}</div>
      <div className="pillar-body" dangerouslySetInnerHTML={{ __html: body }} />
    </SpotlightCard>
  )
}

// ── BookCard — spotlight card for the six sacred books ──────────────────────
export function BookCard({ n, sk, en, text }) {
  return (
    <SpotlightCard style={{ padding: '26px 20px' }}>
      <div className="book-num">{n}</div>
      <div className="book-sk">{sk}</div>
      <div className="book-en">{en}</div>
      <div className="book-txt">{text}</div>
    </SpotlightCard>
  )
}

// ── GrudgeItem — entry in the Grudge Register ───────────────────────────────
export function GrudgeItem({ sev, title, body, meta }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={`grudge reveal ${vis ? 'visible' : ''}`}>
      <div className="g-sev-num"><span>{sev}</span>Severity</div>
      <div>
        <div className="g-title">{title}</div>
        <div className="g-body" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="g-meta">{meta}</div>
      </div>
    </div>
  )
}

// StatBlock is an alias of NumberTicker (full stat-block mode)
export { NumberTicker as StatBlock }
