// Sortable.js example: reverse, alphabetise, shuffle and restore a swatch strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shuffle and restore',
  summary:
    'A palette of colour swatches you can drag around, plus buttons that reverse them, sort them A to Z, shuffle them, or bring back the original order. Remember the order once, restore it any time.',
  section: 'Methods',
  tags: ['toArray()', 'sort(order, true)', 'data-id'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
