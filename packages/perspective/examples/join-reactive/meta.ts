// Perspective example: reactive and chained joins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reactive joins',
  summary:
    'Updating any source table recomputes the joined Table, and a join of a join passes the change down the chain. Start with prices and stock that share no key, then add rows to either side and watch matches appear in both joined grids.',
  section: 'Join',
  tags: ['join', 'reactive', 'chained join', 'index', 'update', 'left join'],
  docs: [
    'repo/docs/md/explanation/join/reactivity.md',
    'repo/docs/md/explanation/join.md',
    'repo/docs/md/how_to/javascript/join.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
