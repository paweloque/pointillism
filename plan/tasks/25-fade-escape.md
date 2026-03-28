# Task 25 — Fade in/out and escape

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`

## Description

Dots fade in and out over their rise cycle, with a small fraction escaping.

## Deliverables

- **Fade in**: `fadeIn = min(1, progress * 6)` — full opacity at 1/6 of life
- **Fade out**: `fadeOut = min(1, (1 - progress) * 5)` — starts fading at 4/5 of life
- Multiply dot alpha by `fadeIn * fadeOut` (in addition to breathe)
- **Escape** (requires rise to be active):
  - Each dot gets pre-computed `escapeDX`, `escapeDY` (cubic random, most are near zero)
  - At 65% through rise progress, start adding escape offset (quadratic ramp)
  - Most dots barely move; a few scatter outward
- These only apply when rise is active (fade and escape depend on rise progress)

## Acceptance

- Dots with rise enabled smoothly appear and disappear
- Occasional dots scatter away near end of life — organic, not chaotic
- With rise disabled, fade and escape have no effect
