# UX — Progressive Enhancement

## Principle

The app adapts to screen size by progressively revealing functionality. Smaller screens show a focused, usable subset. Larger screens unlock the full parameter playground. The dot canvas is always the star — controls never compete with it for space.

## Design decision

**Chosen style: minimal-mono** (see `prototypes/minimal-mono/`). Black and white, fine 1px black lines, maximum whitespace, Inter typeface. The full visual language is documented in `specs/ux-styleguide.md`.

## Design philosophy

- **Minimalistic but lovable** — clean lines, generous whitespace, no visual clutter. The UI should feel calm and intentional, not sterile.
- **Content first** — the dot canvas is the product. Controls exist to serve it, not to impress on their own. No gratuitous animations, shadows, or decorative elements on the UI chrome.
- **Quiet confidence** — small, considered details (smooth transitions, well-chosen type, consistent spacing) make the app feel polished without drawing attention away from the user's creation.

## Light / dark mode

- Follows system preference (`prefers-color-scheme`) by default, with a manual toggle.
- **Dark mode** — dark neutral background for the UI chrome (sidebar, bottom sheet). Works naturally since most dot canvases will have dark backgrounds.
- **Light mode** — light neutral background for the UI chrome. Canvas area keeps whatever background color the user has set — it is never forced by the theme.
- Controls (sliders, pickers, buttons) adapt to the active theme with subtle contrast — no harsh borders or heavy outlines.
- The toggle is small and unobtrusive (icon only, placed in a corner or panel header).

## First-run experience

- Ship a built-in demo image.
- On first load, the canvas shows the demo already rendered as dots — the user immediately sees what the app does.
- Upload prompt overlays subtly: "Drop your image or click to upload."
- Once the user uploads their own image, the demo is replaced and does not reappear.

## Breakpoints

### Small (< 640px) — Mobile

- Full-viewport canvas with the dot effect
- Upload button (floating, minimal)
- Tap to toggle a compact bottom sheet with essential controls:
  - Background color
  - Dot stride (density)
  - Dot size
- Export button inside the bottom sheet
- No text overlay editing (too cramped to be useful)
- Mouse interaction replaced by gyroscope/tilt where available

### Medium (640px–1024px) — Tablet

- Full-viewport canvas
- Collapsible side panel (hidden by default, toggle button on edge)
- Panel shows all dot parameters:
  - Background color, stride, dot size, size scaling
  - Color tint + blend strength
  - Mouse radius, strength, easing
  - Breathing toggle + intensity
- Export button in panel
- Text overlay: simple single-line input, font size, centered placement only

### Large (> 1024px) — Desktop

- Canvas takes remaining space after a persistent sidebar
- Sidebar always visible with the full parameter playground:
  - All dot and mouse parameters with sliders
  - Color tint with full picker and blend slider
  - Breathing controls
  - Text overlay: multi-line, font picker, size, drag-to-position on canvas
- Live preview updates as sliders move
- Export button prominent at bottom of sidebar

## Shared behavior across all sizes

- Upload works everywhere (drag-and-drop on desktop, file picker on all)
- Canvas always fills available space and resamples on resize/orientation change
- Export always produces the same self-contained HTML regardless of which screen size was used to create it
- Parameter state is preserved if the user rotates or resizes the viewport
