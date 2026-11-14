// deck-gl example: DataFilterExtension filterSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataFilterExtension filterSize',
  summary:
    'filterSize sets how many numbers each object is filtered by (1 to 4). Pick a size and each number gets its own min and max slider; a dot must pass every range.',
  section: 'Extensions',
  tags: ['DataFilterExtension', 'filterSize', 'getFilterValue', 'filterRange'],
  docs: [
    'repo/docs/api-reference/extensions/data-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
