import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

type Category = 'all' | 'residential' | 'commercial' | 'finishes' | 'coatings'

const filterKeys: Category[] = ['all', 'residential', 'commercial', 'finishes', 'coatings']

interface Project {
  key: string
  category: Exclude<Category, 'all'>
  aspect: string
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
]

export function Portfolio() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="portafolio" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('portfolio.title')}
          subtitle={t('portfolio.subtitle')}
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                'px-5 py-2 text-sm font-sans rounded-full border transition-colors',
                activeFilter === key
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                  : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
              )}
            >
              {t(`portfolio.filters.${key}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-lg bg-[var(--card)] border border-[var(--border)]"
              >
                <div className={cn(project.aspect, 'bg-[var(--secondary)] flex items-center justify-center')}>
                  <span className="font-sans text-xs text-[var(--muted-foreground)]">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ms-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                  <h4 className="font-display text-lg text-ms-white mb-1">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h4>
                  <p className="font-sans text-xs text-ms-gold mb-3">
                    {t(`portfolio.filters.${project.category}`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-ms-gold hover:underline">
                    {t('portfolio.view_more')} <ExternalLink size={14} />
                  </span>
                </div>

                {/* Gold corner on hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[var(--primary)] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
