import { Facebook, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-soft-white py-20 md:py-24 bg-primary">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-start mb-6">
              <span className="font-headline text-3xl tracking-wide leading-none text-primary-foreground">
                AMIGOS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 text-accent">
                LANDSCAPING
              </span>
            </div>
            <p className="font-body text-soft-white/70 text-sm leading-relaxed mb-6">
              Your friendly neighborhood landscaping experts serving DuPage
              County since 1995.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/people/Amigos-Landscaping/61580100399488/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-soft-white/10 flex items-center justify-center hover:bg-highlight transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://maps.app.goo.gl/k74iG6pwesT2Pqg18"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-soft-white/10 flex items-center justify-center hover:bg-highlight transition-colors"
                aria-label="Google Business"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="font-body text-soft-white/70 hover:text-highlight transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="font-body text-soft-white/70 hover:text-highlight transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="font-body text-soft-white/70 hover:text-highlight transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('areas')}
                  className="font-body text-soft-white/70 hover:text-highlight transition-colors"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('quote-form')}
                  className="font-body text-soft-white/70 hover:text-highlight transition-colors"
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline text-lg mb-6">Contact</h4>
            <ul className="space-y-4 font-body text-soft-white/70">
              <li className="flex items-start gap-2">
                <Leaf className="w-4 h-4 text-highlight mt-1 flex-shrink-0" />
                <span>
                  Wheaton, Glen Ellyn, Winfield
                  <br />
                  Illinois, USA
                </span>
              </li>
              <li>
                <a
                  href="tel:6306640303"
                  className="hover:text-highlight transition-colors"
                >
                  (630) 664-0303
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@amigolandscaping.com"
                  className="hover:text-highlight transition-colors"
                >
                  contact@amigolandscaping.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-soft-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-soft-white/50 text-sm">
            © {currentYear} Amigos Landscaping. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
