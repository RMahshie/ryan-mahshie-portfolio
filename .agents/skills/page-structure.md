---
name: portfolio-page-structure
description: Section-by-section blueprint for a dark-themed developer portfolio. Use this skill when building or restructuring page layout. Defines every section, its content, layout pattern, and visual treatment. Sections must appear in this order. Do not add sections not listed here without explicit instruction. Reference the design-system skill for all color, spacing, and typography values.
---

# Portfolio Page Structure Blueprint

This defines the exact section order, content, and layout for the portfolio site. Every section is described with its purpose, layout pattern, content requirements, and visual treatment. The page is a single continuous scroll — no separate pages or routes.

The overall page rhythm alternates between visually dense sections (hero, stats, projects) and breathing room (about, experience). This alternation keeps the scroll engaging without overwhelming.

## Section 1: Navigation Bar

**Purpose:** Persistent top navigation. Stays fixed on scroll.

**Layout:** Full-width bar, content constrained to `--max-width-content`.

**Content:**
- Left: Name or logo mark. "Ryan Mahshie" in semibold, with the period or accent element in `--accent` color
- Right: Navigation links — About, Experience, Projects, Contact
- Links are `--text-secondary`, turning `--text-primary` on hover
- Active section link is `--accent`

**Visual treatment:**
- Background: `--surface-base` with `backdrop-filter: blur(12px)` and slight transparency (`rgba(10, 10, 12, 0.8)`)
- Bottom border: 1px `--surface-border`, visible only after scrolling past the hero
- Height: 64px
- Fixed position, z-index above all content
- No background color until user scrolls — then fade in the blurred background

## Section 2: Hero

**Purpose:** First impression. Communicate who you are and create a visual "wow" moment. This is the most important section.

**Layout:** Full viewport height (minimum 90vh). Content centered vertically and horizontally. Text content has a max-width of `--max-width-narrow`.

**Content:**
- Overline text (small, uppercase, monospace, `--text-tertiary`): "BACKEND ENGINEER • AI SYSTEMS • CLOUD INFRASTRUCTURE"
- Main heading (`--text-hero`): "Ryan Mahshie" — large, bold, `--text-primary`
- Subheading (`--text-h3`, `--text-secondary`): "I build backend systems that work at scale — from cross-cloud infrastructure to agentic AI architectures. Incoming at Visa CyberSource."
- CTA buttons: Primary "View My Work" in accent, secondary "Get in Touch" as ghost/outline button
- Buttons sit side by side below the subheading with `--space-element` gap

**Visual treatment:**
- **Interactive background:** This is where the canvas-based dot grid effect goes. The grid covers the entire hero section behind the text. Dots pulse subtly and respond to mouse movement with a purple glow radius. This is the "wow" moment — imported from the pre-built package
- **Central glow:** A large, soft radial gradient of `--accent-glow` sits behind the heading text, roughly 600px wide, blurred heavily. Creates a subtle purple atmosphere without being overt
- Text content sits above the grid via z-index
- Scroll indicator at the bottom: a small animated chevron or line suggesting "scroll down"
- No fade-in animation on hero content — it should be visible immediately on load

## Section 3: Stats Strip

**Purpose:** Surface impressive metrics that are currently buried in your project descriptions. Social proof through numbers.

**Layout:** Full-width section with a background shift to `--surface-raised` or slightly darker than base. Content is a horizontal row of 4-5 stat items, centered, constrained to `--max-width-content`. On mobile, 2x2 grid.

**Content (these exact stats):**
- "2x" — "Markets Doubled" (from OpsCanvas Azure expansion)
- "14" — "Vector Stores Built" (from LawSearch)
- "90%" — "Research Time Cut" (from LawSearch)
- "3,000+" — "Airports Modeled" (from Pelagic AI)

**Visual treatment:**
- Each stat: large monospace number (`--text-hero` size, `--text-primary`), small label below in `--accent` color, uppercase, letter-spaced
- Stats separated by subtle vertical dividers (1px `--surface-border`)
- Subtle background texture or the interactive grid effect can extend into this section
- Optional: the spotlight mask effect from CodeRabbit (radial gradient mask following cursor)
- Section has less vertical padding than others — `--space-block` top and bottom. It's a dense strip, not a breathing section

