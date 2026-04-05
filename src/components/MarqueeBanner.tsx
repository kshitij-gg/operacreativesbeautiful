import { motion } from 'framer-motion';

/**
 * MarqueeBanner — Simple horizontal scrolling text strip.
 * Interactivity and physics have been removed for maximum performance.
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

    const repeatedText = `${text}${separator}`.repeat(8);

    return (
        <div className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 relative ${className}`}>
            <motion.div className="inline-block">
                <motion.span
                    className="inline-block font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground/10 uppercase tracking-wider select-none"
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
