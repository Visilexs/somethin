import { Reveal, QuoteBlock, BookCard, StatBlock } from '../components/UI'
import { AnimatedStat } from '../components/StoryAnim'
import { BOOKS, CHUD_QUOTES, CHESS_QUOTES } from '../data'

const ALL_QUOTES = [
  { text: 'The mountains were there before me. But I was there before the mountains knew what they were for.', source: 'Tatranská Kniha, Chapter 1' },
  { text: 'Your bread is over-salted, but your hearts are good. I will stay.', source: 'Kopecky, first words to Prvá Dolina · Year One' },
  { text: 'If you had waited until I arrived, this would not have needed to be undone.', source: 'To the council of Prvá Dolina · Year Two' },
  { text: 'You are not tired of things. You are tired of doing things without knowing why you are doing them. That is different.', source: 'To Ján, origin of the Chud · Chapter 14' },
  { text: 'The Chud is not something you become. It is something you remember you already were, once you stop doing everything wrong.', source: 'Closing address, First Gathering · Year Three' },
  { text: 'Talking to Enrico is like talking to a very warm wall. The wall does not disagree. The wall does not help. You leave exactly as you entered it, but warmer.', source: 'Private address to the Council of Devín · Year Eight' },
  { text: 'Abdullah is wrong in the way a man can be wrong who has put genuine thought into his wrongness. This makes it very difficult to be short with him.', source: 'To the assembly at Zlaté Moravce · Year Seven' },
  { text: 'Ayub is correct more often than he deserves to be, given that his method is to assume he is already correct and work backward from there.', source: 'Private letter to Vladimír · Year Six' },
  { text: 'Korrin is present in the way a tree is present: rooted, observing, occasionally somewhere unexpected. I watched him for twenty minutes and reached no conclusions. This has happened to me once.', source: 'Private note · Year Six' },
  { text: 'Yash, I know what you are.', source: 'Said directly to Yash · Year Seven · He walked away immediately · No elaboration was provided' },
  { text: 'The Váh runs north to south. I have always said the Váh runs north to south.', source: 'Following the Lower Váh Direction Incident · Three witnesses looked at each other · Nobody pursued it' },
  { text: 'I do not hold grudges. I maintain accurate records of events that continue to be relevant.', source: 'When asked about the Sťažnostná Kniha · Year Nine' },
  { text: 'I have been wrong twice. The first time I corrected myself immediately. The second time I corrected myself eventually. Both times I was right about everything adjacent to the thing I was wrong about, which I consider relevant context.', source: 'To the monastery scribes who were keeping count · Devín, Year Nine' },
  { text: 'Well.', source: 'Kopecky, surveying the assembled disciples in Year Four. This is the complete quote. Vladimír wrote it down. The word has been studied.' },
  { text: 'The stew. I will have the stew. I have considered the other options and they are fine. The stew is correct. Bring me the stew. Why is this taking time.', source: 'At the tavern of Zvolen · Witnessed by eleven people · Year Six' },
  ...CHUD_QUOTES,
]

