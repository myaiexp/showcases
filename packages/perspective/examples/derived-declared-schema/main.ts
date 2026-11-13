// A derived Table fixes its columns; declare them for later splits
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';
import { rng } from '../../shared/data.ts';

const REGIONS = ['North', 'South', 'East', 'West'];
const r = rng(12);
const day = (d: string) => REGIONS.map((region) => ({ Region: region, Day: d, Sales: Math.round(200 + r() * 800) }));

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const source = s.own(await client.table({ Region: 'string', Day: 'string', Sales: 'float' }, { name: uniqueName('daily') }));
  await source.update([...day('Mon'), ...day('Tue')]);

  const config = { group_by: ['Region'], split_by: ['Day'], columns: ['Sales'], aggregates: { Sales: 'sum' as const }, group_rollup_mode: 'flat' as const };
  const viewA = s.own(await source.view(config));
  const viewB = s.own(await source.view(config));
  // Without a schema, the derived Table has a column for each Day the View has right now.
  const inferred = s.own(await client.table(viewA as never, { name: uniqueName('inferred') }));
  // derived_table.md: `schema` declares the columns up front, so a Wednesday column exists
  // before any Wednesday row does. It stays null until the values arrive.
  const declared = s.own(
    await client.table(viewB as never, {
      name: uniqueName('declared'),
      schema: { Region: 'string', 'Mon|Sales': 'float', 'Tue|Sales': 'float', 'Wed|Sales': 'float' },
    }),
  );

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  for (const t of [inferred, declared]) {
    const viewer = createViewer(el, ctx, { height: 220, previewHeight: 96, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table: await t.get_name(), plugin: 'Datagrid', settings: false });
    s.ownViewer(viewer);
  }

  const wednesday = () => source.update(day('Wed'));
  const reset = () => source.replace([...day('Mon'), ...day('Tue')]);
  if (ctx.preview) {
    let i = 0;
    s.every(2200, () => (i++ % 2 ? reset() : wednesday()));
    return s.dispose();
  }

  const out = output(el, 150);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\ninferred columns: ${show(Object.keys(await inferred.schema()))}\ndeclared columns: ${show(Object.keys(await declared.schema()))}\nsource size(): ${await source.size()}`);
  };
  const bar = controlBar(el);
  button(bar, 'Wednesday arrives', () => void wednesday().then(() => report('source.update(Wednesday rows): only the declared table has a column to put them in')));
  button(bar, 'Reset to Mon and Tue', () => void reset().then(() => report('source.replace(Monday and Tuesday)')));
  el.prepend(bar);
  await report('Left: columns inferred from the View. Right: columns declared with the schema option.');
  return s.dispose();
};

export default mount;
