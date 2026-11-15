// groupBy with a compound by: { region, month } and the named columns it leaves
import { barY, defineChart, groupBy, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleBand } from '@tanstack/charts/scales/band';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcMonth } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(90);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment: the row has region and month fields.' });

  const monthly = groupBy(orders, {
    by: { region: 'region', month: (datum) => utcMonth.floor(datum.createdAt) },
    outputs: { revenue: { value: 'amount', reduce: 'sum' }, orders: { reduce: 'count' } },
  });
  const definition = defineChart({
    marks: [barY(monthly, { x: (row) => row.month.toISOString().slice(0, 7), y: 'revenue', color: 'region' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2), axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue by region' }));
  readoutPanel(stage)(tableText(monthly, ['region', 'month', 'revenue', 'orders'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
