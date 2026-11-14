// NotEqual: everything else, except rows with no valid key
import type { Mount } from '@/types.ts';
import { SHOE_SIZES, keyList } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    stores: 'id, shoeSize',
    rows: SHOE_SIZES,
    columns: [{ field: 'id', width: '2.6em' }, 'shoeSize'],
    fields: [{ key: 'size', label: 'notEqual', kind: 'text', value: '10' }],
    presets: [
      { label: 'Not 10', values: { size: '10' } },
      { label: 'Not 9', values: { size: '9' } },
      { label: 'Not "abc"', values: { size: 'abc' } },
    ],
    show: (row) => `id ${row.id}: ${String(row.shoeSize)}`,
    describe: (a) => ({
      say: 'Rows 4 and 5 are never found.',
      code: `where('shoeSize').notEqual(${JSON.stringify(keyList(a.size)[0] ?? '')})`,
    }),
    query: (people, a) => people.where('shoeSize').notEqual(keyList(a.size)[0] ?? '').toArray(),
  });

export default mount;
