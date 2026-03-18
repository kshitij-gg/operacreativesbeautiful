import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import BehindTheScenesSection from '@/components/BehindTheScenesSection';
import ToolsSection from '@/components/ToolsSection';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import FilmGrain from '@/components/FilmGrain';
import GradientMesh from '@/components/GradientMesh';
import MarqueeBanner from '@/components/MarqueeBanner';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      <div className="min-h-screen bg-background relative">
        {/* ── Global Overlays ── */}
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] bg-accent origin-left z-[9998] rounded-r-full"
          style={{ scaleX, boxShadow: '0 0 8px hsl(var(--accent) / 0.5)' }}
        />
        {/* Film grain — subtle analog texture */}
        <FilmGrain />
        {/* Animated gradient mesh — floating cinema-color blobs */}
        <GradientMesh />
        {/* Custom cursor with morph states */}
        <CustomCursor />
        <Navbar />

        <main className="relative">
          <HeroSection />

          <div className="relative z-10 bg-background rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="h-24 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />

            <MarqueeBanner
              text="AI FILMS ★ COMMERCIALS ★ VISUAL CAMPAIGNS ★ MOTION DESIGN ★ CREATIVE DIRECTION ★ "
              speed={35}
              className="border-y border-foreground/5"
            />

            <AboutSection />

            <div className="h-16 bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent" />

            <MarqueeBanner
              text="CONCEPT ★ STORYBOARD ★ AI PRODUCTION ★ POST-PRODUCTION ★ VFX ★ COLOR GRADING ★ "
              speed={40}
              reverse={true}
              className="border-y border-foreground/5 opacity-50"
            />

            <PortfolioSection />

            <div className="h-16 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />

            <BehindTheScenesSection />
            <ToolsSection />

            <div className="h-16 bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent" />

            <CTASection />

            <div className="h-16 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />

            <ContactSection />
          </div>
        </main>

        {/* Standard Flow Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
