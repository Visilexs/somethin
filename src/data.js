// ─── NAVIGATION ────────────────────────────────────────────────────────────
export const PAGES = [
  { id: 'home',       label: 'Home' },
  { id: 'origins',    label: 'Origins' },
  { id: 'chud',       label: 'The Chud' },
  { id: 'disciples',  label: 'The Disciples' },
  { id: 'chronicles', label: 'Chronicles' },
  { id: 'texts',      label: 'Sacred Texts' },
  { id: 'laws',       label: 'The Laws' },
  { id: 'prayer',     label: 'Prayer' },
]

// ─── PILLARS ────────────────────────────────────────────────────────────────
export const PILLARS = [
  { n:'I',   sk:'Pomalý pohyb',      en:'Slow Movement',   body:'The Chud does not rush. <em>Speed without direction is just fast lostness.</em> Walk slowly enough to see what is in front of you. Kopecky demonstrated this by always being the last to arrive at everything and always being right about what he found when he got there.' },
  { n:'II',  sk:'Tiché vedenie',     en:'Quiet Knowing',   body:'The Chud knows things without needing to announce the knowing. The knowledge is demonstrated in action. Kopecky rarely explained his reasoning and was correct with such consistency that people eventually stopped asking and simply waited for results. He preferred this arrangement.' },
  { n:'III', sk:'Lesná trpezlivosť', en:'Forest Patience', body:'Named for three days in the spruce forest. The Chud can wait. Not passively — <em>actively.</em> The Chud waits the way a spruce waits: rooted, upright, gathering light. Kopecky institutionalised this by never giving an answer to any question he considered premature, which included most questions asked before noon.' },
  { n:'IV',  sk:'Poctivý chlieb',    en:'Honest Bread',    body:'Whatever you make, make it properly. Whatever you offer, offer it whole. Bread must be made correctly, salted correctly, shared correctly. Kopecky could identify a poorly made loaf at twelve paces and never let it pass without comment. <em>He also never let a good loaf pass without comment.</em> His tone was different.' },
  { n:'V',   sk:'Tatranská pamäť',   en:'Tatra Memory',    body:'The Chud does not forget. Not as a grudge — though Kopecky demonstrated that the two are not mutually exclusive — but as a form of respect. To remember is to honour what happened. The mountains remember every storm. The Chud remembers every slight, every kindness, every wrong room assignment at an inn.' },
  { n:'VI',  sk:'Správne odísť',     en:'Right Leaving',   body:'The Chud knows when to go. Kopecky always left at the correct moment — usually before the bill, almost always before the situation deteriorated, and <em>once, memorably, slightly too early.</em> He called this pillar the most important. He also had the most trouble with it personally.' },
]

