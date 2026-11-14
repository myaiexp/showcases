// differenceY comparing two columns of the same table
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const tsa = await csv('tsa.csv');
  return mountPlot(el, ctx, {
    initial: {},
    after: (root, _live, size) => (size.preview ? sweepPointer(root) : undefined),
    render: (_s, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        x: { tickFormat: '%b' },
        y: { grid: true, label: 'Travelers' },
        marks: [
          Plot.axisY({ label: preview ? 'Travelers (thousands)' : 'Travelers per day (thousands, 2020 vs. 2019)', tickFormat: (d: number) => d / 1000 }),
          Plot.ruleY([0]),
          Plot.differenceY(tsa, { x: 'Date', y1: '2019', y2: '2020', tip: { format: { x: '%B %-d' } } }),
        ],
      }),
  });
};

export default mount;
