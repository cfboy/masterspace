import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Unsplash placeholder — architectural interior finishes
const HERO_IMG =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop';

const stats = [
  { value: '10+', labelKey: 'about.stat_years' },
  { value: '200+', labelKey: 'about.stat_projects' },
  { value: '3', labelKey: 'about.stat_certs' },
] as const;

export function About() {
  const { t } = useTranslation();

  return (
    <section id="nosotros" className="bg-card">
      {/* Full-bleed image with stat strip overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[55vh] w-full overflow-hidden md:h-[70vh]"
      >
        <img
          src={HERO_IMG}
          alt="MasterSpace — acabados arquitectónicos"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-transparent to-card" />

        {/* Stat strip sitting on image bottom */}
        <div className="absolute right-0 bottom-0 left-0 flex divide-x divide-border bg-ms-black/75 backdrop-blur-sm">
          {stats.map(({ value, labelKey }) => (
            <div key={labelKey} className="flex-1 px-6 py-6 text-center md:py-8">
              <p className="font-display text-3xl text-ms-gold md:text-4xl">{value}</p>
              <p className="mt-1 font-sans text-[10px] tracking-[0.15em] text-ms-ash uppercase">
                {t(labelKey as string)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Text content */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — label + mission/vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-10 block font-sans text-[10px] tracking-[0.25em] text-primary uppercase">
              {t('nav.about')}
            </span>
            <div className="space-y-8">
              <div>
                <p className="mb-2 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {t('about.mission_title')}
                </p>
                <p className="font-body text-sm leading-relaxed text-card-foreground">
                  {t('about.mission')}
                </p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="mb-2 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {t('about.vision_title')}
                </p>
                <p className="font-body text-sm leading-relaxed text-card-foreground">
                  {t('about.vision')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — large statement pull-quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-2xl leading-snug text-foreground md:text-3xl lg:text-4xl">
              {t('about.description')}
            </p>

            <div className="mt-12 flex flex-wrap gap-2">
              {(['structure', 'design', 'technique', 'quality'] as const).map((key) => (
                <span
                  key={key}
                  className="border border-border px-4 py-1.5 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase"
                >
                  {t(`about.badges.${key}`)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
