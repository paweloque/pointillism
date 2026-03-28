# Task 14 — Color tint

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Apply an optional color tint over the original pixel colors.

## Deliverables

- When `state.tintBlend > 0` and `state.tintColor` is set:
  - Each dot's rendered color = `originalColor * (1 - blend) + tintColor * blend`
  - Applied at draw time, not at sample time (so changing tint is a repaint, not resample)
- Add a color input for tint color in the Color section (small swatch + native color picker)
- Tint blend slider already exists (0–100%)

## Acceptance

- Setting tint to amber at 80% blend makes dots warm/golden
- Setting blend to 0% shows original colors
- Changing tint color or blend is instant (no resample)
