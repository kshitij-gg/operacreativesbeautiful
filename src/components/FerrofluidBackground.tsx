import { useEffect, useRef } from 'react';

/**
 * FerrofluidBackground — An ambient, ultra-premium dark background replacement.
 * Simulates a slow-moving pool of black liquid metal (ferrofluid) using SVG displacement
 * and animated CSS gradients.
 */

const FerrofluidBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            // Smoothly interpolate current background position towards mouse position
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            if (bgRef.current) {
                bgRef.current.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* SVG Filter Definition for the Liquid Metal */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="ferrofluid" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.003" 
                            numOctaves="4" 
                            result="noise" 
                        />
                        <feColorMatrix 
                            type="matrix" 
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -15" 
                            in="noise" 
                            result="liquid" 
                        />
                        <feDisplacementMap 
                            in="SourceGraphic" 
                            in2="liquid" 
                            scale="150" 
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
            </svg>

            {/* The actual liquid layer */}
            <div 
                ref={bgRef}
                className="absolute inset-[-10%] w-[120%] h-[120%] opacity-40 mix-blend-screen"
                style={{
                    filter: 'url(#ferrofluid)',
                    background: 'radial-gradient(circle at 50% 50%, rgba(200,200,255,0.1) 0%, rgba(0,0,0,1) 60%), linear-gradient(45deg, rgba(147,51,234,0.05) 0%, rgba(0,0,0,0) 100%)',
                    animation: 'pulse-liquid 20s ease-in-out infinite alternate'
                }}
            />

            {/* Subtle overlay to keep it totally black with just highlights */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            <style>{`
                @keyframes pulse-liquid {
                    0% {
                        background-position: 0% 0%;
                    }
                    100% {
                        background-position: 100% 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default FerrofluidBackground;
