# Sponsor tech (Google AI and Cloud): research notes

Startup Buildathon India 2026 · researched 2026-10-31 · by hack-researcher

Method note: official docs were read via WebFetch (a summariser model, so exact numbers should be re-checked on the live page before the build). Docs pages carry no publication date; I treat them as current as of 2026-10-31 (access date). Third-party pages are marked Low or Med. Gaps: Google for Startups Cloud Program terms could not be fetched from an official page; Gemma 4 model IDs not found; no official source found for India Indian-language counts in 2026.

## Key findings
- The organisers' list is current. "Gemini Omni" is a real Google model family announced at I/O on 2026-05-19, "starting with video"; the API ID is `gemini-omni-1.1-flash` (video gen and conversational editing, with audio). Paid only, no free tier. (sources [1][2][3], 2026-05-19 and live docs) · Confidence: High
- "Google Agent Skills" is the official repo github.com/google/skills, launched 2026-04-22/23 at Cloud Next with 13 skills (AlloyDB, BigQuery, Cloud Run, Cloud SQL, Firebase, Gemini API, GKE; 3 Well-Architected pillars; 3 recipes). It is a set of Markdown skills in the open Agent Skills format, for coding agents like Antigravity. It is a developer-tooling item, not a runtime model. Install: `npx skills install github.com/google/skills`. (source [4], 2026-04-23) · Confidence: High
- Current Gemini API model IDs: text `gemini-3.8-flash` (stable), `gemini-3.5-flash-lite` (stable), `gemini-4-argon` (stable, listed first, details unverified); live voice `gemini-3.8-live` (stable); images `gemini-nano-banana-2.1`, `gemini-3.1-flash-image`, `gemini-3-pro-image` (stable); music `lyria-3.5`. (source [5], accessed 2026-10-31) · Confidence: High for IDs, Med for the status labels (page summary)
- Free tier exists (no card) for `gemini-3.8-flash`, `gemini-3.5-flash-lite`, `gemini-3.8-live`. No free tier for Omni, Nano Banana or Lyria; these need billing. Free to paid tier move needs billing set up in AI Studio; Tier 1 is immediate. (sources [6][7], accessed 2026-10-31) · Confidence: High
- India is on the supported-countries list for the Gemini API and AI Studio. (source [8]) · Confidence: High
- AI Studio Build mode deploys to Cloud Run with a public URL; Cloud Next 2026 lists "full-stack apps from AI Studio (Firestore, auth) deploy to Cloud Run" as GA. The deployed app uses YOUR API key for all visitors, so spend can run away. (sources [9][10], 2026-04-25 and live docs) · Confidence: High
- Models retiring before the 2026-12-02 finale: 2026-11-17 `gemini-3.1-flash-live-preview`, `gemini-3.1-flash-tts-preview`, `gemini-2.5-flash-native-audio-preview-12-2025`, `gemini-2.5-flash-preview-tts`, `gemini-2.5-pro-preview-tts`. Already gone: `gemini-omni-flash-preview` (2026-10-22), Veo 3.1 previews (2026-10-22), `antigravity-preview-05-2026` (2026-10-05), Imagen 4. Dates are "earliest possible". (source [11], accessed 2026-10-31) · Confidence: High
- Live API supports 99 languages incl. Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu; audio-only session cap 15 min, audio+video 2 min (extendable via session management). (source [12]) · Confidence: High
- Free Cloud trial: USD 300 for 90 days; Always Free includes Cloud Run 2M requests/month, Firestore 1 GiB, BigQuery 1 TiB queries. (source [13]) · Confidence: High
- Vertex AI is now "Gemini Enterprise Agent Platform" (Next '26); Agent Runtime, Sandbox (GA), Memory Bank, ADK graph sub-agents, managed remote MCP on Cloud Run (GA). (source [10], 2026-04-25) · Confidence: High

## Product table

| Product or API | What it does | Access (sandbox, keys, cost) | Limits | Docs |
|---|---|---|---|---|
| Gemini text: `gemini-3.8-flash`, `gemini-3.5-flash-lite`, `gemini-4-argon` | Reasoning, multimodal in, tool use, structured output | Key from AI Studio, free tier on 3.8-flash and 3.5-flash-lite. Paid: 3.8-flash USD 0.75 in / 3.75 out per 1M tokens through 2026-12-31, then 1.50 / 7.50 from 2027-01-01; 3.5-flash-lite 0.30 / 2.50 (source [6]). `gemini-4-argon` price not captured | Free-tier RPM/RPD shown per model in AI Studio only; limits per project, RPD resets midnight Pacific [7] | https://ai.google.dev/gemini-api/docs/models |
| Gemini Omni: `gemini-omni-1.1-flash` | Text/image/video/audio in; video with audio out; edit, extend, subject-reference. Via Interactions API | Billing needed (no free tier). USD 1.50 in; 9.00 text out; 17.50 video out per 1M, about USD 0.10/sec at 720p [6]. Status label not given on the docs page [14] | Output 360p to 4k (1080p/4k upscaled), 9:16 or 16:9; input videos for edit/extend 10 s max; extend up to 40 s total; English only evaluated; no system prompt/temperature; SynthID watermark; edit-uploaded-video not in EEA/UK/CH (India not restricted) [14] | https://ai.google.dev/gemini-api/docs/omni |
| Nano Banana: `gemini-nano-banana-2.1`, `gemini-3.1-flash-image` (NB2), `gemini-3.1-flash-lite-image`, `gemini-3-pro-image` (Pro) | Image generation and conversational editing | Billing needed. About USD 0.034 per 1K image (NB 2.1 and 2 Lite), 0.067 (NB2), 0.134 (Pro) [6] | No free tier; preview image IDs retired 2026-06-25 [11]; `gemini-2.5-flash-image` retires no earlier than 2027-03-15 | https://ai.google.dev/gemini-api/docs/models |
| Gemini Live: `gemini-3.8-live`, `...-extended-thinking` | Low-latency voice/video agent over WebSocket, barge-in, 99 languages | Free tier exists for 3.8-live. Paid: audio in about USD 0.005/min, audio out about 0.018/min [6]. Use ephemeral tokens for browser-direct [15] | Audio session 15 min, audio+video 2 min unless session management used [12]; `gemini-3.1-flash-live-preview` retires 2026-11-17 [11] | https://ai.google.dev/gemini-api/docs/live-api and /live-guide |
| Lyria: `lyria-3.5` (also `lyria-3-clip-preview`, `lyria-realtime-exp`) | Full-song music generation; realtime variant is experimental by name | Billing needed. USD 0.08 per song [6] | Status labels not shown on page; clip/pro variants are previews [5] | https://ai.google.dev/gemini-api/docs/models |
| Gemma 4 | Open-weight model, text/audio/image in, 140+ languages, 128K context (up to 256K) | Free weights; run locally, Cloud, GKE, Ollama etc. Also deployable to Cloud Run GPU (Cloud Run lists RTX PRO 6000 Blackwell, source [10]) | Sizes, IDs, licence terms not captured; docs page says it is deprecated in favour of gemma.ai [16] | https://ai.google.dev/gemma/docs |
| Google AI Studio (Build mode) | Prompt to full-stack app; Antigravity agent inside; Firebase provisioning (Firestore, Auth); one-flow deploy to Cloud Run | Free to use; Cloud Run billing applies; API key kept server-side as `GEMINI_API_KEY` secret [9] | No collaborative editing (use GitHub); bring your own database; mic/camera need `metadata.json` permission [9] | https://ai.google.dev/gemini-api/docs/aistudio-build-mode |
| Google Antigravity (2.0, desktop app, `agy` CLI, SDK) | Agent-first coding environment, launched at I/O 2026-05-19 [17] (secondary) | Free individual plan with "basic weekly rate limits" (official [18]); AI Pro/Ultra raise limits | No numeric quotas on official page; Gemini CLI consumer access reportedly ended 2026-06-18 [17] (Low) | https://antigravity.google/ ; skills codelab https://codelabs.developers.google.com/getting-started-with-antigravity-skills |
| Google Agent Skills | Markdown skills (open Agent Skills format) loaded on demand by coding agents | Free, Apache 2.0 reported (secondary) | 13 launch skills; more promised [4] | https://github.com/google/skills ; https://agentskills.io |
| Cloud Run | Containers to public URL, scale to zero | Always Free: 2M req, 180k vCPU-s, 360k GiB-s memory per month [13] | Billing caps "coming soon" [10] | https://docs.cloud.google.com/run/docs |
| ADK + Agent Runtime (Agent Platform, ex-Vertex AI Agent Engine) | Multi-agent framework (Python, TS, Go, Java); managed hosting, sessions, Memory Bank | `adk deploy cloud_run` is the quick path; Agent Runtime optional [19] | Needs Cloud Build permissions on default compute SA [19] | https://adk.dev/deploy/cloud-run/ |
| Firestore / BigQuery / Cloud SQL | Data layer | Always Free: Firestore 1 GiB, 50k reads/day; BigQuery 1 TiB queries and 10 GiB storage [13] | Cloud SQL has no free tier that I confirmed | https://docs.cloud.google.com/free/docs/free-cloud-features |

## Answers to the key questions

### 1. What each product is, versions, status
- Gemini Omni is confirmed. Announced 2026-05-19 at I/O as "create anything from any input", first release Omni Flash, in Gemini app, Flow, YouTube Shorts [1][2]. API model `gemini-omni-1.1-flash` documented for video gen/edit/extend [14]. An earlier `gemini-omni-flash-preview` was shut down 2026-10-22 [11], so code that used the old preview ID breaks. Pricing page and models page both list 1.1-flash; the models page labels it Stable, the docs page gives no label [5][14]. Treat as Stable-per-listing, Med.
- Google Agent Skills is confirmed as github.com/google/skills (see Key findings) [4]. Distinct from Antigravity's own skills folders (`.agent/skills/` workspace, `~/.gemini/antigravity/skills/` global) per codelab-derived search results (Med) [20].
- Gemini: 3.8 Flash and 3.5 Flash-Lite stable; 3.5 Flash was introduced at I/O 2026 (secondary [17]). `gemini-4-argon` appears at top of the models list and on a docs banner; I could not verify its capabilities or price [5][15] (Low on details).
- Nano Banana: lineup 2.1, 2, 2 Lite, Pro (above) [5]. Lyria 3.5 [5]. Gemini Live 3.8 [5][12]. Gemma 4 [16].
- Antigravity 2.0 launched 2026-05-19 [17]; its API model ID `antigravity-preview-09-2026` appears on the models page [5] (preview-era, status unlabelled).

### 2. Access and India
- Keys from AI Studio; India supported [8]. Limits are per project, not per key. Tier 1 needs a linked billing account; Tier 2 needs USD 100 paid plus 3 days; Tier 3 USD 1,000 plus 30 days [7]. Tier 1 spend cap listed as USD 250 [7].
- I found no India-specific model restriction for the Gemini API. Omni's regional exclusions name EEA/UK/CH only [14]. India billing may require an Indian card meeting RBI recurring-payment rules (Inference, Low; not checked).
- Sandbox: AI Studio free tier (no card). Omni, Nano Banana, Lyria have no free tier, so a solo founder must enable billing, or use the Cloud trial credit (USD 300, 90 days) [13]. Inference: whether trial credits apply to Gemini API billing was not verified (Low).

### 3. Docs and starters
- Gemini API docs: https://ai.google.dev/gemini-api/docs. Omni: /omni. Live: /live-api, /live-guide. AI Studio Build: /aistudio-build-mode. Skills: github.com/google/skills. ADK on Cloud Run: https://adk.dev/deploy/cloud-run/. Agent Platform docs: docs.cloud.google.com/gemini-enterprise-agent-platform/ [10]. Antigravity skills codelab: codelabs.developers.google.com/getting-started-with-antigravity-skills [20]. Python SDK for Omni: `client.interactions.create(model="gemini-omni-1.1-flash", input=...)` [14].

### 4. Distinctive to Google vs swappable
Inference (Low-Med), from the capabilities documented above:
- Hard to swap: Omni (video gen plus conversational editing with audio in one model); Lyria music; Gemini Live native audio across 99 languages, including Indian languages; Nano Banana image editing; multimodal video/audio input; AI Studio to Cloud Run; Agent Runtime, Memory Bank, Sandbox, and managed MCP on Cloud Run; Firebase.
- Easy to swap: plain text chat/summarisation, RAG, basic function calling, generic web app hosting. Depth of Google use scores more when a core feature breaks without a Google-specific capability (Omni, Live, Lyria, Nano Banana, Agent Runtime).

### 5. Deploy path for two days
- Fastest: AI Studio Build mode, then deploy to Cloud Run for a public URL with server-side key [9]; GA for full-stack with Firestore and auth [10]. Caveat: the owner's key serves all users; add rate limiting and keep the key restricted [9].
- Agent apps: write ADK agent, `adk deploy cloud_run` (optionally `--with_ui`, `--agent_engine_id` for managed sessions) [19]. Languages Python, TS, Go, Java [19]. Agent Runtime gives sub-second cold starts [10].
- A2A: Next '26 coverage mentions it, but sources disagree on version and details (see conflicts); the official wrap-up page does not mention A2A [10]. MCP: managed remote MCP on Cloud Run GA; database MCP servers preview [10].
- Data: Firestore (free tier, auto-provisioned by AI Studio [9]); BigQuery (free 1 TiB queries) for an analytics story; Cloud SQL costs money (Low).

### 6. Credits
- Cloud Free Trial: USD 300 for 90 days [13]. Hackathon: winners get USD 5,000 credits each (per tracker). Google for Startups Cloud Program: third-party guides say tiers Start (pre-funded), Scale, and AI (up to USD 350k, needs seed to Series A) [21] (Low; official page not retrievable, `cloud.google.com/startup` returned no content). India-specific: no confirmed terms. The separate India AI-first Accelerator is equity-free, seed to Series A, application reportedly closed 2026-04-19 [21] (Low). Ask organisers whether participants get event-specific credits or vouchers (none found).

### 7. Recent launches and Indian languages
- I/O 2026 (2026-05-19): Gemini Omni, Gemini 3.5 Flash, Antigravity 2.0 (desktop, CLI, SDK, managed agents) [1][17]. Next '26 (2026-04-22 to 25): Gemini Enterprise Agent Platform, Agent Runtime/Sandbox/Memory Bank, ADK graph agents, Cloud Run MCP and AI Studio deploy, Agent Skills repo [4][10]. Later models: Gemini 3.8 family, Live 3.8, Nano Banana 2.1, Lyria 3.5 (dates not captured; on models page [5]).
- Indian languages: Live API 99 languages including 10+ Indian [12]. Gemma 4: 140+ languages, no India-specific claim [16]. Omni: only English evaluated [14], so avoid Hindi video prompts. Consumer news of Gemini Live in 25 Indian languages (I/O Connect India 2026) is single-source and unverified [22] (Low).

### 8. Demo failure modes
- Retirements: see Key findings; the 2026-11-17 batch lands before the 2026-11-20/21 build. Do not use `gemini-3.1-flash-live-preview`, any `*-tts-preview` or the 2.5 native-audio preview ID [11]. Use `gemini-3.8-live`.
- Preview IDs churn: Omni and Veo previews died 2026-10-22; Antigravity preview ID dated 05-2026 died 2026-10-05; pin stable IDs [11].
- Quotas: free tier limits vary per model and are per project; RPD resets midnight Pacific, which is 12:30 pm IST [7]. Many users on a shared venue network or an event key can trip limits. Tier 1 upgrade needs billing, typically immediate [7].
- Omni video is slow and costly (about USD 0.10/s at 720p [6]); pre-render demo clips and keep a fallback. Large videos need `delivery="uri"` [14]. `store=false` blocks later edits [14].
- Live sessions: 15 min audio, 2 min with video unless session management is on [12]. Browser mic/camera on AI Studio apps need a `metadata.json` permission [9]. A shared app may return "403 Access Restricted" due to extensions [9].
- Price change: `gemini-3.8-flash` doubles on 2027-01-01 (after the event) [6].
- Gemma docs page says deprecated, pointing to gemma.ai [16].

## Things that change how we compete
- Three organiser-named items are new in 2026 (Omni, Agent Skills, Antigravity 2.0), so most competitors will be shallow on them. Using Skills in the build workflow is cheap evidence of depth, but judges score the product, so show it in the architecture slide and a repo (Inference, Low).
- The "Use of Google AI" score rewards Google AI and Cloud depth. A multi-service story (Live + Gemini tool-calling + Firestore + Cloud Run + ADK) is achievable in two days at near-zero cost on free tiers; Omni, Nano Banana and Lyria add paid cost.
- Indian-language voice via Live is a documented, distinctive advantage with free-tier access for `gemini-3.8-live`.
- Deploy via Cloud Run is mandatory in spirit; AI Studio's one-step deploy exposes your key, so add a server proxy and quotas.

## Conflicts and uncertainties
- Gemini 3.5 Flash price: search summaries say GA `gemini-3.5-flash` at USD 1.50/9 [17] (secondary); the official pricing page summary lists 3.8-flash at 0.75/3.75 and does not list 3.5-flash [6]. Trust [6]. `gemini-3.5-flash` ID is not on the official models page summary [5].
- Antigravity free tier: one review says it runs "Gemini 3.8 Flash and Claude Opus 4.6 until November 2, 2026" [17]; unverified and the official page [18] gives only "basic weekly rate limits". Trust [18].
- Skills install command: one search summary gave a different command, the official blog says `npx skills install github.com/google/skills` [4]. Trust [4].
- Skills launch date: search says 2026-04-22; blog summary says 2026-04-23 [4]. Immaterial.
- A2A: sources disagree on version (1.2 vs other) and the official Next '26 wrap-up does not mention it [10]. Treat A2A details as unverified.
- Gemini Live Indian languages 2026: 9 vs 25 languages in consumer coverage [22]; the API's own 99-language list [12] is the one to trust for building.
- Omni status: Stable on the models page [5], unlabelled on its docs page [14].

## Open questions
- Official Google for Startups Cloud Program terms and India eligibility (cloud.google.com/startup needs a browser check); do event-specific credits exist for participants?
- Free-tier RPM/RPD per model (only visible in AI Studio's rate-limit panel). Check before the build.
- `gemini-4-argon`: capabilities, price, India availability.
- Gemma 4 sizes, IDs and licence at gemma.ai.
- Whether Indian cards work for Gemini API billing, and whether Cloud trial credits cover Gemini API usage.
- A2A current version and an official ADK/A2A starter for hackathons.
- Exact Cloud Run deploy steps ("Deploying from Google AI Studio" guide), not fetched.

## Sources
1. Google I/O 2026: Google unveils Gemini Omni, https://www.businesstoday.in/technology/artificial-intelligence/story/google-io-2026-google-unveils-gemini-omni-ai-video-editing-model-532350-2026-05-19 (2026-05-19, accessed 2026-10-31; search snippet only)
2. Google launches Gemini Omni, https://www.bworldonline.com/technology/2026/05/20/751019/google-launches-gemini-omni-capable-of-chat-based-video-generation-editing/ (2026-05-20; search snippet only)
3. Startup Buildathon India page, https://startupbuildathon.com/ (accessed 2026-10-31)
4. Level up your agents: Google's official skills repository, https://cloud.google.com/blog/topics/developers-practitioners/level-up-your-agents-announcing-googles-official-skills-repository/ (2026-04-23, accessed 2026-10-31)
5. Gemini API models, https://ai.google.dev/gemini-api/docs/models (undated, accessed 2026-10-31)
6. Gemini API pricing, https://ai.google.dev/gemini-api/docs/pricing (undated, accessed 2026-10-31)
7. Gemini API rate limits, https://ai.google.dev/gemini-api/docs/rate-limits (undated, accessed 2026-10-31)
8. Available regions, https://ai.google.dev/gemini-api/docs/available-regions (undated, accessed 2026-10-31)
9. Build apps in Google AI Studio, https://ai.google.dev/gemini-api/docs/aistudio-build-mode (undated, mentions 2026-05-14; accessed 2026-10-31)
10. Google Cloud Next 2026 wrap-up, https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up (2026-04-25, accessed 2026-10-31)
11. Gemini API deprecations, https://ai.google.dev/gemini-api/docs/deprecations (undated, accessed 2026-10-31)
12. Live API capabilities guide, https://ai.google.dev/gemini-api/docs/live-guide (undated, accessed 2026-10-31)
13. Free cloud features, https://docs.cloud.google.com/free/docs/free-cloud-features (undated, accessed 2026-10-31)
14. Gemini Omni docs, https://ai.google.dev/gemini-api/docs/omni (undated, accessed 2026-10-31; last 6k chars unread)
15. Live API overview, https://ai.google.dev/gemini-api/docs/live-api (undated, accessed 2026-10-31)
16. Gemma docs, https://ai.google.dev/gemma/docs (undated, accessed 2026-10-31)
17. Antigravity 2.0 coverage (secondary), https://digitalapplied.com/blog/antigravity-2-google-desktop-agent-deep-dive (2026-05-19) and https://belitsoft.com/news/google-antigravity-19052026 (search snippets only)
18. Antigravity pricing, https://antigravity.google/pricing (undated, accessed 2026-10-31)
19. ADK Cloud Run deploy, https://adk.dev/deploy/cloud-run/ (undated; search snippet only)
20. Authoring Google Antigravity Skills codelab, https://codelabs.developers.google.com/getting-started-with-antigravity-skills (undated; search snippet only)
21. Third-party Google for Startups guides, https://unicoconnect.com/blogs/google-cloud-free-tier-credits-india and https://www.incorpx.io/grants/google-for-startups-accelerator-india (undated; search snippets only)
22. Gemini Live Indian languages coverage, https://www.newsbytesapp.com/news/science/google-io-connect-india-2026-unveils-25-indian-language-gemini-live/tldr (2026, search snippet only)
