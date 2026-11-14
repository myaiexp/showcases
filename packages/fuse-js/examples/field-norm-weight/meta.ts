// Fuse.js example: a slider for fieldNormWeight reorders recipes by title length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How much length counts',
  summary:
    'fieldNormWeight turns the field-length effect up or down. At 0 length is ignored, at 1 it is the default, at 2 long titles sink below sloppy short ones. Slide it and watch the ranking reshuffle.',
  section: 'Fuzzy Search',
  tags: ['fieldNormWeight', 'ignoreFieldNorm', 'includeScore'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
