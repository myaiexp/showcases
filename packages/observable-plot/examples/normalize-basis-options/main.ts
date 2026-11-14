// Normalize transform basis: first, last, mean, extent, deviation, more
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const BASES = ['first', 'last', 'min', 'max', 'mean', 'median', 'p25', 'p75', 'sum', 'extent', 'deviation'] as const;
type Basis = (typeof BASES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot<{ basis: Basis }>(el, ctx, {
    initial: { basis: 'first' },
    render: ({ basis }, { width, height, preview }) =>
      // basis can also be mixed into the options object: normalizeY({basis, ...}).
      Plot.lineY(all, Plot.normalizeY({ basis, x: 'Date', y: 'Close', stroke: 'Symbol' })).plot({
        width,
        height,
        y: { grid: true, label: `Close / ${basis}`, type: basis === 'first' || basis === 'last' ? 'log' : 'linear' },
        color: { legend: !preview },
      }),
    step: ({ basis }) => ({ basis: BASES[(BASES.indexOf(basis) + 1) % BASES.length] ?? 'first' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'basis', BASES, live.state.basis, (basis) => live.set({ basis }));
    },
  });
};

export default mount;
