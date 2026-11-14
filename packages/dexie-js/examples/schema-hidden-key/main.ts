// "++" alone: the table numbers rows in a key that is not a property of the row
import type { Mount } from '@/types.ts';
import { schemaLines, versionDemo } from '../../shared/era.ts';
import type { Row } from '../../shared/table-view.ts';

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'hiddenkey', title: 'returned' });
  const { lab, out } = d;
  d.say.set('A key that lives beside the row.', "stores({ cars: '++, name' })");
  // The grid reads each row together with its hidden key.
  const withKeys = async (): Promise<Row[]> => {
    const t = lab.db.table('cars');
    const keys = await t.toCollection().primaryKeys();
    return (await t.toArray()).map((r, i) => ({ key: keys[i], ...r }));
  };
  d.run([
    d.step('Declare "++"', 'No field name: the key is hidden.', "stores({ cars: '++, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ cars: '++, name' }));
      lab.show('cars', [{ field: 'key', width: '3em' }, 'name'], { read: withKeys, key: 'key', badges: false });
      out.list(schemaLines(db));
    }),
    d.step('Add two cars', 'add() hands back the hidden key.', "await db.cars.add({ name: 'Volvo' })", async () => {
      const t = lab.db.table('cars');
      const keys = [await t.add({ name: 'Volvo' }), await t.add({ name: 'Saab' })];
      out.list(keys.map((k) => `key ${k}`));
    }),
    d.step('Read the rows', 'The rows themselves carry no id.', 'await db.cars.toArray()', async () => {
      out.list((await lab.db.table('cars').toArray()).map((r) => JSON.stringify(r)));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
