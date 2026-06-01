import { useState, useEffect } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'

const HERO_QUOTES = [
  'He Was Right.',
  'He Invented the Chud.',
  'He Argued About Chess.',
  'He Held Grudges.',
  'He Will Return.',
]

const PAGE_TILES = [
  { id:'origins',    icon:'⛰',  title:'Origins',       sub:'The Descent from the Tatras' },
  { id:'chud',       icon:'🌲', title:'The Chud',       sub:'The Strange Way of Living' },
  { id:'disciples',  icon:'👥', title:'The Disciples',  sub:'Those Who Followed' },
  { id:'chronicles', icon:'📜', title:'Chronicles',     sub:'Events of the Walking' },
  { id:'texts',      icon:'📖', title:'Sacred Texts',   sub:'Books, Sayings & Records' },
  { id:'laws',       icon:'⚖',  title:'The Laws',       sub:'Čudové Zákony · Fifteen Laws' },
]

export default function HomePage({ setPage }) {
  const [heroIdx, setHeroIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setHeroIdx(i => (i + 1) % HERO_QUOTES.length)
        setFade(true)
      }, 400)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* HERO */}
      <div style={{
        minHeight: '82vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '80px 32px 60px', position: 'relative',
      }}>
        <div style={{ fontSize: 88, marginBottom: 24, filter: 'drop-shadow(0 0 40px rgba(168,200,74,0.4))', animation: 'sym-pulse 4s ease-in-out infinite' }}>⸸</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(30px,6vw,64px)', fontWeight: 900, color: 'var(--g)', letterSpacing: '.06em', lineHeight: 1.15, marginBottom: 18, textShadow: '0 0 60px rgba(168,200,74,0.25)' }}>
          Cirkev Kopeckého
        </h1>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(10px,1.8vw,14px)', color: 'rgba(168,200,74,0.45)', letterSpacing: '.24em', textTransform: 'uppercase', marginBottom: 44, lineHeight: 2 }}>
          Church of Kopecky · Ancient Slovakia · One True God of the Tatras
        </p>

        {/* Rotating headline */}
        <div style={{
          fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(18px,3.5vw,36px)',
          color: 'var(--am)', letterSpacing: '.05em', minHeight: 52,
          transition: 'opacity .4s, transform .4s',
          opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(8px)',
          marginBottom: 52,
        }}>{HERO_QUOTES[heroIdx]}</div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
          <button className="cta-btn" onClick={() => setPage('origins')}>Discover the Origins</button>
          <button className="back-btn" onClick={() => setPage('chud')}>Explore the Chud</button>
        </div>

        {/* Stat */}
        <div style={{ border: '1px solid rgba(168,200,74,0.25)', background: 'rgba(168,200,74,0.04)', padding: '20px 40px', display: 'inline-block' }}>
          <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 48, color: 'var(--g)', lineHeight: 1 }}>97.3</span>
          <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 28, color: 'var(--g)' }}>%</span>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(168,200,74,0.45)', marginTop: 6 }}>
            Verified Correctness Rate · All Domains · All Valleys
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(168,200,74,0.2),transparent)', margin: '0 32px' }} />

      {/* Navigation tiles */}
      <div className="main-wrap" style={{ paddingTop: 64 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="sec-label" style={{ textAlign: 'center' }}>The Sacred Chapters</div>
            <div className="sec-title" style={{ textAlign: 'center' }}>Enter the Scripture</div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 72 }}>
          {PAGE_TILES.map((tile, i) => (
            <Reveal key={tile.id} delay={Math.min(i + 1, 5)}>
              <div
                className="book-card"
                onClick={() => setPage(tile.id)}
                style={{ cursor: 'none', textAlign: 'center', padding: '32px 24px' }}
              >
                <div style={{ fontSize: 36, marginBottom: 14, opacity: .7 }}>{tile.icon}</div>
                <div className="book-sk" style={{ fontSize: 14, marginBottom: 6 }}>{tile.title}</div>
                <div className="book-txt" style={{ fontStyle: 'italic', fontSize: 13 }}>{tile.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Featured Quote */}
        <Reveal>
          <QuoteBlock
            text="The mountains were there before me. But I was there before the mountains knew what they were for."
            source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1"
          />
        </Reveal>

        {/* Character previews */}
        <Reveal>
          <div style={{ marginTop: 64, marginBottom: 32 }}>
            <div className="sec-label" style={{ textAlign: 'center' }}>The Notable Disciples</div>
            <div className="sec-title" style={{ textAlign: 'center' }}>Those Who Followed Him</div>
            <p className="prose" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 32px' }}>
              A narcissist, a well-meaning fool, a yes-man, an inexplicable fellow, and a known deviant.
              These are the people who surrounded Kopecky during the Walking. He found them
              <em> instructive.</em> Mostly.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 72 }}>
          {['Ayub Jamma','Abdullah Ershdat','Enrico','Korrin','Yash'].map((name, i) => (
            <Reveal key={name} delay={i + 1}>
              <button
                onClick={() => setPage('disciples')}
                style={{
                  fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: '.14em',
                  textTransform: 'uppercase', color: 'var(--g)', background: 'rgba(168,200,74,0.05)',
                  border: '1px solid rgba(168,200,74,0.2)', padding: '10px 20px', cursor: 'none',
                  transition: 'all .25s',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(168,200,74,0.12)'; e.target.style.borderColor = 'rgba(168,200,74,0.4)' }}
                onMouseLeave={e => { e.target.style.background = 'rgba(168,200,74,0.05)'; e.target.style.borderColor = 'rgba(168,200,74,0.2)' }}
              >{name}</button>
            </Reveal>
          ))}
        </div>
      </div>

      <footer>© Cirkev Kopeckého · Prvá Dolina, High Tatra Region, Ancient Slovakia · He Was Right · The Chud Endures · Do Not Touch the Satchel</footer>
    </>
  )
}
