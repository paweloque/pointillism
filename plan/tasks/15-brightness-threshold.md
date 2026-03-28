# Task 15 — Background-aware brightness threshold

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`

## Description

Make the threshold adapt to the background color so dots near the background are skipped.

## Deliverables

- Calculate background luminance from `state.bgColor`
- Dark background (luminance < 0.5): skip pixels with brightness below threshold
- Light background (luminance >= 0.5): skip pixels with brightness above `(1 - threshold)`
- Threshold slider (already in sidebar) controls the cutoff
- Changing threshold triggers a resample (debounced)

## Acceptance

- Dark background + threshold 4%: near-black pixels hidden (existing behavior)
- Light background + threshold 4%: near-white pixels hidden
- Threshold slider causes visible density change after debounce
