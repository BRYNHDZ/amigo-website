import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfessorCallout from "@/components/ProfessorCallout";
import AerationOverseedingDiagram from "@/components/AerationOverseedingDiagram";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Calendar,
  Plus,
  Star,
  Info,
  Sparkles,
  Scissors,
  Flower2,
  Brush,
  Wind,
  Snowflake,
} from "lucide-react";

// Services with a custom animated/educational component instead of a static image
const customEducationComponents: Record<string, React.ComponentType> = {
  overseeding: AerationOverseedingDiagram,
};
import {
  getCategoryBySlug,
  getServicesByCategory,
  categories,
  type Service,
} from "@/data/services";

const iconMap = {
  Scissors,
  Flower2,
  Brush,
  Wind,
  Snowflake,
} as const;

const ServiceBlock = ({ service }: { service: Service }) => (
  <article
    id={service.slug}
    className="scroll-mt-32 border-t border-border/40 pt-10 md:pt-14 first:border-t-0 first:pt-0"
  >
    {/* Service header */}
    <div className="mb-6">
      <h2 className="font-headline text-2xl md:text-4xl text-ink mb-3">
        {service.name}
      </h2>
      <p className="font-body text-paragraph text-lg md:text-xl font-bold mb-4">
        {service.tagline}
      </p>
      <p className="font-body text-paragraph text-base md:text-lg leading-relaxed max-w-3xl">
        {service.hero}
      </p>

      {(service.requiresMowingPlan || service.isAddOn) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {service.requiresMowingPlan && (
            <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand font-body font-bold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
              <Info className="w-3 h-3" />
              Requires active mowing plan
            </span>
          )}
          {service.isAddOn && (
            <span className="inline-flex items-center gap-1.5 bg-highlight/15 text-ink font-body font-bold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 text-highlight" />
              Add-on service
            </span>
          )}
        </div>
      )}
    </div>

    {/* Tiers */}
    {service.tiers && service.tiers.length > 0 && (
      <div className="mb-6 md:mb-8">
        <h3 className="font-headline text-sm md:text-base uppercase tracking-[0.2em] text-highlight mb-4">
          Tiers
        </h3>
        <div className="grid gap-4">
          {service.tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-card rounded-2xl p-5 md:p-6 border border-border/50 relative"
            >
              <div className="absolute -top-2.5 right-5 flex gap-1.5">
                {tier.planOnly && (
                  <span className="inline-flex items-center gap-1 bg-brand text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    <Info className="w-3 h-3" />
                    Plan Only
                  </span>
                )}
                {tier.isPopular && (
                  <span className="inline-flex items-center gap-1 bg-highlight text-ink text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="w-3 h-3" />
                    Most popular
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="md:w-52 flex-shrink-0">
                  <span className="inline-block font-body text-[10px] font-extrabold uppercase tracking-wider text-brand mb-1">
                    {tier.name}
                  </span>
                  <h4 className="font-headline text-lg md:text-xl text-ink">
                    {tier.headline}
                  </h4>
                </div>
                <p className="font-body text-paragraph text-sm md:text-base leading-relaxed flex-1">
                  {tier.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* What's included + not included */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 md:mb-8">
      <div className="bg-card rounded-2xl p-5 md:p-6 border border-border/50">
        <h3 className="font-headline text-base md:text-lg text-ink mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-brand" />
          What's Included
        </h3>
        <ul className="space-y-2">
          {service.whatsIncluded.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-paragraph text-sm leading-snug"
            >
              <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {service.whatsNotIncluded && service.whatsNotIncluded.length > 0 && (
        <div className="bg-card rounded-2xl p-5 md:p-6 border border-border/50">
          <h3 className="font-headline text-base md:text-lg text-ink mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-structure" />
            What's Not Included
          </h3>
          <ul className="space-y-2">
            {service.whatsNotIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-body text-paragraph text-sm leading-snug"
              >
                <XCircle className="w-4 h-4 text-structure mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* How it works — text first, then custom visual so the visual reinforces the explanation */}
    {service.howItWorks && service.howItWorks.length > 0 && (
      <div className="mb-6 md:mb-8">
        {service.showProfessorCallout && (
          <div className="mb-5">
            <ProfessorCallout />
          </div>
        )}

        <h3 className="font-headline text-sm md:text-base uppercase tracking-[0.2em] text-highlight mb-4">
          How It Works
        </h3>
        <div className="space-y-4">
          {service.howItWorks.map((block) => (
            <div
              key={block.heading}
              className="bg-card rounded-2xl p-5 md:p-6 border border-border/50"
            >
              <h4 className="font-headline text-lg md:text-xl text-brand mb-2">
                {block.heading}
              </h4>
              <p className="font-body text-paragraph text-sm md:text-base leading-relaxed">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        {customEducationComponents[service.slug] && (() => {
          const CustomComponent = customEducationComponents[service.slug];
          return (
            <div className="mt-6">
              <CustomComponent />
            </div>
          );
        })()}
      </div>
    )}

    {/* Add-ons (e.g. Salt Treatment under Snow Removal) */}
    {service.addOns && service.addOns.length > 0 && (
      <div className="mb-6 md:mb-8">
        <h3 className="font-headline text-sm md:text-base uppercase tracking-[0.2em] text-highlight mb-4">
          Optional Add-Ons
        </h3>
        <div className="space-y-3">
          {service.addOns.map((addOn) => (
            <div
              key={addOn.name}
              className="bg-card rounded-2xl p-5 md:p-6 border border-border/50 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-highlight/15 flex items-center justify-center">
                <Plus className="w-5 h-5 text-highlight" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-headline text-lg md:text-xl text-ink mb-1">
                  {addOn.name}
                </h4>
                <p className="font-body text-paragraph text-sm md:text-base leading-relaxed">
                  {addOn.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Scheduling only — pricing is intentionally not shown publicly */}
    {service.scheduling && (
      <div className="bg-card rounded-2xl p-5 md:p-6 border border-border/50">
        <h3 className="font-headline text-base md:text-lg text-ink mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand" />
          Scheduling
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
          {service.scheduling.anchor && (
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-highlight mb-0.5">
                Target Start
              </span>
              <span className="text-ink text-sm font-bold">
                {service.scheduling.anchor}
              </span>
            </div>
          )}
          {service.scheduling.window && (
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-highlight mb-0.5">
                Typical Window
              </span>
              <span className="text-ink text-sm font-bold">
                {service.scheduling.window}
              </span>
            </div>
          )}
        </div>
        {service.scheduling.note && (
          <p className="text-xs italic text-paragraph pt-3 mt-3 border-t border-border/50">
            {service.scheduling.note}
          </p>
        )}
      </div>
    )}
  </article>
);

const ServiceCategoryDetail = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const services = getServicesByCategory(category.slug);
  const otherCategories = categories.filter((c) => c.slug !== category.slug);
  const Icon = iconMap[category.icon];

  return (
    <>
      <Helmet>
        <title>{category.title} | Amigos Landscaping</title>
        <meta name="description" content={category.tagline} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8">
          {/* Back link */}
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-highlight transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            All Services
          </Link>

          {/* Category hero */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand/10 mb-6">
              <Icon className="w-10 h-10 text-brand" />
            </div>
            <div className="gold-accent mx-auto" />
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-ink mb-5">
              {category.title}
            </h1>
            <p className="font-body text-paragraph text-lg md:text-xl font-bold mb-5">
              {category.tagline}
            </p>
            <p className="font-body text-paragraph text-base md:text-lg leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* In-page table of contents */}
          {services.length > 1 && (
            <div className="max-w-4xl mx-auto mb-12 md:mb-16">
              <div className="brand-card">
                <h2 className="font-headline text-sm md:text-base uppercase tracking-[0.2em] text-highlight mb-4">
                  What's in this category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((s) => (
                    <a
                      key={s.slug}
                      href={`#${s.slug}`}
                      className="flex items-center gap-2 font-body text-paragraph hover:text-brand transition-colors py-1 group"
                    >
                      <span className="text-highlight font-bold">·</span>
                      <span className="font-bold underline-offset-4 group-hover:underline">
                        {s.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Service blocks */}
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 mb-16 md:mb-20">
            {services.map((service) => (
              <ServiceBlock key={service.slug} service={service} />
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-20">
            <div className="brand-card-dark text-center">
              <h2 className="font-headline text-2xl md:text-3xl text-white mb-3">
                Ready to add {category.title.toLowerCase()} to your plan?
              </h2>
              <p className="font-body text-white/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
                Build your 2026 plan with these services included, or request a
                one-time quote if you just need something specific handled.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/#plan"
                  className="inline-flex items-center justify-center gap-2 bg-highlight text-ink font-body font-bold px-6 py-3 rounded-xl hover:bg-highlight/90 transition-colors"
                >
                  Build My Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/#quote-form"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-body font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Request a One-Time Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Other categories */}
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-8 md:mb-10">
              Other Service Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {otherCategories.map((cat) => {
                const CatIcon = iconMap[cat.icon];
                return (
                  <Link
                    key={cat.slug}
                    to={`/services/${cat.slug}`}
                    className="brand-card hover:border-brand/40 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-3">
                      <CatIcon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-headline text-lg text-ink mb-1 group-hover:text-brand transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-body text-paragraph text-sm leading-snug">
                      {cat.tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ServiceCategoryDetail;
