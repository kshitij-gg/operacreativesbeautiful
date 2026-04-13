import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

// Musical note icon — for ABOUT link
const NoteIcon = () => (
  <svg className="nav-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <ellipse cx="4" cy="11" rx="2.5" ry="1.8" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="6.5" y1="11" x2="6.5" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M6.5 3L12 4.5L12 7.5L6.5 6Z" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

// Film strip icon — for WORK link
const FilmIcon = () => (
  <svg className="nav-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1" y="3" width="2.5" height="2.5" rx="0.4" fill="currentColor"/>
    <rect x="1" y="7.5" width="2.5" height="2.5" rx="0.4" fill="currentColor"/>
    <rect x="10.5" y="3" width="2.5" height="2.5" rx="0.4" fill="currentColor"/>
    <rect x="10.5" y="7.5" width="2.5" height="2.5" rx="0.4" fill="currentColor"/>
    <rect x="5" y="4.5" width="4" height="5" rx="0.8" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

// Violin bow — for CONTACT button
const BowIcon = ({ strumming }: { strumming: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 20 20" fill="none"
    style={strumming ? { animation: 'bowStrum 0.5s ease' } : {}}
  >
    <path d="M3 16C7 13 13 9 17 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M3 17.5C7 14.5 13 10.5 17 5.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45"/>
    <rect x="1" y="14" width="4" height="4" rx="1" fill="currentColor" opacity="0.75"/>
    <line x1="5" y1="14" x2="5" y2="18" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

const LIGHT_SECTIONS = new Set([3, 4, 5, 6]);

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]   = useState(false);
  const [isDark, setIsDark]       = useState(false);
  const [strumming, setStrumming] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.section ?? 0);
            setIsDark(LIGHT_SECTIONS.has(idx));
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const textColor = isDark ? 'rgba(17,17,17,0.85)' : 'rgba(255,255,255,0.85)';
  const hoverColor = isDark ? '#111' : '#fff';
  const borderColor = isDark ? 'rgba(17,17,17,0.3)' : 'rgba(255,255,255,0.4)';

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 h-20"
      style={{
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        backgroundColor: scrolled ? (isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.55)') : 'transparent',
        borderBottom: scrolled ? `1px solid ${borderColor}` : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Wordmark Button — scrolls to top, never reloads (avoids re-triggering intro) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="btn-3d inline-flex items-center justify-center font-heading text-[26px] sm:text-[28px] tracking-[0.08em] leading-none rounded px-6 py-2"
        style={{ color: '#fff', backgroundColor: '#4A0E17', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
        aria-label="Back to top"
      >
        OPERA CREATIVES
      </button>

      {/* Nav links with 3D Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <a href="#about"
           className="btn-3d btn-3d-pearl inline-flex items-center justify-center font-mono text-[13px] tracking-[0.1em] font-bold uppercase rounded px-5 py-2.5"
           style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
          ABOUT
        </a>
        <a href="#portfolio"
           className="btn-3d btn-3d-black inline-flex items-center justify-center font-mono text-[13px] tracking-[0.1em] font-bold uppercase rounded px-5 py-2.5"
           style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
          WORK
        </a>

        {/* CONTACT button */}
        <a
          href="#collaborate"
          className="btn-3d btn-3d-red inline-flex items-center gap-2 rounded px-6 py-2.5 ml-2 font-mono text-[13px] tracking-[0.1em] font-bold uppercase cursor-pointer"
          style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          CONTACT US
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
