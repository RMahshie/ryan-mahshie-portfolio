---
name: dark-saas-design-system
description: Design system for dark-themed portfolio/SaaS sites. Use this skill whenever creating or modifying UI components, sections, layouts, or visual elements. This defines the canonical color palette, surface hierarchy, typography scale, spacing system, glow/gradient techniques, card treatment, and accent color rules. Every visual decision should reference this system. Do not deviate from these values without explicit instruction.
---

# Dark SaaS Design System

This is the single source of truth for all visual decisions. When building any component, section, or layout, reference this document first. Consistency across the entire site depends on strict adherence to these values.

## Color Palette

### Surface Hierarchy (Dark Mode)

Dark interfaces require multiple surface levels to create depth. Never use a single flat background color. Each level serves a specific purpose.

```
--surface-base:      #0a0a0c;      /* Page background. Nearly black with cool undertone. */
--surface-raised:    #111114;      /* Primary content areas. Cards, main containers. */  
--surface-overlay:   #1a1a1f;      /* Elevated elements. Modals, dropdowns, hover states. */
--surface-subtle:    #21212a;      /* Subtle differentiation. Alternating sections, nested cards. */
--surface-border:    #2a2a35;      /* Borders, dividers, outlines. */
```

**Usage rules:**
- The page body is always `--surface-base`
- Cards and content containers use `--surface-raised` with a 1px border of `--surface-border`
- Alternating page sections shift between `--surface-base` and `--surface-raised` to create rhythm
- Full-bleed dark sections (like a stats strip or CTA) can go darker: `#050507`
- Never use pure `#000000` — it creates harsh contrast that feels cheap

### Accent Color (Purple)

One accent color. Used sparingly. When everything is dark, the accent has enormous visual weight — overuse kills its impact.

```
--accent:            #a855f7;      /* Primary purple. Buttons, links, key highlights. */
--accent-hover:      #c084fc;      /* Lighter on hover. */
--accent-muted:      #7c3aed;      /* Darker variant. Visited links, secondary actions. */
--accent-glow:       rgba(168, 85, 247, 0.15);   /* For glow/gradient effects. */
--accent-glow-strong: rgba(168, 85, 247, 0.25);  /* For more prominent glows. */
```

**Usage rules:**
- Buttons and primary CTAs use `--accent` background with white text
- Links use `--accent` for color, `--accent-hover` on hover
- Section headings: use `--accent` only for the section label (e.g., "Experience"), NOT for the heading text itself
- Stat numbers and key metrics can use `--accent` to draw the eye
- Never use accent as a background fill for large areas — only for small elements, text, and glow sources
- Tech tags/pills use `--accent` with low opacity background: `rgba(168, 85, 247, 0.1)` with `--accent` text and a `rgba(168, 85, 247, 0.2)` border

### Text Colors

```
--text-primary:      #f0f0f3;      /* Headings, important text. Not pure white. */
--text-secondary:    #a0a0b0;      /* Body text, descriptions. */
--text-tertiary:     #6b6b7b;      /* Subtle labels, dates, metadata. */
--text-on-accent:    #ffffff;      /* Text on accent-colored backgrounds. */
```

**Usage rules:**
- Body paragraphs always use `--text-secondary`. Never `--text-primary` — it's too bright for sustained reading
- Headings use `--text-primary`
- Dates, role titles, and metadata use `--text-tertiary`
- Links within body text use `--accent`

## Typography

### Scale

Use a consistent type scale with clear hierarchy. The ratio between heading and body should be dramatic — at least 3:1.

```
--font-family:       'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono:         'JetBrains Mono', 'Fira Code', monospace;

/* Sizes */
--text-hero:         clamp(3rem, 6vw, 4.5rem);    /* 48-72px. Hero heading only. */
--text-h1:           clamp(2rem, 4vw, 3rem);       /* 32-48px. Section headings. */
--text-h2:           clamp(1.25rem, 2vw, 1.5rem);  /* 20-24px. Card titles, subheadings. */
--text-h3:           1.125rem;                      /* 18px. Small subheadings. */
--text-body:         1rem;                          /* 16px. Body text. */
--text-small:        0.875rem;                      /* 14px. Labels, tags, metadata. */
--text-xs:           0.75rem;                       /* 12px. Fine print only. */

/* Weights */
--weight-bold:       700;          /* Headings */
--weight-semibold:   600;          /* Subheadings, emphasis */
--weight-normal:     400;          /* Body text */

/* Line heights */
--leading-tight:     1.2;          /* Headings */
--leading-normal:    1.6;          /* Body text */
--leading-relaxed:   1.8;          /* Long-form reading */
```

**Usage rules:**
- `--text-hero` is used exactly once — the hero heading
- Section headings use `--text-h1` with `--weight-bold`
- Never bold body text for emphasis — use `--accent` color or `--text-primary` color instead
- Monospace font is used for tech tags, code snippets, and stat numbers
- Letter spacing on hero text: `-0.02em` (slight tightening for large text)
- Letter spacing on small labels: `0.05em` with uppercase transform

## Spacing

### Vertical Rhythm

Generous spacing is what makes a site feel premium. When in doubt, add more space.

