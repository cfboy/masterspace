import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isES = i18n.language === 'es';

  return (
    <div className="border-border flex items-center overflow-hidden border font-sans text-sm">
      <button
        onClick={() => i18n.changeLanguage('es')}
        className={cn(
          'px-2.5 py-1 transition-colors',
          isES
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        ES
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={cn(
          'px-2.5 py-1 transition-colors',
          !isES
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
    </div>
  );
}
