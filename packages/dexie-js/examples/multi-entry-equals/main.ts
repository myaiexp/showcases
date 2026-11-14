// Multi-entry index: equals finds a tag inside lists
import type { Mount } from '@/types.ts';
import { TAGGED } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    // The * makes every item of the tags list its own index entry.
    stores: '++id, name, *tags',
    rows: TAGGED,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'tags', width: '1.6fr' }],
    fields: [
      { key: 'tag', label: 'tag', kind: 'select', value: 'sports', options: ['sports', 'cars', 'pets', 'close-friend'] },
    ],
    presets: [
      { label: 'sports', values: { tag: 'sports' } },
      { label: 'close-friend', values: { tag: 'close-friend' } },
      { label: 'pets', values: { tag: 'pets' } },
    ],
    show: (row) => `${String(row.name)} ${JSON.stringify(row.tags)}`,
    describe: (a) => ({
      say: `Tag list contains '${a.tag}'.`,
      code: `where('tags').equals('${a.tag}')`,
    }),
    query: (friends, a) => friends.where('tags').equals(a.tag).toArray(),
  });

export default mount;
