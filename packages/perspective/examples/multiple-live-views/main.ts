// Three Views over one streaming Table, each re-querying itself on every update
import type { Mount } from '@/types.ts';
import type { ViewConfigUpdate } from '@perspective-dev/client';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const QUERIES: Array<{ title: string; config: ViewConfigUpdate }> = [
  { title: 'avg price and total qty by symbol', config: { group_by: ['symbol'], columns: ['price', 'qty'], aggregates: { price: 'avg', qty: 'sum' } } },
  { title: 'orders with qty > 1500, biggest first', config: { columns: ['id', 'symbol', 'qty'], filter: [['qty', '>', 1500]], sort: [['qty', 'desc']] } },
  { title: 'total qty by client', config: { group_by: ['client'], columns: ['qty'], aggregates: { qty: 'sum' } } },
];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const stream = quoteStream(9, 30);
  const table = s.own(await client.table(stream.next(30), { name: uniqueName('live'), index: 'id' }));

  // view.md: each View is live. It is created once and recalculates as the Table updates.
  // Viewers do the same: each <perspective-viewer> makes its own View over this one Table.
  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  for (const q of QUERIES.slice(0, 2)) {
    const viewer = createViewer(el, ctx, { height: 260, previewHeight: 96, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table: await table.get_name(), ...q.config, plugin: 'Datagrid', settings: false });
    s.ownViewer(viewer);
  }

  if (ctx.preview) {
    s.every(500, () => table.update(stream.next(3)));
    return s.dispose();
  }

  // The third query, and a printout of each query's result, come from Views made directly.
  for (const q of QUERIES) {
    const view = s.own(await table.view(q.config));
    const box = output(el, 110);
    const print = async (): Promise<void> => {
      const rows = await view.to_json({ end_row: 6 });
      box.set(`${q.title}  (num_rows ${await view.num_rows()})\n${rows.map((r) => JSON.stringify(r)).join('\n')}`);
    };
    const id = await view.on_update(() => void print());
    s.stop(() => void view.remove_update(id));
    await print();
  }
  s.every(900, () => table.update(stream.next(4)));
  return s.dispose();
};

export default mount;
