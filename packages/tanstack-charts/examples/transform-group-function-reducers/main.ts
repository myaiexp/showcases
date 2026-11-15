// groupBy with the exported reducer functions median, variance, deviation, first, last, delta, ratio
import { barY, delta, deviation, first, groupBy, last, median, ratio, variance } from '@tanstack/charts';
import { defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(60);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'first, last, delta and ratio follow input order inside each group.' });
  const show = readoutPanel(stage);
  const rows = groupBy(orders, {
    by: 'region',
    outputs: {
      median: { value: 'amount', reduce: median },
      variance: { value: 'amount', reduce: variance },
      deviation: { value: 'amount', reduce: deviation },
      first: { value: 'amount', reduce: first },
      last: { value: 'amount', reduce: last },
      delta: { value: 'amount', reduce: delta },
      ratio: { value: 'amount', reduce: ratio },
    },
  });
  show(tableText(rows, ['region', 'median', 'variance', 'deviation', 'first', 'last', 'delta', 'ratio']));

  const build = (key: 'median' | 'variance' | 'deviation' | 'first' | 'last' | 'delta' | 'ratio') =>
    defineChart({
      marks: [barY(rows, { x: 'region', y: key, fill: '#c084fc' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: key } },
      },
    });
  const states = (['median', 'variance', 'deviation', 'first', 'last', 'delta', 'ratio'] as const).map((k) => [k, k] as const);
  lab(stage, { label: 'reducer', ariaLabel: 'Reducer results per region', states, build, ms: 1800, after: (_, name) => stage.say(`reduce: ${name}`) });
  return () => stage.dispose();
};

export default mount;
