import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const SHOWREEL_VIDEO = 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4';

const ShowreelSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' });
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  return (
    <section
      id="showreel"
      data-section="1"
      ref={sectionRef}
      className="relative flex items-center justify-center py-16 sm:py-24 overflow-hidden"
      style={{ backgroundColor: '#050814', color: '#ffffff', minHeight: '90vh' }}
    >
      {/* Video frame */}
      <motion.div
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            src={SHOWREEL_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Top-left label */}
          <div className="absolute top-4 left-5 sm:top-6 sm:left-7 z-10">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
              SHOWREEL 2026
            </span>
            <div className="mt-1.5 w-20 h-px bg-white/20">
              <motion.div
                className="h-full bg-white/50"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Top-right — Violin scroll sound button */}
          <button
            onClick={toggleSound}
            className="absolute top-4 right-5 sm:top-6 sm:right-7 z-10 w-[50px] h-[50px] rounded-full border border-white/40 flex flex-col items-center justify-center gap-1 hover:bg-white/15 transition-all duration-300 cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {/* Violin scroll — SVG curl */}
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="opacity-80">
              {/* Violin bow / scroll decorative element */}
              <path
                d="M4 14C4 14 2 12 2 9C2 5 5 3 9 3C13 3 16 5 16 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M16 9C16 11 14.5 13 12 14C10 14.8 8 14.5 7 13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="7" cy="13" r="1.5" fill="white" fillOpacity="0.7" />
              {/* Mute X overlay */}
              {isMuted && (
                <>
                  <line x1="13" y1="2" x2="19" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="19" y1="2" x2="13" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
            <span className="font-mono text-[7px] text-white/60 tracking-wider uppercase leading-none">
              {isMuted ? 'SOUND' : 'MUTE'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Bottom fade → red */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FF4B6E)' }}
      />
    </section>
  );
};

export default ShowreelSection;
