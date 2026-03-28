export const MAX_PARTICLES = 50000;
export const DEFAULT_STRIDE = 3;
export const DEFAULT_THRESHOLD = 0.01;
export const DEFAULT_BASE_SIZE = 0.4;
export const DEFAULT_SIZE_SCALING = 0.65;
export const DEFAULT_BASE_ALPHA = 0.4;
export const DEFAULT_ALPHA_SCALING = 0.6;

/**
 * Draw an image onto an offscreen canvas using cover-fit.
 * Returns the ImageData for the covered area.
 */
export function coverFit(img, width, height, focalX = 0.5, focalY = 0.5, textOptions = null) {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const ctx = off.getContext('2d');

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(width / iw, height / ih);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (iw - sw) * focalX;
  const sy = (ih - sh) * focalY;

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

  // Rasterize text onto the image before sampling
  if (textOptions && textOptions.text) {
    ctx.fillStyle = '#fff';
    ctx.font = `${textOptions.size || 64}px ${textOptions.font || 'Inter'}, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tx = (textOptions.x || 0.5) * width;
    const ty = (textOptions.y || 0.5) * height;
    ctx.fillText(textOptions.text, tx, ty);
  }

  return ctx.getImageData(0, 0, width, height);
}

/**
 * Sample raw pixel data into an array of dot objects.
 * Pure function — no DOM dependency.
 *
 * @param {Uint8ClampedArray} data - RGBA pixel data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {object} [options]
 * @returns {{ dots: Array, particleCount: number, capped: boolean }}
 */
/**
 * Calculate luminance from a hex color string (0-1).
 */
export function hexLuminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const v = parseInt(h, 16);
  const r = ((v >> 16) & 255) / 255;
  const g = ((v >> 8) & 255) / 255;
  const b = (v & 255) / 255;
  return r * 0.299 + g * 0.587 + b * 0.114;
}

export function samplePixels(data, width, height, options = {}) {
  const {
    stride: requestedStride = DEFAULT_STRIDE,
    threshold = DEFAULT_THRESHOLD,
    baseSize = DEFAULT_BASE_SIZE,
    sizeScaling = DEFAULT_SIZE_SCALING,
    baseAlpha = DEFAULT_BASE_ALPHA,
    alphaScaling = DEFAULT_ALPHA_SCALING,
    lightBackground = false,
  } = options;

  // Adaptive stride: ensure we can cover the whole image within budget.
  // Estimate candidate pixels at requested stride, then bump stride if needed.
  let stride = requestedStride;
  const candidateCount = Math.ceil(width / stride) * Math.ceil(height / stride);
  if (candidateCount > MAX_PARTICLES) {
    stride = Math.ceil(Math.sqrt((width * height) / MAX_PARTICLES));
    if (stride < requestedStride) stride = requestedStride;
  }

  const dots = [];

  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

      // Dark bg: skip pixels darker than threshold
      // Light bg: skip pixels brighter than (1 - threshold)
      if (lightBackground) {
        if (brightness > 1 - threshold) continue;
      } else {
        if (brightness < threshold) continue;
      }

      // Physics properties (per-dot randomized)
      const edginess = Math.max(0, 1 - Math.abs(brightness - 0.5) * 1.5);

      // Escape: cubic random — most near zero, few scatter far
      const u = Math.random();
      const escapeStrength = u * u * u;
      const escapeAngle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;

      dots.push({
        ox: x,
        oy: y,
        x,
        y,
        brightness,
        r,
        g,
        b,
        size: baseSize + brightness * sizeScaling,
        alpha: baseAlpha + brightness * alphaScaling,
        // Breathing
        breathePhase: Math.random() * Math.PI * 2,
        breatheFreq: 0.00008 + Math.random() * 0.0001,
        // Sway
        swayPhaseX: Math.random() * Math.PI * 2,
        swayPhaseY: Math.random() * Math.PI * 2,
        swayFreqX: 0.00004 + Math.random() * 0.00006,
        swayFreqY: 0.00003 + Math.random() * 0.00005,
        swayAmpX: 0.3 + edginess * 1.2 + Math.random() * 0.5,
        swayAmpY: 0.2 + edginess * 0.8 + Math.random() * 0.4,
        // Rise
        riseSpeed: 0.0008 + Math.random() * 0.0012,
        maxRise: 6 + Math.random() * 14 + brightness * 8,
        riseOffset: Math.random(),
        // Escape
        escapeDX: Math.cos(escapeAngle) * escapeStrength * 30,
        escapeDY: Math.sin(escapeAngle) * escapeStrength * 22,
        // Sparkle (lifecycle)
        lifecycleDuration: 4000 + Math.random() * 8000,
        lifecycleOffset: Math.random(),
        // Brownian
        brownX: 0,
        brownY: 0,
      });
    }
  }

  return {
    dots,
    particleCount: dots.length,
    stride,
    adaptedStride: stride !== requestedStride,
  };
}

/**
 * High-level: sample an image element into dots.
 * Combines cover-fit (DOM) + pixel sampling (pure).
 */
export function sampleImage(img, width, height, options = {}) {
  const { focalX = 0.5, focalY = 0.5, text = null, ...samplingOptions } = options;
  const imageData = coverFit(img, width, height, focalX, focalY, text);
  return samplePixels(imageData.data, width, height, samplingOptions);
}
