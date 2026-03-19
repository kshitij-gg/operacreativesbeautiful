import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import ReelCounter from '@/components/ReelCounter';
import MagneticButton from '@/components/MagneticButton';
import GlitchImage from '@/components/GlitchImage';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const projects = [
  { image: portfolio1, title: 'Neon Horizons', category: 'AI Commercial' },
  { image: portfolio2, title: 'Silent Echo', category: 'AI Film' },
  { image: portfolio3, title: 'Fluid Motion', category: 'Visual Campaign' },
  { image: portfolio4, title: 'Crystal Vision', category: 'AI Commercial' },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(trackWidth - viewportWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Parallax header
  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${Math.max(scrollRange + window.innerHeight + window.innerWidth * 0.5, window.innerHeight * 2)}px` }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
        style={{ perspective: '800px' }}
      >
        {/* P1: Circular progress ring counter */}
        <ReelCounter scrollProgress={scrollYProgress} totalReels={projects.length} />

        {/* Parallaxed Header */}
        <motion.div
           style={{ y: headerY, opacity: headerOpacity }}
           className="absolute top-[12vh] sm:top-[15vh] left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-12 z-20 pointer-events-auto flex items-end justify-between"
         >
           <div>
             <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase">
               OUR WORK
             </span>
             <h2 className="mt-2 sm:mt-4 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
               Selected Projects.
             </h2>
           </div>

        </motion.div>

        {/* Horizontal Track */}
        <motion.div
          ref={trackRef}
            style={{ x }}
            className="flex gap-6 sm:gap-10 md:gap-12 pl-[5vw] pr-[5vw] items-end pb-[12vh] will-change-transform"
          >
            {projects.map((project, index) => {
              const cardStart = index / (projects.length + 1);
              const cardEnd = (index + 1) / (projects.length + 1);

            return (
              <Gallery3DCard
                key={index}
                project={project}
                index={index}
                total={projects.length}
                scrollYProgress={scrollYProgress}
                cardStart={cardStart}
                cardEnd={cardEnd}
              />
            );
          })}

            {/* End Card — View All Masterpieces */}
            <div className="w-[80vw] sm:w-[60vw] md:w-[50vw] flex-shrink-0 flex items-center justify-center px-4 pr-[20vw]">
              <MagneticButton strength={35}>
                <Link
                  to="/more-work"
                  data-cursor-hover
                  className="group relative flex flex-col items-center justify-center text-center p-10 sm:p-12 rounded-[2rem] overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-accent/5 to-foreground/5 group-hover:from-accent/10 group-hover:via-foreground/10 group-hover:to-accent/10 transition-all duration-700" />
                  <div className="absolute inset-0 border border-foreground/10 group-hover:border-accent/30 rounded-[2rem] transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_40px_hsl(var(--accent)/0.5)] transition-all duration-500">
                      <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-white group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-foreground leading-tight group-hover:text-accent transition-colors duration-500">
                      View All<br />Masterpieces
                    </h3>
                    <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {projects.length}+ projects
                    </p>
                  </div>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
      </div>
    </section>
  );
};

/* ─── 3D Gallery Card ─── */
const Gallery3DCard = ({
  project,
  index,
  total,
  scrollYProgress,
  cardStart,
  cardEnd,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  cardStart: number;
  cardEnd: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Spring-based tilt values for smooth mouse tracking
  const tiltX = useSpring(0, { stiffness: 100, damping: 4, mass: 1.5 });
  const tiltY = useSpring(0, { stiffness: 100, damping: 4, mass: 1.5 });
  const liftZ = useSpring(0, { stiffness: 90, damping: 5, mass: 1.2 });
  const jellyScale = useSpring(1, { stiffness: 120, damping: 4, mass: 1.5 });

  // Calculate the card's rotateY based on its position in the gallery
  // Cards further from center get more rotation = curved gallery effect
  const cardCenter = (cardStart + cardEnd) / 2;
  const baseRotateY = useTransform(
    scrollYProgress,
    [
      Math.max(cardCenter - 0.3, 0),
      cardCenter,
      Math.min(cardCenter + 0.3, 1),
    ],
    [18, 0, -18]
  );

  // Removed Clip-path reveal so cards stay 16:9 permanently

  // Title slide-up
  const titleY = useTransform(
    scrollYProgress,
    [Math.max(cardStart - 0.05, 0), cardStart + 0.05],
    [40, 0]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [Math.max(cardStart - 0.05, 0), cardStart + 0.05],
    [0, 1]
  );

  // Mouse tracking for hover tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: mx, y: my });
    // Tilt toward cursor
    tiltX.set((my - 0.5) * -35);
    tiltY.set((mx - 0.5) * 35);
    liftZ.set(120);
    jellyScale.set(1.05);
  }, [tiltX, tiltY, liftZ]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    liftZ.set(0);
    jellyScale.set(1);
  }, [tiltX, tiltY, liftZ]);

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 relative group cursor-pointer"
      style={{
        width: 'clamp(320px, 40vw, 800px)',
        height: 'clamp(180px, 22.5vw, 450px)',
        transformStyle: 'preserve-3d',
        rotateY: isHovered ? tiltY : baseRotateY,
        rotateX: tiltX,
        translateZ: liftZ,
        scale: jellyScale,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* Card body with rounded corners and shadow */}
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black relative">
        {/* Card Image and Gradient */}
        <motion.div
          className="w-full h-full relative"
        >
          <GlitchImage
            src={project.image}
            alt={project.title}
            className="w-full h-full absolute inset-0"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Glare/light reflection on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-20"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08), transparent 50%)`,
            }}
          />
        )}

        {/* Title overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 pointer-events-none z-10"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-accent font-semibold uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.category}
          </span>
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-white">
            {project.title}
          </h3>
        </motion.div>

        {/* Discover Badge */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10 pointer-events-none z-10">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white uppercase">
            Discover
          </span>
        </div>

        {/* Side edge highlight for 3D feel */}
        <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-white/5 via-white/10 to-white/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-white/5 via-white/10 to-white/5 pointer-events-none" />
      </div>

      {/* Mirror floor reflection */}
      <div
        className="absolute left-0 right-0 h-[40%] rounded-2xl overflow-hidden pointer-events-none"
        style={{
          top: '100%',
          transform: 'scaleY(-1) translateY(4px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 70%)',
          filter: 'blur(3px) brightness(0.6)',
        }}
      >
        <img
          src={project.image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
