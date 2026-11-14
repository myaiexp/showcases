// observable-plot example: Filter: highlighted bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter: highlighted bars',
  summary:
    'A second barY with a filter option redraws only the vowels with a red stroke and negative inset, options a channel cannot express.',
  section: 'Transform: Filter',
  tags: ['barY', 'filter', 'stroke', 'inset'],
  docs: ['repo/docs/transforms/filter.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
