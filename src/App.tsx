import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/use-theme'

function App() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Temporary brand color preview — will be replaced by actual sections */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-[var(--border)]">
        <h1 className="font-display text-2xl text-[var(--primary)]">
          MasterSpace
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 text-sm font-sans rounded border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <section className="mb-16">
          <h2 className="font-display text-4xl text-[var(--foreground)] mb-2">
            {t('hero.headline')}
          </h2>
          <p className="font-body text-[var(--muted-foreground)] text-lg">
            {t('hero.tagline')}
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-body font-bold rounded hover:opacity-90 transition-opacity">
              {t('hero.cta')}
            </button>
            <button className="px-6 py-3 border border-[var(--primary)] text-[var(--primary)] font-body font-bold rounded hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors">
              {t('hero.cta_secondary')}
            </button>
          </div>
        </section>

        {/* Brand Color Palette Preview */}
        <section className="mb-16">
          <h3 className="font-display text-2xl mb-6 text-[var(--foreground)]">
            Brand Palette
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { name: 'Black', class: 'bg-ms-black' },
              { name: 'Charcoal', class: 'bg-ms-charcoal' },
              { name: 'Onyx', class: 'bg-ms-onyx' },
              { name: 'Graphite', class: 'bg-ms-graphite' },
              { name: 'Slate', class: 'bg-ms-slate' },
              { name: 'Ash', class: 'bg-ms-ash' },
              { name: 'Silver', class: 'bg-ms-silver' },
              { name: 'Pearl', class: 'bg-ms-pearl' },
              { name: 'White', class: 'bg-ms-white' },
              { name: 'Gold', class: 'bg-ms-gold' },
              { name: 'Gold Light', class: 'bg-ms-gold-light' },
              { name: 'Gold Dark', class: 'bg-ms-gold-dark' },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className={`${color.class} w-full aspect-square rounded border border-[var(--border)]`}
                />
                <span className="text-xs font-sans text-[var(--muted-foreground)] mt-1 block">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Preview */}
        <section className="mb-16">
          <h3 className="font-display text-2xl mb-6 text-[var(--foreground)]">
            Typography
          </h3>
          <div className="space-y-4">
            <p className="font-display text-3xl">
              PT Serif Caption — Display & Headlines
            </p>
            <p className="font-body text-xl">
              Caudex — Body text and navigation
            </p>
            <p className="font-body text-xl font-bold">
              Caudex Bold — Emphasis and buttons
            </p>
            <p className="font-sans text-sm text-[var(--muted-foreground)]">
              Inter — Labels, badges, and form inputs
            </p>
          </div>
        </section>

        {/* Card Preview */}
        <section>
          <h3 className="font-display text-2xl mb-6 text-[var(--foreground)]">
            Card Component
          </h3>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 border-t-2 border-t-[var(--primary)]">
            <h4 className="font-display text-lg text-[var(--foreground)] mb-2">
              Sample Service Card
            </h4>
            <p className="font-body text-[var(--card-foreground)]">
              This demonstrates the card styling with charcoal background, gold
              top border accent, and proper text hierarchy.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--primary)] bg-ms-black px-8 py-8 text-center">
        <p className="font-sans text-sm text-[var(--muted-foreground)]">
          {t('footer.copyright')}
        </p>
      </footer>
    </div>
  )
}

export default App
