# Task 21 — Basic export

**Phase**: 4 (Parameter playground)
**Spec**: `specs/SPEC.md`
**Blocker**: Export format open questions must be resolved first (see `specs/SPEC.md`)

## Description

Export the current state as a self-contained HTML file.

## Deliverables

- Export button in sidebar footer triggers download
- Generate a single `.html` file containing:
  - The source image as base64 data URI
  - Sampling + rendering JS (minified or inline)
  - Current parameter state baked as constants
  - Mouse interaction code
  - Full-viewport canvas, no sidebar, no controls
  - Inline CSS (background color, canvas styling)
- File downloads as `pointilism-export.html`
- File works when opened directly in a browser (no server needed)

## Acceptance

- Clicking export downloads an HTML file
- Opening the exported file shows the dot rendering with mouse interaction
- No external dependencies in the exported file
- File size is reasonable (image base64 + small JS)

## Open questions (resolve before starting)

- See `specs/SPEC.md` "Export (open questions — to be discussed)"
