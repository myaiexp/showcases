// The default dot symbols: filled, stroked, and a hexagon plus custom shapes
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const SETS = ['filled', 'stroked', 'hexagon and custom'] as const;
const FILLED = ['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye'];
const STROKED = ['circle', 'plus', 'times', 'triangle2', 'asterisk', 'square2', 'diamond2'];
// Any object with draw(context, size) is a symbol: this one is a bow tie.
const bowtie = {
  draw(context: { moveTo(x: number, y: number): void; lineTo(x: number, y: number): void; closePath(): void }, size: number) {
    const r = Math.sqrt(size) / 2;
    context.moveTo(-r, -r);
    context.lineTo(r, r);
    context.lineTo(r, -r);
    context.lineTo(-r, r);
    context.closePath();
  },
};
const MIXED = ['hexagon', d3.symbolStar, bowtie, d3.symbolTriangle];
const MIXED_NAMES = ['hexagon', 'd3.symbolStar', 'custom bow tie', 'd3.symbolTriangle'];

const mount: Mount = (el, ctx) =>
  mountPlot<{ set: (typeof SETS)[number] }>(el, ctx, {
    initial: { set: 'filled' },
    render: ({ set }, { width, height, preview }) => {
      const stroked = set === 'stroked';
      const data: unknown[] = set === 'filled' ? FILLED : stroked ? STROKED : MIXED;
      return Plot.dotX(data, {
        r: 12,
        ...(stroked ? { stroke: 'currentColor' } : { fill: 'currentColor' }),
        symbol: Plot.identity,
      }).plot({
        width,
        height,
        // Objects have no text of their own, so label them by position in the data.
        x: { axis: preview ? null : 'bottom', label: null, tickFormat: set === 'hexagon and custom' ? (_d: unknown, i: number) => MIXED_NAMES[i] ?? '' : undefined },
      });
    },
    step: ({ set }) => ({ set: SETS[(SETS.indexOf(set) + 1) % SETS.length] }),
    controls: (bar, live) => select(bar, 'symbols', SETS, live.state.set, (set) => live.set({ set })),
  });

export default mount;
