import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsTickerSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const tools = "♩ GEMINI ♩ CHATGPT ♩ RUNWAY ♩ KLING ♩ MIDJOURNEY ♩ SORA ♩ ELEVEN LABS ♩ STABLE DIFFUSION ♩ PIKA ♩ LUMA ♩ IDEOGRAM ♩ ";

  return (
    <section
      id="stats"
      data-section="3"
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ backgroundColor: '#FF6B35', color: '#1a0800', minHeight: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Main stat headline */}
      <motion.h2
        className="font-heading text-center px-4"
        style={{ fontSize: 'clamp(2rem, 7vw, 88px)', color: '#1a0800', lineHeight: 0.95 }}
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        50+ PROJECTS. 15+ AI TOOLS. ZERO LIMITS.
      </motion.h2>

      {/* AI tool marquee */}
      <motion.div
        className="w-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-scroll 28s linear infinite' }}
        >
          <span className="font-heading text-[14px] tracking-[0.06em] shrink-0 mr-4" style={{ color: 'rgba(26,8,0,0.5)' }}>
            {tools}
          </span>
          <span className="font-heading text-[14px] tracking-[0.06em] shrink-0 mr-4" style={{ color: 'rgba(26,8,0,0.5)' }}>
            {tools}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsTickerSection;
