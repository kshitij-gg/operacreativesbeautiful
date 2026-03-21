import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, LayoutGroup, useSpring } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlitchImage from '@/components/GlitchImage';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const horizontalWorks = [
  { id: 'neon-horizons', image: portfolio1, title: 'NEON HORIZONS', client: 'TECH BRAND', category: 'AI Commercial', year: '2025' },
  { id: 'silent-echo', image: portfolio2, title: 'SILENT ECHO', client: 'STUDIO A', category: 'AI Film', year: '2025' },
  { id: 'fluid-motion', image: portfolio3, title: 'FLUID MOTION', client: 'SPORTSWEAR', category: 'Visual Campaign', year: '2024' },
  { id: 'crystal-vision', image: portfolio4, title: 'CRYSTAL VISION', client: 'BEAUTY CO', category: 'AI Commercial', year: '2024' },
  { id: 'digital-dawn', image: portfolio1, title: 'DIGITAL DAWN', client: 'AUTOMOTIVE', category: 'AI Film', year: '2024' },
  { id: 'prism-effect', image: portfolio3, title: 'PRISM EFFECT', client: 'FASHION HOUSE', category: 'Visual Campaign', year: '2024' },
  { id: 'void-walker', image: portfolio2, title: 'VOID WALKER', client: 'GAMING STUDIO', category: 'AI Commercial', year: '2023' },
  { id: 'luminance', image: portfolio4, title: 'LUMINANCE', client: 'LUXURY BRAND', category: 'AI Film', year: '2023' },
  { id: 'spectrum-shift', image: portfolio3, title: 'SPECTRUM SHIFT', client: 'MUSIC LABEL', category: 'Visual Campaign', year: '2023' },
  { id: 'obsidian-flow', image: portfolio1, title: 'OBSIDIAN FLOW', client: 'TECH BRAND', category: 'AI Commercial', year: '2023' },
  { id: 'ethereal-pulse', image: portfolio4, title: 'ETHEREAL PULSE', client: 'STUDIO A', category: 'AI Film', year: '2023' },
  { id: 'chrome-drift', image: portfolio2, title: 'CHROME DRIFT', client: 'AUTOMOTIVE', category: 'Visual Campaign', year: '2023' },
];

const verticalWorks = [
  { id: 'vert-1', image: portfolio2, title: 'STREET STYLE', client: 'FASHION CO', category: 'Visual Campaign', year: '2025' },
  { id: 'vert-2', image: portfolio4, title: 'GLITCH REALITY', client: 'TECH BRAND', category: 'AI Film', year: '2024' },
  { id: 'vert-3', image: portfolio1, title: 'URBAN ECHO', client: 'SPORTSWEAR', category: 'AI Commercial', year: '2024' },
  { id: 'vert-4', image: portfolio3, title: 'LIQUID CHROME', client: 'BEAUTY CO', category: 'Visual Campaign', year: '2023' },
  { id: 'vert-5', image: portfolio4, title: 'NIGHT RIDER', client: 'AUTOMOTIVE', category: 'AI Film', year: '2023' },
  { id: 'vert-6', image: portfolio2, title: 'BEAT DROP', client: 'MUSIC LABEL', category: 'AI Commercial', year: '2023' },
  { id: 'vert-7', image: portfolio1, title: 'VELVET SKY', client: 'LUXURY BRAND', category: 'Visual Campaign', year: '2025' },
  { id: 'vert-8', image: portfolio3, title: 'NEO TOKYO', client: 'GAMING STUDIO', category: 'AI Commercial', year: '2024' },
];

const categories = ['All', 'AI Film', 'AI Commercial', 'Visual Campaign'] as const;

// Module-level one-shot flags — persist through tab switches, reset on page refresh
let horizontalAnimationDone = false;
let verticalAnimationDone = false;

/* ─── Ken Burns keyframes (injected once) ─── */
const kenBurnsCSS = `
@keyframes kenBurns {
  0%   { transform: scale(1.0) translate(0%, 0%); }
  25%  { transform: scale(1.15) translate(-2%, 1%); }
  50%  { transform: scale(1.1) translate(1%, -1%); }
  75%  { transform: scale(1.18) translate(-1%, 2%); }
  100% { transform: scale(1.0) translate(0%, 0%); }
}
`;

