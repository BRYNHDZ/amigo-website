import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ReviewWall from "@/components/ReviewWall";
import ServiceAreas from "@/components/ServiceAreas";
import Services from "@/components/Services";
import PlanQuiz from "@/components/PlanQuiz";
import JobberForm from "@/components/JobberForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Amigos Landscaping | DuPage County Lawn Care & Landscaping Services</title>
        <meta
          name="description"
          content="Amigos Landscaping provides professional lawn care and landscaping services in DuPage County, Illinois. Serving Glen Ellyn, Wheaton, Lombard & more since 1995. Get your free quote today!"
        />
        <meta
          name="keywords"
          content="landscaping, lawn care, DuPage County, Illinois, Glen Ellyn, Wheaton, lawn maintenance, mulching, tree trimming"
        />
        <link rel="canonical" href="https://amigolandscaping.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Amigos Landscaping | DuPage County Lawn Care" />
        <meta
          property="og:description"
          content="Professional lawn care and landscaping services in DuPage County, Illinois since 1995."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amigolandscaping.com" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Amigos Landscaping",
            description:
              "Professional lawn care and landscaping services in DuPage County, Illinois",
            url: "https://amigolandscaping.com",
            telephone: "+1-630-664-0303",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Wheaton",
              addressRegion: "IL",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.8662,
              longitude: -88.1070,
            },
            areaServed: [
              "Wheaton",
              "Glen Ellyn",
              "Winfield",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "20",
            },
            priceRange: "$$",
            openingHours: "Mo-Fr 07:00-18:00",
            foundingDate: "1995",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Services />

          {/* Property Plan Quiz — primary CTA, positioned high on the page */}
          <section
            id="plan"
            className="bg-cloud py-10 md:py-14 scroll-mt-32"
          >
            <div className="container mx-auto">
              <div className="max-w-2xl mx-auto text-center mb-6 md:mb-8 px-4">
                <span className="inline-block font-body text-xs font-extrabold uppercase tracking-[0.2em] text-highlight mb-2">
                  Want us handling everything?
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-ink mb-2">
                  Build your 2026 plan.
                </h2>
                <p className="font-body text-paragraph text-base md:text-lg">
                  A minute of questions. A plan shaped around your home.
                </p>
              </div>

              <PlanQuiz />

              {/* Secondary escape hatch to the one-time quote form */}
              <div className="text-center mt-8 md:mt-10 px-4">
                <p className="font-body text-paragraph text-sm md:text-base">
                  Only looking for a one-time job or some mowing help?{" "}
                  <a
                    href="#quote-form"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("quote-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-brand font-bold underline underline-offset-4 hover:text-highlight transition-colors"
                  >
                    Request a quick quote instead →
                  </a>
                </p>
              </div>
            </div>
          </section>

          <ReviewWall />
          <ServiceAreas />

          {/* Jobber Form — one-time / simple-job path */}
          <JobberForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
