import { Reveal, QuoteBlock } from '../components/UI'
import { TIMELINE } from '../data'
import { AnimatedContent, ShinyButton } from '../components/ReactBits'
import HiddenGlyph from '../components/HiddenGlyph'

export default function OriginsPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-label">Tatranská Kniha · Zväzok I</div>
        <div className="page-hero-title">Origins</div>
        <div className="page-hero-sub">The Descent from the High Tatras · The Walking Begins · The First Corrections</div>
      </div>
      <div className="main-wrap">

        <div className="content-section">
          <Reveal>
            <div className="sec-label">Before Time Had a Name</div>
            <div className="sec-title">In the Beginning, the Mountains. Then Kopecky.</div>
            <p className="prose">Before the Great Tatra mountains had their names, before the Váh river knew which direction to run — and it would later prove that even Kopecky was uncertain on this point for the better part of one day, though he maintained otherwise and the river, briefly, agreed to maintain it with him — before the first Slovak looked at the landscape and thought <em>"this is ours, somehow,"</em> there was Kopecky. The Eternal One. The All-Knowing. The man who would eventually be wrong about a river in a way that five witnesses documented and three of those witnesses still bring up at gatherings, two of whom were not yet born when it happened and remember it anyway.</p>
            <p className="prose">He descended from the high passes of the Vysoké Tatry on a Tuesday in early autumn — a Tuesday that the surrounding villages independently recorded as a Tuesday despite three of them not yet using days of the week — wearing a heavy woollen cloak whose colour has been described in the historical record as green, grey, brown, "the colour of a decision that has not yet been made," and, by one scribe who later recanted and then un-recanted, "absent, in the way a held breath is absent." He carried the satchel. He smelled of pine resin and considered opinion. The considered opinion was, as always, correct. The pine resin was simply pine resin, though two dogs disagreed and were, the record gently notes, dogs.</p>
            <p className="prose">His origins are not recorded. He did not discuss them. When asked where he had come from, he said "the mountains," which everyone could see, and "before that" and nothing more. The Council of Devín has spent four centuries on the "before that." They have produced eleven papers. None of the papers reach conclusions. Kopecky would have found this appropriate.</p>
          </Reveal>
          <QuoteBlock text="I have always been. The fact that you did not notice me earlier is information about your attention, not about my presence." source="Kopecky, when asked about his origins · Tatranská Kniha, Chapter 2" />
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The First Day · Prvá Dolina · A Tuesday</div>
            <div className="sec-title">The Arrival and the Wood Stack</div>
            <p className="prose">He walked into the valley settlement of Prvá Dolina without announcement. The dogs did not bark. The eldest goat in the settlement — a grey animal of considerable age named, according to later records, simply "the goat" — turned toward him as he passed and did not look away until he had sat down. The children ran toward him. Adults report feeling that something had just become true that had previously only been approximately true.</p>
            <p className="prose">The first person he spoke to was a man named Vladimír, who was stacking firewood against the south wall of his house. Kopecky looked at the stack for a moment, said "you want the shorter pieces at the base," and then sat down and asked if there was stew. Vladimír checked the stack. The shorter pieces were not at the base. He moved them. The stack was better. He has never disputed this.</p>
            <p className="prose">Vladimír became the first apostle, primarily because he was the first person Kopecky spoke to and had not had time to be wrong about anything yet. He remained the most loyal, the most thorough, and the most honest of the apostles — it is Vladimír who recorded the footnote about the wrong turn before the fog, and Vladimír who refused to remove it when asked. He said: "He told us to remember things correctly. I am remembering things correctly." The Council of Devín considered this both correct and inconvenient.</p>
          </Reveal>
          <QuoteBlock text="Your bread is over-salted, but your hearts are good. I will stay." source="Kopecky, first full sentence to the village of Prvá Dolina · Year One, Day One" />
          <Reveal>
            <div className="warn-box" style={{ marginTop: 28 }}>
              <div className="warn-label">Historical Note · From the Tatranská Kniha, Chapter 1, Footnote 3</div>
              <div className="warn-text">The bread was, by every subsequent account from people present that day, over-salted. This has been confirmed by three witnesses. The village did not dispute it. The bread improved within the week. Kopecky monitored the improvement and said nothing further about it, which the baker later described as "almost worse than if he had said something."</div>
            </div>
          </Reveal>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Early Years · Year One Through Three</div>
            <div className="sec-title">Before the Chud — The Time of Quiet Correctness</div>
            <p className="prose">Before the formal teachings, before the Chud, before the disciples gathered and the assemblies were held, there were two years of Kopecky simply being present and occasionally correcting things. He identified four men in the valley who would be trouble at a later date. All four were trouble at a later date. He predicted the extent of the first winter with a precision that made the farmers uncomfortable. He told a woman her roof needed reinforcing on the east side. It needed reinforcing on the east side. She did not reinforce it. It failed on the east side. He did not mention this when she came to him afterward. He helped her fix it. He did mention it to Vladimír later, quietly, and Vladimír wrote it down, which is why it is in the record.</p>
            <p className="prose">He established during this period his habit of arriving places after everyone else and still somehow being correct about everything that had occurred in his absence. The valley gradually developed the custom of waiting for him to arrive before finalising any significant decision, while simultaneously maintaining the polite fiction that they were capable of making their own decisions. Kopecky understood this arrangement. He appreciated it. He did not show that he appreciated it, because showing appreciation for being needed would have communicated need in return, and the Chud — which he had not yet named — does not communicate need.</p>
          </Reveal>
          <QuoteBlock text="If you had waited until I arrived, this would not have needed to be undone. I am not saying this as a criticism. I am saying it as a fact. The distinction is important. I recognise not everyone finds it important." source="Kopecky, to the council of Prvá Dolina after undoing a water allocation decision · Year Two" />
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">The Full Chronicle · Years One Through Fourteen</div>
            <div className="sec-title">The Events of the Walking</div>
            <p className="prose">What follows is the authenticated chronology of the Kopeckian Era, drawn from the six volumes of the Kopeckiad, cross-referenced against the Nitra Records, and verified by the Council of Devín over a period of three centuries. Events marked with an asterisk are in the 2.7%. The asterisk appears once.</p>
          </Reveal>
          <div style={{ marginTop: 36 }}>
            {TIMELINE.map((item, i) => (
              <AnimatedContent key={i} delay={0} distance={30} direction="horizontal">
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-era">{item.era}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-body" dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>

        <div className="content-section">
          <Reveal>
            <div className="sec-label">After the Fog · The Present Era</div>
            <div className="sec-title">What Was Left Behind</div>
            <p className="prose">When the fog cleared, the following remained: Vladimír, who sat down on the cold ground and wrote for six hours without stopping and produced what would become the Hmlová Kniha. The satchel, sitting upright on the pass as though placed there deliberately. The goat, which watched the fog for a long time and then walked back down the mountain at its own pace. And the Chud — not as a document or a set of instructions but as a posture, a way of moving, a particular quality of attention that people who had spent time near Kopecky found themselves carrying without having been taught it directly.</p>
            <p className="prose">Ayub Jamma announced himself Kopecky's successor within the week. Enrico agreed this was a wonderful idea. Abdullah said he thought the succession should involve bears somehow. Korrin was found in a tree. Yash was there, doing something. The Church was, by these standards, immediately operational.</p>
            <p className="prose">The Návratová Kniha — the sixth volume, the Return Book — sits unwritten in the library at Devín. The bookbinder's invoice is still outstanding. The note in the margin, added by no known hand, reads: "He said he'd be back. He's always right. Stop worrying about the invoice." The Church agrees with the first two sentences. The Church is still working on the third.</p>
          </Reveal>
          <QuoteBlock text="I must go now. You know enough. You will forget some of it. That is fine. The important parts have a way of returning." source="Kopecky · Final words at the high pass · Year Fourteen · Tatranská Kniha, Final Chapter" />
        </div>

        <div style={{ textAlign:'center', padding:'40px 0 72px' }}>
          <ShinyButton onClick={() => setPage("chud")}>Continue to The Chud →</ShinyButton>
        </div>
      </div>
      <footer><HiddenGlyph id="origins" /> © Cirkev Kopeckého · Origins Volume · Tatranská Kniha · He Came Down the Mountain · He Was Correct About the Wood Stack · He Was Less Correct About the Váh</footer>
    </>
  )
}
