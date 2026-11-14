// The greedy dodge layout depends on order: sort and reverse make piles lean
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ORDERS = ['input order', 'sort: weight', 'sort + reverse', 'sort: {channel: x}'] as const;
type Order = (typeof ORDERS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ order: Order }>(el, ctx, {
    initial: { order: 'sort: weight' },
    render: ({ order }, { width, height, preview }) => {
      const base = { x: 'weight (lb)', title: 'name', fill: 'currentColor', r: preview ? 2 : undefined };
      const options =
        order === 'input order'
          ? base
          : order === 'sort: weight'
            ? { ...base, sort: 'weight (lb)' }
            : order === 'sort + reverse'
              ? { ...base, sort: 'weight (lb)', reverse: true }
              : { ...base, sort: { channel: 'x' } };
      return Plot.plot({ width, height: height ?? 180, marks: [Plot.dotX(cars, Plot.dodgeY(options))] });
    },
    step: ({ order }) => ({ order: ORDERS[(ORDERS.indexOf(order) + 1) % ORDERS.length] ?? 'input order' }),
    controls: (bar, live) => select(bar, 'order', ORDERS, live.state.order, (order) => live.set({ order })),
  });
};

export default mount;
