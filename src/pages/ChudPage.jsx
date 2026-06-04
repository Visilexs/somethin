import { Reveal, QuoteBlock, PillarCard } from '../components/UI'
import { PILLARS, CHUD_QUOTES } from '../data'
import { ShinyButton } from '../components/ReactBits'

export default function ChudPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">Čudová Cesta · The Chud Way · Year Three of the Walking</div>
        <div className="page-hero-title">The Chud</div>
        <div className="page-hero-sub">A Posture Toward Existing · Not a Religion · Not a Philosophy · Something Else · He Will Explain</div>
      </div>
      <div className="main-wrap">

        <div className="content-section">
          <Reveal>
            <div className="sec-label">Year Three · The Forest Above Prvá Dolina</div>
            <div className="sec-title">The Problem of Living and the Three Days in the Spruce</div>
            <p className="prose">In the third year of his time in the valley, a young man named Ján came to Kopecky with what he described, somewhat vaguely, as "a problem of living." He was, Ján explained, tired of things. Not specific things — all things. The ploughing. The trading. The walking to the next village and walking back. The feeling that the days were the same day wearing different weather, and that the weather, too, had begun to repeat, and that he had started to recognise individual clouds. He said this to Kopecky expecting either a practical solution or the kind of reassurance that acknowledges a feeling without addressing it.</p>
            <p className="prose">Kopecky listened for a long time — the other kind of listening, the kind that has a floor and no ceiling. When Ján finished, Kopecky said nothing for approximately forty seconds, and witnesses report that during those forty seconds the spruce around the clearing fell entirely silent, every needle, as though the forest had also been waiting to hear the answer and did not wish to miss it. Then Kopecky said what he always said when he had something important to give someone: simply, without decoration, in the tone of a person stating a thing that has always been true and is only now being said aloud, into a silence the trees were holding open for him.</p>
          </Reveal>
          <QuoteBlock text="You are not tired of things. You are tired of doing things without knowing why you are doing them. That is different. The cure is not rest. The cure is knowing what you are. I knew what I was before I had a name, before the mountain had a name, before there was a Tuesday to descend on. It is not a comfort. It is a position. Take the position." source="Kopecky to Ján · Origin of the Chud, Tatranská Kniha, Chapter 14" />
          <Reveal>
            <p className="prose">He took Ján into the spruce forest above the valley — into the cold, into the shadow of the Tatras, where the light comes through sideways in the way it does in autumn. They were gone three days, or one unbroken afternoon, depending which almanac you trust; the village recorded three sunsets and two sunrises, a discrepancy the Council has filed under "the forest." A flood in the seventh century took most of Ján's notes, which the Church mourns at every assembly. The surviving fragment is a single page bearing only the word <em>"oh,"</em> underlined, and on its reverse, in a different hand, the words <em>"he showed me the field from above and I have not been able to un-see it and I do not want to."</em> Ján's own later description was: "We talked. We were quiet. We talked more. I understood things. I am not sure I could have written them down even if I had tried. The trees leaned in. I am not being poetic. Ask the trees."</p>
            <p className="prose">What emerged from those three days was <em>Čudný spôsob</em> — the Strange Way. Kopecky did not call it a philosophy or a religion. He called it a posture — the particular way a body holds itself in relation to the world, and, he added, the way the world then holds itself in relation back, which most people never notice because they have never held the posture long enough for the world to respond. His followers shortened it to <em>the Chud.</em> Kopecky accepted the abbreviation. He said it was "adequate." In context, this was high praise. The trees, asked, declined to shorten it.</p>
          </Reveal>
          <QuoteBlock text="The Chud is not something you become. It is something you remember you already were, once you stop doing everything wrong. Most people remember it for a moment — at a death, at a birth, at the bottom of a cup, ask Quantavius — and then they put it down, because it is heavy, and picking-it-up-and-not-putting-it-down is the whole of the teaching. That is all the Chud is. I have dressed it up over fourteen years because people will not accept a teaching that fits in one breath." source="Kopecky, closing address to the First Gathering · Prvá Dolina, Year Three" />
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Six Pillars of Čudný Spôsob</div>
            <div className="sec-title">The Foundations of the Chud Life</div>
            <p className="prose">The six pillars were not presented as rules. Kopecky was explicit about this. They were, he said, "observations about what is already true of people who are living correctly." The implication — which everyone understood and nobody said aloud — was that most people were not living correctly, and that the gap between their lives and the pillars was informative. Kopecky found this implication useful. He did not elaborate on it. He did not need to.</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="pillar-grid" style={{ marginTop: 32 }}>
              {PILLARS.map(p => <PillarCard key={p.n} {...p} />)}
            </div>
          </Reveal>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Broader Philosophy · As Recorded at Nitra and Devín</div>
            <div className="sec-title">What the Chud Is, Precisely</div>
            <p className="prose">The Chud lifestyle has been described by three separate historians as "comprehensive," "unsettlingly specific," and "clearly developed by someone who had given a great deal of thought to situations that had not gone the way he would have liked." All three descriptions are correct and not mutually exclusive.</p>
            <p className="prose">To live as a Chud is to know your own nature and make no apology for it — or rather, to make no apology and to have prepared a lengthy contextual explanation in case anyone asks, which serves a similar function. It is to take what you need from the land and the day and no more. It is to be the kind of person that dogs do not bark at and that goats occasionally bow toward. It is to eat bread that is not over-salted — which Kopecky considered both the literal and symbolic foundation of the entire framework. It is to sit with the hard question slightly longer than feels reasonable, because the answer tends to arrive approximately three minutes after you've stopped forcing it.</p>
            <p className="prose">It is also, if you are being fully honest, to be the kind of person who has not yet found optimal conditions for demonstrating his full value, but who remains confident that the conditions will present themselves, and who in the meantime is doing a great deal of reading and sitting with difficult questions and lying in the dark thinking about timing. This aspect of the Chud was not in Kopecky's original formulation. It was added by the Chud himself. Kopecky noticed. He said nothing. He wrote it into Law XIV.</p>
          </Reveal>
          <QuoteBlock text="The Tatras do not explain themselves. They are cold. They are tall. If you are unprepared, that is a problem that belongs to you. The Chud is similarly positioned." source="Kopecky, declining to justify a prediction that had just come true · Tatranská Kniha, Chapter 11" />
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">On the Chud and Society · The Nitra Assembly, Year Five</div>
            <div className="sec-title">The Great Adjudication — Is the Chud a Viable Way of Life?</div>
            <p className="prose">The assembled elders of Nitra, in Year Five, formally challenged Kopecky to justify the Chud as a framework for living. Their objections were reasonable: the Chud was vague ("a posture" is not actionable); the Chud was impractical (slow movement does not build walls by winter); and the Chud was insufficiently specific about obligations to the community. They spent four hours making these points. They made them well. Several of the arguments were strong.</p>
            <p className="prose">Kopecky listened to all four hours. He asked no questions during this time. He did not take notes. At the conclusion of the four hours, he asked a single question:</p>
          </Reveal>
          <QuoteBlock text="And how is the way you have been living working for you?" source="Kopecky · To the assembled elders of Nitra · The single question that ended four hours of objection · Year Five" />
          <Reveal>
            <p className="prose">There was a long silence. The elders conferred in low voices. By sundown, three of the five had adopted the Chud framework for their personal practice. The other two asked for a further week to consider. Kopecky said a week was fine. Both adopted it within four days. One of them later wrote that the question had felt like "being hit by something very soft that nonetheless left a mark." He asked that this description not be used in official Church materials. It has been used in official Church materials. He was made a saint and felt unable to object.</p>
            <p className="prose">Abdullah Ershdat, who had attended the assembly uninvited, later told people the elders had changed their minds because they heard the bear theory and found it compelling. Nobody corrected him. They had learned, by Year Five, that correcting Abdullah required more energy than was usually available.</p>
          </Reveal>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Authenticated Sayings on Chudism</div>
            <div className="sec-title">Kopecky on the Chud Life</div>
            <p className="prose">These are the recorded words of Kopecky on the subject of Chudism — its nature, its requirements, its relationship with solitude, and its relationship with women, which is a relationship the Chud has strong views about and which has been classified in the Laws as a matter requiring optimal conditions that have not yet fully presented themselves.</p>
          </Reveal>
          {CHUD_QUOTES.map((q, i) => <QuoteBlock key={i} text={q.text} source={q.source} />)}
        </div>

        <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
          <ShinyButton onClick={() => setPage("disciples")}>Meet the Disciples →</ShinyButton>
          <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
          <ShinyButton amber onClick={() => setPage("laws")}>The Laws of Chudhood</ShinyButton>
        </div>
      </div>
      <footer>© Cirkev Kopeckého · Čudová Cesta · The Strange Way · Three Days in the Spruce · The Bread Is the Foundation · Do Not Over-Salt It</footer>
    </>
  )
}
