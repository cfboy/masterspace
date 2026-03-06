import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

const certs = ['inimitez', 'ambience', 'osha'] as const;

export function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certificaciones" className="bg-card px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex items-center gap-6">
          <span className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase">
            {t('nav.certifications')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Horizontal list — editorial */}
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {certs.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="px-0 py-10 md:px-10 md:py-0 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
            >
              {/* Index */}
              <p className="mb-6 font-sans text-[10px] tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </p>
              {/* Institution tag */}
              <p className="mb-2 font-sans text-[10px] tracking-[0.2em] text-primary uppercase">
                {t(`certifications.items.${key}.institution`)}
              </p>
              {/* Title */}
              <h3 className="font-display mb-4 text-xl text-foreground md:text-2xl">
                {t(`certifications.items.${key}.title`)}
              </h3>
              {/* Description */}
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {t(`certifications.items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
