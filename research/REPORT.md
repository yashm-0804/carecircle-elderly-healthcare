# Startup Buildathon India 2026: research report

Prepared 2026-10-31 · about 300 h before our working application deadline (2026-11-12 23:59 IST) · Confidence key: High = official source or several independent sources · Med = one credible source · Low = inferred. Numbers in square brackets point to Sources in section 9.

**How far to trust this.** Event facts come straight from the official site and were checked against its raw HTML. Google model IDs and retirement dates were re-checked at source on 2026-10-31. Most of the market section comes from search-result summaries rather than full pages, so re-check any figure before it goes in the pitch deck.

## Read this first

- **The application is the first thing to ship, and it is 12 to 13 days away.** It closes 2026-11-13 with no time or timezone published. It asks for an idea, solution, architecture and pitch deck, and selected teams hear by 2026-11-18 [1]. Nothing later matters if this does not get through. (High)
- **We do not know whether we may build before 2026-11-20.** The site says "Build a new product", "Two days to build" and "Idea on day one", yet it wants an architecture up front [1]. The T&Cs tolerate "a work based on an existing application" [3]. A different Google-branded hackathon in India disqualified "pre-built corporate products or re-skinned existing projects" [11]. Ask the organisers before writing any product code. (Med)
- **Outside its own site, the event is unconfirmed.** Repeated searches found no announcement from Google, DeepMind, nasscom, HeadStart or Hack2skill [12]. The registration and T&C pages do sit on hack2skill.com, a real platform that has run Google events [2][3][4]. Applications only opened on 2026-10-23, so thin coverage is plausible. An email to the support address would settle it. (Med)
- **Read the IP clause before submitting anything you would not want to give up.** The linked T&Cs give the Organiser a right of first refusal on exclusive licences or sales of submitted materials for 6 months after the event, and a perpetual licence to use the entry for marketing [3]. The page is a generic template that still says "(Client Name)", but it claims to override promotional material [3]. This could affect a fundraise. (High on the text, Low on whether it is meant to apply)
- **Two of the five criteria are not about code.** Founder profile and market viability cannot be built in two days [1]. HeadStart's own pitch events grade team, traction, product, market and barrier to entry [14], which suggests the business side will count. Customer conversations should start before the idea is final. (Low on the inference)
- **The strongest technical angle is real-time voice and vision in Indian languages.** Gemini Live lists Hindi, Tamil, Telugu, Bengali, Marathi and others, and has a free tier [17][24]. Every winner of the 2026 Gemini Live Agent Challenge was voice-first, and most added vision, screen control or tool use [36]. (High on both, Med on capabilities per winner)
- **Enterprise voice agents and "chatbot for X" are the wrong places to compete.** Ringg, Gnani, Bolna and others are funded and at scale [34]. Reviewers of a Google and Accel programme reportedly rejected about 70% of applications as wrappers, and named marketing automation and AI recruitment as crowded [35]. (High, Med)
- **Models we might reach for retire before the city round.** Five preview voice and speech IDs have an earliest shutdown of 2026-11-17, three days before the build [22]. Use `gemini-3.8-live` and the other stable IDs in section 4. (High)

## 1 · The hackathon at a glance

| | |
|---|---|
| What it is | A nationwide programme to take an AI startup idea to a working product on Google AI and Google Cloud [1] |
| Organiser and sponsors | Branded Google DeepMind and Google Cloud; "Powered by" Hack2skill, nasscom and HeadStart; Hack2skill runs registration and support [1][2] |
| Format and team rules | Four stages: online application, 2-day in-person City Buildathon, Regional Showcase, Grand Finale. Solo founders or teams; "No limit" on team size; free; bring a laptop; no coding background required [1] |
| Tracks / problem statements | None listed. Open innovation; Day 1 of the city round says "Pick your problem" [1] |
| Key dates | Applications 2026-10-23 to 2026-11-13 · selected teams told by 2026-11-18 · City Buildathons 2026-11-20 and 21 · Regional Showcases Gurugram 2026-11-23, Mumbai 2026-11-25, Hyderabad 2026-11-27 · Grand Finale 2026-12-02 at Google, Bengaluru. No clock times or timezone published [1] |
| Prizes | USD 100,000 pool. Top 10 teams each get USD 5,000 cash and USD 5,000 in Google AI and Cloud credits [1]. Cash is paid within 60 days with TDS deducted [3] |
| Submission requirements | Application: idea, solution, architecture, pitch deck [1]. City round: working product deployed on Google Cloud, submitted on Day 2, presented to the jury [1]. Other form fields are behind a login [2] |
| Eligibility and rule gotchas | Existing early-stage startups with a new product idea, or aspiring founders; must be AI-powered [1]. One team per person; minimum age 14, under-18s need a parent or a signed release [3]. Must not use third-party-protected content; the entrant warrants ownership or sufficient rights [3]. First-refusal and marketing-licence clauses as above [3]. Demo is "ideally 7 mins" plus 3 of Q&A, from the generic template [3] |

Cities: Ahmedabad, Bengaluru, Chennai, Delhi, Hyderabad, Jaipur, Kochi, Kolkata, Mumbai, Pune [1]. Venues are named only for the finale [1].

### Judging criteria

Criteria are official. Weights are not published, so these are an even split under our workflow's rule. The T&Cs say parameters can vary by stage and may go undeclared [3].

