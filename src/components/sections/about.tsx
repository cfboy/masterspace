import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/ui/section-heading';

const badgeKeys = ['structure', 'design', 'technique', 'quality'] as const;

export function About() {
  const { t } = useTranslation();

  return (
    <section id="nosotros" className="bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-card-foreground mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Mission */}
            <div className="border-primary mb-6 border-l-2 pl-5">
              <h3 className="font-display text-foreground mb-1 text-lg">
                {t('about.mission_title')}
              </h3>
              <p className="font-body text-card-foreground text-sm leading-relaxed">
                {t('about.mission')}
              </p>
            </div>

            {/* Vision */}
            <div className="border-primary mb-8 border-l-2 pl-5">
              <h3 className="font-display text-foreground mb-1 text-lg">
                {t('about.vision_title')}
              </h3>
              <p className="font-body text-card-foreground text-sm leading-relaxed">
                {t('about.vision')}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badgeKeys.map((key) => (
                <span
                  key={key}
                  className="border-primary text-primary rounded-full border px-4 py-1.5 font-sans text-sm"
                >
                  {t(`about.badges.${key}`)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="border-border bg-secondary aspect-[4/5] overflow-hidden rounded-lg border">
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 h-20 w-20">
                <div className="border-primary absolute top-4 right-4 h-full w-full rounded-tr-lg border-t-2 border-r-2" />
              </div>
              <div className="absolute bottom-0 left-0 h-20 w-20">
                <div className="border-primary absolute bottom-4 left-4 h-full w-full rounded-bl-lg border-b-2 border-l-2" />
              </div>
              {/* Placeholder content */}
              <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                <div className="px-8 text-center">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <span className="font-display text-primary text-2xl">MS</span>
                  </div>
                  <p className="font-sans text-sm">{t('about.image_placeholder')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
