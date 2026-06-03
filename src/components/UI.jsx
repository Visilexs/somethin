import { motion } from 'motion/react'
import { SpotlightCard, NumberTicker } from './ReactBits'

const EASE = [0.22, 1, 0.36, 1]
const DELAY = { 0: 0, 1: 0.07, 2: 0.14, 3: 0.21, 4: 0.28, 5: 0.35 }

// ── Reveal — wraps children, fades+slides in on scroll (Motion whileInView) ──
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.65, ease: EASE, delay: DELAY[delay] ?? 0 }}
    >
      {children}
    </motion.div>
  )
}

// ── QuoteBlock — styled pull quote, scale+fade reveal ───────────────────────
export function QuoteBlock({ text, source, amber = false }) {
  return (
    <motion.div
      className={`qb ${amber ? 'amber' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="qb-t">{text}</div>
      {source && <div className="qb-s">— {source}</div>}
    </motion.div>
  )
}

// ── PillarCard — spotlight + tilt card for the six pillars ──────────────────
export function PillarCard({ n, sk, en, body }) {
  return (
    <SpotlightCard className="pillar">
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
    <SpotlightCard className="book-card">
      <div className="book-num">{n}</div>
      <div className="book-sk">{sk}</div>
      <div className="book-en">{en}</div>
      <div className="book-txt">{text}</div>
    </SpotlightCard>
  )
}

// ── GrudgeItem — entry in the Grudge Register ───────────────────────────────
export function GrudgeItem({ sev, title, body, meta }) {
  return (
    <motion.div
      className="grudge"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="g-sev-num"><span>{sev}</span>Severity</div>
      <div>
        <div className="g-title">{title}</div>
        <div className="g-body" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="g-meta">{meta}</div>
      </div>
    </motion.div>
  )
}

// StatBlock is an alias of NumberTicker (full stat-block mode)
export { NumberTicker as StatBlock }
