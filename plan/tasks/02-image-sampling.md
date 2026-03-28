# Task 02 — Image sampling engine

**Phase**: 1 (Static dot renderer)
**Spec**: `specs/SPEC.md`, `specs/performance.md`

## Description

Implement the core sampling logic: load an image, draw it to an offscreen canvas (cover-fitted), and extract dot data from pixels.

## Deliverables

- `src/sampler.js` (or inline in index.html) with:
  - `sampleImage(img, width, height, options)` function
  - Cover-fit: scale image to fill viewport, crop overflow (center crop for now)
  - Sample pixels at a fixed stride (default 3)
  - Skip pixels below brightness threshold (default 0.035)
  - For each qualifying pixel, produce a dot object: `{ x, y, brightness, r, g, b, size, alpha }`
  - Size = `0.4 + brightness * 0.65`
  - Alpha = `0.4 + brightness * 0.6`
- Include a hardcoded test image (base64-encoded or a small file in `src/assets/`)
- Cap particle count at 50k with console warning if exceeded

## Acceptance

- `sampleImage()` returns an array of dot objects
- Brightness filtering works (near-black pixels skipped)
- Particle count stays within budget on a typical image
