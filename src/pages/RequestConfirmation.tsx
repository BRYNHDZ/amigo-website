import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Search, ClipboardList, FileText, CreditCard, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Quick Review",
    description: "We look over your request to make sure we're a good fit.",
  },
  {
    icon: ClipboardList,
    title: "Assessment",
    description: "If everything looks good, we'll check your property so we know what it needs. If it's not a match, we'll point you in the right direction.",
  },
  {
    icon: FileText,
    title: "Proposal",
    description: "We'll send a simple proposal for you to approve.",
  },
  {
    icon: CreditCard,
    title: "Billing Setup",
    description: "When you approve, we'll add you to our schedule, and you can see your visit details anytime in your Client Hub.",
  },
];

const clientHubFeatures = [
  "View your upcoming services",
  "See past and future visits",
  "Review and pay invoices securely",
  "Update your contact or billing information",
];

const RequestConfirmation = () => {
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
            <p className="font-body text-paragraph text-lg md:text-xl max-w-2xl mx-auto mb-4">
              We've received your information. Our team is reviewing everything now.
            </p>
            <p className="font-body text-ink text-lg">
              Typical response time: <span className="font-bold text-brand">1 business day</span>
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
