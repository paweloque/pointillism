# Task 35 — Brownian motion (random walk)

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`

## Description

Dots wander randomly in small steps, creating an organic, jittery motion. Unlike sway (sinusoidal, predictable), brownian motion is directionless and noisy — each dot drifts independently with no pattern.

## Deliverables

- Add to each dot in `sampler.js`:
  - `brownX: 0`, `brownY: 0` — accumulated random displacement
- Add to `state.js`:
  - `brownian: false` (toggle)
  - `brownianStrength: 0.5` (step size per frame, range 0.1–2.0)
- In `updateDots` (main.js), when `state.brownian` is on:
  - Each frame, add a small random step: `d.brownX += (Math.random() - 0.5) * strength`
  - Same for `brownY`
  - Clamp accumulated drift to a max radius (e.g. `stride * 1.5`) so dots don't wander too far from origin
  - Apply a gentle pull back toward origin (mean reversion): `d.brownX *= 0.995`
  - Add `brownX/brownY` to the dot's position (additive with sway, rise, etc.)
- Add brownian toggle + strength slider to Motion section in `index.html`
- Wire controls in `main.js`
- Update export.js to include brownian in exported HTML
- Add to `motion` group in state for reset

## Acceptance

- Toggling brownian on shows dots jittering randomly in place
- Each dot moves independently (no pattern)
- Strength slider controls jitter intensity
- Dots don't wander too far from their origin (clamped)
- Combines correctly with sway, rise, breathing, sparkle
- Exported HTML includes brownian if enabled
