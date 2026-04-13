import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Folder, Briefcase } from 'lucide-react';

/* ─── Animated SVG: The Creator Workstation ─── */
const CreatorStationSVG = ({ isAnimating }: { isAnimating: boolean }) => {
  const animState = isAnimating ? 'running' : 'paused';

  // Over a hot pink background, using stark contrast:
  // Black, White, Yellow (#FFE066), and Cyan glow (#00E5FF)

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] flex items-end justify-center overflow-hidden">
      <style>{`
        @keyframes headBob {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(3deg) translateY(-4px); }
        }
        @keyframes typingLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-2deg); }
          75% { transform: translateY(2px) rotate(1deg); }
        }
        @keyframes typingRight {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(3px) rotate(2deg); }
          60% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes screenFlicker {
          0%, 100% { opacity: 0.85; }
          40% { opacity: 1; }
          80% { opacity: 0.9; }
        }
        @keyframes dataFlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
      `}</style>
      
      <svg viewBox="0 0 1000 600" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
        
        {/* BACKGROUND GLOW / TECH ELEMENTS */}
        <g opacity="0.3">
           {/* Abstract massive glowing circle */}
           <circle cx="500" cy="300" r="250" fill="url(#bgGlow)" />
           {/* Floating code/render boxes */}
           <rect x="200" y="150" width="100" height="80" rx="4" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5 5" />
           <rect x="750" y="250" width="120" height="150" rx="4" fill="none" stroke="#FFE066" strokeWidth="2" />
        </g>

        {/* DEFINITIONS for gradients */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        {/* DESK MASSIVE SLAB */}
        <path d="M 50 540 L 950 540 L 1000 600 L 0 600 Z" fill="#111" stroke="#000" strokeWidth="6" />
        {/* Desk edge highlight */}
        <path d="M 50 540 L 950 540" stroke="#FFE066" strokeWidth="3" />

        {/* CHAIR (Backrest) */}
        <path d="M 450 470 L 440 250 Q 500 230 560 250 L 550 470 Z" fill="#1a1a1a" stroke="#000" strokeWidth="5" />
        {/* Chair Headrest */}
        <rect x="470" y="200" width="60" height="30" rx="8" fill="#111" stroke="#000" strokeWidth="4" />

        {/* CHARCTER BODY */}
        {/* Torso */}
        <path d="M 460 470 L 470 320 C 470 290 530 290 530 320 L 540 470 Z" fill="#F8F4EC" stroke="#000" strokeWidth="5" />
        {/* Neck */}
        <rect x="490" y="295" width="20" height="30" fill="#FFE066" stroke="#000" strokeWidth="4" />

        {/* HEAD GROUP (Animated Bob to music) */}
        <g style={{ animation: 'headBob 4s ease-in-out infinite', animationPlayState: animState, transformOrigin: '500px 300px' }}>
          {/* Head base */}
          <rect x="470" y="240" width="60" height="65" rx="16" fill="#F8F4EC" stroke="#000" strokeWidth="5" />
          {/* Cool futuristic shading / visor */}
          <rect x="465" y="255" width="70" height="30" rx="8" fill="#111" />
          {/* Glowing Eyes/Display on visor */}
          <g style={{ animation: 'screenFlicker 3s infinite', animationPlayState: animState }}>
            <circle cx="490" cy="270" r="5" fill="#00E5FF" />
            <circle cx="515" cy="270" r="5" fill="#00E5FF" />
            <rect x="485" y="268" width="35" height="4" fill="#00E5FF" opacity="0.4" />
          </g>
          {/* Headphones */}
          <path d="M 460 270 C 460 220 540 220 540 270" fill="none" stroke="#FFE066" strokeWidth="8" strokeLinecap="round" />
          <rect x="450" y="260" width="16" height="40" rx="6" fill="#111" stroke="#000" strokeWidth="3" />
          <rect x="534" y="260" width="16" height="40" rx="6" fill="#111" stroke="#000" strokeWidth="3" />
        </g>

        {/* LEFT ARM (Animated Typing) */}
        <g style={{ animation: 'typingLeft 0.6s linear infinite', animationPlayState: animState, transformOrigin: '470px 350px' }}>
          <path d="M 475 330 Q 410 400 410 480 L 440 528" fill="none" stroke="#F8F4EC" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 475 330 Q 410 400 410 480 L 440 528" fill="none" stroke="#000" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" style={{ mixBlendMode: 'destination-over' }} />
          {/* Hand */}
          <circle cx="442" cy="530" r="14" fill="#FFE066" stroke="#000" strokeWidth="4" />
        </g>

        {/* RIGHT ARM (Animated Typing) */}
        <g style={{ animation: 'typingRight 0.8s linear infinite', animationPlayState: animState, transformOrigin: '530px 350px' }}>
          <path d="M 525 330 Q 590 400 590 480 L 550 525" fill="none" stroke="#F8F4EC" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 525 330 Q 590 400 590 480 L 550 525" fill="none" stroke="#000" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" style={{ mixBlendMode: 'destination-over' }} />
          {/* Hand */}
          <circle cx="548" cy="527" r="14" fill="#FFE066" stroke="#000" strokeWidth="4" />
        </g>

        {/* WORKSTATION / MONITORS (Foreground) */}
        {/* Keyboard */}
        <rect x="420" y="520" width="140" height="25" rx="4" fill="#222" stroke="#000" strokeWidth="4" transform="skewX(-15)" />
        <rect x="430" y="525" width="110" height="15" rx="2" fill="#111" transform="skewX(-15)" />
        
        {/* Cyan Glow reflecting off the desk from screens */}
        <ellipse cx="485" cy="530" rx="80" ry="15" fill="#00E5FF" opacity="0.25" filter="blur(15px)" style={{ animation: 'screenFlicker 2s infinite', animationPlayState: animState }} />

        {/* CENTER MASSIVE DISPLAY */}
        <g>
          {/* Stand */}
          <rect x="360" y="480" width="20" height="60" fill="#333" stroke="#000" strokeWidth="4" />
          <rect x="290" y="210" width="120" height="280" fill="url(#screenGradient)" stroke="#000" strokeWidth="6" rx="8" />
          {/* Screen Content - Editor/Timeline */}
          <g style={{ animation: 'screenFlicker 4s infinite', animationPlayState: animState }}>
            <rect x="300" y="220" width="100" height="150" fill="#111" />
            <rect x="300" y="380" width="100" height="100" fill="#111" />
            {/* Fake UI */}
            <rect x="310" y="230" width="40" height="8" fill="#FF4B6E" />
            <rect x="310" y="250" width="80" height="4" fill="#FFF" opacity="0.5" />
            <rect x="310" y="265" width="60" height="4" fill="#FFF" opacity="0.5" />
            {/* AI Node circle */}
            <circle cx="350" cy="310" r="30" fill="none" stroke="#00E5FF" strokeWidth="4" strokeDasharray="15 8" />
            {/* Audio Waveforms */}
            <path d="M 310 410 L 315 400 L 320 420 L 325 395 L 330 415 L 335 405 L 340 410" stroke="#FFE066" strokeWidth="2" fill="none" />
          </g>
        </g>

        {/* RIGHT DISPLAY (Angled) */}
        <g transform="translate(600, 230) rotate(10) scale(0.9)">
          <rect x="-10" y="260" width="20" height="60" fill="#333" stroke="#000" strokeWidth="4" />
          <rect x="-40" y="0" width="120" height="260" fill="url(#screenGradient)" stroke="#000" strokeWidth="6" rx="8" />
          {/* Terminal / Code Lines */}
          <g style={{ animation: 'screenFlicker 2.5s infinite', animationPlayState: animState }}>
             <rect x="-30" y="10" width="100" height="240" fill="#050505" />
             {/* Scrolling Code simulation */}
             <g style={{ animation: 'dataFlow 5s linear infinite', animationPlayState: animState }}>
               <rect x="-20" y="30" width="80" height="4" fill="#00E5FF" />
               <rect x="-20" y="45" width="50" height="4" fill="#FFF" opacity="0.5" />
               <rect x="-20" y="60" width="60" height="4" fill="#FFF" opacity="0.8" />
               <rect x="-20" y="75" width="40" height="4" fill="#FFE066" />
               
               <rect x="-20" y="120" width="70" height="4" fill="#00E5FF" />
               <rect x="-20" y="135" width="60" height="4" fill="#FFF" opacity="0.5" />
               <rect x="-20" y="150" width="45" height="4" fill="#FFF" opacity="0.8" />
               <rect x="-20" y="165" width="65" height="4" fill="#FFE066" />
             </g>
          </g>
        </g>

        {/* COFFEE MUG (Because, agency life) */}
        <g transform="translate(730, 490)">
          <path d="M 0 0 L 5 35 L 25 35 L 30 0 Z" fill="#F8F4EC" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 30 10 C 40 10 40 25 28 25" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          {/* Steam */}
          <path d="M 10 -10 Q 5 -20 15 -30" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.8" style={{ animation: 'dataFlow 3s infinite', animationPlayState: animState }} />
          <path d="M 20 -5 Q 25 -15 15 -25" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.8" style={{ animation: 'dataFlow 3.5s infinite', animationPlayState: animState, animationDelay: '1s' }} />
        </g>

      </svg>
    </div>
  );
};

