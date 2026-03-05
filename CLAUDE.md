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
- pnpm as package manager

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Type-check + production build
- `pnpm lint` — ESLint
- `pnpm preview` — Preview production build

## Architecture

Single-page scroll site with sections: Hero, Services, About, Portfolio, Certifications, Testimonials, Contact, Footer.

## Brand Identity

- **Colors**: Dark monochromatic palette with warm gold accents (`--color-ms-*` tokens)
- **Fonts**: PT Serif Caption (display), Caudex (body), Inter (utility)
- **Default theme**: Dark mode
- **Accent**: Gold `#C9A96E`

## Path Alias

`@/` maps to `./src/`

## i18n

- Default language: Spanish (es)
- Translation files: `public/locales/{es,en}/translation.json`
- Storage key: `ms-lang`

## Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging
- Use CSS custom properties (`var(--background)`, etc.) for theme-aware colors
- Use Tailwind brand tokens (`bg-ms-gold`, `text-ms-pearl`, etc.) for brand colors
- Animations use `--ease-luxury` cubic-bezier timing
