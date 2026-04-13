import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { 
    act: 'ACT I', 
    title: 'OVERTURE', 
    subtitle: 'Concept & Script',
    venue: 'La Scala',
    curtain: 'RISES AT DUSK',
    desc: 'Every great opera starts with a libretto. We shape the core concept, voice, and narrative arc, proving the story works before a single pixel is synthesized.'
  },
  { 
    act: 'ACT II', 
    title: 'THE STAGING', 
    subtitle: 'Look & Pre-Viz',
    venue: 'Palais Garnier',
    curtain: 'CANDLELIGHT HOUR',
    desc: 'Testing dozens of specialized neural models to lock in the exact lighting, camera angles, and character consistency for your brand\'s visual signature.'
  },
  { 
    act: 'ACT III', 
    title: 'THE PERFORMANCE', 
    subtitle: 'AI Production',
    venue: 'Teatro di Roma',
    curtain: 'FULL HOUSE',
    desc: 'The curtain rises. The full production pipeline executes, generating every frame and synthesizing every beat using the world\'s most advanced AI clusters.'
  },
  { 
    act: 'ACT IV', 
    title: 'THE FINAL BOW', 
    subtitle: 'Post-Production',
    venue: 'Royal Opera House',
    curtain: 'ENCORE AWAITS',
    desc: 'Mastering the art. Colour grading, elite sound design, and precise editing refine the raw neural output into a cinema-standard masterpiece.'
  },
];

