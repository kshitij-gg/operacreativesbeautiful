import { ArrowUp, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

const BRAND_TEXT = 'OPERA CREATIVES';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background py-16 sm:py-20 overflow-hidden border-t border-border/10">
      {/* F1: Massive outlined brand name with sweep-fill animation */}
      <p
        className="text-center font-heading uppercase leading-[0.85] tracking-tight select-none text-[11vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] pointer-events-none"
        aria-hidden="true"
      >
        {BRAND_TEXT.split('').map((char, i) => (
          <span
            key={i}
            className="footer-letter-sweep"
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </p>

      {/* F2: Info strip with copyright and social icons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mt-10">
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono tracking-wide">
          <span>© {new Date().getFullYear()} Opera Creatives. All rights reserved.</span>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <MagneticButton strength={25}>
              <a href="#" className="p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </MagneticButton>
            <MagneticButton strength={25}>
              <a href="#" className="p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </MagneticButton>
            <MagneticButton strength={25}>
              <a href="#" className="p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="X (Twitter)">
                <Twitter size={18} />
              </a>
            </MagneticButton>
            <MagneticButton strength={25}>
              <a href="#" className="p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* F3: Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-foreground/10 hover:bg-accent/20 border border-foreground/10 hover:border-accent/30 flex items-center justify-center text-foreground/60 hover:text-accent transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        aria-label="Back to top"
        data-cursor-hover
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
