// Leaving an index out of a new version drops the index but keeps the data
import type { Mount } from '@/types.ts';
import type { TableView } from '../../shared/table-view.ts';
import { schemaLines, tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const AGE = { field: 'age', width: '3.4em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'dropindex', title: 'installed schema' });
  const { lab, out, stage } = d;
  d.say.set('Version 1 indexes name and age.', "stores({ friends: '++id, name, age' })");
  let view: TableView | null = null;
  const q = () => lab.db.table('friends').where('age').above(40).toArray();
  d.run([
    d.step('Install version 1', 'The age badge says: indexed.', "version(1).stores({ friends: '++id, name, age' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name, age' }));
      view = lab.show('friends', [ID, 'name', AGE]);
      await db.table('friends').bulkAdd([{ name: 'Josephine', age: 21 }, { name: 'Per', age: 75 }, { name: 'Sara', age: 50 }]);
      out.list(schemaLines(db));
    }),
    d.step('Search over 40', 'With the index, where() works.', "where('age').above(40)", async () => {
      const rows = await q();
      view?.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
    d.step('Ship version 2', 'Leave age out: the index goes.', "version(2).stores({ friends: '++id, name' })", async () => {
      const db = await lab.open((x) => x.version(2).stores({ friends: '++id, name' }));
      lab.show('friends', [ID, 'name', AGE]);
      await stage.wait(300);
      out.list(schemaLines(db));
    }),
    d.step('Search again', 'The ages are still stored, but not searchable.', "where('age').above(40)", async () => {
      const { error } = await tryIt(q);
      out.value(error?.name ?? 'found', error?.message.slice(0, 60), 'bad');
    }),
  ]);
  return stage.dispose;
};

export default mount;