## Section 4: About

**Purpose:** Brief personal introduction. Human context beyond the resume bullet points.

**Layout:** Two-column on desktop (text left, visual element right). Single column on mobile, text first. Constrained to `--max-width-content`.

**Content:**
- Left column (60% width): 
  - Section label: "About" in `--accent`, small, uppercase, monospace, letter-spaced
  - Body text (2-3 short paragraphs, `--text-body`, `--text-secondary`): Who you are, what you study, what you care about technically, what drives you. Keep it concise — this isn't a cover letter
  - Tech stack tags displayed below the text as pills
- Right column (40% width):
  - A visual element — this could be a photo, an animated illustration, or a stylized graphic. If no photo is available, use an abstract SVG animation (from the SVG skill) or a code-themed visual element

**Visual treatment:**
- Background: `--surface-base` (alternating from the raised stats strip above)
- Tech pills: small, `--text-small`, monospace, `--accent` text on `rgba(168, 85, 247, 0.1)` background, `rgba(168, 85, 247, 0.2)` border, `9999px` border-radius
- Subtle glow behind the visual element in the right column
- Scroll-triggered fade-in (the animate-in pattern from design system)

## Section 5: Experience

**Purpose:** Professional timeline. Show progression and increasing scope.

**Layout:** Single column, constrained to `--max-width-narrow`. Each role is a card. Cards stack vertically with `--space-element` gap.

**Content (in this order):**

**Card 1 — Visa CyberSource (Incoming)**
- Company name: `--text-h2`, `--text-primary`, bold
- Role + dates: "Backend Software Engineering Intern • Summer 2026" in `--text-tertiary`
- Tag: "INCOMING" pill in `--accent` — this distinguishes it visually
- Description: 1-2 sentences. "Joining the CyberSource Acceptance Solutions team in Bellevue, WA to work on payment infrastructure and AI agent systems including Tap to Pay and Click to Pay."

**Card 2 — OpsCanvas**
- Company name + role + dates
- Description: Keep your current copy — it's already well written. Focus on the Azure expansion, cross-cloud DataSync, business impact (doubled market)
- This is your strongest card — give it a featured treatment (the `card-featured` pattern with top gradient border)

**Card 3 — Pelagic AI**
- Company name + role + dates  
- Description: DOD satellite simulator, 8-node LangGraph, adversarial simulation, 3,000+ airports

**Card 4 — OPEXUS**
- Company name + role + dates
- Description: Keep brief. SQL migrations, FOIA platform, first professional experience

**Visual treatment:**
- Background: `--surface-raised` for this section (alternating from about)
- Each card uses the standard card pattern: `--surface-overlay` background, 1px `--surface-border`, 12px radius, 2rem padding
- OpsCanvas card gets the featured treatment with top accent gradient border
- Left vertical timeline line connecting the cards: 1px `--surface-border` with small dots at each card's top
- Section label "Experience" in `--accent` at the top
- Cards fade in staggered (100ms delay between each)

## Section 6: Projects

**Purpose:** Showcase technical depth and real-world impact.

**Layout:** Grid — 2 columns on desktop, 1 column on mobile. Constrained to `--max-width-content`. Each project is a card.

**Content (in this order):**

**Card 1 — LawSearch AI (featured, spans full width or is visually prominent)**
- Project name: `--text-h2`, bold
- Links: GitHub, Watch Demo — small, `--accent`, with arrow icons
- Description: Keep current copy. Federal spending bill search, 14 vector stores, LangGraph routing, 3 min → 30 sec
- Tech tags as pills at the bottom
- A visual element: screenshot, diagram of the routing architecture, or animated SVG showing the query flow

**Card 2 — Sonara**
- Project name, links, description, tech tags
- Visual element if possible (waveform graphic, frequency response curve)

