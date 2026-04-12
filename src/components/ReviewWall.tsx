import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
  when: string;
}

const REVIEWS: Review[] = [
  { name: "Nona Chalikian", rating: 5, text: "I am very happy with Amigos service!!! Affordable price and good quality service!!! Very friendly team!!! Quick response.", when: "3 weeks ago" },
  { name: "Richard", rating: 5, text: "", when: "4 weeks ago" },
  { name: "Kevin Cahill", rating: 5, text: "Did a fantastic job. Cleaned up nicely, put in mulch, and added a variety of shrubs. Very professional and would recommend.", when: "5 weeks ago" },
  { name: "Tim Buividas", rating: 5, text: "Thanks Amigos for always showing up and doing great work!", when: "6 weeks ago" },
  { name: "Michael Stahl", rating: 5, text: "Great work by the whole Amigos team! Highly recommend!", when: "7 weeks ago" },
  { name: "Katie Johnson", rating: 5, text: "", when: "8 weeks ago" },
  { name: "Allison DiLiberto", rating: 5, text: "Good lawn service and helpful with landscaping projects. Jesus ensures high quality and if something isn't right, he'll fix it.", when: "13 weeks ago" },
  { name: "Noreen Fitzgerald", rating: 5, text: "Terrific job cleaning up my flower gardens and laying down mulch. Happy to have a beautiful backyard back!", when: "14 weeks ago" },
  { name: "LAN", rating: 5, text: "Jesus and Jose did a great job as usual. The crew is very professional and our yard always looks great.", when: "15 weeks ago" },
  { name: "Sheri Reditsch", rating: 5, text: "We've been working with Amigos Landscaping for 15+ years because they always do an excellent job. Their team is fantastic.", when: "17 weeks ago" },
  { name: "Jessica Brunback", rating: 5, text: "Great experience with Amigos! We got the full service—trimming, weeding, spring cleanup, edging—and everything looked amazing.", when: "17 weeks ago" },
  { name: "Anthony Halpin", rating: 5, text: "The team does a great job! Easy to work with, communicate well, and get the job done.", when: "22 weeks ago" },
  { name: "Pat Donovan", rating: 5, text: "Very well served, timely and well-done work over many years. Continually grateful and looking forward to 2025.", when: "37 weeks ago" },
  { name: "Debbie Borge", rating: 5, text: "Cutting my lawn for the last 3 weeks and I'm thrilled. They send 2 crew members and the work is excellent.", when: "Jul 23, 2024" },
  { name: "Elizabeth Hermanson", rating: 5, text: "I've been using Amigos Landscaping for over 22 years! Wonderful service with helpful and thorough crews.", when: "May 22, 2024" },
  { name: "Amy Saunders", rating: 5, text: "Our yard always looks great! Would highly recommend.", when: "Apr 23, 2024" },
  { name: "Paul Snyder", rating: 5, text: "Using Amigos for 4 years and recommend them highly. Prices are competitive and jobs are completed well.", when: "Apr 23, 2024" },
  { name: "steve meyer", rating: 5, text: "Very happy with all the work, great to work with and great value.", when: "Apr 23, 2024" },
  { name: "dolor", rating: 5, text: "Quick work done very well.", when: "Mar 20, 2024" },
  { name: "Katherine Garay", rating: 5, text: "", when: "Mar 20, 2024" }
];

const ReviewCard = ({ review }: { review: Review }) => {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <li className="flex-shrink-0 w-72 bg-card rounded-2xl p-5 border border-border/30 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-headline text-sm">
          {initials}
        </div>
        <div>
          <div className="font-body font-bold text-ink text-sm">{review.name}</div>
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-highlight text-highlight" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Body */}
      {review.text && (
        <p className="text-paragraph text-sm leading-relaxed mb-3 line-clamp-4">
          "{review.text}"
        </p>
      )}
      
      {/* Footer */}
      <div className="text-structure text-xs">{review.when}</div>
    </li>
  );
};

const MarqueeRow = ({
  reviews,
  direction = "left",
  speed = 40,
}: {
  reviews: Review[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isPaused) {
        const deltaTime = (currentTime - lastTime) / 1000;
        const movement = speed * deltaTime * (direction === "left" ? -1 : 1);
        position += movement;

        // Get the width of half the content (since we duplicate it)
        const halfWidth = track.scrollWidth / 2;
        
        // Wrap around
        if (direction === "left" && position <= -halfWidth) {
          position += halfWidth;
        } else if (direction === "right" && position >= 0) {
          position -= halfWidth;
        }

        track.style.transform = `translateX(${position}px)`;
      }
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    // Start from correct position for right-moving rows
    if (direction === "right") {
      position = -track.scrollWidth / 2;
    }

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [direction, speed, isPaused]);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul
        ref={trackRef}
        className="flex gap-4 py-2"
        style={{ willChange: "transform" }}
      >
        {duplicatedReviews.map((review, idx) => (
          <ReviewCard key={`${review.name}-${idx}`} review={review} />
        ))}
      </ul>
    </div>
  );
};

const ReviewWall = () => {
  const topRow = REVIEWS.slice(0, 10);
  const bottomRow = REVIEWS.slice(10, 20);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cloud overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-headline text-2xl md:text-3xl text-brand">AMIGOS</span>
              <span className="text-[8px] text-ink font-bold uppercase tracking-[0.2em] opacity-60">
                LANDSCAPING
              </span>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-body font-bold text-ink">5.0 on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-3xl text-brand">5.0</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-highlight text-highlight" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-paragraph">(20 reviews)</span>
              <a
                href="https://g.page/r/CWGwmvRMRfWpEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight font-bold hover:underline flex items-center gap-1"
              >
                leave a review
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-6">
        <MarqueeRow reviews={topRow} direction="left" speed={45} />
        <MarqueeRow reviews={bottomRow} direction="right" speed={40} />
      </div>
    </section>
  );
};

export default ReviewWall;
