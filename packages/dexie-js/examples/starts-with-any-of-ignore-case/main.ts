// StartsWithAnyOfIgnoreCase: foo* or bar* in any casing
import type { Mount } from '@/types.ts';
import { words } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, firstName, lastName',
    rows: [
      { firstName: 'Fool', lastName: 'Barfly' },
      { firstName: 'Bart', lastName: 'Foofie' },
      { firstName: 'Carl', lastName: 'Bell' },
      { firstName: 'Dana', lastName: 'FOOD' },
      { firstName: 'Eve', lastName: 'barnes' },
      { firstName: 'Finn', lastName: 'Quist' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'firstName', 'lastName'],
    fields: [{ key: 'prefixes', label: 'prefixes', kind: 'text', value: 'foo, bar', width: 160 }],
    presets: [
      { label: 'foo and bar', values: { prefixes: 'foo, bar' } },
      { label: 'BE', values: { prefixes: 'BE' } },
      { label: 'q, f', values: { prefixes: 'q, f' } },
    ],
    describe: (a) => ({
      say: `Last name starts ${words(a.prefixes).join(' or ')}.`,
      code: `where('lastName').startsWithAnyOfIgnoreCase([${words(a.prefixes).map((p) => `'${p}'`).join(', ')}])`,
    }),
    query: (friends, a) => friends.where('lastName').startsWithAnyOfIgnoreCase(words(a.prefixes)).toArray(),
  });

export default mount;
