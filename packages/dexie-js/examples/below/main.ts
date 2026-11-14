// Below: friends younger than a limit
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [{ key: 'limit', label: 'below', kind: 'number', value: 21 }],
    presets: [
      { label: 'Below 21', values: { limit: 21 } },
      { label: 'Below 50', values: { limit: 50 } },
      { label: 'Below 5', values: { limit: 5 } },
    ],
    describe: (a) => ({
      say: `Younger than ${a.limit}.`,
      code: `where('age').below(${a.limit})`,
    }),
    query: (friends, a) => friends.where('age').below(a.limit).toArray(),
  });

export default mount;
