// NoneOf: everything except some values, but only indexed ones
import type { Mount } from '@/types.ts';
import { SHOE_SIZES, keyList } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    stores: 'id, shoeSize',
    rows: SHOE_SIZES,
    columns: [{ field: 'id', width: '2.6em' }, 'shoeSize'],
    fields: [{ key: 'sizes', label: 'noneOf', kind: 'text', value: '10, 11' }],
    presets: [
      { label: 'Not 10 or 11', values: { sizes: '10, 11' } },
      { label: 'Not 9', values: { sizes: '9' } },
      { label: 'Not "abc"', values: { sizes: 'abc' } },
      { label: 'Exclude nothing', values: { sizes: '' } },
    ],
    show: (row) => `id ${row.id}: ${String(row.shoeSize)}`,
    describe: (a) => ({
      say: 'Rows 4 and 5 can never match.',
      code: `where('shoeSize').noneOf([${keyList(a.sizes).map((k) => JSON.stringify(k)).join(', ')}])`,
    }),
    query: (people, a) => people.where('shoeSize').noneOf(keyList(a.sizes)).toArray(),
  });

export default mount;
