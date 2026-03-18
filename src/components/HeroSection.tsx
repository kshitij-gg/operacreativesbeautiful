import heroBg from '@/assets/hero-bg.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import LogoSignature from '@/components/LogoSignature';
import TypewriterText from '@/components/TypewriterText';
import { ChevronDown, Play } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef(null);
  const [showReel, setShowReel] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image scales up and fades as you scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Aperture clip-path effect — circle expands on scroll
  const clipProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Split text for staggered line reveal — H1: accent on last line
  const titleLines = [
    { text: "AI FILM", accent: false },
    { text: "PRODUCTION", accent: false },
    { text: "WITHOUT LIMITS", accent: true },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.2,
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
    <div ref={ref} className="h-screen relative" style={{ zIndex: 0 }}>
      {/* Background Section with parallax zoom */}
      <motion.section
        className="fixed inset-0 h-screen w-full overflow-hidden"
        style={{ zIndex: 0, opacity: bgOpacity }}
      >
        {/* Background Image — parallax scale */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
            data-cursor-media
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </motion.div>

        {/* H3: Vignette pulse overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'vignette-pulse 10s ease-in-out infinite' }}
        />

        {/* Content */}
        <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-24">
          {/* Logo Signature Animation */}
          <div className="mb-6 sm:mb-8 max-w-[200px] sm:max-w-[300px] opacity-50">
            <LogoSignature />
          </div>

          {/* H1: Title with accent on last line */}
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-2xl leading-[0.95] uppercase tracking-tight"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  variants={lineVars}
                  className={`block ${line.accent ? 'text-accent italic' : ''}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Tagline — updated copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="mt-4 sm:mt-6 text-white/60 text-sm sm:text-base max-w-md"
          >
            <TypewriterText delay={2600} speed={30}>
              Where AI meets cinema. Every frame, engineered.
            </TypewriterText>
          </motion.p>

          {/* H4: Showreel play button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.6, ease: 'easeOut' }}
            onClick={() => setShowReel(true)}
            className="mt-6 sm:mt-8 group flex items-center gap-3 w-fit"
            data-cursor-hover
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <Play size={18} className="text-white ml-0.5 group-hover:text-accent transition-colors" />
            </div>
            <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase group-hover:text-white transition-colors">
              Watch Showreel
            </span>
          </motion.button>
        </div>

        {/* H2: Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <ChevronDown
            size={18}
            className="text-white/40"
            style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}
          />
        </div>
      </motion.section>

      {/* Showreel fullscreen overlay (placeholder) */}
      {showReel && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowReel(false)}
        >
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-6">
              <Play size={36} className="text-accent ml-1" />
            </div>
            <p className="text-white/60 font-mono text-sm">Showreel coming soon</p>
            <p className="text-white/30 font-mono text-xs mt-2">Click anywhere to close</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroSection;
