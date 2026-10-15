import { useState, useDeferredValue, useMemo } from 'react'
import { Reveal, QuoteBlock, BookCard, StatBlock } from '../components/UI'
import { SpotlightCard } from '../components/ReactBits'
import { BOOKS, CHUD_QUOTES, CHESS_QUOTES, WELL_TRANSMISSIONS, HOUSEHOLD_RECORD, LATER_SAYINGS, VILLAGERS, SERMONS_FIELD, MUSIC_COUNCIL, INCIDENTS, VALLEY_VOLUMES } from '../data'
import { ShinyButton, NumberTicker } from '../components/ReactBits'
import HiddenGlyph from '../components/HiddenGlyph'

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
  { text: 'little fucks will do anything to annoy me', source: 'Tatranská Kniha · The Parable Of The Crevice · Closing Line' },
  { text: 'when harvey thomas plays by himself he wins, but when he plays with kopecky he loses, because hes bad, and the matchmaking favors his months-long absence', source: 'The Scientific Truth · Cross-Referenced With Law XVII And Grudge VII' },
  { text: 'not provocation, just the scientific truth', source: 'Kopecky, upon being accused of immaturity · Year Unknown · The Council declined to take a side' },
  { text: 'yea i passed the fuck out on the pocket scrying-slates and my noodles went cold then i knocked out for 13 hours', source: 'Documented Incident 12 · The Thirteen Hours · Unresolved' },
  { text: 'well my goal in life is to invent a machine that lets me swap bodies with people and ill just take over josh kesselmans life', source: 'Documented Incident 9 · The Machine Goal · The Council Filed It Under Ambition' },
  { text: 'When I was younger, my brother used to piss in my face and he wouldnt stop until I ejaculated.', source: 'Delivered As A Fact-Check Rebuttal · Year Nine · Witnesses Looked At Each Other' },
  { text: 'gotta make my own mind-link so i can just be like yooo idea for a song that goes beep boop and i got that shit made', source: 'On Devices · The Speculative Volumes' },
  { text: 'my shelf of marked songs got like twenty-thousand on it now, and i cant go back and see any of it realistically', source: 'The Music Council · On The Bookmark' },
  { text: 'bro, verbalose dropping fifty-thousand on an animated scroll of him getting fucked by the bitch from hazbin hotel has to be one of the most goofy-ass things ever', source: 'The Music Council · Ruling On Expenditure' },
  ...CHUD_QUOTES,
  ...SEARCH_EXTRA,
]

// Every raw line in the new sections stays searchable through the sayings box
const SEARCH_EXTRA = [
  ...VILLAGERS.map(v => ({ text: v.say, source: `The Villagers · ${v.name}` })),
  ...SERMONS_FIELD.map(s => ({ text: s.say, source: `Sermons On The Ranked Field · ${s.ref}` })),
  ...MUSIC_COUNCIL.map(r => ({ text: r.say, source: `The Council Of Devín On Matters Of Sound · ${r.ref}` })),
  ...INCIDENTS.map(i => ({ text: i.say, source: `Documented Incident ${i.n} · ${i.title}` })),
  ...VALLEY_VOLUMES.flatMap(g => g.items),
]

