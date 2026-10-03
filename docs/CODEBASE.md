# Sundee Fundee Web — Codebase Guide

Detailed documentation for the `sundeefundee.com` marketing site. The native iOS
app is the product; this website exists to market it, rank for strength-training
search queries, accept donations, and host printable workout plans.

Last reviewed: 2026-10-02 (134 blog articles on `main`, commit `2c1a1dc`).

---

## 1. Stack at a glance

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.2.4 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Hosting | Cloudflare via `@opennextjs/cloudflare` (worker + static assets) |
| Payments | Stripe (donation checkout + webhook) |
| Persistence | Supabase (optional, donation records only) |
| Markdown | `react-markdown` + `remark-gfm` (blog bodies) |
| Analytics | Cloudflare Web Analytics beacon (gated on `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`) |
| Tests | Vitest (unit/component), plus standalone Node SEO audit scripts |
| Fonts | Playfair Display (display) + Inter (body) via `next/font` |

Everything that renders a public page is statically generated at build time
(`generateStaticParams` + `dynamicParams = false` on dynamic routes). The only
runtime server code is the donation API routes.

## 2. Commands

```bash
npm run dev            # local dev at http://localhost:3000
npm run build          # Next production build (also the CI gate)
npm run lint           # eslint
npm run typecheck      # tsc -p tsconfig.typecheck.json --noEmit
npm test               # vitest unit/component suites
npm run test:metadata  # scripts/seo-metadata-audit.mjs (title/description quality)
npm run test:seo       # scripts/seo-pages-validation.mjs (sitemap/schema/routes)
npm run preview        # OpenNext Cloudflare preview (local worker)
npm run deploy         # OpenNext Cloudflare deploy
```

CI (`.github/workflows/ci.yml`) runs `npm ci → lint → typecheck → build` on
every push/PR to `main`. Note that blog content validation (`loadPosts` throws
on invalid articles) executes during `build`, so a bad article JSON fails CI.

## 3. Directory map

