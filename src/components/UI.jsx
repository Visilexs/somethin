import { useRef, useState, useEffect } from 'react'
import { SpotlightCard } from './ReactBits'

// Shared IntersectionObserver reveal
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setVis(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold: 0.05, rootMargin: '0px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return (
    <div ref={ref} className={`reveal ${vis ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

export function QuoteBlock({ text, source, amber = false }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setVis(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return (
    <div ref={ref} className={`qb ${amber ? 'amber' : ''} ${vis ? 'reveal visible' : 'reveal'}`}>
      <div className="qb-t">{text}</div>
      <div className="qb-s">— {source}</div>
    </div>
  )
}

// PillarCard now uses SpotlightCard
import { useTilt } from '../hooks'
export function PillarCard({ n, sk, en, body }) {
  const tilt = useTilt()
  return (
    <SpotlightCard style={{ padding:'20px 16px' }} {...tilt}>
      <div className="pillar-num">{n}</div>
      <div className="pillar-sk">{sk}</div>
      <div className="pillar-en">{en}</div>
      <div className="pillar-body" dangerouslySetInnerHTML={{ __html: body }}/>
    </SpotlightCard>
  )
}

// BookCard now uses SpotlightCard
export function BookCard({ n, sk, en, text }) {
  return (
    <SpotlightCard style={{ padding:'26px 20px' }}>
      <div className="book-num">{n}</div>
      <div className="book-sk">{sk}</div>
      <div className="book-en">{en}</div>
      <div className="book-txt">{text}</div>
    </SpotlightCard>
  )
}

export function GrudgeItem({ sev, title, body, meta }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setVis(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])
  return (
    <div ref={ref} className={`grudge reveal ${vis ? 'visible' : ''}`}>
      <div className="g-sev-num"><span>{sev}</span>Severity</div>
      <div>
        <div className="g-title">{title}</div>
        <div className="g-body" dangerouslySetInnerHTML={{ __html: body }}/>
        <div className="g-meta">{meta}</div>
      </div>
    </div>
  )
}

// StatBlock now uses NumberTicker from ReactBits via re-export
export { NumberTicker as StatBlock } from './ReactBits'
