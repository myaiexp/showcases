// Draws the demo images on a canvas so the image source needs no network request
export const PATTERNS = ['sunset', 'grid', 'rings'] as const;
export type Pattern = (typeof PATTERNS)[number];

export function paintImage(pattern: Pattern, size = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d') as CanvasRenderingContext2D;
  if (pattern === 'sunset') {
    const grad = g.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#2b1055');
    grad.addColorStop(0.55, '#e8501c');
    grad.addColorStop(1, '#f7c948');
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    g.fillStyle = '#fff3';
    g.beginPath();
    g.arc(size / 2, size * 0.6, size * 0.22, 0, Math.PI * 2);
    g.fill();
  } else if (pattern === 'grid') {
    g.fillStyle = '#0d3b4f';
    g.fillRect(0, 0, size, size);
    g.strokeStyle = '#58a6ff';
    g.lineWidth = 2;
    for (let i = 0; i <= 8; i++) {
      const p = (i * size) / 8;
      g.beginPath();
      g.moveTo(p, 0);
      g.lineTo(p, size);
      g.moveTo(0, p);
      g.lineTo(size, p);
      g.stroke();
    }
  } else {
    g.fillStyle = '#1b2a14';
    g.fillRect(0, 0, size, size);
    for (let r = size * 0.48; r > 8; r -= 20) {
      g.strokeStyle = r % 40 < 20 ? '#22c55e' : '#e8a308';
      g.lineWidth = 8;
      g.beginPath();
      g.arc(size / 2, size / 2, r, 0, Math.PI * 2);
      g.stroke();
    }
  }
  // An arrow and a corner mark show which way is "up" once the quad is moved around.
  g.fillStyle = '#fff';
  g.font = `bold ${size / 8}px sans-serif`;
  g.textAlign = 'left';
  g.textBaseline = 'top';
  g.fillText('TL', 8, 6);
  g.lineWidth = 4;
  g.strokeStyle = '#fff';
  g.strokeRect(2, 2, size - 4, size - 4);
  return canvas;
}
