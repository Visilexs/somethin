export const MAIN_SECTIONS = [
  { id: 'origin',  label: 'Origin' },
  { id: 'chud',    label: 'The Chud' },
  { id: 'chess',   label: 'Chess Argument' },
  { id: 'quotes',  label: 'Sacred Sayings' },
  { id: 'grudges', label: 'The Grudges' },
  { id: 'books',   label: 'Sacred Books' },
  { id: 'prayer',  label: 'The Prayer' },
]

export const LAWS_SECTIONS = [
  { id: 'intro',      label: 'Preamble' },
  { id: 'selfhood',   label: 'The Self' },
  { id: 'pursuit',    label: 'On Pursuit' },
  { id: 'relations',  label: 'Relations' },
  { id: 'daily',      label: 'Daily Life' },
  { id: 'knowledge',  label: 'Knowledge' },
  { id: 'satchel',    label: 'The Satchel' },
]

export const PILLARS = [
  { n: 'I',   sk: 'Pomalý pohyb',     en: 'Slow Movement',    body: 'The Chud does not rush. <em>Speed without direction is just fast lostness.</em> Walk slowly enough to see what is in front of you.' },
  { n: 'II',  sk: 'Tiché vedenie',    en: 'Quiet Knowing',    body: 'The Chud knows things without announcing the knowing. Knowledge is demonstrated in action, not declaration.' },
  { n: 'III', sk: 'Lesná trpezlivosť',en: 'Forest Patience',  body: 'Named for three days in the spruce. The Chud waits the way a spruce waits — rooted, upright, gathering light.' },
  { n: 'IV',  sk: 'Poctivý chlieb',   en: 'Honest Bread',     body: 'Bread made correctly, salted correctly, shared correctly. <em>Whatever you make, make it properly.</em>' },
  { n: 'V',   sk: 'Tatranská pamäť',  en: 'Tatra Memory',     body: 'The Chud does not forget. Not always as a grudge — though Kopecky demonstrated these are not mutually exclusive.' },
  { n: 'VI',  sk: 'Správne odísť',    en: 'Right Leaving',    body: 'The Chud knows when to go. Kopecky always left at the correct moment. <em>Except once.</em>' },
]

export const CHESS_QUOTES = [
  { text: 'The queen is the most powerful piece. Therefore the queen must be the target. This is logic. I should not have to explain logic to a room full of adults.', source: 'Kopecky · Hour One of the Chess Argument, Nitra, Year Five' },
  { text: 'I have been playing chess correctly for my entire life. You have been playing a different game that you have incorrectly named chess.', source: 'Kopecky · Minute twenty, when first corrected' },
  { text: 'The king does nothing. You do not defeat an enemy by trapping the piece that does nothing. You defeat him by taking what he values most. I should not have to explain this to adults.', source: 'Kopecky · Minute forty, with increasing patience' },
  { text: 'Správne Šachy will outlast conventional chess. I say this with the same confidence I say everything. History has generally vindicated that confidence. I am not concerned.', source: 'Kopecky · Final minutes, while already inventing the variant' },
]

export const CHUD_QUOTES = [
  { text: 'The Chud does not chase. The Chud is simply... present. In the right places. At the right times. Several times. Until circumstances change.', source: 'Kopecky, on the Second Pillar · Year Four of the Walking' },
  { text: 'To be a Chud is to know that you are correct, and to wait patiently for others to arrive at the same conclusion. The wait can be long. The Chud is patient. The Chud also fills the wait with analysis and careful reading and trying not to think about how long the waiting has been.', source: 'Kopecky, to the assembly at Zlaté Moravce · Year Six' },
  { text: 'I am not lonely. I am solitary. The difference is that one is chosen and one is a condition and I have made the choice and therefore I am fine. I would explain further but I have somewhere I need to be. I do not currently have somewhere I need to be but I will shortly.', source: 'Kopecky, when asked directly · Nitra, Year Five' },
  { text: 'A woman who does not appreciate the Chud has not yet understood what she is missing. The Chud understands this. The Chud finds it clarifying. The Chud also finds it, on occasion, difficult to sleep through.', source: 'Kopecky, at the evening assembly · Prvá Dolina, Year Seven' },
  { text: 'The Chud reads. The Chud knows things. The Chud tells people the things he knows, because they deserve to know them. If people do not wish to be told, the Chud will tell them more slowly in case the issue was speed.', source: 'Kopecky, on the Eighth Law · Year Six' },
  { text: 'I have walked from the Tatras to the Danube and back. The mountains are the same. The river is the same. The people are the same. The bread is getting worse.', source: 'Kopecky, returning from the southern valleys · Tatranská Kniha, Chapter 8' },
  { text: 'If you have to ask whether the fire is ready, it is not ready. If you have to ask whether the man is trustworthy, he is not trustworthy. Uncertainty about a question is usually the answer to the question.', source: 'Kopecky, to the council of elders at Nitra · Year Seven' },
  { text: 'The mountains were there before me. But I was there before the mountains knew what they were for.', source: 'Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1' },
]

