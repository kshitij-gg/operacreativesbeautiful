import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * XRayText — Massive typography where the mouse acts as an X-Ray flashlight,
 * revealing a playing video exclusively inside the letters within a 250px radius.
 * Uses mix-blend-mode for the text clipping and radial-gradient mask for the spotlight.
 */

interface XRayTextProps {
  text: string;
  videoSrc: string;
  className?: string;
}

const XRayText = ({ text, videoSrc, className = '' }: XRayTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring physics for smooth spotlight tracking
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Motion template for the CSS mask
  const maskImage = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, black 20%, transparent 80%)`;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-crosshair flex items-center justify-center ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Base Solid Text (visible when not x-rayed) */}
      <div className="font-heading text-[12vw] sm:text-[15vw] leading-none text-white/5 whitespace-nowrap text-center">
        {text}
      </div>

      {/* X-Ray Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: isHovered ? 1 : 0,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          
          {/* The Video playing in the background */}
          <video 
            src={videoSrc} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          {/* 
            The mask layer: Black background with White text.
            mix-blend-multiply means White (1) * Video = Video, Black (0) * Video = Black.
            So the video only shows INSIDE the white text!
          */}
          <div className="absolute inset-0 bg-black flex items-center justify-center mix-blend-multiply">
            <h1 className="font-heading text-[12vw] sm:text-[15vw] leading-none text-white whitespace-nowrap text-center">
              {text}
            </h1>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default XRayText;
