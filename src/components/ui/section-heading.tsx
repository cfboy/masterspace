import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 text-center md:mb-16"
    >
      <div className="mb-4 flex items-center justify-center gap-4">
        <span className="bg-primary h-px w-12" />
        <span className="bg-primary h-1.5 w-1.5 rounded-full" />
        <span className="bg-primary h-px w-12" />
      </div>
      <h2 className="font-display text-foreground text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="font-body text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
