import { useState, useEffect } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'
import { KopeckySymbol } from '../components/Icons'
import { DecreeBox, RuneParticles, TypewriterText } from '../components/StoryAnim'
import { SplitText, BlurText, ShinyButton, GradientText, SpotlightCard, ScrollReveal, CountUp } from '../components/ReactBits'

const HERO_QUOTES = [
  'He Was Right.',
  'He Invented the Chud.',
  'He Argued About Chess.',
  'He Held Grudges.',
  'He Will Return.',
  'He Knew About Marjoram.',
]

// Custom SVG tile icons
function IconOrigins({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 32 L14 14 L20 20 L26 10 L36 32 Z" stroke="#a8c84a" strokeWidth="1.2" fill="rgba(168,200,74,.06)" strokeLinejoin="round"/>
      <circle cx="26" cy="10" r="2" fill="#a8c84a" opacity=".7"/>
      <line x1="4" y1="32" x2="36" y2="32" stroke="#a8c84a" strokeWidth="1" opacity=".5"/>
    </svg>
  )
}
function IconChud({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="38" x2="20" y2="16" stroke="#a8c84a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 16 Q12 20 8 14 Q14 10 20 16" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.06)"/>
      <path d="M20 20 Q28 24 32 18 Q26 14 20 20" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.06)"/>
      <path d="M20 24 Q13 28 10 22 Q15 18 20 24" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.06)"/>
    </svg>
  )
}
function IconDisciples({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {[8,15,20,25,32].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={14+(i===2?-2:0)} r={4-(i===0||i===4?.5:0)} stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.05)" opacity={i===2?1:.7}/>
          <path d={`M${cx-3} ${28} Q${cx-2} ${22} ${cx} ${20} Q${cx+2} ${22} ${cx+3} ${28}`} stroke="#a8c84a" strokeWidth=".9" fill="rgba(168,200,74,.04)" opacity={i===2?1:.7}/>
        </g>
      ))}
    </svg>
  )
}
function IconChronicles({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 6 Q6 20 8 34 Q20 36 32 34 Q34 20 32 6 Q20 4 8 6 Z" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,.04)"/>
      <line x1="13" y1="13" x2="27" y2="13" stroke="#a8c84a" strokeWidth=".9" opacity=".6"/>
      <line x1="13" y1="17" x2="27" y2="17" stroke="#a8c84a" strokeWidth=".9" opacity=".6"/>
      <line x1="13" y1="21" x2="22" y2="21" stroke="#a8c84a" strokeWidth=".9" opacity=".6"/>
      <circle cx="26" cy="27" r="4.5" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.05)"/>
      <text x="26" y="29.5" textAnchor="middle" fontSize="5.5" fill="#a8c84a" opacity=".75">♛</text>
    </svg>
  )
}
function IconTexts({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,.04)"/>
      <rect x="10" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,.05)"/>
      <rect x="14" y="5" width="19" height="26" rx="1.5" stroke="#a8c84a" strokeWidth="1.1" fill="rgba(168,200,74,.06)"/>
      <line x1="18" y1="11" x2="29" y2="11" stroke="#a8c84a" strokeWidth=".8" opacity=".55"/>
      <line x1="18" y1="15" x2="29" y2="15" stroke="#a8c84a" strokeWidth=".8" opacity=".55"/>
      <line x1="18" y1="19" x2="26" y2="19" stroke="#a8c84a" strokeWidth=".8" opacity=".55"/>
    </svg>
  )
}
function IconLaws({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="4" x2="20" y2="36" stroke="#a8c84a" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="10" x2="30" y2="10" stroke="#a8c84a" strokeWidth="1" strokeLinecap="round"/>
      <line x1="10" y1="10" x2="6" y2="18" stroke="#a8c84a" strokeWidth=".9" strokeLinecap="round"/>
      <line x1="10" y1="10" x2="14" y2="18" stroke="#a8c84a" strokeWidth=".9" strokeLinecap="round"/>
      <path d="M5 18 Q10 22 15 18" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.08)" strokeLinecap="round"/>
      <line x1="30" y1="10" x2="26" y2="20" stroke="#a8c84a" strokeWidth=".9" strokeLinecap="round"/>
      <line x1="30" y1="10" x2="34" y2="20" stroke="#a8c84a" strokeWidth=".9" strokeLinecap="round"/>
      <path d="M25 20 Q30 24 35 20" stroke="#a8c84a" strokeWidth="1" fill="rgba(168,200,74,.08)" strokeLinecap="round"/>
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
  const [fade,    setFade]    = useState(true)

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
        minHeight:'76vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', textAlign:'center',
        padding:'52px 32px 48px', position:'relative',
        background:'radial-gradient(ellipse at 50% 60%, rgba(168,200,74,0.06) 0%, transparent 65%)',
      }}>
        {/* Tagline */}
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1.4vw,11px)', letterSpacing:'.3em', textTransform:'uppercase', marginBottom:32 }}>
          <GradientText
            text="✦  Ancient Slovakia · One True God of the Tatras  ✦"
            colors={['rgba(168,200,74,.4)','rgba(200,168,74,.55)','rgba(168,200,74,.4)']}
            speed={8}
          />
        </div>

        {/* Rotating headline */}
        <div style={{
          fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(26px,5.5vw,60px)',
          minHeight:'clamp(40px,8vw,76px)', lineHeight:1.15,
          transition:'opacity .42s ease, transform .42s ease',
          opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(12px)',
          marginBottom: 20, letterSpacing:'.04em',
        }}>
          <GradientText
            text={HERO_QUOTES[heroIdx]}
            colors={['#c8a84a','#e8c860','#a8c84a','#c8a84a']}
            speed={4}
          />
        </div>

        {/* Subline */}
        <p style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(15px,2vw,20px)',
          fontStyle:'italic', color:'rgba(213,206,171,.52)', maxWidth:500, lineHeight:1.8, marginBottom:44 }}>
          He walked among us. He corrected our wood stacks. He invented the Chud.
          He was right about almost everything. He will return.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', marginBottom:56 }}>
          <ShinyButton onClick={() => setPage('origins')}>Discover the Origins</ShinyButton>
          <ShinyButton amber onClick={() => setPage('chud')}>Explore the Chud</ShinyButton>
        </div>

        {/* Stats row */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', border:'1px solid rgba(168,200,74,.16)', background:'rgba(168,200,74,.03)' }}>
          {[
            { val:<CountUp end={97.3} suffix="%"/>, label:'Correctness Rate' },
            { val:'XIV',  label:'Years of the Walking' },
            { val:'XV',   label:'Laws of Chudhood' },
            { val:'VI',   label:'Sacred Books' },
          ].map(({ val, label }, i) => (
            <div key={i} style={{ padding:'20px 32px', textAlign:'center', borderRight: i<3 ? '1px solid rgba(168,200,74,.1)' : 'none' }}>
              <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(22px,3vw,34px)', color:'var(--g)', lineHeight:1, marginBottom:5 }}>{val}</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(168,200,74,.38)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(168,200,74,.2),transparent)', margin:'0 32px' }}/>

      <div className="main-wrap" style={{ paddingTop:64 }}>

        {/* ── CHAPTERS ── */}
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Sacred Chapters</div>
            <div className="sec-title" style={{ textAlign:'center' }}>
              <TypewriterText text="Enter the Scripture" speed={22}/>
            </div>
            <p className="prose" style={{ textAlign:'center', maxWidth:500, margin:'0 auto' }}>
              Eight chapters. Fourteen years. One true god, five disciples, fifteen laws,
              and one argument about chess that has never been fully resolved.
            </p>
          </div>
        </Reveal>

        <ScrollReveal stagger={70}>
          {PAGE_TILES.map(({ id, Icon, title, sub }) => (
            <SpotlightCard
              key={id}
              onClick={() => setPage(id)}
              style={{ padding:'28px 20px', textAlign:'center', marginBottom:0 }}
            >
              <div style={{ marginBottom:12, display:'flex', justifyContent:'center', opacity:.85 }}>
                <Icon size={34}/>
              </div>
              <div className="book-sk" style={{ fontSize:13, marginBottom:4 }}>{title}</div>
              <div className="book-txt" style={{ fontStyle:'italic', fontSize:12 }}>{sub}</div>
            </SpotlightCard>
          ))}
        </ScrollReveal>

        {/* wrap tiles in grid */}
        <style>{`.rb-tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin-bottom:72px}`}</style>
        <script dangerouslySetInnerHTML={{__html:`
          document.querySelectorAll('.main-wrap > div > div > div').forEach(el=>{
            const p = el.parentElement;
            if(p && !p.classList.contains('rb-tile-grid')) {
              p.classList.add('rb-tile-grid');
            }
          });
        `}}/>

        {/* Re-render tiles in proper grid without script hack */}
        <Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:14, marginBottom:72 }}>
            {PAGE_TILES.map(({ id, Icon, title, sub }) => (
              <SpotlightCard key={id} onClick={() => setPage(id)} style={{ padding:'28px 20px', textAlign:'center' }}>
                <div style={{ marginBottom:12, display:'flex', justifyContent:'center', opacity:.85 }}>
                  <Icon size={34}/>
                </div>
                <div className="book-sk" style={{ fontSize:13, marginBottom:4 }}>{title}</div>
                <div className="book-txt" style={{ fontStyle:'italic', fontSize:12 }}>{sub}</div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>

        {/* ── FEATURED QUOTE ── */}
        <Reveal>
          <QuoteBlock
            text="The mountains were there before me. But I was there before the mountains knew what they were for."
            source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1"
          />
        </Reveal>

        {/* ── HOLY DECREE ── */}
        <Reveal>
          <div style={{ marginTop:72, marginBottom:8, textAlign:'center' }}>
            <div className="sec-label" style={{ textAlign:'center', color:'var(--am)' }}>Year Eight · By the Hand of Kopecky</div>
            <div className="sec-title" style={{ textAlign:'center', color:'var(--am)' }}>
              <TypewriterText text="The Holy Decree" speed={22}/>
            </div>
            <p className="prose" style={{ textAlign:'center', maxWidth:520, margin:'0 auto' }}>
              In Year Eight, Kopecky issued the only Holy Decree of the Kopeckian Era.
              It suspended the church and all its scriptures. It was in effect for eight hours.
              It ended because Ayub offered to fill the gap.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <DecreeBox amber>
            <RuneParticles count={5} color="rgba(200,168,74,"/>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(200,168,74,.5),transparent)', zIndex:1 }}/>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(200,168,74,.3),transparent)', zIndex:1 }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>
                <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(200,168,74,.22))' }}/>
                <KopeckySymbol size={34} glow={false}/>
                <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(200,168,74,.22),transparent)' }}/>
              </div>
              <div style={{ textAlign:'center', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.26em', textTransform:'uppercase', color:'rgba(200,168,74,.42)', marginBottom:18 }}>
                Holy Decree · Cirkev Kopeckého · Year Eight of the Walking
              </div>
              <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:'clamp(15px,2.5vw,20px)', color:'var(--am)', textAlign:'center', marginBottom:18 }}>
                Suspension of the Church and All Its Scriptures
              </div>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:16, lineHeight:2, color:'rgba(213,206,171,.8)', marginBottom:14 }}>
                I, Kopecky, having reviewed what has been written about me and my works, do hereby decree the{' '}
                <em style={{color:'var(--am)'}}>immediate suspension of the Church of Kopecky and all scripture.</em>{' '}
                The scribes have taken considerable liberties. Several passages describe me as having been uncertain about things.
                I was not uncertain. I was <em style={{color:'var(--am)'}}>considering.</em> These are different.
              </p>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:15, lineHeight:2, color:'rgba(213,206,171,.65)', fontStyle:'italic', marginBottom:20 }}>
                The Church is hereby closed. The scriptures are suspended. They are not destroyed. I may want them later.
              </p>
              <div style={{ textAlign:'right', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(200,168,74,.4)', marginBottom:20 }}>
                Signed: Kopecky · Witnessed: Vladimír (under protest) · Enrico (enthusiastically, unhelpfully)
              </div>
              <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(200,168,74,.16),transparent)', margin:'16px 0' }}/>
              <div style={{ textAlign:'center', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(200,168,74,.35)', marginBottom:14 }}>
                Eight Hours Later · Reinstatement
              </div>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:15, lineHeight:2, color:'rgba(213,206,171,.72)', marginBottom:14 }}>
                The Church is reinstated. I find, on reflection, that the enterprise is{' '}
                <em style={{color:'var(--g)'}}>amusing.</em>{' '}
                Note: Ayub Jamma offered to replace the suspended scriptures with his own pamphlet during the closure.
                The reinstatement followed shortly after this was reported to me. Ayub should not read into the timing.
              </p>
              <div style={{ textAlign:'right', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(168,200,74,.36)' }}>
                Signed: Kopecky · Witnessed: Vladimír (who said nothing but wrote everything down)
              </div>
            </div>
          </DecreeBox>
        </Reveal>

        <Reveal delay={1}>
          <div style={{ textAlign:'center', padding:'8px 0 6px' }}>
            <TypewriterText
              text='"Fear not, Chudlings. Nothing ever happens."'
              style={{ fontFamily:"'EB Garamond',serif", fontSize:'clamp(18px,3vw,28px)', fontStyle:'italic',
                color:'var(--am)', textAlign:'center', textShadow:'0 0 30px rgba(200,168,74,.2)' }}
              speed={32}
            />
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(200,168,74,.36)', marginTop:10 }}>
              — Kopecky · Following the Reinstatement · Four Words · Partly Genuine
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="warn-box" style={{ marginBottom:60, marginTop:24 }}>
            <div className="warn-label">Vladimír's Note · Nitrianske Záznamy, Appendix C</div>
            <div className="warn-text">The word "Chudlings" appears here and nowhere else in the Kopeckiad. Kopecky was not known to use diminutives. He used one, once, immediately after reinstating a church he had suspended eight hours earlier. The Council voted five to two that it is a term of endearment. The two dissenters argue it was mild condescension. Both interpretations are consistent with the evidence.</div>
          </div>
        </Reveal>

        {/* ── DISCIPLES ── */}
        <Reveal>
          <div style={{ marginTop:64, marginBottom:28, textAlign:'center' }}>
            <div className="sec-label" style={{ textAlign:'center' }}>The Five Disciples</div>
            <div className="sec-title" style={{ textAlign:'center' }}>
              <TypewriterText text="Those Who Followed Him" speed={22}/>
            </div>
            <p className="prose" style={{ textAlign:'center', maxWidth:560, margin:'0 auto 32px' }}>
              A narcissist. A well-meaning fool. A man who agrees with everyone except the one true god.
              An unexplained fellow who sits in trees. And a known deviant.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', paddingBottom:80 }}>
          {['Ayub Jamma','Abdullah Ershdat','Enrico','Korrin','Yash'].map((name, i) => (
            <Reveal key={name} delay={Math.min(i+1,5)}>
              <ShinyButton onClick={() => setPage('disciples')}>
                {name}
              </ShinyButton>
            </Reveal>
          ))}
        </div>

      </div>
      <footer>© Cirkev Kopeckého · Prvá Dolina · Ancient Slovakia · He Was Right · The Chud Endures · Do Not Touch the Satchel</footer>
    </>
  )
}
