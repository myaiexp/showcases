// areaY with interval: day regularises the series; reduce picks first or sum
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const reducers = ['first', 'sum'] as const;
type Reduce = (typeof reducers)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-90);
  return mountPlot(el, ctx, {
    initial: { reduce: 'first' as Reduce },
    render: ({ reduce }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Volume' },
        // Weekends have no rows: first leaves a gap there, sum reads them as zero volume.
        marks: [Plot.areaY(aapl, { x: 'Date', y: 'Volume', interval: 'day', reduce, line: true })],
      }),
    step: ({ reduce }) => ({ reduce: reduce === 'first' ? ('sum' as const) : ('first' as const) }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'reduce', reducers, live.state.reduce, (reduce) => live.set({ reduce })),
  });
};

export default mount;
