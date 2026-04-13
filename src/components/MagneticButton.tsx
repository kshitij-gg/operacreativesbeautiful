import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticButton({
    children,
    className = "",
    strength = 30 // How far it moves
}: {
    children: React.ReactNode,
    className?: string,
    strength?: number
}) {
    const ref = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(position.x, springConfig);
    const springY = useSpring(position.y, springConfig);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({
            x: (middleX / width) * strength,
            y: (middleY / height) * strength
        });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className={`relative inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
