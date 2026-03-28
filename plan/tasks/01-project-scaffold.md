# Task 01 — Project scaffold

**Phase**: 1 (Static dot renderer)
**Spec**: `specs/SPEC.md`, `specs/ux-styleguide.md`

## Description

Create the base HTML file and project structure. No functionality yet — just the shell.

## Deliverables

- `src/index.html` — single HTML file with:
  - Viewport meta tag
  - Inter font loaded from Google Fonts
  - CSS variables from the styleguide (light mode tokens)
  - Two-column layout: `.sidebar` (300px) + `.canvas-area` (flex: 1)
  - `<canvas id="scene">` inside canvas area
  - Empty sidebar with logo ("pointilism"), styled per styleguide
- Verify it loads in a browser with the sidebar on the left and a black canvas area filling the rest

## Acceptance

- Opens in browser without errors
- Layout matches the minimal-mono prototype structure
- All CSS tokens from the styleguide are defined as custom properties
