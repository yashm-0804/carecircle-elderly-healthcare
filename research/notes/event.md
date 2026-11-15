# Event: research notes

Startup Buildathon India 2026 · researched 2026-10-31 · by hack-researcher

Gap note: the Hack2skill registration page and T&C page are login or JavaScript gated. WebFetch of https://hack2skill.com/event/startupbuildathon2026 returned only the title "Hack2skill". YourStory's "10 innovations" article returned HTTP 403, so I used its headline list as reproduced on the Hack2skill blog.

## Key findings
- No independent confirmation found. Searches for "Startup Buildathon India", with Google, DeepMind, nasscom, HeadStart and Hack2skill terms, returned no Google, Google Cloud India, DeepMind, nasscom, HeadStart or Hack2skill announcement, news article or LinkedIn post (searches run 2026-10-31, several phrasings). Only startupbuildathon.com itself describes the event. Confidence: Med (search engines are imperfect; absence is not proof). Sources [1][2][3]
- The registration URL is not publicly listed in any result I could see. It is known only from the site's JS (per the team's local capture). Confidence: Med. Source [4]
- Closest real Google India founder programmes, all different from this event: Google for Startups "Startup School: Prompt to Prototype" (Nov 2025, supported by MeitY Startup Hub, Startup India, IndiaAI Mission and nasscom), Google for Startups Accelerator India 2026, and the Google/Antler AI Immersion programme. None mention a Buildathon. Confidence: Med. Sources [2][3][5]
- Hack2skill and Google have run the same shape of event before. Agentic AI Day (Bengaluru, 26-27 July 2025) had an online idea submission, then a 30-hour in-person build. 700+ teams were shortlisted and 60 winners were celebrated. Confidence: Med. Sources [6][7]
- Gen AI Exchange Hackathon 2025 funnel: 2.7 lakh developers, 4,457 prototypes deployed on Google Cloud, top 100 teams to an in-person finale (Leela Palace, Bengaluru, 29 Nov 2025), 30-member jury (Google, NASSCOM, JK Cement, EaseMyTrip, LVX), 10 winners. Confidence: High (two sources agree). Sources [8][9]
- Winners of that event were mostly narrow, domain-specific tools tied to a named problem statement (legal docs, artisans, test-case generation, cement operations, startup evaluation, governance). Jury members were not individually named. Confidence: Med. Source [8]
- Pre-built code: no source gives a rule for this event or for Hack2skill Google in-person events. The only explicit "start on Day 1" language found belongs to an unrelated event (Google India Hackathon by DeepStation and Ramaiah, on Internshala), which bans pre-built or re-skinned products. Confidence: Med on absence. Sources [10][11]
- HeadStart is a volunteer-run not-for-profit (since about 2007) running Startup Saturdays, Kickstart pitch events and mentoring. Its juries are investors and accelerator managers grading team, traction, product, market and barrier to entry. Confidence: High on description, Low on who judges here. Sources [12][13]

## Answers to the key questions

### 1. Independent confirmation
Could confirm: startupbuildathon.com exists and, per the team's capture, names Google DeepMind, Google Cloud, Hack2skill, nasscom and HeadStart. Hack2skill is a real platform with a LinkedIn company page [14], and it runs the Google Gen AI Exchange, Agentic AI Day and Solution Challenge India events [6][8][11].
Could not confirm: any third-party or organiser-channel announcement of this specific event. Searches such as "Startup Buildathon India 2026", "Startup Buildathon Google DeepMind Google Cloud nasscom HeadStart" and "Google for Startups India Buildathon 2026" found nothing [1][2][3]. LinkedIn posts are poorly indexed, so a post may exist unseen. I could not read the Hack2skill event page [4]. The event also does not appear on Google's own events listings that surfaced (e.g. AI Day for Startups India 2026, Gurugram, 25 June 2026 [15]). Treat as unverified outside its own site. Inference: the event is new (applications opened 2026-10-23), so little coverage yet is plausible. Low confidence.
Suggested check by a human: Hack2skill LinkedIn feed and Google for Startups India LinkedIn; email support+Buildathon-GDMxGCS@hack2skill.com.

