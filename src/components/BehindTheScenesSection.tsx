import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Palette, Cpu, Film, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept & Script',
    description: 'We start by tearing down the brief and rebuilding it as a cinematic vision. Scene-by-scene drafts, dialogues, mood references, and exact time-codes are locked in.',
    icon: <Lightbulb className="w-8 h-8 md:w-10 md:h-10" />,
    accentColor: 'from-amber-400 to-orange-600',
    details: ['Ideation & Storyboarding', 'AI Script Refinement', 'Pacing & Time-coding']
  },
  {
    number: '02',
    title: 'Look & Pre-viz',
    description: 'Before motion begins, we define the exact aesthetic. We test dozens of AI models to lock in the lighting, camera angles, and character consistency.',
    icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />,
    accentColor: 'from-violet-400 to-purple-600',
    details: ['Engine Selection', 'Lighting & Composition', 'Character Consistency']
  },
  {
    number: '03',
    title: 'AI Production',
    description: 'The core generation phase. We use massive compute power to run motion tests, multi-variant rendering, and iterative loop engineering until the physics feel perfect.',
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
    accentColor: 'from-cyan-400 to-blue-600',
    details: ['Iterative Prompting', 'Motion Dynamics', 'Multi-Variant Renders']
  },
  {
    number: '04',
    title: 'Post-production',
    description: 'Raw generations are just the beginning. We stitch, grade, upscale, and master the audio, turning AI fragments into a seamless, theater-ready film.',
    icon: <Film className="w-8 h-8 md:w-10 md:h-10" />,
    accentColor: 'from-rose-400 to-red-600',
    details: ['VFX Compositing', 'Cinematic Grading', 'Sound Mixing & Upscaling']
  },
];

const AUTOPLAY_INTERVAL = 5000;

const BehindTheScenesSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView || isPaused) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  return (
    <section
      id="behind-the-scenes"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 relative bg-background overflow-clip"
    >
      {/* ── Background Effects ── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Left Column: Sticky Timeline Navigation ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
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
                We've engineered a four-act process that turns raw artificial intelligence into masterpiece-level cinema.
              </p>
            </motion.div>

            {/* Interactive Steps List */}
            <div className="mt-12 sm:mt-16 space-y-2">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={step.number}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPaused(true); // Pause autoplay if user clicks
                    }}
                    className={`w-full text-left group flex items-start gap-5 p-4 sm:p-5 rounded-2xl transition-all duration-500 ${isActive ? 'bg-foreground/5' : 'hover:bg-foreground/[0.02]'
                      }`}
                  >
                    {/* Progress Indicator */}
                    <div className="relative pt-1 flex flex-col items-center gap-2">
                      <span className={`font-mono text-sm transition-colors duration-500 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground/70'
                        }`}>
                        {step.number}
                      </span>
                      {/* Vertical line indicator */}
                      <div className="w-[2px] h-12 bg-border overflow-hidden rounded-full">
                        {isActive && (
                          <motion.div
                            className="w-full bg-accent"
                            initial={{ height: '0%' }}
                            animate={{ height: '100%' }}
                            transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Step Title */}
                    <div className="flex-1 pt-0.5">
                      <h3 className={`font-heading text-xl sm:text-2xl transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/80'
                        }`}>
                        {step.title}
                      </h3>
                      {/* Sub-description fades in when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="text-sm text-foreground/60 leading-relaxed pr-4"
                          >
                            Step {step.number} of our proprietary workflow.
                            Click the right panel to explore details.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Dynamic Stage Area ── */}
          <div
            className="lg:col-span-7 relative lg:min-h-[700px] flex items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative rounded-3xl overflow-hidden border border-border/40 bg-background/40 backdrop-blur-xl shadow-2xl group"
              >
                {/* Visual Background Details (Tech aesthetics) */}
                <div className="absolute inset-0 bg-[#0a0a0a]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Giant Faded Number Overlay */}
                <div className="absolute -right-10 -top-10 font-heading text-[18rem] md:text-[22rem] leading-none text-foreground/[0.03] select-none pointer-events-none">
                  {steps[activeStep].number}
                </div>

                <div className="relative z-10 p-8 sm:p-12 md:p-14">
                  {/* Icon with glowing gradient background */}
                  <div className="mb-10 inline-flex relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${steps[activeStep].accentColor} blur-2xl opacity-30`} />
                    <div className={`relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${steps[activeStep].accentColor} text-white shadow-xl`}>
                      {steps[activeStep].icon}
                    </div>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                    {steps[activeStep].title}
                  </h3>

                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    {steps[activeStep].description}
                  </p>

                  {/* Bullet points mapping out the step details */}
                  <div className="mt-12 space-y-4">
                    <h4 className="font-mono text-xs tracking-widest text-accent uppercase mb-6">Stage Manifest</h4>
                    {steps[activeStep].details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center gap-4 border-t border-border/50 pt-4"
                      >
                        <ArrowRight className="w-4 h-4 text-accent/60" />
                        <span className="text-foreground/80 font-mono text-sm tracking-wide">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative glowing bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 hidden sm:block">
                    <div className={`h-full w-full bg-gradient-to-r ${steps[activeStep].accentColor} opacity-50`} />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BehindTheScenesSection;
