// Compound index: its first half works as an index too
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'people',
    // Only the pair is declared. 'firstName' alone is not.
    stores: '++id, [firstName+lastName]',
    rows: [
      { firstName: 'Foo', lastName: 'Bar' },
      { firstName: 'Baz', lastName: 'Qux' },
      { firstName: 'Foo', lastName: 'Quux' },
      { firstName: 'Foo', lastName: 'Abel' },
      { firstName: 'Zed', lastName: 'Foo' },
      { firstName: 'Baz', lastName: 'Bar' },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'firstName', 'lastName'],
    fields: [
      {
        key: 'part',
        label: 'where(',
        kind: 'select',
        value: 'firstName',
        options: ['firstName', 'lastName'],
      },
      { key: 'value', label: ').equals(', kind: 'text', value: 'Foo', width: 80 },
    ],
    presets: [
      { label: 'firstName Foo', values: { part: 'firstName', value: 'Foo' } },
      { label: 'firstName Baz', values: { part: 'firstName', value: 'Baz' } },
      { label: 'lastName Bar (not allowed)', values: { part: 'lastName', value: 'Bar' } },
    ],
    show: (row) => `${String(row.firstName)} ${String(row.lastName)}`,
    describe: (a) => ({
      say: a.part === 'firstName' ? 'The leading half is an index.' : 'The trailing half is not.',
      code: `where('${a.part}').equals('${a.value}')`,
    }),
    query: (people, a) => people.where(a.part).equals(a.value).toArray(),
  });

export default mount;
