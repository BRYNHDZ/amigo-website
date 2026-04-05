import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mascotConstruction from "@/assets/mascot-construction.png";
import jcdLogo from "@/assets/jcd-plumbing-logo.webp";
import jlaLogo from "@/assets/jla-construction-logo.png";
import {
  ArrowLeft,
  Phone,
  Globe,
  MapPin,
  Wrench,
  CheckCircle2,
  HardHat,
  Plug,
  Trees,
  PaintBucket,
  Bug,
  Hammer,
  Handshake,
  Send,
  Loader2,
} from "lucide-react";

interface Recommendation {
  name: string;
  category: string;
  serviceArea: string;
  description: string;
  services: string[];
  phone: string;
  phoneHref: string;
  website: string;
  websiteLabel: string;
  logo: string;
}

const recommendations: Recommendation[] = [
  {
    name: "JCD Plumbing",
    category: "Plumbing",
    serviceArea: "DuPage County & surrounding western suburbs",
    description:
      "Local plumbing company providing residential and commercial plumbing services with a focus on reliability and fast response times.",
    services: [
      "Pipe installation and repair",
      "Water heater installation and service",
      "Sump pump repair and installation",
      "Sewer repair and camera inspections",
      "General plumbing repairs",
    ],
    phone: "(630) 748-9158",
    phoneHref: "tel:6307489158",
    website: "https://jcdplumbing.com/",
    websiteLabel: "jcdplumbing.com",
    logo: jcdLogo,
  },
  {
    name: "JLA Construction LLC",
    category: "Roofing / Exterior",
    serviceArea: "DuPage County & surrounding areas",
    description:
      "Roofing and exterior contractor offering residential and commercial services including roofing, siding, and gutters.",
    services: [
      "Roof repair and replacement",
      "Shingle and flat roofing",
      "Siding installation and repair",
      "Gutter installation and replacement",
      "Roof inspections",
    ],
    phone: "(630) 473-0737",
    phoneHref: "tel:6304730737",
    website: "https://jlaconstructionllc.com/",
    websiteLabel: "jlaconstructionllc.com",
    logo: jlaLogo,
  },
];

const comingSoonCategories = [
  { label: "Electrical", icon: Plug },
  { label: "HVAC", icon: Wrench },
  { label: "Tree Service", icon: Trees },
  { label: "Painting", icon: PaintBucket },
  { label: "Pest Control", icon: Bug },
  { label: "Handyman", icon: Hammer },
];

