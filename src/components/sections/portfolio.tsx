import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

// La Fresquería
import imgFresqueria01 from '@/assets/projects/la-fresqueria/la-fresqueria-01.jpeg';
import imgFresqueria02 from '@/assets/projects/la-fresqueria/la-fresqueria-02.jpeg';
import imgFresqueria03 from '@/assets/projects/la-fresqueria/la-fresqueria-03.jpeg';
import imgFresqueria04 from '@/assets/projects/la-fresqueria/la-fresqueria-04.jpeg';
import imgFresqueria05 from '@/assets/projects/la-fresqueria/la-fresqueria-05.jpeg';
import imgFresqueria06 from '@/assets/projects/la-fresqueria/la-fresqueria-06.jpeg';
import imgFresqueria07 from '@/assets/projects/la-fresqueria/la-fresqueria-07.jpeg';
// Tres Monos
import imgTresMonos01 from '@/assets/projects/tres-monos/tres-monos-01.jpeg';
import imgTresMonos02 from '@/assets/projects/tres-monos/tres-monos-02.jpeg';
import imgTresMonos03 from '@/assets/projects/tres-monos/tres-monos-03.jpeg';
import imgTresMonos04 from '@/assets/projects/tres-monos/tres-monos-04.jpeg';
import imgTresMonos05 from '@/assets/projects/tres-monos/tres-monos-05.jpeg';
import imgTresMonos06 from '@/assets/projects/tres-monos/tres-monos-06.jpeg';
import imgTresMonos07 from '@/assets/projects/tres-monos/tres-monos-07.jpeg';
import imgTresMonos08 from '@/assets/projects/tres-monos/tres-monos-08.jpeg';
import imgTresMonos09 from '@/assets/projects/tres-monos/tres-monos-09.jpeg';
// Vibra
import imgVibra01 from '@/assets/projects/vibra/vibra-01.jpeg';
import imgVibra02 from '@/assets/projects/vibra/vibra-project.jpeg';
import { cn } from '@/lib/utils';

interface PortfolioProject {
  key: string;
  cover: string;
  album: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    key: 'laFresqueria',
    cover: imgFresqueria01,
    album: [
      imgFresqueria01,
      imgFresqueria02,
      imgFresqueria03,
      imgFresqueria04,
      imgFresqueria05,
      imgFresqueria06,
      imgFresqueria07,
    ],
  },
  {
    key: 'vibra',
    cover: imgVibra01,
    album: [imgVibra01, imgVibra02],
  },
  {
    key: 'tresMonos',
    cover: imgTresMonos01,
    album: [
      imgTresMonos01,
      imgTresMonos02,
      imgTresMonos03,
      imgTresMonos04,
      imgTresMonos05,
      imgTresMonos06,
      imgTresMonos07,
      imgTresMonos08,
      imgTresMonos09,
    ],
  },
];

export function Portfolio() {
  const { t } = useTranslation();
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);
  const [tappedKey, setTappedKey] = useState<string | null>(null);

  const openAlbum = (project: PortfolioProject) => {
    setLightboxProject(project);
  };

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
          {portfolioProjects.map((project, i) => (
            <button
              key={project.key}
              className="group bg-secondary relative overflow-hidden text-left focus:outline-none"
              onClick={() => {
                setTappedKey(tappedKey === project.key ? null : project.key);
                openAlbum(project);
              }}
              aria-label={t(`portfolio.projects.${project.key}.title`)}
            >
              {/* Cover image */}
              <div className="aspect-4/3 cursor-zoom-in overflow-hidden">
                <img
                  src={project.cover}
                  alt={t(`portfolio.projects.${project.key}.title`)}
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
                    {t(`portfolio.projects.${project.key}.location`)}
                  </p>
                  <h4 className="font-display text-ms-white text-base md:text-lg">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h4>
                  <p className="text-ms-ash mt-1 font-sans text-xs">
                    {t(`portfolio.projects.${project.key}.photoCount`, {
                      count: project.album.length,
                    })}
                  </p>
                </div>
                <span className="text-ms-ash font-sans text-xs tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox — opens the full album for the selected project */}
      <Lightbox
        open={lightboxProject !== null}
        close={() => setLightboxProject(null)}
        slides={lightboxProject?.album.map((src) => ({ src })) ?? []}
        index={0}
        plugins={[Thumbnails]}
      />
    </section>
  );
}
