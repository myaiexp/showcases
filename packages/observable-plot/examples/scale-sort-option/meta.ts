// observable-plot example: Scales: sort option on ordinal domains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: sort option on ordinal domains',
  summary:
    'Bars ordered by the sort mark option: ascending and descending by value, reversed, limited to top or bottom n, or per-scale value objects.',
  section: 'Scales',
  tags: ['sort', 'reverse', 'limit', 'order', 'barY'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