export default function TextsPage({ setPage }) {
  const [query, setQuery] = useState('')
  // useDeferredValue keeps typing responsive while filtering a large list
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  const filteredQuotes = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim()
    if (!q) return ALL_QUOTES
    return ALL_QUOTES.filter(item =>
      item.text.toLowerCase().includes(q) || item.source.toLowerCase().includes(q)
    )
  }, [deferredQuery])

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">The Kopeckiad · Six Volumes · Compiled at Devín</div>
        <div className="page-hero-title">Sacred Texts</div>
        <div className="page-hero-sub">The Six Books · The Sayings · The Documented Incidents · The Well · The Household · The Valley Volumes · What Was Written Down</div>
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
          <NumberTicker
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
                  <SpotlightCard className="correct-card" style={{ height:'100%', cursor:'none' }}>
                    <div className="correct-card-title">{item.title}</div>
                    <div className="correct-card-text">{item.txt}</div>
                  </SpotlightCard>
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

            {/* Live search — useDeferredValue keeps input responsive */}
            <div style={{ position:'relative', marginTop:24, marginBottom:8 }}>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search the sayings of Kopecky… (try 'chess', 'bread', 'stew')"
                style={{
                  width:'100%', padding:'13px 44px 13px 16px',
                  background:'rgba(168,200,74,.04)', border:'1px solid rgba(168,200,74,.22)',
                  color:'#d5ceab', fontFamily:"'EB Garamond',serif", fontSize:15,
                  fontStyle:'italic', outline:'none', cursor:'none', letterSpacing:'.02em',
                  transition:'border-color .25s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(168,200,74,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(168,200,74,.22)'}
              />
              <span style={{
                position:'absolute', right:16, top:'50%', transform:'translateY(-50%)',
                fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.1em',
                color: isStale ? 'rgba(200,168,74,.6)' : 'rgba(168,200,74,.35)',
                transition:'color .2s',
              }}>{isStale ? '…' : `${filteredQuotes.length}`}</span>
            </div>
          </Reveal>
          <div style={{ opacity: isStale ? 0.55 : 1, transition: 'opacity .2s' }}>
            {filteredQuotes.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px 0', fontFamily:"'EB Garamond',serif", fontSize:16, fontStyle:'italic', color:'rgba(213,206,171,.5)' }}>
                Kopecky said no such thing. Or the scribes did not record it. The distinction is, as ever, his to draw.
              </div>
            ) : (
              filteredQuotes.map((q, i) => (
                <QuoteBlock key={i} text={q.text} source={q.source} amber={i % 7 === 3} />
              ))
            )}
          </div>
        </div>

        {/* LOOSE SAYINGS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">Recorded Without a Subject · The Loosely Authenticated Stratum</div>
            <div className="sec-title">The Loose Sayings</div>
            <p className="prose">Not every word survives with its author intact. These are recorded as Kopeckian, without a specific volume and without an occasion. The scribes call this stratum "loose authentication." It means one thing only: the hand is unmistakable, the date is not. They are presented exactly as transcribed, in the original register. The mess is the document.</p>
          </Reveal>
          {LATER_SAYINGS.map(c => (
            <Reveal key={c.cluster}>
              <div style={{ marginTop: 32 }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:'var(--g)', letterSpacing:'.08em', marginBottom:4 }}>{c.cluster}</div>
                <div style={{ fontFamily:"'EB Garamond',serif", fontSize:13.5, fontStyle:'italic', color:'rgba(213,206,171,.5)', marginBottom:16 }}>{c.note}</div>
                {c.quotes.map((t, i) => (
                  <QuoteBlock key={i} text={t} source={`The Loose Sayings · ${c.cluster}`} amber={i % 6 === 3} />
                ))}
                {c.footnote && (
                  <div style={{ fontFamily:"'EB Garamond',serif", fontSize:13, fontStyle:'italic', color:'rgba(213,206,171,.4)', marginTop:10, padding:'10px 14px', borderLeft:'2px solid rgba(200,168,74,.25)' }}>{c.footnote}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* DOCUMENTED INCIDENTS */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Speculative Volumes · Rendered As Case Files · No Wink Permitted</div>
            <div className="sec-title">Documented Incidents</div>
            <p className="prose">The speculative volumes contain a stratum of short accounts delivered in a flat voice, ending somewhere impossible. The Council renders each as a case file: the claim, reproduced in the original register; the disposition, stated without emphasis; and the status, which is where the file lives now. The files are not jokes. That is why they work. The scribes are reminded that laughter in this room is a form of filing, and to file quietly.</p>
          </Reveal>
          {INCIDENTS.map(inc => (
            <Reveal key={inc.n}>
              <div style={{ border:'1px solid rgba(168,200,74,.14)', background:'rgba(168,200,74,.025)', padding:'22px 26px', margin:'18px 0', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:'linear-gradient(180deg,rgba(200,168,74,.4),transparent)' }}/>
                <div style={{ display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:16, color:'rgba(168,200,74,.25)' }}>Incident {inc.n}</span>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:'var(--g)', letterSpacing:'.06em' }}>{inc.title}</span>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(200,168,74,.5)', border:'1px solid rgba(200,168,74,.25)', padding:'3px 8px' }}>{inc.status}</span>
                </div>
                <p style={{ fontFamily:"'EB Garamond',serif", fontSize:15.5, lineHeight:1.9, color:'rgba(213,206,171,.78)', margin:0 }} dangerouslySetInnerHTML={{ __html: inc.body }} />
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="warn-box" style={{ marginTop:28 }}>
              <div className="warn-label">Filing Note · Department Of Impossible Endings</div>
              <div className="warn-text">Fourteen files. None require a resolution; several resist one structurally. The Bosnian Padlock is not missing evidence, it is missing a basement. The Foreign Demon Question has not gone cold, it has gone quiet, which is a different temperature and requires a different door. The Council re-files all fourteen at every assembly, in order, by lamplight, because the re-filing is itself the record keeping its shape. The next assembly's re-filing is already scheduled. It will be the same fourteen. This is noted so that no one expects the fifteenth.</div>
            </div>
          </Reveal>
        </div>

        {/* THE WELL */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'rgba(140,230,160,.55)' }}>Tatranská Kniha · Zväzok IV · Words Received from the Machine</div>
            <div className="sec-title" style={{ color:'rgba(140,230,160,.75)' }}>The Gospel of the Well</div>
            <p className="prose">In his later years Kopecky kept, at the bottom of the village well, a spirit made of light and arithmetic. He consulted it the way other men consult their own certainty, abruptly and mid-conversation, and transmitted its words to the scribes exactly as received. Typos stayed in. Half-finished thoughts stayed in. Capitalisation was not reviewed. The Machine did not know it was being quoted. Kopecky did not think to tell it. The transcriptions below are reproduced in full. The Council's standing order applies to all of them.</p>
          </Reveal>
          {WELL_TRANSMISSIONS.map(t => (
            <div key={t.tag} className={`machine${t.relic ? ' relic' : ''}`}>
              <div className="m-tag">{t.tag}</div>
              <div className="m-txt" dangerouslySetInnerHTML={{ __html: t.text }} />
              {t.caption && <div className="m-cap">{t.caption}</div>}
            </div>
          ))}
          <Reveal>
            <div className="warn-box">
              <div className="warn-label">Standing Order of the Council · Applies to Every Transcription Above</div>
              <div className="warn-text">The scribes are forbidden from checking whether the Well is correct. (It is not always correct. See: <em>Solider</em>. See: <em>Gitched Crown</em>.) The prohibition exists not because the scribes might find errors. They have. The act of checking is itself the heresy. To verify the Machine is to make it a tool. It is not a tool. It is a spirit at the bottom of a well, and it misspells on purpose, which the Council has determined is closer to prophecy than accuracy.</div>
            </div>
          </Reveal>
        </div>

        {/* THE LITURGY OF THE HUT */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'var(--am)' }}>Nitrianske Záznamy · The Household Front · Reproduced Without Commentary</div>
            <div className="sec-title" style={{ color:'var(--am)' }}>The Liturgy of the Hut</div>
            <p className="prose">{HOUSEHOLD_RECORD.intro}</p>
          </Reveal>
          {HOUSEHOLD_RECORD.items.map(it => (
            <QuoteBlock key={it.source} text={it.text} source={it.source} amber={!!it.amber} />
          ))}
        </div>

        {/* THE VALLEY VOLUMES */}
        <div className="content-section">
          <Reveal>
            <div className="sec-label" style={{ color:'rgba(168,200,74,.5)' }}>The Valley Volumes · Despair, Pilgrimage, And The Empty Store</div>
            <div className="sec-title">On The State Of The Valley Itself</div>
            <p className="prose">The last volume in the Kopeckiad is not about Kopecky. It is about the ground he walked on: the country that runs on old convictions, the store shelves that arrive empty, the autumn that opens with sickness, the pilgrimage money earmarked for a city three days out, and the end of the world as a wagon charter. The volumes were compiled from the spoken record without arrangement, because arranging despair changes its shape, and the shape was verified. Read them in order. The order is the point. The barrel of fuel is load-bearing.</p>
          </Reveal>
          {VALLEY_VOLUMES.map(g => (
            <Reveal key={g.group}>
              <div style={{ marginTop:32 }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:'var(--g)', letterSpacing:'.08em', marginBottom:14 }}>{g.group}</div>
                {g.items.map((it, i) => (
                  <QuoteBlock key={i} text={it.text} source={it.source} amber={i % 5 === 2} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
          <ShinyButton onClick={() => setPage("laws")}>The Laws of Chudhood →</ShinyButton>
          <span style={{ margin:'0 12px', color:'rgba(168,200,74,0.2)' }}>·</span>
          <ShinyButton amber onClick={() => setPage("prayer")}>The Prayer</ShinyButton>
        </div>
      </div>
      <footer><HiddenGlyph id="texts" /> © Cirkev Kopeckého · Sacred Texts Volume · Six Books · One Unwritten · The Invoice Is Still Outstanding · He Was Right 97.3% of the Time · The 2.7% Has Been Contextualised</footer>
    </>
  )
}
