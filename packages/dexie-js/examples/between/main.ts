// Between: ages in a range, upper end excluded
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
    ],
    presets: [
      { label: '18 to 50', values: { lower: 18, upper: 50 } },
      { label: '21 to 33', values: { lower: 21, upper: 33 } },
      { label: '5 to 21', values: { lower: 5, upper: 21 } },
      { label: '40 to 30', values: { lower: 40, upper: 30 } },
    ],
    describe: (a) => ({
      say: `From ${a.lower} up to, not including, ${a.upper}.`,
      code: `where('age').between(${a.lower}, ${a.upper})`,
    }),
    query: (friends, a) => friends.where('age').between(a.lower, a.upper).toArray(),
  });

export default mount;
