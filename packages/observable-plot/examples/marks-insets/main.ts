// Insets: inset, insetTop, insetRight, insetBottom, insetLeft on cells
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const SIDES = ['inset', 'insetTop', 'insetRight', 'insetBottom', 'insetLeft'] as const;
type Side = (typeof SIDES)[number];

const mount: Mount = (el, ctx) => {
  // A 6 by 4 grid of cells coloured by their position.
  const cells = Array.from({ length: 24 }, (_, i) => ({ col: i % 6, row: Math.floor(i / 6), v: i }));
  return mountPlot<{ side: Side; value: number }>(el, ctx, {
    initial: { side: 'inset', value: 4 },
    render: ({ side, value }, { width, height }) =>
      Plot.cell(cells, { x: 'col', y: 'row', fill: 'v', [side]: value }).plot({
        width,
        height,
        axis: null,
        // Padding 0 so the gaps come from the inset alone, not from the band scales.
        x: { padding: 0 },
        y: { padding: 0 },
        color: { scheme: 'viridis' },
      }),
    step: (_s, i) => ({ side: SIDES[i % SIDES.length], value: 10 }),
    previewMs: 1400,
    controls: (bar, live) => {
      select(bar, 'option', SIDES, 'inset', (side) => live.set({ side }));
      slider(bar, 'pixels: ', [-10, 20, 1], 4, (value) => live.set({ value }));
    },
  });
};

export default mount;
