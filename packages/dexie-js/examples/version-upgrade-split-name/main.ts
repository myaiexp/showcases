// upgrade(): a new version rewrites every stored row, here splitting name in two
import type { Mount } from '@/types.ts';
import { schemaLines, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'split', title: 'installed schema' });
  const { lab, out } = d;
  d.say.set('Version 1 keeps one name field.', "stores({ friends: '++id, name' })");
  d.run([
    d.step('Install version 1', 'Three people, one name field each.', "version(1).stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      lab.show('friends', [ID, 'name']);
      await db.table('friends').bulkAdd([{ name: 'Josephine Berg' }, { name: 'Per Persson' }, { name: 'Simon Ek' }]);
      out.list(schemaLines(db));
    }),
    d.step('Ship version 2', 'upgrade() rewrites every row once.', 'version(2).stores(...).upgrade(tx => ...modify())', async () => {
      const db = await lab.open((x) =>
        x.version(2).stores({ friends: '++id, firstName, lastName' }).upgrade((tx) =>
          tx.table('friends').toCollection().modify((friend) => {
            const names = friend.name.split(' ');
            friend.firstName = names.shift();
            friend.lastName = names.join(' ');
            delete friend.name;
          }),
        ),
      );
      lab.show('friends', [ID, 'firstName', 'lastName']);
      out.list(schemaLines(db));
    }),
    d.step('Search the new field', 'The new index works on upgraded rows.', "where('lastName').equals('Persson')", async () => {
      const rows = await lab.db.table('friends').where('lastName').equals('Persson').toArray();
      out.list(rows.map((r) => `${r.firstName} ${r.lastName}`));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
