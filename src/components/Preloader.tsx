import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fake loading progress for dramatic cinematic effect
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                // Randomize speed of progress to feel realistic
                const step = Math.floor(Math.random() * 15) + 5;
                return Math.min(prev + step, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100000] flex flex-col items-center justify-between bg-black text-white px-6 py-12"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Top Logo text */}
                    <div className="w-full flex justify-between items-start font-mono text-xs tracking-widest uppercase opacity-60">
                        <span>Opera Creatives</span>
                        <span>AI Film Production</span>
                    </div>

                    {/* Center Progress Number */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <motion.div
                            className="font-heading text-[15vw] leading-none mb-10 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {String(progress).padStart(3, '0')}
                            <span className="text-[5vw] text-accent">%</span>
                        </motion.div>

                        {/* Loading progress bar */}
                        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                style={{ width: `${progress}%` }}
                                layout
                            />
                        </div>
                        <p className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                            Initializing AI Core
                        </p>
                        
                        {/* Desktop Preferred Badge */}
                        <motion.div
                            className="mt-8 border border-accent/40 bg-accent/5 px-6 py-3 rounded-sm backdrop-blur-md"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <span className="font-mono text-xs sm:text-sm tracking-[0.5em] text-accent font-bold uppercase block text-center">
                                Desktop Preferred
                            </span>
                        </motion.div>
                    </div>

                    {/* Bottom status text (random tech jargon) */}
                    <div className="w-full flex justify-between items-end font-mono text-[10px] tracking-widest text-white/30 uppercase">
                        <span>Loading Assets...</span>
                        <span>[{progress === 100 ? 'READY' : 'WAIT'}]</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
