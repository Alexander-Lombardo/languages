# 30-day execution schedule: language site → first revenue (toward $1k/mo)

## Context

Goal: $1,000/month from the language-course site (`site/`, 6 courses A1→C2, 374 lessons, GitHub Pages, no backend).
Strategy (agreed 2026-08-19, saved in `site/docs/monetization-plan.md`): free A1–A2, one-time lifetime unlock for B1–C2 ($29/language, $59 all six) via Lemon Squeezy; traffic from SEO lesson pages + launches (Reddit/HN/PH/Anki); email list; small extra SKUs + affiliates.

Already done (commits `951d89e`, `fbf5dec`): `tools/gen-static.js` → 380 crawlable lesson/course pages, `sitemap.xml`, `robots.txt`, `pages.css`, `sync.js` hook, plan doc.

This file subdivides the remaining work into a **30-day schedule** (Day 1 = the day you start, assume ~2–3 focused hours/day). Tasks are tagged:
- **[YOU]** — needs a human: accounts, money, posting under your name, decisions.
- **[AGENT]** — code I can do in this session (coordinate with the layout agent on shared files).
- **[LONG]** — starts inside 30 days but pays off after (indexing, list growth, affiliates).

Definition of done for day 30: site on its own domain, indexed, measuring, capturing emails, accepting payments with B1+ gated, launched on ≥4 channels, first sales in.

---

## Week 1 (Days 1–7) — Foundation: domain, measurement, email, on-page SEO

**Day 1 — Brand + domain [YOU, ~1h]**
- Pick a brand name (short, pronounceable, not "Language Courses"). Check .com availability; buy (Cloudflare Registrar or Namecheap, ~$10).
- Decide the pricing you're comfortable with (default: $29/lang, $59 bundle, lifetime). This unblocks copy on every page.
- Create free accounts: Cloudflare (DNS + Web Analytics + Workers), Google Search Console, Bing Webmaster, Buttondown (or ConvertKit).

**Day 2 — Domain live + analytics [YOU 30m, AGENT 1h]**
- [YOU] Point DNS at GitHub Pages (A/AAAA records + CNAME www), enable HTTPS in repo settings.
- [AGENT] `site/CNAME`; regenerate pages with `SITE_URL=https://<domain>` (update `DEFAULT_SITE_URL` in `tools/gen-static.js`); `SITE_BRAND`.
- [AGENT] Add Cloudflare Web Analytics (or Plausible) snippet to `site/index.html` + `site/english/index.html`; custom events in `loader.js`/`english/shell.js`: `lesson_open`, `lesson_done`, `level_reached`, `cta_click`, `paywall_seen`. Smoke test must still pass (keep out of `app.js`).
- [YOU] Submit `https://<domain>/sitemap.xml` in Search Console + Bing. **[LONG]** indexing takes 1–4 weeks.

**Day 3 — index.html SEO + landing copy [AGENT 2h]** (needs layout agent to be done with `index.html`, or do it in their branch)
- `<title>`, meta description, OG/Twitter tags, canonical, JSON-LD `Organization` on `site/index.html` and `english/index.html`.
- Landing page copy on the language picker: headline ("Complete A1→C2 courses, explained in plain English — free to start"), 3 proof points (374 lessons, 3,700 exercises, neural audio, to C2), per-language cards linking to `<code>/lessons/` overview pages, "About the author" line (TEFL background from `English/TEFL/`).
- Link the static pages ↔ app both ways (app lesson footer: "Share this lesson" → static URL).

**Day 4 — Email capture [YOU 30m, AGENT 2h]**
- [YOU] Create Buttondown list + embeddable form; write the 1-paragraph welcome email.
- [AGENT] Lead magnet: `tools/gen-pdf.js` — per-language "A1 verb & phrase cheat-sheet" PDF from existing data (vocab/flashcards of lessons 00–09) via headless Chrome (`--print-to-pdf`) or pandoc from `<Lang>/output/lessons/*.md`. Output `site/<code>/downloads/a1-cheatsheet.pdf`.
- [AGENT] Email card in `loader.js` shell: shown on dashboard + after lesson 3 completion; hidden once `siteEmail.v1` set. Same for English in `english/shell.js`.

**Day 5 — Feedback + testimonials hook [AGENT 1.5h, YOU 15m]**
- [YOU] Create a Formspree form (or Cloudflare Worker → KV) for feedback.
- [AGENT] "Was this lesson clear? 👍 👎 + optional comment" at lesson end (shell layer). Store in localStorage to avoid repeats; POST to the form endpoint.

