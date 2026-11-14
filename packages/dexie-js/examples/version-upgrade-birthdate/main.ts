// upgrade(): turn a stored age into a birthdate, which does not go stale
import type { Mount } from '@/types.ts';
import { schemaLines, versionDemo } from '../../shared/era.ts';

const YEAR = 365 * 24 * 60 * 60 * 1000;
const ID = { field: 'id', width: '2.6em' };
const day = (v: unknown): string => (v instanceof Date ? v.toISOString().slice(0, 10) : '');

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'birth', title: 'installed schema' });
  const { lab, out } = d;
  d.say.set('Version 1 stores an age.', "stores({ friends: '++id, name, age' })");
  d.run([
    d.step('Install version 1', 'An age is wrong a year later.', "version(1).stores({ friends: '++id, name, age' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name, age' }));
      lab.show('friends', [ID, 'name', { field: 'age', width: '3.4em' }]);
      await db.table('friends').bulkAdd([{ name: 'David', age: 52 }, { name: 'Ylva', age: 50 }, { name: 'Jesper', age: 35 }]);
      out.list(schemaLines(db));
    }),
    d.step('Ship version 2', 'Every age becomes a birthdate.', 'version(2).stores(...).upgrade(...)', async () => {
      const db = await lab.open((x) =>
        x.version(2).stores({ friends: '++id, name, birthdate' }).upgrade((tx) =>
          tx.table('friends').toCollection().modify((friend) => {
            friend.birthdate = new Date(Date.now() - friend.age * YEAR);
            delete friend.age;
          }),
        ),
      );
      lab.show('friends', [ID, 'name', { field: 'birthdate', width: '6.4em', format: day }]);
      out.list(schemaLines(db));
    }),
    d.step('Oldest first', 'birthdate is indexed, so sorting is cheap.', "orderBy('birthdate').toArray()", async () => {
      const rows = await lab.db.table('friends').orderBy('birthdate').toArray();
      out.list(rows.map((r) => `${r.name} ${day(r.birthdate)}`));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
