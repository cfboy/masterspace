import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/ui/logo';
import { useBusinessInfo } from '@/hooks/use-business-info';
import { NAV_LINKS } from '@/lib/constants';

export function Footer() {
  const { t } = useTranslation();
  const biz = useBusinessInfo();

  return (
    <footer className="bg-ms-black px-6 md:px-12">
      {/* Main footer row */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 py-16 md:grid-cols-[2fr_1fr_1fr] md:gap-12 md:py-20">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Logo width={180} className="text-primary mb-4" />
            <p className="font-body text-ms-ash max-w-xs text-base leading-relaxed">
              {t('hero.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-ms-slate mb-6 font-sans text-xs tracking-[0.2em] uppercase">
              {t('footer.links')}
            </p>
            <nav className="flex flex-col items-center gap-3 md:items-start">
              {NAV_LINKS.slice(1).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="font-body text-ms-ash hover:text-ms-gold text-base transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-ms-slate mb-6 font-sans text-xs tracking-[0.2em] uppercase">
              {t('contact.title')}
            </p>
            <div className="flex flex-col items-center gap-3 md:items-start">
              <a
                href={biz.phoneHref}
                className="font-body text-ms-ash hover:text-ms-gold text-base transition-colors"
              >
                {biz.phone}
              </a>
              <a
                href={`mailto:${biz.email}`}
                className="font-body text-ms-ash hover:text-ms-gold text-base transition-colors"
              >
                {biz.email}
              </a>
              <div className="mt-2 flex gap-4">
                {biz.instagram && (
                  <a
                    href={biz.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ms-slate hover:text-ms-gold font-sans text-xs tracking-wide uppercase transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {biz.facebook && (
                  <a
                    href={biz.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ms-slate hover:text-ms-gold font-sans text-xs tracking-wide uppercase transition-colors"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-ms-graphite flex flex-col items-center justify-between gap-2 border-t py-6 sm:flex-row sm:items-center">
          <p className="text-ms-slate font-sans text-xs">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
