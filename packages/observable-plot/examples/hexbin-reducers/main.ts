// Hexbin reducers: fill each hexagon with a different summary of height
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const REDUCERS = ['count', 'mean', 'median', 'max', 'deviation', 'distinct'] as const;
type Reducer = (typeof REDUCERS)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ reducer: Reducer }>(el, ctx, {
    initial: { reducer: 'mean' },
    render: ({ reducer }, { width, height, preview }) =>
      // x and y bin the athletes; the fill input  is reduced per hexagon.
      Plot.dot(olympians, Plot.hexbin({ fill: reducer }, { x: 'date_of_birth', y: 'weight', fill: 'height' })).plot({
        width,
        height,
        color: { scheme: 'YlGnBu', legend: !preview, label: `${reducer} of height` },
      }),
    step: (_s, i) => ({ reducer: REDUCERS[i % REDUCERS.length] ?? 'count' }),
    controls: (bar, live) => {
      select(bar, 'fill reducer', REDUCERS, live.state.reducer, (reducer) => live.set({ reducer }));
    },
  });
};

export default mount;
