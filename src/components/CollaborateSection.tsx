import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';

/* ─── ROBOT MOOD TYPE ─── */
type RobotMood = 'idle' | 'happy1' | 'happy2' | 'clapping';

/* ─────────────────────────────────────────────────
   PEEPING ROBOT COMPONENT
   The robot peeks from an edge of the screen.
   "side" controls which edge it enters from.
   The robot always FACES INWARD (toward the viewer).
   Left robot: body is to the left, it leans right to peek.
   Right robot: mirrored.
─────────────────────────────────────────────────── */
const PeepingRobot = ({ side, mood, visible }: {
  side: 'left' | 'right';
  mood: RobotMood;
  visible: boolean;
}) => {
  const isClapping = mood === 'clapping';
  const isHappy2   = mood === 'happy2' || isClapping;
  const isHappy1   = mood === 'happy1' || isHappy2;

  /* Smile path on visor — gets bigger with each state */
  const smilePath = isClapping
    ? 'M -22 2 Q 0 28 22 2'    // huge grin
    : isHappy2
    ? 'M -20 2 Q 0 22 20 2'    // big smile
    : isHappy1
    ? 'M -16 2 Q 0 16 16 2'    // medium smile
    : 'M -16 2 L 16 2';        // flat

  /* Eye glow intensity */
  const eyeGlow = isHappy2 ? '#FFE066' : '#00E5FF';

  /* Clapping arm angles — right arm swings up on clap */
  const rightArmClap = isClapping ? 'rotate(-60)' : 'rotate(0)';
  const leftArmClap  = isClapping ? 'rotate(60)'  : 'rotate(0)';

  /* Bounce scale on clapping */
  const bounceScale = isClapping ? 1.08 : 1;

  /* The peek offset: when visible the robot shows its head+shoulder only.
     The container is overflow-hidden; translateX shifts the robot body
     in/out so only the correct amount is visible. */

  // Left robot: positioned so body is mostly off-screen LEFT. Peek = slide RIGHT.
  // Right robot: positioned so body is mostly off-screen RIGHT. Peek = slide LEFT.
  const hiddenX  = side === 'left' ? '-88%' : '88%';
  const visibleX = side === 'left' ? '-28%'  : '28%';   // leans in, head visible

  return (
    <div
      className="absolute z-40 pointer-events-none"
      style={{
        width: 'clamp(200px, 26vw, 400px)',
        height: 'clamp(340px, 45vw, 640px)',
        bottom: '0',
        [side]: 0,
        transform: `translateX(${visible ? visibleX : hiddenX}) scale(${bounceScale})`,
        transition: 'transform 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <svg
        viewBox="0 0 310 530"
        className="w-full h-full drop-shadow-2xl"
        style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none' }}
      >
        <style>{`
          @keyframes robotBounce {
            0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)}
          }
          @keyframes antennaGlow {
            0%,100%{opacity:1} 50%{opacity:0.3}
          }
        `}</style>

        {/* Whole body group — bounces when clapping */}
        <g style={{
          animation: isClapping ? 'robotBounce 0.35s ease-in-out infinite' : 'none',
          transformOrigin: '155px 260px',
        }}>

          {/* ── LEGS ── */}
          <rect x="108" y="380" width="38" height="130" rx="16" fill="#1A1A1A" stroke="#111" strokeWidth="5" />
          <rect x="164" y="380" width="38" height="130" rx="16" fill="#1A1A1A" stroke="#111" strokeWidth="5" />
          <ellipse cx="127"  cy="508" rx="30" ry="12" fill="#111" stroke="#000" strokeWidth="3" />
          <ellipse cx="183"  cy="508" rx="30" ry="12" fill="#111" stroke="#000" strokeWidth="3" />
          {/* Leg accent rings */}
          <rect x="108" y="418" width="38" height="9" rx="4" fill="#FFE066" />
          <rect x="164" y="418" width="38" height="9" rx="4" fill="#FFE066" />

          {/* ── BODY / TORSO ── */}
          <rect x="75" y="220" width="160" height="170" rx="36" fill="#F8F4EC" stroke="#111" strokeWidth="8" />
          {/* Chest LCD panel */}
          <rect x="96" y="238" width="118" height="80" rx="14" fill="#111" />
          <rect x="107" y="250" width="45" height="9" rx="4" fill={eyeGlow} opacity="0.9" />
          <rect x="107" y="268" width="68" height="5" rx="2" fill="#fff" opacity="0.5" />
          <rect x="107" y="280" width="50" height="5" rx="2" fill="#fff" opacity="0.5" />
          <circle cx="185" cy="278" r="12" fill="none" stroke={eyeGlow} strokeWidth="3" />
          <circle cx="185" cy="278" r="5"  fill={eyeGlow} />
          {/* Belly bolt */}
          <circle cx="155" cy="356" r="11" fill="#333" stroke="#111" strokeWidth="3" />
          <circle cx="155" cy="356" r="4"  fill="#555" />

          {/* ── LEFT ARM (our left = robot's left, pointing INWARD toward viewer) ── */}
          {/* When clapping, this swings up toward midline */}
          <g style={{ transformOrigin: '80px 250px', transform: leftArmClap, transition: 'transform 0.15s ease' }}>
            <path d="M 80 250 Q 30 290 25 350" fill="none" stroke="#F8F4EC" strokeWidth="30" strokeLinecap="round" />
            <path d="M 80 250 Q 30 290 25 350" fill="none" stroke="#111" strokeWidth="36" strokeLinecap="round" opacity="0.12" />
            <circle cx="25" cy="362" r="22" fill="#FFE066" stroke="#111" strokeWidth="5" />
          </g>

          {/* ── RIGHT ARM (points toward clapperboard — the "peeking" side) ── */}
          {/* When clapping, swings up to meet left arm */}
          <g style={{ transformOrigin: '235px 250px', transform: rightArmClap, transition: 'transform 0.15s ease' }}>
            <path d="M 235 250 Q 285 300 285 360" fill="none" stroke="#F8F4EC" strokeWidth="30" strokeLinecap="round" />
            <path d="M 235 235 Q 285 300 285 360" fill="none" stroke="#111" strokeWidth="36" strokeLinecap="round" opacity="0.12" />
            <circle cx="285" cy="372" r="22" fill="#FFE066" stroke="#111" strokeWidth="5" />
          </g>

          {/* ── NECK ── */}
          <rect x="136" y="168" width="38" height="58" rx="10" fill="#DDD" stroke="#111" strokeWidth="5" />

          {/* ── HEAD with curious TILT toward clapperboard ── */}
          {/* Left robot tilts right (positive), right robot appears to tilt left due to scaleX flip */}
          <g style={{ transformOrigin: '155px 120px', transform: 'rotate(12deg)', transition: 'transform 0.3s ease' }}>
          <rect x="80"  y="68"  width="150" height="106" rx="32" fill="#F8F4EC" stroke="#111" strokeWidth="8" />

          {/* VR Visor */}
          <rect x="75" y="96" width="160" height="56" rx="18" fill="#111" />

          {/* Eyes — glow colour changes with mood */}
          <circle cx="122" cy="124" r="16" fill={eyeGlow} filter="url(#eyeBlur)" />
          <circle cx="122" cy="124" r="7"  fill="#fff" />
          <circle cx="188" cy="124" r="16" fill={eyeGlow} filter="url(#eyeBlur)" />
          <circle cx="188" cy="124" r="7"  fill="#fff" />

          {/* Animated shine on eyes when happy */}
          {isHappy1 && (
            <>
              <circle cx="128" cy="118" r="4" fill="white" opacity="0.7" />
              <circle cx="194" cy="118" r="4" fill="white" opacity="0.7" />
            </>
          )}

          {/* Smile / expression */}
          <g transform="translate(155, 152)">
            <path
              d={smilePath}
              fill="none"
              stroke={eyeGlow}
              strokeWidth="5"
              strokeLinecap="round"
              style={{ transition: 'd 0.25s ease' }}
            />
          </g>

          {/* Headphones arc */}
          <path d="M 78 118 C 78 42 232 42 232 118" fill="none" stroke="#FFE066" strokeWidth="14" strokeLinecap="round" />
          <rect x="62"  y="103" width="22" height="56" rx="10" fill="#111" stroke="#333" strokeWidth="5" />
          <rect x="226" y="103" width="22" height="56" rx="10" fill="#111" stroke="#333" strokeWidth="5" />

          {/* Antenna */}
          <line x1="210" y1="68"  x2="236" y2="22" stroke="#555" strokeWidth="7" strokeLinecap="round" />
          <circle
            cx="238" cy="18" r="10"
            fill="#FF4B6E"
            style={{ animation: isHappy1 ? 'antennaGlow 0.5s infinite' : 'antennaGlow 2s infinite' }}
          />
          </g> {/* end head tilt group */}
        </g>

        <defs>
          <filter id="eyeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};


/* ─── CUSTOM SVG: Cinematic Clapperboard & Film Reels ─── */
const SetPieceSVG = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <svg viewBox="0 0 1000 800" className="w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="xMidYMid meet">
    <style>{`
      @keyframes floatFilm { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes glowPulse { 0%,100%{filter:drop-shadow(0 0 20px #FF4B6E)} 50%{filter:drop-shadow(0 0 40px #FF4B6E)} }
    `}</style>
    <ellipse cx="500" cy="730" rx="350" ry="40" fill="#600000" opacity="0.6" filter="blur(20px)" />

    {/* Film Reels */}
    <g style={{ animation: 'floatFilm 7s ease-in-out infinite' }}>
      <g transform="translate(180, 600) rotate(-15)">
        <circle cx="0" cy="0" r="120" fill="#111" stroke="#333" strokeWidth="8" />
        <circle cx="0" cy="0" r="20" fill="#FFE066" />
        {[0,60,120,180,240,300].map(a => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M 30 -20 L 90 -40 A 90 90 0 0 1 90 40 L 30 20 Z" fill="#1A1A1A" stroke="#333" strokeWidth="3" />
          </g>
        ))}
      </g>
      <g transform="translate(820, 650) rotate(25)">
        <circle cx="0" cy="0" r="100" fill="#0A0A0A" stroke="#222" strokeWidth="6" />
        <circle cx="0" cy="0" r="15" fill="#00E5FF" />
        {[0,72,144,216,288].map(a => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M 25 -15 L 75 -30 A 75 75 0 0 1 75 30 L 25 15 Z" fill="#111" stroke="#222" strokeWidth="2" />
          </g>
        ))}
      </g>
      <path d="M 180 480 C 300 300, 700 800, 820 550" fill="none" stroke="#050505" strokeWidth="30" strokeLinecap="round" />
      <path d="M 180 480 C 300 300, 700 800, 820 550" fill="none" stroke="#222" strokeWidth="30" strokeDasharray="10 10" />
    </g>

    {/* Clapperboard */}
    <g transform="translate(500, 450)">
      <rect x="-280" y="-180" width="560" height="380" rx="16" fill="#111" stroke="#000" strokeWidth="8" />
      <rect x="-260" y="-160" width="520" height="340" fill="none" stroke="#333" strokeWidth="4" rx="8" />
      <g fill="#444" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="4">
        <text x="-240" y="-120">PROD. NO.</text>
        <line x1="-120" y1="-120" x2="240" y2="-120" stroke="#333" strokeWidth="2" />
        <text x="-240" y="-80">SCENE</text>
        <text x="-120" y="-80">TAKE</text>
        <text x="80"   y="-80">SOUND</text>
      </g>
      {/* Lower stick */}
      <rect x="-280" y="-220" width="560" height="40" rx="8" fill="#111" stroke="#000" strokeWidth="6" />
      <g fill="#F8F4EC">
        {[-260,-180,-100,-20,60,140,220].map(x => (
          <polygon key={x} points={`${x},-220 ${x+30},-220 ${x+10},-180 ${x-20},-180`} />
        ))}
      </g>
      {/* Upper stick (snaps down on submit) */}
      <g style={{
        transformOrigin: '-260px -200px',
        transform: isSubmitting ? 'rotate(0deg)' : 'rotate(-15deg)',
        transition: 'transform 0.2s cubic-bezier(0.175,0.885,0.32,1.275)',
      }}>
        <rect x="-280" y="-260" width="560" height="40" rx="8" fill="#FFE066" stroke="#000" strokeWidth="6" />
        <g fill="#111">
          {[-180,-100,-20,60,140,220].map(x => (
            <polygon key={x} points={`${x},-260 ${x+30},-260 ${x+10},-220 ${x-20},-220`} />
          ))}
        </g>
        <circle cx="-260" cy="-240" r="12" fill="#333" stroke="#000" strokeWidth="4" />
        <circle cx="-260" cy="-240" r="4"  fill="#111" />
      </g>
    </g>

    <g style={{ animation: 'glowPulse 3s infinite' }}>
      <path d="M 250 200 Q 255 180 260 200 Q 280 205 260 210 Q 255 230 250 210 Q 230 205 250 200 Z" fill="#FFE066" />
      <path d="M 800 350 Q 805 340 810 350 Q 820 355 810 360 Q 805 370 800 360 Q 790 355 800 350 Z" fill="#00E5FF" />
      <circle cx="750" cy="250" r="4" fill="#FF4B6E" />
    </g>
  </svg>
);


/* ─── MAIN COMPONENT ─── */
const CollaborateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' });

  const [curtainVisible, setCurtainVisible] = useState(false);
  const [isSubmitting,   setIsSubmitting]   = useState(false);

  /* Robot states */
  const [robotVisible, setRobotVisible] = useState(false);
  const [nameValue,    setNameValue]    = useState('');
  const [emailValue,   setEmailValue]   = useState('');
  const [mood, setMood] = useState<RobotMood>('idle');

  /* Derive mood from form state */
  useEffect(() => {
    if (isSubmitting) { setMood('clapping'); return; }
    if (nameValue.length > 0 && emailValue.length > 0) { setMood('happy2'); return; }
    if (nameValue.length > 0 || emailValue.length > 0) { setMood('happy1'); return; }
    setMood('idle');
  }, [nameValue, emailValue, isSubmitting]);

  useEffect(() => {
    if (isInView) setTimeout(() => setCurtainVisible(true), 200);
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.open('https://calendly.com/operacreatives', '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  return (
    <section
      id="collaborate"
      data-section="5"
      data-bg="#C0152A"
      ref={sectionRef}
      className="relative flex flex-col items-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: '#C0152A', color: '#ffffff' }}
    >
      {/* ── CSS Velvet Curtains ── */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-[140px] z-20"
        style={{
          background: 'linear-gradient(90deg, #8B0000 0%, #A01020 40%, transparent 100%)',
          clipPath: 'polygon(0 0, 85% 0, 100% 8%, 85% 92%, 100% 100%, 0 100%)',
          transform: curtainVisible ? 'translateX(0)' : 'translateX(-60px)',
          opacity:   curtainVisible ? 1 : 0,
          transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.8s ease',
        }}
      >
        <div className="absolute top-0 bottom-0 right-[30px] w-[2px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <div
        className="pointer-events-none absolute top-0 bottom-0 right-0 w-[140px] z-20"
        style={{
          background: 'linear-gradient(270deg, #8B0000 0%, #A01020 40%, transparent 100%)',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0% 92%, 15% 8%)',
          transform: curtainVisible ? 'translateX(0)' : 'translateX(60px)',
          opacity:   curtainVisible ? 1 : 0,
          transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.8s ease',
          transitionDelay: '0.05s',
        }}
      >
        <div className="absolute top-0 bottom-0 left-[30px] w-[2px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── PEEPING ROBOTS ── */}
      {/* They sit at the bottom edges of the section.
          The section has overflow-hidden so their bodies are clipped
          when they are NOT visible — only their heads poke in. */}
      <PeepingRobot side="left"  mood={mood} visible={robotVisible} />
      <PeepingRobot side="right" mood={mood} visible={robotVisible} />

      {/* Intro Typography */}
      <motion.div
        className="relative z-30 text-center px-4 max-w-4xl mx-auto mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="font-mono text-[#FFE066] text-[12px] tracking-[0.3em] font-bold uppercase drop-shadow-md block mb-4">
          REGISTER A CALL
        </span>
        <h2 className="font-heading uppercase text-white drop-shadow-2xl" style={{ fontSize: 'clamp(40px, 8vw, 90px)', lineHeight: 0.9 }}>
          LET'S <span className="text-[#111]">COLLABORATE</span>
        </h2>
      </motion.div>

      {/* ── THE CLAPPERBOARD FORM SET PIECE ── */}
      <div className="relative w-full max-w-[1000px] aspect-[10/8] flex flex-col items-center justify-center mt-[-30px] sm:mt-[-50px]">

        {/* SVG Art */}
        <div className="absolute inset-0 z-10 select-none">
          <SetPieceSVG isSubmitting={isSubmitting} />
        </div>

        {/* HTML Contact Form — hovering this reveals the robots */}
        <div
          className="absolute z-20 w-[46%] h-[35%] top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center"
          onMouseEnter={() => setRobotVisible(true)}
          onMouseLeave={() => setRobotVisible(false)}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 w-full h-full justify-center">

            <input
              type="text"
              placeholder="PROD. NAME (Your Name)"
              required
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
              className="w-full bg-[#1A1A1A] border-b-2 border-[#333] text-white font-mono text-[10px] sm:text-[13px] tracking-wide px-4 py-3 sm:py-4 focus:outline-none focus:border-[#FFE066] transition-colors rounded-t-md"
            />

            <input
              type="email"
              placeholder="CONTACT FREQ. (Your Email)"
              required
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              className="w-full bg-[#1A1A1A] border-b-2 border-[#333] text-white font-mono text-[10px] sm:text-[13px] tracking-wide px-4 py-3 sm:py-4 focus:outline-none focus:border-[#FFE066] transition-colors rounded-t-md"
            />

            <button
              type="submit"
              className="mt-2 w-full bg-white text-[#111] hover:bg-[#FFE066] transition-colors duration-300 font-mono text-[12px] sm:text-[14px] font-bold tracking-[0.2em] uppercase py-3 sm:py-4 rounded-md flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,224,102,0.3)]"
            >
              BOOK A SCENE
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

          </form>
        </div>

      </div>

      {/* Footer tagline */}
      <motion.p
        className="relative z-30 mt-8 sm:mt-16 font-mono text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-center"
        style={{ color: 'rgba(255,255,255,0.5)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
      >
        DIRECTED BY OPERA CREATIVES · PRODUCED IN INDIA · EST. 2025
      </motion.p>

    </section>
  );
};

export default CollaborateSection;
