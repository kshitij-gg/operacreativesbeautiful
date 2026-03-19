import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * LiquidDivider — animated liquid/mercury blob divider between sections.
 * Uses SVG feTurbulence + feDisplacementMap for real-time fluid morphing
 * that reacts to scroll position.
 */
const LiquidDivider = ({ color = 'accent' }: { color?: 'accent' | 'purple' | 'cyan' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Turbulence frequency shifts as you scroll past
  const turbulenceFreq = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.03, 0.01]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const colors: Record<string, { from: string; to: string; glow: string }> = {
    accent: { from: 'hsl(var(--accent))', to: 'hsl(var(--accent) / 0.3)', glow: 'hsl(var(--accent) / 0.15)' },
    purple: { from: 'rgb(139, 92, 246)', to: 'rgba(139, 92, 246, 0.3)', glow: 'rgba(139, 92, 246, 0.15)' },
    cyan: { from: 'rgb(6, 182, 212)', to: 'rgba(6, 182, 212, 0.3)', glow: 'rgba(6, 182, 212, 0.15)' },
  };
  const c = colors[color] || colors.accent;

  return (
    <div ref={ref} className="relative h-32 sm:h-40 w-full overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute w-[60%] h-full rounded-full blur-[80px] opacity-30"
        style={{ background: c.glow }}
      />

      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={`liquid-${color}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves={3}
              result="noise"
              seed={Math.floor(Math.random() * 100)}
            >
              <animate
                attributeName="baseFrequency"
                values="0.01;0.03;0.01"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={40}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* The morphing blob */}
      <motion.div
        className="relative w-[80%] max-w-3xl h-12 sm:h-16 rounded-[50%]"
        style={{
          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
          filter: `url(#liquid-${color})`,
          scale: blobScale,
          rotate: blobRotate,
        }}
      />

      {/* Thin glow line */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.from}, transparent)`,
          opacity: 0.2,
        }}
      />
    </div>
  );
};

export default LiquidDivider;
