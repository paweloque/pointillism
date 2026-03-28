# Task 27 — Text overlay rasterization

**Phase**: 6 (Text overlay)
**Spec**: `specs/SPEC.md`

## Description

Render user text onto the source image before sampling, so text becomes dots.

## Deliverables

- Text input field in a new "Text" section in sidebar
- Font size slider
- Font picker (dropdown with 4–5 web-safe options: Inter, serif, monospace, etc.)
- When text is set:
  - Draw text onto the offscreen canvas after drawing the source image, before sampling
  - Use `ctx.fillText()` with chosen font/size
  - Text color: white (so it shows as bright dots on dark backgrounds)
- Changing text triggers a resample (debounced)
- Clearing text removes it and resamples

## Acceptance

- Typed text appears as dots in the canvas
- Changing font or size re-renders the text as dots
- Text is part of the dot field, not a separate overlay
