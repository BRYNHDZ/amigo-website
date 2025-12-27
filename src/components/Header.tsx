import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Service Areas", href: "#areas" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex flex-col items-start">
            <span className="font-headline text-2xl md:text-3xl text-brand tracking-wide leading-none">
              AMIGOS
            </span>
            <span className="text-[10px] text-ink font-bold uppercase tracking-[0.3em] opacity-60">
              LANDSCAPING
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link text-sm uppercase tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+16305551234"
              className="flex items-center gap-2 text-brand font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>(630) 555-1234</span>
            </a>
            <a
              href="https://clienthub.getjobber.com/hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/requests/2060348/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-6 py-3"
            >
              Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border/50"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link text-lg py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://clienthub.getjobber.com/hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/requests/2060348/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Quote
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
