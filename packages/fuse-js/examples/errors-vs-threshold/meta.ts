// Fuse.js example: words with 0 to 4 mistakes and a threshold dial that decides who passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How many mistakes are allowed',
  summary:
    'Five words that differ from "test" by none, one, two, three or four letters, and a threshold dial. Each mistake costs a quarter of the way to 1: raise the threshold and more of them squeeze through, but the fourth never does.',
  section: 'Fuzzy Search',
  tags: ['threshold', 'Fuse.match', 'includeMatches'],
  docs: ['repo/docs/articles/how-fuzzy-search-works.md', 'repo/docs/fuzzy-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
