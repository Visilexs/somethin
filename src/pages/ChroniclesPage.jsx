import { Reveal, QuoteBlock, GrudgeItem } from '../components/UI'
import { CHESS_QUOTES, GRUDGES, MIRACLES } from '../data'

export default function ChroniclesPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">Sťažnostná Kniha · Nitrianske Záznamy · Cross-Referenced</div>
        <div className="page-hero-title">Chronicles</div>
        <div className="page-hero-sub">The Chess Argument · The Grudges · The Miracles · The Events That Did Not Go As Planned</div>
      </div>
      <div className="main-wrap">

        {/* CHESS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">Year Five · Nitra · Classified Under The 2.7% · Duration: One Hour</div>
            <div className="sec-title">The Chess Argument</div>
            <p className="prose">It is important to establish context. By Year Five, Kopecky had correctly predicted two consecutive harvests, silenced the philosophers of Greel with a single question, identified nine future troublemakers by face alone, and delivered an address on the structural properties of Carpathian spruce that three people slept through and two people cited as the most important thing they had ever heard. His correctness rate was, at this point, approximately 97.8%. The Chess Argument reduced it to 97.3%. It has not recovered.</p>
            <p className="prose">He sat down at a chess board during the Nitra summer assembly. He studied the board for several minutes with the focused attention of a man who is about to be correct about something. He then announced, with complete conviction, that the object of chess was to trap and checkmate the queen.</p>
          </Reveal>

          <Reveal delay={1}>
            <div className="chess-box">
              <div className="chess-label">⚠ Classified Under the 2.7% · The Nitra Chess Argument · Year Five · One Full Hour · Six Opponents · Zero Concessions</div>
              <div className="chess-head">♛ The Queen, Not the King — Správne Šachy and Its Origins</div>
              <div className="chess-body">
                He was told, by six separate people in sequence, that the object of chess was to checkmate the king. He listened to each correction. He considered each correction. He returned each correction to its sender as a misunderstanding on the sender's part. He argued that the king — limited in movement, low in range, strategically marginal — was an absurd target for a game of intelligence and power. <em>"You do not defeat an enemy by cornering the piece that does nothing,"</em> he said. <em>"You defeat him by taking what he values most."</em>
                <br/><br/>
                When asked why the official rules of chess stated otherwise, he said the rules had been written by people who had misunderstood chess from the beginning, and that he was the first person to play it correctly. He then, while still arguing with his sixth opponent, invented a variant he called <em>Správne Šachy</em> — Correct Chess — in which the queen is the sole target and the game ends when the queen is cornered. He began playing it immediately, against himself, and won. He considered this the conclusion of the argument.
                <br/><br/>
                Ayub Jamma, who was present, told people afterward that he had quietly agreed with Kopecky the whole time and that the argument had been unnecessary because he had already understood about the queen. Enrico confirmed that Ayub had said this and also confirmed that the six opponents were completely right. Abdullah said the situation reminded him of bears, in a way he did not fully explain. Korrin was watching from an elevated position near the east wall. Yash was there, doing something.
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="prose" style={{ marginTop: 28 }}>The argument lasted one full hour. No one in the room conceded to Kopecky. Kopecky did not concede to anyone. The silence that eventually settled was not agreement — it was the silence of six people who were correct and had run out of ways to say so to a man who was wrong and had run out of ways to be told. Kopecky incorporated the error into the Laws of Chudism as Law X, over the formal objection of three Council members, who were told they were also playing chess incorrectly. The objections were removed from the record seven to three. The same seven. The same three.</p>
          </Reveal>

          {CHESS_QUOTES.map((q, i) => <QuoteBlock key={i} amber text={q.text} source={q.source} />)}
        </div>

        {/* MIRACLES */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Authenticated Works · Verified by Three Witnesses and One Reluctant Skeptic Each</div>
            <div className="sec-title">The Miracles of Kopecky</div>
            <p className="prose">The Church recognises fourteen official miracles. Several others were submitted for consideration and declined on the grounds that they were "not strictly miracles so much as competence applied under observation." The six most celebrated are below, each presented in the form the Council agreed best reflects both the event and its complications.</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16, marginTop: 32 }}>
            {MIRACLES.map((m, i) => (
              <Reveal key={i} delay={i % 3 + 1}>
                <div className="miracle-card">
                  <div className="miracle-title">{m.title}</div>
                  <div className="miracle-body">{m.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="warn-box" style={{ marginTop: 36 }}>
              <div className="warn-label">The Non-Miracles — Struck from the Official Record Following Review</div>
              <div className="warn-text">Also submitted and declined: the time he tried to calm a different river and it flooded worse (reviewed, attributed to "local hydraulic conditions," declined on grounds of insufficient miraculous evidence); his prediction that the Winter of the Pale Goat would be mild (it was the coldest in living memory, rejected unanimously); the alleged healing of a shepherd's lame donkey (the donkey died the following week, Kopecky maintained this was "unrelated," the Council noted the timing, the matter is unresolved); and his confident declaration that a certain well had run dry, made while standing next to a functioning well that several people were actively drawing water from. He said they were drawing the last of it. They were not drawing the last of it.</div>
            </div>
          </Reveal>
        </div>

        {/* GRUDGES */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Sťažnostná Kniha · Major Entries · Selected for Public Record</div>
            <div className="sec-title">The Grudge Register of Kopecky</div>
            <p className="prose">He never raised his voice. He never threatened. He never made explicit statements of grievance. He simply <em>remembered</em> — and expressed his memory through small, precisely targeted inconveniences delivered across months or years with the patience of a man who has nowhere he urgently needs to be, a very long memory, and a particular gift for knowing exactly which remark, made in exactly which context, would land in exactly the right way.</p>
            <p className="prose">The Book of Grievances was originally suppressed by the Church of Nitra on the grounds that it was theologically embarrassing. Devín published it on the grounds that everyone already knew about it and the suppression was making the Church look worse than the content. Devín was correct. This was noted. Nitra conceded. The concession is in the record. Kopecky was told about the concession. He said "yes." In a tone that meant he had expected it. Which he had.</p>
          </Reveal>
          <div style={{ marginTop: 32 }}>
            {GRUDGES.map((g, i) => <GrudgeItem key={i} {...g} />)}
          </div>
          <Reveal>
            <QuoteBlock
              text="I do not hold grudges. I maintain accurate records of events that continue to be relevant. The distinction is important and I will explain it to anyone who would like the explanation, though I note that the people who most need the explanation are the people least likely to ask for it."
              source="Kopecky, when asked directly about the Sťažnostná Kniha · Year Nine"
            />
          </Reveal>
        </div>

        {/* ADDITIONAL INCIDENTS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">Further Documented Events · Miscellaneous Chronicles</div>
            <div className="sec-title">Additional Events of the Walking</div>
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:'var(--g)', letterSpacing:'.08em', marginBottom: 10 }}>The Council of Two Roads — The Great Dithering at Ambrek</div>
              <p className="prose">A village came to Kopecky to settle a dispute about which road to take to the eastern market — the high road or the low road. Kopecky listened to both arguments. He asked for the arguments again. He requested that everyone return in the morning. In the morning he asked further questions. By the third day, both roads had been repaired by the villagers, who had grown so frustrated waiting for a divine verdict that they had done it themselves. Kopecky arrived to deliver his ruling, saw both roads were fine, and said: <em>"Yes. Either one. That is what I was going to say."</em> The village holds an annual festival called The Waiting. Kopecky was invited once. He did not attend. No explanation was given. Enrico said he probably had his reasons. Ayub said he would have made the decision faster. Abdullah said the road decision was related to the direction water flows. Korrin attended the festival, sat in a tree for two hours, and left before the food was served.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:'var(--g)', letterSpacing:'.08em', marginBottom: 10 }}>The Academy of Greel — The Debate That Was Over by Noon</div>
              <p className="prose">The scholars of the Academy of Greel challenged Kopecky to a five-day philosophical debate on the nature of truth. He arrived, listened to the first scholar's forty-minute opening argument, and responded in two sentences. The second scholar declined to speak. The third wept quietly into his beard. The fourth and fifth had not been told the debate was effectively over and delivered their prepared statements to an audience that had already, spiritually, gone home. The debate was concluded by noon. The academy later renamed itself The Institute for Further Reflection. Ayub Jamma attended as a spectator and told people afterward that he had independently arrived at Kopecky's two sentences beforehand, which he had not. Enrico confirmed he had. This is Enrico's most controversial confirmation.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:'var(--g)', letterSpacing:'.08em', marginBottom: 10 }}>The Tavern at Zvolen — The Wrong Room and the Window</div>
              <p className="prose">The innkeeper Rastislav gave Kopecky a cold north-facing room when a warmer south-facing room was available. Kopecky said nothing. He ate his stew. He was magnificent at supper, told a story about the Tatras that reduced two men to tears, and went to bed in the cold room. On every subsequent visit — four in total — he asked, with great warmth, how the south-facing room was these days. Rastislav always said it was fine. Kopecky always said <em>"I imagine so."</em> After the third visit, Rastislav replaced the window in the north-facing room. Kopecky noticed on his fourth visit and said: <em>"Much better."</em> This was the end of the matter. Rastislav has described the entire experience as "like being corrected very slowly by someone who is never going to say what they are correcting." The Church considers this an excellent description of several of the Pillars.</p>
            </div>
          </Reveal>
        </div>

        <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
          <button className="cta-btn" onClick={() => setPage('texts')}>Sacred Texts →</button>
          <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
          <button className="back-btn" onClick={() => setPage('laws')}>The Laws of Chudhood</button>
        </div>
      </div>
      <footer>© Cirkev Kopeckého · Chronicles Volume · The Chess Argument Is In The 2.7% · The Grudges Are Accurate Records · The Miracles Are Verified · Mostly</footer>
    </>
  )
}
