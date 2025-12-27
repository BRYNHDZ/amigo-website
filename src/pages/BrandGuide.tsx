import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Flag, Palette, Layers, Type, Smile, Film, Shirt, Layout, Image, 
  FlaskConical, ShieldAlert, Check, X, ArrowRight, Truck, Plus,
  Download, Scale, CheckCircle, XCircle, Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "identity", label: "Identity & Tone", icon: Flag },
  { id: "visuals", label: "Visual System", icon: Palette },
  { id: "layout", label: "Layout Physics", icon: Layers },
  { id: "logos", label: "The New Logo", icon: Type },
  { id: "mascot", label: "Pico the Mascot", icon: Smile },
  { id: "motion", label: "Motion & Physics", icon: Film },
  { id: "uniforms", label: "Fleet & Uniforms", icon: Shirt },
  { id: "ui", label: "UI Toolkit", icon: Layout },
  { id: "graphics", label: "Graphic Examples", icon: Image },
  { id: "hero-lab", label: "Hero Lab", icon: FlaskConical },
  { id: "rules", label: "The Law", icon: ShieldAlert },
];

const BrandGuide = () => {
  const [activeSection, setActiveSection] = useState("identity");

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
          </section>

          {/* Section 3: Layout Physics */}
          <section id="layout" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Layers className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">Layout Physics</h2>
            </div>

            <p className="text-paragraph text-lg mb-8 max-w-3xl">
              We use <strong>Cloud Grey</strong> as the floor, and <strong>Pure White</strong> as the paper. This creates depth without heavy shadows.
            </p>

            <div className="bg-cloud p-12 rounded-3xl border border-mist">
              <h3 className="font-bold text-structure text-sm uppercase tracking-wider mb-8 text-center">The "Layering" Diagram</h3>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-start text-center">
                <div className="flex-1">
                  <div className="h-24 bg-cloud border-2 border-dashed border-structure/30 rounded-xl mb-3 flex items-center justify-center text-structure font-bold">Background</div>
                  <h4 className="font-headline text-xl text-ink">Level 0: Cloud</h4>
                  <p className="text-sm text-paragraph mt-2">Always #F3F4F6.</p>
                </div>
                <div className="hidden md:flex items-center justify-center h-24 pt-8 text-structure/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="h-24 bg-white border border-mist rounded-xl shadow-sm mb-3 flex items-center justify-center text-ink font-bold">Content Card</div>
                  <h4 className="font-headline text-xl text-ink">Level 1: Card</h4>
                  <p className="text-sm text-paragraph mt-2">Always #FFFFFF.</p>
                </div>
                <div className="hidden md:flex items-center justify-center h-24 pt-8 text-structure/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="h-24 bg-white border border-mist rounded-xl shadow-sm mb-3 flex items-center justify-center gap-2">
                    <span className="bg-highlight w-8 h-8 rounded-full"></span>
                    <span className="bg-ink w-20 h-4 rounded-full opacity-20"></span>
                  </div>
                  <h4 className="font-headline text-xl text-ink">Level 2: Action</h4>
                  <p className="text-sm text-paragraph mt-2">Buttons & Text.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Logo System */}
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

              {/* Pose Library */}
              <div>
                <h3 className="font-headline text-xl text-ink mb-6 flex items-center gap-2">
                  <span className="bg-ink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">02</span>
                  Pose Library
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="aspect-square bg-white rounded-xl border-2 border-dashed border-mist flex items-center justify-center">
                      <div className="text-center text-structure">
                        <Image className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-xs font-bold">Pose {num}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Motion Physics */}
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
                  <button className="px-6 py-3 rounded-xl border-2 border-mist font-headline text-ink hover:border-ink transition">Ghost Button</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Fleet & Uniforms */}
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

          {/* Section 8: UI Toolkit */}
          <section id="ui" className="doc-section">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <Layout className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">UI Toolkit</h2>
            </div>

            <div className="space-y-12">
              {/* Soft White Rule */}
              <div className="bg-highlight/10 border border-highlight/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 text-center">
                  <span className="text-xs font-bold text-highlight uppercase mb-2 block tracking-wider">The "Soft White" Physics</span>
                  <button className="btn-primary text-xl px-8 py-3 shadow-lg transform hover:scale-105 transition">Soft White Text</button>
                  <div className="mt-2 text-[10px] font-mono text-highlight">#F9FAFB on #FFB300</div>
                </div>
                <div className="flex-1 border-l border-highlight/20 pl-6">
                  <h4 className="font-headline text-xl text-ink mb-2">Why not pure white?</h4>
                  <p className="text-sm text-paragraph leading-relaxed">
                    On our active <strong>Golden Hour</strong> background, pure white (#FFFFFF) creates a "vibrating" effect. We use <strong>Soft White (#F9FAFB)</strong> to reduce glare.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-6 pb-2 border-b border-mist">01. Interactive Elements</h3>
                <div className="flex flex-wrap gap-8 items-start">
                  <div className="space-y-2">
                    <button className="btn-primary px-8 py-3 rounded-xl shadow-lg">Primary Action</button>
                    <p className="text-xs text-structure">Main Call-to-Action</p>
                  </div>
                  <div className="space-y-2">
                    <button className="px-6 py-3 rounded-xl border-2 border-mist font-headline text-ink hover:border-ink transition">Secondary Ghost</button>
                    <p className="text-xs text-structure">Alternative Options</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-xs font-bold text-structure uppercase tracking-wider mb-6 pb-2 border-b border-mist">02. Status Indicators</h3>
                <div className="flex gap-4">
                  <span className="bg-brand text-white px-4 py-1 rounded-full font-headline text-sm tracking-wide">NEW</span>
                  <span className="bg-highlight text-soft-white px-4 py-1 rounded-full font-headline text-sm tracking-wide">POPULAR</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Graphic Examples */}
          <section id="graphics" className="doc-section p-0 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
                <Image className="w-8 h-8 text-highlight" />
                <h2 className="font-headline text-4xl text-ink">Graphic Examples</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="aspect-square bg-cloud rounded-xl border-2 border-dashed border-mist flex items-center justify-center">
                    <div className="text-center text-structure">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-xs font-bold">Graphic {num}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 10: Hero Lab */}
          <section id="hero-lab" className="doc-section bg-cloud">
            <div className="flex items-center gap-3 mb-8 border-b border-mist pb-4">
              <FlaskConical className="w-8 h-8 text-highlight" />
              <h2 className="font-headline text-4xl text-ink">The Hero Lab</h2>
            </div>

            <p className="text-paragraph mb-8 leading-relaxed max-w-3xl">
              <strong>The Issue:</strong> Our brand is friendly ("Amigos"), but sometimes business requires a serious tone (contracts, disclaimers, or high-stakes billboards).
              <br /><br />
              When we try to be "Serious" with our standard friendly fonts, it can feel like a mismatch. For these rare <strong>"Nuclear"</strong> moments, we are authorized to use <strong>Inter ExtraBold</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Fredoka */}
              <div className="bg-white p-6 rounded-2xl border-2 border-red-100 flex flex-col h-full opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2">Attempt 1: Fredoka</span>
                <h1 className="font-headline text-2xl text-ink leading-tight mb-4">
                  Proudly serving DuPage, Illinois.
                </h1>
                <div className="mt-auto p-3 bg-red-50 rounded-lg text-xs text-red-700 font-bold leading-relaxed">
                  <X className="w-3 h-3 inline mr-1" /> TOO BOUNCY. <br />Trivializes the legacy.
                </div>
              </div>

              {/* Nunito */}
              <div className="bg-white p-6 rounded-2xl border-2 border-mist flex flex-col h-full">
                <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2">Attempt 2: Nunito</span>
                <h1 className="font-body text-2xl text-ink leading-tight mb-4" style={{ fontWeight: 800 }}>
                  Proudly serving DuPage, Illinois.
                </h1>
                <div className="mt-auto p-3 bg-highlight/10 rounded-lg text-xs text-highlight font-bold leading-relaxed">
                  <Minus className="w-3 h-3 inline mr-1" /> OKAY. <br />Clean, but still feels soft.
                </div>
              </div>

              {/* Inter */}
              <div className="bg-white p-6 rounded-2xl border-4 border-ink shadow-2xl flex flex-col h-full transform md:scale-110 z-10 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-ink text-highlight px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-md whitespace-nowrap border-2 border-highlight">
                  THE SOLUTION
                </div>
                <span className="text-[10px] font-bold text-structure uppercase tracking-wider mb-4 block border-b border-mist pb-2 mt-2">Attempt 3: Inter (Nuclear)</span>
                <h1 className="font-serious text-2xl text-ink leading-tight mb-4 uppercase" style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                  Proudly serving DuPage, Illinois.
                </h1>
                <div className="mt-auto p-3 bg-ink rounded-lg text-xs text-white font-bold leading-relaxed flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-highlight" />
                  <span>AUTHORITY. <br />Use only when necessary.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 11: The Law */}
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
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default BrandGuide;
