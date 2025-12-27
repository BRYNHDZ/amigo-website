import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        {/* Decorative Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-highlight/10 flex items-center justify-center">
          <Leaf className="w-12 h-12 text-highlight" />
        </div>

        {/* Error Code */}
        <h1 className="font-headline text-7xl md:text-8xl text-brand mb-4">404</h1>

        {/* Message */}
        <p className="font-accent text-2xl text-highlight mb-2">Oops! A weed snuck in.</p>
        <p className="font-body text-paragraph text-lg mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>

        {/* CTA */}
        <a
          href="/"
          className="btn-primary inline-flex"
        >
          <Home className="w-5 h-5" />
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
