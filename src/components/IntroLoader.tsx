import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OPERA CREATIVES — Elastic Strip Reveal
 *
 * 1. White screen. Logo fades in.
 * 2. Black arrow shoots from the left and hits the logo.
 * 3. On impact: the white screen + logo tear apart into 9 horizontal
 *    rubber strips. The CENTER strip (where arrow hit) exits RIGHT first
 *    and fastest. Top and bottom strips lag progressively — like elastic
 *    rubber being stretched and releasing.
 * 4. All strips cleared. Hero video (already buffered) is revealed.
 *
 * Total: 4.0s
 */

const NUM_STRIPS = 9;

// Distance from center determines delay + duration
const stripDelay    = (i: number): number => {
  const dist = Math.abs(i - (NUM_STRIPS - 1) / 2);
  return dist * 0.11;                         // 0 at center, grows outward
};
const stripDuration = (i: number): number => {
  const dist = Math.abs(i - (NUM_STRIPS - 1) / 2);
  return 0.55 + dist * 0.09;                 // faster at center, slower at edges
};

// ── Conductor's Baton ─────────────────────────────────────────────────────────────────
const Baton = () => (
  <svg width="350" height="60" viewBox="0 0 350 60" fill="none">
    {/* Elegant motion trails / Sheet music lines hint */}
    <line x1="10" y1="15" x2="140" y2="15" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" strokeLinecap="round" />
    <line x1="0" y1="22" x2="160" y2="22" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" strokeLinecap="round" />
    <line x1="20" y1="38" x2="130" y2="38" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" strokeLinecap="round" />
    <line x1="5" y1="45" x2="150" y2="45" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" strokeLinecap="round" />
    
    {/* Fast swoosh effect directly behind baton */}
    <path d="M20,30 Q80,25 150,30" stroke="rgba(192, 21, 42, 0.2)" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Baton Handle (Cork/Wood) */}
    <path d="M40,30 C40,24 45,24 50,24 L90,25 L90,35 L50,36 C45,36 40,36 40,30 Z" fill="#8B5A2B" />
    {/* Gold connection ring */}
    <rect x="88" y="24" width="6" height="12" rx="2" fill="#D4AF37" />
    
    {/* Black Tapered Shaft */}
    <polygon points="94,27 340,29.3 340,30.7 94,33" fill="#111111" />
    <polygon points="94,28 340,29.6 340,30.4 94,30" fill="#222222" />
  </svg>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const IntroLoader = ({ onDone }: { onDone: () => void }) => {
  const [logoIn,   setLogoIn]   = useState(false);
  const [batonFly, setBatonFly] = useState(false);
  const [impact,   setImpact]   = useState(false);  // Baton hits the logo, logo resists and squishes
  const [snap,     setSnap]     = useState(false);  // the elastic rubber tears, everything shoots out
  const [fadeOut,  setFadeOut]  = useState(false);  // graceful fade before unmount
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoIn(true),    200);    // logo fades in
    const t2 = setTimeout(() => setBatonFly(true),  1700);   // baton shoots from left
    const t3 = setTimeout(() => setImpact(true),    2050);   // baton hits the logo hitbox exactly
    const t4 = setTimeout(() => setSnap(true),      2450);   // extended 400ms tension build before SNAP!
    const t5 = setTimeout(() => setFadeOut(true),   3700);   // gentle fade
    const t6 = setTimeout(() => { setVisible(false); onDone(); }, 4100);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}
          animate={fadeOut ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >

          {/* ══ RUBBER STRIPS (9 horizontal bands) ══
              Each strip is a clipped white div.
              Center exits first (arrow hit), edges lag = rubber elasticity.       */}
          {Array.from({ length: NUM_STRIPS }, (_, i) => {
            const pct    = 100 / NUM_STRIPS;
            const top    = i * pct;
            const bottom = 100 - (i + 1) * pct;
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#ffffff',
                  clipPath: `inset(${top.toFixed(2)}% 0 ${bottom.toFixed(2)}% 0)`,
                  zIndex: 10,
                }}
                animate={
                  snap ? { x: '150vw' }
                  : (impact && Math.abs(i - 4) === 0) ? { x: '45px' } // Center strip dents deeper into wall
                  : (impact && Math.abs(i - 4) === 1) ? { x: '18px' } // Adjacent strips dent slightly
                  : { x: 0 }
                }
                transition={
                  snap ? {
                    duration: stripDuration(i) + 0.2,
                    ease: [0.5, 0, 1, 0.5], // smooth snap outward
                    delay: stripDelay(i),
                  }
                  : (impact && Math.abs(i - 4) <= 1) ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } // buttery slow squish
                  : {}
                }
              />
            );
          })}

          {/* ══ LOGO — gets pushed, squishes, then snaps outward ══ */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0, y: 18, x: 0 }}
            animate={
              snap       ? { x: '150vw', opacity: 1, y: 0 }
              : impact   ? { x: '60px',  opacity: 1, y: 0 } // pushed further right
              : logoIn   ? { opacity: 1, y: 0, x: 0 }
              : { opacity: 0, y: 18, x: 0 }
            }
            transition={
              snap       ? { duration: 0.5, ease: [0.5, 0, 1, 0.5] } 
              : impact   ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } // smooth resistance build-up
              : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {/* Inner container handles the elastic squish */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformOrigin: '75% center', // anchor to the right so left side compresses
              }}
              animate={
                snap     ? { scaleX: 1.15, scaleY: 0.95 } // stretches as it flies
                : impact ? { scaleX: 0.75, scaleY: 1.1 }  // extreme squish under tension
                : { scaleX: 1, scaleY: 1 }
              }
              transition={
                snap     ? { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
                : impact ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.2 }
              }
            >
            {/* Top rule */}
            <motion.div
              style={{ height: 2, background: '#8B0000', borderRadius: 2, marginBottom: 14 }}
              initial={{ width: 0 }}
              animate={logoIn ? { width: 'clamp(160px, 28vw, 420px)' } : { width: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            />

            {/* Wordmark */}
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(60px, 12vw, 164px)',
              lineHeight: 0.88,
              letterSpacing: '0.05em',
              color: '#111',
              display: 'block',
              textAlign: 'center',
            }}>
              OPERA<br />CREATIVES
            </span>

            {/* Bottom rule */}
            <motion.div
              style={{ height: 2, background: '#8B0000', borderRadius: 2, marginTop: 14 }}
              initial={{ width: 0 }}
              animate={logoIn ? { width: 'clamp(160px, 28vw, 420px)' } : { width: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.25 }}
            />

            {/* Tagline */}
            <motion.span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)',
                marginTop: 12,
              }}
              initial={{ opacity: 0 }}
              animate={logoIn ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              AI · Film · Production Studio
            </motion.span>
            </motion.div>
          </motion.div>

          {/* ══ BATON — flies in, pushes logo, snaps off ══ */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              marginTop: -27,   // center vertically
              zIndex: 30,
              pointerEvents: 'none',
            }}
            initial={{ x: '-360px' }}
            animate={
              snap       ? { x: '180vw' } // shoots off crazy fast
              : impact   ? { x: 'calc(50vw - 420px)' } // digs into the exact hitbox boundary, pushing it
              : batonFly ? { x: 'calc(50vw - 650px)' } // perfectly hits outer edge of text hitbox (50vw - 300px for text width)
              : { x: '-360px' }
            }
            transition={
              snap       ? { duration: 0.45, ease: [0.5, 0, 1, 0.5] } 
              : impact   ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } // buttery tension build
              : batonFly ? { duration: 0.35, ease: [0.8, 0, 1, 1] }  // accelerates sharply into impact
              : { duration: 0 }
            }
          >
            <Baton />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
