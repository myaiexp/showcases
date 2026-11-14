// Fuse.js example: a lower threshold finds fewer items and searches faster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stricter searches run faster',
  summary:
    'The same query over the same list at four thresholds, timed on this device. A lower threshold lets Fuse give up on poor candidates early: fewer matches, and less time spent finding them.',
  section: 'Performance',
  tags: ['threshold', 'search', 'performance'],
  docs: ['repo/docs/performance.md', 'repo/docs/fuzzy-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
