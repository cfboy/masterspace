import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import windowMockup from '@/assets/mockups/Window.jpg';
import founderPhoto from '@/assets/owner.png';
import { useBusinessInfo } from '@/hooks/use-business-info';
import { useSanity } from '@/hooks/use-sanity';
import { fetchCertifications, urlFor } from '@/lib/sanity';

export function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const biz = useBusinessInfo();
  const { data: certs } = useSanity(
    useCallback(() => fetchCertifications(), []),
    'certifications'
  );

  const stats = [
    { value: `${biz.yearsExperience}+`, labelKey: 'about.stat_years' },
    { value: `${biz.projectsCompleted}+`, labelKey: 'about.stat_projects' },
    { value: `${certs?.length ?? 3}`, labelKey: 'about.stat_certs' },
  ];

  const founderRole = lang === 'en' ? biz.founderRole_en : biz.founderRole_es;

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
          src={windowMockup}
          alt="MasterSpace — acabados arquitectónicos"
          className="h-full w-full object-cover"
        />
        <div className="from-card/10 to-card absolute inset-0 bg-gradient-to-b via-transparent" />

        {/* Stat strip sitting on image bottom */}
        <div className="divide-border bg-ms-black/75 absolute right-0 bottom-0 left-0 flex divide-x backdrop-blur-sm">
          {stats.map(({ value, labelKey }) => (
            <div key={labelKey} className="flex-1 px-3 py-5 text-center md:px-6 md:py-8">
              <p className="font-display text-ms-gold text-2xl md:text-4xl">{value}</p>
              <p className="text-ms-ash mt-1 font-sans text-[10px] leading-tight tracking-[0.1em] uppercase md:text-xs md:tracking-[0.15em]">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* About content */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_340px]">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center pr-0 pb-16 lg:pr-16 lg:pb-0"
          >
            <span className="text-primary mb-6 block font-sans text-xs tracking-[0.25em] uppercase">
              {t('nav.about')}
            </span>

            <h2 className="font-display text-foreground text-3xl leading-snug md:text-4xl lg:text-5xl">
              {t('about.title')}
            </h2>

            <p className="font-body text-muted-foreground mt-6 text-base leading-relaxed">
              {t('about.description')}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="bg-ms-gold mt-1 h-4 w-px shrink-0" />
                <div>
                  <p className="text-ms-gold mb-1 font-sans text-xs tracking-[0.15em] uppercase">
                    {t('about.mission_title')}
                  </p>
                  <p className="font-body text-card-foreground text-sm leading-relaxed">
                    {t('about.mission')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-ms-gold mt-1 h-4 w-px shrink-0" />
                <div>
                  <p className="text-ms-gold mb-1 font-sans text-xs tracking-[0.15em] uppercase">
                    {t('about.vision_title')}
                  </p>
                  <p className="font-body text-card-foreground text-sm leading-relaxed">
                    {t('about.vision')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {(['structure', 'design', 'technique', 'quality'] as const).map((key) => (
                <span
                  key={key}
                  className="border-border text-muted-foreground border px-4 py-1.5 font-sans text-xs tracking-[0.15em] uppercase"
                >
                  {t(`about.badges.${key}`)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — founder card, full-height */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border-border bg-card relative flex flex-col overflow-hidden border"
          >
            {/* Gold top line */}
            <div className="bg-ms-gold absolute top-0 right-0 left-0 z-10 h-px" />

            {/* Cutout photo fills the card, anchored to bottom */}
            <div className="bg-ms-graphite/30 flex min-h-72 flex-1 items-end justify-center pt-10">
              <img
                src={biz.founderImage ? urlFor(biz.founderImage).width(680).url() : founderPhoto}
                alt={biz.founderName}
                className="h-full w-full object-contain object-bottom"
              />
            </div>

            {/* Name bar */}
            <div className="border-border flex items-center justify-between border-t px-8 py-6">
              <div>
                <p className="font-display text-foreground text-xl">{biz.founderName}</p>
                <p className="text-ms-gold mt-1 font-sans text-xs tracking-[0.2em] uppercase">
                  {founderRole}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
