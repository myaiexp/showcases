// Boxplots of speed-of-light runs, vertical (boxY) or horizontal (boxX)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const morley = await csv('morley.csv');
  return mountPlot<{ horizontal: boolean }>(el, ctx, {
    initial: { horizontal: false },
    render: ({ horizontal }, { width, height }) =>
      horizontal
        ? Plot.plot({ width, height, x: { grid: true, inset: 6 }, marks: [Plot.boxX(morley, { x: 'Speed', y: 'Expt' })] })
        : Plot.plot({ width, height, y: { grid: true, inset: 6 }, marks: [Plot.boxY(morley, { x: 'Expt', y: 'Speed' })] }),
    step: ({ horizontal }) => ({ horizontal: !horizontal }),
    controls: (bar, live) => {
      toggle(bar, 'horizontal (boxX)', live.state.horizontal, (horizontal) => live.set({ horizontal }));
    },
  });
};

export default mount;
