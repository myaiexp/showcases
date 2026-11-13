// split_by pivots values into columns; split_rollup_mode adds totals
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const SPLITS: Record<string, string[]> = {
  'Ship Mode': ['Ship Mode'],
  'Segment, Ship Mode': ['Segment', 'Ship Mode'],
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 110);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', group_by: ['Region'], columns: ['Sales'], settings: false });

  let split = 'Ship Mode';
  let rollup = 'flat';
  const apply = async (): Promise<void> => {
    // split_rollup_mode "flat" (default) keeps only full-depth columns such as "Second Class|Sales";
    // "rollup" adds a bare "Sales" total column and, with two split_by levels, subtotal columns.
    const config = { split_by: SPLITS[split]!, split_rollup_mode: rollup as 'flat' | 'rollup' };
    await viewer.restore(config);
    out?.set(JSON.stringify({ group_by: ['Region'], ...config }, null, 2));
  };
  if (bar) {
    select(bar, 'split_by', Object.keys(SPLITS), (v) => ((split = v), void apply()));
    select(bar, 'split_rollup_mode', ['flat', 'rollup'], (v) => ((rollup = v), void apply()));
  }
  await apply();

  const stop = ctx.preview
    ? cycle(viewer, [
        { split_by: ['Ship Mode'], split_rollup_mode: 'flat' },
        { split_by: ['Ship Mode'], split_rollup_mode: 'rollup' },
        { split_by: ['Segment', 'Ship Mode'], split_rollup_mode: 'rollup' },
      ])
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