**Card 3 — Nitpick**
- Project name, GitHub link, description, tech tags
- Smaller card — this is less visually prominent than LawSearch or Sonara

**Visual treatment:**
- Background: `--surface-base` (alternating from experience)
- Cards use the standard card pattern
- LawSearch gets featured treatment — either full-width or larger card with a glow behind it
- Each card has a hover state: border shifts to accent tint, subtle box-shadow glow
- Tech pills inside each card match the design system pattern
- Cards fade in staggered on scroll

## Section 7: Contact / CTA

**Purpose:** Final call to action. Make it easy to reach you.

**Layout:** Centered text block, constrained to `--max-width-narrow`. Full-bleed section background.

**Content:**
- Heading: "Let's connect" or "Get in touch" — `--text-h1`, `--text-primary`
- Subtext: 1 sentence. "I'm always open to talking about backend engineering, AI systems, or new opportunities." — `--text-secondary`
- Contact links displayed as styled buttons or large icon links: Email, GitHub, LinkedIn
- Each link is a ghost button (outline style) or an icon + label pair

**Visual treatment:**
- Background: darker than base — `#050507` or similar. This creates a visual "floor" for the page
- Large diffused accent glow behind the heading — wider and softer than the hero glow
- Contact links have hover glow effect
- This section has generous padding — it should feel like a landing zone, not a cramped footer

## Section 8: Footer

**Purpose:** Minimal footer with copyright and links.

**Layout:** Full-width, constrained content. Single row.

**Content:**
- Left: "© 2026 Ryan Mahshie"
- Right: Email, GitHub, LinkedIn as small text links

**Visual treatment:**
- Background: same as CTA section (dark)
- Text: `--text-tertiary`
- Minimal height — no more than 80px
- Top border: 1px `--surface-border` to separate from CTA section
- This should be forgettable — all the important contact info is in the CTA above

## Overall Page Flow (Visual Rhythm)

```
Section        | Background         | Density  | Visual Highlights
─────────────────────────────────────────────────────────────────────
Nav            | transparent→blur   | Minimal  | Fixed, appears on scroll
Hero           | --surface-base     | Sparse   | Interactive grid, glow, big text
Stats Strip    | --surface-raised   | Dense    | Big numbers, possible spotlight mask
About          | --surface-base     | Medium   | Two-column, tech pills, visual element
Experience     | --surface-raised   | Medium   | Cards, timeline, featured OpsCanvas
Projects       | --surface-base     | Dense    | Card grid, featured LawSearch, hover effects
CTA            | #050507 (darker)   | Sparse   | Glow, centered, breathing room
Footer         | #050507            | Minimal  | Just text
```

The alternating base → raised → base → raised pattern creates natural section breaks without needing explicit dividers. The darker CTA/footer creates a sense of closure at the bottom.

## Responsive Breakpoints

```
/* Mobile first */
@media (min-width: 640px)  { /* sm  — stack to 2-col starts */ }
@media (min-width: 768px)  { /* md  — most 2-col layouts kick in */ }
@media (min-width: 1024px) { /* lg  — full desktop layout */ }
@media (min-width: 1280px) { /* xl  — max-width breathing room */ }
```

**Key responsive rules:**
- Hero heading scales via clamp() — defined in design system
- Two-column layouts (about, project grid) collapse to single column below `md`
- Stats strip goes from horizontal row to 2x2 grid below `md`
- Navigation collapses to hamburger menu below `sm`
- Section padding reduces by ~30% on mobile
- Cards go full-width on mobile with reduced padding (1.25rem instead of 2rem)

## Content Tone Notes

- Hero subheading should be confident and specific, not generic. "Backend engineer who builds at scale" not "Passionate developer who loves coding"
- Project descriptions should lead with what it does for the user/client, then how it's built. Impact first, implementation second
- Keep all descriptions concise. If a paragraph is more than 3 sentences, cut it
- The Visa entry should be clearly marked as "INCOMING" — it builds anticipation and shows trajectory
- Never include an apology or disclaimer about the site itself (no "I'm not a frontend engineer" card)
