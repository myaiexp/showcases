// mark.plot: a mark's own plot method, with extra marks drawn on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ extra: boolean }>(el, ctx, {
    initial: { extra: true },
    render: ({ extra }, { width, height }) =>
      // Extra marks in options.marks come after the mark itself, so they draw on top.
      Plot.barY(alphabet, { x: 'letter', y: 'frequency' }).plot({
        width,
        height,
        marks: extra ? [Plot.ruleY([0]), Plot.ruleY([0.05], { stroke: 'red', strokeDasharray: '4 3' })] : [],
      }),
    step: ({ extra }) => ({ extra: !extra }),
    controls: (bar, live) => {
      toggle(bar, 'extra marks', true, (extra) => live.set({ extra }));
    },
  });
};

export default mount;
