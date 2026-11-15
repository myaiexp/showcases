// The escape hatch: rows.filter(...).map(...) feeds groupBy like any other array
import { barY, defineChart, groupBy } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(60);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the sum covers only the orders that passed the filter.' });

  const build = (profitableOnly: boolean) => {
    const active = profitableOnly ? orders.filter((row) => row.margin > 0) : orders;
    const enriched = active.map((row) => ({ ...row, net: Math.round(row.amount * row.margin * 100) / 100 }));
    const summaries = groupBy(enriched, {
      by: 'region',
      outputs: { net: { value: 'net', reduce: 'sum' }, orders: { reduce: 'count' } },
    });
    return defineChart({
      marks: [barY(summaries, { x: 'region', y: 'net', fill: '#4ade80' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear().domain([-300, 1400]), grid: true, axis: { label: 'Net margin (sum)' } },
      },
      tooltip,
    });
  };

  const states = [[false, 'all orders'], [true, 'profitable only']] as const;
  lab(stage, {
    label: 'filter',
    ariaLabel: 'Net margin per region',
    states,
    build,
    ms: 2400,
    after: (on) => stage.say(on ? 'orders.filter(margin > 0).map(add net) -> groupBy' : 'orders.map(add net) -> groupBy'),
  });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
