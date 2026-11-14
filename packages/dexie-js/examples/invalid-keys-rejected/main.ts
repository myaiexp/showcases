// Invalid keys: null, true and objects are refused
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const values: Record<string, unknown> = { '21': 21, 'null': null, 'true': true, 'undefined': undefined, '{ age: 21 }': { age: 21 } };

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [{ key: 'key', label: 'equals', kind: 'select', value: '21', options: Object.keys(values) }],
    presets: [
      { label: 'equals(21)', values: { key: '21' } },
      { label: 'equals(null)', values: { key: 'null' } },
      { label: 'equals(true)', values: { key: 'true' } },
      { label: 'equals(undefined)', values: { key: 'undefined' } },
      { label: 'equals({ age: 21 })', values: { key: '{ age: 21 }' } },
    ],
    describe: (a) => ({
      say: a.key === '21' ? 'A number is a valid key.' : 'Not a valid key: it fails.',
      code: `where('age').equals(${a.key})`,
    }),
    query: (friends, a) => friends.where('age').equals(values[a.key] as never).toArray(),
  });

export default mount;
