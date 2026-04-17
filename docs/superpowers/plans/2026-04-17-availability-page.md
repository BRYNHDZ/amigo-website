# Availability Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/availability` — an unlisted page that shows current weekly-route capacity and the week Amigos is currently scheduling projects for, fed by a tiny Notion database so Brayan can edit from his phone.

**Architecture:** A Netlify Function queries a one-row Notion database (hiding the API token server-side) and returns JSON. A new React page uses TanStack Query to fetch that JSON and render two clearly separated sections (weekly route capacity, project scheduling week) with loading and error fallbacks. A 60-second in-memory cache on the function smooths traffic.

**Tech Stack:** React + Vite + TypeScript (existing), Tailwind + shadcn/ui (existing), TanStack Query (existing), react-helmet-async (existing), date-fns (existing), Netlify Functions (new to this repo), Notion API v1 (REST, called via native `fetch` — no SDK dependency).

**Spec reference:** [docs/superpowers/specs/2026-04-17-availability-page-design.md](../specs/2026-04-17-availability-page-design.md)

**Testing note:** This project does not currently have a test framework. Each task below ends with a **manual verification step** instead of automated tests. Do not introduce a test framework as part of this work — that is a separate decision.

---

## File Structure

**New files:**
- `netlify.toml` — Declares the functions directory so Netlify auto-builds and deploys it. This is the first Netlify Function for the repo.
- `netlify/functions/scheduling-status.ts` — Serverless handler. Reads env vars, queries Notion, caches 60s, returns JSON.
- `src/pages/Availability.tsx` — Single-file React page. Uses TanStack Query to call the function. Handles loading, error, and success states. Wraps content in existing Header/Footer and uses Helmet for `noindex`.

**Modified files:**
- `src/App.tsx` — Adds `<Route path="/availability" element={<Availability />} />` above the catch-all route.
- `package.json` — Adds `@netlify/functions` as a devDependency (for the `Handler` type only; no runtime import).

**Not modified:**
- Header, Footer, nav, or homepage — the page is intentionally unlinked from elsewhere.
- Existing routes or pages.

---

## Task 1: Brayan — Notion and Netlify setup (manual, no code)

This task has no code steps. Brayan does this from his phone/laptop. It can happen any time before Task 6 — the code tasks do not depend on it finishing first.

**Files:** None (external setup).

- [ ] **Step 1: Create the Notion database**

On notion.so, create a new full-page database in any workspace location. Name it **"Scheduling Status"**.

Configure exactly these two properties (in this order):
| Property name | Type | Notes |
|---|---|---|
| Project Scheduling Week | Title | This is the database's required title property. |
| Weekly Route Slots Left | Number | Integer, no formatting. |

- [ ] **Step 2: Add the one data row**

Add a single row:
- Project Scheduling Week = `Week one of May`
- Weekly Route Slots Left = `10`

This is the only row that will ever exist. Never add a second row — the function reads the first row returned.

- [ ] **Step 3: Create a Notion internal integration**

Go to https://www.notion.so/profile/integrations. Click **New integration**.
- Name: `Amigos Availability`
- Associated workspace: the one containing the database
- Type: Internal
- Capabilities: **Read content** (uncheck everything else; no need to update or insert)

Submit. Copy the **Internal Integration Secret** (starts with `secret_` or `ntn_`). Save it somewhere temporary — Task 1 Step 5 uses it.

- [ ] **Step 4: Share the database with the integration**

Open the "Scheduling Status" database. Click the `•••` menu → **Connections** → **Add connections** → pick `Amigos Availability`. Confirm.

Without this step the integration has access to nothing.

- [ ] **Step 5: Copy the database ID**

Open the database as a full page in Notion. The URL looks like:
```
https://www.notion.so/workspace/<database-id>?v=<view-id>
```
The `<database-id>` is a 32-character hex string (may contain hyphens). Copy it.

- [ ] **Step 6: Add environment variables to Netlify**

In the Netlify dashboard for this site → **Site configuration → Environment variables → Add a variable** (twice):

| Key | Value |
|---|---|
| `NOTION_SCHEDULING_TOKEN` | The integration secret from Step 3 |
| `NOTION_SCHEDULING_DB_ID` | The database ID from Step 5 |

