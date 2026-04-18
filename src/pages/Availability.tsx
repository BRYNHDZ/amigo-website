import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SchedulingStatus = {
  weeklySlotsLeft: number | null;
  projectWeek: string;
  lastUpdated: string;
};

const PHONE_DISPLAY = "(630) 664-0303";
const PHONE_TEL = "tel:6306640303";

async function fetchSchedulingStatus(): Promise<SchedulingStatus> {
  const res = await fetch("/.netlify/functions/scheduling-status");
  if (!res.ok) throw new Error("unavailable");
  return (await res.json()) as SchedulingStatus;
}

const Availability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["scheduling-status"],
    queryFn: fetchSchedulingStatus,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const [, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Current Availability | Amigos Landscaping</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8 max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-highlight transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>

          <div className="text-center mb-12 md:mb-16">
            <div className="gold-accent mx-auto" />
            <h1 className="section-title text-center">Current Availability</h1>
          </div>

          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {data && <ReadyState data={data} />}
        </div>
      </main>

      <Footer />
    </>
  );
};

const LoadingState = () => (
  <div className="space-y-8 animate-pulse">
    <div className="brand-card">
      <div className="h-4 bg-paragraph/10 rounded w-48 mb-4 mx-auto" />
      <div className="h-10 bg-paragraph/10 rounded w-32 mx-auto" />
    </div>
    <div className="brand-card">
      <div className="h-4 bg-paragraph/10 rounded w-48 mb-4 mx-auto" />
      <div className="h-10 bg-paragraph/10 rounded w-40 mx-auto" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="brand-card text-center">
    <p className="font-body text-paragraph leading-relaxed">
      Between updates — text Brayan at{" "}
      <a
        href={PHONE_TEL}
        className="font-semibold text-brand hover:text-highlight transition-colors"
      >
        {PHONE_DISPLAY}
      </a>{" "}
      for the latest.
    </p>
  </div>
);

const ReadyState = ({ data }: { data: SchedulingStatus }) => {
  const updatedAgo = formatDistanceToNow(new Date(data.lastUpdated), {
    addSuffix: true,
  });

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <section className="brand-card text-center">
          <h2 className="font-headline text-sm uppercase tracking-wider text-highlight mb-4">
            Weekly Mowing &amp; Maintenance
          </h2>
          {data.weeklySlotsLeft !== null && data.weeklySlotsLeft > 0 ? (
            <>
              <p className="font-headline text-4xl md:text-5xl text-ink mb-2">
                {data.weeklySlotsLeft} slots left
              </p>
              <p className="font-body text-paragraph">on our weekly route</p>
            </>
          ) : (
            <p className="font-headline text-2xl md:text-3xl text-ink">
              No weekly slots open right now
            </p>
          )}
          <p className="font-body text-sm text-paragraph/70 mt-4">
            mowing, weekly bed upkeep, trimming
          </p>
        </section>

        <section className="brand-card text-center">
          <h2 className="font-headline text-sm uppercase tracking-wider text-highlight mb-4">
            Projects &amp; One-Time Work
          </h2>
          {data.projectWeek ? (
            <>
              <p className="font-body text-paragraph mb-2">
                Currently scheduling
              </p>
              <p className="font-headline text-3xl md:text-4xl text-ink">
                {data.projectWeek}
              </p>
            </>
          ) : (
            <p className="font-headline text-2xl md:text-3xl text-ink">
              Contact us for current project scheduling
            </p>
          )}
          <p className="font-body text-sm text-paragraph/70 mt-4">
            mulch installation, aeration, overseeding, one-time cleanups
          </p>
        </section>
      </div>

      <p className="text-center font-body text-sm text-paragraph/60 mt-6">
        Updated {updatedAgo}
      </p>

      <div className="max-w-2xl mx-auto mt-12 md:mt-16">
        <p className="font-body text-paragraph leading-relaxed text-center italic">
          We get a high volume of requests, and both the weekly route and our
          project calendar fill fast. If you're waiting to accept a quote,
          what's available today may not be by the time you come back.
        </p>
      </div>
    </>
  );
};

export default Availability;