| Criterion | Weight | What it means in practice | Source |
|---|---|---|---|
| Founder profile | 20% (assumed) | "Who you are and why you built this." As a solo founder, this needs a specific reason you are the right person | [1] |
| Product potential | 20% (assumed) | "A clear problem, and a product that solves it well." One named user with one painful job | [1] |
| Market viability | 20% (assumed) | "A real market and a way to reach it." A bottom-up count and a named channel, backed by real conversations | [1] |
| Technical architecture | 20% (assumed) | "A well-built product that can scale." The application needs this on paper before any build | [1] |
| Use of Google AI | 20% (assumed) | "How deeply Google AI and Google Cloud powers the product." Scores best when a core feature would break without a Google-specific capability (Low, our inference) | [1] |

Jurors differ by stage: technical and non-technical at city level, business mentors and investors at regional level [1]. Expect the emphasis to move from product to business as rounds progress. (Low, our inference)

## 2 · The problem statement(s)

There is no fixed problem. The theme is any AI-powered product with a real business behind it [1]. The FAQ's phrase is "with the intention of building business around it" [1].

What the sponsors evidently want (Low, our reading):

- **Google DeepMind and Google Cloud** want visible depth on recent launches. The organisers list Gemini Omni, Gemini Live, Nano Banana, Lyria, Antigravity and Agent Skills by name [1], and most of these shipped or were updated in 2026 [21][27][31].
- **nasscom and HeadStart** suggest a startup-ecosystem lens. nasscom's Centre of Excellence sat on the Gen AI Exchange 2025 jury [4] and supported Google's Prompt to Prototype startup school [15]. HeadStart is a volunteer-run not-for-profit [13], and its juries are investors and accelerator managers [14].

Comparable Google events point both ways on prior work. The Solution Challenge asks for a live MVP, a deck and custom code by the team [9][10], while Gen AI Exchange had a months-long build window [4]. Only the unrelated event in [11] explicitly bans pre-built work.

## 3 · What needs to be built

**Mandatory**

| Stage | What | Source |
|---|---|---|
| Application, by 2026-11-13 | Idea, solution, architecture, pitch deck, through the Hack2skill form | [1][2] |
| City, 2026-11-20 and 21 | A working AI-powered product built with Google AI and deployed on Google Cloud, submitted on Day 2 and presented to the jury | [1] |
| Regional, then Finale | Presentations to business mentors and investors, then at Google | [1] |

**Implied and likely rewarded**

- A live public URL on Cloud Run, since the site says deploy on Google Cloud [1]. (Low)
- Evidence of customers. The site promises "initial customer validation and traction" [1], and HeadStart events grade traction [14]. (Low)
- A one-page architecture that names specific Google services. A solo founder can show several together: Gemini Live, Gemini tool calling, ADK, Firestore and Cloud Run [21][29]. (Low)

## 4 · What already exists

### The sponsor's technology we can use

India is on the supported list for the Gemini API and AI Studio [18]. Model IDs below were re-checked on 2026-10-31 [16]. Prices and limits come from a summary of the official pages, so confirm them before budgeting (Med).

| Product / API | What it does | Access (sandbox, keys, cost) | Limits | Docs |
|---|---|---|---|---|
| Gemini text: `gemini-3.8-flash`, `gemini-3.5-flash-lite`, `gemini-4-argon` | Reasoning, multimodal input, tool use, structured output | Free tier on 3.8-flash and 3.5-flash-lite. Paid 3.8-flash: USD 0.75 in and 3.75 out per 1M tokens to 2026-12-31, doubling on 2027-01-01 [17]. `gemini-4-argon` price and capabilities unverified | Free-tier limits appear only in AI Studio, per project [19] | ai.google.dev/gemini-api/docs/models |
| Gemini Live: `gemini-3.8-live`, `gemini-3.8-live-extended-thinking` | Low-latency voice and video over WebSocket, with barge-in | Free tier on 3.8-live. Paid about USD 0.005/min audio in, 0.018/min audio out [17]. Ephemeral tokens for browser-direct use [25] | 99 languages per one doc page; the count varies between pages [24][38]. Audio session 15 min, audio plus video 2 min unless session management is on [24] | ai.google.dev/gemini-api/docs/live-guide |
| Gemini Omni: `gemini-omni-1.1-flash` | Video with audio from any input; conversational edit and extend | Billing required, no free tier. About USD 0.10 per second at 720p [17]. Interactions API [26] | Input clips 10 s max; extend to 40 s; only English evaluated; SynthID watermark; India not excluded [26] | ai.google.dev/gemini-api/docs/omni |
| Nano Banana: `gemini-nano-banana-2.1`, `gemini-3.1-flash-image`, `gemini-3-pro-image` | Image generation and conversational editing | Billing required. About USD 0.034 to 0.134 per 1K image by model [17] | No free tier [17] | ai.google.dev/gemini-api/docs/models |
| Lyria: `lyria-3.5` | Full-song music generation | Billing required. USD 0.08 per song [17] | `lyria-realtime-exp` is experimental by name [16] | ai.google.dev/gemini-api/docs/models |
| Gemma 4 | Open-weight model, 140+ languages | Free weights; run locally, on Cloud Run GPU or GKE [21][30] | Sizes, IDs and licence not captured; old docs page points to gemma.ai [30] | ai.google.dev/gemma/docs |
| AI Studio Build mode | Prompt to full-stack app, with Firestore and auth, deployed to Cloud Run | Free to use; Cloud Run billing applies [20] | **Your API key serves every visitor**, so add a proxy and rate limits. Mic and camera need a `metadata.json` permission [20] | ai.google.dev/gemini-api/docs/aistudio-build-mode |
| Antigravity 2.0 | Agent-first coding environment: desktop app, CLI, SDK | Free plan with "basic weekly rate limits"; no numbers published [28] | Launched 2026-05-19 [32] | antigravity.google |
| Google Agent Skills | 13 official Markdown skills for coding agents (Cloud Run, Firebase, BigQuery, Gemini API and others). A developer tool, not a runtime model | Free. `npx skills install github.com/google/skills` [27] | Launched 2026-04-23 [27] | github.com/google/skills |
| Cloud Run | Containers to a public URL, scale to zero | Always Free: 2M requests a month. USD 300 trial for 90 days [23] | Billing caps "coming soon" [21] | docs.cloud.google.com/run/docs |
| ADK and Agent Runtime | Multi-agent framework and managed hosting, sessions, Memory Bank. Vertex AI is now "Gemini Enterprise Agent Platform" [21] | `adk deploy cloud_run` [29] | Needs Cloud Build permissions [29] | adk.dev/deploy/cloud-run |
| Firestore, BigQuery | Data layer | Always Free: Firestore 1 GiB, BigQuery 1 TiB queries [23] | Cloud SQL has no confirmed free tier | docs.cloud.google.com/free/docs/free-cloud-features |

