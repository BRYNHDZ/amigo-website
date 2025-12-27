import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, CheckCircle, Star } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, suffix = "", label, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-highlight/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="stat-number mb-2">
        {count}
        {suffix}
      </div>
      <div className="font-body text-paragraph">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-4">Celebrating 30 Years in Business</h2>
          <p className="font-body text-paragraph text-lg max-w-2xl mx-auto">
            Amigos Landscaping has been around since 1995. We are always here to help.
            Our experienced crew will help make your property look absolutely amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatItem
            icon={<Users className="w-8 h-8 text-highlight" />}
            value={600}
            suffix="+"
            label="Happy Clients"
            delay={0}
          />
          <StatItem
            icon={<CheckCircle className="w-8 h-8 text-highlight" />}
            value={83}
            suffix="K"
            label="Visits Completed"
            delay={0.2}
          />
          <StatItem
            icon={<Star className="w-8 h-8 text-highlight" />}
            value={5}
            suffix=".0"
            label="Star Rating"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
