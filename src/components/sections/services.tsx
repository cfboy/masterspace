import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { Armchair, Building2, Hammer, Landmark, Layers, Paintbrush } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';

const icons = [Hammer, Building2, Paintbrush, Layers, Landmark, Armchair];

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
    <section id="servicios" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('services.title')} subtitle={t('services.subtitle')} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, i) => {
            const Icon = icons[i];
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
                className="group border-border border-t-primary bg-card hover:border-primary/40 rounded-lg border border-t-2 p-6 transition-colors"
              >
                <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-foreground mb-2 text-lg">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="font-body text-card-foreground text-sm leading-relaxed">
                  {t(`services.items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
