// StartsWithAnyOf: names beginning with any of several prefixes
import type { Mount } from '@/types.ts';
import { PREFIX_NAMES, words } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name',
    rows: PREFIX_NAMES,
    columns: [{ field: 'id', width: '2.6em' }, 'name'],
    fields: [{ key: 'prefixes', label: 'startsWithAnyOf', kind: 'text', value: 'Sa, Pe', width: 160 }],
    presets: [
      { label: 'Sa or Pe', values: { prefixes: 'Sa, Pe' } },
      { label: 'Si or U', values: { prefixes: 'Si, U' } },
      { label: 'sa (lower case)', values: { prefixes: 'sa' } },
    ],
    describe: (a) => ({
      say: `Begins with ${words(a.prefixes).join(' or ')}.`,
      code: `where('name').startsWithAnyOf([${words(a.prefixes).map((p) => `'${p}'`).join(', ')}])`,
    }),
    query: (friends, a) => friends.where('name').startsWithAnyOf(words(a.prefixes)).toArray(),
  });

export default mount;
