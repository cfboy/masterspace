import type { FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate Formspree / EmailJS
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="bg-card px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex items-center gap-6">
          <span className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase">
            {t('nav.contact')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Left — large statement + contact details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display mb-12 text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
              {t('contact.subtitle')}
            </h2>

            {/* Contact info — minimal list */}
            <div className="space-y-6">
              <div>
                <p className="mb-1 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {t('contact.phone_label')}
                </p>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-body text-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="mb-1 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {t('contact.email_label')}
                </p>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="font-body text-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="mb-1 font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {t('contact.location_label')}
                </p>
                <p className="font-body text-foreground">{CONTACT_INFO.location}</p>
              </div>
              <div className="h-px bg-border" />
              <div className="flex gap-6">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary uppercase"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary uppercase"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex h-full items-center">
                <p className="font-display text-2xl text-foreground">{t('contact.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Field — borderless bottom-line style */}
                {[
                  { label: t('contact.name'), type: 'text', required: true },
                  { label: t('contact.email'), type: 'email', required: true },
                  { label: t('contact.phone'), type: 'tel', required: false },
                ].map(({ label, type, required }) => (
                  <div key={label} className="group">
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                      {label}
                    </label>
                    <input
                      type={type}
                      required={required}
                      className="w-full border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                    {t('contact.service')}
                  </label>
                  <select
                    required
                    className="w-full border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" className="bg-card text-foreground">{t('contact.select_service')}</option>
                    <option value="residential" className="bg-card text-foreground">{t('services.items.residential.title')}</option>
                    <option value="commercial" className="bg-card text-foreground">{t('services.items.commercial.title')}</option>
                    <option value="finishes" className="bg-card text-foreground">{t('services.items.finishes.title')}</option>
                    <option value="coatings" className="bg-card text-foreground">{t('services.items.coatings.title')}</option>
                    <option value="public" className="bg-card text-foreground">{t('services.items.public.title')}</option>
                    <option value="interior" className="bg-card text-foreground">{t('services.items.interior.title')}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="font-body bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-85"
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
