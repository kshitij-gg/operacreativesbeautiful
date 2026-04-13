import { motion } from 'framer-motion';

interface MarqueeBannerProps {
  text?: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
  variant?: 'hero' | 'section' | 'stats';
}

const MarqueeBanner = ({
  text = "AI PRODUCTION ★ VISUAL CAMPAIGNS ★ BRAND FILMS ★ AI COMMERCIALS ★ DTC ADS ★ SOCIAL CONTENT ★ ",
  speed = 30,
  className = "",
  reverse = false,
  variant = 'section',
}: MarqueeBannerProps) => {
  const repeatedText = text.repeat(8);

  const variantStyles = {
    hero: 'font-heading text-[13px] tracking-[0.15em] opacity-30',
    section: 'font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl opacity-10 tracking-wider',
    stats: 'font-mono text-xs sm:text-sm tracking-[0.2em] opacity-50',
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 relative ${className}`}>
      <motion.div className="inline-block">
        <motion.span
          className={`inline-block uppercase select-none ${variantStyles[variant]}`}
          animate={{
            x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {repeatedText}{repeatedText}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
