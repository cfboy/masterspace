import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

const testimonialKeys = ['t1', 't2', 't3'] as const;

export function Testimonials() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonialKeys.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonialKeys.length - 1 ? 0 : c + 1));

  const key = testimonialKeys[current];

  return (
    <section id="testimonios" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <Quote size={40} className="text-primary/30 mx-auto mb-6" />
              <blockquote className="font-body text-foreground mx-auto mb-6 max-w-2xl text-lg leading-relaxed italic md:text-xl">
                "{t(`testimonials.items.${key}.quote`)}"
              </blockquote>
              <p className="font-display text-primary text-base">
                {t(`testimonials.items.${key}.name`)}
              </p>
              <p className="text-muted-foreground font-sans text-sm">
                {t(`testimonials.items.${key}.project`)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="border-border text-muted-foreground hover:border-primary hover:text-primary rounded-full border p-2 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonialKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    i === current ? 'bg-primary' : 'bg-border'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="border-border text-muted-foreground hover:border-primary hover:text-primary rounded-full border p-2 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
