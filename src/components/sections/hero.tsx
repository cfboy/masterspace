import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import heroBgLight from '@/assets/concrete-hero.jpg';
import heroBgDark from '@/assets/dark-hero.jpg';
import watermarkUrl from '@/assets/watermark/white-watermark@2x.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function Hero() {
  const { t } = useTranslation();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsLight(root.classList.contains('light'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const heroBg = isLight ? heroBgLight : heroBgDark;

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden md:items-start md:justify-end md:pt-32 md:pb-28"
    >
      {/* Background texture photo */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay to maintain legibility */}
        <div className="bg-ms-black/70 absolute inset-0" />
      </div>

      {/* Brand watermark — bottom-right, very subtle — hidden on small screens */}
      <img
        src={watermarkUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-20 hidden w-56 opacity-[0.06] select-none sm:block md:w-72"
      />

      {/* Large background monogram — desktop only */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.035 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="font-display text-ms-white pointer-events-none absolute right-[-0.02em] bottom-[-0.08em] hidden text-[22vw] leading-none select-none lg:block"
        aria-hidden="true"
      >
        MS
      </motion.span>

      {/* Vertical rule — left accent — only on wider screens where it aligns with content edge */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        className="bg-ms-gold/30 absolute top-0 left-6 hidden h-full w-px md:left-12 md:block"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-20 text-center md:min-h-0 md:items-start md:px-12 md:pt-0 md:pb-0 md:text-left"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex items-center justify-center gap-4 md:mb-8 md:justify-start"
        >
          <span className="bg-ms-gold h-px w-8 md:w-10" />
          <span className="text-ms-gold font-sans text-xs tracking-[0.25em] uppercase md:text-sm">
            {t('hero.tagline')}
          </span>
        </motion.div>

        {/* Headline — large editorial type */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-ms-white max-w-4xl text-[2.5rem] leading-[1.08] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6rem]"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Bottom row — CTAs + location */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-5 md:mt-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="#portafolio"
              className="font-body bg-ms-gold text-ms-black px-6 py-3 text-sm font-bold transition-opacity hover:opacity-85 md:px-7"
            >
              {t('hero.cta')}
            </a>
            <a
              href="#contacto"
              className="font-body border-ms-white/20 text-ms-white/70 hover:border-ms-gold hover:text-ms-gold border px-6 py-3 text-sm transition-colors md:px-7"
            >
              {t('hero.cta_secondary')}
            </a>
          </div>
          <p className="text-ms-ash font-sans text-xs tracking-[0.2em] uppercase md:text-sm">
            Puerto Rico
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        className="bg-ms-gold/40 absolute bottom-0 left-1/2 h-12 w-px -translate-x-1/2 md:h-16"
      />
    </section>
  );
}
