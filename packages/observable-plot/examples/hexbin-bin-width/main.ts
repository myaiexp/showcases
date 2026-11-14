// Hexbin binWidth: the pixel distance between hexagon centres, with r as count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const WIDTHS = [8, 14, 20, 30, 40] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ binWidth: number }>(el, ctx, {
    initial: { binWidth: 20 },
    render: ({ binWidth }, { width, height }) =>
      Plot.dot(olympians, Plot.hexbin({ r: 'count' }, { x: 'weight', y: 'height', binWidth })).plot({ width, height }),
    step: (_s, i) => ({ binWidth: WIDTHS[i % WIDTHS.length] ?? 20 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'binWidth', [2, 40, 0.5], live.state.binWidth, (binWidth) => live.set({ binWidth }));
    },
  });
};

export default mount;
