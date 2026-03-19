import { useEffect, useRef } from 'react';

/**
 * FilmGrain — animated noise overlay that responds to scroll speed.
 * Faster scrolling = more grain intensity + vignette + motion blur feel.
 */
const FilmGrain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollSpeed = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let lastScrollY = window.scrollY;
        let lastTime = performance.now();

        const resize = () => {
            canvas.width = window.innerWidth / 2;
            canvas.height = window.innerHeight / 2;
        };
        resize();
        window.addEventListener('resize', resize);

        // Track scroll velocity
        const handleScroll = () => {
            const now = performance.now();
            const dt = Math.max(now - lastTime, 1);
            const dy = Math.abs(window.scrollY - lastScrollY);
            const velocity = dy / dt; // px per ms
            // Smooth the speed value (0-1 range, 1 = very fast)
            scrollSpeed.current += (Math.min(velocity * 0.8, 1) - scrollSpeed.current) * 0.15;
            lastScrollY = window.scrollY;
            lastTime = now;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const renderGrain = () => {
            const w = canvas.width;
            const h = canvas.height;

            // Decay scroll speed naturally when not scrolling
            scrollSpeed.current *= 0.96;

            const speed = scrollSpeed.current;
            const grainAlpha = 18 + speed * 50; // base 18, up to 68 at max speed

            // Draw grain
            const imageData = ctx.createImageData(w, h);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const grain = Math.random() * (40 + speed * 80);
                data[i] = grain;
                data[i + 1] = grain;
                data[i + 2] = grain;
                data[i + 3] = grainAlpha;
            }
            ctx.putImageData(imageData, 0, 0);

            // Draw vignette overlay at high speed
            if (speed > 0.05) {
                const vignetteAlpha = speed * 0.4;
                const gradient = ctx.createRadialGradient(
                    w / 2, h / 2, w * 0.25,
                    w / 2, h / 2, w * 0.7
                );
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, `rgba(0,0,0,${vignetteAlpha})`);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            }

            // Draw horizontal motion streaks at high speed
            if (speed > 0.15) {
                const streakCount = Math.floor(speed * 20);
                ctx.strokeStyle = `rgba(255,255,255,${speed * 0.04})`;
                ctx.lineWidth = 1;
                for (let s = 0; s < streakCount; s++) {
                    const y = Math.random() * h;
                    const startX = Math.random() * w;
                    const len = 20 + Math.random() * speed * 120;
                    ctx.beginPath();
                    ctx.moveTo(startX, y);
                    ctx.lineTo(startX + len, y);
                    ctx.stroke();
                }
            }

            animationId = requestAnimationFrame(renderGrain);
        };

        renderGrain();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
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
