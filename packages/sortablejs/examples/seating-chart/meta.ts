// Sortable.js example: a seating plan where guests trade seats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swap two guests\' seats',
  summary:
    'A wedding table where you drop one guest onto another and the two simply trade seats, instead of everyone in between shuffling along. A switch in the full view turns swap mode off to compare.',
  section: 'Swap',
  tags: ['swap', 'swapClass', 'Sortable.mount', 'option()'],
  docs: ['repo/plugins/Swap/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
