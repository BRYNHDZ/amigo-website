import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-brand relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ink/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-2 bg-highlight/20 rounded-full mb-6">
            <span className="font-accent text-xl text-highlight">
              Let's get your lawn smiling!
            </span>
          </div>

          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-soft-white mb-6">
            Ready for a Beautiful Lawn?
          </h2>

          <p className="font-body text-soft-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get your free quote today and discover why hundreds of DuPage County
            homeowners trust Amigos Landscaping with their outdoor spaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://clienthub.getjobber.com/hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/requests/2060348/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="tel:+16305551234"
              className="flex items-center gap-3 text-soft-white/80 hover:text-soft-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-soft-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-body font-bold">(630) 555-1234</span>
            </a>
            <a
              href="mailto:info@amigolandscaping.com"
              className="flex items-center gap-3 text-soft-white/80 hover:text-soft-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-soft-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-body font-bold">info@amigolandscaping.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
