// Opacity options and mixBlendMode on three overlapping dots
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const BLENDS = ['normal', 'multiply', 'screen', 'difference', 'overlay'] as const;
type Blend = (typeof BLENDS)[number];

const circles = [
  { x: 0, y: 1, color: 'red' },
  { x: 1, y: 1, color: 'lime' },
  { x: 0.5, y: 0, color: 'blue' },
];

const mount: Mount = (el, ctx) =>
  mountPlot<{ blend: Blend; opacity: number }>(el, ctx, {
    initial: { blend: 'normal', opacity: 1 },
    render: ({ blend, opacity }, { width, height }) =>
      Plot.dot(circles, {
        x: 'x',
        y: 'y',
        r: 60,
        fill: 'color',
        stroke: 'currentColor',
        strokeOpacity: 0.6,
        opacity,
        mixBlendMode: blend,
      }).plot({ width, height, inset: 70, axis: null, x: { domain: [0, 1] }, y: { domain: [0, 1] } }),
    step: ({ blend }) => ({ blend: after(BLENDS, blend), opacity: blend === 'normal' ? 0.6 : 1 }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'mixBlendMode', BLENDS, 'normal', (blend) => live.set({ blend }));
      slider(bar, 'opacity: ', [0.1, 1, 0.05], 1, (opacity) => live.set({ opacity }));
    },
  });

export default mount;
