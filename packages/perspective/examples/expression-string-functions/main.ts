// String expressions: upper, concat, substring, replace_all, match, order
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

// expressions.md § String Functions.
const FUNCTIONS: Record<string, string> = {
  upper: 'upper("Sub-Category")',
  lower: 'lower("State")',
  length: 'length("Sub-Category")',
  concat: `concat("Region", ' / ', "State")`,
  substring: 'substring("State", 0, 3)',
  contains: `contains("Sub-Category", 'er')`,
  match: `match("State", '^K')`,
  search: `search("Sub-Category", '^(..)')`,
  indexof: `indexof("Sub-Category", 'a')`,
  replace: `replace("Sub-Category", '_', '[aeiou]')`,
  replace_all: `replace_all("Sub-Category", '_', '[aeiou]')`,
  order: `order("Region", 'West', 'East', 'South', 'North')`,
};

const configFor = (fn: string): ViewerConfigUpdate => ({
  expressions: { [fn]: FUNCTIONS[fn]! },
  columns: ['Region', 'State', 'Sub-Category', fn],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const apply = async (fn: string): Promise<void> => {
    await viewer.restore(configFor(fn));
    out?.set(JSON.stringify({ expressions: { [fn]: FUNCTIONS[fn] } }, null, 2));
  };
  if (bar) select(bar, 'function', Object.keys(FUNCTIONS), (v) => void apply(v));
  await apply('upper');

  const stop = ctx.preview ? cycle(viewer, ['upper', 'concat', 'substring', 'replace_all', 'match'].map(configFor), 2200) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