// ─── DISCIPLES ──────────────────────────────────────────────────────────────
export const DISCIPLES = [
  {
    id: 'ayub',
    name: 'Ayub Jamma',
    epithet: 'The Second Knowing',
    origin: 'Eastern Valleys of the Váh',
    role: 'Merchant, Self-Proclaimed Philosopher, Primary Narcissist',
    symbol: '🪞',
    status: 'Active · Disputed Apostleship · Self-Declared Senior Disciple',
    bio: `Ayub Jamma arrived in Prvá Dolina in Year Four, introduced himself as "the man you have been waiting for," and sat down next to Kopecky as though they were equals. Kopecky looked at him for a long time. Then he asked if Ayub wanted stew. Ayub said he would have whatever Kopecky was having, because he assumed Kopecky had ordered the best thing. Kopecky had ordered the stew. Ayub ate the stew and said it was adequate. Kopecky did not mention this again but did not forget it.

Ayub was, by most measures, a capable man. His grain assessments were accurate, his negotiation instincts were sharp, and he had a memory for faces that bordered on the supernatural. He attributed all of these abilities entirely to his inherent greatness rather than any skill developed through effort, which made it difficult to argue with him because the conclusions were often correct even when the reasoning was absurd.

He dressed extravagantly by valley standards, maintained a hand-polished copper mirror that he carried everywhere, and had a habit of referencing his own opinions as "what Jamma says" in the third person, which everyone found alarming until they got used to it, at which point they still found it alarming but were simply tired.

He declared himself Kopecky's natural successor approximately eight months after meeting him, on the grounds that Kopecky was getting older and Jamma was clearly the next most correct person in the valley. Kopecky was told about this. He said, "That is interesting," which everyone understood meant something, but nobody was certain what.`,
    incidents: [
      {
        title: 'The Pamphlet',
        body: `In Year Five, Ayub commissioned a scribe to write a document he called The Jamma Principles — a guide to correct living that was, upon examination, the Chud with Ayub's name substituted in every place Kopecky's name appeared. The six pillars were present but renamed: Slow Movement became "The Jamma Pace," Forest Patience became "The Jamma Stillness," and Honest Bread became "The Jamma Standard of Provision," which Ayub acknowledged he was not personally applying to bread but to "broader exchanges of value." Three copies circulated. Kopecky read one. He said nothing. He kept it. Nobody knows where it is. This is considered more frightening than if he had addressed it.`
      },
      {
        title: 'The Wisdom Contest',
        body: `Ayub challenged Kopecky to a public test of wisdom in the Nitra market square, presumably believing the proximity of a large crowd would create accountability. Kopecky agreed, sat down, and listened to Ayub's fifteen-minute opening statement establishing his credentials. Then Kopecky asked: "What do you know that you did not know last year?" Ayub thought about this for four minutes. Then he said: "Many things." Kopecky waited for the things. Ayub explained that he could not list them because there were too many. Kopecky nodded slowly and walked away. Ayub declared this a draw. Witnesses disagreed. Ayub has not acknowledged the witnesses' disagreement, primarily because acknowledging it would require acknowledging that he lost, which he has classified as structurally impossible.`
      },
      {
        title: 'The Mirror Incident',
        body: `During the summer assembly at Devín, Ayub's copper mirror was borrowed without his knowledge by the scribe Ondrej, who needed a reflective surface to check a water alignment. The mirror was returned within the hour, undamaged. Ayub spent the remainder of the assembly asking everyone if they had noticed anything different about it. Nobody had. He remained convinced it had been subtly altered. He subsequently polished it every morning for the next three months. The mirror was, by all subsequent accounts, the most polished object in ancient Slovakia. Kopecky passed it once, looked at his own reflection, nodded, and said "acceptable." Ayub was not sure if Kopecky was referring to the mirror or to himself. He chose the interpretation he preferred.`
      },
    ],
    kopecky_quote: `"Ayub is correct more often than he deserves to be, given that his method is to assume he is already correct and work backward from there. The results are often right. The process is inadvisable. I have not told him this because he would agree with the part about being correct and not hear the rest."`,
    kopecky_source: 'Private letter from Kopecky to the apostle Vladimír · Year Six',
    disciple_quote: `"Kopecky and I share a fundamental quality: the certainty of knowing. The difference between us is that I am also attractive."`,
    disciple_source: 'Ayub Jamma · To anyone who would listen · Year Five onward',
  },
  {
    id: 'abdullah',
    name: 'Abdullah Ershdat',
    epithet: 'The Well-Meaning Wrong',
    origin: 'The Low Farms of the Nitra Basin',
    role: 'Farmer, Amateur Philosopher, Holder of Controversial Opinions',
    symbol: '🐻',
    status: 'Beloved · Occasionally Dangerous · Responsible for Three Incidents Involving Bears',
    bio: `Abdullah Ershdat was, by every available account, a genuinely good man. He was warm, generous, interested in others, and absolutely wrong about almost everything he believed with any conviction. This combination made him both the most popular and most quietly exhausting person in the Kopeckian Era, because disagreeing with him felt like arguing with someone's favourite grandfather about whether a particular cloud looked like a dog.

He arrived in the Kopeckian circle in Year Three after following a rumour about a man from the mountains who knew things. Abdullah had questions. He had many questions. He also had opinions, and unfortunately he did not always wait for the answers to the questions before forming the opinions.

His theories were many. He believed the Váh ran uphill, on the grounds that water seeks wisdom and wisdom is found at elevation. He believed crops failed not because of soil conditions or drought but because the soil "lacked confidence," and he was known to give encouraging speeches to fields, which had no effect on the fields but cheered him up considerably. He believed bears could be reasoned with if you spoke slowly and made your intentions clear. He believed Tuesday was structurally unlucky but only if you acknowledged it was Tuesday, which created a theological problem regarding how one arranged one's week. He believed the moon was "smaller than it looks," which is technically correct in one sense, but he meant something different by it, and that something different was wrong.

Kopecky agreed with him once. Accidentally. About marjoram in stew. Abdullah treated this as cosmic confirmation and referenced it for the rest of the Kopeckian Era whenever anyone questioned any of his other beliefs.`,
    incidents: [
      {
        title: 'The Bear Negotiations of Year Six',
        body: `Abdullah had, for two years, maintained that bears were receptive to calm, clear communication. In Year Six he decided to demonstrate this. He approached a brown bear in the forest above Prvá Dolina and began speaking to it slowly and clearly, explaining his presence and his peaceful intentions. The bear, which had not read Abdullah's theory and was not familiar with his reputation, responded according to its own instincts rather than Abdullah's framework. Abdullah fled. He survived, which he attributed to the bear eventually hearing him out. Witnesses said the bear had simply become bored. Two other villagers who had believed Abdullah's theory and attempted their own bear conversations the same week were also fine, largely by luck. Kopecky was asked to comment. He said: "Abdullah believes what he believes. The bears believe what they believe. These are not the same beliefs." He declined to go further. The bears were unavailable for comment.`
      },
      {
        title: 'The Soil Confidence Campaign',
        body: `In the spring of Year Seven, three separate farms in the Nitra basin reported poor early growth in their grain. Abdullah visited all three and delivered what he described as "motivational interventions" — speaking to the fields for between forty minutes and two hours each, explaining the potential of the soil and encouraging it toward confidence and self-expression. One farm had a recovery of yield later attributed to a late rainfall. Abdullah cited this as confirmation. The other two farms had average to below-average yields. Abdullah said they hadn't fully committed. The farmers said nothing, which Abdullah interpreted as agreement. Kopecky, when informed of the campaign, said: "The soil did not hear him." Then, after a pause: "The farmers might have."`,
      },
      {
        title: 'The Great Váh Direction Argument',
        body: `Abdullah and Kopecky were, on one infamous occasion, on the same side of an argument and still wrong. During a council meeting in Nitra about water routing, both Kopecky and Abdullah independently and simultaneously stated that the Váh ran south to north. It runs north to south. The council, faced with two of the most confident people in the valley saying the same wrong thing, briefly considered that they themselves might be mistaken. They were not. It took a third party producing a physical map before the matter was settled. Kopecky revised his position immediately and without comment. Abdullah said the map was oriented incorrectly. He has maintained this position. The map has been checked. The map is fine.`
      },
    ],
    kopecky_quote: `"Abdullah is wrong in the way a man can be wrong who has put genuine thought into his wrongness. This makes it very difficult to be short with him. I have tried. He agrees that I tried and says he found my attempt admirable. I am still thinking about this."`,
    kopecky_source: 'Kopecky, to the assembly at Zlaté Moravce · Year Seven',
    disciple_quote: `"The bears were listening. They simply chose not to act on what they heard. That is their right. I respect it. I still believe in the method."`,
    disciple_source: 'Abdullah Ershdat · Following the Bear Negotiations · Year Six',
  },
  {
    id: 'enrico',
    name: 'Enrico',
    epithet: 'The Warm Wall',
    origin: 'The Southern Reaches (precise village disputed, Enrico agreed with all suggested origins)',
    role: 'Universally Supportive Presence, Resolver of No Arguments, Friend to All Positions',
    symbol: '🤝',
    status: 'Present · Agreeable · Technically Still Agreeing With Everything',
    bio: `Enrico arrived from the southern reaches at some point during Year Four and immediately made everyone feel heard. He had a gift for listening that was remarkable in its completeness: he received every word, nodded at appropriate intervals, maintained warm and encouraging eye contact, and then agreed with whatever had been said. This process was so consistent, so warm, and so entirely divorced from critical assessment that it took most people several conversations to realize that Enrico had not, in fact, provided any response beyond agreement.

He was told by Kopecky that the object of chess was the queen. He agreed immediately and enthusiastically. He was then told by the six opponents in the chess argument that the object of chess was the king. He agreed with equal warmth. When Kopecky found out, he asked Enrico which position he actually held. Enrico said, with complete sincerity: "Absolutely." Then waited. No clarification came.

He was the Church's most popular figure for a period of approximately three years in the middle of the Walking because he made everyone feel understood. The Council eventually noted that feeling understood and being understood are different things, and that Enrico was providing the feeling without the substance. This was considered an important theological distinction. Enrico, when told about it, said this was an excellent point and he completely agreed.

He was genuinely kind. This is noted everywhere in the record. He was also, as Kopecky said, like talking to a very warm wall — structurally supportive, creating a sense of enclosure and safety, entirely unable to push back.`,
    incidents: [
      {
        title: 'The Adjudication at Hlohovec',
        body: `Two families in the village of Hlohovec had been in a land dispute for eleven years. Both families agreed to let Enrico adjudicate, because he was known to be fair-minded and non-partisan. Enrico met with the first family for two hours and told them their position was completely understandable and they were clearly right. He met with the second family for two hours and told them their position was completely understandable and they were clearly right. Both families left their meetings feeling vindicated and immediately resumed the dispute with heightened confidence. The dispute lasted a further eight years. Enrico expressed support for both sides throughout. He was invited to the eventual settlement celebration by both families. He told each family the settlement was a victory for them.`
      },
      {
        title: 'The Question',
        body: `Kopecky, in Year Eight, asked Enrico directly: "Enrico, do you have any opinions of your own?" Enrico said, "Absolutely," with the conviction of a man answering a question he finds slightly too easy. Then he looked at Kopecky with expectation, as though the conversation could now proceed. Kopecky waited. Enrico waited. After forty seconds of silence, Enrico said: "I think you're asking a very important question." Kopecky said: "Yes, I know I am. I am asking it to you." Enrico said: "Completely fair." Another silence. Kopecky eventually walked away. This exchange is in the official record. It is in the section of the Nitra Records titled "Limitations of the Method." The method being, in context, human agreement.`
      },
      {
        title: 'The Ayub Incident',
        body: `Ayub Jamma, in a moment of rare self-doubt, asked Enrico whether The Jamma Principles were as good as the Chud. Enrico said yes, they were excellent and he completely supported them. Ayub then asked if the Chud was better. Enrico said the Chud was also excellent and he completely supported it. Ayub asked if Jamma was wiser than Kopecky. Enrico said Ayub was clearly a very wise man. Ayub asked if Kopecky was wiser than Jamma. Enrico said Kopecky was also clearly a very wise man. Ayub sat with this for a while and then said: "Enrico, you are my favourite person in the valley." Enrico said: "That means a great deal." Then, after a pause: "Kopecky also means a great deal." Ayub has never fully processed this interaction.`
      },
    ],
    kopecky_quote: `"Talking to Enrico is like talking to a very warm wall. The wall does not disagree. The wall does not help. The wall is structurally present and faintly supportive and you leave the conversation exactly as you entered it, but warmer. This is Enrico's gift. I am genuinely uncertain if it is a good gift."`,
    kopecky_source: 'Kopecky · Private address to the Council of Devín · Year Eight',
    disciple_quote: `"I think that's a wonderful way to look at it. I also think the other way is wonderful. Both are wonderful. This whole situation is wonderful."`,
    disciple_source: 'Enrico · During the Hlohovec adjudication · Year Six',
  },
  {
    id: 'korrin',
    name: 'Korrin',
    epithet: 'The Unwatchable Watcher',
    origin: 'Unknown. He has been asked. He appears to also not know.',
    role: 'Unexplained Presence, Tree-Sitter, Goat Confidant, Collector of Hats',
    symbol: '🌲',
    status: 'Present · Watching · The Number of Hats Has Changed Again',
    bio: `Nobody knows where Korrin came from. He has been asked many times by many people, including, on two occasions, Kopecky. On the first occasion he said he had come from "over there," gesturing in a direction. On the second occasion he thought about it for a long time and said "from before." Both answers were recorded. Neither was found satisfactory. The inquiry has been discontinued.

He appears in the Kopeckiad in Year Two, in a footnote that reads: "A man named Korrin was also present. He was in the tree." This is the first mention. There is no explanation of how he got in the tree, why he was there, or what he was observing. Subsequent footnotes establish that he was in a tree on at least seven further documented occasions over the course of the Walking, each time in a different location, each time apparently comfortable.

He owned hats. The number of hats he owned was never the same twice it was counted, which the Church considers a minor miracle and the Council of Devín considers a documentation problem. He spoke to animals — not in the mystical sense that Kopecky occasionally did, communicating wisdom or calm, but in the practical sense of maintaining one-sided conversations with goats about his personal finances, his concerns about the harvest, and, on one documented occasion, his feelings about a recent social encounter. The goats did not respond verbally. Korrin treated their silence as feedback.

He understood the Chud, but in ways that were distinctly his own. He was never officially made an apostle, but he appears in more chapters of the Kopeckiad than several official apostles, always briefly, always doing something unexplained, always apparently fine.

Kopecky watched him for twenty minutes once without saying anything. This is the only recorded instance of Kopecky being at a loss.`,
    incidents: [
      {
        title: 'The Structure in the Forest',
        body: `In Year Five, Korrin built a small structure in the spruce forest above Prvá Dolina. He did not explain what it was for. It was roughly four feet tall, made of stacked flat stones and three specific pieces of wood, and had what appeared to be a small threshold but no door. People who walked past reported feeling watched, which Korrin confirmed was because he was watching — he lived there for three weeks. The structure was left standing when he departed. It stood for years afterward. Nobody who passed near it felt comfortable touching it. Kopecky walked past it once, stopped, looked at it for a long time, and then continued walking without saying anything. The Church has since classified the structure as a Minor Sacred Site. The classification form was filled out in a way that avoided specifying what, exactly, it was sacred to.`
      },
      {
        title: 'The Prediction',
        body: `During a gathering in Nitra in Year Six, Korrin, who had been sitting quietly at the back of the assembly for two hours without speaking, suddenly said: "Something will happen soon." Then he went back to silence. Three days later a cart wheel broke in the town square. It was a minor incident. Nobody was hurt. Korrin, who was present, nodded slowly when it happened, in the manner of a man whose expectations have been confirmed. Nobody wanted to ask what he had actually meant. The node of his nodding was, witnesses agreed, too deliberate to have been coincidental. The Council of Devín has debated whether the broken wheel constitutes a fulfilled prophecy for four decades. The debate is ongoing. Korrin, when asked, said: "The wheel broke." This was recorded verbatim as though it contained additional meaning. It may have.`
      },
      {
        title: 'The Hat Count',
        body: `In Year Seven, the scribe Ondrej — having learned nothing from his previous brushes with documentation controversy — attempted to create a definitive count of Korrin's hats. He spent two days observing and cataloguing. His final count was twenty-three. The following morning Ondrej saw Korrin wearing a hat he had not counted. He asked where it had come from. Korrin said he had always had it. Ondrej checked his notes. The hat was not in his notes. Ondrej's final official count reads: "Twenty-three hats, plus at least one hat that preceded counting." The Council accepted this. Ondrej requested a sabbatical. It was granted.`
      },
    ],
    kopecky_quote: `"Korrin is present in the way a tree is present: rooted, observing, occasionally somewhere unexpected, and causing you to reconsider the nature of what you thought you were looking at. I have watched him for twenty minutes and reached no conclusions. This has happened to me once. I intend to think about it for a long time."`,
    kopecky_source: 'Kopecky, private note · Year Six, following the twenty-minute observation',
    disciple_quote: `"The wheel was going to break."`,
    disciple_source: 'Korrin · When asked about the Nitra Prediction · Year Six',
  },
  {
    id: 'yash',
    name: 'Yash',
    epithet: 'The Known Deviant',
    origin: 'Present. Origin unclear. He prefers it that way.',
    role: 'Known Deviant. The Church has agreed this is sufficient description.',
    symbol: '🐐',
    status: 'Active · Banned from Four Taverns · Invited Back to Three of Them · The Church Has Questions · The Church Has Not Asked Them',
    bio: `The Church of Kopecky has agreed, after considerable internal deliberation, to describe Yash only as "a known deviant" without further elaboration. Three of the six books of the Kopeckiad contain sections that begin with the words "On the matter of Yash —" and then immediately change the subject. The Council of Devín voted seven to three to leave these transitions unexplained. The same three who voted against are the same three who have consistently voted against things. They know who they are.

What is documented: Yash was present at many of the key events of the Kopeckian Era. Witnesses at these events consistently describe him as "there, doing something." What the something was is not in the official record. In several accounts the witnesses were asked to elaborate and declined. In two accounts the witnesses elaborated and the elaboration was removed from the record on the grounds that it raised more questions than it answered and the Church had limited capacity for those particular questions at that time.

He was banned from four separate taverns for reasons each proprietor declined to specify. He was invited back to three of them at a later date, also for reasons not specified. The fourth tavern has maintained the ban. The proprietor of the fourth tavern has been asked why. He says only that he knows what he knows and that some things are between a man and his establishment. This is respected.

He owned a goat that the Sťažnostná Kniha describes, in a footnote, as "sharing certain characteristics with its owner." No further description is provided. The goat has no name in the record. The goat appears in four different chapters. It is described differently each time but is consistently recognisable as the same goat by what the scribes call "contextual indicators," the nature of which they have also declined to specify.

Kopecky neither confirmed nor denied awareness of Yash's activities. He did, on one occasion, look at Yash for a long time and then say: "Yash, I know what you are." He then walked away without saying what Yash was. Yash nodded as though this was expected. He has never been heard to deny whatever it is. He has also never confirmed it.`,
    incidents: [
      {
        title: 'The Tavern Situation (Composite Account)',
        body: `The four tavern bans occurred in Years Four, Five, Six, and Seven respectively, one per year, with a regularity the Council has noted but not commented on. In each case the proprietor declined to state the reason. In the case of the Year Five ban, the proprietor initially agreed to provide a written account and then, having written approximately three sentences, folded the paper, handed it back, and said he had changed his mind. Those three sentences are not in the official record. They are in a sealed envelope in the archives at Devín. The envelope is labelled "Re: Yash, Year Five." Nobody has opened it. Three people have held it. All three describe the experience as "clarifying."`,
      },
      {
        title: 'The Abdullah Incident',
        body: `Abdullah Ershdat, in Year Six, offered Yash advice. This was Abdullah's most successful advisory intervention of the Walking — the only one anyone followed — which is either a testament to Abdullah's occasional accidental accuracy or a statement about Yash's decision-making process, and possibly both. What the advice was is not recorded. What Yash did as a result is not recorded. Enrico, who was present, said it was "probably fine." Korrin was in a tree nearby and said nothing. Ayub, when asked, said he would have given better advice and that Yash should have come to him first. Kopecky was not present. When told about it later, he looked at the ceiling for a moment and then said: "Which advice?"`,
      },
      {
        title: 'The Goat',
        body: `The goat appears first in Chapter Three of the Nitrianske Záznamy in a passage that reads: "Yash was present, as was the goat." It appears again in the Tatranská Kniha, in Chapter Nine, in a passage that reads: "The matter was resolved. Yash left. The goat remained briefly." It appears in the Sťažnostná Kniha in a footnote that reads: "Note: the goat." In Chapter Eleven of the Hmlová Kniha it appears without explanation in the background of an otherwise unrelated scene involving a water allocation dispute. The apostle Vladimír, in the Fog Book, notes the goat was present at the departure into the mist. He describes it as watching. Kopecky did not acknowledge the goat on this occasion. The goat did not acknowledge Kopecky. The Church considers this unresolved.`
      },
    ],
    kopecky_quote: `"Yash, I know what you are."`,
    kopecky_source: 'Kopecky · Said directly to Yash · Year Seven · No further elaboration was provided · He walked away immediately',
    disciple_quote: `[The space provided for a quote from Yash contains a drawing of a goat. The scribe responsible has not been identified. The drawing is quite good.]`,
    disciple_source: 'Čudové Záznamy, Page 47, following the question "What do you wish to be remembered for?"',
  },
]

