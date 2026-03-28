# Task 20 — Responsive layout (breakpoints)

**Phase**: 4 (Parameter playground)
**Spec**: `specs/ux-progressive-enhancement.md`

## Description

Adapt the layout to small, medium, and large screens.

## Deliverables

- **Large (> 1024px)**: persistent sidebar (current layout)
- **Medium (640–1024px)**:
  - Sidebar hidden by default
  - Toggle button on the left edge of canvas (thin vertical bar, 1px border, icon)
  - Clicking opens/closes sidebar as an overlay (doesn't push canvas)
  - Sidebar shows all parameters
- **Small (< 640px)**:
  - No sidebar
  - Floating upload button (bottom-right corner)
  - Tap floating button to open a compact bottom sheet
  - Bottom sheet: background color, density, size sliders + export button only
  - Sheet slides up from bottom, 1px top border
- CSS media queries for breakpoints
- Canvas always fills available space at every breakpoint

## Acceptance

- Desktop: sidebar always visible
- Tablet: sidebar toggleable, canvas fills viewport when closed
- Mobile: bottom sheet with essential controls
- Resizing the browser transitions between layouts
