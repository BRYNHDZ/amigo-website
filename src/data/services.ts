/**
 * Service catalog — canonical data for the Services grid on the homepage
 * and for each dedicated service detail page at /services/:slug.
 *
 * Content is pulled from the Notion "Service Pricing Catalog" database
 * and the "Service Scheduling Map" page. Internal pricing formulas are
 * intentionally kept out of this file — those are quote-conversation material.
 * Pricing descriptions here are plain-language explanations of HOW pricing
 * works, not dollar amounts.
 */

export type ServiceCategorySlug =
  | "lawn-care"
  | "flower-beds"
  | "trimming"
  | "cleanups"
  | "winter";

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  title: string;
  icon: "Scissors" | "Flower2" | "Brush" | "Wind" | "Snowflake";
  tagline: string; // Short pitch for category cards
  description: string; // Longer hero paragraph for the detail page
}

export interface ServiceTier {
  name: string; // Official tier name (e.g., "Nutrient Standard")
  headline: string; // Plain-language title for the card
  description: string; // What it is + why someone picks it
  isPopular?: boolean;
  planOnly?: boolean; // True if this tier is only offered to mowing-plan members
}

export interface ServiceAddOn {
  name: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string; // Short name for the homepage tile ("Mowing")
  notionName: string; // Official Notion name ("Weekly Lawn Maintenance")
  category: ServiceCategorySlug;
  tagline: string; // One-sentence pitch
  hero: string; // 2–3 sentence intro for the detail page
  whatsIncluded: string[];
  whatsNotIncluded?: string[];
  howItWorks?: { heading: string; body: string }[];
  tiers?: ServiceTier[];
  addOns?: ServiceAddOn[];
  scheduling?: {
    anchor?: string;
    window?: string;
    note?: string;
  };
  requiresMowingPlan?: boolean;
  isAddOn?: boolean;
  relatedSlugs?: string[];
  /**
   * Gate the ProfessorCallout to services with genuine education content
   * (what it is, why it matters), not just operational descriptions.
   */
  showProfessorCallout?: boolean;
}

export const categories: ServiceCategory[] = [
  {
    slug: "lawn-care",
    title: "Lawn Care",
    icon: "Scissors",
    tagline: "Weekly mowing + everything that keeps your lawn thick and green.",
    description:
      "Lawn care is the backbone of what we do. Weekly professional mowing from April through November, plus the aeration and overseeding services that actually move the needle on lawn health. Everything here is built around one principle: show up consistently, care for your lawn like it's ours, and never surprise you with what we did or what it cost.",
  },
  {
    slug: "flower-beds",
    title: "Flower Bed Care",
    icon: "Flower2",
    tagline: "Keep your beds looking intentional, all season long.",
    description:
      "Flower beds either look cared for or they look forgotten — there's not much in between. Everything in this category exists to keep your beds on the 'cared for' side of that line: ongoing weed control, mulch installs, crisp edging, and deep resets for beds that need a starting-over moment before maintenance can begin.",
  },
  {
    slug: "trimming",
    title: "Trimming & Pruning",
    icon: "Brush",
    tagline: "That tight, kept-up look on every bush and flower around your home.",
    description:
      "Professional shaping is what gives bushes that deliberate, well-kept silhouette — and knowing when to prune perennial flowers is what makes them bloom stronger next year. Both are small, high-impact services that change how your whole property reads from the curb.",
  },
  {
    slug: "cleanups",
    title: "Seasonal Cleanups",
    icon: "Wind",
    tagline: "Reset the property before spring and handle fall on autopilot.",
    description:
      "Every season has a reset point. Spring Cleanup clears the winter mess before anything starts growing again. Leaf Care handles fall week-by-week during regular mowing visits so leaves never pile up. One-Time Property Cleanup is for the people who don't have a mowing plan but still want fall handled in a single comprehensive visit.",
  },
  {
    slug: "winter",
    title: "Winter Services",
    icon: "Snowflake",
    tagline: "Driveways and walkways cleared — on your schedule or ours.",
    description:
      "Our winter services run 24/7 from the first qualifying snowfall through March 31. You pick the trigger threshold — the point at which we show up — and we handle the rest with unlimited visits per qualifying event. Salt treatment is the add-on that keeps surfaces from refreezing after we clear.",
  },
];