```
--space-section:     clamp(6rem, 10vw, 10rem);     /* 96-160px. Between major sections. */
--space-block:       clamp(3rem, 5vw, 5rem);        /* 48-80px. Between content blocks within a section. */
--space-element:     1.5rem;                         /* 24px. Between elements within a block. */
--space-tight:       0.75rem;                        /* 12px. Between tightly related items. */
```

**Usage rules:**
- Every major section (Hero, About, Experience, Projects, etc.) has `--space-section` padding top and bottom
- Content blocks within a section use `--space-block` between them
- Never let two sections touch without at least `--space-section` between them
- The hero section gets extra vertical padding: at minimum 30vh, ideally 40-50vh total height

### Content Width

```
--max-width-content: 1100px;       /* Main content column. */
--max-width-narrow:  720px;        /* Text-heavy sections (about, descriptions). */
--max-width-wide:    1400px;       /* Full-bleed sections with visual elements. */
--gutter:            clamp(1.5rem, 4vw, 3rem);     /* Side padding. */
```

**Usage rules:**
- Body text should never span wider than `--max-width-narrow`. Long lines are hard to read
- Card grids and visual layouts use `--max-width-content`
- Full-bleed backgrounds span 100vw but inner content still respects max-width
- Always apply `--gutter` as horizontal padding on the content container

## Glow & Gradient Effects

These create the sense of depth and atmosphere that separates flat sites from polished ones. Used behind cards, around hero elements, and as section transitions.

### Radial Glow (Behind Elements)

The primary atmospheric technique. A soft, diffused circle of accent color placed behind or beneath key elements.

```css
/* Static glow behind a card or hero element */
.glow-static {
  position: relative;
}
.glow-static::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    ellipse at center,
    var(--accent-glow-strong) 0%,
    transparent 70%
  );
  z-index: -1;
  pointer-events: none;
  filter: blur(60px);
}
```

**Usage rules:**
- Apply glow behind the hero area (large, diffused, centered or offset)
- Apply subtle glow behind featured project cards or the stats section
- Never apply glow to every card — pick 1-2 focal points per viewport
- The glow should be barely perceptible — if it's obvious, it's too strong. Reduce opacity
- Glow elements always have `pointer-events: none` and sit behind content via z-index

### Gradient Section Dividers

Instead of hard lines between sections, use gradient fades to blend surface colors.

```css
/* Soft transition between section background colors */
.section-transition {
  background: linear-gradient(
    180deg,
    var(--surface-base) 0%,
    var(--surface-raised) 100%
  );
  height: 120px; /* Generous blend zone */
}
```

### Hover Glow on Cards

```css
.card {
  background: var(--surface-raised);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  border-color: rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.08);
}
```

### Mask-Based Spotlight (From CodeRabbit)

This is the technique used on CodeRabbit's stats section — a radial gradient mask that creates a spotlight effect revealing content beneath.

```css
.spotlight-section {
  background: var(--surface-subtle);
  mask-image: radial-gradient(
    300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    white,
    transparent 80%
  );
}
```

Update `--mouse-x` and `--mouse-y` via JavaScript on mousemove for an interactive reveal effect.

## Card & Container Patterns

### Standard Card

```css
.card {
  background: var(--surface-raised);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}
```

### Featured/Highlighted Card

```css
.card-featured {
  background: var(--surface-raised);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.card-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent),
    transparent
  );
}
```

The top gradient border is a subtle way to highlight key cards without overwhelming them.

### Stat Number Display

```css
.stat-number {
  font-family: var(--font-mono);
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -0.03em;
}
.stat-label {
  font-size: var(--text-small);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}
```

## Animation Principles

### Transitions

All interactive state changes (hover, focus, active) should transition smoothly.

```
--transition-fast:   150ms ease;
--transition-base:   300ms ease;
--transition-slow:   500ms ease;
```

### Scroll-Triggered Entrances

Elements should fade and slide in as they enter the viewport. Use IntersectionObserver, not scroll event listeners.

```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Usage rules:**
- Stagger entrances for grouped elements (cards in a grid) by 100-150ms each
- Only animate `opacity` and `transform` — these are GPU-composited and performant
- The translate distance should be subtle: 16-24px. Anything more feels jarring
- Never animate elements that are already in the initial viewport (above the fold). The hero should be instant
- Use `prefers-reduced-motion` media query to disable all animations for users who request it

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Anti-Patterns (Never Do These)

1. **Multiple accent colors.** One purple. That's it. No teal secondary, no gradient buttons with two colors.
2. **Pure black backgrounds.** Always use off-black with a subtle cool or warm undertone.
3. **Pure white text for body copy.** Reserve near-white for headings only. Body text is always muted.
4. **Borders without purpose.** Only use borders to create containment (cards) or separation (dividers). Never decorative borders.
5. **Glow on everything.** Pick 1-2 focal points per screen. Glow loses meaning when it's everywhere.
6. **Small spacing.** If it feels like enough space, add 50% more. Premium sites always have more whitespace than feels necessary.
7. **Inconsistent border-radius.** Use `12px` for cards and containers, `8px` for buttons and inputs, `9999px` for pills/tags. No other values.
8. **Colored backgrounds for sections.** Sections are differentiated by surface shade (base vs raised), not by applying accent color as a background.
9. **Drop shadows on dark backgrounds.** Shadows are invisible on dark surfaces. Use border + glow instead for elevation.
10. **More than 2 fonts.** One sans-serif, one monospace. No third font.