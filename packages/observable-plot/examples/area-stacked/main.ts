// Stacked areas by industry, switchable to a streamgraph with the offset option
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const offsets = ['none', 'wiggle', 'center', 'normalize'] as const;
type Offset = (typeof offsets)[number];

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountPlot(el, ctx, {
    initial: { offset: 'none' as Offset },
    render: ({ offset }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { transform: offset === 'normalize' ? undefined : (d: number) => d / 1000, label: offset === 'normalize' ? 'Share' : 'Unemployed (thousands)' },
        // fill is a channel, so it is used as z and the implicit stack applies.
        marks: [
          Plot.areaY(industries, { x: 'date', y: 'unemployed', fill: 'industry', offset: offset === 'none' ? null : offset }),
          offset === 'wiggle' || offset === 'center' ? null : Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ offset: offsets[i % offsets.length] }),
    previewMs: 2600,
    controls: (bar, live) => select(bar, 'offset', offsets, live.state.offset, (offset) => live.set({ offset })),
  });
};

export default mount;
