// StartsWith: names beginning with some letters
import type { Mount } from '@/types.ts';
import { PREFIX_NAMES } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: PREFIX_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'prefix', label: 'startsWith', kind: 'text', value: 'Sa' }],
    presets: [
      { label: 'Sa', values: { prefix: 'Sa' } },
      { label: 'S', values: { prefix: 'S' } },
      { label: 'sa (lower case)', values: { prefix: 'sa' } },
      { label: 'Per', values: { prefix: 'Per' } },
    ],
    describe: (a) => ({
      say: `Begins with '${a.prefix}', case matters.`,
      code: `where('name').startsWith('${a.prefix}')`,
    }),
    query: (friends, a) => friends.where('name').startsWith(a.prefix).toArray(),
  });

export default mount;
