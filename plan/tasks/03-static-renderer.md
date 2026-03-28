# Task 03 — Static dot renderer

**Phase**: 1 (Static dot renderer)
**Spec**: `specs/SPEC.md`

## Description

Draw the sampled dots on the main canvas. No animation loop yet — a single draw call.

## Deliverables

- `src/renderer.js` (or inline) with:
  - `drawDots(ctx, dots, bgColor)` function
  - Clear canvas with `bgColor` (default `#000`)
  - For each dot: set `globalAlpha`, `fillStyle` from dot's RGB, draw `arc()` at dot's position and size
  - Reset `globalAlpha` to 1 after drawing
- Wire up: on page load, sample the test image and draw the dots
- Result: a static pointillist rendering visible in the browser

## Acceptance

- Opening the page shows a dot rendering of the test image
- Dots vary in size and opacity based on source pixel brightness
- Canvas fills the viewport area (right of sidebar)
