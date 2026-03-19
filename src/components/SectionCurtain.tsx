import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * SectionCurtain — A theater-curtain reveal between major sections.
 *
 * As the user scrolls past this component, a solid-colored curtain
 * slides upward to reveal the content beneath. Creates a dramatic
 * "act change" between sections of the page.
 */

interface SectionCurtainProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
}

const SectionCurtain = ({ children, color = 'bg-background', className = '' }: SectionCurtainProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'start 0.4'],
    });

    // Curtain slides up from covering everything to revealing everything
    const curtainY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.3, 0.8], [40, 0]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {/* The content underneath */}
            <motion.div style={{ opacity: contentOpacity, y: contentY }}>
                {children}
            </motion.div>

            {/* The curtain overlay */}
            <motion.div
                className={`absolute inset-0 ${color} z-20 pointer-events-none`}
                style={{ y: curtainY }}
            />

            {/* Subtle edge glow at the bottom of the curtain */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] bg-accent/20 z-30 pointer-events-none"
                style={{
                    bottom: 0,
                    y: curtainY,
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
                }}
            />
        </div>
    );
};

export default SectionCurtain;
