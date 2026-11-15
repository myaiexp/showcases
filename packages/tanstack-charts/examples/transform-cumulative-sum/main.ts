// cumulative: a running sum per region over daily revenue rows
import { cumulative, defineChart, groupBy, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcDay } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(90);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: the row has the day, its revenue and the running total.' });

  const daily = groupBy(orders, {
    by: { region: 'region', day: (d) => utcDay.floor(d.createdAt) },
    outputs: { revenue: { value: 'amount', reduce: 'sum' } },
  });
  const running = cumulative(daily, {
    by: 'region',
    orderBy: 'day',
    outputs: { total: { value: 'revenue', reduce: 'sum' } },
  });
  const definition = defineChart({
    marks: [lineY(running, { x: 'day', y: 'total', color: 'region', strokeWidth: 2 })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Running revenue' } } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Running revenue by region' }));
  readoutPanel(stage)(tableText(running, ['region', 'day', 'revenue', 'total'], 5));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
