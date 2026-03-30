import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import {
  type FacebookReview,
  useFacebookReviews,
} from '@/hooks/use-facebook-reviews';
import { useSanity } from '@/hooks/use-sanity';
import {
  type SanityTestimonial,
  fetchTestimonials,
  localized,
} from '@/lib/sanity';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Unified review type used by the carousel                          */
/* ------------------------------------------------------------------ */

interface Review {
  id: string;
  name: string;
  detail: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
  source: 'facebook' | 'manual';
}

/* ------------------------------------------------------------------ */
/*  Star rating                                                       */
/* ------------------------------------------------------------------ */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn(
            'h-4 w-4',
            i < count ? 'text-ms-gold' : 'text-muted-foreground/30'
          )}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Facebook badge                                                    */
/* ------------------------------------------------------------------ */

function FacebookBadge() {
  return (
    <div className="text-muted-foreground flex items-center gap-1.5 text-xs tracking-wide">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1877F2]" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      Facebook
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';

  // Facebook reviews (primary)
  const { reviews: fbReviews, loading: fbLoading } = useFacebookReviews();

  // Sanity testimonials (fallback / supplement)
  const { data: sanityTestimonials, loading: sanityLoading } = useSanity(
    useCallback(() => fetchTestimonials(), []),
    'testimonials'
  );

  const [current, setCurrent] = useState(0);

  // Merge into unified list — Facebook first, then CMS
  const items: Review[] = [
    ...fbReviews.map(
      (r: FacebookReview): Review => ({
        id: `fb-${r.reviewer.name}-${r.created_time}`,
        name: r.reviewer.name,
        detail: new Date(r.created_time).toLocaleDateString(
          lang === 'es' ? 'es-PR' : 'en-US',
          { year: 'numeric', month: 'long' }
        ),
        quote: r.review_text ?? '',
        rating: r.rating,
        avatarUrl: r.reviewer.picture?.data?.url,
        source: 'facebook' as const,
      })
    ),
    ...(sanityTestimonials ?? []).map(
      (t: SanityTestimonial): Review => ({
        id: t._id,
        name: t.name,
        detail: localized(t, 'project', lang),
        quote: localized(t, 'quote', lang),
        source: 'manual' as const,
      })
    ),
  ];

  const loading = fbLoading && sanityLoading;

  if (loading || items.length === 0) return null;

  const item = items[current >= items.length ? 0 : current];

  return (
    <section id="testimonios" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-20 flex items-center gap-6">
          <span className="text-primary font-sans text-xs tracking-[0.25em] uppercase">
            {t('nav.testimonials')}
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left column — reviewer info & nav */}
          <div className="flex flex-col justify-between gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {item.avatarUrl && (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-primary text-xl">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-sans text-sm tracking-wide">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {item.rating != null && <Stars count={item.rating} />}
                {item.source === 'facebook' && <FacebookBadge />}
              </motion.div>
            </AnimatePresence>

            {/* Carousel indicators */}
            <div className="flex items-center gap-4">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`${t('testimonials.title')} ${i + 1}`}
                  className={cn(
                    'h-px transition-all duration-300',
                    i === current
                      ? 'bg-primary w-10'
                      : 'bg-border hover:bg-muted-foreground w-4'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right column — quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-foreground text-2xl leading-snug italic md:text-3xl lg:text-4xl"
            >
              &ldquo;{item.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
