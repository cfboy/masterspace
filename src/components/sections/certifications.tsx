import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { HardHat, PaintRoller, Sparkles } from 'lucide-react';

const certMeta = {
  inimitez: { Icon: Sparkles,    accent: 'from-ms-gold/10 to-transparent' },
  ambience: { Icon: PaintRoller, accent: 'from-ms-pearl/5 to-transparent' },
  osha:     { Icon: HardHat,     accent: 'from-ms-gold/8 to-transparent' },
} as const;

const certs = ['inimitez', 'ambience', 'osha'] as const;

export function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certificaciones" className="bg-card px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex items-center gap-6">
          <span className="font-sans text-xs tracking-[0.25em] text-primary uppercase">
            {t('nav.certifications')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Cert cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {certs.map((key, i) => {
            const { Icon, accent } = certMeta[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden border border-border bg-linear-to-br ${accent} p-8 md:p-10`}
              >
                {/* Index — top right */}
                <span className="absolute top-6 right-6 font-sans text-xs tabular-nums text-muted-foreground/40">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="mb-8 text-primary">
                  <Icon size={36} strokeWidth={1.5} />
                </div>

                {/* Institution tag */}
                <p className="mb-2 font-sans text-xs tracking-[0.2em] text-primary uppercase">
                  {t(`certifications.items.${key}.institution`)}
                </p>

                {/* Title */}
                <h3 className="font-display mb-4 text-xl text-foreground md:text-2xl">
                  {t(`certifications.items.${key}.title`)}
                </h3>

                {/* Divider */}
                <div className="mb-4 h-px w-8 bg-primary/40" />

                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {t(`certifications.items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
