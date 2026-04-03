/**
 * Parse a hex color string to [r, g, b].
 */
function hexToRgb(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

/**
 * Rotate RGB color by a hue angle (in radians).
 * Uses simplified rotation matrix for speed.
 */
function rotateHue(r, g, b, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rr = Math.round(r * (0.213 + 0.787 * cos - 0.213 * sin) +
                         g * (0.715 - 0.715 * cos - 0.715 * sin) +
                         b * (0.072 - 0.072 * cos + 0.928 * sin));
  const gg = Math.round(r * (0.213 - 0.213 * cos + 0.143 * sin) +
                         g * (0.715 + 0.285 * cos + 0.140 * sin) +
                         b * (0.072 - 0.072 * cos - 0.283 * sin));
  const bb = Math.round(r * (0.213 - 0.213 * cos - 0.787 * sin) +
                         g * (0.715 - 0.715 * cos + 0.715 * sin) +
                         b * (0.072 + 0.928 * cos + 0.072 * sin));
  return [Math.max(0, Math.min(255, rr)),
          Math.max(0, Math.min(255, gg)),
          Math.max(0, Math.min(255, bb))];
}

/**
 * Get the rendered color for a dot, applying tint and hue rotation if active.
 */
function tintedColor(d, tintRgb, blend, hueAngle) {
  let r = d.r, g = d.g, b = d.b;
  if (tintRgb && blend > 0) {
    const inv = 1 - blend;
    r = Math.round(r * inv + tintRgb[0] * blend);
    g = Math.round(g * inv + tintRgb[1] * blend);
    b = Math.round(b * inv + tintRgb[2] * blend);
  }
  if (hueAngle !== 0) {
    [r, g, b] = rotateHue(r, g, b, hueAngle);
  }
  return `rgb(${r},${g},${b})`;
}

/**
 * Compute dot size. If sizeParams provided, compute from brightness at draw time.
 * Otherwise fall back to pre-baked d.size.
 */
function dotSize(d, sizeParams) {
  if (sizeParams) return sizeParams.base + d.brightness * sizeParams.scaling;
  return d.size;
}

/**
 * Draw dots onto a canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} dots
 * @param {string} [bgColor='#000']
 * @param {string} [shape='circle']
 * @param {object} [tint] - { color: '#hex'|null, blend: 0-100 }
 * @param {object} [sizeParams] - { base: number, scaling: number } for draw-time size
 * @param {number} [hueAngle=0] - hue rotation angle in radians
 */
export function drawDots(ctx, dots, bgColor = '#000', shape = 'circle', tint = null, sizeParams = null, hueAngle = 0) {
  const { width, height } = ctx.canvas;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  const tintRgb = tint && tint.color && tint.blend > 0 ? hexToRgb(tint.color) : null;
  const blend = tintRgb ? tint.blend / 100 : 0;

  if (shape === 'square') {
    drawSquares(ctx, dots, tintRgb, blend, sizeParams, hueAngle);
  } else if (shape === 'soft') {
    drawSoft(ctx, dots, tintRgb, blend, sizeParams, hueAngle);
  } else if (shape === 'diamond') {
    drawDiamonds(ctx, dots, tintRgb, blend, sizeParams, hueAngle);
  } else if (shape === 'cross') {
    drawCrosses(ctx, dots, tintRgb, blend, sizeParams, hueAngle);
  } else {
    drawCircles(ctx, dots, tintRgb, blend, sizeParams, hueAngle);
  }

  ctx.globalAlpha = 1;
}

function drawCircles(ctx, dots, tintRgb, blend, sp, hueAngle) {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    ctx.globalAlpha = d.drawAlpha !== undefined ? d.drawAlpha : d.alpha;
    ctx.fillStyle = tintedColor(d, tintRgb, blend, hueAngle);
    ctx.beginPath();
    ctx.arc(d.x, d.y, dotSize(d, sp), 0, 6.2832);
    ctx.fill();
  }
}

function drawSquares(ctx, dots, tintRgb, blend, sp, hueAngle) {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    ctx.globalAlpha = d.drawAlpha !== undefined ? d.drawAlpha : d.alpha;
    ctx.fillStyle = tintedColor(d, tintRgb, blend, hueAngle);
    const s = dotSize(d, sp);
    const s2 = s * 2;
    ctx.fillRect(d.x - s, d.y - s, s2, s2);
  }
}

function drawDiamonds(ctx, dots, tintRgb, blend, sp, hueAngle) {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    const s = dotSize(d, sp);
    ctx.globalAlpha = d.drawAlpha !== undefined ? d.drawAlpha : d.alpha;
    ctx.fillStyle = tintedColor(d, tintRgb, blend, hueAngle);
    ctx.beginPath();
    ctx.moveTo(d.x, d.y - s);
    ctx.lineTo(d.x + s, d.y);
    ctx.lineTo(d.x, d.y + s);
    ctx.lineTo(d.x - s, d.y);
    ctx.closePath();
    ctx.fill();
  }
}

function drawCrosses(ctx, dots, tintRgb, blend, sp, hueAngle) {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    const s = dotSize(d, sp);
    const arm = s * 0.35;
    ctx.globalAlpha = d.drawAlpha !== undefined ? d.drawAlpha : d.alpha;
    ctx.fillStyle = tintedColor(d, tintRgb, blend, hueAngle);
    ctx.fillRect(d.x - s, d.y - arm, s * 2, arm * 2);
    ctx.fillRect(d.x - arm, d.y - s, arm * 2, s * 2);
  }
}

function drawSoft(ctx, dots, tintRgb, blend, sp, hueAngle) {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    const s = dotSize(d, sp);
    const r = s * 2;
    const color = tintedColor(d, tintRgb, blend, hueAngle);
    const match = color.match(/\d+/g);
    const [cr, cg, cb] = match;
    const a = d.drawAlpha !== undefined ? d.drawAlpha : d.alpha;
    const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
    grad.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
    grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(d.x, d.y, r, 0, 6.2832);
    ctx.fill();
  }
}
