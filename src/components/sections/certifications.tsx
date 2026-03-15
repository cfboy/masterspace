import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { HardHat, type LucideIcon, PaintRoller, Sparkles } from 'lucide-react';

import { useSanity } from '@/hooks/use-sanity';
import { type SanityCertification, fetchCertifications, localized } from '@/lib/sanity';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  PaintRoller,
  HardHat,
  LuSparkles: Sparkles,
  LuPaintRoller: PaintRoller,
  LuHardHat: HardHat,
};

function resolveIcon(icon: SanityCertification['icon']): LucideIcon {
  if (!icon) return Sparkles;
  const name = typeof icon === 'object' ? icon.name : icon;
  return iconMap[name] ?? Sparkles;
}

export function Certifications() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { data: certs, loading } = useSanity(
    useCallback(() => fetchCertifications(), []),
    'certifications'
  );

  if (loading || !certs) {
    return (
      <section id="certificaciones" className="bg-card px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-primary font-sans text-xs tracking-[0.25em] uppercase">
              {t('nav.certifications')}
            </span>
            <div className="bg-border h-px flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certificaciones" className="bg-card px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-center gap-6">
          <span className="text-primary font-sans text-xs tracking-[0.25em] uppercase">
            {t('nav.certifications')}
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {certs.map((cert: SanityCertification, i: number) => {
            const Icon = resolveIcon(cert.icon);
            const accent = cert.accent || 'from-ms-gold/10 to-transparent';

            return (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`border-border relative overflow-hidden border bg-linear-to-br ${accent} p-8 md:p-10`}
              >
                <span className="text-muted-foreground/40 absolute top-6 right-6 font-sans text-xs tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="text-primary mb-8">
                  <Icon size={36} strokeWidth={1.5} />
                </div>

                <p className="text-primary mb-2 font-sans text-xs tracking-[0.2em] uppercase">
                  {localized(cert, 'institution', lang)}
                </p>

                <h3 className="font-display text-foreground mb-4 text-xl md:text-2xl">
                  {localized(cert, 'title', lang)}
                </h3>

                <div className="bg-primary/40 mb-4 h-px w-8" />

                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {localized(cert, 'description', lang)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
