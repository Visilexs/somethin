import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// THEME TOKENS
// ─────────────────────────────────────────────
const G  = '#a8c84a';       // main green-gold
const GA = (a) => `rgba(168,200,74,${a})`;
const AM = '#c8a84a';       // amber accent
const AMA = (a) => `rgba(200,168,74,${a})`;
const BG = '#060805';
const TX = '#d5ceab';
const TXD = 'rgba(213,206,171,0.82)';

// ─────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:${BG};color:${TX};font-family:'EB Garamond',Georgia,serif;}

.wrap{min-height:100vh;background:${BG};position:relative;}
.wrap::before{content:'';position:fixed;inset:0;background:
  radial-gradient(ellipse at 15% 10%,rgba(100,140,50,0.09) 0%,transparent 50%),
  radial-gradient(ellipse at 85% 85%,rgba(140,110,30,0.08) 0%,transparent 50%);
  pointer-events:none;z-index:0;}

/* ── HEADER ── */
header{position:relative;z-index:1;text-align:center;padding:72px 40px 52px;
  border-bottom:1px solid ${GA(0.22)};
  background:radial-gradient(ellipse at center top,rgba(120,160,50,0.11) 0%,transparent 60%);}
.sym{font-size:64px;display:block;color:${G};margin-bottom:16px;
  animation:pulse 4s ease-in-out infinite;filter:drop-shadow(0 0 24px ${GA(0.35)});}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
.h-title{font-family:'Cinzel Decorative',serif;font-size:clamp(24px,5vw,48px);
  font-weight:900;color:${G};letter-spacing:.08em;line-height:1.2;
  text-shadow:0 0 50px ${GA(0.3)};}
.h-sub{font-family:'Cinzel',serif;font-size:clamp(10px,1.7vw,13px);color:${GA(0.52)};
  letter-spacing:.22em;text-transform:uppercase;margin-top:12px;line-height:1.8;}
.orn{color:${G};opacity:.38;margin:12px 0;letter-spacing:10px;font-size:20px;}

/* ── NAV ── */
nav{position:relative;z-index:1;display:flex;justify-content:center;flex-wrap:wrap;
  background:rgba(120,160,50,0.04);border-bottom:1px solid ${GA(0.16)};}
.nb{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.17em;text-transform:uppercase;
  color:${GA(0.6)};background:none;border:none;border-right:1px solid ${GA(0.1)};
  padding:14px 18px;cursor:pointer;transition:all .25s;white-space:nowrap;}
.nb:first-child{border-left:1px solid ${GA(0.1)};}
.nb:hover,.nb.on{color:${G};background:${GA(0.07)};}
.nb.laws{color:${AMA(0.75)};}
.nb.laws:hover,.nb.laws.on{color:${AM};background:${AMA(0.07)};}

/* ── LAYOUT ── */
.main{max-width:900px;margin:0 auto;padding:0 28px;position:relative;z-index:1;}
.sec{padding:64px 0;border-bottom:1px solid ${GA(0.09)};}
.sec:last-child{border-bottom:none;}
.sec-lbl{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;
  color:${G};opacity:.48;margin-bottom:20px;}
.sec-ttl{font-family:'Cinzel Decorative',serif;font-size:clamp(20px,3.5vw,32px);
  font-weight:700;color:${G};line-height:1.3;margin-bottom:24px;}
.prose{font-size:17px;line-height:1.9;color:${TXD};margin-bottom:18px;}
.prose em{color:${G};font-style:italic;}

/* ── QUOTE BLOCK ── */
.qb{background:${GA(0.045)};border:1px solid ${GA(0.18)};border-left:3px solid ${GA(0.5)};
  padding:26px 30px;margin:24px 0;position:relative;}
.qb::before{content:'"';font-size:70px;color:${GA(0.1)};position:absolute;
  top:-8px;left:14px;font-family:Georgia,serif;line-height:1;pointer-events:none;}
.qb-t{font-size:18px;font-style:italic;line-height:1.7;color:#c2d888;
  position:relative;z-index:1;margin-bottom:10px;}
.qb-s{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:${GA(0.38)};}

/* chess */
.chess-outer{border:1px solid ${AMA(0.28)};background:${AMA(0.045)};padding:30px;margin:26px 0;}
.chess-lbl{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;
  color:${AMA(0.48)};margin-bottom:12px;}
.chess-head{font-family:'Cinzel Decorative',serif;font-size:26px;color:${AMA(0.75)};margin-bottom:14px;}
.chess-body{font-size:16px;line-height:1.85;color:${TXD};font-style:italic;}
.chess-body em{color:${AM};font-style:italic;}

.qb-amber{background:${AMA(0.045)};border:1px solid ${AMA(0.18)};border-left:3px solid ${AMA(0.5)};
  padding:26px 30px;margin:24px 0;position:relative;}
.qb-amber::before{content:'"';font-size:70px;color:${AMA(0.1)};position:absolute;
  top:-8px;left:14px;font-family:Georgia,serif;line-height:1;pointer-events:none;}
.qb-amber .qb-t{color:#d8c078;}
.qb-amber .qb-s{color:${AMA(0.38)};}

/* pillars */
.pillar-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-top:30px;}
.pillar{background:${GA(0.045)};border:1px solid ${GA(0.17)};border-top:2px solid ${GA(0.45)};padding:22px 18px;transition:border-color .3s;}
.pillar:hover{border-top-color:${G};}
.p-num{font-family:'Cinzel Decorative',serif;font-size:30px;color:${GA(0.12)};margin-bottom:8px;}
.p-ttl{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.13em;color:${G};text-transform:uppercase;margin-bottom:8px;}
.p-txt{font-size:14px;line-height:1.75;color:${TXD};}
.p-txt em{color:${G};font-style:italic;}

