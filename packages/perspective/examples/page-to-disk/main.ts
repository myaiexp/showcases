// page_to_disk: one table in memory and one on disk, compared
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const QUERY = { group_by: ['Region'], columns: ['Sales', 'Profit'], aggregates: { Sales: 'sum', Profit: 'sum' } };

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const data = orders(ctx.preview ? 200 : 2000, 21);
  const memory = s.own(await client.table(data, { name: uniqueName('memory') }));
  // options.md: in a browser the columns go to the Origin Private File System. The docs
  // load an Arrow into the table, so serialize the in-memory one and load that.
  const src = await memory.view();
  const arrow = await src.to_arrow();
  await src.delete();
  const disk = s.own(await client.table(arrow, { name: uniqueName('disk'), page_to_disk: true }));

  const viewer = createViewer(el, ctx, { height: 300 });
  await viewer.load(client);
  await viewer.restore({ table: await disk.get_name(), plugin: 'Datagrid', ...QUERY, settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    // Updates go through the disk-backed table like any other.
    s.every(700, () => disk.update(orders(20, Math.floor(Math.random() * 1000))));
    return s.dispose();
  }

  const out = output(el, 190);
  const totals = async (t: typeof disk): Promise<unknown> => {
    const v = await t.view(QUERY);
    const json = await v.to_json();
    await v.delete();
    return json;
  };
  const compare = async (what: string): Promise<void> => {
    const [m, d] = [await totals(memory), await totals(disk)];
    out.set(`${what}\nin memory: size ${await memory.size()}\non disk:   size ${await disk.size()}\nidentical grouped results: ${JSON.stringify(m) === JSON.stringify(d)}\n\n${show(d, 900)}`);
  };
  const bar = controlBar(el);
  button(bar, 'Update both with 300 rows', () => {
    const more = orders(300, Math.floor(Math.random() * 1e6));
    void Promise.all([memory.update(more), disk.update(more)]).then(() => compare('Updated both tables with the same 300 orders.'));
  });
  button(bar, 'Compare', () => void compare('Compared.'));
  el.prepend(bar);
  await compare(`Created with { page_to_disk: true } from an Arrow of ${data.length} orders.`);
  return s.dispose();
};

export default mount;
