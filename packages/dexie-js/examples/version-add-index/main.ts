// Adding an index in a new version needs no upgrader: old rows are indexed on the way
import type { Mount } from '@/types.ts';
import { schemaLines, tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const SHOE = { field: 'shoeSize', label: 'shoe', width: '3.4em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'addindex', title: 'installed schema' });
  const { lab, out, stage } = d;
  d.say.set('Version 1 indexes only name.', "stores({ friends: '++id, name' })");
  const q = () => lab.db.table('friends').where('shoeSize').between(7, 9, true, true).toArray();
  d.run([
    d.step('Install version 1', 'shoeSize is stored, not indexed.', "version(1).stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      lab.show('friends', [ID, 'name', SHOE]);
      await db.table('friends').bulkAdd([
        { name: 'Josephine', shoeSize: 7 },
        { name: 'Per', shoeSize: 10 },
        { name: 'Simon', shoeSize: 4 },
        { name: 'Sara', shoeSize: 8 },
      ]);
      out.list(schemaLines(db));
    }),
    d.step('Search by shoe size', 'Not indexed yet: the search is refused.', "where('shoeSize').between(7, 9, true, true)", async () => {
      const { error } = await tryIt(q);
      out.value(error?.name ?? 'found', error?.message.slice(0, 60), 'bad');
    }),
    d.step('Ship version 2', 'Add shoeSize to the list. That is all.', "version(2).stores({ friends: '++id, name, shoeSize' })", async () => {
      const db = await lab.open((x) => x.version(2).stores({ friends: '++id, name, shoeSize' }));
      lab.show('friends', [ID, 'name', SHOE]);
      await stage.wait(300);
      out.list(schemaLines(db));
    }),
    d.step('Search again', 'The existing rows are searchable now.', "where('shoeSize').between(7, 9, true, true)", async () => {
      const rows = await q();
      out.list(rows.map((r) => `${r.name} (${r.shoeSize})`));
    }),
  ]);
  return stage.dispose;
};

export default mount;
