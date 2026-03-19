import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FocusPullLayer — wraps a section and dynamically changes its CSS blur
 * based on its position in the viewport. Simulates a cinematic depth-of-field
 * focus pull as the user scrolls.
 */
interface FocusPullLayerProps {
  children: React.ReactNode;
  className?: string;
  maxBlur?: number; // px
}

const FocusPullLayer = ({ children, className = '', maxBlur = 8 }: FocusPullLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    // Track from when the top of the section hits the bottom of the viewport
    // to when the bottom of the section hits the top of the viewport
    offset: ['start end', 'end start'],
  });

  // 0.0: just entering bottom of screen -> maximum blur
  // 0.3: fully entered -> sharp
  // 0.7: starting to leave top of screen -> sharp
  // 1.0: fully exited top of screen -> maximum blur
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [maxBlur, 0, 0, maxBlur]
  );

  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  // Slight opacity dip at edges for extra depth
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.4, 1, 1, 0.4]
  );

  return (
    <motion.div
      ref={ref}
      style={{ filter, opacity, willChange: 'filter, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FocusPullLayer;
