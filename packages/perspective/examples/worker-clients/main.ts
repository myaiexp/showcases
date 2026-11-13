// perspective.worker() twice: separate engines, separate tables
import type { Mount } from '@/types.ts';
import { perspective, boot, worker as sharedWorker, createViewer, uniqueName } from '../../shared/setup.ts';
import { quoteStream, orders } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  await boot();
  // worker.md: perspective.worker() starts a Web Worker with its own copy of the engine and
  // returns the Client that talks to it. Keep each Client: it is the only way to reach that
  // worker's tables. In a card the second one is the page-wide worker, to stay light.
  const a = await perspective.worker();
  const b = ctx.preview ? await sharedWorker() : await perspective.worker();
  if (!ctx.preview) s.later(() => void b.terminate());
  s.later(() => void a.terminate());

  const stream = quoteStream(8, 16);
  const nameA = uniqueName('engine_a');
  const nameB = uniqueName('engine_b');
  const tableA = s.own(await a.table(stream.next(16), { name: nameA, index: 'id' }));
  const tableB = s.own(await b.table(orders(60, 4), { name: nameB }));

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  const mk = async (client: typeof a, table: string, config: object): Promise<void> => {
    const viewer = createViewer(el, ctx, { height: 260, previewHeight: 96, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table, plugin: 'Datagrid', settings: false, ...config });
    s.ownViewer(viewer);
  };
  await mk(a, nameA, { columns: ['id', 'symbol', 'price', 'qty'] });
  await mk(b, nameB, { group_by: ['Region'], columns: ['Sales', 'Profit'] });

  if (ctx.preview) {
    s.every(500, () => tableA.update(stream.next(3)));
    return s.dispose();
  }

  const out = output(el, 140);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nworker A hosts: ${show(await a.get_hosted_table_names())}\nworker B hosts: ${show(await b.get_hosted_table_names())}`);
  };
  const bar = controlBar(el);
  button(bar, 'Update A', () => void tableA.update(stream.next(4)).then(() => report('tableA.update(): only worker A did any work')));
  button(bar, 'Update B', () => void tableB.update(orders(20, Math.floor(Math.random() * 99))).then(() => report('tableB.update(): only worker B did any work')));
  // A table lives in one worker; asking the other Client for it fails.
  button(bar, "Open A's table from B", () => {
    b.open_table(nameA)
      .then(() => report('found?'))
      .catch((e: unknown) => out.set(`Worker B has no table "${nameA}":\n${String(e)}`));
  });
  el.prepend(bar);
  await report('Two perspective.worker() calls, two engines, two Clients.');
  return s.dispose();
};

export default mount;
