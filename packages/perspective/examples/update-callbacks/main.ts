// view.on_update() in plain and row mode, the reset flag, and remove_update()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const stream = quoteStream(4, 20);
  const table = s.own(await client.table(stream.next(20), { name: uniqueName('quotes'), index: 'id' }));
  const view = s.own(await table.view({ columns: ['id', 'symbol', 'price'] }));

  const viewer = createViewer(el, ctx, { height: 240, previewHeight: 110 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns: ['id', 'symbol', 'price'], settings: false });
  s.ownViewer(viewer);

  const out = output(el, ctx.preview ? 80 : 190);
  out.box.style.margin = ctx.preview ? '4px 0 0' : '8px 0 0';
  let n = 0;
  // advanced.md: on_update fires after the View recalculates. With { mode: "row" } it also
  // carries the changed rows as an Arrow; `reset` is true when the step began with clear()
  // or replace().
  const plain = await view.on_update((u) => out.log(`#${++n} on_update  port_id=${u.port_id}  delta=${u.delta ? 'present' : 'none'}`));
  const rowMode = await view.on_update(
    (u) => out.log(`#${n} row mode   port_id=${u.port_id}  reset=${u.reset}  delta=${u.delta ? `${u.delta.byteLength} bytes of Arrow` : 'none'}`),
    { mode: 'row' },
  );
  let live = [plain, rowMode];
  s.stop(() => void Promise.all(live.map((id) => view.remove_update(id))));

  if (ctx.preview) {
    s.every(900, () => table.update(stream.next(3)));
    return s.dispose();
  }

  const bar = controlBar(el);
  button(bar, 'update() 3 rows', () => void table.update(stream.next(3)));
  button(bar, 'update() 1 row', () => void table.update(stream.next(1)));
  button(bar, 'replace()', () => void table.replace(stream.next(20)));
  button(bar, 'clear()', () => void table.clear());
  button(bar, 'remove_update() both', () => {
    void Promise.all(live.map((id) => view.remove_update(id))).then(() => {
      live = [];
      out.log('callbacks removed: further updates print nothing');
    });
  });
  el.prepend(bar);
  out.set('Two callbacks are registered on one View. Update the Table.');
  return s.dispose();
};

export default mount;
