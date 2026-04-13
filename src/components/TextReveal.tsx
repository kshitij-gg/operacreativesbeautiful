import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TextReveal — Staggered line-by-line masked text reveal.
 *
 * Each line of text slides up from behind a clip mask with a slight
 * delay between lines. Creates the signature "Apple Keynote" reveal
 * effect used by top creative agencies.
 */

interface TextRevealProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    delay?: number;
    staggerDelay?: number;
}

const TextReveal = ({
    children,
    className = '',
    as: Tag = 'h2',
    delay = 0,
    staggerDelay = 0.12,
}: TextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });

    // Split text by newlines or by words that roughly fit a line
    const lines = children.split('\n').length > 1
        ? children.split('\n')
        : children.split('. ').map((s, i, arr) => i < arr.length - 1 ? s + '.' : s);

    // If only one line after splitting, just use the whole text
    const finalLines = lines.length === 1 ? [children] : lines;

    return (
        <div ref={ref} className={className}>
            <Tag className="m-0">
                {finalLines.map((line, i) => (
                    <span key={i} className="block overflow-hidden">
                        <motion.span
                            className="block"
                            initial={{ y: '110%', opacity: 0 }}
                            animate={isInView ? { y: '0%', opacity: 1 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: delay + i * staggerDelay,
                                ease: [0.22, 1, 0.36, 1] as any,
                            }}
                        >
                            {line}
                        </motion.span>
                    </span>
                ))}
            </Tag>
        </div>
    );
};

export default TextReveal;
