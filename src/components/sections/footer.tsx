import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/ui/logo';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ms-black px-6 md:px-12">
      {/* Main footer row */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 py-16 md:grid-cols-[2fr_1fr_1fr] md:gap-12 md:py-20">
          {/* Brand */}
          <div>
            <Logo width={180} className="mb-4 text-primary" />
            <p className="font-body max-w-xs text-sm leading-relaxed text-ms-ash">
              {t('hero.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-6 font-sans text-[10px] tracking-[0.2em] text-ms-slate uppercase">
              {t('footer.links')}
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.slice(1).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="font-body text-sm text-ms-ash transition-colors hover:text-ms-gold"
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 font-sans text-[10px] tracking-[0.2em] text-ms-slate uppercase">
              {t('contact.title')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-body text-sm text-ms-ash transition-colors hover:text-ms-gold"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="font-body text-sm text-ms-ash transition-colors hover:text-ms-gold"
              >
                {CONTACT_INFO.email}
              </a>
              <div className="mt-2 flex gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-wide text-ms-slate transition-colors hover:text-ms-gold uppercase"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-wide text-ms-slate transition-colors hover:text-ms-gold uppercase"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-ms-graphite py-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-ms-slate">{t('footer.copyright')}</p>
          <p className="font-sans text-xs text-ms-slate">{t('footer.crafted')}</p>
        </div>
      </div>
    </footer>
  );
}
