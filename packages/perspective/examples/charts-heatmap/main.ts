// Heatmap: group_by on X, split_by on Y, one column colours each cell
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const AGGREGATES = ['sum', 'avg', 'count', 'max', 'median'];

/** The Heatmap has a single Color slot; the aggregate decides what each cell holds. */
const configFor = (x: string, y: string, column: string, aggregate: string): ViewerConfigUpdate => ({
  plugin: 'Heatmap',
  // "flat" drops the total row, which the default rollup mode would draw as an unlabelled column
  // (grouping_and_pivots.md: flat suits chart plugins).
  group_rollup_mode: 'flat',
  group_by: [x],
  split_by: [y],
  columns: [column],
  aggregates: { [column]: aggregate } as ViewerConfigUpdate['aggregates'],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 110);
  await viewer.load(client);

  const s = { x: 'Sub-Category', y: 'Region', column: 'Profit', aggregate: 'sum' };
  await viewer.restore({ table: name, settings: false, ...configFor(s.x, s.y, s.column, s.aggregate) });
  const apply = async (): Promise<void> => {
    const config = configFor(s.x, s.y, s.column, s.aggregate);
    await viewer.restore(config);
    out?.set(JSON.stringify(config, null, 2));
  };
  if (bar) {
    select(bar, 'group_by (X)', ['Sub-Category', 'State', 'Category', 'Segment'], (v) => ((s.x = v), void apply()));
    select(bar, 'split_by (Y)', ['Region', 'Segment', 'Ship Mode', 'Category'], (v) => ((s.y = v), void apply()));
    select(bar, 'column', ['Profit', 'Sales', 'Quantity', 'Discount'], (v) => ((s.column = v), void apply()));
    select(bar, 'aggregate', AGGREGATES, (v) => ((s.aggregate = v), void apply()));
  }
  await apply();

  const stop = ctx.preview
    ? cycle(viewer, [configFor('Sub-Category', 'Region', 'Profit', 'sum'), configFor('Sub-Category', 'Region', 'Sales', 'avg'), configFor('State', 'Segment', 'Quantity', 'sum'), configFor('Sub-Category', 'Ship Mode', 'Profit', 'avg')], 2800)
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
