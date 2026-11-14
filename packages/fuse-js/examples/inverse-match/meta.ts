// Fuse.js example: ! hides every item that contains a word
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Everything except this word',
  summary:
    'A "!" in front of a word flips the search: instead of finding items that contain it, Fuse.js keeps the ones that do not. Hide "ruby" and Ruby, JRuby, Rubyist and the gem list vanish; add "!rails" to hide more.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '!', 'inverse-match'],
  docs: ['repo/docs/extended-search.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
