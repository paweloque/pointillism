# Task 22 — Breathing (opacity pulse)

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`

## Description

Dots subtly pulse in opacity over time.

## Deliverables

- Each dot gets: `breathePhase` (random 0–2PI), `breatheFreq` (0.00008–0.00018)
- When `state.breathing` is on:
  - `breathe = 0.88 + 0.12 * sin(t * freq + phase)`
  - Multiply dot alpha by `breathe` each frame
- Toggle in Motion section controls on/off
- Optional intensity slider (controls the 0.12 amplitude)

## Acceptance

- Toggling breathing on shows a gentle, organic opacity pulse
- Each dot pulses at its own rate (not synchronized)
- Performance: no FPS drop
