# Task 32 — Mobile performance tuning

**Phase**: 8 (Mobile polish)
**Spec**: `specs/performance.md`

## Description

Ensure acceptable performance on lower-powered devices.

## Deliverables

- Detect device capability (rough heuristic: screen size + devicePixelRatio + `navigator.hardwareConcurrency`)
- On low-capability devices:
  - Auto-increase stride to stay within particle budget
  - Target 30 FPS instead of 60
  - Optionally skip frames if render time exceeds budget
- Display actual FPS in sidebar (debug mode) or log to console
- Adaptive stride: if particle count after sampling exceeds 50k, increase stride and resample

## Acceptance

- App runs at 30+ FPS on a mid-range phone
- Adaptive stride kicks in automatically for large/dense images
- No visible stutter or jank during interaction
