# Availability Page — Design

**Date:** 2026-04-17
**Status:** Approved, pending implementation plan

## Problem

Every quote Brayan sends generates the same follow-up question: *"What does the scheduling look like?"* Answering it eats time and the answer changes daily. There's no shareable artifact — the information exists only in Brayan's head.

At the same time, Amigos runs two separate operational tracks, and leads don't always know which one applies to them:

1. **Weekly Route** — recurring mowing + weekly bed maintenance + trimming. Capacity-constrained by number of route slots.
2. **Projects / One-Time Work** — mulch installation, aeration, overseeding, one-time cleanups. Constrained by which week on the calendar we're currently scheduling.

## Goal

A single unlisted page Brayan can link in quotes and text replies that answers "what does scheduling look like" honestly, in ten seconds of reading, for both tracks. Updatable from his phone in under 15 seconds.

## Non-Goals

- Not public marketing content. Not linked from nav, footer, or homepage. `noindex`.
- No CTA back to the PlanQuiz or contact form. The page's job is to set expectations for people who already have a quote in hand, not to convert browsers.
- No authentication, no admin UI. Edits happen in the Notion mobile app.
- No automatic integration with the actual scheduling system. Numbers are Brayan-curated.
- No plan-quiz or Jobber integration of any kind.

## URL and visibility

- Route: **`/availability`**
- No links from nav, footer, or homepage.
- `<meta name="robots" content="noindex,nofollow">` via react-helmet-async.
- If someone stumbles onto the URL directly, that's fine — no active blocking.

## Page content

Top-to-bottom:

1. **Page shell** — same nav and footer components as the rest of the site.
2. **Heading:** `Current Availability`
3. **Section 1 — Weekly Mowing & Maintenance**
   - Emphasized number: `{weeklySlotsLeft} slots left`
   - Subtext: "on our weekly route"
   - Services subtext: "mowing, weekly bed upkeep, trimming"
4. **Section 2 — Projects & One-Time Work**
   - Label: "Currently scheduling"
   - Emphasized text: `{projectWeek}` (e.g., "Week one of May")
   - Services subtext: "mulch installation, aeration, overseeding, one-time cleanups"
5. **Updated timestamp:** small gray "Updated X minutes ago" derived from Notion's `last_edited_time`.
6. **Honest paragraph (hardcoded)** — draft copy (Brayan may tune in code later):
   > "We get a high volume of requests, and both the weekly route and our project calendar fill fast. If you're waiting to accept a quote, what's available today may not be by the time you come back."

### Edge cases

- **`weeklySlotsLeft === 0`** — Section 1 shows "No weekly slots open right now" instead of the number, no "0" displayed.
- **`projectWeek` is empty** — Section 2 shows "Contact us for current project scheduling" in place of the week.
- **Notion API fails / unreachable** — page shows: "Between updates — text Brayan at (630) 664-0303 for the latest." No raw errors. (Phone number is the one already used in the site header and footer; reference it from a single source rather than hardcoding it a third time.)
- **Loading** — skeleton placeholders in both sections while the fetch lands (typical ~300ms).

## Notion data source

A new Notion database named **"Scheduling Status"** with exactly one row. Schema:

| Field name (Notion) | Type | Example |
|---|---|---|
| Project Scheduling Week | Title (Notion databases require one title property) | `Week one of May` |
| Weekly Route Slots Left | Number | `10` |

Making "Project Scheduling Week" the database's title property avoids adding a dummy title. Row parsing takes the first row returned by the Notion query — the database is expected to hold exactly one row by convention.

Notion's built-in `last_edited_time` on the row provides the "Updated X ago" timestamp. No separate field needed.

Initial seed values: title = `Week one of May`, slots = `10`.

## Technical architecture

### Data flow

```
Browser (/availability)
  └─ fetch /.netlify/functions/scheduling-status
       └─ Netlify Function
            ├─ reads NOTION_TOKEN from env
            ├─ reads NOTION_SCHEDULING_DB_ID from env
            ├─ 60-second in-memory cache check
            ├─ calls Notion API (query database, take first row)
            └─ returns JSON
```

### Netlify Function

New file: `netlify/functions/scheduling-status.ts`

Responsibilities:
- Read `NOTION_TOKEN` and `NOTION_SCHEDULING_DB_ID` from env.
- Query the Notion database via `https://api.notion.com/v1/databases/{id}/query` (POST).
- Parse the first row and extract the two fields + `last_edited_time`.
- Cache the parsed result in module-scope memory for 60 seconds.
- Return JSON:
  ```json
  {
    "weeklySlotsLeft": 10,
    "projectWeek": "Week one of May",
    "lastUpdated": "2026-04-17T14:32:00Z"
  }
  ```
- On error: respond with HTTP 502 and `{ "error": "unavailable" }` so the client can render the fallback message.

### Frontend page

New file: `src/pages/Availability.tsx`

- Uses TanStack Query (already in the project) to fetch from `/.netlify/functions/scheduling-status`.
- `staleTime: 60_000` (matches server cache) so navigating back doesn't re-fetch unnecessarily.
- Renders loading, error, and success states as described in Edge Cases.
- Renders `last_updated` as a relative time ("Updated 12 minutes ago"). Recomputes on a short interval while the page is open (e.g., every 30 seconds) so the label doesn't go stale if the tab is left open.
- `<Helmet>` adds `<title>Current Availability — Amigos Landscaping</title>` and the `noindex` robots meta tag.

### Routing

Register the route in `src/App.tsx` above the catch-all:
```tsx
<Route path="/availability" element={<Availability />} />
```

### Configuration Brayan sets up once

1. In Notion: create the "Scheduling Status" database with the schema above. Add the one row with initial values.
2. Create a Notion internal integration, share the database with it, copy the secret token.
3. In Netlify site settings, add two environment variables:
   - `NOTION_TOKEN` — the integration secret
   - `NOTION_SCHEDULING_DB_ID` — the database ID from the Notion URL

Documented explicitly in the implementation plan so nothing gets missed.

### First Netlify Function for this site

This project currently has no `netlify/functions/` directory and no `netlify.toml`. Implementation will need to:
- Create the `netlify/functions/` directory.
- Either rely on Netlify's default function path auto-detection (works if functions sit at `netlify/functions/`) or add a minimal `netlify.toml` declaring the directory.
- Ensure TypeScript compilation for the function works with the current Vite setup.

## Success criteria

- Brayan can edit two values in the Notion mobile app and see the site reflect them within 60 seconds.
- The Notion API token never appears in client-side code or network traffic visible to the browser.
- Visitors landing at `/availability` see either current data, a clear loading state, or a graceful fallback — never a raw error.
- The page is not indexed by search engines and is not linked from the main site.
- No existing page behavior changes.
