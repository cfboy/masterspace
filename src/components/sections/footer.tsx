import { useTranslation } from 'react-i18next'
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ms-black border-t border-ms-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + tagline */}
          <div>
            <h3 className="font-display text-xl text-ms-gold mb-2">MASTER SPACE</h3>
            <p className="font-body text-sm text-ms-ash">{t('footer.tagline')}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-ms-silver tracking-wide uppercase mb-4">
              {t('footer.links')}
            </h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.slice(1).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="font-body text-sm text-ms-ash hover:text-ms-gold transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-ms-silver tracking-wide uppercase mb-4">
              {t('contact.title')}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-body text-sm text-ms-ash hover:text-ms-gold transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="font-body text-sm text-ms-ash hover:text-ms-gold transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <div className="flex gap-3 mt-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-ms-ash hover:text-ms-gold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-ms-ash hover:text-ms-gold transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ms-graphite">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-ms-slate">
            {t('footer.copyright')}
          </p>
          <p className="font-sans text-xs text-ms-slate">
            {t('footer.crafted')}
          </p>
        </div>
      </div>
    </footer>
  )
}
