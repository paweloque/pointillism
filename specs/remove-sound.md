# Remove Sound / Sonification Feature

## Summary

Remove the sonification feature entirely. The audio engine, UI controls, state keys, and related specs/tasks should all be deleted.

## Rationale

The sound feature was a bad idea and adds unnecessary complexity.

## Scope

Delete:
- `src/audio.js` — audio engine module
- `specs/sonification.md` — feature spec
- `plan/done/39-audio-engine.md`, `40-sonification-state-ui.md`, `41-sonification-wiring.md` — completed tasks

Remove from:
- `src/state.js` — `sonification` and `sonificationVolume` defaults, `sound` group
- `src/main.js` — audio engine import, instantiation, render-loop integration, state change handlers, volume slider wiring
- `src/index.html` — Sound section in sidebar, sound toggle in mobile bottom sheet, `#section-sound` CSS rule
