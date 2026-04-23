import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Flag, Palette, Type, Smile, Film, Shirt, Layout, Camera,
  ShieldAlert, Check, X, ArrowRight, Truck, Copy,
  Download, Scale, CheckCircle, XCircle, Minus, GraduationCap,
  DollarSign, Snowflake, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "identity", label: "Identity & Tone", icon: Flag },
  { id: "visuals", label: "Visual System", icon: Palette },
  { id: "logos", label: "The New Logo", icon: Type },
  { id: "mascot", label: "Pico the Mascot", icon: Smile },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "ui", label: "UI Toolkit", icon: Layout },
  { id: "motion", label: "Motion & Physics", icon: Film },
  { id: "uniforms", label: "Fleet & Uniforms", icon: Shirt },
  { id: "rules", label: "The Law", icon: ShieldAlert },
];

const AI_PROMPT_JSON = `{
  "brand": "Amigos Landscaping",
  "purpose": "Transform basic phone or Street View images of residential properties into polished, realistic visuals for quotes — capturing the emotional and physical impact of a freshly serviced home.",
  "visual_goal": "Images should reflect the kind of care Amigos Landscaping delivers. The result should feel lived-in, welcoming, and quietly elevated — as if the property has just been beautifully maintained.",
  "core_changes": {
    "lawn": {
      "mowed": true,
      "appearance": "evenly cut with a natural finish — no striping",
      "edges": "clean and defined along sidewalks, driveways, and hardscape borders",
      "color": "natural green with soft texture and slight variation"
    },
    "mulch": {
      "installed": true,
      "material": "dark brown double or triple-ground mulch",
      "appearance": "freshly applied and evenly spread through all existing flower beds"
    },
    "bushes": {
      "trimmed": true,
      "appearance": "clean, rounded or softly shaped with natural balance"
    },
    "debris": {
      "cleared": true,
      "includes": ["twigs", "leaves", "clippings", "and other visible material"]
    }
  },
  "landscape_features": {
    "layout": "Keep the original layout of all landscaping elements exactly as they appear — no changes to bed shapes, borders, or planting zones",
    "flower_beds": "Refresh mulch and cleanup within existing flower bed areas only",
    "planting": "Enhance what's already present — no additions or rearrangements"
  },
  "environment": {
    "weather": "bright, clear day with crisp midday sunlight",
    "sky": "blue with soft, natural clouds — clean and vibrant",
    "shadows": "soft-edged and natural to overhead sunlight",
    "light_effects": {
      "sunlight": "cool-white midday light with light glare on sun-facing surfaces",
      "glow": "subtle rim glow around sunlit materials like mulch and grass edges",
      "lens_flare": "light, realistic sunlight flare — thin streaks or soft arcs from the sun near the top or edge of frame"
    }
  },
  "mood": {
    "feel": "clean, familiar, and slightly dreamy — like a real neighborhood on its best day",
    "emotional_reaction": "the client feels a moment of quiet pride — like this could be their yard right now",
    "color_tone": "true-to-life with cool highlights and fresh warmth — no orange or tinted haze"
  },
  "camera_language": {
    "lens_type": "35mm to 50mm equivalent — neutral, realistic framing",
    "depth": "light — with clear detail in lawn, beds, and house face",
    "focus": "sharpest on lawn and mulch areas, softly easing toward house and background",
    "lighting_direction": "overhead to lightly front-side — simulating a real midday sun",
    "texture": "retain natural lawn blades, mulch grain, and bush detail",
    "special_effects": {
      "light_streaks": "sunlight streaks from reflective edges like mulch or concrete",
      "bloom": "gentle highlight bloom where light reflects off freshly serviced areas",
      "lens_flare": "slight sun flare from the edge of the frame — adds realism and a lived-in outdoor light feel"
    }
  },
  "scene_elements": {
    "vehicles": "remove all visible vehicles or license plates to clean up the scene",
    "personal_items": "preserve warm, intentional touches like planters or flags if they enhance the home's character",
    "house_structure": "leave all home materials and structure untouched — represent the house as it actually appears"
  },
  "editing_notes": {
    "visual_consistency": "Maintain uniform mulch tone, lawn finish, and cleanup standards across all homes to reflect brand quality",
    "signature_style": "Fresh-cut realism under bright daylight with a slight lens shimmer — not stylized or filtered, just real and beautiful"
  }
}`;

