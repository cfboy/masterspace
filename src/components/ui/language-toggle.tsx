import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const isES = i18n.language === 'es'

  return (
    <div className="flex items-center font-sans text-sm border border-[var(--border)] rounded overflow-hidden">
      <button
        onClick={() => i18n.changeLanguage('es')}
        className={cn(
          'px-2.5 py-1 transition-colors',
          isES
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        )}
      >
        ES
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={cn(
          'px-2.5 py-1 transition-colors',
          !isES
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        )}
      >
        EN
      </button>
    </div>
  )
}