// ─── CHESS QUOTES ───────────────────────────────────────────────────────────
export const CHESS_QUOTES = [
  { text: 'The queen is the most powerful piece. Therefore the queen must be the target. This is logic. I should not have to explain logic to a room full of adults.', source: 'Kopecky · Hour One of the Chess Argument, Nitra, Year Five' },
  { text: 'I have been playing chess correctly for my entire life. You have been playing a different game that you have incorrectly named chess.', source: 'Kopecky · Minute twenty, when first corrected' },
  { text: 'The king does nothing. You do not defeat an enemy by trapping the piece that does nothing. You defeat him by taking what he values most. I should not have to explain this to adults.', source: 'Kopecky · Minute forty, with increasing patience' },
  { text: 'Správne Šachy will outlast conventional chess. I say this with the same confidence I say everything. History has generally vindicated that confidence. I am not concerned.', source: 'Kopecky · Final minutes, while already inventing the variant' },
]

// ─── CHUD QUOTES ────────────────────────────────────────────────────────────
export const CHUD_QUOTES = [
  { text: 'The Chud does not chase. The Chud is simply... present. In the right places. At the right times. Several times. Until circumstances change.', source: 'Kopecky, on the Second Pillar · Year Four' },
  { text: 'To be a Chud is to know that you are correct, and to wait patiently for others to arrive at the same conclusion. The wait can be long. The Chud is patient. The Chud also fills the wait with analysis and careful reading and trying not to think about how long the waiting has been.', source: 'Kopecky, to the assembly at Zlaté Moravce · Year Six' },
  { text: 'I am not lonely. I am solitary. The difference is that one is chosen and one is a condition and I have made the choice and therefore I am fine. I would explain further but I have somewhere I need to be. I do not currently have somewhere I need to be but I will shortly.', source: 'Kopecky, when asked directly · Nitra, Year Five' },
  { text: 'A woman who does not appreciate the Chud has not yet encountered a Chud under optimal conditions. The Chud is aware of this. The Chud finds it clarifying. The Chud would like it noted that he is fine.', source: 'Kopecky, at the evening assembly · Prvá Dolina, Year Seven' },
  { text: 'The Chud reads. The Chud knows things. The Chud tells people the things he knows, because they deserve to know them. If people do not wish to be told, the Chud will tell them more slowly in case the issue was speed.', source: 'Kopecky, on the Eighth Law · Year Six' },
  { text: 'I have walked from the Tatras to the Danube and back. The mountains are the same. The river is the same. The people are the same. The bread is getting worse.', source: 'Kopecky, returning from the southern valleys · Tatranská Kniha, Chapter 8' },
  { text: 'If you have to ask whether the fire is ready, it is not ready. If you have to ask whether the man is trustworthy, he is not trustworthy. Uncertainty about a question is usually the answer to the question.', source: 'Kopecky, to the council of elders at Nitra · Year Seven' },
  { text: 'The mountains were there before me. But I was there before the mountains knew what they were for.', source: 'Kopecky, upon arriving at Prvá Dolina · Tatranská Kniha, Chapter 1' },
]

