import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

import { useSanity } from '@/hooks/use-sanity';
import { cn } from '@/lib/utils';
import { fetchProjects, localized, urlFor, type SanityProject } from '@/lib/sanity';

export function Portfolio() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { data: projects, loading } = useSanity(useCallback(() => fetchProjects(), []), 'projects');

  const [lightboxProject, setLightboxProject] = useState<SanityProject | null>(null);
  const [tappedKey, setTappedKey] = useState<string | null>(null);

  if (loading || !projects) {
    return (
      <section id="portafolio" className="px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-primary mb-3 block font-sans text-xs tracking-[0.25em] uppercase">
              {t('nav.portfolio')}
            </span>
            <h2 className="font-display text-foreground text-3xl md:text-5xl">
              {t('portfolio.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary aspect-4/3 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portafolio" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <span className="text-primary mb-3 block font-sans text-xs tracking-[0.25em] uppercase">
            {t('nav.portfolio')}
          </span>
          <h2 className="font-display text-foreground text-3xl md:text-5xl">
            {t('portfolio.title')}
          </h2>
          <p className="text-muted-foreground mt-4 font-sans text-sm">{t('portfolio.subtitle')}</p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const title = localized(project, 'title', lang);
            const location = localized(project, 'location', lang);
            const albumCount = project.album?.length ?? 0;
            const coverUrl = urlFor(project.cover).width(800).quality(80).auto('format').url();

            return (
              <button
                key={project._id}
                className="group bg-secondary relative overflow-hidden text-left focus:outline-none"
                onClick={() => {
                  setTappedKey(tappedKey === project.key ? null : project.key);
                  setLightboxProject(project);
                }}
                aria-label={title}
              >
                {/* Cover image */}
                <div className="aspect-4/3 cursor-zoom-in overflow-hidden">
                  <img
                    src={coverUrl}
                    alt={title}
                    className="ease-luxury h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Overlay */}
                <div
                  className={cn(
                    'from-ms-black/85 via-ms-black/20 absolute right-0 bottom-0 left-0 flex items-end justify-between bg-linear-to-t to-transparent p-4 transition-opacity duration-300',
                    'md:opacity-0 md:group-hover:opacity-100',
                    tappedKey === project.key ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <div>
                    <p className="text-ms-gold font-sans text-xs tracking-[0.2em] uppercase">
                      {location}
                    </p>
                    <h4 className="font-display text-ms-white text-base md:text-lg">
                      {title}
                    </h4>
                    <p className="text-ms-ash mt-1 font-sans text-xs">
                      {t('portfolio.photoCount', { count: albumCount })}
                    </p>
                  </div>
                  <span className="text-ms-ash font-sans text-xs tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxProject !== null}
        close={() => setLightboxProject(null)}
        slides={
          lightboxProject?.album.map((img) => ({
            src: urlFor(img).width(1600).quality(85).auto('format').url(),
          })) ?? []
        }
        index={0}
        plugins={[Thumbnails]}
      />
    </section>
  );
}
