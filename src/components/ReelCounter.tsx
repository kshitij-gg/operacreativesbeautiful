import { motion, useTransform, MotionValue } from 'framer-motion';

/**
 * ReelCounter — circular SVG progress ring with current project number.
 * Replaces the old text-based reel counter for a more visual experience.
 */

interface ReelCounterProps {
    scrollProgress: MotionValue<number>;
    totalReels: number;
}

const RING_SIZE = 64;
const STROKE_WIDTH = 2;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ReelCounter = ({ scrollProgress, totalReels }: ReelCounterProps) => {
    const currentReel = useTransform(
        scrollProgress,
        [0, 1],
        [1, totalReels]
    );

    const roundedReel = useTransform(currentReel, (v) =>
        String(Math.min(Math.max(Math.round(v), 1), totalReels)).padStart(2, '0')
    );

    // SVG dash offset: fully dashed (hidden) → 0 (fully filled)
    const dashOffset = useTransform(scrollProgress, [0, 1], [CIRCUMFERENCE, 0]);

    return (
        <motion.div
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
        >
            {/* Circular progress ring */}
            <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
                {/* Background circle */}
                <svg
                    width={RING_SIZE}
                    height={RING_SIZE}
                    className="absolute inset-0 -rotate-90"
                >
                    <circle
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="hsl(var(--foreground) / 0.08)"
                        strokeWidth={STROKE_WIDTH}
                    />
                    {/* Animated progress circle */}
                    <motion.circle
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth={STROKE_WIDTH}
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        style={{ strokeDashoffset: dashOffset }}
                    />
                </svg>

                {/* Number inside the ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span className="font-mono text-sm text-accent font-medium">
                        {roundedReel}
                    </motion.span>
                </div>
            </div>

            {/* Total label */}
            <div className="font-mono text-xs tracking-widest text-foreground/40">
                <span className="text-foreground/20">/ </span>
                {String(totalReels).padStart(2, '0')}
            </div>
        </motion.div>
    );
};

export default ReelCounter;
