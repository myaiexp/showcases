// Stack offset: a zero baseline, centered stacks, or a wiggle streamgraph
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const OFFSETS = ['null', 'center', 'wiggle'] as const;
type Offset = (typeof OFFSETS)[number];

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  return mountPlot<{ offset: Offset }>(el, ctx, {
    initial: { offset: 'wiggle' },
    render: ({ offset }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
        marks: [
          Plot.areaY(riaa, {
            x: 'year',
            y: 'revenue',
            z: 'format',
            fill: 'group',
            offset: offset === 'null' ? null : offset,
          }),
        ],
      }),
    step: (_s, i) => ({ offset: OFFSETS[i % OFFSETS.length] ?? 'null' }),
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'offset', OFFSETS, live.state.offset, (offset) => live.set({ offset }));
    },
  });
};

export default mount;
