// More window reducers: percentile, deviation, difference, function
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const NAMES = ['mean', 'p10', 'p90', 'sum', 'deviation', 'variance', 'difference', 'ratio', 'first', 'last', 'function'] as const;
type Name = (typeof NAMES)[number];

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot<{ reduce: Name }>(el, ctx, {
    initial: { reduce: 'p90' },
    render: ({ reduce }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: `high, ${reduce} over 28 days` },
        marks: [
          Plot.ruleY([0]),
          // A function reducer gets the window's values (here: the range, max minus min).
          Plot.lineY(
            sftemp,
            Plot.windowY(
              { k: 28, reduce: reduce === 'function' ? (v: number[]) => (d3.max(v) ?? 0) - (d3.min(v) ?? 0) : reduce },
              { x: 'date', y: 'high' },
            ),
          ),
        ],
      }),
    step: (_s, i) => ({ reduce: NAMES[i % NAMES.length] ?? 'mean' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'reduce', NAMES, live.state.reduce, (reduce) => live.set({ reduce }));
    },
  });
};

export default mount;
