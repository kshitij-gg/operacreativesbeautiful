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
            className="hidden lg:flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="relative">
              <span className="absolute -top-12 -left-6 font-heading text-[10rem] text-accent/10 leading-none select-none pointer-events-none">
                "
              </span>
              <blockquote className="relative z-10 pl-2">
                <p className="font-heading text-3xl md:text-4xl xl:text-5xl text-foreground/80 leading-snug italic">
                  Every great project starts with a conversation.
                </p>
                <footer className="mt-6 font-mono text-sm text-muted-foreground tracking-wider uppercase">
                  - Opera Creatives
                </footer>
              </blockquote>
            </div>

            <div className="mt-16 space-y-4 border-t border-border/30 pt-8">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Email</span>
                <p className="text-foreground mt-1">hello@operacreatives.com</p>
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Response Time</span>
                <p className="text-foreground mt-1">Within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
