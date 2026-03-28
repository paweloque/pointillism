# Task 06 — Demo image (first-run experience)

**Phase**: 2 (Image upload)
**Spec**: `specs/ux-progressive-enhancement.md`

## Description

Bundle a demo image so the app shows something on first load.

## Deliverables

- Include a small, visually interesting demo image in `src/assets/demo.jpg` (or base64 inline)
  - Should look good as dots — some contrast, recognizable shape
  - Keep file size reasonable (< 200KB)
- On first load: automatically sample and render the demo image
- Upload overlay appears on top: "drop your image or click to upload"
- Once user uploads their own image, demo is replaced

## Acceptance

- First visit shows dots immediately — no blank canvas
- Demo image is visually appealing as a dot rendering
