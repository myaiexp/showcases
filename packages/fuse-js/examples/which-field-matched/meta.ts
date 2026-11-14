// Fuse.js example: labelling each result with the fields that matched
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Say why it matched',
  summary:
    'Search a shop by name, code, category and description at once, and each result says which field made it match. "audio" hits categories, "esp" hits a name and a code, "shower" hits the small print.',
  section: 'Keys and results',
  tags: ['keys', 'includeMatches', 'matches key', 'ignoreLocation', 'threshold'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/docs/fuzzy-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
