import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * GlitchImage — An image component that applies a heavy, blocky "data-mosh" 
 * or pixel-sort SVG filter on hover for a split second before resolving.
 */

interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const GlitchImage = ({ src, alt, className = '', style }: GlitchImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const id = `glitch-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (isHovered) {
      // Trigger glitch sequence
      controls.start({
        scale: [0, 60, -40, 0],
        transition: { duration: 0.4, times: [0, 0.2, 0.6, 1], ease: "anticipate" }
      });
    } else {
      controls.start({ scale: 0 });
    }
  }, [isHovered, controls]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={style}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Invisible SVG filter definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={id} colorInterpolationFilters="sRGB">
            {/* 
              High X frequency, low Y frequency creates horizontal pixel stretching.
              Change type to turbulence for a harsher, blockier look.
            */}
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.05 0.9" 
              numOctaves="1" 
              result="noise" 
              seed={Math.floor(Math.random() * 100)}
            />
            {/* 
              Color matrix thresholds the noise to make it sharply blocky 
              rather than smoothly cloudy.
            */}
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -50" 
              in="noise" 
              result="blockyNoise" 
            />
            <motion.feDisplacementMap 
              in="SourceGraphic" 
              in2="blockyNoise" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              // We animate the scale attribute to trigger the glitch
              animate={controls}
              style={{ scale: 0 }}
            />
          </filter>
        </defs>
      </svg>

      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover origin-center"
        style={{ filter: `url(#${id})` }}
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? [
            `url(#${id}) contrast(1.5) saturate(2)`,
            `url(#${id}) contrast(1) saturate(1)`
          ] : `url(#${id}) contrast(1) saturate(1)`
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default GlitchImage;
