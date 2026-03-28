# Task 13 — Dot shape rendering

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Support circle, square, and soft-edge dot shapes in the renderer.

## Deliverables

- Renderer checks `state.dotShape` and draws accordingly:
  - `circle`: `ctx.arc()` (current behavior)
  - `square`: `ctx.fillRect()` centered on dot position
  - `soft`: `ctx.arc()` with a radial gradient fill (bright center, transparent edge)
- Shape selector buttons in sidebar switch between them

## Acceptance

- All three shapes render correctly
- Switching shape takes effect immediately (repaint, no resample)
- Square rendering is noticeably faster at high particle counts
