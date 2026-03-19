import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'link' | 'media';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');

  const updateCursorState = useCallback((target: Element | null) => {
    if (!target) return;
    const el = target as HTMLElement;

    let newState: CursorState = 'default';
    if (el.closest('[data-cursor-media]') || el.closest('video') || el.closest('.aspect-video')) {
      newState = 'media';
    } else if (el.closest('[data-cursor-hover]') || el.closest('a') || el.closest('button')) {
      newState = 'hover';
    } else if (el.closest('[data-cursor-link]')) {
      newState = 'link';
    }
    setCursorState(newState);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      updateCursorState(document.elementFromPoint(e.clientX, e.clientY));
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const animate = () => {
      const dotLerp = 0.2;
      position.current.x += (targetPosition.current.x - position.current.x) * dotLerp;
      position.current.y += (targetPosition.current.y - position.current.y) * dotLerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPosition.current.x}px, ${targetPosition.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [updateCursorState]);

  const ringSize = cursorState === 'default' ? 32 : cursorState === 'hover' ? 64 : cursorState === 'media' ? 72 : 48;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
      >
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: cursorState === 'default' ? 6 : 0,
            height: cursorState === 'default' ? 6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
      >
        <motion.div
          className="rounded-full border-2 flex items-center justify-center"
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor: cursorState === 'default'
              ? 'hsl(var(--foreground) / 0.3)'
              : 'hsl(var(--accent))',
            backgroundColor: cursorState === 'hover'
              ? 'hsl(var(--accent) / 0.1)'
              : cursorState === 'media'
                ? 'hsl(var(--accent) / 0.15)'
                : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <AnimatePresence mode="wait">
            {cursorState === 'hover' && (
              <motion.span
                key="view"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[8px] font-bold tracking-[0.15em] text-accent uppercase"
              >
                VIEW
              </motion.span>
            )}
            {cursorState === 'media' && (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <path d="M1 1L13 8L1 15V1Z" fill="hsl(var(--accent))" />
                </svg>
              </motion.div>
            )}
            {cursorState === 'link' && (
              <motion.span
                key="arrow"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-accent text-sm"
              >
                →
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default CustomCursor;
