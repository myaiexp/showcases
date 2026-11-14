// resize(width, height) on a chart whose autoFit is off, with the canvas size read back
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, slider } from '../../shared/chart.ts';
import { barSpec } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const w0 = ctx.preview ? 240 : 560;
  const h0 = ctx.preview ? 180 : 300;
  const { vchart, container, release } = createChart(el, ctx, barSpec({ legend: !ctx.preview }), {
    // autoFit false: the constructor takes the container's size once and then holds it.
    init: { autoFit: false },
    height: 360,
    previewHeight: 200,
  });
  container.style.width = `${w0}px`;
  container.style.height = `${h0}px`;
  container.style.outline = '1px dashed #4a5060';
  const out = bar ? readout(el) : null;

  let alive = true;
  const size = { w: w0, h: h0 };
  const apply = (): void => {
    if (!alive) return;
    container.style.width = `${size.w}px`;
    container.style.height = `${size.h}px`;
    void vchart.resize(size.w, size.h).then(() => {
      const canvas = alive ? vchart.getCanvas() : undefined;
      if (out && canvas) out.textContent = `resize(${size.w}, ${size.h}) -> canvas ${canvas.style.width || canvas.width} x ${canvas.style.height || canvas.height}`;
    });
  };
  if (bar) {
    slider(bar, 'width', [200, 900, 20], w0, (v) => {
      size.w = v;
      apply();
    });
    slider(bar, 'height', [140, 360, 10], h0, (v) => {
      size.h = v;
      apply();
    });
    return () => {
      alive = false;
      release();
    };
  }
  const sizes: [number, number][] = [[240, 180], [160, 120], [250, 190]];
  let i = 0;
  const stop = every(1800, () => {
    const [w, h] = sizes[++i % sizes.length] as [number, number];
    size.w = w;
    size.h = h;
    apply();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
