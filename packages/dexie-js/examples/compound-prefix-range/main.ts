// Compound index: Anna, last name starting with L
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    stores: '++id, [firstName+lastName]',
    rows: [
      { firstName: 'Anna', lastName: 'Larsson' },
      { firstName: 'Anna', lastName: 'Berg' },
      { firstName: 'Bo', lastName: 'Larsson' },
      { firstName: 'Anna', lastName: 'Lindgren' },
      { firstName: 'Anna', lastName: 'Svensson' },
      { firstName: 'Anna', lastName: 'Lund' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'firstName', 'lastName'],
    fields: [
      { key: 'first', label: 'firstName', kind: 'text', value: 'Anna', width: 80 },
      { key: 'letters', label: 'lastName starts', kind: 'text', value: 'L', width: 50 },
    ],
    presets: [
      { label: 'Anna L...', values: { first: 'Anna', letters: 'L' } },
      { label: 'Anna Li...', values: { first: 'Anna', letters: 'Li' } },
      { label: 'Anna S...', values: { first: 'Anna', letters: 'S' } },
      { label: 'Bo L...', values: { first: 'Bo', letters: 'L' } },
    ],
    show: (row) => `${String(row.firstName)} ${String(row.lastName)}`,
    describe: (a) => ({
      say: `${a.first} ${a.letters}...: last-name range.`,
      code: `between(['${a.first}','${a.letters}'], ['${a.first}','${a.letters}\\uffff'])`,
    }),
    query: (people, a) =>
      people
        .where('[firstName+lastName]')
        .between([a.first, a.letters], [a.first, `${a.letters}￿`])
        .toArray(),
  });

export default mount;
