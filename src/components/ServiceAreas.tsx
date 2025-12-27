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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {areas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="font-body text-ink text-sm">{area}</span>
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
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-border">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=Wheaton,IL&zoom=11&size=600x600&maptype=roadmap&markers=color:green%7CWheaton,IL&markers=color:green%7CGlen+Ellyn,IL&markers=color:green%7CWinfield,IL&style=feature:all%7Csaturation:-20&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                alt="Service area map showing Wheaton, Glen Ellyn, and Winfield"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
