# Artistic Presets

**Date**: 2026-04-03
**Status**: Approved

## Goal

Expand the preset system with artistic presets that showcase the full range of the engine's capabilities. Add two new features (hue rotation, new dot shapes) to unlock preset combinations not currently possible.

## New Features

### 1. Hue Rotation

Continuous per-frame hue shift applied to each dot's color at draw time.

- **State keys**: `hueRotate` (bool, default false), `hueRotateSpeed` (number 0.1–3.0, default 1.0)
- **Tier**: repaint (no resample needed)
- **Implementation**: In the render loop, shift each dot's RGB through HSL, applying `speed * elapsed` as hue offset. The shift is global (all dots rotate together).
- **Group**: color

### 2. New Dot Shapes

Two additional shapes rendered via Canvas 2D path operations.

- **Diamond**: rotated square (45° fillRect via transform, or manual path)
- **Cross**: two overlapping thin rectangles forming a + shape

Both use the same size/alpha pipeline as existing shapes.

## New Presets

Six new style presets added to the existing four (subtle, dense, dreamy, energy):

| Name | Concept | Key Parameters |
|------|---------|----------------|
| **neon** | Glowing neon sign | soft shape, sparkle on, high sway, tint #ff00ff 40%, dark bg |
| **seurat** | Classical pointillism | stride 2, tiny dots (0.25), circle, no motion, no tint — faithful to source |
| **ember** | Floating hot embers | tint #ff6600 35%, rise+escape on, brownian on, breathing, dark bg |
| **cosmos** | Deep space starfield | bg #050520, soft dots, sparkle on, slow sway, low density (stride 5) |
| **mosaic** | Tile/tessera mosaic | square shape, stride 2, large dots (0.7), no motion, no tint |
| **aurora** | Northern lights shimmer | hueRotate on, soft dots, sway+breathing on, bg #0a0a1a |

## UI

Preset buttons are rendered in a flex row. The row will wrap naturally if needed. Both desktop sidebar and mobile bottom-sheet get the new buttons.

## Scope

- No new dependencies.
- Export must include hueRotate state so exported HTML preserves the effect.
