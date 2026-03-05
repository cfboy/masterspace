import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { LanguageToggle } from '@/components/ui/language-toggle';
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
          scrolled ? 'border-border bg-background/95 border-b backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="font-display text-primary text-xl md:text-2xl">
            MASTER SPACE
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={cn(
                  'font-body relative py-1 text-sm tracking-wide transition-colors',
                  activeId === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(link.key)}
                {activeId === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-primary absolute right-0 bottom-0 left-0 h-px"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contacto"
              className="font-body bg-primary text-primary-foreground ml-2 rounded px-5 py-2 text-sm font-bold transition-opacity hover:opacity-90"
            >
              {t('hero.cta_secondary')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-foreground p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/98 fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 backdrop-blur-lg"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'font-body text-2xl transition-colors',
                  activeId === link.href.slice(1) ? 'text-primary' : 'text-foreground'
                )}
              >
                {t(link.key)}
              </motion.a>
            ))}
            <div className="mt-6 flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
