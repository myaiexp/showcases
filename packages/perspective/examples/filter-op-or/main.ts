// filter_op: the same two filters joined with and (the default) or or
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const FILTERS: [string, string, string | number][] = [
  ['Region', '==', 'North'],
  ['Category', '==', 'Technology'],
  ['Sales', '>', 1500],
];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 100);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['Order ID', 'Region', 'Category', 'Sales'],
    filter: FILTERS,
    filter_op: 'and',
    settings: false,
  });

  const apply = async (filter_op: 'and' | 'or'): Promise<void> => {
    // selection_and_ordering.md: filters join with AND unless filter_op says "or".
    await viewer.restore({ filter_op });
    // The viewer owns its live View; num_rows() reads it without disturbing it.
    const rows = await (await viewer.getView()).num_rows();
    out?.set(JSON.stringify({ filter: FILTERS, filter_op }, null, 2) + `\n=> ${rows} rows`);
  };
  if (bar) select(bar, 'filter_op', ['and', 'or'], (v) => void apply(v as 'and' | 'or'));
  await apply('and');

  const stop = ctx.preview ? cycle(viewer, [{ filter_op: 'or' }, { filter_op: 'and' }], 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
