import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TypewriterText — types out text letter by letter when it scrolls 
 * into view. Includes a blinking cursor at the end.
 * Like watching a screenwriter draft a line in real time.
 */

interface TypewriterTextProps {
    children: string;
    className?: string;
    speed?: number;    // ms per character
    delay?: number;    // ms before start
    once?: boolean;
    showCursor?: boolean;
}

const TypewriterText = ({
    children,
    className = '',
    speed = 40,
    delay = 300,
    once = true,
    showCursor = true,
}: TypewriterTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-5% 0px' });
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        setIsTyping(true);
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < children.length) {
                    setDisplayText(children.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, children, speed, delay]);

    return (
        <span ref={ref} className={className}>
            {displayText}
            {showCursor && (
                <motion.span
                    className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle"
                    animate={{ opacity: isTyping ? 1 : [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: isTyping ? 0 : Infinity,
                        repeatType: 'reverse',
                    }}
                />
            )}
        </span>
    );
};

export default TypewriterText;