### 2. Not on the site
I found nothing on: application form fields, pitch deck template, selection numbers, seats per city, venues, clock times, build-before-event rules, travel support, or named jurors and mentors. All remain unknown.
Analogue hints: Agentic AI Day used 2-5 member teams and gave $300 of Google Cloud credits, with no more provided (AMA summary [16]; Low-Med). Agentic AI Day required a concept submission to shortlist [6]. Hack2skill's Solution Challenge 2026 asks for a solution overview, live MVP link and project deck [11].

### 3. Prior work and pre-built code
No official statement for this event. The site says "Build a new product" and "Idea on day one", and the team's T&C capture allows work based on an existing application (per tracker). Comparable events: Solution Challenge requires a working app with custom code by the team [10]. Gen AI Exchange required prototypes deployed on Google Cloud and had a months-long build window, so building ahead was inherent there [8]. For Agentic AI Day I found no rule [6]. Recommendation: ask organisers; do not assume. Inference: Low.

### 4. Comparable editions
- Gen AI Exchange Hackathon 2025 (2nd edition, Hack2skill with Google Cloud). 2.7 lakh developers, 4,457 prototypes, top 100 to finale, 29 Nov 2025 [8][9]. Shortlisting was by prototype stage output, then pitching to a jury of 30 [8]. Winners (team, project) [8]:
  1. Prompt-o-nauts, YouthMind (youth mental wellness)
  2. Oopsie Operators, ArtisanGully (artisan marketplace assistant)
  3. Crewmate, Legal SahAI (legal documents)
  4. Technopaths, Parallax (misinformation)
  5. Error_404_Not_Found (career and skills advisor)
  6. Skippers (test-case generation)
  7. May The Agents Be With You (cement operations, JK Cement problem)
  8. AIxpert, PitchLense (AI analyst for startup evaluation)
  9. Ghostpye (trip planner, EaseMyTrip problem)
  10. Success (governance, citizen services)
  Why they appear to have won: Inference only, Low. Each maps to a sponsor-posed problem statement (partners: Maharashtra govt, NASSCOM CoE IoT and AI, JK Cement, EaseMyTrip, LVX [9]) and uses a concrete India-specific user. I found no judge commentary. Note PitchLense (startup evaluation) is directly adjacent to this event's investor audience.
- Google Cloud Agentic AI Day (Bengaluru, BIEC, 26-27 July 2025, Hack2skill). 30-hour build, six problem statements, Gemini, Vertex AI and Firebase; reports vary on scale (2,000+ developers and 700+ teams [7]; LNMIIT says 57,000+ participants [6]); 60 winners [7]; Guinness record claimed [6][17]. Named winners: Team Gurumitra, 1st place, offline-first edge AI platform for teachers in multi-grade classrooms using Firebase Studio, Cloud Vision, Gemini, Vertex AI [6]; Team KrishAI, Breakthrough Concept Award [6]. Why: Inference, Low: real social problem, working Google stack, edge or offline angle. Source for Gurumitra detail: search summary of LNMIIT page; the page itself failed TLS on fetch.
- Google Solution Challenge India 2026 (Hack2skill with GDG on Campus): student-oriented, requires working MVP link and deck, and custom code [10][11]. I did not retrieve applicant counts or winners.
- Build with AI events: seen only as listings (e.g. Code for Communities Hackathon 2026 on Internshala); no outcome data gathered.

### 5. HeadStart and nasscom
HeadStart Network Foundation: Indian not-for-profit that began as Bangalore Barcamp volunteers about 2006-07, registered about 2009, 23 cities, about 150 volunteers and one employee, programmes include Startup Saturdays, Kickstart, Bharat Pitchathon, Investor Circle, Mentor, Startup Coach [12]. Typical criteria in its pitch events: team, traction, product, market, barrier to entry [13]; Bharat Pitchathon looks for big market, strong traction, capable team, lasting advantage, impact [13]. Inference: its volunteers (investors, accelerator managers, founders) are the likely city-level mentors, matching the "Founder profile" and "Market viability" criteria. Low.
nasscom: industry body; its Centre of Excellence (IoT and AI) was a problem-statement partner and sat on the Gen AI Exchange 2025 jury [8][9]; it supported Google's Prompt to Prototype programme [2]. I found no named nasscom, HeadStart, DeepMind or Google judges for this event. Unverified.

