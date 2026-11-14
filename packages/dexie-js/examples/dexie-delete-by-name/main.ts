// Dexie.delete(name) deletes a database by name, even one that is open
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'bynamedel', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('Delete knowing only the name.', 'Dexie.delete(name)');
  d.run([
    d.step('Open with data', 'The database is open and holds two friends.', 'db.friends.bulkAdd([...])', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.list([`exists: ${await Dexie.exists(lab.name)}`, `isOpen: ${db.isOpen()}`]);
    }),
    d.step('Dexie.delete(name)', 'No instance needed: just the name.', 'await Dexie.delete(name)', async () => {
      lab.hide();
      await Dexie.delete(lab.name);
      out.list([`exists: ${await Dexie.exists(lab.name)}`, `isOpen: ${lab.db.isOpen()}`], 'bad');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
