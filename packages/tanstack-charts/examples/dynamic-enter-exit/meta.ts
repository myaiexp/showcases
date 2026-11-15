// tanstack-charts example: Rows enter and exit by key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows enter and exit by key',
  summary:
    'Rows are reconciled by key. A new key enters as a new element, a missing key exits, and the survivors tween in place. The buttons add or remove one month at a time, and the card loop adds and drops rows on a timer.',
  section: 'Dynamic Data and Animation',
  tags: ['key', 'svgAnimation', 'enter', 'exit'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
