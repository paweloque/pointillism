# Task 24 — Rise (upward drift)

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`

## Description

Dots float upward by a small amount, then loop back to their origin.

## Deliverables

- Each dot gets: `riseSpeed`, `maxRise`, `riseOffset` (randomized)
- When `state.rise` is on:
  - `rise = (riseOffset + t * riseSpeed) % maxRise`
  - Subtract rise from dot's Y position
  - `progress = rise / maxRise` (used by fade in/out and escape)
- Bright dots travel further (`maxRise = 6 + random * 14 + brightness * 8`)
- Toggle in Motion section

## Acceptance

- Toggling rise shows dots slowly floating upward and looping
- Different dots rise at different speeds
- Combines with sway and mouse interaction
