// table.clear() and table.replace(): the Table and its views survive new data
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const COLUMNS = ['Order ID', 'Region', 'Category', 'Sales', 'Profit'];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // Three datasets with the same schema; replace() coerces each to the existing schema.
  const sets = [orders(40, 1), orders(40, 2), orders(40, 3)];
  const table = s.own(await client.table(sets[0]!, { name: uniqueName('replace') }));

  const viewer = createViewer(el, ctx, { height: 330 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns: ctx.preview ? ['Region', 'Sales', 'Profit'] : COLUMNS, group_by: ctx.preview ? ['Region'] : [], settings: false });
  s.ownViewer(viewer);

  let i = 0;
  if (ctx.preview) {
    // clear() empties the table, replace() fills it again; the viewer's view is never rebuilt.
    s.every(1800, async () => {
      i += 1;
      if (i % 3 === 0) await table.clear();
      else await table.replace(sets[i % 3]!);
    });
    return s.dispose();
  }

  const out = output(el, 70);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nsize(): ${await table.size()}`);
  };
  const bar = controlBar(el);
  button(bar, 'clear()', () => void table.clear().then(() => report('table.clear(): every row removed, schema and views kept')));
  button(bar, 'replace(next dataset)', () => {
    i += 1;
    void table.replace(sets[i % 3]!).then(() => report(`table.replace(orders seed ${(i % 3) + 1}): cleared, then updated with the new rows`));
  });
  button(bar, 'update(): append 40 more', () => {
    i += 1;
    void table.update(sets[i % 3]!).then(() => report('table.update(): appended, since this Table has no index'));
  });
  el.prepend(bar);
  await report('Created from 40 orders.');
  return s.dispose();
};

export default mount;
