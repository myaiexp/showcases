// unknown sets the color of missing values; undefined drops them
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const random = d3.randomLcg(3);
const cells = d3.range(60).map((i) => ({ x: i % 10, y: Math.floor(i / 10), v: random() < 0.25 ? null : random() }));

const choices = ['undefined (dropped)', 'tomato', 'lightgray', 'black'] as const;
type Choice = (typeof choices)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { unknown: 'undefined (dropped)' as Choice },
    render: ({ unknown }, { width, height }) =>
      Plot.plot({
        width,
        height,
        padding: 0,
        axis: null,
        color: { scheme: 'viridis', ...(unknown === 'undefined (dropped)' ? {} : { unknown }) },
        marks: [Plot.cell(cells, { x: 'x', y: 'y', fill: 'v', inset: 1 })],
      }),
    step: (_s, i) => ({ unknown: choices[i % 4] }),
    controls: (bar, live) => select(bar, 'color unknown ', choices, live.state.unknown, (unknown) => live.set({ unknown })),
  });

export default mount;
