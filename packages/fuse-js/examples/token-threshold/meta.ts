// Fuse.js example: the threshold slider applied to each word of a token search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How strict each word should be',
  summary:
    'The default threshold lets almost any recipe sound like a misspelt word. Drag it down to 0.3 or 0.4 and the loose matches fall away, then down further to see the typo itself stop matching.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'minMatchCharLength', 'includeScore'],
  docs: ['repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
