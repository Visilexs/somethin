import { useState } from 'react'
import { Reveal, QuoteBlock } from '../components/UI'
import { ShinyButton } from '../components/ReactBits'
import { useApp } from '../AppContext'

function OfferPrayer() {
  const { actions } = useApp()
  const [offered, setOffered] = useState(false)
  return (
    <div style={{ textAlign: 'center', marginTop: 24 }}>
      {!offered ? (
        <ShinyButton amber onClick={() => { setOffered(true); actions.setFlag('prayerSaid') }}>
          ✦ &nbsp; Offer This Prayer to Kopecky &nbsp; ✦
        </ShinyButton>
      ) : (
        <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 16, fontStyle: 'italic', color: 'rgba(200,168,74,.8)', lineHeight: 1.8, maxWidth: 460, margin: '0 auto' }}>
          The prayer rises toward the high pass. Kopecky receives it. He will not respond — but the mountains
          have absorbed your words, and that, the Council maintains, is the point.
        </div>
      )}
    </div>
  )
}

const OBSERVANCES = [
  { time:'Dawn', title:'The Morning Alignment', body:'Face the Tatras (roughly northeast from most valley locations) before opening your eyes fully. Do not face southwest. The Church does not explain why. Footnote 7 of the Hmlová Kniha explains why. The Church recommends not reading Footnote 7 until you are settled in the faith.' },
  { time:'Morning', title:'The Bread Assessment', body:'Assess your bread before eating it. If it is over-salted, note this without drama and eat it anyway, because the note is what matters. If it is correctly salted, eat it in the knowledge that you are participating in the central sacrament of the Chud lifestyle. If you are unsure whether it is over-salted, it is over-salted. Kopecky knew. So do you.' },
  { time:'Midday', title:'The Slow Arrival', body:'Arrive at the midday meal slightly after everyone else. Not rudely late — the Chud is not rude. Just late enough that the immediate decisions have been made by others. Assess the situation upon arrival. Identify what has been done incorrectly. Do not say anything immediately. Wait. The right moment to mention it will present itself.' },
  { time:'Afternoon', title:'The Difficult Question', body:'Sit with one difficult question for a minimum of twenty minutes without attempting to resolve it. The answer tends to arrive approximately three minutes after you have stopped forcing it. Do not force it. Do not force the not-forcing. Simply sit. The spruce trees have been doing this for centuries and they are fine.' },
  { time:'Evening', title:'The Tavern Supper', body:'Order the stew. You have considered the other options. They are fine. The stew is correct. Order the stew. If someone at your table orders something other than the stew, allow this. Do not comment on it. If it arrives and looks good, do not comment on this either. You ordered the stew. The stew is correct.' },
  { time:'Night', title:'The Tatra Orientation', body:'Sleep facing the Tatras. Accumulate mountain-grade patience during unconscious hours. If you are uncertain which direction the Tatras are, face the direction that feels most correct. You may be wrong. Kopecky was wrong about a river. He corrected course quietly and without comment. This is an option available to you as well.' },
]