const BrandGuide = () => {
  const [activeSection, setActiveSection] = useState("identity");
  const [promptCopied, setPromptCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT_JSON);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      // clipboard API unavailable; silent fail
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Brand Operating System | Amigos Landscaping</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen bg-cloud">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-cloud p-6 md:h-screen md:sticky md:top-0 z-50 flex-shrink-0 flex flex-col overflow-y-auto border-r border-mist">
          {/* Logo */}
          <div className="mb-8 px-2">
            <div className="flex flex-col items-start gap-0">
              <span className="font-headline text-3xl text-brand tracking-wide leading-none">AMIGOS</span>
              <span className="text-[10px] text-ink font-bold uppercase tracking-[0.3em] opacity-60 ml-1">LANDSCAPING</span>
            </div>
          </div>

          <nav className="space-y-1 flex-grow">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left",
                    activeSection === item.id
                      ? "bg-white text-brand shadow-sm"
                      : "text-structure hover:bg-white hover:text-brand hover:shadow-sm"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 px-2">
            <button className="w-full bg-ink text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">
          {/* Section 1: Identity */}
          <section id="identity" className="doc-section">
            <div className="flex items-center gap-3 mb-6 border-b border-mist pb-4">
              <Flag className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Core Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-headline text-xl mb-2">The Positioning</h3>
                <p className="text-paragraph leading-relaxed mb-4 text-lg">
                  We are not just "Service Providers." <br />
                  We are <strong>The FRIENDLY Helpful Neighbors.</strong>
                </p>
                <div className="p-4 bg-highlight/10 border-l-4 border-highlight text-sm text-ink">
                  <span className="font-bold">It's in the name.</span> We treat customers like a friend.
                </div>
                <p className="text-paragraph leading-relaxed mt-4">
                  Think of us as the <em>Duolingo</em> of lawn care—we take a chore and make it feel bright, easy, and satisfying.
                </p>
              </div>
              <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10">
                <h3 className="font-headline text-xl mb-4 text-brand">Voice & Tone</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">DO:</span>
                    <span className="text-sm text-paragraph">"Let's get that lawn smiling again!"</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">DON'T:</span>
                    <span className="text-sm text-paragraph">"Schedule your turf maintenance service." (Too cold).</span>
                  </div>
                  <div className="h-px bg-brand/10 my-2"></div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">DO:</span>
                    <span className="text-sm text-paragraph">"Oops! A weed snuck in."</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">DON'T:</span>
                    <span className="text-sm text-paragraph">"Error 404: Page not found." (Too robotic).</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Visuals */}
          <section id="visuals" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Palette className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Visual System</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Color Palette */}
              <div className="space-y-6">
                <h3 className="font-bold text-structure text-sm uppercase tracking-wider">Brand Palette</h3>

                {/* White */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border border-mist bg-white shadow-sm flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-ink">Pure White</span>
                      <span className="text-xs font-mono text-structure">#FFFFFF</span>
                    </div>
                    <div className="h-2 bg-cloud rounded-full overflow-hidden">
                      <div className="h-full bg-mist border border-structure/20 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-xs text-paragraph font-body mt-1.5"><strong className="text-ink">60%</strong> of surfaces — the "paper" cards sit on.</p>
                  </div>
                </div>

                {/* Brand Green */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-brand shadow-sm flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-brand">Brand Forest</span>
                      <span className="text-xs font-mono text-structure">#30471F</span>
                    </div>
                    <div className="h-2 bg-cloud rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <p className="text-xs text-paragraph font-body mt-1.5"><strong className="text-ink">25%</strong> — logo, headers, filled emphasis, primary dark buttons.</p>
                  </div>
                </div>

                {/* Deep Forest */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-ink shadow-sm flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-ink">Deep Forest</span>
                      <span className="text-xs font-mono text-structure">#18240F</span>
                    </div>
                    <div className="h-2 bg-cloud rounded-full overflow-hidden">
                      <div className="h-full bg-ink rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <p className="text-xs text-paragraph font-body mt-1.5"><strong className="text-ink">10%</strong> — all headlines and dark text. Never pure black.</p>
                  </div>
                </div>

                {/* Gold */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-highlight shadow-sm flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-highlight">Golden Hour</span>
                      <span className="text-xs font-mono text-structure">#FFB300</span>
                    </div>
                    <div className="h-2 bg-cloud rounded-full overflow-hidden">
                      <div className="h-full bg-highlight rounded-full" style={{ width: "5%" }}></div>
                    </div>
                    <p className="text-xs text-paragraph font-body mt-1.5"><strong className="text-ink">5%</strong> — CTAs, accents, eyebrow labels, badges. Spotlight only, never a fill.</p>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-6">
                <h3 className="font-bold text-structure text-sm uppercase tracking-wider">Typography</h3>

                <div className="p-4 border border-mist rounded-xl">
                  <span className="text-xs font-bold text-highlight uppercase">Headlines Only</span>
                  <p className="font-headline text-4xl text-ink mt-1">Fredoka Bold</p>
                </div>

                <div className="p-4 border border-mist rounded-xl">
                  <span className="text-xs font-bold text-brand uppercase">Body & Buttons</span>
                  <p className="font-body text-xl font-bold text-ink mt-1">Nunito Bold</p>
                  <p className="font-body text-base text-paragraph">Nunito Regular for paragraph text.</p>
                </div>

                <div className="p-4 border border-mist rounded-xl bg-cloud border-l-4 border-l-brand">
                  <span className="text-xs font-bold text-brand uppercase">The "Serious" Override</span>
                  <p className="font-serious text-2xl text-ink mt-1" style={{ fontWeight: 800 }}>Inter ExtraBold</p>
                  <p className="font-serious text-sm text-paragraph mt-1">Use rarely. Only for serious contracts or high-impact service titles.</p>
                </div>
              </div>
            </div>

            {/* The Nuclear Option — formerly Hero Lab */}
            <div className="mt-12 pt-10 border-t border-mist">
              <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-3">when to go nuclear</p>
              <h3 className="font-headline text-2xl text-ink mb-3">The Inter Override</h3>
              <p className="text-paragraph font-body leading-relaxed max-w-3xl mb-6">
                Our brand is friendly ("Amigos"), but sometimes business requires a serious tone — contracts, disclaimers, high-stakes billboards. For these rare <strong className="text-ink">"Nuclear"</strong> moments, we're authorized to break out <strong className="text-ink">Inter ExtraBold</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Fredoka */}
                <div className="bg-white p-6 rounded-2xl border-2 border-red-100 flex flex-col h-full opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2">Attempt 1: Fredoka</span>
                  <h4 className="font-headline text-2xl text-ink leading-tight mb-4">
                    Proudly serving DuPage, Illinois.
                  </h4>
                  <div className="mt-auto p-3 bg-red-50 rounded-lg text-xs text-red-700 font-bold leading-relaxed">
                    <X className="w-3 h-3 inline mr-1" /> TOO BOUNCY. <br />Trivializes the legacy.
                  </div>
                </div>

                {/* Nunito */}
                <div className="bg-white p-6 rounded-2xl border-2 border-mist flex flex-col h-full">
                  <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2">Attempt 2: Nunito</span>
                  <h4 className="font-body text-2xl text-ink leading-tight mb-4" style={{ fontWeight: 800 }}>
                    Proudly serving DuPage, Illinois.
                  </h4>
                  <div className="mt-auto p-3 bg-highlight/10 rounded-lg text-xs text-highlight font-bold leading-relaxed">
                    <Minus className="w-3 h-3 inline mr-1" /> OKAY. <br />Clean, but still feels soft.
                  </div>
                </div>

                {/* Inter */}
                <div className="bg-white p-6 rounded-2xl border-4 border-ink shadow-lg flex flex-col h-full relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-ink text-highlight px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-md whitespace-nowrap border-2 border-highlight">
                    THE SOLUTION
                  </div>
                  <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2 mt-2">Attempt 3: Inter (Nuclear)</span>
                  <h4 className="font-serious text-2xl text-ink leading-tight mb-4 uppercase" style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                    Proudly serving DuPage, Illinois.
                  </h4>
                  <div className="mt-auto p-3 bg-ink rounded-lg text-xs text-white font-bold leading-relaxed flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-highlight" />
                    <span>AUTHORITY. <br />Use only when necessary.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Logo System */}
          <section id="logos" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Type className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">The New Logo</h2>
            </div>

            <p className="text-paragraph mb-8 max-w-2xl">
              The friendly "AMIGOS" (Fredoka) is grounded by the structural "LANDSCAPING" (Nunito). Below are the official variations.
            </p>

            <div className="space-y-12 mb-12">
              {/* Logo Variations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand Green */}
                <div className="flex flex-col gap-4">
                  <div className="aspect-square bg-brand rounded-2xl flex flex-col items-center justify-center shadow-lg p-8">
                    <span className="font-headline text-5xl text-white tracking-wide leading-none text-center">AMIGOS</span>
                    <span className="text-sm text-highlight font-bold uppercase tracking-[0.3em] mt-2 opacity-90">LANDSCAPING</span>
                  </div>
                  <p className="text-xs text-center text-structure">Inverse (Brand Green)</p>
                </div>

                {/* White */}
                <div className="flex flex-col gap-4">
                  <div className="aspect-square bg-white border-2 border-mist rounded-2xl flex flex-col items-center justify-center p-8">
                    <span className="font-headline text-5xl text-brand tracking-wide leading-none text-center">AMIGOS</span>
                    <span className="text-sm text-ink font-bold uppercase tracking-[0.3em] mt-2 opacity-60">LANDSCAPING</span>
                  </div>
                  <p className="text-xs text-center text-structure">Standard (White)</p>
                </div>

                {/* Gold */}
                <div className="flex flex-col gap-4">
                  <div className="aspect-square bg-highlight rounded-2xl flex flex-col items-center justify-center shadow-lg p-8">
                    <span className="font-headline text-5xl text-ink tracking-wide leading-none text-center">AMIGOS</span>
                    <span className="text-sm text-ink font-bold uppercase tracking-[0.3em] mt-2 opacity-60">LANDSCAPING</span>
                  </div>
                  <p className="text-xs text-center text-structure">High Vis (Gold)</p>
                </div>
              </div>

              {/* Usage Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Safe Zone */}
                <div className="bg-white border-2 border-dashed border-mist rounded-2xl p-8 flex flex-col items-center justify-center h-64 relative">
                  <span className="absolute top-4 left-4 text-xs font-bold text-structure">SAFE ZONE</span>
                  <div className="relative p-8 border border-blue-200 bg-blue-50/50 flex flex-col items-center">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[10px] text-blue-400">x</div>
                    <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 text-[10px] text-blue-400">x</div>
                    <span className="font-headline text-4xl opacity-50 text-brand leading-none">AMIGOS</span>
                    <span className="text-[10px] text-ink font-bold uppercase tracking-[0.3em] opacity-40">LANDSCAPING</span>
                  </div>
                  <p className="text-xs text-center text-paragraph mt-4">Keep 1 "Letter Width" (x) of space around the logo.</p>
                </div>

                {/* Scalability */}
                <div className="bg-white border-2 border-mist rounded-2xl p-8 flex flex-col items-center justify-center h-64 relative">
                  <span className="absolute top-4 left-4 text-xs font-bold text-structure">SCALABILITY</span>
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                      <span className="font-headline text-3xl text-brand leading-none">AMIGOS</span>
                      <div className="text-[10px] text-ink font-bold uppercase tracking-[0.3em] opacity-60">LANDSCAPING</div>
                      <div className="text-[10px] text-structure mt-1">Standard</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-white border border-mist rounded-lg flex items-center justify-center text-brand font-headline text-xl shadow-sm">A</div>
                        <div className="text-[10px] text-structure mt-1">Favicon</div>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-headline text-xl">A</div>
                        <div className="text-[10px] text-structure mt-1">Avatar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Mascot */}
          <section id="mascot" className="doc-section relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/10 rounded-bl-full"></div>
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4 relative z-10">
              <Smile className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">The Mascot Protocol</h2>
            </div>

            <div className="space-y-12">
              {/* SIGNATURE MOVE CALLOUT */}
              <div className="p-6 bg-highlight/10 border-l-4 border-highlight rounded-xl">
                <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-2">the signature move</p>
                <h3 className="font-headline text-2xl text-ink mb-2">Pico Dresses For The Job</h3>
                <p className="text-paragraph font-body">
                  Same character, different wardrobe. Each context earns a Pico in costume — a visual signal of <em>what kind of content you're in.</em> No other lawn care brand does this.
                </p>
                <p className="text-sm text-paragraph font-body mt-3 italic">
                  Rule: Pico is the storyteller, never the decoration. He does not belong inside buttons.
                </p>
              </div>

              {/* Bio & Do/Don't */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 text-center">
                  <div className="w-48 h-48 mx-auto mb-4 bg-cloud rounded-2xl border-2 border-dashed border-mist flex items-center justify-center">
                    <span className="text-structure text-sm">Mascot Image</span>
                  </div>
                  <span className="inline-block bg-brand text-white px-3 py-1 rounded-full text-sm font-bold font-body">Name: "Pico"</span>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-paragraph font-body">
                    <strong>Pico</strong> is the heart of our brand. He is helpful, round, and organic. He is never corporate.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <h4 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                        <Check className="w-4 h-4" /> ALWAYS
                      </h4>
                      <ul className="text-sm text-paragraph space-y-1 list-disc list-inside">
                        <li>Show him in 3/4 or Side Profile.</li>
                        <li>Maintain eye contact (Connection).</li>
                        <li>Show him working or emoting.</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                      <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                        <X className="w-4 h-4" /> NEVER
                      </h4>
                      <ul className="text-sm text-paragraph space-y-1 list-disc list-inside">
                        <li>Show straight-on front view (Looks weird).</li>
                        <li>Make him 3D/Realistic (Uncanny Valley).</li>
                        <li>Make him float (Respect Gravity).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scale Physics */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-6 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">01</span>
                  Scale Physics
                </h3>
                <div className="bg-cloud p-8 rounded-2xl border border-mist flex items-end gap-12 justify-center h-64">
                  {/* Human */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-48 bg-structure/30 rounded-t-full rounded-b-md relative">
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-structure/50 rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-structure mt-2">HUMAN (6ft)</span>
                  </div>
                  {/* Pico */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-24 bg-brand rounded-t-full rounded-b-md relative flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PICO</span>
                    </div>
                    <span className="text-xs font-bold text-brand mt-2">PICO (3ft)</span>
                  </div>
                  {/* Ruler */}
                  <div className="h-48 border-l-2 border-dashed border-structure/30 relative flex items-center">
                    <div className="absolute -left-2 top-1/2 w-4 h-0.5 bg-red-400"></div>
                    <span className="absolute left-4 top-1/2 text-xs text-red-400 font-bold">50% Height</span>
                  </div>
                </div>
                <p className="text-sm text-paragraph mt-4 text-center">If Pico appears next to a human, he must be scaled to exactly <strong>half their height</strong>.</p>
              </div>

              {/* Role Library (replaces Pose Library) */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-2 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">02</span>
                  Role Library
                </h3>
                <p className="text-sm text-paragraph font-body mb-6 max-w-2xl">
                  Established Pico costumes. Every new content type earns its own role if it merits one — otherwise use the closest existing one (Professor for any explainer, Cozy for any "we handle it" moment).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: GraduationCap, name: "Professor", purpose: "Teaching · service explainers", status: "built" },
                    { icon: DollarSign, name: "Money", purpose: "Referrals · discounts", status: "built" },
                    { icon: Snowflake, name: "Snow", purpose: "Snow removal content", status: "built" },
                    { icon: Flame, name: "Cozy", purpose: '"Relax inside, we\'ve got this"', status: "built" },
                  ].map((role) => {
                    const Icon = role.icon;
                    return (
                      <div key={role.name} className="bg-white border border-mist rounded-2xl p-4 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-brand/10 rounded-full flex items-center justify-center">
                          <Icon className="w-7 h-7 text-brand" />
                        </div>
                        <h4 className="font-headline text-base text-ink">{role.name} Pico</h4>
                        <p className="text-xs text-paragraph font-body mt-1">{role.purpose}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs font-bold text-structure uppercase tracking-widest mb-4">candidate costumes — build as content demands</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "Crew-Vest", purpose: "General service" },
                    { name: "Mulch-Bag", purpose: "Mulch installs" },
                    { name: "Rake", purpose: "Leaf care · fall" },
                    { name: "Spring", purpose: "Fresh flowers · lighter greens" },
                  ].map((role) => (
                    <div key={role.name} className="bg-cloud border border-mist rounded-xl p-3 text-center opacity-70">
                      <h4 className="font-headline text-sm text-ink">{role.name}</h4>
                      <p className="text-[10px] text-paragraph font-body mt-1">{role.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Photography */}
          <section id="photography" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Camera className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Photography</h2>
            </div>

            <p className="text-paragraph font-body mb-8 max-w-2xl">
              Real photos of real Amigos work. Natural light, suburban DuPage. Framed clean — no borders, no heavy shadows. Photos read as content inside cards, not competing with them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-cloud p-6 rounded-2xl border border-mist">
                <h3 className="font-headline text-xl text-ink mb-3">Display Rules</h3>
                <ul className="space-y-2 font-body">
                  <li className="text-sm text-paragraph"><strong className="text-ink">Radius:</strong> 1.5rem (24px)</li>
                  <li className="text-sm text-paragraph"><strong className="text-ink">Shadow:</strong> none by default</li>
                  <li className="text-sm text-paragraph"><strong className="text-ink">Border:</strong> none</li>
                  <li className="text-sm text-paragraph"><strong className="text-ink">Aspect ratios:</strong> 16:9 heroes · 4:3 properties · 1:1 social · 3:2 editorial</li>
                  <li className="text-sm text-paragraph"><strong className="text-ink">Text overlay:</strong> rgba(24,36,15,0.40)</li>
                </ul>
              </div>

              <div className="bg-cloud p-6 rounded-2xl border border-mist">
                <h3 className="font-headline text-xl text-ink mb-3">AI Image Rule</h3>
                <p className="text-sm text-paragraph font-body mb-3">
                  AI-generated imagery may be used for <strong className="text-ink">quote covers, social aspirationals, vision boards.</strong>
                </p>
                <p className="text-sm text-paragraph font-body">
                  <strong className="text-ink">Never</strong> as before/after or proof of real work. Always frame as <em>"what your property could look like."</em>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold text-structure uppercase tracking-widest mb-4">The Standard Treatment</p>
              <div className="bg-cloud p-8 rounded-2xl flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80"
                  alt="Freshly maintained lawn and garden beds"
                  className="w-full max-w-2xl block"
                  style={{ aspectRatio: "16/9", objectFit: "cover", borderRadius: "1.5rem" }}
                />
              </div>
              <p className="text-xs text-paragraph text-center italic mt-3">1.5rem radius · no shadow · no border · clean edges</p>
            </div>

            <div className="p-6 bg-highlight/10 border-l-4 border-highlight rounded-xl mb-8">
              <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-2">signature aesthetic</p>
              <p className="text-ink font-body text-lg italic">
                Fresh-cut realism under bright daylight with a slight lens shimmer — not stylized or filtered, just real and beautiful.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-body text-xs font-extrabold text-structure uppercase tracking-[0.22em]">AI Generation Prompt</p>
                  <p className="text-sm text-paragraph font-body mt-1">Feed alongside a Street View or phone photo of a client property.</p>
                </div>
                <button
                  onClick={copyPrompt}
                  className="btn-primary px-4 py-2 rounded-xl inline-flex items-center gap-2 text-sm shadow-md hover:scale-105 transition flex-shrink-0"
                >
                  {promptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {promptCopied ? "Copied" : "Copy Prompt"}
                </button>
              </div>
              <pre className="bg-ink text-white p-5 rounded-2xl text-xs font-mono overflow-auto max-h-96 border border-ink leading-relaxed">
                <code>{AI_PROMPT_JSON}</code>
              </pre>
            </div>
          </section>

          {/* Section 6: UI Toolkit */}
          <section id="ui" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Layout className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">UI Toolkit</h2>
            </div>

            <div className="space-y-12">
              {/* Depth Model (the old Layout Physics) */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Depth Model</h3>
                <p className="text-sm text-paragraph font-body mb-6 max-w-2xl">
                  Three layers — no more, no less. <strong className="text-ink">Cloud Grey</strong> is the floor, <strong className="text-ink">Pure White</strong> is the paper, actions sit on top. Depth comes from layering, never from heavy shadows.
                </p>
                <div className="bg-cloud p-8 rounded-3xl border border-mist">
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-start text-center">
                    <div className="flex-1">
                      <div className="h-20 bg-cloud border-2 border-dashed border-structure/30 rounded-xl mb-3 flex items-center justify-center text-structure font-bold">Background</div>
                      <h4 className="font-headline text-lg text-ink">Level 0: Cloud</h4>
                      <p className="text-xs text-paragraph font-body mt-1">Always <code className="font-mono">#F3F4F6</code></p>
                    </div>
                    <div className="hidden md:flex items-center justify-center h-20 pt-6 text-structure/30">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-20 bg-white border border-mist rounded-xl shadow-sm mb-3 flex items-center justify-center text-ink font-bold">Content Card</div>
                      <h4 className="font-headline text-lg text-ink">Level 1: Card</h4>
                      <p className="text-xs text-paragraph font-body mt-1">Always <code className="font-mono">#FFFFFF</code></p>
                    </div>
                    <div className="hidden md:flex items-center justify-center h-20 pt-6 text-structure/30">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-20 bg-white border border-mist rounded-xl shadow-sm mb-3 flex items-center justify-center gap-2">
                        <span className="bg-highlight w-7 h-7 rounded-full"></span>
                        <span className="bg-ink w-16 h-3 rounded-full opacity-20"></span>
                      </div>
                      <h4 className="font-headline text-lg text-ink">Level 2: Action</h4>
                      <p className="text-xs text-paragraph font-body mt-1">Buttons, text, icons</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft White Rule (preserved) */}
              <div className="bg-highlight/10 border border-highlight/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 text-center">
                  <span className="text-xs font-bold text-highlight uppercase mb-2 block tracking-wider">The "Soft White" Physics</span>
                  <button className="btn-primary text-xl px-8 py-3 shadow-lg transform hover:scale-105 transition">Soft White Text</button>
                  <div className="mt-2 text-[10px] font-mono text-highlight">#F9FAFB on #FFB300</div>
                </div>
                <div className="flex-1 border-l border-highlight/20 pl-6">
                  <h4 className="font-headline text-xl text-ink mb-2">Why not pure white?</h4>
                  <p className="text-sm text-paragraph leading-relaxed font-body">
                    On our active <strong>Golden Hour</strong> background, pure white (#FFFFFF) creates a "vibrating" effect. We use <strong>Soft White (#F9FAFB)</strong> to reduce glare.
                  </p>
                </div>
              </div>

              {/* 01. Buttons */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Buttons</h3>
                <p className="text-sm text-paragraph font-body mb-6 max-w-2xl">
                  Two primary fills — <strong>no ghost button.</strong> Two-action layouts use gold + green side-by-side: gold wins the eye, green is the quieter alternate.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-mist rounded-2xl bg-cloud">
                    <div className="text-center mb-4">
                      <button className="btn-primary px-8 py-3 rounded-xl shadow-lg inline-flex items-center gap-2">Get a Quote <ArrowRight className="w-4 h-4" /></button>
                    </div>
                    <h4 className="font-headline text-base text-ink mb-1">P1 — Primary Gold</h4>
                    <p className="text-xs text-paragraph font-body mb-3">The main CTA everywhere.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Fill <code className="text-ink font-mono">#FFB300</code> · Text <code className="text-ink font-mono">#F9FAFB</code> (Soft White — <strong className="text-ink">never</strong> pure white)</li>
                      <li>Radius 1rem · Nunito 800 uppercase, 0.05em tracking</li>
                      <li>Always ends with <code className="text-ink font-mono">→</code></li>
                      <li>Hover: <code className="text-ink font-mono">scale(1.02)</code>, no color change</li>
                    </ul>
                  </div>
                  <div className="p-6 border border-mist rounded-2xl bg-cloud">
                    <div className="text-center mb-4">
                      <button className="bg-brand text-white font-body font-extrabold uppercase tracking-wide text-sm px-8 py-3 rounded-xl shadow-md inline-flex items-center gap-2">View Plans <ArrowRight className="w-4 h-4" /></button>
                    </div>
                    <h4 className="font-headline text-base text-ink mb-1">P2 — Primary Dark</h4>
                    <p className="text-xs text-paragraph font-body mb-3">Quieter primary for gold-heavy contexts.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Fill <code className="text-ink font-mono">#30471F</code> (Brand Green) · Text white</li>
                      <li>Same Nunito 800 uppercase, 1rem radius, <code className="text-ink font-mono">→</code> convention</li>
                      <li>Use <strong className="text-ink">when gold is already used</strong> or feels too loud</li>
                      <li>Hover: <code className="text-ink font-mono">scale(1.02)</code>, no color change</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 02. Cards */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="bg-cloud p-4 rounded-xl mb-3">
                      <div className="bg-white p-4 rounded-2xl border border-mist shadow-sm">
                        <h4 className="font-headline text-base text-ink mb-1">Every week, same</h4>
                        <p className="text-xs text-paragraph font-body">The universal content container.</p>
                      </div>
                    </div>
                    <h4 className="font-headline text-base text-ink mb-1">C1 — Standard</h4>
                    <p className="text-xs text-paragraph font-body mb-2">The default. Used everywhere.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Fill <code className="text-ink font-mono">#FFFFFF</code> on Cloud Grey floor</li>
                      <li>Radius 2rem · Padding 1.5–2rem</li>
                      <li>Border 1px Mist · Shadow <strong className="text-ink">ultra-subtle only</strong> (<code className="text-ink font-mono">0 4px 6px -1px rgba(0,0,0,0.02)</code>)</li>
                      <li>Never heavy drop shadows. If it needs more lift, layer a second card — don't darken the shadow.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-cloud p-4 rounded-xl mb-3">
                      <div className="bg-brand p-4 rounded-2xl">
                        <p className="font-body text-[10px] font-extrabold text-highlight uppercase tracking-widest mb-1">why amigos</p>
                        <h4 className="font-headline text-base text-white mb-1">30 years</h4>
                        <p className="text-xs text-white/80 font-body">DuPage since 1995.</p>
                      </div>
                    </div>
                    <h4 className="font-headline text-base text-ink mb-1">C2 — Brand Dark</h4>
                    <p className="text-xs text-paragraph font-body mb-2"><strong className="text-ink">Rare use only.</strong> Palate cleanser.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Fill <code className="text-ink font-mono">#30471F</code> · Text white · Eyebrow gold</li>
                      <li>Radius 2rem · <strong className="text-ink">No shadow</strong> (color is the elevation)</li>
                      <li>Drop in <strong className="text-ink">only when</strong> a run of white cards starts feeling monotonous</li>
                      <li>Never as a default container. Never as a large background fill.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-cloud p-4 rounded-xl mb-3">
                      <div className="p-3 rounded-lg border-l-4 border-highlight bg-[#F9FBE7]">
                        <p className="font-body text-[10px] font-extrabold text-brand uppercase tracking-widest mb-1">good to know</p>
                        <p className="text-xs text-ink font-body">Spring windows are short — book by April 15.</p>
                      </div>
                    </div>
                    <h4 className="font-headline text-base text-ink mb-1">C4 — Callout / Note</h4>
                    <p className="text-xs text-paragraph font-body mb-2">Tips, seasonal nudges, "good to know" asides.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Fill <code className="text-ink font-mono">#F9FBE7</code> (soft yellow)</li>
                      <li>Left border: <strong className="text-ink">4px</strong> <code className="text-ink font-mono">#FFB300</code></li>
                      <li>Radius 0.75rem · Padding 1.1rem 1.4rem</li>
                      <li>Eyebrow in green + body in ink</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-structure italic mt-4">No service card pattern — services get their own pages, not card grids.</p>
              </div>

              {/* 03. Section Header */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Section Header</h3>
                <div className="bg-cloud p-8 rounded-2xl mb-4">
                  <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-3">how we work</p>
                  <h3 className="font-headline text-3xl text-ink mb-3 leading-tight">Every week, same standard</h3>
                  <p className="text-paragraph font-body max-w-lg">We show up. We stay consistent. Your property looks the same every Friday, no matter the weather.</p>
                </div>
                <p className="text-sm text-paragraph font-body mb-2">Every email, web section, quote, and flyer opens with this pattern. Always in this exact order:</p>
                <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                  <li><strong className="text-ink">Eyebrow:</strong> Nunito 800, 0.75rem, <code className="text-ink font-mono">#FFB300</code> gold, uppercase, 0.22em letter-spacing</li>
                  <li><strong className="text-ink">Title:</strong> Fredoka 700, 2–2.5rem, <code className="text-ink font-mono">#18240F</code> ink, line-height 1.05</li>
                  <li><strong className="text-ink">Paragraph:</strong> Nunito 400, 1rem, <code className="text-ink font-mono">#4B5563</code> body copy, max-width 42rem</li>
                </ul>
              </div>

              {/* 04. Badges */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Badges</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="bg-brand text-soft-white px-4 py-1 rounded-full font-headline text-sm tracking-wider">NEW</span>
                  <span className="bg-highlight text-soft-white px-4 py-1 rounded-full font-headline text-sm tracking-wider">POPULAR</span>
                  <span className="bg-mist text-ink px-4 py-1 rounded-full font-headline text-sm tracking-wider">MULCH</span>
                </div>
                <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside mb-2">
                  <li><strong className="text-ink">NEW</strong> → <code className="text-ink font-mono">#30471F</code> fill · <code className="text-ink font-mono">#F9FAFB</code> text — new services, features</li>
                  <li><strong className="text-ink">POPULAR</strong> → <code className="text-ink font-mono">#FFB300</code> fill · <code className="text-ink font-mono">#F9FAFB</code> text — most-chosen plans</li>
                  <li><strong className="text-ink">Category tag</strong> → <code className="text-ink font-mono">#E5E7EB</code> fill · <code className="text-ink font-mono">#18240F</code> text — classification, never promotional</li>
                  <li>All pills: radius 9999px · Fredoka 700, 0.8rem uppercase, 0.08em tracking · padding 0.4rem 1rem</li>
                </ul>
                <p className="text-xs text-structure italic">No urgency/seasonal badge. Urgency lives in copy, not labels — the friendly-neighbor vibe doesn't do "ACT NOW" pressure.</p>
              </div>

              {/* 05. Stats / Social Proof */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Stats / Social Proof</h3>
                <div className="bg-white border border-mist rounded-2xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
                  <div>
                    <div className="font-headline text-3xl text-brand leading-none">600+</div>
                    <div className="font-body text-[10px] font-bold text-structure uppercase tracking-widest mt-2">happy clients</div>
                  </div>
                  <div>
                    <div className="font-headline text-3xl text-brand leading-none">83K+</div>
                    <div className="font-body text-[10px] font-bold text-structure uppercase tracking-widest mt-2">visits completed</div>
                  </div>
                  <div>
                    <div className="font-headline text-3xl text-brand leading-none">5.0★</div>
                    <div className="font-body text-[10px] font-bold text-structure uppercase tracking-widest mt-2">star rating</div>
                  </div>
                  <div>
                    <div className="font-headline text-3xl text-brand leading-none">30</div>
                    <div className="font-body text-[10px] font-bold text-structure uppercase tracking-widest mt-2">years in business</div>
                  </div>
                </div>
                <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                  <li><strong className="text-ink">Numbers:</strong> Fredoka 700 · <code className="text-ink font-mono">#30471F</code> Brand Green · 1.85–2.35rem · line-height 1</li>
                  <li><strong className="text-ink">Labels:</strong> Nunito 700 · <code className="text-ink font-mono">#9CA3AF</code> · 0.65rem uppercase · 0.15em tracking</li>
                  <li><strong className="text-ink">Container:</strong> Standard Card (C1) · 4 equal columns · 1rem gap · centered</li>
                  <li>Canonical stats: <strong className="text-ink">600+ · 83K+ · 5.0★ · 30 years</strong></li>
                </ul>
              </div>

              {/* 06. Lists */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-4 pb-2 border-b border-mist">Lists</h3>
                <p className="text-sm text-paragraph font-body mb-6 max-w-2xl">
                  <strong className="text-ink">Amigos lists always have meaning.</strong> No neutral bulleted lists — either earned checkmarks or numbered steps.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-white border border-mist rounded-2xl p-5">
                      <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-3">what you get</p>
                      <ul className="space-y-2">
                        {["Weekly mowing + edging + blowing", "Bagged clippings (no mulching)", "Seasonal leaf care included"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-[18px] h-[18px] text-brand flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span className="text-sm text-ink font-body font-semibold">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h4 className="font-headline text-base text-ink mt-3 mb-1">L2a — Checklist</h4>
                    <p className="text-xs text-paragraph font-body mb-2">For "what you get" — plan inclusions, benefits.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Icon: brand-green SVG checkmark · stroke-width 3.5 · 18px · <strong className="text-ink">no background circle</strong></li>
                      <li>Item text: Nunito 600 · <code className="text-ink font-mono">#18240F</code> · 0.95rem</li>
                      <li>Padding per item: 0.5rem top/bottom · 2rem left indent</li>
                      <li>Optional gold eyebrow above the list (e.g., "WHAT YOU GET")</li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-white border border-mist rounded-2xl p-5">
                      <p className="font-body text-xs font-extrabold text-highlight uppercase tracking-[0.22em] mb-3">how it works</p>
                      <ol className="space-y-3">
                        {[
                          { n: 1, t: "Tell us about your property", d: "Address, lot size, priorities." },
                          { n: 2, t: "We build your plan", d: "Simple yearly roadmap." },
                          { n: 3, t: "We handle it", d: "Same standard every visit." },
                        ].map((step) => (
                          <li key={step.n} className="flex items-start gap-3">
                            <span className="bg-brand text-white rounded-full w-7 h-7 flex items-center justify-center font-headline text-xs flex-shrink-0">{step.n}</span>
                            <div>
                              <div className="text-sm font-bold text-ink font-body">{step.t}</div>
                              <div className="text-xs text-paragraph font-body">{step.d}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <h4 className="font-headline text-base text-ink mt-3 mb-1">L3 — Numbered Steps</h4>
                    <p className="text-xs text-paragraph font-body mb-2">For "how it works" — onboarding, process explainers.</p>
                    <ul className="text-xs text-paragraph font-body space-y-1 list-disc list-inside">
                      <li>Number circle: <code className="text-ink font-mono">#30471F</code> fill · 2.2rem square · white Fredoka 700</li>
                      <li>Connector: 2px dashed <code className="text-ink font-mono">rgba(48,71,31,0.2)</code> between steps</li>
                      <li>Step title: Nunito 700 bold · <code className="text-ink font-mono">#18240F</code></li>
                      <li>Description: Nunito 400 · 0.9rem · <code className="text-ink font-mono">#4B5563</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Motion Physics */}
          <section id="motion" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Film className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Motion Physics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-headline text-xl text-ink mb-4">Snappy Energy</h3>
                <p className="text-paragraph leading-relaxed mb-4">
                  All animation should feel <strong>snappy</strong> and <strong>responsive</strong>. Quick in, gentle out. Like a friendly wave.
                </p>
                <div className="p-4 bg-cloud rounded-xl border border-mist">
                  <code className="text-sm text-brand font-mono">cubic-bezier(0.2, 0, 0, 1)</code>
                  <p className="text-xs text-paragraph mt-2">Our brand timing function. Fast attack, soft landing.</p>
                </div>
              </div>
              <div>
                <h3 className="font-headline text-xl text-ink mb-4">Hover States</h3>
                <p className="text-paragraph leading-relaxed mb-4">
                  Interactive elements should lift slightly (scale 1.02-1.05) and brighten. Never use harsh color changes.
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary px-6 py-3 transition-transform hover:scale-105">Hover Me</button>
                  <button className="bg-brand text-white font-body font-extrabold uppercase tracking-wide text-sm px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105">Alt Primary</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Fleet & Uniforms */}
          <section id="uniforms" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Shirt className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Fleet & Uniforms</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Uniform */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4">Crew Uniform</h3>
                <p className="text-sm text-paragraph mb-6">Standard crew uniform consists of branded t-shirt and safety vest.</p>
                <div className="aspect-video bg-cloud rounded-xl border-2 border-dashed border-mist flex items-center justify-center">
                  <div className="text-center text-structure">
                    <Shirt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span className="text-xs font-bold block">Uniform Image</span>
                  </div>
                </div>
              </div>

              {/* Fleet */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4">Fleet Wrap</h3>
                <p className="text-sm text-paragraph mb-6">Upload the approved truck wrap mockup below.</p>
                <div className="aspect-video bg-cloud rounded-xl border-2 border-dashed border-mist flex items-center justify-center">
                  <div className="text-center text-structure">
                    <Truck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span className="text-xs font-bold block">Fleet Mockup</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-highlight/10 border-l-4 border-highlight text-xs text-ink font-bold">
                  <span className="uppercase tracking-wider">Future Vision:</span> We aim to install a 3D Pico model on the cab of every truck.
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: The Law */}
          <section id="rules" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Scale className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">The Golden Rules</h2>
            </div>

            <div className="space-y-12">
              {/* Rule 1: Typography */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">01</span>
                  Typography Physics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-mist rounded-2xl overflow-hidden">
                  <div className="bg-green-50 p-8 border-b md:border-b-0 md:border-r border-mist">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-4">
                      <CheckCircle className="w-4 h-4" /> Correct
                    </div>
                    <p className="font-body text-paragraph leading-relaxed">Use <strong>Nunito</strong> for all body text. It is rounded but structured, making it legible for long sentences.</p>
                  </div>
                  <div className="bg-red-50 p-8 relative">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-4">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </div>
                    <p className="font-headline font-normal text-paragraph leading-relaxed text-sm" style={{ fontWeight: 400 }}>Fredoka is meant for headers. When used for body text, it lacks the clean legibility of Nunito.</p>
                  </div>
                </div>
              </div>

              {/* Rule 2: Button Contrast */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">02</span>
                  Button Contrast
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-mist rounded-2xl overflow-hidden">
                  <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-mist flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-6 self-start w-full">
                      <CheckCircle className="w-4 h-4" /> Correct
                    </div>
                    <button className="bg-highlight text-soft-white font-body font-extrabold px-8 py-3 rounded-xl uppercase tracking-wide">Soft White (#F9FAFB)</button>
                    <p className="text-xs text-structure mt-4">Legible, no eye strain.</p>
                  </div>
                  <div className="bg-white p-8 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-6 self-start w-full">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </div>
                    <button className="bg-highlight text-white font-body font-extrabold px-8 py-3 rounded-xl uppercase tracking-wide">Pure White (#FFFFFF)</button>
                    <p className="text-xs text-red-400 mt-4">Vibrates visually. Hard to focus.</p>
                  </div>
                </div>
              </div>

              {/* Rule 3: Flatness */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">03</span>
                  Flatness Protocol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-mist rounded-2xl overflow-hidden">
                  <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-mist flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-6 self-start w-full">
                      <CheckCircle className="w-4 h-4" /> Correct
                    </div>
                    <button className="bg-brand text-white font-headline px-8 py-3 rounded-xl">Flat & Clean</button>
                  </div>
                  <div className="bg-white p-8 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-6 self-start w-full">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </div>
                    <button 
                      style={{ 
                        background: "linear-gradient(to bottom, #4a7a35, #30471F)", 
                        boxShadow: "4px 4px 8px rgba(0,0,0,0.6)", 
                        border: "2px solid #18240F", 
                        textShadow: "1px 1px 2px black" 
                      }} 
                      className="text-white font-headline px-8 py-3 rounded-xl"
                    >
                      Heavy & Dirty
                    </button>
                  </div>
                </div>
              </div>

              {/* Rule 4: Breathing Room */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">04</span>
                  Breathing Room
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-mist rounded-2xl overflow-hidden">
                  <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-mist">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-4">
                      <CheckCircle className="w-4 h-4" /> Correct
                    </div>
                    <div className="p-6 bg-cloud rounded-xl">
                      <p className="text-paragraph leading-relaxed">Content with generous padding creates a sense of calm and professionalism.</p>
                    </div>
                  </div>
                  <div className="bg-white p-8">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-4">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </div>
                    <div className="p-2 bg-cloud rounded-xl">
                      <p className="text-paragraph leading-relaxed text-sm">Cramped content feels rushed and unprofessional.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rule 5: Pico Dresses For The Job */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">05</span>
                  Pico Dresses For The Job
                </h3>
                <div className="p-6 border border-mist rounded-2xl bg-cloud">
                  <p className="text-paragraph font-body leading-relaxed">
                    Pico is the signature move. He takes on a costume for each context — Professor for teaching, Money for referrals, Snow for snow removal, Cozy for "we handle it" moments. <strong className="text-ink">Pico is the storyteller, never the decoration.</strong> He does not belong inside buttons.
                  </p>
                </div>
              </div>

              {/* Rule 6: Not TruGreen, Not the Cheap Local Guy */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">06</span>
                  We Are Not TruGreen. We Are Not The Cheap Local Guy.
                </h3>
                <div className="p-6 border border-mist rounded-2xl bg-cloud">
                  <p className="text-paragraph font-body leading-relaxed">
                    Every output should feel confident, warm, distinctive. If it could belong to any other lawn company, it's not done. Make it more Amigos.
                  </p>
                </div>
              </div>

              {/* Rule 7: Amigos Lists Have Meaning */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-4 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">07</span>
                  Amigos Lists Have Meaning
                </h3>
                <div className="p-6 border border-mist rounded-2xl bg-cloud">
                  <p className="text-paragraph font-body leading-relaxed">
                    No neutral bulleted lists. Every list in Amigos is either an <strong className="text-ink">earned checkmark</strong> (what you get) or a <strong className="text-ink">numbered step</strong> (how it works). Neutral bullets are for generic websites.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default BrandGuide;
