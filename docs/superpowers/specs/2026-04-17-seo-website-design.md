# SEO — Website-Only Technical Pass (Design Spec)

**Date:** 2026-04-17
**Scope:** One-time technical SEO cleanup of the existing site. No body copy changes, no off-site SEO (Google Business Profile, citations, reviews), no new pages.

## Goals

1. Make each page individually discoverable and correctly summarized in search results.
2. Give Google a complete, consistent picture of what Amigos does, where it serves, and which pages are real.
3. Stop sending Google mixed signals (Lombard vs. Winfield, duplicate homepage variants, missing pages).
4. Fix indexing of pages that shouldn't appear in search results.

## Scope

**In scope:**
- Per-page `<title>` and `<meta name="description">` on 7 pages
- Canonical URLs on all indexable pages
- `noindex` on non-public utility pages
- `LocalBusiness` schema cleanup on homepage
- New `Service` schema on 5 service category pages
- Static `sitemap.xml` + `robots.txt` pointer
- Image `alt` text sweep across components used by indexable pages
- Removal of deprecated `<meta name="keywords">`

**Out of scope:**
- Any body copy changes
- Off-site SEO (GBP, reviews platform, local citations, backlinks)
- Core Web Vitals / performance tuning
- New pages, new routes, route restructuring
- Structured data on `/recommendations` (just title + meta, no schema)

## Service area

Three cities used consistently everywhere (schema, metas, anywhere in copy where a city list already exists):

**Wheaton, Glen Ellyn, Winfield**

Any existing "Lombard" mention in metas or schema gets replaced with "Winfield."

## Page inventory

| Path | Indexable? | Helmet treatment |
|---|---|---|
| `/` | Yes | Title, meta, canonical, OG, `LocalBusiness` schema (already present — updates below) |
| `/services/lawn-care` | Yes | Title, meta, canonical, OG, `Service` schema |
| `/services/flower-beds` | Yes | Title, meta, canonical, OG, `Service` schema |
| `/services/trimming` | Yes | Title, meta, canonical, OG, `Service` schema |
| `/services/cleanups` | Yes | Title, meta, canonical, OG, `Service` schema |
| `/services/winter` | Yes | Title, meta, canonical, OG, `Service` schema |
| `/recommendations` | Yes | Title, meta, canonical, OG (no schema) |
| `/request-confirmation` | No | `noindex, nofollow` |
| `/brand-guide` | No | `noindex, nofollow` |
| `/availability` | No | Already `noindex`; verify, don't duplicate |
| `/plan` (PlanQuiz) | No change this pass | Leave as-is |

---

## Section 1 — Titles + Meta Descriptions

Single source of truth. Implement each via `<Helmet>` on the page component. Also mirror title/description into Open Graph (`og:title`, `og:description`) on every indexable page.

| Page | `<title>` | `<meta name="description">` |
|---|---|---|
| `/` | `Amigos Landscaping \| DuPage County Lawn Care & Maintenance` | `Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes.` |
| `/services/lawn-care` | `Lawn Care in Wheaton, Glen Ellyn & Winfield \| Amigos` | `Weekly mowing, aeration, overseeding, and year-round lawn care for DuPage County homes. Family-run since 1995.` |
| `/services/flower-beds` | `Flower Bed Maintenance & Mulching \| Amigos Landscaping` | `Mulch installation, weeding, bed edging, and flower bed maintenance in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/trimming` | `Bush & Shrub Trimming \| Amigos Landscaping DuPage County` | `Professional bush shaping, shrub pruning, and perennial trimming in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/cleanups` | `Spring & Fall Yard Cleanup in DuPage County \| Amigos` | `One-time spring and fall yard cleanups plus weekly fall leaf care in Wheaton, Glen Ellyn, and Winfield.` |
| `/services/winter` | `Snow Removal in Wheaton, Glen Ellyn & Winfield \| Amigos` | `Residential snow removal and salt treatment for driveways and walkways across Wheaton, Glen Ellyn, and Winfield.` |
| `/recommendations` | `Recommended Local Contractors \| Amigos Landscaping` | `Trusted contractors we refer in DuPage County — plumbing, construction, and more.` |

