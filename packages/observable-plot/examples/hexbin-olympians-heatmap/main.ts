// Hexbin heatmap: dot fill is the athlete count in each hexagon
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['YlGnBu', 'turbo', 'magma'] as const;
type Scheme = (typeof SCHEMES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ scheme: Scheme }>(el, ctx, {
    initial: { scheme: 'YlGnBu' },
    render: ({ scheme }, { width, height }) =>
      Plot.dot(olympians, Plot.hexbin({ fill: 'count' }, { x: 'weight', y: 'height' })).plot({ width, height, color: { scheme } }),
    step: ({ scheme }) => ({ scheme: SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length] ?? 'YlGnBu' }),
    controls: (bar, live) => {
      select(bar, 'color scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme }));
    },
  });
};

export default mount;
