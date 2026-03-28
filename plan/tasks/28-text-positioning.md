# Task 28 — Text positioning

**Phase**: 6 (Text overlay)
**Spec**: `specs/SPEC.md`, `specs/ux-progressive-enhancement.md`

## Description

Control where text appears on the canvas.

## Deliverables

- **Desktop (> 1024px)**: drag-to-place
  - When text is active, show a ghost text overlay on canvas
  - User drags to set position (`state.textX`, `state.textY` as 0–1 ratios)
  - On release, resample with text at new position
- **Tablet/mobile**: centered horizontally, vertical position via slider
  - Simple Y-position slider in the text section
- Multiple text layers (desktop only):
  - "Add text" button, each layer gets its own input + font + size
  - List of layers in sidebar, deletable
  - All layers rasterized in order before sampling

## Acceptance

- Text can be positioned anywhere on desktop via drag
- Tablet/mobile: centered with adjustable vertical position
- Multiple text layers stack correctly
