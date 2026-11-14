// observable-plot example: Filter: highlighted labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter: highlighted labels',
  summary:
    'The filter option on a text mark keeps labels only for rows with a truthy highlight field; the alternative is to set text to null in a function.',
  section: 'Transform: Filter',
  tags: ['dot', 'text', 'filter', 'log scale'],
  docs: ['repo/docs/transforms/filter.md', 'repo/docs/data/metros.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