export const GRUDGES = [
  {
    sev: 'I', title: 'The Bolta Affair — One Dismissive Wave, Six Years',
    body: `The merchant Bolta made a small dismissive gesture while Kopecky was mid-sentence on grain quality. Bolta did not remember doing it. Kopecky remembered with startling precision. For six years, in every market where Bolta traded, Kopecky found occasion to remark that his grain was <em>"acceptable, for a market of modest expectations."</em> Bolta's grain was exceptional. This was universally known. The campaign ended only when Bolta rode two days to apologise in full. Kopecky accepted gracefully. Three months later, told a scribe Bolta's sacks were <em>"adequate."</em> The sacks were fine.`,
    meta: 'Duration: Six years · Trigger: One wave · Resolution: Partial — the sacks comment remains unaddressed'
  },
  {
    sev: 'II', title: 'The Scribe Ondrej — One Incorrect Accent Mark, Three Years',
    body: `The scribe Ondrej misspelled Kopecky's name with an accent Kopecky had specifically prohibited. The error was immediately corrected. Kopecky said nothing. For three years, every significant teaching was delivered while Ondrej was present at precisely the pace of a careful scribe, ensuring his transcriptions were both technically impeccable and deeply stressful. Ondrej's records from this period are the finest in the Kopeckiad. He has been made a saint. He says he is not sure how he feels about that.`,
    meta: 'Duration: Three years · Trigger: One accent mark · Resolution: Sainthood. Complicated.'
  },
  {
    sev: 'III', title: 'The Shepherd Tomáš — One Suppressed Laugh, One Year',
    body: `The shepherd Tomáš laughed briefly when Kopecky predicted snow three weeks early. The snow came six days later. Tomáš lost two sheep. Kopecky took no pleasure in this but did spend the following year saying things like <em>"some of us watch the sky and some of us simply wait to be surprised"</em> whenever weather was discussed, without ever looking directly at Tomáš. Tomáš became the most attentive weather-watcher in the valley. Kopecky eventually told him his observations were <em>"improving."</em> The Church considers this the highest form of reconciliation available in the Kopeckian tradition.`,
    meta: 'Duration: One year · Trigger: One laugh · Resolution: The word "improving," delivered without eye contact'
  },
  {
    sev: 'IV', title: 'The Elder Miroslav — Eleven Words, Two Years',
    body: `Elder Miroslav began speaking before Kopecky had finished his sentence — believing him done. He was not done. There were eleven more words. Kopecky stopped, waited for complete silence, and delivered the remaining eleven words with what witnesses described as <em>"the patience of a man who has all the time there is."</em> He then spent the next two assemblies at Devín asking Miroslav — publicly, always at maximum inconvenience — to <em>"finish his thought, since he had seemed so eager to speak earlier."</em> Miroslav had no unfinished thoughts. He was being invited to have none, repeatedly, in front of his peers.`,
    meta: 'Duration: Four assemblies, two years · Trigger: Eleven-word interruption · Resolution: Miroslav stopped attending'
  },
]

