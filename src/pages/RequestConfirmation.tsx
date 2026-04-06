import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Search, ClipboardList, FileText, CreditCard, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "We Review Your Request",
    description: "We look over your selections and check your property — most of the time we can do this remotely, no appointment needed.",
  },
  {
    icon: FileText,
    title: "You Get a Proposal",
    description: "We'll put together a property plan based on what you selected and send it over for you to review.",
  },
  {
    icon: ClipboardList,
    title: "You Approve, We Schedule",
    description: "Once you approve, we'll get you on the schedule and set up billing. Simple as that.",
  },
  {
    icon: CreditCard,
    title: "Manage Everything Online",
    description: "You'll have access to your Client Hub where you can view visits, check invoices, and update your info anytime.",
  },
];

const clientHubFeatures = [
  "View your upcoming services",
  "See past and future visits",
  "Review and pay invoices securely",
  "Update your contact or billing information",
];

const RequestConfirmation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Request Confirmed | Amigos Landscaping</title>
        <meta name="description" content="Your service request has been received. Learn what happens next with Amigos Landscaping." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8">
          {/* Back Home Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-highlight transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>

          {/* Success Message */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 mb-8">
              <CheckCircle className="w-10 h-10 text-brand" />
            </div>
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
              You're all set! We'll handle it from here.
            </h1>
            <p className="font-body text-paragraph text-lg md:text-xl max-w-2xl mx-auto">
              We've received your selections and we're on it. We'll review your property and follow up with a proposal — most requests don't require a site visit.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="max-w-4xl mx-auto mb-20 md:mb-28">
            <div className="gold-accent mx-auto" />
            <h2 className="section-title text-center mb-12 md:mb-16">What Happens Next?</h2>

            <div className="grid gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="brand-card flex items-start gap-5 md:gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-brand/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 md:w-7 md:h-7 text-brand" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-headline text-sm text-highlight">Step {index + 1}</span>
                    </div>
                    <h3 className="font-headline text-xl md:text-2xl text-ink mb-2">{step.title}</h3>
                    <p className="font-body text-paragraph leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default RequestConfirmation;
