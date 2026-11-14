// Between with includeLower and includeUpper
import type { Mount } from '@/types.ts';
import { AGE_FRIENDS } from '../../shared/where-data.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'friends',
    stores: '++id, name, age',
    rows: AGE_FRIENDS,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
    fields: [
      { key: 'lower', label: 'from', kind: 'number', value: 18 },
      { key: 'upper', label: 'to', kind: 'number', value: 50 },
      { key: 'includeLower', label: 'includeLower', kind: 'check', value: true },
      { key: 'includeUpper', label: 'includeUpper', kind: 'check', value: false },
    ],
    presets: [
      { label: 'Default', values: { includeLower: true, includeUpper: false } },
      { label: 'Include both ends', values: { includeLower: true, includeUpper: true } },
      { label: 'Exclude both ends', values: { includeLower: false, includeUpper: false } },
      { label: 'Only the upper end', values: { includeLower: false, includeUpper: true } },
    ],
    describe: (a) => ({
      say: `18 ${a.includeLower ? 'in' : 'out'}, 50 ${a.includeUpper ? 'in' : 'out'}: the ends are your choice.`,
      code: `between(${a.lower}, ${a.upper}, ${a.includeLower}, ${a.includeUpper})`,
    }),
    query: (friends, a) =>
      friends.where('age').between(a.lower, a.upper, a.includeLower, a.includeUpper).toArray(),
  });

export default mount;
