// Irregular aeromagnetic samples as dots, or joined into flight paths with a line
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['dots', 'flight paths'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('ca55-south.csv');
  const ca55 = ctx.preview ? thin(all, 2) : all;
  return mountPlot<{ kind: Kind }>(el, ctx, {
    initial: { kind: kinds[0] },
    render: ({ kind }, { width, height }) =>
      (kind === kinds[0]
        ? Plot.dot(ca55, { x: 'LONGITUDE', y: 'LATITUDE', fill: 'MAG_IGRF90', r: 1.5 })
        : Plot.line(ca55, { x: 'LONGITUDE', y: 'LATITUDE', stroke: 'MAG_IGRF90', z: 'LINE_NUMB-SEG' })
      ).plot({ width, height, color: { type: 'diverging' } }),
    step: ({ kind }) => ({ kind: kind === kinds[0] ? kinds[1] : kinds[0] }),
    previewMs: 3500,
    controls: (bar, live) => {
      select(bar, 'mark', kinds, live.state.kind, (kind) => live.set({ kind }));
    },
  });
};

export default mount;
