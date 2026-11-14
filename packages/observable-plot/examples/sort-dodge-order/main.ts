// Sort option feeds dodge: index order sets which car takes the centre
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ORDERS = ['ascending', 'descending'] as const;
type Order = (typeof ORDERS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ order: Order }>(el, ctx, {
    initial: { order: 'ascending' },
    render: ({ order }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 180,
        marks: [Plot.dotX(cars, Plot.dodgeY({ x: 'weight (lb)', title: 'name', fill: 'currentColor', sort: { channel: 'x', order } }))],
      }),
    step: ({ order }) => ({ order: order === 'ascending' ? 'descending' : 'ascending' }),
    controls: (bar, live) => {
      select(bar, 'sort x order', ORDERS, live.state.order, (order) => live.set({ order }));
    },
  });
};

export default mount;
