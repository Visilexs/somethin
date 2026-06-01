import { useState, useEffect } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'

const HERO_QUOTES = [
  'He Was Right.',
  'He Invented the Chud.',
  'He Argued About Chess.',
  'He Held Grudges.',
  'He Will Return.',
  'He Knew About Marjoram.',
]

// Custom SVG tile icons — no emoji
function IconOrigins({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 32 L14 14 L20 20 L26 10 L36 32 Z" stroke="#a8c84a" strokeWidth="1.2" fill="rgba(168,200,74,0.06)" strokeLinejoin="round"/>
      <path d="M14 14 L14 32" stroke="#a8c84a" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.4"/>
      <path d="M26 10 L26 32" stroke="#a8c84a" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.4"/>
      <circle cx="26" cy="10" r="2" fill="#a8c84a" opacity="0.7"/>
      <line x1="4" y1="32" x2="36" y2="32" stroke="#a8c84a" strokeWidth="1" opacity="0.5"/>
    </svg>
  )
}
function IconChud({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="38" x2="20" y2="16" stroke="#a8c84a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 16 Q12 20 8 14 Q14 10 20 16" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.06)"/>
      <path d="M20 20 Q28 24 32 18 Q26 14 20 20" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.06)"/>
      <path d="M20 24 Q13 28 10 22 Q15 18 20 24" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.06)"/>
      <ellipse cx="20" cy="38" rx="6" ry="2" stroke="#a8c84a" strokeWidth="0.8" fill="rgba(168,200,74,0.08)"/>
    </svg>
  )
}
function IconDisciples({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* 5 heads in a row */}
      {[8,15,20,25,32].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={14 + (i===2?-2:i===1||i===3?-1:0)} r={4-(i===0||i===4?0.5:0)} stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.05)" opacity={i===2?1:0.7}/>
          <path d={`M${cx-4} ${28+(i===2?-1:0)} Q${cx-3} ${22+(i===2?-2:0)} ${cx} ${20+(i===2?-2:0)} Q${cx+3} ${22+(i===2?-2:0)} ${cx+4} ${28+(i===2?-1:0)}`} stroke="#a8c84a" strokeWidth="0.9" fill="rgba(168,200,74,0.04)" opacity={i===2?1:0.7}/>
        </g>
      ))}
    </svg>
  )
}
function IconChronicles({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 6 Q6 20 8 34 Q20 36 32 34 Q34 20 32 6 Q20 4 8 6 Z" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.04)"/>
      <line x1="13" y1="13" x2="27" y2="13" stroke="#a8c84a" strokeWidth="0.9" opacity="0.6"/>
      <line x1="13" y1="17" x2="27" y2="17" stroke="#a8c84a" strokeWidth="0.9" opacity="0.6"/>
      <line x1="13" y1="21" x2="22" y2="21" stroke="#a8c84a" strokeWidth="0.9" opacity="0.6"/>
      <circle cx="26" cy="27" r="4.5" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.05)"/>
      <text x="26" y="29.5" textAnchor="middle" fontSize="5.5" fill="#a8c84a" opacity="0.75">♛</text>
    </svg>
  )
}
function IconTexts({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.04)"/>
      <rect x="10" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.05)"/>
      <rect x="14" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,0.06)"/>
      <line x1="18" y1="11" x2="29" y2="11" stroke="#a8c84a" strokeWidth="0.8" opacity="0.55"/>
      <line x1="18" y1="15" x2="29" y2="15" stroke="#a8c84a" strokeWidth="0.8" opacity="0.55"/>
      <line x1="18" y1="19" x2="26" y2="19" stroke="#a8c84a" strokeWidth="0.8" opacity="0.55"/>
      <line x1="14" y1="34" x2="33" y2="34" stroke="#a8c84a" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}
function IconLaws({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="4" x2="20" y2="36" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="10" x2="30" y2="10" stroke="#a8c84a" strokeWidth="1" strokeLinecap="round"/>
      {/* Left pan */}
      <line x1="10" y1="10" x2="6" y2="18" stroke="#a8c84a" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="10" y1="10" x2="14" y2="18" stroke="#a8c84a" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M5 18 Q10 22 15 18" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.08)" strokeLinecap="round"/>
      {/* Right pan - slightly lower (scales off) */}
      <line x1="30" y1="10" x2="26" y2="20" stroke="#a8c84a" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="30" y1="10" x2="34" y2="20" stroke="#a8c84a" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M25 20 Q30 24 35 20" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,0.08)" strokeLinecap="round"/>
      <text x="20" y="39" textAnchor="middle" fontSize="4" fill="#a8c84a" opacity="0.45">ČUDOVÉ ZÁKONY</text>
    </svg>
  )
}

const PAGE_TILES = [
  { id:'origins',    Icon:IconOrigins,    title:'Origins',       sub:'The Descent from the Tatras' },
  { id:'chud',       Icon:IconChud,       title:'The Chud',      sub:'The Strange Way of Living' },
  { id:'disciples',  Icon:IconDisciples,  title:'The Disciples', sub:'Those Who Followed' },
  { id:'chronicles', Icon:IconChronicles, title:'Chronicles',    sub:'Events of the Walking' },
  { id:'texts',      Icon:IconTexts,      title:'Sacred Texts',  sub:'Books, Sayings & Records' },
  { id:'laws',       Icon:IconLaws,       title:'The Laws',      sub:'Čudové Zákony · Fifteen Laws' },
]

