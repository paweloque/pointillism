import { sampleImage } from './sampler.js';
import { drawDots } from './renderer.js';
import { createDemoImage } from './demo-image.js';
import { buildGrid, queryRadius } from './spatial-grid.js';
import { state, set, onChange } from './state.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const canvasArea = document.getElementById('canvas-area');
const uploadOverlay = document.getElementById('upload-overlay');
const fileInput = document.getElementById('file-input');
const uploadError = document.getElementById('upload-error');
const btnUpload = document.getElementById('btn-upload');
const particleCountEl = document.getElementById('particle-count');

let currentImage = null;
let dots = [];
let grid = null;
let W = 0;
let H = 0;
let animating = false;

// --- Mouse ---

const mouse = { x: -9999, y: -9999 };

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

// --- Sampling ---

function resample() {
  if (!currentImage || !W || !H) return;
  const result = sampleImage(currentImage, W, H, {
    stride: state.stride,
    threshold: state.threshold,
    baseSize: state.dotSize,
    sizeScaling: state.sizeScaling,
  });
  dots = result.dots;
  grid = buildGrid(dots, state.mouseRadius);
  particleCountEl.textContent = result.particleCount.toLocaleString() + ' particles';
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  const newW = Math.round(rect.width);
  const newH = Math.round(rect.height);
  if (newW === W && newH === H) return;
  W = newW;
  H = newH;
  canvas.width = W;
  canvas.height = H;
  resample();
}

// --- Animation loop ---

function updateDots() {
  const easing = state.mouseEasing;

  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    d.x += (d.ox - d.x) * easing;
    d.y += (d.oy - d.y) * easing;
  }

  if (!grid || mouse.x < -1000) return;

  const radius = state.mouseRadius;
  const strength = state.mouseStrength;
  const nearby = queryRadius(grid, mouse.x, mouse.y, radius);

  for (let i = 0; i < nearby.length; i++) {
    const d = nearby[i];
    const dx = d.ox - mouse.x;
    const dy = d.oy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius && dist > 0) {
      const force = (1 - dist / radius) * strength;
      const targetX = d.ox + (dx / dist) * force;
      const targetY = d.oy + (dy / dist) * force;
      d.x += (targetX - d.x) * easing;
      d.y += (targetY - d.y) * easing;
    }
  }
}

function animate(t) {
  requestAnimationFrame(animate);
  updateDots();
  drawDots(ctx, dots, state.bgColor);
}

function startLoop() {
  if (animating) return;
  animating = true;
  requestAnimationFrame(animate);
}

// --- State → canvas ---

let resampleTimer;

onChange((key, tier) => {
  if (tier === 'resample') {
    clearTimeout(resampleTimer);
    resampleTimer = setTimeout(resample, 250);
  }
  // Rebuild grid if mouse radius changed
  if (key === 'mouseRadius' && dots.length > 0) {
    grid = buildGrid(dots, state.mouseRadius);
  }
});

// --- Sidebar controls ---

function syncControlsFromState() {
  // Sliders
  setSlider('ctrl-stride', 'val-stride', state.stride, String(state.stride));
  setSlider('ctrl-size', 'val-size', state.dotSize * 10, state.dotSize.toFixed(1));
  setSlider('ctrl-scaling', 'val-scaling', state.sizeScaling * 100, Math.round(state.sizeScaling * 100) + '%');
  setSlider('ctrl-threshold', 'val-threshold', state.threshold * 100, Math.round(state.threshold * 100) + '%');
  setSlider('ctrl-tint', 'val-tint', state.tintBlend, state.tintBlend > 0 ? state.tintBlend + '%' : 'off');
  setSlider('ctrl-radius', 'val-radius', state.mouseRadius, state.mouseRadius + 'px');
  setSlider('ctrl-strength', 'val-strength', state.mouseStrength, String(state.mouseStrength));

  // Swatches
  document.querySelectorAll('.color-swatch').forEach((el) => {
    el.classList.toggle('active', el.dataset.color === state.bgColor);
  });

  // Shapes
  document.querySelectorAll('.shape-btn').forEach((el) => {
    el.classList.toggle('active', el.dataset.shape === state.dotShape);
  });

  // Toggles
  document.querySelectorAll('.toggle').forEach((el) => {
    el.classList.toggle('on', !!state[el.dataset.toggle]);
  });
}

function setSlider(inputId, valueId, inputValue, displayValue) {
  const input = document.getElementById(inputId);
  const display = document.getElementById(valueId);
  if (input) input.value = inputValue;
  if (display) display.textContent = displayValue;
}

// Sliders
function wireSlider(inputId, valueId, stateKey, toState, toDisplay) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const raw = Number(input.value);
    set(stateKey, toState(raw));
    const display = document.getElementById(valueId);
    if (display) display.textContent = toDisplay(toState(raw));
  });
}

