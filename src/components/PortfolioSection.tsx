import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReelCounter from '@/components/ReelCounter';
import MagneticButton from '@/components/MagneticButton';
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

  // Measure how far the track needs to slide
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

  // Slide by exactly the overflow amount (in pixels)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Parallax header
  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${Math.max(scrollRange + window.innerHeight, window.innerHeight * 2)}px` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* P1: Circular progress ring counter */}
        <ReelCounter scrollProgress={scrollYProgress} totalReels={projects.length} />

        {/* Parallaxed Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="absolute top-[12vh] sm:top-[15vh] left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-12 z-20 pointer-events-none"
        >
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase">
            OUR WORK
          </span>
          <h2 className="mt-2 sm:mt-4 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Selected Projects.
          </h2>
        </motion.div>

        {/* Horizontal Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-8 sm:gap-12 md:gap-14 pl-[5vw] pr-[5vw] items-center will-change-transform"
        >
          {projects.map((project, index) => {
            // P2: Calculate individual card scroll thresholds for title slide-up
            const cardStart = index / (projects.length + 1);
            const cardEnd = (index + 1) / (projects.length + 1);

            return (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                cardStart={cardStart}
                cardEnd={cardEnd}
              />
            );
          })}

          {/* P3: End Card — More Dramatic */}
          <div className="w-[50vw] sm:w-[35vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center px-4">
            <MagneticButton strength={35}>
              <Link
                to="/more-work"
                data-cursor-hover
                className="group relative flex flex-col items-center justify-center text-center p-10 sm:p-12 rounded-[2rem] overflow-hidden transition-all duration-500"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-accent/5 to-foreground/5 group-hover:from-accent/10 group-hover:via-foreground/10 group-hover:to-accent/10 transition-all duration-700" />
                <div className="absolute inset-0 border border-foreground/10 group-hover:border-accent/30 rounded-[2rem] transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="w-18 h-18 sm:w-22 sm:h-22 w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_40px_hsl(var(--accent)/0.5)] transition-all duration-500">
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

/* ─── Individual Project Card with title slide-up & image reveal ─── */
const ProjectCard = ({
  project,
  index,
  scrollYProgress,
  cardStart,
  cardEnd,
}: {
  project: typeof projects[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  cardStart: number;
  cardEnd: number;
}) => {
  // P2: Title slides up as card approaches viewport center
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

  // Cinematic clip-path unroll reveal (left to right unroll)
  const clipPathOpacity = useTransform(
    scrollYProgress,
    [Math.max(cardStart - 0.1, 0), cardStart + 0.02],
    [0, 1]
  );
  const clipPathSize = useTransform(
    scrollYProgress,
    [Math.max(cardStart - 0.1, 0), cardStart + 0.05],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <div
      data-cursor-hover
      className="w-[80vw] sm:w-[65vw] md:w-[55vw] lg:w-[50vw] aspect-video flex-shrink-0 relative group rounded-2xl overflow-hidden shadow-2xl bg-black"
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          clipPath: clipPathSize,
          opacity: clipPathOpacity,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* P2: Content overlay — title slides up */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 pointer-events-none"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-accent font-semibold uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.category}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white">
          {project.title}
        </h3>
      </motion.div>

      {/* Discover Badge */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10 pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white uppercase">
          Discover
        </span>
      </div>
    </div>
  );
};

export default PortfolioSection;
