# Task 12 — Wire sidebar controls to state and canvas

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`, `specs/performance.md`

## Description

Connect each sidebar control to the state. State changes update the canvas.

## Deliverables

- Each slider: on `input`, update `state[param]` and display value
- Color swatches: on click, set `state.bgColor`, mark active
- Shape buttons: on click, set `state.dotShape`, mark active
- Toggle switches: on click, flip `state[param]`, toggle `.on` class
- Preset buttons: on click, apply a preset (set all params), update all controls to reflect new values
- Repaint params: take effect on next animation frame (no resample)
- Resample params: debounce 250ms, then resample + redraw
- Particle count in footer updates after each resample
- Renderer reads from `state` instead of hardcoded values

## Acceptance

- Moving any slider changes the canvas in real-time
- Changing stride triggers a resample (visible dot count change)
- Changing background color applies immediately (no resample)
- Selecting a preset updates all sliders and the canvas
- Particle count updates correctly