```text
src/
  app/
    layout.tsx            # root layout: fonts, metadata template, RSS autodiscovery,
                          # optional Google site-verification meta tag, Vercel Analytics
    page.tsx              # marketing home page
    opengraph-image.tsx   # default 1200×630 PNG OG card served at /opengraph-image
    robots.ts             # /robots.txt (allow all except /api/, sitemap pointer)
    sitemap.ts            # /sitemap.xml (composed from all content registries)
    rss.xml/route.ts      # RSS 2.0 feed of all blog posts
    error.tsx / loading.tsx / not-found.tsx / globals.css / favicon.ico
    [seoSlug]/page.tsx    # 27 programmatic SEO landing pages (from lib/seo-pages.ts)
    blog/
      content/*.json      # 134 article JSON files — the content source of truth
      posts.ts            # loader + validation + trust-metadata synthesis
      taxonomy.ts         # 5 topics, primary-topic resolution, related posts
      discovery.ts        # client-side filter/sort/pathway logic for the blog index
      post-enhancements.ts# per-slug articleIntent + interactiveModules registry
      page.tsx            # /blog index (featured post, topic cards, BlogLibrary)
      [slug]/page.tsx     # article page (JSON-LD, trust blocks, internal links, CTAs)
      [slug]/opengraph-image.tsx  # dynamic 1200×630 PNG OG image per article
      topic/[topic]/      # topic hub pages (/blog/topic/<slug>)
    tools/                # /tools index + /tools/[tool] interactive tools (5)
    workout-plans/        # /workout-plans index + /workout-plans/[plan] PDF landing pages (6)
    authors/[author]/     # author profile pages (E-E-A-T)
    api/
      donations/checkout/ # POST → Stripe Checkout session
      stripe/webhook/     # Stripe webhook → optional Supabase persistence
    # Marketing/product pages: recovery-aware-strength-training, for-women-who-lift,
    # apple-health-strength-training-app, garmin-strength-training-app,
    # train-around-injury, science, methodology, faq, apps, about, roadmap,
    # support (+ support/eyebreak20), donate (+ donate/success|cancel)
    # Legal: privacy, terms, eula
  components/
    SiteHeader / SiteFooter / AppStoreButtons / JsonLd / Markdown
    blog/BlogLibrary.tsx        # "use client" search/filter/sort UI for /blog
    blog/BlogInteractiveModule.tsx  # renders the 6 interactive module types
    tools/*               # ReadinessScoreCalculator, DeloadPlanner, RpeRirChart,
                          # CycleSymptomWorkoutModifier, OneRepMaxReadinessChecklist
    science/*             # ScienceRecommendationSimulator
    TrustSignals, AppComparison, HomeProductPreview, TrainingLifestyleGallery, ReadinessAdvisor
  lib/
    site.ts               # SITE_URL, SITE_TITLE, description, App Store URL, OG path
    seo.ts                # JSON-LD builder functions (see §6)
    seo-pages.ts          # 27 SEO landing page definitions (~1,600 lines)
    topic-hubs.ts         # long-form content for the 5 topic hub pages
    internal-linking.ts   # topic → hub/product/SEO-page link maps + sibling articles
    authors.ts            # author profiles (incl. "sundee-fundee-editorial-review")
    og-card.tsx           # shared 1200×630 OG card design used by opengraph-image routes
    metadata-quality.ts   # title/description scoring rules used by audits & tests
    search-console-opportunities.ts  # CTR/impression/position tier scoring
    apps.ts, science.ts, training-tools.ts, workout-plans.ts  # content registries
    app-store-links.ts    # App Store URL builders with UTM params
    donations/            # checkout.ts, webhook.ts, supabase-admin.ts
  middleware.ts           # 308-redirects any uppercase path to lowercase
supabase/migrations/      # donations table schema
public/
  Logo.jpeg, og-image.svg
  workout-plans/          # 6 plan PDFs + cover PNGs
  app-screenshots/, lifestyle-videos/  (mp4 + poster jpg)
scripts/
  seo-metadata-audit.mjs  # loads seo-pages.ts + blog posts, audits meta quality
  seo-pages-validation.mjs# sitemap/schema/route validation
  generate_*_printable.py # generators for the printable plan PDFs
.claude/skills/cycle-aware-seo-blog-writer/   # the daily article automation skill (§8)
docs/
  CODEBASE.md             # this file
  seo/search-console-workflow.md             # monthly GSC review workflow
  superpowers/plans|specs/                   # historical planning docs
```

## 4. Blog content system

### 4.1 Storage and schema

Articles are individual JSON files in `src/app/blog/content/` (one file per
slug, 134 files as of 2026-10-02). Schema (`BlogPost` in `posts.ts`):

| Field | Required | Notes |
| --- | --- | --- |
| `slug` | ✓ | must be unique; filename convention |
| `title`, `description` | ✓ | description doubles as meta description |
| `author` + `authorSlug` | ✓* | `authorSlug` added by loader; `author` must match the profile name in `lib/authors.ts` |
| `publishedAt` | ✓ | `YYYY-MM-DD`; cannot be in the future |
| `updatedAt` | – | cannot predate `publishedAt` |
| `readMinutes` | ✓ | convention ≈ words ÷ 160, rounded |
| `tags` | ✓ | free-form strings; drive topic + source selection |
| `primaryTopic` | – | explicit topic override, else inferred from tags |
| `bestFor` | – | one-line audience statement shown in discovery UI |
| `articleIntent` | ✓* | one of 7 intents (`protocol`, `decision-guide`, `metric-explainer`, `checklist`, `symptom-audit`, `timeline`, `compare-options`) — supplied via `post-enhancements.ts` |
| `interactiveModules` | ✓* | 1+ module (`decision-guide`, `readiness-check`, `timeline`, `comparison-cards`, `modification-checklist`, `metric-explainer`) with placement `before-body` / `after-intro` / `before-cta` |
| `body` | ✓ | Markdown string, rendered with `react-markdown` + GFM |
| `sources` | – | `{title, url, publisher}[]`; synthesized if absent (below) |
| `reviewedBy` / `reviewedAt` | – | required for health-adjacent posts (below) |

\* Required by validation but injected from `post-enhancements.ts` /
`buildTrustMetadata` rather than stored in every JSON file.

### 4.2 Build-time validation

