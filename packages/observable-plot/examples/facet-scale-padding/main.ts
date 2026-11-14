// The fx and fy scales are band scales: padding sets the space between facets
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { fx: 0.1, fy: 0.1 },
    render: ({ fx, fy }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginRight: 60,
        fx: { padding: fx, label: null },
        fy: { padding: fy, label: null },
        marks: [
          Plot.frame(),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species', r: 1.5 }),
        ],
      }),
    step: (_s, i) => ({ fx: 0.1 + 0.25 * Math.abs(Math.sin(i * 0.7)), fy: 0.1 + 0.25 * Math.abs(Math.cos(i * 0.5)) }),
    previewMs: 700,
    controls: (bar, live) => {
      slider(bar, 'fx padding', [0, 0.6, 0.01], live.state.fx, (fx) => live.set({ fx }));
      slider(bar, 'fy padding', [0, 0.6, 0.01], live.state.fy, (fy) => live.set({ fy }));
    },
  });
};

export default mount;
