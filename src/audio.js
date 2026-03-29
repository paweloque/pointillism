const PENTATONIC = [220, 262, 294, 330, 392, 440, 523, 587, 659, 784, 880, 1047, 1175];

function rgbToHue(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h /= 6;
  if (h < 0) h += 1;
  return h;
}

export function createAudioEngine(poolSize = 12) {
  let ctx = null;
  let masterGain = null;
  let slots = null;
  const candidates = [];

  function start() {
    if (ctx) return;
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);

    slots = [];
    for (let i = 0; i < poolSize; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const pan = ctx.createStereoPanner();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(masterGain);
      osc.start();
      slots.push({ osc, gain, pan });
    }
  }

  function stop() {
    if (!ctx) return;
    const now = ctx.currentTime;
    for (let i = 0; i < slots.length; i++) {
      slots[i].gain.gain.setTargetAtTime(0, now, 0.015);
    }
    const c = ctx;
    setTimeout(() => c.close(), 50);
    ctx = null;
    masterGain = null;
    slots = null;
  }

  function update(nearbyDots, mouseX, mouseY, radius) {
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;

    if (mouseX < 0) {
      for (let i = 0; i < slots.length; i++) {
        slots[i].gain.gain.setTargetAtTime(0, now, 0.015);
      }
      return;
    }

    candidates.length = 0;
    for (let i = 0; i < nearbyDots.length; i++) {
      const dot = nearbyDots[i];
      const dx = dot.ox - mouseX;
      const dy = dot.oy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        candidates.push({ dot, dist });
      }
    }
    candidates.sort((a, b) => a.dist - b.dist);
    if (candidates.length > poolSize) candidates.length = poolSize;

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (i < candidates.length) {
        const { dot, dist } = candidates[i];

        const freq = PENTATONIC[Math.round(dot.brightness * (PENTATONIC.length - 1))];
        slot.osc.frequency.setTargetAtTime(freq, now, 0.015);

        const g = (1 - dist / radius) / poolSize;
        slot.gain.gain.setTargetAtTime(g, now, 0.015);

        const type = dot.size < 0.5 ? 'sine' : dot.size < 0.8 ? 'triangle' : 'square';
        slot.osc.type = type;

        const r = dot.r, gr = dot.g, b = dot.b;
        if (r !== gr || gr !== b) {
          slot.pan.pan.setTargetAtTime(rgbToHue(r, gr, b) * 2 - 1, now, 0.015);
        } else {
          slot.pan.pan.setTargetAtTime(0, now, 0.015);
        }
      } else {
        slot.gain.gain.setTargetAtTime(0, now, 0.015);
      }
    }
  }

  function setMasterVolume(v) {
    if (!ctx || !masterGain) return;
    masterGain.gain.setTargetAtTime(v / 100, ctx.currentTime, 0.015);
  }

  return { start, stop, update, setMasterVolume };
}
