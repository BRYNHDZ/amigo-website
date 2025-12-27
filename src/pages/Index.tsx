import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
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
            telephone: "+1-630-555-1234",
            address: {
              "@type": "PostalAddress",
              addressLocality: "DuPage County",
              addressRegion: "IL",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.8557,
              longitude: -88.0906,
            },
            areaServed: [
              "Glen Ellyn",
              "Wheaton",
              "Lombard",
              "Villa Park",
              "Elmhurst",
              "Addison",
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
          <Testimonials />
          <ServiceAreas />
          <JobberForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
