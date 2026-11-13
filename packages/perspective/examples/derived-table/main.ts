// client.table(view): a read-only Table of a flat group_by View
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const source = s.own(await client.table(orders(200, 1), { name: uniqueName('source') }));
  // derived_table.md: group_rollup_mode "flat" keeps the leaves only, so the derived Table
  // has one row per group and no subtotal rows to double count.
  const view = s.own(
    await source.view({ group_by: ['Region', 'Category'], columns: ['Sales', 'Profit'], aggregates: { Sales: 'sum', Profit: 'sum' }, group_rollup_mode: 'flat' }),
  );
  // client.table() is typed without View; derived_table.md documents it, so the cast is only for TS.
  const totals = s.own(await client.table(view as never, { name: uniqueName('totals') }));

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  const mk = async (table: typeof source, label: string, config: object): Promise<void> => {
    const viewer = createViewer(el, ctx, { height: 270, previewHeight: 96, parent: holder });
    viewer.setAttribute('title', label);
    await viewer.load(client);
    await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', settings: false, ...config });
    s.ownViewer(viewer);
  };
  await mk(source, 'source', { columns: ['Order ID', 'Region', 'Category', 'Sales', 'Profit'] });
  await mk(totals, 'derived', {});

  let seed = 100;
  const more = () => source.update(orders(ctx.preview ? 12 : 40, seed++));
  if (ctx.preview) {
    s.every(900, more);
    return s.dispose();
  }

  const out = output(el, 150);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nsource size(): ${await source.size()}    derived size(): ${await totals.size()}\nderived schema(): ${show(await totals.schema(), 500)}\nderived get_index(): ${show(await totals.get_index())}`);
  };
  const bar = controlBar(el);
  button(bar, 'Add 40 orders to the source', () => void more().then(() => report('source.update(): the derived table followed in the same cycle')));
  button(bar, 'Try derived.update()', () => {
    totals
      .update([{ Region: 'North', Category: 'Furniture', Sales: 1 }])
      .then(() => report('update accepted?'))
      .catch((e: unknown) => out.set(`The derived table is read-only: ${String(e)}`));
  });
  el.prepend(bar);
  await report('Left: source orders. Right: client.table(view) of the flat Region/Category totals.');
  return s.dispose();
};

export default mount;
