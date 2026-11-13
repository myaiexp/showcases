// group_by hierarchies and group_by_depth: levels and how deep rows open
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const LEVELS: Record<string, string[]> = {
  Region: ['Region'],
  'Region, State': ['Region', 'State'],
  'Category, Sub-Category': ['Category', 'Sub-Category'],
  'Region, Category, Sub-Category': ['Region', 'Category', 'Sub-Category'],
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 120);
  await viewer.load(client);

  let levels = 'Region, State';
  let depth = 'all';
  const apply = async (): Promise<void> => {
    // grouping_and_pivots.md: group_by is an ordered array, with a total row per group.
    // group_by_depth (FAQ.md) opens the row groups only to that depth; null resets it.
    const group_by = LEVELS[levels]!;
    // The generated type for group_by_depth omits null, but OptionalUpdate treats it as a reset.
    const reset = null as unknown as number;
    await viewer.restore({ group_by, group_by_depth: depth === 'all' ? reset : Number(depth) });
    out?.set(JSON.stringify({ group_by, ...(depth === 'all' ? {} : { group_by_depth: Number(depth) }) }, null, 2));
  };

  await viewer.restore({ table: name, plugin: 'Datagrid', columns: ['Sales', 'Profit', 'Quantity'], settings: false });
  if (bar) {
    select(bar, 'group_by', Object.keys(LEVELS), (v) => ((levels = v), void apply())).value = levels;
    select(bar, 'group_by_depth', ['all', '1', '2'], (v) => ((depth = v), void apply()));
  }
  await apply();

  const stop = ctx.preview
    ? cycle(viewer, [
        { group_by: ['Region', 'State'], group_by_depth: 1 },
        { group_by: ['Region', 'State'], group_by_depth: 2 },
        { group_by: ['Category', 'Sub-Category'], group_by_depth: 1 },
        { group_by: ['Category', 'Sub-Category'], group_by_depth: 2 },
      ])
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
