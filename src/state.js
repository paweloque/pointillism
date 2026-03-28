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
  // Interaction
  mouseRadius: 80,
  mouseStrength: 18,
  mouseEasing: 0.08,
  // Motion
  breathing: false,
  sway: false,
  rise: false,
};

const RESAMPLE_KEYS = new Set(['stride', 'threshold']);

const GROUPS = {
  dots: ['stride', 'dotSize', 'sizeScaling', 'threshold', 'dotShape'],
  color: ['bgColor', 'tintColor', 'tintBlend'],
  interaction: ['mouseRadius', 'mouseStrength', 'mouseEasing'],
  motion: ['breathing', 'sway', 'rise'],
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
