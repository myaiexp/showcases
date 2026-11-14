// Non-indexable values: rows where() can never find
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    stores: 'id, shoeSize',
    rows: [
      { id: 1, shoeSize: 9 },
      { id: 2, shoeSize: null },
      { id: 3, shoeSize: false },
      { id: 4 },
      { id: 5, shoeSize: { size: 10 } },
      { id: 6, shoeSize: 'abc' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'shoeSize'],
    presets: [
      { label: 'Everything in the index', values: { op: 'all' } },
      { label: 'Anything but 9', values: { op: 'not9' } },
    ],
    show: (row) => `id ${row.id}: ${JSON.stringify(row.shoeSize) ?? 'missing'}`,
    describe: (a) =>
      a.op === 'all'
        ? { say: 'Only 9 and "abc" are in the index.', code: 'between(minKey, maxKey, true, true)' }
        : { say: 'Others are invisible, even to "not 9".', code: "where('shoeSize').notEqual(9)" },
    query: (people, a) =>
      a.op === 'all'
        ? people.where('shoeSize').between(Dexie.minKey, Dexie.maxKey, true, true).toArray()
        : people.where('shoeSize').notEqual(9).toArray(),
  });

export default mount;
