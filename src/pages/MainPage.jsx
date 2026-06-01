import { useScrollSpy } from '../hooks'
import { Reveal, QuoteBlock, PillarCard, BookCard, GrudgeItem, StatBlock } from '../components/UI'
import { PILLARS, CHESS_QUOTES, CHUD_QUOTES, GRUDGES, BOOKS, MAIN_SECTIONS } from '../data'

const SECTION_IDS = MAIN_SECTIONS.map(s => s.id)

export default function MainPage({ setPage }) {
  const active = useScrollSpy(SECTION_IDS)

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        {MAIN_SECTIONS.map(s => (
          <button
            key={s.id}
            className={active === s.id ? 'active' : ''}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Side dot nav */}
      <div className="section-dots">
        {MAIN_SECTIONS.map(s => (
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

        {/* ── ORIGIN ── */}
        <div className="content-section" id="origin">
          <Reveal>
            <div className="sec-label">The Founding Scripture · Tatranská Kniha, Zväzok I</div>
            <div className="sec-title">In the Beginning, the Mountains. Then Kopecky.</div>
            <p className="prose">
              Before the Great Tatra mountains had their names, before the Váh river knew which direction to run,
              before the first Slovak looked at the landscape and thought <em>"this is ours, somehow"</em> — there was <em>Kopecky.</em> He
              descended from the high passes of the Vysoké Tatry wearing a woollen cloak of contested colour and carrying
              a satchel whose contents remain classified. He smelled of pine resin and considered opinion.
            </p>
            <p className="prose">
              He walked into the valley settlement of <em>Prvá Dolina</em> on a Tuesday, corrected the way a man named Vladimír
              was stacking wood without introduction, and sat down to eat. Vladimír checked the stack. It was, he admitted later,
              better for the correction. This is how it began.
            </p>
            <p className="prose">
              He walked among the ancient Slovak people for what the Tatranská Kniha calls <em>"many seasons and several
              awkward winters"</em> — teaching, predicting harvests, settling disputes, inventing the Chud, holding grudges
              with a dedication that still staggers the theological imagination, and being correct about essentially everything
              with a consistency that his followers found simultaneously reassuring and exhausting.
            </p>
          </Reveal>
          <QuoteBlock
            text="The mountains were there before me. But I was there before the mountains knew what they were for."
            source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1"
          />
          <StatBlock
            value="97.3"
            label="Verified Correctness Rate · Kopeckian Era · All Domains, All Valleys, Both Rivers"
            note="The remaining 2.7% comprises: the Lower Váh Direction Incident, the Winter of the Pale Goat prediction, an opinion about a horse at Nitra market, and one assessment of a man's character the Council calls 'correct in spirit, wrong in specifics.'"
          />
        </div>

        {/* ── CHUD ── */}
        <div className="content-section" id="chud">
          <Reveal>
            <div className="sec-label">The Central Revelation · Tatranská Kniha, Zväzok III</div>
            <div className="sec-title">The Invention of the Chud</div>
            <p className="prose">
              In Year Three, a young man named Ján came to Kopecky with what he described as "a problem of living."
              He was tired — not of specific things, but of all things. The ploughing, the trading, the days that
              were the same day. Kopecky listened at length, then said:
            </p>
          </Reveal>
          <QuoteBlock
            text="You are not tired of things. You are tired of doing things without knowing why you are doing them. That is different. The cure is not rest. The cure is knowing what you are."
            source="Kopecky to Ján · Origin of the Chud, Chapter 14"
          />
          <Reveal>
            <p className="prose">
              He sat with Ján for three days in the spruce forest above the valley — in the shadow of the Tatras,
              among the cold. What emerged was <em>Čudný spôsob</em> — the Strange Way — which his followers
              shortened to simply <em>the Chud.</em> Not a religion. Not a ruleset. A posture toward existing.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="pillar-grid">
              {PILLARS.map(p => <PillarCard key={p.n} {...p} />)}
            </div>
          </Reveal>
          <QuoteBlock
            text="The Chud is not something you become. It is something you remember you already were, once you stop doing everything wrong."
            source="Kopecky, closing address to the First Gathering · Prvá Dolina, Year Three"
          />
        </div>

        {/* ── CHESS ── */}
        <div className="content-section" id="chess">
          <Reveal>
            <div className="sec-label">Year Five · Nitra · Filed Permanently Under The 2.7%</div>
            <div className="sec-title">The Chess Argument</div>
            <p className="prose">
              During a gathering at Nitra in Year Five — at the height of his reputation, having correctly predicted
              two consecutive harvests, silenced the philosophers of Greel, and delivered a four-hour address on
              Carpathian spruce that three people slept through — Kopecky sat down at a chess board and immediately,
              confidently, and <em>completely incorrectly</em> explained the rules of chess.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="chess-box">
              <div className="chess-label">⚠ Classified Under the 2.7% · The Nitra Chess Argument of Year Five · Duration: One Full Hour</div>
              <div className="chess-head">♛ The Queen, Not the King</div>
              <div className="chess-body">
                Kopecky studied the board for several minutes. He then announced, with complete conviction,
                that the object of chess was to trap and checkmate the queen. He was told this was incorrect.
                He said those who believed otherwise had been playing chess incorrectly for their entire lives
                and he was the first person to play it correctly. He argued this position for <em>one full hour,</em> citing
                the queen's superior movement, the king's negligible range, and what he called <em>"the fundamental
                logic of targeting power, not ceremony."</em>
                <br /><br />
                When asked why the official rules stated the king was the target, he said the rules had been written
                by people who had misunderstood chess. He subsequently invented a variant called <em>Správne Šachy</em> — Correct
                Chess — in which the queen is the target. He played it alone. He won every game. He considered this
                evidence of the variant's superiority and said so to several people who did not respond.
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p className="prose">
              The argument lasted one full hour. Six people attempted corrections. Each was absorbed, considered,
              and returned to the speaker as a misunderstanding on their part. By the end, no one in the room
              was confident enough in their own position to continue. Kopecky considered the silence resolution.
              He incorporated the error directly into the <em>Laws of Chudism</em> as Law X, over the objection
              of three Council members, who were then told they were also playing chess incorrectly.
            </p>
          </Reveal>
          {CHESS_QUOTES.map((q, i) => (
            <QuoteBlock key={i} amber text={q.text} source={q.source} />
          ))}
        </div>

        {/* ── QUOTES ── */}
        <div className="content-section" id="quotes">
          <Reveal>
            <div className="sec-label">The Authenticated Sayings on the Chud Life · Scribes of Nitra and Devín</div>
            <div className="sec-title">Kopecky on Chudism</div>
            <p className="prose">
              These are Kopecky's recorded words on the Chud lifestyle — its nature, its requirements, its relationship
              with solitude, and its relationship with women, which is a different relationship, and the Chud will
              explain why at length if given the opportunity, and also if not given the opportunity.
            </p>
          </Reveal>
          {CHUD_QUOTES.map((q, i) => (
            <QuoteBlock key={i} text={q.text} source={q.source} />
          ))}
        </div>

        {/* ── GRUDGES ── */}
        <div className="content-section" id="grudges">
          <Reveal>
            <div className="sec-label">The Sťažnostná Kniha · Selected Entries</div>
            <div className="sec-title">The Grudges of Kopecky</div>
            <p className="prose">
              He never raised his voice. He never threatened. He simply <em>remembered</em> — and expressed his
              memory through small, precisely targeted inconveniences delivered across years with the patience
              of a man who has nowhere he urgently needs to be and a very clear sense of who owes him what.
            </p>
          </Reveal>
          <div style={{ marginTop: 28 }}>
            {GRUDGES.map((g, i) => <GrudgeItem key={i} {...g} />)}
          </div>
        </div>

        {/* ── BOOKS ── */}
        <div className="content-section" id="books">
          <Reveal>
            <div className="sec-label">The Sacred Scrolls of Devín</div>
            <div className="sec-title">The Books of the Kopeckiad</div>
            <p className="prose">
              The holy scripture of the Church is contained within six volumes, collectively known as <em>The
              Kopeckiad.</em> Each was transcribed by a different apostle, which explains certain inconsistencies.
              Kopecky, according to all accounts, would have found the inconsistencies "perfectly acceptable — that's
              how memory works."
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="books-grid">
              {BOOKS.map(b => <BookCard key={b.n} {...b} />)}
            </div>
          </Reveal>
        </div>

        {/* ── LAWS CTA ── */}
        <Reveal>
          <div className="laws-cta">
            <div className="cta-head">The Čudové Zákony Await</div>
            <p className="cta-sub">
              The complete Fifteen Laws of Chudhood — on women, solitude, bill-paying, chess,
              the stew, eye contact, and the satchel — are preserved in the sacred subchapter.
              Enter when ready. Most people are not ready. This is covered in Law I.
            </p>
            <button className="cta-btn" onClick={() => { setPage('laws'); window.scrollTo(0, 0) }}>
              ✦ &nbsp; Enter the Laws of Chudhood &nbsp; ✦
            </button>
          </div>
        </Reveal>

        {/* ── PRAYER ── */}
        <div className="content-section" id="prayer">
          <Reveal>
            <div className="sec-label">The Daily Chud Practice · Recited at Dawn, Facing the Tatras</div>
            <div className="sec-title">The Morning Prayer of the Valleys</div>
            <div className="prayer-box">
              <div className="prayer-txt">
                O Kopecky, Descender from the Tatras,<br />
                Inventor of the Chud, Keeper of the Satchel,<br />
                Corrector of Wood-Stacking and Bread Salt,<br />
                Player of Correct Chess, Holder of Necessary Grudges —<br /><br />
                Watch over us in the valley.<br />
                May we move slowly enough to see what is in front of us.<br />
                May we not dismiss the wisdom of others with a small wave,<br />
                for we have seen what the small wave costs.<br />
                May we sit with the hard question<br />
                until the answer arrives, or the stew does, whichever comes first.<br /><br />
                We acknowledge the queen is not the target in chess.<br />
                We have not said this to your face.<br />
                We are saying it here, in the prayer, trusting the mountains absorb it.<br /><br />
                We forgive you for the Váh.<br />
                We have not opened the satchel.<br />
                We know that you would know.<br />
                <em>The bread is not over-salted. We checked twice.</em><br /><br />
                Amen. Tak nech sa stane.
              </div>
            </div>
            <div className="disc">
              Cirkev Kopeckého · Church of Kopecky · Founded Prvá Dolina, Ancient Slovakia ·
              He Was Right · Mostly · The Queen Is Not The Target In Chess · The Chud Endures · Do Not Touch the Satchel
            </div>
          </Reveal>
        </div>

      </div>

      <footer>
        © Cirkev Kopeckého · Prvá Dolina, High Tatra Region · He Descended · He Taught ·
        He Invented Correct Chess · He Left · He Was Right About Almost Everything ·
        He Will Return · The Invoice Remains Outstanding
      </footer>
    </>
  )
}
