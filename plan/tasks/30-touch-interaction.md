# Task 30 — Touch interaction

**Phase**: 8 (Mobile polish)
**Spec**: `specs/roadmap.md`, `specs/ux-progressive-enhancement.md`

## Description

Touch replaces mouse on mobile devices.

## Deliverables

- Listen for `touchstart`, `touchmove`, `touchend` on canvas
- Map touch position to mouse position for dot displacement
- Single-finger touch = mouse move
- `touchend` = mouse leave (dots ease back)
- Prevent default on touch events to avoid scrolling the page

## Acceptance

- Touching the canvas on a phone displaces dots
- Lifting finger lets dots return
- No page scroll while interacting with canvas
