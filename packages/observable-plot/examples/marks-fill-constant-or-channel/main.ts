// Fill as a constant or a channel: color, field, function, literals
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after, timeseries } from '../../shared/marks-data.ts';

const VARIANTS = [
  'fill: "purple" (a CSS color)',
  'fill: "year" (a field name)',
  'fill: (d) => d.year (a function)',
  'literal colors from a function',
  'odd / even with a legend',
] as const;
type Variant = (typeof VARIANTS)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ variant: Variant }>(el, ctx, {
    initial: { variant: VARIANTS[0] },
    render: ({ variant }, { width, height, preview }) => {
      const fills: Record<Variant, Plot.BarXOptions['fill']> = {
        [VARIANTS[0]]: 'purple',
        [VARIANTS[1]]: 'year',
        [VARIANTS[2]]: (d) => d.year,
        // Literal color strings bypass the color scale entirely.
        [VARIANTS[3]]: (d) => (d.year & 1 ? 'red' : 'currentColor'),
        [VARIANTS[4]]: (d) => (d.year & 1 ? 'odd' : 'even'),
      };
      return Plot.barX(timeseries, { x: 'population', y: 'year', fill: fills[variant] }).plot({
        width,
        height,
        y: { label: null, tickFormat: '' },
        color: { legend: !preview && variant === VARIANTS[4] },
      });
    },
    step: ({ variant }) => ({ variant: after(VARIANTS, variant) }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'fill', VARIANTS, VARIANTS[0], (variant) => live.set({ variant }));
    },
  });

export default mount;
