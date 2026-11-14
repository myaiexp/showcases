// FAQ: a minimal sparkline: a line chart with axes, legend, tooltip and padding switched off
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const series = (seed: number): { x: number; y: number }[] => {
  const r = rng(seed);
  let y = 50;
  return Array.from({ length: 24 }, (_, x) => ({ x, y: (y = Math.max(5, Math.min(95, y + (r() - 0.5) * 30))) }));
};

const build = (seed: number, color: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: series(seed) }],
  xField: 'x',
  yField: 'y',
  padding: 2,
  // visible: false removes each component; what is left is the line itself.
  axes: [
    { orient: 'bottom', visible: false },
    { orient: 'left', visible: false },
  ],
  legends: { visible: false },
  tooltip: { visible: false },
  crosshair: { xField: { visible: false } },
  point: { visible: false },
  line: { style: { stroke: color, lineWidth: 2 } },
  animationUpdate: { duration: 600 },
});

const COLORS = ['#38bdf8', '#f97316', '#4ade80'];

const mount: Mount = (el, ctx) => {
  const h = ctx.preview ? 54 : 90;
  const charts = COLORS.map((color, k) => {
    const label = document.createElement('div');
    label.style.cssText = 'font-size:12px;opacity:.7;margin:4px 0 0';
    label.textContent = ['visits', 'orders', 'uptime'][k] ?? '';
    el.append(label);
    return { color, seed: k + 1, chart: createChart(el, ctx, build(k + 1, color), { height: h, previewHeight: h }) };
  });
  const stop = every(1800, () => {
    for (const c of charts) {
      c.seed += 10;
      void c.chart.vchart.updateData('d', series(c.seed));
    }
  });
  return () => {
    stop();
    for (const c of charts) c.chart.release();
  };
};

export default mount;