**Day 6 — Anki decks + shareable assets [AGENT 2h]**
- `tools/gen-anki.js`: per language × level, build `.apkg` from `flashcards` (use `anki-apkg-export` via npx, or write genanki-style SQLite). Include site URL on every card back. Output `site/<code>/downloads/<lang>-<level>.apkg`.
- Verify decks import into Anki desktop.

**Day 7 — Review + buffer**
- Check analytics shows events; check Search Console accepted sitemap; fix anything broken; `node tools/smoke-test.js`; commit + push.
- [YOU] Write 3 variants of the Reddit/HN launch post (keep in `docs/launch-posts.md`).

## Week 2 (Days 8–14) — Payments, gating, first launches

**Day 8 — Lemon Squeezy store [YOU 1.5h]**
- Create store, activate (identity/tax info), 7 products: 6 × "<Language> B1–C2 lifetime" ($29) + "All languages lifetime" ($59). Enable license keys, test mode on. Get store ID + product/variant IDs + API key.

**Day 9 — License validation Worker [AGENT 2h, YOU 20m]**
- [AGENT] `site/tools/worker/license.js`: Cloudflare Worker, `POST /validate {key}` → calls LS `licenses/validate`, returns `{ok, products:[codes], expires}`; CORS locked to the domain; activates key on first use (instance id).
- [YOU] Deploy (`wrangler deploy`), set `LS_API_KEY` secret, give me the Worker URL.

**Day 10 — Paywall in the app [AGENT 3h]**
- `loader.js` (shell, not `app.js`): after `startCourse`, wrap lesson render: if lesson level ∉ {A1, A2} and no valid entitlement for this language → render first section (objectives + vocab) then lock card: price, "what you get", LS checkout overlay (`https://<store>.lemonsqueezy.com/checkout/buy/<variant>?embed=1`), "Already bought? Enter key". Entitlement cached in `localStorage siteLicense.v1`, revalidated weekly via Worker.
- Same for `english/shell.js`.
- Free tier badges in sidebar nav (🔒 on B1+), paywall events to analytics.
- Smoke test still passes; manual test with LS test-mode key.

**Day 11 — Purchase flow polish [AGENT 2h, YOU 30m]**
- Static lesson pages (B1+): add "Unlock B1–C2 — $29 lifetime" line to `gen-static.js` CTA block; course landing: pricing section (free A1–A2 / lifetime unlock).
- [YOU] Post-purchase email in LS (key + how to enter it + link). Switch store from test → live. Do one real $1 test product purchase + refund.

**Day 12 — Launch #1: Reddit [YOU 2h]**
- Post in 2 subs/day max (avoid spam flags): start with r/languagelearning + r/French. Resource-style post, answer every comment for 24h. DM mods to add to wiki/resources.
- [AGENT] Watch analytics; hotfix anything users hit.

**Day 13 — Launch #2: Show HN + Product Hunt [YOU 1.5h]**
- Show HN (morning US time, Tue–Thu): "Show HN: 374-lesson A1–C2 language courses as a static site (no build step, neural audio, works offline)". Product Hunt same day or next.
- Prepare: 3 screenshots, 1 GIF of a lesson (can record with Chrome tools).

**Day 14 — Review + buffer**
- Read all feedback; fix top 3 complaints; check funnel numbers (landing → lesson 1 → lesson 5 → paywall → purchase). First sales likely here.

## Week 3 (Days 15–21) — Distribution depth + extra SKUs

**Day 15 — Reddit round 2 [YOU 1h]** r/German, r/russian, r/italianlearning, r/Spanish + r/learnspanish (spread over days 15–17).

**Day 16 — Spanish-speaking market push [YOU 1.5h, AGENT 1h]**
- [YOU] Post the English course in r/aprenderingles, r/EnglishLearning (Spanish-speaker threads), 2–3 Spanish-language Facebook groups / forums.
- [AGENT] Spanish OG image + copy check on `english/lessons/` pages; "Curso de inglés gratis A1–C2 para hispanohablantes" H1 variants.

**Day 17 — AnkiWeb shared decks [YOU 1h]** Upload the Day-6 decks (one per language, A1 level free) with description + link. **[LONG]** evergreen trickle.

**Day 18 — Extra SKUs [AGENT 2h, YOU 30m]**
- `tools/gen-pdf.js` full-course PDF per language (all 60–65 lessons); LS products "Full PDF" ($15), "Audio pack" ($9, zip of `<code>/audio/`), bundle into the $29/$59 as perks.
- [YOU] Create the products; I wire download links behind license.

