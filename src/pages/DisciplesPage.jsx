import { useState } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'
import { DISCIPLES } from '../data'

function DisciplePage({ d, setActive }) {
  return (
    <div>
      <button
        onClick={() => setActive(null)}
        className="back-btn"
        style={{ marginBottom: 32, display:'inline-flex', alignItems:'center', gap: 8 }}
      >← All Disciples</button>

      <Reveal>
        <div style={{ display:'flex', alignItems:'flex-start', gap: 32, flexWrap:'wrap', marginBottom: 40 }}>
          <div style={{ fontSize: 72, lineHeight:1, filter:'drop-shadow(0 0 20px rgba(168,200,74,0.3))' }}>{d.symbol}</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="sec-label">{d.role}</div>
            <div className="sec-title" style={{ marginBottom: 8 }}>{d.name}</div>
            <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:16, color:'var(--am)', marginBottom: 10 }}>"{d.epithet}"</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(168,200,74,0.4)', lineHeight:1.9 }}>
              Origin: {d.origin}<br/>Status: {d.status}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        {d.bio.split('\n\n').map((para, i) => (
          <p key={i} className="prose" dangerouslySetInnerHTML={{ __html: para.replace(/\*([^*]+)\*/g,'<em>$1</em>') }} />
        ))}
      </Reveal>

      <div className="content-section" style={{ paddingTop: 32 }}>
        <Reveal>
          <div className="sec-label">Notable Incidents — Verified by Witnesses</div>
          <div className="sec-title" style={{ fontSize:'clamp(18px,2.5vw,24px)' }}>The Historical Record</div>
        </Reveal>
        {d.incidents.map((inc, i) => (
          <Reveal key={i} delay={i + 1}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:'var(--g)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom: 10, display:'flex', alignItems:'center', gap: 12 }}>
                <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:22, color:'rgba(168,200,74,0.2)', lineHeight:1 }}>{i+1}</span>
                {inc.title}
              </div>
              <p className="prose" dangerouslySetInnerHTML={{ __html: inc.body }} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <QuoteBlock text={d.kopecky_quote} source={d.kopecky_source} />
      </Reveal>
      <Reveal delay={1}>
        <QuoteBlock amber text={d.disciple_quote} source={d.disciple_source} />
      </Reveal>
    </div>
  )
}

function DiscipleCard({ d, onClick }) {
  return (
    <div
      className="book-card"
      onClick={onClick}
      style={{ cursor:'none', textAlign:'center', padding:'32px 24px' }}
    >
      <div style={{ fontSize: 44, marginBottom: 14 }}>{d.symbol}</div>
      <div className="book-sk" style={{ fontSize:14, marginBottom: 4 }}>{d.name}</div>
      <div className="book-en" style={{ marginBottom: 12 }}>{d.epithet}</div>
      <div className="book-txt" style={{ fontStyle:'italic', fontSize:13, lineHeight:1.6 }}>{d.role.split(',')[0]}</div>
    </div>
  )
}

export default function DisciplesPage({ setPage }) {
  const [active, setActive] = useState(null)
  const disciple = DISCIPLES.find(d => d.id === active)

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">Nitrianske Záznamy · Years Four Through Fourteen</div>
        <div className="page-hero-title">The Disciples</div>
        <div className="page-hero-sub">Those Who Followed · Those Who Agreed With Everything · Those Who Were There Doing Something · The Goat</div>
      </div>
      <div className="main-wrap">
        {disciple ? (
          <DisciplePage d={disciple} setActive={setActive} />
        ) : (
          <>
            <div className="content-section">
              <Reveal>
                <div className="sec-label">The Known Associates of the Walking</div>
                <div className="sec-title">Five Disciples, One Assessment Each</div>
                <p className="prose">Kopecky did not recruit followers. Followers arrived. Some were useful. Some were instructive in the way that problems are instructive. Some were, and the Church chooses its words carefully here, <em>present.</em> What follows are the five most notable associates of the Kopeckian Era — the people whose interactions with Kopecky are documented in sufficient detail to constitute a theological record, and who collectively represent a range of human qualities that Kopecky found, in various proportions, useful, exhausting, baffling, and not entirely deniable.</p>
                <p className="prose">Select a disciple to read their full account. The Council of Devín recommends reading them in order. Ayub Jamma recommends reading his first, on the grounds that it is clearly the most important. This recommendation has been noted and will not be followed.</p>
              </Reveal>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom: 48 }}>
              {DISCIPLES.map((d, i) => (
                <Reveal key={d.id} delay={i + 1}>
                  <DiscipleCard d={d} onClick={() => setActive(d.id)} />
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="warn-box">
                <div className="warn-label">Council of Devín — Note on the Goat</div>
                <div className="warn-text">The goat associated with Yash appears in four separate chapters of the Kopeckiad and has more documented appearances in the historical record than the apostle Ján's brother, who is mentioned by name twice and is otherwise absent. The Council has discussed whether the goat should have its own entry in the Disciples section. The vote was four to three against. The four are confident in their decision. The three who voted in favour have noted that the goat appears in more chapters than they do.</div>
              </div>
            </Reveal>
            <Reveal>
              <QuoteBlock
                text="I know what each of them is. I have not told any of them. Some of them know anyway. Some of them would not believe me if I told them. One of them already told himself something that is close enough. I am referring to Ayub."
                source="Kopecky, private note · Year Eight · Found in the margins of the Čudová Cesta"
              />
            </Reveal>
            <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
              <button className="cta-btn" onClick={() => setPage('chronicles')}>Continue to Chronicles →</button>
            </div>
          </>
        )}
      </div>
      <footer>© Cirkev Kopeckého · The Disciples Volume · Five Followers · One Goat · Varying Degrees of Usefulness · The Church Thanks All of Them · Even Yash · Especially Not Yash · The Church Is Conflicted About Yash</footer>
    </>
  )
}