Scope: **All scopes** (Production + Deploy Previews + Branch deploys). Values: Secret.

- [ ] **Step 7: Confirm**

No commit for this task — nothing changed in the repo. Confirm with Brayan that the Notion database, integration, and env vars exist before Task 6.

---

## Task 2: Add Netlify Functions scaffolding to the repo

Introduces the directory Netlify looks in for functions, and installs the type definitions used by the handler.

**Files:**
- Create: `netlify.toml`
- Modify: `package.json` (via `bun add`, do not hand-edit)
- Modify: `bun.lock` / `bun.lockb` (automatic from install)

- [ ] **Step 1: Install @netlify/functions as a devDependency**

Run:
```bash
bun add -d @netlify/functions
```

Expected: exit code 0, `package.json` now lists `@netlify/functions` under `devDependencies`.

- [ ] **Step 2: Create netlify.toml at the repo root**

Create `netlify.toml` with this content exactly:

```toml
[build]
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

Notes on why this is minimal:
- `functions = "netlify/functions"` — explicitly names the functions directory (also Netlify's default, but stated explicitly so it's obvious in the repo).
- `node_bundler = "esbuild"` — compiles the TypeScript function on deploy with zero extra config.
- **No `[build]` command or publish dir** — Netlify already auto-detects Vite for this site. Overriding those keys risks breaking the existing deploy.
- **No `[dev]` section** — keeping it out so adding `netlify dev` later (if ever) is an explicit choice, not a silent side-effect of this PR.

- [ ] **Step 3: Commit**

```bash
git add netlify.toml package.json bun.lock bun.lockb
git commit -m "chore: add netlify functions scaffolding for availability page"
```

---

## Task 3: Implement the scheduling-status Netlify Function

The serverless endpoint that queries Notion, caches for 60s, and returns a typed JSON response.

**Files:**
- Create: `netlify/functions/scheduling-status.ts`

- [ ] **Step 1: Create the file with the full implementation**

Create `netlify/functions/scheduling-status.ts`:

```ts
import type { Handler } from "@netlify/functions";

type SchedulingStatus = {
  weeklySlotsLeft: number | null;
  projectWeek: string;
  lastUpdated: string;
};

type CacheEntry = {
  data: SchedulingStatus;
  expiresAt: number;
};

let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 60_000;

const NOTION_API_URL = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export const handler: Handler = async () => {
  const token = process.env.NOTION_SCHEDULING_TOKEN;
  const dbId = process.env.NOTION_SCHEDULING_DB_ID;

  if (!token || !dbId) {
    return jsonResponse(502, { error: "unavailable" });
  }

  if (cache && Date.now() < cache.expiresAt) {
    return jsonResponse(200, cache.data);
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 1 }),
    });

    if (!response.ok) {
      return jsonResponse(502, { error: "unavailable" });
    }

    const payload = (await response.json()) as NotionQueryResponse;
    const row = payload.results?.[0];
    if (!row) {
      return jsonResponse(502, { error: "unavailable" });
    }

    const data: SchedulingStatus = {
      weeklySlotsLeft:
        row.properties["Weekly Route Slots Left"]?.number ?? null,
      projectWeek:
        row.properties["Project Scheduling Week"]?.title?.[0]?.plain_text ?? "",
      lastUpdated: row.last_edited_time,
    };

    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return jsonResponse(200, data);
  } catch {
    return jsonResponse(502, { error: "unavailable" });
  }
};

function jsonResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    },
    body: JSON.stringify(body),
  };
}

