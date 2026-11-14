// differenceY on tall data: group by date, find each station's value
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('sf-sj-temperatures.csv');
  const temperature = all.filter((d) => d.date.getUTCFullYear() === 2020);
  return mountPlot<{ k: number }>(el, ctx, {
    initial: { k: 14 },
    render: ({ k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { tickFormat: '%b' },
        y: { grid: true },
        marks: [
          Plot.ruleY([32]),
          Plot.differenceY(
            temperature,
            Plot.windowY(
              k,
              Plot.groupX(
                { y1: Plot.find((d) => d.station === 'SJ'), y2: Plot.find((d) => d.station === 'SF') },
                { x: 'date', y: 'tmin', tip: true },
              ),
            ),
          ),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root) : undefined),
    controls: (bar, live) => {
      slider(bar, 'window (days)', [1, 60, 1], live.state.k, (k) => live.set({ k }));
    },
  });
};

export default mount;
