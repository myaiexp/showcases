// Named reducers on penguin body mass: count, sum, mean, median, more
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const REDUCERS = ['count', 'sum', 'mean', 'median', 'min', 'max', 'p25', 'p90', 'deviation', 'variance', 'mode', 'first', 'last', 'proportion', 'proportion-facet'] as const;
type Reducer = (typeof REDUCERS)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ reducer: Reducer }>(el, ctx, {
    initial: { reducer: 'mean' },
    render: ({ reducer }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 70,
        x: { grid: true, label: `body_mass_g: ${reducer}` },
        y: { label: null },
        marks: [
          // The same input channels each time; only the reducer string in outputs changes.
          Plot.barX(penguins, Plot.groupY({ x: reducer }, { y: 'species', x: 'body_mass_g', fill: 'species' })),
          Plot.ruleX([0]),
        ],
      }),
    step: ({ reducer }, i) => ({ reducer: (['mean', 'sum', 'median', 'max', 'deviation', 'count'] as const)[i % 6] ?? reducer }),
    previewMs: 2000,
    controls: (bar, live) => select(bar, 'reducer', REDUCERS, live.state.reducer, (reducer) => live.set({ reducer })),
  });
};

export default mount;
