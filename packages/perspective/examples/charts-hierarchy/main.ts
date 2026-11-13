// Treemap and Sunburst: group_by is the hierarchy, split_by facets
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const HIERARCHIES: Record<string, string[]> = {
  'Category, Sub-Category': ['Category', 'Sub-Category'],
  'Region, State': ['Region', 'State'],
  'Region, Category, Sub-Category': ['Region', 'Category', 'Sub-Category'],
};

/** Slots for these charts: Size, Color, Tooltip. The hierarchy comes from group_by. */
const configFor = (plugin: string, hierarchy: string, split: string): ViewerConfigUpdate => ({
  plugin,
  group_by: HIERARCHIES[hierarchy]!,
  split_by: split === 'none' ? [] : [split],
  columns: ['Sales', 'Profit'],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 100);
  await viewer.load(client);

  let plugin = 'Treemap';
  let hierarchy = 'Category, Sub-Category';
  let split = 'none';
  await viewer.restore({ table: name, settings: false, ...configFor(plugin, hierarchy, split) });
  const apply = async (): Promise<void> => {
    const config = configFor(plugin, hierarchy, split);
    await viewer.restore(config);
    out?.set(JSON.stringify(config, null, 2));
  };
  if (bar) {
    select(bar, 'plugin', ['Treemap', 'Sunburst'], (v) => ((plugin = v), void apply()));
    select(bar, 'group_by (hierarchy)', Object.keys(HIERARCHIES), (v) => ((hierarchy = v), void apply()));
    select(bar, 'split_by (facets)', ['none', 'Region', 'Segment'], (v) => ((split = v), void apply()));
  }
  await apply();

  const stop = ctx.preview
    ? cycle(viewer, [configFor('Sunburst', hierarchy, 'none'), configFor('Treemap', 'Region, State', 'none'), configFor('Sunburst', 'Region, State', 'none'), configFor('Treemap', hierarchy, 'none')], 2800)
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
