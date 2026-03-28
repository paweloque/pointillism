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
export function coverFit(img, width, height, focalX = 0.5, focalY = 0.5) {
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
export function samplePixels(data, width, height, options = {}) {
  const {
    stride: requestedStride = DEFAULT_STRIDE,
    threshold = DEFAULT_THRESHOLD,
    baseSize = DEFAULT_BASE_SIZE,
    sizeScaling = DEFAULT_SIZE_SCALING,
    baseAlpha = DEFAULT_BASE_ALPHA,
    alphaScaling = DEFAULT_ALPHA_SCALING,
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

      if (brightness < threshold) continue;

      dots.push({
        x,
        y,
        brightness,
        r,
        g,
        b,
        size: baseSize + brightness * sizeScaling,
        alpha: baseAlpha + brightness * alphaScaling,
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
  const { focalX = 0.5, focalY = 0.5, ...samplingOptions } = options;
  const imageData = coverFit(img, width, height, focalX, focalY);
  return samplePixels(imageData.data, width, height, samplingOptions);
}
