import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Pause, Play } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { cn } from '@/lib/utils';

// Project photos
import imgProject01 from '@/assets/projects/la-fresqueria-01.jpeg';
import imgProject02 from '@/assets/projects/la-fresqueria-02.jpeg';
import imgProject03 from '@/assets/projects/la-fresqueria-03.jpeg';
import imgProject04 from '@/assets/projects/la-fresqueria-04.jpeg';
import imgProject05 from '@/assets/projects/la-fresqueria-05.jpeg';
import imgProject06 from '@/assets/projects/la-fresqueria-06.jpeg';
import imgProject07 from '@/assets/projects/la-fresqueria-07.jpeg';
import imgVibraProject from '@/assets/projects/vibra-project.jpeg';

type Category = 'all' | 'residential' | 'commercial' | 'finishes' | 'coatings';

const filterKeys: Category[] = ['all', 'residential', 'commercial', 'finishes', 'coatings'];

interface Project {
  key: string;
  category: Exclude<Category, 'all'>;
  img: string;
}

const projects: Project[] = [
  { key: 'project1', category: 'commercial', img: imgProject01 },
  { key: 'project2', category: 'finishes',   img: imgProject02 },
  { key: 'project3', category: 'coatings',   img: imgProject03 },
  { key: 'project4', category: 'finishes',   img: imgProject04 },
  { key: 'project5', category: 'commercial', img: imgProject05 },
  { key: 'project6', category: 'commercial', img: imgProject06 },
  { key: 'project7', category: 'coatings',   img: imgProject07 },
  { key: 'project8', category: 'commercial', img: imgVibraProject },
];

const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true });

export function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tappedKey, setTappedKey] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplayPlugin]
  );

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  /* Sync play state with autoplay plugin */
  const togglePlay = useCallback(() => {
    const ap = emblaApi?.plugins()?.autoplay;
    if (!ap) return;
    if (isPlaying) {
      ap.stop();
      setIsPlaying(false);
    } else {
      ap.play();
      setIsPlaying(true);
    }
  }, [emblaApi, isPlaying]);

  /* Track selected slide for dot indicator */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  /* Reinit carousel when filter changes */
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [emblaApi, filtered.length]);

  return (
    <section id="portafolio" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-primary mb-3 block font-sans text-xs tracking-[0.25em] uppercase">
              {t('nav.portfolio')}
            </span>
            <h2 className="font-display text-foreground text-3xl md:text-5xl">
              {t('portfolio.title')}
            </h2>
          </div>

          {/* Filters + play/pause */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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

            {/* Divider */}
            <span className="h-4 w-px bg-border" aria-hidden="true" />

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {isPlaying
                ? <Pause size={14} strokeWidth={1.5} />
                : <Play  size={14} strokeWidth={1.5} />
              }
            </button>
          </div>
        </div>

        {/* Embla carousel — bleeds edge to edge */}
        <div className="-mx-6 md:-mx-12">
          <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="flex gap-3 px-6 md:px-12">
              {filtered.map((project, i) => (
                <div
                  key={project.key}
                  className="group relative shrink-0 overflow-hidden bg-secondary w-72 md:w-[28rem]"
                  onClick={() => setTappedKey(tappedKey === project.key ? null : project.key)}
                >
                  {/* Image */}
                  <div
                    className="aspect-4/3 overflow-hidden cursor-zoom-in"
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); setLightboxOpen(true); }}
                  >
                    <img
                      src={project.img}
                      alt={t(`portfolio.projects.${project.key}.title`)}
                      className="ease-luxury h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Overlay — tap to reveal on mobile, hover on desktop */}
                  <div className={`from-ms-black/85 via-ms-black/20 absolute right-0 bottom-0 left-0 flex items-end justify-between bg-linear-to-t to-transparent p-4 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${tappedKey === project.key ? 'opacity-100' : 'opacity-0'}`}>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-px transition-all duration-300',
                i === selectedIndex ? 'w-8 bg-primary' : 'w-4 bg-border hover:bg-muted-foreground'
              )}
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={filtered.map((p) => ({ src: p.img }))}
        index={lightboxIndex}
      />
    </section>
  );
}
