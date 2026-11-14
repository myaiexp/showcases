// Multi-entry index: anyOf can return a friend twice
import type { Mount } from '@/types.ts';
import { TAGGED, words } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, *tags',
    rows: TAGGED,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'tags', width: '1.6fr' }],
    fields: [{ key: 'tags', label: 'anyOf tags', kind: 'text', value: 'sports, cars', width: 150 }],
    presets: [
      { label: 'sports or cars', values: { tags: 'sports, cars' } },
      { label: 'pets or close-friend', values: { tags: 'pets, close-friend' } },
      { label: 'cars', values: { tags: 'cars' } },
    ],
    show: (row) => String(row.name),
    hint: 'Look for a name that appears twice in the answer list.',
    describe: (a) => ({
      say: 'Both tags: listed twice.',
      code: `where('tags').anyOf(${JSON.stringify(words(a.tags))})`,
    }),
    query: (friends, a) => friends.where('tags').anyOf(words(a.tags)).toArray(),
  });

export default mount;
