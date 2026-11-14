// markArea y / y1 as callbacks over the series data: a mean +/- one standard deviation band
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

type Datum = Record<string, number>;
const rows = (seed: number, spread: number): { x: number; y: number }[] => {
  const r = rng(seed);
  return Array.from({ length: 24 }, (_, i) => ({ x: i + 1, y: Math.round(50 + (r() - 0.5) * spread * 2) }));
};
const stats = (data: Datum[]): { mean: number; sd: number } => {
  const ys = data.map((d) => d.y as number);
  const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
  return { mean, sd: Math.sqrt(ys.reduce((a, b) => a + (b - mean) ** 2, 0) / ys.length) };
};

const mount: Mount = (el, ctx) => {
  let seed = 1;
  let spread = 20;
  const { vchart, release } = createChart(el, ctx, {
    type: 'line',
    data: [{ id: 'd', values: rows(seed, spread) }],
    xField: 'x',
    yField: 'y',
    point: { visible: true },
    axes: [{ orient: 'left', type: 'linear', min: 0, max: 100 }, { orient: 'bottom', type: 'linear' }],
    markArea: [
      {
        // seriesData is the associated series' datums (mark-area.md, marker-aggregation.md).
        y: (data: Datum[]) => stats(data).mean - stats(data).sd,
        y1: (data: Datum[]) => stats(data).mean + stats(data).sd,
        area: { style: { fill: '#38bdf8', fillOpacity: 0.2 } },
        label: { text: 'mean ± 1 sd', position: 'insideTopLeft', style: { fill: '#38bdf8' } },
      },
    ],
    markLine: [{ y: 'average', line: { style: { stroke: '#fbbf24', lineDash: [5, 4] } }, endSymbol: { visible: false }, label: { visible: false } }],
  } as never);
  let alive = true;
  const next = (): void => {
    seed += 1;
    spread = [10, 20, 35][seed % 3] as number;
    if (alive) void vchart.updateData('d', rows(seed, spread));
  };
  let stop = (): void => {};
  if (ctx.preview) stop = every(1600, next);
  else {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, 'new data', next);
  }
  return () => {
    stop();
    alive = false;
    release();
  };
};

export default mount;
