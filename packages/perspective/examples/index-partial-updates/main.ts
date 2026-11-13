// An indexed Table: keyed updates, partial updates and remove()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const COLUMNS = ['id', 'symbol', 'client', 'price', 'qty'];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // Twelve keys: the stream's ids cycle through 0..11, so every later batch updates in place.
  const stream = quoteStream(3, 12);
  const table = s.own(await client.table(stream.next(12), { name: uniqueName('indexed'), index: 'id' }));

  const viewer = createViewer(el, ctx, { height: 330 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns: COLUMNS, sort: [['id', 'asc']], settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    s.every(500, () => table.update(stream.next(3)));
    return s.dispose();
  }

  const out = output(el, 110);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nget_index(): ${await table.get_index()}\nsize(): ${await table.size()}`);
  };
  const run = (what: string, op: () => Promise<void>) => () => void op().then(() => report(what));
  const bar = controlBar(el);
  button(bar, 'Update row 3', run('update() with the full row for id 3: replaced in place', () => table.update([{ ...stream.next(1)[0]!, id: 3 }])));
  button(bar, 'Partial update: price of id 5', run('update([{ id: 5, price }]): other columns kept', () => table.update([{ id: 5, price: Math.round(Math.random() * 1000) / 10 }])));
  button(bar, 'Insert id 100', run('a new key appends a row', () => table.update([{ ...stream.next(1)[0]!, id: 100 }])));
  button(bar, 'Remove ids 0, 1, 2', run('remove([0, 1, 2])', () => table.remove([0, 1, 2])));
  button(bar, 'Stream 3 rows', run('update() of 3 rows with ids cycling through 0..11', () => table.update(stream.next(3))));
  el.prepend(bar);
  await report('Created with { index: "id" } from 12 rows.');
  return s.dispose();
};

export default mount;
