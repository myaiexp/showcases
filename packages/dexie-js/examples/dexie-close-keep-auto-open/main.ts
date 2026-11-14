// db.close({ disableAutoOpen: false }) lets the next query reopen the database
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'closeauto', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('A database that can sleep.', 'db.close({ disableAutoOpen: false })');
  d.run([
    d.step('Open with data', 'Two friends are stored.', 'db.friends.bulkAdd([...])', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      out.value(db.isOpen(), 'db.isOpen()');
    }),
    d.step('Close, keep auto-open', 'The connection is released.', 'db.close({ disableAutoOpen: false })', async () => {
      lab.db.close({ disableAutoOpen: false });
      out.value(lab.db.isOpen(), 'db.isOpen()', 'warn');
    }),
    d.step('Use it', 'The query reopens it by itself.', 'await db.friends.toArray()', async () => {
      const rows = await lab.db.table('friends').toArray();
      lab.show('friends', [ID, 'name']);
      out.value(lab.db.isOpen(), `isOpen() is back, ${rows.length} rows read`);
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
