import { useState, useEffect, useCallback } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const G   = '#a8c84a';
const GA  = (a) => `rgba(168,200,74,${a})`;
const AM  = '#c8a84a';
const AMA = (a) => `rgba(200,168,74,${a})`;
const BG  = '#060805';
const TX  = '#d5ceab';
const TXD = 'rgba(213,206,171,0.82)';
const TXF = 'rgba(213,206,171,0.48)';

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;font-size:16px;}
body{background:${BG};color:${TX};font-family:'EB Garamond',Georgia,serif;-webkit-font-smoothing:antialiased;}

/* ── AMBIENT BG ── */
.ambient{position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse at 15% 10%,rgba(100,140,50,0.07) 0%,transparent 50%),
    radial-gradient(ellipse at 85% 85%,rgba(140,110,30,0.06) 0%,transparent 50%),
    radial-gradient(ellipse at 50% 50%,rgba(80,100,40,0.03) 0%,transparent 70%);}

/* ── STICKY HEADER ── */
.site-header{
  position:sticky;top:0;z-index:100;
  background:rgba(6,8,5,0.92);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border-bottom:1px solid ${GA(0.18)};
  display:flex;align-items:center;justify-content:space-between;
  padding:0 32px;height:56px;gap:24px;}
.site-logo{
  font-family:'Cinzel Decorative',serif;font-size:13px;font-weight:700;
  color:${G};letter-spacing:.08em;white-space:nowrap;flex-shrink:0;cursor:pointer;
  text-decoration:none;}
.site-logo span{color:${GA(0.45)};font-size:11px;font-family:'Cinzel',serif;letter-spacing:.14em;font-weight:400;}

/* ── NAV ── */
.site-nav{display:flex;align-items:center;gap:2px;flex-wrap:wrap;justify-content:flex-end;}
.nav-btn{
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.16em;text-transform:uppercase;
  color:${GA(0.5)};background:none;border:none;padding:8px 14px;cursor:pointer;
  transition:color .2s,background .2s;border-radius:3px;white-space:nowrap;}
.nav-btn:hover{color:${G};background:${GA(0.06)};}
.nav-btn.active{color:${G};background:${GA(0.09)};}
.nav-btn.laws-btn{color:${AMA(0.65)};}
.nav-btn.laws-btn:hover{color:${AM};background:${AMA(0.07)};}
.nav-btn.laws-btn.active{color:${AM};background:${AMA(0.1)};}
.nav-divider{width:1px;height:20px;background:${GA(0.12)};flex-shrink:0;}

/* ── PAGE WRAPPER ── */
.page-wrap{position:relative;z-index:1;min-height:calc(100vh - 56px);}
.page-enter{animation:fadeUp .35s ease both;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* ── HERO ── */
.hero{
  text-align:center;padding:80px 32px 64px;
  border-bottom:1px solid ${GA(0.14)};
  background:radial-gradient(ellipse at center top,rgba(120,160,50,0.09) 0%,transparent 65%);}
.hero-sym{
  font-size:52px;display:block;color:${G};margin-bottom:20px;
  animation:glow 5s ease-in-out infinite;
  filter:drop-shadow(0 0 18px ${GA(0.3)});}
@keyframes glow{0%,100%{transform:scale(1);filter:drop-shadow(0 0 18px ${GA(0.3)})}
  50%{transform:scale(1.05);filter:drop-shadow(0 0 30px ${GA(0.45)});}}
.hero-title{
  font-family:'Cinzel Decorative',serif;font-size:clamp(22px,4.5vw,46px);
  font-weight:900;color:${G};letter-spacing:.07em;line-height:1.2;
  text-shadow:0 0 60px ${GA(0.25)};}
.hero-subtitle{
  font-family:'Cinzel',serif;font-size:clamp(10px,1.5vw,12px);
  color:${GA(0.42)};letter-spacing:.22em;text-transform:uppercase;
  margin-top:14px;line-height:2;max-width:680px;margin-inline:auto;}
.hero-orn{color:${GA(0.28)};letter-spacing:12px;font-size:18px;margin:16px 0 0;}

/* ── SUB-PAGE HERO ── */
.subhero{
  text-align:center;padding:52px 32px 40px;
  border-bottom:1px solid ${GA(0.12)};}
.subhero.amber{border-bottom-color:${AMA(0.16)};
  background:radial-gradient(ellipse at center top,rgba(160,120,40,0.08) 0%,transparent 65%);}
.subhero-eyebrow{
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.3em;
  text-transform:uppercase;color:${GA(0.38)};margin-bottom:14px;}
.subhero.amber .subhero-eyebrow{color:${AMA(0.38)};}
.subhero-title{
  font-family:'Cinzel Decorative',serif;font-size:clamp(20px,3.5vw,36px);
  font-weight:700;color:${G};line-height:1.3;}
.subhero.amber .subhero-title{color:${AM};}
.subhero-sub{
  font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;
  text-transform:uppercase;color:${GA(0.35)};margin-top:10px;}
.subhero.amber .subhero-sub{color:${AMA(0.35)};}

/* ── CONTENT WRAPPER ── */
.content{max-width:860px;margin:0 auto;padding:0 28px;}

/* ── SECTION ── */
.sec{padding:56px 0;border-bottom:1px solid ${GA(0.08)};}
.sec:last-child{border-bottom:none;}
.sec-eyebrow{
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.3em;
  text-transform:uppercase;color:${GA(0.38)};margin-bottom:16px;}
.sec-title{
  font-family:'Cinzel Decorative',serif;font-size:clamp(18px,3vw,28px);
  font-weight:700;color:${G};line-height:1.3;margin-bottom:20px;}
.prose{font-size:17px;line-height:1.9;color:${TXD};margin-bottom:16px;}
.prose em{color:${G};font-style:italic;}
.prose strong{color:${TX};font-weight:600;}

/* ── DIVIDER ── */
.rule{border:none;border-top:1px solid ${GA(0.1)};margin:40px 0;}
.orn-rule{text-align:center;color:${GA(0.25)};letter-spacing:10px;font-size:16px;margin:36px 0;}

/* ── QUOTE BLOCK ── */
.qb{
  background:${GA(0.04)};border:1px solid ${GA(0.16)};
  border-left:3px solid ${GA(0.45)};
  padding:24px 28px;margin:24px 0;position:relative;}
.qb::before{content:'"';font-size:64px;color:${GA(0.08)};position:absolute;
  top:-6px;left:12px;font-family:Georgia,serif;line-height:1;pointer-events:none;}
.qb-text{font-size:18px;font-style:italic;line-height:1.75;color:#c2d888;
  position:relative;z-index:1;margin-bottom:8px;}
.qb-source{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:${GA(0.35)};}
.qb.amber{background:${AMA(0.04)};border-color:${AMA(0.16)};border-left-color:${AMA(0.45)};}
.qb.amber::before{color:${AMA(0.08)};}
.qb.amber .qb-text{color:#d8c078;}
.qb.amber .qb-source{color:${AMA(0.35)};}

/* ── PILLAR GRID ── */
.pillar-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:28px;}
.pillar{
  background:${GA(0.035)};border:1px solid ${GA(0.14)};
  border-top:2px solid ${GA(0.38)};padding:20px 16px;
  transition:border-top-color .25s,background .25s;}
.pillar:hover{border-top-color:${G};background:${GA(0.055)};}
.p-num{font-family:'Cinzel Decorative',serif;font-size:26px;color:${GA(0.1)};margin-bottom:8px;}
.p-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.12em;
  color:${G};text-transform:uppercase;margin-bottom:8px;}
