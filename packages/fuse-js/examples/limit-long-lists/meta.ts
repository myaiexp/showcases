// Fuse.js example: a loose query on a big list, drawn in full or capped with limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Only draw the best twenty',
  summary:
    'A short, loose query over 20,000 people can match thousands of them, and drawing every one is what makes a page slow. search(query, { limit: 20 }) returns only the best twenty: same top results, a fraction of the drawing.',
  section: 'Articles',
  tags: ['search', 'limit', 'performance'],
  docs: ['repo/docs/articles/using-fuse-with-react.md', 'repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
