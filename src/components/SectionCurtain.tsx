import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionCurtain — a cinematic curtain overlay that wipes away 
 * to reveal content as it scrolls into view. Like a camera iris
 * opening on a new scene.
 */

interface SectionCurtainProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    color?: string;
    duration?: number;
    className?: string;
}

const SectionCurtain = ({
    children,
    direction = 'up',
    color = 'hsl(var(--accent))',
    duration = 1,
    className = '',
}: SectionCurtainProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

    const directionMap = {
        up: { initial: { y: '0%' }, animate: { y: '-100%' } },
        down: { initial: { y: '0%' }, animate: { y: '100%' } },
        left: { initial: { x: '0%' }, animate: { x: '-100%' } },
        right: { initial: { x: '0%' }, animate: { x: '100%' } },
    };

    const variants = directionMap[direction];

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {children}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ backgroundColor: color }}
                initial={variants.initial}
                animate={isInView ? variants.animate : variants.initial}
                transition={{
                    duration: duration,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.1,
                }}
            />
        </div>
    );
};

export default SectionCurtain;
