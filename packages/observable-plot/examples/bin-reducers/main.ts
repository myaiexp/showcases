// Binned reducers: reduce penguin body mass per culmen length bin
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const REDUCERS = ['count', 'sum', 'mean', 'median', 'p90', 'min', 'max', 'deviation'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { reducer: 'mean' as (typeof REDUCERS)[number] },
    render: ({ reducer }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: `body_mass_g (${reducer})` },
        marks: [
          Plot.rectY(penguins, Plot.binX<Plot.RectYOptions>({ y: reducer }, { x: 'culmen_length_mm', y: 'body_mass_g', thresholds: 20, fill: 'steelblue' })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ reducer }) => ({ reducer: REDUCERS[(REDUCERS.indexOf(reducer) + 1) % REDUCERS.length] ?? 'mean' }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'reducer', REDUCERS, live.state.reducer, (reducer) => live.set({ reducer }));
    },
  });
};

export default mount;
