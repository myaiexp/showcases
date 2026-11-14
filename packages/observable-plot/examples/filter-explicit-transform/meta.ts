// observable-plot example: Filter: explicit transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter: explicit transform',
  summary:
    'Plot.filter wraps mark options and takes its test as a function or a field name; here it picks which bars to colour.',
  section: 'Transform: Filter',
  tags: ['barY', 'Plot.filter'],
  docs: ['repo/docs/transforms/filter.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
