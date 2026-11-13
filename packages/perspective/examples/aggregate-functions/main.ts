// Aggregate functions for Sales, including the ones that take a second column
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

// grouping_and_pivots.md § Argument-taking aggregates: [name, [argument column]].
const AGGREGATES: Record<string, unknown> = {
  sum: 'sum',
  avg: 'avg',
  median: 'median',
  q1: 'q1',
  q3: 'q3',
  stddev: 'stddev',
  min: 'min',
  max: 'max',
  'high minus low': 'high minus low',
  'sum abs': 'sum abs',
  'abs sum': 'abs sum',
  count: 'count',
  'distinct count': 'distinct count',
  dominant: 'dominant',
  first: 'first',
  'last by index': 'last by index',
  'pct sum parent': 'pct sum parent',
  'pct sum total': 'pct sum total',
  'weighted mean (weight: Quantity)': ['weighted mean', ['Quantity']],
  'max by (Profit)': ['max by', ['Profit']],
  'min by (Profit)': ['min by', ['Profit']],
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  // Profit stays on its default sum so the chosen aggregate can be compared against it.
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    group_by: ['Region', 'Category'],
    columns: ['Sales', 'Profit'],
    settings: false,
  });

  const apply = async (key: string): Promise<void> => {
    const config = { aggregates: { Sales: AGGREGATES[key] } } as ViewerConfigUpdate;
    await viewer.restore(config);
    out?.set(JSON.stringify(config, null, 2));
  };
  if (bar) select(bar, 'Sales aggregate', Object.keys(AGGREGATES), (v) => void apply(v));
  await apply('sum');

  const steps = ['sum', 'avg', 'median', 'max', 'pct sum parent', 'weighted mean (weight: Quantity)', 'distinct count'];
  const stop = ctx.preview ? cycle(viewer, steps.map((k) => ({ aggregates: { Sales: AGGREGATES[k] } }) as ViewerConfigUpdate), 2200) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
