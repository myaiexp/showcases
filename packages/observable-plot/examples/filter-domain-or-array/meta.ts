// observable-plot example: Filter: scale domain or dropped data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter: scale domain or dropped data',
  summary:
    'The filter option only changes the mark index so the x scale keeps all letters; filtering the array with Array.filter removes the others from the scale.',
  section: 'Transform: Filter',
  tags: ['barY', 'filter', 'domain'],
  docs: ['repo/docs/transforms/filter.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
