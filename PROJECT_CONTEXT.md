# Project Context

Last updated: 2026-05-20 16:48:23 BST

## Current State

- Project: Mister FAPC B2B cleaning website.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS.
- Local dev URL: `http://localhost:3000`.
- Dev server is running on port `3000` (`next-server`, pid `3944`).
- Use portable Node if system Node/npm is unavailable:
  ```bash
  PATH="$HOME/.local/share/codex-node/current/bin:$PATH"
  ```

## What Changed In This Session

- Reviewed project startup context after `привет`: `AGENTS.md`, `README.md`, `package.json`, main configs, `PROJECT_CONTEXT.md`, project tree, and main `src/` structure.
- Started the local Next.js dev server. System `npm` was unavailable, so the server was started with portable Node:
  ```bash
  PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run dev
  ```
- Replaced the unsuitable hero image for `/uslugi/uborka-torgovyh-setey/`.
- First generated a spacious shopping-mall cleaning hero, but the worker looked too unlike existing site photos.
- Generated a second image with a more consistent Mister FAPC-style worker: middle-aged woman, red shirt, blue apron/overalls, floor scrubber in a shopping mall corridor.
- Saved the accepted second image as:
  - `public/services/retail-mall-cleaning-generated-2.webp`
- Updated `src/data/site.ts` so the `retail` photo set uses the new image first; this makes it the hero image for “Уборка торговых сетей и ТЦ”.
- `public/services/retail-mall-cleaning-generated-1.webp` also exists from the first attempt but is no longer referenced.

## Important Changed Files

- `src/data/site.ts`
- `public/services/retail-mall-cleaning-generated-1.webp` (generated but not currently referenced)
- `public/services/retail-mall-cleaning-generated-2.webp` (active hero image)
- `next-env.d.ts` shows as modified after running the Next dev server; likely auto-generated/dev-server metadata.

## Commands Run

```bash
pwd
rg --files
sed -n '...' AGENTS.md README.md package.json next.config.mjs tsconfig.json tailwind.config.ts eslint.config.mjs PROJECT_CONTEXT.md
find src -maxdepth 3 -type f | sort
find src -maxdepth 3 -type d | sort
ss -ltnp 'sport = :3000'
curl -I --max-time 5 http://localhost:3000
npm run dev
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run dev
rg -n "torg|retail|торгов|ТЦ|сет" src/data src/app src/components
find public/services -maxdepth 2 -type f | sort
viewed local image assets for retail/service references
python3 snippets with PIL to convert generated PNG files to WebP assets
curl -I --max-time 10 http://localhost:3000/services/retail-mall-cleaning-generated-2.webp
curl -L --max-time 15 http://localhost:3000/uslugi/uborka-torgovyh-setey/
git diff -- src/data/site.ts
git status --short -- .
date '+%Y-%m-%d %H:%M:%S %Z'
```

## Verification Results

- Local site responds with `200 OK` at `http://localhost:3000`.
- New active hero asset responds with `200 OK`:
  - `http://localhost:3000/services/retail-mall-cleaning-generated-2.webp`
- `/uslugi/uborka-torgovyh-setey/` preloads `/services/retail-mall-cleaning-generated-2.webp`, confirming the page is using the new image.

## Known Issues / Notes

- System `npm` is not available; use portable Node path for npm commands.
- Dev server remains running on port `3000`.
- `git status --short -- .` currently shows:
  - `M next-env.d.ts`
  - `M src/data/site.ts`
  - `?? public/services/retail-mall-cleaning-generated-1.webp`
  - `?? public/services/retail-mall-cleaning-generated-2.webp`
- The first generated retail hero (`retail-mall-cleaning-generated-1.webp`) is unused and can be removed later if the user wants cleanup.
- No full `npm run lint` or `npm run build` was run after the image swap; change is limited to data reference plus static assets.

## Recommended Next Steps

- Browser-check `/uslugi/uborka-torgovyh-setey/` visually on desktop and mobile to confirm the crop works with the hero text and pricing card.
- If the new generated worker still feels imperfect, generate another variant using the accepted second image as the direction.
- Optionally remove the unused first generated image after approval.