**Day 19 — Affiliates [YOU 1h, AGENT 1h]**
- [YOU] Apply: italki, Preply, Lingoda (Impact/PartnerStack). Approval takes days. **[LONG]**
- [AGENT] "Practice with a tutor" card after lesson completion (shell), link slot per language, tracked click event. Ships with placeholder until approved.

**Day 20 — Comparison/SEO content [AGENT 2h]**
- Static pages: `/compare/duolingo-alternative-<lang>/` (6 pages) + `/faq/` from a small data file; added to sitemap by `gen-static.js`. **[LONG]** ranks in weeks.

**Day 21 — Review + buffer.** Newsletter #1 to the list (what's new, one tip, one CTA).

## Week 4 (Days 22–30) — Credibility, conversion, second wave

**Day 22–23 — Native-speaker review [YOU ~$50–150, 2h total]** Hire on Upwork/Fiverr: one native speaker per language reviews lessons 00–09 for errors. Fix the list (I apply corrections to source repos + `sync.js`). Add "Reviewed by native speakers" line on landing/course pages. **[LONG]** (turnaround ~1 week).

**Day 24 — Testimonials + social proof [AGENT 1h]** Pull 👍 comments from Day-5 feedback into a testimonials block on landing + course pages (with permission/first name).

**Day 25 — Conversion pass [AGENT 2h]** Use 2 weeks of funnel data: move the email card, tweak lock-card copy, test $24 vs $29 (LS discount code for email list), add "money-back 30 days" line.

**Day 26 — YouTube/TikTok shorts test [YOU 2h, optional]** 3 sixty-second grammar clips read from lesson pages, link in bio. Only continue if one gets >1k views.

**Day 27 — Reddit round 3 [YOU 1h]** Answer grammar questions in the subs with links to the specific static lesson page (not self-promo posts — genuinely helpful answers). Make this a 15-min daily habit. **[LONG]**

**Day 28 — Supabase sync decision [YOU]** If ≥10 sales by now: **[LONG, next month]** add magic-link accounts + progress/SRS sync (Supabase free tier) as the "lifetime on all devices" perk. If <10: skip, focus on traffic.

**Day 29 — Search Console review [AGENT 1h]** Which lesson pages got impressions? Improve titles/descriptions of the top 20; internal links from landing to them.

**Day 30 — Retro + next-30 plan [YOU + AGENT 1h]** Numbers: visitors, list size, sales, revenue/visitor. Decide: double down on which language/channel.

---

## Things that will take longer than 30 days (expected, not failures)
- Google indexing + ranking of 380 pages: impressions in 2–4 weeks, meaningful clicks in 2–4 months.
- Affiliate approvals + first payouts: 2–8 weeks.
- Email list to a size where a send produces sales (~500+): 2–3 months.
- Reaching $1k/mo itself: realistically month 4–8; month 1 target is **first 5–20 sales + 3k visitors from launches**.
- Native-speaker review of all 374 lessons (do the first 10/language now, rest over time).
- Supabase accounts/sync (only after demand is proven).

## Dependencies / blockers to clear early
- Domain + brand name (Day 1) blocks copy, canonical URLs, LS store name.
- Layout agent finishing `index.html`/`styles.css` blocks Day 3 + Day 10 edits to shared files — alternatively I branch and merge.
- LS store activation (Day 8) can take 1–2 days for identity verification → start it Day 1 if possible.

## Files touched (AGENT tasks)
- `site/index.html`, `site/english/index.html` — meta/analytics/landing copy (shared with layout agent).
- `site/loader.js`, `site/english/shell.js` — email card, feedback, paywall, tutor card, events.
- `site/tools/gen-static.js` — pricing CTAs, compare/FAQ pages, OG image.
- New: `site/tools/gen-pdf.js`, `site/tools/gen-anki.js`, `site/tools/worker/license.js`, `site/CNAME`, `site/docs/launch-posts.md`.
- Never `site/app.js` (smoke test) — shell-layer only.

## Verification
- Each day ends with `node tools/smoke-test.js` passing + manual check in Chrome.
- Day 2: analytics shows pageviews/events; Search Console accepts sitemap.
- Day 10–11: LS test purchase → key → Worker validates → B1 lesson unlocks; clear localStorage, re-enter key, unlocks again; wrong key rejected.
- Day 14 / Day 30: funnel numbers written to `docs/monetization-plan.md` status log.