export default function HomePage({ setPage }) {
  const [heroIdx, setHeroIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setHeroIdx(i => (i + 1) % HERO_QUOTES.length); setFade(true) }, 420)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        minHeight: '75vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '60px 32px 56px', position: 'relative',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(168,200,74,0.07) 0%, transparent 65%)',
      }}>

        {/* Ornament */}
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.32em', textTransform:'uppercase', color:'rgba(168,200,74,.35)', marginBottom:32 }}>
          ✦ &nbsp; Ancient Slovakia · One True God of the Tatras &nbsp; ✦
        </div>

        {/* Rotating headline — main hero text */}
        <div style={{
          fontFamily: "'Cinzel Decorative',serif",
          fontSize: 'clamp(28px,5.5vw,64px)',
          color: 'var(--am)',
          letterSpacing: '.04em',
          lineHeight: 1.2,
          minHeight: 'clamp(40px,8vw,80px)',
          transition: 'opacity .42s ease, transform .42s ease',
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(12px)',
          marginBottom: 20,
          textShadow: '0 0 60px rgba(200,168,74,0.25)',
        }}>{HERO_QUOTES[heroIdx]}</div>

        {/* Subtext */}
        <p style={{
          fontFamily: "'EB Garamond',serif", fontSize: 'clamp(15px,2vw,20px)',
          fontStyle: 'italic', color: 'rgba(213,206,171,0.55)',
          maxWidth: 520, lineHeight: 1.8, marginBottom: 48,
        }}>
          He walked among us. He corrected our wood stacks. He invented the Chud.
          He was right about almost everything. He will return.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', marginBottom:60 }}>
          <button className="cta-btn" onClick={() => setPage('origins')}>
            Discover the Origins
          </button>
          <button className="back-btn" onClick={() => setPage('chud')}>
            Explore the Chud
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display:'flex', gap:0, flexWrap:'wrap', justifyContent:'center', border:'1px solid rgba(168,200,74,0.18)', background:'rgba(168,200,74,0.04)' }}>
          {[
            { val:'97.3%', label:'Correctness Rate' },
            { val:'XIV',   label:'Years of the Walking' },
            { val:'XV',    label:'Laws of Chudhood' },
            { val:'VI',    label:'Sacred Books' },
          ].map(({ val, label }, i) => (
            <div key={i} style={{
              padding: '22px 36px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(168,200,74,0.12)' : 'none',
            }}>
              <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(22px,3vw,34px)', color:'var(--g)', lineHeight:1, marginBottom:6 }}>{val}</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(168,200,74,.4)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,0.2),transparent)', margin:'0 32px' }} />

      {/* ── CHAPTER TILES ── */}
      <div className="main-wrap" style={{ paddingTop:72 }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Sacred Chapters</div>
            <div className="sec-title" style={{ textAlign:'center' }}>Enter the Scripture</div>
            <p className="prose" style={{ textAlign:'center', maxWidth:500, margin:'0 auto' }}>
              Eight chapters. Fourteen years of walking. One true god, five disciples, fifteen laws,
              and one argument about chess that has never been fully resolved.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14, marginBottom:80 }}>
          {PAGE_TILES.map(({ id, Icon, title, sub }, i) => (
            <Reveal key={id} delay={Math.min(i + 1, 5)}>
              <div
                className="book-card"
                onClick={() => setPage(id)}
                style={{ cursor:'none', textAlign:'center', padding:'30px 20px' }}
              >
                <div style={{ marginBottom:14, display:'flex', justifyContent:'center', opacity:.85 }}>
                  <Icon size={36} />
                </div>
                <div className="book-sk" style={{ fontSize:13, marginBottom:5 }}>{title}</div>
                <div className="book-txt" style={{ fontStyle:'italic', fontSize:12 }}>{sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── FEATURED QUOTE ── */}
        <Reveal>
          <QuoteBlock
            text="The mountains were there before me. But I was there before the mountains knew what they were for."
            source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1"
          />
        </Reveal>

        {/* ── DISCIPLES PREVIEW ── */}
        <Reveal>
          <div style={{ marginTop:72, marginBottom:28, textAlign:'center' }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Five Disciples</div>
            <div className="sec-title" style={{ textAlign:'center' }}>Those Who Followed Him</div>
            <p className="prose" style={{ textAlign:'center', maxWidth:560, margin:'0 auto 32px' }}>
              A narcissist. A well-meaning fool. A man who agrees with everyone except the one true god.
              An unexplained fellow who sits in trees. And a known deviant.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', paddingBottom:80 }}>
          {['Ayub Jamma','Abdullah Ershdat','Enrico','Korrin','Yash'].map((name, i) => (
            <Reveal key={name} delay={Math.min(i + 1, 5)}>
              <button
                onClick={() => setPage('disciples')}
                style={{
                  fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.14em',
                  textTransform:'uppercase', color:'var(--g)',
                  background:'rgba(168,200,74,0.05)', border:'1px solid rgba(168,200,74,0.2)',
                  padding:'11px 24px', cursor:'none', transition:'all .25s',
                }}
                onMouseEnter={e => { e.target.style.background='rgba(168,200,74,0.12)'; e.target.style.borderColor='rgba(168,200,74,0.42)' }}
                onMouseLeave={e => { e.target.style.background='rgba(168,200,74,0.05)'; e.target.style.borderColor='rgba(168,200,74,0.2)' }}
              >{name}</button>
            </Reveal>
          ))}
        </div>
      </div>

      <footer>© Cirkev Kopeckého · Prvá Dolina · Ancient Slovakia · He Was Right · The Chud Endures · Do Not Touch the Satchel</footer>
    </>
  )
}