/* ─── 3D Tilt Project Block ─── */
const ProjectBlock = ({
  work,
  onClick,
  index = 0,
  total = 12,
}: {
  work: (typeof horizontalWorks)[0];
  onClick: () => void;
  index?: number;
  total?: number;
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const isInView = useInView(blockRef, { once: true, margin: '-20px' });
  const hasAnimated = useRef(false);

  // Track when entry animation completes so it never replays
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => { hasAnimated.current = true; }, 2800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Parallax: image drifts slower than scroll
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  // 3D tilt values
  const tiltX = useSpring(0, { stiffness: 100, damping: 4, mass: 1.5 });
  const tiltY = useSpring(0, { stiffness: 100, damping: 4, mass: 1.5 });
  const liftZ = useSpring(0, { stiffness: 90, damping: 5, mass: 1.2 });
  const jellyScale = useSpring(1, { stiffness: 120, damping: 4, mass: 1.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!blockRef.current) return;
    const rect = blockRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: mx, y: my });
    tiltX.set((my - 0.5) * -45);
    tiltY.set((mx - 0.5) * 45);
    liftZ.set(150);
    jellyScale.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    liftZ.set(0);
    jellyScale.set(1);
  };

  // ── Circular ring entry math ──
  const angle = (index / total) * Math.PI * 2;
  const ringRadius = 500;
  const startX = Math.cos(angle) * ringRadius;
  const startY = Math.sin(angle) * ringRadius * 0.3;
  const startRotateY = (index / total) * 360;

  // Delay cards until after vortex overlay finishes
  const vortexDelay = 3.8;

  // If already animated once (module-level), skip the big entry
  const shouldAnimate = !horizontalAnimationDone;

  return (
    <motion.div
      ref={blockRef}
      className="relative overflow-hidden cursor-pointer group bg-black rounded-xl"
      data-cursor-media
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={shouldAnimate ? {
        opacity: 0,
        x: startX,
        y: startY,
        scale: 0.35,
        rotateY: startRotateY,
        z: -400,
      } : { opacity: 1 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        z: 0,
      }}
      transition={shouldAnimate ? {
        duration: 1.2,
        delay: vortexDelay + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      } : { duration: 0 }}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        rotateX: tiltX,
        rotateY: tiltY,
        translateZ: liftZ,
        scale: jellyScale,
      }}
    >
      {/* Aspect ratio control */}
      <div
        className="relative w-full"
        style={{ aspectRatio: '16/9', minHeight: 0 }}
      >

        {/* Parallax image container */}
        <motion.div
          className="absolute inset-[-12%] will-change-transform"
          style={{ y: imgY }}
        >
          <GlitchImage
            src={work.image}
            alt={work.title}
            className="w-full h-full absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0.75,
            }}
          />
        </motion.div>

        {/* Light glare on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.1), transparent 50%)`,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)',
            opacity: isHovered ? 0.95 : 0.65,
          }}
        />

        {/* Text overlay — bottom left */}
        <motion.div
          className="absolute bottom-0 left-0 p-4 md:p-6 w-full"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/60 uppercase">
              {work.client}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-primary uppercase">
              {work.category}
            </span>
          </div>

          <h2
            className="font-heading text-lg sm:text-xl md:text-2xl text-white uppercase leading-tight tracking-wide transition-transform duration-500"
            style={{ transform: isHovered ? 'translateX(12px)' : 'translateX(0)' }}
          >
            {work.title}
          </h2>
        </motion.div>

        {/* Year badge */}
        <div
          className="absolute top-6 right-6 md:top-8 md:right-10 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          <span className="font-mono text-xs tracking-[0.15em] text-white/70">{work.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Vertical Format Project Block ─── */
