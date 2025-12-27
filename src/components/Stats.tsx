import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, CheckCircle, Star } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  targetValue: number;
  displaySuffix: string;
  label: string;
  delay: number;
  duration?: number;
}

const useCountUp = (target: number, duration: number, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Ease out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration, shouldStart]);

  return count;
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return num.toLocaleString();
  }
  return num.toString();
};

const StatItem = ({ icon, targetValue, displaySuffix, label, delay, duration = 2000 }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldCount(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const count = useCountUp(targetValue, duration, shouldCount);

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
        {formatNumber(count)}{displaySuffix}
      </div>
      <div className="font-body text-paragraph">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-6">Celebrating 30 Years in Business</h2>
          <p className="font-body text-paragraph text-lg max-w-2xl mx-auto leading-relaxed">
            Amigos Landscaping has been around since 1995. We are always here to help.
            Our experienced crew will help make your property look absolutely amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <StatItem
            icon={<Users className="w-8 h-8 text-highlight" />}
            targetValue={600}
            displaySuffix="+"
            label="Happy Clients"
            delay={0}
          />
          <StatItem
            icon={<CheckCircle className="w-8 h-8 text-highlight" />}
            targetValue={83000}
            displaySuffix="+"
            label="Visits Completed"
            delay={0.2}
          />
          <StatItem
            icon={<Star className="w-8 h-8 text-highlight" />}
            targetValue={5}
            displaySuffix=".0"
            label="Star Rating"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