/* ─── CUSTOM SVG: The Maestro (Opera Conductor) ─── */
const MaestroSVG = ({ isAnimating }: { isAnimating: boolean }) => {
  const animState = isAnimating ? 'running' : 'paused';

  return (
    <svg viewBox="0 0 600 800" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMax meet">
      <style>{`
        @keyframes conductBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        @keyframes rightArmConduct {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(8deg) translateY(-10px); }
          50% { transform: rotate(-5deg) translateY(5px); }
          75% { transform: rotate(5deg) translateY(-5px); }
        }
        @keyframes leftArmConduct {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(-10deg) translateY(-5px); }
          60% { transform: rotate(5deg) translateY(10px); }
          85% { transform: rotate(-5deg) translateY(-2px); }
        }
        @keyframes headSway {
           0%, 100% { transform: rotate(0deg); }
           33% { transform: rotate(-2deg); }
           66% { transform: rotate(3deg); }
        }
        @keyframes batonSweep {
           0%, 100% { transform: rotate(0deg); }
           50% { transform: rotate(15deg); }
        }
      `}</style>

      {/* Cinematic Golden Spotlight behind Maestro */}
      <path d="M 150 800 C 150 500 450 500 450 800 Z" fill="#FFE066" opacity="0.15" filter="blur(40px)" />

      {/* Main Group: Breathing (Slightly more passionate, heavy breathing) */}
      <g style={{ animation: 'conductBreathe 4s ease-in-out infinite', animationPlayState: animState, transformOrigin: '300px 700px' }}>

        {/* --- BODY (Tuxedo) - Robust Build --- */}
        {/* Tuxedo Shoulders & Chest */}
        {/* Left Shoulder */}
        <path d="M 300 450 L 160 440 C 100 460 60 520 60 600 L 70 800 L 300 800 Z" fill="#111" />
        {/* Right Shoulder */}
        <path d="M 300 450 L 440 440 C 500 460 540 520 540 600 L 530 800 L 300 800 Z" fill="#151515" />
        
        {/* White Shirt base (Broad chest) */}
        <path d="M 220 400 L 380 400 L 420 800 L 180 800 Z" fill="#F8F4EC" />
        
        {/* Shirt Pleats */}
        <line x1="250" y1="450" x2="230" y2="800" stroke="#E8E4DC" strokeWidth="3" />
        <line x1="270" y1="450" x2="260" y2="800" stroke="#E8E4DC" strokeWidth="3" />
        <line x1="330" y1="450" x2="340" y2="800" stroke="#E8E4DC" strokeWidth="3" />
        <line x1="350" y1="450" x2="370" y2="800" stroke="#E8E4DC" strokeWidth="3" />

        {/* Gold Studs */}
        <circle cx="300" cy="500" r="4" fill="#D4AF37" />
        <circle cx="300" cy="560" r="4" fill="#D4AF37" />
        <circle cx="300" cy="620" r="4" fill="#D4AF37" />
        <circle cx="300" cy="680" r="4" fill="#D4AF37" />
        <circle cx="300" cy="740" r="4" fill="#D4AF37" />

        {/* Tuxedo Lapels (Wide) */}
        <path d="M 200 440 L 300 650 L 260 480 Z" fill="#0A0A0A" />
        <path d="M 400 440 L 300 650 L 340 480 Z" fill="#0D0D0D" />

        {/* Bowtie & Collar (White on White) */}
        <polygon points="230,380 295,430 300,410" fill="#FFF" stroke="#E8E4DC" strokeWidth="1" />
        <polygon points="370,380 305,430 300,410" fill="#FFF" stroke="#E8E4DC" strokeWidth="1" />
        {/* Big White Classic Bowtie */}
        <path d="M 230,420 L 290,440 L 230,460 Z" fill="#F8F4EC" stroke="#E8E4DC" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 370,420 L 310,440 L 370,460 Z" fill="#F8F4EC" stroke="#E8E4DC" strokeWidth="2" strokeLinejoin="round" />
        <rect x="285" y="430" width="30" height="20" rx="5" fill="#F8F4EC" stroke="#E8E4DC" strokeWidth="2" />

        {/* --- LEFT ARM (Clenched/Expressive) --- */}
        <g style={{ animation: 'leftArmConduct 5s ease-in-out infinite', animationPlayState: animState, transformOrigin: '140px 480px' }}>
          {/* Upper arm / sleeve */}
          <path d="M 140 460 Q 50 500 70 420" fill="none" stroke="#000" strokeWidth="50" strokeLinecap="round" />
          <path d="M 140 460 Q 50 500 70 420" fill="none" stroke="#111" strokeWidth="45" strokeLinecap="round" />
          {/* Hand (Clenched fist expressing tension) */}
          <circle cx="70" cy="400" r="22" fill="#EADBC1" />
          {/* Fingers / Knuckles */}
          <path d="M 55 390 Q 70 380 85 390 M 52 400 Q 70 395 88 400 M 55 410 Q 70 410 85 410" fill="none" stroke="#D6C4AD" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* --- RIGHT ARM (Holding Baton, positioned up and forward) --- */}
        <g style={{ animation: 'rightArmConduct 4.5s ease-in-out infinite', animationPlayState: animState, transformOrigin: '460px 480px' }}>
          {/* Sleeve reaching up */}
          <path d="M 460 460 Q 550 490 530 380" fill="none" stroke="#000" strokeWidth="50" strokeLinecap="round" />
          <path d="M 460 460 Q 550 490 530 380" fill="none" stroke="#151515" strokeWidth="45" strokeLinecap="round" />
          
          {/* Conductor's Hand holding baton firmly */}
          <circle cx="530" cy="360" r="18" fill="#EADBC1" />
          <path d="M 520 355 Q 530 350 545 365" fill="none" stroke="#D6C4AD" strokeWidth="3" strokeLinecap="round" />
          
          {/* Baton (Sweeping animation on wrist) */}
          <g style={{ animation: 'batonSweep 3s ease-in-out infinite', animationPlayState: animState, transformOrigin: '530px 360px' }}>
             {/* Cork handle */}
             <line x1="510" y1="380" x2="535" y2="355" stroke="#A67B5B" strokeWidth="8" strokeLinecap="round" />
             {/* White stick reaching high */}
             <line x1="535" y1="355" x2="380" y2="150" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* --- HEAD & FACE (Robust, passionate, fluffy grey hair, glasses) --- */}
        <g style={{ animation: 'headSway 6s ease-in-out infinite', animationPlayState: animState, transformOrigin: '300px 420px' }}>
          
          {/* Neck (Thick) */}
          <path d="M 260 370 L 340 370 L 350 430 L 250 430 Z" fill="#D6C4AD" />
          
          {/* Hair (Back volume - Fluffy grey clouds) */}
          <path d="M 200 250 C 180 150 250 100 300 100 C 350 100 420 150 400 250 C 430 300 430 350 390 380 C 360 400 240 400 210 380 C 170 350 170 300 200 250 Z" fill="#C4C6C8" opacity="0.9" />
          {/* Extra curl bumps for texture */}
          <circle cx="210" cy="180" r="30" fill="#D0D2D4" />
          <circle cx="250" cy="130" r="35" fill="#D0D2D4" />
          <circle cx="310" cy="110" r="40" fill="#C4C6C8" />
          <circle cx="360" cy="150" r="35" fill="#D0D2D4" />
          <circle cx="390" cy="210" r="30" fill="#BDBFC0" />
          <circle cx="400" cy="300" r="35" fill="#C4C6C8" />
          <circle cx="200" cy="300" r="35" fill="#BDBFC0" />
          <circle cx="220" cy="350" r="25" fill="#D0D2D4" />
          <circle cx="380" cy="350" r="25" fill="#D0D2D4" />

          {/* Face Base (Wider, rounder, robust jawline and double chin) */}
          <path d="M 230 200 C 230 150 370 150 370 200 C 380 250 370 320 350 360 C 330 390 270 390 250 360 C 230 320 220 250 230 200 Z" fill="#EADBC1" />
          
          {/* Cheeks / Jowls */}
          <path d="M 245 320 Q 235 350 260 375" fill="none" stroke="#D6C4AD" strokeWidth="4" strokeLinecap="round" />
          <path d="M 355 320 Q 365 350 340 375" fill="none" stroke="#D6C4AD" strokeWidth="4" strokeLinecap="round" />

          {/* Ears */}
          <ellipse cx="225" cy="270" rx="12" ry="20" fill="#D6C4AD" />
          <ellipse cx="375" cy="270" rx="12" ry="20" fill="#D6C4AD" />
          
          {/* Hair (Receding top/front wisps) */}
          <path d="M 240 180 Q 300 130 360 180 Q 330 150 300 150 Q 270 150 240 180" fill="none" stroke="#C4C6C8" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M 280 140 Q 300 120 320 140" fill="none" stroke="#D0D2D4" strokeWidth="2" strokeLinecap="round" />

          {/* Facial Features */}
          {/* Grey/White Bushy Brows */}
          <path d="M 255 240 Q 270 235 285 245" fill="none" stroke="#E8E8E8" strokeWidth="6" strokeLinecap="round" />
          <path d="M 345 240 Q 330 235 315 245" fill="none" stroke="#E8E8E8" strokeWidth="6" strokeLinecap="round" />
          
          {/* Eyes (Intense, focused downwards/closed) */}
          <path d="M 260 260 Q 270 265 280 260" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          <path d="M 340 260 Q 330 265 320 260" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          {/* Eye bags */}
          <path d="M 258 275 Q 270 285 282 275" fill="none" stroke="#CBA88D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 342 275 Q 330 285 318 275" fill="none" stroke="#CBA88D" strokeWidth="2" strokeLinecap="round" />

          {/* Glasses (Thin Gold/Wire rims) */}
          <rect x="250" y="245" width="40" height="30" rx="8" fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.9" />
          <rect x="310" y="245" width="40" height="30" rx="8" fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.9" />
          <line x1="290" y1="255" x2="310" y2="255" stroke="#D4AF37" strokeWidth="2.5" />
          {/* Temple arms of glasses */}
          <line x1="250" y1="260" x2="225" y2="265" stroke="#D4AF37" strokeWidth="2" />
          <line x1="350" y1="260" x2="375" y2="265" stroke="#D4AF37" strokeWidth="2" />
          
          {/* Nose (Broad) */}
          <path d="M 300 255 L 305 295 L 290 300" fill="none" stroke="#CBA88D" strokeWidth="3" strokeLinecap="round" />
          <path d="M 290 300 Q 300 305 310 300" fill="none" stroke="#CBA88D" strokeWidth="2" strokeLinecap="round" />

          {/* Mouth (Open wide, singing or breathing deeply with passion) */}
          <ellipse cx="300" cy="340" rx="16" ry="12" fill="#2A1010" />
          {/* Lower lip / chin crease */}
          <path d="M 288 360 Q 300 365 312 360" fill="none" stroke="#CBA88D" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};


