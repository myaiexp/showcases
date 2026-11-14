// Fuse.js example: product descriptions searched with and without ignoreLocation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Words buried deep in long text',
  summary:
    'Product descriptions are long, and the default search only looks at the start of each one. Words like "battery", "gloves" or "tank" further in are invisible until ignoreLocation lets the search read all the way through.',
  section: 'Fuzzy Search',
  tags: ['ignoreLocation', 'threshold', 'distance', 'location', 'keys'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
