import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * SmoothScroll — Lenis driven by GSAP ticker.
 *
 * • Using gsap.ticker ensures Lenis and all GSAP ScrollTriggers share ONE
 *   requestAnimationFrame loop — eliminates the dual-rAF overhead.
 * • lerp 0.12 gives a smooth but responsive scroll (0.07 was too sluggish).
 * • duration 1.1 keeps the glide without feeling laggy.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
    });

    // Share the GSAP ticker — one rAF loop for both Lenis + GSAP ScrollTrigger
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);  // prevent GSAP from dropping frames after tab focus

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
