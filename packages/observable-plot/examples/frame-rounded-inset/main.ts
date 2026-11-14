// Frame standard options: rx rounded corners, inset and a translucent fill
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ rx: number; inset: number }>(el, ctx, {
    initial: { rx: 12, inset: 6 },
    render: ({ rx, inset }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 16,
        grid: true,
        marks: [
          Plot.frame({ rx, inset, fill: 'steelblue', fillOpacity: 0.15, stroke: 'steelblue' }),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
        ],
      }),
    step: (_s, i) => ({ rx: [0, 12, 30, 50][i % 4], inset: [0, 6, 14, 0][i % 4] }),
    controls: (bar, live) => {
      slider(bar, 'rx', [0, 60, 1], live.state.rx, (rx) => live.set({ rx }));
      slider(bar, 'inset', [-10, 30, 1], live.state.inset, (inset) => live.set({ inset }));
    },
  });
};

export default mount;
