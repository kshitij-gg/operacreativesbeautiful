import { useEffect, useState } from 'react';

const LABELS = ['01 / 07', '02 / 07', '03 / 07', '04 / 07', '05 / 07', '06 / 07', '07 / 07'];

const SectionIndicator = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.section ?? 0);
            if (idx <= 6) setCurrent(idx);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed right-6 top-1/2 z-40 pointer-events-none hidden md:flex"
      style={{
        writingMode: 'vertical-rl',
        transform: 'translateY(-50%) rotate(180deg)',
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.4)',
        mixBlendMode: 'difference',
      }}
    >
      {LABELS[current] || '01 / 07'}
    </div>
  );
};

export default SectionIndicator;
