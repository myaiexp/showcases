// A streaming pivot: a View with on_update, and the same pivot in a viewer
import type { Mount } from '@/types.ts';
import type { ViewConfigUpdate } from '@perspective-dev/client';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { output, every } from '../../shared/controls.ts';

// streaming_pivot_table.md: a pivot is a View with group_by and split_by.
const PIVOT: ViewConfigUpdate = {
  group_by: ['Region', 'State'],
  split_by: ['Category'],
  columns: ['Sales', 'Profit'],
  aggregates: { Sales: 'sum', Profit: 'avg' },
  sort: [['Sales', 'desc']],
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(200, 1), { name });

  const viewer = createViewer(el, ctx, { height: 380, previewHeight: 140 });
  const out = output(el, ctx.preview ? 56 : 150);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', ...PIVOT });

  // Our own View of the same pivot. When update() lands, the engine applies the delta to
  // the affected groups only and calls back; the totals row is re-read on each call.
  const view = await table.view({ ...PIVOT, group_by: ['Region'], split_by: [] });
  let ticks = 0;
  // In "row" mode the callback also receives the changed rows as an Arrow delta.
  await view.on_update(
    ({ delta }) => {
      ticks += 1;
      void view.to_json({ start_row: 0, end_row: 1 }).then(([total]) => {
        out.set(
          `on_update #${ticks}, delta ${delta?.byteLength ?? 0} bytes of Arrow\n` +
            `total Sales ${Number(total?.Sales).toFixed(2)}, avg Profit ${Number(total?.Profit).toFixed(2)}`,
        );
      });
    },
    { mode: 'row' },
  );

  // New orders arrive in small batches; seeds advance so each batch differs.
  let seed = 100;
  const stop = every(ctx.preview ? 900 : 600, () => void table.update(orders(5, seed++)));

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    // A View we made must be deleted before the table it reads.
    void view.delete().finally(dispose);
  };
};

export default mount;
