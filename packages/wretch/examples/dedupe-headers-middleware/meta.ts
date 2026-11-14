// Fix duplicated headers: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix duplicated headers',
  summary:
    'The README ships a middleware that cleans up headers set under two spellings. Its own version calls headers.raw(), which only Node has, so this one groups the header names in wretch\'s plain object instead. With it in place the same doubled Content-Type becomes one, and the strict server accepts the post.',
  section: 'Limitations',
  tags: ['middlewares', 'headers', 'Headers'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
