# CMS Strategy Evaluation for MasterSpace

## Context

MasterSpace is a fully static React SPA (React 19 + Vite 7 + Tailwind v4) deployed on GitHub Pages. All content is hardcoded: portfolio data in TypeScript components with 60+ static image imports, text in i18n JSON files (`src/i18n/es.json`, `en.json`). Adding a new portfolio project requires editing TypeScript source code, adding image imports, updating both translation files, committing to git, and rebuilding — a developer-only workflow.

**Goal**: $0 cost, best possible implementation, non-technical editors can manage content.

---

## Final Recommendation: Sanity CMS (Free Tier)

After evaluating all options, **Sanity CMS** is the best fit given the user's priorities:
- $0 cost (free tier: 20 users, 10K docs, 10 GB storage, 10 GB bandwidth)
- Best editorial UX of all options — polished, modern admin UI
- Built-in image CDN with automatic optimization (eliminates the need for `sharp` build scripts)
- Native i18n with field-level localization
- Non-technical editors log in with email/Google — no GitHub account needed
- Hosting on Netlify (free tier, 100 GB bandwidth, allows commercial use)

### Why Not Decap CMS?

Decap is cheaper/simpler but has significant UX limitations:
- Basic form-based UI (built in 2017 with React, carries technical debt)
- Slow loading (~1.5s per page, individual API calls per content piece)
- No live preview of content
- Requires Netlify Identity setup for non-GitHub auth (adds complexity)
- Image management is basic — no automatic optimization
- Bilingual content setup is awkward (manual schema config per locale)
- Community is fragmenting (users migrating to Sveltia CMS)

For non-technical editors adding construction portfolio projects with photos, Sanity's Studio provides a substantially better experience.

### Why Not Vercel?

**Vercel's free (Hobby) tier prohibits commercial use.** Since MasterSpace is a business website, this is a violation of their terms. **Netlify's free tier allows commercial use** and provides 100 GB bandwidth/month, built-in CI/CD, and native Decap/Identity integration.

---

## Detailed Research

### 1. Editorial UX Comparison

**Sanity Studio:**
- Polished, modern React-based admin panel (customizable)
- Real-time collaboration — multiple editors can work simultaneously
- Drag-and-drop, rich text editor, image hotspot/crop tools
- Custom input components and dashboard widgets
- AI Assist feature for content generation (Spring 2025 release)
- Schema defined as code — developer builds the editorial interface once, editors use it forever
- Access at a separate URL: `masterspace.sanity.studio` (free subdomain)

**Decap CMS:**
- Functional but dated form-based UI
- Three tabs: Content, Workflow, Media
- 16 built-in widgets (string, image, list, markdown, etc.)
- No live preview, no real-time collaboration
- Editorial workflow with draft/review/publish states
- Admin panel at `masterspacellc.com/admin`
- Slow — makes individual REST API calls per content piece

**For a construction firm adding project portfolios**: Sanity wins decisively. The image handling alone (hotspot cropping, automatic responsive sizes via CDN) is worth the setup effort for a photo-heavy site.

### 2. Hosting Implications

| Feature | GitHub Pages (current) | Netlify (recommended) | Vercel |
|---------|----------------------|----------------------|--------|
| **Cost** | $0 | $0 | $0 (Hobby) |
| **Commercial use** | Yes | Yes | **No** (violates ToS) |
| **Bandwidth** | Unlimited (soft) | 100 GB/mo | 100 GB/mo |
| **Build pipeline** | Manual (or GitHub Actions) | Built-in CI/CD | Built-in CI/CD |
| **Serverless functions** | No | Yes (125K inv/mo) | Yes |
| **CDN** | Basic | Global CDN | Global Edge |
| **Identity/Auth** | No | Netlify Identity (free, 5 users) | No |
| **Form handling** | No | Built-in (100 submissions/mo) | No |

**Recommended: Netlify Free Tier**
- Automated builds on git push (no GitHub Actions needed)
- Netlify Identity for CMS auth if using Decap (not needed with Sanity)
- Built-in form handling could replace the Formspree/EmailJS TODO in the contact form
- Deploy previews for every PR
- Migration: change DNS from GitHub Pages to Netlify, connect repo — ~15 min

### 3. Migration Effort

**Phase 1: Sanity Setup (1-2 days)**
- Install `@sanity/client` and `sanity` packages
- Define content schemas: Project, Service, Testimonial, Certification
- Configure i18n with field-level localization (ES/EN)
- Deploy Sanity Studio to `masterspace.sanity.studio` (free)
- Migrate existing content: 4 projects, 6 services, 3 testimonials, 3 certifications

**Phase 2: Image Migration (1 day)**
- Upload 55+ images to Sanity's asset pipeline
- Each image gets automatic CDN delivery with on-the-fly optimization
- Remove `src/assets/projects/` directory (saves ~25 MB from repo)
- No need for `sharp` build scripts — Sanity handles optimization

**Phase 3: Component Refactoring (2-3 days)**
- `src/components/sections/portfolio.tsx` — replace 35 static imports with Sanity query + CDN image URLs
- `src/components/sections/services.tsx` — replace 27 static imports similarly
- `src/components/sections/testimonials.tsx` — pull from Sanity
- `src/components/sections/certifications.tsx` — pull from Sanity
- Add a data fetching layer (fetch at build time or runtime with SWR/React Query)
- Update i18n: portfolio/service text comes from Sanity instead of JSON files

