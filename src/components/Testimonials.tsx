import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nona Chalikian",
    initials: "NC",
    text: "I am very happy with Amigos service!!! Affordable price and good quality service!!! Very friendly team!!! Quick response.",
    date: "3 weeks ago",
  },
  {
    name: "Kevin Cahill",
    initials: "KC",
    text: "Did a fantastic job. Cleaned up nicely, put in mulch, and added a variety of shrubs. Very professional and would recommend.",
    date: "5 weeks ago",
  },
  {
    name: "Tim Buividas",
    initials: "TB",
    text: "Thanks Amigos for always showing up and doing great work!",
    date: "6 weeks ago",
  },
  {
    name: "Michael Stahl",
    initials: "MS",
    text: "Great work by the whole Amigos team! Highly recommend!",
    date: "7 weeks ago",
  },
  {
    name: "Allison DiLiberto",
    initials: "AD",
    text: "Good lawn service and helpful with landscaping projects. Jesus ensures high quality and if something isn't right, he'll fix it.",
    date: "13 weeks ago",
  },
  {
    name: "Noreen Fitzgerald",
    initials: "NF",
    text: "Terrific job cleaning up my flower gardens and laying down mulch. Happy to have a beautiful backyard back!",
    date: "14 weeks ago",
  },
  {
    name: "LAN",
    initials: "L",
    text: "Jesus and Jose did a great job as usual. The crew is very professional and our yard always looks great.",
    date: "15 weeks ago",
  },
  {
    name: "Sheri Reditsch",
    initials: "SR",
    text: "We've been working with Amigos Landscaping for 15+ years because they always do an excellent job. Their team is fantastic.",
    date: "17 weeks ago",
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => (
  <div className="testimonial-card h-full flex flex-col">
    <Quote className="w-8 h-8 text-highlight/30 mb-4" />
    <p className="font-body text-paragraph leading-relaxed flex-grow mb-6">
      "{testimonial.text}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center">
        <span className="font-headline text-soft-white text-lg">
          {testimonial.initials}
        </span>
      </div>
      <div>
        <div className="font-body font-bold text-ink">{testimonial.name}</div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-highlight text-highlight" />
          ))}
          <span className="text-xs text-structure ml-2">{testimonial.date}</span>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-highlight text-highlight" />
              ))}
            </div>
            <span className="font-headline text-2xl text-ink">5.0</span>
            <span className="text-structure font-body">on Google</span>
          </div>
          <a
            href="https://g.page/r/CWGwmvRMRfWpEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-body font-bold hover:underline"
          >
            Leave a review →
          </a>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name + currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Single Card */}
        <div className="md:hidden mb-8">
          <TestimonialCard testimonial={testimonials[currentIndex]} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-ink" />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentIndex ? "bg-brand" : "bg-mist"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-ink" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
