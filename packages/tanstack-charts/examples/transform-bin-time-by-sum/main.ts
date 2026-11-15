// binTimeX with by and a sum output: weekly revenue per region
import { binTimeX, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcWeek } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(120);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point for the week and its revenue.' });

  const weekly = binTimeX(orders, {
    value: 'createdAt',
    interval: utcWeek,
    by: 'region',
    outputs: { revenue: { value: 'amount', reduce: 'sum' }, orders: { reduce: 'count' } },
  });
  const definition = defineChart({
    marks: [lineY(weekly, { x: 'x1', y: 'revenue', color: 'region', strokeWidth: 2, points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue per week' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Weekly revenue by region' }));
  readoutPanel(stage)(tableText(weekly, ['region', 'x1', 'x2', 'revenue', 'orders'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
