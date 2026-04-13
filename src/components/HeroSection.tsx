import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { IntroContext } from '../contexts/IntroContext';

// New Vimeo video: Nerolac Concept Ad
const VIMEO_VIDEO_ID = '1153960232';

// Showreel URL — strips all Vimeo UI, keeps native fullscreen
const vimeoEmbedUrl =
  `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?` +
  `autoplay=1&loop=0&title=0&byline=0&portrait=0&badge=0` +
  `&controls=1&sidedock=0&share=0&watchlater=0&like=0` +
  `&collections=0&speed=0&autopause=0&pip=0&transparent=1`;

// Background mode URL — api=1 enables postMessage pause/play control
const vimeoBgUrl =
  `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}` +
  `?background=1&autoplay=1&loop=1&muted=1&transparent=0&autopause=0&api=1`;

// ── PostMessage helpers ─────────────────────────────────────────────────────
function vimeoCmd(iframe: HTMLIFrameElement | null, method: 'pause' | 'play') {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ method }),
    'https://player.vimeo.com'
  );
}

// ── Showreel Lightbox ──────────────────────────────────────────────
const ShowreelLightbox = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" style={{ backdropFilter: 'blur(14px)' }} />

      {/* Video container */}
      <div className="relative z-10 w-[95vw] max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-[11px] tracking-[0.15em] text-white/60 hover:text-white transition-colors uppercase flex items-center gap-2"
        >
          <span style={{ fontSize: 16 }}>✕</span> CLOSE
        </button>

        {/* Vimeo iframe — UI stripped, fullscreen allowed */}
        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl" style={{ background: '#000' }}>
          <iframe
            src={vimeoEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
};

// ── Hero Section ───────────────────────────────────────────────────
const HeroSection = () => {
  const introDone = useContext(IntroContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const bgRef      = useRef<HTMLIFrameElement>(null);   // background iframe
  const sectionRef = useRef<HTMLElement>(null);         // hero section element

  // ── Pause / resume helpers exposed via callbacks ──────────────────
  const pauseBg  = useCallback(() => vimeoCmd(bgRef.current, 'pause'), []);
  const resumeBg = useCallback(() => vimeoCmd(bgRef.current, 'play'),  []);

  // ── Lightbox: pause bg on open, resume on close ──────────────────
  const openLightbox = useCallback(() => {
    pauseBg();
    setLightboxOpen(true);
  }, [pauseBg]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    // Small delay so the lightbox iframe is gone before we resume bg
    setTimeout(resumeBg, 100);
  }, [resumeBg]);

  // ── IntersectionObserver: pause when hero scrolls out of view ────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Hero visible → resume (only if lightbox is NOT open)
          if (!lightboxOpen) resumeBg();
        } else {
          // Hero scrolled away → pause
          pauseBg();
        }
      },
      { threshold: 0.1 }   // pause when <10% of hero is in view
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [pauseBg, resumeBg, lightboxOpen]);

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="hero"
        data-section="0"
        data-bg="#000000"
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* ── BACKGROUND VIDEO — full-bleed Vimeo, high brightness ── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            ref={bgRef}
            src={vimeoBgUrl}
            /* Scale up and center so letterbox bars are never visible */
            className="absolute pointer-events-none"
            style={{
              width: '177.78vh',
              minWidth: '100%',
              height: '56.25vw',
              minHeight: '100%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 1,
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
          />
          {/* Very light bottom vignette so text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.35) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          {/* Headline */}
          <motion.h1
            className="font-heading text-white leading-[0.9]"
            style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
            initial="hidden" animate={introDone ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } }
            }}
          >
            <motion.span
              className="block italic font-serif"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)', color: 'rgba(255,255,255,0.85)', transform: 'translateY(10px)' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              We're
            </motion.span>
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              OPERA
            </motion.span>
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              CREATIVES
            </motion.span>
          </motion.h1>

          {/* WATCH SHOWREEL — fully transparent, border + text only */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: introDone ? 1 : 0 }} transition={{ delay: 0.5 }}>
            <button
              onClick={openLightbox}
              className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] font-bold uppercase cursor-pointer text-white transition-all duration-300 hover:scale-105"
              style={{
                padding: '12px 28px',
                border: '1.5px solid rgba(255,255,255,0.75)',
                borderRadius: '100px',
                background: 'transparent',
                backdropFilter: 'none',
                boxShadow: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="6.5,5 11.5,8 6.5,11" fill="currentColor" />
              </svg>
              WATCH SHOWREEL
            </button>
          </motion.div>
        </div>

        {/* Bottom-left label */}
        <div className="absolute bottom-10 left-10 z-10 hidden sm:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introDone ? 1 : 0 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-[12px] tracking-[0.15em] text-white/60 uppercase"
          >
            AI CREATIVES
          </motion.div>
        </div>

        {/* Bottom-right scroll button */}
        <div className="absolute bottom-10 right-10 z-10 hidden sm:flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 10 }} transition={{ delay: 1.0 }}>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-[64px] h-[64px] rounded-2xl flex items-center justify-center cursor-pointer btn-3d btn-3d-pearl"
              aria-label="Scroll down"
            >
              <svg width="20" height="24" viewBox="0 0 16 20" fill="none"
                style={{ animation: 'noteBob 1.8s ease-in-out infinite' }}>
                <line x1="8" y1="2" x2="8" y2="18" stroke="currentColor" strokeWidth="2.5" />
                <polyline points="3,13 8,18 13,13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Showreel Lightbox */}
      {lightboxOpen && <ShowreelLightbox onClose={closeLightbox} />}
    </>
  );
};

export default HeroSection;