**Retirements to avoid.** All of these have an earliest shutdown of 2026-11-17, and Google calls these dates "earliest possible" [22].

| Do not use | Use instead |
|---|---|
| `gemini-3.1-flash-live-preview`, `gemini-2.5-flash-native-audio-preview-12-2025` | `gemini-3.8-live` |
| `gemini-3.1-flash-tts-preview`, `gemini-2.5-flash-preview-tts`, `gemini-2.5-pro-preview-tts` | `gemini-3.8-flash-tts` or `gemini-3.8-flash-lite-tts` |

Older tutorials may still show these IDs. `gemini-omni-flash-preview` and the Veo 3.1 previews have a listed shutdown of 2026-10-22, with `gemini-omni-1.1-flash` as the replacement [22].

**Demo failure modes**

- **Quota reset falls mid-event.** Requests-per-day limits reset at midnight Pacific [19]. On the event dates the US is on standard time, so that is 13:30 IST, in the middle of Day 2. (Our calculation)
- **A live camera demo can hit a cap.** A 7-minute demo with video passes the 2-minute session limit unless session management is on [3][24].
- **Omni is slow and costly.** Pre-render any video and keep a fallback. (Low, our inference from the pricing and the 720p rate [17])
- **Venue networks.** Sockets and shared Wi-Fi are untested risk, so keep a recorded backup. (Low, our inference)

**Credits.** A USD 300 Cloud trial lasts 90 days [23], and Tier 1 needs only a linked billing account [19]. We could not confirm whether trial credits cover Gemini API charges, or whether Indian cards work for billing. Google for Startups Cloud Program terms come from third-party pages only [33]. (Low) One similar event gave USD 300 in credits and no more [8]. (Low to Med)

### Existing solutions and prior art

"Gap" cells are our reading unless stated, and most rest on absence of evidence (Low).

| Name | What it does | Who's behind it | The gap it leaves | Source |
|---|---|---|---|---|
| Ringg | Enterprise voice agents, about 20M call attempts a month; customers include Cred, Flipkart, Practo | Peak XV, USD 10M (Aug 2026) | Enterprise and outbound-heavy; nothing for tiny businesses or individuals | [34] |
| Gnani, Bolna, Blue Machines, Arrowhead, Smallest.ai | Voice orchestration, often finance-focused | Various | Same layer, crowded | [34][39] |
| Sarvam AI | Indic models; a voice-first app is planned | Valuation about USD 1.5B | Model layer, though moving into apps | [40] |
| Pype AI | Hospital and clinic voice agents | Kalaari, USD 1.2M | Front desk only | [41] |
| Eka Care, Augnito, ZenMD, O-Health | Doctor-side scribes and EMR; some rural voice care | Various | Patient and caregiver side thinner | [42] |
| Kisan e-Mitra, Bharat-VISTAAR, Farmer.Chat | Free multilingual farm advice | Government, NGO | A free incumbent for advice | [43] |
| Arivihan, SpeakX, ProLearn | AI tutors, spoken English | Accel and Prosus, WestBridge, BEENEXT | Heavily funded; less beyond exam prep and English | [44] |
| Nyayanidhi, NYAI, Lawyered | Lawyer-side drafting, research, mobility legal | 3one4, Rainmatter, others | Citizen side is mostly the government's Nyaya Setu | [45][48] |
| Prosperr, Feb.ai, Prefiler, Reconcilar | Tax, accounting and GST automation | Jungle Ventures, others | Many small entrants, no clear leader found | [46] |
| Oolka, CredResolve, Rezolv, AbleCredit | Credit agents, collections, lending copilots | Lightspeed and Z47, Merak, Norwest | Lender side crowded; regulated | [47] |
| Vahan, Apna, Hunar.AI, Equip | Hiring, including live AI interviews on Gemini | Khosla, Tiger Global | Named as crowded by a reviewer [35] | [49] |
| Baipaari, BranchX, Paytm AI Soundbox, Tohands | Voice billing and stock for kiranas | Various | Vendor-reported; adoption data not found | [50] |
| Ayna, Phot.AI, Spyne | Product images and virtual models | Inflexor, Info Edge | Catalogue imagery covered | [51] |
| BHASHINI VoicERA, Nyaya Setu, Samadhan Didi | Open voice stack; legal and grievance voice bots | Government of India | Generic citizen-information bots face a free incumbent | [48] |