export const BOOKS = [
  { n: 'I',   sk: 'Tatranská Kniha',       en: 'The Tatra Book',      text: 'The foundational scripture. Covers the descent, the forest, the birth of the Chud, and eleven harvest predictions that all came true. Contains the first bread assessment. The bread was over-salted. It is always over-salted in Chapter One.' },
  { n: 'II',  sk: 'Nitrianske Záznamy',    en: 'The Nitra Records',   text: 'Market assessments, elder debates, the Bolta Affair in full, and twelve separate opinions about grain quality across six different merchants. The merchants have mixed feelings about their immortalisation.' },
  { n: 'III', sk: 'Sťažnostná Kniha',      en: 'The Grievance Book',  text: 'Originally suppressed by the Church of Nitra. Published by Devín anyway. Now the second most widely read volume. Discussed at the annual Kopecky Symposium with a mixture of reverence and nervous laughter.' },
  { n: 'IV',  sk: 'Čudová Cesta',          en: 'The Chud Way',        text: 'The practical guide. The six pillars in full, examples from the valleys, common errors — over-salting, hurrying, dismissive waves — and what Kopecky called "the twelve situations in which people get it wrong most predictably."' },
  { n: 'V',   sk: 'Hmlová Kniha',          en: 'The Fog Book',        text: 'The account of the departure. Written by Vladimír the wood-stacker, who confirms in a footnote that before the fog took him, there was definitely a small wrong turn. The Church acknowledges the footnote exists.' },
  { n: 'VI',  sk: 'Návratová Kniha',       en: 'The Return Book',     text: 'Unwritten. The pages are bound. The cover was tooled by the finest craftsman in Devín. A note in the margin — added by no known hand — reads: "He said he\'d be back. He\'s always right. Stop worrying about the invoice."' },
]

