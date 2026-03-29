# Task 39: Audio Engine

**Spec**: specs/SPEC.md (sonification feature)

## Goal
Create `src/audio.js` with a Web Audio API engine that maps nearby dot properties to sound.

## Details
- Export `createAudioEngine(poolSize = 12)` returning `{ start, stop, update, setMasterVolume }`
- Uses pentatonic scale frequencies mapped from dot brightness
- Oscillator pool with gain/pan per slot
- Distance-based amplitude, size-based waveform, hue-based stereo pan
