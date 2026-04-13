import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * TiltCard — a card that tilts in 3D toward the cursor on hover,
 * creating an interactive, tactile feel. Like holding a physical
 * card and tilting it to catch the light.
 */

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
    glareOpacity?: number;
}

const TiltCard = ({
    children,
    className = '',
    tiltStrength = 15,
    glareOpacity = 0.15,
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            x: (y - 0.5) * tiltStrength,
            y: (x - 0.5) * -tiltStrength,
        });
        setGlare({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {children}
            {/* Light glare effect */}
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
                    }}
                />
            )}
        </motion.div>
    );
};

export default TiltCard;
