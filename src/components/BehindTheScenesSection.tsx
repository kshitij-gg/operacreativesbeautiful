import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Palette, Cpu, Film, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept & Script',
    description: 'We tear down the brief and rebuild it as a cinematic vision. Scene-by-scene drafts, dialogues, mood references, and exact time-codes.',
    icon: <Lightbulb className="w-7 h-7" />,
    gradient: 'from-amber-500 to-orange-600',
    details: ['Ideation & Storyboarding', 'AI Script Refinement', 'Pacing & Time-coding'],
  },
  {
    number: '02',
    title: 'Look & Pre-viz',
    description: 'Before motion begins, we define the exact aesthetic — testing dozens of AI models to lock lighting, camera angles, and character consistency.',
    icon: <Palette className="w-7 h-7" />,
    gradient: 'from-violet-500 to-purple-600',
    details: ['Engine Selection', 'Lighting & Composition', 'Character Consistency'],
  },
  {
    number: '03',
    title: 'AI Production',
    description: 'The core generation phase. Massive compute power for motion tests, multi-variant rendering, and iterative loop engineering.',
    icon: <Cpu className="w-7 h-7" />,
    gradient: 'from-cyan-500 to-blue-600',
    details: ['Iterative Prompting', 'Motion Dynamics', 'Multi-Variant Renders'],
  },
  {
    number: '04',
    title: 'Post-production',
    description: 'Raw generations are the beginning. We stitch, grade, upscale, and master audio — turning AI fragments into theater-ready film.',
    icon: <Film className="w-7 h-7" />,
    gradient: 'from-rose-500 to-red-600',
    details: ['VFX Compositing', 'Cinematic Grading', 'Sound Mixing & Upscaling'],
  },
];

const BehindTheScenesSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Floating parallax for decorative elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView || isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  const activeData = steps[activeStep];

  return (
    <section
      id="behind-the-scenes"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 relative bg-background overflow-clip"
    >
      {/* ── Animated Background Elements ── */}
      <motion.div
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full pointer-events-none"
        style={{
          y: floatY1,
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full pointer-events-none"
        style={{
          y: floatY2,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-4 h-4 border border-accent/20 rotate-45 pointer-events-none"
        animate={{ rotate: [45, 135, 225, 315, 405], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[40%] right-[12%] w-3 h-3 bg-accent/10 rounded-full pointer-events-none"
        animate={{ y: [0, -20, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[25%] w-6 h-6 border border-purple-500/15 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[60%] left-[20%] w-2 h-8 bg-gradient-to-b from-accent/20 to-transparent rounded-full pointer-events-none"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left Column: Title + Step Selector ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  Behind The Scenes
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
                How We Create <br className="hidden lg:block" />
                <span className="text-accent italic">Magic.</span>
              </h2>

              <p className="mt-6 text-muted-foreground text-lg max-w-md">
                A four-act process that transforms raw AI into masterpiece-level cinema.
              </p>
            </motion.div>

            {/* Step Selector — Now with animated connector line */}
            <div className="mt-12 sm:mt-14 relative">
              {/* Vertical connector */}
              <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-border/30 rounded-full" />
              <motion.div
                className="absolute left-[22px] top-6 w-[2px] bg-accent rounded-full"
                animate={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="space-y-1">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPast = index < activeStep;
                  return (
                    <motion.button
                      key={step.number}
                      onClick={() => { setActiveStep(index); setIsPaused(true); }}
                      className={`w-full text-left group flex items-center gap-5 p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-foreground/[0.04]' : 'hover:bg-foreground/[0.02]'}`}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {/* Node dot */}
                      <div className={`relative z-10 flex items-center justify-center w-[14px] h-[14px] rounded-full border-2 transition-all duration-500 ${isActive ? 'border-accent bg-accent scale-125 shadow-[0_0_12px_hsl(var(--accent)/0.5)]'
                        : isPast ? 'border-accent/60 bg-accent/40' : 'border-border bg-background'
                        }`}>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-accent/30"
                            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                            {step.number}
                          </span>
                          <h3 className={`font-heading text-lg sm:text-xl transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/70'
                            }`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-accent opacity-100 translate-x-0' : 'text-muted-foreground opacity-0 -translate-x-2'
                        }`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Animated Content Stage ── */}
          <div
            className="lg:col-span-7 relative lg:min-h-[650px] flex items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl"
              >
                {/* Card background with gradient mesh */}
                <div className="absolute inset-0 bg-[#0a0a0a]" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at 20% 50%, ${activeStep === 0 ? 'rgba(245,158,11,0.15)' : activeStep === 1 ? 'rgba(139,92,246,0.15)' : activeStep === 2 ? 'rgba(6,182,212,0.15)' : 'rgba(244,63,94,0.15)'}, transparent 60%)`,
                  }}
                />
                {/* Animated grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Giant Number — Parallax feel */}
                <motion.div
                  className="absolute -right-6 -top-8 font-heading text-[16rem] md:text-[20rem] leading-none text-foreground/[0.03] select-none pointer-events-none"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {activeData.number}
                </motion.div>

                <div className="relative z-10 p-8 sm:p-10 md:p-12">
                  {/* Icon with animated glow */}
                  <motion.div
                    className="mb-8 inline-flex relative"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeData.gradient} blur-2xl opacity-40 scale-150`} />
                    <div className={`relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${activeData.gradient} text-white shadow-xl`}>
                      {activeData.icon}
                    </div>
                  </motion.div>

                  <motion.h3
                    className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {activeData.title}
                  </motion.h3>

                  <motion.p
                    className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {activeData.description}
                  </motion.p>



                  {/* Detail pills with stagger */}
                  <div className="mt-10 flex flex-wrap gap-3">
                    {activeData.details.map((detail, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.1), type: 'spring', stiffness: 300 }}
                        className="px-4 py-2 rounded-full bg-foreground/[0.06] border border-foreground/10 text-foreground/70 font-mono text-xs tracking-wide"
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </div>

                  {/* Progress bar at bottom */}
                  <div className="mt-10 h-[3px] bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${activeData.gradient} rounded-full`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: isPaused ? 999 : 4.5, ease: 'linear' }}
                      key={`progress-${activeStep}-${isPaused}`}
                    />
                  </div>

                  {/* Step dot indicators */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setActiveStep(i); setIsPaused(true); }}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeStep ? 'w-8 bg-accent' : 'bg-foreground/15 hover:bg-foreground/30'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Glowing gradient bottom edge */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${activeData.gradient} opacity-40`} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BehindTheScenesSection;
