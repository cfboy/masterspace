# MasterSpace Website

## Project Overview

MasterSpace LLC company website — a dark luxurious single-page site for a Puerto Rico construction & architectural finishes firm.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 7 with `@tailwindcss/vite`
- Tailwind CSS v4 with custom `@theme` tokens
- Framer Motion for animations
- shadcn/ui (new-york style) for components
- react-i18next for bilingual support (ES/EN)
- Sanity CMS (embedded Studio at `/studio`)
- pnpm as package manager

## Commands

- `pnpm dev` — Start dev server (site at `/`, Studio at `/studio`)
- `pnpm build` — Type-check + production build
- `pnpm lint` — ESLint
- `pnpm preview` — Preview production build

## Architecture

Single-page scroll site with sections: Hero, Services, About, Portfolio, Certifications, Testimonials, Contact, Footer.

Sanity Studio is embedded at `/studio` — routing is handled via pathname check in `src/main.tsx` (no router library). Dynamic imports ensure code splitting between the public site and Studio bundles.

## CMS (Sanity)

- **Studio route**: `/studio` (embedded in the React app)
- **Project ID**: `ls1g2tok`
- **Dataset**: `production`
- **Config**: `sanity.config.ts` (basePath: `/studio`)
- **Schemas**: `sanity/schemas/` — project, service, certification, testimonial
- **Structure**: `sanity/desk-structure.ts` — organized sidebar with icons
- **Theme**: `sanity/theme.ts` — `@sanity/ui` `buildTheme` with orange primary hue, supports light/dark mode
- **Logo**: `sanity/components/StudioLogo.tsx` — custom MasterSpace logo in Studio navbar
- **Client**: `src/lib/sanity.ts` — GROQ queries, image URL builder, localized content helpers
- **Data hook**: `src/hooks/use-sanity.ts` — generic fetcher with caching, loading/error states

## Brand Identity

- **Colors**: Dark monochromatic palette with warm gold accents (`--color-ms-*` tokens)
- **Fonts**: PT Serif Caption (display), Caudex (body), Inter (utility)
- **Default theme**: Dark mode
- **Accent**: Gold `#C9A96E`

## Path Alias

`@/` maps to `./src/`

## i18n

- Default language: Spanish (es)
- Translation files: `src/i18n/{es,en}.json`
- Storage key: `ms-lang`

## Environment Variables

- `VITE_SANITY_PROJECT_ID` — Sanity project ID
- `VITE_SANITY_DATASET` — Sanity dataset (defaults to `production`)

## Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging
- Use CSS custom properties (`var(--background)`, etc.) for theme-aware colors
- Use Tailwind brand tokens (`bg-ms-gold`, `text-ms-pearl`, etc.) for brand colors
- Animations use `--ease-luxury` cubic-bezier timing