---

## Section 2 — Structured Data (schema.org JSON-LD)

### 2a. Homepage `LocalBusiness` (update existing block in `src/pages/Index.tsx`)

Change:
- `areaServed` → `["Wheaton", "Glen Ellyn", "Winfield"]` (verify; already correct)
- `aggregateRating.ratingValue` → `"5.0"` (unchanged)
- `aggregateRating.reviewCount` → `"23"` (was `"20"`)
- `openingHours` → `"Mo-Fr 08:00-16:00"` (was `"Mo-Fr 07:00-18:00"`)

Keep everything else unchanged: `@type`, `name`, `description`, `url`, `telephone`, `address`, `geo`, `priceRange`, `foundingDate`.

Also remove the deprecated `<meta name="keywords">` tag from the `<Helmet>` block in `Index.tsx`. Google ignores it; some auditors flag it as spammy signal.

### 2b. Service category pages (new schema on each of 5 pages)

On `/services/:slug` where slug ∈ `{lawn-care, flower-beds, trimming, cleanups, winter}`, add a single `Service` JSON-LD block inside the page's `<Helmet>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "<category.title>",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Amigos Landscaping",
    "url": "https://amigolandscaping.com"
  },
  "areaServed": ["Wheaton", "Glen Ellyn", "Winfield"],
  "description": "<page meta description verbatim>",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "<category.title> services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "<service.name>",
          "description": "<service.tagline>"
        }
      }
      // ...one per service returned by getServicesByCategory(slug)
    ]
  }
}
```

The `itemListElement` array is generated from `getServicesByCategory(category.slug)` in `src/data/services.ts`. No dollar amounts.

### 2c. `/recommendations`

No schema. Title + meta + canonical only.

---

## Section 3 — Technical plumbing

### 3a. `public/sitemap.xml` (new file)

Static, hand-written, 7 URLs. Each `<url>` has `<loc>`; `<lastmod>` uses the design date. No priorities/changefreq — Google ignores them.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://amigolandscaping.com/</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/services/lawn-care</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/services/flower-beds</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/services/trimming</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/services/cleanups</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/services/winter</loc><lastmod>2026-04-17</lastmod></url>
  <url><loc>https://amigolandscaping.com/recommendations</loc><lastmod>2026-04-17</lastmod></url>
</urlset>
```

### 3b. `public/robots.txt` (edit existing)

Append at the end:

```
Sitemap: https://amigolandscaping.com/sitemap.xml
```

Leave existing `User-agent` blocks untouched.

### 3c. Canonical URLs (per-page `<link rel="canonical">`)

Every indexable page's `<Helmet>` includes `<link rel="canonical" href="https://amigolandscaping.com<path>" />` pointing to its own path:
- `/` → `https://amigolandscaping.com/`
- `/services/lawn-care` → `https://amigolandscaping.com/services/lawn-care`
- ... etc.
- `/recommendations` → `https://amigolandscaping.com/recommendations`

Homepage already has one; verify. Service pages and recommendations do not — add them.

### 3d. `noindex` on non-public pages

Add `<meta name="robots" content="noindex, nofollow" />` inside `<Helmet>` on:

- `src/pages/RequestConfirmation.tsx`
- `src/pages/BrandGuide.tsx`

`src/pages/Availability.tsx` already has one — verify, do not duplicate.

### 3e. Image `alt` text sweep

Files to scan and update:

- `src/components/Hero.tsx`
- `src/components/Services.tsx`
- `src/pages/Recommendations.tsx`
- `src/components/ServiceAreas.tsx`
- `src/components/ProfessorCallout.tsx`
- `src/components/Header.tsx` (mascot)
- Any `<img>` inside `src/pages/ServiceCategoryDetail.tsx`

