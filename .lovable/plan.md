

## Reframe the Quote Form Section with Clear Distinction

### The Problem
"Request a One-Time Job" is misleading — the Jobber form covers all services, not just one-time work. The Property Planner link blends in without explaining *why* someone would choose it over the simpler form. Users need to instantly understand: **quick request vs. detailed year-round roadmap**.

### The Solution

**Rename and rewrite the Jobber form section copy in `src/components/JobberForm.tsx`:**

**New heading:** "Request a Quote"

**New subtext:** "Tell us what you need and we'll get back to you — usually within one business day."

**New hyperlink line:** "Looking for a full property plan? Our Property Planner walks you through every service so we can build a year-round roadmap tailored to your property."

The word "Property Planner" stays as the clickable link. This clearly tells the user: the form above is for quick, straightforward requests. The planner is for people who want the in-depth, guided experience covering mowing, beds, mulch, snow, leaves — the whole picture.

### What This Achieves
- **Quote form** = "I know what I need, just take my info" (fast, simple)
- **Property Planner** = "I want help figuring out everything my property needs" (guided, detailed)
- No competing CTAs — just a natural sentence that explains the difference

### Files to Change
- **`src/components/JobberForm.tsx`** — Update the section heading from "Request a One-Time Job" to "Request a Quote", revise the subtext to remove the one-time implication, and rewrite the hyperlink sentence to clearly explain when/why to use the Property Planner instead.
