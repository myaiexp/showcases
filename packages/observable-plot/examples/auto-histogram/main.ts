// One dimension makes a histogram: binned if quantitative, grouped if ordinal
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['x: weight (olympians)', 'x: island (penguins)', 'y: island (penguins)'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = async (el, ctx) => {
  const [athletes, penguins] = await Promise.all([csv('athletes.csv'), csv('penguins.csv')]);
  const olympians = ctx.preview ? thin(athletes, 6) : athletes;
  return mountPlot(el, ctx, {
    initial: { kind: kinds[0] as Kind },
    render: ({ kind }, { width, height }) =>
      kind === kinds[0]
        ? Plot.auto(olympians, { x: 'weight' }).plot({ width, height })
        : kind === kinds[1]
          ? Plot.auto(penguins, { x: 'island' }).plot({ width, height })
          : // Naming y instead of x flips the histogram to horizontal bars.
            Plot.auto(penguins, { y: 'island' }).plot({ width, height }),
    step: (_s, i) => ({ kind: kinds[i % kinds.length] }),
    previewMs: 2400,
    controls: (bar, live) => select(bar, 'dimension', kinds, live.state.kind, (kind) => live.set({ kind })),
  });
};

export default mount;
