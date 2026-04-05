import { Link } from "react-router-dom";
import {
  Scissors,
  Flower2,
  Brush,
  Wind,
  Snowflake,
  ArrowRight,
} from "lucide-react";
import {
  categories,
  getServicesByCategory,
  type ServiceCategory,
} from "@/data/services";

const iconMap = {
  Scissors,
  Flower2,
  Brush,
  Wind,
  Snowflake,
} as const;

const Services = () => {
  return (
    <section id="services" className="py-14 md:py-20 bg-white scroll-mt-32">
      <div className="container mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-4">What We Do</h2>
          <p className="font-body text-paragraph text-base md:text-lg leading-relaxed">
            Everything your property needs, handled by one team you can count on.
          </p>
        </div>

        {/* Category grid — each card is a full link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {categories.map((cat: ServiceCategory) => {
            const Icon = iconMap[cat.icon];
            const items = getServicesByCategory(cat.slug);
            return (
              <Link
                key={cat.slug}
                to={`/services/${cat.slug}`}
                className="brand-card block hover:border-brand/40 hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="font-headline text-xl text-ink group-hover:text-brand transition-colors">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {items.map((service) => (
                    <li
                      key={service.slug}
                      className="font-body text-paragraph text-sm md:text-base flex items-start gap-2"
                    >
                      <span className="text-highlight font-bold mt-0.5">·</span>
                      {service.name}
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-1.5 font-body text-xs font-extrabold text-brand uppercase tracking-wider pt-1 border-t border-transparent group-hover:border-brand/20 transition-colors">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
