// Vector shape and anchor: arrow, spike or a custom draw shape, start/middle/end
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// A custom shape is any object with draw(context, length, radius): here a lollipop.
const lollipop = {
  draw(context: CanvasPath, l: number, r: number) {
    context.moveTo(0, 0);
    context.lineTo(0, -l);
    context.moveTo(r, -l);
    context.arc(0, -l, r, 0, 2 * Math.PI);
  },
};

const SHAPES = ['arrow', 'spike', 'lollipop'] as const;
const ANCHORS = ['start', 'middle', 'end'] as const;

const mount: Mount = (el, ctx) => {
  // A 5 by 4 grid of anchor points; rotate sweeps with the column, length grows with the row.
  const points = Array.from({ length: 20 }, (_, i) => ({ x: i % 5, y: Math.floor(i / 5), rotate: (i % 5) * 45, length: 20 + Math.floor(i / 5) * 12 }));
  return mountPlot(el, ctx, {
    initial: { shape: 'arrow' as (typeof SHAPES)[number], anchor: 'middle' as (typeof ANCHORS)[number] },
    render: ({ shape, anchor }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 24,
        grid: true,
        x: { ticks: 5 },
        y: { ticks: 4 },
        marks: [
          Plot.dot(points, { x: 'x', y: 'y', r: 2, fill: 'currentColor', fillOpacity: 0.5 }),
          Plot.vector(points, { x: 'x', y: 'y', rotate: 'rotate', length: 'length', shape: shape === 'lollipop' ? lollipop : shape, anchor, stroke: 'orange', r: 4 }),
        ],
      }),
    step: (_s, i) => ({ shape: SHAPES[Math.floor(i / 3) % 3] ?? 'arrow', anchor: ANCHORS[i % 3] ?? 'middle' }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'shape', SHAPES, live.state.shape, (shape) => live.set({ shape }));
      select(bar, 'anchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor }));
    },
  });
};

export default mount;