// ─── GRUDGES ────────────────────────────────────────────────────────────────
export const GRUDGES = [
  { sev:'I', title:'The Bolta Affair — One Dismissive Wave, Six Years of Grain Commentary',
    body:`The merchant Bolta made a small dismissive gesture while Kopecky was mid-sentence on grain quality. Bolta did not remember doing it. Kopecky remembered with startling precision. For six years, in every market where Bolta traded, Kopecky found occasion to remark that his grain was <em>"acceptable, for a market of modest expectations."</em> Bolta's grain was exceptional. The campaign ended when Bolta rode two days to apologise in full. Kopecky accepted gracefully. Three months later, told a scribe Bolta's sacks were <em>"adequate."</em> The sacks were fine.`,
    meta:'Duration: Six years · Trigger: One dismissive wave · Resolution: Partial — the sacks comment was unnecessary and everyone knows it' },
  { sev:'II', title:'The Scribe Ondrej — One Incorrect Accent Mark, Three Years',
    body:`Ondrej misspelled Kopecky's name with an accent specifically prohibited. The error was immediately corrected. Kopecky said nothing. For three years, every significant teaching was delivered while Ondrej was present at exactly the pace of a careful scribe, ensuring his work was both technically impeccable and deeply stressful. Ondrej's records from this period are the finest in the Kopeckiad. He has been made a saint. He says he is not sure how he feels about that.`,
    meta:'Duration: Three years · Trigger: One accent mark · Resolution: Sainthood. Complicated.' },
  { sev:'III', title:'The Shepherd Tomáš — One Suppressed Laugh, One Year of Atmospheric Indirection',
    body:`Tomáš laughed briefly when Kopecky predicted early snow. The snow came six days later. Tomáš lost two sheep. Kopecky took no pleasure in this but did spend the following year saying things like <em>"some of us watch the sky and some of us simply wait to be surprised"</em> whenever weather was discussed, without ever looking directly at Tomáš. Tomáš became the most attentive weather-watcher in the valley. Kopecky eventually told him his observations were <em>"improving."</em> The Church considers this the highest available reconciliation.`,
    meta:'Duration: One year · Trigger: One suppressed laugh · Resolution: The word "improving," delivered without eye contact' },
  { sev:'IV', title:'The Elder Miroslav — Eleven-Word Interruption, Two Years',
    body:`Elder Miroslav began speaking before Kopecky had finished his sentence, believing him done. He was not done. There were eleven more words. Kopecky stopped, waited for complete silence, and delivered the remaining eleven words with what witnesses described as <em>"the patience of a man who has all the time there is."</em> He then spent two years at Devín assemblies asking Miroslav to <em>"finish his thought, since he had seemed so eager to speak earlier."</em> Miroslav had no unfinished thoughts. He was being invited to have none, publicly, in front of his peers.`,
    meta:'Duration: Four assemblies, two years · Trigger: Eleven words · Resolution: Miroslav stopped attending' },
  { sev:'V', title:'The Ayub Pamphlet — One Plagiarised Framework, Ongoing',
    body:`Ayub Jamma's pamphlet The Jamma Principles was, by every available measure, the Chud with Ayub's name substituted throughout. Kopecky read it. He said nothing. He kept a copy. Ayub has since produced two revised editions. Kopecky has read both. He has said nothing about either. Ayub considers the silence endorsement. The silence is not endorsement. The Council of Devín is watching the situation. Kopecky is watching the situation from a position the Council finds mildly alarming, which is "patiently and without a stated timeline."`,
    meta:'Duration: Ongoing since Year Five · Trigger: Systematic philosophical plagiarism · Resolution: Pending, Kopecky has not indicated when' },
]

