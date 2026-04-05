/**
 * SectionCurtain — Optimized
 * The frame-by-frame Framer Motion scroll tracker has been removed to reduce DOM load.
 * Now acts as a standard passthrough section wrapper.
 */

interface SectionCurtainProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
}

const SectionCurtain = ({ children, className = '' }: SectionCurtainProps) => {
    return (
        <div className={`relative ${className}`}>
            {children}
        </div>
    );
};

export default SectionCurtain;
