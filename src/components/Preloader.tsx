import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Built-in space safely preserves "OPERA CREATIVES" separation without CSS margin hacks
const splitWords = [
    { left: 'THI', right: 'NK.' },
    { left: 'PRO', right: 'MPT.' },
    { left: 'CRE', right: 'ATE.' },
    { left: 'OPERA ', right: 'CREATIVES' } 
];

const CarSilhouette = ({ isExiting }: { isExiting?: boolean }) => (
    <div className="relative w-[300px] md:w-[500px] flex items-center justify-center mix-blend-screen z-20">
        <svg viewBox="0 0 500 150" className="w-full drop-shadow-[0_5px_30px_rgba(235,90,49,0.6)]">
            <path 
                d="M 50 100 C 50 100, 60 70, 110 65 C 160 60, 200 50, 260 45 C 320 40, 330 40, 380 50 C 420 58, 460 75, 470 95 L 450 110 L 370 110 C 370 110, 350 85, 330 85 C 310 85, 290 110, 290 110 L 210 110 C 210 110, 190 85, 170 85 C 150 85, 130 110, 130 110 L 50 110 Z" 
                fill="#000" stroke="#fff" strokeWidth="2" strokeLinejoin="round" 
            />
            <path d="M 180 85 C 180 85, 220 50, 270 47 C 320 44, 370 60, 370 65 L 290 65 Z" fill="none" stroke="#eb5a31" strokeWidth="2.5" />
            <path d="M 50 100 L 40 85 L 80 80" fill="none" stroke="#eb5a31" strokeWidth="3" />
            
            <g style={{ transformOrigin: '150px 110px' }} className="animate-[spin_0.08s_linear_infinite]">
                <circle cx="150" cy="110" r="30" fill="#050505" stroke="#fff" strokeWidth="3" />
                <circle cx="150" cy="110" r="8" fill="#eb5a31" className="drop-shadow-[0_0_8px_rgba(235,90,49,1)]" />
                <line x1="150" y1="80" x2="150" y2="140" stroke="#ffffffff" strokeWidth="2" />
                <line x1="120" y1="110" x2="180" y2="110" stroke="#fff" strokeWidth="2" />
                <line x1="128" y1="88" x2="172" y2="132" stroke="#fff" strokeWidth="2" />
                <line x1="128" y1="132" x2="172" y2="88" stroke="#fff" strokeWidth="2" />
            </g>
            
            <g style={{ transformOrigin: '350px 110px' }} className="animate-[spin_0.08s_linear_infinite]">
                <circle cx="350" cy="110" r="30" fill="#050505" stroke="#fff" strokeWidth="3" />
                <circle cx="350" cy="110" r="8" fill="#eb5a31" className="drop-shadow-[0_0_8px_rgba(235,90,49,1)]" />
                <line x1="350" y1="80" x2="350" y2="140" stroke="#fff" strokeWidth="2" />
                <line x1="320" y1="110" x2="380" y2="110" stroke="#fff" strokeWidth="2" />
                <line x1="328" y1="88" x2="372" y2="132" stroke="#fff" strokeWidth="2" />
                <line x1="328" y1="132" x2="372" y2="88" stroke="#fff" strokeWidth="2" />
            </g>
        </svg>

        {/* Default aerodynamic wind tunnels trailing the car */}
        <div className="absolute right-[85%] top-[55%] w-[150px] md:w-[300px] h-[2px] bg-gradient-to-l from-[#eb5a31] to-transparent pointer-events-none opacity-80" />
        <div className="absolute right-[80%] top-[40%] w-[100px] md:w-[200px] h-[1px] bg-gradient-to-l from-white to-transparent pointer-events-none opacity-60" />

        {/* The Afterburner thrust that dynamically flares entirely ON EXIT */}
        <motion.div 
            className="absolute right-[85%] top-[53%] h-[6px] bg-gradient-to-l from-white to-transparent blur-[3px] pointer-events-none rounded-full"
            initial={{ width: '0px', opacity: 0 }}
            animate={isExiting ? { width: '400px', opacity: 1 } : { width: '0px', opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
    </div>
);

const ThinSpeedLines = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        {Array.from({ length: 45 }).map((_, i) => {
            const isSlightlyThicker = i % 5 === 0;
            return (
                <motion.div
                    key={i}
                    // Upgraded with volumetric optical box-shadows to simulate real camera lens flares
                    className="absolute bg-white rounded-full drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
                    style={{ 
                        top: `${Math.random() * 100}vh`, 
                        height: isSlightlyThicker ? '2px' : '1px',
                        width: `${150 + Math.random() * 400}px`,
                        opacity: Math.random() * 0.5 + 0.1,
                        filter: 'blur(0.5px)' 
                    }}
                    animate={{ left: ['100vw', '-50vw'] }}
                    transition={{ 
                        duration: Math.random() * 0.3 + 0.2, 
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            )
        })}
    </div>
);

const TrackingTypography = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center -mt-[15vh] sm:-mt-[20vh] pointer-events-none z-10 w-full overflow-hidden">
            {splitWords.map((word, i) => {
                const isFinal = i === 3;
                const startDelay = i * 1.15 + 0.1; 

                // Custom Masterclass Easing: 
                // [0.16, 1, 0.3, 1] acts like an incredibly luxurious "Expo-Out" snapping physically into place
                // [0.7, 0, 0.84, 0] acts as a brutal "Expo-In" violently firing elements off-screen
                const EASE_SNAP = [0.16, 1, 0.3, 1] as const;
                const EASE_FIRE = [0.7, 0, 0.84, 0] as const;

                return (
                    <div 
                        key={i} 
                        className="absolute inset-0 flex items-center justify-center font-heading font-black text-center uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]"
                        style={{ 
                            fontSize: isFinal ? 'min(7.5vw, 4.5rem)' : 'min(17vw, 13rem)', 
                            letterSpacing: '-0.02em',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {/* LEFT CHASSIS OF WORD */}
                        <motion.span
                            initial={{ x: '-50vw', opacity: 0, skewX: 30, filter: 'blur(30px)', scale: 1.4 }}
                            animate={{ 
                                x: isFinal ? ['-50vw', '0px'] : ['-50vw', '0px', '0px', '-50vw'],
                                opacity: isFinal ? [0, 1] : [0, 1, 1, 0],
                                skewX: isFinal ? [30, 0] : [30, 0, 0, 30],
                                filter: isFinal ? ['blur(30px)', 'blur(0px)'] : ['blur(30px)', 'blur(0px)', 'blur(0px)', 'blur(30px)'],
                                scale: isFinal ? [1.4, 1] : [1.4, 1, 1, 1.4]
                            }}
                            transition={{ 
                                duration: isFinal ? 0.45 : 1.3, 
                                times: isFinal ? [0, 1] : [0, 0.15, 0.85, 1], 
                                ease: isFinal ? EASE_SNAP : [EASE_SNAP, "linear", EASE_FIRE] as any,
                                delay: startDelay
                            }}
                            style={{ display: 'inline-block', whiteSpace: 'pre' }}
                        >
                            {word.left}
                        </motion.span>

                        {/* RIGHT CHASSIS OF WORD */}
                        <motion.span
                            initial={{ x: '50vw', opacity: 0, skewX: -30, filter: 'blur(30px)', scale: 1.4 }}
                            animate={{ 
                                x: isFinal ? ['50vw', '0px'] : ['50vw', '0px', '0px', '50vw'],
                                opacity: isFinal ? [0, 1] : [0, 1, 1, 0],
                                skewX: isFinal ? [-30, 0] : [-30, 0, 0, -30],
                                filter: isFinal ? ['blur(30px)', 'blur(0px)'] : ['blur(30px)', 'blur(0px)', 'blur(0px)', 'blur(30px)'],
                                scale: isFinal ? [1.4, 1] : [1.4, 1, 1, 1.4]
                            }}
                            transition={{ 
                                duration: isFinal ? 0.45 : 1.3, 
                                times: isFinal ? [0, 1] : [0, 0.15, 0.85, 1], 
                                ease: isFinal ? EASE_SNAP : [EASE_SNAP, "linear", EASE_FIRE] as any,
                                delay: startDelay
                            }}
                            style={{ display: 'inline-block', whiteSpace: 'pre' }}
                        >
                            {word.right}
                        </motion.span>
                    </div>
                )
            })}
        </div>
    );
};

const Preloader = () => {
    const isHomePage = window.location.pathname === '/';
    const [phase, setPhase] = useState<'tracking' | 'exit'>('tracking');

    useEffect(() => {
        if (!isHomePage) return;
        const t = setTimeout(() => setPhase('exit'), 4600); 
        return () => clearTimeout(t);
    }, [isHomePage]);

    if (!isHomePage) return null;

    if (phase === 'exit') {
        setTimeout(() => document.getElementById('preloader-root')?.remove(), 2500);
    }

    return (
        <div id="preloader-root" className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden">
            {/* The Solid Cinematic Environment */}
            <motion.div
                className="absolute inset-0 bg-[#030303] flex items-center justify-center overflow-hidden"
                animate={phase === 'exit' ? { x: '100vw' } : { x: '0vw' }}
                // Employs a heavy drag-easing curve (Circ-InOut mechanism) to sweep perfectly over 1 second 
                transition={phase === 'exit' ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] } : {}}
            >
                <ThinSpeedLines />
                <TrackingTypography />
                
                <motion.div 
                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    style={{ paddingTop: '22vh' }} 
                    // Car receives a massive forward boost and tilts slightly physically backwards as it rips away the curtain
                    animate={phase === 'exit' ? { x: '30vw', y: 0, rotate: -2 } : { x: 0, y: ['-2%', '2%', '-2%'], rotate: 0 }}
                    transition={
                        phase === 'exit' 
                            ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] } 
                            : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                >
                    <CarSilhouette isExiting={phase === 'exit'} />
                </motion.div>

                {/* Ambient Floor Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white opacity-[0.02] blur-[100px] pointer-events-none rounded-full" />
            </motion.div>
        </div>
    );
};

export default Preloader;
