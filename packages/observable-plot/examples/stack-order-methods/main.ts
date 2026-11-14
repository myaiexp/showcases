// Stacked areas of recording revenue, layered by the chosen stack order
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ORDERS = ['null', 'appearance', 'inside-out', 'sum', 'group', 'z'] as const;
type Order = (typeof ORDERS)[number];

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  return mountPlot<{ order: Order }>(el, ctx, {
    initial: { order: 'appearance' },
    render: ({ order }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
        color: { legend: !preview },
        marks: [
          Plot.areaY(riaa, {
            x: 'year',
            y: 'revenue',
            z: 'format',
            fill: 'group',
            order: order === 'null' ? null : order,
          }),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ order: ORDERS[i % ORDERS.length] ?? 'null' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'order', ORDERS, live.state.order, (order) => live.set({ order }));
    },
  });
};

export default mount;
