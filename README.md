# Vasco Henriques — Personal & Professional Website

Premium bilingual (EN / PT-PT) portfolio for **Vasco Henriques**, Senior BI Consultant — SQL Server, Power BI, Data & AI solutions.

> *Transforming Data into Decisions. Turning Ideas into Digital Solutions.*

## Stack
- **Next.js 16** (App Router, static export) · **TypeScript** · **Tailwind CSS v4**
- shadcn-style UI primitives (`cva` + `tailwind-merge`) · **Lucide** icons · **Geist** fonts (self-hosted)
- Animations: CSS only (scroll-driven reveal + a lightweight canvas data-network in the hero) — no animation library, to protect Core Web Vitals
- Content: typed TypeScript files in `src/content/` (no CMS, no database)
- Contact form: **Netlify Forms** (honeypot + minimum fill time + Netlify spam filter)

## Commands
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in /out
npm run lint    # type-check
```

## Deploy

**GitHub Pages (active):** every push to `master` runs `.github/workflows/pages.yml` and publishes to https://vascoh.github.io.
Requires *Settings → Pages → Source: GitHub Actions*.

**Vercel:** the linked Vercel project also deploys `master` (`vercel.json`).

### Netlify (alternative)
Connect the repository in Netlify — `netlify.toml` already defines `npm run build` → `out`.
Every `git push` to the production branch triggers a deploy. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://vascohenriques.pt`) in Netlify env vars for correct SEO/sitemap URLs.

> If GitHub Pages is still enabled for this repo, disable it (Settings → Pages) — Netlify is the deploy target.

## Structure
```
src/app/[lang]/…        pages (home, about, projects, projects/[slug], skills, experience, insights, contact)
src/app/(root)/         "/" → redirects to /en/ (or /pt/ if previously chosen)
src/components/         UI, hero, demos, contact form
src/content/            ✏️ all editable content (projects, experience, certifications, skills, posts, site config)
src/i18n/               locales + UI dictionary (EN / PT-PT)
public/images/          local images (projects screenshots, photo, og.png)
public/cv/              CV PDFs
```

See **[docs/CONTENT.md](docs/CONTENT.md)** to update content and **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for the design system and decisions.
