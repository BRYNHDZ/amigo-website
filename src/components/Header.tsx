import { Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Green Bar */}
      <div className="bg-brand text-soft-white py-3 px-2">
        <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Email Icon */}
          <a
            href="mailto:contact@amigolandscaping.com"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline font-body text-sm">contact@amigolandscaping.com</span>
          </a>

          {/* Client Hub Login */}
          <a
            href="https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/login/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-body font-bold text-sm uppercase tracking-wider hover:text-highlight transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Client Hub Login</span>
          </a>
        </div>
      </div>

      {/* Main Header - solid when scrolled */}
      <div className={`border-b border-border/50 transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-white"
      }`}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Logo with Mascot on Right */}
            <a href="#home" className="flex items-center gap-4">
              <div className="flex flex-col items-start">
                <span className="font-headline text-3xl md:text-4xl lg:text-5xl text-brand tracking-wide leading-none">
                  AMIGOS
                </span>
                <span className="text-[10px] md:text-xs text-ink font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-60">
                  LANDSCAPING
                </span>
              </div>
              <img 
                src={mascot} 
                alt="Amigos Mascot" 
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </a>

            {/* Lottie Call Button */}
            <a
              href="tel:6306640303"
              className="relative flex items-center justify-center md:mr-0 mr-3"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
