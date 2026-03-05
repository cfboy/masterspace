import type { FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'

export function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: integrate Formspree / EmailJS
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="py-20 md:py-28 px-6 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-[var(--primary)]" />
                  </div>
                  <p className="font-display text-xl text-[var(--foreground)]">
                    {t('contact.success')}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-sans text-sm text-[var(--muted-foreground)] mb-1.5">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded font-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-sm text-[var(--muted-foreground)] mb-1.5">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded font-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-[var(--muted-foreground)] mb-1.5">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded font-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm text-[var(--muted-foreground)] mb-1.5">
                    {t('contact.service')}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded font-body text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
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
                  <label className="block font-sans text-sm text-[var(--muted-foreground)] mb-1.5">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded font-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] font-body font-bold rounded hover:opacity-90 transition-opacity"
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
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-display text-base text-[var(--foreground)] mb-1">
                  {t('contact.phone_label')}
                </h4>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-body text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-display text-base text-[var(--foreground)] mb-1">
                  {t('contact.email_label')}
                </h4>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="font-body text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-display text-base text-[var(--foreground)] mb-1">
                  {t('contact.location_label')}
                </h4>
                <p className="font-body text-[var(--muted-foreground)]">
                  {CONTACT_INFO.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Instagram size={18} className="text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-display text-base text-[var(--foreground)] mb-1">
                  {t('contact.social_label')}
                </h4>
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
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
  )
}
