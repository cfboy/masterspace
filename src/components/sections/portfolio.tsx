import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

type Category = 'all' | 'residential' | 'commercial' | 'finishes' | 'coatings';

const filterKeys: Category[] = ['all', 'residential', 'commercial', 'finishes', 'coatings'];

interface Project {
  key: string;
  category: Exclude<Category, 'all'>;
  aspect: string;
}

const projects: Project[] = [
  { key: 'project1', category: 'residential', aspect: 'aspect-[4/3]' },
  { key: 'project2', category: 'commercial', aspect: 'aspect-[3/4]' },
  { key: 'project3', category: 'finishes', aspect: 'aspect-[4/3]' },
  { key: 'project4', category: 'coatings', aspect: 'aspect-[3/4]' },
  { key: 'project5', category: 'residential', aspect: 'aspect-[4/3]' },
  { key: 'project6', category: 'commercial', aspect: 'aspect-[4/3]' },
  { key: 'project7', category: 'finishes', aspect: 'aspect-[3/4]' },
  { key: 'project8', category: 'coatings', aspect: 'aspect-[4/3]' },
];

export function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('portfolio.title')} subtitle={t('portfolio.subtitle')} />

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                'rounded-full border px-5 py-2 font-sans text-sm transition-colors',
                activeFilter === key
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              )}
            >
              {t(`portfolio.filters.${key}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group border-border bg-card relative overflow-hidden rounded-lg border"
              >
                <div
                  className={cn(project.aspect, 'bg-secondary flex items-center justify-center')}
                >
                  <span className="text-muted-foreground font-sans text-xs">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="bg-ms-black/70 absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="font-display text-ms-white mb-1 text-lg">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h4>
                  <p className="text-ms-gold mb-3 font-sans text-xs">
                    {t(`portfolio.filters.${project.category}`)}
                  </p>
                  <span className="text-ms-gold inline-flex items-center gap-1 text-sm hover:underline">
                    {t('portfolio.view_more')} <ExternalLink size={14} />
                  </span>
                </div>

                {/* Gold corner on hover */}
                <div className="border-t-primary absolute top-0 right-0 h-0 w-0 border-t-[40px] border-l-[40px] border-l-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
