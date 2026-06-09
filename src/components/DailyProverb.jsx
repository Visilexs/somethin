import { useState } from 'react'
import { Reveal } from './UI'
import { DAILY_PROVERBS } from '../data'
import { useApp } from '../AppContext'

// ── The Appointed Proverb — deterministic by calendar day ────────────────────
// The proverb does not change daily; the day changes around it (official position).

function todaysProverb() {
  const now = new Date()
  // Day index since a fixed epoch keeps the rotation stable across timezones-ish
  const days = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  return DAILY_PROVERBS[(now.getFullYear() * 366 + days) % DAILY_PROVERBS.length]
}

export default function DailyProverb() {
  const { actions } = useApp()
  const [inscribed, setInscribed] = useState(false)
  const proverb = todaysProverb()

  const inscribe = async () => {
    try {
      await navigator.clipboard.writeText(`"${proverb.text}" — ${proverb.source} · Cirkev Kopeckého`)
      setInscribed(true)
      actions.setFlag('proverbInscribed')
      actions.notify({
        kind: 'notice',
        title: 'The Proverb Is Inscribed',
        body: 'It has been copied to your clipboard. Carry it carefully. It was already carrying you.',
      })
      setTimeout(() => setInscribed(false), 4000)
    } catch {
      actions.notify({
        kind: 'notice',
        title: 'The Quill Has Failed',
        body: 'Your clipboard refused the proverb. The Council has logged the refusal.',
      })
    }
  }

  return (
    <Reveal>
      <div style={{ marginTop: 72 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="sec-label" style={{ textAlign: 'center' }}>Appointed for This Day · By Standing Rotation of the Council</div>
          <div className="sec-title" style={{ textAlign: 'center' }}>The Daily Proverb</div>
        </div>

        <div style={{
          border: '1px solid rgba(168,200,74,.22)',
          background: 'rgba(168,200,74,.035)',
          padding: '34px 36px 26px',
          position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(168,200,74,.45),transparent)' }} />
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(168,200,74,.4)', marginBottom: 20 }}>
            {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })} · Of the Common Reckoning
          </div>
          <div style={{
            fontFamily: "'EB Garamond',serif", fontStyle: 'italic',
            fontSize: 'clamp(17px,2.4vw,22px)', lineHeight: 1.9,
            color: 'rgba(213,206,171,.85)', maxWidth: 640, margin: '0 auto 18px',
          }}>
            "{proverb.text}"
          </div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(200,168,74,.45)', marginBottom: 22 }}>
            — {proverb.source}
          </div>
          <button
            onClick={inscribe}
            style={{
              padding: '10px 24px', cursor: 'none',
              fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
              background: inscribed ? 'rgba(200,168,74,.12)' : 'rgba(168,200,74,.07)',
              border: `1px solid ${inscribed ? 'rgba(200,168,74,.45)' : 'rgba(168,200,74,.3)'}`,
              color: inscribed ? 'var(--am)' : 'var(--g)',
              transition: 'all .25s',
            }}
          >
            {inscribed ? '✦ Inscribed' : 'Inscribe the Proverb'}
          </button>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(168,200,74,.25)', marginTop: 12 }}>
            A new proverb is appointed each day · The proverb disagrees with this characterisation
          </div>
        </div>
      </div>
    </Reveal>
  )
}
