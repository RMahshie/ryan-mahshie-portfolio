# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ryan Mahshie (ryan-mahshie.xyz), deployed to GitHub Pages via gh-pages.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (outputs to `dist/`, also writes CNAME file via postbuild script)
- `npm run lint` — ESLint
- `npm run preview` — Preview production build locally
- `npm run deploy` — Build and deploy to GitHub Pages via gh-pages

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite 6** as build tool
- Plain CSS in `src/index.css` (no Tailwind)
- Fonts: Newsreader for headings, Inter for body text (loaded from Google Fonts in `index.html`)

## Architecture

Minimal site where the nav switches between pages instead of scrolling. On desktop each page fits on one screen (Photography may scroll, and phones scroll).

- `src/App.jsx` — Page list, title updates, and layout (header, current page, footer)
- `src/useHashRoute.js` — Hash routing (`#/about`, `#/experience`, ...), so links and the back button work
- `src/components/Header.jsx` — Name plus nav links and a Resume link to `public/Ryan_Mahshie_Resume.pdf`
- `src/components/Footer.jsx` — Email, GitHub, LinkedIn links in the bottom-right
- `src/pages/` — `About`, `Experience`, `Projects`, `Photography`; content lives in each file as data arrays
- `src/data/photos.js` — Photo list for the gallery. The Photography page and nav link stay hidden while it is empty.

Design: olive background `#1e2712`, cream text `#f2e8c9`. Links are plain text that brightens on hover, with no boxes or underlines. `mockup/index.html` is the standalone mockup the site was built from.

## Environment

- `.env` holds EmailJS credentials from the old contact form; nothing reads them anymore
- Static assets in `public/` include the resume PDF, favicon, robots.txt, and sitemap.xml

## ESLint Config

Flat config in `eslint.config.js`. Uses react-hooks and react-refresh plugins. `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## Project Skills

Three custom skills live in `.claude/skills/`. They describe the previous scrolling, purple-accented design, so where they conflict with the minimal design above, follow the current code:

- **`.claude/skills/design-system.md`** — Read whenever creating or modifying UI components, sections, layouts, or visual elements. Defines the canonical color palette, surface hierarchy, typography scale, spacing system, glow/gradient techniques, card treatment, and accent color rules.
- **`.claude/skills/canvas-effects.md`** — Read when building animated backgrounds, dot/particle grids, hover-reactive visual elements, or any canvas-based decorative effect.
- **`.claude/skills/page-structure.md`** — Read when building or restructuring page layout. Defines every section, its content, layout pattern, and visual treatment in order.
