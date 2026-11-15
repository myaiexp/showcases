// groupBy with a callback group field and three kinds of reducer: built-in, quantile, custom
import { barY, defineChart, group, groupBy, median, quantile } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(60);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each output is one reducer over the same groups.' });

  const summaries = groupBy(orders, {
    by: { region: 'region', profitable: (datum) => datum.margin > 0 },
    outputs: {
      mean: { value: 'amount', reduce: 'mean' },
      median: { value: 'amount', reduce: median },
      p90: { value: 'amount', reduce: quantile(0.9) },
      // A custom reducer gets { values, data, indexes, group } and may return anything.
      bigShare: { reduce: ({ data }) => data.filter((o) => o.amount > 80).length / data.length },
    },
  });
  const show = readoutPanel(stage);
  show(tableText(summaries, ['region', 'profitable', 'mean', 'median', 'p90', 'bigShare'], 6));

  const build = (key: 'mean' | 'median' | 'p90' | 'bigShare') =>
    defineChart({
      marks: [barY(summaries, { x: 'region', y: key, color: (row) => (row.profitable ? 'profitable' : 'loss-making'), layout: group() })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: key } },
      },
      tooltip,
    });

  const states = [['mean', 'mean'], ['median', 'median (reducer function)'], ['p90', 'quantile(0.9)'], ['bigShare', 'custom reducer: share over 80']] as const;
  lab(stage, { label: 'output', ariaLabel: 'Order summaries by region and profitability', states, build, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
