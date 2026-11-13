// A joined Table recomputes on either source update; joins chain
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const COLORS = ['red', 'blue', 'green', 'gold'];
const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // Three tables sharing the key `id`. With an index on id, each key appears once per table.
  const prices = s.own(await client.table([{ id: 1, price: 10 }], { name: uniqueName('prices'), index: 'id' }));
  const stock = s.own(await client.table([{ id: 2, stock: 5 }], { name: uniqueName('stock'), index: 'id' }));
  const labels = s.own(await client.table([{ id: 1, label: 'Widget' }], { name: uniqueName('labels'), index: 'id' }));
  // reactivity.md: updates to either source recompute the join; chaining a join onto a join
  // propagates updates through the whole chain. Start with no matching keys at all.
  const priced = s.own(await client.join(prices, stock, 'id', { name: uniqueName('priced') }));
  const full = s.own(await client.join(priced, labels, 'id', { join_type: 'left', name: uniqueName('full') }));

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  for (const t of ctx.preview ? [full] : [priced, full]) {
    const viewer = createViewer(el, ctx, { height: 220, previewHeight: 190, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table: await t.get_name(), plugin: 'Datagrid', settings: false });
    s.ownViewer(viewer);
  }

  let id = 1;
  const addStock = () => stock.update([{ id: ++id % 5 || 1, stock: Math.round(Math.random() * 90) }]);
  const addPrice = () => prices.update([{ id: ++id % 5 || 1, price: Math.round(Math.random() * 900) / 10 }]);
  const addLabel = () => labels.update([{ id: ++id % 5 || 1, label: COLORS[id % COLORS.length]! }]);
  if (ctx.preview) {
    let i = 0;
    s.every(700, () => [addStock, addPrice, addLabel][i++ % 3]!());
    return s.dispose();
  }

  const out = output(el, 100);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nprices: ${await prices.size()} rows, stock: ${await stock.size()}, labels: ${await labels.size()}\nprices JOIN stock (inner): ${await priced.size()} rows\n... LEFT JOIN labels: ${await full.size()} rows`);
  };
  const bar = controlBar(el);
  button(bar, 'Update prices', () => void addPrice().then(() => report('prices.update(): new keys may now match')));
  button(bar, 'Update stock', () => void addStock().then(() => report('stock.update()')));
  button(bar, 'Update labels', () => void addLabel().then(() => report('labels.update(): flows through the chained join')));
  el.prepend(bar);
  await report('Left: prices JOIN stock. Right: that join, left-joined with labels. Only id 1 and 2 exist so far, in different tables.');
  return s.dispose();
};

export default mount;
