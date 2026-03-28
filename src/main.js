import { sampleImage } from './sampler.js';
import { drawDots } from './renderer.js';
import { createDemoImage } from './demo-image.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

function resize() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width);
  canvas.height = Math.round(rect.height);
}

let currentImage = null;

function render() {
  if (!currentImage || !canvas.width || !canvas.height) return;
  const { dots } = sampleImage(currentImage, canvas.width, canvas.height);
  drawDots(ctx, dots);
}

async function init() {
  resize();
  currentImage = await createDemoImage(512);
  render();
}

init();