// ─── MIRACLES ───────────────────────────────────────────────────────────────
export const MIRACLES = [
  { title:'The Quieting of the River', body:'He told a flooding river to calm down. It calmed down. He said this was not a miracle but "basic communication." The river was unavailable for comment. Abdullah said this proved rivers could be reasoned with. Kopecky said this proved he could reason with rivers. These are different claims.' },
  { title:'The Multiplication of the Stew', body:'A pot of stew fed sixty-three people at the Feast of Unremembered Saints. He said there was "enough if nobody got greedy." He then had a second bowl himself before anyone else had finished their first. He considered this consistent with the statement.' },
  { title:'The Healing of Doubt', body:'He cured a man\'s existential despair with a twenty-minute walk and two observations about clouds. The man later said he had mostly felt better because Kopecky had stopped talking and started walking, and the fresh air had helped. This detail is not in the official account of the miracle.' },
  { title:'The Perfect Estimation', body:'He guessed the weight of seven stones to within a quarter-ounce each without a scale. On the eighth attempt he was wrong by two full ounces. He had already turned and walked away before anyone checked the eighth stone. Korrin, who was watching from an elevated position, noted the error. Nobody asked him to confirm it. He has not confirmed it. He also has not denied it.' },
  { title:'The Reconciliation at Supper', body:'Two brothers who had not spoken in twenty years were seated next to him at supper. By dessert, they had embraced. He claimed he "changed the seating arrangement." He had not — the original seating was the same. He had moved himself. Enrico said this was wonderful. Ayub said he would have achieved the same result in less time. Abdullah said the brothers had been reconciled by the soup.' },
  { title:'The Finding of the Key', body:'He located a lost key in the second place anyone looked. He then spent fifteen minutes explaining that he had always known it was there and had simply been waiting for the right moment to say so. Korrin was found later sitting in the room where the key had been. He left when asked. He did not explain why he had been there.' },
]

