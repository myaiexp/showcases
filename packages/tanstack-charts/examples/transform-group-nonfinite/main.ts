// Numeric reducers ignore non-finite values; lineage still lists all rows unless filtered first
import { barY, defineChart, groupBy } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const orders = makeOrders(30).map((o, i) => (i % 4 === 0 ? { ...o, amount: Number.NaN } : o));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same mean either way; the source count is what changes.' });
  const show = readoutPanel(stage);

  const build = (filtered: boolean) => {
    const input = filtered ? orders.filter((o) => Number.isFinite(o.amount)) : orders;
    const rows = groupBy(input, { by: 'region', outputs: { mean: { value: 'amount', reduce: 'mean' } } }).map((r) => ({ ...r, rowsInGroup: r.source.length }));
    show(tableText(rows, ['region', 'mean', 'rowsInGroup']));
    return defineChart({
      marks: [barY(rows, { x: 'region', y: 'rowsInGroup', fill: '#64748b' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear().domain([0, 70]), grid: true, axis: { label: 'Rows in source lineage' } },
      },
    });
  };
  const states = [[false, 'unfiltered input'], [true, 'filtered before groupBy']] as const;
  lab(stage, { label: 'input', ariaLabel: 'Source rows per region', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
