import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-lawn.jpg";

const Hero = () => {
  const scrollToPlan = () => {
    const planSection = document.getElementById("plan");
    if (planSection) {
      planSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center pt-32 md:pt-24 overflow-hidden"
    >
      {/* Background Image — bg-brand fallback prevents a white flash while the image decodes */}
      <div className="absolute inset-0 z-0 bg-brand">
        <img
          src={heroImage}
          alt="Beautiful landscaped lawn in DuPage Illinois"
          className="w-full h-full object-cover"
          // Priority hints: tells the browser this is the most important image on the page
          // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React's types
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-ink/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            {/* Tagline */}
            <span className="text-highlight font-body font-bold text-sm uppercase tracking-wider mb-4 block">
              Landscaping & Lawn Care
            </span>

            {/* Headline */}
            <h1 className="font-body font-extrabold text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Proudly Serving DuPage Illinois
            </h1>

            {/* CTA Button — scrolls to Plan quiz */}
            <button
              onClick={scrollToPlan}
              className="btn-primary"
            >
              <span>Build My Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