`loadPosts()` runs at module import (i.e., during every build). It rejects the
build when any article has: bad dates, future `publishedAt`, unknown
`authorSlug`, author/Slug mismatch, missing sources, invalid source URLs
(https only), health-adjacent posts lacking review or 2+ sources, missing
`articleIntent` or `interactiveModules`, malformed interactive modules, or a
duplicate slug. `BLOG_VALIDATION_DATE` env var can pin "today" for tests.

### 4.3 Trust metadata synthesis (E-E-A-T)

- Every post gets `authorSlug: "sundee-fundee-team"`.
- `isHealthAdjacentPost()` checks tags against `HEALTH_ADJACENT_TAGS` (20
  health-related tags) plus `SLUG_SOURCE_KEYS`. Health-adjacent posts must be
  `reviewedBy: "sundee-fundee-editorial-review"` with a `reviewedAt` date and
  ≥ 2 sources; the article page renders a "Medical boundary" notice for them.
- Sources: if a post has no `sources` array, `buildSourcesForPost` pulls up to
  4 entries from a curated `SOURCE_LIBRARY` (16 vetted references: ACSM, CDC,
  NIH ODS, OWH, ACOG, MedlinePlus, Apple) keyed by the post's tags and slug.
- The article page shows author bio, reviewer + date, methodology link, and
  the sources list; `buildBlogPostingJsonLd` emits all of it as schema.org.

### 4.4 Taxonomy and discovery

- 5 topics in `taxonomy.ts`: Recovery & Readiness, Training Around Pain,
  Women Who Lift, Wearables & Health Data, Programming Basics. Each has a hub
  page (`/blog/topic/<slug>`), tag-match rules, and a product-page CTA.
- `getPrimaryTopic` uses `primaryTopic` or the first matching tag; falls back
  to Programming Basics.
- `getRelatedPosts` scores candidates by shared topic (+100), shared tags
  (+10 each), and matching `articleIntent` (+20).
- The `/blog` index ships all posts to `BlogLibrary` (client component) for
  search, topic/intent filtering, sorting, and 4 curated "pathways"
  (`discovery.ts`). Search matches title, description, `bestFor`, topic label,
  and intent label only — not body text or tags.

## 5. Programmatic page families

| Family | Count | Source registry | Notes |
| --- | --- | --- | --- |
| SEO landing pages (`/[seoSlug]`) | 27 | `lib/seo-pages.ts` | comparison / feature / program / hub kinds; FAQ + comparison-table + workflow sections; `priority` per page feeds the sitemap |
| Topic hubs (`/blog/topic/[topic]`) | 5 | `blog/taxonomy.ts` + `lib/topic-hubs.ts` | long-form intro, start-here links, related SEO pages/tools |
| Tools (`/tools/[tool]`) | 5 | `lib/training-tools.ts` | genuinely interactive calculators; `WebApplication` JSON-LD |
| Workout plan landing pages (`/workout-plans/[plan]`) | 6 | `lib/workout-plans.ts` | PDF download + sample week + FAQs + `CreativeWork` JSON-LD |
| Author profiles (`/authors/[author]`) | — | `lib/authors.ts` | `ProfilePage` JSON-LD with `knowsAbout` + article list |
| Blog articles (`/blog/[slug]`) | 134 | `blog/content/*.json` | see §4 |

## 6. SEO infrastructure

### 6.1 Sitemap, robots, RSS

- `src/app/sitemap.ts` composes: home + 16 static pages + 27 SEO pages +
  5 topic hubs + 5 tools + 6 plan pages + author pages + 134 posts, each with
  `lastModified` (from `updatedAt`/`publishedAt` or registry dates),
  `changeFrequency`, and `priority`.
- `robots.ts`: allow all, disallow `/api/`, sitemap pointer, host directive.
- `rss.xml/route.ts`: RSS 2.0 with all posts (title/link/guid/description/
  pubDate); declared in `<head>` via `alternates.types` in the root layout.
- `middleware.ts`: 308-redirects any non-lowercase path to lowercase
  (skips `/api/`, `/_next/`, and paths containing dots).

### 6.2 Structured data

