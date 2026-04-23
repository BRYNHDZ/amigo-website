# Brand Operating System — Session Handoff

**Date:** 2026-04-23
**Status:** Shipped. Ready to pick up later for deeper experimentation.

## What This Session Built

A complete Amigos brand operating system, split across three artifacts that stay in sync:

### 1. The Skill (AI-facing)
**Path:** `C:/Users/HdzBr/.claude/skills/amigos-brand/SKILL.md`

Auto-loads whenever Amigos Landscaping is mentioned in a Claude Code session. 13 sections covering:

- §1 Identity + positioning one-liner
- §2 **Signature move — Pico dresses for the job** (role library + candidate costumes)
- §3 Color system (10 hex tokens, including CMYK for print)
- §4 Typography + **font portability fallback strategy** for email
- §5 Layout & spacing (3-layer depth model)
- §6 **Photography** — display rules + AI image generation prompt + ethics rule (AI images are vision-only, never before/after)
- §7 UI components (8 locked decisions — see below)
- §8 Motion character
- §9 Logo system
- §10 Icons (Lucide, outline only)
- §11 Voice (compact)
- §12 Golden Rules (7)
- §13 **Campaign Production** — the 6-block spine + workflow + 3 worked examples + markdown template; framed explicitly as *"foundation, not law"* with rigid-vs-flexible split
- §14 "Does this look like Amigos?" checklist

### 2. The Brand Guide Page (human-facing)
**Path:** `src/pages/BrandGuide.tsx` → live at `/brand-guide`

10 nav sections, each with real styled demos:

1. Identity & Tone
2. Visual System (absorbs the Inter "Nuclear" Hero Lab comparison)
3. Logo
4. Pico the Mascot (with **signature-move callout + 4-role library + 4 candidate costumes**)
5. Photography (display rules + AI image rule + **Copy Prompt button** pasting the canonical JSON)
6. UI Toolkit (opens with Depth Model; then Buttons, Cards, Section Header, Badges, Stats, Lists — each with explicit teaching-style spec bullets)
7. Campaigns (spine diagram + 90% Done Workflow + worked Mulch example + **Copy Template button**; framed as foundation, not law)
8. Motion
9. Fleet & Uniforms
10. The Law (7 Golden Rules)

### 3. Memory (persists across Claude Code sessions)
**Path:** `C:/Users/HdzBr/.claude/projects/c--Users-HdzBr-OneDrive-Desktop-Amigos-Website-amigo-website/memory/`

New entries from this session:
- `project_font_portability.md` — email fallback strategy
- `project_quote_cover_images.md` — canonical AI image prompt + never-as-before/after ethics rule

## Locked Brand Decisions

All 8 UI component decisions made via visual brainstorming and locked on the page + skill:

| Component | Decision |
|---|---|
| Photos | Treatment A — 1.5rem radius, no shadow, no border |
| Buttons | P1 Primary Gold + P2 Primary Dark (green). **No ghost button.** Two-action layouts use gold + green. |
| Cards | C1 Standard + C2 Brand Dark (palate cleanser, rare) + C4 Callout. **No service card.** |
| Section header | Pattern B — eyebrow label + title + paragraph (no gold bar) |
| Badges | NEW (green) + POPULAR (gold) + Category (grey). **No urgency badge.** |
| Stats strip | 4-column horizontal on a Standard Card |
| Lists | L2a Checklist + L3 Numbered Steps. **No neutral bulleted lists.** |
| Signature | **"Pico dresses for the job"** — never inside buttons |

## Color Precision Sweep

Done during this session. Key change:
- `#F9FBE7` (Callout Yellow) promoted from ad-hoc hex to named `callout` Tailwind token
- 17 hardcoded `bg-[#F9FBE7]` instances replaced with `bg-callout` across Plan, Recommendations, BrandGuide, PlanQuiz, AerationOverseedingDiagram, ProfessorCallout
- `hover:bg-black` fixed on Export PDF button

**Intentionally left alone** (not drift):
- Red/green Tailwind defaults in DO/DON'T teaching patterns
- `bg-black/80` on shadcn Dialog/Drawer/Sheet overlays (UI primitives)
- Google logo colors in ReviewWall (trademark)

## How to Use This System

### In Claude Code (building Amigos assets)
Just mention Amigos in your prompt. The `amigos-brand` skill auto-loads. Every rule — color, type, component spec, voice, campaign spine — is in scope.

### In the browser (visual reference / sharing with others)
Open `/brand-guide`. Each section has real rendered components with spec bullets. The two **Copy** buttons give you:
- AI image generation prompt (Photography section)
- Campaign brief template (Campaigns section)

### Framing to remember
The brand system is **foundation, not law**. Rigid parts (colors, type, Pico rules, voice, photo rules) always apply. The campaign spine + component layouts are defaults — break them intentionally when a specific idea earns it.

## Open Threads (punch list for later)

**Near-term:**
- [ ] Upload Pico image files — Mascot section currently has placeholder "Mascot Image" dashed box. Pico role library uses Lucide icon placeholders (GraduationCap, DollarSign, Snowflake, Flame) instead of real Pico-in-costume PNGs. Replace when art is ready.

**Medium-term experimentation:**
- [ ] Pattern / background library — deferred this session. Brayan wants to let things emerge freestyle rather than pre-design patterns. Revisit if specific motifs (leaf scatter, grass-blade edges, mulch dots) start recurring organically.
- [ ] Add 2nd and 3rd worked campaign examples to the `/brand-guide` Campaigns section (currently only Mulch is rendered on-page; Aeration & Snow live in the skill).

**Longer-term:**
- [ ] Build sibling `amigos-voice` skill — dedicated copywriting rules (subject lines, headline patterns, tone gradients by medium). This session's skill has a compact §11 Voice but deliberately left deep copy rules for a future split.
- [ ] Extend Pico role library as content demands — Crew-Vest, Mulch-Bag, Rake, Spring, Summer, Fall variants. Build on demand, not upfront.

## Key File Paths

- Skill: `C:/Users/HdzBr/.claude/skills/amigos-brand/SKILL.md`
- Live page: `src/pages/BrandGuide.tsx` → `/brand-guide`
- Tailwind tokens: `tailwind.config.ts` (colors block) + `src/index.css` (CSS variable values)
- Memory: `C:/Users/HdzBr/.claude/projects/c--Users-HdzBr-OneDrive-Desktop-Amigos-Website-amigo-website/memory/`

## Notes for the Next Session

If the next session touches this area:

- Read the skill file first. It's the source of truth. The page renders it; the memory notes load it across sessions.
- Don't invent new brand tokens without updating SKILL.md + `index.css` + `tailwind.config.ts` + the brand guide palette all in sync.
- Teaching-style spec bullets on the brand guide page are a deliberate pattern. When adding new components, follow the same structure: visual demo → name + 1-line description → explicit bullet spec.
- "Foundation not law" applies to the campaign spine. Don't tighten it into a requirement in future edits.
