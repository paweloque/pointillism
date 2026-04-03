# Spec — Improve threshold visibility

## Problem

The brightness-threshold slider (0–20%) produces no visible change on most images.
On a dark background the maximum 20% cutoff only removes near-black pixels; on
typical photos that eliminates almost nothing, making the control feel broken.

All four presets use virtually the same value (0.5–1%), confirming that the
current range offers no meaningful variation.

## Decision

**Widen the range** so the slider produces a clearly visible effect.

| Property | Before | After |
|----------|--------|-------|
| Slider max | 20 (→ 0.20) | 50 (→ 0.50) |
| Default | 1% (0.01) | 5% (0.05) |
| Presets | all ≈ 1% | subtle 3%, dense 2%, dreamy 5%, energy 1% |

At 50% the slider removes every pixel in the darker/lighter half (depending on
background), which is a dramatic and obvious change.

## Out of scope

- Removing the control entirely (widening the range makes it useful).
- Changing the brightness formula or background-aware logic.
