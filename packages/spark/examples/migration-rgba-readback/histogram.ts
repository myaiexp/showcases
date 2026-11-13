// Draws a hue histogram of RGBA8 splat colours onto a 2D canvas
import * as THREE from 'three';

const BINS = 48;
const hsl = { h: 0, s: 0, l: 0 };
const color = new THREE.Color();

/** A canvas strip showing how much splat opacity falls in each hue bin. */
export function createHistogram(width: number, height: number): {
  canvas: HTMLCanvasElement;
  draw(rgba: Uint8Array, count: number): void;
} {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d')!;
  const bins = new Float32Array(BINS);
  return {
    canvas,
    draw(rgba, count) {
      bins.fill(0);
      for (let i = 0; i < count; i++) {
        const a = rgba[i * 4 + 3]! / 255;
        if (a === 0) continue;
        color.setRGB(rgba[i * 4]! / 255, rgba[i * 4 + 1]! / 255, rgba[i * 4 + 2]! / 255).getHSL(hsl);
        bins[Math.min(BINS - 1, Math.floor(hsl.h * BINS))]! += a * hsl.s;
      }
      const max = Math.max(...bins, 1e-6);
      g.clearRect(0, 0, width, height);
      const w = width / BINS;
      bins.forEach((v, i) => {
        const h = (v / max) * (height - 2);
        g.fillStyle = `hsl(${(i / BINS) * 360} 80% 55%)`;
        g.fillRect(i * w + 1, height - h, w - 2, h);
      });
    },
  };
}
