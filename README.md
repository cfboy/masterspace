# MasterSpace

Dark luxurious single-page website for **MasterSpace LLC** — a Puerto Rico construction & architectural finishes firm.

## Tech Stack

- **Frontend**: React 19, TypeScript (strict), Vite 7
- **Styling**: Tailwind CSS v4 with custom `@theme` tokens, Framer Motion
- **CMS**: Sanity Studio (embedded at `/studio`)
- **i18n**: react-i18next — Spanish (default) & English
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

- Site: `http://localhost:5173/`
- Sanity Studio: `http://localhost:5173/studio`

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + production build |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |

## Project Structure

```
src/
  components/
    sections/       # Hero, Services, About, Portfolio, etc.
    ui/             # Reusable UI components (shadcn/ui)
  hooks/            # use-sanity, use-theme, use-scroll-spy, etc.
  i18n/             # Translation files (es.json, en.json)
  lib/              # Utilities, Sanity client, constants
  main.tsx          # Entry point — routes / vs /studio
  App.tsx           # Main site layout
sanity/
  schemas/          # Sanity document schemas
  components/       # Custom Studio components (logo)
  desk-structure.ts # Sidebar structure with icons
  theme.ts          # Studio theme (buildTheme from @sanity/ui)
sanity.config.ts    # Sanity Studio configuration
```

## CMS

Sanity Studio is embedded directly in the app at `/studio`. No separate process needed — `pnpm dev` serves both the site and Studio.

**Schemas**: project, service, certification, testimonial — all with bilingual fields (ES/EN).

**Theming**: Custom Studio theme using `@sanity/ui` `buildTheme` with orange primary hue and light/dark mode support. MasterSpace logo in the navbar.

## Brand

- **Palette**: Dark monochromatic with warm gold accents
- **Accent**: `#C9A96E`
- **Fonts**: PT Serif Caption (display), Caudex (body), Inter (utility)

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | Sanity project ID |
| `VITE_SANITY_DATASET` | Sanity dataset (default: `production`) |

## Deployment

Ensure your hosting platform serves `index.html` for all routes (SPA fallback) so `/studio` works in production. Add your production domain to [Sanity CORS origins](https://www.sanity.io/manage) with credentials enabled.
