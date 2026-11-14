// Fuse.js example: a misspelt two-word query, as one pattern and as separate words
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Typos in every word',
  summary:
    'Type a book title with two misspelt words. A normal Fuse.js search treats the whole query as one phrase and often finds nothing; token search fixes each word on its own and finds the books.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'minMatchCharLength', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
