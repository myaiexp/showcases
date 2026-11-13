// Window columns: diff, lag, lead and row_number by Region over date
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const AGGREGATES = ['diff', 'lag', 'lead', 'row_number'] as const;

/** windows.md § Period-over-period change: partition_by restarts at each Region's first row. */
const configFor = (aggregate: string, offset: number): ViewerConfigUpdate => {
  const alias = aggregate === 'row_number' ? 'row_number' : `Sales ${aggregate} ${offset}`;
  return {
    windows: {
      [alias]: {
        column: 'Sales',
        aggregate,
        partition_by: ['Region'],
        order_by: ['Order Date', 'asc'],
        // offset is only read by lag, lead and diff.
        ...(aggregate === 'row_number' ? {} : { offset }),
      },
    },
    columns: ['Region', 'Order Date', 'Sales', alias],
    sort: [['Region', 'asc'], ['Order Date', 'asc']],
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

  let aggregate = 'diff';
  let offset = 1;
  const apply = async (): Promise<void> => {
    const config = configFor(aggregate, offset);
    await viewer.restore(config);
    out?.set(JSON.stringify({ windows: config.windows }, null, 2));
  };
  if (bar) {
    select(bar, 'aggregate', AGGREGATES, (v) => ((aggregate = v), void apply()));
    select(bar, 'offset', ['1', '2', '3'], (v) => ((offset = Number(v)), void apply()));
  }
  await apply();

  const stop = ctx.preview ? cycle(viewer, AGGREGATES.map((a) => configFor(a, 1)), 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
