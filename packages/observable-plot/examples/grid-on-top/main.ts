// An explicit gridX drawn above the bars, with interval: 1 for whole percents
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ atop: boolean }>(el, ctx, {
    initial: { atop: true },
    render: ({ atop }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { axis: 'top', percent: true, grid: !atop },
        marks: [
          Plot.barX(alphabet, { x: 'frequency', y: 'letter', sort: { y: 'width' } }),
          atop ? Plot.gridX({ interval: 1, stroke: 'var(--plot-background)', strokeOpacity: 0.5 }) : null,
          Plot.ruleX([0]),
        ],
      }),
    step: ({ atop }) => ({ atop: !atop }),
    controls: (bar, live) => toggle(bar, 'show grid on top', live.state.atop, (atop) => live.set({ atop })),
  });
};

export default mount;
