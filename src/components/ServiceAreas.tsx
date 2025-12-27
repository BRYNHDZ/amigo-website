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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95000!2d-88.15!3d41.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e53c4a54adf5b%3A0xf3a563cbf22b1a94!2sWheaton%2C%20IL!5e0!3m2!1sen!2sus!4v1703721600000!5m2!1sen!2sus&output=embed&disableDefaultUI=1&gestureHandling=none&zoomControl=0"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map - Wheaton, Glen Ellyn, Winfield"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
