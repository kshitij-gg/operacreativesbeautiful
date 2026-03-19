import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValueEvent } from 'framer-motion';

/**
 * MarqueeBanner — Scroll-velocity-driven horizontal text strip with interactive physics.
 * Text accelerates based on scroll speed.
 * AND behaves like a physical string — swiping mouse through it makes it wobble and snap.
 */

interface MarqueeBannerProps {
    text?: string;
    speed?: number;
    className?: string;
    separator?: string;
    reverse?: boolean;
}

const MarqueeBanner = ({
    text = "AI FILMS ★ COMMERCIALS ★ VISUAL CAMPAIGNS ★ MOTION DESIGN ★ CREATIVE DIRECTION ★ ",
    speed = 30,
    className = "",
    separator = "",
    reverse = false,
}: MarqueeBannerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const baseX = useTransform(
        scrollYProgress,
        [0, 1],
        reverse ? ['-15%', '0%'] : ['0%', '-15%']
    );

    // Magnetic Tape Scroll Distortion (Velocity-based tearing)
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityScale = useTransform(smoothVelocity, [-2000, 0, 2000], [80, 0, 80], { clamp: true });
    const filterRef = useRef<SVGFEDisplacementMapElement>(null);
    const filterId = useRef(`tear-${Math.random().toString(36).substr(2, 9)}`).current;

    useMotionValueEvent(velocityScale, "change", (latest) => {
        if (filterRef.current) {
            filterRef.current.setAttribute('scale', latest.toString());
        }
    });

    // Interactive physics "string" effect
    const [isHovered, setIsHovered] = useState(false);
    // Spring for the Y offset — bouncy and elastic
    const springY = useSpring(0, { stiffness: 300, damping: 10, mass: 1 });
    
    // Animate the text rotation slightly for a "bend" feel
    const springRotate = useTransform(springY, [-50, 50], [2, -2]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate offset from center of banner (-50 to +50 roughly)
        const centerY = rect.top + rect.height / 2;
        const offsetY = e.clientY - centerY;
        // Cap the maximum stretch distance
        const stretch = Math.max(-60, Math.min(60, offsetY * 1.5));
        springY.set(stretch);
    }, [springY]);

    const handlePointerEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handlePointerLeave = useCallback(() => {
        setIsHovered(false);
        // Snap back to zero with elastic bounce
        springY.set(0);
    }, [springY]);

    // Cleanup spring if unmounted while dragged
    useEffect(() => {
        if (!isHovered) springY.set(0);
    }, [isHovered, springY]);

    const repeatedText = `${text}${separator}`.repeat(8);

    return (
        <div 
            ref={containerRef} 
            className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 relative touch-none ${className}`}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            {/* Invisible SVG definition for the VHS Tear / Magnetic Tape effect */}
            <svg className="absolute w-0 h-0" aria-hidden="true" style={{ pointerEvents: 'none' }}>
                <defs>
                    <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                        {/* High X frequency, very low Y frequency creates horizontal tearing */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.005 0.5" numOctaves="1" result="noise" />
                        <feDisplacementMap 
                            ref={filterRef} 
                            in="SourceGraphic" 
                            in2="noise" 
                            scale="0" 
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
            </svg>

            <motion.div
                className="inline-block"
                style={{ 
                    x: baseX, 
                    y: springY,
                    rotate: springRotate,
                    filter: `url(#${filterId})`
                }}
            >
                <motion.span
                    className="inline-block font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground/10 uppercase tracking-wider select-none cursor-crosshair"
                    animate={{
                        x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
                    }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {repeatedText}{repeatedText}
                </motion.span>
            </motion.div>
        </div>
    );
};

export default MarqueeBanner;