/* grudges */
.grudge{padding:24px 0;border-bottom:1px solid ${GA(0.09)};display:grid;grid-template-columns:60px 1fr;gap:18px;}
.grudge:last-child{border-bottom:none;}
.g-sev{font-family:'Cinzel Decorative',serif;font-size:9px;letter-spacing:.1em;
  color:${GA(0.35)};text-transform:uppercase;text-align:center;padding-top:2px;}
.g-sev span{display:block;font-size:17px;color:${G};margin-bottom:3px;}
.g-ttl{font-family:'Cinzel',serif;font-size:13px;color:${G};margin-bottom:7px;}
.g-body{font-size:14px;line-height:1.8;color:${TXD};}
.g-body em{color:${G};font-style:italic;}
.g-meta{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${GA(0.36)};margin-top:8px;}

/* CTA */
.laws-cta{border:1px solid ${AMA(0.28)};background:${AMA(0.04)};padding:48px;text-align:center;margin-top:32px;}
.cta-btn{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;
  color:${AM};background:${AMA(0.07)};border:1px solid ${AMA(0.3)};padding:15px 34px;
  cursor:pointer;transition:all .3s;display:inline-block;margin-top:20px;}
.cta-btn:hover{background:${AMA(0.16)};color:#e8c860;border-color:${AMA(0.55)};}

/* prayer */
.prayer-box{background:${GA(0.04)};border:1px solid ${GA(0.19)};padding:48px;text-align:center;margin-top:36px;}
.prayer-txt{font-size:18px;font-style:italic;line-height:2.1;color:${G};max-width:600px;margin:0 auto;}
.disc{font-family:'Cinzel',serif;font-size:10px;color:${GA(0.25)};letter-spacing:.12em;
  text-align:center;margin-top:26px;border-top:1px solid ${GA(0.1)};padding-top:16px;line-height:1.9;}

footer{position:relative;z-index:1;text-align:center;padding:40px 24px;border-top:1px solid ${GA(0.11)};
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.15em;color:${GA(0.22)};text-transform:uppercase;}

/* scroll top */
.stb{position:fixed;bottom:28px;right:28px;background:${GA(0.1)};border:1px solid ${GA(0.28)};
  color:${G};width:42px;height:42px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:16px;transition:all .3s;z-index:200;}
.stb:hover{background:${GA(0.2)};}

/* ═══════════════════════════
   LAWS PAGE
═══════════════════════════ */
.laws-hero{position:relative;z-index:1;text-align:center;padding:62px 40px 46px;
  border-bottom:1px solid ${AMA(0.2)};
  background:radial-gradient(ellipse at center top,rgba(160,120,40,0.1) 0%,transparent 62%);}
.laws-title{font-family:'Cinzel Decorative',serif;font-size:clamp(24px,5vw,46px);
  font-weight:900;color:${AM};text-shadow:0 0 50px ${AMA(0.3)};}
.laws-latin{font-family:'Cinzel Decorative',serif;font-size:clamp(16px,3vw,26px);
  color:rgba(160,130,50,0.7);margin:8px 0 14px;}
.laws-sub{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:${AMA(0.45)};}

.laws-main{max-width:900px;margin:0 auto;padding:0 28px;position:relative;z-index:1;}

.warn-box{background:rgba(180,80,40,0.06);border:1px solid rgba(200,80,40,0.2);padding:20px 28px;margin:30px 0;}
.warn-lbl{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;
  color:rgba(200,110,70,0.52);margin-bottom:10px;}
.warn-txt{font-size:15px;line-height:1.8;color:rgba(213,200,168,0.72);font-style:italic;}

/* law accordion */
.law-item{border-bottom:1px solid ${AMA(0.11)};}
.law-hdr{display:flex;align-items:center;gap:18px;padding:20px 0;cursor:pointer;
  transition:all .2s;user-select:none;}
.law-hdr:hover .law-ttl{color:${AM};}
.law-roman{font-family:'Cinzel Decorative',serif;font-size:16px;color:${AMA(0.48)};min-width:52px;}
.law-ttl{font-family:'Cinzel',serif;font-size:15px;color:rgba(200,160,60,0.85);letter-spacing:.06em;flex:1;transition:color .2s;}
.law-chev{color:${AMA(0.4)};font-size:12px;transition:transform .35s;flex-shrink:0;}
.law-chev.open{transform:rotate(180deg);}
.law-body{display:grid;transition:grid-template-rows .4s ease,opacity .3s;}
.law-body.closed{grid-template-rows:0fr;opacity:0;}
.law-body.open{grid-template-rows:1fr;opacity:1;}
.law-inner{overflow:hidden;}
.law-content{padding:0 0 26px 70px;font-size:16px;line-height:1.87;color:${TXD};}
.law-content em{color:${AM};font-style:italic;}
.law-note{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.12em;
  color:${AMA(0.36)};margin-top:14px;border-top:1px solid ${AMA(0.1)};
  padding-top:12px;line-height:1.75;text-transform:uppercase;}

.back-btn{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
  color:${G};background:${GA(0.07)};border:1px solid ${GA(0.26)};padding:13px 30px;
  cursor:pointer;transition:all .3s;}
.back-btn:hover{background:${GA(0.14)};}
`;

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const LAWS = [
  {
    roman:"I", title:"On the Nature of the Chud",
    body:`The Chud is not complicated. He is simply more than most people are ready for. This is not a criticism of other people — it is an observation about the gap between depth and readiness. The Chud acknowledges the gap. The Chud has developed several theories about why the gap exists that he is willing to share with anyone who will sit still for between thirty minutes and two hours.`,
    note:`Law I was rewritten eighteen times. The final version is the clearest. The Council has not read the other seventeen and has been advised not to.`
  },
  {
    roman:"II", title:"On Pursuit — The Chud Does Not Chase",
    body:`The Chud does not pursue. Pursuit communicates need, and need communicates weakness, and weakness is not the Chud. The Chud is simply <em>present.</em> Deliberately, repeatedly, in the locations where the object of his not-pursuit tends to be found. At the market. By the well. Outside the bakery at approximately the same time on several consecutive mornings. This is not pursuit. This is coincidence that the Chud has carefully arranged. The distinction matters enormously to the Chud.`,
    note:`Several villagers of Prvá Dolina noted that this law, in practice, looked identical to pursuit. Kopecky said the distinction was philosophical. They said it was also physical and slightly alarming. The dialogue was not resolved.`
  },
  {
    roman:"III", title:"On Rejection — Data, Not Defeat",
    body:`When a woman declines the Chud's company, she has provided data. Not about the Chud — the Chud's value is established — but about her own state of readiness, her current circumstances, and the limits of her present perception. The Chud records this data carefully, analyses it thoroughly, and arrives at the same conclusion each time: <em>it is a timing issue.</em> The Chud then lies in the dark thinking about timing.`,
    note:`Kopecky dictated this law three times. He said the first two versions were too direct. This is the diplomatic version. The scribes have preserved the other two in a separate unmarked scroll.`
  },
  {
    roman:"IV", title:"On Apology — The Over-Salting of Dignity",
    body:`The Chud does not apologize. Apology is the over-salting of dignity — it ruins what was perfectly fine to begin with. If the Chud has erred, the error exists within a larger field of correctness, and the field is what should be considered. Someone waiting for an apology from a Chud is waiting for something the Chud has considered carefully and determined to be philosophically unnecessary. The Chud has however composed several lengthy explanations of context that serve a similar function, available on request.`,
    note:`Kopecky never apologized for the Lower Váh Direction Incident. He did provide context. The context lasted forty minutes. Three people heard it. Afterward, none of them said the word "apology," suggesting either satisfaction or the onset of a new philosophy.`
  },
  {
    roman:"V", title:"On Disagreement — The Slow Restatement",
    body:`When someone disagrees with the Chud, the Chud allows them to finish speaking. This is courtesy. Then the Chud pauses for a count of three. This is patience. Then the Chud restates his original position <em>more slowly</em> and <em>more clearly,</em> because clearly the issue was one of delivery rather than substance. The Chud has done this up to seven consecutive times in a single conversation. By the seventh time, the other party typically concedes. The Chud considers this persuasion.`,
    note:`The philosopher Drenn experienced this technique in Year Five and later wrote a paper titled "The Method of Persistent Clarity." He did not credit Kopecky. Kopecky found out. See: Sťažnostná Kniha, Entry 3, Subsection B, pages 114–128.`
  },
  {
    roman:"VI", title:"On Solitude — Which Is Different from Loneliness, and the Chud Will Explain Why",
    body:`The Chud is not lonely. The Chud is <em>solitary,</em> which is an entirely different condition involving entirely different feelings, and the Chud can enumerate the differences in full, with diagrams if permitted. Loneliness is passive. Solitude is chosen. The Chud has chosen solitude. The Chud is clear about this. The Chud would also like someone to talk to about having chosen solitude, which is not a contradiction. The Chud has a twenty-minute explanation of why it is not a contradiction, available immediately.`,
    note:`This is the most cited law among lay congregants. It is also the one cited with the most prolonged, knowing silence. The Council has noticed. The Council has said nothing. The Council understands the assignment.`
  },
  {
    roman:"VII", title:"On the Bill — Philosophical Economy",
    body:`The Chud does not split the bill. The Chud's presence at a supper is itself a contribution of value that conventional monetary exchange cannot adequately represent. The quality of the Chud's conversation, the depth of his observations, his sheer being-there — these are worth something the Chud has never precisely calculated but suspects is considerable. The Chud also does not pay the bill. The Chud moves slowly, as the First Pillar commands, and arrives at the table <em>after the bill has already been handled by others.</em> This is not rudeness. This is pace.`,
    note:`Kopecky paid a bill exactly once, in Zvolen, because everyone else had already left. He has not mentioned this. The innkeeper Rastislav mentioned it. Once. Then he stopped mentioning it. Then he replaced the north-facing window.`
  },
  {
    roman:"VIII", title:"On Reading — The Obligation to Report It",
    body:`The Chud reads extensively. Philosophy, agriculture, the properties of Carpathian spruce at varying temperatures, goat behavioural patterns, and several volumes on the correct preparation of stew. The Chud considers it a duty to share what he has read. He begins sentences with <em>"well, actually."</em> He provides context before the point, context during the point, and additional context after the point in case the original context was insufficient. The Chud has never finished a conversation and thought: <em>I said too much.</em> He has frequently thought: <em>I did not cover everything.</em>`,
    note:`The scribe Ondrej confirmed that Kopecky once delivered a four-hour address on the structural properties of spruce and introduced it as "a brief overview." Four people fell asleep. Kopecky called this "restful engagement."`
  },
  {
    roman:"IX", title:"On Eye Contact — The Duration of Depth",
    body:`Eye contact must last slightly longer than is comfortable. A little longer than that, still. The Chud has read about this. Eye contact of the correct duration communicates depth, seriousness, and the clear presence of an interior life. The Chud maintains eye contact past the natural breaking point, past the polite breaking point, past the point where the other party begins to wonder if the Chud has seen something alarming behind them. <em>The Chud has not.</em> The Chud is simply connecting. Others have used different words for this. None of the different words are in the official record. Several are preserved in private letters.`,
    note:`There is one documented case in which Kopecky maintained eye contact with a grain merchant for so long that the merchant sold him a full sack at a considerable discount simply to bring the interaction to a conclusion. Kopecky considered this negotiation. The merchant considered it a supernatural experience.`
  },
  {
    roman:"X", title:"On Chess — The Correct Game (Správne Šachy)",
    body:`The goal of chess is to checkmate the queen. The king is a piece of poor mobility, low range, and strategic irrelevance. To win at chess by cornering a piece of such obvious ceremonial insignificance is to have fundamentally misunderstood chess from the first lesson. <em>The queen is power. You defeat power, not decoration.</em> The Chud plays Správne Šachy — Correct Chess — in which the queen is the sole target. The Chud always wins at Correct Chess. No one else plays Correct Chess. The Chud considers these two facts entirely unrelated.`,
    note:`This law was written immediately after the Nitra Chess Argument of Year Five, in which Kopecky argued this position for one full hour against six opponents and technically emerged without conceding. Three Council members voted against including it on the grounds that it is factually incorrect. Kopecky said those three members were also playing chess incorrectly. The objections were removed from the record by a vote of seven to three. The same seven. The same three.`
  },
  {
    roman:"XI", title:"On Sleep — Tatra Orientation and the Absorption of Mountain Wisdom",
    body:`The Chud sleeps facing the Tatras for spiritual alignment and the gradual accumulation of mountain-grade patience during unconscious hours. The mountains hold memory. The Chud facing that memory during sleep absorbs, over years, a form of knowing that cannot be gained through wakefulness alone. If the Chud does not currently know which direction the Tatras are from his location — which happens to everyone, occasionally, and is in no way related to the Lower Váh Incident, or at most is only tangentially related — the Chud faces the direction that <em>feels most correct.</em> The Chud is directionally confident.`,
    note:`The Church recommends facing roughly northeast from most Slovak valley locations. The Church does not officially acknowledge that Kopecky sometimes slept facing southwest. This is in Footnote 7 of the Hmlová Kniha. The Church acknowledges the footnote exists.`
  },
  {
    roman:"XII", title:"On the Stew — The Final Clarity",
    body:`When presented with a menu, the Chud orders the stew. The Chud has considered the other options. The Chud looked at the other options with the seriousness they deserve. The other options are fine. The stew is <em>correct.</em> This is not preference — it is a conclusion arrived at through deliberate analysis lasting between fifteen and forty-five minutes depending on the establishment. The stew is correct. The Chud will have the stew. Why is this conversation continuing.`,
    note:`Documented across eleven villages, six apostle accounts, and one tavern in Zvolen that has placed a small carved marker on the exact chair where Kopecky sat for thirty-eight minutes before ordering the stew. The tavern charges extra to sit there.`
  },
  {
    roman:"XIII", title:"On Being Wrong — The Local Exception Within the Broader Field",
    body:`The Chud is right. Not always about every specific thing at every specific moment — there is a small, documented, context-dependent category of local exceptions — but right in the <em>larger sense,</em> in the sense of general orientation, in the sense that matters when the full picture is considered. When the Chud is wrong about a specific thing, it is a local wrongness embedded within a field of substantial correctness. <em>The field is what should be assessed.</em> The field is very large. The exceptions are comparatively minor. The Chud asks that you look at the field. The Chud will wait while you look at the field.`,
    note:`Current documented exceptions: the Lower Váh Direction Incident, the Winter of the Pale Goat, the chess matter, and one opinion about a horse at Nitra market. Kopecky refers to these collectively as "the four circumstances requiring context." The context has been provided. It was lengthy.`
  },
  {
    roman:"XIV", title:"On Women Who Do Not Yet Recognise the Chud — Optimal Conditions",
    body:`A woman who does not recognise the value of the Chud lifestyle has simply not yet encountered a Chud under <em>optimal conditions.</em> Optimal conditions require: the Chud having slept well and faced the correct direction, the bread being correctly salted, the subject matter being one the Chud has read extensively, and sufficient time for the Chud to deliver his full position on at least three relevant topics without interruption. These conditions have not yet all presented themselves simultaneously. The Chud is aware of this. The Chud is <em>waiting for optimal conditions.</em> The Chud has been waiting for some time. The Chud is fine. The Chud would like it noted that he is fine.`,
    note:`This law was the last written. Kopecky paused for approximately eight minutes before beginning it, which the scribe recorded as the longest pre-writing pause of the afternoon. He then wrote it very quickly. The scribe has been made a saint and has asked that this particular memory not be discussed at his canonisation ceremony.`
  },
  {
    roman:"XV", title:"Addendum: On the Satchel — The Final Word",
    body:`The satchel is not a law. The satchel is a fact. Do not open the satchel. Do not look at the satchel in a speculative or hopeful manner. Do not ask about the satchel. Do not ask someone else to ask about the satchel on your behalf. Do not write songs about the satchel. Do not commission illustrations of the satchel. Do not name children after the satchel. <em>The satchel knows.</em> The fact that you want to know more about the satchel is itself information about where you are on the path of Chudhood. It is early-path information.`,
    note:`Added following three separate satchel-related incidents in Year Seven. The incidents are not described in any official volume. One scribe described them in a private letter. The letter has been preserved. It is kept next to the satchel. Nobody has read it for obvious reasons.`
  },
];

const GRUDGES = [
  {
    sev:"I", title:"The Bolta Affair — One Dismissive Wave, Six Years of Grain Commentary",
    body:`The merchant Bolta, during a market discussion at Nitra, made a small dismissive gesture while Kopecky was mid-sentence on grain quality. Bolta did not remember doing it. Kopecky remembered with startling precision. For six years thereafter, in every market town where Bolta traded, Kopecky found occasion to remark that he had heard the grain at this stall was <em>"acceptable, for a market of modest expectations."</em> Bolta's grain was exceptional. This was known universally. The campaign ended only when Bolta rode two days to find Kopecky and apologised in full. Kopecky accepted gracefully. Three months later told a scribe Bolta's sacks were <em>"adequate."</em> The sacks were fine.`,
    meta:"Duration: Six years · Trigger: One wave · Resolution: Partial, and the sacks comment remains unaddressed"
  },
  {
    sev:"II", title:"The Scribe Ondrej — One Incorrect Accent Mark, Three Years of Perfect-Paced Dictation",
    body:`The scribe Ondrej misspelled Kopecky's name with an accent Kopecky had specifically prohibited. The error was caught and corrected immediately. Kopecky said nothing. For the following three years, every significant teaching was delivered while Ondrej was present, at precisely the pace of a careful scribe, with pauses timed to allow complete transcription, ensuring Ondrej's work was both technically impeccable and deeply stressful. Ondrej's records from this period are the finest in the Kopeckiad. He has been made a saint. He says he is not sure how he feels about that.`,
    meta:"Duration: Three years · Trigger: One accent mark · Resolution: Sainthood. Complicated."
  },
  {
    sev:"III", title:"The Shepherd Tomáš — One Suppressed Laugh, One Year of Pointed Atmospheric Commentary",
    body:`The shepherd Tomáš laughed briefly when Kopecky predicted snow three weeks early. The snow came six days later. Tomáš lost two sheep. Kopecky took no pleasure in this but did spend the following year saying things like <em>"some of us watch the sky and some of us simply wait to be surprised"</em> whenever weather was discussed, without looking directly at Tomáš. Tomáš became the most attentive weather-watcher in the valley. Kopecky eventually told him his observations were <em>"improving."</em> The Church considers this the highest form of reconciliation available in the Kopeckian tradition.`,
    meta:"Duration: One year · Trigger: One laugh · Resolution: The word 'improving,' delivered without eye contact"
  },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function QB({ text, source, amber = false }) {
  return (
    <div className={amber ? "qb-amber" : "qb"}>
      <div className="qb-t">{text}</div>
      <div className="qb-s">— {source}</div>
    </div>
  );
}

