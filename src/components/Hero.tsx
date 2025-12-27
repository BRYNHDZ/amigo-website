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
            {/* Badge */}
            <div className="inline-block bg-brand/80 px-3 py-1 rounded-full mb-4">
              <span className="font-body font-semibold text-soft-white text-xs uppercase tracking-wider">
                Landscaping & Lawn Care
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-body font-bold text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight mb-8">
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
