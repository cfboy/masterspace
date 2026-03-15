import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  Landmark,
  Layers,
  type LucideIcon,
  PaintRoller,
  Plus,
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { useSanity } from '@/hooks/use-sanity';
import {
  type SanityMediaItem,
  type SanityService,
  fetchServices,
  localized,
  urlFor,
} from '@/lib/sanity';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Layers,
  PaintRoller,
  Landmark,
  LuHome: Home,
  LuBuilding2: Building2,
  LuLayers: Layers,
  LuPaintRoller: PaintRoller,
  LuLandmark: Landmark,
};

function resolveIcon(icon: SanityService['icon']): LucideIcon {
  if (!icon) return Home;
  const name = typeof icon === 'object' ? icon.name : icon;
  return iconMap[name] ?? Home;
}

function getMediaUrl(item: SanityMediaItem): string {
  if (item._type === 'image') {
    return urlFor(item).width(800).quality(80).auto('format').url();
  }
  return item.asset?.url ?? '';
}

function isVideo(item: SanityMediaItem): boolean {
  if (item._type === 'file') return true;
  if (item.asset?.mimeType?.startsWith('video/')) return true;
  return false;
}

function ServiceCarousel({ media, alt }: { media: SanityMediaItem[]; alt: string }) {
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
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const imageSlides = media
    .filter((m) => !isVideo(m))
    .map((m) => ({ src: urlFor(m).width(1600).quality(85).auto('format').url() }));

  const openLightbox = (item: SanityMediaItem, i: number) => {
    if (!isVideo(item)) {
      const imageIndex = media.slice(0, i + 1).filter((m) => !isVideo(m)).length - 1;
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
                {isVideo(item) ? (
                  <video
                    src={getMediaUrl(item)}
                    className="h-48 w-full object-cover md:h-44"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={getMediaUrl(item)}
                    alt={`${alt} ${i + 1}`}
                    className="h-48 w-full cursor-zoom-in object-cover md:h-44"
                    onClick={() => openLightbox(item, i)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="bg-background/70 text-foreground hover:bg-primary hover:text-primary-foreground absolute top-1/2 left-2 -translate-y-1/2 p-1 backdrop-blur-sm transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="bg-background/70 text-foreground hover:bg-primary hover:text-primary-foreground absolute top-1/2 right-2 -translate-y-1/2 p-1 backdrop-blur-sm transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-px transition-all duration-300',
              i === selectedIndex ? 'bg-primary w-8' : 'bg-border hover:bg-muted-foreground w-4'
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

export function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { data: services, loading } = useSanity(
    useCallback(() => fetchServices(), []),
    'services'
  );
  const [active, setActive] = useState<string | null>(null);

  if (loading || !services) {
    return (
      <section id="servicios" className="px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-start gap-8 md:mb-24">
            <div className="pt-2">
              <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase">
                {t('nav.services')}
              </span>
            </div>
            <h2 className="font-display text-foreground max-w-xl text-3xl leading-tight md:text-5xl">
              {t('services.title')}
            </h2>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-secondary h-20 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="servicios" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-start gap-8 md:mb-24">
          <div className="pt-2">
            <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase">
              {t('nav.services')}
            </span>
          </div>
          <h2 className="font-display text-foreground max-w-xl text-3xl leading-tight md:text-5xl">
            {t('services.title')}
          </h2>
        </div>

        <div>
          {services.map((service: SanityService, i: number) => {
            const Icon = resolveIcon(service.icon);
            const isOpen = active === service.key;
            const title = localized(service, 'title', lang);
            const description = localized(service, 'description', lang);

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-border h-px w-full" />

                <button
                  className="group w-full cursor-pointer py-7 text-left md:py-9"
                  onClick={() => setActive(isOpen ? null : service.key)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 md:gap-10">
                    <span
                      className={cn(
                        'w-10 shrink-0 font-sans text-sm tabular-nums transition-colors duration-300',
                        isOpen ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={cn(
                        'transition-colors duration-300',
                        isOpen
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </span>

                    <h3
                      className={cn(
                        'font-display flex-1 text-2xl transition-colors duration-300 md:text-3xl',
                        isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      )}
                    >
                      {title}
                    </h3>

                    <span
                      className={cn(
                        'text-muted-foreground ml-auto shrink-0 transition-transform duration-500',
                        isOpen ? 'text-primary rotate-45' : 'group-hover:text-foreground'
                      )}
                      aria-hidden="true"
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </div>

                  <motion.div
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                    className="bg-primary mt-3 h-px"
                  />
                </button>

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
                      <div
                        className={cn(
                          'pb-10 md:pl-30',
                          service.media?.length > 0
                            ? 'flex flex-col gap-6 md:flex-row md:items-start md:gap-12'
                            : ''
                        )}
                      >
                        <p className="font-body text-muted-foreground text-base leading-relaxed md:max-w-2xl">
                          {description}
                        </p>
                        {service.media?.length > 0 && (
                          <ServiceCarousel media={service.media} alt={title} />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div className="bg-border h-px w-full" />
        </div>
      </div>
    </section>
  );
}
