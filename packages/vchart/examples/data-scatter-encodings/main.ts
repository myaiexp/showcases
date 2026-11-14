// One datum per mark: shape, size and colour encode fields, a custom state marks big scores
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { classScores, seeded } from '../../shared/concepts-data.ts';

const rand = seeded(14);
const DAYS = ['Monday', 'Tuesday', 'Wednesday'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const specFor = (limit: number): ISpec =>
    ({
      type: 'scatter',
      data: [{ id: 'scatterData', values: classScores(rand, DAYS) }],
      shape: { type: 'ordinal', domain: ['class No.1', 'class No.2'], range: ['circle', 'rect'] },
      shapeField: 'class',
      size: { type: 'linear', domain: [10, 40], range: [10, 50] },
      sizeField: 'score',
      seriesField: 'date',
      point: { state: { superScore: { filter: (datum: { score: number }) => datum.score >= limit, style: { fill: 'red' } } } },
      xField: 'date',
      yField: 'score',
      legends: { visible: !ctx.preview, orient: 'top' },
    }) as unknown as ISpec;
  let limit = 30;
  const chart = createChart(el, ctx, specFor(limit));
  let alive = true;
  const stop = every(ctx.preview ? 1800 : 3500, () => {
    if (alive) void chart.vchart.updateData('scatterData', classScores(rand, DAYS));
  });
  if (bar) {
    slider(bar, 'superScore at', [15, 38, 1], limit, (v) => {
      limit = v;
      if (alive) void chart.vchart.updateSpec(specFor(v));
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
