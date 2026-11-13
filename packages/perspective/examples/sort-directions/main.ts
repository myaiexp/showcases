// The eight sort directions, including abs and the col ones for split_by
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const DIRECTIONS = ['asc', 'desc', 'asc abs', 'desc abs', 'col asc', 'col desc', 'col asc abs', 'col desc abs'] as const;
type Dir = (typeof DIRECTIONS)[number];

/**
 * Row directions sort the unaggregated orders by Profit. The "col" directions order the
 * column groups made by split_by, so they need a pivoted view to mean anything.
 */
function configFor(dir: Dir): ViewerConfigUpdate {
  if (dir.startsWith('col')) {
    return { group_by: ['Region'], split_by: ['Ship Mode'], columns: ['Profit'], sort: [['Profit', dir]] };
  }
  return { group_by: [], split_by: [], columns: ['Order ID', 'Region', 'Profit'], sort: [['Profit', dir]] };
}

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const apply = async (dir: Dir): Promise<void> => {
    const config = configFor(dir);
    await viewer.restore(config);
    out?.set(JSON.stringify({ sort: config.sort, ...(config.split_by?.length ? { split_by: config.split_by } : {}) }, null, 2));
  };
  if (bar) select(bar, 'sort Profit', DIRECTIONS, (v) => void apply(v as Dir));
  await apply('asc');

  const stop = ctx.preview ? cycle(viewer, (['asc', 'desc', 'asc abs', 'desc abs'] as const).map(configFor), 2200) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