// Minimal type for the slice of Notion's response we touch.
type NotionQueryResponse = {
  results?: Array<{
    last_edited_time: string;
    properties: {
      "Weekly Route Slots Left"?: { number: number | null };
      "Project Scheduling Week"?: {
        title?: Array<{ plain_text: string }>;
      };
    };
  }>;
};
```

Key behaviors:
- Missing env vars → 502 (treated as "unavailable", not a crash).
- Notion non-2xx or empty results → 502.
- Exceptions (network, JSON parse) → 502.
- 60-second in-memory cache inside the module closure. Stateless across cold starts, which is fine.
- `Cache-Control: max-age=60` header helps browsers avoid extra round-trips.

- [ ] **Step 2: Local smoke test (optional but recommended)**

If not already done, install netlify-cli for local dev:
```bash
bunx netlify --version
```

Start Netlify Dev (proxies Vite + serves functions):
```bash
bunx netlify dev
```

In another terminal:
```bash
curl -s http://localhost:8888/.netlify/functions/scheduling-status
```

Expected (if Brayan finished Task 1 and you linked the Netlify site locally with `bunx netlify link`):
```json
{"weeklySlotsLeft":10,"projectWeek":"Week one of May","lastUpdated":"2026-04-17T..."}
```

If Task 1 is not yet complete, expect `{"error":"unavailable"}` — that is correct behavior, not a bug.

Stop with Ctrl+C. Any of the following outcomes is acceptable to move forward: a successful 200 response, an "unavailable" error (Task 1 not done yet), or skipping this step entirely to test in production.

TypeScript errors in the function surface in two places: `netlify dev` prints them when the function is called, and Netlify's deploy fails on build. Type-checking happens transparently through esbuild — no separate `tsc` step is needed.

- [ ] **Step 3: Commit**

```bash
git add netlify/functions/scheduling-status.ts
git commit -m "feat: add scheduling-status netlify function for /availability"
```

---

## Task 4: Build the Availability page component

Single-file React page that fetches the function and renders the three states (loading, error, success).

**Files:**
- Create: `src/pages/Availability.tsx`

- [ ] **Step 1: Create the page file with the full implementation**

Create `src/pages/Availability.tsx`:

```tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SchedulingStatus = {
  weeklySlotsLeft: number | null;
  projectWeek: string;
  lastUpdated: string;
};

const PHONE_DISPLAY = "(630) 664-0303";
const PHONE_TEL = "tel:6306640303";

async function fetchSchedulingStatus(): Promise<SchedulingStatus> {
  const res = await fetch("/.netlify/functions/scheduling-status");
  if (!res.ok) throw new Error("unavailable");
  return (await res.json()) as SchedulingStatus;
}

const Availability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["scheduling-status"],
    queryFn: fetchSchedulingStatus,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Tick every 30s so "Updated X ago" stays current while the tab is open.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Current Availability | Amigos Landscaping</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8 max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-highlight transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>

          <div className="text-center mb-12 md:mb-16">
            <div className="gold-accent mx-auto" />
            <h1 className="section-title text-center">Current Availability</h1>
          </div>

          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {data && <ReadyState data={data} />}
        </div>
      </main>

      <Footer />
    </>
  );
};

const LoadingState = () => (
  <div className="space-y-8">
    <div className="brand-card">
      <div className="h-4 bg-paragraph/10 rounded w-48 mb-4" />
      <div className="h-10 bg-paragraph/10 rounded w-32" />
    </div>
    <div className="brand-card">
      <div className="h-4 bg-paragraph/10 rounded w-48 mb-4" />
      <div className="h-10 bg-paragraph/10 rounded w-40" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="brand-card text-center">
    <p className="font-body text-paragraph leading-relaxed">
      Between updates — text Brayan at{" "}
      <a
        href={PHONE_TEL}
        className="font-semibold text-brand hover:text-highlight transition-colors"
      >
        {PHONE_DISPLAY}
      </a>{" "}
      for the latest.
    </p>
  </div>
);

