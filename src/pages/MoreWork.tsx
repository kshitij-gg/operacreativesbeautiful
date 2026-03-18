import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const works = [
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

const categories = ['All', 'AI Film', 'AI Commercial', 'Visual Campaign'] as const;

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

/* ─── Parallax Project Block ─── */
const ProjectBlock = ({
  work,
  isFullWidth,
  onClick,
}: {
  work: (typeof works)[0];
  isFullWidth: boolean;
  onClick: () => void;
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(blockRef, { once: true, margin: '-60px' });

  // Parallax: image drifts slower than scroll (window effect)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      ref={blockRef}
      layout
      layoutId={work.id}
      className="relative overflow-hidden cursor-pointer group bg-black"
      data-cursor-media
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Aspect ratio control */}
      <div className={`relative w-full ${isFullWidth ? 'aspect-[21/9] md:aspect-[3/1]' : 'aspect-square md:aspect-[16/10]'}`}>

        {/* Parallax image container */}
        <motion.div
          className="absolute inset-[-12%] will-change-transform"
          style={{ y: imgY }}
        >
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0.75,
              // Ken Burns animation on hover — simulates video-like movement
              animation: isHovered ? 'kenBurns 6s ease-in-out infinite' : 'none',
            }}
            loading="lazy"
          />
        </motion.div>

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
          className="absolute bottom-0 left-0 p-6 md:p-10 w-full"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          {/* Client dot Category */}
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/60 uppercase">
              {work.client}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-primary uppercase">
              {work.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide transition-transform duration-500"
            style={{ transform: isHovered ? 'translateX(12px)' : 'translateX(0)' }}
          >
            {work.title}
          </h2>
        </motion.div>

        {/* Year badge — top right, visible on hover */}
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

/* ─── Expanding project view (FLIP transition prep) ─── */
const ProjectExpanded = ({
  work,
  onClose,
}: {
  work: (typeof works)[0];
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

/* ─── Page Component ─── */
const MoreWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<(typeof works)[0] | null>(null);

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

  // Filter works by category
  const filteredWorks = useMemo(() => {
    if (activeFilter === 'All') return works;
    return works.filter((w) => w.category === activeFilter);
  }, [activeFilter]);

  // Build alternating rows from filtered works
  const rows = useMemo(() => {
    const result: { items: (typeof works)[0][]; type: 'split' | 'full' }[] = [];
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



        {/* ─── Edge-to-Edge Grid ─── */}
        <LayoutGroup>
          <div className="w-full">
            <AnimatePresence mode="popLayout">
              {rows.map((row, rowIdx) => (
                <motion.div
                  key={`${activeFilter}-row-${rowIdx}`}
                  className={`grid ${row.type === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} w-full`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {row.items.map((item) => (
                    <ProjectBlock
                      key={item.id}
                      work={item}
                      isFullWidth={row.type === 'full'}
                      onClick={() => setExpandedProject(item)}
                    />
                  ))}
                </motion.div>
              ))}
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
    </div>
  );
};

export default MoreWork;
