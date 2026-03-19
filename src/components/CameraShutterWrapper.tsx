import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useMotionValueEvent } from 'framer-motion';

/**
 * CameraShutterWrapper — Simulates a mechanical camera shutter when scrolling fast.
 * Triggers a momentary black flash and chromatic aberration (RGB split) 
 * on the wrapped content when scroll velocity crosses a high threshold.
 */

const CameraShutterWrapper = ({ children }: { children: React.ReactNode }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const [isShutterOpen, setIsShutterOpen] = useState(false);
    const [isChromatic, setIsChromatic] = useState(false);
    const cooldownRef = useRef(false);

    useMotionValueEvent(scrollVelocity, "change", (latestVelocity) => {
        // Trigger if scrolling extremely fast and not on cooldown
        if (Math.abs(latestVelocity) > 3000 && !cooldownRef.current) {
            cooldownRef.current = true;
            
            // 1. Fire the shutter blink
            setIsShutterOpen(true);
            setTimeout(() => {
                setIsShutterOpen(false);
                // 2. Fire the RGB chromatic split on the content exactly when shutter opens
                setIsChromatic(true);
                
                // Snap back to normal quickly
                setTimeout(() => {
                    setIsChromatic(false);
                }, 400); // Chromatic snap duration
            }, 60); // Tiny blink duration

            // Cooldown before it can happen again
            setTimeout(() => {
                cooldownRef.current = false;
            }, 1000);
        }
    });

    return (
        <div className="relative">
            {/* The Shutter Blade (Black overlay flash) */}
            <motion.div
                className="fixed inset-0 z-[9999] bg-black pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isShutterOpen ? 1 : 0 }}
                transition={{ duration: 0.05, ease: "linear" }}
            />

            {/* Invisible SVG Chromatic Aberration Filter */}
            <svg className="absolute w-0 h-0" style={{ pointerEvents: 'none' }}>
                <defs>
                    <filter id="chromatic-aberration" x="-10%" y="-10%" width="120%" height="120%">
                        {/* Red Channel shifted left */}
                        <feColorMatrix type="matrix" result="red" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
                        <feOffset in="red" result="redShift" dx="-8" dy="0" />

                        {/* Blue Channel shifted right */}
                        <feColorMatrix type="matrix" in="SourceGraphic" result="blue" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
                        <feOffset in="blue" result="blueShift" dx="8" dy="0" />

                        {/* Green Channel stays center */}
                        <feColorMatrix type="matrix" in="SourceGraphic" result="green" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
                        
                        {/* Blend them back together via Screen blending */}
                        <feBlend mode="screen" in="redShift" in2="green" result="blendRG"/>
                        <feBlend mode="screen" in="blendRG" in2="blueShift" result="blendRGB"/>
                        
                        {/* Reapply alpha from SourceGraphic to prevent hard black boxes around transparent areas */}
                        <feComposite in="blendRGB" in2="SourceGraphic" operator="in" />
                    </filter>
                </defs>
            </svg>

            {/* The Wrapped Content — Applies filter when chromatic state is active */}
            <motion.div
                className="will-change-transform"
                animate={{
                    filter: isChromatic ? 'url(#chromatic-aberration)' : 'url(#none)',
                    scale: isChromatic ? 1.01 : 1,
                }}
                transition={{
                    duration: isChromatic ? 0.05 : 0.4,
                    ease: isChromatic ? "linear" : "easeOut"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default CameraShutterWrapper;
