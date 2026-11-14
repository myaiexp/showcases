// EqualsIgnoreCase: David, david and DAVID are one name
import type { Mount } from '@/types.ts';
import { CASE_NAMES } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: CASE_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'name', label: 'equalsIgnoreCase', kind: 'text', value: 'david' }],
    presets: [
      { label: 'david', values: { name: 'david' } },
      { label: 'DAVID', values: { name: 'DAVID' } },
      { label: 'sArA', values: { name: 'sArA' } },
      { label: 'dav', values: { name: 'dav' } },
    ],
    describe: (a) => ({
      say: `'${a.name}' in any casing.`,
      code: `where('name').equalsIgnoreCase('${a.name}')`,
    }),
    query: (friends, a) => friends.where('name').equalsIgnoreCase(a.name).toArray(),
  });

export default mount;
