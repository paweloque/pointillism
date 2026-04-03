# Task — Improve threshold visibility

**Spec:** `specs/threshold-visibility.md`

## Changes

1. **`src/index.html`** — change slider `max` from `20` to `50`, default `value` from `1` to `5`, display from `1%` to `5%`.
2. **`src/state.js`** — change `threshold` default from `0.01` to `0.05`.
3. **`src/main.js`** — update preset threshold values (subtle 0.03, dense 0.02, dreamy 0.05, energy 0.01).
4. **`src/main.js`** — update `setSlider` initial sync for threshold.
5. **`src/export.js`** — no change needed (uses state value directly).

## Acceptance

- Moving the threshold slider from 0% to 50% produces a clearly visible change in dot density.
- Presets apply distinct threshold values.