## Things that change how we compete
- Founder profile and market viability carry 40% of the rubric by assumption and mirror HeadStart's pitch-event criteria [13]; a solo founder needs a credible "why me" story.
- Past winners were narrow and sponsor-problem-linked, but this event is open innovation with a business angle; PitchLense-style traction narratives may fit better than pure demos. Inference, Low.
- Prior Hack2skill events used a staged funnel with large drop-off (100 of 270k; 700 teams in Agentic AI Day) [8][7]. Stage 1 selection is the real bottleneck.
- Cloud credit limits ($300 at Agentic AI Day [16]) suggest budgeting deployment cost carefully.

## Conflicts and uncertainties
- Agentic AI Day scale: 2,000+ developers and 700+ teams [7] vs 57,000+ participants [6]. Trust [7] (Hack2skill's own blog) for in-person scale; [6] may count registrations. Low-Med.
- Gen AI Exchange team "Skippers" project described as healthcare test-case generation in one search summary and governance in another. The Hack2skill list [8] assigns Skippers to test-case generation and "Success" to governance; trust [8].
- Event legitimacy rests on one site (see finding 1).

## Open questions
- Does a Hack2skill, Google or LinkedIn announcement exist for this event? Check LinkedIn directly; also email support.
- Form fields, deck template, per-city seats, venues, times, build-before-event rule, travel support, jurors.
- Winners and counts for Solution Challenge India 2026 and Build with AI events (not gathered).
- Why Gen AI Exchange winners won (no judge commentary found).

## Sources
1. Web search "Startup Buildathon India Google Hack2skill", no relevant result, https://www.google.com (search, accessed 2026-10-31)
2. Free Press Journal, Google launches AI Startup School in India, https://www.freepressjournal.in/tech/google-launches-ai-startup-school-in-india-for-founders (Nov 2025, accessed 2026-10-31)
3. Web search "Startup Buildathon India 2026" (extended), results listed unrelated buildathons incl. https://www.startupgrantsindia.com/competitions/global-buildathon26 (accessed 2026-10-31)
4. https://hack2skill.com/event/startupbuildathon2026 (fetched, returned title only, accessed 2026-10-31)
5. Fone Arena, Google opens applications for 2026 Startup Accelerator India, https://www.fonearena.com/blog/?p=478800 (2026, accessed 2026-10-31)
6. LNMIIT, Team Gurumitra 1st place, https://lnmiit.ac.in/congratulations-to-team-gurumitra-clinched-1st-place-at-the-google-cloud-agentic-ai-day-hackathon-2025/ (2025, via search summary; page fetch failed TLS)
7. Hack2skill blog, Guinness World Record, https://blog.hack2skill.com/we-have-ourselves-a-guinness-world-record-title (2025, accessed 2026-10-31)
8. Hack2skill blog, Gen AI Exchange finale, https://blog.hack2skill.com/gen-ai-exchange-hackathon-finale (Nov-Dec 2025, accessed 2026-10-31)
9. Outlook Business, Gen AI Hackathon 2025 winners, https://www.outlookbusiness.com/artificial-intelligence/google-cloud-gen-ai-hackathon-2025-winners-use-cases-and-what-270000-developers-built (Dec 2025, accessed 2026-10-31)
10. Google Solution Challenge terms, https://developers.google.com/community/gdsc-solution-challenge/terms (undated, via search summary)
11. PromptWars Solution Challenge 2026 page, https://promptwars.in/solutionchallenge2026.html (2026, via search summary)
12. HeadStart, The birth of Headstart Network Foundation, https://headstart.in/blog/the-birth-of-headstart-network-foundation (undated, accessed 2026-10-31)
13. Luma, Bharat Pitchathon, https://luma.com/dkgy5a6n (listed 31 Oct 2026, via search summary); HeadStart Kickstart, https://headstart.in/events/kickstart-vol-1-application-for-judges
14. Hack2skill LinkedIn company page, https://linkedin.com/company/hack2skill (listed only)
15. Google Cloud, AI Day for Startups India 2026, https://cloud.google.com/events/ai-day-for-startups-india-2026 (2026, listed only)
16. Recapio, Agentic AI Day AMA, https://recapio.com/digest/ask-me-anything-session-agentic-ai-day-2025-by-hack2skill (2025, via search summary)
17. Google India blog, Guinness World Records, https://blog.google/intl/en-in/company-news/seizing-our-moment-in-guinness-world-records/ (2025, listed only)