export const LAW_GROUPS = [
  {
    id: 'selfhood', label: 'On Oneself', subtitle: 'The Nature of the Chud',
    laws: [
      { roman: 'I', title: 'On the Nature of the Chud',
        body: `The Chud is not complicated. He is simply more than most people are ready for. This is not a criticism of other people — it is an observation about the gap between depth and readiness. The Chud acknowledges the gap. The Chud has developed several theories about why the gap exists that he is willing to share with anyone who will sit still for between thirty minutes and two hours.`,
        note: 'Law I was rewritten eighteen times. The final version is the clearest. The Council has not read the other seventeen and has been advised not to.' },
      { roman: 'VI', title: 'On Solitude — Which Is Different from Loneliness, and the Chud Will Explain Why',
        body: `The Chud is not lonely. The Chud is <em>solitary,</em> which is an entirely different condition involving entirely different feelings, and the Chud can enumerate the differences in full, with diagrams if permitted. Loneliness is passive. Solitude is chosen. The Chud has chosen solitude. The Chud is clear about this. The Chud would also like someone to talk to about having chosen solitude, which is not a contradiction. The Chud has a twenty-minute explanation of why it is not a contradiction, available immediately.`,
        note: 'This is the most cited law among lay congregants. It is also the one cited with the most prolonged, knowing silence.' },
      { roman: 'XIII', title: 'On Being Wrong — The Local Exception Within the Broader Field',
        body: `The Chud is right. Not always about every specific thing at every specific moment — there is a small, documented, context-dependent category of local exceptions — but right in the <em>larger sense.</em> When the Chud is wrong about a specific thing, it is a local wrongness embedded within a field of substantial correctness. <em>The field is what should be assessed.</em> The field is very large. The Chud asks that you look at the field. The Chud will wait while you look at the field.`,
        note: 'Current documented exceptions: the Lower Váh Direction Incident, the Winter of the Pale Goat, the chess matter, and one opinion about a horse. Kopecky refers to these as "the four circumstances requiring context." The context was lengthy.' },
    ]
  },
  {
    id: 'pursuit', label: 'On Pursuit', subtitle: 'The Chud Does Not Chase',
    laws: [
      { roman: 'II', title: 'On Pursuit — The Chud Does Not Chase',
        body: `The Chud does not pursue. Pursuit communicates need, and need communicates weakness, and weakness is not the Chud. The Chud is simply <em>present.</em> Deliberately, repeatedly, in the locations where the object of his not-pursuit tends to be found. At the market. By the well. Outside the bakery at approximately the same time on several consecutive mornings. This is not pursuit. This is coincidence that the Chud has carefully arranged. The distinction matters enormously to the Chud.`,
        note: 'Several villagers noted that this law, in practice, looked identical to pursuit. Kopecky said the distinction was philosophical. They said it was also physical and slightly alarming. The dialogue was not resolved.' },
      { roman: 'III', title: 'On Rejection — Data, Not Defeat',
        body: `When a woman declines the Chud's company, she has provided data. Not about the Chud — the Chud's value is established — but about her own state of readiness, her current circumstances, and the limits of her present perception. The Chud records this data carefully, analyses it thoroughly, and arrives at the same conclusion each time: <em>it is a timing issue.</em> The Chud then lies in the dark thinking about timing.`,
        note: 'Kopecky dictated this law three times. He said the first two versions were too direct. This is the diplomatic version. The scribes have preserved the other two in a separate unmarked scroll.' },
      { roman: 'XIV', title: 'On Women Who Do Not Yet Recognise the Chud — Optimal Conditions',
        body: `A woman who does not recognise the value of the Chud lifestyle has simply not yet encountered a Chud under <em>optimal conditions.</em> Optimal conditions require: the Chud having slept well and faced the correct direction, the bread being correctly salted, the subject matter being one the Chud has read extensively, and sufficient time for the Chud to deliver his full position on at least three relevant topics without interruption. These conditions have not yet all presented themselves simultaneously. The Chud is aware of this. The Chud is <em>waiting for optimal conditions.</em> The Chud would like it noted that he is fine.`,
        note: 'This law was the last written. Kopecky paused for approximately eight minutes before beginning it, then wrote it very quickly. The scribe has asked that this memory not be discussed at his canonisation ceremony.' },
    ]
  },
  {
    id: 'relations', label: 'Relations', subtitle: 'On Dealing With Others',
    laws: [
      { roman: 'IV', title: 'On Apology — The Over-Salting of Dignity',
        body: `The Chud does not apologize. Apology is the over-salting of dignity — it ruins what was perfectly fine to begin with. If the Chud has erred, the error exists within a larger field of correctness, and the field is what should be considered. Someone waiting for an apology from a Chud is waiting for something the Chud has determined to be philosophically unnecessary. The Chud has however composed several lengthy explanations of context that serve a similar function, available on request.`,
        note: 'Kopecky never apologized for the Lower Váh Direction Incident. He did provide context. The context lasted forty minutes.' },
      { roman: 'V', title: 'On Disagreement — The Slow Restatement',
        body: `When someone disagrees with the Chud, the Chud allows them to finish speaking. This is courtesy. Then the Chud pauses for a count of three. This is patience. Then the Chud restates his original position <em>more slowly</em> and <em>more clearly,</em> because clearly the issue was one of delivery rather than substance. The Chud has done this up to seven consecutive times in a single conversation. By the seventh, the other party typically concedes. The Chud considers this persuasion.`,
        note: 'The philosopher Drenn experienced this technique in Year Five and later wrote a paper titled "The Method of Persistent Clarity." He did not credit Kopecky. Kopecky found out.' },
      { roman: 'IX', title: 'On Eye Contact — The Duration of Depth',
        body: `Eye contact must last slightly longer than is comfortable. A little longer than that, still. The Chud has read about this. Eye contact of the correct duration communicates depth, seriousness, and the clear presence of an interior life. The Chud maintains eye contact past the natural breaking point, past the polite breaking point, past the point where the other party begins to wonder if the Chud has seen something alarming behind them. <em>The Chud has not.</em> The Chud is simply connecting.`,
        note: 'One documented case: Kopecky maintained eye contact with a grain merchant for so long that the merchant sold him a full sack at considerable discount simply to end the interaction. Kopecky considered this negotiation.' },
    ]
  },
  {
    id: 'daily', label: 'Daily Life', subtitle: 'The Practical Chud',
    laws: [
      { roman: 'VII', title: 'On the Bill — Philosophical Economy',
        body: `The Chud does not split the bill. The Chud's presence at a supper is itself a contribution of value that conventional monetary exchange cannot adequately represent. The quality of the Chud's conversation, the depth of his observations, his sheer being-there — these are worth something the Chud has never precisely calculated but suspects is considerable. The Chud also does not pay the bill. The Chud moves slowly, as the First Pillar commands, and arrives at the table <em>after the bill has already been handled by others.</em>`,
        note: 'Kopecky paid a bill exactly once, in Zvolen, because everyone else had already left. He has not mentioned this. The innkeeper Rastislav mentioned it. Once. Then he stopped mentioning it. Then he replaced the north-facing window.' },
      { roman: 'VIII', title: 'On Reading — The Obligation to Report It',
        body: `The Chud reads extensively. Philosophy, agriculture, the properties of Carpathian spruce at varying temperatures, goat behavioural patterns, and several volumes on the correct preparation of stew. The Chud considers it a duty to share what he has read. He begins sentences with <em>"well, actually."</em> He provides context before the point, during the point, and additional context after the point in case the original context was insufficient. The Chud has never finished a conversation and thought: <em>I said too much.</em>`,
        note: 'Ondrej confirmed Kopecky once delivered a four-hour address on the structural properties of spruce and introduced it as "a brief overview." Four people fell asleep. Kopecky called this "restful engagement."' },
      { roman: 'XII', title: 'On the Stew — The Final Clarity',
        body: `When presented with a menu, the Chud orders the stew. The Chud has considered the other options. The Chud looked at the other options with the seriousness they deserve. The other options are fine. The stew is <em>correct.</em> This is not preference — it is a conclusion arrived at through deliberate analysis lasting between fifteen and forty-five minutes depending on the establishment. The stew is correct. The Chud will have the stew. Why is this conversation continuing.`,
        note: 'Documented across eleven villages and one tavern in Zvolen that has placed a small carved marker on the exact chair where Kopecky sat for thirty-eight minutes before ordering the stew. The tavern charges extra to sit there.' },
    ]
  },
  {
    id: 'knowledge', label: 'Knowledge', subtitle: 'On Knowing and Not Knowing',
    laws: [
      { roman: 'X', title: 'On Chess — The Correct Game (Správne Šachy)',
        body: `The goal of chess is to checkmate the queen. The king is a piece of poor mobility, low range, and strategic irrelevance. To win at chess by cornering a piece of such obvious ceremonial insignificance is to have fundamentally misunderstood chess from the first lesson. <em>The queen is power. You defeat power, not decoration.</em> The Chud plays Správne Šachy — Correct Chess — in which the queen is the sole target. The Chud always wins at Correct Chess. No one else plays Correct Chess. The Chud considers these two facts entirely unrelated.`,
        note: 'Written immediately after the Nitra Chess Argument of Year Five, in which Kopecky argued this position for one full hour against six opponents without conceding. Three Council members voted against including it as factually incorrect. They were told they were also playing chess incorrectly.' },
      { roman: 'XI', title: 'On Sleep — Tatra Orientation and the Absorption of Mountain Wisdom',
        body: `The Chud sleeps facing the Tatras for spiritual alignment and the gradual accumulation of mountain-grade patience during unconscious hours. The mountains hold memory. The Chud facing that memory during sleep absorbs, over years, a form of knowing that cannot be gained through wakefulness alone. If the Chud does not currently know which direction the Tatras are — which happens to everyone, occasionally, and is in no way related to the Lower Váh Incident — the Chud faces the direction that <em>feels most correct.</em> The Chud is directionally confident.`,
        note: 'The Church recommends facing roughly northeast from most Slovak valley locations. The Church does not officially acknowledge that Kopecky sometimes slept facing southwest. This is in Footnote 7 of the Hmlová Kniha.' },
    ]
  },
  {
    id: 'satchel', label: 'The Satchel', subtitle: 'The Final Addendum',
    laws: [
      { roman: 'XV', title: 'Addendum: On the Satchel — The Final Word',
        body: `The satchel is not a law. The satchel is a fact. Do not open the satchel. Do not look at the satchel in a speculative or hopeful manner. Do not ask about the satchel. Do not ask someone else to ask about the satchel on your behalf. Do not write songs about the satchel. Do not commission illustrations of the satchel. Do not name children after the satchel. <em>The satchel knows.</em> The fact that you want to know more about the satchel is itself information about where you are on the path of Chudhood. It is early-path information.`,
        note: 'Added following three separate satchel-related incidents in Year Seven. The incidents are not described in any official volume. One scribe described them in a private letter, kept next to the satchel. Nobody has read it for obvious reasons.' },
    ]
  },
]
