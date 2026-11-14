// Sortable.js example: a dashboard mixing full-width and half-width widgets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Half-width widgets',
  summary:
    'A dashboard where some widgets fill a row and others share one. A direction function tells the list to sort sideways between two half-width widgets and downwards everywhere else.',
  section: 'Swap zones and direction',
  tags: ['direction', 'function'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
