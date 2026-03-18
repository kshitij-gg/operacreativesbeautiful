import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useSpring } from 'framer-motion';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const AnimatedStat = ({ value, suffix, label, delay }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2000
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      className="relative"
    >
      {/* A1: Giant outlined number behind */}
      <div className="text-[5rem] sm:text-[7rem] md:text-[8rem] font-heading leading-none text-outline opacity-[0.07] select-none pointer-events-none absolute -top-4 -left-2">
        {value > 0 ? displayValue : '∞'}
      </div>

      {/* Foreground value */}
      <div className="relative z-10">
        <div className="text-4xl sm:text-5xl md:text-6xl font-heading text-accent flex items-end">
          {value > 0 ? displayValue : '∞'}
          <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
        </div>
        <div className="mt-1 sm:mt-2 text-muted-foreground font-mono text-xs sm:text-sm tracking-wider uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  // A2: Split description into lines for staggered reveal
  const descLines = [
    "Opera Creatives is an AI-first creative agency building next-generation",
    "visual content for brands, startups, and enterprises. From concept to",
    "final cut, every frame, pixel, and sound is generated using the most",
    "advanced AI tools on the planet.",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column - 60% */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.span
              variants={itemVariants}
              className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase"
            >
              WHO WE ARE
            </motion.span>

            {/* Updated copy */}
            <motion.h2
              variants={itemVariants}
              className="mt-4 sm:mt-6 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
            >
              The future of film is AI. We're already there.
            </motion.h2>

            {/* A2: Staggered line-by-line text reveal */}
            <div className="mt-5 sm:mt-8">
              {descLines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* A3: Pull quote highlight */}
            <motion.blockquote
              variants={itemVariants}
              className="mt-8 sm:mt-10 pl-5 border-l-2 border-accent"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-foreground italic font-heading leading-snug">
                "We don't just use AI — we think in AI."
              </p>
            </motion.blockquote>

            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Whether it's a cinematic ad campaign, a scroll-stopping social visual, or a
              full-length AI film — we produce content that looks like it came from a
              world-class studio, at the speed only AI can deliver.
            </motion.p>
          </motion.div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-center gap-6 sm:gap-8 lg:space-y-16 mt-2 lg:mt-0">
            <AnimatedStat value={50} suffix="+" label="Projects Delivered" delay={200} />
            <AnimatedStat value={15} suffix="+" label="AI Tools Mastered" delay={400} />
            <AnimatedStat value={0} suffix="∞" label="Creative Possibilities" delay={600} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
