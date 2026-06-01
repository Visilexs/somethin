import { useState, useEffect } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'
import { KopeckySymbol } from '../components/Icons'

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
      {/* HERO */}
      <div style={{ minHeight:'86vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 32px 60px', position:'relative' }}>

        {/* Kopecky SVG symbol — large, glowing */}
        <div style={{ marginBottom: 28, animation: 'sym-pulse 4s ease-in-out infinite' }}>
          <KopeckySymbol size={88} glow={true} />
        </div>

        <h1 style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(30px,6vw,64px)', fontWeight:900, color:'var(--g)', letterSpacing:'.06em', lineHeight:1.15, marginBottom:16, textShadow:'0 0 60px rgba(168,200,74,0.3)' }}>
          Cirkev Kopeckého
        </h1>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.8vw,14px)', color:'rgba(168,200,74,0.45)', letterSpacing:'.24em', textTransform:'uppercase', marginBottom:44, lineHeight:2 }}>
          Church of Kopecky · Ancient Slovakia · One True God of the Tatras
        </p>

        {/* Rotating headline */}
        <div style={{
          fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(18px,3.5vw,36px)',
          color:'var(--am)', letterSpacing:'.05em', minHeight:54,
          transition:'opacity .42s ease, transform .42s ease',
          opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(10px)',
          marginBottom: 52,
        }}>{HERO_QUOTES[heroIdx]}</div>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:56 }}>
          <button className="cta-btn" onClick={()=>setPage('origins')}>Discover the Origins</button>
          <button className="back-btn" onClick={()=>setPage('chud')}>Explore the Chud</button>
        </div>

        {/* Stat counter */}
        <div style={{ border:'1px solid rgba(168,200,74,0.28)', background:'rgba(168,200,74,0.05)', padding:'22px 44px', display:'inline-block', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,rgba(168,200,74,0.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:52, color:'var(--g)', lineHeight:1 }}>97.3</span>
          <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:30, color:'var(--g)' }}>%</span>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(168,200,74,0.45)', marginTop:8 }}>
            Verified Correctness Rate · All Domains · All Valleys · Both Rivers
          </div>
        </div>
      </div>

      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,0.22),transparent)', margin:'0 32px' }}/>

      {/* Navigation tiles */}
      <div className="main-wrap" style={{ paddingTop:64 }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Sacred Chapters · Select a Volume</div>
            <div className="sec-title" style={{ textAlign:'center' }}>Enter the Scripture</div>
            <p className="prose" style={{ textAlign:'center', maxWidth:500, margin:'0 auto' }}>
              Eight chapters. Fourteen years of walking. One true god, five disciples of varying usefulness, fifteen laws, and one argument about chess that has never been fully resolved.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16, marginBottom:72 }}>
          {PAGE_TILES.map(({ id, Icon, title, sub }, i) => (
            <Reveal key={id} delay={Math.min(i + 1, 5)}>
              <div
                className="book-card"
                onClick={()=>setPage(id)}
                style={{ cursor:'none', textAlign:'center', padding:'32px 24px' }}
              >
                <div style={{ marginBottom:16, display:'flex', justifyContent:'center' }}>
                  <Icon size={38}/>
                </div>
                <div className="book-sk" style={{ fontSize:14, marginBottom:6 }}>{title}</div>
                <div className="book-txt" style={{ fontStyle:'italic', fontSize:13 }}>{sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <QuoteBlock
            text="The mountains were there before me. But I was there before the mountains knew what they were for."
            source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1"
          />
        </Reveal>

        <Reveal>
          <div style={{ marginTop:64, marginBottom:28, textAlign:'center' }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Notable Disciples · Five Followers of Varying Reliability</div>
            <div className="sec-title" style={{ textAlign:'center' }}>Those Who Followed Him</div>
            <p className="prose" style={{ textAlign:'center', maxWidth:580, margin:'0 auto 32px' }}>
              A narcissist. A well-meaning fool. A man who agrees with everyone except the one true god. An unexplained fellow who sits in trees. And a known deviant. These are the people who surrounded Kopecky during the Walking. He found them <em>instructive.</em> Mostly.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', paddingBottom:72 }}>
          {['Ayub Jamma','Abdullah Ershdat','Enrico','Korrin','Yash'].map((name, i) => (
            <Reveal key={name} delay={Math.min(i+1,5)}>
              <button
                onClick={()=>setPage('disciples')}
                style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--g)', background:'rgba(168,200,74,0.05)', border:'1px solid rgba(168,200,74,0.2)', padding:'10px 22px', cursor:'none', transition:'all .25s' }}
                onMouseEnter={e=>{e.target.style.background='rgba(168,200,74,0.12)';e.target.style.borderColor='rgba(168,200,74,0.42)'}}
                onMouseLeave={e=>{e.target.style.background='rgba(168,200,74,0.05)';e.target.style.borderColor='rgba(168,200,74,0.2)'}}
              >{name}</button>
            </Reveal>
          ))}
        </div>
      </div>

      <footer>© Cirkev Kopeckého · Prvá Dolina, High Tatra Region, Ancient Slovakia · He Was Right · The Chud Endures · Do Not Touch the Satchel</footer>
    </>
  )
}
