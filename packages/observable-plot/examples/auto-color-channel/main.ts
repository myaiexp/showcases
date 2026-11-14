// One color channel: stroke for a line, fill for an area
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const marks = ['auto', 'area'] as const;
type MarkName = (typeof marks)[number];

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountPlot(el, ctx, {
    initial: { mark: 'auto' as MarkName },
    render: ({ mark }, { width, height }) =>
      Plot.auto(industries, { x: 'date', y: 'unemployed', color: 'industry', mark: mark === 'area' ? 'area' : undefined }).plot({ width, height }),
    step: ({ mark }) => ({ mark: mark === 'auto' ? marks[1] : marks[0] }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'mark', marks, live.state.mark, (mark) => live.set({ mark })),
  });
};

export default mount;
