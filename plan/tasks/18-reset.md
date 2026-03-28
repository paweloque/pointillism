# Task 18 — Reset to defaults

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Let the user reset parameters back to defaults.

## Deliverables

- Global reset: a small "reset" link or button in the sidebar header or footer
  - Calls `resetState()`, updates all controls, triggers resample
- Per-section reset: a small "reset" link in each section title row
  - Resets only that group's parameters (dots, color, interaction, motion)
  - Updates affected controls, triggers resample only if needed
- Reset link styled subtly: 0.65rem, `--mid` color, appears on section hover

## Acceptance

- Global reset restores all parameters to defaults and re-renders
- Section reset only affects that group
- Reset links are unobtrusive — visible but not prominent
