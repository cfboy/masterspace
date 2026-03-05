import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Hammer,
  Building2,
  Paintbrush,
  Layers,
  Landmark,
  Armchair,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const icons = [Hammer, Building2, Paintbrush, Layers, Landmark, Armchair]

const serviceKeys = [
  'residential',
  'commercial',
  'finishes',
  'coatings',
  'public',
  'interior',
] as const

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="servicios" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--primary)] rounded-lg p-6 hover:border-[var(--primary)]/40 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg text-[var(--foreground)] mb-2">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="font-body text-sm text-[var(--card-foreground)] leading-relaxed">
                  {t(`services.items.${key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
