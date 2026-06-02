import { useState } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'
import { DISCIPLES } from '../data'
import { AyubIcon, AbdullahIcon, EnricoIcon, KorrinIcon, YashIcon } from '../components/Icons'
import { TypewriterText } from '../components/StoryAnim'
import { ShinyButton } from '../components/ReactBits'

const ICON_MAP = { ayub:AyubIcon, abdullah:AbdullahIcon, enrico:EnricoIcon, korrin:KorrinIcon, yash:YashIcon }

function DiscipleIcon({ id, size=80 }) {
  const Comp = ICON_MAP[id]
  return Comp ? <Comp size={size}/> : null
}

function DiscipleDetail({ d, setActive }) {
  return (
    <div>
      <ShinyButton onClick={()=>setActive(null)} style={{marginBottom:32}}>
        ← All Disciples
      </ShinyButton>

      <Reveal>
        <div style={{display:'flex',alignItems:'flex-start',gap:36,flexWrap:'wrap',marginBottom:44,paddingBottom:36,borderBottom:'1px solid rgba(168,200,74,0.1)'}}>
          <div style={{flexShrink:0}}>
            <DiscipleIcon id={d.id} size={100}/>
          </div>
          <div style={{flex:1,minWidth:220}}>
            <div className="sec-label">{d.role}</div>
            <div className="sec-title" style={{marginBottom:8}}><TypewriterText text={d.name} speed={22}/></div>
            <div style={{fontFamily:"'Cinzel Decorative',serif",fontSize:15,color:'var(--am)',marginBottom:12}}>"{d.epithet}"</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(168,200,74,0.38)',lineHeight:2}}>
              <div>Origin: {d.origin}</div>
              <div>Status: {d.status}</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        {d.bio.split('\n\n').map((para,i)=>(
          <p key={i} className="prose" dangerouslySetInnerHTML={{__html:para.replace(/\*([^*]+)\*/g,'<em>$1</em>')}}/>
        ))}
      </Reveal>

      <div style={{paddingTop:40}}>
        <Reveal>
          <div className="sec-label">Notable Incidents — Verified by Multiple Witnesses</div>
          <div className="sec-title" style={{fontSize:'clamp(18px,2.5vw,26px)'}}><TypewriterText text="The Historical Record" speed={20}/></div>
        </Reveal>
        {d.incidents.map((inc,i)=>(
          <Reveal key={i} delay={Math.min(i+1,3)}>
            <div style={{marginBottom:40,paddingBottom:32,borderBottom:'1px solid rgba(168,200,74,0.07)'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:12}}>
                <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:26,color:'rgba(168,200,74,0.18)',lineHeight:1,flexShrink:0}}>{i+1}</span>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:'var(--g)',letterSpacing:'.1em',textTransform:'uppercase'}}>{inc.title}</div>
              </div>
              <p className="prose" dangerouslySetInnerHTML={{__html:inc.body}}/>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="sec-label" style={{marginTop:8}}>What Kopecky Said — Privately, to Someone He Trusted</div>
        <QuoteBlock text={d.kopecky_quote} source={d.kopecky_source}/>
      </Reveal>
      <Reveal delay={1}>
        <div className="sec-label">What {d.name.split(' ')[0]} Said — Publicly, to Everyone, Often</div>
        <QuoteBlock amber text={d.disciple_quote} source={d.disciple_source}/>
      </Reveal>
    </div>
  )
}

function DiscipleCard({ d, onClick }) {
  return (
    <div className="disciple-card" onClick={onClick}>
      <div style={{marginBottom:16}}><DiscipleIcon id={d.id} size={84}/></div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:'.1em',color:'var(--g)',textTransform:'uppercase',marginBottom:5}}>{d.name}</div>
      <div style={{fontFamily:"'Cinzel Decorative',serif",fontSize:11,color:'var(--am)',marginBottom:12}}>"{d.epithet}"</div>
      <div style={{fontSize:13,color:'var(--txd)',lineHeight:1.65,fontStyle:'italic'}}>
        {d.role.split('·')[0].trim()}
      </div>
      <div style={{marginTop:14,fontSize:10,fontFamily:"'Cinzel',serif",letterSpacing:'.12em',color:'rgba(168,200,74,0.35)',textTransform:'uppercase'}}>
        Click to read full account →
      </div>
    </div>
  )
}

