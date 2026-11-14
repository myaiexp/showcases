// Rule: 500 random normal ruleX marks; low strokeOpacity shows density
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) => {
  const random = d3.randomNormal.source(d3.randomLcg(11))();
  const xs = d3.range(500).map(() => random());
  return mountPlot<{ opacity: number }>(el, ctx, {
    initial: { opacity: 0.2 },
    render: ({ opacity }, { width, height }) =>
      // {length: 500} is array-like data; the x accessor receives (undefined, index).
      Plot.plot({ width, height, x: { domain: [-4, 4] }, marks: [Plot.ruleX({ length: 500 }, { x: (_d, i) => xs[i], strokeOpacity: opacity })] }),
    step: (_s, i) => ({ opacity: [0.05, 0.2, 0.6, 1][i % 4] ?? 0.2 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'strokeOpacity', [0.02, 1, 0.01], live.state.opacity, (opacity) => live.set({ opacity }));
    },
  });
};

export default mount;
