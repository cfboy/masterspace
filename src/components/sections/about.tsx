import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'

const badgeKeys = ['structure', 'design', 'technique', 'quality'] as const

export function About() {
  const { t } = useTranslation()

  return (
    <section id="nosotros" className="py-20 md:py-28 px-6 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[var(--card-foreground)] leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Mission */}
            <div className="border-l-2 border-[var(--primary)] pl-5 mb-6">
              <h3 className="font-display text-lg text-[var(--foreground)] mb-1">
                {t('about.mission_title')}
              </h3>
              <p className="font-body text-sm text-[var(--card-foreground)] leading-relaxed">
                {t('about.mission')}
              </p>
            </div>

            {/* Vision */}
            <div className="border-l-2 border-[var(--primary)] pl-5 mb-8">
              <h3 className="font-display text-lg text-[var(--foreground)] mb-1">
                {t('about.vision_title')}
              </h3>
              <p className="font-body text-sm text-[var(--card-foreground)] leading-relaxed">
                {t('about.vision')}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badgeKeys.map((key) => (
                <span
                  key={key}
                  className="px-4 py-1.5 text-sm font-sans border border-[var(--primary)] text-[var(--primary)] rounded-full"
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
            <div className="aspect-[4/5] rounded-lg bg-[var(--secondary)] border border-[var(--border)] overflow-hidden">
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute top-4 right-4 w-full h-full border-t-2 border-r-2 border-[var(--primary)] rounded-tr-lg" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20">
                <div className="absolute bottom-4 left-4 w-full h-full border-b-2 border-l-2 border-[var(--primary)] rounded-bl-lg" />
              </div>
              {/* Placeholder content */}
              <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-2xl text-[var(--primary)]">MS</span>
                  </div>
                  <p className="font-sans text-sm">{t('about.image_placeholder')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