`src/lib/seo.ts` provides builders for: `Organization`, `WebSite` (with a
`SearchAction` targeting `/blog?query={search_term_string}`),
`SoftwareApplication` (enhanced variant with overrides), `WebPage`,
`CreativeWork` (plan PDFs), `BlogPosting` (with citation list, wordCount,
keywords, articleSection), `ProfilePage`, `WebApplication` (tools),
`FAQPage`, `ItemList`, `BreadcrumbList`. Pages compose them via the small
`<JsonLd data={...} />` component.

### 6.3 Metadata and canonical URLs

- Root layout sets `metadataBase`, title template `%s · Sundee Fundee`, RSS
  alternates, and the optional Google verification meta tag.
- Every page exports `metadata` (or `generateMetadata`) with canonical
  `alternates`, OpenGraph, and Twitter card tags.
- Blog posts get dynamically generated 1200×630 PNG OG images via
  `next/og` (`ImageResponse`) at `/blog/[slug]/opengraph-image`, branded per
  topic. The site root, SEO landing pages, tools, and topic hubs each have
  their own `opengraph-image.tsx` built from the shared `src/lib/og-card.tsx`
  design; everything else shares the root `/opengraph-image` PNG via
  `SITE_OG_IMAGE_PATH`.

### 6.4 SEO quality gates

- `npm run test:metadata` (`scripts/seo-metadata-audit.mjs`) transpiles and
  loads `seo-pages.ts` in a VM, then audits every SEO page and blog post meta
  title/description against `lib/metadata-quality.ts` rules (length,
  duplication, brand inclusion, keyword placement).
- `npm run test:seo` (`scripts/seo-pages-validation.mjs`) validates sitemap
  coverage, JSON-LD presence, canonical URLs, and route contracts.
- `lib/search-console-opportunities.ts` scores GSC export rows into
  priority tiers per `docs/seo/search-console-workflow.md`: high =
  ≥1000 impressions, CTR < 1%, position ≤ 12 (title/description/intro rewrite
  + internal links + reindex request); medium = ≥500 / <2% / ≤ 20.

### 6.5 Internal linking model

`lib/internal-linking.ts` maps each of the 5 topics to three link targets —
topic hub, product page, and one SEO landing page — plus 3 sibling articles
from `getRelatedPosts`. Every article page renders a "Next useful links"
grid with these; SEO pages and topic hubs get the reverse direction via
`getSeoPageInternalLinks` / `getTopicHubDecisionLinks`. Topic→SEO-page
membership is encoded in `SEO_PAGE_TO_TOPIC`. Links between articles are
block-level (link sections), not in-body contextual links.

## 7. Donations (Stripe + Supabase)

- `POST /api/donations/checkout` (`lib/donations/checkout.ts`): requires
  `STRIPE_SECRET_KEY`; resolves the site URL from `SITE_URL` /
  `NEXT_PUBLIC_SITE_URL` or request headers; creates a Stripe Checkout
  Session and returns its URL. `/donate/success` and `/donate/cancel` handle
  returns.
- `POST /api/stripe/webhook` (`lib/donations/webhook.ts`): optionally verifies
  `STRIPE_WEBHOOK_SECRET` and persists donation records to Supabase with
  `SUPABASE_SERVICE_ROLE_KEY` (`supabase/migrations/20260428000000_donations.sql`).
  All Supabase usage is optional; the page surface works without it.

## 8. Content automation pipeline

The repo carries `.claude/skills/cycle-aware-seo-blog-writer/` — a skill that
an unattended weekday task (workspace automation, cron `0 9 * * 1-5` ET)
follows end-to-end:

1. PR preflight (GitHub auth, branch check; auto-creates `blog/<date>-<topic>`
   branch off `main`).
2. `discover_recent_articles.py` lists the latest 20 article JSONs.
3. Cadence rule: with `N = total_articles + 1`, if `N % 3 == 0` the article
   must center on the menstrual cycle / women's-health performance.
4. Gap analysis over the recent 20 (topics, keywords, angles, links, sources).
5. Draft a 1,200+ word article in the repo JSON schema, add a
   `post-enhancements.ts` entry (articleIntent + interactive modules), map
   internal cross-references and external sources.
