// AnyOf: a list of exact values
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS, words } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [{ key: 'names', label: 'anyOf names', kind: 'text', value: 'Per, Sara', width: 160 }],
    presets: [
      { label: 'Per and Sara', values: { names: 'Per, Sara' } },
      { label: 'Simon, Arnold, Zed', values: { names: 'Simon, Arnold, Zed' } },
      { label: 'Nobody', values: { names: 'Zed' } },
    ],
    describe: (a) => ({
      say: `Called ${words(a.names).join(' or ')}.`,
      code: `where('name').anyOf([${words(a.names).map((n) => `'${n}'`).join(', ')}])`,
    }),
    query: (friends, a) => friends.where('name').anyOf(words(a.names)).toArray(),
  });

export default mount;
