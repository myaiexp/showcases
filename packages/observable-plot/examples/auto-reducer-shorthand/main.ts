// Reducer shorthand: y count, a value with a sum reducer, and a constant color
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['y: "count"', 'y: {value, reduce: "sum"}', 'color: "red"'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { kind: kinds[0] as Kind },
    render: ({ kind }, { width, height }) =>
      kind === kinds[0]
        ? Plot.auto(penguins, { x: 'body_mass_g', y: 'count' }).plot({ width, height })
        : kind === kinds[1]
          ? // Total body mass in each bin, instead of a count of birds.
            Plot.auto(penguins, { x: 'body_mass_g', y: { value: 'body_mass_g', reduce: 'sum' } }).plot({ width, height })
          : // A string that is a valid CSS color is a constant, not a field name.
            Plot.auto(penguins, { x: 'body_mass_g', color: 'red' }).plot({ width, height }),
    step: (_s, i) => ({ kind: kinds[i % kinds.length] }),
    previewMs: 2400,
    controls: (bar, live) => select(bar, 'options', kinds, live.state.kind, (kind) => live.set({ kind })),
  });
};

export default mount;
