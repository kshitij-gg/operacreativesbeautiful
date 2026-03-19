import { motion, useInView } from 'framer-motion';
import { Clapperboard, LayoutTemplate, LibraryBig, Sparkles } from 'lucide-react';
import { useRef } from 'react';

type AssetEntry = {
  fileName: string;
  label: string;
  src: string;
};

type NumberedSuite = {
  id: string;
  label: string;
  base?: string;
  clean?: string;
  vector?: string;
};

const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const videoModules = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const assetEntries = Object.entries(imageModules)
  .map(([path, src]) => {
    const fileName = path.split('/').pop() ?? path;
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const label = baseName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return { fileName, label, src };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }));

const stillAssets = assetEntries.filter(
  (entry) =>
    entry.fileName === 'hero-bg.jpg' ||
    entry.fileName.startsWith('portfolio-'),
);

const brandLogoAssets = assetEntries.filter(
  (entry) =>
    entry.fileName.startsWith('tool-') &&
    !/^tool-\d/.test(entry.fileName),
);

const numberedSuites: NumberedSuite[] = Array.from({ length: 10 }, (_, index) => {
  const id = `tool-${index + 1}`;
  const getAsset = (fileName: string) =>
    assetEntries.find((entry) => entry.fileName === fileName)?.src;

  return {
    id,
    label: `Suite ${index + 1}`,
    base: getAsset(`${id}.png`),
    clean: getAsset(`${id}-clean.png`),
    vector: getAsset(`${id}.svg`),
  };
}).filter((suite) => suite.base || suite.clean || suite.vector);

const motionAssets = Object.entries(videoModules)
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? path;
    return {
      fileName,
      src,
      label: `Motion board ${String(index + 1).padStart(2, '0')}`,
    };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

const placeholderMark = '/placeholder.svg';

const AssetVaultSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      id="asset-vault"
      ref={sectionRef}
      className="py-20 sm:py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <span className="font-mono-tech text-xs sm:text-sm tracking-[0.24em] text-accent uppercase">
              Asset Vault
            </span>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Every visual file in the archive, staged into one live website system.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl">
              This section pulls the full image and video library directly from the project,
              so the site showcases the entire creative toolkit instead of leaving assets unused.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.03] px-5 py-4 backdrop-blur-sm">
            <img
              src={placeholderMark}
              alt="Archive mark"
              className="h-12 w-12 rounded-xl border border-foreground/10 bg-background/70 p-2"
            />
            <div>
              <p className="font-heading text-xl text-foreground">
                {assetEntries.length + motionAssets.length} live assets
              </p>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Images, vectors and motion boards
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-foreground/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                <LayoutTemplate className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground">Core stills</h3>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Hero frame plus project posters
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stillAssets.map((asset, index) => (
                <motion.article
                  key={asset.fileName}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.15 + index * 0.05 }}
                  className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black ${asset.fileName === 'hero-bg.jpg' ? 'sm:col-span-2 xl:col-span-3' : ''}`}
                >
                  <img
                    src={asset.src}
                    alt={asset.label}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${asset.fileName === 'hero-bg.jpg' ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-white/55">
                      {asset.fileName}
                    </p>
                    <h4 className="mt-2 font-heading text-2xl text-white">{asset.label}</h4>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-foreground/10 p-3 text-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground">Brand marks</h3>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Full logo roster from the toolkit
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {brandLogoAssets.map((asset, index) => (
                <motion.div
                  key={asset.fileName}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.18 + index * 0.03 }}
                  className="group flex min-h-28 flex-col items-center justify-center rounded-[1.4rem] border border-foreground/10 bg-background/80 px-3 py-4 text-center"
                >
                  <img
                    src={asset.src}
                    alt={asset.label}
                    className="h-10 w-auto max-w-[88px] object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <p className="mt-4 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {asset.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-[2rem] border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] to-transparent p-6 sm:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                <LibraryBig className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground">Numbered tool suites</h3>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Base render, cleaned cut and vector mark for each suite
                </p>
              </div>
            </div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              10 sets imported directly from the asset folder
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {numberedSuites.map((suite, index) => (
              <motion.article
                key={suite.id}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.25 + index * 0.04 }}
                className="rounded-[1.6rem] border border-foreground/10 bg-black/[0.22] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.24em] text-accent">
                      {suite.id}
                    </p>
                    <h4 className="mt-2 font-heading text-2xl text-foreground">{suite.label}</h4>
                  </div>
                  <div className="rounded-full border border-foreground/10 px-3 py-1">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Asset trio
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { key: 'base', title: 'Base', src: suite.base },
                    { key: 'clean', title: 'Clean', src: suite.clean },
                    { key: 'vector', title: 'Vector', src: suite.vector },
                  ].map((variant) => (
                    <div
                      key={`${suite.id}-${variant.key}`}
                      className="rounded-[1.2rem] border border-foreground/10 bg-background/80 p-3"
                    >
                      <div className="flex aspect-square items-center justify-center rounded-[0.95rem] bg-secondary/50">
                        {variant.src ? (
                          <img
                            src={variant.src}
                            alt={`${suite.label} ${variant.title}`}
                            className="max-h-full w-auto object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={placeholderMark}
                            alt={`${suite.label} placeholder`}
                            className="h-10 w-10 opacity-40"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="mt-3 text-center font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {variant.title}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-[2rem] border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent">
              <Clapperboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-2xl text-foreground">Motion boards</h3>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Every video reference loaded as live loops
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {motionAssets.map((asset, index) => (
              <motion.article
                key={asset.fileName}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.05 }}
                className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black"
              >
                <video
                  src={asset.src}
                  className="aspect-video w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="border-t border-white/10 bg-black/80 px-5 py-4">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.24em] text-accent">
                    {asset.label}
                  </p>
                  <p className="mt-1 text-sm text-white/65">{asset.fileName}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssetVaultSection;
