// Grid stroke as a channel: each line takes its colour from its tick value
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['turbo', 'viridis', 'rainbow', 'warm', 'cool'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ scheme: (typeof SCHEMES)[number] }>(el, ctx, {
    initial: { scheme: 'turbo' },
    render: ({ scheme }, { width, height }) =>
      Plot.gridX(d3.range(101), { stroke: Plot.identity, strokeOpacity: 1 }).plot({ width, height, color: { scheme } }),
    step: ({ scheme }) => ({ scheme: SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length] }),
    controls: (bar, live) => select(bar, 'scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme })),
  });

export default mount;
