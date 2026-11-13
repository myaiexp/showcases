// Flare sprites drawn on a canvas as data URLs: glow, ring, hexagon
type Draw = (g: CanvasRenderingContext2D, half: number) => void;

function sprite(draw: Draw, size = 128): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  draw(g, size / 2);
  return canvas.toDataURL('image/png');
}

export const glow = (): string =>
  sprite((g, h) => {
    const grad = g.createRadialGradient(h, h, 0, h, h, h);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, h * 2, h * 2);
  });

export const ring = (): string =>
  sprite((g, h) => {
    const grad = g.createRadialGradient(h, h, h * 0.55, h, h, h * 0.95);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, h * 2, h * 2);
  });

export const hexagon = (): string =>
  sprite((g, h) => {
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      g[i ? 'lineTo' : 'moveTo'](h + Math.cos(a) * h * 0.9, h + Math.sin(a) * h * 0.9);
    }
    g.closePath();
    g.fillStyle = 'rgba(255,255,255,0.35)';
    g.fill();
  });
