import type { FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';
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
    <section id="contacto" className="bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Mail size={28} className="text-primary" />
                  </div>
                  <p className="font-display text-foreground text-xl">{t('contact.success')}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-muted-foreground mb-1.5 block font-sans text-sm">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    className="font-body border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-muted-foreground mb-1.5 block font-sans text-sm">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      required
                      className="font-body border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground mb-1.5 block font-sans text-sm">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      className="font-body border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1.5 block font-sans text-sm">
                    {t('contact.service')}
                  </label>
                  <select
                    required
                    className="font-body border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                  >
                    <option value="">{t('contact.select_service')}</option>
                    <option value="residential">{t('services.items.residential.title')}</option>
                    <option value="commercial">{t('services.items.commercial.title')}</option>
                    <option value="finishes">{t('services.items.finishes.title')}</option>
                    <option value="coatings">{t('services.items.coatings.title')}</option>
                    <option value="public">{t('services.items.public.title')}</option>
                    <option value="interior">{t('services.items.interior.title')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1.5 block font-sans text-sm">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="font-body border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full resize-none rounded border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="font-body bg-primary text-primary-foreground w-full rounded px-6 py-3.5 font-bold transition-opacity hover:opacity-90"
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display text-foreground mb-1 text-base">
                  {t('contact.phone_label')}
                </h4>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display text-foreground mb-1 text-base">
                  {t('contact.email_label')}
                </h4>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display text-foreground mb-1 text-base">
                  {t('contact.location_label')}
                </h4>
                <p className="font-body text-muted-foreground">{CONTACT_INFO.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Instagram size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display text-foreground mb-1 text-base">
                  {t('contact.social_label')}
                </h4>
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