/* ─── MAIN COMPONENT ─── */
const HowWeCreateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-10%' });
  
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section
      id="process"
      data-section="4"
      ref={sectionRef}
      className="pt-16 sm:pt-24 pb-0 relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#FFE066', color: '#111111' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-[1400px]">
        
        {/* Massive Title Above */}
        <motion.div 
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-mono text-[#111111] text-[13px] tracking-[0.4em] font-bold uppercase block mb-4">
            HOW WE DO IT
          </span>
          <h2 className="font-heading uppercase text-[#111111] tracking-wider" style={{ fontSize: 'clamp(40px, 7vw, 90px)', lineHeight: 0.9 }}>
            WE CREATE <span className="text-[#FF4B6E] italic pr-2">MAGIC</span>.
          </h2>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-4 relative w-full">
          
          {/* LEFT: SVG The Maestro */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[700px] relative z-20 flex items-end justify-center lg:justify-end lg:-mr-12 xl:-mr-24 pointer-events-none scale-x-[-1] lg:scale-x-100">
             {/* The Maestro holds the baton, pointing towards the poster frame */}
             <MaestroSVG isAnimating={isInView} />
          </div>

          {/* RIGHT: The Interactive Cinematic Poster Frame */}
          <motion.div 
            className="w-full lg:w-[55%] relative z-10 mb-16 sm:mb-24"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.2 }}
          >
            {/* The Poster Board */}
            <div className="bg-[#111] rounded-[24px] sm:rounded-2xl w-full flex flex-col justify-between overflow-hidden relative"
                 style={{ 
                   height: 'clamp(520px, 68vh, 680px)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 100px rgba(0, 229, 255, 0.05)',
                 }}
            >
              {/* Fancy Top Edge Glow — Opera Gold */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

              {/* Progress Indicator Track at top */}
              <div className="flex items-center gap-2 p-6 sm:p-10 border-b border-white/5 pb-6">
                 {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 h-1 transition-all duration-500 rounded-full"
                      style={{ backgroundColor: i === currentStep ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}
                    />
                 ))}
              </div>

              {/* Central Content Area (AnimatePresence for smooth slide) */}
              <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
                    className="absolute inset-0 flex items-center px-6 sm:px-10 h-full w-full"
                  >
                    
                    {/* Massive Background Watermark Number */}
                    <div className="absolute -bottom-16 -right-10 font-heading text-white/[0.04] select-none pointer-events-none leading-none z-0" 
                         style={{ fontSize: 'clamp(200px, 30vw, 400px)' }}>
                       0{currentStep + 1}
                    </div>

                    <div className="relative z-10 flex gap-8 w-full">
                      
                      {/* Sidebar Metadata (Opera Theatre Programme) */}
                      <div className="hidden sm:flex flex-col justify-between py-2 pr-6 border-r border-[#D4AF37]/20 min-w-[120px] max-w-[120px]">
                         <div>
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">SEQUENCE</div>
                           <div className="font-mono text-[13px] text-[#FF4B6E] tracking-widest uppercase mb-4">{steps[currentStep].act}</div>
                           
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">VENUE</div>
                           <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase mb-4 leading-tight">{steps[currentStep].venue}</div>
                           
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">CURTAIN</div>
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                             <div className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase leading-tight">{steps[currentStep].curtain}</div>
                           </div>
                         </div>
                         
                         {/* Decorative Opera Ornament */}
                         <div className="mt-auto pt-4 text-[#D4AF37]/30 text-[28px] select-none text-center" style={{ fontFamily: 'serif', letterSpacing: '0.1em' }}>❧</div>
                      </div>

                      {/* Main Copy Area */}
                      <div className="flex-1 py-4 flex flex-col justify-center">
                        {/* Mobile Metadata */}
                        <span className="sm:hidden font-mono text-[#FF4B6E] text-[12px] tracking-[0.2em] font-bold uppercase mb-4 flex items-center gap-3">
                           {steps[currentStep].act} <span className="text-[#555]">|</span> {steps[currentStep].venue}
                        </span>
                        
                        {/* Massive Title */}
                        <h3 className="font-heading text-white leading-[0.88] tracking-wider mb-3" style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}>
                           {steps[currentStep].title}
                        </h3>
                        
                        {/* Subtitle in a brutalist technical pill */}
                        <div className="self-start inline-block px-3 py-1.5 border border-[#FFE066]/30 text-[#FFE066] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-4 bg-[#FFE066]/5">
                           {steps[currentStep].subtitle}
                        </div>

                        {/* Description with editorial indention */}
                        <div className="pl-6 border-l-2 border-[#D4AF37]/50 relative">
                          {/* Accent dot */}
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#D4AF37] rounded-full" />
                          <p className="font-body text-[#A0A0A0] text-[14px] sm:text-[15px] leading-relaxed">
                             {steps[currentStep].desc}
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Controls */}
              <div className="mt-auto border-t border-white/5 bg-[#0a0a0a] p-4 flex items-center justify-between">
                 <button 
                   onClick={prevStep}
                   className="p-4 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                   aria-label="Previous Step"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 
                 <span className="font-mono text-[12px] text-white/40 tracking-[0.2em]">
                    {currentStep + 1} / {steps.length}
                 </span>
                 
                 <button 
                   onClick={nextStep}
                   className="flex items-center gap-2 group px-6 py-3 rounded-full bg-[#111] border border-white/20 text-white font-mono text-[12px] uppercase tracking-widest hover:bg-[#FFE066] hover:text-[#111] hover:border-[#FFE066] transition-all duration-300"
                 >
                   NEXT SCENE
                   <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HowWeCreateSection;
