import { lazy, Suspense, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SmoothScroll from '@/components/SmoothScroll';
import FilmGrain from '@/components/FilmGrain';
import FerrofluidBackground from '@/components/FerrofluidBackground';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Core App Loads Instantly
// Everything Below the Fold Lazy Loads:
const AboutSection = lazy(() => import('@/components/AboutSection'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const BehindTheScenesSection = lazy(() => import('@/components/BehindTheScenesSection'));
const ToolsSection = lazy(() => import('@/components/ToolsSection'));
const LiquidDivider = lazy(() => import('@/components/LiquidDivider'));
const CTASection = lazy(() => import('@/components/CTASection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
const MarqueeBanner = lazy(() => import('@/components/MarqueeBanner'));
const SectionCurtain = lazy(() => import('@/components/SectionCurtain'));

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle cross-page navigation from /more-work
  const location = useLocation();
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-transparent relative">
        <FerrofluidBackground />
        
        {/* ── Global Overlays ── */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] bg-accent origin-left z-[9998] rounded-r-full"
          style={{ scaleX, boxShadow: '0 0 8px hsl(var(--accent) / 0.5)' }}
        />
        <FilmGrain />

        <Navbar />

        <main className="relative z-10">
          <HeroSection />

          <Suspense fallback={<div className="h-40 w-full" />}>
            <div className="relative z-10 bg-background/80 backdrop-blur-3xl rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]">
              <LiquidDivider color="accent" />

              <MarqueeBanner
                text="AI FILMS ★ COMMERCIALS ★ VISUAL CAMPAIGNS ★ MOTION DESIGN ★ CREATIVE DIRECTION ★ "
                speed={35}
                className="border-y border-foreground/5"
              />

              {/* About Section — wrapped in curtain reveal */}
              <SectionCurtain>
                <AboutSection />
              </SectionCurtain>

              <LiquidDivider color="purple" />

              <MarqueeBanner
                text="CONCEPT ★ STORYBOARD ★ AI PRODUCTION ★ POST-PRODUCTION ★ VFX ★ COLOR GRADING ★ "
                speed={40}
                reverse={true}
                className="border-y border-foreground/5 opacity-50"
              />

              <PortfolioSection />

              <LiquidDivider color="cyan" />

              {/* BTS Section — wrapped in curtain reveal */}
              <SectionCurtain>
                <BehindTheScenesSection />
              </SectionCurtain>

              <ToolsSection />

              <LiquidDivider color="purple" />

              <CTASection />

              <LiquidDivider color="accent" />

              <ContactSection />
            </div>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </SmoothScroll>
  );
};

export default Index;
