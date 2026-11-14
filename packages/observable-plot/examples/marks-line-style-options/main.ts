// Style options: linejoin, linecap, miterlimit and dasharray
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const JOINS = ['miter', 'miter-clip', 'round', 'bevel'] as const;
const CAPS = ['butt', 'round', 'square'] as const;
const DASHES = ['none', '8 6', '2 6', '16 4 2 4'] as const;

interface State {
  join: (typeof JOINS)[number];
  cap: (typeof CAPS)[number];
  dash: (typeof DASHES)[number];
  miter: number;
}

// A zigzag with sharp corners, so joins and miter limits are visible.
const zigzag = [
  { x: 0, y: 0 },
  { x: 1, y: 3 },
  { x: 2, y: 0 },
  { x: 3, y: 3 },
  { x: 4, y: 0 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { join: 'miter', cap: 'butt', dash: 'none', miter: 4 },
    render: ({ join, cap, dash, miter }, { width, height }) =>
      Plot.lineY(zigzag, {
        x: 'x',
        y: 'y',
        strokeWidth: 14,
        stroke: 'orange',
        strokeLinejoin: join,
        strokeLinecap: cap,
        strokeMiterlimit: miter,
        strokeDasharray: dash === 'none' ? undefined : dash,
      }).plot({ width, height, inset: 20, axis: null }),
    step: (_s, i) => ({ join: JOINS[i % 4], cap: CAPS[i % 3], dash: DASHES[Math.floor(i / 2) % 4], miter: i % 2 ? 1 : 10 }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'strokeLinejoin', JOINS, 'miter', (join) => live.set({ join }));
      select(bar, 'strokeLinecap', CAPS, 'butt', (cap) => live.set({ cap }));
      select(bar, 'strokeDasharray', DASHES, 'none', (dash) => live.set({ dash }));
      slider(bar, 'strokeMiterlimit: ', [1, 10, 0.5], 4, (miter) => live.set({ miter }));
    },
  });

export default mount;
