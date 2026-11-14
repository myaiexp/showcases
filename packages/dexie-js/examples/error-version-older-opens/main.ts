// VersionError no longer happens: an older version opens what is installed
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const stores = { friends: '++id, name' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'older', title: 'what the database says' });
  const { lab, out } = d;
  d.say.set('Version 2 gets installed first.', 'db.version(2).stores({ ... })');
  d.run([
    d.step('Install version 2', 'The database is now at version 2.', 'db.version(2).stores(...)', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(2).stores(stores));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.value(db.backendDB().version, 'installed version, x10 inside IndexedDB');
    }),
    d.step('Ask for version 1', 'Older than installed: it just opens.', 'db.version(1).stores(...)', async () => {
      const db = await lab.open((x) => x.version(1).stores(stores));
      lab.show('friends', [ID, 'name']);
      out.value('opened', `no VersionError; installed is still ${db.backendDB().version}`);
    }, 2600),
  ]);
  return d.stage.dispose;
};

export default mount;
