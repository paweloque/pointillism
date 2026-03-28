# Task 34 — Disable interaction toggle

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Let the user disable mouse/touch interaction entirely so dots stay in place (only physics moves them). Useful when the user wants a static or physics-only background without cursor displacement.

## Deliverables

- Add to `state.js`:
  - `interactionEnabled: true` (toggle, default on)
- In `updateDots` (main.js):
  - Skip the mouse displacement block when `state.interactionEnabled` is false
- Add a toggle in the Interaction section in `index.html`:
  - "Enabled" toggle at the top of the section
  - When off, radius and strength sliders are visually dimmed (opacity 0.4, pointer-events none)
- Wire toggle in `main.js`
- Update export: when interaction is disabled, omit mouse/touch event listeners from exported HTML
- Add `interactionEnabled` to the interaction group in state for reset

## Acceptance

- Toggle off: mouse/touch has no effect on dots
- Toggle on: dots react to cursor as before
- Sliders dim when interaction is disabled
- Export respects the toggle
