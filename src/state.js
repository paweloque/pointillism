const DEFAULTS = {
  // Dots
  bgColor: '#000',
  stride: 3,
  dotSize: 0.4,
  sizeScaling: 0.65,
  threshold: 0.01,
  dotShape: 'circle',
  // Color
  tintColor: null,
  tintBlend: 0,
  // Focal point
  focalX: 0.5,
  focalY: 0.5,
  // Text overlay
  textContent: '',
  textFont: 'Inter',
  textSize: 64,
  textX: 0.5,
  textY: 0.5,
  // Interaction
  interactionEnabled: true,
  mouseRadius: 80,
  mouseStrength: 18,
  mouseEasing: 0.08,
  // Motion
  breathing: false,
  breatheIntensity: 0.12,
  sway: false,
  swayIntensity: 1.0,
  rise: false,
  riseSpeedMultiplier: 1.0,
  escape: true,
  sparkle: false,
  sparkleSpeed: 1.0,
  brownian: false,
  brownianStrength: 0.5,
  sonification: false,
  sonificationVolume: 50,
};

const RESAMPLE_KEYS = new Set(['stride', 'threshold', 'bgColor', 'focalX', 'focalY', 'textContent', 'textFont', 'textSize', 'textX', 'textY']);

const GROUPS = {
  dots: ['stride', 'dotSize', 'sizeScaling', 'threshold', 'dotShape', 'focalX', 'focalY'],
  color: ['bgColor', 'tintColor', 'tintBlend'],
  interaction: ['interactionEnabled', 'mouseRadius', 'mouseStrength', 'mouseEasing'],
  motion: ['breathing', 'breatheIntensity', 'sway', 'swayIntensity', 'rise', 'riseSpeedMultiplier', 'escape', 'sparkle', 'sparkleSpeed', 'brownian', 'brownianStrength'],
  sound: ['sonification', 'sonificationVolume'],
};

const listeners = [];

export const state = { ...DEFAULTS };

export function getDefaults() {
  return { ...DEFAULTS };
}

export function onChange(fn) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}

function emit(key) {
  const tier = RESAMPLE_KEYS.has(key) ? 'resample' : 'repaint';
  for (let i = 0; i < listeners.length; i++) {
    listeners[i](key, tier);
  }
}

export function set(key, value) {
  if (state[key] === value) return;
  state[key] = value;
  emit(key);
}

export function resetState() {
  const keys = Object.keys(DEFAULTS);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (state[k] !== DEFAULTS[k]) {
      state[k] = DEFAULTS[k];
      emit(k);
    }
  }
}

export function resetGroup(group) {
  const keys = GROUPS[group];
  if (!keys) return;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (state[k] !== DEFAULTS[k]) {
      state[k] = DEFAULTS[k];
      emit(k);
    }
  }
}
