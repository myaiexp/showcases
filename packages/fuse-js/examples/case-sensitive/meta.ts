// Fuse.js example: the same query with and without isCaseSensitive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US is not us',
  summary:
    'Fuse.js ignores capital letters by default, so "US" also finds "us", "Bus" and "Polish". Turn on isCaseSensitive and only the capitalised words are left. Two columns, same query.',
  section: 'Fuzzy Search',
  tags: ['isCaseSensitive', 'threshold', 'includeMatches'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
