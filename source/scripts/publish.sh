#!/usr/bin/env bash
# Builds the static site and copies it to the repository root,
# which GitHub Pages serves (Settings → Pages → Deploy from branch: master / root).
set -euo pipefail
cd "$(dirname "$0")/.."
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://vascoh.github.io}" npx next build
ROOT=..
# remove previous build output (never touches source/, cv-update/, README.md, .git)
rm -rf "$ROOT/_next" "$ROOT/en" "$ROOT/pt" "$ROOT/images" "$ROOT/_not-found" "$ROOT/404" \
       "$ROOT"/index.html "$ROOT"/404.html "$ROOT"/index.txt "$ROOT"/__next.* "$ROOT"/robots.txt \
       "$ROOT"/sitemap.xml "$ROOT"/icon.svg "$ROOT"/__forms.html "$ROOT/cv"
cp -r out/. "$ROOT/"
touch "$ROOT/.nojekyll"
echo "Published to repository root. Commit and push to deploy."
