import { useEffect } from "react";

const JobberForm = () => {
  useEffect(() => {
    // Load Jobber CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
    link.media = "screen";
    document.head.appendChild(link);

    // Load Jobber script
    const script = document.createElement("script");
    script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    script.setAttribute("clienthub_id", "73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348");
    script.setAttribute("form_url", "https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/work_request/embedded_work_request_form?form_id=2060348");
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="quote-form" className="py-16 md:py-24 bg-cloud">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-4">Get Your Free Quote</h2>
          <p className="text-paragraph text-lg max-w-xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours with a free estimate.
          </p>
        </div>

        {/* Jobber Embed Container */}
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-10 shadow-lg border border-border/30">
          <div id="73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348"></div>
        </div>
      </div>
    </section>
  );
};

export default JobberForm;
