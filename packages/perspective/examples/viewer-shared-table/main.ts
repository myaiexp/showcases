// Two <perspective-viewer>s load one Table; a single update() repaints both
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { every } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const feed = quoteStream();
  const name = uniqueName('quotes');
  // Indexed on id, so each tick replaces one of 40 rows instead of appending.
  const table = await client.table(feed.next(40), { name, index: 'id' });

  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '8px', width: '100%' });
  el.append(row);
  const left = createViewer(el, ctx, { parent: row, height: 420 });
  const right = createViewer(el, ctx, { parent: row, height: 420 });
  left.style.flex = right.style.flex = '1 1 0';

  // loading_data.md: pass the same table to load() on each viewer. Each builds its own
  // View over it, and both update when the table does.
  await left.load(table);
  await right.load(table);
  await left.restore({ plugin: 'Datagrid', columns: ['symbol', 'client', 'price', 'chg'], sort: [['symbol', 'asc']] });
  await right.restore({ plugin: 'Y Bar', group_by: ['symbol'], columns: ['qty'], aggregates: { qty: 'sum' } });

  // One update() on the shared table; no code touches either viewer.
  const stop = every(ctx.preview ? 900 : 500, () => void table.update(feed.next(4)));

  // table.delete() fails until every viewer referencing it is deleted, which teardown
  // does first.
  const dispose = teardown([left, right], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
