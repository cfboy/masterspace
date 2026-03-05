import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, HardHat } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const certs = [
  { key: 'inimitez', Icon: Award },
  { key: 'ambience', Icon: ShieldCheck },
  { key: 'osha', Icon: HardHat },
] as const

export function Certifications() {
  const { t } = useTranslation()

  return (
    <section id="certificaciones" className="py-20 md:py-28 px-6 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('certifications.title')}
          subtitle={t('certifications.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center bg-[var(--background)] border border-[var(--border)] rounded-lg p-8"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5">
                <Icon size={28} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-display text-lg text-[var(--foreground)] mb-1">
                {t(`certifications.items.${key}.title`)}
              </h3>
              <p className="font-sans text-xs text-[var(--primary)] tracking-wide uppercase mb-3">
                {t(`certifications.items.${key}.institution`)}
              </p>
              <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                {t(`certifications.items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
