# Vasco Henriques — Portfolio

Published at **https://vascoh.github.io** (GitHub Pages, branch `master`, root).

- Source code: [`source/`](source/) — Next.js + TypeScript + Tailwind (static export)
- Editable content: `source/src/content/` (projects, experience, certifications, skills, about, site config)

## Update the site
```bash
cd source
npm ci
npm run publish   # builds and copies the static site to the repository root
cd ..
git add -A && git commit -m "Update site" && git push
```
