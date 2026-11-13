// Resizer.resize() to a small canvas, and getResizedTexture()
import { Resizer } from '@babylonjs/controls';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';

/** Draws one frame of a moving scene on the 512 x 320 source canvas. */
function drawFrame(canvas: HTMLCanvasElement, t: number): void {
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#10182c';
  g.fillRect(0, 0, 512, 320);
  for (let i = 0; i < 12; i++) {
    g.fillStyle = `hsl(${(i * 30 + t * 40) % 360} 80% 60%)`;
    g.beginPath();
    g.arc(256 + Math.cos(t * 0.9 + i * 0.52) * 190, 160 + Math.sin(t * 1.3 + i * 0.9) * 110, 22, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = '#fff';
  g.lineWidth = 3;
  g.strokeRect(6, 6, 500, 308);
}

const mount: Mount = (el, ctx) => {
  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '4px', width: '100%', alignItems: 'center', justifyContent: 'center', background: '#000', height: ctx.preview ? '200px' : '320px' });
  const source = document.createElement('canvas');
  source.width = 512;
  source.height = 320;
  const target = document.createElement('canvas');
  const size = { width: ctx.preview ? 48 : 64, height: ctx.preview ? 30 : 40 };
  target.width = size.width;
  target.height = size.height;
  Object.assign(source.style, { flex: '1 1 0', minWidth: '0', width: '48%', objectFit: 'contain', maxHeight: '100%' });
  Object.assign(target.style, { flex: '1 1 0', minWidth: '0', width: '48%', objectFit: 'contain', maxHeight: '100%', imageRendering: 'pixelated' });
  row.append(source, target);
  el.append(row);

  // The control draws into `target`: the source is stretched to the canvas's size.
  const resizer = new Resizer(target);

  let disposed = false;
  let raf = 0;
  let t = 0;
  let last = performance.now();
  const tick = async (): Promise<void> => {
    const now = performance.now();
    t += (now - last) / 1000;
    last = now;
    drawFrame(source, t);
    await resizer.resize(source); // a canvas's current pixels are read each call
    if (!disposed) raf = requestAnimationFrame(() => void tick());
  };
  void tick();

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout(`target canvas: ${size.width} x ${size.height}`);
    panel.select('target size', ['16 x 10', '32 x 20', '64 x 40', '128 x 80', '256 x 160'] as const, '64 x 40', (v) => {
      const [w, h] = v.split(' x ').map(Number) as [number, number];
      target.width = w;
      target.height = h;
      resizer.engine.resize(); // the engine follows the canvas's new size
      readout.textContent = `target canvas: ${w} x ${h}`;
    });
  }

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    resizer.dispose();
    row.remove();
  };
};

export default mount;
