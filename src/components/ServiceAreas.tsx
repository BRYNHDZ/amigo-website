import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, CheckCircle } from "lucide-react";

const areas = [
  "Wheaton",
  "Glen Ellyn",
  "Winfield",
];

const ServiceAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="areas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="gold-accent" />
            <h2 className="section-title mb-4">Service Areas</h2>
            <p className="font-body text-paragraph text-lg mb-8">
              We proudly serve residential and commercial properties throughout
              DuPage County and surrounding areas in Illinois.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {areas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-brand/5 rounded-xl border border-brand/10"
                >
                  <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="font-headline text-ink text-lg">{area}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-brand/5 rounded-2xl border border-brand/10">
              <MapPin className="w-6 h-6 text-brand flex-shrink-0" />
              <p className="font-body text-paragraph text-sm">
                <span className="font-bold text-ink">Not listed?</span> Contact us
                to check if we service your area!
              </p>
            </div>
          </motion.div>

          {/* Static Map Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-border bg-cloud flex items-center justify-center">
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=41.87,-88.1&zoom=11&size=600x600&maptype=roadmap&markers=color:green%7Clabel:W%7C41.8661,-88.1070&markers=color:green%7Clabel:G%7C41.8775,-88.0670&markers=color:green%7Clabel:F%7C41.8703,-88.1534&style=feature:all%7Celement:labels%7Cvisibility:on&key="
                alt="Service area map showing Wheaton, Glen Ellyn, and Winfield Illinois"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a simple styled div if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5 flex flex-col items-center justify-center p-8">
                      <div class="text-brand text-6xl mb-4">📍</div>
                      <div class="text-center space-y-2">
                        <p class="font-headline text-xl text-ink">Wheaton</p>
                        <p class="font-headline text-xl text-ink">Glen Ellyn</p>
                        <p class="font-headline text-xl text-ink">Winfield</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
