// X/Y Scatter, X/Y Line and Density: columns give axes, colour and size
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

/**
 * The plugin's column slots, in order: X/Y Scatter reads X Axis, Y Axis, Color, Size, Label,
 * Tooltip; X/Y Line reads X Axis, Y Axis, Tooltip; Density reads X Axis, Y Axis, Color.
 */
const SLOTS: Record<string, ViewerConfigUpdate> = {
  'X/Y Scatter': { columns: ['Sales', 'Profit', 'Discount', 'Quantity'] },
  // The line connects points in row order, so it needs a sort along X.
  'X/Y Line': { columns: ['Order Date', 'Profit'], sort: [['Order Date', 'asc']], filter: [['Region', '==', 'North']] },
  Density: { columns: ['Sales', 'Profit', 'Discount'] },
};

const configFor = (plugin: string, split: string): ViewerConfigUpdate => ({
  plugin,
  group_by: [],
  sort: [],
  filter: [],
  ...SLOTS[plugin]!,
  split_by: split === 'none' || plugin === 'Density' ? [] : [split],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  // Unaggregated rows: one point per order, and enough of them for Density to read well.
  const table = await client.table(orders(ctx.preview ? 800 : 2500, 21), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 100);
  await viewer.load(client);

  let plugin = 'X/Y Scatter';
  let split = 'none';
  await viewer.restore({ table: name, settings: false, ...configFor(plugin, split) });
  const apply = async (): Promise<void> => {
    await viewer.restore(configFor(plugin, split));
    const { columns, split_by, sort } = await viewer.getViewConfig();
    out?.set(JSON.stringify({ plugin, columns, split_by, sort }, null, 2));
  };
  if (bar) {
    select(bar, 'plugin', Object.keys(SLOTS), (v) => ((plugin = v), void apply()));
    select(bar, 'split_by', ['none', 'Category', 'Region'], (v) => ((split = v), void apply()));
  }
  await apply();

  const stop = ctx.preview ? cycle(viewer, Object.keys(SLOTS).map((p) => configFor(p, 'none')), 2800) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
