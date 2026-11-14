// Fuse.js example: ranking with the field-length norm on and with ignoreFieldNorm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "When length shouldn't matter",
  summary:
    'Two rankings of the same recipe titles. By default a short title beats a long one with the same word. Switch on ignoreFieldNorm and a title that contains the word exactly keeps its place, however long it is.',
  section: 'Fuzzy Search',
  tags: ['ignoreFieldNorm', 'includeScore', 'keys'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
