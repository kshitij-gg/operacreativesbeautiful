/**
 * FerrofluidBackground — Optimized ambient dark background.
 * Replaced heavy SVG displacement maps with a hardware-accelerated CSS animated gradient.
 */

const FerrofluidBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* Standard smooth animated radial gradient */}
            <div 
                className="absolute inset-[-50%] w-[200%] h-[200%] opacity-30"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.15) 0%, rgba(0,0,0,1) 40%), linear-gradient(45deg, rgba(200,200,255,0.05) 0%, rgba(0,0,0,0) 100%)',
                    animation: 'breathe-mesh 15s ease-in-out infinite alternate',
                    transformOrigin: 'center center'
                }}
            />

            <style>{`
                @keyframes breathe-mesh {
                    0% { transform: scale(1) translate(0%, 0%); }
                    100% { transform: scale(1.1) translate(-2%, -2%); }
                }
            `}</style>
        </div>
    );
};

export default FerrofluidBackground;
