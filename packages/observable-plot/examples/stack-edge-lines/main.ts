// stackY1 and stackY2 lines along the edges of stacked layers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  const opts = { x: 'year', y: 'revenue', z: 'format' };
  return mountPlot<{ top: boolean }>(el, ctx, {
    initial: { top: true },
    render: ({ top }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
        marks: [
          Plot.areaY(riaa, { ...opts, fill: 'group', fillOpacity: 0.35 }),
          top
            ? Plot.lineY(riaa, Plot.stackY2({ ...opts, stroke: 'group' }))
            : Plot.lineY(riaa, Plot.stackY1({ ...opts, stroke: 'group' })),
        ],
      }),
    step: ({ top }) => ({ top: !top }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'line on top edge (stackY2); off: bottom edge (stackY1)', live.state.top, (top) => live.set({ top }));
    },
  });
};

export default mount;
