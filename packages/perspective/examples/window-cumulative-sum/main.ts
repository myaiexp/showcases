// windows: a cumulative sum, optionally restarted per partition
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const ALIAS = 'Cumulative Sales';
const PARTITIONS: Record<string, string[]> = { 'whole table': [], Region: ['Region'], Category: ['Category'] };

/** windows.md § Cumulative sum; partition_by restarts the running total at each new value. */
const configFor = (partition: string): ViewerConfigUpdate => {
  const partition_by = PARTITIONS[partition]!;
  return {
    windows: {
      [ALIAS]: { column: 'Sales', aggregate: 'sum', order_by: ['Order Date', 'asc'], cumulative: true, ...(partition_by.length ? { partition_by } : {}) },
    },
    columns: [...partition_by, 'Order Date', 'Sales', ALIAS],
    sort: [...partition_by.map((c) => [c, 'asc'] as [string, 'asc']), ['Order Date', 'asc']],
  };
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 150);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const apply = async (partition: string): Promise<void> => {
    const config = configFor(partition);
    await viewer.restore(config);
    out?.set(JSON.stringify({ windows: config.windows, sort: config.sort }, null, 2));
  };
  if (bar) select(bar, 'partition_by', Object.keys(PARTITIONS), (v) => void apply(v));
  await apply('whole table');

  const stop = ctx.preview ? cycle(viewer, ['whole table', 'Region', 'Category'].map(configFor), 2600) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
