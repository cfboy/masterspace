import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

const testimonialKeys = ['t1', 't2', 't3'] as const

export function Testimonials() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonialKeys.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonialKeys.length - 1 ? 0 : c + 1))

  const key = testimonialKeys[current]

  return (
    <section id="testimonios" className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

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
              <Quote size={40} className="text-[var(--primary)]/30 mx-auto mb-6" />
              <blockquote className="font-body text-lg md:text-xl text-[var(--foreground)] italic leading-relaxed mb-6 max-w-2xl mx-auto">
                "{t(`testimonials.items.${key}.quote`)}"
              </blockquote>
              <p className="font-display text-base text-[var(--primary)]">
                {t(`testimonials.items.${key}.name`)}
              </p>
              <p className="font-sans text-sm text-[var(--muted-foreground)]">
                {t(`testimonials.items.${key}.project`)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
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
                    'w-2 h-2 rounded-full transition-colors',
                    i === current ? 'bg-[var(--primary)]' : 'bg-[var(--border)]',
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
