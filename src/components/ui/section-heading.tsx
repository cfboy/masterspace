import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="h-px w-12 bg-[var(--primary)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
        <span className="h-px w-12 bg-[var(--primary)]" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-[var(--muted-foreground)] text-lg mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