**Crowded, so expect comparison:** enterprise voice agents, AI recruitment, marketing automation, exam-prep tutors, collections and doctor-side scribes [34][35][44][47].

**Gaps with some evidence, none proven (all Low):**

- Voice plus vision for consumers and citizens, such as pointing a phone at a form or a bill. Government rails we found are voice and text only [48], and no India product surfaced.
- Voice agents for small businesses rather than enterprises [34][50].
- Agents that phone or browse on the user's behalf. Call My Parts earned an honourable mention [36]; no Indian consumer version surfaced.
- Field-worker vision and voice. ORION and drone-copilot won globally in physical settings [36]; no Indian equivalent surfaced.

**Funding signals.** Rounds in the last 12 months cluster in enterprise voice, edtech, credit and collections, legal, and tax and accounting [34][44][45][46][47]. Tracker totals conflict: USD 676M versus USD 1,067M for H1 2026 AI funding [52]. Do not quote a total without a caveat.

### Past winners

| Event | Scale and funnel | What won | Source |
|---|---|---|---|
| Gemini Live Agent Challenge (results 2026-05-16) | 11,878 participants, 1,536 projects | ORION, voice-directed surgical co-pilot (Grand Prize); drone-copilot; Sankofa; Moonwalk; Wand; JohnKeats.AI; Rayan Memory. India-linked honourable mentions: NagarDrishti, Call My Parts, Ekaette | [36] |
| Gen AI Exchange 2025 (Hack2skill, Google Cloud) | 2.7 lakh developers, 4,457 prototypes, top 100 at the finale, 30-member jury, 10 winners | YouthMind, ArtisanGully, Legal SahAI, Parallax, Skippers, PitchLense, Ghostpye and others, each tied to a sponsor problem statement | [4][5] |
| Agentic AI Day 2025 (Hack2skill, Google Cloud) | Concept submission, then a 30-hour build; 700+ teams shortlisted; 60 winners celebrated | Team Gurumitra, offline-first edge AI for multi-grade teachers; Team KrishAI, Breakthrough Concept Award | [6][7] |
| Gemini API Developer Competition 2024 | Older than 12 months | Jayu, Gaze Link for ALS, Prospera sales coach | [37] |

**Why they won (all inference, Low; no judge commentary found).** Live Agent winners combined real-time multimodality with a narrow, often physical or high-stakes scenario. Hack2skill's winners served a concrete Indian user and a named problem. The closest format match is Agentic AI Day: online concept, then in-person build.

The Gen AI Exchange funnel shows how selective these can be: about 2.2% of prototypes reached the finale. (Our calculation; 100 of 4,457. That event had a months-long build window, so the ratio will not carry over directly.)

## 5 · Market and business model

The evidence here is thinner than elsewhere. Clinics, coaching, logistics, real estate, agritech and NBFCs have no reliable sourced counts or prices yet.

| Segment | Potential customers | Typical price point | Willingness to pay | Reachable channel | Confidence |
|---|---|---|---|---|---|
| CAs and accounting firms | 4.23 lakh active CAs; 98,967 firms [57] | Zoho Books INR 899+/month; Tally about INR 18,000/yr [56] | Medium to high; already buy software | ICAI branches, CA WhatsApp groups, referrals | Med |
| D2C and e-commerce sellers | About 91-94k paid Shopify stores; Shiprocket about 250k merchants [58] | Not found | Medium; already pay for SaaS and ads | Shopify app store, seller communities | Low to Med |
| Kirana and micro-MSME | About 13M kiranas; 7.83 crore Udyam enterprises [54][59] | INR 700-3,000/yr for billing apps [56] | Low; under 20% of MSME procurement is digital [55] | WhatsApp, distributors | Low to Med |
| Clinics and diagnostics | Not reliably counted | Not found | Medium in principle; ABDM pays incentives [60] | Associations, lab chains | Low |
| NBFCs and enterprise BFSI | Not counted | Not found | Budget exists; sales cycles 9-18 months [61] | Direct sales | Low to Med |
| Export (US and global SMBs) | n/a | USD pricing | Higher, per founder commentary; one analysis says 80-85% of Indian SaaS revenue is global [62] | Product-led growth, marketplaces | Low to Med |

- **Who has the problem:** depends on the idea. By evidence of paying, CAs and e-commerce sellers look most reachable for a solo founder within weeks. (Low, our reading)
- **Cost of the problem:** no sourced rupee figure in any segment. We will need this from customer conversations once an idea is chosen.
- **Market size:** India's tech industry is projected at USD 315B in FY26, and Nasscom puts AI revenue at USD 10-12B, as a floor [53]. No credible figure exists for domestic SMB software spend; most India SaaS numbers are old forecasts or commercial estimates [63]. A bottom-up count will look more credible. For example, 98,967 CA firms at INR 18,000 a year comes to about INR 178 crore a year. That is an illustration of the method, not an estimate for any product.
- **How similar products make money:**
  - Per minute: Sarvam INR 3.50, Ringg INR 6, Vapi USD 0.08-0.13 [64][65]. Bolna's sources conflict at INR 3-7 [65]. Gemini Live's raw model cost is about USD 0.023 per minute of two-way audio [17], before telephony and everything else a platform adds.
  - Per message: WhatsApp marketing about INR 0.86; customer-initiated service is free [66]. A WhatsApp product should be mostly user-initiated.
  - Subscription: as in the table [56].
  - Take-rate or outcome pricing: no sourced Indian example found.