/* ─── ABOUT SECTION (Bespoke Typography + Oversized SVG) ─── */
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: false, margin: '-5%' });

  return (
    <section
      id="about"
      data-section="1"
      data-bg="#FF4B6E"
      ref={sectionRef}
      className="py-20 sm:py-28 relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#FF4B6E', color: '#111111' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT CONTENT LAYER (Left side, new unique typography, no buttons) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            {/* Technical Subheading */}
            <h4 
              className="font-mono uppercase tracking-[0.3em] font-bold mb-6" 
              style={{ fontSize: '13px', color: '#111111' }}
            >
              The Next Evolution
            </h4>

            {/* Unique Headline Combination */}
            <h2 className="font-heading" style={{ fontSize: 'clamp(54px, 7.5vw, 110px)', lineHeight: 0.85, color: '#FFFFFF', textTransform: 'uppercase' }}>
              WE DON'T JUST<br />
              <span style={{ color: '#111111' }}>SHOOT FILM.</span><br />
              WE SYNTHESIZE<br />
              REALITY.
            </h2>

            {/* Elegant Serif Body Copy */}
            <div className="mt-8 ml-2 pl-6" style={{ borderLeft: '2px solid #111111' }}>
              <p 
                className="text-white/95 max-w-md" 
                style={{ fontFamily: "'Georgia', 'Playfair Display', serif", fontSize: 'clamp(18px, 2vw, 22px)', fontStyle: 'italic', lineHeight: 1.6 }}
              >
                Our neural-driven workflows replace traditional sets with absolute creative freedom. Every frame is calculated. Every pixel is intentional.
              </p>
            </div>
          </motion.div>

          {/* SVG ANIMATION LAYER (Right side, scaled up significantly) */}
          <motion.div
            className="w-full relative z-0 flex justify-center lg:justify-end mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.2 }}
          >
             {/* Massive container scaling up the SVG visually — breaks slightly out of bounds on desktop for forced scale */}
             <div className="w-[115%] sm:w-[125%] lg:w-[140%] xl:w-[150%] max-w-[1200px] -mr-[10%] lg:-mr-[25%] pointer-events-none">
               <CreatorStationSVG isAnimating={isInView} />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
