# Development workflow

This repository uses `dev` as the integration and device-testing branch.

## Branch roles

- `feature/*`, `fix/*`, `ci/*`, and other topic branches contain one focused change.
- `dev` integrates topic branches and is automatically deployed to GitHub Pages for device testing.
- `main` contains the stable version that has passed device testing.

## Required flow

1. Update local `dev` from `origin/dev`.
2. Create a topic branch from the latest `dev`.
3. Open a pull request from the topic branch to `dev`.
4. After merge, confirm the GitHub Pages deployment and test it on a real smartphone.
5. When the integrated version is approved, open a pull request from `dev` to `main`.

Do not push directly to `main` or `dev`. Do not force-push. Delete topic branches after merge. If an emergency fix is applied to `main`, immediately open a pull request to bring the same fix back into `dev`.

## Required checks

Run these commands from `frontend/` before requesting review:

```bash
npm run format:check
npm run lint
npm run build
```

The `dev` deployment workflow runs the same checks before publishing.

## GitHub Pages

The `dev` branch is published at:

```text
https://eaufizz.github.io/recipe-search-app/
```

Vite uses `/recipe-search-app/` as its base only in GitHub Actions. Local development continues to use `/`. Client-side routes use URL hashes so direct navigation and page reloads work on GitHub Pages without a server fallback.

When PWA files are added, keep the manifest `start_url`, `scope`, icon paths, and any service worker paths under `/recipe-search-app/` for the Pages build. Do not add an offline caching strategy unless the product requirements call for one.
