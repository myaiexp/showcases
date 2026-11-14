// Fuse.js example: searching a plain array of strings with no keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Searching a plain list of words',
  summary:
    'A shelf of fruit names is just an array of strings, so Fuse.js needs no setup beyond the list. Misspell a fruit and the closest names light up, with the best match first.',
  section: 'Getting Started',
  tags: ['new Fuse', 'search', 'includeScore', 'includeMatches', 'array of strings'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/README.md', 'repo/docs/getting-started.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
