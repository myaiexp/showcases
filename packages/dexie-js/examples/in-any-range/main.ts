// InAnyRange: two age ranges in one query
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
      { key: 'a1', label: 'range 1 from', kind: 'number', value: 0 },
      { key: 'b1', label: 'to', kind: 'number', value: 18 },
      { key: 'a2', label: 'range 2 from', kind: 'number', value: 65 },
      { key: 'b2', label: 'to', kind: 'number', value: 120 },
    ],
    presets: [
      { label: 'Children and elders', values: { a1: 0, b1: 18, a2: 65, b2: 120 } },
      { label: 'Twenties and fifties', values: { a1: 20, b1: 30, a2: 50, b2: 60 } },
      { label: 'Overlapping ranges', values: { a1: 0, b1: 30, a2: 20, b2: 55 } },
    ],
    describe: (a) => ({
      say: `Ages ${a.a1}-${a.b1} or ${a.a2}-${a.b2}.`,
      code: `inAnyRange([[${a.a1},${a.b1}],[${a.a2},${a.b2}]])`,
    }),
    query: (friends, a) =>
      friends
        .where('age')
        .inAnyRange([
          [a.a1, a.b1],
          [a.a2, a.b2],
        ])
        .toArray(),
  });

export default mount;
