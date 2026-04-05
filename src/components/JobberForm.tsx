import { useEffect } from "react";

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
  return <section id="quote-form" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block font-body text-xs font-extrabold uppercase tracking-[0.2em] text-highlight mb-2">
            Just need something specific?
          </span>
          <h2 className="section-title mb-4">Request a One-Time Quote</h2>
          <p className="text-paragraph text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Mowing help, a one-time cleanup, or a specific job you need done — tell us what you need and we'll get back to you, usually within one business day.
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