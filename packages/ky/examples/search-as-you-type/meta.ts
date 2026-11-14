// ky example: search-as-you-type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search as you type, cancelling old searches',
  summary:
    'A search box that asks the server after every key press has a problem: answers can come back out of order, and a slow answer to an old search can replace the right one. Giving each request an AbortController signal lets the next key press cancel the previous search, so only the latest answer counts. Untick the box to see the stale result win.',
  section: 'Tips',
  tags: ['AbortController', 'signal', 'AbortError', 'search', 'race condition'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
