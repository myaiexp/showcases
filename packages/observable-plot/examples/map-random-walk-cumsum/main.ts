// Map transform: mapY with cumsum turns seeded normal noise into a random walk
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot<{ seed: number }>(el, ctx, {
    initial: { seed: 1 },
    render: ({ seed }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.ruleY([0]), Plot.lineY({ length: 600 }, Plot.mapY('cumsum', { y: d3.randomNormal.source(d3.randomLcg(seed))() }))],
      }),
    step: ({ seed }) => ({ seed: seed + 1 }),
    previewMs: 2400,
    controls: (bar, live) => {
      button(bar, 'new walk', () => live.set({ seed: live.state.seed + 1 }));
    },
  });

export default mount;
