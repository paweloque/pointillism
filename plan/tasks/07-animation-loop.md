# Task 07 — Animation loop

**Phase**: 3 (Mouse interaction)
**Spec**: `specs/SPEC.md`

## Description

Replace the single draw call with a `requestAnimationFrame` loop. Needed for mouse interaction and later physics.

## Deliverables

- `animate(timestamp)` function using `requestAnimationFrame`
- Each frame: clear canvas, draw all dots
- Dots now store mutable `x, y` (current position) separate from `ox, oy` (origin position)
- No visible change yet — dots stay at their origin. But the loop is running.

## Acceptance

- Canvas still shows the same dot rendering
- No performance regression (60 FPS on desktop with test image)
- `x, y` and `ox, oy` properties exist on each dot
