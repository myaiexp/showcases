// columns_config date_format and number_format presets
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';
import { FORMATS } from './formats.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const rows = orders(60).map((o) => ({ ...o, Shipped: new Date(o['Order Date'].getTime() + 3.6e7 * (1 + (o['Order ID'] % 9))) }));
  // Order Date holds whole days, so it loads as a date column; Shipped carries a time
  // of day too, and is a datetime column.
  const table = await client.table(rows, { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 130);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['Order ID', 'Order Date', 'Shipped', 'Sales', 'Discount'],
    sort: [['Order Date', 'asc']],
  });

  // A columns_config update merges into the stored one column by column, so a preset
  // that leaves a column out would keep its old format. null resets it to the defaults
  // first.
  const apply = async (label: string): Promise<void> => {
    const columns_config = FORMATS[label]!;
    await viewer.restore({ columns_config: null });
    await viewer.restore({ columns_config });
    out?.set(`columns_config = ${JSON.stringify(columns_config, null, 2)}`);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const labels = Object.keys(FORMATS);
    let i = 0;
    stop = every(2200, () => void apply(labels[++i % labels.length]!));
  } else {
    select(bar!, 'format', Object.keys(FORMATS), (label) => void apply(label));
    await apply(Object.keys(FORMATS)[0]!);
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
