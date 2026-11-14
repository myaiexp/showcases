// Tip: a title channel with newlines, wrapped at lineWidth ems
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  // Cards plot a quarter of the athletes, but keep every one that has a story to tell.
  const olympians = ctx.preview ? all.filter((d, i) => d.info || i % 4 === 0) : all;
  return mountPlot<{ lineWidth: number }>(el, ctx, {
    initial: { lineWidth: 20 },
    render: ({ lineWidth }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marks: [
          Plot.dot(olympians, {
            x: 'weight',
            y: 'height',
            fy: 'sex',
            sort: (d: Row) => !!d.info,
            stroke: (d: Row) => (d.info ? 'currentColor' : '#aaa'),
          }),
          Plot.tip(
            olympians,
            Plot.pointer({
              x: 'weight',
              y: 'height',
              fy: 'sex',
              filter: (d) => d.info,
              title: (d) => [d.name, d.info].join('\n\n'),
              lineWidth,
              fontSize: preview ? 7 : undefined,
            }),
          ),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.3 + 0.4 * t], 5000) : undefined),
    controls: (bar, live) => {
      slider(bar, 'lineWidth (ems)', [8, 40, 1], live.state.lineWidth, (lineWidth) => live.set({ lineWidth }));
    },
  });
};

export default mount;
