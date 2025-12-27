import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-lawn.png";

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
      className="relative min-h-screen flex items-center justify-center pt-32 md:pt-24 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful landscaped lawn in DuPage Illinois"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-highlight/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-highlight" />
              <span className="font-body font-bold text-soft-white text-sm uppercase tracking-wider">
                Landscaping & Lawn Care
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight mb-6">
              Proudly Serving{" "}
              <span className="text-highlight">DuPage</span> Illinois
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg md:text-xl text-soft-white/80 mb-8 max-w-lg">
              Your friendly neighborhood landscaping experts. We treat every lawn
              like it's our own—because that's what friends do.
            </p>

            {/* CTA Button - scrolls to form */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToQuote}
                className="btn-primary"
              >
                <span>Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            <div className="flex items-center gap-2 text-soft-white/80">
              <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center">
                <span className="font-headline text-highlight text-lg">30</span>
              </div>
              <span className="font-body text-sm">Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-soft-white/80">
              <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center">
                <span className="font-headline text-highlight text-lg">5.0</span>
              </div>
              <span className="font-body text-sm">Google Rating</span>
            </div>
            <div className="flex items-center gap-2 text-soft-white/80">
              <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center">
                <span className="font-headline text-highlight text-lg">500+</span>
              </div>
              <span className="font-body text-sm">Happy Clients</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-soft-white/60">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-soft-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-highlight rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
