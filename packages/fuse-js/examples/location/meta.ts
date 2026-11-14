// Fuse.js example: moving location changes which line ranks first
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Where in the text you expect it',
  summary:
    'The same word sits near the start, the middle and the end of several lines. Tell Fuse.js where you expect it with location and the line whose word is closest to that spot ranks first.',
  section: 'Fuzzy Search',
  tags: ['location', 'threshold', 'distance', 'includeScore', 'includeMatches'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
