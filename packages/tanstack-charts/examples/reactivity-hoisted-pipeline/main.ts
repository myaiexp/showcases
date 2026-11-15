// Hoisting the calculation: groupBy to daily rows, rollingWindow over them, then a plain line
import { defineChart, groupBy, lineY, rollingWindow } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcDay } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: the tooltip shows the derived row, not an order.' });

  const build = (size: number) => {
    const daily = groupBy(orders, {
      by: { region: 'region', day: (datum) => utcDay.floor(datum.createdAt) },
      outputs: {
        revenue: { value: 'amount', reduce: 'sum' },
        orders: { reduce: 'count' },
      },
    });
    const trends = rollingWindow(daily, {
      by: 'region',
      orderBy: 'day',
      size,
      partial: false,
      outputs: { revenueWindow: { value: 'revenue', reduce: 'sum' } },
    });
    return defineChart({
      marks: [lineY(trends, { x: 'day', y: 'revenueWindow', color: 'region', strokeWidth: 2 })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: `Revenue, ${size}-day sum` } },
      },
      tooltip,
    });
  };

  const states = [7, 14, 28].map((n) => [n, `${n}-day window`] as const);
  lab(stage, { label: 'size', ariaLabel: 'Rolling revenue by region', states, build, after: (n) => stage.say(`daily rows -> rollingWindow({ size: ${n}, partial: false }) -> lineY`) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
