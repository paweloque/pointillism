# Task 04 — Resize handling

**Phase**: 1 / 2 (Static dot renderer / Image upload)
**Spec**: `specs/SPEC.md`, `specs/ux-progressive-enhancement.md`

## Description

Canvas must track its container size and resample when the viewport changes.

## Deliverables

- Use `ResizeObserver` on the canvas element
- Debounce resize events (150ms) to avoid rapid resamples
- On resize: update `canvas.width`/`canvas.height` to match container, resample image, redraw
- Handle orientation change (same path — ResizeObserver covers it)

## Acceptance

- Resizing the browser window causes dots to re-render at the new size
- No visual glitch or blank frame during resize
- Works when toggling devtools (which changes available width)