const ReadyState = ({ data }: { data: SchedulingStatus }) => {
  const updatedAgo = formatDistanceToNow(new Date(data.lastUpdated), {
    addSuffix: true,
  });

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <section className="brand-card text-center">
          <h2 className="font-headline text-sm uppercase tracking-wider text-highlight mb-4">
            Weekly Mowing &amp; Maintenance
          </h2>
          {data.weeklySlotsLeft !== null && data.weeklySlotsLeft > 0 ? (
            <>
              <p className="font-headline text-4xl md:text-5xl text-ink mb-2">
                {data.weeklySlotsLeft} slots left
              </p>
              <p className="font-body text-paragraph">on our weekly route</p>
            </>
          ) : (
            <p className="font-headline text-2xl md:text-3xl text-ink">
              No weekly slots open right now
            </p>
          )}
          <p className="font-body text-sm text-paragraph/70 mt-4">
            mowing, weekly bed upkeep, trimming
          </p>
        </section>

        <section className="brand-card text-center">
          <h2 className="font-headline text-sm uppercase tracking-wider text-highlight mb-4">
            Projects &amp; One-Time Work
          </h2>
          {data.projectWeek ? (
            <>
              <p className="font-body text-paragraph mb-2">
                Currently scheduling
              </p>
              <p className="font-headline text-3xl md:text-4xl text-ink">
                {data.projectWeek}
              </p>
            </>
          ) : (
            <p className="font-headline text-2xl md:text-3xl text-ink">
              Contact us for current project scheduling
            </p>
          )}
          <p className="font-body text-sm text-paragraph/70 mt-4">
            mulch installation, aeration, overseeding, one-time cleanups
          </p>
        </section>
      </div>

      <p className="text-center font-body text-sm text-paragraph/60 mt-6">
        Updated {updatedAgo}
      </p>

      <div className="max-w-2xl mx-auto mt-12 md:mt-16">
        <p className="font-body text-paragraph leading-relaxed text-center italic">
          We get a high volume of requests, and both the weekly route and our
          project calendar fill fast. If you're waiting to accept a quote,
          what's available today may not be by the time you come back.
        </p>
      </div>
    </>
  );
};

export default Availability;
```

Design decisions baked in:
- `staleTime: 60_000` matches the server cache — revisiting the page within a minute won't refetch.
- `refetchOnWindowFocus: false` so the page doesn't flicker when someone alt-tabs.
- `retry: 1` — one quiet retry on failure before showing the error state.
- The 30-second tick keeps "Updated X ago" fresh for a page left open.
- Zero slots renders a distinct message, not "0 slots left".
- Empty `projectWeek` renders a graceful fallback, not an empty hero.
- Error and loading states use the same card shell as the success state, so layout doesn't jump.
- Uses the same existing Tailwind design tokens (`bg-cloud`, `brand-card`, `section-title`, `gold-accent`, `text-brand`, `text-ink`, `text-paragraph`, `text-highlight`, `font-headline`, `font-body`) seen across the site — no new CSS.

- [ ] **Step 2: Local lint and type check**

```bash
bun run lint
```

Expected: no errors introduced by the new file. (Existing warnings in other files are unrelated — do not fix them here.)

Then build to confirm TypeScript compiles:
```bash
bun run build
```

Expected: `vite build` succeeds, `dist/` is regenerated.

- [ ] **Step 3: Manual visual verification (dev server)**

```bash
bun run dev
```

Open http://localhost:8080/availability (or whatever port Vite printed).

Check:
- Page loads with Header and Footer matching the rest of the site.
- Without a running function (plain `bun run dev`, no `netlify dev`), the fetch fails — you should see the error state text: *"Between updates — text Brayan at (630) 664-0303 for the latest."*
- The "Back Home" link is visible and navigates to `/`.
- No console errors (aside from the expected 404 on `/.netlify/functions/scheduling-status`).

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Availability.tsx
git commit -m "feat: add Availability page with loading/error/ready states"
```

---

## Task 5: Wire the route into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the import**

In `src/App.tsx`, add this import alongside the other page imports (alphabetical position, near line 13):

```tsx
import Availability from "./pages/Availability";
```

- [ ] **Step 2: Register the route**

In the `<Routes>` block, add the new route directly above the catch-all `"*"` route (line 50 per current file):

```tsx
<Route path="/availability" element={<Availability />} />
```

The final `<Routes>` section should read (with the new line marked):

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/request-confirmation" element={<RequestConfirmation />} />
  <Route path="/brand-guide" element={<BrandGuide />} />
  <Route path="/plan" element={<Navigate to="/#plan" replace />} />
  <Route path="/recommendations" element={<Recommendations />} />
  <Route path="/services/:categorySlug" element={<ServiceCategoryDetail />} />
  <Route path="/availability" element={<Availability />} />   {/* ← new */}
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

- [ ] **Step 3: Verify the route works in dev**

```bash
bun run dev
```

- Visit http://localhost:8080/availability — renders the page (with error state, since no function running locally).
- Visit http://localhost:8080/availability-typo — renders the NotFound page.
- Visit http://localhost:8080/ — homepage still works, and there is NO visible link to /availability anywhere.

