// StartsWithIgnoreCase: a prefix in any casing
import type { Mount } from '@/types.ts';
import { PREFIX_NAMES } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: PREFIX_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'prefix', label: 'startsWithIgnoreCase', kind: 'text', value: 'sa' }],
    presets: [
      { label: 'sa', values: { prefix: 'sa' } },
      { label: 'S', values: { prefix: 'S' } },
      { label: 'PER', values: { prefix: 'PER' } },
    ],
    describe: (a) => ({
      say: `'${a.prefix}' finds Sam, Sara and sara alike.`,
      code: `where('name').startsWithIgnoreCase('${a.prefix}')`,
    }),
    query: (friends, a) => friends.where('name').startsWithIgnoreCase(a.prefix).toArray(),
  });

export default mount;
