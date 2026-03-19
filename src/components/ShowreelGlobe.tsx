import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

/**
 * ShowreelGlobe — 3D sphere of project thumbnails that auto-rotates
 * and can be dragged to spin. Pure CSS 3D transforms, no Three.js.
 */

const globeItems = [
  { image: portfolio1, title: 'Neon Horizons' },
  { image: portfolio2, title: 'Silent Echo' },
  { image: portfolio3, title: 'Fluid Motion' },
  { image: portfolio4, title: 'Crystal Vision' },
  { image: portfolio1, title: 'Neon Horizons II' },
  { image: portfolio2, title: 'Silent Echo II' },
  { image: portfolio3, title: 'Fluid Motion II' },
  { image: portfolio4, title: 'Crystal Vision II' },
  { image: portfolio1, title: 'Neon Horizons III' },
  { image: portfolio2, title: 'Silent Echo III' },
  { image: portfolio3, title: 'Fluid Motion III' },
  { image: portfolio4, title: 'Crystal Vision III' },
];

const ShowreelGlobe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const autoRotateRef = useRef<number>(0);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    let raf: number;
    const animate = () => {
      autoRotateRef.current += 0.15;
      setRotation((prev) => ({ ...prev, y: autoRotateRef.current }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isDragging]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotX: rotation.x,
        rotY: rotation.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [rotation]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newY = dragStart.current.rotY + dx * 0.3;
      const newX = Math.max(-40, Math.min(40, dragStart.current.rotX - dy * 0.3));
      setRotation({ x: newX, y: newY });
      autoRotateRef.current = newY;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Place items on a sphere using latitude/longitude
  const radius = 280;
  const total = globeItems.length;
  const rows = 3;
  const perRow = Math.ceil(total / rows);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 relative bg-background overflow-clip"
    >
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground">
            Our <span className="text-accent italic">Universe</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm font-mono">
            Drag to explore • Click to discover
          </p>
        </motion.div>
      </div>

      {/* Globe container */}
      <div className="flex items-center justify-center">
        <div
          className="relative w-[600px] h-[500px] cursor-grab active:cursor-grabbing"
          style={{ perspective: '1000px' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

          {/* 3D rotating container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          >
            {globeItems.map((item, i) => {
              const row = Math.floor(i / perRow);
              const col = i % perRow;
              // Latitude: -40° to +40° spread across rows
              const lat = ((row / (rows - 1)) - 0.5) * 80;
              // Longitude: evenly spaced around the circle, offset per row
              const lon = (col / perRow) * 360 + (row * 30);

              const latRad = (lat * Math.PI) / 180;
              const lonRad = (lon * Math.PI) / 180;

              const x = radius * Math.cos(latRad) * Math.sin(lonRad);
              const y = radius * Math.sin(latRad);
              const z = radius * Math.cos(latRad) * Math.cos(lonRad);

              return (
                <motion.div
                  key={`${item.title}-${i}`}
                  className="absolute rounded-lg overflow-hidden shadow-xl border border-white/10 group hover:z-50"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  style={{
                    width: '140px',
                    height: '79px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-70px',
                    marginTop: '-39px',
                    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-1.5 left-2 font-mono text-[7px] text-white/80 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowreelGlobe;
