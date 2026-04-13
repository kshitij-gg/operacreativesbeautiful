import { motion } from 'framer-motion';

/**
 * LogoSignature — SVG-based "OPERA" text that draws itself stroke by
 * stroke on page load, like a signature being written. Then it fills 
 * in with solid color. Very premium, very cinematic.
 */

const LogoSignature = () => {
    const pathVariants = {
        hidden: {
            pathLength: 0,
            opacity: 0,
            fill: 'rgba(255,255,255,0)',
        },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            fill: 'rgba(255,255,255,1)',
            transition: {
                pathLength: {
                    delay: i * 0.15,
                    duration: 1.2,
                    ease: 'easeOut' as const,
                },
                fill: {
                    delay: i * 0.15 + 1,
                    duration: 0.6,
                },
                opacity: {
                    delay: i * 0.15,
                    duration: 0.01,
                },
            },
        }),
    };

    return (
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            <svg
                viewBox="0 0 500 60"
                className="w-full max-w-[280px] sm:max-w-[400px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* O */}
                <motion.text
                    x="10" y="48"
                    className="font-heading"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: '56px' }}
                    stroke="white"
                    strokeWidth="1.5"
                    custom={0}
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                >
                    O
                </motion.text>
                {/* P */}
                <motion.text
                    x="60" y="48"
                    className="font-heading"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: '56px' }}
                    stroke="white"
                    strokeWidth="1.5"
                    custom={1}
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                >
                    P
                </motion.text>
                {/* E */}
                <motion.text
                    x="105" y="48"
                    className="font-heading"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: '56px' }}
                    stroke="white"
                    strokeWidth="1.5"
                    custom={2}
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                >
                    E
                </motion.text>
                {/* R */}
                <motion.text
                    x="148" y="48"
                    className="font-heading"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: '56px' }}
                    stroke="white"
                    strokeWidth="1.5"
                    custom={3}
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                >
                    R
                </motion.text>
                {/* A */}
                <motion.text
                    x="198" y="48"
                    className="font-heading"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: '56px' }}
                    stroke="white"
                    strokeWidth="1.5"
                    custom={4}
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                >
                    A
                </motion.text>
            </svg>
        </motion.div>
    );
};

export default LogoSignature;
