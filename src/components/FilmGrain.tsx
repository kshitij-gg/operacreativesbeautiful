import { useEffect, useRef } from 'react';

/**
 * FilmGrain — a subtle animated noise texture overlay that gives
 * the entire page a cinematic, analog film look. Like watching
 * the page through a vintage camera viewfinder.
 */
const FilmGrain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const resize = () => {
            canvas.width = window.innerWidth / 2; // Half-res for performance
            canvas.height = window.innerHeight / 2;
        };
        resize();
        window.addEventListener('resize', resize);

        const renderGrain = () => {
            const w = canvas.width;
            const h = canvas.height;
            const imageData = ctx.createImageData(w, h);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const grain = Math.random() * 40;
                data[i] = grain;     // R
                data[i + 1] = grain; // G
                data[i + 2] = grain; // B
                data[i + 3] = 18;    // A — very subtle
            }
            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(renderGrain);
        };

        renderGrain();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
            style={{ mixBlendMode: 'overlay', opacity: 0.4 }}
        />
    );
};

export default FilmGrain;
