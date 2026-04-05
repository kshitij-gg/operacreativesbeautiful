import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useInView } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'N/A'}`,
        '',
        'Project details:',
        message,
      ].join('\n')
    );

    window.location.href = `mailto:hello@operacreatives.com?subject=${subject}&body=${body}`;

    toast({
      title: 'Opening your email client',
      description: 'Your message draft is ready to send to Opera Creatives.',
    });

    e.currentTarget.reset();
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 lg:py-48 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={itemVars}
              className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase"
            >
              GET IN TOUCH
            </motion.span>

            <motion.h2
              variants={itemVars}
              className="mt-3 sm:mt-4 font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Your Next Project Starts Here.
            </motion.h2>

            <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 space-y-5 sm:space-y-6">
              <motion.div variants={itemVars} className="input-focus-line">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 sm:py-4 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
                />
              </motion.div>

              <motion.div variants={itemVars} className="input-focus-line">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 sm:py-4 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
                />
              </motion.div>

              <motion.div variants={itemVars} className="input-focus-line">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 sm:py-4 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
                />
              </motion.div>

              <motion.div variants={itemVars} className="input-focus-line">
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 sm:py-4 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground resize-none text-sm sm:text-base"
                />
              </motion.div>

              <motion.div variants={itemVars} className="pt-4 sm:pt-6">
                <Button
                  type="submit"
                  className="bg-foreground hover:bg-foreground/90 text-background px-10 sm:px-12 py-5 sm:py-6 text-sm sm:text-base font-medium tracking-wide transition-all duration-300 rounded-full w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            className="hidden lg:grid grid-cols-2 gap-4 xl:gap-5 place-content-center h-full"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Email Box */}
            <a
              href="mailto:hello@operacreatives.com"
              className="group relative flex flex-col justify-end p-6 xl:p-8 h-40 xl:h-52 bg-[#0A0A0A] hover:bg-[#111111] rounded-3xl overflow-hidden transition-all duration-500 border border-white/[0.03] hover:border-white/[0.08]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none opacity-50" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-heading text-2xl xl:text-4xl text-white group-hover:text-accent transition-colors duration-500 leading-none">Email</span>
                <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase opacity-70 break-all line-clamp-1">hello@operacreatives.com</span>
              </div>
            </a>

            {/* Instagram Box */}
            <a
              href="https://instagram.com/operacreatives_"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end p-6 xl:p-8 h-40 xl:h-52 bg-[#0A0A0A] hover:bg-[#111111] rounded-3xl overflow-hidden transition-all duration-500 border border-white/[0.03] hover:border-white/[0.08]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none opacity-50" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-heading text-2xl xl:text-4xl text-white group-hover:text-pink-500 transition-colors duration-500 leading-none">Instagram</span>
                <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase opacity-70">@operacreatives_</span>
              </div>
            </a>

            {/* LinkedIn Box */}
            <a
              href="https://linkedin.com/company/operacreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end p-6 xl:p-8 h-40 xl:h-52 bg-[#0A0A0A] hover:bg-[#111111] rounded-3xl overflow-hidden transition-all duration-500 border border-white/[0.03] hover:border-white/[0.08]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none opacity-50" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-heading text-2xl xl:text-4xl text-white group-hover:text-blue-500 transition-colors duration-500 leading-none">LinkedIn</span>
                <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase opacity-70">@operacreatives</span>
              </div>
            </a>

            {/* Twitter Box */}
            <a
              href="https://twitter.com/operacreatives_"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end p-6 xl:p-8 h-40 xl:h-52 bg-[#0A0A0A] hover:bg-[#111111] rounded-3xl overflow-hidden transition-all duration-500 border border-white/[0.03] hover:border-white/[0.08]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none opacity-50" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-heading text-2xl xl:text-4xl text-white group-hover:text-neutral-300 transition-colors duration-500 leading-none">Twitter</span>
                <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase opacity-70">@operacreatives_</span>
              </div>
            </a>

            {/* YouTube Box */}
            <a
              href="https://youtube.com/@operacreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end p-6 xl:p-8 h-40 xl:h-52 bg-[#0A0A0A] hover:bg-[#111111] rounded-3xl overflow-hidden transition-all duration-500 border border-white/[0.03] hover:border-white/[0.08] col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none opacity-50" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-heading text-2xl xl:text-4xl text-white group-hover:text-red-500 transition-colors duration-500 leading-none">YouTube</span>
                <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase opacity-70">@operacreatives</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
