// An empty Table built from a schema, then fed rows the schema coerces
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

// Each entry is one update() the schema has to make sense of.
const DAY = 86_400_000;
const rowsFor = (n: number): Array<[string, Record<string, unknown>[]]> => [
  ['typed values', [{ x: n, y: `row ${n}`, z: n % 2 === 0, when: '2025-03-01', at: '2025-03-01T09:30:00' }]],
  ['a number into the string column y', [{ x: n, y: 1234, z: true, when: '2025-03-02', at: '2025-03-02T10:00:00' }]],
  ['date as epoch milliseconds, datetime from a JS Date', [{ x: n, y: 'ms', z: false, when: Date.UTC(2025, 2, 3) + DAY, at: new Date(Date.UTC(2025, 2, 3, 12)) }]],
  ['a partial row: z and at are missing', [{ x: n, y: 'partial', when: '2025-03-05' }]],
  ['nulls unset values', [{ x: n, y: null, z: null, when: null, at: '2025-03-06T01:02:03' }]],
];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // constructing_schema.md: pass a schema instead of data, and the Table starts empty.
  const table = s.own(
    await client.table(
      { x: 'integer', y: 'string', z: 'boolean', when: 'date', at: 'datetime' },
      { name: uniqueName('schema') },
    ),
  );
  // Inference is the other way in: with no schema the same 1234 would be an integer.
  const inferred = s.own(await client.table([{ x: 1234, y: 'abc' }], { name: uniqueName('inferred') }));

  const viewer = createViewer(el, ctx, { height: 280 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', settings: false });
  s.ownViewer(viewer);

  let n = 0;
  if (ctx.preview) {
    s.every(900, async () => {
      if (n % 10 === 9) await table.clear();
      await table.update(rowsFor(n)[n % 5]![1]);
      n += 1;
    });
    return s.dispose();
  }

  const out = output(el, 150);
  const describe = async (note: string): Promise<void> => {
    out.set(
      `${note}\nsize(): ${await table.size()}\nschema(): ${show(await table.schema())}\n\n` +
        `Inferred from [{ x: 1234, y: 'abc' }] instead: ${show(await inferred.schema())}`,
    );
  };
  const bar = controlBar(el);
  for (const [label] of rowsFor(0)) {
    button(bar, label, () => {
      n += 1;
      const [note, rows] = rowsFor(n).find(([l]) => l === label)!;
      void table.update(rows).then(() => describe(`update() with ${note}`));
    });
  }
  el.prepend(bar);
  await describe('Created from a schema; no rows yet.');
  return s.dispose();
};

export default mount;
