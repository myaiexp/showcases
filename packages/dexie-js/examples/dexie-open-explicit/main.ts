// autoOpen: false means nothing works until open() is called
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'autoopen', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('A database that must be opened by hand.', 'new Dexie(name, { autoOpen: false })');
  d.run([
    d.step('Declare it', 'autoOpen is off, so nothing opens it.', "new Dexie(name, { autoOpen: false })", async () => {
      await lab.wipe();
      const db = lab.next((x) => x.version(1).stores({ friends: '++id, name' }), { autoOpen: false });
      out.value(db.isOpen(), 'db.isOpen()', 'warn');
    }),
    d.step('Use it anyway', 'The call is refused: the database is closed.', "await db.friends.add({ name: 'Josephine' })", async () => {
      const { error } = await tryIt(() => lab.db.table('friends').add({ name: 'Josephine' }));
      out.value(error?.name ?? 'added', 'autoOpen is off, so nobody opened it', 'bad');
    }),
    d.step('Call open()', 'Now it works.', 'await db.open()', async () => {
      const db = await lab.db.open();
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.value(db.isOpen(), 'db.isOpen() after open()');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
