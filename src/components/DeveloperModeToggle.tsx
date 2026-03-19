import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

/**
 * DeveloperModeToggle — An easter egg toggle that strips the cinematic UI 
 * and reveals the "raw data" wireframe of the site using aggressive CSS overrides.
 */
const DeveloperModeToggle = () => {
    const [isDevMode, setIsDevMode] = useState(false);

    useEffect(() => {
        if (isDevMode) {
            document.documentElement.classList.add('dev-mode-active');
        } else {
            document.documentElement.classList.remove('dev-mode-active');
        }

        return () => {
            document.documentElement.classList.remove('dev-mode-active');
        };
    }, [isDevMode]);

    return (
        <div className="relative group">
            <button
                onClick={() => setIsDevMode(!isDevMode)}
                className={`p-3 rounded-full border transition-all duration-500 ${
                    isDevMode 
                        ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.5)]' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
                title="Toggle System Override"
            >
                <Terminal size={16} />
            </button>

            {/* Global CSS injection for Dev Mode */}
            {isDevMode && (
                <style>{`
                    /* The Matrix / Wireframe Override */
                    .dev-mode-active body {
                        background-color: #05100c !important;
                    }
                    .dev-mode-active * {
                        color: #00ffcc !important;
                        border-color: rgba(0, 255, 204, 0.3) !important;
                        box-shadow: inset 0 0 1px rgba(0, 255, 204, 0.2) !important;
                        text-shadow: 0 0 5px rgba(0, 255, 204, 0.5) !important;
                        font-family: monospace !important;
                        border-radius: 0 !important;
                    }

                    /* Convert images and videos into glowing topographic scans */
                    .dev-mode-active img, 
                    .dev-mode-active video {
                        filter: grayscale(100%) contrast(200%) invert(100%) sepia(100%) hue-rotate(130deg) saturate(300%) opacity(0.6) !important;
                        mix-blend-mode: screen !important;
                        background: none !important;
                        border: 1px solid #00ffcc !important;
                    }

                    /* Disable standard gradients and backgrounds to reveal the structure */
                    .dev-mode-active [class*="bg-gradient"],
                    .dev-mode-active [class*="bg-black"],
                    .dev-mode-active [class*="bg-white"] {
                        background: transparent !important;
                    }

                    /* Add scanning line overlay to the entire screen */
                    .dev-mode-active::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        background: linear-gradient(
                            to bottom,
                            rgba(0, 255, 204, 0),
                            rgba(0, 255, 204, 0.03) 50%,
                            rgba(0, 255, 204, 0)
                        );
                        background-size: 100% 4px;
                        pointer-events: none;
                        z-index: 2147483647; /* absolute maximum */
                        animation: scanline 10s linear infinite;
                    }

                    @keyframes scanline {
                        0% { background-position: 0 0; }
                        100% { background-position: 0 100vh; }
                    }
                `}</style>
            )}
        </div>
    );
};

export default DeveloperModeToggle;
