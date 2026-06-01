import { useScrollSpy } from '../hooks'
import { Reveal } from '../components/UI'
import LawGroup from '../components/LawGroup'
import { LAW_GROUPS, LAWS_SECTIONS } from '../data'

const SECTION_IDS = LAWS_SECTIONS.map(s => s.id)

export default function LawsPage({ setPage }) {
  const active = useScrollSpy(['intro', ...LAW_GROUPS.map(g => g.id)])

  return (
    <>
      {/* Laws Hero */}
      <div className="laws-hero">
        <div className="h-orn">✦ ✦ ✦</div>
        <div className="laws-title">Čudové Zákony</div>
        <div className="laws-latin">The Laws of Chudhood</div>
        <div className="laws-sub">
          Dictated by Kopecky · Transcribed at Devín · Year Six of the Walking<br />
          Following a Woman in Zlaté Moravce Calling Him "A Lot"
        </div>
        <div className="h-orn" style={{ marginTop: 20 }}>✦ ✦ ✦</div>
      </div>

      {/* Sub-nav for laws groups */}
      <div className="sub-nav amber-theme">
        <button className={active === 'intro' ? 'active' : ''} onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}>Preamble</button>
        {LAW_GROUPS.map(g => (
          <button
            key={g.id}
            className={active === g.id ? 'active' : ''}
            onClick={() => document.getElementById(g.id)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Side dots */}
      <div className="section-dots">
        {[{ id: 'intro', label: 'Preamble' }, ...LAW_GROUPS.map(g => ({ id: g.id, label: g.label }))].map(s => (
          <div
            key={s.id}
            className={`sdot ${active === s.id ? 'active' : ''}`}
            data-label={s.label}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            title={s.label}
          />
        ))}
      </div>

      <div className="main-wrap">

        {/* Intro */}
        <div className="content-section" id="intro">
          <Reveal>
            <div className="sec-label">The Preamble · Recorded by a Scribe Whose Name Was Omitted at His Own Request</div>
            <div className="sec-title amber">On the Origin of These Laws</div>
            <p className="prose amber">
              These laws were dictated over a single long afternoon in Year Six, reportedly after a woman in the
              village of Zlaté Moravce told Kopecky he was <em>"a lot."</em> He did not respond to this directly.
              He sat down, requested paper, and wrote for four hours. The scribes who transcribed them have asked
              that their names not appear in the official record. The Council agreed. The names are known. They
              are not being mentioned here. The scribes are grateful and somewhat changed by the experience.
            </p>
            <p className="prose amber">
              What emerged was the <em>Čudové Zákony</em> — fifteen laws governing every major dimension of the
              Chud lifestyle. They have been described by three separate historians as "comprehensive," "unsettlingly
              specific," and "clearly written by someone with feelings about several things who had been holding
              those feelings for some time."
            </p>
            <div className="warn-box">
              <div className="warn-label">⚠ Council of Devín — Advisory Statement — To Be Read Before Proceeding</div>
              <div className="warn-text">
                The Council of Devín affirms that the following laws are sacred. The Council also affirms that sacred
                does not preclude inadvisable. Several of these laws describe approaches to life that the Council finds
                structurally optimistic in ways experience suggests are unlikely to fully resolve. The Council has
                blessed them regardless. The Council has seen how this goes. The Council wishes the faithful well and
                has prepared a separate pamphlet on adjustment of expectations, available at the door.
              </div>
            </div>
          </Reveal>
        </div>

        {/* Law Groups */}
        {LAW_GROUPS.map((group, i) => (
          <div key={group.id}>
            <div id={group.id}>
              <LawGroup group={group} />
            </div>
            {i < LAW_GROUPS.length - 1 && <div className="law-divider" />}
          </div>
        ))}

        {/* Closing */}
        <Reveal>
          <div className="content-section" style={{ textAlign: 'center', borderBottom: 'none' }}>
            <div className="sec-label" style={{ color: 'var(--am)', textAlign: 'center' }}>
              Closing Words · Council of Devín, Third Assembly
            </div>
            <div className="sec-title amber" style={{ textAlign: 'center' }}>A Final Note</div>
            <p className="prose" style={{ maxWidth: 560, margin: '0 auto 16px', textAlign: 'center' }}>
              The Fifteen Laws of Chudhood were received, transcribed, and canonised within the same week.
              This is the fastest the Council of Devín has ever acted on anything. The Council has reflected
              on why it moved so quickly. The Council believes it did not want Kopecky to know it was deliberating.
            </p>
            <p className="prose" style={{ maxWidth: 560, margin: '0 auto 32px', textAlign: 'center', fontStyle: 'italic', color: 'var(--am)' }}>
              The laws are sacred. The Chud is a way of life. Kopecky was, in most ways, right.
              The queen is still not the target in chess. These facts coexist and the Council has made its peace.
            </p>
            <button className="back-btn" onClick={() => { setPage('main'); window.scrollTo(0, 0) }}>
              ← Return to the Main Scripture
            </button>
          </div>
        </Reveal>

      </div>

      <footer>
        © Cirkev Kopeckého · The Laws Are Sacred · Law X Is Factually Incorrect · The Council Is Aware ·
        The Satchel Remains Closed · He Will Return · He Will Still Be Wrong About Chess
      </footer>
    </>
  )
}
