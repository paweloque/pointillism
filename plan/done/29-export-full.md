# Task 29 — Full export (physics + text)

**Phase**: 7 (Export full)
**Spec**: `specs/SPEC.md`, `specs/roadmap.md`

## Description

Extend basic export to include physics and text overlay.

## Deliverables

- Exported HTML includes:
  - Physics animation code (breathing, sway, rise, escape, fade)
  - Current physics state baked as constants
  - Text rasterized into the source image (already part of sampling)
  - Mouse interaction (from basic export)
  - `requestAnimationFrame` loop
- All physics parameters are constants in the exported file (not configurable by end user)
- Exported file still has zero external dependencies

## Acceptance

- Exported page shows dots with physics animation matching the editor preview
- Text is visible as dots in the export
- File works standalone in browser
