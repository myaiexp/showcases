// Compound index: first and last name together
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    // [firstName+lastName] indexes the two names as one pair.
    stores: '++id, [firstName+lastName]',
    rows: [
      { firstName: 'Angela', lastName: 'Merkel' },
      { firstName: 'Angela', lastName: 'Davis' },
      { firstName: 'Sara', lastName: 'Merkel' },
      { firstName: 'David', lastName: 'Davis' },
      { firstName: 'Per', lastName: 'Persson' },
      { firstName: 'Sara', lastName: 'Persson' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'firstName', 'lastName'],
    fields: [
      { key: 'first', label: 'firstName', kind: 'text', value: 'Angela', width: 90 },
      { key: 'last', label: 'lastName', kind: 'text', value: 'Davis', width: 90 },
    ],
    presets: [
      { label: 'Angela Davis', values: { first: 'Angela', last: 'Davis' } },
      { label: 'Sara Merkel', values: { first: 'Sara', last: 'Merkel' } },
      { label: 'Angela Persson', values: { first: 'Angela', last: 'Persson' } },
    ],
    show: (row) => `${String(row.firstName)} ${String(row.lastName)}`,
    describe: (a) => ({
      say: 'Both names must match, as one pair.',
      code: `equals(['${a.first}', '${a.last}'])`,
    }),
    query: (people, a) => people.where('[firstName+lastName]').equals([a.first, a.last]).toArray(),
  });

export default mount;
