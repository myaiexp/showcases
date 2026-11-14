// Fuse.js example: a key holding an array, with the matching element highlighted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which tag matched',
  summary:
    'Recipes carry several tags. Fuse.js searches every tag and says which one matched, so the chip you typed lights up on each result instead of the whole row.',
  section: 'Keys and results',
  tags: ['keys', 'array values', 'includeMatches', 'refIndex', 'threshold'],
  docs: ['repo/README.md', 'repo/src/helpers/get.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
