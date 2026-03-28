# Task 19 — Light/dark mode

**Phase**: 4 (Parameter playground)
**Spec**: `specs/ux-progressive-enhancement.md`, `specs/ux-styleguide.md`

## Description

Support light and dark mode for the sidebar UI chrome.

## Deliverables

- Define dark mode tokens: `--ink: #fff`, `--bg: #111`, `--mid: #888`, `--line: 1px solid #fff`
- Apply via `[data-theme="dark"]` on `<body>` or `:root`
- Default: follow `prefers-color-scheme`
- Manual toggle: small icon button in sidebar header (sun/moon), sets `data-theme`
- Canvas area is unaffected by theme — it always uses `state.bgColor`
- Store preference in `localStorage` so it persists across reloads

## Acceptance

- App respects system dark mode preference on first load
- Toggle switches between light and dark
- Sidebar inverts cleanly (all borders, text, backgrounds)
- Canvas background is independent of theme
- Preference persists across page reloads
