import { Mail, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "@dotlottie/player-component";
import mascot from "@/assets/mascot.gif";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          background?: string;
          speed?: string;
          loop?: boolean;
          autoplay?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Property Planner", to: "/plan" },
    { label: "Recommendations", to: "/recommendations" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Green Bar */}
      <div className="bg-brand text-soft-white py-3 px-2">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Email */}
          <a
            href="mailto:contact@amigolandscaping.com"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline font-body text-sm">
              contact@amigolandscaping.com
            </span>
          </a>

          {/* Client Hub Login */}
          <a
            href="https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/login/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 text-white font-body font-bold text-xs sm:text-sm uppercase tracking-wider hover:text-highlight transition-colors"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Client Hub</span>
            <span className="hidden sm:inline">Login</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`border-b border-border/50 transition-all duration-300 ${
          isScrolled ? "bg-white" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-28">
            {/* Logo with Mascot */}
            <Link to="/" className="flex items-center gap-2 md:gap-4 min-w-0">
              <div className="flex flex-col items-start">
                <span className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand tracking-wide leading-none">
                  AMIGOS
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-xs text-ink font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-60">
                  LANDSCAPING
                </span>
              </div>
              <img
                src={mascot}
                alt="Amigos Mascot"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
              />
            </Link>

            {/* Desktop nav + call button */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`nav-link text-sm uppercase tracking-wider px-3 py-2 rounded-xl transition-all duration-200 ${
                      location.pathname === item.to
                        ? "bg-brand/10 !text-brand"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Lottie Call Button — desktop */}
              <a
                href="tel:6306640303"
                className="relative flex items-center justify-center"
                aria-label="Call us"
              >
                <dotlottie-player
                  src="https://lottie.host/47b41010-a920-4a22-9880-45b655b1a7e2/J9egzaExoY.lottie"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  style={{ width: "90px", height: "90px" }}
                />
              </a>
            </div>

            {/* Mobile: call button + hamburger */}
            <div className="flex md:hidden items-center gap-1">
              <a
                href="tel:6306640303"
                className="relative flex items-center justify-center"
                aria-label="Call us"
              >
                <dotlottie-player
                  src="https://lottie.host/47b41010-a920-4a22-9880-45b655b1a7e2/J9egzaExoY.lottie"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  style={{ width: "56px", height: "56px" }}
                />
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="flex items-center justify-center w-11 h-11 rounded-xl text-ink hover:bg-brand/5 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-white shadow-lg">
            <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`font-body font-bold text-base uppercase tracking-wider px-4 py-3 rounded-xl transition-colors ${
                    location.pathname === item.to
                      ? "bg-brand/10 text-brand"
                      : "text-ink hover:bg-brand/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
