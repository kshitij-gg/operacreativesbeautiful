import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TextReveal — splits text into individual words/characters and
 * animates each one into view as the element scrolls into the viewport.
 * Like each word is being typed by an invisible filmmaker.
 */

interface TextRevealProps {
    children: string;
    className?: string;
    splitBy?: 'word' | 'char';
    delay?: number;
    staggerDelay?: number;
    once?: boolean;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const TextReveal = ({
    children,
    className = '',
    splitBy = 'word',
    delay = 0,
    staggerDelay = 0.04,
    once = true,
    as: Tag = 'h2',
}: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-10% 0px' });

    const units = splitBy === 'word'
        ? children.split(' ')
        : children.split('');

    return (
        <Tag ref={ref} className={`${className} overflow-hidden`}>
            {units.map((unit, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '110%', opacity: 0, rotateX: -90 }}
                    animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
                    transition={{
                        duration: 0.7,
                        delay: delay + i * staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: 'inline-block', perspective: '600px' }}
                >
                    {unit}{splitBy === 'word' ? '\u00A0' : ''}
                </motion.span>
            ))}
        </Tag>
    );
};

export default TextReveal;