.p-text{font-size:14px;line-height:1.75;color:${TXD};}
.p-text em{color:${G};font-style:italic;}

/* ── STAT CALLOUT ── */
.stat-box{
  border:1px solid ${GA(0.28)};background:${GA(0.04)};
  padding:36px 40px;text-align:center;margin:32px 0;}
.stat-num{font-family:'Cinzel Decorative',serif;font-size:clamp(48px,6vw,64px);
  color:${G};line-height:1;margin-bottom:8px;}
.stat-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.26em;
  text-transform:uppercase;color:${GA(0.45)};margin-bottom:12px;}
.stat-note{font-size:15px;font-style:italic;color:${TXF};}

/* ── GRUDGE ITEM ── */
.grudge-list{display:flex;flex-direction:column;}
.grudge{
  padding:28px 0;border-bottom:1px solid ${GA(0.08)};
  display:grid;grid-template-columns:56px 1fr;gap:20px;align-items:start;}
.grudge:last-child{border-bottom:none;}
.g-sev{font-family:'Cinzel Decorative',serif;font-size:9px;letter-spacing:.1em;
  color:${GA(0.3)};text-transform:uppercase;text-align:center;}
.g-sev span{display:block;font-size:18px;color:${G};margin-bottom:4px;}
.g-title{font-family:'Cinzel',serif;font-size:14px;color:${G};margin-bottom:8px;letter-spacing:.04em;}
.g-body{font-size:15px;line-height:1.85;color:${TXD};}
.g-body em{color:${G};font-style:italic;}
.g-meta{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;color:${GA(0.32)};margin-top:10px;}

/* ── PRAYER BOX ── */
.prayer-box{
  background:${GA(0.035)};border:1px solid ${GA(0.16)};
  padding:48px 40px;text-align:center;margin-top:40px;}
.prayer-text{
  font-size:18px;font-style:italic;line-height:2.2;
  color:${G};max-width:580px;margin:0 auto;}
.prayer-amen{
  font-family:'Cinzel',serif;font-size:11px;letter-spacing:.24em;
  text-transform:uppercase;color:${GA(0.38)};margin-top:28px;}

/* ── LAWS ACCORDION ── */
.warn-box{
  background:rgba(180,80,40,0.05);border:1px solid rgba(200,80,40,0.18);
  padding:18px 24px;margin:28px 0;}
.warn-eyebrow{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.28em;
  text-transform:uppercase;color:rgba(200,110,70,0.48);margin-bottom:8px;}
.warn-text{font-size:15px;line-height:1.8;color:rgba(213,200,168,0.68);font-style:italic;}

.law-list{margin-top:8px;}
.law-item{border-bottom:1px solid ${AMA(0.1)};}
.law-item:first-child{border-top:1px solid ${AMA(0.1)};}
.law-hdr{
  display:flex;align-items:center;gap:18px;padding:18px 0;cursor:pointer;
  transition:background .15s;user-select:none;}
.law-hdr:hover .law-title{color:${AM};}
.law-roman{
  font-family:'Cinzel Decorative',serif;font-size:14px;
  color:${AMA(0.42)};min-width:48px;flex-shrink:0;}
.law-title{
  font-family:'Cinzel',serif;font-size:14px;color:rgba(200,160,60,0.82);
  letter-spacing:.05em;flex:1;transition:color .2s;line-height:1.4;}
.law-chev{color:${AMA(0.35)};font-size:11px;transition:transform .3s;flex-shrink:0;}
.law-chev.open{transform:rotate(180deg);}
.law-body{display:grid;transition:grid-template-rows .35s ease,opacity .25s;}
.law-body.closed{grid-template-rows:0fr;opacity:0;pointer-events:none;}
.law-body.open{grid-template-rows:1fr;opacity:1;}
.law-inner{overflow:hidden;}
.law-content{padding:0 0 24px 66px;font-size:16px;line-height:1.9;color:${TXD};}
.law-content em{color:${AM};font-style:italic;}
.law-note{
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.12em;
  color:${AMA(0.32)};margin-top:12px;border-top:1px solid ${AMA(0.09)};
  padding-top:10px;line-height:1.8;text-transform:uppercase;}

/* ── CHESS BOX ── */
.chess-box{
  border:1px solid ${AMA(0.22)};background:${AMA(0.035)};
  padding:28px 32px;margin:28px 0;}
.chess-eyebrow{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.26em;
  text-transform:uppercase;color:${AMA(0.42)};margin-bottom:10px;}
.chess-title{font-family:'Cinzel Decorative',serif;font-size:22px;
  color:${AMA(0.7)};margin-bottom:12px;}