// ─── BOOKS ──────────────────────────────────────────────────────────────────
export const BOOKS = [
  { n:'I',   sk:'Tatranská Kniha',    en:'The Tatra Book',      text:'The foundational scripture. Covers the descent, the forest, the birth of the Chud, and eleven harvest predictions that all came true. Contains the first bread assessment. The bread was over-salted. It is always over-salted in Chapter One.' },
  { n:'II',  sk:'Nitrianske Záznamy', en:'The Nitra Records',   text:'Market assessments, elder debates, the Bolta Affair in full, and twelve separate opinions about grain quality. Also contains the first documented appearance of Ayub Jamma, who is described in the margin as "the one who thinks highly of himself."' },
  { n:'III', sk:'Sťažnostná Kniha',   en:'The Grievance Book',  text:'Originally suppressed by the Church of Nitra. Published by Devín anyway. Contains the Grudge Register, a footnote about Yash\'s goat, and a sealed section on pages 114–128 that the Council has voted not to open until Kopecky returns to explain it.' },
  { n:'IV',  sk:'Čudová Cesta',       en:'The Chud Way',        text:'The practical guide. The six pillars in full, with annotated examples from the valleys. Includes a chapter on Enrico titled "The Limitation of Agreement" and a separate chapter on Abdullah titled "The Problem of Confidence Without Foundation."' },
  { n:'V',   sk:'Hmlová Kniha',       en:'The Fog Book',        text:'The account of the departure. Written by Vladimír the wood-stacker. Contains the footnote about the wrong turn before the fog. Also notes that Yash\'s goat was present at the departure, watching. Vladimír stands by this. The goat has not commented.' },
  { n:'VI',  sk:'Návratová Kniha',    en:'The Return Book',     text:'Unwritten. The pages are bound. A note in the margin — added by no known hand — reads: "He said he\'d be back. He\'s always right. Stop worrying about the invoice." Korrin has been seen standing near this book on three occasions. Nobody has asked him why.' },
]

