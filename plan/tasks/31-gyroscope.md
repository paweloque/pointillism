# Task 31 — Gyroscope / tilt interaction

**Phase**: 8 (Mobile polish)
**Spec**: `specs/roadmap.md`, `specs/ux-progressive-enhancement.md`

## Description

On supported devices, tilting the phone displaces dots.

## Deliverables

- Check for `DeviceOrientationEvent` support
- Request permission on iOS (`DeviceOrientationEvent.requestPermission()`)
- Map device tilt (beta/gamma) to a virtual mouse position
  - Neutral (phone flat): virtual mouse at center
  - Tilting shifts virtual mouse position, displacing nearby dots
- Fallback: if gyroscope not available, touch interaction only
- Small "enable tilt" prompt on first mobile visit (only if supported)

## Acceptance

- Tilting the phone moves dots on supported devices
- Permission request works on iOS
- Graceful fallback on devices without gyroscope
