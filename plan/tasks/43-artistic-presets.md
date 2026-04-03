# Task 43 — Artistic Presets

**Spec**: `specs/artistic-presets.md`

## Subtasks

1. **State** — Add `hueRotate` (bool), `hueRotateSpeed` (number) to DEFAULTS in `state.js`. Add to `color` group and ensure they are repaint-tier.
2. **Renderer** — Add `drawDiamonds()` and `drawCrosses()` shape branches in `renderer.js`. Add hue-rotation color transform function (`rotateHue(r, g, b, angle) → [r, g, b]`), called in the tinted-color path when hue rotation is active.
3. **Main.js animation loop** — Track cumulative hue angle from elapsed time. Pass hue angle to `drawDots()` when `state.hueRotate` is true.
4. **Presets** — Add 6 new entries to `PRESETS` object in `main.js`.
5. **HTML** — Add 6 `<button class="preset-btn">` elements in both desktop and mobile preset rows.
6. **Controls** — Wire hue-rotate toggle and speed slider in the Color section. Add shape buttons for diamond and cross.
7. **Export** — Ensure `hueRotate` and `hueRotateSpeed` are included in exported state.

## Acceptance

- All 10 presets selectable and visually distinct.
- Hue rotation animates smoothly.
- Diamond and cross shapes render correctly.
- Export preserves new state.