- **Viable models for us (Low, to test in ideation):**
  - Subscription for a segment that already buys software, such as CAs or sellers.
  - Usage pricing above a clear margin on model costs.
  - USD pricing for global customers, built from India.
- **Regulation and risks:**

| Rule | Status on 2026-10-31 | Effect on a 2-day MVP |
|---|---|---|
| DPDP Act and Rules | Notified 2025-11-13; most obligations apply from about 2027-05-13 [67] | Not yet binding for most duties; design consent and notice in anyway |
| IT Rules on synthetic content | In force since 2026-02-20; labelling and 3-hour takedown [68] | Mainly for platforms and intermediaries; label generated audio, images and video |
| IndiaAI Governance Guidelines | Released 2025-11-05; non-binding [69] | No blocker |
| RBI Digital Lending Directions 2025 | In force since 2025-05-08 [70] | A lending product needs a regulated partner |
| TRAI telemarketing | 140 series for promotional, 160 for service; DLT registration [71]. AI-specific rules come only from vendor blogs (unverified) | Avoid outbound promotional AI calls; inbound and service are lower risk |
| Health data and ABDM | Consent-based [60] | Do not use real patient data in a demo |
| T&Cs | No third-party-protected content; entrant warrants rights [3] | Use only licensed or our own data in a demo |

**Investors.** Peak XV's "Vertical AI is a mega theme" is the only real quote we have [72], via a CB Insights summary, and its 2026 raise was about USD 1.3B [73]. An AI founder quoted in ThePrint says VCs now watch engagement and retention over growth and acquisition [74]. (Low; a single paraphrased quote) "Thin wrappers are hard to fund" comes from blogs, not a named VC. Elevation's State of AI Adoption 2026 report is unread and worth reading [75].

**Validation in three weeks (Low, our inference).** Aim for 5-10 named conversations in one segment, a live demo, 2-3 signed letters of intent or paid pilots, and one measured usage number. About 20 days remain to the build, and 12 to the application.

## 6 · Technology landscape

- **Stable and safe:** `gemini-3.8-flash`, `gemini-3.8-live`, `gemini-nano-banana-2.1`, `gemini-omni-1.1-flash`, Cloud Run, Firestore [16].
- **New in 2026, so judges will recognise it:** Gemini Omni and Antigravity 2.0 from I/O [31][32]; Agent Skills, Agent Runtime, Memory Bank and managed MCP on Cloud Run from Next '26 [21][27].
- **Unverified or moving:** `gemini-4-argon` details; A2A, where sources disagree on version and the official Next '26 wrap-up does not mention it [21]; Gemma 4 IDs [30]; `gemini-3.5-live-translate-preview`, labelled New but still a preview [16].
- **Standards:** MCP and the open Agent Skills format are live in Google's tooling [21][27]. Google's own coding tools can load those skills [27].
- **Swappable versus distinctive (Low to Med, our inference).** Text chat, RAG and basic function calling can be replaced by any provider. Native-audio Live across Indian languages, Omni, Lyria, Nano Banana editing and Agent Runtime are harder to replace, so a product built on them should score higher on depth.

## 7 · Link to our project

- **Where judges' points are:**
  - *Founder profile:* build a specific "why me". Your background is not yet recorded here, and it may decide which idea you should pursue.
  - *Product potential:* one named user, one painful job, visible in the first 30 seconds of the demo.
  - *Market viability:* a bottom-up count, one channel, and real conversations you can quote.
  - *Technical architecture:* a one-page diagram for the application and a live Cloud Run URL for the city round.
  - *Use of Google AI:* a core feature that fails without Live, Omni, Nano Banana or similar, on top of ADK and Cloud Run.
- **White space:** consumer or citizen voice plus vision, small-business voice agents, agents that act on the user's behalf, and field-worker tools. All are Low confidence, and ideation should test them against real competitors.
- **Unfair advantages:** unknown until we record your background, domain access and any existing customers. This is the most useful missing input for ideation.
- **Constraints that shape any idea:**
  - One person and two build days, unless the organisers allow earlier work.
  - Cost: Live and text have free tiers; Omni, Nano Banana and Lyria need billing [17].
  - The application needs an architecture before any build [1].
  - A demo of about 7 minutes [3].
  - Avoid lending, real patient data and outbound promotional calling.
- **Early signals for ideation:**
  - Favour a live voice-plus-vision moment that a judge can watch and could not get from a chatbot.
  - Favour a buyer who already pays for software, and whom you can reach before 2026-11-13.
  - Rule out or heavily differentiate enterprise voice, AI recruitment, marketing automation, exam-prep tutors, collections and doctor-side scribes.
  - Treat free government services as competitors in citizen and farmer ideas, and be ready to say what they do not cover.
  - Check each idea for a credible export version, in case domestic willingness to pay is too low.
  - Prefer ideas that survive either answer on pre-building: a rehearsed two-day build should still reach a working demo.

## 8 · Open questions

