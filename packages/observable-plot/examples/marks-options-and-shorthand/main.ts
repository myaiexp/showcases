// Mark options: fill makes dots solid, and a bare array of numbers is shorthand
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const VARIANTS = ['dot with fill: "red"', 'lineY of an array of numbers'] as const;
type Variant = (typeof VARIANTS)[number];

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<{ variant: Variant }>(el, ctx, {
    initial: { variant: VARIANTS[0] },
    render: ({ variant }, { width, height }) =>
      variant === VARIANTS[0]
        ? Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', fill: 'red' }).plot({ width, height })
        : // Shorthand: x is the index and y is the value itself.
          Plot.lineY(gistemp.map((d) => d.Anomaly)).plot({ width, height }),
    step: ({ variant }) => ({ variant: after(VARIANTS, variant) }),
    controls: (bar, live) => {
      select(bar, 'mark', VARIANTS, VARIANTS[0], (variant) => live.set({ variant }));
    },
  });
};

export default mount;
