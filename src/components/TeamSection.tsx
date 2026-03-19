import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * TeamSection — "Who's Behind The Magic" section with depth parallax portraits.
 * Each team member has layered elements that shift at different rates
 * on mouse move, creating a 3D window effect.
 */

const teamMembers = [
  {
    name: 'Alex Vizor',
    role: 'Creative Director',
    color: 'from-amber-500/20 to-orange-600/20',
    accent: 'text-amber-400',
    bio: 'Visionary mind behind every cinematic concept.',
  },
  {
    name: 'Maya Flux',
    role: 'AI Production Lead',
    color: 'from-violet-500/20 to-purple-600/20',
    accent: 'text-violet-400',
    bio: 'Masters the intersection of AI and art direction.',
  },
  {
    name: 'Kai Render',
    role: 'Post-Production Head',
    color: 'from-cyan-500/20 to-blue-600/20',
    accent: 'text-cyan-400',
    bio: 'Turns raw AI output into cinematic gold.',
  },
  {
    name: 'Nova Lens',
    role: 'Visual Design Lead',
    color: 'from-rose-500/20 to-red-600/20',
    accent: 'text-rose-400',
    bio: 'Crafts stunning visual identities and brand worlds.',
  },
];

const TeamCard = ({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Parallax offsets for different layers
  const bgOffsetX = (mousePos.x - 0.5) * -20;
  const bgOffsetY = (mousePos.y - 0.5) * -20;
  const midOffsetX = (mousePos.x - 0.5) * -10;
  const midOffsetY = (mousePos.y - 0.5) * -10;
  const fgOffsetX = (mousePos.x - 0.5) * 15;
  const fgOffsetY = (mousePos.y - 0.5) * 15;

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '800px' }}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] h-[400px] sm:h-[450px]">
        {/* Background layer — subtle gradient, moves slowest */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${member.color} transition-transform duration-300 ease-out`}
          style={{ transform: `translate(${bgOffsetX}px, ${bgOffsetY}px) scale(1.1)` }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] transition-transform duration-200 ease-out"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            transform: `translate(${midOffsetX}px, ${midOffsetY}px)`,
          }}
        />

        {/* Large number watermark — mid layer */}
        <div
          className="absolute top-6 right-6 font-heading text-[8rem] leading-none text-white/[0.03] select-none transition-transform duration-200 ease-out"
          style={{ transform: `translate(${midOffsetX}px, ${midOffsetY}px)` }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content — foreground layer, moves toward cursor */}
        <div
          className="relative z-10 h-full flex flex-col justify-end p-8 transition-transform duration-200 ease-out"
          style={{ transform: `translate(${fgOffsetX}px, ${fgOffsetY}px)` }}
        >
          {/* Decorative glow orb */}
          <div
            className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[60px] bg-gradient-to-br ${member.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Role chip */}
          <span className={`font-mono text-[10px] tracking-[0.25em] ${member.accent} uppercase mb-3 block`}>
            {member.role}
          </span>

          {/* Name */}
          <h3 className="font-heading text-3xl sm:text-4xl text-white mb-3 group-hover:text-accent transition-colors duration-300">
            {member.name}
          </h3>

          {/* Bio */}
          <p className="text-white/50 text-sm font-mono leading-relaxed max-w-[250px]">
            {member.bio}
          </p>

          {/* Decorative line */}
          <div className="mt-6 h-[2px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-accent/50 transition-all duration-500" />
        </div>

        {/* Floating particle dots — far foreground */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none transition-transform duration-150 ease-out"
          style={{ transform: `translate(${fgOffsetX * 1.5}px, ${fgOffsetY * 1.5}px)` }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${15 + i * 18}%`,
                top: `${10 + (i * 37) % 60}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-accent/30 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-background overflow-clip"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              The Team
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
            Who's Behind <br className="hidden sm:block" />
            <span className="text-accent italic">The Magic?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-lg mx-auto">
            Four creative minds pushing the boundaries of AI filmmaking.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
