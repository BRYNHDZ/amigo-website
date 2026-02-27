import { useEffect } from "react";
import { Link } from "react-router-dom";

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

    // Remove old script so it re-runs and injects into the container
    const oldScript = document.getElementById(SCRIPT_ID);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    script.setAttribute("clienthub_id", "73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348");
    script.setAttribute("form_url", "https://clienthub.getjobber.com/client_hubs/73c449a9-90ba-493f-8a4e-c0c1113bcac9/public/work_request/embedded_work_request_form?form_id=2060348");
    document.body.appendChild(script);
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
          <p className="text-paragraph text-lg max-w-xl mx-auto leading-relaxed">Need something specific handled? Send us the details and we'll get back to you usually within one business day.</p>
          <p className="text-paragraph text-base mt-4 max-w-xl mx-auto">
            Want us to take care of your property year-round?{" "}
            <Link to="/plan" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium">
              Build your Property Plan
            </Link>
          </p>
        </div>

        {/* Jobber Embed Container */}
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/30">
          <div id="73c449a9-90ba-493f-8a4e-c0c1113bcac9-2060348"></div>
        </div>
      </div>
    </section>;
};
export default JobberForm;