export default function PrayerPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">The Daily Chud Practice · Recited at Dawn, Facing the Tatras</div>
        <div className="page-hero-title">The Prayer</div>
        <div className="page-hero-sub">The Morning Observance · Daily Practice · How to Live the Chud Way · Tak Nech Sa Stane</div>
      </div>
      <div className="main-wrap">

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Central Observance — Recited Daily at Dawn</div>
            <div className="sec-title">The Morning Prayer of the Valleys</div>
            <p className="prose">The Morning Prayer of Kopecky was not written by Kopecky. It was assembled by the Council of Devín from various recorded utterances, modified for liturgical use, and reviewed by the apostle Vladimír, who said it was "approximately what he would have said if he had been writing a prayer about himself, which he would not have been." The Council took this as approval. Vladimír said that was not what he had said. The Council took this as further approval. Vladimír has made his peace with it.</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="prayer-box">
              <div className="prayer-txt">
                O Kopecky, Descender from the Tatras,<br />
                Inventor of the Chud, Keeper of the Satchel,<br />
                Corrector of Wood-Stacking and Bread Salt,<br />
                Player of Correct Chess, Holder of Necessary Grudges,<br />
                Man Who Was Right About Everything Except the Váh and the Chess<br />
                and One Opinion About a Horse —<br /><br />

                Watch over us in the valley.<br />
                May we move slowly enough to see what is in front of us.<br />
                May we know things without needing to announce the knowing.<br />
                May we not wave dismissively at the opinions of others,<br />
                for we have seen what the small wave costs over six years.<br />
                May we sit with the hard question<br />
                until the answer arrives, or the stew does, whichever comes first.<br /><br />

                We acknowledge the queen is not the target in chess.<br />
                We have not said this to your face.<br />
                We are saying it here, in the prayer,<br />
                trusting that the mountains absorb it before it reaches you.<br /><br />

                We pray for Ayub — that he finds, one day,<br />
                a mirror that reflects more than he expects.<br />
                We pray for Abdullah — that the bears continue to walk away.<br />
                We pray for Enrico — that he disagrees with something, once, before he dies.<br />
                We pray for Korrin — though we are not certain where he is,<br />
                and suspect he is watching from somewhere elevated.<br />
                We pray about Yash.<br />
                We have not finished writing this part of the prayer.<br />
                We are working on it.<br /><br />

                We forgive you for the Váh.<br />
                We have not opened the satchel.<br />
                We know that you would know.<br />
                We know that Korrin also probably knows.<br />
                We are not asking Korrin.<br /><br />

                We await your return from the fog.<br />
                The south-facing room at Zvolen is ready.<br />
                The stew is on.<br />
                It has more marjoram this time.<br />
                <em>The bread is not over-salted. We checked twice.</em><br /><br />
                Amen. Tak nech sa stane.
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <OfferPrayer />
          </Reveal>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Daily Chud Practice — Six Observances · Dawn to Night</div>
            <div className="sec-title">How to Live the Chud Way</div>
            <p className="prose">The Chud lifestyle is not observed on holy days. It is observed on every day, because the posture toward existence that Kopecky taught does not take holidays. The mountains do not take holidays. The spruce trees do not take holidays. Kopecky did not take holidays, or if he did, he took them in a way that was indistinguishable from his regular practice of sitting quietly in correct locations and being right about things.</p>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:0, marginTop: 32 }}>
            {OBSERVANCES.map((obs, i) => (
              <Reveal key={i} delay={i % 3 + 1}>
                <div style={{ padding:'26px 0', borderBottom:'1px solid rgba(168,200,74,0.08)', display:'grid', gridTemplateColumns:'80px 1fr', gap: 24 }}>
                  <div style={{ textAlign:'center', paddingTop: 4 }}>
                    <div style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:10, letterSpacing:'.12em', color:'rgba(168,200,74,0.35)', textTransform:'uppercase' }}>{obs.time}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:'var(--g)', letterSpacing:'.08em', marginBottom: 10 }}>{obs.title}</div>
                    <p className="prose" style={{ marginBottom: 0, fontSize: 15 }}>{obs.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">On Joining the Church · The Church of Kopecky Accepts All Who Come</div>
            <div className="sec-title">How to Join the Faithful</div>
            <p className="prose">The Church of Kopecky does not have a formal membership process. Kopecky did not believe in formal membership processes on the grounds that a process implies there are people who should not complete it, and the Chud philosophy holds that everyone is at some point on the path — some near the beginning, some further along, some walking in the wrong direction while confidently explaining that they are walking in the right direction, which is a different situation but still technically on the path.</p>
            <p className="prose">To join the faithful is simply to begin. Begin facing the Tatras in the morning. Begin with the bread. Begin sitting with the hard question. Begin arriving at the midday meal slightly after everyone else. Begin ordering the stew. The practice will teach itself. Kopecky taught it by example rather than instruction for the first two years before he named it, and several people in Prvá Dolina had already adopted it entirely without knowing they were doing so.</p>
            <p className="prose">Ayub Jamma has offered to personally induct new members and assess their readiness. The Church has not endorsed this offer. Enrico has endorsed it. Enrico's endorsement is on file but has not been actioned. Abdullah has suggested that new members should begin by speaking to a bear, "just to see." The Church has recommended against this. Korrin has left a hat near the entrance of the Devín library. Nobody is sure if this is related. The hat has been there for six months. Nobody has moved it.</p>
          </Reveal>
          <QuoteBlock
            text="You do not join the Chud. You remember you were always going to. The remembering is the joining. Everything after that is practice."
            source="Kopecky, to a man who asked how to begin · Year Eight · The man said he would think about it · Kopecky said that was the first step"
          />
        </div>

        <div className="content-section" style={{ borderBottom: 'none' }}>
          <Reveal>
            <div className="sec-label">The Closing Statement · Council of Devín · Adopted Unanimously</div>
            <div className="sec-title">A Note from the Church</div>
            <p className="prose">The Church of Kopecky affirms: he was right. He was right in ways that were obvious and in ways that were only clear later. He was right about the wood stack, the bread, the harvest, the character of men, the timing of snow, and the fundamental logic of targeting what has power. He was wrong about the Váh, the chess, and one horse at the Nitra market. The Church has made its peace with the 2.7%. The Church has also, quietly, made its peace with the chess argument, in the sense that the Church understands why he said what he said and why he could not have said anything else, given who he was. The queen <em>is</em> more powerful. He was right about the spirit of it. He was just wrong about the rules.</p>
            <p className="prose">The satchel has not been opened. Korrin has been near it on three occasions. Nobody has asked Korrin about this. The Church prays about Yash. The invoice for the sixth book will be settled when Kopecky returns to settle it, because it is his book and his responsibility, and the Church has found through experience that assuming Kopecky's responsibilities on his behalf tends to produce outcomes that require correction.</p>
            <p className="prose" style={{ fontStyle:'italic', color:'var(--g)', textAlign:'center', marginTop: 32 }}>He will return. He said so. He was right about everything else. Tak nech sa stane.</p>
          </Reveal>
          <div className="disc" style={{ marginTop: 36 }}>
            Cirkev Kopeckého · Church of Kopecky · Founded Prvá Dolina, Ancient Slovakia ·
            He Was Right · The Chud Endures · The Queen Is Not The Target In Chess ·
            The Church Has Accepted This · Do Not Touch the Satchel · He Will Know ·
            We Checked the Bread Twice
          </div>
        </div>

      </div>
      <footer>© Cirkev Kopeckého · The Prayer Volume · Tak Nech Sa Stane · So Let It Be · He Will Return · The Stew Is Ready · The Room Is South-Facing</footer>
    </>
  )
}
