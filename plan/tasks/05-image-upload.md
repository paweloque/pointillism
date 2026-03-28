# Task 05 — Image upload

**Phase**: 2 (Image upload)
**Spec**: `specs/SPEC.md`, `specs/ux-progressive-enhancement.md`, `specs/ux-styleguide.md`

## Description

Let the user upload their own image via drag-and-drop or file picker.

## Deliverables

- Upload overlay on canvas area: "drop image or click upload" (styled per styleguide)
- Drag-and-drop: listen for `dragover`/`drop` on canvas area, read dropped file as `Image`
- File picker: hidden `<input type="file" accept="image/*">`, triggered by upload overlay click or sidebar upload button
- On new image: replace current image, resample, redraw
- Show upload overlay on first load (with demo image visible behind it)
- Hide overlay text once user uploads (but keep drag-and-drop active for re-upload)
- Validate: reject non-image files with a brief inline message

## Acceptance

- Drag-and-drop an image onto the canvas replaces the demo
- Clicking the overlay opens a file picker
- Uploading a second image replaces the first
- Non-image files are rejected gracefully
