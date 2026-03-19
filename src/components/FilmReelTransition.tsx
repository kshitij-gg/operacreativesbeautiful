import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * FilmReelTransition — cinematic film-strip page transition overlay.
 * When routes change, the screen slides up like a film frame being
 * pulled through a projector, with sprocket holes on the sides
 * and a brief light flicker effect.
 */
const FilmReelTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevPath(location.pathname);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Film frame overlay */}
          <motion.div
            className="fixed inset-0 z-[9990] pointer-events-none"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Black film frame */}
            <div className="absolute inset-0 bg-black" />

            {/* Left sprocket holes */}
            <div className="absolute left-2 top-0 bottom-0 w-6 flex flex-col items-center justify-center gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`l-${i}`}
                  className="w-4 h-6 rounded-sm border border-white/20 bg-white/5"
                />
              ))}
            </div>

            {/* Right sprocket holes */}
            <div className="absolute right-2 top-0 bottom-0 w-6 flex flex-col items-center justify-center gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`r-${i}`}
                  className="w-4 h-6 rounded-sm border border-white/20 bg-white/5"
                />
              ))}
            </div>

            {/* Center frame lines */}
            <div className="absolute top-0 left-12 right-12 h-[2px] bg-white/10" />
            <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-white/10" />

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-mono text-xs tracking-[0.5em] text-white/30 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                ★ Opera Creatives ★
              </motion.span>
            </div>
          </motion.div>

          {/* Light flicker overlay */}
          <motion.div
            className="fixed inset-0 z-[9991] bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default FilmReelTransition;
