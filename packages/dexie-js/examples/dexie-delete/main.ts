// db.delete() removes the database and its rows; open() makes a new empty one
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'delete', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('A database with two friends.', 'db.friends.bulkAdd([...])');
  d.run([
    d.step('Open with data', 'Two friends are stored.', 'db.friends.bulkAdd([...])', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name)');
    }),
    d.step('delete()', 'The whole database is gone.', 'await db.delete()', async () => {
      lab.hide();
      await lab.db.delete();
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name)', 'bad');
    }),
    d.step('Use it', 'The instance now refuses.', 'await db.friends.toArray()', async () => {
      const { error } = await tryIt(() => lab.db.table('friends').toArray());
      out.value(error?.name ?? 'read', 'deleted databases do not come back by themselves', 'bad');
    }),
    d.step('open() again', 'A brand new, empty database.', 'await db.open()', async () => {
      await lab.db.open();
      lab.show('friends', [ID, 'name']);
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name), 0 rows');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
