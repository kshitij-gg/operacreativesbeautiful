import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Scroll progress bar — mix-blend-mode: difference so it auto-inverts */}
      <div
        id="scroll-progress-wrap"
        className="fixed top-0 left-0 w-full z-[100] overflow-hidden"
        style={{ height: 2 }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: 'rgba(255,255,255,0.9)',
            mixBlendMode: 'difference',
          }}
        />
      </div>
    </>
  );
};

export default ScrollProgress;
