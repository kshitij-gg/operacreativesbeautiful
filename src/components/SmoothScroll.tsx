import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — wraps the entire app with Lenis for buttery-smooth
 * inertia scrolling (like 27b.com). Think of it as upgrading from
 * a bicycle to a Rolls-Royce for scroll feel.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
