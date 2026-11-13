// A derived Table with a filter on an aggregate: SQL's HAVING, over live data
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const source = s.own(await client.table(orders(800, 5), { name: uniqueName('source') }));
  // derived_table.md § Filtering on an aggregate: flat totals, then a View of those totals.
  const totalsView = s.own(
    await source.view({ group_by: ['Category', 'Sub-Category'], columns: ['Sales'], aggregates: { Sales: 'sum' }, group_rollup_mode: 'flat' }),
  );
  // client.table() is typed without View; derived_table.md documents it, so the cast is for TS only.
  const derived = s.own(await client.table(totalsView as never, { name: uniqueName('totals') }));
  const THRESHOLDS = [0, 50_000, 80_000, 100_000, 120_000];
  let threshold = ctx.preview ? THRESHOLDS[2]! : THRESHOLDS[1]!;
  let large = await derived.view({ filter: [['Sales', '>', threshold]] });

  const viewer = createViewer(el, ctx, { height: 300 });
  await viewer.load(client);
  await viewer.restore({ table: await derived.get_name(), plugin: 'Datagrid', filter: [['Sales', '>', threshold]], sort: [['Sales', 'desc']], settings: false });
  s.ownViewer(viewer);

  let seed = 50;
  const more = () => source.update(orders(30, seed++));
  const out = ctx.preview ? null : output(el, 130);
  const show2 = async (): Promise<void> => {
    out?.set(`derived.view({ filter: [["Sales", ">", ${threshold}]] })\ngroups passing: ${await large.num_rows()} of ${await derived.size()}\n${(await large.to_json()).slice(0, 8).map((r) => show(r, 120).replace(/\s+/g, ' ')).join('\n')}`);
  };
  const retarget = async (t: number): Promise<void> => {
    threshold = t;
    await large.delete();
    large = await derived.view({ filter: [['Sales', '>', t]] });
    await viewer.restore({ filter: [['Sales', '>', t]] });
    await show2();
  };
  s.later(async () => {
    await large.delete();
  });

  if (ctx.preview) {
    // Streaming orders push groups over the threshold, and they appear in the filtered grid.
    s.every(700, more);
    return s.dispose();
  }
  const bar = controlBar(el);
  const sel = document.createElement('label');
  sel.textContent = 'Sales total above ';
  const range = document.createElement('select');
  for (const t of THRESHOLDS) range.add(new Option(t.toLocaleString('en'), String(t)));
  range.value = String(threshold);
  range.addEventListener('change', () => void retarget(Number(range.value)));
  sel.append(range);
  bar.append(sel);
  const add = document.createElement('button');
  add.textContent = 'Add 30 orders';
  add.addEventListener('click', () => void more().then(show2));
  bar.append(add);
  el.prepend(bar);
  await show2();
  return s.dispose();
};

export default mount;
