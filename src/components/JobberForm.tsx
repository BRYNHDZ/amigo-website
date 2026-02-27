import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const JobberForm = () => {
  useEffect(() => {
    const CSS_ID = "jobber-embed-css";
    const SCRIPT_ID = "jobber-embed-script";
    const CONTAINER_ID = "73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348";

    // Clear any previously injected markup (prevents duplicates in dev/StrictMode and during hot reloads)
    const container = document.getElementById(CONTAINER_ID);
    if (container) container.innerHTML = "";

    // Load Jobber CSS (once)
    let link = document.getElementById(CSS_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
      link.media = "screen";
      document.head.appendChild(link);
    }

    // Load Jobber script (once)
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      script.setAttribute("clienthub_id", "73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348");
      script.setAttribute("form_url", "https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/work_request/embedded_work_request_form?form_id=2060348");
      document.body.appendChild(script);
    }
    return () => {
      // Clear injected form markup so it can't accumulate/duplicate
      const c = document.getElementById(CONTAINER_ID);
      if (c) c.innerHTML = "";
    };
  }, []);
  return <section id="quote-form" className="py-20 md:py-28 bg-cloud">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <div className="gold-accent mx-auto" />
          <h2 className="section-title mb-6">Request a One-Time Job</h2>
          <p className="text-paragraph text-lg max-w-xl mx-auto leading-relaxed">Need something specific handled? Send us the details and we'll get back to you within one business day.</p>
        </div>

        {/* Jobber Embed Container */}
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/30">
          <div id="73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348"></div>
        </div>

        {/* Year-Round CTA */}
        <div className="text-center mt-16 pt-12 border-t border-border/30 max-w-2xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl text-ink mb-4">Want us to take care of your property year-round?</h3>
          <p className="text-paragraph text-lg max-w-xl mx-auto leading-relaxed mb-8">Build a custom property plan in under 60 seconds and see exactly what we'll handle for you.</p>
          <Link
            to="/plan"
            className="btn-primary inline-flex"
          >
            <span>Build My Property Plan</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>;
};
export default JobberForm;