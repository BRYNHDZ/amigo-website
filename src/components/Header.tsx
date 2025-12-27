import { Phone, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-form");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Green Bar */}
      <div className="bg-brand text-soft-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Email Icon */}
          <a
            href="mailto:info@amigolandscaping.com"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>

          {/* Client Hub Login */}
          <a
            href="https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/login/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-body font-bold text-sm uppercase tracking-wider hover:text-highlight transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Client Hub Login</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex flex-col items-start">
              <span className="font-headline text-3xl md:text-4xl text-brand tracking-wide leading-none">
                AMIGOS
              </span>
              <span className="text-[10px] text-ink font-bold uppercase tracking-[0.3em] opacity-60">
                LANDSCAPING
              </span>
            </a>

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={scrollToQuote}
                className="btn-primary text-sm px-6 py-3"
              >
                Free Quote
              </button>
            </div>

            {/* Pulsing Call Button */}
            <a
              href="tel:+16305551234"
              className="relative flex items-center justify-center"
              aria-label="Call us"
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-highlight/30"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-highlight/30"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              {/* Button */}
              <div className="relative w-14 h-14 rounded-full bg-highlight flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden bg-card border-b border-border/50 py-3 px-4">
        <button
          onClick={scrollToQuote}
          className="btn-primary w-full text-sm py-3"
        >
          Get Free Quote
        </button>
      </div>
    </header>
  );
};

export default Header;
