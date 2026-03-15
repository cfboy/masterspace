import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { useSanity } from '@/hooks/use-sanity';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { fetchServices, localized, type SanityService } from '@/lib/sanity';

export function Contact() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { data: services } = useSanity(useCallback(() => fetchServices(), []), 'services');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error('Form submission failed:', res.status);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <section id="contacto" className="bg-card px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex items-center gap-6">
          <span className="font-sans text-xs tracking-[0.25em] text-primary uppercase">
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
                <p className="mb-1 font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {t('contact.phone_label')}
                </p>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-body text-base text-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="mb-1 font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {t('contact.email_label')}
                </p>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="font-body text-base text-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="mb-1 font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
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
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Netlify hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="mb-2">
                  <h3 className="font-display mb-2 text-xl text-foreground md:text-2xl">
                    {t('contact.form_heading')}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {t('contact.form_subheading')}
                  </p>
                </div>
                {/* Field — borderless bottom-line style */}
                {[
                  { label: t('contact.name'), name: 'name', type: 'text', required: true },
                  { label: t('contact.email'), name: 'email', type: 'email', required: true },
                  { label: t('contact.phone'), name: 'phone', type: 'tel', required: false },
                ].map(({ label, name, type, required }) => (
                  <div key={name} className="group">
                    <label className="mb-2 block font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
                      {label}
                    </label>
                    <input
                      name={name}
                      type={type}
                      required={required}
                      className="w-full border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {t('contact.service')}
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" className="bg-card text-foreground">{t('contact.select_service')}</option>
                    {services?.map((s: SanityService) => (
                      <option key={s._id} value={s.key} className="bg-card text-foreground">
                        {localized(s, 'title', lang as 'es' | 'en')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none border-b border-border bg-transparent pb-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="font-body bg-primary w-full px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-85 md:w-auto"
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
