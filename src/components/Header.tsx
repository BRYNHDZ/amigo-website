import { Mail, User } from "lucide-react";
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
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-form");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Green Bar - Thicker */}
      <div className="bg-brand text-soft-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
      {/* Email Icon */}
      <a
        href="mailto:contact@amigolandscaping.com"
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <Mail className="w-6 h-6" />
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

      {/* Main Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Mascot */}
            <a href="#home" className="flex items-center gap-3">
              <img 
                src={mascot} 
                alt="Amigos Mascot" 
                className="w-14 h-14 md:w-16 md:h-16"
              />
              <div className="flex flex-col items-start">
                <span className="font-headline text-2xl md:text-3xl text-brand tracking-wide leading-none">
                  AMIGOS
                </span>
                <span className="text-[9px] md:text-[10px] text-ink font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-60">
                  LANDSCAPING
                </span>
              </div>
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
