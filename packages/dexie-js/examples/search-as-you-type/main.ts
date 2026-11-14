// Search as you type with startsWithIgnoreCase
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const names = ['Per', 'Peter', 'Petra', 'Pia', 'Paula', 'Sara', 'Sam', 'Simon', 'Stella', 'Ulla', 'Arnold', 'Elna', 'Kate'];

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: names.map((name) => ({ name })),
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    view: 'filter',
    fields: [{ key: 'typed', label: 'search', kind: 'text', value: 'pe', width: 160 }],
    presets: [
      { label: 'Type "p"', values: { typed: 'p' }, hold: 1100 },
      { label: 'Type "pe"', values: { typed: 'pe' }, hold: 1100 },
      { label: 'Type "pet"', values: { typed: 'pet' }, hold: 1100 },
      { label: 'Type "s"', values: { typed: 's' }, hold: 1100 },
      { label: 'Type "SA"', values: { typed: 'SA' }, hold: 1100 },
    ],
    hint: 'Type in the box: the list narrows with every keystroke, in any casing.',
    describe: (a) => ({
      say: `Names starting '${a.typed}'.`,
      code: `where('name').startsWithIgnoreCase('${a.typed}')`,
    }),
    query: (friends, a) => friends.where('name').startsWithIgnoreCase(a.typed).toArray(),
  });

export default mount;
