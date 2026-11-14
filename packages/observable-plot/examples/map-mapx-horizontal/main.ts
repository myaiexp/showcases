// Map transform on x: mapX with cumsum accumulates a horizontal random walk
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot<{ seed: number }>(el, ctx, {
    initial: { seed: 7 },
    render: ({ seed }, { width, height }) => {
      const normal = d3.randomNormal.source(d3.randomLcg(seed));
      // Three walks side by side; z splits them into series, each summed on its own.
      const rows = d3.range(300).flatMap((t) => [0, 1, 2].map((z) => ({ t, z, step: normal()() })));
      return Plot.plot({
        width,
        height,
        color: { type: 'categorical' },
        marks: [Plot.ruleX([0]), Plot.lineX(rows, Plot.mapX('cumsum', { x: 'step', y: 't', z: 'z', stroke: 'z' }))],
      });
    },
    step: ({ seed }) => ({ seed: seed + 1 }),
    previewMs: 2400,
    controls: (bar, live) => {
      button(bar, 'new walks', () => live.set({ seed: live.state.seed + 1 }));
    },
  });

export default mount;
