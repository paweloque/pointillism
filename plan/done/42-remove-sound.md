# Task 42 — Remove Sound Feature

Spec: `specs/remove-sound.md`

## Steps

1. Delete `src/audio.js`
2. Remove `sonification`, `sonificationVolume` from DEFAULTS in `src/state.js`
3. Remove `sound` group from GROUPS in `src/state.js`
4. Remove audio engine import, instantiation, render-loop sonification block, state change handlers, and volume slider wiring from `src/main.js`
5. Remove Sound section (sidebar) and sound toggle (mobile bottom sheet) from `src/index.html`
6. Remove `#section-sound` CSS rule from `src/index.html`
7. Remove collapsible section JS for `section-sound` from `src/main.js`
8. Delete `specs/sonification.md` and related done tasks
