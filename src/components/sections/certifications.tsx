import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { Award, HardHat, ShieldCheck } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';

const certs = [
  { key: 'inimitez', Icon: Award },
  { key: 'ambience', Icon: ShieldCheck },
  { key: 'osha', Icon: HardHat },
] as const;

export function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certificaciones" className="bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('certifications.title')} subtitle={t('certifications.subtitle')} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
              className="border-border bg-background rounded-lg border p-8 text-center"
            >
              <div className="bg-primary/10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full">
                <Icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-foreground mb-1 text-lg">
                {t(`certifications.items.${key}.title`)}
              </h3>
              <p className="text-primary mb-3 font-sans text-xs tracking-wide uppercase">
                {t(`certifications.items.${key}.institution`)}
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {t(`certifications.items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
