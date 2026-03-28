# Task 11 — Parameter state management

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`, `specs/performance.md`

## Description

Central state object that all controls read from and write to, driving the renderer.

## Deliverables

- `src/state.js` (or inline) with a `state` object holding all parameter values with defaults:
  - `bgColor: '#000'`, `stride: 3`, `dotSize: 0.4`, `sizeScaling: 0.65`
  - `threshold: 0.035`, `dotShape: 'circle'`
  - `tintColor: null`, `tintBlend: 0`
  - `mouseRadius: 80`, `mouseStrength: 18`, `mouseEasing: 0.08`
  - `breathing: false`, `sway: false`, `rise: false`
- `getDefaults()` function returning a fresh copy of defaults
- `resetState()` and `resetGroup(group)` functions
- Classify parameters by cost tier:
  - Repaint: `bgColor`, `dotSize`, `sizeScaling`, `tintColor`, `tintBlend`, `dotShape`
  - Resample: `stride`, `threshold`
- On state change: emit a change event with the tier (repaint or resample)

## Acceptance

- State object is the single source of truth for all parameters
- Reset functions restore defaults correctly
- Change events fire with correct tier classification
