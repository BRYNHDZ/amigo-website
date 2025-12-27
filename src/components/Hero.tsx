import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-lawn.jpg";

const Hero = () => {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-form");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center pt-32 md:pt-24 overflow-hidden"
    >
      {/* Background Image - no yellow glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful landscaped lawn in DuPage Illinois"
          className="w-full h-full object-cover"
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

            {/* CTA Button - scrolls to form */}
            <button
              onClick={scrollToQuote}
              className="btn-primary"
            >
              <span>Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
