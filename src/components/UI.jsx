import { useInView, useTilt } from '../hooks'

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function QuoteBlock({ text, source, amber = false }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`qb ${amber ? 'amber' : ''} ${visible ? 'reveal visible' : 'reveal'}`}>
      <div className="qb-t">{text}</div>
      <div className="qb-s">— {source}</div>
    </div>
  )
}

export function PillarCard({ n, sk, en, body }) {
  const tilt = useTilt()
  return (
    <div className="pillar" {...tilt}>
      <div className="pillar-num">{n}</div>
      <div className="pillar-sk">{sk}</div>
      <div className="pillar-en">{en}</div>
      <div className="pillar-body" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export function BookCard({ n, sk, en, text }) {
  const tilt = useTilt()
  return (
    <div className="book-card" {...tilt}>
      <div className="book-num">{n}</div>
      <div className="book-sk">{sk}</div>
      <div className="book-en">{en}</div>
      <div className="book-txt">{text}</div>
    </div>
  )
}

export function GrudgeItem({ sev, title, body, meta }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`grudge reveal ${visible ? 'visible' : ''}`}>
      <div className="g-sev-num">
        <span>{sev}</span>
        Severity
      </div>
      <div>
        <div className="g-title">{title}</div>
        <div className="g-body" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="g-meta">{meta}</div>
      </div>
    </div>
  )
}

export function StatBlock({ value, label, note }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`stat-block reveal ${visible ? 'visible' : ''}`}>
      <div className="stat-num">
        {value}<span className="stat-pct">%</span>
      </div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-note">{note}</div>
    </div>
  )
}
