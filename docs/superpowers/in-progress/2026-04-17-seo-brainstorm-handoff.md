# SEO Brainstorm — Handoff (paused 2026-04-17)

## How to resume

Start a new Claude session, invoke `superpowers:brainstorming`, then paste this file and say **"resume SEO brainstorm from this handoff."** The skill re-enters at Step 5 (presenting design).

## Status

Mid-brainstorm. Scope locked, Section 1 of the design approved. Waiting on:
- Two factual questions (see below)
- Section 2 and Section 3 approval
- Spec write + user review + implementation plan

## Decisions locked

| # | Decision |
|---|---|
| Scope | **Website-only** technical SEO. Off-site (Google Business Profile, reviews, local citations) is out of scope for this pass. |
| Pages getting full SEO | `/`, `/services/lawn-care`, `/services/flower-beds`, `/services/trimming`, `/services/cleanups`, `/services/winter` |
| Pages getting light SEO | `/recommendations` (title + meta only, stays indexable) |
| Pages going noindex | `/request-confirmation`, `/brand-guide` (`/availability` already is) |
| Service area cities | **Wheaton, Glen Ellyn, Winfield** — use consistently everywhere (schema, meta, copy where applicable) |
| Body copy | **Not touching it.** Only invisible SEO pieces: titles, metas, schema, alt text, canonical, sitemap, robots. |

## Section 1 — titles + metas (approved)

| Page | Title | Meta description |
|---|---|---|
| `/` | `Amigos Landscaping \| DuPage County Lawn Care & Maintenance` | `Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes.` |
| `/services/lawn-care` | `Lawn Care in Wheaton, Glen Ellyn & Winfield \| Amigos` | `Weekly mowing, aeration, overseeding, and year-round lawn care for DuPage County homes. Family-run since 1995.` |
| `/services/flower-beds` | `Flower Bed Maintenance & Mulching \| Amigos Landscaping` | `Mulch installation, weeding, bed edging, and flower bed maintenance in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/trimming` | `Bush & Shrub Trimming \| Amigos Landscaping DuPage County` | `Professional bush shaping, shrub pruning, and perennial trimming in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/cleanups` | `Spring & Fall Yard Cleanup in DuPage County \| Amigos` | `One-time spring and fall yard cleanups plus weekly fall leaf care in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/winter` | `Snow Removal in Wheaton, Glen Ellyn & Winfield \| Amigos` | `Residential snow removal and salt treatment for driveways and walkways across Wheaton, Glen Ellyn, and Winfield.` |
| `/recommendations` | `Recommended Local Contractors \| Amigos Landscaping` | `Trusted contractors we refer in DuPage County — plumbing, construction, and more.` |

Plus: canonical URLs on all indexable pages, Open Graph `og:title`/`og:description` mirrored from the title/meta.

## Section 2 — structured data (PRESENTED, AWAITING APPROVAL)

**Homepage:** Keep current `LocalBusiness` schema, fix `areaServed` to 3 cities.

**Service category pages (new):** Add `Service` schema with:
- `serviceType` = category name
- `provider` = references the `LocalBusiness`
- `areaServed` = 3 cities
- `description` = matches meta description
- `hasOfferCatalog` = individual services under that category (from `src/data/services.ts`)

**`/recommendations`:** No schema.

**Remove:** `<meta name="keywords">` from homepage — deprecated, Google ignores it.

## ⏳ Pending questions for Brayan (ask when he returns)

1. **Rating accuracy.** Current schema claims `aggregateRating: 5.0` with `reviewCount: 20`. Is that still accurate? Faking this can get your schema flagged by Google. Answer options: "yes, still accurate", or the real current count.
2. **Opening hours.** Current schema says `Mo-Fr 07:00-18:00`. Still correct?

## Section 3 — technical plumbing (NOT YET PRESENTED)

When resuming, present this section next (after Section 2 approval):

- **`sitemap.xml`** — hand-written static file at `public/sitemap.xml` listing the 7 indexable URLs. Small site, doesn't change often — no build-time generator needed.
- **`robots.txt`** update — add `Sitemap: https://amigolandscaping.com/sitemap.xml` line so crawlers discover it.
- **`noindex` meta** on `/request-confirmation` and `/brand-guide` via Helmet (same pattern as `/availability`).
- **Canonical URLs** — add `<link rel="canonical">` via Helmet on each page pointing to its own URL (not just homepage).
- **Image alt text sweep** — only 6 `alt=` attributes found across the whole `src/` tree. Need to write real descriptions for images in Hero, Services, Recommendations, ServiceAreas, ProfessorCallout, Header (mascot).
  - Proposed approach: I read each component, write context-appropriate alt text ("Amigos crew mowing a residential lawn in Wheaton" not "lawn.jpg"). Decorative images stay `alt=""`.
- **Homepage tweaks:**
  - Remove `<meta name="keywords">` from `src/pages/Index.tsx` (lines ~21-24)
  - Fix `areaServed` in JSON-LD to Wheaton/Glen Ellyn/Winfield (already correct; verify)
  - Reconcile the "Lombard" mention in meta description (either add Lombard to the service area list, or remove the mention — Brayan said 3 cities)

## Audit reference — current state snapshot

On-site at 2026-04-17:

**Good:**
- Homepage has valid `LocalBusiness` JSON-LD with ratings, geo, hours, foundingDate
- Open Graph + Twitter Card tags present in `index.html` and `src/pages/Index.tsx`
- Canonical URL on homepage
- `robots.txt` permissive

**Missing / broken:**
- No `sitemap.xml`
- No sitemap reference in `robots.txt`
- Only 6 `alt=` attributes site-wide (checked `src/` only; count may be higher in component files with inline mascot/logo imports)
- No per-page schema on service category pages
- Deprecated `<meta name="keywords">` still on homepage
- Service area list inconsistent (JSON-LD: Wheaton/Glen Ellyn/Winfield; meta desc: Glen Ellyn/Wheaton/Lombard)
- Per-page Helmet coverage mixed — some pages use it, some don't

## Files to modify (preview, for the plan doc)

- `index.html` — remove `/src/assets/...` preload if broken in prod; update og: values
- `public/sitemap.xml` — NEW
- `public/robots.txt` — add Sitemap line
- `src/pages/Index.tsx` — remove meta keywords, tighten title, fix areaServed consistency
- `src/pages/ServiceCategoryDetail.tsx` — add per-category Helmet (title, meta, canonical, Service schema)
- `src/pages/Recommendations.tsx` — add Helmet (title, meta, canonical, noindex check)
- `src/pages/RequestConfirmation.tsx` — add noindex meta
- `src/pages/BrandGuide.tsx` — add noindex meta
- Various component files (`Hero.tsx`, `Services.tsx`, etc.) — alt text additions

## Next steps when resuming

1. Ask the two pending questions (rating + hours)
2. Get approval on Section 2
3. Present Section 3
4. Get approval on Section 3
5. Write design spec to `docs/superpowers/specs/YYYY-MM-DD-seo-website-design.md`
6. Self-review
7. User review
8. Invoke `superpowers:writing-plans`
