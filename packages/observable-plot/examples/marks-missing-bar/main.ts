// The missing bar: barY hides a gap that rectY or an interval shows
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after, timeseries } from '../../shared/marks-data.ts';

const VARIANTS = ['barY (ordinal x)', 'rectY with interval: 1', 'barY with x interval: 1'] as const;
type Variant = (typeof VARIANTS)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ variant: Variant }>(el, ctx, {
    initial: { variant: VARIANTS[0] },
    render: ({ variant }, { width, height }) => {
      const opts = { width, height };
      if (variant === VARIANTS[0]) {
        return Plot.barY(timeseries, { x: 'year', y: 'population' }).plot({ ...opts, x: { tickFormat: '' } });
      }
      if (variant === VARIANTS[1]) {
        return Plot.rectY(timeseries, { x: 'year', y: 'population', interval: 1 }).plot({ ...opts, x: { tickFormat: '' } });
      }
      return Plot.barY(timeseries, { x: 'year', y: 'population' }).plot({ ...opts, x: { tickFormat: '', interval: 1 } });
    },
    step: ({ variant }) => ({ variant: after(VARIANTS, variant) }),
    controls: (bar, live) => {
      select(bar, 'mark', VARIANTS, VARIANTS[0], (variant) => live.set({ variant }));
    },
  });

export default mount;