export default function TextsPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">The Kopeckiad · Six Volumes · Compiled at Devín</div>
        <div className="page-hero-title">Sacred Texts</div>
        <div className="page-hero-sub">The Six Books · The Authenticated Sayings · The Correctness Record · What Was Written Down</div>
      </div>
      <div className="main-wrap">

        {/* BOOKS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Kopeckiad · Six Volumes · One Unwritten</div>
            <div className="sec-title">The Books of the Church</div>
            <p className="prose">The holy scripture of the Church is contained within six volumes, collectively known as The Kopeckiad. Each was transcribed by a different apostle, which explains certain inconsistencies in phrasing, tone, and the number of times Ayub Jamma appears in backgrounds of scenes he was not centrally involved in. Kopecky, when told about the inconsistencies, said they were "perfectly acceptable — that's how memory works." He was either being generous or had not read the section about Ayub.</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="books-grid" style={{ marginTop: 32 }}>
              {BOOKS.map(b => <BookCard key={b.n} {...b} />)}
            </div>
          </Reveal>
        </div>

        {/* CORRECTNESS RECORD */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Great Accounting · As Tabulated by the Scribes of Devín Over Fourteen Years</div>
            <div className="sec-title">On the Matter of His Correctness</div>
            <p className="prose">The scribes of the monastery of Devín kept the most complete records of the Kopeckian Era. Over fourteen years of the Walking, they tabulated every claim, judgment, prophecy, and opinion. The Council of Devín verified their work over three centuries. Do not question the number. The number has been checked. The number is correct. The irony of this — that the correctness of the correctness record has itself been verified — is noted in the preface of the record and then not mentioned again.</p>
          </Reveal>
          <AnimatedStat
            value="97.3"
            label="Verified Correctness Rate · Kopeckian Era · All Domains · All Valleys · Both Rivers"
            note="The remaining 2.7% comprises: the Lower Váh Direction Incident, the Winter of the Pale Goat, Law X on chess, and one assessment of a horse at the Nitra market. Kopecky refers to these as 'the four circumstances requiring context.' The context has been provided multiple times. It was lengthy."
          />
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:16, marginTop: 36 }}>
              {[
                { title:'Prophecies Fulfilled', txt:'Of forty-one recorded prophecies, thirty-nine came to pass with precision. One came to pass slightly differently than described but was retrospectively deemed "essentially correct in spirit." One is classified as "pending." It has been pending for four centuries. The Church remains optimistic.' },
                { title:'Character Assessments', txt:'Every person Kopecky described as untrustworthy proved untrustworthy. Every person he described as good-hearted proved good-hearted. He once assessed a man as "fine, mostly, except about money." The man was later found to be dishonest about money for twelve years. The word "mostly" is now considered theologically significant.' },
                { title:'Harvest Predictions', txt:'Over eleven harvest seasons, he correctly predicted yield, timing, and quality in the valleys of the Váh and Nitra. Farmers described this as "uncanny and slightly annoying." He attributed it to "paying attention," which the farmers found unsatisfying and were told would have to be enough.' },
                { title:'Arguments Won', txt:'One hundred percent. Every argument Kopecky entered, he won. Not always immediately — sometimes he would ask a single quiet question and wait. The question was always the one the other party could not answer. Except during the chess argument, where the questions he received were all ones he also could not answer. He addressed this by ending the argument.' },
                { title:'Bread Assessments', txt:'Impeccable. He could identify over-salting at twelve feet, under-proving by texture alone, and bad grain by smell. He never ate bad bread without commenting. He never ate good bread without commenting either. His silence on bread was the highest possible praise and, somehow, still slightly unnerving.' },
                { title:'Weather Predictions', txt:'He correctly predicted every significant snowfall in the High Tatras during the Walking. When asked how, he said "the light on the Kriváň changes before snow." Shepherds have watched the Kriváň for centuries since. They see what he saw. Nobody has explained what exactly they are seeing. He would consider this appropriate.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i % 3 + 1}>
                  <div className="correct-card">
                    <div className="correct-card-title">{item.title}</div>
                    <div className="correct-card-text">{item.txt}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        {/* AUTHENTICATED SAYINGS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Complete Authenticated Sayings · Scribes of Nitra and Devín</div>
            <div className="sec-title">The Words of Kopecky</div>
            <p className="prose">These are the authenticated utterances of Kopecky as recorded by the scribes of Nitra, the monastery of Devín, and several witnesses who happened to have very good memories and the presence of mind to write things down before the moment passed. Each quote has been verified to a standard the Council calls "beyond reasonable doubt within the limits of ancient transcription," which the Council acknowledges is not a high bar but is the bar available.</p>
          </Reveal>
          {ALL_QUOTES.map((q, i) => (
            <QuoteBlock key={i} text={q.text} source={q.source} amber={i % 7 === 3} />
          ))}
        </div>

        <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
          <button className="cta-btn" onClick={() => setPage('laws')}>The Laws of Chudhood →</button>
          <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
          <button className="back-btn" onClick={() => setPage('prayer')}>The Prayer</button>
        </div>
      </div>
      <footer>© Cirkev Kopeckého · Sacred Texts Volume · Six Books · One Unwritten · The Invoice Is Still Outstanding · He Was Right 97.3% of the Time · The 2.7% Has Been Contextualised</footer>
    </>
  )
}
