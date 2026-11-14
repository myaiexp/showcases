// db.table(name) finds a table from a string
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'tablename', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('Two tables, picked by name.', 'db.table("friends")');
  d.run([
    d.step('Open with two tables', 'Friends and pets are stored.', "stores({ friends: ..., pets: ... })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name', pets: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      await db.table('pets').bulkAdd([{ name: 'Rex' }, { name: 'Mimi' }, { name: 'Bob' }]);
      lab.show('friends', [ID, 'name']);
      out.value('friends', 'db.table("friends")');
    }),
    d.step('table("pets")', 'The name is just a string.', 'await db.table("pets").toArray()', async () => {
      lab.show('pets', [ID, 'name']);
      const rows = await lab.db.table('pets').toArray();
      out.value('pets', `db.table("pets"): ${rows.length} rows`);
    }),
    d.step('table("birds")', 'A table that was never declared.', 'db.table("birds")', async () => {
      const { error } = await tryIt(() => lab.db.table('birds'));
      out.value(error?.name ?? 'found', 'no such table in this database', 'bad');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
