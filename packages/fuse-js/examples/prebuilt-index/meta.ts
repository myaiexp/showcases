// Fuse.js example: building the index ahead of time so new Fuse() is instant
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build the index ahead of time',
  summary:
    'Fuse.createIndex(keys, list) does the slow part, reading every item, on its own. Hand the result to new Fuse(list, options, index) and creating the search becomes instant, so the work can happen earlier: before the page needs it, or once for several searches.',
  section: 'Performance',
  tags: ['Fuse.createIndex', 'new Fuse', 'index', 'performance'],
  docs: ['repo/docs/performance.md', 'repo/docs/articles/using-fuse-with-react.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
