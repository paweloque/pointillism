# Task 16 — Focal point (image crop center)

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Let the user control where the cover-fit image is cropped.

## Deliverables

- `state.focalX` (0–1, default 0.5) and `state.focalY` (0–1, default 0.5)
- Sampler uses focal point to offset the crop: `sx = (iw - sw) * focalX`, `sy = (ih - sh) * focalY`
- Desktop (> 1024px): draggable handle on canvas that sets focal point
  - Small crosshair indicator, visible only while dragging or hovering near it
  - On drag, update `state.focalX/Y` and resample (debounced)
- Mobile/tablet: center crop (focalX/Y = 0.5, not editable)

## Acceptance

- Dragging the focal point shifts which part of the image is visible as dots
- Works with portrait and landscape images of various aspect ratios
- Focal point defaults to center
