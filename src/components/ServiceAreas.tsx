import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import serviceAreaMap from "@/assets/service-area-map.png";

const areas = ["Wheaton", "Glen Ellyn", "Winfield"];
const ServiceAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="areas" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div ref={ref} initial={{
          opacity: 0,
          x: -30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6
        }}>
            <div className="gold-accent" />
            <h2 className="section-title mb-6">Service Areas</h2>
            <p className="font-body text-paragraph text-lg mb-10 leading-relaxed">We proudly serve residential properties in the following suburbs:</p>

            <div className="flex flex-col gap-4 mb-10">
              {areas.map((area, index) => <motion.div key={area} initial={{
              opacity: 0,
              x: -10
            }} animate={isInView ? {
              opacity: 1,
              x: 0
            } : {}} transition={{
              delay: index * 0.1
            }} className="flex items-center gap-4 p-4 bg-brand/5 rounded-xl border border-brand/10">
                  <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="font-headline text-ink text-lg">{area}</span>
                </motion.div>)}
            </div>

            <div className="flex items-center gap-4 p-5 bg-brand/5 rounded-2xl border border-brand/10">
              <MapPin className="w-6 h-6 text-brand flex-shrink-0" />
              <p className="font-body text-paragraph">
                <span className="font-bold text-ink">Not listed?</span> Contact us
                to check if we service your area!
              </p>
            </div>
          </motion.div>

          {/* Static Map Image */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-border">
              <img 
                src={serviceAreaMap} 
                alt="Service area map showing Wheaton, Glen Ellyn, and Winfield Illinois" 
                className="w-full h-full object-cover" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ServiceAreas;