// Datetime expressions: bucket, day_of_week, month_of_year, epoch arithmetic
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

interface Preset {
  expr: string;
  /** Group by the new column, so Sales sums per bucket instead of listing orders. */
  grouped: boolean;
}
// expressions.md § Date/Datetime Functions, and the 7-day Due Date example.
const PRESETS: Record<string, Preset> = {
  'Month (bucket M)': { expr: `bucket("Order Date", 'M')`, grouped: true },
  'Week (bucket W)': { expr: `bucket("Order Date", 'W')`, grouped: true },
  'Day of week': { expr: 'day_of_week("Order Date")', grouped: true },
  'Month name': { expr: 'month_of_year("Order Date")', grouped: true },
  'Due Date (+7 days)': { expr: 'datetime(float("Order Date") + 604800000)', grouped: false },
  'Hour of day': { expr: 'hour_of_day("Order Date")', grouped: false },
};

const configFor = (alias: string): ViewerConfigUpdate => {
  const p = PRESETS[alias]!;
  return {
    expressions: { [alias]: p.expr },
    group_by: p.grouped ? [alias] : [],
    columns: p.grouped ? ['Sales'] : ['Order ID', 'Order Date', alias],
    sort: p.grouped ? [[alias, 'asc']] : [],
  };
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const apply = async (alias: string): Promise<void> => {
    await viewer.restore(configFor(alias));
    out?.set(JSON.stringify({ expressions: { [alias]: PRESETS[alias]!.expr } }, null, 2));
  };
  if (bar) select(bar, 'expression', Object.keys(PRESETS), (v) => void apply(v));
  await apply('Month (bucket M)');

  const stop = ctx.preview ? cycle(viewer, ['Month (bucket M)', 'Day of week', 'Due Date (+7 days)', 'Week (bucket W)'].map(configFor), 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
