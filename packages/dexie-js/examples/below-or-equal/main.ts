// BelowOrEqual: the limit itself counts
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [{ key: 'limit', label: 'belowOrEqual', kind: 'number', value: 21 }],
    presets: [
      { label: '21 or less', values: { limit: 21 } },
      { label: '50 or less', values: { limit: 50 } },
      { label: '20 or less', values: { limit: 20 } },
    ],
    describe: (a) => ({
      say: `${a.limit} or younger.`,
      code: `where('age').belowOrEqual(${a.limit})`,
    }),
    query: (friends, a) => friends.where('age').belowOrEqual(a.limit).toArray(),
  });

export default mount;
