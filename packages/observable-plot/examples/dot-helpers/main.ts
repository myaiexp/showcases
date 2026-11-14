// The dot family: dot, dotX, dotY, circle and hexagon over the same cars
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const KINDS = ['dot', 'circle', 'hexagon', 'dotX', 'dotY'] as const;

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  const mpg = cars.map((d) => d['economy (mpg)'] as number);
  return mountPlot<{ kind: (typeof KINDS)[number] }>(el, ctx, {
    initial: { kind: 'dot' },
    render: ({ kind }, { width, height }) => {
      const xy = { x: 'economy (mpg)', y: 'power (hp)', r: 5, stroke: 'currentColor', fill: 'none' };
      const mark =
        kind === 'dotX'
          ? Plot.dotX(mpg, { fillOpacity: 0.3 })
          : kind === 'dotY'
            ? Plot.dotY(mpg, { fillOpacity: 0.3 })
            : Plot[kind](cars, xy);
      return Plot.plot({ width, height, grid: true, inset: 10, marks: [mark] });
    },
    step: ({ kind }) => ({ kind: KINDS[(KINDS.indexOf(kind) + 1) % KINDS.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'mark', KINDS, live.state.kind, (kind) => live.set({ kind })),
  });
};

export default mount;
