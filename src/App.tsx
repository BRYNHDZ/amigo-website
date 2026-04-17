import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Availability from "./pages/Availability";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RequestConfirmation from "./pages/RequestConfirmation";
import BrandGuide from "./pages/BrandGuide";
import Recommendations from "./pages/Recommendations";
import ServiceCategoryDetail from "./pages/ServiceCategoryDetail";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Give the page a moment to render, then scroll to the target element
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/request-confirmation" element={<RequestConfirmation />} />
            <Route path="/brand-guide" element={<BrandGuide />} />
            <Route path="/plan" element={<Navigate to="/#plan" replace />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/services/:categorySlug" element={<ServiceCategoryDetail />} />
            <Route path="/availability" element={<Availability />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