| Question | Why it matters | Who can answer it |
|---|---|---|
| May we write code, or start from existing code, before 2026-11-20? | Decides how much of phases 4 to 6 can run early, and could disqualify us | Organisers: support+Buildathon-GDMxGCS@hack2skill.com |
| Must the city-round product match the application idea? | "Pick your problem" on Day 1 suggests it might change | Organisers |
| Is this confirmed by Google or Hack2skill channels? | Only the event's own site describes it | Organisers; Hack2skill and Google for Startups India LinkedIn (poorly indexed by search) |
| What time and timezone does the application close? | We are assuming 2026-11-12 23:59 IST to be safe | Organisers |
| Do the first-refusal and marketing-licence clauses apply to this event? | Could affect fundraising or a sale for 6 months afterwards | Organisers; a lawyer if you already have investors |
| What are the application form's other fields, and is there a deck template? | We should build the package against the real form | You: log in at hack2skill.com |
| Which city, and how many seats per city? | Changes competition; the application probably asks for a city | You; organisers |
| Are non-Google coding tools allowed at the city round? | The list names Google's tools, and our workflow builds with Claude Code. The rubric scores what powers the product; nothing found restricts dev tools | Organisers |
| Do participants get event credits? Do trial credits and Indian cards work for Gemini API billing? | Sets the budget for Omni, Nano Banana and Lyria | Organisers; test in Google Cloud console |
| What are the free-tier request limits for `gemini-3.8-live` and `gemini-3.8-flash`? | A live demo could hit them | Check AI Studio's rate-limit panel |
| Who pays for travel to the Regional Showcase and Finale? | They may be in another city | Organisers |
| Counts and prices for clinics, coaching, logistics, real estate, agritech and NBFCs | Gaps in the market table | Follow-up `/hack-research` once a segment is shortlisted |

**Conflicts recorded.** Agentic AI Day scale is 2,000+ developers versus 57,000+ participants; we trust Hack2skill's in-person figure [6][7]. Gen AI Exchange 2025 had 10 winners per its finale post, though other reports say 40 [4][5]. The Ringg round is described as USD 10M from Peak XV, with a Series A of USD 15.5M in total [34]. WhatsApp utility rates, Bolna pricing and 2026 ONDC seller counts conflict across sources, so do not quote them without checking [65][66][76]. The FAQ's "No limit" on team size sits against the T&Cs' "minimum and maximum" with no numbers [1][3].

## 9 · Sources

All accessed 2026-10-31. "Summary" means read through a search result or summariser rather than the full page.

**Event**

1. Startup Buildathon India 2026 official site · https://startupbuildathon.com/ · local copy research/source-site.md · init
2. Registration URL, from the site's script · https://startupbuildathon.com/js/app.js → https://hack2skill.com/event/startupbuildathon2026/registration · login required · init
3. Hack2skill terms and conditions · https://hack2skill.com/event/buildathon/tnc · local copy research/source-tnc.md · init
4. Hack2skill blog, Gen AI Exchange finale · https://blog.hack2skill.com/gen-ai-exchange-hackathon-finale · 2025 · event
5. Outlook Business, Gen AI Hackathon 2025 winners · https://www.outlookbusiness.com/artificial-intelligence/google-cloud-gen-ai-hackathon-2025-winners-use-cases-and-what-270000-developers-built · Dec 2025 · event
6. Hack2skill blog, Guinness World Record · https://blog.hack2skill.com/we-have-ourselves-a-guinness-world-record-title · 2025 · event
7. LNMIIT, Team Gurumitra · https://lnmiit.ac.in/congratulations-to-team-gurumitra-clinched-1st-place-at-the-google-cloud-agentic-ai-day-hackathon-2025/ · 2025 · summary · event
8. Recapio, Agentic AI Day AMA · https://recapio.com/digest/ask-me-anything-session-agentic-ai-day-2025-by-hack2skill · 2025 · summary · event
9. Google Solution Challenge terms · https://developers.google.com/community/gdsc-solution-challenge/terms · undated · summary · event
10. PromptWars, Solution Challenge 2026 · https://promptwars.in/solutionchallenge2026.html · 2026 · summary · event
11. Internshala, Google India Hackathon (DeepStation, MSRIT; an unrelated event) · https://internshala.com/competitions/google-india-hackathon/ · May 2026 · summary · main session
12. Web searches for the event with Google, DeepMind, nasscom, HeadStart and Hack2skill terms; no announcement found · 2026-10-31 · event
13. HeadStart, founding history · https://headstart.in/blog/the-birth-of-headstart-network-foundation · undated · event
14. Bharat Pitchathon · https://luma.com/dkgy5a6n and HeadStart Kickstart · https://headstart.in/events/kickstart-vol-1-application-for-judges · summary · event
15. Free Press Journal, Google AI Startup School · https://www.freepressjournal.in/tech/google-launches-ai-startup-school-in-india-for-founders · Nov 2025 · event

**Google technology**

