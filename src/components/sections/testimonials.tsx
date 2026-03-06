import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const testimonialKeys = ['t1', 't2', 't3'] as const;

export function Testimonials() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const key = testimonialKeys[current];

  return (
    <section id="testimonios" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 flex items-center gap-6">
          <span className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase">
            {t('nav.testimonials')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Large editorial quote */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — attribution + nav */}
          <div className="flex flex-col justify-between gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-lg text-primary">
                  {t(`testimonials.items.${key}.name`)}
                </p>
                <p className="mt-1 font-sans text-xs tracking-wide text-muted-foreground">
                  {t(`testimonials.items.${key}.project`)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dot navigation */}
            <div className="flex items-center gap-4">
              {testimonialKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonio ${i + 1}`}
                  className={cn(
                    'h-px transition-all duration-300',
                    i === current
                      ? 'w-10 bg-primary'
                      : 'w-4 bg-border hover:bg-muted-foreground'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right — large quote text */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl leading-snug text-foreground italic md:text-3xl lg:text-4xl"
            >
              &ldquo;{t(`testimonials.items.${key}.quote`)}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
