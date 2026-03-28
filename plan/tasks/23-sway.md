# Task 23 — Sway (lateral drift)

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`

## Description

Dots drift side to side with a subtle sine-wave motion.

## Deliverables

- Each dot gets: `swayPhaseX`, `swayPhaseY`, `swayFreqX`, `swayFreqY`, `swayAmpX`, `swayAmpY`
- Assign per-dot randomized values on sample (see vibehaton reference for ranges)
- Edge-detection: mid-brightness pixels (near contours) sway more
- When `state.sway` is on:
  - `offsetX = sin(t * freqX + phaseX) * ampX`
  - `offsetY = cos(t * freqY + phaseY) * ampY * 0.4`
  - Add offset to dot position each frame (additive with mouse displacement)
- Toggle in Motion section

## Acceptance

- Toggling sway on shows dots gently drifting
- Contour dots (mid-brightness) drift more than bright/dark dots
- Combines correctly with mouse interaction
