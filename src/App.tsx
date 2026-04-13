import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import SmoothScroll from "./components/SmoothScroll";
import IntroLoader from "./components/IntroLoader";
import { IntroContext } from "./contexts/IntroContext";

const queryClient = new QueryClient();

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Snap to the very beginning/top immediately
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
        <IntroContext.Provider value={introDone}>
          <BrowserRouter>
            <SmoothScroll />
            <AnimatedRoutes />
          </BrowserRouter>
        </IntroContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
