import { useEffect, useRef, useState } from 'react';
import { Video, Palette, Megaphone, Film, Image } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    icon: Video,
    title: 'AI Video Production',
    description:
      'End-to-end AI-generated video content from concept and scripting to final rendered output. This includes commercials, brand films, explainers, and social media video, all crafted with cutting-edge generative AI.',
  },
  {
    icon: Palette,
    title: 'AI Visual Design',
    description:
      'Stunning AI-generated visuals for campaigns, branding, social media, and digital platforms. High-resolution, on-brand imagery produced at speed and scale.',
  },
  {
    icon: Megaphone,
    title: 'AI Advertising & UGC',
    description:
      'Scroll-stopping AI-generated ads and UGC-style content optimized for performance marketing. Built to convert, designed to go viral.',
  },
  {
    icon: Film,
    title: 'AI Film Production',
    description:
      'Pushing the boundaries of filmmaking with fully AI-generated short films, concept trailers, and cinematic narratives.',
  },
  {
    icon: Image,
    title: 'AI Thumbnails & Creatives',
    description:
      'Click-worthy YouTube thumbnails, social media creatives, and campaign assets, all AI-generated with precision and intent.',
  },
];

const ServiceRow = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isActive, setIsActive] = useState(false);
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      className="group border-b border-border relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* S1: Giant faded number prefix */}
      <motion.span
        className="absolute left-0 top-1/2 -translate-y-1/2 font-heading text-[5rem] md:text-[6rem] leading-none text-foreground/[0.04] pointer-events-none select-none hidden md:block"
        initial={{ x: -40, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08 + 0.2 }}
      >
        {num}
      </motion.span>

      {/* S2: Row with full background shift on hover */}
      <div
        className={`py-8 cursor-pointer transition-all duration-400 ${isActive ? 'bg-accent/[0.04] px-6 md:pl-24 -mx-6' : 'md:pl-20'
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 md:gap-6">
            <div
              className={`p-3 rounded-lg transition-all duration-300 ${isActive
                  ? 'bg-accent text-white shadow-[0_0_20px_hsl(var(--accent)/0.3)]'
                  : 'bg-muted text-muted-foreground'
                }`}
            >
              <Icon size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-heading text-foreground">
              {service.title}
            </h3>
          </div>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-accent scale-150' : 'bg-muted-foreground/30'
              }`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
        >
          <p className="text-muted-foreground leading-relaxed pl-[60px] md:pl-[66px]">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.span
          className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          WHAT WE DO
        </motion.span>

        {/* S3: Updated copy */}
        <motion.h2
          className="mt-6 font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Craft. Your Vision.
        </motion.h2>

        <div className="mt-16 space-y-1">
          {services.map((service, index) => (
            <ServiceRow key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
