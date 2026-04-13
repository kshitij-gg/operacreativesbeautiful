import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Clapperboard (High Fidelity) ── */
const Clapperboard = () => (
  <div className="relative w-[100px] h-[80px] flex-shrink-0 group">
    <div className="absolute bottom-0 left-0 right-0 top-5 rounded-md flex items-center justify-center border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105" 
         style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))', backdropFilter: 'blur(20px)' }}>
      <span className="font-heading text-[#111] text-[15px] tracking-widest font-bold">ACTION</span>
      {/* Decorative screws */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#111] opacity-50" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#111] opacity-50" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#111] opacity-50" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#111] opacity-50" />
    </div>
    <div className="absolute top-0 left-0 right-0 h-[18px] rounded-t-md overflow-hidden clapper-flap-anim border border-white/30 shadow-lg" 
         style={{ transformOrigin: 'bottom left' }}>
      <div className="w-full h-full flex">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-full" style={{ backgroundColor: i % 2 === 0 ? '#111' : '#fff' }} />
        ))}
      </div>
    </div>
  </div>
);

/* ── Floating notes (High Fidelity) ── */
const FloatingNotes = () => (
  <div className="relative w-[100px] h-[80px] flex-shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-xl flex items-center justify-center"
       style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.5), rgba(255,255,255,0.05))', backdropFilter: 'blur(15px)' }}>
    {/* Clean musical staff lines */}
    <div className="absolute inset-0 flex flex-col justify-evenly py-3 opacity-20">
      <div className="h-[1px] bg-black w-full" />
      <div className="h-[1px] bg-black w-full" />
      <div className="h-[1px] bg-black w-full" />
      <div className="h-[1px] bg-black w-full" />
    </div>
    {['♩', '♪', '♬'].map((note, i) => (
      <div key={i} className={`absolute font-heading text-3xl font-bold text-[#111] drop-shadow-md note-float-${i + 1}`} 
           style={{ left: `${20 + i * 25}%`, bottom: '-10px', animationDelay: `${i * 0.3}s` }}>
        {note}
      </div>
    ))}
  </div>
);

/* ── Metronome (High Fidelity) ── */
const Metronome = () => (
  <div className="relative w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
    {/* Metronome Body */}
    <div className="absolute bottom-2 w-[50px] h-[65px] rounded-t-[25px] rounded-b-md border border-white/30 shadow-xl overflow-hidden"
         style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.1))', backdropFilter: 'blur(15px)' }}>
       {/* Inner scale */}
       <div className="absolute top-3 bottom-8 left-1/2 -translate-x-1/2 w-[2px] bg-black/20" />
       {/* Arm rotating */}
       <div className="metronome-arm absolute bottom-1 left-1/2 w-1 h-[55px] bg-[#111] rounded-full origin-bottom shadow-md" style={{ transform: 'translateX(-50%)' }}>
         <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-[#111] rounded-sm" />
       </div>
    </div>
  </div>
);

const WeBelieveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardARefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Single timeline scrubs body background through the full color wheel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });
      tl
        .to('body', { backgroundColor: '#FF6B8A', ease: 'none' }, 0)
        .to('body', { backgroundColor: '#FF8C6B', ease: 'none' }, 0.15)
        .to('body', { backgroundColor: '#FFB347', ease: 'none' }, 0.30)
        .to('body', { backgroundColor: '#FFD166', ease: 'none' }, 0.45)
        .to('body', { backgroundColor: '#F9E784', ease: 'none' }, 0.60)
        .to('body', { backgroundColor: '#B8E986', ease: 'none' }, 0.75)
        .to('body', { backgroundColor: '#6DD5C0', ease: 'none' }, 0.88)
        .to('body', { backgroundColor: '#4FC3F7', ease: 'none' }, 1.00);
    });
    return () => ctx.revert();
  }, []);

  const cards = [
    { leftEl: <Clapperboard />, stat: '500M+', label: 'VIEWS DELIVERED', desc: 'Every frame we produce is built to perform. Not just look good — convert.' },
    { leftEl: <FloatingNotes />, stat: '20+', label: 'BRANDS ELEVATED', desc: "From DTC startups to global names — we've built the visual identity that got them noticed." },
    { leftEl: <Metronome />, stat: '250+', label: 'ASSETS PRODUCED', desc: 'Every ad. Every film. Every social cut. Crafted with obsessive attention to detail.' },
  ];

  return (
    <section
      id="we-believe"
      data-section="2"
      data-bg="#FF6B8A"
      ref={sectionRef}
      className="relative overflow-hidden pt-20 pb-20"
      style={{ zIndex: 1 }}
    >
      {/* Section header — transparent bg, GSAP handles body color */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8 text-center sm:text-left" style={{ background: 'transparent' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <span className="font-mono text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(0,0,0,0.6)' }}>WHAT WE BELIEVE</span>
          <h2 className="mt-3 font-heading tracking-tight" style={{ fontSize: 'clamp(3rem,9vw,110px)', lineHeight: 0.95, color: '#111111' }}>
            WE BELIEVE IN<br />FILMS THAT <span style={{ fontStyle: 'italic', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>SELL.</span>
          </h2>
        </motion.div>
      </div>

      {/* Stack of high-end glass cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mt-12 max-w-5xl">
        <div className="flex flex-col gap-10">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              ref={cardARefs[i]}
              className="relative p-8 sm:p-12 rounded-[32px] overflow-hidden group transition-all duration-500 hover:-translate-y-2"
              style={{ 
                background: 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(255,255,255,0.45)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.10), inset 0 1px 1px rgba(255,255,255,0.8)'
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-14">
                {/* Custom Icon Component */}
                <div className="flex-shrink-0 flex items-center justify-center min-w-[120px]">
                  {card.leftEl}
                </div>
                
                {/* Typography Stack */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="font-heading" style={{ fontSize: 'clamp(4rem,9vw,90px)', lineHeight: 0.9, color: '#111111' }}>
                    {card.stat}
                  </div>
                  <div className="font-mono text-[12px] font-bold tracking-[0.2em] uppercase mt-4 inline-block px-5 py-2 rounded-full" 
                       style={{ background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.8)' }}>
                    {card.label}
                  </div>
                  <div className="mt-6 mx-auto sm:mx-0 w-[40px] h-[3px] bg-black/20 rounded-full transition-all duration-500 group-hover:w-[120px]" />
                  <p className="mt-6 font-body text-[16px] sm:text-[20px] leading-relaxed max-w-xl mx-auto sm:mx-0" style={{ color: 'rgba(0,0,0,0.7)' }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeBelieveSection;
