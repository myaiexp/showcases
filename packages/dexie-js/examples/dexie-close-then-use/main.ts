// db.close() leaves the database closed until open() is called again
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'close', title: 'what happened' });
  const { lab, out } = d;
  const show = (): void => void lab.show('friends', [ID, 'name']);
  d.say.set('Two friends in an open database.', "db.friends.bulkAdd([...])");
  d.run([
    d.step('Open with data', 'Two friends are stored.', 'db.friends.bulkAdd([...])', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      show();
      out.value(db.isOpen(), 'db.isOpen()');
    }),
    d.step('close()', 'Closed on purpose.', 'db.close()', async () => {
      lab.hide();
      lab.db.close();
      out.value(lab.db.isOpen(), 'db.isOpen()', 'warn');
    }),
    d.step('Use it', 'It stays closed and refuses.', 'await db.friends.toArray()', async () => {
      const { error } = await tryIt(() => lab.db.table('friends').toArray());
      out.value(error?.name ?? 'read', 'a closed database does not reopen itself', 'bad');
    }),
    d.step('open() again', 'The rows were there all along.', 'await db.open()', async () => {
      await lab.db.open();
      show();
      out.value(lab.db.isOpen(), 'db.isOpen()');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
