// Ordinal x as a point scale or a band scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const kinds = ['point', 'band'] as const;
type Kind = (typeof kinds)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { kind: 'point' as Kind },
    render: ({ kind }, { width, height }) =>
      kind === 'point'
        ? Plot.plot({ width, height, x: { type: 'point', domain: 'ABCDEFGHIJ', grid: true } })
        : Plot.cell('ABCDEFGHIJ', { x: Plot.identity, stroke: 'currentColor', strokeOpacity: 0.1 }).plot({
            width,
            height,
            x: { type: 'band', domain: 'ABCDEFGHIJ' },
          }),
    step: (_s, i) => ({ kind: kinds[i % 2] }),
    controls: (bar, live) => select(bar, 'x type ', kinds, live.state.kind, (kind) => live.set({ kind })),
  });

export default mount;
