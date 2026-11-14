// Fuse.js example: what makes building the index slow: list size, keys and token search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What the index costs to build',
  summary:
    'new Fuse() reads every item once to build its index before the first search. Timed on this device: plain strings are cheapest, every extra key adds work, and token search adds the most. Pick a list size and watch the bars.',
  section: 'Performance',
  tags: ['new Fuse', 'keys', 'useTokenSearch', 'indexing', 'performance'],
  docs: ['repo/docs/performance.md', 'repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
