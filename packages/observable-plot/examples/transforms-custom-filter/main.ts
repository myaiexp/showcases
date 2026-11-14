// A custom transform function that filters facet indexes, written by hand
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const STATES = ['MI', 'CA', 'TX', 'NY', 'FL'] as const;

const mount: Mount = async (el, ctx) => {
  const bls = await csv('bls-metro-unemployment.csv');
  return mountPlot<{ state: (typeof STATES)[number] }>(el, ctx, {
    initial: { state: 'MI' },
    render: ({ state }, { width, height }) => {
      const pattern = new RegExp(`, ${state} `);
      return Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Unemployment (%)' },
        color: { domain: [false, true], range: ['#ccc', 'red'] },
        marks: [
          Plot.ruleY([0]),
          Plot.line(bls, {
            x: 'date',
            y: 'unemployment',
            z: 'division',
            // transform(data, facets) returns the data and the indexes to keep.
            transform: (data, facets) => ({
              data,
              facets: facets.map((facet) => facet.filter((i) => pattern.test(data[i].division))),
            }),
          }),
        ],
      });
    },
    step: ({ state }) => ({ state: STATES[(STATES.indexOf(state) + 1) % STATES.length] }),
    previewMs: 2000,
    controls: (bar, live) => {
      select(bar, 'state', STATES, live.state.state, (state) => live.set({ state }));
    },
  });
};

export default mount;
