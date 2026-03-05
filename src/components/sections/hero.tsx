import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ms-black/80 via-ms-onyx/70 to-ms-onyx" />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-ms-gold mb-6"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ms-white leading-tight"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#portafolio"
            className="px-8 py-3.5 bg-ms-gold text-ms-black font-body font-bold rounded hover:bg-ms-gold-light transition-colors"
          >
            {t('hero.cta')}
          </a>
          <a
            href="#contacto"
            className="px-8 py-3.5 border border-ms-gold text-ms-gold font-body font-bold rounded hover:bg-ms-gold hover:text-ms-black transition-colors"
          >
            {t('hero.cta_secondary')}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ms-gold/60 hover:text-ms-gold transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  )
}