// ─── WALKING TIMELINE ───────────────────────────────────────────────────────
export const TIMELINE = [
  {
    era:'Year One · Early Autumn · The Descent',
    title:'The Arrival at Prvá Dolina',
    body:`He came down from the Vysoké Tatry on a Tuesday wearing a cloak of contested colour and carrying the satchel. He walked into the settlement of Prvá Dolina, corrected the way a man named Vladimír was stacking wood without introducing himself, and sat down and asked if there was stew. There was. He said it needed more marjoram. It needed more marjoram. He stayed. Vladimír became his first apostle, primarily because he was the first person Kopecky spoke to and had not had time to be wrong about anything yet.`
  },
  {
    era:'Year Two · The Forest Above the Valley',
    title:'The First Teaching — Silence and Spruce',
    body:`Before the Chud, before the formal teachings, there were two years of Kopecky simply being present and occasionally correcting things. He identified four men in the valley who would be trouble at a later date (all four were trouble at a later date), predicted the extent of the winter with precision that made the farmers uncomfortable, and established his habit of arriving places after everyone else and still somehow being correct about everything that had occurred in his absence. He described this period as "getting oriented." The valley described it as "the time before Kopecky was Kopecky, but you could already tell."`
  },
  {
    era:'Year Three · The Birth of the Chud',
    title:'Three Days in the Spruce Forest with Ján',
    body:`A young man named Ján came to Kopecky with a problem of living. He was tired of everything without being tired of anything specific, which Kopecky told him was different from exhaustion and required a different response. He took Ján into the forest for three days. They talked. A flood in the seventh century took most of Ján's notes, which the Church mourns weekly. What emerged was Čudný spôsob — the Strange Way — the posture toward existing that his followers shortened to the Chud. Ján came down from the forest looking, witnesses said, like a man who had been given something he had not known he was looking for. He went on to become the second apostle and to operate, broadly, in accordance with the teaching, although he remained somewhat indecisive about tavern menus for the rest of his life.`
  },
  {
    era:'Year Four · The Arrivals',
    title:'The Disciples Begin to Gather',
    body:`Year Four saw the arrival of Ayub Jamma, who introduced himself as "the man you have been waiting for" and sat down next to Kopecky as though they were equals. It also saw Enrico arrive from the south, agreeing with everything; Korrin appear from an unspecified origin and be found immediately in a tree; and Yash, who was simply there one day, doing something, in a manner that nobody fully captured in writing. Abdullah Ershdat arrived in Year Three but became notable in Year Four when he attempted to reason with his first bear. Kopecky surveyed the assembled group and said, according to Vladimír, "Well." This is the complete quote. Vladimír wrote it down. The word has been studied.`
  },
  {
    era:'Year Five · Nitra · The Chess Argument',
    title:'The Great Error and the Invention of Správne Šachy',
    body:`Kopecky sat down at a chess board during the Nitra assembly, studied it for several minutes, and declared that the object of the game was to checkmate the queen. He argued this position for one full hour against six opponents, citing the queen's superior movement and what he called "the fundamental logic of targeting power, not ceremony." He did not concede. He invented his own variant — Správne Šachy, or Correct Chess — in which the queen is the target. He plays it alone. He wins every game. He considers this relevant evidence. The three Council members who voted against including this in the Laws of Chudism were told they were also playing chess incorrectly.`
  },
  {
    era:'Year Seven · The Lower Váh Incident',
    title:'The One Time He Was Wrong About a River',
    body:`He said the Váh ran south to north. It runs north to south. He walked in the wrong direction for most of a day before quietly reversing course. Three witnesses saw this. When the incident was raised in his presence he said: "The Váh runs north to south. I have always said the Váh runs north to south." The three witnesses looked at each other. Nobody pursued it. Abdullah, separately, had also said the Váh ran uphill, which is a different wrong answer, and was pleased when he heard Kopecky had also been wrong about the river, because he interpreted this as solidarity. It was not solidarity.`
  },
  {
    era:'Year Nine · The Great Reconciliation',
    title:'The Assembly of All Four Valleys',
    body:`The largest gathering of the Kopeckian Era. Representatives from the valleys of the Váh, Nitra, Hornád, and Hron convened at a site between Zvolen and Banská Bystrica to hear Kopecky speak. He spoke for six hours across two days. He correctly predicted the following spring's weather, settled three longstanding land disputes, identified nine people in the crowd who would be trouble at various future dates (all nine were), and delivered what the Tatranská Kniha calls "the address that could not be shortened without losing everything important." The address has been abridged for practical purposes. Kopecky said the abridgement was "adequate." He meant this as a criticism. The scribes chose to interpret it otherwise.`
  },
  {
    era:'Year Fourteen · The High Pass · The Departure',
    title:'Into the Tatra Fog',
    body:`He gathered his followers at the high pass above Prvá Dolina where the Tatras begin in earnest. He looked at them — Vladimír, Ján, Ayub (who positioned himself prominently), Enrico (who had agreed this was the right place to stand), Abdullah (who had arrived slightly early on the wrong day and then come back), Korrin (who was watching from a slightly elevated position), and Yash (who was there, doing something). He said: "The mountains were here before me and they will be here after. That is not a comfort, it is a fact. Treat facts like mountains — acknowledge them, respect them, do not pretend they are something else to make yourself feel better." He walked into the morning fog. One apostle noted he went slightly left before correcting. This is in a footnote. Kopecky would have found it petty to record. It was recorded anyway. The goat watched until the fog cleared.`
  },
]

