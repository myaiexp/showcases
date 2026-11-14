// Plot.auto picks a mark: two numbers make dots, a time series a line
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['penguins: two quantities', 'aapl: date and number'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = async (el, ctx) => {
  const [penguins, aapl] = await Promise.all([csv('penguins.csv'), csv('aapl.csv')]);
  return mountPlot(el, ctx, {
    initial: { kind: kinds[0] as Kind },
    render: ({ kind }, { width, height }) =>
      kind === kinds[0]
        ? Plot.auto(penguins, { x: 'body_mass_g', y: 'flipper_length_mm' }).plot({ width, height })
        : // A monotonically increasing Date column with a numeric y reads as a line chart.
          Plot.auto(aapl, { x: 'Date', y: 'Close' }).plot({ width, height }),
    step: ({ kind }) => ({ kind: kind === kinds[0] ? kinds[1] : kinds[0] }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'data', kinds, live.state.kind, (kind) => live.set({ kind })),
  });
};

export default mount;
