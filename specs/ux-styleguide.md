# UX — Style Guide

Based on the **minimal-mono** prototype (`prototypes/minimal-mono/`).

## Design direction

Black and white. Fine lines. Maximum whitespace. The UI disappears so the canvas can speak.

## Typography

- **Font**: Inter (weights 300, 400, 500)
- **Fallback**: -apple-system, sans-serif
- **Base weight**: 300 (light)
- **Logo**: 0.85rem, weight 500, uppercase, letter-spacing 0.15em
- **Section titles**: 0.65rem, uppercase, letter-spacing 0.2em, color `--mid`
- **Control labels**: 0.8rem, weight 400
- **Control values**: 0.7rem, color `--mid`, tabular-nums
- **Buttons**: 0.75rem, weight 400, lowercase, letter-spacing 0.1em
- **All UI text**: lowercase or sentence case — never title case

## Color tokens

### Light mode (default)

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#000` | Text, borders, active states |
| `--bg` | `#fff` | Backgrounds, slider thumbs |
| `--mid` | `#888` | Secondary text, inactive controls |
| `--line` | `1px solid #000` | All borders — sidebar, sections, controls |
| `--line-light` | `1px solid #ddd` | Subtle dividers (used sparingly) |

### Dark mode

Invert `--ink` and `--bg`. `--mid` stays as a midpoint. Fine borders become `1px solid #fff`. Specifics to be defined during implementation, but the principle is: swap black/white, keep the same structure.

## Borders

- **Every border is 1px solid black** — this is the defining visual trait
- No shadows, no gradients, no rounded corners (except toggles)
- Borders create structure through lines, not weight

## Spacing

- **Sidebar width**: 300px
- **Section padding**: 20px vertical, 28px horizontal
- **Control spacing**: 16px between controls
- **Control header to input**: 8px
- **Button gap**: 8px between stacked buttons

## Components

### Sliders

- Track: 1px solid black line (full width)
- Thumb: 10x10px circle, white fill, 1px black border
- Value displayed in header row, right-aligned, `--mid` color

### Preset buttons

- Joined row (no gap), shared borders
- 1px black border, white background
- Active: black fill, white text
- Hover: `#f5f5f5` background
- Text: lowercase

### Toggle switches

- 32x16px, 1px black border, rounded (8px radius — the only rounded element)
- Knob: 10x10px circle
- Off: knob left, `--mid` color
- On: knob right, `--ink` color
- Transition: 150ms

### Shape selector

- Joined row (no gap), shared borders — same pattern as presets
- 36x36px per button
- Inactive: `--mid` color
- Active: black fill, white icon

### Color swatches

- 24x24px squares, 1px black border
- Active: 1px black outline with 3px offset
- No rounded corners

### Buttons

- Full-width, 12px vertical padding
- 1px black border
- Primary: black fill, white text (hover inverts)
- Secondary: white fill, black text (hover fills black)
- Transition: 150ms

### Particle count

- 0.65rem, `--mid` color, centered, tabular-nums
- Displayed below buttons in sidebar footer

## Canvas area

- Fills remaining viewport space
- Default background: `#000` (user-configurable)
- Upload hint: 0.75rem, lowercase, letter-spacing 0.2em, `#555` text, `1px solid #333` border

## Transitions

- All interactive state changes: 150ms
- No easing specified — use default (ease)
- No decorative animations on UI chrome

## What to avoid

- Rounded corners (except toggles)
- Box shadows
- Gradients
- Color accents — the UI is strictly black, white, and gray
- Bold weights above 500
- Uppercase labels (only section titles and logo are uppercase)
