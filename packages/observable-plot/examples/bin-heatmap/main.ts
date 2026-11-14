// A two-dimensional heatmap: bin on weight and height, fill by count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['turbo', 'YlGnBu', 'viridis', 'inferno'] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { scheme: 'turbo' as (typeof SCHEMES)[number] },
    render: ({ scheme }, { width, height }) =>
      Plot.rect(olympians, Plot.bin<Plot.RectOptions>({ fill: 'count' }, { x: 'weight', y: 'height' })).plot({ width, height, color: { scheme } }),
    step: ({ scheme }) => ({ scheme: SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length] ?? 'turbo' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'color scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme }));
    },
  });
};

export default mount;
