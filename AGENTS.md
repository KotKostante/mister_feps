# Project Agent Rules

These rules apply only inside this project folder.

## Trigger: `привет`

When the user writes exactly `привет` at the start of a work session:

1. Read this file first.
2. Get familiar with the project before answering:
   - read `README.md`;
   - read `package.json`;
   - inspect important config files such as `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, and `eslint.config.mjs`;
   - scan the project tree with `rg --files`;
   - inspect the main source structure under `src/`.
3. Read `PROJECT_CONTEXT.md` if it exists.
4. Start the site locally.
   - Preferred command:
     ```bash
     npm run dev
     ```
   - If `npm` is not available but the local portable Node installed by Codex exists, use:
     ```bash
     PATH="$HOME/.local/share/codex-node/current/bin:$PATH" npm run dev
     ```
   - The expected local address is `http://localhost:3000`.
   - If port `3000` is busy, use the next available port and tell the user the URL.
5. Verify the site responds, for example with:
   ```bash
   curl -I http://localhost:3000
   ```
6. Reply briefly in Russian that the project has been reviewed and the local site is open.

## Trigger: `пока`

When the user writes exactly `пока` before ending the session:

1. Update `PROJECT_CONTEXT.md` so the next window can quickly understand the current state.
2. Include:
   - current date and time;
   - what was changed in this session;
   - which commands were run;
   - current local URL and whether the dev server is running;
   - known issues, warnings, or unfinished work;
   - recommended next steps.
3. If code or project files were changed, mention the important changed files.
4. Keep the context concise and useful. Do not paste huge logs.
5. Reply in Russian that the context has been saved for the next window.

## Project Notes

- This is a Next.js App Router project for the Mister FAPC B2B cleaning website.
- Main commands:
  ```bash
  npm run dev
  npm run build
  npm run lint
  ```
- Do not revert user changes unless the user explicitly asks.
- Prefer small, focused edits that follow the existing project style.
