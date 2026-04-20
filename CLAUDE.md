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
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (imported in `index.css` with `@import "tailwindcss"`)
- **EmailJS** for contact form functionality
- Font: Space Grotesk (loaded from Google Fonts in `index.html`)

## Architecture

Single-page portfolio with no routing. The app renders a sequence of full-page sections:

- `App.jsx` — Root component managing loading state and mobile menu state
- `src/components/LoadingScreen.jsx` — Initial loading animation
- `src/components/Navbar.jsx` / `MobileMenu.jsx` — Navigation (scroll-based section detection)
- `src/components/sections/` — Page sections: `Home`, `About`, `Experience`, `Projects`
- `src/components/Footer.jsx` — Footer with contact form
- `src/components/RevealOnScroll.jsx` — Intersection Observer wrapper for scroll animations

Custom CSS animations are defined in `src/index.css` (blink, loading-bar, fade-in, reveal, btn-interactive, nav-indicator).

## Environment

- `.env` contains EmailJS credentials (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) — prefixed with `VITE_` for Vite exposure
- Static assets in `public/` include a demo video, favicon, robots.txt, and sitemap.xml

## ESLint Config

Flat config in `eslint.config.js`. Uses react-hooks and react-refresh plugins. `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## Project Skills

Three custom skills live in `.claude/skills/`. Read the relevant one before making changes in its domain:

- **`.claude/skills/design-system.md`** — Read whenever creating or modifying UI components, sections, layouts, or visual elements. Defines the canonical color palette, surface hierarchy, typography scale, spacing system, glow/gradient techniques, card treatment, and accent color rules.
- **`.claude/skills/canvas-effects.md`** — Read when building animated backgrounds, dot/particle grids, hover-reactive visual elements, or any canvas-based decorative effect.
- **`.claude/skills/page-structure.md`** — Read when building or restructuring page layout. Defines every section, its content, layout pattern, and visual treatment in order.
