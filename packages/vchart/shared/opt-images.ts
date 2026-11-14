// Canvas-drawn images for the image and background examples (no files, no network)

/** A 160x80 picture with a gradient, a ring and an arrow, so cropping and scaling show. */
export function wideImage(): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 160;
  c.height = 80;
  const g = c.getContext('2d');
  if (!g) return c;
  const grad = g.createLinearGradient(0, 0, 160, 80);
  grad.addColorStop(0, '#4d7cff');
  grad.addColorStop(1, '#e5534b');
  g.fillStyle = grad;
  g.fillRect(0, 0, 160, 80);
  g.strokeStyle = '#ffffff';
  g.lineWidth = 4;
  g.strokeRect(2, 2, 156, 76);
  g.beginPath();
  g.arc(80, 40, 26, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.moveTo(66, 30);
  g.lineTo(100, 40);
  g.lineTo(66, 50);
  g.closePath();
  g.fill();
  return c;
}

/** A 24x24 dotted tile that repeats well. */
export function dotTile(color = '#ffd93d'): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 24;
  c.height = 24;
  const g = c.getContext('2d');
  if (!g) return c;
  g.fillStyle = color;
  g.beginPath();
  g.arc(12, 12, 5, 0, Math.PI * 2);
  g.fill();
  g.fillRect(0, 0, 3, 3);
  return c;
}
