// db.delete({ disableAutoOpen: false }): wipe, then rebuild on next use
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'recreate', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('A Start over button for a database.', 'db.delete({ disableAutoOpen: false })');
  d.run([
    d.step('Open with data', 'Two friends are stored.', 'db.friends.bulkAdd([...])', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name)');
    }),
    d.step('Delete, keep auto-open', 'Everything is erased.', 'await db.delete({ disableAutoOpen: false })', async () => {
      lab.hide();
      await lab.db.delete({ disableAutoOpen: false });
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name)', 'bad');
    }),
    d.step('Add a friend', 'The first call builds it again.', "await db.friends.add({ name: 'Sara' })", async () => {
      await lab.db.table('friends').add({ name: 'Sara' });
      lab.show('friends', [ID, 'name']);
      out.value(await Dexie.exists(lab.name), 'Dexie.exists(name), 1 row');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
