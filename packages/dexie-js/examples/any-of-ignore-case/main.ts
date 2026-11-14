// AnyOfIgnoreCase: several names, any casing
import type { Mount } from '@/types.ts';
import { CASE_NAMES, words } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: CASE_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'names', label: 'anyOfIgnoreCase', kind: 'text', value: 'DAVID, sara', width: 160 }],
    presets: [
      { label: 'DAVID and sara', values: { names: 'DAVID, sara' } },
      { label: 'per', values: { names: 'per' } },
      { label: 'david, PER, SARA', values: { names: 'david, PER, SARA' } },
    ],
    describe: (a) => ({
      say: `${words(a.names).join(', ') || '(none)'}: in any casing.`,
      code: `where('name').anyOfIgnoreCase([${words(a.names).map((n) => `'${n}'`).join(', ')}])`,
    }),
    query: (friends, a) => friends.where('name').anyOfIgnoreCase(words(a.names)).toArray(),
  });

export default mount;
