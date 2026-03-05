import { useTranslation } from 'react-i18next';

import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ms-black border-ms-gold/20 border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <h3 className="font-display text-ms-gold mb-2 text-xl">MASTER SPACE</h3>
            <p className="font-body text-ms-ash text-sm">{t('footer.tagline')}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-ms-silver mb-4 font-sans text-sm font-semibold tracking-wide uppercase">
              {t('footer.links')}
            </h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.slice(1).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="font-body text-ms-ash hover:text-ms-gold text-sm transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ms-silver mb-4 font-sans text-sm font-semibold tracking-wide uppercase">
              {t('contact.title')}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-body text-ms-ash hover:text-ms-gold text-sm transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="font-body text-ms-ash hover:text-ms-gold text-sm transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <div className="mt-2 flex gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ms-ash hover:text-ms-gold font-sans text-sm transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ms-ash hover:text-ms-gold font-sans text-sm transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-ms-graphite border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row">
          <p className="text-ms-slate font-sans text-xs">{t('footer.copyright')}</p>
          <p className="text-ms-slate font-sans text-xs">{t('footer.crafted')}</p>
        </div>
      </div>
    </footer>
  );
}
