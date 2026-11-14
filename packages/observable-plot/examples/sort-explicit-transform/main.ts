// Plot.sort with a field, a channel object, a comparator or an accessor
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ORDERS = ['field name', 'channel, descending', 'comparator', 'accessor'] as const;
type Order = (typeof ORDERS)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ order: Order }>(el, ctx, {
    initial: { order: 'field name' },
    render: ({ order }, { width, height, preview }) => {
      const o = { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'body_mass_g', r: preview ? 9 : 14, stroke: 'var(--plot-background)' };
      // Dots overlap, so the sort order decides which one is drawn on top.
      const opts =
        order === 'field name'
          ? Plot.sort('body_mass_g', o)
          : order === 'channel, descending'
            ? Plot.sort({ channel: 'fill', order: 'descending' }, o)
            : order === 'comparator'
              ? Plot.sort((a: Row, b: Row) => (b.body_mass_g ?? 0) - (a.body_mass_g ?? 0), o)
              : Plot.sort((d: Row) => -(d.body_mass_g ?? 0), o);
      return Plot.plot({
        width,
        height,
        grid: true,
        color: { scheme: 'viridis', legend: !preview, label: 'body_mass_g' },
        marks: [Plot.dot(penguins, opts)],
      });
    },
    step: ({ order }) => ({ order: ORDERS[(ORDERS.indexOf(order) + 1) % ORDERS.length] ?? 'field name' }),
    controls: (bar, live) => {
      select(bar, 'order given as', ORDERS, live.state.order, (order) => live.set({ order }));
    },
  });
};

export default mount;
