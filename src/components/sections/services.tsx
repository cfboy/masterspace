import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Home, Landmark, Layers, PaintRoller, Plus, Sofa } from 'lucide-react';

import { cn } from '@/lib/utils';

const serviceIcons = {
  residential: Home,
  commercial:  Building2,
  finishes:    Layers,
  coatings:    PaintRoller,
  public:      Landmark,
  interior:    Sofa,
} as const;

const serviceKeys = [
  'residential',
  'commercial',
  'finishes',
  'coatings',
  'public',
  'interior',
] as const;

export function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="servicios" className="px-6 py-24 md:py-36 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex items-start gap-8 md:mb-24">
          <div className="pt-2">
            <span className="font-sans text-sm tracking-[0.2em] text-primary uppercase">
              {t('nav.services')}
            </span>
          </div>
          <h2 className="font-display max-w-xl text-3xl leading-tight text-foreground md:text-5xl">
            {t('services.title')}
          </h2>
        </div>

        {/* Accordion list */}
        <div>
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            const isOpen = active === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-px w-full bg-border" />

                <button
                  className="group w-full cursor-pointer py-7 text-left md:py-9"
                  onClick={() => setActive(isOpen ? null : key)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 md:gap-10">
                    {/* Number */}
                    <span
                      className={cn(
                        'font-sans w-10 shrink-0 text-sm tabular-nums transition-colors duration-300',
                        isOpen ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <span
                      className={cn(
                        'transition-colors duration-300',
                        isOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </span>

                    {/* Title */}
                    <h3
                      className={cn(
                        'font-display flex-1 text-2xl transition-colors duration-300 md:text-3xl',
                        isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      )}
                    >
                      {t(`services.items.${key}.title`)}
                    </h3>

                    {/* Plus / minus toggle */}
                    <span
                      className={cn(
                        'ml-auto shrink-0 text-muted-foreground transition-transform duration-500',
                        isOpen ? 'rotate-45 text-primary' : 'group-hover:text-foreground'
                      )}
                      aria-hidden="true"
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </div>

                  {/* Animated gold underline */}
                  <motion.div
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                    className="mt-3 h-px bg-primary"
                  />
                </button>

                {/* Expandable description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body pb-8 pl-14 text-base leading-relaxed text-muted-foreground md:pl-30 md:max-w-2xl">
                        {t(`services.items.${key}.description`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div className="h-px w-full bg-border" />
        </div>
      </div>
    </section>
  );
}