6. Verify: `npm test`, `npm run build`, `test:metadata`, `test:seo`.
7. Commit, push, open a PR; merge after checks pass (recent examples: PRs
   #116–#118).

State as of 2026-10-02: 134 articles; the next cycle-required slot is 135.
The topic space is saturated enough that new runs should check the full slug
list, not just the last 20.

## 9. Testing

- **Vitest** (`npm test`, `vitest.config.ts` scopes to `src/**`): registry
  content tests (`apps`, `workout-plans`, `workout-plan-pages`,
  `training-tools`, `science`, `app-store-links`), SEO tests
  (`metadata-quality`, `seo-pages-quality`, `search-console-opportunities`),
  blog tests (`posts`, `discovery`, `taxonomy`, internal-linking), and
  component tests (`BlogInteractiveModule`,
  `ScienceRecommendationSimulator`).
- **Content gate**: `loadPosts()` throws at build time on any invalid article.
- **SEO scripts**: `test:metadata`, `test:seo` (run manually / by the
  automation before PR).
- **CI**: lint + typecheck + build on every PR and push to `main`.
- `playwright-report/`, `test-results/`, `videos/` at the repo root are
  leftovers from a removed e2e suite (see CHANGELOG: the in-browser training
  app surface and its Playwright specs were removed); no e2e specs exist now.

## 10. Assets and caching

`next.config.ts` sets `Cache-Control: public, max-age=86400,
stale-while-revalidate=604800` on `/app-screenshots/*`, `/lifestyle-videos/*`,
plan PDFs and covers, `/Logo.jpeg`, and `/og-image.svg`. Hero videos are
self-hosted MP4s with poster JPGs. `Logo.jpeg` is ~460 KB (unoptimized).
There is no PWA manifest (removed with the old web-app surface); the only icon
is `favicon.ico`.

## 11. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | for donations | Stripe Checkout |
| `STRIPE_WEBHOOK_SECRET` | no | webhook signature verification |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | no | donation persistence |
| `SITE_URL` / `NEXT_PUBLIC_SITE_URL` | no | Stripe redirect override |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | Search Console meta tag |
| `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | no | Cloudflare Web Analytics beacon (build-time) |
| `BLOG_VALIDATION_DATE` | no | pins "today" for blog validation in tests |

## 12. Deployment

`npm run deploy` → `opennextjs-cloudflare build && deploy`. `wrangler.jsonc`
points at `.open-next/worker.js` with `nodejs_compat`, an `ASSETS` binding, and
observability enabled. Static assets are served from `.open-next/assets`.
Cloudflare env secrets (Stripe, Supabase) are configured in the dashboard, not
in the repo.

## 13. Known gaps

Fixed on the `fix/audit-defects` branch (2026-10-02):

1. **Site search action.** The `WebSite` JSON-LD advertised
   `SearchAction → /blog?query={search_term_string}` but the blog library
   ignored the parameter. `BlogLibrary` now reads `?query=` via
   `useSyncExternalStore` and mirrors edits back with `history.replaceState`.
2. **SVG Open Graph image on non-blog pages.** Replaced with PNG cards: a
   shared `next/og` helper (`src/lib/og-card.tsx`) backs
   `opengraph-image.tsx` routes for the root site, SEO landing pages, tools,
   and topic hubs; `SITE_OG_IMAGE_PATH` points at `/opengraph-image`.
   `/og-image.svg` remains on disk for legacy links only. Workout-plan pages
   keep their real cover PNGs.
3. **Analytics.** `@vercel/analytics` records nothing on Cloudflare. Replaced
   with the Cloudflare Web Analytics beacon in the root layout, gated on
   `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` (create the token in the
   Cloudflare dashboard under Web Analytics and set it as a build-time env
   var — NEXT_PUBLIC_* values inline at build). The dead `track()` calls were
   removed with the dependency.

Still open:

4. **Search haystack is narrow.** `matchesSearch` in `discovery.ts` checks
   title/description/bestFor/topic/intent labels — not article bodies or tags.
5. **No web manifest / apple-touch-icon / modern icon set** (removed with the
   old PWA surface; only `favicon.ico` remains).
