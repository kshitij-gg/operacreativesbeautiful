import { motion } from 'framer-motion';

/**
 * MarqueeBanner — an infinitely scrolling horizontal text strip, 
 * like a film reel ticker. Sits between sections for a trendy 
 * creative agency feel.
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
    // Repeat the text enough times to fill the screen
    const repeatedText = `${text}${separator}`.repeat(6);

    return (
        <div className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 ${className}`}>
            <motion.div
                className="inline-block"
                animate={{
                    x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <span className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground/10 uppercase tracking-wider select-none">
                    {repeatedText}{repeatedText}
                </span>
            </motion.div>
        </div>
    );
};

export default MarqueeBanner;
