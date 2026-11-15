// select with a function: return the indexes of the rows to keep in each group
import { defineChart, dot, select } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { mountChart } from '@tanstack/charts';

const orders = makeOrders(40);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const options = (keep: number) => {
    const outliers = select(orders, {
      by: 'region',
      value: 'amount',
      select: ({ values }) => {
        const sorted = values.filter((v): v is number => v != null).sort((a, b) => a - b);
        const cut = sorted[Math.floor(sorted.length * keep)] ?? Infinity;
        return values.flatMap((v, i) => (v != null && v >= cut ? [i] : []));
      },
    });
    stage.say(`top ${Math.round((1 - keep) * 100)}% per region: ${outliers.length} of ${orders.length} rows kept`);
    return {
      definition: defineChart({
        marks: [dot(orders, { x: 'createdAt', y: 'amount', fill: '#475569', r: 2 }), dot(outliers, { x: 'createdAt', y: 'amount', color: 'region', r: 6 })],
        scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Amount' } } },
      }),
      height: stage.height,
      ariaLabel: 'Orders with the largest ones selected',
    };
  };
  const host = stage.own(mountChart(stage.box, options(0.9)));
  if (stage.bar) slider(stage.bar, 'quantile cut', 0.5, 0.99, 0.01, 0.9, (k) => host.update(options(k)), (k) => k.toFixed(2));
  else stage.cycle([0.9, 0.7, 0.95], 1800, (k) => host.update(options(k)));
  return () => stage.dispose();
};

export default mount;
