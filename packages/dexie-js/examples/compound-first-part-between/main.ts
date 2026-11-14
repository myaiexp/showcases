// Compound index: all Angelas, sorted by last name
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    stores: '++id, [firstName+lastName]',
    rows: [
      { firstName: 'Angela', lastName: 'Merkel' },
      { firstName: 'David', lastName: 'Fahlander' },
      { firstName: 'Angela', lastName: 'Davis' },
      { firstName: 'Sara', lastName: 'Merkel' },
      { firstName: 'Angela', lastName: 'Bassett' },
      { firstName: 'Per', lastName: 'Persson' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'firstName', 'lastName'],
    fields: [{ key: 'first', label: 'firstName', kind: 'text', value: 'Angela', width: 90 }],
    presets: [
      { label: 'Angela', values: { first: 'Angela' } },
      { label: 'Sara', values: { first: 'Sara' } },
      { label: 'David', values: { first: 'David' } },
    ],
    show: (row) => `${String(row.lastName)}, ${String(row.firstName)}`,
    hint: 'The answer list is in last-name order, not table order.',
    describe: (a) => ({
      say: `Every ${a.first}, answered in last-name order.`,
      code: `between(['${a.first}', minKey], ['${a.first}', maxKey])`,
    }),
    query: (people, a) =>
      people
        .where('[firstName+lastName]')
        .between([a.first, Dexie.minKey], [a.first, Dexie.maxKey])
        .toArray(),
  });

export default mount;