export const services: Service[] = [
  // ─────────────────────── LAWN CARE ───────────────────────
  {
    slug: "mowing",
    name: "Mowing",
    notionName: "Weekly Lawn Maintenance",
    category: "lawn-care",
    tagline: "Weekly professional mowing that actually looks professional.",
    hero:
      "Our recurring mowing service is the backbone of most Amigos property plans. We mow, string-trim, and blow every hard surface on a consistent weekly rhythm so your lawn always looks like it's being cared for, not just cut.",
    whatsIncluded: [
      "Weekly professional mowing of all turf areas",
      "String trimming around edges, obstacles, and beds",
      "Blowing of driveways, walkways, and hard surfaces",
      "Consistent cut height dialed to your lawn's health",
    ],
    howItWorks: [
      {
        heading: "Weekly cadence, not a locked-in day",
        body: "What we guarantee is the weekly rhythm — you'll see us roughly the same day each week, but weather and growth can shift things a day or two. The point of a plan isn't 'every Tuesday at 10 AM,' it's that your lawn is never the one that got forgotten this week.",
      },
      {
        heading: "When the season starts and ends",
        body: "Mowing kicks off in late March to mid-April depending on the weather — we go as soon as the lawn is actively growing and the ground isn't too wet. The season ends when leaves get too heavy for mowing to be practical, usually late October. If you have Fall Leaf Care on your plan, we extend visits through the end of November to handle leaves on the same schedule.",
      },
      {
        heading: "Your tier decides what happens on each visit",
        body: "Every visit includes mowing, string trimming, and blowing. What changes between tiers is how we handle the clippings — Nutrient Standard mulches them back into the lawn as natural fertilizer, Pristine Standard bags and hauls them away for a spotless finish. Same cadence, different finish.",
      },
    ],
    tiers: [
      {
        name: "Nutrient Standard",
        headline: "Mulching Finish",
        description:
          "Grass clippings are finely mulched and returned to the lawn, where they act as a natural fertilizer that feeds the soil. Keeps the surface clean with zero waste.",
        isPopular: true,
      },
      {
        name: "Pristine Standard",
        headline: "Bagging Finish",
        description:
          "Same weekly visits, but clippings are bagged and removed from the property after every mow for a consistently spotless appearance.",
      },
    ],
    scheduling: {
      anchor: "Late March to mid-April start",
      window: "Runs weekly through leaf drop (or end of November with Fall Leaf Care)",
    },
    relatedSlugs: ["leaf-care", "weeding", "aeration"],
  },
  {
    slug: "aeration",
    name: "Aeration",
    notionName: "Spring & Fall Aeration",
    category: "lawn-care",
    tagline: "The single biggest move for a thicker, healthier lawn.",
    hero:
      "Aeration is the process of poking small holes in your lawn to let air, water, and nutrients reach the roots. Think of it like giving your soil room to breathe. If your grass looks thin, patchy, or doesn't bounce back after a dry spell, the problem might be hiding underground: compacted soil.",
    whatsIncluded: [
      "Mechanical core aeration across all turf areas",
      "Pulled cores left on the lawn to break down naturally",
      "Natural pairing with overseeding for fastest thickening",
    ],
    howItWorks: [
      {
        heading: "Why your lawn needs this",
        body: "Over time, foot traffic, mowing, and weather pack the soil down tight. That makes it harder for your grass to grow strong roots — and weak roots mean a weak lawn. Aeration opens the soil back up so your lawn can actually do its job.",
      },
      {
        heading: "What aeration actually does for you",
        body: "Aeration helps your lawn absorb water and fertilizer more efficiently, develop deeper and healthier roots, resist drought, disease, and weeds, and recover faster from wear and tear. It's the one service that compounds — the benefits build year over year.",
      },
      {
        heading: "Spring is usually the better window",
        body: "Spring aeration catches your lawn right as it's waking up and gives the grass a head start before weeds and summer stress kick in. Fall aeration works too, but in Illinois the spring window tends to win because you're establishing strong grass ahead of the competition. The one exception: if you're applying crabgrass pre-emergent in spring, that blocks grass seed too — so if you want to pair aeration with overseeding, we move it to fall.",
      },
    ],
    scheduling: {
      anchor: "Spring (preferred) — mid-March to early April",
      window: "Spring or fall, depending on your overseeding plans",
      note: "Soil needs to be moist but not saturated. We'll schedule the optimal window after you approve the quote.",
    },
    showProfessorCallout: true,
    relatedSlugs: ["overseeding", "mowing", "cleanup"],
  },
  {
    slug: "overseeding",
    name: "Overseeding",
    notionName: "Spring & Fall Overseeding",
    category: "lawn-care",
    tagline: "Strengthen a thin lawn with fresh grass seed.",
    hero:
      "Here's where most people get confused: overseeding is NOT to fill in bare spots. Overseeding is spreading seed across your entire lawn to strengthen it. It makes the turf healthier and more resilient over time, so weeds have a harder time getting a foothold.",
    whatsIncluded: [
      "High-quality grass seed matched to your lawn type",
      "Two full passes (north–south and east–west) for even coverage",
      "Best results when paired with aeration on the same visit",
    ],
    whatsNotIncluded: [
      "Overseeding strengthens existing turf — it does NOT fill large bare or severely damaged areas. Those need hydroseeding or sod.",
    ],
    howItWorks: [
      {
        heading: "Aeration opens the soil. Overseeding strengthens it.",
        body: "The two services work together. Aeration opens up the soil so grass can breathe and seed can make direct soil contact. Overseeding then builds thicker, stronger turf across the whole lawn. Combine them and you get thicker turf that crowds weeds out naturally, better coverage and color, and a lawn that handles stress (heat, foot traffic, drought) way better.",
      },
      {
        heading: "How Amigos does overseeding better",
        body: "A lot of companies make one quick pass with the seed spreader and call it done. That leaves gaps — and gaps mean uneven results. We make two full passes: one north to south, one east to west. Your lawn gets even coverage with no dead zones.",
      },
      {
        heading: "When to do it",
        body: "Spring is usually the better window in Illinois because you're getting ahead of summer weeds. The catch is crabgrass pre-emergent — if you're applying pre-emergent in spring, it blocks grass seed from germinating too. In that case, we move overseeding to fall. We'll help you figure out which window fits your lawn.",
      },
    ],
    scheduling: {
      anchor: "Usually spring — paired with aeration",
      window: "Spring (preferred) or fall",
    },
    showProfessorCallout: true,
    relatedSlugs: ["aeration", "mowing"],
  },

  // ─────────────────────── FLOWER BED CARE ───────────────────────
  {
    slug: "weeding",
    name: "Weeding",
    notionName: "Garden Bed Maintenance",
    category: "flower-beds",
    tagline: "Keep your beds weed-free — a few ways to get it done.",
    hero:
      "Weeding is weeding. What changes is how often we do it and whether it's built into a larger plan. We offer two ongoing weeding tiers for mowing-plan members (handled automatically on your weekly visits), plus a one-time weeding service for everyone else.",
    whatsIncluded: [
      "Weed control tailored to how you want your beds to look",
      "Light bed upkeep — clearing debris, fallen leaves, stray growth",
      "Clean finish, every visit",
    ],
    howItWorks: [
      {
        heading: "Two approaches, your pick",
        body: "Basic weed control uses string trimmers to mechanically knock back visible weed growth — the roots stay in the ground, but the beds look tidy from the curb. Hand-pulled detail removes weeds from the root and includes a Preen application to prevent new weeds from sprouting. It's the difference between 'looks fine' and 'looks sharp.'",
      },
      {
        heading: "Ongoing vs one-time",
        body: "If you're on a mowing plan, we handle weeding automatically on your weekly visits — no scheduling, no surprise overgrowth. If you're not on a plan, you can book a one-time weeding visit whenever the beds need it. The ongoing tiers are plan-only because the pricing only works when we're already on your property every week.",
      },
    ],
    tiers: [
      {
        name: "Clean Look Plan",
        headline: "Basic Weed Control (Ongoing)",
        description:
          "String-trimmer weed control on the recurring weekly route. Mechanical trim only — no hand pulling. A tidy, maintained look for a practical price.",
        planOnly: true,
      },
      {
        name: "Estate Detail Plan",
        headline: "Hand-Pulled Detail (Ongoing)",
        description:
          "Weeds hand-pulled from the root for a pristine bed surface, plus a Preen application to prevent new weed growth. Beds stay crisp all season.",
        isPopular: true,
        planOnly: true,
      },
      {
        name: "One-Time Weeding",
        headline: "One-Time Visit",
        description:
          "A single weeding visit booked on demand — available whether or not you're on a mowing plan. Can be basic (string trimmer) or detail (hand-pulled from root) — we'll confirm which before quoting.",
      },
    ],
    scheduling: {
      anchor: "Ongoing: follows mowing start · One-time: on demand",
      window: "April – November for ongoing, anytime for one-time",
    },
    relatedSlugs: ["mulch", "edging", "bed-reset"],
  },
  {
    slug: "edging",
    name: "Edging",
    notionName: "Bed Edging",
    category: "flower-beds",
    tagline: "Crisp, defined borders between your lawn and your beds.",
    hero:
      "A clean edge is what separates a maintained property from a professionally cared-for one. We cut and restore the border between your lawn and your flower beds, giving every bed a sharp, defined outline.",
    whatsIncluded: [
      "Fresh, hand-cut edges along every lawn/bed border",
      "Debris cleared and beds left ready for mulch or upkeep",
    ],
    howItWorks: [
      {
        heading: "Usually paired with mulch installation",
        body: "Edging is naturally part of our Mulch Installation service — when we come out to install mulch, we re-edge everything as part of the job. You only need to book edging on its own if you don't want mulch but still want that crisp border restored.",
      },
    ],
    scheduling: {
      anchor: "Spring (peak) or as needed",
      window: "April – June (peak), or anytime",
    },
    relatedSlugs: ["mulch", "weeding", "bed-reset"],
  },
  {
    slug: "mulch",
    name: "Mulch Installation",
    notionName: "Mulch Installation",
    category: "flower-beds",
    tagline: "A full spring reset for beds you're proud of.",
    hero:
      "Our spring mulch install is the single highest-impact thing you can do for curb appeal in one visit. Fresh edges, a clean layer of dark brown mulch, and a pre-emergent weed preventer to keep beds looking sharp through summer.",
    whatsIncluded: [
      "Natural dark brown mulch — delivered and installed",
      "Even-depth spread across every existing bed",
      "Fresh bed edging along every lawn/bed border",
      "Complimentary Preen (pre-emergent weed preventer) application",
    ],
    whatsNotIncluded: [
      "New flower bed creation",
      "Reclaiming undefined or overgrown areas into new beds",
      "Turf removal to form new beds",
      "Tree rings, unless they're already established beds",
    ],
    howItWorks: [
      {
        heading: "Refresh, not redesign",
        body: "This service refreshes existing beds — it does not redesign or expand them. If you're looking to create new beds, reclaim overgrown areas, or do landscape design work, that's a different conversation and we quote it separately.",
      },
      {
        heading: "Spring is peak — book early",
        body: "Most clients want mulch installed in April through mid-May, which is when the crew is at maximum capacity for mulch work. We accept installs through June 30 but the earlier you're on the schedule the better.",
      },
    ],
    scheduling: {
      anchor: "First Monday of May",
      window: "Early April – June 30 (peak: April to mid-May)",
    },
    relatedSlugs: ["weeding", "edging", "bed-reset"],
  },
  {
    slug: "bed-reset",
    name: "Bed Reset",
    notionName: "Bed Reset / Garden Cleanup",
    category: "flower-beds",
    tagline: "One-time deep cleanup for beds that have gotten out of hand.",
    hero:
      "Sometimes beds are past the point where regular maintenance can save them. A Bed Reset is a thorough one-time cleanup — weeds pulled, debris cleared, dead plant material removed — that brings beds back to a clean, maintainable baseline.",
    whatsIncluded: [
      "Thorough one-time cleanup of flower beds",
      "Removal of accumulated weeds, debris, and dead plant material",
      "Beds left at a clean, maintainable baseline",
    ],
    howItWorks: [
      {
        heading: "Often required before starting a maintenance plan",
        body: "If your beds are in rough shape, we almost always recommend a Bed Reset before starting a recurring Garden Bed Maintenance plan. Trying to layer ongoing maintenance on top of a heavily overgrown bed doesn't work — you just end up fighting weeds forever. Reset first, then maintain.",
      },
      {
        heading: "Common prerequisite before mulch",
        body: "We also recommend a Bed Reset before mulch installation if the beds have gotten overgrown. Installing mulch on top of weeds and debris just hides the problem for a few weeks. A reset first means the mulch actually lasts.",
      },
    ],
    scheduling: {
      anchor: "Spring (peak) or as needed",
      window: "April – June (peak), or anytime",
    },
    relatedSlugs: ["weeding", "mulch", "edging"],
  },

  // ─────────────────────── TRIMMING & PRUNING ───────────────────────
  {
    slug: "bushes",
    name: "Bushes",
    notionName: "Shrub & Bush Shaping",
    category: "trimming",
    tagline: "That tight, kept-up silhouette on every bush around your home.",
    hero:
      "Professional shaping is what gives bushes that clean, deliberate silhouette. We work from ground level with handheld tools — no ladders, no tree work — and restore a neat, balanced shape that holds through the season.",
    whatsIncluded: [
      "Hand shaping with handheld tools from ground level",
      "Restoration of a clean, balanced silhouette",
      "Clippings cleaned up and removed",
    ],
    whatsNotIncluded: [
      "Tree work (we don't climb or use ladders for this service)",
      "Major renovation pruning on overgrown or neglected bushes — that's a separate job",
    ],
    howItWorks: [
      {
        heading: "Three tiers based on how much upkeep you want",
        body: "Annual Shaping is one professional visit a year, usually early June after the spring growth flush. Bi-Annual Shaping adds a second visit later in the season for faster-growing landscapes. Premium Managed Shaping is the fully hands-off option — we come out whenever bushes start looking shaggy, as many times as it takes to keep them tight all season.",
      },
    ],
    tiers: [
      {
        name: "Annual Shaping",
        headline: "Yearly Shape-Up",
        description:
          "One professional visit a year to restore a clean, balanced shape. Scheduled after the spring growth flush, usually early June.",
        isPopular: true,
      },
      {
        name: "Bi-Annual Shaping",
        headline: "Twice-a-Year Upkeep",
        description:
          "Two professional visits a year — spring and mid-season — for faster-growing landscapes that need more frequent touch-ups.",
      },
      {
        name: "Premium Managed Shaping",
        headline: "Premium Upkeep",
        description:
          "Ongoing shaping throughout the season, performed as needed whenever growth gets excessive. Requires an active mowing plan.",
      },
    ],
    scheduling: {
      anchor: "First Monday of June",
      window: "May 25 – June 20 (managed tier runs ongoing)",
    },
    relatedSlugs: ["perennials", "weeding", "mulch"],
  },
  {
    slug: "perennials",
    name: "Perennials",
    notionName: "Perennial Flower Pruning",
    category: "trimming",
    tagline: "Technical pruning timed to make your flowers bloom stronger.",
    hero:
      "Perennial flowers need pruning at specific times of the year to bloom their best. Cut them back too early and you lose blooms; cut them back too late and you weaken next year's growth. This service handles the timing for you.",
    whatsIncluded: [
      "Seasonal cut-back of perennial flowers at appropriate times",
      "Typically two sessions per year — spring cut-back and/or fall cut-back depending on the plant",
      "Cleanup of clippings",
    ],
    whatsNotIncluded: [
      "Shrub or bush trimming (separate service)",
      "Tree pruning",
    ],
    scheduling: {
      anchor: "Seasonally timed",
      window: "Spring cut-back and/or fall cut-back as the plants require",
    },
    isAddOn: true,
    relatedSlugs: ["bushes", "weeding"],
  },

  // ─────────────────────── SEASONAL CLEANUPS ───────────────────────
  {
    slug: "cleanup",
    name: "One-Time Cleanup",
    notionName: "Spring / Fall Cleanup",
    category: "cleanups",
    tagline: "A single reset visit — spring or fall — that resets the whole property.",
    hero:
      "Whether you're starting the season after a long winter or wrapping up after a heavy leaf drop, a one-time cleanup resets your lawn and beds in a single visit. Same scope either way — the only thing that changes is the timing.",
    whatsIncluded: [
      "Removal of leaves, sticks, and debris from the lawn",
      "Clearing of flower beds",
      "Removal of dead plant material",
      "Collection and staging of debris",
    ],
    whatsNotIncluded: [
      "Trimming or pruning",
      "Bed edging",
      "Mulch installation",
    ],
    howItWorks: [
      {
        heading: "Spring or fall — same service, different timing",
        body: "Spring cleanups run late February through mid-March to clear the winter mess before anything starts growing. Fall cleanups run October through December to handle the final leaf drop for people who aren't on recurring Leaf Care. Either way, one visit and the property is reset.",
      },
    ],
    tiers: [
      {
        name: "Nutrient Standard",
        headline: "Shredded & Returned",
        description:
          "All organic material is finely shredded and returned to the soil to recycle nutrients naturally. Same clean look, zero haul-away.",
      },
      {
        name: "Pristine Standard",
        headline: "Full Haul-Off",
        description:
          "All collected material is completely hauled away from the property for a perfectly clean appearance.",
        isPopular: true,
      },
    ],
    scheduling: {
      anchor: "Spring: late February to mid-March · Fall: October to December",
      window: "Flexible — book it when you need it",
    },
    relatedSlugs: ["leaf-care", "mulch", "mowing"],
  },
  {
    slug: "leaf-care",
    name: "Leaf Care",
    notionName: "Leaf Care",
    category: "cleanups",
    tagline: "Ongoing fall leaf handling — weekly, not all-at-once.",
    hero:
      "Leaf Care is how we handle the fall leaf drop across your property on a recurring basis. Instead of one huge cleanup at the end of the season, we manage leaves each week during your regular mowing visits, so the lawn stays usable the whole fall.",
    whatsIncluded: [
      "Weekly leaf management during the regular mowing route",
      "A comprehensive final cleanup at the end of the season",
    ],
    howItWorks: [
      {
        heading: "Why weekly handling beats one big cleanup",
        body: "Leaves don't fall all at once — they pile up over 6 to 8 weeks. Waiting until the end means a lawn that's unusable for most of fall, plus a more expensive final cleanup. Handling leaves each week keeps the lawn open and healthy the whole time, and the final visit only has to deal with what fell in the last week or two.",
      },
      {
        heading: "Three tiers — pick based on how leaf-free you want things",
        body: "Standard mulches leaves into the turf each week, where they act as a natural fertilizer, then ends with a deep final cleanup. Pristine hauls leaves away every visit and does a comprehensive final cleanup including beds. Estate is the full 'immaculate all season' option — every surface cleared every visit, beds included.",
      },
      {
        heading: "Ongoing, not one-time",
        body: "Leaf Care runs on top of your weekly mowing visits — it's how you get a lawn that's never covered in leaves for more than a week at a time. If you're not on a mowing plan, a one-time fall cleanup is the alternative — same end result, one visit instead of weekly management.",
      },
    ],
    tiers: [
      {
        name: "Standard",
        headline: "Mulched Weekly + Final Cleanup",
        description:
          "Leaves are finely mulched into the turf each week, acting as a natural fertilizer. The season ends with one deep cleanup visit to clear excess leaves from the lawn, hardscapes, and beds.",
        isPopular: true,
      },
      {
        name: "Pristine",
        headline: "Hauled Away Weekly",
        description:
          "Leaves are actively collected and hauled away from the lawn and hardscapes during every weekly visit. Season ends with a comprehensive full-property final cleanup that also clears landscape beds.",
      },
      {
        name: "Estate",
        headline: "Immaculate All Season",
        description:
          "The most comprehensive tier. Leaves are completely cleared from the lawn, hardscapes, and every flower bed during every weekly visit. Property stays immaculate the entire fall.",
      },
    ],
    scheduling: {
      anchor: "When leaves begin falling",
      window: "October – November, runs during weekly visits through end of mowing season",
    },
    requiresMowingPlan: true,
    showProfessorCallout: true,
    relatedSlugs: ["mowing", "cleanup"],
  },

  // ─────────────────────── WINTER ───────────────────────
  {
    slug: "snow-removal",
    name: "Snow Removal",
    notionName: "Snow Removal",
    category: "winter",
    tagline: "Driveways and walkways cleared — on your schedule or ours.",
    hero:
      "Our Snow Removal service runs 24/7 from the first qualifying snowfall through March 31. You pick the threshold; we handle the rest, with unlimited visits per qualifying event.",
    whatsIncluded: [
      "24/7 clearing of designated driveways and walkways",
      "Unlimited visits per qualifying snow event",
      "Service runs from the first snowfall through March 31",
    ],
    howItWorks: [
      {
        heading: "Pick your trigger",
        body: "The biggest choice is when we show up. Standard triggers at about 2 inches of accumulation — the default for most homes. Premium triggers at 1 inch with priority dispatch, for people who don't want to deal with any meaningful snow. Zero Tolerance triggers at any accumulation, even a trace, and keeps your property completely clear at all times.",
      },
    ],
    tiers: [
      {
        name: "Standard",
        headline: "2-Inch Trigger",
        description:
          "Service kicks in at roughly 2 inches of accumulation. Unlimited visits per event, first snowfall through March 31.",
        isPopular: true,
      },
      {
        name: "Premium",
        headline: "1-Inch Trigger + Priority",
        description:
          "Priority 24/7 service triggered at roughly 1 inch. Earlier dispatch and priority scheduling when multiple storms hit at once.",
      },
      {
        name: "Zero Tolerance",
        headline: "Any Accumulation",
        description:
          "Highest priority 24/7 service triggered at any accumulation, including a trace. Your property remains completely clear of snow at all times.",
      },
    ],
    addOns: [
      {
        name: "Salt Treatment",
        description:
          "Ice-melt applied to walkways and driveways after clearing, to improve traction and reduce refreeze. Billed as an add-on alongside your Snow Removal plan.",
      },
    ],
    scheduling: {
      anchor: "First qualifying snowfall",
      window: "First snowfall – March 31",
    },
  },
];

// Helpers
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getServicesByCategory = (
  category: ServiceCategorySlug,
): Service[] => services.filter((s) => s.category === category);

export const getRelatedServices = (service: Service): Service[] =>
  (service.relatedSlugs || [])
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => !!s);

export const getCategoryBySlug = (
  slug: string,
): ServiceCategory | undefined => categories.find((c) => c.slug === slug);
