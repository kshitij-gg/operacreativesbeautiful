import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/MagneticButton';
import { motion, useInView } from 'framer-motion';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background with grain */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 grain-overlay opacity-40" />
      </div>

      {/* C1: Giant faded watermark behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[20vw] md:text-[25vw] text-foreground/[0.03] uppercase leading-none whitespace-nowrap">
          CREATE
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* C1: Massive typography */}
        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground max-w-5xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's Make Something Unforgettable.
        </motion.h2>

        <motion.p
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Your vision + our AI craft — let's bring it to life.
        </motion.p>

        {/* C2: Button with spring scale entrance */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <MagneticButton>
            <Button
              onClick={scrollToContact}
              className="group bg-accent hover:bg-accent/90 text-white rounded-full px-10 sm:px-14 py-6 sm:py-8 text-base sm:text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_50px_hsl(var(--accent)/0.5)]"
            >
              Start a Project
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
