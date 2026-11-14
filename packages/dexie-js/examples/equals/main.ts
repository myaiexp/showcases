// Equals: an exact, case-sensitive match
import type { Mount } from '@/types.ts';
import { CASE_NAMES } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: CASE_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'name', label: 'equals', kind: 'text', value: 'David' }],
    presets: [
      { label: 'David', values: { name: 'David' } },
      { label: 'david (lower case)', values: { name: 'david' } },
      { label: 'Sara', values: { name: 'Sara' } },
      { label: 'Dav', values: { name: 'Dav' } },
    ],
    describe: (a) => ({
      say: `Exactly '${a.name}'.`,
      code: `where('name').equals('${a.name}')`,
    }),
    query: (friends, a) => friends.where('name').equals(a.name).toArray(),
  });

export default mount;