**Phase 4: Hosting Migration (30 min)**
- Connect repo to Netlify
- Configure build command: `pnpm build`
- Set environment variable: `SANITY_PROJECT_ID`
- Update DNS (CNAME from GitHub Pages to Netlify)

**Phase 5: Contact Form (30 min)**
- Replace the TODO in `contact.tsx` with Netlify Forms (built-in, free, 100 submissions/mo)

**Total estimated effort: 4-6 days of development**

### 4. Cost Projections

**Sanity Free Tier Limits:**

| Resource | Free Limit | MasterSpace Usage (current) | At 20 projects | At 50 projects |
|----------|-----------|---------------------------|----------------|----------------|
| Documents | 10,000 | ~15 (4 projects + services + testimonials) | ~50 | ~120 |
| API requests | 200,000/mo | ~5,000/mo (low traffic site) | ~10,000/mo | ~25,000/mo |
| Assets storage | 10 GB | ~25 MB (55 images) | ~100 MB | ~250 MB |
| Bandwidth | 10 GB | ~2-5 GB/mo estimate | ~5-8 GB/mo | ~8-15 GB/mo |
| Users | 20 | 1-2 editors | 2-3 editors | 3-5 editors |

**Verdict: Free tier is more than sufficient for the foreseeable future.** Even at 50 projects, MasterSpace uses ~1.2% of the document limit, ~12.5% of API requests, ~2.5% of storage, and well under bandwidth limits. The site would need to become extremely high-traffic (100K+ monthly visitors) before approaching free tier limits.

**Netlify Free Tier:**

| Resource | Free Limit | MasterSpace Usage |
|----------|-----------|-------------------|
| Bandwidth | 100 GB/mo | ~5-10 GB/mo |
| Build minutes | 300/mo | ~5 min/build x ~10 builds/mo = 50 min |
| Forms | 100 submissions/mo | Sufficient for contact form |
| Sites | Unlimited | 1 |

**Total projected cost: $0/month** for at least the next 2-3 years of growth.

**When costs would start**: If MasterSpace grows to 100K+ monthly visitors or 500+ high-res images, the Sanity Growth tier ($15/user/mo) might be needed. This is unlikely for a Puerto Rico construction firm's portfolio site.

---

## Implementation Plan

### Phase 1: Sanity CMS Setup
- `npm create sanity@latest` — initialize Sanity project with schemas
- Define schemas: `project.ts` (title, location, description, cover, album[], all with ES/EN), `service.ts`, `testimonial.ts`, `certification.ts`
- Configure i18n: document-level internationalization with `@sanity/document-internationalization` plugin
- Deploy Studio to `masterspace.sanity.studio`
- Migrate existing content from JSON/TypeScript into Sanity

### Phase 2: Image Migration
- Upload all images from `src/assets/projects/` to Sanity
- Sanity CDN auto-generates optimized sizes (no `sharp` scripts needed)
- Remove static image files from repo

### Phase 3: Component Refactoring
- Add `@sanity/client` to the project
- Create `src/lib/sanity.ts` — client config + query helpers
- Refactor `portfolio.tsx`: fetch projects from Sanity, use CDN image URLs
- Refactor `services.tsx`: same pattern
- Refactor `testimonials.tsx`, `certifications.tsx`
- Simplify i18n JSON files (remove sections now managed by Sanity)

### Phase 4: Hosting Migration
- Connect GitHub repo to Netlify
- Configure build: `pnpm build`, publish dir: `dist`
- Set env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`
- Update DNS: CNAME `masterspacellc.com` → Netlify

### Phase 5: Contact Form
- Replace TODO in `contact.tsx` with Netlify Forms integration

---

## Key Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/portfolio.tsx` | Replace 35 static imports with Sanity query + CDN URLs |
| `src/components/sections/services.tsx` | Replace 27 static imports with Sanity data |
| `src/components/sections/testimonials.tsx` | Fetch from Sanity |
| `src/components/sections/certifications.tsx` | Fetch from Sanity |
| `src/components/sections/contact.tsx` | Integrate Netlify Forms (replace Formspree TODO) |
| `src/i18n/es.json`, `en.json` | Remove sections managed by Sanity |
| `vite.config.ts` | Add Sanity env vars |
| **New:** `src/lib/sanity.ts` | Sanity client config + GROQ queries |
| **New:** `sanity/` directory | Sanity Studio schemas and config |
| **New:** `netlify.toml` | Netlify build configuration |

## Verification

1. `pnpm build` — site builds without errors
2. `pnpm dev` — all portfolio projects render with Sanity CDN images + bilingual text
3. Access `masterspace.sanity.studio` — verify editors can add/edit projects, upload images, manage translations
4. Test adding a new project via Sanity Studio — verify it appears on site after rebuild
5. Test contact form submission via Netlify Forms
6. Verify image CDN delivers optimized sizes at different viewports

## Sources

- [Sanity Pricing](https://www.sanity.io/pricing)
- [Sanity Studio Features](https://www.sanity.io/studio)
- [Decap CMS Editor Features](https://decapcms.org/features/editor/)
- [Netlify vs Vercel Comparison](https://www.netlify.com/guides/netlify-vs-vercel/)
- [Static Hosting Comparison](https://namastedev.com/blog/hosting-a-static-website-comparing-github-pages-netlify-and-vercel/)
- [Sveltia CMS as Decap Alternative](https://dubasipavankumar.com/blog/sveltia-cms-migration-decap-replacement/)
