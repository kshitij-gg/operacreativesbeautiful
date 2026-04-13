import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const visualProjects = [
  { id: 1, title: 'THE ARIA CAMPAIGN', category: 'Fashion Co · Visual Campaign', tag: '▶ AI FILM',    note: '"Shot entirely with soul & wit — 48 hours, start to finish."', image: 'https://images.pexels.com/photos/14234280/pexels-photo-14234280.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 2, title: 'NEON PULSE',        category: 'Tech Brand · Campaign',        tag: '▶ CAMPAIGN',   note: '"2.4M views in 72 hours. AI-first social campaign."',          image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 3, title: 'VELOCITY',          category: 'Automotive · Commercial',      tag: '▶ COMMERCIAL', note: '"Where AI meets automotive perfection."',                       image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1280' },
];

// All portrait 3:4 — eight images per row, three rows ( rows shift direction)
const ROW1 = [
  { id:  1, title: 'LUXURY ESSENTIALS', category: 'Product · AI',           note: '"Generated pure product aesthetics."',        image: 'https://images.pexels.com/photos/1126935/pexels-photo-1126935.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  2, title: 'SILK & SHADOW',     category: 'Fashion · Portrait',      note: '"Cinematic lighting meets haute couture."',   image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  3, title: 'AURIC GLOW',        category: 'Beauty · Portrait',       note: '"AI skin. Human soul."',                     image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  4, title: 'AMBER RITUAL',      category: 'Fragrance · Still Life',  note: '"The scent of something rare."',             image: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  5, title: 'VOID THEORY',       category: 'Fashion · Concept',       note: '"Absence as a design element."',             image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  6, title: 'ZENITH DROP',       category: 'Streetwear · Editorial',  note: '"Culture at its peak."',                    image: 'https://images.pexels.com/photos/5698401/pexels-photo-5698401.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  7, title: 'VELVET CRUSH',      category: 'Fashion · Campaign',      note: '"Luxury distilled into pixels."',            image: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id:  8, title: 'GOLDEN HOUR',       category: 'Lifestyle · Campaign',    note: '"Every second is cinematic."',              image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const ROW2 = [
  { id:  9, title: 'MIDNIGHT BLOOM',    category: 'Beauty · Editorial',      note: '"Dark aesthetics, luminous skin."',         image: 'https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 10, title: 'STONE COLD',        category: 'Jewellery · Still',       note: '"Timeless objects, timeless ads."',         image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 11, title: 'THE RITUAL',        category: 'Wellness · Brand',        note: '"Calm, by design."',                        image: 'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 12, title: 'CELESTIAL',         category: 'Jewellery · Editorial',   note: '"Light becomes jewellery."',               image: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 13, title: 'NEO-FUTURE',        category: 'Concept · Vertical',      note: '"Worldbuilding through still frames."',     image: 'https://images.pexels.com/photos/6620577/pexels-photo-6620577.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 14, title: 'ARCHITECTURAL',     category: 'Real Estate · AI',        note: '"Precision rendering of unbuilt spaces."',  image: 'https://images.pexels.com/photos/1638841/pexels-photo-1638841.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 15, title: 'GHOST BLOOM',       category: 'Perfume · Concept',       note: '"Invisible. Unforgettable."',              image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 16, title: 'PRISM',             category: 'Abstract · Art',          note: '"Color as language."',                      image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const ROW3 = [
  { id: 17, title: 'CHROME NOIR',       category: 'Automotive · Editorial',  note: '"Where machines become art."',             image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 18, title: 'COBALT RUSH',       category: 'Sports · Campaign',       note: '"Performance visualised."',                image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 19, title: 'EMBER',             category: 'Spirits · Campaign',      note: '"Heat you can taste."',                    image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 20, title: 'OBSIDIAN',          category: 'Tech · Product',          note: '"Dark matter, premium feel."',             image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 21, title: 'STEEL HORIZON',     category: 'Industrial · Brand',      note: '"Engineering meets artistry."',            image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 22, title: 'DESERT LIGHT',      category: 'Lifestyle · Travel',      note: '"Stillness you can feel."',               image: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 23, title: 'NEON PULSE',        category: 'Tech · Campaign',         note: '"2.4M views in 72 hours."',               image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 24, title: 'HORIZON PRIME',     category: 'Automotive · Panorama',   note: '"Unleashing speed in still perfection."',  image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

type LightboxItem = { src: string; title: string; category: string; note: string } | null;

// ── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ item, onClose }: { item: LightboxItem; onClose: () => void }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}
        >
          <button onClick={onClose} aria-label="Close"
            style={{ position: 'absolute', top: 20, right: 24, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <motion.img src={item.src} alt={item.title}
            initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 40px 120px rgba(0,0,0,0.8)', cursor: 'default' }}
          />
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ marginTop: 24, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff6b6b', display: 'block', marginBottom: 6 }}>{item.category}</span>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: '#fff', letterSpacing: '0.06em', margin: 0 }}>{item.title}</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{item.note}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Single 3:4 card — 47vh tall so 2 rows fill the viewport ─────────────────
const StaticCard = ({ item, onOpen }: { item: typeof ROW1[0]; onOpen: (item: typeof ROW1[0]) => void }) => (
  <div
    onClick={() => onOpen(item)}
    className="group relative overflow-hidden cursor-zoom-in flex-shrink-0"
    style={{
      height: '47vh',        // half-screen height → 2 rows ≈ full viewport
      aspectRatio: '3/4',    // width auto-derived ≈ 35vw
      borderRadius: 10,
      marginRight: 14,
      minHeight: 300,        // floor for very small screens
    }}
  >
    <img
      src={item.image}
      alt={item.title}
      loading="lazy"
      decoding="async"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.55s ease', willChange: 'transform' }}
      className="group-hover:scale-[1.06]"
    />
    {/* Hover overlay */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 55%)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 16px' }} className="group-hover:!opacity-100">
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ff6b6b', marginBottom: 5, display: 'block' }}>{item.category}</span>
      <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: '#fff', letterSpacing: '0.04em', margin: 0 }}>{item.title}</h4>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>🔍 Click to expand</span>
    </div>
    {/* Badge */}
    <div style={{ position: 'absolute', top: 10, left: 10 }} className="group-hover:opacity-0 transition-opacity duration-200">
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', background: 'rgba(255,255,255,0.93)', padding: '3px 10px', borderRadius: 99 }}>■ STATIC</span>
    </div>
  </div>
);

// ── Marquee row — -50% trick: seamless loop at any viewport size ─────────────
const MarqueeRow = ({
  items,
  direction = 'left',
  speed = 40,
  paused = false,
  onOpen,
}: {
  items: typeof ROW1;
  direction?: 'left' | 'right';
  speed?: number;
  paused?: boolean;
  onOpen: (item: typeof ROW1[0]) => void;
}) => {
  const doubled = [...items, ...items]; // duplicate → animate by exactly -50% for seamless loop
  const id      = direction === 'left' ? 'smql' : 'smqr';

  return (
    <div style={{ overflow: 'hidden', width: '100%', flexShrink: 0 }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${id} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <StaticCard key={`${item.id}-${i}`} item={item} onOpen={onOpen} />
        ))}
      </div>
      <style>{`
        @keyframes smql { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes smqr { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
      `}</style>
    </div>
  );
};

// ── Portfolio Section ─────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true,  margin: '-10%' });
  const tabInView  = useInView(sectionRef, { once: false, margin: '0px'  }); // for pausing marquee
  const [hovered, setHovered]     = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'static'>('visual');
  const [lightbox, setLightbox]   = useState<LightboxItem>(null);

  const openLightbox = useCallback((p: typeof ROW1[0]) => {
    setLightbox({ src: p.image, title: p.title, category: p.category, note: p.note });
  }, []);

  return (
    <section
      id="portfolio"
      data-section="3"
      data-bg="#FFFFFF"
      ref={sectionRef}
      className="py-20 sm:py-28 md:py-36 relative"
      style={{ backgroundColor: '#FFFFFF', color: '#111111' }}
    >
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="font-heading animate-text-rainbow" style={{ fontSize: 'clamp(5rem,14vw,200px)', lineHeight: 0.85, textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>OUR WORK.</h2>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div className="flex justify-center mt-12 gap-4" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          {(['visual', 'static'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="font-mono text-[12px] tracking-[0.1em] uppercase px-8 py-3 rounded-full transition-all duration-300"
              style={{ background: activeTab === tab ? '#111' : 'transparent', color: activeTab === tab ? '#fff' : '#111', border: '2px solid #111' }}>
              {tab === 'visual' ? 'Visual Ads' : 'Static Ads'}
            </button>
          ))}
        </motion.div>

        {/* VISUAL ADS */}
        {activeTab === 'visual' && (
          <div className="mt-16 flex flex-col gap-12 max-w-[1400px] mx-auto min-h-[1000px]">
            {visualProjects.map((p, i) => (
              <motion.div key={p.id} className="relative w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: '16/9', background: '#111', cursor: 'pointer' }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered === i ? 'scale(1.04)' : 'scale(1)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.82))' }} />
                <div className="absolute top-4 left-4 z-10"><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', background: 'rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.2)' }}>{p.tag}</span></div>
                <div className="absolute top-4 right-4 z-10"><div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: '1.5px solid rgba(255,255,255,0.5)', background: hovered === i ? 'white' : 'rgba(0,0,0,0.3)' }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}><polygon points="3,2 10,6 3,10" fill={hovered === i ? '#000' : 'white'} /></svg></div></div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.55, color: 'white', display: 'block' }}>{p.category}</span>
                  <h3 className="font-heading text-white mt-1" style={{ fontSize: 28 }}>{p.title}</h3>
                  <div style={{ maxHeight: hovered === i ? 60 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease', fontFamily: "'DM Sans',sans-serif", fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>{p.note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* STATIC ADS — three scrolling marquee rows, all 3:4, with gaps */}
      {activeTab === 'static' && (
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ backgroundColor: '#0d0d0d', paddingTop: 32, paddingBottom: 32 }}
        >
          {/* Full-bleed strip */}
          <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100vw', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Row 1 — drifts left */}
            <MarqueeRow items={ROW1} direction="left"  speed={48} paused={!tabInView} onOpen={openLightbox} />
            {/* Row 2 — drifts right */}
            <MarqueeRow items={ROW2} direction="right" speed={38} paused={!tabInView} onOpen={openLightbox} />
            {/* Row 3 — drifts left, slower */}
            <MarqueeRow items={ROW3} direction="left"  speed={55} paused={!tabInView} onOpen={openLightbox} />
          </div>
        </motion.div>
      )}

    </section>
  );
};

export default PortfolioSection;