export default function DisciplesPage({ setPage }) {
  const [active,setActive] = useState(null)
  const disciple = DISCIPLES.find(d=>d.id===active)

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">Nitrianske Záznamy · Years Four Through Fourteen · The People Who Arrived</div>
        <div className="page-hero-title"><TypewriterText text="The Disciples" speed={18}/></div>
        <div className="page-hero-sub">A Narcissist · A Sincere Fool · A Man Who Agrees With Everyone Except God · An Unexplained Fellow · A Known Deviant</div>
      </div>
      <div className="main-wrap">
        {disciple ? (
          <DiscipleDetail d={disciple} setActive={setActive}/>
        ) : (
          <>
            <div className="content-section">
              <Reveal>
                <div className="sec-label">The Known Associates of the Walking · Select a Disciple</div>
                <div className="sec-title"><TypewriterText text="Five Disciples. One Assessment Each." speed={20}/></div>
                <p className="prose">Kopecky did not recruit followers. Followers arrived. Some were useful. Some were instructive in the way that problems are instructive. Some were present in ways that remain, theologically and documentarily, unclear. What follows are the five most notable associates of the Kopeckian Era — representing, between them, narcissism, sincere wrongness, strategic agreeableness applied to everyone except the one true god, one unsolved mystery in a tree, and a category the Church has agreed to call "known deviant" and consider closed.</p>
                <p className="prose">Select a disciple below to read their full account. The accounts are thorough. The Council of Devín spent considerable time on them. The time was well spent on four of them. The fifth — Yash — was also thorough, but the Council spent additional time deciding what to include and what to describe as "information the Council is not yet prepared to canonise." The result is honest within those limits. Which are real limits. The Council has been clear about that.</p>
              </Reveal>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:18,marginBottom:52}}>
              {DISCIPLES.map((d,i)=>(
                <Reveal key={d.id} delay={Math.min(i+1,5)}>
                  <DiscipleCard d={d} onClick={()=>setActive(d.id)}/>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="warn-box">
                <div className="warn-label">Council of Devín — Note on the Goat and on Enrico's Selective Agreement</div>
                <div className="warn-text">Two administrative notes for clarity. First: Yash's goat appears in four chapters of the Kopeckiad and has a footnote in the Sťažnostná Kniha. The Council has voted against giving it its own disciple entry, four to three. The three who voted in favour note the goat has more documented appearances than several official apostles. The four stand by the decision and have asked the three to stop bringing it up. Second: the Council wishes to formally note that Enrico agrees with Yash, Abdullah, and Ayub about essentially everything they propose, including the bears, the soil confidence theory, the directional map dispute, and the chess matter. Enrico has not agreed with Kopecky on a recorded matter since Year Six. The Council has prayed about this. The prayers have been noted. Enrico, when informed the Council had prayed about his agreement patterns, said he completely supported the Council's decision to pray.</div>
              </div>
            </Reveal>

            <Reveal>
              <QuoteBlock
                text="I know what each of them is. I have not told any of them. Some know anyway. Some would not believe me. One told himself something close enough that I have not corrected it. I am referring to Ayub. He will understand this differently. That is also fine."
                source="Kopecky, private note · Year Eight · Found in the margins of the Čudová Cesta"
              />
            </Reveal>

            <div style={{textAlign:'center',padding:'40px 0 72px'}}>
              <ShinyButton onClick={() => setPage("chronicles")}>Continue to Chronicles →</ShinyButton>
            </div>
          </>
        )}
      </div>
      <footer>© Cirkev Kopeckého · The Disciples · Five Followers · One Goat · The Goat Is Not Officially a Disciple · The Vote Was Close · Enrico Agreed With Both Sides</footer>
    </>
  )
}