const Recommendations = () => {
  const [formData, setFormData] = useState({
    submitter_type: "",
    company_name: "",
    company_category: "",
    company_website: "",
    company_phone: "",
    why_recommend: "",
    submitter_name: "",
    submitter_email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommendSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Honeypot
    const formElement = e.currentTarget;
    const honeypot = formElement.querySelector<HTMLInputElement>(
      'input[name="bot-field"]',
    );
    if (honeypot && honeypot.value) {
      setSubmitted(true);
      return;
    }

    // Client-side rate limiting
    const RATE_LIMIT_KEY = "recommend_submissions";
    const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
    const MAX_SUBMISSIONS = 3;
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const submissions: number[] = stored ? JSON.parse(stored) : [];
      const now = Date.now();
      const recent = submissions.filter(
        (t: number) => now - t < RATE_LIMIT_WINDOW,
      );
      if (recent.length >= MAX_SUBMISSIONS) {
        setError(
          "You've submitted several recommendations recently. Please try again in an hour.",
        );
        return;
      }
      recent.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    } catch (err) {
      // fail open
    }

    if (
      !formData.submitter_type ||
      !formData.company_name ||
      !formData.submitter_email
    ) {
      setError("Please fill in at least the required fields.");
      return;
    }

    setIsSubmitting(true);
    const payload = new URLSearchParams({
      "form-name": "recommend-company",
      ...formData,
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        "Something went wrong sending your recommendation. Please try again or email us directly.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Local Recommendations | Amigos Landscaping</title>
        <meta
          name="description"
          content="Trusted DuPage County home service companies we recommend for work outside of Amigos Landscaping's scope."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8">
          {/* Back Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-highlight transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>

          {/* Hero */}
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 mb-8">
              <HardHat className="w-10 h-10 text-brand" />
            </div>
            <div className="gold-accent mx-auto" />
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
              Local Recommendations
            </h1>
            <p className="font-body text-paragraph text-lg md:text-xl leading-relaxed">
              Amigos doesn't handle every service, but here are a few local
              companies we're comfortable recommending for home service needs
              in DuPage County.
            </p>
          </div>

          {/* Recommendations List */}
          <div className="max-w-4xl mx-auto mb-20 md:mb-24">
            <div className="grid gap-8 md:gap-10">
              {recommendations.map((rec) => (
                <div key={rec.name} className="brand-card">
                  <div className="flex items-start gap-5 md:gap-6 mb-6">
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-border/50 flex items-center justify-center overflow-hidden p-2">
                      <img
                        src={rec.logo}
                        alt={`${rec.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block font-body text-xs font-bold uppercase tracking-wider text-highlight mb-2">
                        {rec.category}
                      </span>
                      <h2 className="font-headline text-2xl md:text-3xl text-ink mb-2 break-words">
                        {rec.name}
                      </h2>
                      <div className="flex items-start gap-2 text-paragraph font-body text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{rec.serviceArea}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-paragraph leading-relaxed mb-6">
                    {rec.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-headline text-sm uppercase tracking-wider text-ink mb-3">
                      Key Services
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {rec.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-start gap-2 font-body text-paragraph text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                    <a
                      href={rec.phoneHref}
                      className="flex items-center justify-center gap-2 bg-brand text-white font-body font-bold px-5 py-3 rounded-xl hover:bg-brand/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {rec.phone}
                    </a>
                    <a
                      href={rec.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border-2 border-brand text-brand font-body font-bold px-5 py-3 rounded-xl hover:bg-brand/5 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      {rec.websiteLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More Coming Soon */}
          <div className="max-w-4xl mx-auto mb-20 md:mb-24">
            <div className="text-center mb-10">
              <div className="gold-accent mx-auto" />
              <h2 className="section-title mb-4">More Coming Soon</h2>
              <p className="font-body text-paragraph text-base md:text-lg max-w-2xl mx-auto">
                We're building this list carefully. These are the categories
                we're vetting local partners for next.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {comingSoonCategories.map((cat) => (
                <div
                  key={cat.label}
                  className="inline-flex items-center gap-2 bg-white border border-border/60 rounded-full px-5 py-3 font-body font-semibold text-ink/70"
                >
                  <cat.icon className="w-4 h-4 text-brand" />
                  {cat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Recommend a Company — submission form */}
          <div className="max-w-3xl mx-auto mb-20 md:mb-24">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-highlight/15 mb-5">
                <Handshake className="w-8 h-8 text-highlight" />
              </div>
              <div className="gold-accent mx-auto" />
              <h2 className="section-title mb-3">Recommend a Company</h2>
              <p className="font-body text-paragraph text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Know a local company that does great work? We want to hear
                about it. We only add businesses we'd trust on our own homes,
                but every recommendation starts with a conversation. Owners
                are welcome to reach out directly — and so are customers.
              </p>
            </div>

            <div className="brand-card">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-5">
                    <CheckCircle2 className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="font-headline text-2xl text-ink mb-3">
                    Thanks — we got it.
                  </h3>
                  <p className="font-body text-paragraph leading-relaxed max-w-md mx-auto">
                    We'll review your recommendation and reach out if it's a
                    fit. Every company we list goes through a vetting step so
                    we can stand behind it.
                  </p>
                </div>
              ) : (
                <form
                  name="recommend-company"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleRecommendSubmit}
                  className="space-y-5"
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="recommend-company"
                  />
                  <p className="hidden">
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  {/* Submitter type */}
                  <div>
                    <label className="block font-body text-sm font-bold text-ink mb-2">
                      Who are you? <span className="text-structure">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          value: "customer",
                          label: "A happy customer",
                          desc: "I've hired this company.",
                        },
                        {
                          value: "owner",
                          label: "The company owner",
                          desc: "I run this business.",
                        },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              submitter_type: opt.value,
                            }))
                          }
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            formData.submitter_type === opt.value
                              ? "border-brand bg-[#F9FBE7] shadow-sm"
                              : "border-border hover:border-highlight"
                          }`}
                        >
                          <div className="font-body font-bold text-ink text-sm md:text-base">
                            {opt.label}
                          </div>
                          <div className="font-body text-xs text-paragraph mt-0.5">
                            {opt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-bold text-ink mb-2">
                        Company name <span className="text-structure">*</span>
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        required
                        value={formData.company_name}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company_name: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="e.g., DuPage Plumbing Co."
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-bold text-ink mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="company_category"
                        value={formData.company_category}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company_category: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="e.g., Electrical, HVAC, Painting"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-bold text-ink mb-2">
                        Company website
                      </label>
                      <input
                        type="text"
                        name="company_website"
                        value={formData.company_website}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company_website: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-bold text-ink mb-2">
                        Company phone
                      </label>
                      <input
                        type="tel"
                        name="company_phone"
                        value={formData.company_phone}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company_phone: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="(630) 555-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-bold text-ink mb-2">
                      Why should we recommend them?
                    </label>
                    <textarea
                      name="why_recommend"
                      rows={4}
                      value={formData.why_recommend}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          why_recommend: e.target.value,
                        }))
                      }
                      className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand resize-none"
                      placeholder="What's your experience? What do they do especially well?"
                    />
                  </div>

                  {/* Submitter contact */}
                  <div className="pt-5 border-t border-border/50">
                    <p className="font-body text-sm font-bold text-ink mb-3">
                      Your contact info (so we can follow up)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="submitter_name"
                        value={formData.submitter_name}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            submitter_name: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        name="submitter_email"
                        required
                        value={formData.submitter_email}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            submitter_email: e.target.value,
                          }))
                        }
                        className="w-full p-3.5 border-2 border-border rounded-xl outline-none text-base transition-colors focus:border-brand"
                        placeholder="Your email *"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800 font-body">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Recommendation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Under Construction with Mascot */}
          <div className="max-w-4xl mx-auto">
            <div className="brand-card bg-white relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-shrink-0 relative">
                  <img
                    src={mascotConstruction}
                    alt="Amigos Mascot at a construction site"
                    className="w-48 h-48 md:w-60 md:h-60 object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-highlight/15 text-ink font-body font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                    <HardHat className="w-4 h-4 text-highlight" />
                    Page In Progress
                  </div>
                  <h3 className="font-headline text-2xl md:text-3xl text-ink mb-3">
                    This list is still growing.
                  </h3>
                  <p className="font-body text-paragraph leading-relaxed">
                    We only add companies we'd trust on our own homes. If you
                    own a local business in DuPage County and want to be
                    considered, reach out — we'd love to meet you.
                  </p>
                  <a
                    href="mailto:contact@amigolandscaping.com"
                    className="inline-block mt-5 font-body font-bold text-brand hover:text-highlight transition-colors"
                  >
                    contact@amigolandscaping.com →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Recommendations;
