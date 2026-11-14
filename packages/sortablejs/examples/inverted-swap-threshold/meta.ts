// Sortable.js example: a conference schedule with adjustable edge zones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inverted swap threshold',
  summary:
    'Re-order conference talks by dropping one between two others. A slider widens or narrows the edge strips of each row that make room for the dragged talk.',
  section: 'Swap zones and direction',
  tags: ['invertedSwapThreshold', 'invertSwap', 'option()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
