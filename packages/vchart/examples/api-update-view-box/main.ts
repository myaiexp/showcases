// updateViewBox: the chart is laid out inside a rectangle of its own canvas
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { barSpec } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(el, ctx, barSpec({ legend: !ctx.preview }));
  container.style.outline = '1px dashed #4a5060';

  const inset = { left: 0, top: 0, right: 0, bottom: 0 };
  let alive = true;
  const apply = (): void => {
    if (!alive) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    vchart.updateViewBox({ x1: inset.left, y1: inset.top, x2: w - inset.right, y2: h - inset.bottom });
  };
  if (bar) {
    for (const side of ['left', 'top', 'right', 'bottom'] as const) {
      slider(bar, side, [0, 160, 5], 0, (v) => {
        inset[side] = v;
        apply();
      });
    }
    return () => {
      alive = false;
      release();
    };
  }
  let t = 0;
  const stop = every(120, () => {
    t += 0.12;
    const k = (Math.sin(t) + 1) / 2;
    inset.left = Math.round(k * 40);
    inset.right = Math.round((1 - k) * 40);
    inset.top = Math.round(k * 16);
    inset.bottom = Math.round((1 - k) * 16);
    apply();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
