# AGENTS.md — Mulberry (`@lexington/mulberry`)

**Mulberry** is a multi-page marketing site for a professional services / accounting-style firm: landing hero, stats, services and industries previews, case studies, testimonials, blog, team, pricing, locations, contact, FAQ, and legal pages. Primary use case is **SaaS-style marketing and lead generation** for a services business (content and imagery are accounting/consulting oriented).

## Tech stack

| Area | Details |
|------|---------|
| Framework | [Astro](https://astro.build/) `^7.2.2` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) `^4.3.3` via `@tailwindcss/vite` in `astro.config.mjs` (`vite.plugins` only) |
| Content | MDX `@astrojs/mdx` `^7.0.5`; content collections in `src/content.config.ts` with `astro:content` + `astro/zod` + `astro/loaders` `glob` |
| RSS | `@astrojs/rss` `^4.0.19` (`src/pages/rss.xml.js`, sourced from the `posts` content collection) |
| Sitemap | `@astrojs/sitemap` `^3.7.3` |
| SEO component | `@lexingtonthemes/seo` `^0.1.0` (used in `src/components/fundations/head/Seo.astro`) |
| Tailwind plugins (CSS) | `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide` (see `src/styles/global.css`) |
| Type-checking | `@astrojs/check` `^0.9.10` |
| Language | TypeScript `^6.0.3` |

Path alias: `@/*` → `src/*` (`tsconfig.json`).

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes (see [Routing](#routing-conventions)); includes `blog/`, `case-studies/`, `industries/`, `legal/`, `services/`, `team/`, `system/` (design tokens UI), `404.astro`, `rss.xml.js` |
| `src/layouts/` | `BaseLayout.astro`, plus `BlogLayout`, `LegalLayout`, `ServicesLayout`, `TeamLayout`, `IndustriesLayout`, `CaseStudiesLayout` |
| `src/components/` | Feature folders (`blog/`, `contact/`, `landing/`, …) and `global/` (`Navigation.astro`, `Footer.astro`, `Search.astro`, `Megamenu.astro`) |
| `src/components/fundations/` | **Keep this spelling.** Shared head (`BaseHead.astro`, `Seo.astro`, …), UI primitives, icons, `scripts/` (e.g. Fuse for search) |
| `src/content/` | Markdown for collections (see below); subfolders `team/`, `posts/`, `infopages/`, `services/`, `industries/`, `caseStudies/` |
| `src/styles/` | `global.css` — Tailwind v4 `@theme` tokens (fonts, accent/base colors) and plugins |
| `src/images/` | Imported/collected images (e.g. blog, team, services) referenced from frontmatter |
| `public/` | Static assets; this repo currently includes `public/ceo.mp4` only |

## Content collections (`src/content.config.ts`)

All collections use the `glob` loader. Image fields use Astro’s `image()` helper — use paths that resolve for the content pipeline (existing entries often use `/src/images/...` under `image.url`).

### `team` → `src/content/team/**/*.md`

- **Required:** `name` (string), `image` (`url` via `image()` + `alt`)
- **Optional:** `role`, `bio`, `socials` (`twitter`, `website`, `linkedin`, `email`)
- **Template:** copy structure from `src/content/team/sarah-chen.md`

### `posts` → `src/content/posts/**/*.md`

- **Required:** `title`, `pubDate` (coerced date), `description`, `team` (string id/slug, references team usage in pages), `image` (`url` + `alt`), `tags` (string array)
- **Template:** `src/content/posts/1.md`

### `infopages` → `src/content/infopages/**/*.md`

- **Required:** `page` (string, e.g. display title), `pubDate` (coerced date)
- **Images:** not in schema
- **Template:** `src/content/infopages/terms.md`

### `services` → `src/content/services/**/*.md`

- **Required:** `title`, `summary`, `category` — one of `Advisory` \| `Compliance` \| `Operations`
- **Optional / defaulted:** `features`, `outcomes`, `industries` (arrays, default `[]`), `pricing` (`startingPrice`, `monthlyPrice`, `pricingModel` as `one-time` \| `monthly` \| `hourly` \| `custom`, `note`), `image`, `pubDate`, `updatedDate`
- **Template:** `src/content/services/bookkeeping-accounting.md`

### `industries` → `src/content/industries/**/*.md`

- **Required:** `title`, `summary`
- **Optional / defaulted:** `painPoints`, `relevantServices` (arrays, default `[]`), `image`
- **Template:** `src/content/industries/healthcare-medical.md`

### `caseStudies` → `src/content/caseStudies/**/*.md`

- **Required:** `title`, `client`, `industry`, `services` (string array), `challenge`, `solution`, `results` (array of `{ label, value }`), `pubDate`
- **Optional:** `testimonial` (`quote`, `author`, `role?`), `image`
- **Template:** `src/content/caseStudies/healthcare-turnaround.md`

Exported collection keys: `team`, `infopages`, `posts`, `services`, `industries`, `caseStudies`.

## Routing conventions

- **Blog:** `/blog` → `src/pages/blog/index.astro`; post → `/blog/posts/[slug]` via `src/pages/blog/posts/[...slug].astro` (`getCollection("posts")`, slug = `entry.id`); tags → `/blog/tags`, `/blog/tags/[tag]`.
- **Legal (infopages):** `/legal/[slug]` → `src/pages/legal/[...slug].astro` (`getCollection("infopages")`, slug = `page.id`).
- **Services:** `/services` + `/services/[slug]` → `src/pages/services/index.astro` + `[...slug].astro`.
- **Industries:** `/industries` + `/industries/[slug]`.
- **Case studies:** `/case-studies` + `/case-studies/[slug]`.
- **Team:** `/team` + `/team/[slug]`.
- **RSS:** `/rss.xml` from `src/pages/rss.xml.js` (items come from the `posts` content collection via `getCollection`, linking to `/blog/posts/{id}/`; there is **no** first-party changelog route or collection in this repo).
- **Other static routes** (non-collection): e.g. `/`, `/about`, `/contact`, `/faq`, `/pricing`, `/locations`, `/testimonials`, `/system/*`.

Dynamic segments use `[...slug].astro` where listed; params map to content `id` (filename without extension) for those routes.

## Customization guide

- **Site URL / canonical domain:** `site` in `astro.config.mjs` (currently `https://yourwebsite.com`). Align with production domain for sitemap/RSS `context.site`. Default SEO copy in `src/components/fundations/head/Seo.astro` is still placeholder — update titles, canonical, Open Graph, and Twitter fields (or wire props if you extend the pattern).
- **Brand colors & typography:** `src/styles/global.css` — `@theme` defines `--font-display`, `--font-sans`, `--color-accent-*`, `--color-base-*`, etc.
- **Navigation / footer / megamenu:** `src/components/global/Navigation.astro`, `Footer.astro`, `Megamenu.astro`.
- **Page shell / head:** `src/layouts/BaseLayout.astro` (imports `global.css`, `BaseHead`, optional layout flags like `hideNavigation`). `src/components/fundations/head/BaseHead.astro` composes `Seo`, `Meta`, `Fonts`, `Favicons`, and `FuseJS` for search.

## Commands

From `README.md` (project root):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (`astro dev`) |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |

(`package.json` also defines `npm start` → `astro dev`.)

## Guardrails

- **Do not rename** `src/components/fundations/` — code and comments rely on this spelling.
- **Content schemas:** do not add required fields or change enums in `src/content.config.ts` without updating every layout/page that reads `entry.data` (and sample markdown).
- **Minimal diffs:** match existing import style (`@/…`), layout patterns, and Tailwind utility usage.
- **Dependencies:** do not assume packages that are not listed in `package.json`.

## Lexington Themes links

Use these as documented in `README.md`:

- Theme: https://lexingtonthemes.com/templates/mulberry  
- Documentation: https://lexingtonthemes.com/documentation  
- Changelog: https://lexingtonthemes.com/changelog/Mulberry  
- Support: https://lexingtonthemes.com/legal/support/  

Publisher: https://lexingtonthemes.com/
