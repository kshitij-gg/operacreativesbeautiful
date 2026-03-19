import heroBg from '@/assets/hero-bg.jpg';
import showreelVideo from '@/assets/videos/From KlickPin CF Animated Website UI [Video] _ Interactive web design Webpage design Portfolio web design.mp4';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import LogoSignature from '@/components/LogoSignature';
import TypewriterText from '@/components/TypewriterText';
import GenerativeBackground from '@/components/GenerativeBackground';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ── Multi-Layer Parallax (3 depth layers) ──
  // Layer 1 (background image): moves slowest + zooms OUT as you scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]); // zoom-out effect
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); // slowest parallax
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Layer 2 (middle content): moves at medium speed
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Layer 3 (foreground decorative elements): moves fastest
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Aperture clip-path effect
  const clipProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // ── Shatter Scroll Physics ──
  // Lines detach and fall apart in different directions when you scroll past 20%
  const shatterY1 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 600]);
  const shatterX1 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, -200]);
  const shatterR1 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, -35]);

  const shatterY2 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 800]);
  const shatterX2 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 100]);
  const shatterR2 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 25]);

  const shatterY3 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 1000]);
  const shatterX3 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 400]);
  const shatterR3 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 45]);

  const shatterTransforms = [
    { y: shatterY1, x: shatterX1, rotateZ: shatterR1 },
    { y: shatterY2, x: shatterX2, rotateZ: shatterR2 },
    { y: shatterY3, x: shatterX3, rotateZ: shatterR3 },
  ];

  // Title with staggered line reveal
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
      {/* Background Section with multi-layer parallax */}
      <motion.section
        className="fixed inset-0 h-screen w-full overflow-hidden"
        style={{ zIndex: 0, opacity: bgOpacity }}
      >
        {/* Layer 1: Background Image — slowest parallax + zoom-out */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale, y: bgY }}
        >
          <GenerativeBackground
            videoSrc={showreelVideo}
            posterSrc={heroBg}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </motion.div>

        {/* Layer 3: Foreground decorative elements — fastest parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5"
          style={{ y: fgY, opacity: fgOpacity }}
        >
          {/* Floating decorative lines */}
          <div className="absolute top-[15%] right-[10%] w-24 h-[1px] bg-white/10 rotate-45" />
          <div className="absolute top-[25%] right-[15%] w-16 h-[1px] bg-accent/15 rotate-12" />
          <div className="absolute bottom-[30%] left-[8%] w-20 h-[1px] bg-white/8 -rotate-30" />
          {/* Floating dots */}
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
        </motion.div>

        {/* Vignette pulse overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'vignette-pulse 10s ease-in-out infinite' }}
        />

        {/* Layer 2: Content — medium speed parallax */}
        <motion.div
          className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-24 pointer-events-none"
          style={{ y: contentY }}
        >
          {/* Logo Signature */}
          <div className="mb-6 sm:mb-8 max-w-[200px] sm:max-w-[300px] opacity-50">
            <LogoSignature />
          </div>

          {/* Title with staggered line reveal and shatter scroll physics */}
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-2xl leading-[0.95] uppercase tracking-tight"
          >
            {titleLines.map((line, i) => (
              <motion.span 
                key={i} 
                className="block overflow-visible"
                style={{ 
                  y: shatterTransforms[i].y, 
                  x: shatterTransforms[i].x, 
                  rotateZ: shatterTransforms[i].rotateZ 
                }}
              >
                <motion.span
                  variants={lineVars}
                  className={`block ${line.accent ? 'text-accent italic' : ''}`}
                >
                  {line.text}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
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
        </motion.div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <ChevronDown
            size={18}
            className="text-white/40"
            style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}
          />
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