Rules:
- Content images: descriptive alt text that names the subject and, where relevant, the location or action. Example: `alt="Amigos crew mowing a residential lawn in Wheaton"`.
- Decorative images (patterns, swooshes, background flourishes): `alt=""` (empty, intentional).
- Icon-only images where meaning is conveyed by nearby text: `alt=""`.
- Mascot: `alt="Professor Amigo, the Amigos Landscaping mascot"` (or similar — pick once, reuse).

Implementer reads each file, categorizes each image, writes appropriate alt. Do not bulk-apply a single string.

### 3f. Open Graph parity

Every indexable page also sets `og:title`, `og:description`, `og:url`, `og:type="website"` via Helmet. Values mirror the title + meta description from Section 1. Homepage already has these; service pages and recommendations need them added.

---

## Files modified

| File | Change |
|---|---|
| `public/sitemap.xml` | **New** — static 7-URL sitemap |
| `public/robots.txt` | Append `Sitemap:` line |
| `src/pages/Index.tsx` | Update title/meta to Section 1; update schema `areaServed`/`reviewCount`/`openingHours`; remove `<meta name="keywords">`; reconcile "Lombard" in OG description |
| `src/pages/ServiceCategoryDetail.tsx` | Replace existing `<Helmet>` with full treatment: title, meta, canonical, OG, `Service` schema (all derived from route param + `src/data/services.ts`) |
| `src/pages/Recommendations.tsx` | Add `<Helmet>`: title, meta, canonical, OG |
| `src/pages/RequestConfirmation.tsx` | Add `<Helmet>` with `noindex, nofollow` |
| `src/pages/BrandGuide.tsx` | Add `<Helmet>` with `noindex, nofollow` |
| `src/pages/Availability.tsx` | Verify `noindex` present; no change expected |
| `src/components/Hero.tsx` | Alt text on content images |
| `src/components/Services.tsx` | Alt text on content images |
| `src/components/ServiceAreas.tsx` | Alt text on content images |
| `src/components/ProfessorCallout.tsx` | Alt text on mascot / content images |
| `src/components/Header.tsx` | Alt text on mascot / logo |
| Any other component with `<img>` reachable from an indexable page | Alt text as needed |

---

## Acceptance criteria

1. `curl https://amigolandscaping.com/sitemap.xml` returns the 7-URL XML file with correct `<loc>` values.
2. `curl https://amigolandscaping.com/robots.txt` includes `Sitemap: https://amigolandscaping.com/sitemap.xml`.
3. Each of the 7 indexable pages, when viewed with DevTools → Elements:
   - Has a unique `<title>` matching Section 1
   - Has a unique `<meta name="description">` matching Section 1
   - Has `<link rel="canonical">` pointing to its own URL
   - Has `og:title`, `og:description`, `og:url`
4. Homepage JSON-LD validates on [schema.org validator](https://validator.schema.org/) with `areaServed = [Wheaton, Glen Ellyn, Winfield]`, `reviewCount = 23`, `openingHours = Mo-Fr 08:00-16:00`.
5. Each of the 5 service category pages has a `Service` JSON-LD block that validates and lists the category's services under `hasOfferCatalog.itemListElement`.
6. `/request-confirmation` and `/brand-guide` responses include `<meta name="robots" content="noindex, nofollow">`.
7. No `<meta name="keywords">` tag anywhere in the built HTML.
8. No "Lombard" appears in any `<meta>`, `<title>`, or JSON-LD output on the homepage.
9. Every `<img>` in indexable-page components has an `alt` attribute (may be `""` for decorative) — no missing `alt=` attributes.

## Non-goals (explicit)

- No performance/CWV work
- No new routes
- No off-site SEO setup
- No changes to PlanQuiz / JobberForm / form flows
- No changes to written body copy anywhere on the site
- No `aggregateRating` changes beyond the `reviewCount` bump
