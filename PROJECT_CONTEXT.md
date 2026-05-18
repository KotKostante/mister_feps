# Project Context

Last updated: 2026-05-18 07:16:35 BST

## Current State

- Project: Mister FAPC B2B cleaning website.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS.
- Local dev URL: `http://localhost:3000`.
- Dev server is running from this session.
- `curl -I http://localhost:3000` returned `200 OK`.
- System `node` is not available in this shell; use portable Node:
  ```bash
  PATH="$HOME/.local/share/codex-node/current/bin:$PATH"
  ```

## What Changed In This Session

- Investigated the user's reported JSON error after copying the site folder to a flash drive.
- Confirmed these JSON files parse correctly and are not corrupted:
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
- Found the real issue: copied `node_modules` was incomplete and the flash drive/filesystem rejects npm symlinks.
- `npm install` failed with:
  ```text
  EPERM: operation not permitted, symlink '../@babel/parser/bin/babel-parser.js' -> 'node_modules/.bin/parser'
  ```
- Reinstalled dependencies with:
  ```bash
  PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm install --no-bin-links --ignore-scripts
  ```
- Updated `package.json` scripts to call Next.js and ESLint directly through `node`, avoiding `node_modules/.bin`:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`

## Important Changed Files

- `package.json`
- `PROJECT_CONTEXT.md`

## Commands Run

```bash
pwd
rg --files -g '!*node_modules*' | head -200
ls -la
sed -n '1,220p' package.json
sed -n '1,220p' README.md
sed -n '1,220p' next.config.mjs
sed -n '1,220p' tsconfig.json
sed -n '1,220p' eslint.config.mjs
sed -n '1,220p' tailwind.config.ts
sed -n '1,220p' PROJECT_CONTEXT.md
node -e "..." # failed because system node was not found
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" node -v
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm -v
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" node -e "..." # JSON parse check
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run dev
ls -la node_modules
ls -la node_modules/.bin
du -sh node_modules package-lock.json package.json
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm install
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm install --no-bin-links
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm install --no-bin-links --ignore-scripts
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" node node_modules/next/dist/bin/next dev --webpack
curl -I http://localhost:3000
curl -I http://localhost:3000/uslugi/
curl -I http://localhost:3000/contacts/
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run lint
PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run build
date '+%Y-%m-%d %H:%M:%S %Z'
```

## Verification Results

- Local site is open at `http://localhost:3000`.
- `/`, `/uslugi/`, and `/contacts/` returned `200 OK`.
- `npm run build` passed successfully.
- `npm run lint` passed with 0 errors.
- Lint still reports 2 existing warnings about `<img>` usage:
  - `src/components/sections/marketing-hero.tsx`
  - `src/components/sections/why-us-split.tsx`

## Known Issues / Notes

- The flash drive/filesystem appears not to support npm symlink creation in `node_modules/.bin`.
- Because of that, plain dependency installs can fail unless using `--no-bin-links --ignore-scripts`, or unless the project is moved to a normal Linux filesystem.
- `node_modules` is very large after reinstalling dependencies.
- `npm install --no-bin-links --ignore-scripts` reported 1 high severity vulnerability via npm audit; no audit fix was applied.
- If the current dev process stops, restart with:
  ```bash
  PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run dev
  ```

## Recommended Next Steps

- Prefer working from an internal Linux disk or another filesystem that supports symlinks.
- If continuing from the flash drive, keep the direct `node ...` npm scripts in `package.json`.
- Do a quick visual check in the browser at `http://localhost:3000`.
