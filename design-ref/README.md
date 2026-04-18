# Design Reference Files
Visual targets for blog system implementation. Generated in Claude Design on 2026-04-18.
## Files
- `design-system.html` — canonical token values, component library, editorial rules
- `blog-index.html` — `/blog` route mockup (hero, pillar filters, featured story, 6-card grid, pagination, newsletter, footer)
- `blog-post-template.html` — `/blog/[slug]` base template (hero with gradient, article body, inline CTA, pull quote, checklist, related posts, end CTA)
## How to use
1. Open the HTML files in any browser for visual reference while implementing.
2. Design System defines canonical tokens — use those CSS variable names in code.
3. Components in the templates are the base. Pillar variants (TICKET-112) extend these.
4. Mobile behavior is defined — test at 375px width.
## Canonical tokens
- `--black`: #000000 (hero, main nav/header)
- `--charcoal-deep`: #0F172A (footer, inline CTA, secondary dark sections)
- `--charcoal-mid`: #1E293B (borders, subtle surfaces)
- `--yellow`: #FFC200 (primary CTA, accent words, active states)
- `--green`: #0A8754 (secondary accent, positive signals)
- `--white`: #FFFFFF
## Editorial rules
- "Restore STL" two words in customer-facing copy
- No "AI-powered" language anywhere
- No "Keystone Collective" references
- Kevin: 20 years experience, never "25+"
- Byline: "The Restore STL Team"
- Contributors line: "Research and editing: Chris O'Keefe" (small, beneath byline)
## Tickets this references
- TICKET-107 — Blog Engine Infrastructure (builds from these mockups)
- TICKET-112 — Pillar Blog Templates (extends base template)
