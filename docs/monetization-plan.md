# Monetization plan: $1,000/month (written 2026-08-19)

## Context

What exists today (verified in `site/` and `French/README.md`):
- 6 full A1→C2 courses (FR/DE/RU/IT/ES + English-for-Spanish-speakers), 60–65 lessons each = **374 lessons, ~3,700 exercises**, 7 exercise types, SRS flashcards, glossary, pre-generated neural audio (~11.5k clips), printable markdown per lesson, offline-capable, no build step.
- Real differentiators to sell on: (a) goes all the way to **C1/C2** (Duolingo stalls ~B1), (b) explanatory textbook-style grammar rather than gamified guessing, (c) English course written *in Spanish* for Spanish speakers, (d) lifetime/offline vs subscription. You also have TEFL methodology notes in `English/TEFL/` — usable as an "about the author" credibility page and a possible teacher-facing angle later.
- Static GitHub Pages site, **no** analytics, custom domain, SEO (title is just "Language Courses", no description/OG/sitemap/robots), email capture, accounts, payments, or landing/marketing copy. Lessons are reached client-side, so Google can index essentially one page.
- Another agent is concurrently reworking layout/usability in `site/` — this plan deliberately keeps monetization/growth work in **new files** (or small additive hooks) to avoid stepping on that.

Honest framing: the product is genuinely large and usable; what's missing is every layer between "exists" and "earns": discoverability, a reason to give an email, and a way to pay. Payments are the easy, ~1-day part. Traffic is the hard part and everything below is ordered around it.

## The math (so the goal is concrete)

| Model | Needed for $1k/mo |
|---|---|
| One-time $29 per language / $59 all-six lifetime | ~25–35 sales/mo |
| $6/mo subscription | ~170 active subs (slow to build, churn) |
| Mixed: ~$600 one-time sales + ~$250 affiliates (italki/Lingoda/Babbel) + ~$150 PDF/Anki-deck sales | most realistic |

At a typical 1–2% visitor→buyer conversion for free-to-paid content, that means **~3,000–5,000 engaged monthly visitors**. So the plan is: (1) make the site indexable and shareable, (2) capture emails, (3) add payments with a paywall that doesn't kill the free funnel, (4) stack small extra revenue streams.

## Recommended pricing / paywall

- **Free:** all of A1 + A2 for every language (~20 lessons each) — enough to prove quality and rank in search.
- **Paid (one-time, lifetime):** B1→C2 unlock. $29/language, $59 all six. One-time beats subscription here: no backend needed for entitlement, no churn, and "lifetime" is a strong differentiator vs Duolingo/Babbel subscriptions.
- **Bonus paid perks** (cheap to build, justify the price): downloadable audio packs, printable PDF of all lessons, Anki deck export, cross-device progress sync (only if Supabase is added, see Phase 3).
- Payment processor: **Lemon Squeezy** (merchant of record → handles EU VAT/global sales tax; Gumroad-style checkout overlay; license keys built in). Stripe alone would make you the tax-handler.

## Phases

### Phase 0 — Measure & capture (1–2 days, do first, zero conflict with the redesign)
1. Buy a domain (e.g. `<brand>.com`), point GitHub Pages at it (`site/CNAME`). Pick a brand name — "Language Courses" is unsearchable.
2. Analytics: Plausible/Cloudflare Web Analytics/GoatCounter (one `<script>` in `site/index.html` + `site/english/index.html`). Track events: lesson opened, lesson completed, level reached, CTA clicked.
3. Email capture: Buttondown or ConvertKit form. Placement: after finishing lesson 3 and on the dashboard ("Get the A1 verb cheat-sheet PDF"). Lead magnet = auto-generated PDF from existing markdown lessons (`French/output/lessons/` etc. already exist — use `md-to-pdf`/pandoc).
4. Feedback hook: tiny "Was this lesson clear? 👍👎 + textbox" at lesson end (posts to a Formspree/Cloudflare Worker). Doubles as testimonial source and accuracy QA for AI-authored content.

### Phase 1 — Become indexable (the biggest lever; ~1 week)
Goal: 390 lessons = 390 long-tail SEO landing pages ("passé composé with être explained", "German dative prepositions exercises", "ejercicios present perfect en inglés").
1. New script `site/tools/gen-static.js`: for every lesson in every language, render a **static HTML page** at `site/<code>/lessons/<slug>.html` with real `<title>`, meta description, OG tags, `<h1>`, lesson text (explanations, vocab tables, dialogues), and a CTA "Open this lesson interactively (exercises + audio)" that deep-links into the app. Reuse the existing markdown output (`<Lang>/output/lessons/*.md`) or the lesson data files — whichever the smoke-test already proves render headlessly.
2. `sitemap.xml`, `robots.txt`, canonical tags, JSON-LD `Course` schema per language.
3. Make app routes deep-linkable (`#/fr/lesson/12`) so shared links land on the lesson, not the dashboard (coordinate with the layout agent — small change in `loader.js`/`app.js`).
4. Language landing pages (`/french/`, `/german/`, …) with proper copy: "Complete French A1→C2 course, 65 lessons, free A1–A2, lifetime access $29". Submit to Google Search Console + Bing.
5. Submit English-for-Spanish-speakers pages in **Spanish** (`lang="es"`, Spanish meta) — lower SEO competition and a very large market; this is probably the best single course to push.