Use the browser's "view page source" on `/availability` and confirm the meta tag `<meta name="robots" content="noindex,nofollow">` is present in the rendered HTML.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: register /availability route"
```

---

## Task 6: End-to-end verification in production

All code is merged on `main`. This task confirms the real thing works in Netlify with the real Notion data.

**Files:** None modified — pure verification.

- [ ] **Step 1: Confirm Brayan finished Task 1**

Before pushing: confirm with Brayan that:
- Notion database "Scheduling Status" exists with the one row.
- The integration is created and shared with the database.
- Both `NOTION_SCHEDULING_TOKEN` and `NOTION_SCHEDULING_DB_ID` are set in Netlify env vars.

If any of these is not done, **stop here** — pushing now would deploy an always-errored page. Complete Task 1, then resume.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

Watch the Netlify deploy complete (check the Netlify dashboard or `bunx netlify watch`).

- [ ] **Step 3: Hit the function directly**

```bash
curl -s https://<your-site>.netlify.app/.netlify/functions/scheduling-status
```

(Substitute the real production URL.) Expected response:
```json
{"weeklySlotsLeft":10,"projectWeek":"Week one of May","lastUpdated":"2026-04-17T..."}
```

If instead you see `{"error":"unavailable"}`:
- Open Netlify dashboard → Functions → scheduling-status → Logs. Read the failure.
- Most common cause: env var typo. Check exact spelling of `NOTION_SCHEDULING_TOKEN` and `NOTION_SCHEDULING_DB_ID`.
- Second most common: integration was not shared with the database (Task 1 Step 4).

- [ ] **Step 4: Visit the page in a browser**

Open `https://<your-site>.netlify.app/availability` and confirm:
- Page renders with the same Header and Footer as the rest of the site.
- Weekly Mowing & Maintenance section shows "10 slots left".
- Projects & One-Time Work section shows "Week one of May".
- "Updated X ago" appears under the project section (should say "a few seconds ago" or similar).
- The honest paragraph appears below.
- No CTA. No link to anywhere but "Back Home".
- `view-source:` on the page shows the `noindex` meta tag.

- [ ] **Step 5: Confirm the unlisted-ness**

- Homepage, services pages, and footer contain no link to `/availability`. (Grep with `bunx grep` or Ctrl-F in the rendered homepage source.)
- Google Search Console (if set up): URL is not in the sitemap.

- [ ] **Step 6: Live edit test (validates the whole point of this feature)**

On Brayan's phone (or in the Notion web app):
1. Open the "Scheduling Status" database.
2. Change Weekly Route Slots Left from `10` to `9`.
3. Wait ~70 seconds (the 60s function cache + time to propagate).
4. Refresh `/availability` in a browser.
5. Confirm it now shows "9 slots left".

If the number does not update after 90+ seconds:
- Hit the function URL directly again (Step 3) — does the JSON reflect the new value?
  - **Yes**: browser is caching. Hard-refresh (Ctrl+Shift+R).
  - **No**: the server cache may be holding. Redeploy or wait another minute.

- [ ] **Step 7: Final sanity sweep**

- Confirm the `/availability` URL is one Brayan is happy to paste into a quote text.
- Confirm the error fallback still says his correct phone number (it does — pulled from the same number used in the site Header/Footer).
- Mark the project complete.

No commit — Task 6 is verification only.

---

## Completion checklist

Before declaring done:

- [ ] `netlify.toml` exists at the repo root with functions dir set.
- [ ] `netlify/functions/scheduling-status.ts` exists and returns JSON when called in production.
- [ ] `src/pages/Availability.tsx` exists, renders three states cleanly, and uses existing design tokens.
- [ ] `src/App.tsx` has `/availability` route registered above the catch-all.
- [ ] `@netlify/functions` is listed as a devDependency in `package.json`.
- [ ] Notion DB, integration, and Netlify env vars are configured.
- [ ] Production URL returns live data and reflects Notion edits within ~60-90 seconds.
- [ ] No link from the rest of the site points at `/availability`.
- [ ] `noindex` meta tag is present in the rendered HTML.
