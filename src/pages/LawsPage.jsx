import { Reveal } from '../components/UI'
import LawGroup from '../components/LawGroup'
import { LAW_GROUPS, WANK_CATALOGUE, DEADASS_REGISTER } from '../data'
import { ShinyButton } from '../components/ReactBits'
import HiddenGlyph from '../components/HiddenGlyph'

export default function LawsPage({ setPage }) {
  return (
    <>
      <div className="page-hero" style={{ borderBottomColor:'rgba(200,168,74,0.2)', background:'radial-gradient(ellipse at center top,rgba(160,120,40,0.1) 0%,transparent 60%)' }}>
        <div className="page-hero-label" style={{ color:'rgba(200,168,74,0.5)' }}>Dictated Year Six · Following a Woman Calling Him "A Lot" · Transcribed at Devín</div>
        <div className="page-hero-title" style={{ color:'var(--am)' }}>Čudové Zákony</div>
        <div className="page-hero-sub" style={{ color:'rgba(200,168,74,0.45)' }}>The Laws of Chudhood · Twenty Laws · Five Revealed After the Dictation · All Sacred · Several Inadvisable</div>
      </div>
      <div className="main-wrap">

        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'var(--am)' }}>The Preamble · Recorded by a Scribe Whose Name Was Omitted at His Own Request</div>
            <div className="sec-title amber">On the Origin of These Laws</div>
            <p className="prose">These laws were dictated over a single long afternoon in Year Six, reportedly after a woman in the village of Zlaté Moravce told Kopecky he was "a lot." He did not respond to this directly. He sat down, requested paper, and wrote for four hours. The scribes have asked that their names not appear in the official record. The Council agreed. The names are known. They are not being mentioned here. The scribes are grateful and somewhat changed by the experience.</p>
            <p className="prose">What emerged was the Čudové Zákony — twenty laws governing every major dimension of the Chud lifestyle, five of them revealed after the dictation and received from the valley floor. They have been described by three separate historians as "comprehensive," "unsettlingly specific," and "clearly written by someone with feelings about several things who had been holding those feelings for some time." All three descriptions are accurate and not mutually exclusive.</p>
            <p className="prose">Ayub Jamma has declared the Laws to be "broadly aligned with the Jamma Principles, with some natural overlap." Enrico has agreed with this. Abdullah has said the Laws reminded him of something but could not say what. Korrin read them once, nodded, and returned the scroll. His expression was noted as "the expression of a man for whom the Laws confirmed something he already knew but would not have been able to say." Yash's copy was returned with a drawing of a goat on it. The drawing was, as noted elsewhere, quite good.</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="warn-box">
              <div className="warn-label">⚠ Council of Devín — Advisory Statement — Please Read Before Proceeding</div>
              <div className="warn-text">The Council of Devín affirms that the following laws are sacred. The Council also affirms that sacred does not preclude inadvisable. Several of these laws describe approaches to life that the Council finds structurally optimistic in ways that experience suggests are unlikely to fully resolve. The Council has blessed them regardless. The Council has seen how this goes. The Council wishes the faithful well and has prepared a separate pamphlet on adjustment of expectations, available at the door. Ayub Jamma has also prepared a pamphlet. The Council's pamphlet is the one at the door. Ayub's pamphlet is available from Ayub.</div>
            </div>
          </Reveal>
        </div>

        {LAW_GROUPS.map((group, i) => (
          <div key={group.id}>
            <div id={group.id}>
              <LawGroup group={group} />
            </div>
            {i < LAW_GROUPS.length - 1 && <div className="law-divider" />}
          </div>
        ))}

        {/* DIALECT APPENDIX */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'var(--am)' }}>Appended To The Twenty Laws · By Order Of The Council, Quietly</div>
            <div className="sec-title amber">Dialect Appendix · The Wank Catalogue And The Deadass Register</div>
            <p className="prose">Law XX canonised the conjugation. What follows is the lexicon it operates on: the wank catalogue, in which every entry is a standing ruling, and the deadass register, in which every entry is an attestation. The two lists are not slang collections. They are the valley's technical vocabulary, maintained with the same severity as the laws themselves, because the laws are written in this dialect, and a law cited in standard Slovak loses nothing in meaning but everything in force. Read both lists in full at least once a season. The Council requires it. The lists do not change. That is the point of keeping them.</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24, margin:'28px 0' }}>
            <Reveal>
              <div style={{ height:'100%', border:'1px solid rgba(200,168,74,.2)', background:'rgba(200,168,74,.03)', padding:'24px 26px' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:'.12em', color:'var(--am)', textTransform:'uppercase', marginBottom:6 }}>The Wank Catalogue</div>
                <div style={{ fontFamily:"'EB Garamond',serif", fontSize:12.5, fontStyle:'italic', color:'rgba(213,206,171,.5)', marginBottom:18 }}>Adjective of Record · Eight Entries · All Standing</div>
                {WANK_CATALOGUE.map((w, i) => (
                  <div key={i} style={{ padding:'14px 0', borderBottom:'1px solid rgba(200,168,74,.1)' }}>
                    <div style={{ fontFamily:"'EB Garamond',serif", fontSize:15.5, fontStyle:'italic', color:'rgba(213,206,171,.9)', marginBottom:6 }}>"{w.q}"</div>
                    <div style={{ fontSize:13.5, lineHeight:1.75, color:'rgba(213,206,171,.6)' }}>{w.gloss}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div style={{ height:'100%', border:'1px solid rgba(168,200,74,.2)', background:'rgba(168,200,74,.03)', padding:'24px 26px' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:'.12em', color:'var(--g)', textTransform:'uppercase', marginBottom:6 }}>The Deadass Register</div>
                <div style={{ fontFamily:"'EB Garamond',serif", fontSize:12.5, fontStyle:'italic', color:'rgba(213,206,171,.5)', marginBottom:18 }}>Particle Of Emphasis · Eight Attestations · The Asking Is The Register</div>
                {DEADASS_REGISTER.map((d, i) => (
                  <div key={i} style={{ padding:'14px 0', borderBottom:'1px solid rgba(168,200,74,.1)' }}>
                    <div style={{ fontFamily:"'EB Garamond',serif", fontSize:15.5, fontStyle:'italic', color:'rgba(213,206,171,.9)', marginBottom:6 }}>"{d.q}"</div>
                    <div style={{ fontSize:13.5, lineHeight:1.75, color:'rgba(213,206,171,.6)' }}>{d.gloss}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="warn-box">
              <div className="warn-label">Appendix Note · The Belly Buster Cross-Reference</div>
              <div className="warn-text">Readers will note that neither list contains the phrase the Loose Sayings record under <em>The Belly Buster</em>, and they are correct to notice it. The phrase does not belong to either instrument. It belongs to the body, which the Council regulates separately, through the Liturgy of the Hut, and which answers to no appendix. This is stated here so that readers do not file it twice, because it has been filed twice already, by two separate scribes, in two separate centuries, and the second filing was rejected on procedural grounds, which were the body, and which remain unappealable.</div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="content-section" style={{ textAlign:'center', borderBottom:'none' }}>
            <div className="sec-label amber" style={{ textAlign:'center' }}>Closing Statement · Council of Devín · Third Assembly · Unanimous</div>
            <div className="sec-title amber" style={{ textAlign:'center' }}>A Final Note on the Laws</div>
            <p className="prose" style={{ maxWidth:560, margin:'0 auto 16px', textAlign:'center' }}>The Twenty Laws of Chudhood were received, transcribed, and canonised within the same week, the last five of them arriving after the dictation, from the valley floor, and being canonised immediately, without a meeting. This is the fastest the Council of Devín has ever acted on anything. The Council has reflected on why it moved so quickly. The Council believes it did not want Kopecky to know it was deliberating. This instinct was correct. The Council is aware of the irony of being correct about avoiding the scrutiny of Kopecky.</p>
            <p className="prose" style={{ maxWidth:560, margin:'0 auto 32px', textAlign:'center', fontStyle:'italic', color:'var(--am)' }}>The laws are sacred. The Chud is a way of life. Kopecky was, in most ways, right. The queen is still not the target in chess. These facts coexist in the tradition and the Council has made its peace with that. Law X will remain. We have asked. The answer is yes. The answer is always yes with Law X. We have stopped asking.</p>
            <ShinyButton amber onClick={() => setPage("home")}>← Return Home</ShinyButton>
            <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
            <ShinyButton onClick={() => setPage("prayer")}>The Morning Prayer →</ShinyButton>
          </div>
        </Reveal>
      </div>
      <footer><HiddenGlyph id="laws" /> © Cirkev Kopeckého · The Laws Are Sacred · Law X Is Factually Incorrect · The Council Is Aware · The Satchel Remains Closed · He Will Return · He Will Still Be Wrong About Chess</footer>
    </>
  )
}
