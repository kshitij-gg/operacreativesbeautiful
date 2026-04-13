import { useRef } from 'react';
import { Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { useInView } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView  = useInView(footerRef, { once: false, margin: "0px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      data-section="6"
      data-bg="#FFF4CC" /* Deep Yellowish Cream */
      className="relative overflow-hidden pt-24 pb-8 flex flex-col justify-end"
      style={{ backgroundColor: '#FFF4CC', color: '#111111', minHeight: '50vh' }}
    >
      <style>
        {`
          @keyframes sweepContinuous {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
        `}
      </style>
      {/* ── Giant Outline Text with Flawless Sweep ── */}
      <div
        className="w-full h-[300px] flex-1 flex justify-center items-center flex-col px-4 mb-8 overflow-hidden"
        aria-hidden
      >
        {/* Base Transparent Outline Text with Sweeping Glassy Gradient */}
        <div
          className="inline-block relative w-[200vw] sm:w-[150vw] md:w-full text-center"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(60px, 16vw, 300px)',
            WebkitTextStroke: '2px rgba(17,17,17,0.85)', /* Dark crisp stroke */
            color: 'transparent',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
            userSelect: 'none',
            lineHeight: 1.1,
            zIndex: 1,
            // Glassy maroon sweep: transparent sides, sharp thick red center
            backgroundImage: 'linear-gradient(100deg, transparent 0%, transparent 35%, rgba(139,0,0,0.9) 48%, rgba(139,0,0,0.9) 52%, transparent 65%, transparent 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // Linear, infinite, 8 seconds for a steady, hypnotic pass across the massive text without stopping
            animation: 'sweepContinuous 8s linear infinite',
            animationPlayState: isInView ? 'running' : 'paused',
            willChange: 'background-position',
          }}
        >
          OPERA CREATIVES
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 w-full mt-auto">
        {/* Thin top border line */}
        <div className="w-full h-px bg-[#000000] opacity-20 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-[11px] tracking-[0.1em] text-[#333] uppercase font-bold">
            &copy; 2026 Opera Creatives. All rights reserved.
          </div>

          <div className="flex items-center gap-12">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {[
                { Icon: Instagram, href: 'https://instagram.com/operacreatives_',          label: 'Instagram' },
                { Icon: Linkedin,  href: 'https://linkedin.com/company/operacreatives',    label: 'LinkedIn'  },
                { Icon: Twitter,   href: 'https://x.com/operacreatives_',                 label: 'X / Twitter' },
                { Icon: Youtube,   href: 'https://youtube.com/@operacreatives',            label: 'YouTube'   },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={label}
                   className="text-[#333] hover:text-[#8B0000] transition-colors">
                  <Icon strokeWidth={2} size={18} />
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[#111] hover:text-white hover:bg-[#8B0000] transition-colors shadow-sm cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
