import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight, Home, Landmark, Layers, PaintRoller, Plus } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import fresqueria03 from '@/assets/projects/la-fresqueria/la-fresqueria-03.jpeg';
import fresqueria06 from '@/assets/projects/la-fresqueria/la-fresqueria-06.jpeg';
import textures01 from '@/assets/projects/textures/textures-01.jpeg';
import textures02 from '@/assets/projects/textures/textures-02.jpeg';
import textures03 from '@/assets/projects/textures/textures-03.jpeg';
import textures04 from '@/assets/projects/textures/textures-04.jpeg';
import textures05 from '@/assets/projects/textures/textures-05.jpeg';
import textures06 from '@/assets/projects/textures/textures-06.jpeg';
import publicSector01 from '@/assets/projects/public-sector/public-sector-01.jpeg';
import publicSector02 from '@/assets/projects/public-sector/public-sector-02.jpeg';
import publicSector03 from '@/assets/projects/public-sector/public-sector-03.jpeg';
import publicSector04 from '@/assets/projects/public-sector/public-sector-04.jpeg';
import coatings01 from '@/assets/projects/specialty-coatings/specialty-coatings-01.jpeg';
import coatings02 from '@/assets/projects/specialty-coatings/specialty-coatings-02.jpeg';
import coatingsVid01 from '@/assets/projects/specialty-coatings/specialty-coatings-01.mp4';
import coatingsVid02 from '@/assets/projects/specialty-coatings/specialty-coatings-02.mp4';
import residential01 from '@/assets/projects/residential/residential-01.jpeg';
import residential02 from '@/assets/projects/residential/residential-02.jpeg';
import residential03 from '@/assets/projects/residential/residential-03.jpeg';
import residential04 from '@/assets/projects/residential/residential-04.jpeg';
import residential05 from '@/assets/projects/residential/residential-05.jpeg';
import residential06 from '@/assets/projects/residential/residential-06.jpeg';
import residential07 from '@/assets/projects/residential/residential-07.jpeg';
import residential08 from '@/assets/projects/residential/residential-08.jpeg';
import residential09 from '@/assets/projects/residential/residential-09.jpeg';
import { cn } from '@/lib/utils';

const serviceIcons = {
  residential: Home,
  commercial:  Building2,
  finishes:    Layers,
  coatings:    PaintRoller,
  public:      Landmark,
} as const;

type MediaItem = { type: 'image'; src: string } | { type: 'video'; src: string };

const serviceMedia: Record<string, MediaItem[]> = {
  residential: [
    { type: 'image', src: residential01 },
    { type: 'image', src: residential02 },
    { type: 'image', src: residential03 },
    { type: 'image', src: residential04 },
    { type: 'image', src: residential05 },
    { type: 'image', src: residential06 },
    { type: 'image', src: residential07 },
    { type: 'image', src: residential08 },
    { type: 'image', src: residential09 },
  ],
  commercial: [
    { type: 'image', src: fresqueria06 },
    { type: 'image', src: fresqueria03 },
    { type: 'image', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  ],
  finishes: [
    { type: 'image', src: textures01 },
    { type: 'image', src: textures02 },
    { type: 'image', src: textures03 },
    { type: 'image', src: textures04 },
    { type: 'image', src: textures05 },
    { type: 'image', src: textures06 },
  ],
  coatings: [
    { type: 'image', src: coatings01 },
    { type: 'image', src: coatings02 },
    { type: 'video', src: coatingsVid01 },
    { type: 'video', src: coatingsVid02 },
  ],
  public: [
    { type: 'image', src: publicSector01 },
    { type: 'image', src: publicSector02 },
    { type: 'image', src: publicSector03 },
    { type: 'image', src: publicSector04 },
  ],
};

function ServiceCarousel({ media, alt }: { media: MediaItem[]; alt: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const imageSlides = media.filter((m) => m.type === 'image').map((m) => ({ src: m.src }));

  const openLightbox = (item: MediaItem, i: number) => {
    if (item.type === 'image') {
      const imageIndex = media.slice(0, i + 1).filter((m) => m.type === 'image').length - 1;
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="w-full shrink-0 md:w-72">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {media.map((item, i) => (
              <div key={i} className="min-w-0 flex-[0_0_100%]">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    className="h-48 w-full object-cover md:h-44"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${alt} ${i + 1}`}
                    className="h-48 w-full cursor-zoom-in object-cover md:h-44"
                    onClick={() => openLightbox(item, i)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Prev / Next */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/70 p-1 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/70 p-1 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {media.map((_, i) => (
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

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={imageSlides}
        index={lightboxIndex}
      />
    </div>
  );
}

const serviceKeys = [
  'residential',
  'commercial',
  'finishes',
  'coatings',
  'public',
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
                      <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-start md:gap-12 md:pl-30">
                        <p className="font-body text-base leading-relaxed text-muted-foreground md:max-w-2xl">
                          {t(`services.items.${key}.description`)}
                        </p>
                        <ServiceCarousel
                          media={serviceMedia[key]}
                          alt={t(`services.items.${key}.title`)}
                        />
                      </div>
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
