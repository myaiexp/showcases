// A replica Table kept in sync with on_update and on_remove
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const COLUMNS = ['id', 'symbol', 'price', 'qty'];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const stream = quoteStream(6, 24);
  const source = s.own(await client.table(stream.next(24), { name: uniqueName('source'), index: 'id' }));
  // Only rows with qty >= 1000 are in this View, so an update can push a row out of it.
  const view = s.own(await source.view({ columns: COLUMNS, filter: [['qty', '>=', 1000]] }));
  // The replica has the View's schema and the same index, as advanced.md describes.
  const replica = s.own(await client.table(await view.schema(), { name: uniqueName('replica'), index: 'id' }));
  await replica.update(await view.to_arrow());

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  const mk = async (table: typeof source, filter: boolean): Promise<void> => {
    const viewer = createViewer(el, ctx, { height: 250, previewHeight: 96, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns: COLUMNS, sort: [['id', 'asc']], filter: filter ? [['qty', '>=', 1000]] : [], settings: false });
    s.ownViewer(viewer);
  };
  await mk(source, true);
  await mk(replica, false);

  const out = ctx.preview ? null : output(el, 120);
  const onUpdate = await view.on_update(
    ({ delta, reset }) => {
      if (!delta) return;
      // A reset means the delta is relative to an empty Table, so replace() rather than update().
      const arrow = delta.buffer.slice(delta.byteOffset, delta.byteOffset + delta.byteLength) as ArrayBuffer;
      void (reset ? replica.replace(arrow) : replica.update(arrow));
      out?.log(`on_update: ${delta.byteLength} bytes of Arrow applied with ${reset ? 'replace()' : 'update()'}`);
    },
    { mode: 'row' },
  );
  const onRemove = await view.on_remove(({ indices, cause }) => {
    if (indices) void replica.remove(indices);
    out?.log(`on_remove: cause "${cause}", keys applied to replica.remove()`);
  });
  s.stop(() => {
    void view.remove_update(onUpdate);
    void view.remove_remove(onRemove);
  });

  if (ctx.preview) {
    let t = 0;
    s.every(700, async () => {
      await source.update(stream.next(3));
      if (++t % 5 === 0) await source.remove([t % 24]);
    });
    return s.dispose();
  }

  const bar = controlBar(el);
  button(bar, 'Remove ids 0-3', () => void source.remove([0, 1, 2, 3]));
  // An update that moves a row out of the filter is reported with the cause "filter".
  button(bar, 'Push the first row below the filter', () => {
    void view.to_json({ end_row: 1 }).then((rows) => (rows[0] ? source.update([{ id: rows[0].id as number, qty: 100 }]) : undefined));
  });
  button(bar, 'Stream 4 rows', () => void source.update(stream.next(4)));
  button(bar, 'clear() source', () => void source.clear());
  button(bar, 'replace() source', () => void source.replace(stream.next(24)));
  el.prepend(bar);
  out!.set('Left: the source table, filtered to qty >= 1000. Right: a replica built only from the View\'s callbacks.');
  return s.dispose();
};

export default mount;
