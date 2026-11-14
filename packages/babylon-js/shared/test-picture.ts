// A generated 512 x 320 test picture as a canvas or a data URL

/** Draws a colourful 512 x 320 picture (gradient, circles, grid, text) on a new canvas. */
export function drawTestCanvas(): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const g = c.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 512, 320);
  sky.addColorStop(0, '#1d4e89');
  sky.addColorStop(0.5, '#e2b13c');
  sky.addColorStop(1, '#c8412b');
  g.fillStyle = sky;
  g.fillRect(0, 0, 512, 320);
  g.strokeStyle = 'rgba(255,255,255,0.25)';
  for (let i = 0; i <= 512; i += 32) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i, 320);
    g.stroke();
  }
  const colours = ['#f5f5f5', '#2a9d8f', '#e76f51', '#264653', '#9b5de5'];
  colours.forEach((col, i) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(70 + i * 92, 200 - Math.sin(i * 1.3) * 60, 38, 0, Math.PI * 2);
    g.fill();
  });
  g.fillStyle = '#ffffff';
  g.font = 'bold 54px sans-serif';
  g.fillText('Smart Filters', 70, 80);
  return c;
}

/** The same picture as a PNG data URL. */
export function drawTestImage(): string {
  return drawTestCanvas().toDataURL('image/png');
}

