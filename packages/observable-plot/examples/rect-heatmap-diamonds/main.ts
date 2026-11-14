// Rect: a 2-D bin heatmap of diamonds, fill count on a symlog colour scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['YlGnBu', 'turbo', 'magma'] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('diamonds.csv');
  const diamonds = ctx.preview ? thin(all, 20) : all;
  return mountPlot<{ scheme: (typeof SCHEMES)[number] }>(el, ctx, {
    initial: { scheme: 'YlGnBu' },
    render: ({ scheme }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 640,
        marginLeft: 60,
        color: { scheme, type: 'symlog' },
        marks: [Plot.rect(diamonds, Plot.bin({ fill: 'count' }, { x: 'carat', y: 'price', thresholds: preview ? 50 : 100 }))],
      }),
    step: ({ scheme }, i) => ({ scheme: SCHEMES[i % SCHEMES.length] ?? scheme }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme }));
    },
  });
};

export default mount;
