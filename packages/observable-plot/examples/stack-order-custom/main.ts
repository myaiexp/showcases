// Stack order as an array of z values, a data field or a function of data
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const KINDS = ['array of z values', 'field name', 'function'] as const;
type Kind = (typeof KINDS)[number];

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  // Formats from the largest total revenue to the smallest, via d3.groupSort.
  const byTotal = d3.groupSort(riaa, (g) => -(d3.sum(g, (d: Row) => d.revenue) ?? 0), (d: Row) => d.format as string);
  const orderFor = (kind: Kind) =>
    kind === 'array of z values' ? byTotal : kind === 'field name' ? 'format' : (d: Row) => -d.revenue;
  return mountPlot<{ kind: Kind }>(el, ctx, {
    initial: { kind: 'array of z values' },
    render: ({ kind }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
        color: { legend: !preview },
        marks: [
          Plot.areaY(riaa, Plot.stackY({ order: orderFor(kind) }, { x: 'year', y: 'revenue', z: 'format', fill: 'group' })),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ kind: KINDS[i % KINDS.length] ?? KINDS[0] }),
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'order is', KINDS, live.state.kind, (kind) => live.set({ kind }));
    },
  });
};

export default mount;
