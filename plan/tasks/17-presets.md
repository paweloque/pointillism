# Task 17 — Presets

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Predefined parameter sets that configure everything at once.

## Deliverables

- Define 4 presets as named objects:
  - **Subtle**: stride 4, small dots, low scaling, no tint, gentle mouse, breathing on
  - **Dense**: stride 2, medium dots, high scaling, no tint, medium mouse
  - **Dreamy**: stride 3, medium dots, strong tint (warm), weak mouse, breathing + sway on
  - **Energetic**: stride 2, large dots, high scaling, strong mouse, all physics on
- Clicking a preset button:
  - Sets all state values from the preset
  - Updates every sidebar control to reflect new values
  - Triggers resample
  - Marks the clicked preset as active, deactivates others
- If user manually changes any parameter after selecting a preset, deactivate the preset indicator (no preset is "active")

## Acceptance

- Each preset produces a visibly different result
- All sliders and toggles update when a preset is selected
- Manual edits deactivate the preset highlight