16. Gemini API models · https://ai.google.dev/gemini-api/docs/models · re-checked by main session · sponsor-tech
17. Gemini API pricing · https://ai.google.dev/gemini-api/docs/pricing · sponsor-tech
18. Available regions · https://ai.google.dev/gemini-api/docs/available-regions · sponsor-tech
19. Rate limits · https://ai.google.dev/gemini-api/docs/rate-limits · sponsor-tech
20. AI Studio Build mode · https://ai.google.dev/gemini-api/docs/aistudio-build-mode · sponsor-tech
21. Google Cloud Next 2026 wrap-up · https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up · 2026-04-25 · sponsor-tech
22. Deprecations · https://ai.google.dev/gemini-api/docs/deprecations · re-checked by main session · sponsor-tech
23. Free cloud features · https://docs.cloud.google.com/free/docs/free-cloud-features · sponsor-tech
24. Live API capabilities · https://ai.google.dev/gemini-api/docs/live-guide · sponsor-tech
25. Live API overview · https://ai.google.dev/gemini-api/docs/live-api · sponsor-tech
26. Gemini Omni docs · https://ai.google.dev/gemini-api/docs/omni · sponsor-tech
27. Google's official skills repository · https://cloud.google.com/blog/topics/developers-practitioners/level-up-your-agents-announcing-googles-official-skills-repository/ · 2026-04-23 · sponsor-tech
28. Antigravity pricing · https://antigravity.google/pricing · sponsor-tech
29. ADK on Cloud Run · https://adk.dev/deploy/cloud-run/ · summary · sponsor-tech
30. Gemma docs · https://ai.google.dev/gemma/docs · sponsor-tech
31. Business Today, Gemini Omni at I/O · https://www.businesstoday.in/technology/artificial-intelligence/story/google-io-2026-google-unveils-gemini-omni-ai-video-editing-model-532350-2026-05-19 · 2026-05-19 · summary · sponsor-tech
32. Antigravity 2.0 coverage · https://digitalapplied.com/blog/antigravity-2-google-desktop-agent-deep-dive · 2026-05-19 · summary · sponsor-tech
33. Third-party Google for Startups guides · https://unicoconnect.com/blogs/google-cloud-free-tier-credits-india · https://www.incorpx.io/grants/google-for-startups-accelerator-india · summary · sponsor-tech

**Prior art**

34. TechCrunch, Ringg and Peak XV · https://techcrunch.com/2026/08/25/indias-ringg-gets-backing-from-peak-xv-as-it-pushes-voice-ai-past-the-phone-call/ · 2026-08-25 · prior-art
35. Winzheng, Google and Accel India picks (secondary report) · https://www.winzheng.com/en/article/google-accel-india-accelerator-5-startups-no-ai-wrappers · 2026-03-16 · prior-art
36. Google Cloud blog, Gemini Live Agent Challenge winners · https://cloud.google.com/blog/topics/developers-practitioners/winners-and-highlights-of-the-gemini-live-agent-challenge · 2026-05-16 · prior-art
37. Gemini API Developer Competition winners · https://developers.googleblog.com/announcing-the-winners-of-the-gemini-api-developer-competition/ · Nov 2024 · summary · prior-art
38. Google Cloud Live API language docs · https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/configure-language-voice · prior-art
39. Tracxn, voice AI in India · https://tracxn.com/d/explore/voice-ai-startups-in-india/__s7thq7EI12tPI5Mmcnok_iuzpK5VWI3-4ZhUxzXfMmA · Oct 2026 · summary · prior-art
40. Business Today, Sarvam interview · https://www.businesstoday.in/amp/technology/news/story/business-today-interview-sarvam-ai-to-launch-voice-first-sovereign-ai-app-for-india-says-ceo-pratyush-kumar-517077-2026-02-19 · 2026-02-19 · and https://www.ravan.ai/blog/india-voice-ai-in-2026-market-leaders-government-initiatives-and-what-comes-next · summary · prior-art
41. Pype AI funding · https://indianstartupnews.com/funding/pype-ai-an-indian-startup-building-ai-voice-agents-for-hospitals-raises-12-million-in-funding-10784409 · undated · summary · prior-art
42. Clinical voice AI · https://yourstory.com/2026/02/startup-showing-voice-first-ai-scale-clinical-care-root-cause-analysis · ZenMD · https://www.indianpharmapost.com/digitisation/zenmd-launches-india-focused-clinical-ai-platform-for-doctors-and-hospitals-20295 · summary · prior-art
43. Bharat-VISTAAR · https://upstox.com/news/business-news/latest-updates/what-is-bharat-vistaar-and-how-will-the-ai-platform-help-india-s-farmers/article-189534 · Farmer.Chat · https://wsa-global.org/winner/farmerchat/ · summary · prior-art
44. Edtech rounds · https://yourstory.com/2026/09/arivihan-10m-as-ai-led-edtech-targets-indias-smaller-cities · https://www.outlookbusiness.com/corporate/speakxai-raises-16-mn-from-westbridge-capital-eyes-regional-language-expansion-amid-profitable-growth · https://dealroom.co/news/130878-prolearn-raises-30-crore-pre-seed-to-build-an-ai-tutor-for-indias-k-12-a/ · summary · prior-art
45. Legal rounds · https://www.outlookbusiness.com/corporate/bengaluru-start-up-nyayanidhi-raises-2-mn-seed-to-build-indias-litigation-os · https://raising.fi/news/nyai-seed-august-2026 · summary · prior-art
46. Tax and accounting · https://www.ciol.com/funding-acquistion-merger/prosperrio-raises-4m-to-build-ai-led-tax-infrastructure-10940035 · https://inc42.com/?p=482588 · https://techindex.law.stanford.edu/companies/prefiler-labs · summary · prior-art
47. Credit and collections · https://www.business-standard.com/companies/start-ups/oolka-raises-14-million-series-a-ai-financial-agents-126042901537_1.html · https://bfsi.eletsonline.com/?p=40499 · https://inforcapital.com/news/rezolv-raises-125-million-series-a-as-ai-debt-collection-platform-handles-12-million-loan-accounts/ · summary · prior-art
48. Government voice rails · https://www.devdiscourse.com/article/law-order/3809495-bhashini-launches-voicera-open-voice-ai-stack-for-bharat · https://organiser.org/2026/04/01/346657/bharat/digital-india-bhashini-division-powers-nyaya-setu-for-multilingual-legal-access-vp-launches-mascot-dishika/ · https://www.pulse.bot/ai/news/india-introduces-ai-voice-chatbot-samadhan-didi-to-expand-access-to-public-grievance-system-91ce6123-782a-4518-ba45-beeec4901955/ · summary · prior-art
49. Hiring · https://cwv.yourstory.com/2024/09/vahanai-secures-10-million-funding-in-series-b-blue-collar-workforce · https://yourstory.com/2026/06/equip-ai-hiring-platform-recruitment-india-jayanth-neelakanta · summary · prior-art
50. Kirana tools · https://www.thehansindia.com/news/business/branchx-launches-voice-enabled-ai-retail-pos-to-transform-kirana-stores-across-india-1012839 · https://paytm.com/blog/artificial-intelligence/paytm-ai-soundbox-transforming-small-business-operations-india/ · summary · prior-art
51. Commerce imagery · https://inc42.com/buzz/exclusive-genai-startup-ayna-bags-funding-from-inflexor-to-redefine-ecommerce-photoshoot · https://www.lokmattimes.com/business/photai-raises-27m-to-automate-ecommerce-creative-design-using-ai-agents/amp · summary · prior-art
52. Funding totals · https://inc42.com/lists/top-20-funded-ai-startups-in-india-2026/ · https://startupfeed.in/indian-ai-startup-funding-h1-2026/ · summary · prior-art

