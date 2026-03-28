# Task 09 — Spatial index for mouse interaction

**Phase**: 3 (Mouse interaction)
**Spec**: `specs/performance.md`

## Description

Optimize mouse proximity checks with a grid-based spatial index.

## Deliverables

- `src/spatial-grid.js` (or inline):
  - `buildGrid(dots, cellSize)` — assign each dot to a grid cell based on its origin
  - `queryRadius(grid, x, y, radius)` — return dots in cells overlapping the query circle
- Cell size = mouse radius (so query checks at most 9 cells)
- Rebuild grid when dots are resampled (not every frame)
- Replace the O(n) loop in the animation with a grid query

## Acceptance

- Mouse interaction still works identically
- Measurable FPS improvement at high particle counts (> 20k dots)
- Grid rebuilds only on resample, not every frame
