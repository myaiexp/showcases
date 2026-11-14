// InAnyRange with includeLowers and includeUppers
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
      { key: 'includeLowers', label: 'includeLowers', kind: 'check', value: true },
      { key: 'includeUppers', label: 'includeUppers', kind: 'check', value: false },
    ],
    presets: [
      { label: 'Default', values: { includeLowers: true, includeUppers: false } },
      { label: 'Include all ends', values: { includeLowers: true, includeUppers: true } },
      { label: 'Exclude all ends', values: { includeLowers: false, includeUppers: false } },
    ],
    describe: (a) => ({
      say: `Lower ends ${a.includeLowers ? 'in' : 'out'}, upper ends ${a.includeUppers ? 'in' : 'out'}.`,
      code: `inAnyRange(r, { includeLowers: ${a.includeLowers}, includeUppers: ${a.includeUppers} })`,
    }),
    query: (friends, a) =>
      friends
        .where('age')
        .inAnyRange(
          [
            [5, 18],
            [50, 75],
          ],
          { includeLowers: a.includeLowers, includeUppers: a.includeUppers },
        )
        .toArray(),
  });

export default mount;