### Phase 2 — Launch & distribution (ongoing, starts the day Phase 1 ships)
Each is a one-off post or a repeatable habit; prioritized by expected return:
1. **Reddit** (biggest near-term traffic): r/languagelearning, r/French, r/German, r/russian, r/italianlearning, r/Spanish, r/learnspanish, r/aprenderingles / r/EnglishLearning. Angle: "I built a free A1–C2 textbook-style course with audio, exercises and SRS — no streaks/gamification, works offline." Follow each sub's self-promo rules; post as a resource, answer questions in comments. Ask mods to add to sub wikis/resource lists (permanent traffic).
2. **Show HN**: the "no build step, 390 lessons, static, offline, neural audio pipeline" story is HN-friendly. **Product Hunt** same week.
3. **Anki decks** per level posted to AnkiWeb shared decks with a link back — evergreen traffic from exactly the right audience.
4. **YouTube/TikTok shorts** (optional, higher effort): 60-second "one grammar point" clips reading from a lesson, link in bio.
5. Comparison/alternative pages: "Duolingo alternative for French", "Babbel vs self-study" — cheap SEO content.
6. Monthly email to the list: new lesson/feature, one free tip, one paid CTA.

### Phase 3 — Payments & gating (~2–3 days, can start in parallel with Phase 1)
1. Lemon Squeezy store: 6 products + "All languages" bundle; lifetime license keys.
2. Gating in app: B1+ lessons render the first section then a lock card with checkout overlay (`loader.js` hook, not `app.js` to keep the smoke test clean). Entitlement check: license key → small **Cloudflare Worker** calling LS `licenses/validate`, result cached in `localStorage` (`siteLicense.v1`) and re-validated weekly. Keep it simple; content is in client JS anyway — the paywall is for honest people, which is fine at this scale.
3. Optional but valuable: **Supabase** (free tier) for magic-link accounts + syncing the existing per-language progress/SRS `localStorage` keys. This makes "lifetime access on all devices" a real benefit and gives you emails automatically. Do this only after first sales prove demand.
4. Extra SKUs on the same store: full-course PDF ($15), audio pack, Anki deck bundle — generated from existing assets, zero marginal work.
5. Affiliate links (italki, Preply, Lingoda) in a "Practice with a tutor" card after lessons — ~$10–30/referral; realistic few-hundred $/mo once traffic exists.

### Phase 4 — Iterate on data (month 2+)
- Watch funnel: landing → lesson 1 → lesson 5 → A2 done → paywall seen → purchase. Fix the biggest drop-off.
- Double down on whichever language converts (likely English-for-Spanish or Spanish/French).
- Collect and show testimonials from the feedback hook; add a "reviewed by native speaker" note per language if you can get one (Fiverr/Upwork reviewer pass on top 10 lessons — cheap credibility, important for AI-authored content).

## Things that won't move the needle (skip)
- Subscription before there's traffic; mobile apps; building a community/Discord first; more languages; more UI polish beyond what the other agent is doing.

## Realistic timeline
- Month 1: Phases 0–1–3 shipped, Reddit/HN launch → first sales (likely $50–300).
- Months 2–6: SEO compounds, list grows; $1k/mo is plausible around month 4–8 if 2–3 launches land and lesson pages index. If traffic stalls at month 3, the fix is content distribution (Reddit wikis, Anki, Spanish-language channels), not more features.

## Verification
- Analytics dashboard shows visitors + events within 24h of Phase 0.
- `curl` a generated lesson page: proper title/meta; Google Search Console shows pages indexed within ~2 weeks; `site:<domain>` returns hundreds of pages.
- Test purchase end-to-end in Lemon Squeezy test mode → license validates via Worker → B1 lesson unlocks; clearing `localStorage` + re-entering key re-unlocks.
- `node tools/smoke-test.js` still passes (gating lives in loader.js).

## Status log
- 2026-08-19 — Phase 1 steps 1–2 done: `tools/gen-static.js` (static lesson pages, course landings, sitemap, robots), commit 951d89e. Remaining Phase 1: deep-linkable routes are handled by the CTA buttons; landing-page copy + index.html meta/OG + Search Console submission still to do. Phase 0 needs accounts (domain, analytics, email).
