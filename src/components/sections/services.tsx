import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

const serviceKeys = [
  'residential',
  'commercial',
  'finishes',
  'coatings',
  'public',
  'interior',
] as const;

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="servicios" className="px-6 py-24 md:py-36 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section header — editorial, not centered */}
        <div className="mb-16 flex items-start gap-8 md:mb-24">
          <div className="pt-2">
            <span className="font-sans text-xs tracking-[0.2em] text-primary uppercase">
              {t('nav.services')}
            </span>
          </div>
          <h2 className="font-display max-w-xl text-3xl leading-tight text-foreground md:text-4xl">
            {t('services.title')}
          </h2>
        </div>

        {/* Services as editorial numbered list */}
        <div>
          {serviceKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top rule */}
              <div className="h-px w-full bg-border" />

              <div className="group py-8 md:py-10">
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[5rem_1fr_1fr] md:gap-12">
                  {/* Number */}
                  <span className="font-sans pt-1 text-xs tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-primary md:text-2xl">
                    {t(`services.items.${key}.title`)}
                  </h3>

                  {/* Description — full width under number+title on mobile, 3rd col on desktop */}
                  <p className="font-body col-span-2 mt-3 text-sm leading-relaxed text-muted-foreground md:col-span-1 md:col-start-3 md:mt-0">
                    {t(`services.items.${key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Bottom rule */}
          <div className="h-px w-full bg-border" />
        </div>
      </div>
    </section>
  );
}
