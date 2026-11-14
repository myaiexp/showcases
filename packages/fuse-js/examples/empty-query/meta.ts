// Fuse.js example: an empty query returns the whole list, with no scores
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An empty box shows everything',
  summary:
    'Clear the search box and Fuse.js hands back the whole list in its original order, with no scores. Start typing and it narrows to ranked matches, so a search-as-you-type list needs no special case for "nothing typed yet".',
  section: 'Getting Started',
  tags: ['search', 'empty query', 'includeScore', 'keys'],
  docs: ['repo/CHANGELOG.md', 'repo/docs/getting-started.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
