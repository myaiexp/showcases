// struct_flatten and list_flatten on nested JSON objects and arrays
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import type { Table } from '../../shared/setup.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const STRUCT = ['pivot', 'stringify', 'stringify_formatted'] as const;
const LIST = ['zip', 'cartesian', 'stringify', 'stringify_formatted'] as const;

// Objects with differing keys, plus two sibling lists per row. `zip` needs sibling lists in
// a row to be the same length, which they are.
const DATA = [
  { id: 1, s: { a: 1, b: 'x' }, tags: ['red', 'blue'], nums: [10, 20] },
  { id: 2, s: { a: 2, c: true }, tags: ['green'], nums: [30] },
  { id: 3, s: { b: 'z' }, tags: ['red', 'gold', 'teal'], nums: [40, 50, 60] },
];

// v5.9.1 behaviour that differs from loading_data.md, noted in the output box:
// - a stringified list with a pivoted struct also stringifies the struct into `s`, and the
//   pivoted s.a / s.b / s.c columns come out null;
// - a stringified struct with list_flatten "zip" keeps only each list's first element
//   instead of expanding the rows.
const note = (sf: string, lf: string): string => {
  if (sf === 'pivot' && lf.startsWith('stringify')) return '\nNote (v5.9.1): the s.* columns are null here and the whole struct is also kept as JSON text in `s`.';
  if (sf !== 'pivot' && lf === 'zip') return '\nNote (v5.9.1): lists are not expanded here; each row keeps only its first element.';
  return '';
};

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // One small table per combination of the two options, built up front.
  const tables = new Map<string, Table>();
  for (const sf of STRUCT) {
    for (const lf of LIST) {
      // v5.9.1: building a table with list_flatten "cartesian" and a stringified struct
      // never finishes (the call hangs), so that pair is not offered.
      if (lf === 'cartesian' && sf !== 'pivot') continue;
      const name = uniqueName(`nested_${sf}_${lf}`);
      tables.set(`${sf}/${lf}`, s.own(await client.table(DATA, { name, struct_flatten: sf, list_flatten: lf })));
    }
  }

  const viewer = createViewer(el, ctx, { height: 300 });
  await viewer.load(client);
  s.ownViewer(viewer);
  const out = ctx.preview ? null : output(el, 190);
  let sf: string = STRUCT[0];
  let lf: string = LIST[0];

  const apply = async (): Promise<void> => {
    const table = tables.get(`${sf}/${lf}`);
    if (!table) {
      out?.set(`struct_flatten: "${sf}" with list_flatten: "cartesian" is not offered: in v5.9.1 that pair never finishes loading.`);
      return;
    }
    const columns = (await table.columns()) as string[];
    await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns, settings: false });
    if (!out) return;
    const view = await table.view();
    const cols = await view.to_columns();
    await view.delete();
    out.set(`struct_flatten: "${sf}", list_flatten: "${lf}"${note(sf, lf)}\nschema(): ${show(await table.schema())}\n\nto_columns(): ${show(cols, 1400)}`);
  };

  if (ctx.preview) {
    // The cards show the combinations that behave as documented.
    const keys = [...tables.keys()].filter((k) => !note(...(k.split('/') as [string, string])));
    let i = 0;
    await apply();
    s.every(2200, async () => {
      i = (i + 1) % keys.length;
      [sf, lf] = keys[i]!.split('/') as [string, string];
      await apply();
    });
    return s.dispose();
  }

  const bar = controlBar(el);
  select(bar, 'struct_flatten', STRUCT, (v) => void ((sf = v), apply()));
  select(bar, 'list_flatten', LIST, (v) => void ((lf = v), apply()));
  el.prepend(bar);
  await apply();
  return s.dispose();
};

export default mount;