wireSlider('ctrl-stride', 'val-stride', 'stride', (v) => v, (v) => String(v));
wireSlider('ctrl-size', 'val-size', 'dotSize', (v) => v / 10, (v) => v.toFixed(1));
wireSlider('ctrl-scaling', 'val-scaling', 'sizeScaling', (v) => v / 100, (v) => Math.round(v * 100) + '%');
wireSlider('ctrl-threshold', 'val-threshold', 'threshold', (v) => v / 100, (v) => Math.round(v * 100) + '%');
wireSlider('ctrl-tint', 'val-tint', 'tintBlend', (v) => v, (v) => v > 0 ? v + '%' : 'off');
wireSlider('ctrl-radius', 'val-radius', 'mouseRadius', (v) => v, (v) => v + 'px');
wireSlider('ctrl-strength', 'val-strength', 'mouseStrength', (v) => v, (v) => String(v));

// Color swatches
document.querySelectorAll('.color-swatch').forEach((el) => {
  el.addEventListener('click', () => {
    set('bgColor', el.dataset.color);
    document.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
    el.classList.add('active');
  });
});

// Shape buttons
document.querySelectorAll('.shape-btn').forEach((el) => {
  el.addEventListener('click', () => {
    set('dotShape', el.dataset.shape);
    document.querySelectorAll('.shape-btn').forEach((s) => s.classList.remove('active'));
    el.classList.add('active');
  });
});

// Toggle switches
document.querySelectorAll('.toggle').forEach((el) => {
  el.addEventListener('click', () => {
    const key = el.dataset.toggle;
    set(key, !state[key]);
    el.classList.toggle('on');
  });
});

// Preset buttons
const PRESETS = {
  subtle: { stride: 4, dotSize: 0.3, sizeScaling: 0.5, threshold: 0.01, bgColor: '#000', mouseRadius: 80, mouseStrength: 12, mouseEasing: 0.06, breathing: true, sway: false, rise: false },
  dense:  { stride: 2, dotSize: 0.5, sizeScaling: 0.8, threshold: 0.01, bgColor: '#000', mouseRadius: 60, mouseStrength: 18, mouseEasing: 0.08, breathing: false, sway: false, rise: false },
  dreamy: { stride: 3, dotSize: 0.4, sizeScaling: 0.65, threshold: 0.01, bgColor: '#0a0a2e', mouseRadius: 100, mouseStrength: 10, mouseEasing: 0.04, breathing: true, sway: true, rise: false },
  energy: { stride: 2, dotSize: 0.6, sizeScaling: 1.0, threshold: 0.005, bgColor: '#000', mouseRadius: 120, mouseStrength: 30, mouseEasing: 0.12, breathing: true, sway: true, rise: true },
};

document.querySelectorAll('.preset-btn').forEach((el) => {
  el.addEventListener('click', () => {
    const preset = PRESETS[el.dataset.preset];
    if (!preset) return;
    Object.entries(preset).forEach(([k, v]) => set(k, v));
    document.querySelectorAll('.preset-btn').forEach((s) => s.classList.remove('active'));
    el.classList.add('active');
    syncControlsFromState();
  });
});

// Deactivate preset when user manually changes a param
onChange(() => {
  // Only deactivate if change didn't come from a preset click
  // (preset clicks call syncControlsFromState which won't re-trigger this)
});

// --- Upload ---

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('not an image'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('failed to load image'));
    };
    img.src = url;
  });
}

function showError(msg) {
  uploadError.textContent = msg;
  uploadError.classList.add('visible');
  setTimeout(() => uploadError.classList.remove('visible'), 2500);
}

async function handleFile(file) {
  try {
    currentImage = await loadImageFromFile(file);
    uploadOverlay.classList.add('hidden');
    resample();
  } catch (e) {
    showError(e.message === 'not an image' ? 'not an image file' : 'failed to load image');
  }
}

uploadOverlay.addEventListener('click', () => fileInput.click());
btnUpload.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    handleFile(fileInput.files[0]);
  }
  fileInput.value = '';
});

canvasArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  canvasArea.classList.add('dragover');
});

canvasArea.addEventListener('dragleave', () => {
  canvasArea.classList.remove('dragover');
});

canvasArea.addEventListener('drop', (e) => {
  e.preventDefault();
  canvasArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

// --- Resize ---

let resizeTimer;
const ro = new ResizeObserver(() => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 150);
});
ro.observe(canvas);

// --- Init ---

async function init() {
  resize();
  currentImage = await createDemoImage(W, H);
  resample();
  syncControlsFromState();
  startLoop();
}

init();
