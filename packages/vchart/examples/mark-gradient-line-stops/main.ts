// A line gradient with a hard colour split: two stops share one offset
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(10);
const make = (): { x: number; score: number }[] => {
  const phase = rand() * 6;
  return Array.from({ length: 24 }, (_, x) => ({ x, score: Math.round(60 + 32 * Math.sin(x / 3.2 + phase) + (rand() - 0.5) * 12) }));
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let split = 60;
  let rows = make();
  const specFor = (): ISpec => {
    const scores = rows.map((r) => r.score);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    // The gradient runs over the line's own box from y1=0 (the top, data max) to y1=1 (the bottom, data min).
    const percent = Math.min(1, Math.max(0, (max - split) / (max - min)));
    return {
      type: 'line',
      data: [{ id: 'line', values: rows }],
      xField: 'x',
      yField: 'score',
      line: {
        style: {
          lineWidth: 4,
          curveType: 'monotone',
          stroke: {
            gradient: 'linear', x0: 0.5, y0: 0, x1: 0.5, y1: 1,
            stops: [
              { offset: 0, color: '#2f9e44' },
              { offset: percent, color: '#2f9e44' },
              { offset: percent, color: '#e03131' },
              { offset: 1, color: '#e03131' },
            ],
          },
        },
      },
      point: { visible: false },
      markLine: [{ y: split, line: { style: { lineDash: [4, 4], stroke: '#adb5bd' } }, endSymbol: { visible: false } }],
    } as unknown as ISpec;
  };
  const chart = createChart(el, ctx, specFor());
  let alive = true;
  const apply = (): void => {
    if (alive) void chart.vchart.updateSpec(specFor());
  };
  const stop = every(ctx.preview ? 2000 : 6000, () => {
    rows = make();
    apply();
  });
  if (bar) {
    slider(bar, 'split value', [30, 90, 1], split, (v) => {
      split = v;
      apply();
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
