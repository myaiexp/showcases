// Fuse.js example: accent-free queries against accented city names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Accents don't get in the way",
  summary:
    'Type "malmo", "zurich" or "lodz" on a keyboard without accents. Fuse.js already forgives some accents as typos, but with ignoreDiacritics the match is perfect, and cities like Łódź no longer slip through.',
  section: 'Fuzzy Search',
  tags: ['ignoreDiacritics', 'threshold', 'includeScore', 'includeMatches'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
