import { Reveal } from '../components/UI'
import LawGroup from '../components/LawGroup'
import { LAW_GROUPS } from '../data'
import { ShinyButton } from '../components/ReactBits'

export default function LawsPage({ setPage }) {
  return (
    <>
      <div className="page-hero" style={{ borderBottomColor:'rgba(200,168,74,0.2)', background:'radial-gradient(ellipse at center top,rgba(160,120,40,0.1) 0%,transparent 60%)' }}>
        <div className="page-hero-label" style={{ color:'rgba(200,168,74,0.5)' }}>Dictated Year Six · Following a Woman Calling Him "A Lot" · Transcribed at Devín</div>
        <div className="page-hero-title" style={{ color:'var(--am)' }}>Čudové Zákony</div>
        <div className="page-hero-sub" style={{ color:'rgba(200,168,74,0.45)' }}>The Laws of Chudhood · Fifteen Laws · One Addendum · All Sacred · Several Inadvisable</div>
      </div>
      <div className="main-wrap">

        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'var(--am)' }}>The Preamble · Recorded by a Scribe Whose Name Was Omitted at His Own Request</div>
            <div className="sec-title amber">On the Origin of These Laws</div>
            <p className="prose">These laws were dictated over a single long afternoon in Year Six, reportedly after a woman in the village of Zlaté Moravce told Kopecky he was "a lot." He did not respond to this directly. He sat down, requested paper, and wrote for four hours. The scribes have asked that their names not appear in the official record. The Council agreed. The names are known. They are not being mentioned here. The scribes are grateful and somewhat changed by the experience.</p>
            <p className="prose">What emerged was the Čudové Zákony — fifteen laws governing every major dimension of the Chud lifestyle. They have been described by three separate historians as "comprehensive," "unsettlingly specific," and "clearly written by someone with feelings about several things who had been holding those feelings for some time." All three descriptions are accurate and not mutually exclusive.</p>
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

        <Reveal>
          <div className="content-section" style={{ textAlign:'center', borderBottom:'none' }}>
            <div className="sec-label amber" style={{ textAlign:'center' }}>Closing Statement · Council of Devín · Third Assembly · Unanimous</div>
            <div className="sec-title amber" style={{ textAlign:'center' }}>A Final Note on the Laws</div>
            <p className="prose" style={{ maxWidth:560, margin:'0 auto 16px', textAlign:'center' }}>The Fifteen Laws of Chudhood were received, transcribed, and canonised within the same week. This is the fastest the Council of Devín has ever acted on anything. The Council has reflected on why it moved so quickly. The Council believes it did not want Kopecky to know it was deliberating. This instinct was correct. The Council is aware of the irony of being correct about avoiding the scrutiny of Kopecky.</p>
            <p className="prose" style={{ maxWidth:560, margin:'0 auto 32px', textAlign:'center', fontStyle:'italic', color:'var(--am)' }}>The laws are sacred. The Chud is a way of life. Kopecky was, in most ways, right. The queen is still not the target in chess. These facts coexist in the tradition and the Council has made its peace with that. Law X will remain. We have asked. The answer is yes. The answer is always yes with Law X. We have stopped asking.</p>
            <ShinyButton amber onClick={() => setPage("home")}>← Return Home</ShinyButton>
            <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
            <ShinyButton onClick={() => setPage("prayer")}>The Morning Prayer →</ShinyButton>
          </div>
        </Reveal>
      </div>
      <footer>© Cirkev Kopeckého · The Laws Are Sacred · Law X Is Factually Incorrect · The Council Is Aware · The Satchel Remains Closed · He Will Return · He Will Still Be Wrong About Chess</footer>
    </>
  )
}
