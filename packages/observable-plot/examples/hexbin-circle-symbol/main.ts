// Hexbin symbol: the default hexagon, or Plot.circle for round bubbles
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ circle: boolean }>(el, ctx, {
    initial: { circle: true },
    render: ({ circle }, { width, height }) => {
      const bins = Plot.hexbin({ r: 'count' }, { x: 'weight', y: 'height' });
      return (circle ? Plot.circle(olympians, bins) : Plot.dot(olympians, bins)).plot({ width, height });
    },
    step: ({ circle }) => ({ circle: !circle }),
    controls: (bar, live) => {
      toggle(bar, 'Plot.circle (otherwise Plot.dot)', live.state.circle, (circle) => live.set({ circle }));
    },
  });
};

export default mount;
