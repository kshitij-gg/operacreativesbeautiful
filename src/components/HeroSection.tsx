import heroBg from '@/assets/hero-bg.jpg';
import showreelVideo from '@/assets/videos/From KlickPin CF Animated Website UI [Video] _ Interactive web design Webpage design Portfolio web design.mp4';
import { motion } from 'framer-motion';
import GenerativeBackground from '@/components/GenerativeBackground';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {

  // Title with staggered line reveal
  const titleLines = [
    { text: "AI FILM", accent: false },
    { text: "PRODUCTION", accent: false },
    { text: "WITHOUT LIMITS", accent: false },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const lineVars = {
    hidden: { opacity: 0, y: 60, skewY: 3 },
    show: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.9, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="h-screen w-full relative z-0">
      {/* Background Section without Parallax for pure performance */}
      <section className="absolute inset-0 h-screen w-full overflow-hidden z-0">

        {/* Layer 1: Background Image */}
        <div className="absolute inset-0">
          <GenerativeBackground
            videoSrc={showreelVideo}
            posterSrc={heroBg}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Layer 3: Foreground decorative elements (Static) */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Floating decorative lines */}
          <div className="absolute top-[15%] right-[10%] w-24 h-[1px] bg-white/10 rotate-45" />
          <div className="absolute top-[25%] right-[15%] w-16 h-[1px] bg-accent/15 rotate-12" />
          <div className="absolute bottom-[30%] left-[8%] w-20 h-[1px] bg-white/8 -rotate-30" />
          {/* Floating dots lightly animated via CSS-equivalent motion logic */}
          <motion.div
            className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent/20"
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-white/15"
            animate={{ y: [0, 8, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Vignette pulse overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'vignette-pulse 10s ease-in-out infinite' }}
        />

        {/* Layer 2: Content Container */}
        <div className="relative z-10 h-[100dvh] container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-24 pointer-events-none">
          {/* Title with staggered line reveal */}
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-2xl leading-[0.95] uppercase tracking-tight"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <motion.span
                  variants={lineVars}
                  className={`block ${line.accent ? 'text-accent italic' : ''}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 xl:hidden">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <ChevronDown
            size={18}
            className="text-white/40"
            style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
