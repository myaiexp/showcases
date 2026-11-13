// group_rollup_mode: rollup subtotals, flat leaf rows, or total only
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const GROUP_BY = ['Region', 'State'];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 110);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', columns: ['Sales', 'Profit'], settings: false });

  let mode = 'rollup';
  let plugin = 'Datagrid';
  const apply = async (): Promise<void> => {
    // "total" is mutually exclusive with group_by, which the engine clears when it is set.
    const group_by = mode === 'total' ? [] : GROUP_BY;
    const config = { plugin, group_by, group_rollup_mode: mode as 'rollup' | 'flat' | 'total' };
    await viewer.restore(config);
    out?.set(JSON.stringify(config, null, 2));
  };
  if (bar) {
    select(bar, 'group_rollup_mode', ['rollup', 'flat', 'total'], (v) => ((mode = v), void apply()));
    select(bar, 'plugin', ['Datagrid', 'Y Bar'], (v) => ((plugin = v), void apply()));
  }
  await apply();

  const modes = ['rollup', 'flat', 'total'] as const;
  const stop = ctx.preview
    ? cycle(
        viewer,
        modes.map((m) => ({ group_by: m === 'total' ? [] : GROUP_BY, group_rollup_mode: m })),
        2200,
      )
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