**Market**

53. Nasscom FY26 outlook · https://yourstory.com/enterprise-story/2026/02/india-tech-industry-revenue-to-touch-315-billion-in-fy26-nasscom · 2026-02 · summary · market
54. IBEF, Udyam registrations · https://www.ibef.org/news/over-7-83-crore-enterprises-registered-on-udyam-platforms-indicating-strong-msme-formalisation-growth · 2026 · summary · market
55. MSME digital spend (secondary) · https://legalsuvidha.com/latest-updates/india-msme-digital-spend-080826 · 2026 · summary · market
56. Accounting software prices · https://www.patronaccounting.com/blog/zoho-books-pricing-india-2026 · https://www.vyaparapp.in/comparison-with-other-apps · https://www.g2.com/articles/zoho-books-vs-tally-vs-vyapar · summary · market
57. ICAI counts · https://www.jurishour.in/columns/india-has-around-4-23-lakh-active-ca/ · https://finance.careers360.com/articles/icai-student-and-member-report-2025 · 2025 · summary · market
58. D2C data (vendor and analyst blogs) · https://aapta.typeflo.io/posts/shopify-merchant-count-in-india-2025 · https://sacra.com/research/shopify-of-india · summary · market
59. Kirana count (industry estimate) · https://www.indiaretailing.com/?p=135604 · undated · summary · market
60. ABDM, PIB · https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202676912801.pdf · 2026-07 · summary · market
61. Enterprise sales cycles · https://indiaspora.org/wp-content/uploads/2026/03/Top100AIStartupsIndia.pdf · 2026-03 · summary · market
62. Export versus domestic (low authority) · https://www.efinancialmodels.com/?p=650326 · summary · market
63. SaaS estimates · https://yourstory.com/2020/07/indian-saas-industry-35b-revenue-startup-nasscom-saasboomi-zinnov · 2020 · https://www.kenresearch.com/industry-reports/india-software-as-a-service-saas-market.md · summary · market
64. Sarvam voice pricing · https://www.sarvam.ai/products/voice-agents/pricing · summary · market
65. Voice price comparisons · https://www.bolna.ai/pricing · https://caller.digital/blog/voice-ai-vendor-pricing-teardown-india-2026 · summary · market
66. WhatsApp pricing · https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing.md · https://chatmaxima.com/whatsapp-api-pricing/india/ · summary · market
67. DPDP Rules · https://www.azbpartners.com/bank/indias-digital-personal-data-protection-act-phased-rollout-and-key-compliance-milestones/ · 2025-11-14 · summary · market
68. IT Rules 2026 · https://www.hoganlovells.com/en/publications/india-introduces-mandatory-labelling-for-ai-and-3hour-takedown-for-illegal-content · 2026-02 · summary · market
69. AI Governance Guidelines · https://www.mondaq.com/article/1707626 · 2025-11 · summary · market
70. RBI Digital Lending Directions · https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12848 · 2025-05-08 · summary · market
71. TRAI guidelines · https://connectbroadband.in/cms/TRAI%20Guidelines%20for%20PEs%20-%2018%20June%202024.pdf · 2024-06-18 · https://ssrana.in/articles/trais-crackdown-on-spam-calls-and-ai-driven-telemarketing/ · summary · market
72. CB Insights, Peak XV · https://www.cbinsights.com/investor/sequoia-capital-india · summary · market
73. Peak XV raise · https://nextbillion.net/news/peak-xv-raises-1-3-billion-doubles-down-on-ai-as-global-vc-rivalry-in-india-heats-up/ · 2026-02 · summary · market
74. ThePrint on VCs and AI · https://theprint.in/ground-reports/meet-the-vcs-powering-indias-ai-boom-old-rules-arent-working-anymore/2847737 · summary · market
75. Elevation, State of AI Adoption · https://ai.elevationcapital.com/stateofaiadoption · 2026 · not read · market
76. ONDC · https://www.siasat.com/ondc-onboards-over-6-lakh-sellers-enables-1-2-crore-orders-per-month-3090094 · 2024-09 · summary · market

## Follow-up research

None yet.
