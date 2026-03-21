import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/MagneticButton';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsPastHero(currentScrollY > window.innerHeight - 80);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart navigation: if on home page, scroll. Otherwise, navigate home then scroll.
  const goToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  // Go home (logo click)
  const goHome = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const isDifferenceMode = isPastHero && !isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isMobileMenuOpen ? 'bg-background/95 backdrop-blur-md text-foreground' : isDifferenceMode ? 'bg-transparent mix-blend-difference text-white' : 'bg-transparent text-foreground'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-24">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); goHome(); }}
            className="group relative text-lg sm:text-[40px] tracking-wide uppercase leading-none cursor-pointer"
            style={{
              fontFamily: "'Anton', sans-serif",
            }}
          >
            OPERA CREATIVES
          </a>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-14">
            <MagneticButton strength={15}>
              <button
                onClick={() => goToSection('about')}
                className="text-[15px] font-medium opacity-80 hover:opacity-100 transition-opacity uppercase tracking-[0.18em] py-2"
              >
                About
              </button>
            </MagneticButton>
            <MagneticButton strength={15}>
              <button
                onClick={() => goToSection('portfolio')}
                className="text-[15px] font-medium opacity-80 hover:opacity-100 transition-opacity uppercase tracking-[0.18em] py-2"
              >
                Work
              </button>
            </MagneticButton>
          </div>

          {/* Right side - CTA */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton>
              <Button
                onClick={() => goToSection('contact')}
                className={`${isDifferenceMode ? '!bg-white hover:!bg-white/90 !text-black' : 'bg-foreground hover:bg-foreground/90 text-background'} rounded-full px-8 py-5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105`}
              >
                Contact Us
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 pb-6 animate-fade-up border-t border-border/20">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => goToSection('about')}
                className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-[0.12em] py-1"
              >
                About
              </button>
              <button
                onClick={() => goToSection('portfolio')}
                className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-[0.12em] py-1"
              >
                Work
              </button>
              <Button
                onClick={() => goToSection('contact')}
                className="mt-2 bg-foreground hover:bg-foreground/90 text-background w-full py-5 text-sm font-semibold rounded-full"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
