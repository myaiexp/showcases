// Rect: rectY over d3.bin output, mapping x0/x1 to x1/x2 and length to y
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const COUNTS = [5, 10, 20, 40] as const;

const mount: Mount = (el, ctx) => {
  const values = d3.range(1000).map(d3.randomNormal.source(d3.randomLcg(42))());
  return mountPlot<{ count: number }>(el, ctx, {
    initial: { count: 20 },
    render: ({ count }, { width, height }) => {
      // d3.bin names a bin's bounds x0 and x1; the rect mark wants x1 and x2.
      const bins = d3.bin().thresholds(count)(values);
      return Plot.rectY(bins, { x1: 'x0', x2: 'x1', y: 'length' }).plot({ width, height, round: true });
    },
    step: ({ count }, i) => ({ count: COUNTS[i % COUNTS.length] ?? count }),
    controls: (bar, live) => {
      slider(bar, 'bin thresholds', [3, 60, 1], live.state.count, (count) => live.set({ count }));
    },
  });
};

export default mount;