// ─── LAW GROUPS ─────────────────────────────────────────────────────────────
export const LAW_GROUPS = [
  {
    id:'selfhood', label:'On Oneself', subtitle:'The Nature of the Chud',
    laws:[
      { roman:'I', title:'On the Nature of the Chud',
        body:`The Chud is not complicated. He is simply more than most people are ready for. This is not a criticism of other people — it is an observation about the gap between depth and readiness. The Chud acknowledges the gap. The Chud has developed several theories about why the gap exists that he is willing to share with anyone who will sit still for between thirty minutes and two hours.`,
        note:'Law I was rewritten eighteen times. The final version is the clearest. The Council has not read the other seventeen and has been advised not to.' },
      { roman:'VI', title:'On Solitude — Which Is Different from Loneliness, and the Chud Will Explain Why',
        body:`The Chud is not lonely. The Chud is <em>solitary,</em> which is an entirely different condition involving entirely different feelings, and the Chud can enumerate the differences in full, with diagrams if permitted. Loneliness is passive. Solitude is chosen. The Chud has chosen solitude. The Chud would also like someone to talk to about having chosen solitude, which is not a contradiction. The Chud has a twenty-minute explanation of why it is not a contradiction, available immediately.`,
        note:'This is the most cited law among lay congregants. It is also cited with the most prolonged, knowing silence. The Council has noticed. The Council has said nothing. The Council understands the assignment.' },
      { roman:'XIII', title:'On Being Wrong — The Local Exception Within the Broader Field',
        body:`The Chud is right. Not always about every specific thing at every specific moment — there is a small, documented, context-dependent category of local exceptions — but right in the <em>larger sense.</em> When the Chud is wrong about a specific thing, it is a local wrongness embedded within a field of substantial correctness. <em>The field is what should be assessed.</em> The Chud asks that you look at the field.`,
        note:'Current documented exceptions: the Lower Váh Direction Incident, the Winter of the Pale Goat, Law X on chess, and one opinion about a horse. The context for each has been provided. The context was lengthy.' },
    ]
  },
  {
    id:'pursuit', label:'On Pursuit', subtitle:'The Chud Does Not Chase',
    laws:[
      { roman:'II', title:'On Pursuit — The Chud Does Not Chase',
        body:`The Chud does not pursue. Pursuit communicates need, and need communicates weakness, and weakness is not the Chud. The Chud is simply <em>present.</em> Deliberately, repeatedly, in the locations where the object of his not-pursuit tends to be found. At the market. By the well. Outside the bakery at approximately the same time on several consecutive mornings. This is not pursuit. This is coincidence that the Chud has carefully arranged.`,
        note:'Several villagers noted this law, in practice, looked identical to pursuit. Kopecky said the distinction was philosophical. They said it was also physical and slightly alarming. The dialogue was not resolved.' },
      { roman:'III', title:'On Rejection — Data, Not Defeat',
        body:`When a woman declines the Chud's company, she has provided data. Not about the Chud — the Chud's value is established — but about her own state of readiness and the limits of her present perception. The Chud records this data carefully, analyses it, and arrives at the same conclusion each time: <em>it is a timing issue.</em> The Chud then lies in the dark thinking about timing.`,
        note:'Kopecky dictated this law three times. He said the first two versions were too direct. This is the diplomatic version. The scribes preserved the others in a separate unmarked scroll.' },
      { roman:'XIV', title:'On Women Who Do Not Yet Recognise the Chud — Optimal Conditions',
        body:`A woman who does not recognise the value of the Chud has not yet encountered a Chud under <em>optimal conditions.</em> Optimal conditions require: correct sleep direction, correctly salted bread, a subject the Chud has read extensively, and sufficient time for the Chud to deliver his full position on at least three relevant topics without interruption. These conditions have not yet all presented simultaneously. The Chud is fine. The Chud would like it noted that he is fine.`,
        note:'This law was the last written. Kopecky paused for eight minutes before beginning it, then wrote it very quickly. The scribe has asked that this memory not be discussed at his canonisation ceremony.' },
    ]
  },
  {
    id:'relations', label:'Relations', subtitle:'On Dealing With Others',
    laws:[
      { roman:'IV', title:'On Apology — The Over-Salting of Dignity',
        body:`The Chud does not apologize. Apology is the over-salting of dignity — it ruins what was perfectly fine to begin with. If the Chud has erred, the error exists within a larger field of correctness, and the field is what should be considered. The Chud has however composed several lengthy explanations of context that serve a similar function, available on request.`,
        note:'Kopecky never apologized for the Lower Váh Direction Incident. He provided context. The context lasted forty minutes.' },
      { roman:'V', title:'On Disagreement — The Slow Restatement',
        body:`When someone disagrees with the Chud, the Chud allows them to finish speaking. Then the Chud pauses for a count of three. Then the Chud restates his original position <em>more slowly</em> and <em>more clearly,</em> because clearly the issue was delivery rather than substance. The Chud has done this up to seven consecutive times in one conversation. By the seventh, the other party typically concedes. The Chud considers this persuasion.`,
        note:'The philosopher Drenn experienced this in Year Five and wrote a paper called "The Method of Persistent Clarity." He did not credit Kopecky. Kopecky found out. See: Sťažnostná Kniha, Entry 3.' },
      { roman:'IX', title:'On Eye Contact — The Duration of Depth',
        body:`Eye contact must last slightly longer than is comfortable. A little longer than that, still. The Chud maintains eye contact past the natural breaking point, past the polite breaking point, past the point where the other party begins to wonder if the Chud has seen something alarming behind them. <em>The Chud has not.</em> The Chud is simply connecting.`,
        note:'One documented case: Kopecky maintained eye contact with a grain merchant for so long that the merchant sold him a full sack at considerable discount simply to end the interaction. Kopecky considered this negotiation.' },
    ]
  },
  {
    id:'daily', label:'Daily Life', subtitle:'The Practical Chud',
    laws:[
      { roman:'VII', title:'On the Bill — Philosophical Economy',
        body:`The Chud does not split the bill. The Chud's presence at a supper is a contribution of value that monetary exchange cannot adequately represent. The Chud also does not pay the bill. The Chud moves slowly, as the First Pillar commands, and arrives at the table <em>after the bill has already been handled by others.</em> This is not rudeness. This is pace.`,
        note:'Kopecky paid a bill exactly once, in Zvolen, because everyone else had already left. He has not mentioned this. Rastislav the innkeeper mentioned it. Once. Then he replaced the north-facing window.' },
      { roman:'VIII', title:'On Reading — The Obligation to Report It',
        body:`The Chud reads extensively. Philosophy, agriculture, the properties of Carpathian spruce at varying temperatures, goat behavioural patterns, and several volumes on the correct preparation of stew. The Chud considers it a duty to share what he has read. He begins sentences with <em>"well, actually."</em> The Chud has never finished a conversation and thought: <em>I said too much.</em>`,
        note:'Ondrej confirmed Kopecky once delivered a four-hour address on spruce structural properties and introduced it as "a brief overview." Four people fell asleep. Kopecky called this "restful engagement."' },
      { roman:'XII', title:'On the Stew — The Final Clarity',
        body:`When presented with a menu, the Chud orders the stew. The Chud has considered the other options. The other options are fine. The stew is <em>correct.</em> This is not preference — it is a conclusion arrived at through deliberate analysis lasting between fifteen and forty-five minutes. The stew is correct. The Chud will have the stew. Why is this conversation continuing.`,
        note:'Documented across eleven villages and one tavern in Zvolen that charges extra to sit in the chair where Kopecky sat for thirty-eight minutes before ordering the stew.' },
    ]
  },
  {
    id:'knowledge', label:'Knowledge', subtitle:'On Knowing and Not Knowing',
    laws:[
      { roman:'X', title:'On Chess — The Correct Game (Správne Šachy)',
        body:`The goal of chess is to checkmate the queen. The king is a piece of poor mobility, low range, and strategic irrelevance. <em>The queen is power. You defeat power, not decoration.</em> The Chud plays Správne Šachy — Correct Chess — in which the queen is the sole target. The Chud always wins at Correct Chess. No one else plays Correct Chess. The Chud considers these two facts entirely unrelated.`,
        note:'Written immediately after the Nitra Chess Argument. Three Council members voted against on grounds of factual incorrectness. They were told they were also playing chess incorrectly. The objections were removed seven to three.' },
      { roman:'XI', title:'On Sleep — Tatra Orientation',
        body:`The Chud sleeps facing the Tatras for spiritual alignment and the accumulation of mountain-grade patience during unconscious hours. If the Chud does not currently know which direction the Tatras are — which happens to everyone, occasionally, and is in no way related to the Lower Váh Incident — the Chud faces the direction that <em>feels most correct.</em> The Chud is directionally confident.`,
        note:'The Church recommends facing roughly northeast from most Slovak valley locations. The Church does not officially acknowledge that Kopecky sometimes slept facing southwest. This is in Footnote 7 of the Hmlová Kniha.' },
    ]
  },
  {
    id:'satchel', label:'The Satchel', subtitle:'The Final Addendum',
    laws:[
      { roman:'XV', title:'Addendum: On the Satchel — The Final Word',
        body:`The satchel is not a law. The satchel is a fact. Do not open the satchel. Do not look at the satchel in a speculative or hopeful manner. Do not ask about the satchel. Do not ask someone else to ask about the satchel on your behalf. Do not write songs about the satchel. Do not name children after the satchel. <em>The satchel knows.</em> The fact that you want to know more about the satchel is itself information about where you are on the path of Chudhood. It is early-path information.`,
        note:'Added following three satchel-related incidents in Year Seven. The incidents are not described in any official volume. One scribe described them in a private letter, kept next to the satchel. Nobody has read it for obvious reasons.' },
    ]
  },
]
