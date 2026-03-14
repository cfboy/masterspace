import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import { useSanity } from '@/hooks/use-sanity';
import { cn } from '@/lib/utils';
import { fetchTestimonials, localized, type SanityTestimonial } from '@/lib/sanity';

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { data: testimonials, loading } = useSanity(useCallback(() => fetchTestimonials(), []), 'testimonials');
  const [current, setCurrent] = useState(0);

  if (loading || !testimonials || testimonials.length === 0) {
    return null;
  }

  const item: SanityTestimonial = testimonials[current];

  return (
    <section id="testimonios" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex items-center gap-6">
          <span className="font-sans text-xs tracking-[0.25em] text-primary uppercase">
            {t('nav.testimonials')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <div className="flex flex-col justify-between gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-xl text-primary">
                  {item.name}
                </p>
                <p className="mt-1 font-sans text-sm tracking-wide text-muted-foreground">
                  {localized(item, 'project', lang)}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              {testimonials.map((_: SanityTestimonial, i: number) => (
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

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl leading-snug text-foreground italic md:text-3xl lg:text-4xl"
            >
              &ldquo;{localized(item, 'quote', lang)}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
