import { useEffect, useRef, useState } from 'react';
import toolMidjourney from '@/assets/tool-midjourney.png';
import toolClaude from '@/assets/tool-claude.png';
import toolChatgpt from '@/assets/tool-chatgpt.png';
import toolGemini from '@/assets/tool-gemini.png';
import toolGrok from '@/assets/tool-grok.png';
import toolBytedance from '@/assets/tool-bytedance.png';
import toolRLogo from '@/assets/tool-r-logo.png';
import toolWLogo from '@/assets/tool-w-logo.png';
import toolSwirl from '@/assets/tool-swirl.png';
import toolKling from '@/assets/tool-kling.png';
import toolFigma from '@/assets/tool-figma.png';
import toolElevenlabs from '@/assets/tool-elevenlabs.png';
import toolSuno from '@/assets/tool-suno.png';

interface ToolLogo {
  src: string;
  invertMode: 'dark' | 'light' | 'none';
}

const tools: ToolLogo[] = [
  { src: toolMidjourney, invertMode: 'dark' },
  { src: toolChatgpt, invertMode: 'dark' },
  { src: toolClaude, invertMode: 'none' },
  { src: toolGemini, invertMode: 'none' },
  { src: toolGrok, invertMode: 'dark' },
  { src: toolBytedance, invertMode: 'none' },
  { src: toolRLogo, invertMode: 'light' },
  { src: toolWLogo, invertMode: 'dark' },
  { src: toolSwirl, invertMode: 'light' },
  { src: toolKling, invertMode: 'light' },
  { src: toolFigma, invertMode: 'none' },
  { src: toolElevenlabs, invertMode: 'dark' },
  { src: toolSuno, invertMode: 'dark' },
];

const ToolsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <span
          className={`font-mono-tech text-xs sm:text-sm tracking-[0.2em] text-primary uppercase transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          OUR TOOLKIT
        </span>

        <h2
          className={`mt-4 sm:mt-6 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          Powered by the Best AI Tools on the Planet.
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="mt-10 sm:mt-16 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex items-center animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running', width: 'max-content' }}
        >
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-14 sm:h-16 md:h-20 w-24 sm:w-32 md:w-36 px-2 sm:px-3 md:px-4 inline-flex items-center justify-center"
            >
              <img
                src={tool.src}
                alt="AI tool logo"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                style={tool.invertMode === 'dark' ? { filter: 'invert(1)' } : {}}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;

