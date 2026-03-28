/**
 * Draw dots onto a canvas context. Single draw call, no animation.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} dots - Array of dot objects from sampler
 * @param {string} [bgColor='#000'] - Background fill color
 */
export function drawDots(ctx, dots, bgColor = '#000') {
  const { width, height } = ctx.canvas;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = `rgb(${d.r},${d.g},${d.b})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, 6.2832);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}
