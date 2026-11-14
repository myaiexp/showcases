// Above: friends older than a limit
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [{ key: 'limit', label: 'above', kind: 'number', value: 21 }],
    presets: [
      { label: 'Above 21', values: { limit: 21 } },
      { label: 'Above 50', values: { limit: 50 } },
      { label: 'Above 4', values: { limit: 4 } },
    ],
    describe: (a) => ({
      say: `Older than ${a.limit}.`,
      code: `where('age').above(${a.limit})`,
    }),
    query: (friends, a) => friends.where('age').above(a.limit).toArray(),
  });

export default mount;
