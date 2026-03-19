import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GenerativeBackground — Simulates an AI "Text-to-Video" generation process.
 * Displays visual static and a fast typing prompt, then resolves smoothly into the video.
 */

interface GenerativeBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
}

const GenerativeBackground = ({ videoSrc, posterSrc, className = '' }: GenerativeBackgroundProps) => {
  const [phase, setPhase] = useState<'typing' | 'resolved'>('typing');
  const [typedText, setTypedText] = useState('');
  
  const fullPrompt = '> /imagine prompt: Hyper-realistic cinematic film sequence, 8k resolution, anamorphic lens, volumetric lighting, photorealistic --v 6.0';

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const typePrompt = () => {
      if (currentIndex <= fullPrompt.length) {
        setTypedText(fullPrompt.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typePrompt, 15);
      } else {
        // Finished typing, wait 1 second to read it, then fade into the video
        timeout = setTimeout(() => setPhase('resolved'), 1000);
      }
    };

    // Start typing after 0.5 seconds of just static
    timeout = setTimeout(typePrompt, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative w-full h-full bg-black overflow-hidden ${className}`}>
      
      {/* 1. The Actual Video */}
      <motion.video
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1, filter: 'contrast(1.5) blur(4px)' }}
        animate={{ 
          opacity: phase === 'resolved' ? 1 : 0,
          scale: phase === 'resolved' ? 1 : 1.1,
          filter: phase === 'resolved' ? 'brightness(1) contrast(1) blur(0px)' : 'brightness(2) contrast(1.2) blur(4px)'
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* 2. Visual Static (Visible during typing) */}
      <AnimatePresence>
        {phase === 'typing' && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              animation: 'noise-anim 0.2s infinite steps(2)'
            }}
          />
        )}
      </AnimatePresence>

      {/* 3. The Prompt Text */}
      <AnimatePresence>
        {phase === 'typing' && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs sm:text-sm md:text-base text-accent max-w-3xl text-center leading-relaxed tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              {typedText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-2.5 h-4 bg-accent ml-1 align-middle"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes noise-anim {
          0% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};

export default GenerativeBackground;
