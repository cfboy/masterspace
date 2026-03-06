import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { LanguageToggle } from '@/components/ui/language-toggle';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* When not scrolled, force dark token values so all children render correctly over the dark Hero */}
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
          scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        )}
        style={!scrolled ? {
          '--primary': 'var(--color-ms-gold)',
          '--primary-foreground': 'var(--color-ms-black)',
          '--muted-foreground': 'var(--color-ms-ash)',
          '--foreground': 'var(--color-ms-white)',
          '--border': 'var(--color-ms-graphite)',
        } as React.CSSProperties : undefined}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12">
          {/* Logo */}
          <a href="#inicio" aria-label="MasterSpace LLC — inicio">
            <Logo width={120} className="text-primary" />
          </a>

          {/* Desktop nav — center */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(1, -1).map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={cn(
                  'font-sans text-xs tracking-[0.12em] transition-colors uppercase',
                  activeId === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contacto"
              className="font-sans text-xs tracking-[0.12em] text-primary transition-colors hover:text-foreground uppercase"
            >
              {t('nav.contact')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Progress line at bottom of nav */}
      </nav>

      {/* Mobile overlay — full-screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background px-8 pt-24 pb-12"
          >
            <nav className="flex flex-col gap-0">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-display border-b border-border py-5 text-2xl transition-colors',
                    activeId === link.href.slice(1) ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {t(link.key)}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex items-center gap-4 pt-8">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
