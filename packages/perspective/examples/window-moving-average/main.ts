// Window columns: a rolling average over the previous N rows
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const ALIAS = 'Rolling avg Sales';

/** windows.md § Moving average over a fixed row count, framed by Order Date within a region. */
const configFor = (rows: number): ViewerConfigUpdate => ({
  windows: { [ALIAS]: { column: 'Sales', aggregate: 'avg', order_by: ['Order Date', 'asc'], rows } },
  columns: ['Sales', ALIAS],
  // order_by only orders the window frame; sort is what orders the view's rows (windows.md warning).
  sort: [['Order Date', 'asc']],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 150);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Y Line',
    filter: [['Region', '==', 'North']],
    settings: false,
  });

  const apply = async (rows: number): Promise<void> => {
    const config = configFor(rows);
    await viewer.restore(config);
    out?.set(JSON.stringify({ windows: config.windows, sort: config.sort }, null, 2));
  };
  if (bar) select(bar, 'rows (frame size)', ['3', '5', '10', '25', '50'], (v) => void apply(Number(v))).value = '10';
  await apply(10);

  const stop = ctx.preview ? cycle(viewer, [3, 10, 25, 50].map(configFor), 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
