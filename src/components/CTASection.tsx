import { useRef, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Layers, Wand2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/MagneticButton';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const capabilities = [
  { icon: <Zap className="w-5 h-5" />, label: 'AI Generation', color: 'text-amber-400' },
  { icon: <Layers className="w-5 h-5" />, label: '3D Motion', color: 'text-violet-400' },
  { icon: <Wand2 className="w-5 h-5" />, label: 'VFX Studio', color: 'text-cyan-400' },
  { icon: <Globe className="w-5 h-5" />, label: 'Global Delivery', color: 'text-emerald-400' },
  { icon: <Sparkles className="w-5 h-5" />, label: 'Creative Direction', color: 'text-rose-400' },
];

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Parallax for orbiting rings
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      {/* ── 1. ORBIT RINGS — Rotating ellipses that orbit the CTA ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] border border-foreground/[0.04] rounded-full"
          style={{ rotate: ringRotate }}
        />
        <motion.div
          className="absolute w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] border border-dashed border-foreground/[0.03] rounded-full"
          style={{ rotate: ring2Rotate }}
        >
          {/* Orbiting dot */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent/40 shadow-[0_0_12px_hsl(var(--accent)/0.4)]"
          />
        </motion.div>
        <motion.div
          className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] border border-foreground/[0.02] rounded-full"
          style={{ rotate: ringRotate }}
        >
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-violet-400/30"
          />
        </motion.div>
      </div>

      {/* ── 2. PARTICLE DOT FIELD — Subtle animated dots scattered in background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-foreground/10"
            style={{
              left: `${10 + (i * 4.3) % 80}%`,
              top: `${5 + (i * 7.1) % 90}%`,
            }}
            animate={{
              y: [0, (i % 2 === 0 ? -15 : 15), 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── 3. RADIAL GLOW — Pulsing light behind the main text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 60%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Giant Watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[22vw] md:text-[20vw] text-foreground/[0.025] uppercase leading-none whitespace-nowrap">
          CREATE
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 text-center">

        {/* ── 4. CAPABILITY ORBIT — 5 floating skill pills that fan out ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] border border-foreground/10 backdrop-blur-sm cursor-default"
            >
              <span className={cap.color}>{cap.icon}</span>
              <span className="font-mono text-xs tracking-wide text-foreground/60">{cap.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Headline */}
        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground max-w-5xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's Make Something{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Unforgettable</span>
            {/* Animated underline */}
            <motion.span
              className="absolute bottom-1 left-0 right-0 h-[3px] bg-accent rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          .
        </motion.h2>

        <motion.p
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Your vision + our AI craft — let's bring it to life.
        </motion.p>

        {/* ── 5. STATS TICKER — Animated numbers that count up ── */}
        <motion.div
          className="mt-10 sm:mt-12 flex items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <StatBlock value={50} suffix="+" label="Projects Delivered" />
          <div className="w-px h-10 bg-foreground/10" />
          <StatBlock value={10} suffix="M+" label="Views Generated" />
          <div className="w-px h-10 bg-foreground/10 hidden sm:block" />
          <div className="hidden sm:block">
            <StatBlock value={98} suffix="%" label="Client Retention" />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-10 sm:mt-14"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.45 }}
        >
          <MagneticButton>
            <Button
              onClick={scrollToContact}
              className="group bg-accent hover:bg-accent/90 text-white rounded-full px-10 sm:px-14 py-6 sm:py-8 text-base sm:text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.5)]"
            >
              Start a Project
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Animated Stat Counter ─── */
const StatBlock = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Count-up animation
  useRef<ReturnType<typeof setInterval> | null>(null);
  if (isInView && count < value) {
    setTimeout(() => {
      setCount((prev) => {
        const step = Math.ceil(value / 30);
        return Math.min(prev + step, value);
      });
    }, 40);
  }

  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">
        {isInView ? count : 0}{suffix}
      </span>
      <p className="font-mono text-[10px] sm:text-xs tracking-wider text-muted-foreground uppercase mt-1">
        {label}
      </p>
    </div>
  );
};

export default CTASection;
