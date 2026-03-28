# Task 08 — Mouse interaction

**Phase**: 3 (Mouse interaction)
**Spec**: `specs/SPEC.md`, `specs/performance.md`

## Description

Dots displace away from the cursor and ease back.

## Deliverables

- Track `mousemove` on canvas, store mouse position
- On `mouseleave`, move mouse position offscreen
- Each frame, for each dot:
  - Calculate distance from dot origin to mouse
  - If within radius: push dot away from cursor (displacement = `(1 - dist/radius) * strength`)
  - Ease current position toward target: `x += (target - x) * easing`
- Default values: radius 80px, strength 18px, easing 0.08
- Parameters hardcoded for now (sidebar will make them configurable in Phase 4)

## Acceptance

- Moving mouse over canvas pushes dots away
- Dots spring back smoothly when cursor leaves
- No jank at 60 FPS (test with full image)
