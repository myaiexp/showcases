// Dot with the bin transform: sized dots as a heatmap of carats and price
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const THRESHOLDS = ['100', '50', '25'] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('diamonds.csv');
  const diamonds = ctx.preview ? thin(all, 4) : all;
  return mountPlot<{ thresholds: (typeof THRESHOLDS)[number] }>(el, ctx, {
    initial: { thresholds: '100' },
    render: ({ thresholds }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 640,
        marginLeft: 60,
        grid: true,
        x: { label: 'Carats' },
        y: { label: 'Price ($)' },
        r: { range: [0, preview ? 8 : 20] },
        marks: [Plot.dot(diamonds, Plot.bin<Plot.DotOptions>({ r: 'count' }, { x: 'carat', y: 'price', thresholds: Number(thresholds) }))],
      }),
    step: ({ thresholds }) => ({ thresholds: THRESHOLDS[(THRESHOLDS.indexOf(thresholds) + 1) % THRESHOLDS.length] }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'thresholds', THRESHOLDS, live.state.thresholds, (thresholds) => live.set({ thresholds })),
  });
};

export default mount;
