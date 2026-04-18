# SEO Website-Only Technical Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each public page individually discoverable and correctly summarized in Google search results, stop sending mixed signals about service area, add per-service-category structured data, and hide non-public pages from search.

**Architecture:** All SEO metadata lives in per-page `<Helmet>` blocks (react-helmet-async is already wired up via `HelmetProvider` in `App.tsx`). The homepage already carries a `LocalBusiness` JSON-LD block; this pass updates a few of its fields, removes a deprecated `<meta name="keywords">`, adds per-page titles/metas/canonicals on pages that don't have them, adds `Service` JSON-LD on the 5 service category detail pages (derived from existing `src/data/services.ts`), adds `noindex` to non-public pages, and ships a static `sitemap.xml` + `robots.txt` pointer.

**Tech Stack:** React + Vite + TypeScript (existing), react-helmet-async (existing), no new dependencies.

**Spec reference:** [docs/superpowers/specs/2026-04-17-seo-website-design.md](../specs/2026-04-17-seo-website-design.md)

**Testing note:** This project has no test framework. Each task ends with a **manual verification step** — build the site, inspect the output HTML, and where relevant run the JSON-LD through [validator.schema.org](https://validator.schema.org/). Do not introduce a test framework as part of this work.

**Service area canon:** Wheaton, Glen Ellyn, Winfield. Any existing "Lombard" mention in metas/schema gets replaced with "Winfield" (Brayan's call — he covers Winfield now, not Lombard).

---

## File Structure

**New files:**
- `public/sitemap.xml` — Static 7-URL sitemap. Hand-written, not generated. Small site, doesn't change often.

**Modified files:**
- `public/robots.txt` — Append `Sitemap:` line pointing at the new sitemap.
- `index.html` — Static homepage HTML (served for every route pre-hydration). Replace the "Lombard" mention in the meta description, align `og:` and `twitter:` tags with the new homepage title/description, verify canonical trailing slash. Helmet overrides these at runtime on the homepage, but this file is what non-JS crawlers and initial page loads see.
- `src/pages/Index.tsx` — Update title/meta/OG, remove deprecated `<meta name="keywords">`, update JSON-LD fields (`reviewCount`, `openingHours`), reconcile "Lombard" → "Winfield" in OG description, verify canonical.
- `src/pages/ServiceCategoryDetail.tsx` — Replace the minimal `<Helmet>` with full treatment: per-slug title + meta, canonical, OG, `Service` JSON-LD built from `getServicesByCategory(slug)`.
- `src/pages/Recommendations.tsx` — Update title + meta to spec values, add canonical + OG.
- `src/pages/RequestConfirmation.tsx` — Add `<meta name="robots" content="noindex, nofollow" />` inside existing `<Helmet>`.
- `src/pages/BrandGuide.tsx` — Verify existing noindex already reads `noindex, nofollow` (with a space). Normalize if needed.
- `src/pages/Availability.tsx` — Verify existing noindex tag. No change expected.
- `src/components/Header.tsx` — Improve mascot alt text.
- `src/components/Hero.tsx` — Alt text is already reasonable; verify during sweep.
- `src/components/ProfessorCallout.tsx` — Improve mascot alt text to match canonical mascot name.
- `src/components/ServiceAreas.tsx` — Existing alt is good; verify.
- `src/pages/Recommendations.tsx` — Existing alts on logo + construction mascot are good; verify (no additional changes beyond Task 3's Helmet update).

**Not modified:**
- Any body copy on any page.
- `src/App.tsx`, router config, form flows.
- `/plan` (PlanQuiz) SEO treatment.
- Other components with no `<img>` reachable from indexable pages.

---

## Task 1: Homepage SEO update (`index.html` + `src/pages/Index.tsx`)

**Files:**
- Modify: `index.html` (lines 7-33 — title + meta description + OG + Twitter tags)
- Modify: `src/pages/Index.tsx` (lines 15-72 — the entire `<Helmet>` block)

**Context:** `index.html` is the static entry document Vite serves for every route. Helmet overrides its tags at runtime on each page — but the static file is what non-JS crawlers, social unfurlers, and the initial page load see. We update both so they agree. The Helmet block is the canonical homepage source; `index.html` mirrors it.

- [ ] **Step 1: Update `index.html`**

Open `index.html`. Replace lines 7-8 (the current `<title>` and `<meta name="description">`):

```html
    <title>Amigos Landscaping | DuPage County Lawn Care & Landscaping Services</title>
    <meta name="description" content="Professional lawn care and landscaping services in DuPage County, Illinois since 1995. Free quotes available for Glen Ellyn, Wheaton, Lombard & more." />
```

With:

```html
    <title>Amigos Landscaping | DuPage County Lawn Care & Maintenance</title>
    <meta name="description" content="Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes." />
```

Update the canonical on line 11 (add trailing slash for consistency with the Helmet block):

```html
    <link rel="canonical" href="https://amigolandscaping.com/" />
```

Update the OG block (lines 22-27). Replace:

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Amigos Landscaping | DuPage County Lawn Care" />
    <meta property="og:description" content="Professional lawn care and landscaping services in DuPage County, Illinois since 1995." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://amigolandscaping.com" />
    <meta property="og:image" content="https://amigolandscaping.com/og-image.jpg" />
```

With:

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Amigos Landscaping | DuPage County Lawn Care & Maintenance" />
    <meta property="og:description" content="Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://amigolandscaping.com/" />
    <meta property="og:image" content="https://amigolandscaping.com/og-image.jpg" />
```

(The `og:image` line is kept as-is — referencing a file that may not exist yet is out of scope for this pass. Brayan can add `public/og-image.jpg` separately.)

Update the Twitter block (lines 30-33). Replace:

```html
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Amigos Landscaping | DuPage County Lawn Care" />
    <meta name="twitter:description" content="Professional lawn care and landscaping services in DuPage County, Illinois since 1995." />
    <meta name="twitter:image" content="https://amigolandscaping.com/og-image.jpg" />
```

With:

```html
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Amigos Landscaping | DuPage County Lawn Care & Maintenance" />
    <meta name="twitter:description" content="Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes." />
    <meta name="twitter:image" content="https://amigolandscaping.com/og-image.jpg" />
```

Leave all other lines in `index.html` untouched (preload tag, fonts, body forms, etc.).

- [ ] **Step 2: Read `src/pages/Index.tsx`**

Read the file so you can see the exact indentation and current `<Helmet>` contents. You'll replace the whole `<Helmet>` block in Step 3.

- [ ] **Step 3: Replace the `<Helmet>` block**

Replace the existing `<Helmet>...</Helmet>` block (currently lines 15-72) with this exact content. Keep the same 6-space indentation so it drops into the JSX unchanged:

```tsx
      <Helmet>
        <title>Amigos Landscaping | DuPage County Lawn Care & Maintenance</title>
        <meta
          name="description"
          content="Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes."
        />
        <link rel="canonical" href="https://amigolandscaping.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Amigos Landscaping | DuPage County Lawn Care & Maintenance" />
        <meta
          property="og:description"
          content="Year-round lawn care and landscape maintenance for Wheaton, Glen Ellyn, and Winfield. Weekly mowing, mulch, aeration, leaf care. Free quotes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amigolandscaping.com/" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Amigos Landscaping",
            description:
              "Professional lawn care and landscaping services in DuPage County, Illinois",
            url: "https://amigolandscaping.com",
            telephone: "+1-630-664-0303",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Wheaton",
              addressRegion: "IL",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.8662,
              longitude: -88.1070,
            },
            areaServed: [
              "Wheaton",
              "Glen Ellyn",
              "Winfield",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "23",
            },
            priceRange: "$$",
            openingHours: "Mo-Fr 08:00-16:00",
            foundingDate: "1995",
          })}
        </script>
      </Helmet>
```

Changes vs. current:
- Title shortened to spec value.
- Meta description replaced (was "Glen Ellyn, Wheaton, Lombard & more"; now Wheaton/Glen Ellyn/Winfield list matching the schema).
- Removed the `<meta name="keywords">` tag entirely (Google ignores it; some auditors flag it).
- `og:title` and `og:description` now mirror the new title/description verbatim.
- Canonical href normalized to include trailing slash (`/`).
- Schema: `reviewCount` `"20"` → `"23"`; `openingHours` `"Mo-Fr 07:00-18:00"` → `"Mo-Fr 08:00-16:00"`. `areaServed` already correct; leave it.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

Run `npm run preview` in one terminal. In another terminal, verify the **static** `index.html` changes (these are pre-hydration and visible via curl):

```bash
curl -s http://localhost:4173/ | grep -E '<title>|description|og:title|og:url|twitter:title|Lombard'
```

Expected:
- Title reads `Amigos Landscaping | DuPage County Lawn Care & Maintenance`
- Description is the new Winfield-based sentence
- og:title / og:url / twitter:title reflect the new values
- No `Lombard` match anywhere

Then verify the **Helmet-injected** homepage tags via a real browser (not curl — Helmet runs after React hydration, which curl doesn't trigger). Open `http://localhost:4173/` in Chrome, open DevTools → Elements → expand `<head>`, and confirm:

- `<title>` reads `Amigos Landscaping | DuPage County Lawn Care & Maintenance` (same as static, so Helmet is a no-op here — that's fine).
- The `<script type="application/ld+json">` block contains `"reviewCount":"23"`, `"openingHours":"Mo-Fr 08:00-16:00"`, and `"areaServed":["Wheaton","Glen Ellyn","Winfield"]`.
- There is no `<meta name="keywords">` anywhere in `<head>`.
- There is no "Lombard" string anywhere in `<head>`.

Kill the preview server after checking (`Ctrl+C`).

- [ ] **Step 5: Commit**

```bash
git add index.html src/pages/Index.tsx
git commit -m "seo: tighten homepage title/meta, update schema, drop keywords tag"
```

---

## Task 2: Service category pages — full Helmet + Service schema (`src/pages/ServiceCategoryDetail.tsx`)

**Files:**
- Modify: `src/pages/ServiceCategoryDetail.tsx` (imports at top + the `<Helmet>` block around line 285)

**Context:** Right now this page only sets `<title>{category.title} | Amigos Landscaping</title>` and a generic meta. Every one of the 5 category URLs (`/services/lawn-care`, `/services/flower-beds`, `/services/trimming`, `/services/cleanups`, `/services/winter`) shares that thin treatment. We're replacing it with per-slug titles/metas, a canonical, OG tags, and a `Service` JSON-LD block built from the existing services data.

- [ ] **Step 1: Add a per-slug SEO map near the existing category lookups**

Open `src/pages/ServiceCategoryDetail.tsx`. The import block currently ends with:

```tsx
import {
  getCategoryBySlug,
  getServicesByCategory,
  categories,
  type Service,
} from "@/data/services";
```

Directly below this import block (just before `const iconMap`), add:

```tsx
import type { ServiceCategorySlug } from "@/data/services";

const categorySeo: Record<ServiceCategorySlug, { title: string; description: string }> = {
  "lawn-care": {
    title: "Lawn Care in Wheaton, Glen Ellyn & Winfield | Amigos",
    description:
      "Weekly mowing, aeration, overseeding, and year-round lawn care for DuPage County homes. Family-run since 1995.",
  },
  "flower-beds": {
    title: "Flower Bed Maintenance & Mulching | Amigos Landscaping",
    description:
      "Mulch installation, weeding, bed edging, and flower bed maintenance in Wheaton, Glen Ellyn, and Winfield.",
  },
  trimming: {
    title: "Bush & Shrub Trimming | Amigos Landscaping DuPage County",
    description:
      "Professional bush shaping, shrub pruning, and perennial trimming in Wheaton, Glen Ellyn, and Winfield.",
  },
  cleanups: {
    title: "Spring & Fall Yard Cleanup in DuPage County | Amigos",
    description:
      "One-time spring and fall yard cleanups plus weekly fall leaf care in Wheaton, Glen Ellyn, and Winfield.",
  },
  winter: {
    title: "Snow Removal in Wheaton, Glen Ellyn & Winfield | Amigos",
    description:
      "Residential snow removal and salt treatment for driveways and walkways across Wheaton, Glen Ellyn, and Winfield.",
  },
};
```

Note: `ServiceCategorySlug` is already exported from `src/data/services.ts` (verified — see the file's type declarations). The extra import is fine even though another import from `@/data/services` exists above; if you prefer, merge it into the existing import line instead:

```tsx
import {
  getCategoryBySlug,
  getServicesByCategory,
  categories,
  type Service,
  type ServiceCategorySlug,
} from "@/data/services";
```

Either form is acceptable — pick the merged form to keep imports tidy.

- [ ] **Step 2: Replace the `<Helmet>` block inside the `ServiceCategoryDetail` component**

The current block (around lines 285-288) reads:

```tsx
      <Helmet>
        <title>{category.title} | Amigos Landscaping</title>
        <meta name="description" content={category.tagline} />
      </Helmet>
```

Replace with:

```tsx
      <Helmet>
        <title>{categorySeo[category.slug].title}</title>
        <meta
          name="description"
          content={categorySeo[category.slug].description}
        />
        <link
          rel="canonical"
          href={`https://amigolandscaping.com/services/${category.slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={categorySeo[category.slug].title} />
        <meta
          property="og:description"
          content={categorySeo[category.slug].description}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://amigolandscaping.com/services/${category.slug}`}
        />

        {/* Service schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: category.title,
            provider: {
              "@type": "LocalBusiness",
              name: "Amigos Landscaping",
              url: "https://amigolandscaping.com",
            },
            areaServed: ["Wheaton", "Glen Ellyn", "Winfield"],
            description: categorySeo[category.slug].description,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${category.title} services`,
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.name,
                  description: service.tagline,
                },
              })),
            },
          })}
        </script>
      </Helmet>
```

`services` in the schema block refers to the local variable already computed earlier in the component: `const services = getServicesByCategory(category.slug);`. This already runs before `<Helmet>`, so the reference is valid.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors. If the TypeScript compiler complains that `ServiceCategorySlug` isn't exported, open `src/data/services.ts` and confirm it is (lines 12-17 in the current file — it is). Adjust your import accordingly.

Run `npm run preview`. These tags are Helmet-injected per route and **only visible after React hydration** — curl won't see them. Verify in a real browser:

Open `http://localhost:4173/services/lawn-care` in Chrome. DevTools → Elements → `<head>`. Confirm:
- `<title>` reads `Lawn Care in Wheaton, Glen Ellyn & Winfield | Amigos`
- `<link rel="canonical" href="https://amigolandscaping.com/services/lawn-care">` is present
- A `<script type="application/ld+json">` block exists containing `"@type":"Service"`, `"serviceType":"Lawn Care"`, and an `OfferCatalog` with entries for mowing, aeration, overseeding.

Repeat for `http://localhost:4173/services/winter`:
- Title: `Snow Removal in Wheaton, Glen Ellyn & Winfield | Amigos`
- Canonical: `https://amigolandscaping.com/services/winter`
- Schema: `Service` with `OfferCatalog` listing snow-removal.

Copy one of the `<script type="application/ld+json">` bodies into [validator.schema.org](https://validator.schema.org/) and confirm no errors.

Kill the preview server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ServiceCategoryDetail.tsx
git commit -m "seo: per-category helmet + Service JSON-LD on /services pages"
```

---

## Task 3: Recommendations page — tighten title/meta, add canonical + OG (`src/pages/Recommendations.tsx`)

**Files:**
- Modify: `src/pages/Recommendations.tsx` (lines 173-181 — the existing `<Helmet>` block)

- [ ] **Step 1: Replace the `<Helmet>` block**

The current block reads:

```tsx
      <Helmet>
        <title>Local Recommendations | Amigos Landscaping</title>
        <meta
          name="description"
          content="Trusted DuPage County home service companies we recommend for work outside of Amigos Landscaping's scope."
        />
      </Helmet>
```

Replace with:

```tsx
      <Helmet>
        <title>Recommended Local Contractors | Amigos Landscaping</title>
        <meta
          name="description"
          content="Trusted contractors we refer in DuPage County — plumbing, construction, and more."
        />
        <link rel="canonical" href="https://amigolandscaping.com/recommendations" />

        {/* Open Graph */}
        <meta property="og:title" content="Recommended Local Contractors | Amigos Landscaping" />
        <meta
          property="og:description"
          content="Trusted contractors we refer in DuPage County — plumbing, construction, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amigolandscaping.com/recommendations" />
      </Helmet>
```

No JSON-LD block per spec — title + meta + canonical + OG only.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run `npm run preview`, open `http://localhost:4173/recommendations` in Chrome, and inspect `<head>` in DevTools (curl won't see Helmet-injected tags — only browser-rendered DOM will). Confirm:
- `<title>` reads `Recommended Local Contractors | Amigos Landscaping`
- `<link rel="canonical" href="https://amigolandscaping.com/recommendations">` is present
- `<meta property="og:title" content="Recommended Local Contractors | Amigos Landscaping">` is present

Kill preview.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Recommendations.tsx
git commit -m "seo: add canonical + OG to recommendations page"
```

---

## Task 4: RequestConfirmation page — add noindex (`src/pages/RequestConfirmation.tsx`)

**Files:**
- Modify: `src/pages/RequestConfirmation.tsx` (lines 45-48 — the existing `<Helmet>` block)

This page is reachable only after a form submission. It should not appear in search.

- [ ] **Step 1: Add the robots meta tag**

The current `<Helmet>` reads:

```tsx
      <Helmet>
        <title>Request Confirmed | Amigos Landscaping</title>
        <meta name="description" content="Your service request has been received. Learn what happens next with Amigos Landscaping." />
      </Helmet>
```

Replace with:

```tsx
      <Helmet>
        <title>Request Confirmed | Amigos Landscaping</title>
        <meta name="description" content="Your service request has been received. Learn what happens next with Amigos Landscaping." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
```

Only one line added. Keep the existing title and description as-is (they still render for anyone who lands on the page via the form flow — we just tell crawlers to skip it).

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run `npm run preview`, open `http://localhost:4173/request-confirmation` in Chrome, DevTools → Elements → `<head>`. Confirm `<meta name="robots" content="noindex, nofollow">` is present. (Helmet-injected; not visible via curl.)

Kill preview.

- [ ] **Step 3: Commit**

```bash
git add src/pages/RequestConfirmation.tsx
git commit -m "seo: noindex the request-confirmation page"
```

---

## Task 5: Verify noindex on BrandGuide and Availability (no changes expected)

**Files:**
- Read only: `src/pages/BrandGuide.tsx`, `src/pages/Availability.tsx`

Both files already have robots meta tags per the spec audit. This task is purely verification — no code changes unless a discrepancy is found.

- [ ] **Step 1: Read and verify `src/pages/BrandGuide.tsx`**

Open the file. Confirm the `<Helmet>` block contains:
```tsx
<meta name="robots" content="noindex, nofollow" />
```
(Around line 56.) The comma-space format matches what we added to RequestConfirmation. If it reads `noindex,nofollow` (no space), normalize to `noindex, nofollow` for consistency across the site. If it already has the space, do nothing.

- [ ] **Step 2: Read and verify `src/pages/Availability.tsx`**

Open the file. Confirm the `<Helmet>` block contains a `<meta name="robots">` tag. As of the audit, it reads:
```tsx
<meta name="robots" content="noindex,nofollow" />
```
(Around line 48 — no space after the comma.) Normalize to `noindex, nofollow` to match the rest of the site.

- [ ] **Step 3: If either file was modified, build and commit**

If you edited one or both files for consistency:
```bash
npm run build
```
Expected: build succeeds.

```bash
git add src/pages/BrandGuide.tsx src/pages/Availability.tsx
git commit -m "seo: normalize robots meta format on noindex pages"
```

If neither file needed changes, skip the commit — just mark the steps complete.

---

## Task 6: Create the sitemap (`public/sitemap.xml`)

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Write the file**

Create `public/sitemap.xml` with this exact content:

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

Exactly 7 URLs — the 7 indexable pages from the spec. No `<priority>` or `<changefreq>`; Google ignores them.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: build succeeds. (Files in `public/` are copied verbatim by Vite into `dist/`.)

Run `npm run preview`, then:
```bash
curl -s http://localhost:4173/sitemap.xml | head -10
```
Expected: first line is `<?xml version="1.0" encoding="UTF-8"?>`, and the 7 `<url>` entries appear.

Kill preview.

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "seo: add sitemap.xml with 7 indexable URLs"
```

---

## Task 7: Update robots.txt to point at the sitemap (`public/robots.txt`)

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Append the Sitemap line**

Current content:
```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
```

Append a blank line and then:
```
Sitemap: https://amigolandscaping.com/sitemap.xml
```

So the final file ends with:
```
User-agent: *
Allow: /

Sitemap: https://amigolandscaping.com/sitemap.xml
```

Leave all the existing `User-agent` blocks untouched.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run `npm run preview`, then:
```bash
curl -s http://localhost:4173/robots.txt
```
Expected: the same `User-agent` blocks followed by the `Sitemap:` line.

Kill preview.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "seo: point robots.txt at sitemap.xml"
```

---

## Task 8: Image alt text sweep

**Files:**
- Modify (likely): `src/components/Header.tsx`, `src/components/ProfessorCallout.tsx`
- Verify (no change expected): `src/components/Hero.tsx`, `src/components/ServiceAreas.tsx`, `src/pages/Recommendations.tsx`

**Context:** Every existing `<img>` in the app already has an `alt=` attribute (verified). This task improves the weak alts (generic mascot references) and confirms the good ones don't need changes. No new alts to author from scratch.

The mascot is canonically **"Professor Amigo"** (per existing references in `ProfessorCallout.tsx`). Standardize on that name where the mascot is the subject.

- [ ] **Step 1: Update `src/components/Header.tsx` mascot alt**

Current (line 98):
```tsx
alt="Amigos Mascot"
```

Replace with:
```tsx
alt="Professor Amigo, the Amigos Landscaping mascot"
```

- [ ] **Step 2: Update `src/components/ProfessorCallout.tsx` mascot alt**

Current (line 19):
```tsx
alt="Amigos professor mascot"
```

Replace with:
```tsx
alt="Professor Amigo, the Amigos Landscaping mascot"
```

- [ ] **Step 3: Verify the other alts don't need changes**

Read each of these lines and confirm the alt text is already descriptive and appropriate. Do **not** change them unless you spot something genuinely wrong:

- `src/components/Hero.tsx:22` — `alt="Beautiful landscaped lawn in DuPage Illinois"` — keep as-is.
- `src/components/ServiceAreas.tsx:69` — `alt="Service area map showing Wheaton, Glen Ellyn, and Winfield Illinois"` — keep as-is.
- `src/pages/Recommendations.tsx:220` — `alt={\`${rec.name} logo\`}` — keep as-is (dynamic per recommendation).
- `src/pages/Recommendations.tsx:571` — `alt="Amigos Mascot at a construction site"` — this one is on the "Page In Progress" callout. Optional polish: change to `alt="Professor Amigo at a construction site"` for consistency with steps 1-2. Judgment call; safe to do either.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run `npm run preview`, open the homepage in a browser, and visually confirm images still render (alt-only changes can't break rendering, but a smoke test catches typos in JSX).

Kill preview.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/ProfessorCallout.tsx
# Also include src/pages/Recommendations.tsx if you made the optional polish in step 3.
git commit -m "seo: tighten mascot alt text for accessibility + image search"
```

---

## Task 9: Full-site verification

**Files:** None modified — this task is pure verification.

- [ ] **Step 1: Build the production bundle**

Run: `npm run build`
Expected: build succeeds with no errors or warnings related to our changes.

- [ ] **Step 2: Preview and spot-check each page's `<head>` in a browser**

Run `npm run preview`. Because this is a SPA, Helmet-injected tags only appear after React hydration — curl sees the static `index.html` for every route, not the per-page tags. So: open each URL in Chrome, open DevTools → Elements → `<head>`, and confirm the expected values.

| URL | Expected title contains | Canonical ends with | robots? |
|---|---|---|---|
| `http://localhost:4173/` | `DuPage County Lawn Care & Maintenance` | `amigolandscaping.com/` | absent (indexable) |
| `http://localhost:4173/services/lawn-care` | `Lawn Care in Wheaton, Glen Ellyn & Winfield` | `/services/lawn-care` | absent |
| `http://localhost:4173/services/flower-beds` | `Flower Bed Maintenance & Mulching` | `/services/flower-beds` | absent |
| `http://localhost:4173/services/trimming` | `Bush & Shrub Trimming` | `/services/trimming` | absent |
| `http://localhost:4173/services/cleanups` | `Spring & Fall Yard Cleanup` | `/services/cleanups` | absent |
| `http://localhost:4173/services/winter` | `Snow Removal in Wheaton, Glen Ellyn & Winfield` | `/services/winter` | absent |
| `http://localhost:4173/recommendations` | `Recommended Local Contractors` | `/recommendations` | absent |
| `http://localhost:4173/request-confirmation` | `Request Confirmed` | (none required) | `noindex, nofollow` |
| `http://localhost:4173/brand-guide` | `Brand Operating System` | (none required) | `noindex, nofollow` |
| `http://localhost:4173/availability` | `Current Availability` | (none required) | `noindex, nofollow` |

Google executes JavaScript when crawling, so Helmet-injected tags are picked up in practice. The sitemap + canonical values give Google the page list explicitly. Introducing SSR or static prerendering to make tags curl-visible is explicitly out of scope for this pass.

- [ ] **Step 3: Verify sitemap and robots**

```bash
curl -s http://localhost:4173/sitemap.xml | head -15
curl -s http://localhost:4173/robots.txt
```
Expected:
- sitemap.xml returns the 7-URL XML starting with `<?xml version="1.0"...`.
- robots.txt ends with the `Sitemap:` line.

- [ ] **Step 4: Validate one JSON-LD block**

Open `http://localhost:4173/` in a real browser. DevTools → Elements → find `<script type="application/ld+json">`. Copy its contents. Paste into [validator.schema.org](https://validator.schema.org/). Expect:
- Type: `LocalBusiness`
- `reviewCount`: `"23"`
- `openingHours`: `"Mo-Fr 08:00-16:00"`
- `areaServed`: `["Wheaton", "Glen Ellyn", "Winfield"]`
- No "Lombard" anywhere
- No validation errors

Repeat for one service page (e.g., `http://localhost:4173/services/lawn-care`). Expect:
- Type: `Service`
- `serviceType`: `"Lawn Care"`
- `areaServed`: 3 cities
- `hasOfferCatalog.itemListElement` contains entries for mowing, aeration, overseeding

- [ ] **Step 5: Kill the preview server**

`Ctrl+C` in the preview terminal. All done.

- [ ] **Step 6: (Optional) After deploy — post-deploy checks**

Once this work is deployed to `amigolandscaping.com`, run one more pass from the public URLs (not localhost). The same spot-check table applies. Additionally:
- Submit the sitemap to Google Search Console: `https://amigolandscaping.com/sitemap.xml`.
- Re-request indexing for `/`, the 5 `/services/*` pages, and `/recommendations` through Search Console.

This final step isn't a code change — it's a manual Search Console action. Mark it complete once submitted, or defer if Brayan prefers to do it himself.

---

## Acceptance criteria (from spec)

When every task is complete, these should all be true. Verify against Task 9's output:

1. `/sitemap.xml` returns a 7-URL XML file.
2. `/robots.txt` includes a `Sitemap:` line pointing at `/sitemap.xml`.
3. Each of the 7 indexable pages has a unique title + meta description + canonical + OG tags.
4. Homepage JSON-LD: `areaServed` is 3 cities, `reviewCount` is `"23"`, `openingHours` is `"Mo-Fr 08:00-16:00"`.
5. Each of the 5 service category pages has a `Service` JSON-LD with `hasOfferCatalog` listing services.
6. `/request-confirmation`, `/brand-guide`, `/availability` all include `<meta name="robots" content="noindex, nofollow">`.
7. No `<meta name="keywords">` anywhere.
8. No "Lombard" in any meta/title/JSON-LD.
9. Every `<img>` has an `alt` attribute (already true pre-work; verified).
