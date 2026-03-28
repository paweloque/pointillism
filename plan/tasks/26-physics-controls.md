# Task 26 — Physics sidebar controls

**Phase**: 5 (Particle physics)
**Spec**: `specs/roadmap.md`, `specs/SPEC.md`

## Description

Wire the physics toggles and add intensity controls to the sidebar.

## Deliverables

- Motion section in sidebar:
  - Breathing: toggle + intensity slider (amplitude 0–0.3)
  - Sway: toggle + intensity slider (amplitude multiplier)
  - Rise: toggle + speed slider
  - Escape: toggle (only visible when rise is on)
- Physics preset group at top of Motion section: "off", "subtle", "animated"
  - Off: all toggles off
  - Subtle: breathing on (low), sway on (low)
  - Animated: everything on with moderate values
- All controls update state and take effect immediately (repaint, no resample)

## Acceptance

- Each toggle independently enables/disables its behavior
- Intensity sliders have visible effect
- Physics presets configure all motion toggles at once
- Escape toggle hidden when rise is off
