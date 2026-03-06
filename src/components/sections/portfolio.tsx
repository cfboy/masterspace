import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

// Project photos
import imgProject01 from '@/assets/projects/la-fresqueria-01.jpeg';
import imgProject02 from '@/assets/projects/la-fresqueria-02.jpeg';
import imgProject03 from '@/assets/projects/la-fresqueria-03.jpeg';
import imgProject04 from '@/assets/projects/la-fresqueria-04.jpeg';
import imgProject05 from '@/assets/projects/la-fresqueria-05.jpeg';
import imgProject06 from '@/assets/projects/la-fresqueria-06.jpeg';
import imgProject07 from '@/assets/projects/la-fresqueria-07.jpeg';
import imgVibraProject from '@/assets/projects/vibra-project.jpeg';
import { cn } from '@/lib/utils';

type Category = 'all' | 'residential' | 'commercial' | 'finishes' | 'coatings';

const filterKeys: Category[] = ['all', 'residential', 'commercial', 'finishes', 'coatings'];

interface Project {
  key: string;
  category: Exclude<Category, 'all'>;
  img: string;
  span: string;
}

// La Fresquería Mayagüez PR (projects 1–7) + Vibra The Rooftop Mayagüez PR (project 8)
const projects: Project[] = [
  {
    key: 'project1',
    category: 'commercial',
    img: imgProject01,
    span: 'sm:col-span-2 md:col-span-2',
  },
  { key: 'project2', category: 'finishes', img: imgProject02, span: '' },
  { key: 'project3', category: 'coatings', img: imgProject03, span: '' },
  { key: 'project4', category: 'finishes', img: imgProject04, span: 'sm:col-span-2 md:col-span-2' },
  { key: 'project5', category: 'commercial', img: imgProject05, span: '' },
  {
    key: 'project6',
    category: 'commercial',
    img: imgProject06,
    span: 'sm:col-span-2 md:col-span-2',
  },
  { key: 'project7', category: 'coatings', img: imgProject07, span: '' },
  { key: 'project8', category: 'commercial', img: imgVibraProject, span: '' },
];

export function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header row — label left, filters right */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-primary mb-3 block font-sans text-xs tracking-[0.25em] uppercase">
              {t('nav.portfolio')}
            </span>
            <h2 className="font-display text-foreground text-3xl md:text-5xl">
              {t('portfolio.title')}
            </h2>
          </div>

          {/* Filter tabs — minimal, no pill background */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  'font-sans text-xs tracking-wide uppercase transition-colors',
                  activeFilter === key
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(`portfolio.filters.${key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric grid */}
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn('group bg-secondary relative overflow-hidden', project.span)}
              >
                {/* Image */}
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={project.img}
                    alt={t(`portfolio.projects.${project.key}.title`)}
                    className="ease-luxury h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Project number overlay — bottom left */}
                <div className="from-ms-black/80 via-ms-black/20 absolute right-0 bottom-0 left-0 flex items-end justify-between bg-linear-to-t to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div>
                    <p className="text-ms-gold font-sans text-xs tracking-[0.2em] uppercase">
                      {t(`portfolio.filters.${project.category}`)}
                    </p>
                    <h4 className="font-display text-ms-white text-base md:text-lg">
                      {t(`portfolio.projects.${project.key}.title`)}
                    </h4>
                  </div>
                  <span className="text-ms-ash font-sans text-xs tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