const VerticalProjectBlock = ({
  work,
  onClick,
  index = 0,
  total = 8,
}: {
  work: (typeof verticalWorks)[0];
  onClick: () => void;
  index?: number;
  total?: number;
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(blockRef, { once: true, margin: '-40px' });

  const shouldAnimateVertical = !verticalAnimationDone;
  const delay = shouldAnimateVertical ? (total - index - 1) * 0.12 : 0;

  return (
    <motion.div
      ref={blockRef}
      layout
      layoutId={work.id}
      className="relative overflow-hidden cursor-pointer group bg-black rounded-2xl md:rounded-[2rem] shadow-2xl aspect-[9/16]"
      data-cursor-media
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={shouldAnimateVertical ? { opacity: 0, y: -900, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={shouldAnimateVertical ? { 
        y: { type: "spring", stiffness: 100, damping: 14, mass: 1.2, delay: delay },
        opacity: { duration: 0.6, delay: delay }
      } : { duration: 0 }}
    >
      <motion.div className="w-full h-full relative overflow-hidden">
        <GlitchImage
          src={work.image}
          alt={work.title}
          className="w-full h-full absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
          style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(30%)' }}
        />
        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* Hover UI - Play button pulse */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        <div className="w-full h-full absolute inset-0 rounded-full border border-white top-0 left-0 animate-ping opacity-20" />
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Discover Badge */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 border border-white/10 pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white uppercase">
          Discover
        </span>
      </div>

      {/* Typography bottom up */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 uppercase mb-2 block opacity-60 group-hover:opacity-100 transition-opacity">
          {work.client} <span className="text-primary mx-1">/</span> {work.category}
        </span>
        <h2 className="font-heading text-3xl md:text-4xl text-white uppercase leading-none tracking-tight">
          {work.title}
        </h2>
      </div>
    </motion.div>
  );
};

/* ─── Expanding project view (FLIP transition prep) ─── */
const ProjectExpanded = ({
  work,
  onClose,
}: {
  work: (typeof horizontalWorks)[0] | (typeof verticalWorks)[0];
  onClose: () => void;
}) => (
  <motion.div
    className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    onClick={onClose}
  >
    <motion.div
      layoutId={work.id}
      className="w-full h-full relative overflow-hidden"
    >
      <img
        src={work.image}
        alt={work.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-10 md:p-16">
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase block mb-4">
          {work.client} · {work.category}
        </span>
        <h1 className="font-heading text-5xl md:text-8xl text-white uppercase tracking-wide">
          {work.title}
        </h1>
        <p className="mt-6 text-white/50 font-mono text-sm">Click anywhere to close</p>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Horizontal Scroll Gallery with 3D Tilt Cards ─── */
const HorizontalGallery = ({
  works,
  onClickProject,
}: {
  works: (typeof horizontalWorks);
  onClickProject: (w: (typeof horizontalWorks)[0]) => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={sectionRef}
      className="relative mb-16 sm:mb-24"
      style={{ height: `${Math.max(scrollRange + window.innerHeight, window.innerHeight * 1.5)}px` }}
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Section Label */}
        <div className="absolute top-24 sm:top-28 left-6 sm:left-12 z-20 pointer-events-none">
          <span className="font-mono text-xs tracking-[0.3em] text-primary/60 uppercase">Featured Reel</span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 sm:gap-8 pl-[5vw] pr-[15vw] items-center will-change-transform"
        >
          {works.map((work, index) => (
            <GalleryCard
              key={work.id}
              work={work}
              index={index}
              onClick={() => onClickProject(work)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── 3D Gallery Card for Horizontal Section ─── */
const GalleryCard = ({
  work,
  index,
  onClick,
}: {
  work: (typeof horizontalWorks)[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const tiltX = useSpring(0, { stiffness: 250, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 250, damping: 18 });
  const liftZ = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: mx, y: my });
    tiltX.set((my - 0.5) * -25);
    tiltY.set((mx - 0.5) * 25);
    liftZ.set(80);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    liftZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] flex-shrink-0 relative group cursor-pointer"
      style={{
        aspectRatio: '16/9',
        minHeight: 0,
        transformStyle: 'preserve-3d',
        rotateX: tiltX,
        rotateY: tiltY,
        translateZ: liftZ,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-hover
    >
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black/80 relative border border-white/5">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-[1s] ease-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glare */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.15), transparent 50%)`,
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 pointer-events-none z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/50 uppercase">{work.client}</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-primary uppercase">{work.category}</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-wide">
            {work.title}
          </h3>
          <span className="font-mono text-[10px] text-white/40 mt-1 block">{work.year}</span>
        </div>

        {/* 3D edge highlights */}
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-white/5 via-white/10 to-white/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-white/5 via-white/10 to-white/5 pointer-events-none" />
      </div>
    </motion.div>
  );
};

/* ─── 3D Vortex Ring Overlay ─── */
const VortexRing = ({ works, onDone }: { works: (typeof horizontalWorks); onDone: () => void }) => {
  const shouldShow = !horizontalAnimationDone;
  const [showVortex, setShowVortex] = useState(shouldShow);
  const total = works.length;
  const radius = 450; // px - cylinder radius

  useEffect(() => {
    if (!shouldShow) {
      onDone();
      return;
    }
    // Mark as done IMMEDIATELY so tab-switching never re-triggers it
    horizontalAnimationDone = true;
    // Lock scrolling and force to top while vortex plays
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setShowVortex(false);
      document.body.style.overflow = '';
      onDone();
    }, 3800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {showVortex && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Center glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

          {/* Spinning 3D cylinder of cards */}
          <motion.div
            className="relative"
            style={{
              width: '1px',
              height: '1px',
              transformStyle: 'preserve-3d',
              perspective: '1200px',
            }}
            animate={{ rotateY: [0, 720] }}
            transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {works.map((work, i) => {
              const angle = (i / total) * 360;
              const yOffset = (i % 3 - 1) * 60; // stagger heights for spiral feel
              return (
                <div
                  key={work.id}
                  className="absolute rounded-lg overflow-hidden shadow-2xl border border-white/10"
                  style={{
                    width: '180px',
                    height: '101px', // 16:9
                    left: '-90px',
                    top: `${-50 + yOffset}px`,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-3 font-mono text-[8px] text-white/70 tracking-widest uppercase">
                    {work.title}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Center text */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 text-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.4em] text-primary/80 uppercase">
              Loading Projects
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── Page Component ─── */
const MoreWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'horizontal' | 'vertical'>('horizontal');
  const [expandedProject, setExpandedProject] = useState<(typeof horizontalWorks)[0] | (typeof verticalWorks)[0] | null>(null);
  // True once the vortex overlay exits — gates horizontal grid visibility
  const [vortexDone, setVortexDone] = useState(horizontalAnimationDone);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Inject Ken Burns CSS once
  useEffect(() => {
    const styleId = 'kenburns-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = kenBurnsCSS;
      document.head.appendChild(style);
    }
  }, []);

  // Format-specific arrays
  const filteredWorks = horizontalWorks;

  // Build alternating rows for horizontal format
  const horizontalRows = useMemo(() => {
    const result: { items: (typeof horizontalWorks)[0][]; type: 'split' | 'full' }[] = [];
    let i = 0;
    while (i < filteredWorks.length) {
      const rowType = result.length % 2 === 0 ? 'split' : 'full';
      if (rowType === 'split' && filteredWorks[i + 1]) {
        result.push({ items: [filteredWorks[i], filteredWorks[i + 1]], type: 'split' });
        i += 2;
      } else {
        result.push({ items: [filteredWorks[i]], type: 'full' });
        i += 1;
      }
    }
    return result;
  }, [filteredWorks]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <CustomCursor />
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-0">
        {/* ─── Cinematic Header ─── */}
        <div className="px-6 md:px-12 mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-primary uppercase block mb-4 md:mb-6">
              Selected Projects
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/15 pb-8 md:pb-12">
              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase tracking-tight">
                OUR WORK
              </h1>
              <p className="max-w-xs text-white/50 text-sm font-mono leading-relaxed mb-2">
                Cutting-edge AI commercial and cinematic productions.
              </p>
            </div>
          </motion.div>
        </div>



        {/* ─── Animated Format Toggle ─── */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="relative flex items-center p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
            {['horizontal', 'vertical'].map((format) => (
              <button
                key={format}
                onClick={() => setActiveFormat(format as 'horizontal' | 'vertical')}
                className={`relative px-6 sm:px-10 py-3 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 z-10 ${activeFormat === format ? 'text-black font-bold' : 'text-white/60 hover:text-white'
                  }`}
              >
                {format}
                {activeFormat === format && (
                  <motion.div
                    layoutId="activeFormatBg"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_20px_hsl(var(--primary)/20)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Edge-to-Edge Grid ─── */}
        <LayoutGroup>
          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeFormat === 'horizontal' ? (
                <motion.div
                  key="horizontal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative"
                >
                  {/* ── Phase 1: Full-screen 3D Vortex Ring Overlay ── */}
                  <VortexRing works={horizontalWorks} onDone={() => setVortexDone(true)} />

                  {/* ── Phase 2: Normal Grid — hidden until vortex exits ── */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-4 md:px-8 w-full pb-20"
                    style={{ perspective: '1200px', visibility: vortexDone ? 'visible' : 'hidden' }}
                  >
                    {horizontalWorks.map((item, idx) => (
                      <ProjectBlock
                        key={item.id}
                        work={item}
                        index={idx}
                        total={horizontalWorks.length}
                        onClick={() => setExpandedProject(item)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="vertical"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-8 md:px-12 w-full pb-20"
                  ref={(el) => { if (el && !verticalAnimationDone) { verticalAnimationDone = true; } }}
                >
                  {verticalWorks.map((item, index) => (
                    <VerticalProjectBlock
                      key={item.id}
                      work={item}
                      index={index}
                      total={verticalWorks.length}
                      onClick={() => setExpandedProject(item)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </main>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>

      {/* ─── Expanded Project Overlay (FLIP) ─── */}
      <AnimatePresence>
        {expandedProject && (
          <ProjectExpanded
            work={expandedProject}
            onClose={() => setExpandedProject(null)}
          />
        )}
      </AnimatePresence>
    </div >
  );
};

export default MoreWork;
