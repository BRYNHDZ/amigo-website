import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Scissors,
  TreeDeciduous,
  Leaf,
  Flower2,
  Layers,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Weekly Lawn Care",
    description: "Weekly visits from April–September to keep your lawn pristine.",
  },
  {
    icon: TreeDeciduous,
    title: "Shrub & Tree Trimming",
    description:
      "Shaping and pruning to maintain appearance and plant health.",
  },
  {
    icon: Leaf,
    title: "Seasonal Cleanups",
    description:
      "Spring and fall leaf and debris removal to keep your property tidy.",
  },
  {
    icon: Flower2,
    title: "Flower Bed Weeding",
    description: "Hand-pulled weeding and upkeep to keep beds healthy and neat.",
  },
  {
    icon: Layers,
    title: "Mulching",
    description:
      "Installation of dark brown natural mulch with clean, natural edging.",
  },
  {
    icon: Sparkles,
    title: "Aeration & Overseeding",
    description: "Core aeration and seeding for a stronger, greener lawn.",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="service-card group"
    >
      <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-5 group-hover:bg-brand transition-colors duration-300">
        <service.icon className="w-7 h-7 text-brand group-hover:text-soft-white transition-colors duration-300" />
      </div>
      <h3 className="font-headline text-xl text-ink mb-3">{service.title}</h3>
      <p className="font-body text-paragraph leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-4">Our Professional Services</h2>
          <p className="font-body text-paragraph text-lg max-w-3xl mx-auto">
            We offer a full range of landscaping and maintenance services for
            residential and commercial properties. Whether you're looking to
            improve your curb appeal or have your property expertly tended to all
            season long, our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://clienthub.getjobber.com/hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/requests/2060348/new"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Request a Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
