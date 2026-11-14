// A new version can name just the new table; the old tables and their rows stay
import type { Mount } from '@/types.ts';
import { schemaLines, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'addtable', title: 'installed schema' });
  const { lab, out } = d;
  const v1 = { friends: '++id, name' };
  d.say.set('Version 1 has one table.', "stores({ friends: '++id, name' })");
  d.run([
    d.step('Install version 1', 'Just friends, with two rows.', "version(1).stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores(v1));
      lab.show('friends', [ID, 'name']);
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      out.list(schemaLines(db));
    }),
    d.step('Ship version 2', 'Name only the new table, pets.', "version(2).stores({ pets: '++id, name, kind' })", async () => {
      // Version 1 stays declared next to version 2, so friends need not be repeated.
      const db = await lab.open((x) => {
        x.version(1).stores(v1);
        x.version(2).stores({ pets: '++id, name, kind' });
      });
      lab.show('pets', [ID, 'name', 'kind']);
      out.list(schemaLines(db));
    }),
    d.step('Use the new table', 'Both tables work, friends kept its rows.', 'db.pets.add(...), db.friends.count()', async () => {
      await lab.db.table('pets').bulkAdd([{ name: 'Tom', kind: 'cat' }, { name: 'Rex', kind: 'dog' }]);
      out.value(await lab.db.table('friends').count(), 'friends still stored');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
