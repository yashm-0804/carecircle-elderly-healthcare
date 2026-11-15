# Market angle: research notes

Startup Buildathon India 2026 · researched 2026-10-31 · by hack-researcher

Method note: this pass used about 20 web searches. I did not fetch the full pages, so most figures come from search-result summaries of secondary sources. Many sources have no visible publication date; where I know the date I give it. The segment table is mostly estimates. Several segments (clinics, logistics, real estate, NBFC, agritech, coaching) have no sourced customer count at all. I flag those as gaps instead of filling them from memory.

## Key findings
- India's tech industry is projected at USD 315B in FY26, up 6.1% from USD 297B in FY25. Nasscom's AI revenue estimate is USD 10-12B, and Nasscom itself says it is a floor. (source [1], 2026-02-24) · Confidence: High on the headline, Med on the AI split
- No credible Nasscom-grade figure for domestic SMB SaaS spend surfaced. The only "India SaaS" numbers are old (Nasscom 2020 forecast of USD 13-15B by 2025, never confirmed) or from commercial research houses (Ken Research: about USD 13B for 2025, 36.1B for 2030). Treat all of them as estimates. (sources [2], [3]) · Confidence: Low
- There are over 7.83 crore (78.3 million) Udyam-registered enterprises as of 2026-02-28, but most are micro and informal. (source [4]) · Confidence: High on the count, Low on how many pay for software
- Less than one-fifth of Indian MSME procurement spend is digital (India SME Forum and Amazon Business report, cited by a secondary outlet). That points to low willingness to pay. (source [5]) · Confidence: Med
- Local-language voice AI has real published price points. Sarvam lists INR 3.50/min (INR 3.15 on its Growth tier), with telephony billed separately at about INR 0.40/min. Vapi is about USD 0.08-0.13/min before telephony. Ringg quotes INR 6 per connected minute. Bolna's figures conflict across sources (INR 3-7/min). Independent estimates of effective all-in cost are INR 6-25/min (vendor source). (sources [6], [7]) · Confidence: Med
- WhatsApp Business API: Meta bills per delivered template message. Marketing is about INR 0.86 per message, utility INR 0.115-0.35 (sources conflict), and customer-initiated service conversations are free. Billing moved to INR on 2026-01-01, with a migration deadline of 2026-12-31. (source [8]) · Confidence: Med (blogs; Meta's rate card not read)
- Accounting and billing software for small Indian businesses sells at INR 700-3,000/year for mobile billing apps (Vyapar INR 1,999/yr, myBillBook INR 699-2,599/yr), INR 3,600-9,000/yr for Busy, about INR 18,000/yr for Tally single-user, and INR 899-1,499+/month for Zoho Books. Sources disagree by up to 2x. (source [9]) · Confidence: Low-Med
- Regulation status today: the DPDP Rules were notified 2025-11-13 and phase in over 18 months, with the main obligations from about 2027-05-13. The IT Rules amendment on synthetic content has been in force since 2026-02-20. India's AI Governance Guidelines (2025-11-05) are non-binding. RBI Digital Lending Directions 2025 are in force. (sources [10], [11], [12], [13]) · Confidence: Med-High
- Investors: the best primary-ish signals are Peak XV's quote "Vertical AI is a mega theme" (via CB Insights summary) and its 2026 fund raise of about USD 1.3B. "Thin wrappers are hard to fund" comes only from blog commentary, not a named VC quote. (sources [14], [15]) · Confidence: Low-Med
- Per a 2026 ThePrint piece, an AI startup CEO says VCs look at "Engagement and retention... not the growth and acquisition". (source [16]) · Confidence: Low (one quote, paraphrased by the result summary)

## Segment comparison table

All counts and prices are estimates from the cited sources. "n/f" means no figure found. WTP is willingness to pay.

| Segment | Potential customers (estimate) | Cost of the problem | Typical price point (INR) | WTP signal | Reachable channel | Confidence |
|---|---|---|---|---|---|---|
| Kirana / micro-MSME | About 13 million kiranas (press and industry estimates, [17]); 7.83 crore Udyam enterprises ([4]) | Time on billing, credit-book (udhaar), stock. n/f in INR | INR 700-3,000/yr for billing apps ([9]) | Low. Less than 20% of MSME procurement is digital ([5]). Survey claims 71% use AI tools, but it covers PayNearby's own retailer network ([18]) | WhatsApp, distributors, retail-tech networks | Low-Med |
| D2C and e-commerce sellers | About 91-94k paid Shopify stores in early 2025 (blog, unclear sourcing, [19]); Shiprocket serves about 250k merchants ([19]); Amazon+Flipkart active sellers over 1.5M (vendor estimate, [19]) | Returns, ad spend, support load. n/f | n/f for India. Shopify is the default stack for funded D2C ([19]) | Med. Already pays for SaaS, ads and logistics. I found no sourced SaaS ARPA | Shopify app store, seller communities, Shiprocket-type ecosystems, ONDC seller apps | Low-Med |
| CAs and accounting firms | 4.23 lakh active CAs (ICAI annual report 2024-25, [20]); about 98,967 firms; 1,59,557 hold a certificate of practice ([20]); GST practitioner count n/f | Compliance work, notice replies, reconciliation. n/f | Zoho Books INR 899-9,999/mo; Tally about INR 18k/yr ([9]) | Med-High, since CAs already buy software. Evidence is indirect | ICAI branches, CA WhatsApp and Telegram groups, referrals | Med |
| Clinics and diagnostics | Around 3.6 lakh facility registry entries (single source, unverified, [21]); 90 crore+ ABHA accounts (PIB, July 2026, [21]); clinic and lab counts n/f | n/f | n/f. ABDM incentive scheme pays digital-solution firms; per-transaction INR 5 is from a single exam-prep source ([21]) | Med in principle. Incentive payouts of INR 26+ crore to digital solution companies as of 2026-06-18 ([21]) | Doctor associations, lab chains, hospital networks | Low |
| Coaching and edtech | n/f | n/f | n/f | n/f | n/f | Not researched (gap) |
| Logistics | Shiprocket-type merchants (see D2C); ONDC has 16 logistics providers (2024, [22]); other counts n/f | n/f | n/f | n/f | n/f | Not researched (gap) |
| Real estate brokers | n/f (RERA agent counts not found) | n/f | n/f | n/f | n/f | Not researched (gap) |
| Agritech and FPOs | n/f | n/f | n/f | n/f | n/f | Not researched (gap) |
| NBFCs and lenders | n/f. RBI Digital Lending Directions 2025 govern [13] | Collections and underwriting. n/f | Vertical AI examples cited: Credgenics, Signzy ([16]) | Med in principle, because the buyer is regulated and has budget | Direct enterprise sales, 9-18 month cycles ([23]) | Low |
| Enterprise BFSI | n/f | n/f | n/f | Enterprise AI startups report sales cycles of 9-18 months ([23]) | Direct sales and pilots. Mid-market firms "start the pilot but do not finish it" ([24]) | Low-Med |
| Export (US and global SMBs) | n/a | n/a | USD pricing | Higher WTP than domestic SMB, per founder commentary. 80-85% of Indian SaaS revenue comes from global customers (one analysis, [25]) | Product-led growth, content, marketplaces | Low-Med |

Reading of the table (inference, Low confidence): CAs and D2C sellers have the best mix of existing software spend and a reachable channel. Kirana and micro-MSME are huge but pay little and churn. Regulated lenders and BFSI pay more but have long sales cycles, which a three-week validation window cannot get through.

## Answers to the key questions

### 1. Which Indian segments actually pay?
See the table. The only segments where I found direct evidence of paying behaviour are small-business accounting and billing (INR 700-18,000/yr list prices, [9]) and e-commerce sellers (Shopify and Shiprocket scale, [19]). For clinics, coaching, logistics, real estate, agritech and NBFCs, I did not find sourced counts or prices. The coaching, logistics, real estate and agritech rows are open gaps and need a follow-up pass. Evidence that MSME digital spend is thin: under 20% of MSME procurement is digital ([5]).

### 2. Pricing models and real prices
- Per-minute voice: Sarvam INR 3.50/min (Growth INR 3.15), telephony about INR 0.40 extra; the official page lists a INR 3.00 Business tier as "coming soon" ([6]). Vapi platform USD 0.05/min, USD 0.08-0.13/min with speech and model providers ([7]). Ringg INR 6 per connected minute ([7]). ElevenLabs Agents about USD 0.08/min ([7]). Bolna: "as low as" INR 4/min on its page; a comparison site says INR 5.52, and YourStory (2025) says INR 7 falling to INR 3 ([7]). Effective INR 6-25/min after connect-rate losses (vendor estimate, [7]).
- Per message: WhatsApp marketing about INR 0.86, utility about INR 0.115-0.35 (blogs conflict), plus 18% GST ([8]).
- Per seat or subscription: Zoho Books INR 899-1,499/month tiers (April 2026, consultancy page); Vyapar INR 1,999/yr; Busy INR 3,600-9,000/yr; Tally about INR 18,000/yr ([9]).
- Take-rate or outcome-based pricing in India: I found no sourced example in this pass.
- India versus export: one analysis says export earns 80-85% of Indian SaaS revenue, led by Zoho, Freshworks, Postman and BrowserStack ([25]). A domestic-versus-export unit-economics model gave LTV/CAC of 8.3x versus 14.9x, but its inputs are unverified ([25]). Indian buyers expect INR pricing and UPI; a claim that INR checkout cuts cart abandonment by up to 40% is unverified marketing ([25]). Cross-border billing has regulatory issues (Mondaq piece, not read in full, [26]).

### 3. Market size
- India tech industry: USD 315B in FY26, up 6.1% ([1]). AI revenue USD 10-12B, a floor by Nasscom's own account ([1]).
- Older Nasscom-BCG forecast: AI market USD 17B by 2027 at 25-35% CAGR ([27]).
- Startup funding (Nasscom-Zinnov 2026 report): USD 9.1B; deeptech USD 2.3B, up 37% ([28]). GenAI startups raised USD 990M in H1 2025 ([29]).
- SaaS: Nasscom (2020) said USD 3.5B revenue in FY20 with 75% from global sales, and forecast USD 13-15B by 2025 ([2]). Ken Research gives about USD 13B domestic in 2025 ([3]). These are forecasts or commercial estimates, so treat them as estimates. I found no measured 2025 or 2026 SaaS revenue figure.
- Indian AI startup funding H1 2026: USD 676M versus USD 1,067M across 157 deals in two different sources, so the figure is uncertain ([15]).

### 4. Distribution and three-week validation
Sourced evidence is thin here. What the sources support:
- One founder-led playbook (a RevenueFast guide built on planning estimates, so Low confidence) suggests picking one beachhead vertical and offering the first 10 customers a 50% lifetime discount in exchange for a case study. It estimates INR 1 lakh MRR in 90-150 days ([30]).
- A September 2026 startup newsletter advises one narrow buyer group and proving that pilots convert to retained paying accounts ([30]).
- WhatsApp is a delivery channel and a rail: the API cost is in [8], and a 2026 blog on WhatsApp plus ONDC kirana onboarding exists ([22], not verified).
- ONDC: official 2024 numbers are 6.38 lakh sellers and 12 million orders in July 2024. 2026 figures conflict (18.4 lakh registered versus about 1.16 lakh active sellers) and I could not verify either ([22]). Do not cite 2026 ONDC numbers in a pitch.
- Inference (Low confidence): realistic three-week validation for a solo founder is 5-10 named conversations in one segment, a clickable or live demo on WhatsApp, 2-3 signed letters of intent or paid pilots at INR 500-5,000, and a measured usage or retention number. Investors cite engagement and retention as the key metrics ([16]).

### 5. Investors
- Peak XV: raised about USD 1.3B across three funds in February 2026 ([14], [31]); the other source in results cites USD 2.85B, so figures conflict ([15]). Quote: "Vertical AI is a mega theme, followed by building for the tooling and infrastructure layers" (Anandan, via CB Insights summary, [15]). Eight of 14 companies in its latest Surge cohort were in AI, six of them applications ([15]).
- Accel: India early-stage fund of USD 650M (Fund VIII, Jan 2025) per a directory listing ([15]). Lightspeed and Elevation: only directory-level descriptions found (applied and enterprise AI; Elevation hiring a US AI lead) ([14]). Blume: described as backing technical founders in AI, SaaS, deeptech (low-authority roundup, [15]).
- Elevation published "The State of AI Adoption in Indian Startups 2026" (ai.elevationcapital.com, [32]); I did not read it, and it is worth a full read.
- Google for Startups Accelerator India 2026: wants Seed to Series A, India-headquartered, core AI products with traction; it picked 20 of about 2,500 applicants ([33]). Traction is a stated eligibility signal.
- What they will not fund: only blog commentary says thin UI layers over Western models are hard to raise, and that agentic AI startups face a funding bottleneck ([14], [15]). No named VC quote. I found nothing on nasscom or HeadStart criteria.

### 6. Regulation
| Rule | Status on 2026-10-31 | Effect on a two-day MVP |
|---|---|---|
| DPDP Act and Rules | Rules notified 2025-11-13. Rules 1, 2 and 17-21 effective on publication. Bulk of obligations (Rules 3, 5-16, 22-23) apply after 18 months, about 2027-05-13 ([10]). Consent-manager timing differs between sources (12 months versus a later notification) | Not yet binding on most obligations, but design for consent and notice from the start. Check Gazette G.S.R. 846(E) |
| IT Rules amendment on synthetic content | In force since 2026-02-20 (notified 2026-02-10, G.S.R. 120(E)). Labelling and metadata "to the extent technically feasible", 3-hour takedown. A May 2026 note says later changes were made, unverified ([11]) | Applies mainly to intermediaries and platforms. If the MVP generates audio, video or images, add visible AI labels |
| IndiaAI Governance Guidelines | Released 2025-11-05, non-binding, no new law or regulator ([12]) | No blocker |
| RBI Digital Lending Directions 2025 | Issued 2025-05-08, replace 2022 and 2023 rules. DLG limits, LSP contracts required ([13]) | Lending MVP would need a regulated-entity partner. Slows a lending product |
| RBI FREE-AI framework | Report dated 2025-08-13; recommends transparency and bias audits. Whether it is binding is unconfirmed ([13]) | Advisory for now |
| TRAI telemarketing | 140 series only for promotional calls and 160 for service. DLT registration required ([34]). AI-voice-specific pre-declaration claims come from vendor blogs only and are unverified ([34]) | Outbound promotional AI calls would be risky and slow. Inbound or service calls are lower risk |
| ABDM and health data | ABDM is consent-based. Whether DPDP health-specific rules exist is unconfirmed ([21]) | Health data is the slowest to clear. Avoid real patient data in a demo |
| Payment rules (RBI PA etc.) | Not covered in my searches | Unknown. Use a PSP sandbox rather than holding funds |

Ruling out or slowing a two-day MVP (inference): outbound promotional voice calling, lending decisions, and anything touching real patient data. Lower risk: document or workflow tools for CAs, seller tooling, and inbound-support agents.

## Things that change how we compete
- Market viability is 20% of the score, and there is no reliable "India SMB software spend" number to quote. A bottom-up sizing from named counts (for example, 98,967 CA firms [20]) with a stated price will look more credible than a top-down press-release figure.
- Voice AI price points are collapsing (INR 3-7/min published). Anything priced per call needs a margin story above those platform costs.
- Domestic SMB willingness to pay is low and export pricing is higher (founder commentary, Low confidence). A product sold in USD to global customers by an India-based founder is a strong alternative framing for investors.
- WhatsApp is cheap to start on but marketing messages cost about INR 0.86 each, so a WhatsApp-first product must be mostly user-initiated (free service windows).
- Only Peak XV has a real quote. Avoid claiming specific investor preferences beyond it.

## Conflicts and uncertainties
- Peak XV fund size: USD 1.3B ([14], [31]) versus USD 2.85B ([15]). I trust USD 1.3B because two independent news items give it for February 2026; the 2.85B may be an earlier fund.
- WhatsApp utility rate: INR 0.115 versus 0.145 versus 0.35 across blogs ([8]). Unresolved; read Meta's rate card.
- Bolna pricing: INR 3-7/min across three sources ([7]). Unresolved. Sarvam's figure comes from its official page, so I trust it most.
- Udyam count: 7.83 crore (28 Feb 2026) versus about 7.9 crore (March 2026 piece). Both are time-stamped; use "over 7.8 crore".
- ONDC 2026 scale: 18.4 lakh registered versus 1.16 lakh active ([22]). Unresolved; use only the 2024 official figures.
- DPDP consent-manager start: 12 months after notification versus a later separate notification ([10]). The main 18-month date is consistent across sources.
- Software price lists differ by 2x between consultancy blogs ([9]).

## Open questions
- Counts and willingness to pay for clinics, coaching, logistics, real estate brokers, agritech and NBFCs: not found. A second pass with sector-specific searches is needed.
- Named VC statements on what they will not fund (Accel, Lightspeed, Elevation, Blume, nasscom, HeadStart): not found. Read Elevation's State of AI Adoption report ([32]) and Peak XV and Accel blog posts directly.
- Real take-rate and outcome-based pricing examples in India: none found.
- Payment aggregator and UPI rules for a startup MVP: not covered.
- Whether the TRAI AI-voice amendment exists in a primary TRAI document: unverified.
- Whether any Gazette change after May 2026 altered the synthetic-content labelling rules.

## Sources
Dates are the date visible in the search result, or "undated" where none was visible. All accessed 2026-10-31 via search results; I did not fetch full pages.
1. Nasscom FY26 outlook, YourStory, https://yourstory.com/enterprise-story/2026/02/india-tech-industry-revenue-to-touch-315-billion-in-fy26-nasscom (2026-02; also AngelOne https://www.angelone.in/news/economy/india-tech-industry-projected-to-reach-315-billion-in-fy26-with-ai-revenues-10-12-billion)
2. Nasscom SaaS FY20 report coverage, https://yourstory.com/2020/07/indian-saas-industry-35b-revenue-startup-nasscom-saasboomi-zinnov (2020-07). Over 5 years old.
3. Ken Research, https://www.kenresearch.com/industry-reports/india-software-as-a-service-saas-market.md (undated; commercial estimate)
4. IBEF on Udyam registrations, https://www.ibef.org/news/over-7-83-crore-enterprises-registered-on-udyam-platforms-indicating-strong-msme-formalisation-growth (2026)
5. MSME digital spend, https://legalsuvidha.com/latest-updates/india-msme-digital-spend-080826 (2026; secondary, cites India SME Forum and Amazon Business)
6. Sarvam voice agents pricing, https://www.sarvam.ai/products/voice-agents/pricing (undated, official)
7. Voice AI price comparisons: https://www.bolna.ai/pricing ; https://caller.digital/blog/voice-ai-vendor-pricing-teardown-india-2026 (2026, vendor) ; https://yourstory.com/2025/11/bengaluru-startup-bolna-ai-voice-infrastructure-enterprises-indian-languages (2025-11)
8. WhatsApp pricing: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing.md (Meta, undated) ; https://whautomate.com/whatsapp-business-api-pricing-india ; https://chatmaxima.com/whatsapp-api-pricing/india/ (2026-07) ; https://baat.ai/blog/whatsapp-api-pricing-india
9. Accounting software prices: https://www.patronaccounting.com/blog/zoho-books-pricing-india-2026 ; https://www.vyaparapp.in/comparison-with-other-apps ; https://www.g2.com/articles/zoho-books-vs-tally-vs-vyapar (2025-02)
10. DPDP Rules: https://yourstory.com/2025/11/digital-personal-data-protection-dpdp-rules-2025-rollout-over-18-months (2025-11) ; https://www.azbpartners.com/bank/indias-digital-personal-data-protection-act-phased-rollout-and-key-compliance-milestones/ (2025-11-14)
11. IT Rules 2026: https://www.hoganlovells.com/en/publications/india-introduces-mandatory-labelling-for-ai-and-3hour-takedown-for-illegal-content ; https://www.businesstoday.in/technology/story/govt-tightens-rules-on-ai-generated-content-mandates-labels-and-faster-takedowns-515505-2026-02-10 (2026-02-10)
12. AI Governance Guidelines: https://www.mondaq.com/article/1707626 ; https://bestmediainfo.com/mediainfo/mediainfo-digital/meitys-new-ai-governance-guidelines-set-seven-sutras-and-a-six-pillar-framework-10626308 (2025-11)
13. RBI Digital Lending Directions 2025: https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12848 (2025-05-08, official) ; FREE-AI: https://www.mondaq.com/india/financial-services/1672260/rbis-move-toward-ethical-and-responsible-ai-in-financial-sector (2025)
14. Peak XV raise: https://nextbillion.net/news/peak-xv-raises-1-3-billion-doubles-down-on-ai-as-global-vc-rivalry-in-india-heats-up/ ; https://www.whalesbook.com/news/English/tech/Peak-XV-Raises-dollar13B-Fund-Smaller-Size-AI-Focus-Signals-VC-Shift/6998c235c364d0dd7857c673 (2026-02)
15. Investor roundups and CB Insights summary: https://www.peony.ink/blog/top-investors-india ; https://aitechnews.in/ai-startup-funding-india-vc-trends-2026/ ; https://www.cbinsights.com/investor/sequoia-capital-india (low authority except CB Insights quote)
16. ThePrint on VCs and AI, https://theprint.in/ground-reports/meet-the-vcs-powering-indias-ai-boom-old-rules-arent-working-anymore/2847737 (undated in result, likely 2026)
17. Kirana count, https://www.indiaretailing.com/?p=135604 and others (industry and press estimates, undated)
18. PayNearby MSME Digital Index 2026, https://knnindia.co.in/news/newsdetails/msme/upi-aadhaar-drive-61-of-msme-retail-transactions-report (2026)
19. D2C data: https://aapta.typeflo.io/posts/shopify-merchant-count-in-india-2025 ; https://sacra.com/research/shopify-of-india (vendor and analyst blogs)
20. ICAI member and firm counts: https://www.jurishour.in/columns/india-has-around-4-23-lakh-active-ca/ ; https://finance.careers360.com/articles/icai-student-and-member-report-2025 (2025-03)
21. ABDM: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202676912801.pdf (PIB, 2026-07) ; https://anantamias.com/ayushman-bharat-digital-mission/ (secondary)
22. ONDC: https://www.siasat.com/ondc-onboards-over-6-lakh-sellers-enables-1-2-crore-orders-per-month-3090094 (2024-09) ; https://richautomate.in/blog/whatsapp-ondc-kirana-seller-onboarding-india-2026 (2026, unverified)
23. Enterprise sales cycles: https://indiaspora.org/wp-content/uploads/2026/03/Top100AIStartupsIndia.pdf (2026-03; via search summary)
24. YourStory on vertical intelligence, https://yourstory.com/ai-story/beyond-horizontal-ai-why-indian-enterprises-need-vertical-intelligence (undated)
25. Export and domestic SaaS: https://www.efinancialmodels.com/?p=650326 ; https://www.efinancialmodels.com/?p=653269 ; https://echai.ventures/startingup/pricing-packaging/how-should-i-price-for-the-indian-market-versus-global-customers (low authority)
26. https://www.mondaq.com/india/contracts-and-commercial-law/1651904/regulatory-gotchas-in-cross-border-saas-billing-models (2025; not read)
27. Nasscom-BCG AI market forecast, https://www.dealstreetasia.com/?p=384342 (2024)
28. Nasscom-Zinnov Start-up Report 2026, https://d3r3sr3o54kk15.cloudfront.net/s3fs-public/media_pdf/Nasscom%20%E2%80%93%20Zinnov%20Tech%20Start-up%20Report%202026_India%E2%80%99s%20Tech%20Start-ups%20at%20a%20Strategic%20Inflection%20Point%20as%20Funding%20Rises%20to%20%249.1%20Bn.pdf (2026)
29. Nasscom GenAI startup landscape, https://www.entrepreneur.com/en-in/news-and-trends/funding-infra-gaps-persist-as-indias-genai-ecosystem/496026 (2025)
30. Founder-led sales playbooks: https://revenuefast-web.pages.dev/grow/b2b-saas-first-$1K-mrr (vendor blog) ; https://blog.mean.ceo/?p=10516 (2026-09)
31. Peak XV blog, https://www.peakxv.com/blog (undated)
32. Elevation, https://ai.elevationcapital.com/stateofaiadoption (2026; not read)
33. Google for Startups Accelerator India, https://startup.google.com/programs/accelerator/india/ ; https://inc42.com/buzz/meet-the-20-startups-selected-for-googles-india-startup-accelerator-2026/ (2026)
34. TRAI: https://connectbroadband.in/cms/TRAI%20Guidelines%20for%20PEs%20-%2018%20June%202024.pdf (2024-06-18) ; https://www.ringg.ai/voice-ai-compliance-india (vendor, unverified) ; https://ssrana.in/articles/trais-crackdown-on-spam-calls-and-ai-driven-telemarketing/ (2026-03)