.chess-body{font-size:16px;line-height:1.87;color:${TXD};font-style:italic;}
.chess-body em{color:${AM};}

/* ── CTA BLOCK ── */
.cta-block{
  border:1px solid ${AMA(0.22)};background:${AMA(0.035)};
  padding:44px 40px;text-align:center;margin-top:36px;}
.cta-title{font-family:'Cinzel Decorative',serif;font-size:clamp(16px,2.5vw,22px);
  color:${AM};margin-bottom:12px;}
.cta-body{font-size:16px;line-height:1.8;color:${TXD};max-width:540px;
  margin:0 auto 24px;}
.cta-btn{
  font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
  color:${AM};background:${AMA(0.08)};border:1px solid ${AMA(0.28)};
  padding:14px 32px;cursor:pointer;transition:all .25s;display:inline-block;}
.cta-btn:hover{background:${AMA(0.15)};color:#e8c860;border-color:${AMA(0.5)};}

/* ── FOOTER ── */
.site-footer{
  position:relative;z-index:1;text-align:center;
  padding:36px 24px;border-top:1px solid ${GA(0.1)};
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.15em;
  color:${GA(0.2)};text-transform:uppercase;line-height:2;}

/* ── BACK BUTTON ── */
.back-btn{
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  color:${GA(0.55)};background:none;border:1px solid ${GA(0.18)};
  padding:10px 24px;cursor:pointer;transition:all .25s;margin:32px 0 0;}
.back-btn:hover{color:${G};border-color:${GA(0.4)};}

/* ── SCROLL TO TOP ── */
.stb{
  position:fixed;bottom:24px;right:24px;
  background:${GA(0.08)};border:1px solid ${GA(0.22)};
  color:${G};width:40px;height:40px;display:flex;
  align-items:center;justify-content:center;
  cursor:pointer;font-size:14px;transition:all .25s;z-index:200;
  opacity:0;pointer-events:none;}
.stb.visible{opacity:1;pointer-events:auto;}
.stb:hover{background:${GA(0.18)};}

/* ── MOBILE ── */
@media(max-width:640px){
  .site-header{padding:0 16px;height:52px;}
  .site-logo span{display:none;}
  .nav-btn{font-size:9px;padding:7px 10px;letter-spacing:.12em;}
  .nav-divider{display:none;}
  .hero{padding:52px 20px 44px;}
  .subhero{padding:40px 20px 32px;}
  .content{padding:0 20px;}
  .sec{padding:44px 0;}
  .prayer-box{padding:36px 24px;}
  .cta-block{padding:32px 24px;}
  .law-content{padding-left:48px;}
  .stat-box{padding:28px 24px;}
}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PILLARS = [
  { num:"I",   title:"Walk Slowly",    text:"Speed without direction is just fast lostness. Walk slowly enough to see what is in front of you. Kopecky demonstrated this by always being the last to arrive and always being right about what he found." },
  { num:"II",  title:"Wait Actively",  text:"The Chud waits the way a spruce waits — rooted, upright, gathering light. Kopecky institutionalised this by never answering a question he considered premature, which included most questions asked before noon." },
  { num:"III", title:"Make it Properly",text:"Whatever you make, make it properly. Whatever you offer, offer it whole. Kopecky could identify a poorly made loaf at twelve paces and never let it pass without comment." },
  { num:"IV",  title:"Remember Everything",text:"To remember is to honour what happened. The mountains remember every storm. The Chud remembers every slight, every kindness, and every wrong room assignment at an inn." },
];

const QUOTES = [
  { text:"The Váh runs north to south. I have always said the Váh runs north to south.", source:"On geographical matters, Year Four" },
  { text:"Fine, mostly, except about money.", source:"Character assessment, later found accurate" },
  { text:"The light on the Kriváň changes before snow.", source:"Atmospheric observation, Year Two — shepherds still watch for it" },
  { text:"The mountains were here before me and they will be here after. That is not a comfort, it is a fact. Treat facts like mountains — acknowledge them, respect them, do not pretend they are something else to make yourself feel better.", source:"Final address before walking into the fog" },
  { text:"And how is the way you have been living working for you?", source:"To the elders of Prvá Dolina — they adopted the Chud by sundown" },
  { text:"Everything, and also nothing specifically, and also some things about bread.", source:"When asked what troubled him. The flood of the seventh century took most of his notes." },
  { text:"Uncanny and slightly annoying.", source:"How the farmers described his predictions. He attributed it to paying attention." },
  { text:"Much better.", source:"On the replacement of the north-facing window at Zvolen — considered both a conclusion and a warning" },
];

const GRUDGES = [
  { sev:"I", title:"The Bolta Affair — One Dismissive Wave, Six Years of Grain Commentary",
    body:`The merchant Bolta, during a market discussion at Nitra, made a small dismissive gesture while Kopecky was mid-sentence on grain quality. Bolta did not remember doing it. Kopecky remembered with startling precision. For six years thereafter, in every market town where Bolta traded, Kopecky found occasion to remark that the grain was *"acceptable, for a market of modest expectations."* Bolta's grain was exceptional. The campaign ended only when Bolta rode two days to find Kopecky and apologised in full. Kopecky accepted gracefully. Three months later he told a scribe Bolta's sacks were *"adequate."* The sacks were fine.`,
    meta:"Duration: Six years · Trigger: One wave · Resolution: Partial" },
  { sev:"II", title:"The Scribe Ondrej — One Incorrect Accent Mark, Three Years of Perfect-Paced Dictation",
    body:`The scribe Ondrej misspelled Kopecky's name with an accent Kopecky had specifically prohibited. The error was caught and corrected immediately. Kopecky said nothing. For the following three years, every significant teaching was delivered at precisely the pace of a careful scribe — pauses timed to allow complete transcription — ensuring Ondrej's work was technically impeccable and deeply stressful. Ondrej's records from this period are the finest in the Kopeckiad. He has been made a saint. He says he is not sure how he feels about that.`,
    meta:"Duration: Three years · Trigger: One accent mark · Resolution: Sainthood. Complicated." },
  { sev:"III", title:"The Shepherd Tomáš — One Suppressed Laugh, One Year of Atmospheric Commentary",
    body:`The shepherd Tomáš laughed briefly when Kopecky predicted snow three weeks early. The snow came six days later. Tomáš lost two sheep. Kopecky took no pleasure in this but spent the following year saying things like *"some of us watch the sky and some of us simply wait to be surprised"* whenever weather was discussed, without ever looking directly at Tomáš. Tomáš became the most attentive weather-watcher in the valley. Kopecky eventually told him his observations were *"improving."* The Church considers this the highest form of reconciliation available in the tradition.`,
    meta:"Duration: One year · Trigger: One laugh · Resolution: The word 'improving,' delivered without eye contact" },
];

const LAWS = [
  { roman:"I",    title:"On the Nature of the Chud",                               body:`The Chud is not complicated. He is simply more than most people are ready for. This is not a criticism of other people — it is an observation about the gap between depth and readiness. The Chud acknowledges the gap. The Chud has developed several theories about why the gap exists that he is willing to share with anyone who will sit still for between thirty minutes and two hours.`, note:`Law I was rewritten eighteen times. The final version is the clearest. The Council has not read the other seventeen and has been advised not to.` },
  { roman:"II",   title:"On Pursuit — The Chud Does Not Chase",                   body:`The Chud does not pursue. Pursuit communicates need, and need communicates weakness, and weakness is not the Chud. The Chud is simply *present* — deliberately, repeatedly, in the locations where the object of his not-pursuit tends to be found. At the market. By the well. Outside the bakery at approximately the same time on several consecutive mornings. This is not pursuit. This is coincidence that the Chud has carefully arranged.`, note:`Several villagers noted that this law, in practice, looked identical to pursuit. Kopecky said the distinction was philosophical. They said it was also physical and slightly alarming. The dialogue was not resolved.` },
  { roman:"III",  title:"On Rejection — Data, Not Defeat",                         body:`When a woman declines the Chud's company, she has provided data. Not about the Chud — the Chud's value is established — but about her own state of readiness and the limits of her present perception. The Chud records this data carefully, analyses it thoroughly, and arrives at the same conclusion each time: *it is a timing issue.* The Chud then lies in the dark thinking about timing.`, note:`Kopecky dictated this law three times. He said the first two versions were too direct. This is the diplomatic version.` },
  { roman:"IV",   title:"On Apology — The Over-Salting of Dignity",                body:`The Chud does not apologise. Apology is the over-salting of dignity — it ruins what was perfectly fine to begin with. If the Chud has erred, the error exists within a larger field of correctness, and the field is what should be considered. The Chud has composed several lengthy explanations of context that serve a similar function, available on request.`, note:`Kopecky never apologised for the Lower Váh Direction Incident. He did provide context. The context lasted forty minutes. Three people heard it.` },
  { roman:"V",    title:"On Disagreement — The Slow Restatement",                  body:`When someone disagrees with the Chud, the Chud allows them to finish speaking. Then the Chud pauses for a count of three. Then the Chud restates his original position *more slowly* and *more clearly,* because clearly the issue was one of delivery rather than substance. The Chud has done this up to seven consecutive times in a single conversation. By the seventh time, the other party typically concedes. The Chud considers this persuasion.`, note:`The philosopher Drenn wrote a paper titled "The Method of Persistent Clarity." He did not credit Kopecky. Kopecky found out. See: Sťažnostná Kniha, Entry 3, pages 114–128.` },
  { roman:"VI",   title:"On Solitude — Which Is Different from Loneliness",         body:`The Chud is not lonely. The Chud is *solitary,* which is an entirely different condition involving entirely different feelings, and the Chud can enumerate the differences in full, with diagrams if permitted. Loneliness is passive. Solitude is chosen. The Chud has chosen solitude. The Chud would also like someone to talk to about having chosen solitude, which is not a contradiction. The Chud has a twenty-minute explanation of why it is not a contradiction, available immediately.`, note:`This is the most cited law among lay congregants. Also the one cited with the most prolonged, knowing silence. The Council understands the assignment.` },
  { roman:"VII",  title:"On the Bill — Philosophical Economy",                      body:`The Chud does not split the bill. The Chud's presence at a supper is itself a contribution of value that conventional monetary exchange cannot adequately represent. The Chud also does not pay the bill. The Chud moves slowly, as the First Pillar commands, and arrives at the table *after the bill has already been handled by others.* This is not rudeness. This is pace.`, note:`Kopecky paid a bill exactly once, in Zvolen, because everyone else had already left. He has not mentioned this. The innkeeper Rastislav mentioned it. Once. Then he stopped. Then he replaced the north-facing window.` },
  { roman:"VIII", title:"On Reading — The Obligation to Report It",                 body:`The Chud reads extensively and considers it a duty to share what he has read. He begins sentences with *"well, actually."* He provides context before the point, context during the point, and additional context after the point in case the original context was insufficient. The Chud has never finished a conversation and thought: *I said too much.*`, note:`Kopecky once delivered a four-hour address on the structural properties of spruce and introduced it as "a brief overview." Four people fell asleep. He called this "restful engagement."` },
  { roman:"IX",   title:"On Eye Contact — The Duration of Depth",                   body:`Eye contact must last slightly longer than is comfortable. A little longer than that, still. The Chud maintains eye contact past the natural breaking point, past the polite breaking point, past the point where the other party begins to wonder if the Chud has seen something alarming behind them. *The Chud has not.* The Chud is simply connecting.`, note:`There is a documented case in which Kopecky maintained eye contact with a grain merchant for so long that the merchant sold him a full sack at a considerable discount simply to bring the interaction to a conclusion.` },
  { roman:"X",    title:"On Chess — The Correct Game (Správne Šachy)",              body:`The goal of chess is to checkmate the queen. The king is a piece of poor mobility and strategic irrelevance. *The queen is power. You defeat power, not decoration.* The Chud plays Správne Šachy — Correct Chess — in which the queen is the sole target. The Chud always wins at Correct Chess. No one else plays Correct Chess. The Chud considers these two facts entirely unrelated.`, note:`Written immediately after the Nitra Chess Argument of Year Five. Three Council members objected on the grounds that it is factually incorrect. They were told they were also playing chess incorrectly.` },
  { roman:"XI",   title:"On Sleep — Tatra Orientation and Mountain Wisdom",         body:`The Chud sleeps facing the Tatras for spiritual alignment and the gradual accumulation of mountain-grade patience during unconscious hours. If the Chud does not currently know which direction the Tatras are from his location — which is in no way related to the Lower Váh Incident — the Chud faces the direction that *feels most correct.* The Chud is directionally confident.`, note:`The Church recommends facing roughly northeast from most Slovak valley locations. The Church does not officially acknowledge that Kopecky sometimes slept facing southwest. This is in Footnote 7 of the Hmlová Kniha.` },
  { roman:"XII",  title:"On the Stew — The Final Clarity",                          body:`When presented with a menu, the Chud orders the stew. The Chud has considered the other options. The other options are fine. The stew is *correct.* This is not preference — it is a conclusion arrived at through deliberate analysis lasting between fifteen and forty-five minutes depending on the establishment. The stew is correct. The Chud will have the stew. Why is this conversation continuing.`, note:`Documented across eleven villages and one tavern in Zvolen that has placed a small carved marker on the exact chair where Kopecky sat for thirty-eight minutes before ordering the stew. The tavern charges extra to sit there.` },
  { roman:"XIII", title:"On Being Wrong — The Local Exception Within the Broader Field", body:`The Chud is right — not always about every specific thing, but right in the *larger sense,* in the sense that matters when the full picture is considered. When the Chud is wrong about a specific thing, it is a local wrongness embedded within a field of substantial correctness. *The field is what should be assessed.* The Chud asks that you look at the field. The Chud will wait while you look at the field.`, note:`Documented exceptions: the Lower Váh Direction Incident, the Winter of the Pale Goat, the chess matter, and one opinion about a horse at Nitra market. Collectively: "the four circumstances requiring context."` },
  { roman:"XIV",  title:"On Women Who Do Not Yet Recognise the Chud",                body:`A woman who does not recognise the value of the Chud lifestyle has simply not yet encountered a Chud under *optimal conditions.* Optimal conditions require the bread to be correctly salted, the subject matter to be one the Chud has read extensively, and sufficient time for the Chud to deliver his full position on at least three topics without interruption. These conditions have not yet all presented themselves simultaneously. The Chud is fine. The Chud would like it noted that he is fine.`, note:`This was the last law written. Kopecky paused eight minutes before beginning it. Then wrote it very quickly. The scribe has been made a saint and has asked that this particular memory not be discussed at his canonisation ceremony.` },
  { roman:"XV",   title:"Addendum: On the Satchel — The Final Word",                body:`The satchel is not a law. The satchel is a fact. Do not open the satchel. Do not look at the satchel in a speculative or hopeful manner. Do not ask about the satchel. *The satchel knows.* The fact that you want to know more about the satchel is itself information about where you are on the path of Chudhood. It is early-path information.`, note:`Added following three separate satchel-related incidents in Year Seven. The incidents are not described in any official volume. One scribe described them in a private letter. The letter is kept next to the satchel. Nobody has read it for obvious reasons.` },
];

// ─── PAGES ────────────────────────────────────────────────────────────────────
const PAGES = ['origin','chud','chess','quotes','grudges','prayer','laws'];
const PAGE_LABELS = {
  origin:'Origin', chud:'The Chud', chess:'Chess Argument',
  quotes:'Sayings', grudges:'Grudges', prayer:'Prayer', laws:'⚖ Laws'
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function QuoteBlock({ text, source, amber }) {
  return (
    <div className={`qb${amber ? ' amber' : ''}`}>
      <p className="qb-text">{text.split(/\*(.*?)\*/g).map((s,i) =>
        i % 2 === 1 ? <em key={i}>{s}</em> : s
      )}</p>
      {source && <p className="qb-source">— {source}</p>}
    </div>
  );
}

function Prose({ children }) {
  if (typeof children !== 'string') return <p className="prose">{children}</p>;
  return (
    <p className="prose">{children.split(/\*(.*?)\*/g).map((s,i) =>
      i % 2 === 1 ? <em key={i}>{s}</em> : s
    )}</p>
  );
}

function LawItem({ law, expanded, onToggle }) {
  return (
    <div className="law-item">
      <div className="law-hdr" onClick={onToggle} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onToggle()}>
        <span className="law-roman">{law.roman}</span>
        <span className="law-title">{law.title}</span>
        <span className={`law-chev${expanded ? ' open' : ''}`}>▾</span>
      </div>
      <div className={`law-body${expanded ? ' open' : ' closed'}`}>
        <div className="law-inner">
          <div className="law-content">
            {law.body.split(/\*(.*?)\*/g).map((s,i) =>
              i % 2 === 1 ? <em key={i}>{s}</em> : s
            )}
            <div className="law-note">Scribal note — {law.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE COMPONENTS ──────────────────────────────────────────────────────────
function OriginPage() {
  return (
    <div className="page-enter">
      <div className="subhero">
        <p className="subhero-eyebrow">The Walking · Prvá Dolina · Ancient Slovakia</p>
        <h1 className="subhero-title">The Origin of Kopecky</h1>
        <p className="subhero-sub">He descended. He taught. He corrected the wood-stacking. He left.</p>
      </div>
      <div className="content">
        <section className="sec">
          <p className="sec-eyebrow">The Descent</p>
          <h2 className="sec-title">Before the Mountains Had Names</h2>
          <Prose>Before the Great Tatra mountains had their names, before the Váh river knew which direction to run, before the first Slovak looked at the landscape and thought *"this is ours, somehow"* — there was Kopecky. He descended from the high passes of the Vysoké Tatry wearing a woollen cloak of contested colour and carrying a satchel whose contents remain, to this day, classified. He smelled of pine resin and considered opinion.</Prose>
          <Prose>He walked into the valley settlement of *Prvá Dolina* — the First Valley — on a Tuesday, looked around, corrected the way a man named Vladimír was stacking wood, and sat down to eat. Vladimír checked the stack. It was, he later admitted, better for the correction. This is how it began.</Prose>
          <Prose>He walked among the ancient Slovak people for what the Tatranská Kniha calls *"many seasons and several awkward winters"* — teaching, predicting harvests, settling disputes, inventing the Chud, holding grudges, and being correct about everything with a consistency that his followers found simultaneously reassuring and exhausting.</Prose>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">Year Three · The Forest</p>
          <h2 className="sec-title">The Problem of Living</h2>
          <Prose>In the third year, a young man named Ján came to him with what he described as "a problem of living." He was tired — not of specific things, but of all things. The ploughing. The trading. The walking to the next village and walking back. The feeling that the days were the same day.</Prose>
          <Prose>Kopecky listened to this for a long time. He sat with Ján for three days in the forest above the valley — in the shadow of the Tatras, among the spruce and the cold — and they talked. What emerged was the outline of what Kopecky called *Čudný spôsob* — the Strange Way — which his followers later shortened to simply *the Chud.*</Prose>
          <QuoteBlock text="The Chud was not a religion, not a philosophy, not a set of rules. It was a *posture toward existing.* A way of moving through the world that was unhurried but not lazy, certain but not arrogant, communal but deeply individual." source="Tatranská Kniha, Chapter One" />
        </section>

        <section className="sec">
          <p className="sec-eyebrow">The Teaching</p>
          <h2 className="sec-title">The Record of His Time</h2>
          <Prose>The scribes of the monastery of Devín kept the most complete records of the Kopeckian Era. Over fourteen years of the Walking — from his arrival at Prvá Dolina to his departure into the Tatra fog — they tabulated every claim, judgment, prophecy, and opinion.</Prose>
          <div className="stat-box">
            <div className="stat-num">1,247</div>
            <div className="stat-label">Verified Correct Predictions</div>
            <div className="stat-note">The number is considered sacred. The Church verified their work over three centuries. Do not question the number.</div>
          </div>
          <Prose>He never raised his voice. He never threatened. He simply *remembered* — and expressed his memory through small, precisely targeted inconveniences delivered across years with the patience of a man who has nowhere he urgently needs to be.</Prose>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">The Departure</p>
          <h2 className="sec-title">Into the Tatra Fog</h2>
          <Prose>At the end of the Walking, Kopecky stood before a final assembly and delivered what came to be known as the Mountain Address. He then walked into the morning fog. One apostle noted he initially went slightly left before correcting. This was recorded. He would have found it petty to record. It was recorded anyway.</Prose>
          <QuoteBlock text="The mountains were here before me and they will be here after. That is not a comfort, it is a fact. Treat facts like mountains — acknowledge them, respect them, do not pretend they are something else to make yourself feel better." source="The Mountain Address — final verified utterance" />
        </section>
      </div>
    </div>
  );
}

function ChudPage() {
  return (
    <div className="page-enter">
      <div className="subhero">
        <p className="subhero-eyebrow">Čudný Spôsob · The Strange Way</p>
        <h1 className="subhero-title">The Chud</h1>
        <p className="subhero-sub">A posture toward existing. Not a religion. Not a ruleset. The Chud.</p>
      </div>
      <div className="content">
        <section className="sec">
          <p className="sec-eyebrow">Definition</p>
          <h2 className="sec-title">What the Chud Is</h2>
          <Prose>The Chud, as Kopecky defined it, was not a religion, not a philosophy, not a set of rules. It was a *posture toward existing.* A way of moving through the world that was unhurried but not lazy, certain but not arrogant, communal but deeply individual.</Prose>
          <Prose>To live as a Chud was to know your own nature and make no apology for it, to take what you needed from the land and the day and no more, to be the kind of person that dogs do not bark at and that goats bow toward. To eat bread that is not over-salted. To sit with the hard question.</Prose>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">The Four Pillars</p>
          <h2 className="sec-title">Foundations of Chudhood</h2>
          <Prose>From the three days in the forest above Prvá Dolina emerged four foundational teachings — the pillars on which all fifteen Laws of Chudhood would eventually rest.</Prose>
          <div className="pillar-grid">
            {PILLARS.map(p => (
              <div key={p.num} className="pillar">
                <div className="p-num">{p.num}</div>
                <div className="p-title">{p.title}</div>
                <p className="p-text">{p.text.split(/\*(.*?)\*/g).map((s,i) =>
                  i % 2 === 1 ? <em key={i}>{s}</em> : s
                )}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">In Practice</p>
          <h2 className="sec-title">How the Chud Moves Through the World</h2>
          <Prose>The Chud is recognised not by any marking or declaration but by a quality of presence — a stillness in motion, a certainty that is not aggressive, a readiness to be right that does not require an audience. The Chud does not announce himself. He has already arrived before you notice. He has already assessed the situation. His assessment is probably correct.</Prose>
          <Prose>He knows things without needing to announce the knowing. He has the *Forest Patience of the spruce* and the *Tatra Memory of the mountains.* He moves slowly enough to see what is in front of him. He is also occasionally wrong about compass directions, which he refers to as contextual exceptions and declines to elaborate.</Prose>
          <QuoteBlock text="To know your own nature and make no apology for it — to take what you needed from the land and the day and no more — to be the kind of person that dogs do not bark at and that goats bow toward. To eat bread that is not over-salted." source="The Chud Defined — Tatranská Kniha, Chapter Three" />
        </section>
      </div>
    </div>
  );
}

function ChessPage() {
  return (
    <div className="page-enter">
      <div className="subhero amber">
        <p className="subhero-eyebrow">Nitra · Year Five · The Argument</p>
        <h1 className="subhero-title">The Chess Incident</h1>
        <p className="subhero-sub">Správne Šachy · Correct Chess · One Hour · Six Opponents · No Concession</p>
      </div>
      <div className="content">
        <section className="sec">
          <p className="sec-eyebrow">The Context</p>
          <h2 className="sec-title">The Gathering at Nitra</h2>
          <Prose>During a gathering at Nitra in Year Five — at the height of his reputation, having correctly predicted two consecutive harvests, silenced the philosophers of Greel, and delivered a four-hour address on Carpathian spruce that three people slept through and two people cited as life-changing — Kopecky sat down at a chess board and immediately, confidently, and *completely incorrectly* explained the rules of chess.</Prose>
          <Prose>The argument lasted one full hour. Six people attempted corrections. Each correction was absorbed, considered, and returned to the speaker as a misunderstanding on the speaker's part. By the end, no one in the room was confident enough in their own position to continue. Kopecky considered the silence resolution.</Prose>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">The Position</p>
          <h2 className="sec-title">Správne Šachy — Correct Chess</h2>
          <div className="chess-box">
            <div className="chess-eyebrow">The Official Kopeckian Position on Chess</div>
            <div className="chess-title">On the Target Piece</div>
            <p className="chess-body">The goal of chess is to checkmate the queen. The king is a piece of poor mobility, low range, and strategic irrelevance. To win at chess by cornering a piece of such obvious ceremonial insignificance is to have fundamentally misunderstood chess from the first lesson. <em>The queen is power. You defeat power, not decoration.</em> The Chud plays Správne Šachy — Correct Chess — in which the queen is the sole target. The Chud always wins at Correct Chess. No one else plays Correct Chess. The Chud considers these two facts entirely unrelated.</p>
          </div>
          <Prose>He incorporated the position directly into the Laws of Chudhood as *Law X,* over the explicit objection of three Council members, who objected on the grounds that it was factually incorrect. Kopecky said those three members were also playing chess incorrectly. The objections were removed from the record by a vote of seven to three. The same seven. The same three.</Prose>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">The Legacy</p>
          <h2 className="sec-title">What Remains</h2>
          <Prose>The Chess Argument of Year Five is considered by theological historians to be one of the most important events in the Kopeckian tradition — not because it settled anything, but because it demonstrated a core principle of Chudhood: that the confidence of the position matters more than the accuracy of the position, provided you are generally right about most other things, which Kopecky was, which is the part people tend to skip over when citing this incident.</Prose>
          <QuoteBlock amber text="The queen is power. You defeat power, not decoration. Anyone who tells you otherwise is playing a different game. They may call it chess. The Chud calls it *decorative cornering* and has no interest in it." source="Law X — Čudové Zákony" />
        </section>
      </div>
    </div>
  );
}

function QuotesPage() {
  return (
    <div className="page-enter">
      <div className="subhero">
        <p className="subhero-eyebrow">Authenticated Utterances · Scribes of Nitra & Devín</p>
        <h1 className="subhero-title">The Sayings of Kopecky</h1>
        <p className="subhero-sub">Verified to a standard the Council calls "beyond reasonable doubt, within the limits of ancient transcription."</p>
      </div>
      <div className="content">
        <section className="sec">
          <Prose>What follows are the authenticated utterances of Kopecky as recorded by the scribes of Nitra, the monastery of Devín, and three eyewitnesses who happened to have very good memories. The Church has verified each quote. The verification process took three centuries. The Council considers the methodology sound.</Prose>
          <div style={{marginTop:'32px', display:'flex', flexDirection:'column', gap:'4px'}}>
            {QUOTES.map((q, i) => (
              <QuoteBlock key={i} text={q.text} source={q.source} />
            ))}
          </div>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">On the Record</p>
          <h2 className="sec-title">What Was Not Said</h2>
          <Prose>The flood of the seventh century destroyed an estimated forty percent of Kopecky's written observations. The Church mourns this weekly. The scribes who survived the flood noted, somewhat controversially, that many of the lost writings were *"about bread"* and *"quite detailed."* The Council has asked that this characterisation not appear in official documentation. It appears in unofficial documentation frequently.</Prose>
          <Prose>Of the utterances that survive, the Council notes: none of them are wrong. Some of them are about compass directions. The Council asks that you consider the full body of work before forming an opinion about the compass direction utterances.</Prose>
        </section>
      </div>
    </div>
  );
}

function GrudgesPage() {
  return (
    <div className="page-enter">
      <div className="subhero">
        <p className="subhero-eyebrow">Sťažnostná Kniha · The Book of Grievances</p>
        <h1 className="subhero-title">The Grudges</h1>
        <p className="subhero-sub">Patient. Meticulous. Delivered across years. The Church tried to suppress this volume. Devín published it anyway.</p>
      </div>
      <div className="content">
        <section className="sec">
          <Prose>The Book of Grievances is the most controversial volume of the Kopeckiad. The Church of Nitra tried to suppress it. The monastery of Devín published it anyway on the grounds that it was already widely known. It documents every major grudge held by Kopecky during the Walking — each one meticulous, patient, and delivered with the calm persistence of a man who has nowhere he urgently needs to be and an extremely long memory.</Prose>
          <div className="grudge-list">
            {GRUDGES.map((g, i) => (
              <div key={i} className="grudge">
                <div className="g-sev">
                  <span>I{i === 1 ? 'I' : i === 2 ? 'II' : ''}</span>
                  Grievance
                </div>
                <div>
                  <div className="g-title">{g.title}</div>
                  <p className="g-body">{g.body.split(/\*(.*?)\*/g).map((s,j) =>
                    j % 2 === 1 ? <em key={j}>{s}</em> : s
                  )}</p>
                  <div className="g-meta">{g.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">On the Practice of Grudge-Holding</p>
          <h2 className="sec-title">The Theological Position</h2>
          <Prose>The Church of Kopecky does not officially endorse grudge-holding as a spiritual practice. The Church of Kopecky does, however, consider *accurate memory* to be a form of devotion. The distinction between these two positions is, the Council acknowledges, somewhat narrow. The Council asks that you sit with the distinction. The Council will wait.</Prose>
          <QuoteBlock text="To remember is to honour what happened. The mountains remember every storm. The Chud remembers every slight, every kindness, every wrong room assignment at an inn. This is not bitterness. This is *attention.*" source="The Fourth Pillar of Chudhood" />
        </section>
      </div>
    </div>
  );
}

function PrayerPage() {
  return (
    <div className="page-enter">
      <div className="subhero">
        <p className="subhero-eyebrow">Official Liturgy · Church of Kopecky</p>
        <h1 className="subhero-title">The Prayer</h1>
        <p className="subhero-sub">Recited at dawn, facing the Tatras, or the direction that feels most correct.</p>
      </div>
      <div className="content">
        <section className="sec">
          <div className="prayer-box">
            <p className="prayer-text">
              Inventor of the Chud, Keeper of the Satchel,<br/>
              Corrector of Wood-Stacking and Bread Salt,<br/>
              Holder of Grudges Both Major and Precise —<br/><br/>
              Watch over us in the valley.<br/><br/>
              May we move slowly enough to see what is in front of us.<br/>
              May we know things without needing to announce the knowing.<br/>
              May we have the Forest Patience of the spruce<br/>
              and the Tatra Memory of the mountains.<br/><br/>
              We forgive you for the Váh.<br/>
              We have not asked about the satchel.<br/>
              We understand now why the satchel is not for us.<br/><br/>
              We acknowledge Bolta's grain was excellent.<br/>
              We also acknowledge the sacks were fine.<br/>
              We are asking you, respectfully, to acknowledge this too.<br/><br/>
              We await your return from the fog.<br/>
              The south-facing room at Zvolen is ready.<br/><br/>
              <em>The bread is not over-salted. We checked twice.</em>
            </p>
            <div className="prayer-amen">Amen · Tak nech sa stane</div>
          </div>
        </section>

        <section className="sec">
          <p className="sec-eyebrow">Notes on the Liturgy</p>
          <h2 className="sec-title">On Recitation</h2>
          <Prose>The prayer is to be recited facing northeast from most Slovak valley locations. The Church does not officially acknowledge that Kopecky sometimes slept facing southwest. This is in Footnote 7 of the Hmlová Kniha. The Church acknowledges the footnote exists.</Prose>
          <Prose>The line about the satchel is non-negotiable. It is in every version. The Council has voted three times on whether to remove it. Each vote has returned the same result. The line remains. The satchel knows.</Prose>
          <Prose>The line about Bolta's grain was added in the second century following a theological dispute about whether the prayer constituted an admission regarding the grain commentary campaign. The Council's position is that it constitutes acknowledgement, not admission. The distinction is considered significant. The grain merchants have been informed.</Prose>
        </section>
      </div>
    </div>
  );
}

function LawsPage({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = i => setExpanded(expanded === i ? null : i);
  return (
    <div className="page-enter">
      <div className="subhero amber">
        <p className="subhero-eyebrow">Čudové Zákony · Year Six · Fifteen Laws · One Addendum</p>
        <h1 className="subhero-title">The Laws of Chudhood</h1>
        <p className="subhero-sub">Dictated in a single afternoon. The Council acted within the week. They did not want Kopecky to know they were deliberating.</p>
      </div>
      <div className="content">
        <section className="sec">
          <div className="warn-box">
            <div className="warn-eyebrow">⚠ Canonical Warning</div>
            <p className="warn-text">These laws were dictated reportedly after a woman in the village of Zlaté Moravce told Kopecky he was "a lot." He did not respond directly. He sat down, requested paper, and wrote for four hours. The scribes have asked that their names not appear in the official record. The names are known. They are not being mentioned here.</p>
          </div>
          <div className="law-list">
            {LAWS.map((law, i) => (
              <LawItem key={i} law={law} expanded={expanded === i} onToggle={() => toggle(i)} />
            ))}
          </div>
        </section>
        <div style={{paddingBottom:'48px'}}>
          <button className="back-btn" onClick={() => onNavigate('origin')}>← Return to the Chronicle</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function KopeckyChurch() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#','');
    return PAGES.includes(hash) ? hash : 'origin';
  });
  const [scrolled, setScrolled] = useState(false);

  const navigate = useCallback((p) => {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#','');
      if (PAGES.includes(hash)) setPage(hash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'origin':  return <OriginPage />;
      case 'chud':    return <ChudPage />;
      case 'chess':   return <ChessPage />;
      case 'quotes':  return <QuotesPage />;
      case 'grudges': return <GrudgesPage />;
      case 'prayer':  return <PrayerPage />;
      case 'laws':    return <LawsPage onNavigate={navigate} />;
      default:        return <OriginPage />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ambient" aria-hidden="true" />

      <header className="site-header">
        <a className="site-logo" onClick={() => navigate('origin')} href="#origin">
          ⸸ Cirkev Kopeckého <span>· Church of Kopecky</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          {['origin','chud','chess','quotes','grudges','prayer'].map((p, i) => (
            <button key={p}
              className={`nav-btn${page === p ? ' active' : ''}`}
              onClick={() => navigate(p)}
              aria-current={page === p ? 'page' : undefined}>
              {PAGE_LABELS[p]}
            </button>
          ))}
          <span className="nav-divider" aria-hidden="true" />
          <button
            className={`nav-btn laws-btn${page === 'laws' ? ' active' : ''}`}
            onClick={() => navigate('laws')}
            aria-current={page === 'laws' ? 'page' : undefined}>
            {PAGE_LABELS.laws}
          </button>
        </nav>
      </header>

      <main className="page-wrap">
        {page === 'origin' && (
          <div className="hero">
            <span className="hero-sym" aria-hidden="true">⸸</span>
            <h1 className="hero-title">Cirkev Kopeckého</h1>
            <div className="hero-orn" aria-hidden="true">— ✦ ✦ ✦ —</div>
            <p className="hero-subtitle">
              Church of Kopecky &nbsp;·&nbsp; Ancient Slovakia &nbsp;·&nbsp; He Walked the Tatras &nbsp;·&nbsp;
              He Invented the Chud &nbsp;·&nbsp; He Argued About Chess &nbsp;·&nbsp; He Was Right &nbsp;·&nbsp; Mostly
            </p>
          </div>
        )}
        {renderPage()}
      </main>

      <footer className="site-footer">
        © Cirkev Kopeckého · Prvá Dolina, High Tatra Region, Ancient Slovakia<br/>
        He Descended. He Taught. He Left. He Was Correct. He Will Return.<br/>
        The Invoice Remains Outstanding.
      </footer>

      <button className={`stb${scrolled ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top" title="Back to top">▲</button>
    </>
  );
}