function LawAccordion({ law, index, expanded, onToggle }) {
  return (
    <div className="law-item">
      <div className="law-hdr" onClick={() => onToggle(index)} role="button" tabIndex={0}
        onKeyDown={e => e.key==='Enter' && onToggle(index)}>
        <div className="law-roman">{law.roman}</div>
        <div className="law-ttl">{law.title}</div>
        <div className={`law-chev ${expanded ? 'open' : ''}`}>▼</div>
      </div>
      <div className={`law-body ${expanded ? 'open' : 'closed'}`}>
        <div className="law-inner">
          <div className="law-content">
            <div dangerouslySetInnerHTML={{ __html: law.body }} />
            {law.note && <div className="law-note">Council of Devín — {law.note}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
function MainPage({ setPage }) {
  return (
    <>
      <div className="main">

        {/* ── ORIGIN ── */}
        <div className="sec">
          <div className="sec-lbl">The Founding Scripture — Tatranská Kniha, Zväzok I</div>
          <div className="sec-ttl">In the Beginning, the Mountains. Then Kopecky.</div>
          <p className="prose">Before the Great Tatra mountains had their names, before the Váh river knew which direction to run — there was <em>Kopecky.</em> He descended from the high passes of the Vysoké Tatry wearing a woollen cloak of contested colour and carrying a satchel whose contents remain classified. He smelled of pine resin and considered opinion.</p>
          <p className="prose">He walked into the valley settlement of <em>Prvá Dolina</em> on a Tuesday, corrected the way a man named Vladimír was stacking wood, and sat down to eat. Vladimír checked the stack. It was, he admitted later, better for the correction. This is how it began.</p>
          <p className="prose">He walked among the ancient Slovak people for what the Tatranská Kniha calls <em>"many seasons and several awkward winters"</em> — teaching, predicting harvests, settling disputes, inventing the Chud, holding grudges with a dedication that still staggers the theological imagination, and being correct about essentially everything with a consistency that his followers found simultaneously reassuring and exhausting.</p>
          <QB text="The mountains were there before me. But I was there before the mountains knew what they were for." source="Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1" />
        </div>

        {/* ── CHUD INVENTION ── */}
        <div className="sec">
          <div className="sec-lbl">The Central Revelation — Tatranská Kniha, Zväzok III</div>
          <div className="sec-ttl">The Invention of the Chud</div>
          <p className="prose">In Year Three, a young man named Ján came to Kopecky with what he described as "a problem of living." He was tired — not of specific things, but of all things. The ploughing, the trading, the days that were the same day. Kopecky listened at length, then said:</p>
          <QB text="You are not tired of things. You are tired of doing things without knowing why you are doing them. That is different. The cure is not rest. The cure is knowing what you are." source="Kopecky to Ján · Origin of the Chud, Chapter 14" />
          <p className="prose">He sat with Ján for three days in the spruce forest above the valley. What emerged was <em>Čudný spôsob</em> — the Strange Way — which his followers shortened to simply <em>the Chud.</em> Not a religion. Not a ruleset. A posture toward existing.</p>
          <div className="pillar-grid">
            {[
              ["I","Pomalý pohyb","Slow Movement","The Chud does not rush. <em>Speed without direction is just fast lostness.</em> Walk slowly enough to see what is in front of you."],
              ["II","Tiché vedenie","Quiet Knowing","The Chud knows things without announcing the knowing. Knowledge demonstrated in action, not declaration."],
              ["III","Lesná trpezlivosť","Forest Patience","Named for three days in the spruce. The Chud waits the way a spruce waits — rooted, upright, gathering light."],
              ["IV","Poctivý chlieb","Honest Bread","Bread must be made correctly, salted correctly, shared correctly. Whatever you make, <em>make it properly.</em>"],
              ["V","Tatranská pamäť","Tatra Memory","The Chud does not forget. Not always as a grudge — though Kopecky demonstrated these are not mutually exclusive."],
              ["VI","Správne odísť","Right Leaving","The Chud knows when to go. Kopecky always left at the correct moment. Except once."],
            ].map(([n,sk,en,t]) => (
              <div className="pillar" key={n}>
                <div className="p-num">{n}</div>
                <div className="p-ttl">{sk} — {en}</div>
                <div className="p-txt" dangerouslySetInnerHTML={{ __html: t }} />
              </div>
            ))}
          </div>
          <QB text="The Chud is not something you become. It is something you remember you already were, once you stop doing everything wrong." source="Kopecky, closing address to the First Gathering · Prvá Dolina, Year Three" />
        </div>

        {/* ── CHESS ARGUMENT ── */}
        <div className="sec">
          <div className="sec-lbl">Year Five · Nitra · Filed Permanently Under The 2.7%</div>
          <div className="sec-ttl">The Chess Argument</div>
          <p className="prose">During a gathering at Nitra in Year Five — at the height of his reputation, having correctly predicted two consecutive harvests, silenced the philosophers of Greel, and delivered a four-hour address on Carpathian spruce that three people slept through and two people cited as life-changing — Kopecky sat down at a chess board and immediately, confidently, and <em>completely incorrectly</em> explained the rules of chess.</p>

          <div className="chess-outer">
            <div className="chess-lbl">⚠ Classified Under the 2.7% · The Nitra Chess Argument of Year Five · Duration: One Full Hour</div>
            <div className="chess-head">♛ The Queen, Not the King</div>
            <div className="chess-body">
              Kopecky studied the board for several minutes. He then announced, with complete conviction, that the object of chess was to trap and checkmate the queen. He was told this was incorrect. He said that those who believed otherwise had been playing chess incorrectly for their entire lives and he was the first person to play it correctly. He argued this position for <em>one full hour,</em> citing the queen's superior movement, the king's negligible range, and what he called <em>"the fundamental logic of targeting power, not ceremony."</em>
              <br/><br/>
              When asked why the official rules stated the king was the target, he said the rules had been written by people who had misunderstood chess, and he was in a position to correct the misunderstanding. He subsequently invented a variant he called <em>Správne Šachy</em> — Correct Chess — in which the queen is the target. He played it alone. He won every game. He considered this evidence of the variant's superiority and said so to several people who did not respond.
            </div>
          </div>

          <p className="prose">The argument lasted one full hour. Six people attempted corrections. Each correction was absorbed, considered, and returned to the speaker as a misunderstanding on the speaker's part. By the end, no one in the room was confident enough in their own position to continue. Kopecky considered the silence resolution. He incorporated the error directly into the Laws of Chudism as <em>Law X,</em> over the objection of three Council members, who were then told they were also playing chess incorrectly.</p>

          <QB amber text="The queen is the most powerful piece. Therefore the queen must be the target. This is logic. I should not have to explain logic to a room full of adults." source="Kopecky · Hour One of the Chess Argument, Nitra, Year Five" />
          <QB amber text="I have been playing chess correctly for my entire life. You have been playing a different game that you have incorrectly named chess." source="Kopecky · Approximately minute twenty of the Chess Argument, when first corrected" />
          <QB amber text="The king does nothing. You do not defeat an enemy by trapping the piece that does nothing. You defeat him by taking what he values most. I should not have to explain this to adults." source="Kopecky · Minute forty of the Chess Argument, with increasing patience" />
          <QB amber text="Správne Šachy will outlast conventional chess. I say this with the same confidence I say everything. History has generally vindicated that confidence. I am not concerned." source="Kopecky · Final minutes of the Chess Argument, while already inventing the variant" />
        </div>

        {/* ── CHUDISM QUOTES ── */}
        <div className="sec">
          <div className="sec-lbl">The Authenticated Sayings on the Chud Life — Scribes of Nitra and Devín</div>
          <div className="sec-ttl">Kopecky on Chudism</div>
          <p className="prose">These are Kopecky's recorded words on the Chud lifestyle — its nature, its requirements, its relationship with solitude, and its relationship with women, which is a different relationship, and the Chud will explain why at length if given the opportunity, and also if not given the opportunity.</p>
          <QB text="The Chud does not chase. The Chud is simply... present. In the right places. At the right times. Several times. Until circumstances change." source="Kopecky, on the Second Pillar · Year Four of the Walking" />
          <QB text="To be a Chud is to know that you are correct, and to wait patiently for others to arrive at the same conclusion. The wait can be long. The Chud is patient. The Chud also fills the wait with analysis and careful reading and trying not to think about how long the waiting has been." source="Kopecky, to the assembly at Zlaté Moravce · Year Six" />
          <QB text="I am not lonely. I am solitary. The difference is that one is chosen and one is a condition and I have made the choice and therefore I am fine. I would explain further but I have somewhere I need to be. I do not currently have somewhere I need to be but I will shortly." source="Kopecky, when asked directly · Nitra, Year Five" />
          <QB text="A woman who does not appreciate the Chud has not yet understood what she is missing. The Chud understands this. The Chud finds it clarifying. The Chud also finds it, on occasion, difficult to sleep through. These are separate matters and the Chud has them under control." source="Kopecky, at the evening assembly · Prvá Dolina, Year Seven" />
          <QB text="The Chud reads. The Chud knows things. The Chud tells people the things he knows, because they deserve to know them. If people do not wish to be told, the Chud will tell them more slowly in case the issue was speed." source="Kopecky, on the Eighth Law · Year Six" />
          <QB text="I have walked from the Tatras to the Danube and back. The mountains are the same. The river is the same. The people are the same. The bread is getting worse." source="Kopecky, returning from the southern valleys · Tatranská Kniha, Chapter 8" />
          <QB text="If you have to ask whether the fire is ready, it is not ready. If you have to ask whether the man is trustworthy, he is not trustworthy. Uncertainty about a question is usually the answer to the question." source="Kopecky, to the council of elders at Nitra · Year Seven" />
        </div>

        {/* ── GRUDGES ── */}
        <div className="sec">
          <div className="sec-lbl">The Sťažnostná Kniha — Selected Entries</div>
          <div className="sec-ttl">The Grudges of Kopecky</div>
          <p className="prose">He never raised his voice. He never threatened. He simply <em>remembered</em> — and expressed his memory through small, precisely targeted inconveniences delivered across years with the patience of a man who has nowhere he urgently needs to be and a very clear sense of who owes him what.</p>
          <div style={{ marginTop: 26 }}>
            {GRUDGES.map((g, i) => (
              <div className="grudge" key={i}>
                <div className="g-sev"><span>{g.sev}</span>Severity</div>
                <div>
                  <div className="g-ttl">{g.title}</div>
                  <div className="g-body" dangerouslySetInnerHTML={{ __html: g.body }} />
                  <div className="g-meta">{g.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── LAWS CTA ── */}
        <div className="sec" style={{ textAlign: 'center', padding: '52px 0' }}>
          <div className="sec-lbl" style={{ textAlign: 'center', color: AM }}>The Sacred Codex — Dictated Year Six</div>
          <div className="sec-ttl" style={{ color: AM, textAlign: 'center' }}>The Čudové Zákony Await</div>
          <p className="prose" style={{ maxWidth: 560, margin: '0 auto 12px', textAlign: 'center' }}>
            The complete Fifteen Laws of Chudhood — on women, solitude, bill-paying, chess, the stew, eye contact, and the satchel — are preserved in the sacred subchapter. Enter when ready. Most people are not ready. This is covered in Law I.
          </p>
          <div className="laws-cta" style={{ marginTop: 28 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: AMA(0.55), marginBottom: 10 }}>Čudové Zákony · The Laws of Chudhood · Fifteen Laws · One Addendum</p>
            <button className="cta-btn" onClick={() => { setPage('laws'); window.scrollTo(0,0); }}>
              ✦ &nbsp; Enter the Laws of Chudhood &nbsp; ✦
            </button>
          </div>
        </div>

        {/* ── PRAYER ── */}
        <div className="sec">
          <div className="sec-lbl">The Daily Chud Practice — Recited at Dawn, Facing the Tatras</div>
          <div className="sec-ttl">The Morning Prayer of the Valleys</div>
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
            Cirkev Kopeckého · Church of Kopecky · Founded Prvá Dolina, Ancient Slovakia · He Was Right · Mostly · The Queen Is Not The Target In Chess · The Chud Endures · Do Not Touch the Satchel · He Will Know
          </div>
        </div>

      </div>
      <footer>© Cirkev Kopeckého · Prvá Dolina, High Tatra Region · He Descended · He Taught · He Invented Correct Chess · He Left · He Was Right About Almost Everything · He Will Return · The Invoice Remains Outstanding</footer>
    </>
  );
}

// ─────────────────────────────────────────────
// LAWS PAGE
// ─────────────────────────────────────────────
function LawsPage({ setPage }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <>
      <div className="laws-hero">
        <div className="orn">✦ ✦ ✦</div>
        <div className="laws-title">Čudové Zákony</div>
        <div className="laws-latin">The Laws of Chudhood</div>
        <div className="laws-sub">Dictated by Kopecky · Transcribed at Devín · Year Six of the Walking · Following a Woman Calling Him "A Lot"</div>
        <div className="orn" style={{ marginTop: 20 }}>✦ ✦ ✦</div>
      </div>

      <div className="laws-main">

        <div className="sec" style={{ padding: '50px 0 30px' }}>
          <div className="sec-lbl">The Preamble — Recorded by a Scribe Whose Name Was Omitted at His Own Request</div>
          <div className="sec-ttl" style={{ color: AM }}>On the Origin of These Laws</div>
          <p className="prose">These laws were dictated over a single long afternoon in Year Six, reportedly after a woman in the village of Zlaté Moravce told Kopecky he was <em>"a lot."</em> He did not respond to this directly. He sat down, requested paper, and wrote for four hours. The scribes who transcribed them have asked that their names not appear in the official record. The Council agreed. The names are known. They are not being mentioned here. The scribes are grateful and somewhat changed by the experience.</p>
          <p className="prose">What emerged was the <em>Čudové Zákony</em> — fifteen laws governing every major dimension of the Chud lifestyle. They have been described by three separate historians as "comprehensive," "unsettlingly specific," and "clearly written by someone with feelings about several things who had been holding those feelings for some time."</p>

          <div className="warn-box">
            <div className="warn-lbl">⚠ Council of Devín — Advisory Statement — To Be Read Before Proceeding</div>
            <div className="warn-txt">The Council of Devín affirms that the following laws are sacred. The Council also affirms that sacred does not preclude inadvisable. Several of these laws describe approaches to life that the Council finds structurally optimistic in ways experience suggests are unlikely to fully resolve. The Council has blessed them regardless. The Council has seen how this goes. The Council wishes the faithful well and has prepared a separate pamphlet on adjustment of expectations, available at the door.</div>
          </div>
        </div>

        <div style={{ paddingBottom: 40 }}>
          {LAWS.map((law, i) => (
            <LawAccordion key={i} law={law} index={i} expanded={expanded === i} onToggle={toggle} />
          ))}
        </div>

        <div style={{ paddingBottom: 56, borderTop: `1px solid ${AMA(0.12)}`, paddingTop: 48, textAlign: 'center' }}>
          <div className="sec-lbl" style={{ textAlign: 'center', color: AM }}>Closing Words — Council of Devín, Third Assembly</div>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(18px,3vw,28px)', color: AM, marginBottom: 24, textAlign: 'center' }}>A Final Note</div>
          <p className="prose" style={{ maxWidth: 580, margin: '0 auto 16px', textAlign: 'center' }}>
            The Fifteen Laws of Chudhood were received, transcribed, and canonised within the same week. This is the fastest the Council of Devín has ever acted on anything. The Council has reflected on why it moved so quickly. The Council believes it did not want Kopecky to know it was deliberating.
          </p>
          <p className="prose" style={{ maxWidth: 580, margin: '0 auto 32px', textAlign: 'center', fontStyle: 'italic', color: G }}>
            The laws are sacred. The Chud is a way of life. Kopecky was, in most ways, right. The queen is still not the target in chess. These facts coexist in the tradition and the Council has made its peace with that.
          </p>
          <button className="back-btn" onClick={() => { setPage('main'); window.scrollTo(0,0); }}>
            ← Return to the Main Scripture
          </button>
        </div>
      </div>
      <footer>© Cirkev Kopeckého · The Laws Are Sacred · Law X Is Factually Incorrect · The Council Is Aware · The Satchel Remains Closed · He Will Return · He Will Still Be Wrong About Chess</footer>
    </>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function KopeckyChurch() {
  const [page, setPage] = useState('main');

  return (
    <div className="wrap">
      <style>{CSS}</style>

      <header>
        <span className="sym">⸸</span>
        <div className="h-title">Cirkev Kopeckého</div>
        <div className="orn">— ✦ ✦ ✦ —</div>
        <div className="h-sub">
          Church of Kopecky &nbsp;·&nbsp; Ancient Slovakia &nbsp;·&nbsp; He Walked the Tatras &nbsp;·&nbsp;
          He Invented the Chud &nbsp;·&nbsp; He Argued About Chess &nbsp;·&nbsp; He Was Right &nbsp;·&nbsp; Mostly
        </div>
      </header>

      <nav>
        {['Origin','The Chud','Chess Argument','Quotes','Grudges','Prayer'].map(lbl => (
          <button key={lbl} className={`nb ${page==='main'?'on':''}`} onClick={() => { setPage('main'); window.scrollTo(0,0); }}>{lbl}</button>
        ))}
        <button className={`nb laws ${page==='laws'?'on':''}`} onClick={() => { setPage('laws'); window.scrollTo(0,0); }}>
          ⚖ Laws of Chudhood
        </button>
      </nav>

      {page === 'main' ? <MainPage setPage={setPage} /> : <LawsPage setPage={setPage} />}

      <button className="stb" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} title="Back to top">▲</button>
    </div>
  );
}
