// Random walk drawn with lineY (index on x) or lineX (index on y)
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['lineY', 'lineX'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = (el, ctx) => {
  // A seeded generator keeps the walk the same on every load.
  const walk = d3.cumsum(Array.from({ length: 600 }, d3.randomNormal.source(d3.randomLcg(42))()));
  return mountPlot<{ kind: Kind }>(el, ctx, {
    initial: { kind: kinds[0] },
    // lineY defaults x to the index, lineX defaults y to the index: the walk turns 90 degrees.
    render: ({ kind }, { width, height }) =>
      (kind === 'lineY' ? Plot.lineY(walk) : Plot.lineX(walk)).plot({ width, height, grid: true }),
    step: ({ kind }) => ({ kind: kind === 'lineY' ? kinds[1] : kinds[0] }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'constructor', kinds, live.state.kind, (kind) => live.set({ kind }));
    },
  });
};

export default mount;
