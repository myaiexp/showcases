// Dates as keys: tasks due between two days
import type { Mount } from '@/types.ts';
import { whereDemo } from '../../shared/where-demo.ts';

const day = (iso: string): Date => new Date(`${iso}T00:00`);

const mount: Mount = (el, ctx) =>
  whereDemo(el, ctx, {
    table: 'tasks',
    stores: '++id, title, due',
    rows: [
      { title: 'Pay rent', due: day('2026-11-03') },
      { title: 'Dentist', due: day('2026-11-07') },
      { title: 'Taxes', due: day('2026-11-10') },
      { title: 'Birthday', due: day('2026-11-14') },
      { title: 'Report', due: day('2026-11-21') },
      { title: 'Flights', due: day('2026-11-30') },
    ],
    columns: [{ field: 'id', width: '2.6em' }, 'title', { field: 'due', width: '5.8em' }],
    fields: [
      { key: 'from', label: 'from', kind: 'date', value: '2026-11-05' },
      { key: 'to', label: 'to', kind: 'date', value: '2026-11-15' },
    ],
    presets: [
      { label: 'Nov 5 to 15', values: { from: '2026-11-05', to: '2026-11-15' } },
      { label: 'Nov 10 to 21', values: { from: '2026-11-10', to: '2026-11-21' } },
      { label: 'Last week of Nov', values: { from: '2026-11-24', to: '2026-11-30' } },
    ],
    show: (row) => String(row.title),
    describe: (a) => ({
      say: `Due ${a.from.slice(5)} to ${a.to.slice(5)}, both included.`,
      code: `where('due').between(new Date('${a.from}'), new Date('${a.to}'), true, true)`,
    }),
    query: (tasks, a) => tasks.where('due').between(day(a.from), day(a.to), true, true).toArray(),
  });

export default mount;
