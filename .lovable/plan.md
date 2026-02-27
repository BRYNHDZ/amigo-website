

## Add Subtle Hyperlink CTA Above the Jobber Form

### What Changes

**`src/components/JobberForm.tsx`**

1. Update the subtext under "Request a One-Time Job" to say *"...we'll get back to you **usually** within one business day."* (softer promise)

2. Add a small, inline hyperlink sentence right below that subtext — something like:

   > *Want us to take care of your property year-round?* [Build your Property Plan](/plan)

   This will be styled as regular paragraph text with the link portion using the brand green color and an underline — it reads naturally, feels clickable, but doesn't compete with the form below it.

3. Remove the large Year-Round CTA block at the bottom (the big heading, paragraph, and "Build My Property Plan" button from lines 55-66), along with the now-unnecessary `ArrowRight` import.

### Result

The section flows like:

```text
"Request a One-Time Job"
"Need something specific handled? Send us the details
and we'll get back to you usually within one business day."

"Want us to take care of your property year-round? Build your Property Plan"
                                                   ^^^^^^^^^^^^^^^^^^^^^^^^
                                                   (subtle green hyperlink)

[ Jobber Form ]
```

Clean, no competing CTAs, and the planner link is discoverable without being pushy.

### Files to change
- **`src/components/JobberForm.tsx`** — Update subtext wording, add inline link sentence, remove the large bottom CTA block and unused `ArrowRight` import.

