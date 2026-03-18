import { motion } from 'framer-motion';

/**
 * GradientMesh — a very subtle, slowly animated gradient mesh background.
 * Deep purples, dark reds, and blacks that drift slowly. Barely noticeable
 * but makes the page feel alive, like light shifting through a cinema.
 */
const GradientMesh = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            <motion.div
                className="absolute w-[80vw] h-[80vh] rounded-full blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(120,30,60,0.3) 0%, transparent 70%)',
                    top: '10%',
                    left: '-20%',
                }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <motion.div
                className="absolute w-[60vw] h-[60vh] rounded-full blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(40,10,80,0.25) 0%, transparent 70%)',
                    top: '50%',
                    right: '-15%',
                }}
                animate={{
                    x: [0, -120, 80, 0],
                    y: [0, 60, -100, 0],
                    scale: [1, 0.8, 1.15, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <motion.div
                className="absolute w-[50vw] h-[50vh] rounded-full blur-[90px]"
                style={{
                    background: 'radial-gradient(circle, rgba(180,50,30,0.15) 0%, transparent 70%)',
                    bottom: '10%',
                    left: '30%',
                }}
                animate={{
                    x: [0, 70, -90, 0],
                    y: [0, -50, 40, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
};

export default GradientMesh;
