// Fuse.js example: reading the score that includeScore adds to each result
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a score means',
  summary:
    'A score is how far a result is from perfect: 0 means every letter lined up, and numbers near 1 mean barely related. Eight queries against one title show the scale, and you can add your own.',
  section: 'Keys and results',
  tags: ['includeScore', 'score', 'threshold', 'includeMatches'],
  docs: ['repo/docs/getting-started.md', 'repo/docs/fuzzy-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
