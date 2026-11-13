// The same six rows loaded from row JSON, column JSON, CSV, NDJSON and Arrow
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const FORMATS = ['Row JSON', 'Column JSON', 'CSV', 'NDJSON', 'Arrow'] as const;

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const rows = orders(ctx.preview ? 40 : 6).map((o) => ({
    id: o['Order ID'],
    region: o.Region,
    qty: o.Quantity,
    sales: o.Sales,
    shipped: o.Discount === 0,
  }));
  const keys = Object.keys(rows[0]!) as Array<keyof (typeof rows)[number]>;

  // table.md: row-oriented JSON is a list of objects, column-oriented JSON an object of lists.
  const byRow = await client.table(rows, { name: uniqueName('rows') });
  s.own(byRow);
  const byColumn = s.own(
    await client.table(Object.fromEntries(keys.map((k) => [k, rows.map((r) => r[k])])), { name: uniqueName('cols') }),
  );
  // CSV is a plain string, and its column types are inferred the way Arrow infers them.
  const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => r[k]).join(','))].join('\n');
  const byCsv = s.own(await client.table(csv, { name: uniqueName('csv') }));
  // NDJSON is one JSON object per line; `format` says how to read the string.
  const ndjson = rows.map((r) => JSON.stringify(r)).join('\n');
  const byNdjson = s.own(await client.table(ndjson, { name: uniqueName('ndjson'), format: 'ndjson' }));
  // Arrow carries its own schema, so it is read without coercion. Here it is the output
  // of an earlier table's view, serialized with to_arrow().
  const source = await byRow.view();
  const arrow = await source.to_arrow();
  await source.delete();
  const byArrow = s.own(await client.table(arrow, { name: uniqueName('arrow') }));

  const tables = [byRow, byColumn, byCsv, byNdjson, byArrow];
  const names = await Promise.all(tables.map((t) => t.get_name()));

  const viewer = createViewer(el, ctx, { height: 300 });
  await viewer.load(client);
  await viewer.restore({ table: names[0]!, plugin: 'Datagrid', settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    let i = 0;
    s.every(2200, async () => {
      i = (i + 1) % tables.length;
      await viewer.restore({ table: names[i]!, group_by: i % 2 ? ['region'] : [], columns: ['id', 'region', 'qty', 'sales'] });
    });
    return s.dispose();
  }

  const out = output(el, 170);
  const pick = async (format: string): Promise<void> => {
    const i = FORMATS.indexOf(format as (typeof FORMATS)[number]);
    await viewer.restore({ table: names[i]! });
    const t = tables[i]!;
    out.set(`${format}\nsize(): ${await t.size()}\nschema(): ${show(await t.schema())}`);
  };
  const bar = controlBar(el);
  select(bar, 'Format', FORMATS, (f) => void pick(f));
  el.prepend(bar);
  await pick(FORMATS[0]);
  return s.dispose();
};

export default mount;
