import { describe, it, expect } from 'vitest';
import { samplePixels, MAX_PARTICLES } from './sampler.js';

/**
 * Create a flat RGBA pixel array filled with a single color.
 */
function makePixels(width, height, r, g, b) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }
  return data;
}

describe('samplePixels', () => {
  it('returns dots from bright pixels', () => {
    const data = makePixels(12, 12, 255, 255, 255);
    const result = samplePixels(data, 12, 12, { stride: 3 });
    expect(result.dots.length).toBeGreaterThan(0);
    expect(result.adaptedStride).toBe(false);
  });

  it('skips near-black pixels', () => {
    const data = makePixels(12, 12, 2, 2, 2);
    const result = samplePixels(data, 12, 12, { stride: 3, threshold: 0.035 });
    expect(result.dots.length).toBe(0);
  });

  it('dot objects have required properties', () => {
    const data = makePixels(6, 6, 255, 136, 68);
    const result = samplePixels(data, 6, 6, { stride: 3 });
    expect(result.dots.length).toBeGreaterThan(0);

    const dot = result.dots[0];
    expect(dot).toHaveProperty('x');
    expect(dot).toHaveProperty('y');
    expect(dot).toHaveProperty('brightness');
    expect(dot).toHaveProperty('r');
    expect(dot).toHaveProperty('g');
    expect(dot).toHaveProperty('b');
    expect(dot).toHaveProperty('size');
    expect(dot).toHaveProperty('alpha');
  });

  it('size and alpha derive from brightness', () => {
    const data = makePixels(3, 3, 255, 255, 255);
    const result = samplePixels(data, 3, 3, { stride: 3 });
    const dot = result.dots[0];

    expect(dot.brightness).toBeCloseTo(1, 1);
    expect(dot.size).toBeCloseTo(0.4 + 1 * 0.65, 1);
    expect(dot.alpha).toBeCloseTo(0.4 + 1 * 0.6, 1);
  });

  it('preserves original pixel colors', () => {
    const data = makePixels(3, 3, 200, 100, 50);
    const result = samplePixels(data, 3, 3, { stride: 3 });
    const dot = result.dots[0];

    expect(dot.r).toBe(200);
    expect(dot.g).toBe(100);
    expect(dot.b).toBe(50);
  });

  it('adapts stride to stay within particle budget', () => {
    const data = makePixels(300, 300, 255, 255, 255);
    const result = samplePixels(data, 300, 300, { stride: 1 });
    expect(result.particleCount).toBeLessThanOrEqual(MAX_PARTICLES);
    expect(result.adaptedStride).toBe(true);
    expect(result.stride).toBeGreaterThan(1);
  });

  it('covers the full image when stride is adapted', () => {
    const data = makePixels(500, 500, 255, 255, 255);
    const result = samplePixels(data, 500, 500, { stride: 1 });
    // Last dot should be near the bottom of the image
    const lastDot = result.dots[result.dots.length - 1];
    expect(lastDot.y).toBeGreaterThan(400);
  });

  it('respects stride parameter', () => {
    const data = makePixels(12, 12, 255, 255, 255);
    const r1 = samplePixels(data, 12, 12, { stride: 2 });
    const r2 = samplePixels(data, 12, 12, { stride: 4 });
    expect(r1.particleCount).toBeGreaterThan(r2.particleCount);
  });

  it('respects custom baseSize and sizeScaling', () => {
    const data = makePixels(3, 3, 255, 255, 255);
    const result = samplePixels(data, 3, 3, {
      stride: 3,
      baseSize: 1.0,
      sizeScaling: 2.0,
    });
    const dot = result.dots[0];
    expect(dot.size).toBeCloseTo(1.0 + 1 * 2.0, 1);
  });
});
